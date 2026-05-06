@echo off
REM ==============================================================
REM  start-bridge.bat - Launch Chrome + aigen bridge in one step
REM ==============================================================
REM
REM  Usage: double-click or run from terminal
REM  Prerequisite: pip install -e chrome-agent\aigen-v2-core
REM

set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
set DEBUG_PORT=9222
set BRIDGE_PORT=8787
set PLATFORM=gemini

echo [1/3] Starting Chrome with remote debugging on port %DEBUG_PORT%...
start "" %CHROME_PATH% --remote-debugging-port=%DEBUG_PORT%
timeout /t 3 /nobreak > nul

echo [2/3] Waiting for Chrome to be ready...
timeout /t 2 /nobreak > nul

echo [3/3] Starting aigen bridge on port %BRIDGE_PORT% (platform: %PLATFORM%)...
echo       Press Ctrl+C to stop the bridge.
echo.

aigen bridge --host 127.0.0.1 --port %BRIDGE_PORT% --debug-port %DEBUG_PORT% --platform %PLATFORM%

pause
