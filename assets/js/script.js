const imageContainer = document.getElementById("imageContainer");
const sliderHandle = document.getElementById("sliderHandle");
const sliderButton = document.getElementById("sliderButton");
const afterImage = document.getElementById("afterImage");

let isDragging = false;
let startX = 0;
let currentX = 50; // Start at 50% (middle)

function updateSlider(percentage) {
  // Clamp percentage between 0 and 100
  percentage = Math.max(0, Math.min(100, percentage));
  currentX = percentage;

  // Update slider handle position
  sliderHandle.style.left = percentage + "%";

  // Update after image clip path
  afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
}

function getPercentageFromEvent(e) {
  const rect = imageContainer.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  return (x / rect.width) * 100;
}

// Mouse events
sliderButton.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  document.body.style.cursor = "ew-resize";
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const percentage = getPercentageFromEvent(e);
  updateSlider(percentage);
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  document.body.style.cursor = "default";
});

// Touch events for mobile
sliderButton.addEventListener("touchstart", (e) => {
  isDragging = true;
  e.preventDefault();
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const percentage = getPercentageFromEvent(e);
  updateSlider(percentage);
  e.preventDefault();
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

// Click to move slider
imageContainer.addEventListener("click", (e) => {
  if (e.target === sliderButton || e.target === sliderHandle) return;

  const percentage = getPercentageFromEvent(e);
  updateSlider(percentage);
});

// Initialize slider position
updateSlider(50);

// Prevent image dragging
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("dragstart", (e) => e.preventDefault());
});
