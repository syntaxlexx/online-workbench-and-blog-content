import dotenv from 'dotenv'
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyIO from 'fastify-socket.io'
import Redis from 'ioredis'
import closeWithGrace from 'close-with-grace'
import { randomUUID } from 'crypto'

dotenv.config()

const PORT = parseInt(process.env.PORT || '3001', 10)
const HOST = process.env.HOST || '0.0.0.0' // for docker purposes
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL

const CONNECTION_COUNT_KEY = 'chat:connection-count'
const CONNECTION_COUNT_UPDATED_CHANNEL = 'chat:connection-count-updated'
const NEW_MESSAGE_CHANNEL = 'chat:new-message'

if (!REDIS_URL) {
    console.error('missing REDIS_URL')
    process.exit(1)
}

const publisher = new Redis(REDIS_URL, {
    // for encryption purposes, uncomment here
    // tls: {
    //     rejectUnauthorized: true,
    // }
})

const subscriber = new Redis(REDIS_URL, {
    // for encryption purposes, uncomment here
    // tls: {
    //     rejectUnauthorized: true,
    // }
})

let connectedClients = 0;

async function buildServer() {
    const app = fastify()

    await app.register(fastifyCors, {
        origin: CORS_ORIGIN,
    })

    await app.register(fastifyIO)

    const currentCount = await publisher.get(CONNECTION_COUNT_KEY)

    if (!currentCount) {
        await publisher.set(CONNECTION_COUNT_KEY, 0)
    }

    app.io.on('connection', async (io) => {
        console.log("client connected. ID:", io.id);
        connectedClients++

        const newCount = await publisher.incr(CONNECTION_COUNT_KEY)
        await publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL, String(newCount))

        io.on(NEW_MESSAGE_CHANNEL, async (payload) => {
            const { message } = payload
            if (!message) return;
            await publisher.publish(NEW_MESSAGE_CHANNEL, message.toString())
        })

        io.on('disconnect', async () => {
            console.log("client disconnected. ID:", io.id);
            connectedClients--

            const newCount = await publisher.decr(CONNECTION_COUNT_KEY)
            await publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL, String(newCount))
        })
    })


    subscriber.subscribe(CONNECTION_COUNT_UPDATED_CHANNEL, (err, count) => {
        if (err) {
            console.error(`Error subscribing to ${CONNECTION_COUNT_UPDATED_CHANNEL}`), err
            return;
        }

        console.log(`${count} clients subscribed to ${CONNECTION_COUNT_UPDATED_CHANNEL} channel`);
    })

    subscriber.subscribe(NEW_MESSAGE_CHANNEL, (err, count) => {
        if (err) {
            console.error(`Error subscribing to ${NEW_MESSAGE_CHANNEL}`), err
            return;
        }

        console.log(`${count} clients subscribed to ${NEW_MESSAGE_CHANNEL} channel`);
    })

    subscriber.on('message', (channel, text) => {
        if (channel === CONNECTION_COUNT_UPDATED_CHANNEL) {

            app.io.emit(CONNECTION_COUNT_UPDATED_CHANNEL, {
                count: text,
            })

            return;
        }

        if (channel === NEW_MESSAGE_CHANNEL) {
            app.io.emit(NEW_MESSAGE_CHANNEL, {
                message: text,
                id: randomUUID(),
                createdAt: new Date(),
                port: PORT,
            })

            return;
        }
    })

    app.get('/healthcheck', () => {
        return {
            status: 'ok',
            port: PORT,
        }
    })

    return app;
}

async function main() {
    const app = await buildServer()

    try {
        await app.listen({
            port: PORT,
            host: HOST,
        })

        closeWithGrace({ delay: 2000 }, async ({ signal, err }) => {
            console.log("shutting down");
            console.log("err, signal", err, signal);

            if (connectedClients > 0) {
                console.log("removing connected clients");
                const currentCount = parseInt(await publisher.get(CONNECTION_COUNT_KEY) || '0', 10)
                const newCount = Math.max(currentCount - connectedClients, 0)
                await publisher.set(CONNECTION_COUNT_KEY, newCount)
            }

            // close connection to the app
            await app.close()

            console.log("shutdown complete. Goodbye",);
        })

        console.log(`Server started at https://${HOST}:${PORT}`);
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()
