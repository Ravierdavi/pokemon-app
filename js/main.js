// Function to hide content sections
const hideContentBtn = document.querySelector(".hide-content-btn");
const hideContentSpan = hideContentBtn.querySelector("span");

function hideContent() {
  const section = document.querySelector(".main-container .section-active");

  section.classList.toggle("hidden");

  hideContentSpan.textContent = section.classList.contains("hidden")
    ? "Show content"
    : "Hide content";

  // Accessibility improvement: update aria-pressed
  hideContentBtn.setAttribute(
    "aria-pressed",
    section.classList.contains("hidden") ? "true" : "false"
  );
}

hideContentBtn.addEventListener("click", hideContent);

// Function to switch between content sections
function switchSection(newSectionClass) {
  const currentSection = document.querySelector(
    ".main-container .section-active"
  );
  const newSection = document.querySelector(`.${newSectionClass}`);

  if (currentSection !== newSection) {
    currentSection.classList.remove("section-active");
    currentSection.classList.add("hidden");
    newSection.classList.remove("hidden");
    newSection.classList.add("section-active");

    // Reset hide/show button text
    const hideContentSpan = document.querySelector(".hide-content-btn span");
    hideContentSpan.textContent = "Hide content";

    // If switching to search-section, reset search form and info
    if (newSectionClass === "search-section") {
      const infoDiv = document.querySelector("#info_div_search");
      const formSearch = document.querySelector(".form-search");
      infoDiv.style.display = "none";
      formSearch.style.display = "block";
      const messageDiv = document.querySelector("#message_div_search");
      messageDiv.textContent = "Please enter a Pokémon name.";
      messageDiv.style = "color: blue;";
    }
  }
}
