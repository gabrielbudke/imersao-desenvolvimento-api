import http from "http";

const server = http.createServer((request, response) => {
    return response.end("Hello HTTP!");
});

server.listen(4000, () => {
    console.log("[server]:", "Server is running on http://localhost:4000");
});