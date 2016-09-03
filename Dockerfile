FROM node:latest

COPY package.json .
COPY node_modules node_modules

COPY proxy.js .
RUN mkdir -p /dst
COPY dst /dst
COPY src src

EXPOSE 3333

CMD ["node", "proxy.js"]