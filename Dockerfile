FROM node:14
RUN git clone https://github.com/abdullah5151/WhatappProjects/tree/Koyeb-Deploy
WORKDIR /app/WhatappProjects
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
