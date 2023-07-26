FROM node:alpine
WORKDIR /app
COPY ./app/package.json ./
COPY ./app/package-lock.json ./
COPY ./app ./
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "dev"]