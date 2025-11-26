// api.js
const API_URL = "http://localhost:8080/api";

async function apiGet(url) {
    const res = await fetch(API_URL + url);
    return res.json();
}

async function apiPost(url, body) {
    const res = await fetch(API_URL + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return res.json();
}
