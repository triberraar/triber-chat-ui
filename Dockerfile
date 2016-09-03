FROM node:latest

COPY package.json .
COPY node_modules node_modules
COPY proxy.js .
COPY index.html index.html
COPY chat.html chat.html
COPY dst dst
COPY src src

EXPOSE 3333

CMD ["node", "proxy.js"]