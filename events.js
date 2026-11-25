/**
 * ============================================================================
 * LPU CAMPUS CLUBS - EVENTS MODULE (events.js)
 * Course: CSE326 Internet Programming
 * Description: Events data, filtering, search, modal registration & LocalStorage
 * ============================================================================
 */

// Global events dataset (illustrative campus demonstration data)
const EVENTS_DATA = [
  {
    id: "hacklpu-2026",
    title: "HackLPU: 24-Hour Campus Code Sprint",
    category: "Technology",
    badgeClass: "badge-tech",
    clubId: "coding-tech",
    organizer: "Coding & Technology Club",
    date: "November 14-15, 2026",
    time: "10:00 AM (Overnight 24 Hrs)",
    venue: "Block 34, Central Innovation Lab 301",
    description:
      "A fast-paced 24-hour hackathon challenging students to architect impactful solutions in AI, web development, smart campus utilities, and sustainability.",
    seatsAvailable: 120,
    featured: true
  },
  {
    id: "roboclash-2026",
    title: "RoboClash: Autonomous Bot Battle",
    category: "Technology",
    badgeClass: "badge-tech",
    clubId: "robotics",
    organizer: "Robotics & Automation Club",
    date: "November 21, 2026",
    time: "2:00 PM - 6:00 PM",
    venue: "Block 28, Mechatronics Arena",
    description:
      "High-octane robotic battle where custom-engineered wired and autonomous rovers compete in line-tracing and obstacle elimination challenges.",
    seatsAvailable: 80,
    featured: false
  },
  {
    id: "rhythm-dance-off",
    title: "Rhythm 2026: Inter-Department Dance Off",
    category: "Cultural",
    badgeClass: "badge-cultural",
    clubId: "dance",
    organizer: "Groove & Beats Dance Society",
    date: "November 28, 2026",
    time: "5:00 PM - 8:30 PM",
    venue: "Shanti Devi Mittal Auditorium (Main Stage)",
    description:
      "An electric showcase of hip-hop, contemporary, and Bhangra crews representing various LPU academic schools battling for the campus trophy.",
    seatsAvailable: 450,
    featured: true
  },
  {
    id: "campus-photowalk",
    title: "Through the Lens: Golden Hour Photowalk",
    category: "Photography",
    badgeClass: "badge-media",
    clubId: "photography",
    organizer: "Aperture Photography Guild",
    date: "December 05, 2026",
    time: "3:30 PM - 6:00 PM",
    venue: "Assembly at Central Plaza, Uni-Mall Lawns",
    description:
      "A guided campus photowalk teaching natural lighting, architectural perspective, portrait framing, and mobile photography best practices.",
    seatsAvailable: 50,
    featured: true
  },
  {
    id: "venturecraft-pitch",
    title: "VentureCraft: Student Startup Pitch Challenge",
    category: "Entrepreneurship",
    badgeClass: "badge-entrepreneurship",
    clubId: "entrepreneurship",
    organizer: "Ignite E-Cell",
    date: "December 12, 2026",
    time: "11:00 AM - 4:00 PM",
    venue: "Startup Incubation Centre, Block 38",
    description:
      "Aspiring student founders present their business models, prototypes, and pitch decks to faculty mentors and alumni angel investors.",
    seatsAvailable: 100,
    featured: false
  },
  {
    id: "badminton-smash",
    title: "SmashFest: Inter-Block Badminton Open",
    category: "Sports",
    badgeClass: "badge-sports",
    clubId: "sports",
    organizer: "Apex Athletics & Sports Club",
    date: "December 18-19, 2026",
    time: "9:00 AM - 5:00 PM",
    venue: "Baldev Raj Mittal Sports Complex, Court 3 & 4",
    description:
      "Knockout badminton championship open for singles and doubles across all year batches. Medals, trophies, and merit certificates awarded.",
    seatsAvailable: 64,
    featured: false
  },
  {
    id: "acoustic-unplugged",
    title: "Acoustic Sunset: Open Mic & Band Jam",
    category: "Cultural",
    badgeClass: "badge-cultural",
    clubId: "music",
    organizer: "Symphony Music Society",
    date: "December 22, 2026",
    time: "5:30 PM - 8:00 PM",
    venue: "Student Activity Centre (SAC) Amphitheatre",
    description:
      "An open-air evening celebrating student vocalists, guitarists, and acoustic ensembles under the twilight campus sky.",
    seatsAvailable: 200,
    featured: false
  },
  {
    id: "web-dev-workshop",
    title: "WebCraft: Modern HTML, CSS & JS Masterclass",
    category: "Workshop",
    badgeClass: "badge-workshop",
    clubId: "coding-tech",
    organizer: "Coding & Technology Club",
    date: "December 28, 2026",
    time: "3:00 PM - 6:00 PM",
    venue: "Block 34, Computer Lab 204",
    description:
      "Hands-on introductory workshop for 1st & 2nd year students covering semantic HTML5, modern CSS3 layout systems (Flex/Grid), and interactive JavaScript.",
    seatsAvailable: 90,
    featured: true
  }
];

// LocalStorage key for event registrations
const EVENT_REG_STORAGE_KEY = "lpu_event_registrations";

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", function () {
  initEventsPage();
  initHomeUpcomingEvents();
  initEventRegistrationModal();
});

/**
 * 1. Events Page Functionality (events.html)
 * Handles search, category filtering, and cards rendering
 */
function initEventsPage() {
  const eventsContainer = document.getElementById("events-grid-container");
  if (!eventsContainer) return;

  const searchInput = document.getElementById("event-search-input");
  const filterPills = document.querySelectorAll(".filter-pill[data-category]");
  const countDisplay = document.getElementById("event-count-display");
  const clearFilterBtn = document.getElementById("clear-event-filters");
  const myRegistrationsContainer = document.getElementById("my-registered-events-list");

  let activeCategory = "all";
  let searchQuery = "";

  // Check URL query for initial search parameter (e.g. from club details link)
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get("search");
  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
    searchQuery = initialSearch;
  }

  // Render events matching criteria
  function updateEventsDirectory() {
    const query = searchQuery.trim().toLowerCase();

    const filtered = EVENTS_DATA.filter(function (event) {
      const matchesCategory =
        activeCategory === "all" ||
        event.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        query === "" ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${EVENTS_DATA.length} events`;
    }

    if (filtered.length === 0) {
      eventsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">&#128197;</div>
          <h3>No Events Found</h3>
          <p>We couldn't find any events matching "<strong>${escapeHTML(searchQuery)}</strong>" in the selected category.</p>
          <button type="button" class="btn btn-outline btn-sm" id="reset-event-filter-btn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-event-filter-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", resetFilters);
      }
    } else {
      eventsContainer.innerHTML = filtered.map(createEventCardHTML).join("");
      attachEventCardListeners();
    }

    renderMyRegistrationsList();
  }

  function resetFilters() {
    activeCategory = "all";
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    filterPills.forEach(function (pill) {
      if (pill.getAttribute("data-category") === "all") {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
    updateEventsDirectory();
  }

  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      searchQuery = e.target.value;
      updateEventsDirectory();
    });
  }

  filterPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "all";
      updateEventsDirectory();
    });
  });

  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", resetFilters);
  }

  // Initial render
  updateEventsDirectory();
}

/**
 * Checks if current user/browser is already registered for an event
 * @param {string} eventId
 * @returns {boolean}
 */
function isUserRegisteredForEvent(eventId) {
  const registrations = getFromLocalStorage(EVENT_REG_STORAGE_KEY, []);
  return registrations.some((reg) => reg.eventId === eventId);
}

/**
 * Generates HTML string for an Event Card
 * @param {Object} event
 * @returns {string}
 */
function createEventCardHTML(event) {
  const isRegistered = isUserRegisteredForEvent(event.id);

  let regButtonHTML = "";
  if (isRegistered) {
    regButtonHTML = `
      <button type="button" class="btn btn-outline btn-sm" style="color:var(--color-success); border-color:var(--color-success); cursor:default;" disabled>
        &#10004; Registered
      </button>
    `;
  } else {
    regButtonHTML = `
      <button type="button" class="btn btn-primary btn-sm btn-register-event" data-event-id="${event.id}">
        Register Now
      </button>
    `;
  }

  return `
    <article class="event-card" data-event-id="${event.id}">
      <div class="event-card-header">
        <span class="badge ${event.badgeClass}">${escapeHTML(event.category)}</span>
        <span style="font-size:0.8rem; color:var(--color-muted);">&#128101; ${event.seatsAvailable} Seats</span>
      </div>

      <div class="event-card-body">
        <div class="event-date-badge">
          &#128197; ${escapeHTML(event.date)}
        </div>
        <h3 class="event-card-title">${escapeHTML(event.title)}</h3>
        <p class="event-card-desc">${escapeHTML(event.description)}</p>

        <ul class="event-details-list">
          <li>
            <strong style="width:70px; color:var(--color-muted);">&#9200; Time:</strong>
            <span>${escapeHTML(event.time)}</span>
          </li>
          <li>
            <strong style="width:70px; color:var(--color-muted);">&#128205; Venue:</strong>
            <span>${escapeHTML(event.venue)}</span>
          </li>
          <li>
            <strong style="width:70px; color:var(--color-muted);">&#127881; Host:</strong>
            <span>${escapeHTML(event.organizer)}</span>
          </li>
        </ul>
      </div>

      <div class="event-card-footer">
        <a href="club-details.html?id=${encodeURIComponent(event.clubId)}" class="btn btn-secondary btn-sm">
          Host Club
        </a>
        ${regButtonHTML}
      </div>
    </article>
  `;
}

/**
 * Attaches click handlers to "Register Now" buttons on event cards
 */
function attachEventCardListeners() {
  const regButtons = document.querySelectorAll(".btn-register-event");
  regButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const eventId = btn.getAttribute("data-event-id");
      openEventRegistrationModal(eventId);
    });
  });
}

/**
 * 2. Event Registration Modal & Form Handling
 */
let currentEventToRegister = null;

function initEventRegistrationModal() {
  const modalBackdrop = document.getElementById("event-registration-modal");
  if (!modalBackdrop) return;

  const closeBtn = document.getElementById("modal-close-btn");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const regForm = document.getElementById("modal-event-form");

  // Close handlers
  function closeModal() {
    modalBackdrop.classList.remove("active");
    currentEventToRegister = null;
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  // Close when clicking on backdrop outside dialog
  modalBackdrop.addEventListener("click", function (e) {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Handle modal registration form submit
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!currentEventToRegister) return;

      const nameInput = document.getElementById("modal-student-name");
      const idInput = document.getElementById("modal-student-id");
      const emailInput = document.getElementById("modal-student-email");

      const studentName = nameInput.value.trim();
      const studentId = idInput.value.trim();
      const studentEmail = emailInput.value.trim();

      // Basic validation
      if (!studentName || !studentId || !studentEmail) {
        showToast("Please fill in all registration fields.", "error");
        return;
      }

      // Check if already registered
      if (isUserRegisteredForEvent(currentEventToRegister.id)) {
        showToast("You are already registered for this event!", "warning");
        closeModal();
        return;
      }

      // Save registration object to LocalStorage
      const existing = getFromLocalStorage(EVENT_REG_STORAGE_KEY, []);
      const newRegistration = {
        registrationId: "EVT-" + Date.now().toString(36).toUpperCase(),
        eventId: currentEventToRegister.id,
        eventTitle: currentEventToRegister.title,
        eventDate: currentEventToRegister.date,
        eventVenue: currentEventToRegister.venue,
        studentName: studentName,
        studentId: studentId,
        studentEmail: studentEmail,
        timestamp: new Date().toLocaleString()
      };

      existing.push(newRegistration);
      saveToLocalStorage(EVENT_REG_STORAGE_KEY, existing);

      // Close modal and notify user
      closeModal();
      showToast(
        `Successfully registered for ${currentEventToRegister.title}!`,
        "success"
      );

      // Refresh directory view if on events page
      const eventsContainer = document.getElementById("events-grid-container");
      if (eventsContainer) {
        // Re-run events page renderer to reflect updated button states
        initEventsPage();
      }

      // Also refresh home upcoming events if on index.html
      initHomeUpcomingEvents();
    });
  }
}

/**
 * Opens event registration modal for a specific event
 * @param {string} eventId
 */
function openEventRegistrationModal(eventId) {
  const event = EVENTS_DATA.find((e) => e.id === eventId);
  if (!event) return;

  currentEventToRegister = event;

  const modalBackdrop = document.getElementById("event-registration-modal");
  const modalEventTitle = document.getElementById("modal-event-title");
  const modalEventMeta = document.getElementById("modal-event-meta");

  if (modalEventTitle) modalEventTitle.textContent = event.title;
  if (modalEventMeta) {
    modalEventMeta.textContent = `${event.date} • ${event.venue} • Organized by ${event.organizer}`;
  }

  // Pre-fill user details if they previously registered in LocalStorage (great viva demo feature!)
  const prevRegistrations = getFromLocalStorage(EVENT_REG_STORAGE_KEY, []);
  const clubMemberships = getFromLocalStorage("lpu_club_memberships", []);

  const nameInput = document.getElementById("modal-student-name");
  const idInput = document.getElementById("modal-student-id");
  const emailInput = document.getElementById("modal-student-email");

  if (prevRegistrations.length > 0) {
    const last = prevRegistrations[prevRegistrations.length - 1];
    if (nameInput && !nameInput.value) nameInput.value = last.studentName || "";
    if (idInput && !idInput.value) idInput.value = last.studentId || "";
    if (emailInput && !emailInput.value) emailInput.value = last.studentEmail || "";
  } else if (clubMemberships.length > 0) {
    const last = clubMemberships[clubMemberships.length - 1];
    if (nameInput && !nameInput.value) nameInput.value = last.fullName || "";
    if (idInput && !idInput.value) idInput.value = last.studentId || "";
    if (emailInput && !emailInput.value) emailInput.value = last.email || "";
  }

  if (modalBackdrop) {
    modalBackdrop.classList.add("active");
  }
}

/**
 * 3. Render "My Registered Events" Section on events.html
 * Shows students their active passes saved in browser LocalStorage
 */
function renderMyRegistrationsList() {
  const listContainer = document.getElementById("my-registered-events-list");
  if (!listContainer) return;

  const registrations = getFromLocalStorage(EVENT_REG_STORAGE_KEY, []);

  if (registrations.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align:center; padding:1.5rem; color:var(--color-muted); font-size:0.9rem;">
        You haven't registered for any campus events yet. Click "Register Now" on any event above!
      </div>
    `;
    return;
  }

  listContainer.innerHTML = registrations
    .map(function (reg) {
      return `
        <div class="saved-registration-card">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
              <span class="badge badge-status-registered">&#10004; Registered</span>
              <strong style="color:var(--color-dark); font-size:1rem;">${escapeHTML(reg.eventTitle)}</strong>
            </div>
            <p style="font-size:0.85rem; color:var(--color-muted); margin-bottom:0.2rem;">
              &#128197; ${escapeHTML(reg.eventDate)} &bull; &#128205; ${escapeHTML(reg.eventVenue)}
            </p>
            <p style="font-size:0.78rem; color:var(--color-muted); margin-bottom:0;">
              Ticket ID: <code>${escapeHTML(reg.registrationId)}</code> &bull; Student: ${escapeHTML(reg.studentName)} (${escapeHTML(reg.studentId)})
            </p>
          </div>
          <button type="button" class="btn btn-outline btn-sm btn-cancel-event-reg" data-reg-id="${reg.registrationId}" style="color:var(--color-danger); border-color:var(--color-danger);" title="Cancel demonstration registration">
            Cancel Pass
          </button>
        </div>
      `;
    })
    .join("");

  // Attach cancel handlers
  const cancelBtns = listContainer.querySelectorAll(".btn-cancel-event-reg");
  cancelBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const regId = btn.getAttribute("data-reg-id");
      cancelEventRegistration(regId);
    });
  });
}

/**
 * Cancels a demonstration event pass from LocalStorage
 * @param {string} registrationId
 */
function cancelEventRegistration(registrationId) {
  let registrations = getFromLocalStorage(EVENT_REG_STORAGE_KEY, []);
  registrations = registrations.filter((r) => r.registrationId !== registrationId);
  saveToLocalStorage(EVENT_REG_STORAGE_KEY, registrations);

  showToast("Demonstration event registration cancelled.", "info");

  // Re-render
  initEventsPage();
}

/**
 * 4. Homepage Upcoming Events (index.html)
 */
function initHomeUpcomingEvents() {
  const container = document.getElementById("upcoming-events-container");
  if (!container) return;

  const upcoming = EVENTS_DATA.filter((e) => e.featured).slice(0, 3);
  container.innerHTML = upcoming.map(createEventCardHTML).join("");
  attachEventCardListeners();
}
