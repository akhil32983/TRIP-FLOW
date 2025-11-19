@echo off
setlocal

REM Configure URLs (can be overridden by environment variables)
if "%API_URL%"=="" set "API_URL=http://localhost:8080"
if "%FRONTEND_URL%"=="" set "FRONTEND_URL=http://localhost:4173"
if "%AI_URL%"=="" set "AI_URL=http://localhost:8081"
if "%NOTIFICATION_URL%"=="" set "NOTIFICATION_URL=http://localhost:8082"
set "HEALTH_URL=%API_URL%/api/health"

REM Retries and interval (seconds)
set /a RETRIES=15
set /a INTERVAL=4

echo [+] Waiting for services...

powershell -NoProfile -Command ^
  "$url = '%HEALTH_URL%'; $max = %RETRIES%; $int = %INTERVAL%; for ($i=1; $i -le $max; $i++) { try { $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5; if ($r.StatusCode -eq 200) { Write-Host '[+] Service ready: ' $url; exit 0 } } catch {}; Write-Host ('[*] Waiting for ' + $url + '... (' + $i + '/' + $max + ')'); Start-Sleep -Seconds $int }; Write-Host ('[-] Service did not respond after ' + $max + ' attempts: ' + $url); exit 1"

if errorlevel 1 (
  echo [-] Backend health check failed.
  exit /b 1
)

powershell -NoProfile -Command ^
  "$url = '%AI_URL%'; $max = %RETRIES%; $int = %INTERVAL%; for ($i=1; $i -le $max; $i++) { try { $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5; if ($r.StatusCode -eq 200) { Write-Host '[+] Service ready: ' $url; exit 0 } } catch {}; Write-Host ('[*] Waiting for ' + $url + '... (' + $i + '/' + $max + ')'); Start-Sleep -Seconds $int }; Write-Host ('[-] Service did not respond after ' + $max + ' attempts: ' + $url); exit 1"

if errorlevel 1 (
  echo [-] AI check failed.
  exit /b 1
)

powershell -NoProfile -Command ^
  "$url = '%NOTIFICATION_URL%'; $max = %RETRIES%; $int = %INTERVAL%; for ($i=1; $i -le $max; $i++) { try { $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5; if ($r.StatusCode -eq 200) { Write-Host '[+] Service ready: ' $url; exit 0 } } catch {}; Write-Host ('[*] Waiting for ' + $url + '... (' + $i + '/' + $max + ')'); Start-Sleep -Seconds $int }; Write-Host ('[-] Service did not respond after ' + $max + ' attempts: ' + $url); exit 1"

if errorlevel 1 (
  echo [-] Notification check failed.
  exit /b 1
)

powershell -NoProfile -Command ^
  "$url = '%FRONTEND_URL%'; $max = %RETRIES%; $int = %INTERVAL%; for ($i=1; $i -le $max; $i++) { try { $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5; if ($r.StatusCode -eq 200) { Write-Host '[+] Service ready: ' $url; exit 0 } } catch {}; Write-Host ('[*] Waiting for ' + $url + '... (' + $i + '/' + $max + ')'); Start-Sleep -Seconds $int }; Write-Host ('[-] Service did not respond after ' + $max + ' attempts: ' + $url); exit 1"

if errorlevel 1 (
  echo [-] Frontend check failed.
  exit /b 1
)

echo [+] All services are ready!
exit /b 0