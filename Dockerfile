FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . ./
RUN npx prisma generate
CMD ["npm", "run", "dev"]