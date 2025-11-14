import{d as a,c as t,a as l,u as o,b as n,o as s}from"./index-BQ3oQrcT.js";import{d as r}from"./github-markdown-CDBrfog2.js";const i={class:"markdown-body"},p=["innerHTML"],b=a({__name:"index",setup(m){n();const e=r.parse(`
    myTable的使用方法 
    1. 引入：已全局引入，直接使用就好
    2. 使用
    
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

    有问号的都是选填的，后面有注释对应的功能
    type?: string; // 列的类型
    prop: string; // 列的value字段
    label: string; // 列名
    width?: string | number; // 列宽
    pan?: boolean;  // 是否展示判断文字
    list?: Array<any>; // 列表
    slot?: boolean; // 是否展示插槽
    select?: boolean; // 是否展示选择框
    placeholder?: string; // 输入框的placeholder
    input?: boolean; // 是否展示输入框
    tag?: boolean; // 是否展示标签
    statusObj?: any; // 状态对象  如果在 pan中 里面的内容就是 {1:'已读',2:'未读'} 如果在tag中 就是 {1:{text:'已读',type:'success'},2:{text:'未读',type:'danger'}}
    img?: boolean; // 是否展示图片
    name?: string; //solt名称
    align?: string; // 对齐方式
    color?: string; // 颜色
    sortable?: boolean | string; // 是否排序 
    isCustomSort?: boolean; // 是否自定义排序

    这些都是目前表格支持的事件
    @changePage // 分页改变
    @tableSelect // 表格选择
    @selectChange // 选择框选择改变
    @inputChange  // 输入框改变
    @inputBlur  // 输入框失去焦点

    这是表格支持双向绑定的方法
    v-model:pageNum // 更新pageNum
    v-model:pageSize. // 更新pageSize
    v-model:select // 更新select

`);return(c,g)=>(s(),t("div",i,[l("div",{innerHTML:o(e)},null,8,p)]))}});export{b as default};
