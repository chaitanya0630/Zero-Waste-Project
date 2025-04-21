
/**
 * This utility adds intersection observers to animate elements when they come into view
 */
export const initSectionAnimations = () => {
  // Check if IntersectionObserver is supported
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add the is-visible class when the element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      root: null, // viewport
      threshold: 0.1 // trigger when 10% of the element is visible
    });

    // Observe all elements with section-fade-in class
    document.querySelectorAll('.section-fade-in').forEach(el => {
      observer.observe(el);
    });

    return observer;
  }

  // Fallback for browsers that don't support IntersectionObserver
  document.querySelectorAll('.section-fade-in').forEach(el => {
    el.classList.add('is-visible');
  });
  
  return null;
};
