<template>
    <div class="wb-10">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
        >
            <el-sub-menu v-for="(item,index) in menuList" :index="index">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>{{ item.meta?.title }}</span>
                </template>
                <el-menu-item v-for="(childItem,childIndex ) in item.children" :index="index + '-' + childIndex" @click="router.push(childItem.path)">
                    <el-icon><location /></el-icon>
                    <span>{{ childItem.meta?.title }}</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
    
</template>

<script setup lang="ts">
import { onMounted , computed  } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import routes from '@/router';
import { useRouter } from 'vue-router';
const router = useRouter();

const menuList = computed(() => {
    return routes.options.routes.filter(i=> i.path === '/');
})

</script>

<style scoped lang="scss">

</style>