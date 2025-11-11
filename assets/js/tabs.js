// Code comparison tabs functionality
document.addEventListener('DOMContentLoaded', function() {
  // Find all tab containers
  const tabContainers = document.querySelectorAll('.code-tabs');

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-button');
    const contents = container.querySelectorAll('.tab-content');

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents in this container
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        contents[index].classList.add('active');
      });
    });
  });
});
