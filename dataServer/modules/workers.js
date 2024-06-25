const express = require('express')
const router = express.Router()
const { Workers } = require('../models')

// 创建工作者
router.post('/createWorker', async (req, res) => {
    try {
        const { name, place, password, phone, birth, onWork } = req.body;
        // 创建新项目
        const newWork = new Workers({ name, place, password, phone, birth, onWork });

        // 保存到数据库
        await newWork.save();

        res.status(201).json(newWork); // 返回创建的项目数据
    } catch (err) {
        console.error('创建工作者出错:', err);
        res.status(500).send('创建工作者出错');
    }
});

// 获取所有工作者
router.get('/getAllWorkers', async (req, res) => {
    try {
        const workers = await Workers.find().exec();
        res.json(workers);
    } catch (err) {
        console.error('获取工作者列表出错:', err);
        res.status(500).send('获取工作者列表出错');
    }
});

// 获取单个工作者
router.get('/getWorker/:workerId', async (req, res) => {
    const { workerId } = req.params;
    try {
        const worker = await Workers.findById(workerId).exec();
        if (!worker) {
            return res.status(404).send('未找到工作者');
        }
        // console.log(worker);
        res.json(worker);
    } catch (err) {
        console.error('获取工作者详情出错:', err);
        res.status(500).send('获取工作者详情出错');
    }
});

// 更新工作者
router.post('/updateWorker/:workerId', async (req, res) => {
    const { workerId } = req.params;
    const {name, place, password, phone, birth, onWork } = req.body
    try {
        const updatedWorker = await Workers.findByIdAndUpdate(workerId, { name, place, password, phone, birth, onWork }, { new: true }).exec();
        if (!updatedWorker) {
            return res.status(404).send('未找到要更新的工作者');
        }
        res.json(updatedWorker);
    } catch (err) {
        console.error('更新工作者出错:', err);
        res.status(500).send('更新工作者出错');
    }
});

// 删除工作者
router.post('/deleteWorker/:workerId', async (req, res) => {
    const { workerId } = req.params;
    try {
        const deletedWorker = await Workers.findByIdAndDelete(workerId).exec();
        if (!deletedWorker) {
            return res.status(404).send('未找到要删除的工作者');
        }
        res.json({ message: '工作者删除成功' });
    } catch (err) {
        console.error('删除工作者出错:', err);
        res.status(500).send('删除工作者出错');
    }
});

// 登录
router.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        // 根据手机号查询数据库中的工人信息
        const worker = await Workers.findOne({ phone });

        if (!worker) {
            return res.status(404).json({ message: '工人不存在' });
        }

        // 比较密码是否匹配
        if (password === worker.password) {
            // 登录成功
            return res.status(200).json({ message: '登录成功' , user: worker});
        } else {
            // 密码不匹配
            return res.status(401).json({ message: '密码错误'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '服务器错误' });
    }
})

module.exports = router
