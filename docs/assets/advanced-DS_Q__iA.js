import{d as a}from"./github-markdown-CBpekFFP.js";import{d as t,c as l,a as o,u as n,o as r,_ as u}from"./index-CpMPxPWm.js";const s={class:"markdown-body",style:{padding:"20px"}},c=["innerHTML"],d=t({__name:"advanced",setup(b){const e=a.parse(`
# 进阶功能

探索 myTable 组件的高级特性，实现更复杂的业务需求。

## 表格内输入框

在表格单元格中直接编辑数据。

### 基础用法

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="[
    { label: '姓名', prop: 'name' },
    { 
      label: '备注', 
      prop: 'remark', 
      input: true,
      placeholder: '请输入备注'
    }
  ]"
  @inputChange="handleInputChange"
  @inputBlur="handleInputBlur"
/>
\`\`\`

\`\`\`javascript
const handleInputChange = (value, row) => {
  console.log('输入值变化:', value, row)
}

const handleInputBlur = (value, row) => {
  console.log('失去焦点:', value, row)
  // 可以在这里保存数据
}
\`\`\`

## 表格内下拉框

在表格中使用下拉选择。

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="[
    { label: '姓名', prop: 'name' },
    {
      label: '状态',
      prop: 'status',
      select: true,
      placeholder: '请选择状态',
      list: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 }
      ]
    }
  ]"
  @selectChange="handleSelectChange"
/>
\`\`\`

\`\`\`javascript
const handleSelectChange = (value, row) => {
  console.log('选择改变:', value, row)
  // 更新数据
}
\`\`\`

## 自定义排序

### 启用排序

\`\`\`vue
:tableColumn="[
  { label: '年龄', prop: 'age', sortable: true },
  { label: '金额', prop: 'amount', sortable: true }
]"
\`\`\`

### 自定义排序算法

使用内置的智能排序，支持数字、字符串、中文等：

\`\`\`vue
:tableColumn="[
  { 
    label: '编号', 
    prop: 'code', 
    sortable: 'custom',
    isCustomSort: true 
  }
]"
\`\`\`

> **内置排序特性**：
> - 自动识别数字和字符串
> - 数字优先级高于字符串
> - 空值自动排在最后
> - 支持中文拼音排序

## 条件行高亮

根据行数据动态设置行样式。

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :rowConditionChangeColorArr="[
    { condition: 'status', value: 0, className: 'rowRed' }
  ]"
/>
\`\`\`

### 自定义行样式

在全局样式中定义（不要使用 scoped）：

\`\`\`css
.el-table .rowRed {
  background-color: #f8d7da;
}

.el-table .rowYellow {
  background-color: #fff3cd;
}

.el-table .rowGreen {
  background-color: #d1e7dd;
}
\`\`\`

### 多条件高亮

\`\`\`vue
:rowConditionChangeColorArr="[
  { condition: 'status', value: -1, className: 'rowRed' },
  { condition: 'level', value: 'VIP', className: 'rowGolden' },
  { condition: 'isNew', value: true, className: 'rowGreen' }
]"
\`\`\`

## 固定表格高度

设置表格固定高度，超出部分滚动：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  height="500px"
/>
\`\`\`

## 自定义表头样式

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :headerStyle="{ 
    background: '#f5f7fa', 
    color: '#333',
    fontWeight: 'bold'
  }"
/>
\`\`\`

## 隐藏分页

某些场景下不需要分页：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  :pagination="false"
/>
\`\`\`

## 自定义分页样式

通过 \`paginationClass\` 添加自定义样式类：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  paginationClass="custom-pagination"
/>
\`\`\`

在非 scoped 的 style 中定义：

\`\`\`css
.custom-pagination {
  background-color: #f0f0f0;
  padding: 15px 30px;
}

.custom-pagination .el-pagination {
  justify-content: center;
}
\`\`\`

## 标签高级用法

### 不等于条件

当某个值不等于指定值时显示特定标签：

\`\`\`vue
:tableColumn="[
  {
    label: '审核状态',
    prop: 'auditStatus',
    tag: true,
    statusObj: {
      value: 1,
      unequal: { text: '未通过', type: 'danger' },
      1: { text: '已通过', type: 'success' }
    }
  }
]"
\`\`\`

> 当 \`auditStatus !== 1\` 时显示"未通过"，等于 1 时显示"已通过"

## 完整的双向绑定

组件支持以下 v-model 绑定：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="tableColumn"
  v-model:pageNum="pageNum"
  v-model:pageSize="pageSize"
  v-model:select="selectedRows"
  @changePage="loadData"
  @tableSelect="handleSelection"
/>
\`\`\`

这样分页参数和选中行会自动同步，无需手动处理。

## 组合使用示例

结合多个功能的综合示例：

\`\`\`vue
<myTable
  :tableData="tableData"
  :tableColumn="[
    { label: '编号', prop: 'id', width: 80, fixed: 'left' },
    { label: '头像', prop: 'avatar', img: true },
    { 
      label: '用户信息', 
      prop: 'userInfo', 
      slot: true, 
      name: 'userInfo',
      width: 250 
    },
    {
      label: '状态',
      prop: 'status',
      tag: true,
      sortable: true,
      statusObj: {
        1: { text: '正常', type: 'success' },
        2: { text: '禁用', type: 'danger' }
      }
    },
    { 
      label: '备注', 
      prop: 'remark', 
      input: true,
      placeholder: '请输入备注'
    },
    { 
      label: '操作', 
      prop: 'action', 
      slot: true, 
      name: 'action',
      width: 150,
      fixed: 'right'
    }
  ]"
  :tableColumnIndex="true"
  :selection="true"
  v-model:pageNum="pageNum"
  v-model:pageSize="pageSize"
  v-model:select="selectedRows"
  :total="total"
  height="600px"
  :headerStyle="{ background: '#f5f7fa', color: '#333' }"
  :rowConditionChangeColorArr="[
    { condition: 'status', value: 2, className: 'rowRed' }
  ]"
  @changePage="loadData"
  @tableSelect="handleSelection"
  @inputBlur="saveRemark"
/>
\`\`\`

`);return(p,i)=>(r(),l("div",s,[o("div",{innerHTML:n(e)},null,8,c)]))}}),v=u(d,[["__scopeId","data-v-18cb3489"]]);export{v as default};
