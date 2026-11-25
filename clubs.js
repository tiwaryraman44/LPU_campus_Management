/**
 * ============================================================================
 * LPU CAMPUS CLUBS - CLUBS MODULE (clubs.js)
 * Course: CSE326 Internet Programming
 * Description: Clubs data, directory search & category filters, and club details
 * ============================================================================
 */

// Global clubs dataset (illustrative campus demonstration data)
const CLUBS_DATA = [
  {
    id: "coding-tech",
    name: "Coding & Technology Club",
    category: "Technical",
    badgeClass: "badge-tech",
    icon: "&#128187;", // Laptop
    tagline: "Building algorithms, software solutions, and tech innovators.",
    description:
      "The Coding & Technology Club is the flagship tech community at LPU. We empower students to master full-stack development, competitive programming, artificial intelligence, and open-source contributions through regular peer learning sessions, hackathons, and technical bootcamps.",
    membersCount: 420,
    facultyCoordinator: "Dr. ******* (School of Computer Science)",
    studentLead: "****** (B.Tech CSE, 3rd Year)",
    venue: "Block 34, Innovation & Coding Lab 302",
    meetingTime: "Every Wednesday & Friday, 4:30 PM - 6:00 PM",
    activities: [
      "Weekly algorithmic problem solving & DSA workshops",
      "24-Hour annual campus HackLPU hackathons",
      "Web development and app creation bootcamps",
      "Open-source contribution guidance & Git sprints",
      "Industry tech talk webinars with LPU alumni"
    ],
    benefits: [
      "Official certificate of participation and leadership roles",
      "Priority access to hackathons and tech competitions",
      "Mentorship from senior developers and competitive coders",
      "Hands-on portfolio project collaborations"
    ],
    featured: true
  },
  {
    id: "robotics",
    name: "Robotics & Automation Club",
    category: "Technical",
    badgeClass: "badge-tech",
    icon: "&#129302;", // Robot
    tagline: "Engineering tomorrow through intelligent hardware and mechanics.",
    description:
      "Dedicated to embedded systems, IoT, autonomous rovers, and drone technology. Members get hands-on experience designing microcontrollers, sensor integration, Arduino/Raspberry Pi architectures, and participating in national robotics tournaments.",
    membersCount: 280,
    facultyCoordinator: "Prof. ******* (School of Electronics)",
    studentLead: "******* (B.Tech ECE, 4th Year)",
    venue: "Block 34",
    meetingTime: "Every Tuesday & Thursday, 5:00 PM - 7:00 PM",
    activities: [
      "Microcontroller programming (Arduino, ESP32, STM32)",
      "Combat robot building and autonomous obstacle avoiders",
      "Drone assembly and aeromodelling flight sessions",
      "CAD modelling and 3D prototyping workshops"
    ],
    benefits: [
      "Access to lab equipment, 3D printers, and sensor kits",
      "Mentorship for national competitions like Robocon",
      "Inter-disciplinary teamwork across CSE, ECE, and Mechanical",
      "Project certificates recognized for academic capstones"
    ],
    featured: false
  },
  {
    id: "cultural",
    name: "Virasat Heritage club",
    category: "Cultural",
    badgeClass: "badge-cultural",
    icon: "&#127917;", // Performing Arts Masks
    tagline: "Celebrating India's rich heritage, drama, and regional diversity.",
    description:
      "Virasat brings together students from all states of India and international backgrounds to celebrate theatre, folklore, street plays (Nukkad Natak), and cultural festivals. The club serves as the cultural ambassador of campus life.",
    membersCount: 350,
    facultyCoordinator: "Dr.****** (School of Humanities)",
    studentLead: "******* (B.A. Journalism, 3rd Year)",
    venue: "Shanti Devi Mittal Auditorium, Rehearsal Studio 2",
    meetingTime: "Every Monday & Saturday, 4:30 PM - 6:30 PM",
    activities: [
      "Nukkad Natak (Street Play) scriptwriting & rehearsals",
      "Inter-university youth festival stage drama performances",
      "Traditional Indian folk art exhibitions and heritage walks",
      "Multicultural celebration evenings and language exchanges"
    ],
    benefits: [
      "Stage confidence and public performance refinement",
      "Representation of LPU at national youth cultural festivals",
      "Creative expression through scriptwriting and directing",
      "Vibrant community with members from all 28 Indian states"
    ],
    featured: true
  },
  {
    id: "dance",
    name: "Classical and Western Dance club",
    category: "Cultural",
    badgeClass: "badge-cultural",
    icon: "&#128131;", // Dancer
    tagline: "Unleashing energy through classical, hip-hop, and contemporary dance.",
    description:
      "Groove & Beats is LPU's most dynamic dance troupe. Catering to both beginners and seasoned performers, we practice Western hip-hop, Bhangra, Bollywood fusion, and classical Indian dance forms with professional student choreographers.",
    membersCount: 310,
    facultyCoordinator: "Prof. ***** (Cultural Affairs)",
    studentLead: "***** (B.Design, 3rd Year)",
    venue: "Unipolis, LPU, Block 12",
    meetingTime: "Every Tuesday, Thursday & Saturday, 5:30 PM - 7:30 PM",
    activities: [
      "Choreography masterclasses across diverse dance styles",
      "Flash mobs and headline performances at university fests",
      "Annual Inter-Hostel Dance Off competitions",
      "Fitness conditioning and rhythm agility workshops"
    ],
    benefits: [
      "Professional choreography training free of cost",
      "Stage exposure in front of crowds of over 10,000 students",
      "Physical fitness, agility, and artistic development",
      "Official representation at international university festivals"
    ],
    featured: false
  },
  {
    id: "music",
    name: "Instrumental & Vcocal Groups",
    category: "Cultural",
    badgeClass: "badge-cultural",
    icon: "&#127928;", // Guitar
    tagline: "Harmonizing vocals, instruments, and acoustic soul on campus.",
    description:
      "From rock bands and classical instrumentalists to beatboxers and vocalists, Symphony is the sanctuary for campus musicians. We organize open mics, campus jam sessions, and acoustic evenings under the stars.",
    membersCount: 260,
    facultyCoordinator: "Dr. ****** (Fine Arts Department)",
    studentLead: "***** (B.Tech CSE, 2nd Year)",
    venue: "Unipolis, LPU , BLock 12",
    meetingTime: "Every Wednesday & Friday, 5:00 PM - 7:00 PM",
    activities: [
      "Acoustic jam sessions at Central Plaza & Uni-Mall lawns",
      "Vocal training and ear harmonization workshops",
      "Campus band formation and recording studio basics",
      "Unplugged evening concerts and charity open mics"
    ],
    benefits: [
      "Access to sound gear, drum kits, keyboards, and amplifiers",
      "Collaboration with talented lyricists and producers",
      "Performance slots at major university cultural galas",
      "Audio production and digital mixing introductory clinics"
    ],
    featured: false
  },
  {
    id: "photography",
    name: "Aperture Photography & Media Guild",
    category: "Media",
    badgeClass: "badge-media",
    icon: "&#128247;", // Camera
    tagline: "Capturing campus memories, visual storytelling, and cinematography.",
    description:
      "Aperture trains aspiring photographers, video editors, and content creators. We cover major university fests, host guided photowalks around Punjab's historic sites, and teach post-processing in Lightroom and Premiere Pro.",
    membersCount: 290,
    facultyCoordinator: "Prof.****** (School of Media & Film)",
    studentLead: "****** (B.Sc Film & TV, 3rd Year)",
    venue: "Unipolis,LPU , Block 12",
    meetingTime: "Every Saturday, 10:00 AM - 1:00 PM",
    activities: [
      "Outdoor photowalks across campus landmarks and heritage spots",
      "Manual camera controls, lighting, and composition clinics",
      "Digital editing and color grading tutorials (Lightroom / Photoshop)",
      "Official media coverage for university sports and guest lectures"
    ],
    benefits: [
      "Hands-on access to DSLR camera rigs and studio lighting",
      "Photo accreditation in university magazines and social portals",
      "Curated portfolio critiques from visiting photographers",
      "Exhibition opportunities at the annual campus art gallery"
    ],
    featured: true
  },
  {
    id: "sports",
    name: "Apex Athletics & Sports Club",
    category: "Sports",
    badgeClass: "badge-sports",
    icon: "&#9917;", // Soccer ball
    tagline: "Fostering athletic excellence, sportsmanship, and physical grit.",
    description:
      "Apex Sports Club brings together passionate athletes across badminton, football, basketball, cricket, and track & field. We organize inter-departmental tournaments and promote balanced student wellness through regular fitness training.",
    membersCount: 510,
    facultyCoordinator: "Coach ****** (Physical Education)",
    studentLead: "******* (B.P.Ed, 3rd Year)",
    venue: "Baldev Raj Mittal Sports Complex & LPU Stadiums",
    meetingTime: "Daily Morning (6:00 - 8:00 AM) & Evening (5:00 - 7:00 PM)",
    activities: [
      "Inter-departmental league tournaments in Cricket, Football, & Turf",
      "Badminton, table tennis, and squash ladder championships",
      "Cross-country campus marathon runs and fitness bootcamps",
      "Sports strategy and tactical coaching with national trainers"
    ],
    benefits: [
      "Usage of Olympic-standard sporting facilities and equipment",
      "Trials for university varsity teams and national collegiate games",
      "Physical fitness, discipline, and endurance enhancement",
      "Leadership opportunities as tournament coordinators"
    ],
    featured: true
  },
  {
    id: "entrepreneurship",
    name: "Ignite E-Cell & Startup Hub",
    category: "Entrepreneurship",
    badgeClass: "badge-entrepreneurship",
    icon: "&#128640;", // Rocket
    tagline: "Transforming ambitious ideas into viable student-led enterprises.",
    description:
      "The Ignite Entrepreneurship Cell incubates visionary ideas. We link aspiring student founders with angel investors, provide legal and pitch-deck mentorship, and guide students through LPU's startup incubation infrastructure.",
    membersCount: 380,
    facultyCoordinator: "Dr. ******** (Startup Incubation Centre)",
    studentLead: "******* (BBA, 3rd Year)",
    venue: "Student welfare wing, LPU, Block 14",
    meetingTime: "Every Friday, 3:30 PM - 5:30 PM",
    activities: [
      "VentureCraft: Annual student pitch competition with seed grants",
      "Founders' Fireside Chats with successful startup alumni",
      "Business model canvas and product-market fit clinics",
      "Patent filing, IPR, and company registration guidance"
    ],
    benefits: [
      "Incubation support and seed funding opportunities",
      "Direct networking with angel investors and industry mentors",
      "Free coworking space access inside Block 38 Incubation Hub",
      "Certificate of entrepreneurial excellence"
    ],
    featured: false
  }
];

// Execute when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initClubsPage();
  initClubDetailsPage();
  initFeaturedClubs();
});

/**
 * 1. Club Directory Page Functionality (clubs.html)
 * Handles search, category filtering, and dynamic card generation
 */
function initClubsPage() {
  const clubsContainer = document.getElementById("clubs-grid-container");
  if (!clubsContainer) return; // Exit if not on clubs.html

  const searchInput = document.getElementById("club-search-input");
  const filterPills = document.querySelectorAll(".filter-pill[data-category]");
  const countDisplay = document.getElementById("club-count-display");
  const clearFilterBtn = document.getElementById("clear-club-filters");

  let activeCategory = "all";
  let searchQuery = "";

  // Render cards based on current filters
  function updateDirectory() {
    const query = searchQuery.trim().toLowerCase();

    // Filter array using Array.prototype.filter
    const filtered = CLUBS_DATA.filter(function (club) {
      // Category match
      const matchesCategory =
        activeCategory === "all" ||
        club.category.toLowerCase() === activeCategory.toLowerCase();

      // Search match across name, tagline, description, activities
      const matchesSearch =
        query === "" ||
        club.name.toLowerCase().includes(query) ||
        club.tagline.toLowerCase().includes(query) ||
        club.description.toLowerCase().includes(query) ||
        club.activities.some((act) => act.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    // Update count display
    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${CLUBS_DATA.length} clubs`;
    }

    // Render cards or empty state
    if (filtered.length === 0) {
      clubsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">&#128269;</div>
          <h3>No Campus Clubs Found</h3>
          <p>We couldn't find any clubs matching "<strong>${escapeHTML(searchQuery)}</strong>" in the selected category.</p>
          <button type="button" class="btn btn-outline btn-sm" id="empty-state-reset-btn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("empty-state-reset-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", resetFilters);
      }
    } else {
      clubsContainer.innerHTML = filtered.map(createClubCardHTML).join("");
    }
  }

  // Reset filters handler
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
    updateDirectory();
  }

  // Search input event listener (live search as user types)
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      searchQuery = e.target.value;
      updateDirectory();
    });
  }

  // Category filter buttons event listener
  filterPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "all";
      updateDirectory();
    });
  });

  // Clear filter button
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", resetFilters);
  }

  // Initial render of all clubs
  updateDirectory();
}

/**
 * Generates HTML string for a single Club Card
 * @param {Object} club
 * @returns {string} HTML string
 */
function createClubCardHTML(club) {
  return `
    <article class="club-card" data-id="${club.id}">
      <div class="club-card-header">
        <div class="club-icon-wrap" aria-hidden="true">${club.icon}</div>
        <span class="badge ${club.badgeClass}">${escapeHTML(club.category)}</span>
      </div>

      <h3 class="club-card-title">
        <a href="club-details.html?id=${encodeURIComponent(club.id)}">${escapeHTML(club.name)}</a>
      </h3>

      <p class="club-card-desc">${escapeHTML(club.tagline)}</p>

      <div class="club-card-meta">
        <div class="club-meta-row">
          <span class="club-meta-icon" aria-hidden="true">&#128205;</span>
          <span><strong>Venue:</strong> ${escapeHTML(club.venue.split(",")[0])}</span>
        </div>
        <div class="club-meta-row">
          <span class="club-meta-icon" aria-hidden="true">&#128197;</span>
          <span>${escapeHTML(club.meetingTime.split(",")[0])}</span>
        </div>
        <div class="club-meta-row">
          <span class="club-meta-icon" aria-hidden="true">&#128101;</span>
          <span>${club.membersCount}+ Active Members</span>
        </div>
      </div>

      <div class="club-card-footer">
        <a href="club-details.html?id=${encodeURIComponent(club.id)}" class="btn btn-secondary btn-sm" style="flex:1;">
          View Details
        </a>
        <a href="register.html?club=${encodeURIComponent(club.id)}" class="btn btn-primary btn-sm" style="flex:1;">
          Join Club
        </a>
      </div>
    </article>
  `;
}

/**
 * 2. Club Details Page Functionality (club-details.html)
 * Extracts URL query parameter ?id=... and populates full club profile
 */
function initClubDetailsPage() {
  const detailsContainer = document.getElementById("club-details-container");
  if (!detailsContainer) return; // Exit if not on club-details.html

  // 1. Read query parameter from URL using standard URLSearchParams
  const urlParams = new URLSearchParams(window.location.search);
  const clubId = urlParams.get("id");

  // 2. Find club in dataset
  const club = CLUBS_DATA.find(function (c) {
    return c.id === clubId;
  });

  // 3. Handle Invalid or Missing Club ID
  if (!club) {
    detailsContainer.innerHTML = `
      <div class="empty-state" style="margin: 3rem auto; max-width: 650px;">
        <div class="empty-state-icon" style="color: var(--color-danger);">&#9888;</div>
        <h2>Club Not Found</h2>
        <p>The student club identifier "<strong>${escapeHTML(clubId || "none")}</strong>" is invalid or does not exist in our directory.</p>
        <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem;">
          <a href="clubs.html" class="btn btn-primary">Browse All Campus Clubs</a>
          <a href="index.html" class="btn btn-secondary">Go to Homepage</a>
        </div>
      </div>
    `;
    // Update document title
    document.title = "Club Not Found | LPU Campus Clubs";
    return;
  }

  // 4. Update Document Title
  document.title = `${club.name} | LPU Campus Clubs`;

  // 5. Update Breadcrumb current label if present
  const breadcrumbCurrent = document.getElementById("breadcrumb-club-name");
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = club.name;
  }

  // 6. Generate Activities HTML
  const activitiesHTML = club.activities
    .map(function (act) {
      return `
        <li>
          <span class="list-bullet-icon">&#10003;</span>
          <span>${escapeHTML(act)}</span>
        </li>
      `;
    })
    .join("");

  // 7. Generate Benefits HTML
  const benefitsHTML = club.benefits
    .map(function (ben) {
      return `
        <li>
          <span class="list-bullet-icon">&#9733;</span>
          <span>${escapeHTML(ben)}</span>
        </li>
      `;
    })
    .join("");

  // 8. Find any related events organized by this club (if EVENTS_DATA exists)
  let relatedEventsHTML = "";
  if (typeof EVENTS_DATA !== "undefined" && Array.isArray(EVENTS_DATA)) {
    const related = EVENTS_DATA.filter((e) => e.clubId === club.id);
    if (related.length > 0) {
      relatedEventsHTML = `
        <div class="content-block" style="margin-top: 2rem;">
          <h3>&#127881; Upcoming Events by This Club</h3>
          <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">
            ${related
              .map(
                (ev) => `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:0.85rem; background:var(--color-bg); border-radius:var(--radius-sm); border:1px solid var(--color-border); flex-wrap:wrap; gap:0.5rem;">
                  <div>
                    <h5 style="margin-bottom:0.2rem;">${escapeHTML(ev.title)}</h5>
                    <p style="font-size:0.85rem; color:var(--color-muted); margin-bottom:0;">&#128197; ${escapeHTML(ev.date)} &bull; &#128205; ${escapeHTML(ev.venue)}</p>
                  </div>
                  <a href="events.html?search=${encodeURIComponent(ev.title)}" class="btn btn-outline btn-sm">View Event</a>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      `;
    }
  }

  // 9. Render Full Details Template
  detailsContainer.innerHTML = `
    <!-- Club Header Banner -->
    <header class="club-hero-card">
      <div class="club-hero-icon" aria-hidden="true">${club.icon}</div>
      <div class="club-hero-info">
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem; flex-wrap:wrap;">
          <span class="badge ${club.badgeClass}">${escapeHTML(club.category)}</span>
          <span style="font-size:0.85rem; color:var(--color-muted);">&#128101; ${club.membersCount}+ Active Student Members</span>
        </div>
        <h1 class="club-hero-title">${escapeHTML(club.name)}</h1>
        <p class="club-hero-tagline">${escapeHTML(club.tagline)}</p>
      </div>
    </header>

    <!-- Main Two-Column Layout -->
    <div class="details-layout">
      <!-- Left Column: Rich Content -->
      <div class="details-main-content">
        <!-- About Section -->
        <section class="content-block">
          <h3>&#128214; About the Club</h3>
          <p>${escapeHTML(club.description)}</p>
          <p>As a student member, you will gain hands-on practical skills outside the traditional lecture hall, network with forward-thinking peers, and have opportunities to lead campus initiatives.</p>
        </section>

        <!-- Activities Section -->
        <section class="content-block">
          <h3>&#9881; Key Activities &amp; Workshops</h3>
          <ul class="activities-list">
            ${activitiesHTML}
          </ul>
        </section>

        <!-- Benefits Section -->
        <section class="content-block">
          <h3>&#127942; Benefits of Joining</h3>
          <ul class="benefits-list">
            ${benefitsHTML}
          </ul>
        </section>

        <!-- Related Events Block -->
        ${relatedEventsHTML}
      </div>

      <!-- Right Column: Quick Info & Join CTA -->
      <aside class="details-sidebar">
        <div class="info-sidebar-card">
          <h3 style="font-size:1.15rem; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid var(--color-border);">
            &#8505; Club Information
          </h3>

          <table class="info-table">
            <tbody>
              <tr>
                <td>Category</td>
                <td><span class="badge ${club.badgeClass}">${escapeHTML(club.category)}</span></td>
              </tr>
              <tr>
                <td>Members</td>
                <td>${club.membersCount}+ Registered</td>
              </tr>
              <tr>
                <td>Student Lead</td>
                <td>${escapeHTML(club.studentLead)}</td>
              </tr>
              <tr>
                <td>Faculty Lead</td>
                <td>${escapeHTML(club.facultyCoordinator)}</td>
              </tr>
              <tr>
                <td>Meeting Venue</td>
                <td>${escapeHTML(club.venue)}</td>
              </tr>
              <tr>
                <td>Schedule</td>
                <td>${escapeHTML(club.meetingTime)}</td>
              </tr>
              <tr>
                <td>Membership</td>
                <td><strong style="color:var(--color-success);">Free for LPU Students</strong></td>
              </tr>
            </tbody>
          </table>

          <a href="register.html?club=${encodeURIComponent(club.id)}" class="btn btn-primary btn-block" style="padding:0.85rem;">
            Join This Club Now &#8594;
          </a>

          <p style="font-size:0.75rem; color:var(--color-muted); text-align:center; margin-top:0.75rem; margin-bottom:0;">
            Takes less than 2 minutes &bull; Instant browser registration
          </p>
        </div>

        <div class="info-sidebar-card" style="background-color: var(--color-primary-subtle); border-color: var(--color-primary-light);">
          <h4 style="font-size:1rem; color:var(--color-primary-hover); margin-bottom:0.5rem;">Have Questions?</h4>
          <p style="font-size:0.85rem; color:var(--color-text); margin-bottom:0.75rem;">
            Meet club representatives every Wednesday at the Student Activity Centre (SAC) or connect during university club recruitment drives.
          </p>
          <a href="clubs.html" class="btn btn-secondary btn-sm btn-block">Back to Club Directory</a>
        </div>
      </aside>
    </div>
  `;
}

/**
 * 3. Featured Clubs on Homepage (index.html)
 */
function initFeaturedClubs() {
  const featuredContainer = document.getElementById("featured-clubs-container");
  if (!featuredContainer) return;

  const featuredClubs = CLUBS_DATA.filter((c) => c.featured);
  featuredContainer.innerHTML = featuredClubs.map(createClubCardHTML).join("");
}
