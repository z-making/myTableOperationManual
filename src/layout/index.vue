<template>
    <div class="main-layout">
        <Header />
        <div v-if="environment === 'admin'" class="flex">
            <Aside />
            <div class="flex-1">
                <div class="flex align-center h-50 gap-10 tabs">
                    <el-tag
                        v-for="(tag,index) in tabs"
                        :key="tag"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(index)"
                    >
                        <span class="cp" @click="toPage(tag)">{{ tag.meta?.title }}</span>
                    </el-tag>
                </div>
                <router-view></router-view>
            </div>
        </div>
        <div v-if="environment === 'web'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref , watch } from 'vue'
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const environment = ref('admin') // 分后台管理端和web端, admin 后端管理端 web 网页端

const tabs:any = ref([])

// 关闭标签
const handleClose = (index: number) => {
    tabs.value.splice(index, 1)
}

// 跳转页面
const toPage = (tag: any) => {
    router.push(tag.path)
}

watch(
    () => route.path,
    (newVal) => {
        // 判断是否已经存在
        if(!tabs.value.some((i:any) => i.path === newVal)) {
            // 没有存在就添加进去
            tabs.value.push(JSON.parse(JSON.stringify(route)))
        }
    }
)


</script>

<style scoped lang="scss">
.tabs{
    overflow-x: auto;
}
</style>