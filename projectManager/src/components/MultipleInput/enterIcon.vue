<template>
    <i :class="['iconfont', iconClass]"></i>
</template>

<script setup>
import { defineProps } from 'vue'
import '@/assets/iconfont/iconfont.css'
const props = defineProps({
    iconClass: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px; /* 根据需要调整图标大小 */
    line-height: 1;
}
</style>
