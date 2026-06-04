<script setup>
document.title = '管理面板'

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const loading = ref(false)
const router = useRouter()
const route = useRoute()
const activeName = computed(() => (route.name === 'dashboard' ? 'dash-list-account' : route.name))

const doLogout = async () => {
    try {
        loading.value = true
        const res = await axios.get('/api/auth/logout')
        ElMessage.success(res.data)
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
        router.push({ name: 'login' })
    }
}

const onTabChange = paneName => {
    if (paneName === 'logout') return doLogout()
    router.push({ name: paneName })
}

onMounted(() => {
    if (route.name === 'dashboard') {
        router.push({ name: 'dash-list-account' })
    }
})
</script>

<template>
    <div v-loading="loading" class="container">
        <el-tabs v-model="activeName" @tab-change="onTabChange">
            <el-tab-pane label="账号列表" name="dash-list-account" />
            <el-tab-pane label="添加账号" name="dash-account-create" />
            <el-tab-pane label="退出登录" name="logout" />
        </el-tabs>
        <router-view />
    </div>
</template>

<style scoped>
.container {
    padding: 10px;
}
</style>
