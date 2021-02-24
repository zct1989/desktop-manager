FROM node:lts-alpine as builder

ADD . /builder/

WORKDIR /builder

RUN yarn install \
  && npm run build


ENTRYPOINT ["npm","run","start:prod"]

EXPOSE 80


