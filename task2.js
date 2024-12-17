const http = require("node:http")
const path = require("node:path")
const fs = require("node:fs")
const PORT = 3000

const server = http.createServer((req, res) => {
    if(req.url === "/" && req.method === "GET") {
        const filePath = path.resolve(__dirname, "index.html")
        fs.readFile(filePath, "utf-8", (err, data) => {
            if(err){
                res.writeHead(500, {"Content-Type" : "application/json"})
                res.end(JSON.stringify({message:"Internal server error"}))
            } else {
                res.writeHead(200, {"Content-Type" : "text/html"})
                res.end(data)
            }
        })
    } else {
        res.statusCode = 400
        res.end(JSON.stringify( {message: "Bad Request"}))
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})