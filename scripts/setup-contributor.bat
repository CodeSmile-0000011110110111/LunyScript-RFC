@echo off
REM LunyScript Contributor Setup Script (Windows)
REM This script configures your local repository for DCO-compliant contributions

echo ======================================
echo LunyScript Contributor Setup
echo ======================================
echo.

REM Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo X Error: Not in a git repository
    echo    Please run this script from the root of the LunyScript repository
    exit /b 1
)

REM Get current git config
for /f "delims=" %%i in ('git config user.name 2^>nul') do set current_user=%%i
for /f "delims=" %%i in ('git config user.email 2^>nul') do set current_email=%%i

echo Current git configuration:
if defined current_user (
    echo   Name:  %current_user%
) else (
    echo   Name:  ^<not set^>
)
if defined current_email (
    echo   Email: %current_email%
) else (
    echo   Email: ^<not set^>
)
echo.

REM Verify user info is set
if not defined current_user (
    echo Warning: Git user information not configured
    echo.
    set /p user_name="Enter your name: "
    set /p user_email="Enter your email: "

    git config user.name "!user_name!"
    git config user.email "!user_email!"

    echo.
    echo OK Git user information configured
    echo.
)

if not defined current_email (
    echo Warning: Git user information not configured
    echo.
    set /p user_name="Enter your name: "
    set /p user_email="Enter your email: "

    git config user.name "!user_name!"
    git config user.email "!user_email!"

    echo.
    echo OK Git user information configured
    echo.
)

REM Configure automatic sign-off
echo Configuring automatic DCO sign-off...
git config format.signoff true
echo OK Automatic sign-off enabled
echo.

REM Disable GPG signing (DCO doesn't require it)
echo Configuring commit signing...
git config commit.gpgsign false
echo OK GPG signing disabled (DCO uses Signed-off-by instead)
echo.

echo ======================================
echo OK Setup Complete!
echo ======================================
echo.
for /f "delims=" %%i in ('git config user.name') do set final_user=%%i
for /f "delims=" %%i in ('git config user.email') do set final_email=%%i
echo Your commits will now automatically include:
echo   Signed-off-by: %final_user% ^<%final_email%^>
echo.
echo Next steps:
echo   1. Read AI-USAGE.md if you plan to use AI tools
echo   2. Review Guidelines.md for coding standards
echo   3. Check TODO.md for contribution opportunities
echo.
echo To verify setup, make a test commit:
echo   git commit --allow-empty -m "Test commit"
echo   git log -1
echo.
echo Happy contributing!
