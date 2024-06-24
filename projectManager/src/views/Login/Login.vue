<template>
<div class="login">
    <div class="form">
        <el-form :model="form" label-width="120px">
            <el-form-item label="用户手机号">
                <el-input v-model="form.phone"
                          placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
                <el-input v-model="form.password"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from "vuex";
import router from "@/router/index.js";

const store = useStore()

const form = ref({
    phone: '13812345678',
    password: '123456'
})
function login() {
    store.dispatch('user/login', form.value).then(() => {
        router.push('/home')
    })
}
</script>

<style lang="stylus" scoped>
.login
    display flex
    justify-content center
    align-items center
    height: 100%
    width: 100%
    background-image: url('@/assets/images/login_bg.jpg')
    .form
        background-color: #fff
        -webkit-border-radius: 8px
        -moz-border-radius: 8px
        border-radius: 8px
        padding: 40px 40px 20px 20px
</style>
