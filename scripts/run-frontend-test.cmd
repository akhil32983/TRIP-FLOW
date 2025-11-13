@echo off
SETLOCAL

REM Get the script directory and project root
SET SCRIPT_DIR=%~dp0
SET PROJECT_ROOT=%SCRIPT_DIR%..

echo [+] Generating frontend coverage with Playwright...

REM Define frontend report directory
SET "REPORT_DIR=%PROJECT_ROOT%\docs\coverage\frontend"

REM Create report directory if it doesn't exist
if not exist "%REPORT_DIR%" mkdir "%REPORT_DIR%"

REM Clean previous reports
echo [+] Cleaning previous reports...
if exist "%PROJECT_ROOT%\frontend\coverage" rmdir /s /q "%PROJECT_ROOT%\frontend\coverage"
if exist "%REPORT_DIR%\*" del /q /f "%REPORT_DIR%\*"

REM Run tests and generate coverage report
echo [+] Running frontend tests and generating coverage...
cd /d "%PROJECT_ROOT%\frontend"
call npm run test -- --coverage

REM Move reports to the designated report directory
echo [+] Moving reports to %REPORT_DIR%...
xcopy /E /I /Y "coverage\*" "%REPORT_DIR%\"

echo [+] Frontend coverage generated successfully!
echo [+] Report location: %REPORT_DIR%\index.html

cd /d "%SCRIPT_DIR%"
ENDLOCAL