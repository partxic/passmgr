<script setup>
document.title = '加载中...'

import { ref, watch } from 'vue'
import BackendValidator from '@/components/BackendValidator.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const backendOK = ref(false)
const router = useRouter()

watch(backendOK, async isok => {
    if (!isok) return

    try {
        const res = await axios.get('/api/auth/status')

        ElMessage.success(res.data)
        router.push({ name: 'dashboard' })
    } catch (error) {
        ElMessage.error(error.response.data)
        router.push({ name: 'login' })
    }
})
</script>

<template>
    <BackendValidator v-model="backendOK" />
    <router-view v-if="backendOK" />
</template>

<style scoped></style>
