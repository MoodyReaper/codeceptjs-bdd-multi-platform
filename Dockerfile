# TODO: check and finish

# Build stage

FROM node:20.3.0-bullseye-slim@sha256:f52e0eb0f31863051b56d76d191b283c2b49ac084762eddfeb1afb54791b250b AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-1

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:20.3.0-bullseye-slim@sha256:f52e0eb0f31863051b56d76d191b283c2b49ac084762eddfeb1afb54791b250b
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
