/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    'prefer-const': 2,  // 声明后永远不会重新分配的变量需要 const 声明
    'semi': [2, 'never'], // 要求或禁止使用分号而不是 ASI
    'no-var': 2,  // 需要 let 或 const 而不是 var
    'arrow-spacing': 2, // 在箭头函数中的箭头前后强制执行一致的间距
    'spaced-comment': 2,  // 在注释中的 // 或 /* 之后强制执行一致的间距
    'comma-spacing': 2, // 在逗号前后强制执行一致的间距
    'space-before-blocks': 2, // 在块之前强制执行一致的间距
    'space-infix-ops': 2, // 要求中缀运算符周围有间距
    'object-curly-spacing': [2, 'always'], // 在大括号内强制执行一致的间距
    'space-before-function-paren': 2, // 在 function 定义左括号之前强制执行一致的间距
    'no-unused-vars': 2,  // 禁止未使用的变量(ts也有检测，不过是warning)
    'keyword-spacing': 2, // 在关键字前后强制使用一致的间距
    'no-trailing-spaces': 2, // 不允许在行尾尾随空格
    'key-spacing': 2, // 在对象字面属性中强制执行键和值之间的一致间距
    'comma-dangle': [2, {
      'objects': 'always-multiline',
      'arrays': 'always-multiline',
    }],  // 要求或禁止尾随逗号
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
