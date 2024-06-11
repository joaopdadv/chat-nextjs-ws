FROM node:20

# Set the working directory
WORKDIR /app

COPY . /app

# Install dependencies

RUN npm i

# Expose the port
EXPOSE 3000

# Start the application
# pnpm prisma migrate dev --name "start"