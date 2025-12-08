<template>
  <div class="example-container">
    <h1 class="page-title">完整示例</h1>
    <p class="page-desc">这是一个综合了多种功能的完整示例，展示 myTable 组件的实际应用。</p>

    <!-- 功能操作区 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
      <el-button type="danger" :disabled="selectedRows.length === 0" @click="handleBatchDelete">
        批量删除 ({{ selectedRows.length }})
      </el-button>
      <el-button @click="handleRefresh">刷新</el-button>
    </div>

    <!-- 表格 -->
    <myTable
      :tableData="tableData"
      :tableColumn="tableColumn"
      :tableColumnIndex="true"
      :selection="true"
      v-model:pageNum="pageNum"
      v-model:pageSize="pageSize"
      v-model:select="selectedRows"
      :total="total"
      height="500px"
      :headerStyle="{ background: '#f5f7fa', color: '#333', fontWeight: 'bold' }"
      :rowConditionChangeColorArr="[{ condition: 'status', value: 2, className: 'rowRed' }]"
      @changePage="getList"
      @tableSelect="handleSelect"
      @inputBlur="handleRemarkBlur"
      @selectChange="handleStatusChange"
    >
      <!-- 用户信息 -->
      <template #userInfo="row">
        <div class="user-info">
          <img class="user-avatar" :src="row.avatar" />
          <div class="user-detail">
            <div class="user-name">{{ row.name }}</div>
            <div class="user-phone">{{ row.phone }}</div>
          </div>
        </div>
      </template>

      <!-- 操作按钮 -->
      <template #operation="row">
        <el-button type="primary" link @click="handleView(row)">查看</el-button>
        <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
      </template>
    </myTable>

    <!-- 示例代码 -->
    <div class="code-section">
      <h2>示例代码</h2>
      <div class="markdown-body" v-html="codeContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { marked } from 'marked'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'github-markdown-css'

// 分页参数
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的行
const selectedRows = ref([])

// 表格数据
const tableData = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    email: 'zhangsan@example.com',
    age: 28,
    gender: 1,
    status: 1,
    level: 1,
    balance: 1580.5,
    createTime: '2024-01-15 10:30:00',
    remark: '普通用户',
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    email: 'lisi@example.com',
    age: 32,
    gender: 1,
    status: 1,
    level: 2,
    balance: 3200.0,
    createTime: '2024-01-20 14:20:00',
    remark: 'VIP用户',
  },
  {
    id: 3,
    name: '王五',
    phone: '13700137000',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    email: 'wangwu@example.com',
    age: 25,
    gender: 1,
    status: 2,
    level: 1,
    balance: 520.0,
    createTime: '2024-02-01 09:15:00',
    remark: '已禁用',
  },
  {
    id: 4,
    name: '赵六',
    phone: '13600136000',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    email: 'zhaoliu@example.com',
    age: 30,
    gender: 2,
    status: 1,
    level: 3,
    balance: 8888.88,
    createTime: '2024-02-10 16:45:00',
    remark: 'SVIP用户',
  },
])

// 表格列配置
const tableColumn = [
  {
    label: '用户信息',
    prop: 'userInfo',
    slot: true,
    name: 'userInfo',
    width: 250,
    fixed: 'left',
  },
  {
    label: '邮箱',
    prop: 'email',
    width: 200,
  },
  {
    label: '性别',
    prop: 'gender',
    pan: true,
    width: 80,
    statusObj: {
      1: '男',
      2: '女',
    },
  },
  {
    label: '年龄',
    prop: 'age',
    width: 80,
    sortable: true,
  },
  {
    label: '等级',
    prop: 'level',
    tag: true,
    width: 100,
    sortable: true,
    statusObj: {
      1: { text: '普通', type: 'info' },
      2: { text: 'VIP', type: 'warning' },
      3: { text: 'SVIP', type: 'danger' },
    },
  },
  {
    label: '状态',
    prop: 'status',
    select: true,
    width: 120,
    placeholder: '选择状态',
    list: [
      { label: '正常', value: 1 },
      { label: '禁用', value: 2 },
    ],
  },
  {
    label: '余额',
    prop: 'balance',
    width: 120,
    leftIcon: '¥',
    color: '#67C23A',
    sortable: true,
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 180,
  },
  {
    label: '备注',
    prop: 'remark',
    input: true,
    width: 200,
    placeholder: '请输入备注',
  },
  {
    label: '操作',
    prop: 'operation',
    slot: true,
    name: 'operation',
    width: 200,
    fixed: 'right',
  },
]

// 获取列表数据
const getList = () => {
  console.log('获取数据，当前页:', pageNum.value, '每页数量:', pageSize.value)
  // 这里调用接口获取数据
  ElMessage.success('数据已刷新')
}

// 选择变化
const handleSelect = (selection: any, row: any) => {
  console.log('已选择:', selection)
}

// 备注失去焦点
const handleRemarkBlur = (value: any, row: any) => {
  console.log('保存备注:', value, row)
  ElMessage.success('备注已保存')
}

// 状态改变
const handleStatusChange = (value: any, row: any) => {
  console.log('状态改变:', value, row)
  ElMessage.success(`状态已更新为: ${value === 1 ? '正常' : '禁用'}`)
}

// 新增
const handleAdd = () => {
  ElMessage.info('打开新增对话框')
}

// 批量删除
const handleBatchDelete = () => {
  ElMessageBox.confirm(`确认删除选中的 ${selectedRows.value.length} 条数据吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功')
    selectedRows.value = []
  })
}

// 刷新
const handleRefresh = () => {
  getList()
}

// 查看
const handleView = (row: any) => {
  ElMessage.info(`查看用户: ${row.name}`)
}

// 编辑
const handleEdit = (row: any) => {
  ElMessage.info(`编辑用户: ${row.name}`)
}

// 删除
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除用户 "${row.name}" 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功')
  })
}

// 示例代码
const codeContent = marked.parse(
  `
### Template 部分

\`\`\`vue
<template>
  <div>
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
      <el-button type="danger" :disabled="selectedRows.length === 0">
        批量删除 ({{ selectedRows.length }})
      </el-button>
    </div>

    <myTable
      :tableData="tableData"
      :tableColumn="tableColumn"
      :tableColumnIndex="true"
      :selection="true"
      v-model:pageNum="pageNum"
      v-model:pageSize="pageSize"
      v-model:select="selectedRows"
      :total="total"
      height="500px"
      :headerStyle="{ background: '#f5f7fa', color: '#333' }"
      :rowConditionChangeColorArr="[
        { condition: 'status', value: 2, className: 'rowRed' }
      ]"
      @changePage="getList"
      @tableSelect="handleSelect"
      @inputBlur="handleRemarkBlur"
      @selectChange="handleStatusChange"
    >
      <template #userInfo="row">
        <div class="user-info">
          <img :src="row.avatar" />
          <div>
            <div>{{ row.name }}</div>
            <div>{{ row.phone }}</div>
          </div>
        </div>
      </template>

      <template #operation="row">
        <el-button type="primary" link @click="handleView(row)">查看</el-button>
        <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
      </template>
    </myTable>
  </div>
</template>
\`\`\`

### ` +
    `Script 部分

\`\`\`typescript
<` +
    `script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(100)
const selectedRows = ref([])

const tableData = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    avatar: 'https://example.com/avatar.png',
    email: 'zhangsan@example.com',
    age: 28,
    gender: 1,
    status: 1,
    level: 1,
    balance: 1580.50,
    createTime: '2024-01-15 10:30:00',
    remark: '普通用户'
  }
  // ...更多数据
])

const tableColumn = [
  { 
    label: '用户信息', 
    prop: 'userInfo', 
    slot: true, 
    name: 'userInfo', 
    width: 250,
    fixed: 'left'
  },
  { label: '邮箱', prop: 'email', width: 200 },
  { 
    label: '性别', 
    prop: 'gender',
    pan: true,
    width: 80,
    statusObj: { 1: '男', 2: '女' }
  },
  { label: '年龄', prop: 'age', width: 80, sortable: true },
  {
    label: '等级',
    prop: 'level',
    tag: true,
    width: 100,
    statusObj: {
      1: { text: '普通', type: 'info' },
      2: { text: 'VIP', type: 'warning' },
      3: { text: 'SVIP', type: 'danger' }
    }
  },
  {
    label: '状态',
    prop: 'status',
    select: true,
    width: 120,
    list: [
      { label: '正常', value: 1 },
      { label: '禁用', value: 2 }
    ]
  },
  { 
    label: '余额', 
    prop: 'balance',
    width: 120,
    leftIcon: '¥',
    color: '#67C23A',
    sortable: true
  },
  { label: '创建时间', prop: 'createTime', width: 180 },
  {
    label: '备注',
    prop: 'remark',
    input: true,
    width: 200,
    placeholder: '请输入备注'
  },
  { 
    label: '操作', 
    prop: 'operation', 
    slot: true, 
    name: 'operation',
    width: 200,
    fixed: 'right'
  }
]

const getList = () => {
  console.log('获取数据')
  // 调用接口...
}

const handleSelect = (selection, row) => {
  console.log('已选择:', selection)
}

const handleRemarkBlur = (value, row) => {
  ElMessage.success('备注已保存')
}

const handleStatusChange = (value, row) => {
  ElMessage.success('状态已更新')
}
</` +
    `script>
\`\`\`

### 样式部分

\`\`\`scss
<style scoped lang="scss">
.example-container {
  padding: 20px;
}

.action-bar {
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .user-name {
    font-size: 14px;
    color: #333;
    margin-bottom: 4px;
  }
  
  .user-phone {
    font-size: 12px;
    color: #999;
  }
}
</style>

<!-- 全局样式（不用 scoped） -->
<style lang="scss">
.el-table .rowRed {
  background-color: #f8d7da;
}
</style>
\`\`\`

### 功能说明

1. **多选功能**：通过 \`:selection="true"\` 和 \`v-model:select\` 实现
2. **索引列**：\`:tableColumnIndex="true"\` 显示行号
3. **自定义插槽**：用户信息和操作列使用插槽自定义内容
4. **状态标签**：等级字段使用 tag 类型显示不同颜色
5. **表内编辑**：状态字段使用下拉框，备注字段使用输入框
6. **数据排序**：年龄、余额等字段支持排序
7. **固定列**：用户信息和操作列左右固定
8. **行高亮**：禁用状态的用户行显示红色背景
9. **双向绑定**：分页参数和选中行自动同步
10. **固定高度**：表格高度 500px，超出部分滚动
`,
)
</script>

<style scoped lang="scss">
.example-container {
  padding: 20px;

  .page-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .page-desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  .action-bar {
    margin-bottom: 20px;
    padding: 15px;
    background: #f5f7fa;
    border-radius: 4px;
  }

  .user-info {
    display: flex;
    align-items: center;

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      object-fit: cover;
    }

    .user-detail {
      flex: 1;

      .user-name {
        font-size: 14px;
        color: #333;
        font-weight: 500;
        margin-bottom: 4px;
      }

      .user-phone {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .code-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #e0e0e0;

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }
  }
}
</style>

<!-- 全局样式：行高亮 -->
<style lang="scss">
.el-table .rowRed {
  background-color: #fef0f0;

  &:hover > td {
    background-color: #fde2e2 !important;
  }
}
</style>
