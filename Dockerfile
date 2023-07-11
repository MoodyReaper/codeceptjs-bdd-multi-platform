# TODO: check and finish

# Build stage

FROM node:20.4.0-bookworm-slim@sha256:11f66bf5d0842fe1f87457fabe62aa3bbcfbb739d231a39e67597af22d8f5ffd AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-2

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:20.4.0-bookworm-slim@sha256:11f66bf5d0842fe1f87457fabe62aa3bbcfbb739d231a39e67597af22d8f5ffd
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
