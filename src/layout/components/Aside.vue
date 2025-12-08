<template>
    <div class="w-200">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
        >   
            <template v-for="(item,index) in menuList" :key="index">
                <el-sub-menu v-if="!item.meta?.hideChildren" :index="index">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>{{ item.meta?.title }}</span>
                    </template>
                    <el-menu-item v-for="(childItem,childIndex ) in item.children" :index="index + '-' + childIndex" @click="router.push(childItem.path)">
                        <el-icon><location /></el-icon>
                        <span>{{ childItem.meta?.title }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="index" @click="router.push(item.path)">
                    <el-icon><icon-menu /></el-icon>
                    <span>{{ item.meta?.title }}</span>
                </el-menu-item>
            </template>
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
    return routes.options.routes.filter(i=> i.meta?.hideNav === true);
})

</script>
<style scoped lang="scss">
::v-deep .el-menu {
    border-right: none;
}
</style>