# gofund-app
FROM node:lts-alpine

ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
# This docker file will copy code from app directory
# including the node_modules and .next folder.
COPY . .
#COPY node_modules .
#COPY package.json .

EXPOSE 3000
# This run the server at default port 3000
CMD ["npm", "run", "start"]