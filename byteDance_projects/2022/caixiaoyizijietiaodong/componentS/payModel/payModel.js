Component({
  properties: {
    payPoint:{
      type: Number,
      value: 0
    },
    // 输入框的数量
    inputLength: {
      type: Number,
      value: 6
    },
    // 单个输入框的宽度
    inputWidth: {
      type: String,
      value: '80rpx'
    },
    inputHeight: {
      type: String,
      value: '74rpx'
    },
    // 是否显示输入的值，默认隐藏
    showValue: {
      type: Boolean,
      value: false
    }
  },
  data: {
    link:'',
    content: '',
    KeyboardKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, ' ', 0, '删除'],
    keyShow: true
  },
  methods: {
    init(){
      this.setData({
        link:''
      })
    },
    hindKeyboard() {
      this.setData({
        keyShow: false
      });
    },
    //点击输入框，键盘显示
    showKeyboard() {
      this.setData({
        keyShow: true
      });
    },
    close(){
      this.triggerEvent("close")
      this.setData({
        content:'',
        link:'',
      })
    },
    keyTap(e) {
      let keys = e.currentTarget.dataset.keys
      console.log(keys)
      let index = e.currentTarget.dataset.index
      console.log(index)
      // this.setData({ content });
      if (keys !== "删除" && this.data.content.length<6){
        this.data.content = this.data.content + keys
      }
      if(keys == '删除'){
        this.data.content = this.data.content.slice(0,-1)
      }
      this.setData({
        content: this.data.content
      })
      console.log(this.data.content)
      if (this.data.content.length == 6){
        //校验密码是否正确
        this.triggerEvent('check', this.data.content);  
      }
    },
  }
})