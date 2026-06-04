<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import AccountEditor from '@/components/AccountEditor.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const data = reactive({
    name: '',
    username: '',
    password: '',
    totp: '',
    note: ''
})

const saveAccount = async () => {
    try {
        loading.value = true
        const res = await axios.post(`/api/account/set`, data)
        ElMessage.success(res.data)
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

const goAccountList = () => {
    router.push({ name: 'dash-list-account' })
}
</script>

<template>
    <AccountEditor :data="data" :loading="loading" @save="saveAccount" @cancel="goAccountList" />
</template>

<style scoped></style>
