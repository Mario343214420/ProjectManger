const mongoose = require('mongoose')
const express = require('express')
const path = require('path');
// const {Projects, Works, Workers} = require('./models')

mongoose.connect('mongodb://localhost:27017/projects')
// 连接成功
mongoose.connection.on('open', () => { console.log('连接成功'); });
// 连接出错
mongoose.connection.on('error', () => { console.log('连接出错'); });
// 连接关闭
mongoose.connection.on('close', () => { console.log('连接关闭'); });

// 定义 Express 应用
const app = express();
const port = 6147;
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'dist')));

// 服务 HTML 页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist','index.html'));
});

// 解析 JSON 请求体
app.use(express.json());

// 项目管理库
app.use('/projects', require('./modules/projects'));
app.use('/works', require('./modules/works'));
app.use('/workers', require('./modules/workers'));

// 启动 HTTP 服务
app.listen(port, () => {
    console.log(`HTTP 服务已启动，监听端口 ${port}`);
});
