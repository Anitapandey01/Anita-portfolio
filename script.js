// Hamburger menu toggle
function openMenu() {
  document.getElementById("sideMenu").style.right = "0";
}

function closeMenu() {
  document.getElementById("sideMenu").style.right = "-250px";
}

// Tabs for Skills, Education
function openTab(tabName) {
  var tabContents = document.querySelectorAll(".tab-contents");
  var tabLinks = document.querySelectorAll(".tab-links");

  // Hide all tabs
  tabContents.forEach((content) => {
    content.classList.remove("active-tab");
  });

  // Remove active link class
  tabLinks.forEach((link) => {
    link.classList.remove("active-link");
  });

  // Show the clicked tab and make it active
  document.getElementById(tabName).classList.add("active-tab");
  event.target.classList.add("active-link");
}

// Text Animation for "Anita Pandey"
const ml11 = document.querySelector('.ml11');
ml11.addEventListener('animationend', () => {
  const textWrapper = ml11.querySelector('.text-wrapper');
  textWrapper.classList.add('active');
});
