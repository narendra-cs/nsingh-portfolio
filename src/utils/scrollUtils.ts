/**
 * Scrolls to a section with proper offset for the fixed navbar
 * @param e - Mouse event (optional)
 * @param href - The section ID to scroll to (e.g., '#about')
 * @param callback - Optional callback function to run after scrolling
 */
export const scrollToSection = (
  e?: React.MouseEvent<HTMLAnchorElement>,
  href = '#',
  callback?: () => void
): void => {
  // Prevent default if event is provided
  if (e) {
    e.preventDefault();
  }

  const element = document.querySelector(href);
  if (!element) return;

  // Calculate the header height dynamically
  const header = document.querySelector('header') ?? document.querySelector('nav');
  const headerHeight = header?.getBoundingClientRect().height ?? 80;

  // Get the element's position relative to the viewport
  const elementRect = element.getBoundingClientRect();

  // Calculate the scroll position, ensuring it's not negative
  const offsetPosition = Math.max(0, window.pageYOffset + elementRect.top - headerHeight);

  // Smooth scroll to the section
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });

  // Update URL without page reload
  window.history.pushState({}, '', `${window.location.pathname}${href}`);

  // Execute callback if provided
  if (callback) {
    const checkIfDone = () => {
      const currentScroll = window.pageYOffset;
      if (Math.abs(currentScroll - offsetPosition) < 5) {
        callback();
      } else {
        requestAnimationFrame(checkIfDone);
      }
    };
    checkIfDone();
  }
};
