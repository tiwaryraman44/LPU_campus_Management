/**
 * ============================================================================
 * LPU CAMPUS CLUBS - REGISTRATION MODULE (register.js)
 * Course: CSE326 Internet Programming
 * Description: Client-side form validation, LocalStorage persistence & review
 * ============================================================================
 */

// LocalStorage key for student club memberships
const MEMBERSHIP_STORAGE_KEY = "lpu_club_memberships";

document.addEventListener("DOMContentLoaded", function () {
  initRegistrationPage();
});

/**
 * Initializes the registration page logic
 */
function initRegistrationPage() {
  const form = document.getElementById("club-registration-form");
  if (!form) return;

  const clubSelect = document.getElementById("reg-preferred-club");
  const successCard = document.getElementById("registration-success-card");
  const successDetails = document.getElementById("success-summary-details");
  const dismissSuccessBtn = document.getElementById("btn-dismiss-success");

  // 1. Populate Preferred Club select dropdown dynamically if empty
  populateClubDropdown(clubSelect);

  // 2. Check for URL parameter ?club=... to pre-select club
  preselectClubFromURL(clubSelect);

  // 3. Render existing memberships stored in LocalStorage for viva demonstration
  renderSavedMembershipsList();

  // 4. Form Submit Handler with comprehensive client-side validation
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop normal HTTP form submission

    // Perform validation checks
    const isValid = validateRegistrationForm();

    if (!isValid) {
      showToast("Please correct the highlighted errors in the form.", "error");
      return;
    }

    // Gather validated form values
    const fullName = document.getElementById("reg-full-name").value.trim();
    const studentId = document.getElementById("reg-student-id").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const course = document.getElementById("reg-course").value;
    const yearOfStudy = document.getElementById("reg-year").value;
    const preferredClubId = document.getElementById("reg-preferred-club").value;
    const preferredClubName =
      document.getElementById("reg-preferred-club").selectedOptions[0].text;
    const reason = document.getElementById("reg-reason").value.trim();

    // Generate unique Membership ID
    const membershipId = "LPU-" + Math.floor(100000 + Math.random() * 900000);

    // Create record object
    const newMembership = {
      membershipId: membershipId,
      fullName: fullName,
      studentId: studentId,
      email: email,
      phone: phone,
      course: course,
      yearOfStudy: yearOfStudy,
      clubId: preferredClubId,
      clubName: preferredClubName,
      reason: reason,
      registeredAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    // Save to LocalStorage
    const existingList = getFromLocalStorage(MEMBERSHIP_STORAGE_KEY, []);
    existingList.push(newMembership);
    saveToLocalStorage(MEMBERSHIP_STORAGE_KEY, existingList);

    // Show Success UI
    if (successCard && successDetails) {
      successDetails.innerHTML = `
        <div style="text-align: left; background: #ffffff; padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin: 1rem 0;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; border-bottom:1px solid var(--color-border); padding-bottom:0.5rem;">
            <strong>Membership ID:</strong>
            <span style="font-family:var(--font-mono); color:var(--color-primary); font-weight:700;">${membershipId}</span>
          </div>
          <p style="margin-bottom:0.35rem;"><strong>Student:</strong> ${escapeHTML(fullName)} (${escapeHTML(studentId)})</p>
          <p style="margin-bottom:0.35rem;"><strong>Programme:</strong> ${escapeHTML(course)} - Year ${escapeHTML(yearOfStudy)}</p>
          <p style="margin-bottom:0.35rem;"><strong>Club Joined:</strong> ${escapeHTML(preferredClubName)}</p>
          <p style="margin-bottom:0.35rem;"><strong>Contact:</strong> ${escapeHTML(email)} &bull; ${escapeHTML(phone)}</p>
          <p style="margin-bottom:0; font-size:0.85rem; color:var(--color-muted);"><strong>Registered At:</strong> ${newMembership.registeredAt}</p>
        </div>
      `;

      successCard.style.display = "block";
      successCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Reset Form
    form.reset();
    clearAllValidationErrors();

    // Show Toast
    showToast(
      `Welcome to ${preferredClubName}! Your registration was recorded.`,
      "success"
    );

    // Re-render the saved list table
    renderSavedMembershipsList();
  });

  // Dismiss button for success card
  if (dismissSuccessBtn && successCard) {
    dismissSuccessBtn.addEventListener("click", function () {
      successCard.style.display = "none";
    });
  }
}

/**
 * Populates dropdown options from CLUBS_DATA if available
 */
function populateClubDropdown(selectElem) {
  if (!selectElem) return;

  // Check if CLUBS_DATA is available from clubs.js
  if (typeof CLUBS_DATA !== "undefined" && Array.isArray(CLUBS_DATA)) {
    // Keep the first default option
    selectElem.innerHTML = `<option value="">-- Choose a Student Club --</option>`;
    CLUBS_DATA.forEach(function (club) {
      const option = document.createElement("option");
      option.value = club.id;
      option.textContent = `${club.name} (${club.category})`;
      selectElem.appendChild(option);
    });
  }
}

/**
 * Checks URL query string (e.g. ?club=coding-tech) to pre-select preferred club
 */
function preselectClubFromURL(selectElem) {
  if (!selectElem) return;

  const urlParams = new URLSearchParams(window.location.search);
  const clubId = urlParams.get("club");

  if (clubId) {
    selectElem.value = clubId;
    // Highlight notice
    const note = document.getElementById("preselected-club-note");
    if (note) {
      note.style.display = "block";
    }
  }
}

/**
 * Validates all form fields using understandable rules and updates UI
 * @returns {boolean} True if all valid, false otherwise
 */
function validateRegistrationForm() {
  let isValid = true;

  // 1. Full Name: at least 3 letters, alphabets & spaces only
  const nameInput = document.getElementById("reg-full-name");
  const nameValue = nameInput.value.trim();
  const nameRegex = /^[A-Za-z\s.]{3,50}$/;
  if (!nameRegex.test(nameValue)) {
    showFieldError(nameInput, "Please enter a valid full name (minimum 3 letters).");
    isValid = false;
  } else {
    clearFieldError(nameInput);
  }

  // 2. Student Registration ID: 8 digits or standard LPU registration pattern
  const idInput = document.getElementById("reg-student-id");
  const idValue = idInput.value.trim();
  const idRegex = /^[0-9]{8}$|^[A-Za-z0-9]{6,10}$/;
  if (!idRegex.test(idValue)) {
    showFieldError(
      idInput,
      "Please enter a valid 8-digit LPU Student ID (e.g., 12401234)."
    );
    isValid = false;
  } else {
    clearFieldError(idInput);
  }

  // 3. Email: standard email format
  const emailInput = document.getElementById("reg-email");
  const emailValue = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    showFieldError(
      emailInput,
      "Please enter a valid email address (e.g., student@lpu.in)."
    );
    isValid = false;
  } else {
    clearFieldError(emailInput);
  }

  // 4. Phone: 10 digits Indian mobile number starting with 6, 7, 8, or 9
  const phoneInput = document.getElementById("reg-phone");
  const phoneValue = phoneInput.value.trim();
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phoneValue)) {
    showFieldError(
      phoneInput,
      "Please enter a valid 10-digit mobile number (e.g., 9876543210)."
    );
    isValid = false;
  } else {
    clearFieldError(phoneInput);
  }

  // 5. Course / Programme Selection
  const courseInput = document.getElementById("reg-course");
  if (!courseInput.value) {
    showFieldError(courseInput, "Please select your academic programme / course.");
    isValid = false;
  } else {
    clearFieldError(courseInput);
  }

  // 6. Year of Study
  const yearInput = document.getElementById("reg-year");
  if (!yearInput.value) {
    showFieldError(yearInput, "Please select your current year of study.");
    isValid = false;
  } else {
    clearFieldError(yearInput);
  }

  // 7. Preferred Club
  const clubInput = document.getElementById("reg-preferred-club");
  if (!clubInput.value) {
    showFieldError(clubInput, "Please select a club to join.");
    isValid = false;
  } else {
    clearFieldError(clubInput);
  }

  // 8. Reason for joining: at least 15 characters
  const reasonInput = document.getElementById("reg-reason");
  const reasonValue = reasonInput.value.trim();
  if (reasonValue.length < 15) {
    showFieldError(
      reasonInput,
      "Please write at least 15 characters explaining your interest in joining."
    );
    isValid = false;
  } else {
    clearFieldError(reasonInput);
  }

  return isValid;
}

/**
 * Displays validation error message under an input
 */
function showFieldError(inputElement, errorMessage) {
  inputElement.classList.add("is-invalid");
  inputElement.setAttribute("aria-invalid", "true");

  let errorElem = inputElement.parentElement.querySelector(".form-error");
  if (!errorElem) {
    errorElem = document.createElement("div");
    errorElem.className = "form-error";
    inputElement.parentElement.appendChild(errorElem);
  }
  errorElem.textContent = errorMessage;
}

/**
 * Clears validation error on a field
 */
function clearFieldError(inputElement) {
  inputElement.classList.remove("is-invalid");
  inputElement.removeAttribute("aria-invalid");
  const errorElem = inputElement.parentElement.querySelector(".form-error");
  if (errorElem) {
    errorElem.textContent = "";
  }
}

/**
 * Clears all validation errors across the form
 */
function clearAllValidationErrors() {
  const inputs = document.querySelectorAll(".form-control");
  inputs.forEach(clearFieldError);
}

/**
 * Renders the list of saved memberships from LocalStorage
 * Great for demonstrating persistence to course evaluators!
 */
function renderSavedMembershipsList() {
  const container = document.getElementById("saved-memberships-list");
  if (!container) return;

  const memberships = getFromLocalStorage(MEMBERSHIP_STORAGE_KEY, []);

  if (memberships.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--color-muted); font-size: 0.9rem; background: #ffffff; border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
        No student club registrations found in browser storage yet. Submit the form above to add a test entry!
      </div>
    `;
    return;
  }

  container.innerHTML = memberships
    .map(function (mem, index) {
      return `
        <div class="saved-registration-card">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem; flex-wrap:wrap;">
              <span class="badge badge-tech" style="font-family:var(--font-mono);">${escapeHTML(mem.membershipId)}</span>
              <strong style="font-size:1.05rem; color:var(--color-dark);">${escapeHTML(mem.fullName)}</strong>
              <span style="font-size:0.85rem; color:var(--color-muted);">(${escapeHTML(mem.studentId)})</span>
            </div>
            <p style="margin-bottom:0.25rem; font-size:0.9rem; color:var(--color-text);">
              <strong>Club:</strong> <span style="color:var(--color-primary); font-weight:600;">${escapeHTML(mem.clubName)}</span> &bull; 
              <strong>Course:</strong> ${escapeHTML(mem.course)} (Year ${escapeHTML(mem.yearOfStudy)})
            </p>
            <p style="margin-bottom:0.25rem; font-size:0.85rem; color:var(--color-muted);">
              <strong>Statement:</strong> &ldquo;${escapeHTML(mem.reason)}&rdquo;
            </p>
            <p style="margin-bottom:0; font-size:0.75rem; color:var(--color-muted);">
              &#128197; Registered on ${escapeHTML(mem.registeredAt)} &bull; Email: ${escapeHTML(mem.email)} &bull; Phone: ${escapeHTML(mem.phone)}
            </p>
          </div>
          <button type="button" class="btn btn-outline btn-sm btn-delete-membership" data-index="${index}" style="color:var(--color-danger); border-color:var(--color-danger); align-self:flex-start; margin-left:1rem;" title="Delete demonstration record">
            Delete
          </button>
        </div>
      `;
    })
    .join("");

  // Attach delete buttons
  const deleteBtns = container.querySelectorAll(".btn-delete-membership");
  deleteBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      deleteMembershipRecord(idx);
    });
  });
}

/**
 * Deletes a single demonstration record from LocalStorage
 * @param {number} index
 */
function deleteMembershipRecord(index) {
  let list = getFromLocalStorage(MEMBERSHIP_STORAGE_KEY, []);
  if (index >= 0 && index < list.length) {
    const removed = list.splice(index, 1);
    saveToLocalStorage(MEMBERSHIP_STORAGE_KEY, list);
    showToast(`Removed registration for ${removed[0].fullName}.`, "info");
    renderSavedMembershipsList();
  }
}
