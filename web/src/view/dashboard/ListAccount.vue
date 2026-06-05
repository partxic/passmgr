<script setup>
import AccountEditor from '@/components/AccountEditor.vue'
import AccountViewer from '@/components/AccountViewer.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useWindowSize } from '@vueuse/core'

const { width: windowWidth } = useWindowSize()
const isSmallWidth = computed(() => windowWidth.value <= 768)

const loading = ref(false)
const accounts = ref([])

const filter = ref('')
const filteredAccounts = computed(() => {
    if (!filter.value.trim()) return accounts.value
    const keyword = filter.value.toLowerCase()
    return accounts.value.filter(account => account.toLowerCase().includes(keyword))
})

const showDialog = ref(false)
const showConfirm = ref(false)
const inEdit = ref(false)
const accountData = reactive({
    name: '',
    username: '',
    password: '',
    totp: '',
    note: ''
})

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

const showAccount = async account => {
    try {
        loading.value = true
        const res = await axios.get(`/api/account/info?name=${account}`)

        Object.assign(accountData, { name: account, ...res.data })
        inEdit.value = false
        showConfirm.value = false
        showDialog.value = true
        ElMessage.success('信息获取成功')
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

const updateAccount = async () => {
    try {
        loading.value = true
        const res = await axios.post('/api/account/set', accountData)

        inEdit.value = false
        ElMessage.success(res.data)
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

const deleteAccount = async () => {
    try {
        loading.value = true
        const res = await axios.get(`/api/account/delete?name=${accountData.name}`)

        showConfirm.value = false
        showDialog.value = false
        ElMessage.success(res.data)
        await refresh()
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

onMounted(refresh)
</script>

<template>
    <div class="align-center">
        <el-button type="primary" :loading="loading" @click="refresh">刷新</el-button>
        <div class="flex-1" />
        <el-input v-model="filter" style="width: 240px" placeholder="搜索" clearable />
    </div>
    <div class="account-list">
        <el-button v-for="account in filteredAccounts" @click="showAccount(account)" class="account-item" plain>{{ account }}</el-button>
    </div>
    <el-dialog v-model="showDialog" :width="isSmallWidth ? '90%' : '500px'" align-center>
        <template #header>
            <div class="align-center">
                <span>账号详情</span>
                <div class="flex-1" />
                <el-switch v-model="inEdit" />
                <span>编辑</span>
                <div class="flex-1" />
                <el-button :loading="loading" type="danger" @click="showConfirm = true">删除</el-button>
            </div>
        </template>
        <AccountEditor v-if="inEdit" :data="accountData" :loading="loading" @save="updateAccount" @cancel="showDialog = false" />
        <AccountViewer v-else :data="accountData" />
        <el-dialog v-model="showConfirm" align-center center :show-close="false">
            <template #header>
                <el-text type="danger" size="large">确定删除 {{ accountData.name }} 吗?</el-text>
            </template>
            <div class="flex-center">
                <el-button :loading="loading" @click="showConfirm = false">取消</el-button>
                <el-button :loading="loading" type="danger" @click="deleteAccount">确定</el-button>
            </div>
        </el-dialog>
    </el-dialog>
</template>

<style scoped>
.align-center {
    display: flex;
    align-items: center;
    column-gap: 5px;
}

.account-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    column-gap: 10px;
}

.account-item {
    margin: 10px 0;
    height: 60px;
}
</style>
