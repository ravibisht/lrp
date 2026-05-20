# ====================================================================================
#                      LAKSHMAN REKHA PARTY (LRP) DOCKERFILE
# ====================================================================================

# Phase 1: Heavy compiler and TypeScript bundler image
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency records first to leverage cached image layers
COPY package*.json ./

# Install pristine workspace packages (including compile-time devDependencies)
RUN npm ci

# Pull in all code files from the workspace
COPY . .

# Compile high-performance assets & build the bundle (outputting into dist/ folder)
RUN npm run build

# Phase 2: Ultra-lean minimal runner runtime image
FROM node:22-alpine AS runner

WORKDIR /app

# Enable correct production configuration flags
ENV NODE_ENV=production
ENV PORT=3000

# Retrieve dependencies records
COPY --from=builder /app/package*.json ./

# Copy compiled Express engine, server bundlings, and client static pages
COPY --from=builder /app/dist ./dist

# Install single-purpose production assets only (excluding dev tools)
RUN npm ci --only=production

# Expose internal interface port 3000
EXPOSE 3000

# Execute server application launcher script
CMD ["npm", "start"]
