<template>
  <el-dialog
    title="配置资源"
    :visible.sync="dialogVisible"
    width="60%"
    :append-to-body="true"
    :before-close="handleClose">
    <el-tree
      v-if="loadReturn"
      :props="propsTree"
      :load="loadNode"
      ref="tree"
      node-key="id"
      lazy
      :check-strictly="false"
      show-checkbox
      :highlight-current="true"
      :default-checked-keys="moRenChose"
      accordion
      :node-collapse="choseJieDian"
      @node-click="handleNodeClick">
    </el-tree>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="pasTreeData">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>import {unescapeHTML} from '@/utils/translation'
    export default {
        name: 'peiZhi',
        props: ['dialogVisible', 'roleId'],
        data () {
            return {
                getAllNode: [],
                loadReturn: false,
                nodeFirst: [],
                moRenChose: [],
                propsTree: {
                    label: 'menu_name',
                    children: 'zones'
                },
            }
        },
        methods:{
            handleClose () {
              this.$emit('closrDialog', false)
              this.loadReturn = false
            },
            pasTreeData () {
                this.getAllNode.forEach(function (e, i) {
                    e.checked = 'false'
                })
                let getCheckedNodes = this.$refs.tree.getCheckedNodes()
                let getHalfCheckedNodes = this.$refs.tree.getHalfCheckedNodes()
                getCheckedNodes.forEach(function (e, i) {
                    e.checked = 'true'
                })
                getHalfCheckedNodes.forEach(function (e, i) {
                  // e.checked = 'true'
                })
              debugger
                let jsondata = encodeURI(JSON.stringify(this.getAllNode))
                let jsondataBtoa = window.btoa(jsondata)
                this.$api.RoleManage.saveChildrenNode({role_id: this.roleId, jsondata: jsondataBtoa}).then((res) => {
                    if (res.content.header.default.message) {
                        this.$message({message: res.content.header.default.message, type: 'success'})
                    }
                    this.$emit('closrDialog', false)
                    this.loadReturn = false
                })
            },
            choseJieDian (data, node, eve) {

            },
            loadNode (node, resolve) {
                if (node.level === 3) {
                    resolve([])
                }
                if (node.level === 2) { // 三级节点
                    this.getChildrenNodeThird(node, resolve)
                }
                if(node.level === 1) { // 二级节点
                    this.getChildrenNode(node,resolve)
                }
                if(node.level === 0) { // 一级节点
                    this.getMenuList(node, resolve)
                }
            },
            getChildrenNodeThird (node, resolve) { // 三级
                let self = this
                node.data.menu_funcs.forEach(function (e, i) {
                    e.menu_name = e.func_name_cn
                    e.id = e.func_id
                    if (e.checked === 'true') {
                        self.moRenChose.push(e.id)
                    }
                })
              resolve(node.data.menu_funcs)
            },
            getChildrenNode (node, resolve) { // 二级
                let self = this
                node.data.children.forEach(function (e, i) {
                    if (e.checked === 'true') {
                        self.moRenChose.push(e.id)
                    }
                })
                resolve(node.data.children)
            },
            getMenuList (node, resolve) { // 一级
                let self = this
                this.moRenChose = []
                this.$api.RoleManage.getRoleDetail({role_id: this.roleId}).then((res) => {
                    let getNode = JSON.parse(unescapeHTML(res.content.jsondata))
                    getNode.forEach(function (e, i) {
                        if (e.checked === 'true') {
                          self.moRenChose.push(e.id)
                        }
                    })
                    self.getAllNode = getNode
                    resolve(self.getAllNode)
                })
            }
        },
        created() {
            // this.getMenuList()
        },
        watch: {
            dialogVisible (newVla, oldVal) {
                if (newVla) {

                    this.loadReturn = newVla
                    this.loadNode()
                }
            }
        }
    }
</script>

<style scoped>

</style>
