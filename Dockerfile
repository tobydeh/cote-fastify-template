FROM node:16-alpine

ARG service_dir
COPY $service_dir /app
COPY shared /shared
COPY tsconfig.base.json /

WORKDIR /app

RUN npm install && npm run build && npm prune --production

ENV NODE_PATH dist/

CMD ["node", "dist/main.js"]
