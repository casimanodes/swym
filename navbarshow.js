/*var prevScrollpos = window.pageYOffset;
var navbar = document.querySelector(".navbar");
var showNavbar = false;

// Show the navbar initially
/*navbar.classList.add("show");, ul, li*//*
navbar.classList.add("show");
document.querySelectorAll("ul, li, a").forEach(function(element) {
  element.classList.add("show");
});

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  // Check if the user has scrolled down and is below 150vh
  if (currentScrollPos > prevScrollpos && currentScrollPos > (70 * window.innerHeight) / 100) {
    showNavbar = false;
  } else {
    showNavbar = true;
  }

  // Toggle the visibility of the navbar based on the showNavbar variable
  if (showNavbar) {
    navbar.classList.add("show");/*, ul, li*/
  /*} else {*/
    /*navbar.classList.remove("show");, ul, li*//*
  
  navbar.classList.remove("show");
  document.querySelectorAll("ul, li, a").forEach(function(element) {
    element.classList.remove("show");
  });
}
  prevScrollpos = currentScrollPos;
};
*/

var prevScrollpos = window.pageYOffset;
var navbar = document.querySelector(".navbar");
var showNavbar = false;

// Show the navbar initially
navbar.classList.add("show");
document.querySelectorAll(".navbar.show ul li a").forEach(function(element) {
  element.classList.add("show");
});

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  // Check if the user has scrolled down and is below 150vh
  if (currentScrollPos > prevScrollpos && currentScrollPos > (87 * window.innerHeight) / 100) {
    showNavbar = false;
  } else {
    showNavbar = true;
  }

  // Toggle the visibility of the navbar based on the showNavbar variable
  if (showNavbar) {
    navbar.classList.add("show");
    document.querySelectorAll(".navbar ul li a").forEach(function(element) {
      element.classList.add("show");
    });
  } else {
    navbar.classList.remove("show");
    document.querySelectorAll(".navbar.show ul li a").forEach(function(element) {
      element.classList.remove("show");
    });
  }

  prevScrollpos = currentScrollPos;
};
