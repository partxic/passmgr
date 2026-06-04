<script setup>
import { ref, defineModel, onMounted, computed } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const isOk = defineModel({ type: Boolean, default: false })
const isLoading = ref(false)
const dialogVisible = computed(() => !isOk.value)

const validate = async () => {
    try {
        isLoading.value = true
        const res = await axios.get('/api/status')

        ElMessage.success(res.data)
        isOk.value = true
    } catch (error) {
        ElMessage.error(error.response.data)
        isOk.value = false
    } finally {
        isLoading.value = false
    }
}

onMounted(validate)
</script>

<template>
    <el-dialog v-model="dialogVisible" align-center :show-close="false" :before-close="_ => {}">
        <div class="container">
            <el-button :loading="isLoading" @click="validate">验证后端配置</el-button>
        </div>
    </el-dialog>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}
</style>
