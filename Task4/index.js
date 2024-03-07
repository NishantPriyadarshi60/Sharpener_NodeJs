const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        if (method === 'GET') {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
            res.write('</html>');
            return res.end();
        }
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]; // Extract the message from form data
            fs.writeFile('message.txt', message, err => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    return res.end('Internal Server Error');
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    if (url === '/display' && method === 'GET') {
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                return res.end('Internal Server Error');
            }
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Message Display</title></head>');
            res.write('<body>');
            res.write('<h1>Message:</h1>');
            res.write(`<p>${data}</p>`);
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    }

    // Handle 404 Not Found
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Page Not Found</title></head>');
    res.write('<body><h1>404 - Page Not Found</h1></body>');
    res.write('</html>');
    return res.end();
});

server.listen(3000);
