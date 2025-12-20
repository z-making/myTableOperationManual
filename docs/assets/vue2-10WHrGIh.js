import{d as t}from"./github-markdown-CBpekFFP.js";import{d as a,c as l,a as o,u as n,o as r,_ as s}from"./index-CpMPxPWm.js";const u={class:"markdown-body",style:{padding:"20px"}},i=["innerHTML"],p=a({__name:"vue2",setup(c){const e=t.parse(`
# Vue 2 版本使用文档

myTableVue2 是专为 Vue 2 + Element UI 项目设计的通用表格组件。

## 安装使用

### 引入组件

\`\`\`javascript
// 在需要使用的页面引入
import myTable from '@/components/myTableVue2.vue'

export default {
  components: { myTable }
}
\`\`\`

## 基础示例

\`\`\`vue
<template>
  <myTable
    :tableData="tableData"
    :tableColumn="tableColumn"
    :total="total"
    :pageNum.sync="pageNum"
    :pageSize.sync="pageSize"
    @changePage="loadData"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableColumn: [
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' },
        { label: '状态', prop: 'status', tag: true, statusObj: {
          1: { text: '正常', type: 'success' },
          0: { text: '禁用', type: 'danger' }
        }}
      ],
      total: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    loadData() {
      // 加载数据逻辑
    }
  }
}
<\/script>
\`\`\`

## 主要属性 Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| tableData | 表格数据 | Array | [] |
| tableColumn | 表格列配置 | Array | [] |
| pageNum | 当前页码（支持 .sync） | Number | 1 |
| pageSize | 每页条数（支持 .sync） | Number | 10 |
| total | 总条数 | Number | 0 |
| height | 表格高度 | String/Number | null |
| selection | 是否显示多选框 | Boolean | false |
| tableColumnIndex | 是否显示索引列 | Boolean | false |
| pagination | 是否显示分页 | Boolean | true |
| uniqueValue | 唯一标识字段名 | String | 'id' |
| highlightCurrentRow | 是否高亮当前行 | Boolean | false |
| headerStyle | 表头样式 | Object | { background: '#f5f7fa' } |
| imgWidth | 图片宽度 | String | '0.2rem' |
| imgHeight | 图片高度 | String | '0.2rem' |
| rowConditionChangeColorArr | 行条件高亮配置 | Array | [] |
| paginationClass | 分页容器类名 | String | '' |

## 主要事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| changePage | 分页改变时触发 | - |
| tableSelect | 选择项变化时触发 | (selection, row) |
| row-click | 行点击时触发 | (row, column, event) |
| selectChange | 下拉框值改变时触发 | (value, row) |
| inputChange | 输入框值改变时触发 | (value, row) |
| inputBlur | 输入框失焦时触发 | (event, row) |

## 列配置 tableColumn

\`\`\`javascript
tableColumn: [
  // 普通文本列
  { label: '姓名', prop: 'name', width: 120, align: 'left' },

  // 图片列
  { label: '头像', prop: 'avatar', img: true },

  // 标签列
  { label: '状态', prop: 'status', tag: true, statusObj: {
    1: { text: '正常', type: 'success' },
    0: { text: '禁用', type: 'danger' }
  }},

  // 判断文本列
  { label: '性别', prop: 'gender', pan: true, statusObj: { 1: '男', 2: '女' }},

  // 插槽列
  { label: '操作', prop: 'action', slot: true, name: 'action' },

  // 排序列
  { label: '金额', prop: 'amount', sortable: 'custom', isCustomSort: true },

  // 固定列
  { label: '操作', prop: 'action', fixed: 'right', slot: true, name: 'action' },

  // 表头提示
  { label: '评分', prop: 'score', tooltipIcon: 'el-icon-question', tooltipContent: '0-100分' },

  // 文本装饰
  { label: '金额', prop: 'amount', leftIcon: '¥', color: '#67C23A' },

  // 空值处理
  { label: '备注', prop: 'remark', or: '-' }
]
\`\`\`

## 多选功能

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :selection="true"
  :select.sync="selectedRows"
  @tableSelect="handleSelect"
/>
\`\`\`

## 插槽用法

\`\`\`vue
<myTable :tableData="tableData" :tableColumn="tableColumn">
  <template slot="action" slot-scope="row">
    <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
    <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
  </template>
</myTable>
\`\`\`

## 行动态背景色

通过在行数据中添加 \`rowColorField\` 字段设置背景色：

\`\`\`javascript
tableData: [
  { id: 1, name: '张三' },
  { id: 2, name: '李四', rowColorField: '#f8d7da' },  // 浅红色
  { id: 3, name: '王五', rowColorField: '#d4edda' }   // 浅绿色
]
\`\`\`

## 行条件高亮

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :rowConditionChangeColorArr="[
    { condition: 'status', value: 0, className: 'rowRed' }
  ]"
/>
\`\`\`

\`\`\`css
/* 在非 scoped 样式中定义 */
.el-table .rowRed {
  background-color: #f8d7da;
}
\`\`\`

## 与 Vue 3 版本的主要差异

| 功能 | Vue 2 版本 | Vue 3 版本 |
|------|-----------|-----------|
| 双向绑定 | \`:pageNum.sync\` | \`v-model:pageNum\` |
| 插槽语法 | \`slot-scope="row"\` | \`#slotName="row"\` |
| 行点击事件 | \`@row-click\` | \`@rowClick\` |
| 图标写法 | \`el-icon-question\` 类名 | 组件形式引入 |

`);return(m,b)=>(r(),l("div",u,[o("div",{innerHTML:n(e)},null,8,i)]))}}),C=s(p,[["__scopeId","data-v-5df5308f"]]);export{C as default};
