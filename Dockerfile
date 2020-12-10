# =================== Start of BUILD ====================

# Stage 1

# pulling node image from docker hub
FROM node:14.15.1-alpine as build-step

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json /app

# Install app dependencies
RUN npm install

# coping all source code
COPY . /app

# RUNNING Commands 
RUN npm run build --prod

# Stage 2

# pulling nginx image from docker hub
FROM nginx:1.17.1-alpine

# coping all dist floder to ngInx file
COPY --from=build-step /app/dist /usr/share/nginx/html

# =================== End of BUILD ====================
