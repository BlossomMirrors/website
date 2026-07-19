FROM denoland/deno:latest AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends nodejs && rm -rf /var/lib/apt/lists/*
COPY package.json deno.json deno.lock ./
RUN deno install --frozen --allow-scripts
COPY . .
RUN deno task build

FROM denoland/deno:latest AS runner
WORKDIR /app
COPY --from=builder /deno-dir /deno-dir
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json deno.json deno.lock ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["deno", "run", "--allow-all", "build/index.js"]
