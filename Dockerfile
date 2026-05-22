FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4173

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb* ./

RUN bun install --production --frozen-lockfile

EXPOSE 4173

CMD ["bun", "run", "start"]
