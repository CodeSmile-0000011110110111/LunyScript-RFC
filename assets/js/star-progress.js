(function() {
  function updateStarPosition() {
    // Fetch the star count from GitHub API
    fetch('https://api.github.com/repos/CodeSmile-0000011110110111/LunyScript-RFC')
      .then(response => response.json())
      .then(data => {
        const starCount = data.stargazers_count || 0;
        const maxStars = 200;

        // Calculate position as percentage (0-100%)
        const percentage = (starCount / maxStars) * 100;

        // Update star position
        const starIndicator = document.getElementById('star-indicator');
        if (starIndicator) {
          starIndicator.style.left = percentage + '%';
          starIndicator.title = `${starCount} stars`;
        }
      })
      .catch(error => {
        console.log('Could not fetch star count:', error);
        // Set default position at 0 if fetch fails
        const starIndicator = document.getElementById('star-indicator');
        if (starIndicator) {
          starIndicator.style.left = '0%';
        }
      });
  }

  // Update when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateStarPosition);
  } else {
    updateStarPosition();
  }
})();
