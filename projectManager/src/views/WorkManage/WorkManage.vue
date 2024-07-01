<template>
<div class="work-manage">
    work-manage
    <div class="handle-wrapper">
        <el-button type="primary" @click="addWork">添加工作内容</el-button>
    </div>
    <div class="table-wrapper">
        <el-table
            :data="works"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="项目名">
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import store from "@/store/index.js";

const works = ref([])

onMounted(() => {
    console.log(1);
    store.dispatch('user/getAllWorks')
})
</script>

<style scoped>

</style>
