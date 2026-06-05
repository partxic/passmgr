<script setup>
import { defineProps } from 'vue'
import ShowPassword from '@/components/ShowPassword.vue'
import ShowTotp from '@/components/ShowTotp.vue'

const props = defineProps({ data: { type: Object, required: true } })
const data = JSON.parse(JSON.stringify(props.data))
</script>

<template>
    <el-card>
        <template #header>
            <el-text type="primary" size="large">{{ data.name }}</el-text>
        </template>
        <div class="item">
            <el-text size="large">用户名</el-text>
            <div class="flex-1" />
            <el-text type="info" size="large">{{ data.username }}</el-text>
        </div>
        <div class="item">
            <el-text size="large">密码</el-text>
            <ShowPassword class="flex-1" :value="data.password" />
        </div>
        <div class="item">
            <el-text size="large">一次性密码</el-text>
            <div class="flex-1" />
            <el-text size="large">
                <ShowTotp :secret="data.totp" />
            </el-text>
        </div>
        <div class="item">
            <el-text size="large">备注</el-text>
            <div class="flex-1" />
            <el-text type="info" size="large">
                <pre style="margin: 0">{{ data.note }}</pre>
            </el-text>
        </div>
    </el-card>
</template>

<style scoped>
.item {
    display: flex;
    align-items: center;
}
</style>
