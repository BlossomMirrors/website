FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM oven/bun:latest AS runner
WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
