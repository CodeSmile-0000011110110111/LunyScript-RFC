@echo off
REM LunyScript Jekyll Local Server (Windows)
REM Preview GitHub Pages site locally before committing

echo ======================================
echo LunyScript Jekyll Local Server
echo ======================================
echo.

REM Check if Ruby is installed
where ruby >nul 2>&1
if errorlevel 1 (
    echo X Error: Ruby is not installed
    echo.
    echo Please install Ruby first:
    echo   1. Download from: https://rubyinstaller.org/
    echo   2. Use the installer with MSYS2 development toolchain
    echo   3. Restart your terminal after installation
    echo   4. Run this script again
    echo.
    pause
    exit /b 1
)

echo OK Ruby found:
ruby --version
echo.

REM Check if Bundler is installed
where bundle >nul 2>&1
if errorlevel 1 (
    echo Installing Bundler...
    gem install bundler
    echo.
)

REM Check if we're in the repository root
if not exist "_config.yml" ( cd .. )
if not exist "_config.yml" (
    echo X Error: _config.yml not found
    echo    Please run this script from the repository root
    echo.
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "Gemfile.lock" (
    echo Installing Jekyll dependencies...
    echo This may take a few minutes on first run...
    echo.
    bundle install
    echo.
)

REM Start Jekyll server
echo ======================================
echo Starting Jekyll server...
echo ======================================
echo.
echo Your site will be available at:
echo   http://localhost:4000
echo   http://127.0.0.1:4000
echo.
echo NOTE: Open one of the URLs above in your browser
echo       (NOT the livereload port 35729)
echo.
echo Press Ctrl+C to stop the server
echo ======================================
echo.

REM Start Jekyll with explicit configuration
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload --trace

REM in case run fails, it may be due to missing bundles, so just try to get them here
bundle install

echo.
echo ======================================
echo Server stopped
echo ======================================
pause
