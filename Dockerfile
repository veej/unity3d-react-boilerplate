FROM node:8.13 as build

WORKDIR /srv/web

ADD package.json .
ADD yarn.lock .

RUN yarn --no-progress

ADD . .

RUN yarn build

FROM nginx

COPY --from=build /srv/web/build /usr/share/nginx/html
COPY deploy/default.conf /etc/nginx/conf.d/default.conf
