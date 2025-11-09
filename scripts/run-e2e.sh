#!/bin/bash
set -e

clear
echo "[+] Starting TripFlow E2E environment..."

export API_URL="http://localhost:8080"
export FRONTEND_URL="http://localhost:4173"

# Wake up services with Docker Compose
docker-compose -f docker-compose.test.yaml up -d

# Install E2E dependencies
clear
echo "[+] Installing E2E dependencies..."
cd e2e
npm ci

# Install Playwright browsers
clear
echo "[+] Installing Playwright browsers..."
npx playwright install --with-deps

# Wait for services to be healthy
clear
echo "[+] Waiting for services to be healthy..."
node scripts/wait-for-services.ts

# Run tests
clear
echo "[+] Running E2E tests..."
npx playwright test

# Stop and remove test containers
clear
echo "[+] Stopping and removing test containers..."
docker-compose -f ../docker-compose.test.yaml down

clear
echo "[+] E2E pipeline finished!"