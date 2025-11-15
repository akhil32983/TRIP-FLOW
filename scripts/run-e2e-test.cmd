@echo off
SETLOCAL

REM Get the script directory and project root
SET SCRIPT_DIR=%~dp0
SET PROJECT_ROOT=%SCRIPT_DIR%..

echo [+] Starting TripFlow E2E environment...

set API_URL=http://localhost:8080
set FRONTEND_URL=http://localhost:4173

REM Wake up services with Docker Compose
echo [+] Starting Docker Compose services...
cd /d "%PROJECT_ROOT%"
call docker compose -f docker\docker-compose.test.yaml up -d

REM Install E2E dependencies
echo [+] Installing E2E dependencies...
cd /d "%PROJECT_ROOT%\e2e"
call npm ci

REM Install Playwright browsers
echo [+] Installing Playwright browsers...
call npx playwright install --with-deps

REM Wait for services to be healthy
echo [+] Waiting for services to be healthy...
call "%SCRIPT_DIR%run-wait-for-services.cmd"

REM Run tests
echo [+] Running E2E tests...
call npx playwright test

REM Stop and remove test containers
echo [+] Stopping and removing test containers...
cd /d "%PROJECT_ROOT%"
call docker compose -f docker\docker-compose.test.yaml down

echo [+] E2E pipeline finished!

cd /d "%SCRIPT_DIR%"
ENDLOCAL