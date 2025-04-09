
# Happy Shopping

一个基于 React + TypeScript 开发的现代化电商小程序。

## 项目简介

Happy Shopping 是一个功能完善的电商小程序，提供商品浏览、购物车管理、订单处理等核心功能。项目采用现代化的技术栈和最佳实践，确保良好的用户体验和代码可维护性。

## 技术栈

- **前端框架**：React 18
- **开发语言**：TypeScript
- **样式处理**：SASS
- **路由管理**：React Router v6
- **HTTP 请求**：Axios
- **UI 组件**：Swiper
- **构建工具**：CRACO
- **代码规范**：ESLint
- **样式标准化**：Normalize.css

## 项目结构

```
src/
├── components/     # 可复用组件
├── containers/     # 页面级组件
├── hooks/         # 自定义 React Hooks
├── styles/        # 样式文件
├── utils/         # 工具函数
├── static/        # 静态资源
├── App.tsx        # 应用程序主组件
└── index.js       # 应用程序入口文件
```

## 开始使用

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.14.0

### 安装

1. 克隆项目
```bash
git clone [项目地址]
cd HappyShopping
```

2. 安装依赖
```bash
npm install
```

### 开发

启动开发服务器：
```bash
npm start
```
访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建

构建生产环境版本：
```bash
npm run build
```

### 测试

运行测试：
```bash
npm test
```

## 主要功能

- 商品展示和搜索
- 购物车管理
- 订单处理
- 用户中心

## 开发规范

- 遵循 TypeScript 类型检查
- 使用 ESLint 进行代码规范检查
- 组件采用函数式组件和 Hooks
- 使用 SASS 模块化管理样式

## 部署

项目构建后会生成 `build` 目录，包含所有静态资源，可直接部署到任何静态文件服务器。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request



