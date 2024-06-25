const express = require('express');
const router = express.Router();
const { Projects } = require('../models');

// 创建项目
router.post('/createProject', async (req, res) => {
    try {
        const { name, description, startDate, endDate, budget, members, order, customer, isActive, steps, activeStep} = req.body;
        // 创建新项目
        const newProject = new Projects({ name, description, startDate, endDate, budget, members, order, customer, isActive, steps, activeStep });

        // 保存到数据库
        await newProject.save();

        res.status(201).json({ message: '项目创建成功', project: newProject }); // 返回创建的项目数据
    } catch (err) {
        console.error('保存项目出错:', err);
        res.status(500).json({ message: '保存项目出错' });
    }
});

// 获取所有项目
router.get('/getAllProjects', async (req, res) => {
    try {
        const projects = await Projects.find().exec();
        res.json({ message: '查询成功', projects });
    } catch (err) {
        console.error('获取项目列表出错:', err);
        res.status(500).json({ message: '获取项目列表出错' });
    }
});

// 获取单个项目
router.get('/getProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Projects.findById(projectId).exec();
        if (!project) {
            return res.status(404).json({ message: '未找到项目' });
        }
        res.json({ message: '项目获取成功', project });
    } catch (err) {
        console.error('获取项目详情出错:', err);
        res.status(500).json({ message: '获取项目详情出错' });
    }
});

// 更新项目
router.post('/updateProject/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { name, description, startDate, endDate, budget, members, order, customer, isActive, steps, activeStep } = req.body;
    try {
        const updatedProject = await Projects.findByIdAndUpdate(projectId, { name, description, startDate, endDate, budget, members, order, customer, isActive, steps, activeStep }, { new: true }).exec();
        if (!updatedProject) {
            return res.status(404).json({ message: '未找到要更新的项目' });
        }
        res.json({ message: '项目更新成功', project: updatedProject });
    } catch (err) {
        console.error('更新项目出错:', err);
        res.status(500).json({ message: '更新项目出错' });
    }
});

// 删除项目


module.exports = router;
