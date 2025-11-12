#!/bin/bash
set -e

echo "[+] Starting TripFlow E2E environment..."

export API_URL="http://localhost:8080"
export FRONTEND_URL="http://localhost:4173"

# Wake up services with Docker Compose
docker-compose -f docker/docker-compose.test.yaml up -d

# Install E2E dependencies
echo "[+] Installing E2E dependencies..."
cd e2e
npm ci

# Install Playwright browsers
echo "[+] Installing Playwright browsers..."
npx playwright install --with-deps

# Wait for services to be healthy
echo "[+] Waiting for services to be healthy..."
node scripts/wait-for-services.ts

# Run tests
echo "[+] Running E2E tests..."
npx playwright test

# Stop and remove test containers
echo "[+] Stopping and removing test containers..."
docker-compose -f ../docker/docker-compose.test.yaml down

echo "[+] E2E pipeline finished!"