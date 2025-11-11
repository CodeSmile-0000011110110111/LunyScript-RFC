// Diagram modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const diagramContainer = document.getElementById('diagram-container');

  if (!diagramContainer) return;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = 'diagram-modal';
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

  // Create enlarged diagram container
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

  // Click diagram to open modal
  diagramContainer.addEventListener('click', function(e) {
    // Find the mermaid SVG
    const svg = diagramContainer.querySelector('svg');
    if (!svg) return;

    // Clone the SVG and add to modal
    const clonedSvg = svg.cloneNode(true);

    // Get actual SVG dimensions
    const svgBox = svg.getBBox();
    const originalHeight = svgBox.height || parseInt(svg.getAttribute('height')) || 600;
    const originalWidth = svgBox.width || parseInt(svg.getAttribute('width')) || 800;

    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate available space (with padding)
    const availableHeight = viewportHeight - 100; // Leave 50px top/bottom
    const availableWidth = viewportWidth - 100;   // Leave 50px left/right

    // Calculate scale to maximize use of space
    const heightScale = availableHeight / originalHeight;
    const widthScale = availableWidth / originalWidth;
    const scaleFactor = Math.min(heightScale, widthScale); // Don't exceed viewport

    const newHeight = originalHeight * scaleFactor;
    const newWidth = originalWidth * scaleFactor;

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
      flex-direction: column;
      align-items: center;
    `;

    // Add title
    const title = document.createElement('h2');
    title.style.cssText = 'text-align: center; margin: 0 0 20px 0; color: #2d3748;';
    title.textContent = 'LunyScript Architecture';
    wrapper.appendChild(title);

    // Style the cloned SVG
    clonedSvg.setAttribute('width', newWidth);
    clonedSvg.setAttribute('height', newHeight);
    clonedSvg.style.display = 'block';
    clonedSvg.style.margin = '0 auto';

    wrapper.appendChild(clonedSvg);

    // Clear and add the enlarged diagram
    enlargedContainer.innerHTML = '';
    enlargedContainer.appendChild(wrapper);

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // Click modal to close
  modal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Prevent closing when clicking the diagram itself in modal
  enlargedContainer.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});
