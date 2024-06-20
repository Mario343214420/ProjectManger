const express = require('express')
const router = express.Router()
const { Works } = require('../models')

// 创建项目
router.post('/createWork', async (req, res) => {
    try {
        const { String, step, task, surplus, date, worker } = req.body;
        // 创建新项目
        const newWork = new Works({ String, step, task, surplus, date, worker });

        // 保存到数据库
        await newWork.save();

        res.status(201).json(newWork); // 返回创建的项目数据
    } catch (err) {
        console.error('保存工作出错:', err);
        res.status(500).send('保存工作出错');
    }
});

// 获取所有项目
router.get('/getAllWorks', async (req, res) => {
    try {
        const works = await Works.find().exec();
        res.json(works);
    } catch (err) {
        console.error('获取工作列表出错:', err);
        res.status(500).send('获取工作列表出错');
    }
});

// 获取单个项目
router.get('/getWork/:workId', async (req, res) => {
    const { workId } = req.params;
    try {
        const work = await Works.findById(workId).exec();
        if (!work) {
            return res.status(404).send('未找到工作');
        }
        res.json(work);
    } catch (err) {
        console.error('获取工作详情出错:', err);
        res.status(500).send('获取工作详情出错');
    }
});

// 更新项目
router.post('/updateWork/:workId', async (req, res) => {
    const { workId } = req.params;
    const { String, step, task, surplus, date, worker } = req.body
    try {
        const updatedWork = await Works.findByIdAndUpdate(workId, { String, step, task, surplus, date, worker }, { new: true }).exec();
        if (!updatedWork) {
            return res.status(404).send('未找到要更新的工作');
        }
        res.json(updatedWork);
    } catch (err) {
        console.error('更新工作出错:', err);
        res.status(500).send('更新工作出错');
    }
});

// 删除项目
router.post('/deleteWork/:projectId', async (req, res) => {
    const { workId } = req.params;
    try {
        const deletedWork = await Works.findByIdAndDelete(workId).exec();
        if (!deletedWork) {
            return res.status(404).send('未找到要删除的工作');
        }
        res.json({ message: '工作删除成功' });
    } catch (err) {
        console.error('删除工作出错:', err);
        res.status(500).send('删除工作出错');
    }
});

module.exports = router
