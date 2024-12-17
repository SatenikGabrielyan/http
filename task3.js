const http = require("node:http")
const fs = require("node:fs")
const path = require("node:path")

const PORT = 3000
const filePath = path.join(__dirname, "users.json")

const readUsersFromFile = (file) => {
    if(fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, "utf-8"))
    } else return []
}

const writeUsersToFile = (file, users) => {
    fs.writeFileSync(file,JSON.stringify(users), "utf-8", {flag:"w+"})
}

const server = http.createServer((req, res) => {
    if(req.url !== "/users"){
        res.writeHead(400, {"Content-Type":"application/json"})
        res.end(JSON.stringify({message: "Bad Request"}))
    } 
    if(req.method === "POST"){
        let data = null
        req.on("data", (chunk) => {
            data = chunk
          })
        req.on("end", () => {
            try {
                const user = JSON.parse(data)
                if(!user.name || !user.age){
                    throw new Error("Name and age are required")
                }
                const users = readUsersFromFile(filePath)
                users.push(user)
                writeUsersToFile(filePath, users)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message: "User succefully created",user}))
            } catch (err){
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({message:err.message}))
            }
        })
    } else if(req.method === "GET") {
        const users = readUsersFromFile(filePath)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({users}))
    } 
})

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})