FROM node:24-alpine
WORKDIR /usr/src/app

RUN apk update
COPY . .
RUN npm ci

ENV NODE_ENV=production
RUN npm run build
EXPOSE 5100

CMD ["npm", "start"]
