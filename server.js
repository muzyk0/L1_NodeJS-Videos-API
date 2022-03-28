const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    switch (req.url) {
        case "/users": {
            res.write("Users");
            res.end();
            break;
        }
        case "/portfolio": {
            res.write(
                "Frontend: React, GraphQL, Redux. Beckend: NodeJS, GraphQL, Express, TypeORM, NestJS, PostgreSQL"
            );
            res.end();
            break;
        }
        case "/favicon.ico": {
            fs.readFile("public/favicon.ico", (err, data) => {
                res.setHeader("Content-Length", data.length);
                res.setHeader("Content-Type", "image/x-icon");
                res.setHeader("Cache-Control", "public, max-age=2592000");
                res.setHeader(
                    "Expires",
                    new Date(Date.now() + 2592000000).toUTCString()
                );
                res.end(data);
            });
            break;
        }

        default: {
            res.statusCode = 404;
            res.write("404: not fount");
            res.end();
        }
    }
});

server.listen(3011);
