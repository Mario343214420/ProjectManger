<template>
<div>
    <div class="handle-wrapper">
        <el-button type="primary" @click="addProject">添加项目</el-button>
    </div>
    <div class="table-wrapper">
        <el-table
            :data="projects"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="项目名">
            </el-table-column>
            <el-table-column
                prop="order"
                label="项目负责人">
            </el-table-column>
            <el-table-column
                prop="customer"
                label="客户">
            </el-table-column>
            <el-table-column
                prop="description"
                label="项目描述">
            </el-table-column>
            <el-table-column
                prop="members"
                label="项目成员">
                <template #default="scope">
                    <el-tag v-for="(member, index) in scope.row.members">{{ member }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="startDate"
                width="160"
                label="开始时间">
                <template #default="scope">
                    <el-date-picker
                        style="width: 140px"
                        v-model="scope.row.startDate"
                        type="date"
                        placeholder="Pick a day"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="endDate"
                width="160"
                label="结束时间">
                <template #default="scope">
                    <el-date-picker
                        style="width: 140px"
                        v-model="scope.row.endDate"
                        type="date"
                        placeholder="Pick a day"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="steps"
                width="500"
                label="项目阶段">
                <template #default="scope">
                    <el-steps style="max-width: 600px" :active="scope.row.activeStep" finish-status="success">
                        <el-step v-for="(step, index) in scope.row.steps" :key="index" :title="step" />
                    </el-steps>
                </template>
            </el-table-column>
            <el-table-column width="160" label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popconfirm title="请确认是否删除该项目?">
                        <template #reference>
                            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        v-model="newProFlag"
        title="创建项目"
        width="800">
        <el-form label-width="auto">
            <el-form-item label="项目名">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description" />
            </el-form-item>
            <el-form-item label="项目额">
                <el-input v-model="form.budget" />
            </el-form-item>
            <el-form-item label="项目成员">
                <MultipleInput :tags="form.members"
                               @update:tags="handleUpdateMembers"></MultipleInput>
            </el-form-item>
            <el-form-item label="项目管理者">
                <el-input v-model="form.order" />
            </el-form-item>
            <el-form-item label="客户">
                <el-input v-model="form.customer" />
            </el-form-item>
            <el-form-item label="项目阶段">
                <MultipleInput :tags="form.steps"
                               @update:tags="handleUpdateSteps"></MultipleInput>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker
                    v-model="form.startDate"
                    type="date"
                    placeholder="Pick a day"
                />
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker
                    v-model="form.endDate"
                    type="date"
                    placeholder="Pick a day"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelCreate">取消</el-button>
                <el-button type="primary" @click="submitCreate">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { useStore } from "vuex";
import router from "@/router/index.js";
const store = useStore();
const projects = computed(() => store.state.projects.projects);
import MultipleInput from "@/components/MultipleInput/MultipleInput.vue";
import {deleteProject} from "@/api/index.js";
onMounted(() => {
    store.dispatch('projects/getAllProjects')
})
// 项目信息
const form = ref({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    members: [],
    order: '',
    customer: '',
    steps: []
})
// 新项目 flag
const newProFlag = ref(false);
function addProject() {
    newProFlag.value = true
}
function cancelCreate() {
    newProFlag.value = false
}
function submitCreate() {
    newProFlag.value = false
    store.dispatch('projects/createNewProject', form.value).then(() => {})
}
function handleUpdateMembers(newMembers) {
    form.value.members = newMembers
}
function handleUpdateSteps(newSteps) {
    form.value.steps = newSteps
}
function handleEdit(i, row) {
    console.log(i, row);
}
function handleDelete(i, row) {
    store.dispatch('projects/deleteProjectFromList', {projectId: row._id}).then(() => {})
}

</script>

<style lang="stylus" scoped>
.handle-wrapper
    padding: 20px 20px 0 20px
    box-sizing border-box
.table-wrapper
    padding: 20px
    box-sizing border-box
</style>
