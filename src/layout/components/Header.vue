<template>
    <div class="h-80 flex align-center justify-between p-0-20 border-s">
        <div class="logo t-40 tw-800">myTable</div>
        <div class="flex-1"></div>
        <el-dropdown>
            <div class="flex align-center cp">
                <img class="wh-50 br-b50" src="@/assets/images/title.png" alt="">
                <div class="t-20 pl-5">这是我的名字</div>
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu style="width: 10rem;">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'

</script>

<style scoped lang="scss">

</style>