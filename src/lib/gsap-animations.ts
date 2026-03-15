import { gsap } from 'gsap';

export const staggerCards = (containerSelector: string | HTMLElement) => {
  const elements = typeof containerSelector === 'string' 
    ? document.querySelectorAll(containerSelector) 
    : containerSelector.querySelectorAll('.stagger-item');

  if (elements.length > 0) {
    gsap.fromTo(elements, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerSelector,
          start: "top 80%",
        }
      }
    );
  }
};
