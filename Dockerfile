# TODO: check and finish

# Build stage

FROM node:20.3.1-bookworm-slim@sha256:fe600ecd55fa23b90c716d03f05dfcb2c5cfa7ee01eefb1a76a03ba656f92953 AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-2

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:20.3.1-bookworm-slim@sha256:fe600ecd55fa23b90c716d03f05dfcb2c5cfa7ee01eefb1a76a03ba656f92953
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
