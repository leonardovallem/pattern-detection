import axios from "axios"

const client = axios.create({
    baseURL: "http://localhost:8082",
    headers: {
      "content-type": "application/json"
    }
})

export async function processImage(pattern, image) {
    return (await client.get("/process", {data: {pattern, image}})).data
}
