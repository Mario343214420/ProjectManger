// 请求模块
import ajax from './ajax'

const baseUrl = '/api'
// 管理端登录
export const loginIn = (params) => ajax(`${baseUrl}/workers/login`, params, 'POST')
// 查询用户列表
export const getUserList = (params) => ajax(`${''}/getAllWorkers`, params, 'GET')
// 查询项目列表
export const getProjectsList = (params) => ajax(`${baseUrl}/projects/getAllProjects`, {},'GET')
// 创建项目
export const createProject = (params) => ajax(`${baseUrl}/projects/createProject`, params, 'POST')
// 删除项目
export const deleteProject = (params) => ajax(`${baseUrl}/projects/deleteProject/${params.projectId}`, params, 'POST')
// 根据人查询工作
export const getWorkList = (params) => ajax(`${baseUrl}/works/getWorksByWorker/${params.workerName}`, {}, 'GET')
