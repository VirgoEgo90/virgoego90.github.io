/* QR menu: search, dietary filters, and the active category pill. */
(function () {
  "use strict";
  var search = document.getElementById("menu-search");
  var boxes = document.querySelectorAll("[data-filter]");
  var dishes = document.querySelectorAll("[data-dish]");
  var sections = document.querySelectorAll("[data-menu-section]");
  var empty = document.querySelector("[data-menu-empty]");

  function apply() {
    var q = (search.value || "").trim().toLowerCase();
    var need = Array.prototype.filter.call(boxes, function (b) { return b.checked; }).map(function (b) { return b.value; });
    var shown = 0;
    dishes.forEach(function (d) {
      var tags = (d.getAttribute("data-tags") || "").split(" ");
      if (tags.indexOf("VG") !== -1) tags.push("V"); // vegan dishes are vegetarian too
      var okTags = need.every(function (t) { return tags.indexOf(t) !== -1; });
      var okText = !q || d.textContent.toLowerCase().indexOf(q) !== -1;
      d.hidden = !(okTags && okText);
      if (!d.hidden) shown++;
    });
    sections.forEach(function (s) { s.hidden = !s.querySelector("[data-dish]:not([hidden])"); });
    empty.hidden = shown !== 0;
  }
  search.addEventListener("input", apply);
  boxes.forEach(function (b) { b.addEventListener("change", apply); });

  var pills = document.querySelectorAll(".menu-cats a");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        pills.forEach(function (p) {
          var on = p.getAttribute("href") === "#" + en.target.id;
          if (on) { p.setAttribute("aria-current", "true"); p.scrollIntoView({ block: "nearest", inline: "nearest" }); }
          else p.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
