document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let hasAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const suffix = counter.getAttribute("data-suffix") || "";
      let count = 0;
      const speed = 200;

      const updateCount = () => {
        const increment = Math.ceil(target / speed);
        count += increment;

        if (count < target) {
          counter.textContent = count + suffix;
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + suffix;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
      }
    });
  }, {
    threshold: 0.5
  });

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    observer.observe(statsSection);
  }
});
