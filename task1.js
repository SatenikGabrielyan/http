const http = require("node:http")
const PORT = 3000

const server = http.createServer((req, res) => {
    if (req.url === "/"){
        if(req.method === "GET") {
            res.writeHead(200, {"Content-Type":"application/json"})
            res.end(JSON.stringify({message: "Welcome to the backend server"}))
        } else if (req.method === "POST" || 
                   req.method === "PUT" || 
                   req.method === "PATCH" || 
                   req.method === "DELETE" || 
                   req.method === "OPTIONS") {
            res.writeHead(200, {"Content-Type":"application/json"})
            res.end(JSON.stringify({message: `You sent a ${req.method} request`}))
        } else {
            res.writeHead(405, {"Content-Type":"application/json"})
            res.end(JSON.stringify({message: "Method not allowed"}))
        }
    } else {
        res.writeHead(400, {"Content-Type":"application/json"})
        res.end(JSON.stringify({message: "Bad request"}))
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})