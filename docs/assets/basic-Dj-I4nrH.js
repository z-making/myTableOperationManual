import{d as a}from"./github-markdown-CBpekFFP.js";import{d as l,c as t,a as o,u as n,o as r,_ as s}from"./index-X8PCz8na.js";const i={class:"markdown-body",style:{padding:"20px"}},u=["innerHTML"],p=l({__name:"basic",setup(m){const e=a.parse(`
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

自定义列内容,适用于复杂的展示需求。

### 基础用法

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

### 简化写法（推荐）

\`slot\` 属性可以直接传入插槽名称字符串，无需额外指定 \`name\` 属性：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="[
    { label: '用户信息', prop: 'userInfo', slot: 'userInfo' }
  ]"
>
  <template #userInfo="row">
    <div>{{ row.name }}</div>
  </template>
</myTable>
\`\`\`

> 💡 **提示**：当 \`slot\` 为字符串时，会自动作为插槽名称使用，更加简洁

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

启用行选择功能，支持跨页保留选中状态。

### 基础用法

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

### 跨页保留选中

组件内置支持跨页保留选中状态，默认使用 \`id\` 字段作为唯一标识：

\`\`\`javascript
const tableData = ref([
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 22 }
])
\`\`\`

如果数据使用其他字段作为唯一标识，可以通过 \`uniqueValue\` 属性指定：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :selection="true"
  uniqueValue="uid"
  v-model:select="selectedRows"
/>
\`\`\`

\`\`\`javascript
// 数据中使用 uid 作为唯一标识
const tableData = ref([
  { uid: 1001, name: '张三', age: 18 },
  { uid: 1002, name: '李四', age: 22 }
])
\`\`\`

> **重要**：
> - 默认使用 \`id\` 字段作为行的唯一标识
> - 可以通过 \`uniqueValue\` 属性自定义唯一标识字段名
> - 切换分页后，已选中的行会自动保留

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

## 行动态背景色

通过在行数据中添加 \`rowColorField\` 字段，可以动态设置行的背景色。

### 基础用法

\`\`\`javascript
const tableData = ref([
  { id: 1, name: '张三', status: '正常' },
  { id: 2, name: '李四', status: '异常', rowColorField: '#f8d7da' },  // 浅红色背景
  { id: 3, name: '王五', status: 'VIP', rowColorField: '#fff3cd' }     // 浅黄色背景
])
\`\`\`

### 常用背景色参考

- \`#f8d7da\` - 浅红色（危险/异常）
- \`#d4edda\` - 浅绿色（成功/正常）
- \`#fff3cd\` - 浅黄色（警告/提醒）
- \`#cce5ff\` - 浅蓝色（信息/重要）
- \`#e2e3e5\` - 浅灰色（禁用/次要）

> **提示**：\`rowColorField\` 会直接作为 CSS 的 \`backgroundColor\` 值，支持任何合法的颜色格式（如 \`#fff\`、\`rgb()\`、\`rgba()\` 等）

`);return(b,d)=>(r(),t("div",i,[o("div",{innerHTML:n(e)},null,8,u)]))}}),f=s(p,[["__scopeId","data-v-5e19944c"]]);export{f as default};
