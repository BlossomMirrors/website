FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

ENV PUBLIC_POSTHOG_PROJECT_TOKEN=${PUBLIC_POSTHOG_PROJECT_TOKEN}
ENV PUBLIC_POSTHOG_HOST=${PUBLIC_POSTHOG_HOST}

RUN touch .env
RUN printenv > .env

FROM oven/bun:latest AS runner
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build/index.js"]
