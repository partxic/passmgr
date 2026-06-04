<script setup>
import AccountEditor from '@/components/AccountEditor.vue'
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Plus, Refresh } from '@element-plus/icons-vue'

const account = reactive({
    showInfo: false,
    inEdit: false,
    inLoading: false,
    names: [],

    data: {
        name: '',
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

const saveAccount = async () => {
    try {
        account.inLoading = true
        const res = await axios.post(`/api/account/set?name=${account.data.name}`, account.data)

        ElMessage.success(res.data)
        account.inEdit = false
        await refresh()
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        account.inLoading = false
    }
}

onMounted(refresh)
</script>

<template>
    <div class="top-button">
        <el-button :loading="account.inLoading" :icon="Plus" @click="account.inEdit = true" circle />
        <el-button :loading="account.inLoading" :icon="Refresh" @click="refresh" circle />
    </div>
    <el-dialog v-model="account.inEdit">
        <template #header>
            <span>账号编辑器</span>
        </template>
        <AccountEditor :data="account.data" :loading="account.inLoading" @save="saveAccount" @cancel="account.inEdit = false" />
    </el-dialog>
</template>

<style scoped>
.top-button {
    display: flex;
    align-items: center;
}
</style>
