class TypeWriter {
  constructor(
    element,
    text,
    speed = 100,
    eraseDelay = 2000,
    startDelay = 1000
  ) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.eraseDelay = eraseDelay;
    this.startDelay = startDelay;
    this.index = 0;
    this.isDeleting = false;
    this.isWaiting = false;
  }

  type() {
    const fullText = this.text;
    let currentText = fullText.substring(0, this.index);
    this.element.textContent = currentText;
    let typeSpeed = this.speed;

    if (this.isWaiting) {
      setTimeout(() => {
        this.isWaiting = false;
        this.isDeleting = true;
        this.type();
      }, this.eraseDelay);
      return;
    }

    if (this.isDeleting) {
      this.index--;
      typeSpeed = this.speed / 2;
    } else {
      this.index++;
    }

    if (!this.isDeleting && this.index === fullText.length) {
      this.isWaiting = true;
    } else if (this.isDeleting && this.index === 0) {
      this.isDeleting = false;
    }

    setTimeout(() => this.type(), typeSpeed);
  }

  start() {
    setTimeout(() => this.type(), this.startDelay);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const typewriterElement = document.querySelector(".typewriter h1");
  const typewriter = new TypeWriter(
    typewriterElement,
    "ADZIKRA TAZKIYA QURR",
    100,
    2000,
    500
  );
  typewriter.start();

  const educationTab = document.getElementById("tab-education");
  const experienceTab = document.getElementById("tab-experience");
  const educationContent = document.getElementById("timeline-education");
  const experienceContent = document.getElementById("timeline-experience");

  function switchTab(activeTab, activeContent, inactiveTab, inactiveContent) {
    activeTab.classList.add("bg-portfolio-pink", "text-white");
    activeTab.classList.remove("text-gray-700");
    inactiveTab.classList.remove("bg-portfolio-pink", "text-white");
    inactiveTab.classList.add("text-gray-700");

    activeContent.classList.remove("hidden");
    inactiveContent.classList.add("hidden");
  }

  educationTab.addEventListener("click", () => {
    switchTab(educationTab, educationContent, experienceTab, experienceContent);
  });

  experienceTab.addEventListener("click", () => {
    switchTab(experienceTab, experienceContent, educationTab, educationContent);
  });

  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    counter.setAttribute("data-target", counter.innerText);
    counter.innerText = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const updateCount = () => {
              const target = +counter.getAttribute("data-target");
              const count = +counter.innerText;
              const increment = target / 200;

              if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counter);
  });

  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
    fadeObserver.observe(element);
  });

  const btn = document.querySelector("button.mobile-menu-button-2");
  const menu = document.querySelector(".mobile-menu-2");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => {
        item.classList.remove("text-white", "bg-portfolio-pink");
        item.classList.add(
          "text-gray-700",
          "hover:text-white",
          "hover:bg-portfolio-pink"
        );
      });

      this.classList.add("active-nav-item", "text-white", "bg-portfolio-pink");
      this.classList.remove(
        "text-gray-700",
        "hover:text-white",
        "hover:bg-portfolio-pink"
      );

      const href = this.getAttribute("href");
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        </style>`
  );
});
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".portfolio-filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) =>
        btn.classList.remove("active", "bg-portfolio-pink", "text-white")
      );
      filterButtons.forEach((btn) =>
        btn.classList.add("bg-white", "text-gray-700")
      );

      this.classList.add("active", "bg-portfolio-pink", "text-white");
      this.classList.remove("bg-white", "text-gray-700");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const indicators = carousel.querySelectorAll(".carousel-indicator");

    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        if (i < index) {
          slide.style.transform = "translateX(-100%)";
        } else if (i > index) {
          slide.style.transform = "translateX(100%)";
        } else {
          slide.style.transform = "translateX(0)";
        }
      });

      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add("active", "bg-opacity-100", "w-3", "h-3");
        } else {
          indicator.classList.remove("active", "bg-opacity-100", "w-3", "h-3");
        }
      });

      currentSlide = index;
    }

    nextBtn.addEventListener("click", () => {
      const newIndex = (currentSlide + 1) % slides.length;
      showSlide(newIndex);
    });

    prevBtn.addEventListener("click", () => {
      const newIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index);
      });
    });

    setInterval(() => {
      const newIndex = (currentSlide + 1) % slides.length;
      showSlide(newIndex);
    }, 5000);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const serviceTabs = document.querySelectorAll(".service-tab");
  const serviceContents = document.querySelectorAll(".service-content");

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");

      serviceTabs.forEach((t) => {
        t.classList.remove("active", "bg-portfolio-pink", "text-white");
        t.classList.add("bg-white", "text-gray-700", "hover:bg-gray-100");
      });

      this.classList.add("active", "bg-portfolio-pink", "text-white");
      this.classList.remove("bg-white", "text-gray-700", "hover:bg-gray-100");

      serviceContents.forEach((content) => {
        content.classList.add("hidden");
      });

      document.getElementById(`${target}-content`).classList.remove("hidden");
    });
  });

  const testimonialSlider = document.querySelector(".testimonial-slides");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialPrev = document.getElementById("testimonial-prev");
  const testimonialNext = document.getElementById("testimonial-next");
  const testimonialIndicators = document.querySelectorAll(
    ".testimonial-indicator"
  );

  let slideWidth = 100;
  let currentSlide = 0;
  let maxSlide =
    Math.ceil(
      testimonialSlides.length /
        (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)
    ) - 1;

  function updateSliderPosition() {
    slideWidth =
      100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    maxSlide =
      Math.ceil(
        testimonialSlides.length /
          (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)
      ) - 1;
    testimonialSlider.style.transform = `translateX(-${
      currentSlide * slideWidth
    }%)`;

    testimonialIndicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("opacity-100");
        indicator.classList.remove("opacity-40");
      } else {
        indicator.classList.remove("opacity-100");
        indicator.classList.add("opacity-40");
      }
    });
  }

  updateSliderPosition();

  testimonialPrev.addEventListener("click", () => {
    currentSlide = Math.max(0, currentSlide - 1);
    updateSliderPosition();
  });

  testimonialNext.addEventListener("click", () => {
    currentSlide = Math.min(maxSlide, currentSlide + 1);
    updateSliderPosition();
  });

  testimonialIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateSliderPosition();
    });
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % (maxSlide + 1);
    updateSliderPosition();
  }, 7000);

  window.addEventListener("resize", () => {
    updateSliderPosition();
  });

  const animateOnScroll = (elements, className) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
  };

  const serviceFeatures = document.querySelectorAll(
    ".service-content .flex.items-start"
  );
  animateOnScroll(serviceFeatures, "animate-fade-in");

  document.head.insertAdjacentHTML(
    "beforeend",
    `
      <style>
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .service-content .flex.items-start {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .service-content .flex.items-start:nth-child(1) { animation-delay: 0.1s; }
        .service-content .flex.items-start:nth-child(2) { animation-delay: 0.3s; }
        .service-content .flex.items-start:nth-child(3) { animation-delay: 0.5s; }
      </style>
    `
  );
});
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value;

      const formContainer = contactForm.parentElement;
      const successMessage = document.createElement("div");
      successMessage.className = "bg-green-50 p-6 rounded-lg text-center";
      successMessage.innerHTML = `
          <i class="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Pesan Terkirim!</h3>
          <p class="text-gray-600 mb-4">Terima kasih ${name} telah menghubungi saya. Saya akan membalas pesan Anda segera.</p>
          <button id="reset-form" class="px-6 py-2 bg-portfolio-pink text-white rounded-full hover:bg-portfolio-darkPink transition-all duration-300">
            Kirim Pesan Lainnya
          </button>
        `;

      contactForm.classList.add("hidden");
      formContainer.appendChild(successMessage);

      document
        .getElementById("reset-form")
        .addEventListener("click", function () {
          contactForm.reset();
          contactForm.classList.remove("hidden");
          successMessage.remove();
        });
    });
  }

  const faqButtons = document.querySelectorAll(".faq-button");

  faqButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isOpen = answer.classList.contains("hidden");

      document.querySelectorAll(".faq-answer").forEach((a) => {
        a.classList.add("hidden");
      });

      document.querySelectorAll(".faq-button i").forEach((icon) => {
        icon.style.transform = "rotate(0deg)";
      });

      if (isOpen) {
        answer.classList.remove("hidden");
        this.querySelector("i").style.transform = "rotate(180deg)";
      }
    });
  });

  const pulseDot = document.querySelector(".pulse-dot");
  if (pulseDot) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `
        <style>
          .pulse-dot {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.2);
            }
          }
        </style>
      `
    );
  }

  const fileInput = document.getElementById("attachment");
  if (fileInput) {
    fileInput.addEventListener("change", function (e) {
      const fileName = e.target.files[0]?.name;
      if (fileName) {
        const filePreview =
          this.closest(".relative").querySelector("p.text-xs");
        filePreview.textContent = `Selected file: ${fileName}`;
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = "1";
    } else {
      backToTopButton.style.opacity = "0";
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const newsletterForm = document.querySelector("footer form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      if (email && email.includes("@")) {
        emailInput.value = "";

        const successMessage = document.createElement("p");
        successMessage.className = "text-green-400 text-sm mt-2";
        successMessage.textContent = "Thank you for subscribing!";

        const existingMessage = this.nextElementSibling.nextElementSibling;
        if (
          existingMessage &&
          existingMessage.classList.contains("text-green-400")
        ) {
          existingMessage.remove();
        }

        this.parentNode.appendChild(successMessage);

        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
  }
});
