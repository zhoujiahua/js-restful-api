# 使用官方 Node.js 镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制项目文件到工作目录
COPY . .

# 使用环境变量设置 Node.js 运行环境
ENV NODE_ENV=production

# 编译项目
RUN npm run build

# 暴露端口
EXPOSE 3000

# 运行项目
CMD ["npm", "start"]
