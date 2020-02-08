<style lang="less" scoped>
@import '../../../styles/common.less';
@import '../../page-main';
</style>
<template>
  <el-card class="box-card">
    <el-dialog :visible.sync="dialogVisible" size="tiny"><img width="100%" :src="dialogImageUrl" alt="" /></el-dialog>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div style="height: 28px; width: 100%;  border-bottom: 1px solid #cccccc; text-indent: 0.6em; font-weight: bold; background: #fff; line-height: 31px">
            <div style="height: 28px; width: 3px; background: #2570b3; float: left"></div>
            加密工具
          </div>
        </div>
      </el-col>
    </el-row>
    <el-form>
      <el-row>
        <el-col :span="9">
          <el-form-item label="原文" prop="remark" label-width="50px">
            <el-input  type="textarea" :rows="20" placeholder="" v-model="form.old" size="mini">
            </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="5" style="text-align:center" >
          <el-form-item class="id-button">
            <el-button type="primary" icon="el-icon-lock" @click="findTable('search')" size="mini">生成密文</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="9" >
          <el-form-item label="密文" prop="remark"  label-width="50px">
            <el-input  type="textarea" :rows="20" placeholder="" v-model="form.new" size="mini">
            </el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>

      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import { timeFormat, timeCompare } from '@/utils/datetime';
import envelope from '../../../framework/Envelope'
export default {
  data() {
    return {
      form:{
        old: '',
        new: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      bw: '',
      filterText: '',
      checkDeptId: [],
      checkDeptName: [],
      more: false
    };
  },
  created() {
    this.init();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    init() {

    },


    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    findTable(val) {
      let envelopeNew = new envelope()
      this.form.new = envelopeNew.SimpleEncrypt(this.form.old)

    },

    createBtn() {
      this.$router.push({
        name: 'addOrganization'
      });
    },



  },
  beforeRouteLeave(to, form, next) {
    sessionStorage.removeItem('wzdjSession');
    sessionStorage.setItem('wzdjSession', JSON.stringify(this.filters));
    next();
  }
};
</script>

<style scoped></style>
