<template>
    <div>
        <myTable
            class="mt-20"
            :tableData="tableData"
            :tableColumn="[
                { label: '信息', prop: 'name' ,slot:true,name:'name',width:350},
                { label: '手机号', prop: 'name'},
            ]"
            v-model:pageNum="queryPages.pageNum"
            v-model:pageSize="queryPages.pageSize"
            :total="total"
            
            @changePage="getList"
        >
            <!-- 商务信息 -->
            <template #name="row">
                <div class="flex items-center">
                    <img class="wh-40" :src="row.avatar" />
                    <div class="ml-10 t-l">
                        <div class="text-14 c-000 w-200 text-ellipsis">{{ row.name }}的预告东亚怪物的娃大为的的</div>
                        <div class="text-12 c-6B6B86">{{ row.phone }}</div>
                    </div>
                </div>
            </template>
            <template #operation="row">
                <el-button type="primary"  @click="readDetail(row)">查看</el-button>
            </template>
        </myTable>
    </div>
    <h3>以下是示例代码</h3>
    <div v-html="content"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { marked } from 'marked';
// 引入 GitHub 风格样式
import 'github-markdown-css'; 


const queryPages = ref({
    pageNum: 1,
    pageSize: 10,
})
const total = ref(0)
const tableData = ref([
    {name: '张三', phone: '123456789', avatar: 'https://img2.baidu.com/it/u=3368769162,4238378153&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'},
])

const getList = () => {
    
}


const readDetail = (row: any) => {
    
}

const content = marked.parse(`
    
    这是示例，后续如果要使用可以直接复制，会方便很多，基本上必要的都在这了
    <myTable
        class="mt-20"
        :tableData="tableData"
        :tableColumn="[
            { label: '信息', prop: 'name' ,slot:true,name:'name',width:350},
            { label: '手机号', prop: 'name'},
        ]"
        v-model:pageNum="queryPages.pageNum"
        v-model:pageSize="queryPages.pageSize"
        :total="total"
        @changePage="getList"
    >
        <!-- 商务信息 -->
        <template #name="row">
            <div class="flex items-center">
                <img class="wh-40" :src="row.avatar" />
                <div class="ml-10 ta-l">
                    <div class="text-14 c-000 w-200 text-ellipsis">{{ row.name }}的预告东亚怪物的娃大为的的</div>
                    <div class="text-12 c-6B6B86">{{ row.phone }}</div>
                </div>
            </div>
        </template>
        <template #operation="row">
            <el-button type="primary"  @click="readDetail(row)">查看明细</el-button>
        </template>
    </myTable>

`)
</script>

<style scoped>

</style>