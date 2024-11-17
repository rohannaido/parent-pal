FROM node:20-slim AS base
RUN apt-get update && apt-get install -y openssl ca-certificates

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=database db:generate
WORKDIR /usr/src/app/packages/database
RUN pnpm add -g typescript
RUN tsc
WORKDIR /usr/src/app
RUN pnpm run -r build
RUN pnpm deploy --filter=cron --prod --no-optional /prod/cron
RUN pnpm deploy --filter=web --prod --no-optional /prod/web
COPY ./packages/database /prod/cron/node_modules/@parent-pal/database
# COPY ./packages/database /prod/web/node_modules/@parent-pal/database  # Uncomment if web also needs it

FROM base AS cron
COPY --from=build /prod/cron /prod/cron
WORKDIR /prod/cron
EXPOSE 4000
CMD [ "pnpm", "start" ]

FROM base AS web
COPY --from=build /prod/web /prod/web
WORKDIR /prod/web
EXPOSE 3000
CMD [ "pnpm", "start" ]