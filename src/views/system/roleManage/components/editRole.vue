<style lang="less" scoped>
  @import '../../../../styles/deep-ele.less';
  @import '../../../../styles/common.less';
  @import '../../../page-main';
  .role-title {width: 100%; line-height: 20px}
</style>
<template>
  <el-dialog
    title="新增/编辑角色信息"
    :visible.sync="displayNot"
    width="60%"
    :append-to-body="true"
    :before-close="handleClose">
        <el-form ref="formRole" :model="filters" size="mini" :rules="dataFormRules"  label-position="right" label-width="80px" :validate-on-rule-change="false">
          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="filters.role_name" size="mini" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="排序号" prop="role_order">
          <el-input type='number' v-model="filters.role_order" size="mini" placeholder="请输入排序号"></el-input>
        </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="filters.status" placeholder="请选择">
              <el-option value="0" label="禁用"></el-option>
              <el-option value="1" label="启用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据范围" prop="by01">
            <el-select v-model="filters.by01" placeholder="请选择">
              <el-option value="1" label="本人"></el-option>
              <el-option value="2" label="仓管员"></el-option>
              <el-option value="3" label="本部门"></el-option>
              <el-option value="4" label="本部门及其下属部门"></el-option>
              <el-option value="5" label="上级部门及其下属部门"></el-option>
              <el-option value="6" label="本单位"></el-option>
              <el-option value="7" label="所有"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="filters.remark" type="textarea" size="mini" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="mini">取 消</el-button>
      <el-button type="primary" @click="submenuBit" size="mini">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
    export default {
        name: "editRole",
        props: ["displayNot", "roleIdEdit"],
        data () {
            return{
                filters: {
                    id: '',
                    role_name: '',
                    role_order: '',
                    by01: '',
                    status: '',
                    remark: ''
                },
                dataFormRules: {
                    role_name: [
                        {required: true, message: '这是必填字段', trigger: 'blur'},
                        { type: 'string', min: 2, max: 10, message: '请输入2-10个字符', trigger: 'blur' }
                    ],
                    role_order: [
                        {required: true, message: '这是必填字段', trigger: 'blur'},
                        {min: 0, max: 9, message: '长度不得超过9位'}
                    ],
                    by01: [
                        {required: true, message: '这是必填字段', trigger: ['blur','change']},
                    ],
                    status: [
                        {required: true, message: '这是必填字段', trigger: 'change'},
                    ],
                    remark:[
                      {min: 0, max: 200, message: '长度不得超过200字符'}
                    ]
                },
            }
        },
        methods: {
            handleClose () {
              this.$refs['formRole'].resetFields()
              this.$emit('getRoleDisplay', false)
            },
            submenuBit () {
                let that = this
                this.$refs['formRole'].validate((valid) => {
                  if (valid) {
                      let params = {}
                      let self = this
                      if (this.roleIdEdit) {
                          params = {
                              method: 'update',
                              paramsData: this.filters
                          }
                      } else {
                          params = {
                              method: 'save',
                              paramsData: this.filters
                          }
                      }
                      if (this.filters.role_order) {
                          if (this.filters.role_order.indexOf('.') >= 1) {
                              this.$message.error('排序号请输入整数！')
                              this.filters.role_order = ''
                              return false
                          }
                      }
                      this.$api.RoleManage.saveRoleInfo(params).then(function (res) {
                          if (res.content.success === 'true') {
                            //重置表单数据
                            if (that.$refs.formRole!== undefined) {
                              that.$refs.formRole.clearValidate();
                              that.$refs.formRole.resetFields();
                            }
                              self.$message({message: res.content.message, type: 'success'})
                              self.$emit('getRoleDisplay', false)
                          }
                      })
                  } else {
                      this.$emit('getRoleDisplay', true)
                  }
                })
            },
            getRoleInfoEdit (val) {
                let self = this
                this.$api.RoleManage.getRoleInfo({id: val}).then(function (res) {
                    self.filters = res.content
                })
            }
        },
        created () {
          //重置表单数据
          if (this.$refs.formRole !== undefined) {
            this.$refs.formRole.clearValidate();
            this.$refs.formRole.resetFields();
          }
        },
       watch: {
           roleIdEdit (newVal, oldVal) {
            if (this.roleIdEdit) {
              this.getRoleInfoEdit(newVal)
            }
           }
       }
    }
</script>

<style scoped>

</style>
