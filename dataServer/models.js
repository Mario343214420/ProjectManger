const mongoose = require('mongoose')

// 项目模型
const ProjectSchema = new mongoose.Schema({
    name: String, // 项目名
    description: String, // 描述
    startDate: Date, // 开始时间
    endDate: Date, // 结束时间
    budget: Number, // 项目额
    members: Array, // 项目成员
    order: String, // 项目管理者
    customer: String, // 客户
    steps: Array, // 项目阶段
    activeStep: Number, // 当前阶段
    isActive: { type: Boolean, default: true }, // 活跃状态
})
// 工作模型
const WorkSchema = new mongoose.Schema({
    projectId: String,
    step: String,
    task: String,
    surplus: String,
    startDate: Date, // 开始时间
    endDate: Date, // 结束时间
    worker: String
})
// 工作者模型
const WorkerSchema = new mongoose.Schema({
    name: String,
    place: String,
    password: String,
    phone: Number,
    birth: Date,
    onWork: { type: Number, default: 1 }
})

const Projects = mongoose.model('projects', ProjectSchema)
const Works = mongoose.model('works', WorkSchema)
const Workers = mongoose.model('workers', WorkerSchema)

module.exports = { Projects, Works, Workers };
