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
  var siteRoot = contactHref.replace(/contact\.html$/, "");

  // Consultation modal — opened by any "Request Consultation" button
  var modal = document.createElement("div");
  modal.className = "consult-modal";
  modal.innerHTML =
    '<div class="consult-backdrop"></div>' +
    '<div class="consult-panel" role="dialog" aria-modal="true" aria-label="Request a consultation">' +
    '<button class="consult-close" aria-label="Close">' +
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    '<span class="kicker">Request Consultation</span>' +
    '<h3 class="serif">Begin your evaluation</h3>' +
    '<p class="sub">Tell us about your symptoms and goals. Our team will reach out to guide you through the next steps. Or call <a href="tel:3863875289" style="color:var(--peach)">386-387-5289</a>.</p>' +
    '<form class="contact-form consult-form">' +
    '<div class="form-row">' +
    '<div class="field"><label for="cm-name">Full Name</label><input id="cm-name" name="name" type="text" required autocomplete="name"></div>' +
    '<div class="field"><label for="cm-phone">Phone</label><input id="cm-phone" name="phone" type="tel" autocomplete="tel"></div>' +
    "</div>" +
    '<div class="form-row">' +
    '<div class="field"><label for="cm-email">Email</label><input id="cm-email" name="email" type="email" required autocomplete="email"></div>' +
    '<div class="field"><label for="cm-interest">I\'m interested in</label><select id="cm-interest" name="interest">' +
    "<option>Spine Care</option><option>Orthopedics / Joint Pain</option><option>Sports Medicine</option><option>Regenerative Medicine</option><option>Hair Restoration</option><option>Hormone Optimization</option><option>Weight Loss &amp; Metabolic Health</option><option>Sexual Wellness</option><option>Longevity &amp; Performance</option><option>Other</option>" +
    "</select></div></div>" +
    '<div class="field"><label for="cm-message">Symptoms &amp; goals</label><textarea id="cm-message" name="message" style="min-height:6.5rem"></textarea></div>' +
    '<button class="btn solid" type="submit" style="justify-content:center"><span>Send Request</span><span class="arrow">→</span></button>' +
    '<p style="font-size:0.7rem;color:var(--ivory-50);line-height:1.7">Sending opens your email app with this request pre-filled to info@docpeaches.com.</p>' +
    "</form></div>";
  document.body.appendChild(modal);

  function openModal() {
    modal.classList.add("open");
    document.body.classList.add("consult-open");
    var first = modal.querySelector("input");
    if (first) setTimeout(function () { first.focus(); }, 380);
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("consult-open");
  }
  modal.querySelector(".consult-close").addEventListener("click", closeModal);
  modal.querySelector(".consult-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") closeModal();
  });

  // Any button-styled link to the contact page opens the modal instantly
  document.querySelectorAll('a.btn[href$="contact.html"]').forEach(function (a) {
    a.addEventListener("click", function (ev) {
      ev.preventDefault();
      openModal();
    });
  });
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
    '<a href="' + contactHref + '" class="fab-consult"><span class="fab-ico">' + icoCal + '</span><span>Request Consultation</span></a>' +
    "</div>" +
    '<button class="fab-btn" aria-label="Contact options" aria-expanded="false">' +
    '<span class="fab-open"><img src="' + siteRoot + 'assets/img/peach-mark.png" alt=""></span>' +
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
  fab.querySelector(".fab-consult").addEventListener("click", function (ev) {
    ev.preventDefault();
    fab.classList.remove("open");
    fabBtn.setAttribute("aria-expanded", "false");
    openModal();
  });

  // ---------- Site search ----------
  var searchModal = document.createElement("div");
  searchModal.className = "search-modal";
  searchModal.innerHTML =
    '<div class="consult-backdrop"></div>' +
    '<div class="search-panel">' +
    '<div class="search-bar">' +
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>' +
    '<input type="search" placeholder="Search conditions, treatments…" aria-label="Search the site" autocomplete="off">' +
    '<button class="consult-close" aria-label="Close search" style="position:static;flex-shrink:0">' +
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    "</div>" +
    '<div class="search-results"><p class="search-hint">Try “knee pain”, “PRP”, “sciatica”, “hair loss”…</p></div>' +
    "</div>";
  document.body.appendChild(searchModal);
  var searchInput = searchModal.querySelector("input");
  var searchResults = searchModal.querySelector(".search-results");
  var indexLoaded = false;

  function openSearch() {
    searchModal.classList.add("open");
    document.body.classList.add("consult-open");
    if (!indexLoaded && !window.SEARCH_INDEX) {
      var s = document.createElement("script");
      s.src = siteRoot + "js/search-index.js";
      s.onload = function () { indexLoaded = true; runSearch(); };
      document.head.appendChild(s);
    }
    setTimeout(function () { searchInput.focus(); }, 120);
  }
  function closeSearch() {
    searchModal.classList.remove("open");
    document.body.classList.remove("consult-open");
  }
  searchModal.querySelector(".consult-backdrop").addEventListener("click", closeSearch);
  searchModal.querySelector(".consult-close").addEventListener("click", closeSearch);
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") closeSearch();
    if ((ev.key === "/" || (ev.key.toLowerCase() === "k" && (ev.ctrlKey || ev.metaKey))) &&
        !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      ev.preventDefault();
      openSearch();
    }
  });

  function runSearch() {
    var q = searchInput.value.trim().toLowerCase();
    if (!window.SEARCH_INDEX) return;
    if (q.length < 2) {
      searchResults.innerHTML = '<p class="search-hint">Try “knee pain”, “PRP”, “sciatica”, “hair loss”…</p>';
      return;
    }
    var terms = q.split(/\s+/);
    var scored = [];
    window.SEARCH_INDEX.forEach(function (e) {
      var t = e.t.toLowerCase(), c = e.c.toLowerCase(), d = (e.d || "").toLowerCase();
      var score = 0;
      var allMatch = terms.every(function (term) {
        if (t.indexOf(term) === 0) { score += 30; return true; }
        if (t.indexOf(term) !== -1) { score += 20; return true; }
        if (c.indexOf(term) !== -1) { score += 8; return true; }
        if (d.indexOf(term) !== -1) { score += 4; return true; }
        return false;
      });
      if (allMatch) scored.push([score, e]);
    });
    scored.sort(function (a, b) { return b[0] - a[0]; });
    if (!scored.length) {
      searchResults.innerHTML = '<p class="search-hint">No matches — try a different term, or <a href="' + siteRoot + 'conditions/index.html" style="color:var(--peach)">browse all conditions</a>.</p>';
      return;
    }
    searchResults.innerHTML = scored.slice(0, 12).map(function (pair) {
      var e = pair[1];
      return '<a class="search-item" href="' + siteRoot + e.u + '">' +
        '<span class="search-title">' + e.t + "</span>" +
        '<span class="search-cat">' + e.c + "</span></a>";
    }).join("");
  }
  searchInput.addEventListener("input", runSearch);

  // Search triggers: header icon + mobile nav entry
  var headerInner = document.querySelector(".header-inner");
  if (headerInner) {
    var sBtn = document.createElement("button");
    sBtn.className = "search-btn";
    sBtn.setAttribute("aria-label", "Search");
    sBtn.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>';
    sBtn.addEventListener("click", openSearch);
    headerInner.insertBefore(sBtn, headerInner.querySelector(".header-cta"));
  }
  var mobileNav = document.querySelector(".mobile-nav");
  if (mobileNav) {
    var mSearch = document.createElement("a");
    mSearch.href = "#";
    mSearch.textContent = "Search";
    mSearch.addEventListener("click", function (ev) {
      ev.preventDefault();
      document.body.classList.remove("mobile-nav-open");
      openSearch();
    });
    mobileNav.insertBefore(mSearch, mobileNav.firstChild);
  }

  // Contact forms (no backend — mailto handoff)
  document.querySelectorAll("form.contact-form").forEach(function (form) {
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
  });
})();
