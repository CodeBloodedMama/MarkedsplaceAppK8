# syntax=docker/dockerfile:1

ARG NODE_VERSION=19.5.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/apollo-app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=tsconfig.json,target=tsconfig.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

# install nodemon for hot-reloading
RUN npm install -g nodemon

# Copy the rest of the source files into the image.
COPY . .


# Run the application as a non-root user.
RUN  chown -R node /usr/src/apollo-app
USER node

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application in dev mode to use with Compose watch feature
CMD npm run dev
