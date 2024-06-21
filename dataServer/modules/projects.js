const express = require('express')
const router = express.Router()
const { Projects } = require('../models')

// 创建项目
router.post('/createProject', async (req, res) => {
    try {
        const { name, description, startDate, endDate, budget, members, order, customer, isActive } = req.body;
        // 创建新项目
        const newProject = new Projects({ name, description, startDate, endDate, budget, members, order, customer, isActive });

        // 保存到数据库
        await newProject.save();

        res.status(201).json(newProject); // 返回创建的项目数据
    } catch (err) {
        console.error('保存项目出错:', err);
        res.status(500).send('保存项目出错');
    }
});

// 获取所有项目
router.get('/getAllProjects', async (req, res) => {
    try {
        c
    } catch (err) {
        console.error('获取项目列表出错:', err);
        res.status(500).send('获取项目列表出错');
    }
});

// 获取单个项目
router.get('/getProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Projects.findById(projectId).exec();
        if (!project) {
            return res.status(404).send('未找到项目');
        }
        res.json(project);
    } catch (err) {
        console.error('获取项目详情出错:', err);
        res.status(500).send('获取项目详情出错');
    }
});

// 更新项目
router.post('/updateProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { name, description, startDate, endDate, budget, members, order, customer, isActive } = req.body
    try {
        const updatedProject = await Projects.findByIdAndUpdate(projectId, { name, description, startDate, endDate, budget, members, order, customer, isActive }, { new: true }).exec();
        if (!updatedProject) {
            return res.status(404).send('未找到要更新的项目');
        }
        res.json(updatedProject);
    } catch (err) {
        console.error('更新项目出错:', err);
        res.status(500).send('更新项目出错');
    }
});

// 删除项目
router.post('/deleteProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const deletedProject = await Projects.findByIdAndDelete(projectId).exec();
        if (!deletedProject) {
            return res.status(404).send('未找到要删除的项目');
        }
        res.json({ message: '项目删除成功' });
    } catch (err) {
        console.error('删除项目出错:', err);
        res.status(500).send('删除项目出错');
    }
});
module.exports = router
