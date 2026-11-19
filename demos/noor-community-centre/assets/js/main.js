/* Shared template behavior. Plain JavaScript, no dependencies.
   - Mobile navigation toggle
   - Footer year
   - Reveal-on-scroll (skipped when the visitor prefers reduced motion)
   - Accessible tabs ([data-tabs])
   - Demo-safe forms: forms whose action still contains YOUR_FORM_ID show a
     success message instead of submitting. Replace the action with your
     Formspree endpoint (or add data-netlify="true") to receive real entries.
*/
(function () {
  "use strict";
  var doc = document;

  // Mobile nav
  var toggle = doc.querySelector("[data-nav-toggle]");
  var nav = doc.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  // Header shadow on scroll
  var header = doc.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Footer year
  doc.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Reveal on scroll
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = doc.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Tabs: <div data-tabs> <div role="tablist"> <button role="tab" aria-controls="id"> ... <div role="tabpanel" id="id">
  doc.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    var tabs = Array.prototype.slice.call(wrap.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var p = doc.getElementById(t.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    if (tabs.length) select(tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0]);
  });

  // Demo-safe forms
  doc.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      if (!form.checkValidity()) return; // let the browser show messages
      if (action.indexOf("YOUR_FORM_ID") !== -1 || action === "") {
        e.preventDefault();
        var msg = form.querySelector("[data-form-success]");
        if (msg) { msg.hidden = false; msg.focus(); }
        form.reset();
      }
    });
  });
})();
