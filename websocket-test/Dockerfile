FROM node:20

# Set the working directory
WORKDIR /app

COPY . /app

# Install dependencies

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm prisma generate

# Expose the port
EXPOSE 3001

# Start the application
# pnpm prisma migrate dev --name "start"
CMD ["pnpm", "prisma", "migrate", "dev", "--name", "start"]