# base image
FROM node:12.12.0-alpine

# set working directory
WORKDIR /usr/app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/app
RUN npm install

COPY . /usr/app
# EXPOSE 4000

# start app
CMD ["npm", "run", "start"]