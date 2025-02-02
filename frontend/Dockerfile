FROM node:20-alpine

WORKDIR /frontendapp/


COPY public/ /frontendapp/public
COPY src/ /frontendapp/src
COPY package.json /frontendapp/

RUN npm install

CMD ["npm", "start"]

