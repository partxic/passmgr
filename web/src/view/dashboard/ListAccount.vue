<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const loading = ref(false)
const accounts = ref([])

const filter = ref('')
const filteredAccounts = computed(() => {
    if (!filter.value.trim()) return accounts.value
    const keyword = filter.value.toLowerCase()
    return accounts.value.filter(account => account.toLowerCase().includes(keyword))
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
    console.log(account)
}

onMounted(refresh)
</script>

<template>
    <div class="top">
        <el-button type="primary" :loading="loading" @click="refresh">刷新</el-button>
        <div style="flex: 1" />
        <el-input v-model="filter" style="width: 240px" placeholder="搜索" clearable />
    </div>
    <div class="account-list">
        <el-button v-for="account in filteredAccounts" @click="showAccount(account)" class="account-item" plain>{{ account }}</el-button>
    </div>
</template>

<style scoped>
.top {
    display: flex;
    align-items: center;
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
