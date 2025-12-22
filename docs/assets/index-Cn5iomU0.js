import{d as a}from"./github-markdown-CBpekFFP.js";import{d as t,c as o,a as l,u as n,o as s,_ as p}from"./index-BRNeSY6H.js";const m={class:"markdown-body",style:{padding:"20px"}},r=["innerHTML"],c=t({__name:"index",setup(u){const e=a.parse(`
# myTable 组件使用文档

## 介绍

**myTable** 是一个基于 Element Plus Table 封装的高级表格组件，旨在简化表格开发，提供更加灵活和强大的功能。

### 特性

- 📦 **开箱即用** - 已全局注册，无需重复引入
- 🎨 **灵活配置** - 支持多种列类型（插槽、图片、标签、输入框等）
- 🔄 **双向绑定** - 分页参数自动同步
- 🎯 **自定义排序** - 内置智能排序算法
- 🌈 **行样式定制** - 支持条件行高亮
- 📱 **响应式设计** - 自适应不同屏幕尺寸

## 快速开始

### 基础使用

最简单的表格只需要传入 \`tableData\` 和 \`tableColumn\` 两个参数：

\`\`\`vue
<template>
  <myTable
    :tableData="tableData"
    :tableColumn="tableColumn"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 18, phone: '13800138000' },
  { name: '李四', age: 22, phone: '13900139000' }
])

const tableColumn = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '手机号', prop: 'phone' }
]
<\/script>
\`\`\`

### 带分页的表格

添加分页功能，使用 \`v-model\` 双向绑定页码和每页数量：

\`\`\`vue
<template>
  <myTable
    :tableData="tableData"
    :tableColumn="tableColumn"
    v-model:pageNum="pageNum"
    v-model:pageSize="pageSize"
    :total="total"
    @changePage="handlePageChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handlePageChange = () => {
  console.log('当前页:', pageNum.value)
  console.log('每页数量:', pageSize.value)
  // 调用接口获取数据
}
<\/script>
\`\`\`

## 下一步

- [基础用法](/course/basic) - 了解各种列类型的配置
- [进阶功能](/course/advanced) - 探索高级特性
- [API 文档](/course/api) - 查看完整的 API 参考
- [完整示例](/example) - 查看实际应用案例

`);return(i,d)=>(s(),o("div",m,[l("div",{innerHTML:n(e)},null,8,r)]))}}),_=p(c,[["__scopeId","data-v-0e220e2c"]]);export{_ as default};
