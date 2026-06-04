<script setup>
document.title = '管理面板'

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const activeName = ref('')
const router = useRouter()
const route = useRoute()

const handleClick = (tab, _) => {
    router.push({ name: tab.paneName })
}

onMounted(() => {
    activeName.value = route.name
})
</script>

<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
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
