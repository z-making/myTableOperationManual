import{d as _}from"./github-markdown-CDBrfog2.js";import{d as f,r as o,c as w,a,e as n,w as s,f as i,g as x,t as m,u as h,F as y,o as N}from"./index-BQ3oQrcT.js";const S={class:"flex items-center"},z=["src"],C={class:"ml-10 t-l"},D={class:"text-14 c-000 w-200 text-ellipsis"},B={class:"text-12 c-6B6B86"},T=["innerHTML"],V=f({__name:"example",setup(P){const l=o({pageNum:1,pageSize:10}),p=o(0),r=o([{name:"张三",phone:"123456789",avatar:"https://img2.baidu.com/it/u=3368769162,4238378153&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"}]),c=()=>{},u=g=>{},d=_.parse(`
    
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

`);return(g,t)=>{const v=i("el-button"),b=i("myTable");return N(),w(y,null,[a("div",null,[n(b,{class:"mt-20",tableData:r.value,tableColumn:[{label:"信息",prop:"name",slot:!0,name:"name",width:350},{label:"手机号",prop:"name"}],pageNum:l.value.pageNum,"onUpdate:pageNum":t[0]||(t[0]=e=>l.value.pageNum=e),pageSize:l.value.pageSize,"onUpdate:pageSize":t[1]||(t[1]=e=>l.value.pageSize=e),total:p.value,onChangePage:c},{name:s(e=>[a("div",S,[a("img",{class:"wh-40",src:e.avatar},null,8,z),a("div",C,[a("div",D,m(e.name)+"的预告东亚怪物的娃大为的的",1),a("div",B,m(e.phone),1)])])]),operation:s(e=>[n(v,{type:"primary",onClick:k=>u(e)},{default:s(()=>[...t[2]||(t[2]=[x("查看",-1)])]),_:1},8,["onClick"])]),_:1},8,["tableData","pageNum","pageSize","total"])]),t[3]||(t[3]=a("h3",null,"以下是示例代码",-1)),a("div",{innerHTML:h(d)},null,8,T)],64)}}});export{V as default};
