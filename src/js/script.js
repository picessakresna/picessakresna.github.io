function updateSliderSize() {
  const button = document.getElementById("tabs-main");
  document.documentElement.style.setProperty(
    "--selected-item-width",
    `${button.offsetWidth}px`
  );
}

function updateSliderPosition() {
  const tab = document.querySelector("li > button:focus");
  if (tab) {
    const tabContainer = tab.parentNode.closest("nav");

    tabContainer.querySelector("div[data-slider]").style.cssText =
      "--selected-item-width: " +
      tab.clientWidth +
      "px; --selected-item-position: " +
      tab.offsetLeft +
      "px";
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  updateSliderSize();
});

window.addEventListener("resize", (event) => {
  updateSliderSize();
  updateSliderPosition();
});

document.querySelector(".burger").addEventListener("click", () => {
  const activeLi = document.querySelector(
    'li > button[style*="bold"]'
  ).parentNode;
  if (activeLi) {
    const button = activeLi.querySelector("button");
    if (button) {
      updateSliderSize(button);
      updateSliderPosition(button);
    }
  }
});

document.querySelectorAll("li > button").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (!event.target.classList.contains("burger")) {
      updateSliderPosition();
      document.querySelectorAll("li > button").forEach((btn) => {
        btn.style.fontWeight = "normal";
      });
      item.style.fontWeight = "bold";
    }
  });
});

document.querySelectorAll("li > button:not(.burger)").forEach((button) => {
  button.addEventListener("click", (event) => {
    // Hide all sections except for 'container-footer'
    document
      .querySelectorAll("section:not(#container-footer)")
      .forEach((section) => {
        section.style.display = "none";
      });

    // Show the section associated with the clicked tab
    const sectionId = "container-" + event.target.id.split("-")[1];
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.display = "block";
    }
  });
});

// On page load, show only 'container-footer' and 'container-main'
window.addEventListener("DOMContentLoaded", (event) => {
  document
    .querySelectorAll("section:not(#container-footer):not(#container-main)")
    .forEach((section) => {
      section.style.display = "none";
    });
});
