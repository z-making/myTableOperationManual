<template>
    <div class="main-layout">
        <Header />
        <div v-if="environment === 'admin'" class="flex">
            <Aside />
            <div class="">
                <router-view></router-view>
            </div>
        </div>
        <div v-if="environment === 'web'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';

const environment = ref('web') // 分后台管理端和web端。admin 后端管理端 web 网页端


</script>

<style scoped lang="scss">

</style>