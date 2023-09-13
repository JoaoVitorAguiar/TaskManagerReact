import axios from "axios";
const blogFetch = axios.create({
    baseURL: "https://localhost:7163/v1",
    headers: {
        "Content-Type": "application/json"
    }
})

export default blogFetch;