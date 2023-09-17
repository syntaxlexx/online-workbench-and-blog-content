# Server
A realtime-chat-app backend built with
- fastify
- fastify socket.io

## How to run
Runs via docker
```bash
# add execute permissions
chmod +x run.sh

# run script
./run.sh
```

## Github CI/CD
Github Secrets
- HOST
- USER
- PRIVATE_KEY
- UPSTASH_REDIS_REST_URL
- CORS_ORIGIN

`.github/workflows/server.yml`

```yml
name: Deploy server

on:
    push:
        branches:
            - main

    defaults:
        run:
            working-directory: ./server

    jobs:
        deploy:
            runs-on: ubuntu-latest
            steps:
                - name: Checkout code
                  uses: actions/checkout@v2
                
                - name: Deploy server
                  uses: appleboy/ssh-action@master
                  with:
                    host: ${{ secrets.HOST }}
                    username: ${{ secrets.USER }}
                    key: ${{ secrets.PRIVATE_KEY }}
                    script_stop: true
                    script: |
                        export UPSTASH_REDIS_REST_URL=${{ secrets.UPSTASH_REDIS_REST_URL }}
                        export CORS_ORIGIN=${{ secrets.CORS_ORIGIN }}
                        cd chat-tutorial
                        git pull
                        cd server
                        docker-compose down
                        docker-compose --project-name chat up -d --build

```
