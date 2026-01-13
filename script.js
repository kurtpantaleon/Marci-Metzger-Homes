document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    // Check if menu is currently hidden
    const isHidden = mobileMenu.classList.contains("hidden");

    if (isHidden) {
      // Show menu
      mobileMenu.classList.remove("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "true");
    } else {
      // Hide menu
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav =
      mobileMenuButton.contains(event.target) ||
      mobileMenu.contains(event.target);

    if (!isClickInsideNav && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Hero Background Slideshow
  const heroSection = document.getElementById("hero");
  const indicators = document.querySelectorAll(".indicator");

  const images = [
    "assets/image1.webp",
    "assets/image3.webp",
    "assets/image4.webp",
  ];

  let currentImageIndex = 0;

  // Set initial background
  heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;

  // Auto-slide functionality
  function nextSlide() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    updateIndicators();
  }

  // Update indicator dots using Tailwind classes
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentImageIndex) {
        indicator.classList.remove("opacity-50");
        indicator.classList.add("opacity-100");
      } else {
        indicator.classList.remove("opacity-100");
        indicator.classList.add("opacity-50");
      }
    });
  }

  // Manual slide control via indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentImageIndex = index;
      heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
      updateIndicators();

      // Reset the auto-slide timer
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 3000);
    });
  });

  // Start auto-slide (change every 3 seconds)
  let slideInterval = setInterval(nextSlide, 3000);

  // Pause slideshow on hover
  heroSection.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  // Resume slideshow when mouse leaves
  heroSection.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 3000);
  });

  // Services Background Slideshow
  const residentialService = document.getElementById("residential-service");
  const commercialService = document.getElementById("commercial-service");
  const financialService = document.getElementById("financial-service");

  // Service images arrays
  const serviceImages = {
    residential: ["assets/image9.webp"],
    commercial: ["assets/image11.webp"],
    financial: ["assets/image6.webp"],
  };

  // Set initial backgrounds for services
  residentialService.style.backgroundImage = `url('${serviceImages.residential[0]}')`;
  commercialService.style.backgroundImage = `url('${serviceImages.commercial[0]}')`;
  financialService.style.backgroundImage = `url('${serviceImages.financial[0]}')`;

  // Service slideshow functionality (can be expanded for multiple images per service)
  let serviceCurrentIndex = {
    residential: 0,
    commercial: 0,
    financial: 0,
  };

  function nextServiceSlide(serviceType, element, images) {
    if (images.length > 1) {
      serviceCurrentIndex[serviceType] =
        (serviceCurrentIndex[serviceType] + 1) % images.length;
      element.style.backgroundImage = `url('${
        images[serviceCurrentIndex[serviceType]]
      }')`;
    }
  }

  // Auto-slide for services (if multiple images are added later)
  setInterval(() => {
    nextServiceSlide(
      "residential",
      residentialService,
      serviceImages.residential
    );
    nextServiceSlide("commercial", commercialService, serviceImages.commercial);
    nextServiceSlide("financial", financialService, serviceImages.financial);
  }, 4000);

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);

    // Simple form validation
    if (!formObject.fullName || !formObject.email || !formObject.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Here you would typically send the form data to a server
    alert("Thank you for your message! We'll get back to you soon.");
    contactForm.reset();
  });

  // Get It Sold Slider functionality
  const soldSlider = document.getElementById("get-it-sold-slider");
  const soldSlides = soldSlider.querySelectorAll(".slide");
  const soldDots = document.querySelectorAll(".sold-dot");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");

  let currentSoldSlide = 0;
  const totalSoldSlides = soldSlides.length;

  function showSoldSlide(index) {
    // Hide all slides
    soldSlides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = "1";
        slide.style.zIndex = "10";
      } else {
        slide.style.opacity = "0";
        slide.style.zIndex = "1";
      }
    });

    // Update dots with black and white theme
    soldDots.forEach((dot, i) => {
      if (i === index) {
        dot.style.opacity = "1";
        dot.classList.remove("bg-gray-400");
        dot.classList.add("bg-white");
      } else {
        dot.style.opacity = "0.5";
        dot.classList.remove("bg-white");
        dot.classList.add("bg-gray-400");
      }
    });
  }

  function nextSoldSlide() {
    currentSoldSlide = (currentSoldSlide + 1) % totalSoldSlides;
    showSoldSlide(currentSoldSlide);
  }

  function prevSoldSlide() {
    currentSoldSlide =
      (currentSoldSlide - 1 + totalSoldSlides) % totalSoldSlides;
    showSoldSlide(currentSoldSlide);
  }

  // Event listeners for navigation
  nextButton.addEventListener("click", nextSoldSlide);
  prevButton.addEventListener("click", prevSoldSlide);

  // Event listeners for dots
  soldDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSoldSlide = index;
      showSoldSlide(currentSoldSlide);

      // Reset auto-slide timer
      clearInterval(soldAutoSlide);
      soldAutoSlide = setInterval(nextSoldSlide, 5000);
    });
  });

  // Auto-slide every 5 seconds
  let soldAutoSlide = setInterval(nextSoldSlide, 5000);

  // Pause auto-slide on hover
  soldSlider.addEventListener("mouseenter", () => {
    clearInterval(soldAutoSlide);
  });

  // Resume auto-slide when mouse leaves
  soldSlider.addEventListener("mouseleave", () => {
    soldAutoSlide = setInterval(nextSoldSlide, 5000);
  });

  // Initialize the slider
  showSoldSlide(0);

  // Find Your Dream Home Background Slideshow
  const dreamHomeSection = document.getElementById("find-dream-home");
  const dreamIndicators = document.querySelectorAll(".dream-indicator");

  const dreamImages = [
    "assets/image1.webp",
    "assets/image10.webp",
    "assets/image11.webp",
  ];

  let currentDreamImageIndex = 0;

  // Set initial background for Dream Home
  dreamHomeSection.style.backgroundImage = `url('${dreamImages[currentDreamImageIndex]}')`;

  // Auto-slide functionality for Dream Home
  function nextDreamSlide() {
    currentDreamImageIndex = (currentDreamImageIndex + 1) % dreamImages.length;
    dreamHomeSection.style.backgroundImage = `url('${dreamImages[currentDreamImageIndex]}')`;
    updateDreamIndicators();
  }

  // Update dream indicator dots
  function updateDreamIndicators() {
    dreamIndicators.forEach((indicator, index) => {
      if (index === currentDreamImageIndex) {
        indicator.classList.remove("opacity-50");
        indicator.classList.add("opacity-100");
      } else {
        indicator.classList.remove("opacity-100");
        indicator.classList.add("opacity-50");
      }
    });
  }

  // Manual slide control for dream indicators
  dreamIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentDreamImageIndex = index;
      dreamHomeSection.style.backgroundImage = `url('${dreamImages[currentDreamImageIndex]}')`;
      updateDreamIndicators();

      // Reset the auto-slide timer
      clearInterval(dreamSlideInterval);
      dreamSlideInterval = setInterval(nextDreamSlide, 4000);
    });
  });

  // Start auto-slide for Dream Home (change every 4 seconds)
  let dreamSlideInterval = setInterval(nextDreamSlide, 4000);

  // Pause slideshow on hover
  dreamHomeSection.addEventListener("mouseenter", () => {
    clearInterval(dreamSlideInterval);
  });

  // Resume slideshow when mouse leaves
  dreamHomeSection.addEventListener("mouseleave", () => {
    dreamSlideInterval = setInterval(nextDreamSlide, 4000);
  });

  // Dream Home Search Form Submission
  const dreamHomeSearchForm = document.getElementById("dream-home-search");

  dreamHomeSearchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(dreamHomeSearchForm);
    const searchParams = Object.fromEntries(formData);

    // Here you would typically send the search parameters to a server
    // For now, we'll just show an alert
    alert(
      "Search functionality would be implemented here. Search parameters: " +
        JSON.stringify(searchParams, null, 2)
    );
  });

  // Gallery Slider functionality
  const gallerySlider = document.getElementById("gallery-slider");
  const gallerySlides = gallerySlider.querySelectorAll(".gallery-slide");
  const galleryDots = document.querySelectorAll(".gallery-dot");
  const galleryThumbs = document.querySelectorAll(".gallery-thumb");
  const galleryPrevButton = document.getElementById("gallery-prev");
  const galleryNextButton = document.getElementById("gallery-next");

  let currentGallerySlide = 0;
  const totalGallerySlides = gallerySlides.length;

  function showGallerySlide(index) {
    // Hide all slides
    gallerySlides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = "1";
        slide.style.zIndex = "10";
      } else {
        slide.style.opacity = "0";
        slide.style.zIndex = "1";
      }
    });

    // Update dots
    galleryDots.forEach((dot, i) => {
      if (i === index) {
        dot.style.opacity = "1";
        dot.classList.remove("bg-gray-400");
        dot.classList.add("bg-black");
      } else {
        dot.style.opacity = "0.5";
        dot.classList.remove("bg-black");
        dot.classList.add("bg-gray-400");
      }
    });

    // Update thumbnails
    galleryThumbs.forEach((thumb, i) => {
      if (i === index) {
        thumb.style.opacity = "1";
        thumb.classList.remove("border-transparent");
        thumb.classList.add("border-black");
      } else {
        thumb.style.opacity = "0.5";
        thumb.classList.remove("border-black");
        thumb.classList.add("border-transparent");
      }
    });
  }

  function nextGallerySlide() {
    currentGallerySlide = (currentGallerySlide + 1) % totalGallerySlides;
    showGallerySlide(currentGallerySlide);
  }

  function prevGallerySlide() {
    currentGallerySlide =
      (currentGallerySlide - 1 + totalGallerySlides) % totalGallerySlides;
    showGallerySlide(currentGallerySlide);
  }

  // Event listeners for navigation arrows
  galleryNextButton.addEventListener("click", nextGallerySlide);
  galleryPrevButton.addEventListener("click", prevGallerySlide);

  // Event listeners for dots
  galleryDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentGallerySlide = index;
      showGallerySlide(currentGallerySlide);

      // Reset auto-slide timer
      clearInterval(galleryAutoSlide);
      galleryAutoSlide = setInterval(nextGallerySlide, 4000);
    });
  });

  // Event listeners for thumbnails
  galleryThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentGallerySlide = index;
      showGallerySlide(currentGallerySlide);

      // Reset auto-slide timer
      clearInterval(galleryAutoSlide);
      galleryAutoSlide = setInterval(nextGallerySlide, 4000);
    });
  });

  // Auto-slide every 4 seconds
  let galleryAutoSlide = setInterval(nextGallerySlide, 4000);

  // Pause auto-slide on hover
  gallerySlider.addEventListener("mouseenter", () => {
    clearInterval(galleryAutoSlide);
  });

  // Resume auto-slide when mouse leaves
  gallerySlider.addEventListener("mouseleave", () => {
    galleryAutoSlide = setInterval(nextGallerySlide, 4000);
  });

  // Initialize the gallery
  showGallerySlide(0);
});
