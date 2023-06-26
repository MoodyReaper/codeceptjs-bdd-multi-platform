# TODO: check and finish

# Build stage

FROM node:20.3-bookworm-slim@sha256:ade5dd9d37beb5efca623121274ae072d5c118b29ee6ec86b55c359009ef15ca AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-2

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:20.3-bookworm-slim@sha256:ade5dd9d37beb5efca623121274ae072d5c118b29ee6ec86b55c359009ef15ca
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
