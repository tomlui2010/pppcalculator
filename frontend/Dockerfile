FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app
COPY frontend/public/ /app/public
COPY frontend/src/ /app/src

# Copy the package.json and package-lock.json files
COPY frontend/package.json /app/
COPY frontend/package-lock.json /app/

# Install npm dependencies
RUN npm install

# Install react-scripts globally
RUN npm install react-scripts@5.0.1 -g

# Copy the rest of the application code
COPY frontend/ /app/

# Expose port 80 to the outside world
EXPOSE 3000

# Start the React app
CMD ["npm", "start", "--host", "0.0.0.0", "--disable-host-check"]