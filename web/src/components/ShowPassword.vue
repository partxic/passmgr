<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({ value: { type: String, required: true } })
const value = ref(props.value)
</script>

<template>
    <el-input class="el-password" v-model="value" type="password" show-password readonly />
</template>

<style scoped>
.el-password {
    width: 60%;
}

.el-password :deep(.el-input__wrapper) {
    padding: 0;
    box-shadow: none;
}

.el-password :deep(.el-input__inner) {
    cursor: default;
    text-align: right;
}
</style>
