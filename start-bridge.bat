@echo off
setlocal EnableExtensions EnableDelayedExpansion
REM ==============================================================
REM  start-bridge.bat - Launch Chrome + aigen bridge in one step
REM ==============================================================

set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
set DEBUG_PORT=9222
set BRIDGE_PORT=8787
set PLATFORM=gemini
set "CHROME_USER_DATA_DIR=%LOCALAPPDATA%\aigen-chrome-user-data"
set "CODEX_PYTHON=C:\Users\gurno\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
set "PYTHON_EXE=py"
set MAX_WAIT_ATTEMPTS=60

if exist "%CODEX_PYTHON%" (
    set "PYTHON_EXE=%CODEX_PYTHON%"
    set "PYTHONPATH=%~dp0chrome-agent\src;%~dp0.python-packages;%PYTHONPATH%"
) else (
    where py >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Python launcher "py" was not found on PATH.
        echo        Install Python or update PYTHON_EXE in this file.
        pause
        exit /b 1
    )
)

echo [1/3] Ensuring a clean Chrome state...
taskkill /F /IM chrome.exe /T >nul 2>&1
timeout /t 3 /nobreak > nul

echo [2/3] Starting Chrome with remote debugging...
echo       Profile data: %CHROME_USER_DATA_DIR%
if not exist "%CHROME_USER_DATA_DIR%" mkdir "%CHROME_USER_DATA_DIR%"
start "" %CHROME_PATH% --remote-debugging-port=%DEBUG_PORT% --user-data-dir="%CHROME_USER_DATA_DIR%" --no-first-run --no-default-browser-check --disable-session-crashed-bubble --disable-infobars --restore-last-session --hide-crash-restore-bubble

echo Waiting for Chrome debugging port to be ready...
set WAIT_ATTEMPTS=0
:WAIT_LOOP
timeout /t 2 /nobreak > nul
curl -s http://127.0.0.1:%DEBUG_PORT%/json/version >nul 2>&1
if errorlevel 1 (
    set /a WAIT_ATTEMPTS+=1
    if !WAIT_ATTEMPTS! GEQ %MAX_WAIT_ATTEMPTS% (
        echo   ERROR: Chrome debugging port %DEBUG_PORT% did not open.
        echo   Open chrome://version in the launched Chrome and confirm Profile Path is not the default Chrome User Data directory.
        pause
        exit /b 1
    )
    echo   still waiting...
    goto WAIT_LOOP
)
echo   Chrome is ready!

echo [3/3] Starting aigen bridge on port %BRIDGE_PORT% (platform: %PLATFORM%)...
echo       Press Ctrl+C to stop the bridge.
echo.

"%PYTHON_EXE%" -m aigen bridge --host 127.0.0.1 --port %BRIDGE_PORT% --debug-port %DEBUG_PORT% --platform %PLATFORM%

pause
