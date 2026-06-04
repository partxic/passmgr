<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    data: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
})

defineEmits(['save', 'cancel'])
</script>

<template>
    <el-form label-width="auto" style="max-width: 600px">
        <el-form-item label="名称">
            <el-input v-model="data.name" />
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="data.username" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="data.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="TOTP 密钥">
            <el-input v-model="data.totp" placeholder="可选" />
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="data.note" type="textarea" placeholder="可选" />
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" @click="$emit('cancel')">取消</el-button>
            <el-button :loading="loading" type="primary" @click="$emit('save')">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>
