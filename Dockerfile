FROM node:latest

COPY package.json .
COPY node_modules node_modules

COPY proxy.js .
RUN mkdir -p /dst
COPY dst /dst
run mkdir -p src/lib
run mkdir -p src/lib-static
COPY src/lib src/lib
COPY src/lib-static src/lib-static

EXPOSE 3333

CMD ["node", "proxy.js"]