<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const loading = ref(false)
const accounts = ref([])

const refresh = async () => {
    try {
        loading.value = true
        const res = await axios.get('/api/account/list')

        accounts.value = res.data
        ElMessage.success('数据获取成功')
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

onMounted(refresh)
</script>

<template>
    <div class="top">
        <el-button type="primary" :loading="loading" @click="refresh">刷新</el-button>
    </div>
</template>

<style scoped>
.top {
    display: flex;
    align-items: center;
}
</style>
