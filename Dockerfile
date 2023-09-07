ARG NODE_VERSION=node:18-alpine
FROM $NODE_VERSION AS build-stage

WORKDIR /app
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build

FROM $NODE_VERSION AS production-stage

WORKDIR /app
COPY --from=build-stage /app/.output /app/.output

ENV PORT=8040
ENV NUXT_PUBLIC_API_URL=https://api.kuizuo.cn

EXPOSE 8040

CMD [ "node", "/app/.output/server/index.mjs" ]