import { NextResponse } from "next/server"

const mapApiKey = String(process.env.NEXT_PUBLIC_GOOGLE_API_KEY)
const BASE_URL = 'https://maps.googleapis.com/maps/api/place'

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)

    const category = searchParams.get('category')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius')

    let url = `${BASE_URL}/textsearch/json?`
    url += `&query=${category}`
    url += `&location=${lat},${lng}`
    url += `&radius=${radius}`
    url += `&key=${mapApiKey}`

    const resp = await fetch(url, {
        headers: {
            'Content-Type': "application/json"
        }
    })

    const product = await resp.json()

    return NextResponse.json({ product })
}