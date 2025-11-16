@echo off
SETLOCAL

REM Get the script directory and project root
SET SCRIPT_DIR=%~dp0
SET PROJECT_ROOT=%SCRIPT_DIR%..

echo [+] Generating backend coverage with JaCoCo...

REM Define backend report directory
SET "REPORT_DIR=%PROJECT_ROOT%\docs\coverage\backend"

REM Create report directory if it doesn't exist
if not exist "%REPORT_DIR%" mkdir "%REPORT_DIR%"

REM Clean previous reports
echo [+] Cleaning previous reports...
if exist "%PROJECT_ROOT%\backend\api-service\target\site\jacoco" rmdir /s /q "%PROJECT_ROOT%\backend\api-service\target\site\jacoco"
if exist "%REPORT_DIR%\*" del /q /f "%REPORT_DIR%\*"

REM Run tests and generate coverage report
echo [+] Running backend tests and generating coverage...
cd /d "%PROJECT_ROOT%\backend\api-service"
call mvnw.cmd clean verify jacoco:report

REM Move reports to the designated report directory
echo [+] Moving reports to %REPORT_DIR%...
xcopy /E /I /Y "target\site\jacoco\*" "%REPORT_DIR%\"

echo [+] Backend coverage generated successfully!
echo [+] Report location: %REPORT_DIR%\index.html

cd /d "%SCRIPT_DIR%"
ENDLOCAL