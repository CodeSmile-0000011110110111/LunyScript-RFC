// Image modal functionality for AUTHOR.md
document.addEventListener('DOMContentLoaded', function() {
  const imageContainers = document.querySelectorAll('.clickable-image');

  if (imageContainers.length === 0) return;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = 'image-modal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    cursor: pointer;
    overflow: auto;
    padding: 0;
    box-sizing: border-box;
  `;

  // Create close instruction
  const closeText = document.createElement('div');
  closeText.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 10001;
  `;
  closeText.innerHTML = 'Click anywhere to close ✕';
  modal.appendChild(closeText);

  // Create enlarged image container
  const enlargedContainer = document.createElement('div');
  enlargedContainer.style.cssText = `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  `;
  modal.appendChild(enlargedContainer);

  document.body.appendChild(modal);

  // Add click handler to all image containers
  imageContainers.forEach(function(container) {
    container.addEventListener('click', function(e) {
      e.preventDefault();

      // Find the img element
      const img = container.querySelector('img');
      if (!img) return;

      // Get viewport dimensions
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate available space (with padding)
      const availableHeight = viewportHeight - 100;
      const availableWidth = viewportWidth - 100;

      // Create wrapper with white background
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        max-width: 95%;
        max-height: 95%;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      // Create enlarged image
      const enlargedImg = document.createElement('img');
      enlargedImg.src = img.src;
      enlargedImg.style.cssText = `
        max-width: ${availableWidth}px;
        max-height: ${availableHeight}px;
        width: auto;
        height: auto;
        display: block;
      `;

      wrapper.appendChild(enlargedImg);

      // Clear and add the enlarged image
      enlargedContainer.innerHTML = '';
      enlargedContainer.appendChild(wrapper);

      // Show modal
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // Click modal to close
  modal.addEventListener('click', function(e) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});
