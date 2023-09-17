import axios from "axios";

// api/google-place?category=indian&radius=1000&lat=35.3734577&lng=-80.7227037
export const getGooglePlace = ({ category, radius, lat, lng }: { category: string, radius: number, lat: number, lng: number }) => axios.get(`/api/google-place?category=${category}&radius=${radius}&lat=${lat}&lng=${lng}`)

export const calculateDistance = ({ lat1, lng1, lat2, lng2 }: {
    lat1: number | null | undefined, lng1: number | null | undefined, lat2: number | null | undefined, lng2: number | null | undefined
}): number | null => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return null;


    const earthRadius = 6371; // km
    const degToRad = (deg: number) => {
        return deg * (Math.PI / 180)
    }

    const dLat = degToRad(lat2 - lat1)
    const dLng = degToRad(lng2 - lng1)

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c;

    return Number(distance.toFixed(2))
}