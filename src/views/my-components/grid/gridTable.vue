<template>
  <div>
    <el-table
      ref="table"
      :data="tableData"
      border
      :header-cell-style="{background:'#e6e6e6'}"
      highlight-current-row
      size="mini"
      style="width:100%; font-size: 12px;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;">
      <el-table-column :show-overflow-tooltip="true" v-for="(item,index) in tableLabel" :width="item.width ? item.width : ''" :key="index" :align="item.align" :label="item.label" :prop="item.prop" :sortable="item.sortable ? 'custom' : false">
        <template slot-scope="scope">
          <div v-if="item.render">
          <span >
            {{item.render(scope.row)}}
          </span>
          </div>
          <div v-else>
          <span style="color:#5287d8" v-if="item.click" @click="handleByName(item.click, scope.row)">
            {{scope.row[item.prop]}}
          </span>
          <span style="width:100%; font-size: 12px;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;" v-else>{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="tableOption.label" :width="tableOption.width" :label="tableOption.label" align="center">
        <template slot-scope="scope">
          <i v-for="(item,index) in tableOption.options" :key="index" :class="item.icon" @click="handleByName(item.methods, scope.row)" v-access :id="item.idBtn" :title="item.label"
            style="font-size: 20px; margin-left: 12px"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'gridTable',
    props: {
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      },
      tableLabel: {
        type: Array,
        default: () => {
          return []
        }
      },
      tableOption: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      handleByName (methodName, row) {
        this.$emit(methodName, row)
      },
    },
  }
</script>

<style scoped>

</style>
