<template>
  <div class="markdown-body" style="padding: 20px">
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import 'github-markdown-css'

const content = marked.parse(`
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
| height | 表格高度（未设置时默认最大高度700px） | String/Number | null |
| selection | 是否显示多选框（支持跨页保留选中） | Boolean | false |
| tableColumnIndex | 是否显示索引列 | Boolean | false |
| pagination | 是否显示分页 | Boolean | true |
| uniqueValue | 唯一标识字段名（用于跨页选中） | String | 'id' |
| highlightCurrentRow | 是否高亮当前行 | Boolean | false |
| headerStyle | 表头样式 | Object | { background: '#f5f7fa' } |
| imgWidth | 图片宽度 | String | '0.2rem' |
| imgHeight | 图片高度 | String | '0.2rem' |
| rowConditionChangeColorArr | 行条件高亮配置 | Array | [] |
| paginationClass | 分页容器自定义类名 | String | '' |
| loading | 是否显示加载中 | Boolean | false |

## 主要事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| changePage | 分页改变时触发（页码或每页条数变化） | - |
| tableSelect | 选择项变化时触发 | (selection, row) |
| update:select | 选中数据更新（配合 .sync 使用） | selection |
| update:pageNum | 页码更新（配合 .sync 使用） | pageNum |
| update:pageSize | 每页条数更新（配合 .sync 使用） | pageSize |
| row-click | 行点击时触发 | (row, column, event) |

> **注意**：表单元素（下拉框、输入框、复选框、单选框）的事件通过列配置中的回调函数实现（如 \`selectChange\`、\`inputChange\` 等）

## 列配置 tableColumn

### 基础属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prop | 列的字段名（必填） | String | - |
| label | 列名（必填） | String | - |
| width | 列宽 | String/Number | - |
| align | 对齐方式 | String | 'center' |
| fixed | 固定列位置 | Boolean/String | false |
| sortable | 是否可排序 | Boolean/String | - |
| isCustomSort | 是否使用内置自定义排序 | Boolean | - |
| tooltip | 内容过长时显示 tooltip | Boolean | - |
| color | 文字颜色 | String | - |

### 配置示例

\`\`\`javascript
tableColumn: [
  // 普通文本列
  { label: '姓名', prop: 'name', width: 120, align: 'left' },

  // 文本溢出显示 tooltip
  { label: '描述', prop: 'description', tooltip: true },

  // 图片列（预览列表从行数据的 imgPreviewList 字段获取）
  { label: '头像', prop: 'avatar', img: true },
  // 行数据示例：{ avatar: 'url1', imgPreviewList: ['url1', 'url2', 'url3'] }

  // 标签列（支持 Element Tag 的 type：primary/success/info/warning/danger）
  { label: '状态', prop: 'status', tag: true, statusObj: {
    1: { text: '正常', type: 'success' },
    0: { text: '禁用', type: 'danger' }
  }},

  // 判断文本列（不使用 tag，直接显示对应文字）
  { label: '性别', prop: 'gender', pan: true, statusObj: { 1: '男', 2: '女' }},

  // 下拉框列
  { label: '状态', prop: 'status', select: true, placeholder: '请选择状态', clearable: true,
    list: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }],
    selectChange: (val, row) => { console.log('选中值:', val, '行数据:', row) } },

  // 输入框列
  { label: '备注', prop: 'remark', input: true, placeholder: '请输入备注', type: 'text', clearable: true,
    inputChange: (val, row) => { console.log('输入值:', val) },
    inputBlur: (val, row) => { console.log('失焦值:', val) } },

  // 数字输入框（zheng: true 限制只能输入正数）
  { label: '数量', prop: 'count', input: true, zheng: true },

  // 复选框列
  { label: '是否启用', prop: 'enabled', checkbox: true, trueLabel: 1, falseLabel: 0,
    checkboxChange: (checked, row) => { console.log('勾选状态:', checked) } },

  // 单选框列
  { label: '性别', prop: 'gender', radio: true,
    list: [{ label: '男', value: 1 }, { label: '女', value: 2 }],
    radioInput: (val, row) => { console.log('选中:', val) } },

  // 表单元素禁用（适用于 select/input/checkbox/radio）
  // 方式一：函数回调（推荐）
  { label: '数量', prop: 'count', input: true, disabled: (row) => row.status === 0 },
  // 方式二：指定字段名
  { label: '状态', prop: 'status', select: true, disabledField: 'isDisabled', list: [...] },
  // 方式三：固定布尔值
  { label: '备注', prop: 'remark', input: true, disabled: true },

  // 插槽列（推荐：直接传插槽名）
  { label: '操作', prop: 'action', slot: 'action' },

  // 排序列（使用内置自定义排序，支持数字、中文混合排序）
  { label: '金额', prop: 'amount', sortable: 'custom', isCustomSort: true },

  // 固定列
  { label: '操作', prop: 'action', fixed: 'right', slot: 'action' },

  // 表头提示（悬浮显示 tooltipContent）
  { label: '评分', prop: 'score', tooltipIcon: 'el-icon-question', tooltipContent: '0-100分' },

  // 文本装饰（支持 leftIcon/rightIcon/color）
  { label: '金额', prop: 'amount', leftIcon: '¥', rightIcon: '元', color: '#67C23A' },

  // 空值处理（值为空时显示 or 的内容）
  { label: '备注', prop: 'remark', or: '-' }
]
\`\`\`

## 多选功能

支持跨页保留选中状态（通过 \`reserve-selection\` 实现），需配合 \`uniqueValue\` 指定唯一标识字段：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :selection="true"
  uniqueValue="id"
  @tableSelect="handleSelect"
/>
\`\`\`

> **说明**：索引列和多选列会自动跟随第一列的 \`fixed\` 属性

## 插槽用法

\`\`\`vue
<myTable :tableData="tableData" :tableColumn="tableColumn">
  <!-- 解构写法（推荐） -->
  <template #action="{ row }">
    <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
    <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
  </template>

  <!-- 完整 scope 写法 -->
  <template #action="scope">
    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
  </template>
</myTable>
\`\`\`

> **注意**：插槽名称需要与列配置中的 \`slot\` 值对应

## 行动态背景色与字体色

通过在行数据中添加 \`rowColorField\` 和 \`fontColorField\` 字段设置背景色和字体色：

\`\`\`javascript
tableData: [
  { id: 1, name: '张三' },
  { id: 2, name: '李四', rowColorField: '#f8d7da', fontColorField: '#721c24' },  // 浅红背景 + 深红字体
  { id: 3, name: '王五', rowColorField: '#d4edda', fontColorField: '#155724' }   // 浅绿背景 + 深绿字体
]
\`\`\`

## 行条件高亮

根据行数据条件动态添加行样式类名：

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
/* 组件已内置 rowRed 样式，也可自定义（需使用 ::v-deep 或非 scoped 样式） */
::v-deep .el-table .rowRed {
  background-color: #f8d7da;
}
\`\`\`

## 表单元素禁用控制

表单类型列（select/input/checkbox/radio）支持动态禁用，有三种配置方式：

\`\`\`javascript
// 方式一：函数回调（推荐，最灵活）
{ label: '数量', prop: 'count', input: true, disabled: (row) => row.status === 0 }

// 方式二：指定行数据中的字段名
{ label: '状态', prop: 'status', select: true, disabledField: 'isDisabled', list: [...] }
// 行数据示例：{ status: 1, isDisabled: true }  // isDisabled 为 true 时禁用

// 方式三：固定布尔值（全部禁用）
{ label: '备注', prop: 'remark', input: true, disabled: true }
\`\`\`

## 内置自定义排序

当列配置 \`isCustomSort: true\` 时，使用内置排序逻辑：
- 空值（null/undefined）排最后
- 纯数字按数值大小排序
- 数字优先于非数字
- 非数字按中文拼音排序（localeCompare）

\`\`\`javascript
{ label: '排序列', prop: 'sortField', sortable: 'custom', isCustomSort: true }
\`\`\`

## 与 Vue 3 版本的主要差异

| 功能 | Vue 2 版本 | Vue 3 版本 |
|------|-----------|-----------|
| 双向绑定 | \`:pageNum.sync\` | \`v-model:pageNum\` |
| 插槽语法 | \`slot-scope="scope"\` | \`#slotName="scope"\` |
| 行点击事件 | \`@row-click\` | \`@rowClick\` |
| 图标写法 | \`el-icon-question\` 类名 | \`<el-icon><QuestionFilled /></el-icon>\` 组件形式 |

`)
</script>

<style scoped>
.markdown-body {
  max-width: 100%;
  margin: 0 auto;
}
</style>
