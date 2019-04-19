FROM node:10.15.3

# Create app directory
WORKDIR /rule_server

COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 1111
CMD [ "npm", "start" ]