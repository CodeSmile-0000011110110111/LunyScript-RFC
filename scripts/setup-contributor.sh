#!/bin/bash
# LunyScript Contributor Setup Script
# This script configures your local repository for DCO-compliant contributions

set -e

echo "======================================"
echo "LunyScript Contributor Setup"
echo "======================================"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    echo "   Please run this script from the root of the LunyScript repository"
    exit 1
fi

# Get current git config
current_user=$(git config user.name || echo "")
current_email=$(git config user.email || echo "")

echo "Current git configuration:"
echo "  Name:  ${current_user:-<not set>}"
echo "  Email: ${current_email:-<not set>}"
echo ""

# Verify user info is set
if [ -z "$current_user" ] || [ -z "$current_email" ]; then
    echo "⚠️  Git user information not configured"
    echo ""
    read -p "Enter your name: " user_name
    read -p "Enter your email: " user_email

    git config user.name "$user_name"
    git config user.email "$user_email"

    echo ""
    echo "✅ Git user information configured"
    echo ""
fi

# Configure automatic sign-off
echo "Configuring automatic DCO sign-off..."
git config format.signoff true
echo "✅ Automatic sign-off enabled"
echo ""

# Disable GPG signing (DCO doesn't require it)
echo "Configuring commit signing..."
git config commit.gpgsign false
echo "✅ GPG signing disabled (DCO uses Signed-off-by instead)"
echo ""

echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "Your commits will now automatically include:"
echo "  Signed-off-by: $(git config user.name) <$(git config user.email)>"
echo ""
echo "Next steps:"
echo "  1. Read AI-USAGE.md if you plan to use AI tools"
echo "  2. Review Guidelines.md for coding standards"
echo "  3. Check TODO.md for contribution opportunities"
echo ""
echo "To verify setup, make a test commit:"
echo "  git commit --allow-empty -m 'Test commit'"
echo "  git log -1"
echo ""
echo "Happy contributing!"
