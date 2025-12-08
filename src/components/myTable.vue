<template>
  <div :style="{ '--imgHeight': props.imgHeight, '--imgWidth': props.imgWidth }">
    <el-table
      :data="tableData"
      @select="tableSelect"
      @select-all="tableSelect"
      style="width: 100%"
      :height="height"
      :header-cell-style="props.headerStyle"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        v-if="props.tableColumnIndex"
        type="index"
        width="55"
        :fixed="tableColumn[0]?.fixed"
      />
      <el-table-column v-if="props.selection" type="selection" width="55" />
      <el-table-column
        v-for="item in tableColumn"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align || 'center'"
        :fixed="item.fixed || false"
        :sortable="item.sortable"
        :sort-method="item.isCustomSort ? (a, b) => customSort(a, b, item.prop) : undefined"
      >
        <template #header v-if="item.tooltipIcon">
          <div
            class="table-header"
            :style="{ textAlign: item.align || 'center' }"
            style="display: block"
          >
            <span>{{ item.label }}</span>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.tooltipContent"
              placement="top"
            >
              <!-- 插入 Element Plus 图标 -->
              <el-icon v-if="item.tooltipIcon"><component :is="item.tooltipIcon" /></el-icon>
            </el-tooltip>
          </div>
        </template>
        <template #default="{ row }">
          <!-- 带有判断的。 一般是根据状态展示不同的文字，没有用到tag的 -->
          <span v-if="item.pan">{{ item.statusObj[row[item.prop]] }}</span>
          <!-- 展示图片 -->
          <!-- <img v-if="item.img" class="imgStyle" :src="row[item.prop]" alt=""> -->
          <el-image
            v-else-if="item.img"
            :src="row[item.prop]"
            class="imgStyle"
            :preview-src-list="item.list || [row[item.prop]]"
            preview-teleported
            show-progress
          >
            <template #error>
              <div class="image-slot"></div>
            </template>
          </el-image>
          <!-- 具名插槽 -->
          <slot v-else-if="item.slot" :name="item.name" :="row">{{ row[item.prop] }}</slot>
          <!-- 选择框 -->
          <el-select
            v-else-if="item.select"
            v-model="item.prop"
            @change="emit('selectChange', $event, row)"
            :placeholder="item.placeholder || '请选择'"
            clearable
            style="width: 100%"
          >
            <el-option v-for="i in item.list" :key="i.value" :label="i.label" :value="i.value" />
          </el-select>
          <!-- 输入框 -->
          <el-input
            v-else-if="item.input"
            v-model="item.prop"
            @input="emit('inputChange', $event, row)"
            @blur="emit('inputBlur', $event, row)"
            style="width: 240px"
            :placeholder="item.placeholder || `请输入${item.label}`"
            clearable
          />
          <!-- tag. 目前仅支持element tag的参数 primary success info warning danger-->
          <el-tag
            v-else-if="item.tag"
            :type="returnTextAndType(item.statusObj, row[item.prop]).type"
            >{{ returnTextAndType(item.statusObj, row[item.prop], row).text }}</el-tag
          >

          <div v-else :style="{ color: item.color || '#000' }">
            {{ item.leftIcon || '' }}{{ row[item.prop] || item.or }}{{ item.rightIcon || '' }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="pagination-container" :class="[paginationClass]" v-if="pagination">
      <p class="total-data">共 {{ total }} 项数据</p>
      <el-pagination
        @size-change="pageChange"
        @current-change="pageChange"
        v-model:current-page="pageNum"
        :page-sizes="[10, 20, 30, 50, 100]"
        v-model:page-size="pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { list } from 'postcss'
import { onMounted, PropType, ref } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'

// 定义表格列的类型接口
interface TableColumn {
  type?: string // 列的类型
  prop: string // 列的value字段
  label: string // 列名
  width?: string | number // 列宽
  // pu?: boolean; // 是否展示普通文字
  leftIcon?: string // 展示左图标
  rightIcon?: string // 展示右图标
  pan?: boolean // 是否展示判断文字
  or: string // 判断文字
  list?: Array<any> // 列表
  slot?: boolean // 是否展示插槽
  select?: boolean // 是否展示选择框
  placeholder?: string // 输入框的placeholder
  input?: boolean // 是否展示输入框
  tag?: boolean // 是否展示标签
  statusObj?: any // 状态对象
  img?: boolean // 是否展示图片
  name?: string //solt名称
  align?: string // 对齐方式
  color?: string // 颜色
  sortable?: boolean | string // 是否排序
  isCustomSort?: boolean // 是否自定义排序
  fixed?: boolean | string // 是否固定
  tooltipIcon?: string // 展示的图标
  tooltipContent?: string // 展示的tooltip内容
}

// 定义行自动变颜色条件的类型接口
interface ColorRow {
  condition: string // 条件名称（行数据的字段名称）
  value: string | number // 条件值
  className: string // 条件满足时添加的class
}

const emit = defineEmits([
  'changePage', // 分页改变
  'tableSelect', // 表格选择
  'selectChange', // 选择框选择改变
  'inputChange', // 输入框改变
  'inputBlur', // 输入框失去焦点
  'update:pageNum', // 更新pageNum
  'update:pageSize', // 更新pageSize
  'update:select', // 更新select
])

const props = defineProps({
  tableData: {
    // 表格数据
    type: Array,
    default: () => [],
  },
  tableColumn: {
    // 表格列
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  pageNum: {
    // 当前页
    type: Number,
    default: 1,
  },
  pageSize: {
    // 每页条数
    type: Number,
    default: 10,
  },
  total: {
    // 总条数
    type: Number,
    default: 0,
  },
  height: {
    // 表格高度
    type: String || Number,
    default: null,
  },
  selection: {
    //是否展示多选框
    type: Boolean,
    default: false,
  },
  tableColumnIndex: {
    //是否展示多选框
    type: Boolean,
    default: false,
  },
  imgHeight: {
    // 图片高度
    type: String,
    default: '0.2rem',
  },
  imgWidth: {
    // 图片宽度
    type: String,
    default: '0.2rem',
  },
  headerStyle: {
    // 表头样式 例子 { background: '#f5f7fa', color: '#6B6B86' }
    type: Object,
    default: () => ({ background: '#f5f7fa' }),
  },
  pagination: {
    //是否展示多选框
    type: Boolean,
    default: true,
  },
  paginationClass: {
    // 分页类名（暴露给父组件的分页类名，可以直接写样式，记得是在没有scope里面style里面写，否则需要样式穿透）
    type: String,
    default: '',
  },
  rowConditionChangeColorArr: {
    // 行条件改变颜色数组
    type: Array as PropType<ColorRow[]>,
    default: () => [],
  },
})

const pageNum = ref(props.pageNum)
const pageSize = ref(props.pageSize)
// const total = ref(props.total)

// 分页改变
const pageChange = () => {
  emit('update:pageNum', pageNum.value)
  emit('update:pageSize', pageSize.value)
  emit('changePage')
}

// 表格选中 Select 触发
const tableSelect = (val, row) => {
  emit('update:select', val)
  emit('tableSelect', val, row)
}

// 动态生成行类名
const tableRowClassName = ({ row }) => {
  // console.log(row, 'row');
  // 是否启用行根据条件变色
  if (props.rowConditionChangeColorArr.length > 0) {
    const colorRow = props.rowConditionChangeColorArr.find(
      (item) => row[item.condition] === item.value,
    )
    if (colorRow) return colorRow.className
    return
  }
}

/**
 * 通用自定义排序方法（适配 :sort-method）
 * @param {Object} a 行数据a
 * @param {Object} b 行数据b
 * @returns {number} 比较结果（-1/0/1，表格会自动根据升序/降序反转结果）
 */
const customSort = (a, b, name) => {
  const valA = a[name]
  const valB = b[name]

  // 1. 处理空值（null/undefined 排最后）
  const isANull = valA === null || valA === undefined
  const isBNull = valB === null || valB === undefined
  if (isANull && isBNull) return 0
  if (isANull) return 1
  if (isBNull) return -1

  // 2. 转换为字符串统一处理
  const strA = String(valA).trim()
  const strB = String(valB).trim()

  // 3. 判断是否为数字（含纯数字字符串）
  const isNumberA = /^[+-]?\d+$/.test(strA)
  const isNumberB = /^[+-]?\d+$/.test(strB)

  // 4. 都是数字：按数值比较（使用Number，避免BigInt混合类型问题）
  if (isNumberA && isNumberB) {
    const numA = Number(strA) // 改用Number（适合大部分场景，避免BigInt类型冲突）
    const numB = Number(strB)
    return numA - numB
  }

  // 5. 数字优先级高于非数字
  if (isNumberA) return -1
  if (isNumberB) return 1

  // 6. 统一按首字母排序（字母和中文混合比较）
  return strA.localeCompare(strB, 'zh-CN', {
    sensitivity: 'base',
    usage: 'sort',
  })
}

type ButtonType = 'success' | 'primary' | 'warning' | 'info' | 'danger'

// 返回对应的文本和类型
const returnTextAndType = (statusObj: any, key: string): { text: string; type: ButtonType } => {
  // 如果有 unequal 不等于 的字段出现，则判断当前字段是否等于 unequal 的值，如果不等于则返回 unequal 的文本和类型，如果等于则返回 key 的文本和类型
  if (statusObj.unequal !== undefined && key != statusObj.value) {
    return { text: statusObj.unequal.text, type: statusObj.unequal.type }
  }
  // console.log(statusObj, key, statusObj[key], 'statusObj[key]',row);
  return { text: statusObj[key].text, type: statusObj[key].type }
}

// 获取随机数，用途：给表格添加唯一key
const getRandomFloat = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

onMounted(() => {})
</script>

<style scoped lang="scss">
.imgStyle {
  width: var(--imgWidth);
  height: var(--imgHeight);
  border-radius: 8px;
}
.image-slot {
  width: var(--imgWidth);
  height: var(--imgHeight);
  border-radius: 8px;
  background-color: #f5f7fa;
}
.table-header {
  display: flex;
  align-items: center;
  span {
    line-height: normal;
    padding-right: 3px;
  }
}
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  box-shadow: 0 -0.20833vw 0.41667vw 0 rgba(217, 217, 217, 0.25);
  .total-data {
    font-size: 14px;
    color: #606266;
  }
}

// 以下是行变色样式（根据项目要求可自行添加）
::v-deep .el-table .rowRed {
  background-color: #f8d7da; /* 浅红色 */
}
</style>
