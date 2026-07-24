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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
