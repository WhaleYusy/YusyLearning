/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-var': 2,  // 需要 let 或 const 而不是 var
    'prefer-const': 2,  // 声明后永远不会重新分配的变量需要 const 声明
    'semi': [2, 'never'], // 要求或禁止使用分号而不是 ASI
    'arrow-spacing': 2, // 在箭头函数中的箭头前后强制执行一致的间距
    'spaced-comment': 2,  // 在注释中的 // 或 /* 之后强制执行一致的间距
  }
}
