<template>
  <div class="markdown-body" style="padding: 20px">
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import 'github-markdown-css'

const content = marked.parse(`
# 基础用法

本章节介绍 myTable 组件的各种基础功能和列类型配置。

## 普通文本列

最基础的列类型，直接显示数据字段的值。

### 示例

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="[
    { label: '姓名', prop: 'name' },
    { label: '年龄', prop: 'age' },
    { label: '地址', prop: 'address' }
  ]"
/>
\`\`\`

### 列对齐

通过 \`align\` 属性设置列的对齐方式：

\`\`\`vue
:tableColumn="[
  { label: '姓名', prop: 'name', align: 'left' },
  { label: '金额', prop: 'amount', align: 'right' },
  { label: '状态', prop: 'status', align: 'center' }
]"
\`\`\`

### 列宽设置

通过 \`width\` 属性设置固定列宽：

\`\`\`vue
:tableColumn="[
  { label: '姓名', prop: 'name', width: 200 },
  { label: '手机号', prop: 'phone', width: 150 }
]"
\`\`\`

## 图片列

显示图片，支持预览功能。

### 基础用法

\`\`\`vue
:tableColumn="[
  { label: '头像', prop: 'avatar', img: true }
]"
\`\`\`

### 自定义图片尺寸

通过组件的 \`imgWidth\` 和 \`imgHeight\` 属性设置图片尺寸：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="[
    { label: '商品图', prop: 'productImage', img: true }
  ]"
  imgWidth="80px"
  imgHeight="80px"
/>
\`\`\`

### 图片预览列表

支持设置预览图片列表：

\`\`\`vue
:tableColumn="[
  { 
    label: '商品图', 
    prop: 'mainImage', 
    img: true,
    list: ['image1.jpg', 'image2.jpg', 'image3.jpg']
  }
]"
\`\`\`

## 标签列

使用 Element Plus Tag 组件显示状态标签。

### 基础用法

\`\`\`vue
:tableColumn="[
  {
    label: '状态',
    prop: 'status',
    tag: true,
    statusObj: {
      1: { text: '正常', type: 'success' },
      2: { text: '禁用', type: 'danger' },
      3: { text: '待审核', type: 'warning' }
    }
  }
]"
\`\`\`

### 支持的标签类型

- \`success\` - 绿色（成功）
- \`primary\` - 蓝色（主要）
- \`warning\` - 黄色（警告）
- \`danger\` - 红色（危险）
- \`info\` - 灰色（信息）

## 判断文本列

根据数据值显示不同的文本，无需标签样式。

\`\`\`vue
:tableColumn="[
  {
    label: '性别',
    prop: 'gender',
    pan: true,
    statusObj: {
      1: '男',
      2: '女'
    }
  }
]"
\`\`\`

## 插槽列

自定义列内容，适用于复杂的展示需求。

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="[
    { label: '用户信息', prop: 'userInfo', slot: true, name: 'userInfo' }
  ]"
>
  <template #userInfo="row">
    <div class="flex items-center">
      <img :src="row.avatar" style="width: 40px; height: 40px; border-radius: 50%;" />
      <div style="margin-left: 10px;">
        <div>{{ row.name }}</div>
        <div style="color: #999; font-size: 12px;">{{ row.phone }}</div>
      </div>
    </div>
  </template>
</myTable>
\`\`\`

## 表格索引

显示行号：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :tableColumnIndex="true"
/>
\`\`\`

## 多选功能

启用行选择功能：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :selection="true"
  v-model:select="selectedRows"
  @tableSelect="handleSelect"
/>
\`\`\`

\`\`\`javascript
const selectedRows = ref([])

const handleSelect = (selection, row) => {
  console.log('已选择的行:', selection)
}
\`\`\`

## 固定列

通过 \`fixed\` 属性固定列：

\`\`\`vue
:tableColumn="[
  { label: '姓名', prop: 'name', fixed: 'left' },
  { label: '地址', prop: 'address' },
  { label: '操作', prop: 'action', fixed: 'right', slot: true, name: 'action' }
]"
\`\`\`

## 文本装饰

### 添加图标

\`\`\`vue
:tableColumn="[
  { label: '金额', prop: 'amount', leftIcon: '¥' },
  { label: '百分比', prop: 'percent', rightIcon: '%' }
]"
\`\`\`

### 自定义颜色

\`\`\`vue
:tableColumn="[
  { label: '收入', prop: 'income', color: '#67C23A' },
  { label: '支出', prop: 'expense', color: '#F56C6C' }
]"
\`\`\`

### 空值处理

当数据为空时显示默认文本：

\`\`\`vue
:tableColumn="[
  { label: '备注', prop: 'remark', or: '-' }
]"
\`\`\`

## 表头工具提示

为表头添加提示信息：

\`\`\`vue
:tableColumn="[
  {
    label: '评分',
    prop: 'score',
    tooltipIcon: 'QuestionFilled',
    tooltipContent: '评分范围：0-100分'
  }
]"
\`\`\`

> **注意**：需要从 \`@element-plus/icons-vue\` 导入图标组件

`)
</script>

<style scoped>
.markdown-body {
  max-width: 100%;
  margin: 0 auto;
}
</style>
