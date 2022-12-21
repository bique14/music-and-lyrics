FROM node:14.13 AS builder

ADD web/package.json \
  web/package-lock.json \
  web/tsconfig.json \
  /usr/web/

WORKDIR /usr/web/
RUN npm ci

COPY web/tailwind.config.cjs \
  web/postcss.config.cjs \
  web/index.html \
  /usr/web/
COPY web/public/ /usr/web/public/
COPY web/src/ /usr/web/src/

RUN npm run build
# RUN ls
# RUN cat dist/index.html

FROM nginx:1.17

COPY --from=builder /usr/web/dist /usr/share/nginx/html
