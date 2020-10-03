FROM node:latest
LABEL maintainer="Majid Akbari <majidakbariiii@gmail.com>"

RUN mkdir /node
COPY ./app /node
RUN rm -rf /node/node_modules
RUN cd /node && npm install && npx tsc
RUN npm install -g pm2 --no-optional

WORKDIR /node

ENTRYPOINT ["npm", "start"]