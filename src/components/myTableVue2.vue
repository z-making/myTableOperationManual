<template>
  <div :style="{ '--imgHeight': imgHeight, '--imgWidth': imgWidth }">
    <el-table
      :data="tableData"
      @select="handleTableSelect"
      @select-all="handleTableSelect"
      @row-click="handleRowClick"
      style="width: 100%"
      :height="height"
      :max-height="height ? null : '700px'"
      :header-cell-style="headerStyle"
      :row-class-name="tableRowClassName"
      :row-style="getRowStyle"
      :row-key="uniqueValue"
      :highlight-current-row="highlightCurrentRow"
    >
      <el-table-column
        v-if="tableColumnIndex"
        type="index"
        width="55"
        :fixed="getFirstColumnFixed"
      />
      <el-table-column v-if="selection" type="selection" width="55" reserve-selection />
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
        <!-- 自定义表头（带tooltip图标） -->
        <template slot="header" slot-scope="scope">
          <template v-if="item.tooltipIcon">
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
                <i :class="item.tooltipIcon" style="margin-left: 3px"></i>
              </el-tooltip>
            </div>
          </template>
          <span v-else>{{ item.label }}</span>
        </template>
        <template slot-scope="scope">
          <!-- 带有判断的。 一般是根据状态展示不同的文字，没有用到tag的 -->
          <span v-if="item.pan">{{ item.statusObj[scope.row[item.prop]] }}</span>
          <!-- 展示图片 -->
          <el-image
            v-else-if="item.img"
            :src="scope.row[item.prop]"
            class="imgStyle"
            :preview-src-list="scope.row.imgPreviewList || [scope.row[item.prop]]"
            fit="cover"
          >
            <div slot="error" class="image-slot"></div>
          </el-image>
          <!-- 具名插槽 -->
          <slot v-else-if="item.slot" :name="item.name || item.slot" v-bind="scope.row">{{
            scope.row[item.prop]
          }}</slot>
          <!-- 选择框 -->
          <el-select
            v-else-if="item.select"
            v-model="scope.row[item.prop]"
            @change="handleSelectChange($event, scope.row)"
            :placeholder="item.placeholder || '请选择'"
            clearable
            style="width: 100%"
          >
            <el-option v-for="i in item.list" :key="i.value" :label="i.label" :value="i.value" />
          </el-select>
          <!-- 输入框 -->
          <el-input
            v-else-if="item.input"
            v-model="scope.row[item.prop]"
            @input="handleInputChange($event, scope.row)"
            @blur="handleInputBlur($event, scope.row)"
            style="width: 240px"
            :placeholder="item.placeholder || `请输入${item.label}`"
            clearable
          />
          <!-- tag. 目前仅支持element tag的参数 primary success info warning danger-->
          <el-tag
            v-else-if="item.tag"
            :type="returnTextAndType(item.statusObj, scope.row[item.prop]).type"
          >
            {{ returnTextAndType(item.statusObj, scope.row[item.prop]).text }}
          </el-tag>
          <!-- 默认文本展示 -->
          <div v-else :style="{ color: item.color || '#000' }">
            {{ item.leftIcon || ''
            }}{{
              scope.row[item.prop] !== undefined &&
              scope.row[item.prop] !== null &&
              scope.row[item.prop] !== ''
                ? scope.row[item.prop]
                : item.or
            }}{{ item.rightIcon || '' }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="pagination-container" :class="[paginationClass]" v-if="pagination">
      <p class="total-data">共 {{ total }} 项数据</p>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size.sync="currentPageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * myTable 通用表格组件 (Vue 2 + Element UI)
 *
 * 表格列配置 tableColumn 说明：
 * @property {string} prop - 列的value字段
 * @property {string} label - 列名
 * @property {string|number} [width] - 列宽
 * @property {string} [leftIcon] - 展示左图标
 * @property {string} [rightIcon] - 展示右图标
 * @property {boolean} [pan] - 是否展示判断文字
 * @property {string} [or] - 判断文字（默认值）
 * @property {Array} [list] - 列表数据（用于select/image预览）
 * @property {boolean|string} [slot] - 是否展示插槽 ｜ slot名称
 * @property {boolean} [select] - 是否展示选择框
 * @property {string} [placeholder] - 输入框的placeholder
 * @property {boolean} [input] - 是否展示输入框
 * @property {boolean} [tag] - 是否展示标签
 * @property {Object} [statusObj] - 状态对象
 * @property {boolean} [img] - 是否展示图片
 * @property {string} [name] - slot名称
 * @property {string} [align] - 对齐方式
 * @property {string} [color] - 颜色
 * @property {boolean|string} [sortable] - 是否排序
 * @property {boolean} [isCustomSort] - 是否自定义排序
 * @property {boolean|string} [fixed] - 是否固定
 * @property {string} [tooltipIcon] - 展示的图标类名 (如 'el-icon-question')
 * @property {string} [tooltipContent] - 展示的tooltip内容
 *
 * 行条件变色配置 rowConditionChangeColorArr 说明：
 * @property {string} condition - 条件名称（行数据的字段名称）
 * @property {string|number} value - 条件值
 * @property {string} className - 条件满足时添加的class
 */
export default {
  name: 'MyTable',
  props: {
    tableData: {
      // 表格数据
      type: Array,
      default: () => [],
    },
    tableColumn: {
      // 表格列配置
      type: Array,
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
      type: [String, Number],
      default: null,
    },
    selection: {
      // 是否展示多选框
      type: Boolean,
      default: false,
    },
    tableColumnIndex: {
      // 是否展示序号列
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
      // 表头样式
      type: Object,
      default: () => ({ background: '#f5f7fa' }),
    },
    pagination: {
      // 是否展示分页
      type: Boolean,
      default: true,
    },
    paginationClass: {
      // 分页类名
      type: String,
      default: '',
    },
    rowConditionChangeColorArr: {
      // 行条件改变颜色数组
      type: Array,
      default: () => [],
    },
    uniqueValue: {
      // 唯一值字段名
      type: String,
      default: 'id',
    },
    highlightCurrentRow: {
      // 是否高亮当前行
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: this.pageNum,
      currentPageSize: this.pageSize,
    }
  },
  computed: {
    // 获取第一列的fixed属性
    getFirstColumnFixed() {
      return this.tableColumn && this.tableColumn[0] ? this.tableColumn[0].fixed : false
    },
  },
  watch: {
    // 监听父组件传入的pageNum变化
    pageNum(val) {
      this.currentPage = val
    },
    // 监听父组件传入的pageSize变化
    pageSize(val) {
      this.currentPageSize = val
    },
  },
  methods: {
    // 每页条数改变
    handleSizeChange(val) {
      this.currentPageSize = val
      this.$emit('update:pageSize', val)
      this.$emit('changePage')
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('update:pageNum', val)
      this.$emit('changePage')
    },
    // 表格选中 Select 触发
    handleTableSelect(val, row) {
      this.$emit('update:select', val)
      this.$emit('tableSelect', val, row)
    },
    // 行点击事件
    handleRowClick(row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    // 选择框选择改变
    handleSelectChange(val, row) {
      this.$emit('selectChange', val, row)
    },
    // 输入框内容改变
    handleInputChange(val, row) {
      this.$emit('inputChange', val, row)
    },
    // 输入框失去焦点
    handleInputBlur(event, row) {
      this.$emit('inputBlur', event, row)
    },
    // 动态生成行类名
    tableRowClassName({ row }) {
      if (this.rowConditionChangeColorArr.length > 0) {
        const colorRow = this.rowConditionChangeColorArr.find(
          (item) => row[item.condition] === item.value,
        )
        if (colorRow) return colorRow.className
      }
      return ''
    },
    // 获取行样式（用于动态背景色）
    getRowStyle({ row }) {
      if (row.rowColorField) {
        return {
          backgroundColor: row.rowColorField,
        }
      }
      return {}
    },
    /**
     * 通用自定义排序方法（适配 :sort-method）
     * @param {Object} a 行数据a
     * @param {Object} b 行数据b
     * @param {string} name 排序字段名
     * @returns {number} 比较结果
     */
    customSort(a, b, name) {
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

      // 4. 都是数字：按数值比较
      if (isNumberA && isNumberB) {
        const numA = Number(strA)
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
    },
    /**
     * 返回对应的文本和类型
     * @param {Object} statusObj 状态对象
     * @param {string|number} key 状态值
     * @returns {Object} {text, type}
     */
    returnTextAndType(statusObj, key) {
      if (!statusObj) return { text: '', type: '' }
      // 如果有 unequal 字段，判断当前字段是否等于指定值
      if (statusObj.unequal !== undefined && key !== statusObj.value) {
        return { text: statusObj.unequal.text, type: statusObj.unequal.type }
      }
      // 返回对应状态的文本和类型
      if (statusObj[key]) {
        return { text: statusObj[key].text, type: statusObj[key].type }
      }
      return { text: '', type: '' }
    },
    /**
     * 获取随机数，用途：给表格添加唯一key
     * @returns {string}
     */
    getRandomFloat() {
      return (
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      )
    },
  },
}
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
