# Base stage

FROM node:20.5.0-bookworm-slim@sha256:3a6fe61a331a31dd997016159374b8f398e8e7c5299b5f0ac7fd48c23e34ab5e AS base

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

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# Production stage

FROM deps AS production

ENV NODE_ENV=production

COPY --chown=node:node . .

CMD ["/bin/bash", "-c", "npm run test"]
