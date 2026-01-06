<template>
  <div :style="{ '--imgHeight': imgHeight, '--imgWidth': imgWidth }">
    <el-table
      v-loading="loading"
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
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        reserve-selection
        :fixed="getFirstColumnFixed"
      />
      <el-table-column
        v-for="item in tableColumn"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align || 'center'"
        :fixed="item.fixed || false"
        :sortable="item.sortable"
        :show-overflow-tooltip="item.tooltip"
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
          <slot v-else-if="item.slot" :name="item.slot" v-bind="scope">{{
            scope.row[item.prop]
          }}</slot>
          <!-- 选择框 -->
          <el-select
            v-else-if="item.select"
            v-model="scope.row[item.prop]"
            @change="item.selectChange ? item.selectChange(scope.row[item.prop], scope.row) : null"
            :placeholder="item.placeholder || '请选择'"
            :clearable="item.clearable"
            :disabled="getFormDisabled(item, scope.row)"
            style="width: 100%"
          >
            <el-option v-for="i in item.list" :key="i.value" :label="i.label" :value="i.value" />
          </el-select>
          <!-- 输入框 -->
          <el-input
            v-else-if="item.input"
            v-model="scope.row[item.prop]"
            :disabled="getFormDisabled(item, scope.row)"
            @input="
              item.inputChange
                ? item.inputChange(scope.row[item.prop], scope.row)
                : handleInputChange($event, scope.row, item)
            "
            @blur="item.inputBlur ? item.inputBlur(scope.row[item.prop], scope.row) : null"
            style="width: 100%"
            :type="item.type || 'text'"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :clearable="item.clearable"
          />
          <!-- 复选框 -->
          <el-checkbox
            v-else-if="item.checkbox"
            v-model="scope.row[item.prop]"
            :true-label="item.trueLabel"
            :false-label="item.falseLabel"
            :clearable="item.clearable"
            :disabled="getFormDisabled(item, scope.row)"
            @change="item.checkboxChange ? item.checkboxChange($event, scope.row) : null"
          />
          <el-radio-group
            v-else-if="item.radio"
            v-model="scope.row[item.prop]"
            :disabled="getFormDisabled(item, scope.row)"
            @input="item.radioInput ? item.radioInput(scope.row[item.prop], scope.row) : null"
          >
            <el-radio v-for="i in item.list" :key="i.value" :label="i.value">{{
              i.label
            }}</el-radio>
          </el-radio-group>
          <!-- tag. 目前仅支持element tag的参数 primary success info warning danger-->
          <el-tag
            v-else-if="item.tag"
            :type="returnTextAndType(item.statusObj, scope.row[item.prop]).type"
          >
            {{ returnTextAndType(item.statusObj, scope.row[item.prop]).text }}
          </el-tag>
          <!-- 默认文本展示 -->
          <div v-else :style="{ color: item.color || '' }">
            <span v-if="validateField(scope.row[item.prop]) && !item.or">{{
              item.leftIcon || ''
            }}</span>
            {{
              scope.row[item.prop] !== undefined &&
              scope.row[item.prop] !== null &&
              scope.row[item.prop] !== ''
                ? scope.row[item.prop]
                : item.or
            }}
            <span v-if="validateField(scope.row[item.prop]) && !item.or">{{
              item.rightIcon || ''
            }}</span>
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
        :page-sizes="[5, 10, 20, 30, 50, 100]"
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
 * ========== Props 属性配置 ==========
 * @property {Array} tableData - 表格数据
 * @property {Array} tableColumn - 表格列配置，详见下方说明
 * @property {Number} pageNum - 当前页码，支持 .sync 修饰符
 * @property {Number} pageSize - 每页条数，支持 .sync 修饰符
 * @property {Number} total - 数据总条数
 * @property {String|Number} height - 表格高度，默认 null，最大高度 700px
 * @property {Boolean} selection - 是否展示多选框，默认 false
 * @property {Boolean} tableColumnIndex - 是否展示序号列，默认 false
 * @property {String} imgHeight - 图片高度，默认 '0.2rem'
 * @property {String} imgWidth - 图片宽度，默认 '0.2rem'
 * @property {Object} headerStyle - 表头样式，默认 { background: '#f5f7fa' }
 * @property {Boolean} pagination - 是否展示分页，默认 true
 * @property {String} paginationClass - 分页容器自定义类名
 * @property {Array} rowConditionChangeColorArr - 行条件变色配置数组，详见下方说明
 * @property {String} uniqueValue - 行数据唯一值字段名，默认 'id'
 * @property {Boolean} highlightCurrentRow - 是否高亮当前行，默认 false
 *
 * ========== Events 事件 ==========
 * @event changePage - 分页变化时触发（页码或每页条数变化）
 * @event tableSelect - 多选框选中状态变化时触发，参数: selection
 * @event row-click - 行点击时触发，参数: row, column, event
 * @event update:pageNum - 页码更新事件（配合 .sync 使用）
 * @event update:pageSize - 每页条数更新事件（配合 .sync 使用）
 *
 * ========== 表格列配置 tableColumn 说明 ==========
 * @property {String} prop - 列的value字段（必填）
 * @property {String} label - 列名（必填）
 * @property {String|Number} [width] - 列宽
 * @property {String} [align] - 对齐方式，默认 'center'
 * @property {Boolean|String} [fixed] - 是否固定列，可选 true/'left'/'right'
 * @property {Boolean|String} [sortable] - 是否可排序，可选 true/'custom'
 * @property {Boolean} [isCustomSort] - 是否使用自定义排序方法
 * @property {String} [color] - 文字颜色
 *
 * --- 文本展示类 ---
 * @property {String} [leftIcon] - 文本左侧图标/符号，如 '¥'
 * @property {String} [rightIcon] - 文本右侧图标/符号
 * @property {String} [or] - 当值为空时显示的默认值，如 '--'
 *
 * --- 状态展示类 ---
 * @property {Boolean} [pan] - 是否根据状态展示不同文字（不用tag）
 * @property {Boolean} [tag] - 是否展示为Element Tag标签
 * @property {Object} [statusObj] - 状态映射对象，如 { 0: { text: '编辑中', type: '' }, 1: { text: '待审核', type: 'warning' } }
 *
 * --- 图片展示 ---
 * @property {Boolean} [img] - 是否展示图片，支持预览
 *
 * --- 插槽 ---
 * @property {String} [slot] - 是否使用插槽，为String时为插槽名
 * @property {String} [name] - 插槽名称（与slot一起使用）
 *
 * --- 表单元素 ---
 * @property {Boolean} [select] - 是否展示选择框
 * @property {Boolean} [input] - 是否展示输入框（仅允许输入正数）
 * @property {Boolean} [checkbox] - 是否展示复选框
 * @property {Boolean} [radio] - 是否展示单选框
 * @property {Array} [list] - 选择框/单选框的选项列表，格式: [{ label: '显示文字', value: '值' }]
 * @property {String} [placeholder] - 输入框/选择框的placeholder
 * @property {Boolean} [clearable] - 是否可清空
 * @property {String} [type] - 输入框类型，默认 'text'
 * @property {*} [trueLabel] - 复选框选中时的值
 * @property {*} [falseLabel] - 复选框未选中时的值
 *
 * --- 表单事件回调 ---
 * @property {Function} [selectChange] - 选择框变化回调，参数: (value, row)
 * @property {Function} [inputChange] - 输入框变化回调，参数: (value, row)
 * @property {Function} [inputBlur] - 输入框失焦回调，参数: (value, row)
 * @property {Function} [checkboxChange] - 复选框变化回调，参数: (checked, row)
 * @property {Function} [radioInput] - 单选框变化回调，参数: (value, row)
 *
 * --- 表头Tooltip ---
 * @property {String} [tooltipIcon] - 表头提示图标类名，如 'el-icon-question'
 * @property {String} [tooltipContent] - 表头提示tooltiop内容
 *
 * ========== 行条件变色配置 rowConditionChangeColorArr 说明 ==========
 * @description 根据行数据条件动态添加行样式类名
 * @property {String} condition - 条件字段名（行数据的字段）
 * @property {String|Number} value - 条件值
 * @property {String} className - 条件满足时添加的class名称
 * @example
 * // 示例：当 status 为 1 时，添加 warning-row 样式
 * rowConditionChangeColorArr: [
 *   { condition: 'status', value: 1, className: 'warning-row' }
 * ]
 *
 * ========== 使用示例 ==========
 * <my-table
 *   :tableData="dataList"
 *   :tableColumn="tableColumn"
 *   :total="total"
 *   :pageNum.sync="queryParams.pageNum"
 *   :pageSize.sync="queryParams.pageSize"
 *   :selection="true"
 *   :loading="loading"
 *   highlightCurrentRow
 *   @changePage="getList"
 *   @row-click="handleRowClick"
 *   @tableSelect="handleSelectionChange"
 * >
 *   <template #action="{row}">
 *     <el-button @click="handleEdit(row)">编辑</el-button>
 *   </template>
 * </my-table>
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
    loading: {
      // 是否显示加载中
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
      // this.$emit('selectChange', val, row)
    },
    // 输入框内容改变
    handleInputChange(val, row, item) {
      // 输入框的数据只能为正数
      if (item.zheng) {
        let value = val.replace(/[^\d.]/g, '') // 只保留数字和小数点
        value = value.replace(/^\./, '') // 不能以小数点开头
        value = value.replace(/(\..*?)\..*/g, '$1') // 只保留第一个小数点
        if (value && parseFloat(value) < 0) {
          value = ''
        }
        row[item.prop] = value
      }
    },
    // 输入框失去焦点
    handleInputBlur(event, row) {
      // this.$emit('inputBlur', event, row)
    },
    // 校验字段
    validateField(prop) {
      if (prop === undefined || prop === null || prop === '') return false
      return true
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
          color: `${row.fontColorField} !important`,
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
     * 获取表单元素禁用状态
     * @param {Object} item 列配置
     * @param {Object} row 行数据
     * @returns {Boolean} 是否禁用
     */
    getFormDisabled(item, row) {
      // 支持函数回调
      if (typeof item.disabled === 'function') {
        return item.disabled(row)
      }
      // 支持字段名（兼容旧写法 isEditText）
      if (item.disabledField) {
        return row[item.disabledField]
      }
      if (item.isEditText) {
        return row[item.isEditText]
      }
      // 支持固定布尔值
      return item.disabled || false
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
  // box-shadow: 0 -0.20833vw 0.41667vw 0 rgba(217, 217, 217, 0.25);
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
