FROM node:14.13 AS builder

ADD web/package.json \
  web/package-lock.json \
  /usr/web/

WORKDIR /usr/web/
RUN npm ci

COPY web/elm.json \
  web/tailwind.config.js \
  web/postcss.config.js \
  /usr/web/
COPY web/media /usr/web/media
COPY web/src/ /usr/web/src/

RUN npm run copy:media
RUN npx elm make src/*.elm --output=/dev/null
RUN npm run build


FROM nginx:1.17

COPY --from=builder /usr/web/build /usr/share/nginx/html