<template>
<div>
    projectManage
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
    </el-table>
</div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { useStore } from "vuex";
import router from "@/router/index.js";
const store = useStore();
const projects = computed(() => store.state.projects.projects);
onMounted(() => {
    store.dispatch('projects/getAllProjects').then(() => {
        console.log(projects);
    })
})
</script>

<style scoped>

</style>
