#!/bin/bash
set -e

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "[+] Starting TripFlow E2E environment..."

export API_URL="http://localhost:8080"
export AI_URL="http://localhost:8081"
export NOTIFICATION_URL="http://localhost:8082"
export FRONTEND_URL="http://localhost:4173"

# Wake up services with Docker Compose
echo "[+] Starting Docker Compose services..."
cd "$PROJECT_ROOT"
docker compose -f docker/docker-compose.test.yaml up -d

# Install E2E dependencies
echo "[+] Installing E2E dependencies..."
cd "$PROJECT_ROOT/e2e"
npm ci

# Install Playwright browsers
echo "[+] Installing Playwright browsers..."
npx playwright install --with-deps

# Wait for services to be healthy
echo "[+] Waiting for services to be healthy..."
if [ -x "$SCRIPT_DIR/run-wait-for-services.sh" ]; then
  "$SCRIPT_DIR/run-wait-for-services.sh"
else
  echo "[-] Wait script not found or not executable: $SCRIPT_DIR/run-wait-for-services.sh"
  exit 1
fi

# Run tests
echo "[+] Running E2E tests..."
npx playwright test

# Stop and remove test containers
echo "[+] Stopping and removing test containers..."
cd "$PROJECT_ROOT"
docker compose -f docker/docker-compose.test.yaml down

echo "[+] E2E pipeline finished!"

cd "$SCRIPT_DIR"