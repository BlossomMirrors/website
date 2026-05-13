FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENV PORT=80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
