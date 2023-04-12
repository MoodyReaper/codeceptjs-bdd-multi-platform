# TODO: check and finish

# Build stage

FROM node:18.15.0-bullseye-slim@sha256:e9ea1b9c6ed95b612a2766b7d9399ba35a8cf8068558ca631e08e19c6d6db92d AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-1

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:18.15.0-bullseye-slim@sha256:e9ea1b9c6ed95b612a2766b7d9399ba35a8cf8068558ca631e08e19c6d6db92d
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
