from node
workdir /app
copy app/package*.json ./
run npm install
copy ./app/ .
expose 9999
entrypoint node server.js