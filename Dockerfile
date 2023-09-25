# Base stage

FROM node:20.7.0-bookworm-slim@sha256:3dc033a47194a92c07bc8e1b5257fc3990f75b8099b0cc0299fcad33004b2ca1 AS base

# Install Playwright browsers and system dependencies
# TODO: check later - "ERROR: Playwright does not support firefox on debian12"
RUN npx playwright install --with-deps chromium
RUN mkdir /home/node/.cache && \
mv /root/.cache/ms-playwright /home/node/.cache && \
chown -R node:node /home/node/.cache

USER node
RUN mkdir /home/node/codeceptjs-bdd-multi-platform && chown node:node /home/node/codeceptjs-bdd-multi-platform
WORKDIR /home/node/codeceptjs-bdd-multi-platform

# Deps stage

# trunk-ignore(terrascan/AC_DOCKER_0041)
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# Production stage

# trunk-ignore(terrascan/AC_DOCKER_0041)
FROM deps AS production

ENV NODE_ENV=production

COPY --chown=node:node . .

HEALTHCHECK NONE

CMD ["/bin/bash", "-c", "npm run test"]
