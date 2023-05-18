#!/bin/bash
set -e

if [ ! -d ${APP_DIR}/basedata ]; then
  echo "没有映射basedata数据库目录给本容器，请先映射数据库目录...\n"
  exit 1
fi

if [ -s ${APP_DIR}/basedata/.env ]; then
  \cp -fv ${APP_DIR}/basedata/.env ${APP_DIR}/.env  
fi

if [ ! -s ${APP_DIR}/.env ]; then
  echo "检测到不存在.env文件，从示例文件复制一份用于初始化...\n"
  cp -fv ${APP_DIR}/.env.example ${APP_DIR}/.env 
  cp -fv ${APP_DIR}/.env.example ${APP_DIR}/basedata/.env
fi


chmod -R 755 ${APP_DIR}/basedata

#清除pm2日志文件
pm2 flush >/dev/null

#前台启动pm2
pm2-runtime start ${APP_DIR}/bin/www --name "Midjourney"

exec "$@"
