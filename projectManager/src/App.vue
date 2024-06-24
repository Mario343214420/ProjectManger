<script setup>
import Nav from '@/components/Nav/Nav.vue'
import router from "@/router/index.js";
</script>

<template>
    <div class="app-container">
        <Nav v-if="router.currentRoute.value.path !== '/login'"/>
        <RouterView />
    </div>
</template>

<style lang="stylus" scoped>
.app-container
    height: 100%
    width: 100%
</style>
