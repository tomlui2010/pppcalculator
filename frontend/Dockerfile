FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app
COPY frontend/public/ /app/public
COPY frontend/src/ /app/src

# Copy the package.json and package-lock.json files
COPY frontend/package.json /app/
COPY frontend/package-lock.json /app/

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY frontend/ /app/

RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start the React app
CMD ["nginx", "-g", "daemon off;"]