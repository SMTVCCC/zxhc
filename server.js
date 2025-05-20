const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// 获取本机IP地址
function getLocalIPAddresses() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const interfaceName in interfaces) {
        const interface = interfaces[interfaceName];
        for (const iface of interface) {
            // 跳过内部IP和非IPv4地址
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }
    
    return addresses;
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    // 仅处理GET请求
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end('仅支持GET请求');
        return;
    }

    // 处理根路径请求，返回HTML文件
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'file-transfer.html'), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('无法加载文件传输页面');
                return;
            }
            
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(data);
        });
        return;
    }

    // 对于其他路径，返回404
    res.statusCode = 404;
    res.end('找不到请求的资源');
});

// 设置端口并启动服务器
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    const ipAddresses = getLocalIPAddresses();
    console.log(`服务器已启动，你可以通过以下地址访问：`);
    
    if (ipAddresses.length > 0) {
        ipAddresses.forEach(ip => {
            console.log(`http://${ip}:${PORT}`);
        });
    }
    
    console.log(`http://localhost:${PORT}`);
}); 