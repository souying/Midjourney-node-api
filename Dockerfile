FROM node:20.2-alpine3.17 AS builder

WORKDIR /Midjourney

COPY package*.json ./

RUN npm install --production

FROM node:20.2-alpine3.17

ENV APP_DIR=/Midjourney

WORKDIR ${APP_DIR}

COPY --from=builder ${APP_DIR}/node_modules ${APP_DIR}/node_modules

COPY . ${APP_DIR}

RUN npm install -g pm2

EXPOSE 3000

#CMD pm2-runtime start app.js --name "Midjourney"
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
