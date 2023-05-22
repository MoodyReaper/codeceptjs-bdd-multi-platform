# TODO: check and finish

# Build stage

FROM node:20.2.0-bullseye-slim@sha256:5138ded35380c7e55b7898a5c3666009334aa4af416571060d37347242e1812f AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-1

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:20.2.0-bullseye-slim@sha256:5138ded35380c7e55b7898a5c3666009334aa4af416571060d37347242e1812f
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
