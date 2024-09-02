export default [
  {
    key: 'name',
    label: '姓名',
    type: 'input'
  },
  {
    key: 'zone',
    label: '地区',
    type: 'select',
    options: [
      {
        value: 'China',
        label: '中国'
      },
      {
        value: 'Russia',
        label: '俄罗斯'
      }
    ]
  },
  {
    key: 'birthday',
    label: '生日',
    type: 'date'
  },
  {
    key: 'isBest',
    label: '是否最棒',
    type: 'switch'
  },
  {
    key: 'hobby',
    label: '兴趣爱好',
    type: 'checkbox',
    options: [
      {
        value: 'basketball',
        label: '篮球'
      },
      {
        value: 'football',
        label: '足球'
      },
      {
        value: 'ping-pong',
        label: '乒乓球'
      }
    ]
  },
  {
    key: 'sex',
    label: '性别',
    type: 'radio',
    options: [
      {
        value: true,
        label: '男性'
      },
      {
        value: false,
        label: '女性'
      }
    ]
  }
]
