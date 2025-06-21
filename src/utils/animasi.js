import anime from 'animejs';

const safeAnimate = (animation) => {
  try {
    return animation();
  } catch (error) {
    console.error('Animation error:', error);
    return null;
  }
};

export const heroAnimations = {
  profileImage: (element) => {
    if (!element) {
      console.warn('No valid element provided for profile image animation');
      return;
    }

    safeAnimate(() =>
      anime({
        targets: element,
        scale: [0.5, 1],
        opacity: [0, 1],
        rotate: [{ value: 360, duration: 1800, easing: 'easeInOutQuart' }],
        translateY: [
          { value: -30, duration: 500, easing: 'easeOutQuad' },
          { value: 0, duration: 1000, easing: 'easeInElastic(1, .5)' }
        ],
        duration: 2000,
        easing: 'spring(1, 80, 10, 0)'
      })
    );
  },

  title: (element) => {
    if (!element) {
      console.warn('No valid element provided for title animation');
      return;
    }

    try {
      const textWrapper = element;
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      safeAnimate(() =>
        anime.timeline()
          .add({
            targets: element.querySelectorAll('.letter'),
            translateY: [-100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1400,
            delay: anime.stagger(100)
          })
          .add({
            targets: element.querySelectorAll('.letter'),
            translateY: [0, -5],
            duration: 1200,
            delay: anime.stagger(100),
            direction: 'alternate',
            loop: true
          })
      );
    } catch (error) {
      console.error('Error in title animation:', error);
    }
  },

  description: (element) => {
    if (!element) {
      console.warn('No valid element provided for description animation');
      return;
    }

    safeAnimate(() =>
      anime({
        targets: element,
        translateX: [-50, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(.5, .05, .1, .3)',
        duration: 1000,
        delay: 500
      })
    );
  },

  button: (element) => {
    if (!element) {
      console.warn('No valid element provided for button animation');
      return;
    }

    const onMouseEnter = () => {
      safeAnimate(() =>
        anime({
          targets: element,
          scale: 1.1,
          duration: 300,
          easing: 'easeOutQuad'
        })
      );
    };

    const onMouseLeave = () => {
      safeAnimate(() =>
        anime({
          targets: element,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        })
      );
    };

    safeAnimate(() =>
      anime({
        targets: element,
        translateY: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .5)',
        duration: 1600,
        delay: 800,
        complete: () => {
          element.addEventListener('mouseenter', onMouseEnter);
          element.addEventListener('mouseleave', onMouseLeave);
        }
      })
    );

    // Return cleanup function for React useEffect
    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  },

  background: (element) => {
    if (!element) {
      console.warn('No valid element provided for background animation');
      return;
    }

    safeAnimate(() =>
      anime({
        targets: element,
        scale: [1.1, 1],
        opacity: [0, 0.2],
        easing: 'easeOutQuad',
        duration: 1200,
        complete: () => {
          safeAnimate(() =>
            anime({
              targets: element,
              scale: [1, 1.02],
              opacity: [0.2, 0.15],
              duration: 3000,
              direction: 'alternate',
              loop: true,
              easing: 'easeInOutQuad'
            })
          );
        }
      })
    );
  }
};

export const skillsAnimations = {
  skillCard: (element, index) => {
    if (!element) {
      console.warn('No valid element provided for skill card animation');
      return;
    }

    const onMouseEnter = () => {
      safeAnimate(() =>
        anime({
          targets: element,
          scale: 1.05,
          translateY: -10,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          duration: 300,
          easing: 'easeOutQuad'
        })
      );
    };

    const onMouseLeave = () => {
      safeAnimate(() =>
        anime({
          targets: element,
          scale: 1,
          translateY: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          duration: 300,
          easing: 'easeOutQuad'
        })
      );
    };

    safeAnimate(() =>
      anime({
        targets: element,
        translateY: [100, 0],
        scale: [0.8, 1],
        opacity: [0, 1],
        easing: 'cubicBezier(.5, .05, .1, .3)',
        duration: 800,
        delay: index * 100,
        complete: () => {
          element.addEventListener('mouseenter', onMouseEnter);
          element.addEventListener('mouseleave', onMouseLeave);
        }
      })
    );

    // Return cleanup function
    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }
};

export const experienceAnimations = {
  experienceItem: (element, index) => {
    if (!element) {
      console.warn('No valid element provided for experience item animation');
      return;
    }

    const onMouseEnter = () => {
      safeAnimate(() =>
        anime({
          targets: element,
          translateX: 10,
          scale: 1.02,
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          duration: 300,
          easing: 'easeOutQuad'
        })
      );
    };

    const onMouseLeave = () => {
      safeAnimate(() =>
        anime({
          targets: element,
          translateX: 0,
          scale: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          duration: 300,
          easing: 'easeOutQuad'
        })
      );
    };

    safeAnimate(() =>
      anime({
        targets: element,
        translateX: [-100, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        easing: 'cubicBezier(.5, .05, .1, .3)',
        duration: 800,
        delay: index * 200,
        complete: () => {
          element.addEventListener('mouseenter', onMouseEnter);
          element.addEventListener('mouseleave', onMouseLeave);
        }
      })
    );

    // Return cleanup function
    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }
};
