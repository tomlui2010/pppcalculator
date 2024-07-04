FROM node:18-alpine
WORKDIR /app
COPY frontend/public/ /app/public
COPY frontend/src/ /app/src
COPY frontend/package.json /app/
RUN npm install
CMD ["npm", "start"]