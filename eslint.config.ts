module.exports = {
  parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020, // 支持现代 JavaScript
    sourceType: 'module', // 支持 ES 模块
    ecmaFeatures: {
      jsx: true, // 启用 JSX 支持
    },
  },
  rules: {
    // 关闭可能导致冲突的规则
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
