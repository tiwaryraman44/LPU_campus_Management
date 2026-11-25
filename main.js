/**
 * ============================================================================
 * LPU CAMPUS CLUBS - MAIN JAVASCRIPT
 * Course: CSE326 Internet Programming
 * Student Demonstration Project
 * Description: Shared navigation, mobile toggle, toast system, and storage helpers
 * ============================================================================
 */

// Execute when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initMobileNavigation();
  highlightActiveNavigation();
  initToastContainer();
});

/**
 * 1. Mobile Navigation Toggle
 * Handles opening and closing of the mobile navigation menu
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleBtn || !navLinks) return;

  // Toggle mobile menu on click
  toggleBtn.addEventListener("click", function () {
    const isExpanded = navLinks.classList.toggle("nav-open");
    toggleBtn.setAttribute("aria-expanded", isExpanded);
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!toggleBtn.contains(event.target) && !navLinks.contains(event.target)) {
      if (navLinks.classList.contains("nav-open")) {
        navLinks.classList.remove("nav-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Close menu when Escape key is pressed
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navLinks.classList.contains("nav-open")) {
      navLinks.classList.remove("nav-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }
  });
}

/**
 * 2. Highlight Active Navigation Item
 * Inspects current URL pathname and adds 'active' class to matching link
 */
function highlightActiveNavigation() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href) return;

    // Direct match or root index match
    if (
      href === pageName ||
      (pageName === "" && href === "index.html") ||
      (pageName === "club-details.html" && href === "clubs.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * 3. Toast Notification System
 * Creates floating user feedback messages for form submits & registrations
 */
let toastContainerElement = null;

function initToastContainer() {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  toastContainerElement = container;
}

/**
 * Displays a toast message
 * @param {string} message - Message to display
 * @param {'success'|'error'|'warning'|'info'} type - Toast type
 * @param {number} duration - Milliseconds before auto-dismiss (default: 4000)
 */
function showToast(message, type = "info", duration = 4000) {
  if (!toastContainerElement) {
    initToastContainer();
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "alert");

  // Icon based on type
  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<span style="color:#16a34a; font-weight:bold;">&#10004;</span>`;
  } else if (type === "error") {
    iconSvg = `<span style="color:#dc2626; font-weight:bold;">&#10006;</span>`;
  } else if (type === "warning") {
    iconSvg = `<span style="color:#d97706; font-weight:bold;">&#9888;</span>`;
  } else {
    iconSvg = `<span style="color:#ea580c; font-weight:bold;">&#8505;</span>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div style="flex:1;">${escapeHTML(message)}</div>
    <button type="button" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:1.1rem;" aria-label="Close notification">&times;</button>
  `;

  // Close button inside toast
  const closeBtn = toast.querySelector("button");
  closeBtn.addEventListener("click", function () {
    toast.remove();
  });

  toastContainerElement.appendChild(toast);

  // Auto remove after duration
  setTimeout(function () {
    if (toast.parentElement) {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(function () {
        toast.remove();
      }, 300);
    }
  }, duration);
}

/**
 * 4. LocalStorage Helpers
 * Convenient functions for saving and loading JSON objects
 */
function saveToLocalStorage(key, data) {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error("Error writing to LocalStorage:", error);
    return false;
  }
}

function getFromLocalStorage(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading from LocalStorage:", error);
    return defaultValue;
  }
}

/**
 * Helper to escape HTML to prevent XSS attacks when displaying user inputs
 */
function escapeHTML(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
