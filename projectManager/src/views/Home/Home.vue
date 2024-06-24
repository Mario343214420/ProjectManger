<template>
<div class="home">
    home
</div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import { useStore } from "vuex";
import router from "@/router/index.js";
const store = useStore();
onMounted(() => {
    store.dispatch('projects/getAllProjects').then(() => {
        router.push('/home')
    })
})
</script>

<style scoped>

</style>
