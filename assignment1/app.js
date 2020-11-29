"use strict"

//app.js

require('http').createServer((req, res) => {
    const url = req.url

    switch (url) {
        case '/':
            res.write('<html><body><h1>hello world</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body><html>')
            return res.end()
        case '/create-user':
            const body = []
            req.on("data", chunk => body.push(chunk))
            req.on("end", () => {
                console.log(Buffer.concat(body).toString().split('=')[1])
            })
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        case '/users':
            res.write('<html><body><ul><li>cat</li><li>dog</li><li>fish</li><li>pig</li></ul></body><html>')
            return res.end()
        default:
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
    }
}).listen(3000)