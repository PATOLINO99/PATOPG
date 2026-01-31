FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache openssl git curl
COPY package.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npx prisma generate
RUN npm run build || true
EXPOSE 3000
CMD npx prisma db push && npm start
