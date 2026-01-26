const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    fs.readFile(path.join(__dirname, 'test_sanity.html'), (err, content) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
});

server.listen(3005, '127.0.0.1', () => {
    console.log('TESTE RODANDO EM: http://127.0.0.1:3005');
});
