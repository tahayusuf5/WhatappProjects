FROM node:14

RUN git clone https://github.com/abdullah5151/WhatappProjects.git /app/WhatappProjects

WORKDIR /app/WhatappProjects

COPY package*.json ./
RUN npm install --production

COPY . .

RUN apt-get update && apt-get install -y nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 3000

CMD service nginx start && node index.js
