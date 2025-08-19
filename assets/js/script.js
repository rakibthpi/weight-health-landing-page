document.querySelectorAll(".image-container").forEach((container) => {
  const sliderHandle = container.querySelector(".slider-handle");
  const sliderButton = container.querySelector(".slider-button");
  const afterImage = container.querySelector(".after-image");

  let isDragging = false;

  function updateSlider(percentage) {
    percentage = Math.max(0, Math.min(100, percentage));
    sliderHandle.style.left = percentage + "%";
    afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
  }

  function getPercentageFromEvent(e) {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    return (x / rect.width) * 100;
  }

  // Mouse events
  sliderButton.addEventListener("mousedown", (e) => {
    isDragging = true;
    document.body.style.cursor = "ew-resize";
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(getPercentageFromEvent(e));
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.cursor = "default";
  });

  // Touch events
  sliderButton.addEventListener("touchstart", (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSlider(getPercentageFromEvent(e));
    e.preventDefault();
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Click move
  container.addEventListener("click", (e) => {
    if (e.target === sliderButton || e.target === sliderHandle) return;
    updateSlider(getPercentageFromEvent(e));
  });

  // Init
  updateSlider(50);

  // Prevent image dragging
  container.querySelectorAll("img").forEach((img) => img.addEventListener("dragstart", (e) => e.preventDefault()));
});

function toggleAccordion(element) {
  const accordionItem = element.parentElement;
  const content = accordionItem.querySelector(".accordion-content");
  const answer = content.querySelector(".accordion-answer");
  const isActive = accordionItem.classList.contains("active");

  // Close all accordion items
  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.classList.remove("active");
    const itemContent = item.querySelector(".accordion-content");
    itemContent.classList.remove("active");
    itemContent.style.maxHeight = "0px";
  });

  // If the clicked item wasn't active, open it
  if (!isActive) {
    accordionItem.classList.add("active");
    content.classList.add("active");

    // Set max-height to the scroll height for smooth animation
    setTimeout(() => {
      content.style.maxHeight = answer.scrollHeight + "px";
    }, 10);
  }
}

// Initialize all accordion items as closed
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".accordion-content").forEach((content) => {
    content.style.maxHeight = "0px";
  });
});
