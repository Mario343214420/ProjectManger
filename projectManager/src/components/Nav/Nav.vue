<template>
<div class="nav">
欢迎登录！{{user.name}}，本日：{{date}}，请填写{{weekRange[0]}}至{{weekRange[1]}}工作内容。
</div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => store.state.user.user);
const date = computed(() => {
    const d = new Date()
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
});

let weekRange = ref([])

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function getWeekDays() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 当前星期几（0代表星期日，1代表星期一，...）
    const diffToMonday = (dayOfWeek + 6) % 7; // 计算当前日期与本周一相差的天数
    const monday = new Date(today); // 创建一个新日期对象，避免修改原始日期
    monday.setDate(today.getDate() - diffToMonday); // 设置为本周一

    // 生成从周一到周五的日期
    const weekDays = [];
    for (let i = 0; i < 5; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        weekDays.push(formatDate(day));
    }

    return weekDays;
}
const ws = getWeekDays()
weekRange.value.push(ws[0])
weekRange.value.push(ws[4])
</script>

<style lang="stylus" scoped>
.nav
  height: 50px
</style>
