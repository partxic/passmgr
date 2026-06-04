<script setup>
document.title = '管理面板'

import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeName = computed(() => (route.name === 'dashboard' ? 'dash-list-account' : route.name))

const onTabChange = paneName => {
    router.push({ name: paneName })
}

onMounted(() => {
    if (route.name === 'dashboard') {
        router.push({ name: 'dash-list-account' })
    }
})
</script>

<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-change="onTabChange">
            <el-tab-pane label="账号列表" name="dash-list-account" />
            <el-tab-pane label="添加账号" name="dash-account-create" />
        </el-tabs>
        <router-view />
    </div>
</template>

<style scoped>
.container {
    padding: 10px;
}
</style>
