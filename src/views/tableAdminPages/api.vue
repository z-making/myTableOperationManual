<template>
  <div class="markdown-body" style="padding: 20px">
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import 'github-markdown-css'

const content = marked.parse(`
# API 文档

完整的 myTable 组件 API 参考文档。

## 组件属性 Props

### 表格数据

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| tableData | 表格数据 | Array | [] | 是 |
| tableColumn | 表格列配置 | TableColumn[] | [] | 是 |
| height | 表格高度 | String / Number | null | 否 |

### 分页相关

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| pageNum | 当前页码（支持 v-model） | Number | 1 | 否 |
| pageSize | 每页条数（支持 v-model） | Number | 10 | 否 |
| total | 总条数 | Number | 0 | 否 |
| pagination | 是否显示分页 | Boolean | true | 否 |
| paginationClass | 分页容器的自定义类名 | String | '' | 否 |

### 表格功能

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| selection | 是否显示多选框（支持跨页保留选中） | Boolean | false | 否 |
| tableColumnIndex | 是否显示索引列 | Boolean | false | 否 |
| headerStyle | 表头样式 | Object | { background: '#f5f7fa' } | 否 |
| uniqueValue | 行数据的唯一标识字段名（用于跨页保留选中） | String | 'id' | 否 |
| highlightCurrentRow | 是否高亮当前行 | Boolean | false | 否 |

> **多选功能说明**：
> - 组件内置支持跨页保留选中状态
> - 默认使用 \`id\` 字段作为唯一标识，可通过 \`uniqueValue\` 自定义
> - 使用 \`v-model:select\` 双向绑定选中的行数据

### 行动态背景色

通过在行数据中添加 \`rowColorField\` 字段，可以动态设置行的背景色：

\`\`\`javascript
const tableData = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四', rowColorField: '#f8d7da' }  // 该行显示浅红色背景
]
\`\`\`

> **注意**：\`rowColorField\` 是预留字段名，组件会自动识别并应用背景色

### 样式定制

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| imgHeight | 图片高度 | String | '0.2rem' | 否 |
| imgWidth | 图片宽度 | String | '0.2rem' | 否 |
| rowConditionChangeColorArr | 行条件高亮配置 | ColorRow[] | [] | 否 |

## TableColumn 列配置

### 基础属性

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| prop | 列数据字段名 | String | 是 |
| label | 列标题 | String | 是 |
| width | 列宽 | String / Number | 否 |
| align | 对齐方式：left / center / right | String | 否，默认 center |
| fixed | 固定列：left / right / true | Boolean / String | 否，默认 false |

### 显示类型

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| img | 是否为图片列 | Boolean | 否 |
| tag | 是否为标签列 | Boolean | 否 |
| pan | 是否为判断文本列 | Boolean | 否 |
| slot | 是否为插槽列，支持 Boolean 或直接传入插槽名称字符串 | Boolean / String | 否 |
| input | 是否为输入框列 | Boolean | 否 |
| select | 是否为下拉框列 | Boolean | 否 |

> **插槽配置说明**：
> - 当 \`slot: true\` 时，需要通过 \`name\` 属性指定插槽名
> - 当 \`slot: 'slotName'\` 时，直接使用该字符串作为插槽名（推荐）

### 插槽配置

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| name | 插槽名称（slot 为 true 时必填） | String | 条件必填 |

### 下拉框/图片配置

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| list | 下拉框选项列表 / 图片预览列表 | Array | 否 |
| placeholder | 输入框/下拉框的占位文本 | String | 否 |

### 状态映射

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| statusObj | 状态对象映射 | Object | 条件必填 |

**statusObj 用法说明：**

\`\`\`javascript
// pan 判断文本用法
statusObj: {
  1: '已读',
  2: '未读'
}

// tag 标签用法
statusObj: {
  1: { text: '正常', type: 'success' },
  2: { text: '禁用', type: 'danger' }
}

// tag 不等于条件用法
statusObj: {
  value: 1,
  unequal: { text: '未通过', type: 'danger' },
  1: { text: '已通过', type: 'success' }
}
\`\`\`

### 文本装饰

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| leftIcon | 文本左侧图标 | String | 否 |
| rightIcon | 文本右侧图标 | String | 否 |
| color | 文本颜色 | String | 否 |
| or | 空值时显示的默认文本 | String | 否 |

### 排序功能

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| sortable | 是否可排序：true / 'custom' | Boolean / String | 否 |
| isCustomSort | 是否使用自定义排序算法 | Boolean | 否 |

> **注意**：使用自定义排序时，需要同时设置 \`sortable: 'custom'\` 和 \`isCustomSort: true\`

### 表头提示

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| tooltipIcon | 表头提示图标 | String | 否 |
| tooltipContent | 表头提示内容 | String | 否 |

## ColorRow 行高亮配置

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| condition | 条件字段名 | String | 是 |
| value | 条件值 | String / Number | 是 |
| className | 满足条件时的类名 | String | 是 |

**示例：**

\`\`\`javascript
rowConditionChangeColorArr: [
  { condition: 'status', value: 0, className: 'rowRed' },
  { condition: 'level', value: 'VIP', className: 'rowGolden' }
]
\`\`\`

## 组件事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| changePage | 分页改变时触发 | - |
| tableSelect | 选择项发生变化时触发 | (selection, row) |
| selectChange | 下拉框值改变时触发 | (value, row) |
| inputChange | 输入框值改变时触发 | (value, row) |
| rowClick | 行点击时触发 | (row, column, event) |
| inputBlur | 输入框失去焦点时触发 | (value, row) |

### 事件详细说明

#### changePage

当分页的页码或每页条数改变时触发。

\`\`\`vue
<myTable
  @changePage="handlePageChange"
/>
\`\`\`

\`\`\`javascript
const handlePageChange = () => {
  // pageNum 和 pageSize 已通过 v-model 自动更新
  loadTableData()
}
\`\`\`

#### tableSelect

当用户手动勾选数据行的 Checkbox 时触发。

\`\`\`javascript
const handleTableSelect = (selection, row) => {
  console.log('当前选中的所有行:', selection)
  console.log('当前操作的行:', row)
}
\`\`\`

#### selectChange

当表格内下拉框的值改变时触发。

\`\`\`javascript
const handleSelectChange = (value, row) => {
  console.log('新选择的值:', value)
  console.log('所在行数据:', row)
}
\`\`\`

#### inputChange

当表格内输入框的值改变时触发（实时触发）。

\`\`\`javascript
const handleInputChange = (value, row) => {
  console.log('输入的值:', value)
  console.log('所在行数据:', row)
}
\`\`\`

#### inputBlur

当表格内输入框失去焦点时触发。

\`\`\`javascript
const handleInputBlur = (value, row) => {
  console.log('最终输入值:', value)
  console.log('所在行数据:', row)
  // 适合在这里保存数据
  saveData(row)
}
\`\`\`

## 双向绑定 v-model

组件支持以下 v-model 绑定：

| 绑定名 | 说明 | 类型 |
|--------|------|------|
| v-model:pageNum | 当前页码 | Number |
| v-model:pageSize | 每页条数 | Number |
| v-model:select | 选中的行数据 | Array |

**示例：**

\`\`\`vue
<myTable
  v-model:pageNum="currentPage"
  v-model:pageSize="pageSize"
  v-model:select="selectedRows"
/>
\`\`\`

\`\`\`javascript
const currentPage = ref(1)
const pageSize = ref(10)
const selectedRows = ref([])

// 这些值会自动同步，无需手动更新
\`\`\`

## 插槽 Slots

### 具名插槽

通过 tableColumn 配置中的 \`slot: true\` 和 \`name\` 属性启用插槽。

\`\`\`vue
<myTable :tableColumn="tableColumn">
  <template #userInfo="row">
    <!-- row 是当前行的数据 -->
    <div>{{ row.name }}</div>
  </template>

  <template #operation="row">
    <el-button @click="handleEdit(row)">编辑</el-button>
    <el-button @click="handleDelete(row)">删除</el-button>
  </template>
</myTable>
\`\`\`

**列配置：**

\`\`\`javascript
tableColumn: [
  { label: '用户信息', prop: 'user', slot: true, name: 'userInfo' },
  { label: '操作', prop: 'action', slot: true, name: 'operation' }
]
\`\`\`

## TypeScript 类型定义

\`\`\`typescript
interface TableColumn {
  prop: string                    // 列数据字段名
  label: string                   // 列标题
  type?: string                   // 列类型
  width?: string | number         // 列宽
  leftIcon?: string               // 左侧图标
  rightIcon?: string              // 右侧图标
  pan?: boolean                   // 是否判断文本
  or?: string                     // 默认值
  list?: Array<any>               // 列表数据
  slot?: boolean                  // 是否插槽
  select?: boolean                // 是否下拉框
  placeholder?: string            // 占位文本
  input?: boolean                 // 是否输入框
  tag?: boolean                   // 是否标签
  statusObj?: any                 // 状态对象
  img?: boolean                   // 是否图片
  name?: string                   // 插槽名称
  align?: string                  // 对齐方式
  color?: string                  // 颜色
  sortable?: boolean | string     // 是否排序
  isCustomSort?: boolean          // 是否自定义排序
  fixed?: boolean | string        // 是否固定
  tooltipIcon?: string            // 提示图标
  tooltipContent?: string         // 提示内容
}

interface ColorRow {
  condition: string               // 条件字段名
  value: string | number          // 条件值
  className: string               // 类名
}
\`\`\`

## 最佳实践

### 1. 列宽建议

- 操作列：150-200px
- 状态列：100-120px
- 日期时间：180-200px
- 图片列：80-100px
- 普通文本：根据内容自适应

### 2. 分页建议

- 默认每页显示 10 条
- 提供 [10, 20, 30, 50, 100] 选项
- 大数据量建议使用固定表格高度

### 3. 性能优化

- 大数据量时使用虚拟滚动（需要自行实现）
- 避免在 tableData 中使用深层嵌套对象
- 合理使用固定列，避免过多固定列

### 4. 样式定制

- 使用 \`headerStyle\` 统一表头样式
- 行高亮样式定义在非 scoped 的 style 中
- 自定义分页样式使用 \`paginationClass\`

`)
</script>

<style scoped>
.markdown-body {
  max-width: 100%;
  margin: 0 auto;
}

.markdown-body table {
  width: 100%;
  margin: 16px 0;
}

.markdown-body th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.markdown-body td,
.markdown-body th {
  padding: 8px 12px;
  border: 1px solid #d0d7de;
}
</style>
