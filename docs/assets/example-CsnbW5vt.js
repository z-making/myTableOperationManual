import{d as D}from"./github-markdown-CBpekFFP.js";import{d as V,C as d,c as E,a as l,e as s,w as o,b as p,r as h,t as m,u as P,E as n,D as v,o as $,_ as M}from"./index-X8PCz8na.js";const A={class:"example-container"},L={class:"action-bar"},j={class:"user-info"},O=["src"],U={class:"user-detail"},H={class:"user-name"},W={class:"user-phone"},q={class:"code-section"},F=["innerHTML"],G=V({__name:"example",setup(J){const c=d(1),u=d(10),f=d(100),r=d([]),w=d([{id:1,name:"张三",phone:"13800138000",avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",email:"zhangsan@example.com",age:28,gender:1,status:1,level:1,balance:1580.5,createTime:"2024-01-15 10:30:00",remark:"普通用户"},{id:2,name:"李四",phone:"13900139000",avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",email:"lisi@example.com",age:32,gender:1,status:1,level:2,balance:3200,createTime:"2024-01-20 14:20:00",remark:"VIP用户"},{id:3,name:"王五",phone:"13700137000",avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",email:"wangwu@example.com",age:25,gender:1,status:2,level:1,balance:520,createTime:"2024-02-01 09:15:00",remark:"已禁用"},{id:4,name:"赵六",phone:"13600136000",avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",email:"zhaoliu@example.com",age:30,gender:2,status:1,level:3,balance:8888.88,createTime:"2024-02-10 16:45:00",remark:"SVIP用户"}]),x=[{label:"用户信息",prop:"userInfo",slot:!0,name:"userInfo",width:250,fixed:"left"},{label:"邮箱",prop:"email",width:200},{label:"性别",prop:"gender",pan:!0,width:80,statusObj:{1:"男",2:"女"}},{label:"年龄",prop:"age",width:80,sortable:!0},{label:"等级",prop:"level",tag:!0,width:100,sortable:!0,statusObj:{1:{text:"普通",type:"info"},2:{text:"VIP",type:"warning"},3:{text:"SVIP",type:"danger"}}},{label:"状态",prop:"status",select:!0,width:120,placeholder:"选择状态",list:[{label:"正常",value:1},{label:"禁用",value:2}]},{label:"余额",prop:"balance",width:120,leftIcon:"¥",color:"#67C23A",sortable:!0},{label:"创建时间",prop:"createTime",width:180},{label:"备注",prop:"remark",input:!0,width:200,placeholder:"请输入备注"},{label:"操作",prop:"operation",slot:!0,name:"operation",width:200,fixed:"right"}],g=()=>{console.log("获取数据，当前页:",c.value,"每页数量:",u.value),n.success("数据已刷新")},y=(t,e)=>{console.log("已选择:",t)},k=(t,e)=>{console.log("保存备注:",t,e),n.success("备注已保存")},C=(t,e)=>{console.log("状态改变:",t,e),n.success(`状态已更新为: ${t===1?"正常":"禁用"}`)},S=()=>{n.info("打开新增对话框")},T=()=>{v.confirm(`确认删除选中的 ${r.value.length} 条数据吗？`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{n.success("删除成功"),r.value=[]})},_=()=>{g()},I=t=>{n.info(`查看用户: ${t.name}`)},B=t=>{n.info(`编辑用户: ${t.name}`)},z=t=>{v.confirm(`确认删除用户 "${t.name}" 吗？`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{n.success("删除成功")})},N=D.parse(`
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

### Script 部分

\`\`\`typescript
<script setup lang="ts">
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
<\/script>
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
`);return(t,e)=>{const i=h("el-button"),R=h("myTable");return $(),E("div",A,[e[9]||(e[9]=l("h1",{class:"page-title"},"完整示例",-1)),e[10]||(e[10]=l("p",{class:"page-desc"},"这是一个综合了多种功能的完整示例，展示 myTable 组件的实际应用。",-1)),l("div",L,[s(i,{type:"primary",onClick:S},{default:o(()=>[...e[3]||(e[3]=[p("新增用户",-1)])]),_:1}),s(i,{type:"danger",disabled:r.value.length===0,onClick:T},{default:o(()=>[p(" 批量删除 ("+m(r.value.length)+") ",1)]),_:1},8,["disabled"]),s(i,{onClick:_},{default:o(()=>[...e[4]||(e[4]=[p("刷新",-1)])]),_:1})]),s(R,{tableData:w.value,tableColumn:x,tableColumnIndex:!0,selection:!0,pageNum:c.value,"onUpdate:pageNum":e[0]||(e[0]=a=>c.value=a),pageSize:u.value,"onUpdate:pageSize":e[1]||(e[1]=a=>u.value=a),select:r.value,"onUpdate:select":e[2]||(e[2]=a=>r.value=a),total:f.value,height:"500px",headerStyle:{background:"#f5f7fa",color:"#333",fontWeight:"bold"},rowConditionChangeColorArr:[{condition:"status",value:2,className:"rowRed"}],onChangePage:g,onTableSelect:y,onInputBlur:k,onSelectChange:C},{userInfo:o(a=>[l("div",j,[l("img",{class:"user-avatar",src:a.avatar},null,8,O),l("div",U,[l("div",H,m(a.name),1),l("div",W,m(a.phone),1)])])]),operation:o(a=>[s(i,{type:"primary",link:"",onClick:b=>I(a)},{default:o(()=>[...e[5]||(e[5]=[p("查看",-1)])]),_:1},8,["onClick"]),s(i,{type:"primary",link:"",onClick:b=>B(a)},{default:o(()=>[...e[6]||(e[6]=[p("编辑",-1)])]),_:1},8,["onClick"]),s(i,{type:"danger",link:"",onClick:b=>z(a)},{default:o(()=>[...e[7]||(e[7]=[p("删除",-1)])]),_:1},8,["onClick"])]),_:1},8,["tableData","pageNum","pageSize","select","total"]),l("div",q,[e[8]||(e[8]=l("h2",null,"示例代码",-1)),l("div",{class:"markdown-body",innerHTML:P(N)},null,8,F)])])}}}),X=M(G,[["__scopeId","data-v-1148dedc"]]);export{X as default};
