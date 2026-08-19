const products = {
  "Puro A2 Cow Ghee": {
    image: "assets/products/puro-ghee.png",
    badge: "Best Seller",
    description:
      "Traditional Vedic A2 cow ghee prepared for everyday Indian meals, festive cooking, and nourishing family rituals.",
    benefits: [
      "Traditional slow-crafted richness",
      "Grainy texture and deep aroma",
      "Ideal for tadka, rotis, rice, and sweets",
      "No artificial color or flavor",
    ],
    usage: "Use one spoon for tadka, spread over rotis, mix into warm rice, or add to sweets and festive recipes.",
  },
  "Organic Wheat": {
    image: "assets/products/organic-wheat.png",
    badge: "Stone Mill Ready",
    description:
      "Sharbati whole grain wheat packed in a natural jute-style presentation for fresh atta, rotis, and daily pantry use.",
    benefits: ["Whole grain Sharbati wheat", "Clean farm staple", "Naturally wholesome", "Packed for freshness"],
    usage: "Mill fresh for atta or store airtight in a cool pantry for daily family meals.",
  },
  "Premium Basmati Rice": {
    image: "assets/products/premium-rice.png",
    badge: "Premium Pick",
    description:
      "Aged basmati long grain rice selected for aroma, elegant grain length, and special Indian meals.",
    benefits: ["Aged basmati long grain", "Naturally aromatic", "Ideal for biryani and pulao", "Clean pantry essential"],
    usage: "Rinse gently, soak for 20-30 minutes, and cook for biryani, pulao, steamed rice, or festive meals.",
  },
  "Natural Cow Dung Cakes": {
    image: "assets/products/cow-dung-cakes.png",
    badge: "Farm Ritual",
    description:
      "Handmade natural cow dung cakes for traditional rituals, havan, and eco-conscious farm living.",
    benefits: ["Handmade and sun-dried", "Traditional ritual use", "Eco-friendly farm product", "No synthetic additives"],
    usage: "Use for havan, puja, traditional smoke rituals, or farm-based natural living practices.",
  },
  "Triphala Churna": {
    image: "assets/products/triphala-churna.png",
    badge: "Ayurvedic",
    description:
      "A classic Ayurvedic herbal formulation made with amalaki, bibhitaki, and haritaki for everyday digestive wellness.",
    benefits: ["Traditional Ayurvedic blend", "Supports digestion", "No preservatives", "Convenient resealable pouch"],
    usage: "Take 1-2 teaspoons with warm water at night, or as advised by a qualified practitioner.",
  },
};

const selectedProducts = [];
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const orderButtons = document.querySelectorAll("[data-order]");
const cartCount = document.querySelector("[data-cart-count]");
const cartLink = document.querySelector("[data-cart-link]");
const stickyCart = document.querySelector(".sticky-cart");
const cartToggle = document.querySelector(".cart-toggle");
const cartClose = document.querySelector(".cart-close");
const cartBadge = document.querySelector("[data-cart-badge]");
const dialog = document.querySelector(".product-dialog");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogBadge = document.querySelector("[data-dialog-badge]");
const dialogDescription = document.querySelector("[data-dialog-description]");
const dialogBenefits = document.querySelector("[data-dialog-benefits]");
const dialogUsage = document.querySelector("[data-dialog-usage]");
const dialogOrder = document.querySelector("[data-dialog-order]");
const tabButtons = document.querySelectorAll("[data-dialog-tab]");
const tabPanels = document.querySelectorAll(".tab-panel");
const pages = document.querySelectorAll(".page-view");
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a, .mobile-header-nav a, .brand, .hero-actions a[href^="#"], .overview-grid a, .hero-media a[href^="#"]');
const mainNavLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a, .mobile-header-nav a');
const validPages = new Set(["home", "shop", "process", "ayurveda", "contact"]);
const carousel = document.querySelector("[data-carousel]");
const carouselTrack = document.querySelector("[data-carousel-track]");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const carouselDots = document.querySelectorAll("[data-carousel-dot]");
let activeSlide = 0;
let touchStartX = 0;

function showPage(pageName) {
  const activePage = validPages.has(pageName) ? pageName : "home";

  pages.forEach((page) => {
    const isMainPage = page.id === activePage;
    const isChildPage = page.dataset.pageChild === activePage;
    page.classList.toggle("active-page", isMainPage);
    page.classList.toggle("active-child", isChildPage);
  });

  mainNavLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activePage}`);
  });

  if (window.location.hash !== `#${activePage}`) {
    history.replaceState(null, "", `#${activePage}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSlide(index) {
  if (!carouselTrack || !carouselSlides.length) {
    return;
  }

  activeSlide = (index + carouselSlides.length) % carouselSlides.length;
  carouselTrack.style.transform = `translateX(-${activeSlide * 100}%)`;

  carouselDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function updateCartLink() {
  const count = selectedProducts.length;
  cartCount.textContent = count;
  if (cartBadge) {
    cartBadge.textContent = count;
  }
  if (stickyCart) {
    if (count > 0) {
      stickyCart.classList.add("has-items");
    } else {
      stickyCart.classList.remove("has-items");
    }
  }
  const productText = count
    ? `Hi Arogya Organic, I want to order: ${selectedProducts.join(", ")}. Please confirm availability and delivery.`
    : "Hi Arogya Organic, I want to place an order.";
  cartLink.href = `https://wa.me/917769999888?text=${encodeURIComponent(productText)}`;
}

function addProduct(productName) {
  selectedProducts.push(productName);
  updateCartLink();
  if (stickyCart) {
    stickyCart.classList.remove("collapsed");
  }
}

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

cartToggle?.addEventListener("click", () => {
  stickyCart?.classList.remove("collapsed");
});

cartClose?.addEventListener("click", (event) => {
  event.stopPropagation();
  stickyCart?.classList.add("collapsed");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");

    if (!hash || !hash.startsWith("#")) {
      return;
    }

    event.preventDefault();
    showPage(hash.slice(1));
  });
});

window.addEventListener("hashchange", () => {
  showPage(window.location.hash.replace("#", ""));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addProduct(button.dataset.order);
    button.textContent = "Added";
    window.setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1200);
  });
});

// Dialog Tab switching logic
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.dataset.dialogTab;

    tabButtons.forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    tabPanels.forEach((panel) => {
      const isTarget = panel.id === `pane-${targetTab}`;
      panel.classList.toggle("active", isTarget);
    });
  });
});

function resetDialogTabs() {
  tabButtons.forEach((b, idx) => {
    const isFirst = idx === 0;
    b.classList.toggle("active", isFirst);
    b.setAttribute("aria-selected", isFirst ? "true" : "false");
  });
  tabPanels.forEach((panel, idx) => {
    panel.classList.toggle("active", idx === 0);
  });
}

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;
    const product = products[productName];

    if (!product) {
      return;
    }

    dialogImage.src = product.image;
    dialogImage.alt = productName;
    dialogTitle.textContent = productName;
    dialogBadge.textContent = product.badge;
    dialogDescription.textContent = product.description;
    dialogUsage.textContent = product.usage;
    dialogBenefits.replaceChildren(
      ...product.benefits.map((benefit) => {
        const item = document.createElement("li");
        item.textContent = benefit;
        return item;
      })
    );
    dialogOrder.dataset.order = productName;
    resetDialogTabs();
    dialog.showModal();
  });
});

carouselPrev?.addEventListener("click", () => {
  showSlide(activeSlide - 1);
});

carouselNext?.addEventListener("click", () => {
  showSlide(activeSlide + 1);
});

carouselDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.carouselDot));
  });
});

carousel?.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

carousel?.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) < 40) {
    return;
  }

  showSlide(activeSlide + (swipeDistance < 0 ? 1 : -1));
});

carousel?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showSlide(activeSlide - 1);
  }

  if (event.key === "ArrowRight") {
    showSlide(activeSlide + 1);
  }
});

dialogOrder.addEventListener("click", () => {
  addProduct(dialogOrder.dataset.order);
  dialog.close();
});

document.querySelector(".dialog-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}

function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider");
  const track = document.querySelector("[data-slider-track]");
  const slides = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector("[data-slider-prev]");
  const nextBtn = document.querySelector("[data-slider-next]");
  const dots = document.querySelectorAll("[data-slider-dot]");

  if (!track || !slides.length) return;

  let activeIndex = 0;
  let autoplayTimer = null;
  let startX = 0;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      const isActive = idx === activeIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  prevBtn?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.sliderDot));
      startAutoplay();
    });
  });

  slider?.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  slider?.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 40) {
      showSlide(activeIndex + (diff < 0 ? 1 : -1));
    }
    startAutoplay();
  }, { passive: true });

  slider?.addEventListener("mouseenter", stopAutoplay);
  slider?.addEventListener("mouseleave", startAutoplay);

  startAutoplay();
}

updateCartLink();
showSlide(0);
showPage(window.location.hash.replace("#", "") || "home");
initRevealAnimations();
initTestimonialSlider();
