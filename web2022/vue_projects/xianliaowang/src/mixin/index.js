import Vue from 'vue'

const mixin = {
  methods: {
    // 是否执行某操作提示
    confirmMsg(text, actions) {
      this.$confirm(`您确定要${text}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        actions()
        this.$message({
          type: 'success',
          message: `${text}成功!`
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${text}`
        });
      });
    },

    // 提交校验
    confirmForm(name, actions) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          actions();
        } else {
          this.$message('请填完信息!')
          return false;
        }
      });
    }
  }
}

export default mixin;