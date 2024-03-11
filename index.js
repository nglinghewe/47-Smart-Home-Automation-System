// 引入所需的库和模块
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// 创建一个Express应用程序
const app = express();

// 使用中间件解析请求体
app.use(bodyParser.json());

// 模拟一个数据库，用于存储设备和状态信息
const devices = {};

// 路由：获取所有设备
app.get('/devices', (req, res) => {
  res.json(Object.values(devices));
});

// 路由：获取特定设备
app.get('/devices/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  const device = devices[deviceId];
  if (device) {
    res.json(device);
  } else {
    res.status(404).json({ error: 'Device not found' });
  }
});

// 路由：创建设备
app.post('/devices', (req, res) => {
  const { name } = req.body;
  const deviceId = uuidv4();
  const device = { id: deviceId, name, status: 'off' };
  devices[deviceId] = device;
  res.status(201).json(device);
});

// 路由：更新设备状态
app.put('/devices/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  const { status } = req.body;
  const device = devices[deviceId];
  if (device) {
    device.status = status;
    res.json(device);
  } else {
    res.status(404).json({ error: 'Device not found' });
  }
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
