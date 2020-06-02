####################
###  Node Setup  ###
####################
FROM node:10.13-alpine as node-angular-cli
#Linux setup
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

#Angular CLI
RUN npm install -g @angular/cli@8.0.3

####################
### Node Builder ###
####################
FROM node-angular-cli as node-builder

RUN mkdir -p /build

COPY ./e2e /psi20online-view/e2e
COPY ./src /psi20online-view/src
COPY ./angular.json /psi20online-view/angular.json
COPY ./package.json /psi20online-view/package.json
COPY ./tsconfig.json /psi20online-view/tsconfig.json
COPY ./tslint.json /psi20online-view/tslint.json
COPY ./tsconfig.app.json /psi20online-view/tsconfig.app.json
COPY ./tsconfig.spec.json /psi20online-view/tsconfig.spec.json

WORKDIR /psi20online-view

RUN npm install && ng build --prod


####################
### Node Runner ###
####################
FROM nginx:alpine
COPY --from=node-builder /psi20online-view/dist/psi20online-view /usr/share/nginx/html
EXPOSE 80
