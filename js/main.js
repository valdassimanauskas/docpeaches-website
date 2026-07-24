/* Dr. Peaches — shared interactions */

(function () {
  // Sticky header state
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("mobile-nav-open");
    });
    document.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("mobile-nav-open");
      });
    });
  }

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Accordions (condition specimen rows)
  document.querySelectorAll(".acc-row").forEach(function (row) {
    var btn = row.querySelector(".acc-head");
    var panel = row.querySelector(".acc-panel");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var open = row.classList.contains("open");
      document.querySelectorAll(".acc-row.open").forEach(function (r) {
        r.classList.remove("open");
        r.querySelector(".acc-panel").style.maxHeight = null;
      });
      if (!open) {
        row.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Floating contact widget (built here so it appears on every page)
  var headerCta = document.querySelector(".header-cta");
  var contactHref = headerCta ? headerCta.getAttribute("href") : "contact.html";
  var fab = document.createElement("div");
  fab.className = "fab";
  var icoPhone =
    '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>';
  var icoMail =
    '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>';
  var icoCal =
    '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  fab.innerHTML =
    '<div class="fab-menu">' +
    '<a href="tel:3863875289"><span class="fab-ico">' + icoPhone + '</span><span>Call 386-387-5289</span></a>' +
    '<a href="mailto:info@docpeaches.com"><span class="fab-ico">' + icoMail + '</span><span>Email Us</span></a>' +
    '<a href="' + contactHref + '"><span class="fab-ico">' + icoCal + '</span><span>Request Consultation</span></a>' +
    "</div>" +
    '<button class="fab-btn" aria-label="Contact options" aria-expanded="false">' +
    '<span class="fab-open">' + icoPhone.replace('width="17" height="17"', 'width="22" height="22"') + "</span>" +
    '<span class="fab-close"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></span></button>';
  document.body.appendChild(fab);
  var fabBtn = fab.querySelector(".fab-btn");
  fabBtn.addEventListener("click", function () {
    var open = fab.classList.toggle("open");
    fabBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (ev) {
    if (fab.classList.contains("open") && !fab.contains(ev.target)) {
      fab.classList.remove("open");
      fabBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Contact form (no backend — mailto handoff)
  var form = document.querySelector("form.contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var body =
        "Name: " + d.get("name") + "\n" +
        "Phone: " + d.get("phone") + "\n" +
        "Email: " + d.get("email") + "\n" +
        "Interest: " + d.get("interest") + "\n\n" +
        d.get("message");
      window.location.href =
        "mailto:info@docpeaches.com?subject=" +
        encodeURIComponent("Consultation Request — " + d.get("name")) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
