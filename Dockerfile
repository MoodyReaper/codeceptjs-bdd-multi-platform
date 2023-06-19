# TODO: check and finish

# Build stage

FROM node:20.3-bookworm-slim@sha256:c3b70e31b8db400ca3cec11048560aaa54369e3645a4953a0e83adf2e85ac048 AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init=1.2.5-2

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .

ENV NODE_ENV=production
RUN npm ci

# Final stage

FROM node:20.3-bookworm-slim@sha256:c3b70e31b8db400ca3cec11048560aaa54369e3645a4953a0e83adf2e85ac048
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

COPY --chown=node:node . .
COPY --chown=node:node --from=build /home/node/codeceptjs-bdd-multi-platform/node_modules/ ./node_modules/

ENV NODE_ENV=production

# CMD ["dumb-init", "npm", "run", "test"]
