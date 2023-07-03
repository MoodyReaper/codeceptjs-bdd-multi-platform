# TODO: check and finish

# Build stage

FROM node:20.3-bookworm-slim@sha256:dc951f879d6b8884ca0f77c9137c1a0e7206b9d704be7ff3edff1d1329b97c9a AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-2

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:20.3-bookworm-slim@sha256:dc951f879d6b8884ca0f77c9137c1a0e7206b9d704be7ff3edff1d1329b97c9a
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
