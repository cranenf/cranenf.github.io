@echo off
cd /d "%~dp0"
setlocal

rem ============================================================
rem  Personal website - start local server
rem  Double-click this file, the browser will open automatically.
rem  Keep the minimized server window open while browsing.
rem ============================================================

set "NODE=C:\Users\20401\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
if not exist "%NODE%" set "NODE=node"

echo Starting local server, please wait...
start "personal-website-server" /min "%NODE%" start.js

rem wait a moment for the server to be ready
timeout /t 2 /nobreak >nul

start "" http://localhost:8000

echo.
echo Server is running at http://localhost:8000
echo Add .md files into the posts folder, then refresh the page.
echo Close the minimized "personal-website-server" window to stop it.
echo.
pause
endlocal
