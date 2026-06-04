<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const account = reactive({
    showInfo: false,
    inEdit: false,
    inLoading: false,
    names: [],

    data: {
        username: '',
        password: '',
        totp: '',
        note: ''
    }
})

const refresh = async () => {
    try {
        account.inLoading = true
        const res = await axios.get('/api/account/list')

        account.names = res.data
        ElMessage.success('数据请求成功')
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        account.inLoading = false
    }
}

onMounted(refresh)
</script>

<template></template>

<style scoped></style>
