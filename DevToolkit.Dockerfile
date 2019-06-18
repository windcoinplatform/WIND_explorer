FROM node:8-alpine
WORKDIR /app
COPY . ./
RUN yarn install

EXPOSE 8080
ENTRYPOINT yarn start:toolkit --env.TOOLKIT_API_NODE_URL=$API_NODE_URL --env.TOOLKIT_NODE_LIST=$NODE_LIST
