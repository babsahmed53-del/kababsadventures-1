/* KaBabs Adventures — edit the settings and trip list below to update the website. */
"use strict";

// BUSINESS SETTINGS: replace these placeholders before publishing.
const SITE_CONFIG = {
  whatsappNumber: "233549987651", // Ghana country code + number, digits only. Example format: 233XXXXXXXXX
  phoneDisplay: "+233 549987651"
};

// DEMO TRIPS: update dates, prices, seats and descriptions when real trip details are confirmed.
const trips = [
  
  {
    id: "accra-city-tour", destination: "Accra City Tour", category: "city",
    date: "26th December 2026", price: 250, seats: "...",
    description: "See Accra with fresh eyes. Explore notable city spots, discover local stories and enjoy the energy of Ghana’s capital.",
    image: "images/images (7).jpg",
    includes: ["Guided group experience", "Trip coordination", "Selected activities (confirm itinerary)"],
    bring: ["Comfortable outfit", "Phone or camera", "Some spending money"],
    departure: "Meeting point and departure time will be shared before the tour."
  },
  {
    id: "aburi-botanical-gardens", destination: "Aburi Botanical Gardens", category: "nature",
    date: "Date to be announced", price: 0, seats: "To be announced",
    description: "Slow down, enjoy the cool atmosphere and explore one of Ghana’s much-loved botanical spaces.",
    image: "images/Aburi-Botanical-Gardens-Park-Aburi-Eastern-Region-Ghana-TortoisePath.com-1-1024x768.jpeg",
    includes: ["Group trip coordination", "Shared travel experience", "Itinerary guidance"],
    bring: ["Walking shoes", "Water and snacks", "Camera"],
    departure: "Departure information will be confirmed with guests."
  },
  {
    id: "wli-waterfalls", destination: "Wli Waterfalls", category: "adventure",
    date: "Date to be announced", price: 0, seats: "To be announced",
    description: "Get ready for a memorable outdoor experience surrounded by dramatic scenery and the beauty of nature.",
    image: "images/wli water fall.jpg",
    includes: ["Trip coordination", "Group travel", "Destination activity details to be confirmed"],
    bring: ["Good walking or hiking shoes", "Change of clothes", "Waterproof bag"],
    departure: "Departure point and timing will be confirmed before the trip."
  },
  
];

const money = amount => `GH₵ ${Number(amount).toLocaleString("en-GH")}`;
const tripDateClass = date => date.trim().toLowerCase() === "date to be announced" ? "" : "trip-date-set";
const whatsappUrl = message => `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

// Shared site features: mobile navigation, year, WhatsApp links and back-to-top.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
  document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
    link.href = whatsappUrl("Hello KaBabs Adventures, I am interested in booking a trip.");
    link.target = "_blank";
    link.rel = "noopener";
  });
  document.querySelectorAll("[data-phone-display]").forEach(node => node.textContent = SITE_CONFIG.phoneDisplay);
  document.querySelectorAll("[data-phone-link]").forEach(link => {
    link.href = `tel:+${SITE_CONFIG.whatsappNumber}`;
  });

  const backTop = document.querySelector(".back-to-top");
  if (backTop) {
    window.addEventListener("scroll", () => backTop.classList.toggle("visible", window.scrollY > 500), { passive: true });
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Reveal sections as they enter the screen. Falls back gracefully on older browsers.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  renderFeaturedTrips();
  renderAllTrips();
  setupTripModal();
  setupGalleryLightbox();
  setupContactForm();
});

// Reusable trip card HTML. All card content comes from the trips array above.
function tripCard(trip) {
  return `
    <article class="trip-card">
      <div class="trip-image-wrap">
        <img src="${trip.image}" alt="${trip.destination}" loading="lazy">
        <span class="trip-category">${trip.category}</span>
      </div>
      <div class="trip-card-body">
        <div class="trip-card-meta"><span class="${tripDateClass(trip.date)}">◷ ${trip.date}</span><span>♧ ${trip.seats} seats </span></div>
        <h3>${trip.destination}</h3>
        <p>${trip.description}</p>
        <div class="trip-card-bottom">
          <div class="trip-price"><strong>${money(trip.price)}</strong><small> price · per person</small></div>
          <div class="trip-actions">
            <button type="button" data-view-trip="${trip.id}">Details</button>
            <button type="button" class="book-link" data-book-trip="${trip.id}">Book now</button>
          </div>
        </div>
      </div>
    </article>`;
}

function renderFeaturedTrips() {
  const container = document.querySelector("[data-featured-trips]");
  if (!container) return;
  container.innerHTML = trips.slice(0, 3).map(tripCard).join("");
}

function renderAllTrips(filter = "all", search = "") {
  const container = document.querySelector("[data-all-trips]");
  if (!container) return;
  const query = search.trim().toLowerCase();
  const matches = trips.filter(trip => (filter === "all" || trip.category === filter) &&
    (trip.destination.toLowerCase().includes(query) || trip.description.toLowerCase().includes(query)));
  container.innerHTML = matches.map(tripCard).join("");
  const empty = document.querySelector("[data-empty-state]");
  if (empty) empty.hidden = matches.length > 0;
}

function setupTripModal() {
  const modal = document.getElementById("trip-modal");
  const content = document.getElementById("trip-modal-content");

  document.addEventListener("click", event => {
    const viewButton = event.target.closest("[data-view-trip]");
    const bookButton = event.target.closest("[data-book-trip]");
    if (viewButton && modal && content) openTrip(viewButton.dataset.viewTrip);
    if (bookButton) {
      const trip = trips.find(item => item.id === bookButton.dataset.bookTrip);
      if (trip) {
        const message = `Hello KaBabs Adventures, I am interested in booking the ${trip.destination} trip. Please confirm availability, final price and booking steps.`;
        window.open(whatsappUrl(message), "_blank", "noopener");
      }
    }
    if (modal && event.target.matches("[data-close-modal]")) closeModal();
  });

  function openTrip(id) {
    if (!modal || !content) return;
    const trip = trips.find(item => item.id === id);
    if (!trip) return;
    content.innerHTML = `
      <img class="modal-trip-image" src="${trip.image}" alt="${trip.destination}">
      <p class="eyebrow">${trip.category.toUpperCase()} EXPERIENCE</p>
      <h2 id="modal-title">${trip.destination}</h2>
      <p>${trip.description}</p>
      <div class="modal-meta"><span class="${tripDateClass(trip.date)}">◷ ${trip.date}</span><span>${money(trip.price)} per person </span><span>${trip.seats} seats (demo)</span></div>
      <div class="modal-columns">
        <div><h3>What’s included</h3><ul>${trip.includes.map(item => `<li>${item}</li>`).join("")}</ul></div>
        <div><h3>What to bring</h3><ul>${trip.bring.map(item => `<li>${item}</li>`).join("")}</ul></div>
      </div>
      <p><strong>Departure:</strong> ${trip.departure}</p>
      <p class="form-note">These are sample trip details. Contact us to verify the actual date, price, inclusions and availability.</p>
      <form class="modal-booking-form" id="booking-form" data-trip-id="${trip.id}">
        <div class="form-row">
          <label>Your name<input name="customerName" required minlength="2" placeholder="Your full name"></label>
          <label>Phone number<input name="customerPhone" required type="tel" placeholder="024 000 0000"></label>
        </div>
        <label>Number of tickets<input name="tickets" type="number" min="1" max="${trip.seats}" value="1" required></label>
        <button class="btn btn-orange btn-full" type="submit">Click here to book on WhatsApp</button>
        <p class="form-note">This sends a booking enquiry to WhatsApp. Your booking is not confirmed until our team confirms it.</p>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (!content) return;
  content.addEventListener("submit", event => {
    if (event.target.id !== "booking-form") return;
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    const trip = trips.find(item => item.id === form.dataset.tripId);
    const data = new FormData(form);
    const name = data.get("customerName").trim();
    const phone = data.get("customerPhone").trim();
    const tickets = Number(data.get("tickets"));
    const message = `Hello KaBabs Adventures, I would like to enquire about booking.\n\nName: ${name}\nSelected trip: ${trip.destination}\nPhone number: ${phone}\nNumber of tickets: ${tickets}\n\nPlease confirm availability, final price and booking steps.`;
    window.open(whatsappUrl(message), "_blank", "noopener");
    const status = form.querySelector(".form-status");
    status.textContent = "WhatsApp has been opened with your enquiry. Please press Send there; the team must confirm your booking.";
  });
}

// Trip category buttons and destination search.
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  renderAllTrips(button.dataset.filter, document.getElementById("trip-search")?.value || "");
}));
const tripSearch = document.getElementById("trip-search");
if (tripSearch) tripSearch.addEventListener("input", () => {
  const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  renderAllTrips(activeFilter, tripSearch.value);
});

// Gallery lightbox with previous/next controls and Escape key.
function setupGalleryLightbox() {
  const gallery = document.querySelector("[data-gallery]");
  const lightbox = document.getElementById("lightbox");
  if (!gallery || !lightbox) return;
  const items = [...gallery.querySelectorAll("img")];
  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");
  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    image.src = items[current].src;
    image.alt = items[current].alt;
    caption.textContent = items[current].closest("figure")?.querySelector("figcaption")?.textContent || items[current].alt;
  }
  function close() { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

  items.forEach((img, index) => img.closest("figure").addEventListener("click", () => {
    show(index); lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
  }));
  lightbox.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", event => { if (event.target === lightbox) close(); });
  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
}

// Contact form: validate, then prepare an enquiry in WhatsApp (no backend is implied).
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = `Hello KaBabs Adventures, I have an enquiry.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email") || "Not provided"}\nMessage: ${data.get("message")}`;
    window.open(whatsappUrl(message), "_blank", "noopener");
    form.querySelector(".form-status").textContent = "WhatsApp has opened with your message. Press Send in WhatsApp to submit your enquiry.";
  });
}
