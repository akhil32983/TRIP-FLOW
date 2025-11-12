@echo off
SETLOCAL

echo [+] Starting TripFlow E2E environment...

set API_URL=http://localhost:8080
set FRONTEND_URL=http://localhost:4173

REM Wake up services with Docker Compose
call docker-compose -f docker\docker-compose.test.yaml up -d

REM Install E2E dependencies
echo [+] Installing E2E dependencies...
cd e2e
call npm ci

REM Install Playwright browsers
echo [+] Installing Playwright browsers...
call npx playwright install --with-deps

REM Wait for services to be healthy
echo [+] Waiting for services to be healthy...
call node scripts\wait-for-services.ts

REM Run tests
echo [+] Running E2E tests...
call npx playwright test

REM Stop and remove test containers
cd ..
echo [+] Stopping and removing test containers...
call docker-compose -f ..\docker\docker-compose.test.yaml down

echo [+] E2E pipeline finished!

ENDLOCAL