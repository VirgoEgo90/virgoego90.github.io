/* Keystone: photo lightbox (native <dialog>) and mortgage calculator. */
(function () {
  "use strict";
  // ---------- Lightbox ----------
  var photos = window.KEYSTONE_PHOTOS || [];
  var dlg = document.getElementById("lightbox");
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  var idx = 0, opener = null;
  function show(i) {
    idx = (i + photos.length) % photos.length;
    img.src = photos[idx].src; img.alt = photos[idx].alt;
    cap.textContent = photos[idx].alt + " · " + (idx + 1) + " of " + photos.length;
  }
  if (dlg && photos.length && typeof dlg.showModal === "function") {
    document.querySelectorAll("[data-lightbox]").forEach(function (b) {
      b.addEventListener("click", function () { opener = b; show(+b.getAttribute("data-lightbox")); dlg.showModal(); });
    });
    dlg.addEventListener("click", function (e) {
      var a = e.target.getAttribute && e.target.getAttribute("data-lb");
      if (a === "prev") show(idx - 1);
      else if (a === "next") show(idx + 1);
      else if (a === "close" || e.target === dlg) dlg.close();
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    dlg.addEventListener("close", function () { if (opener) opener.focus(); });
  }

  // ---------- Mortgage calculator ----------
  var f = document.getElementById("mortgage");
  if (!f) return;
  var $ = function (id) { return document.getElementById(id); };
  var money = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };
  function num(id) { var v = parseFloat($(id).value); return isFinite(v) && v >= 0 ? v : 0; }
  function calc() {
    var price = num("m-price"), down = Math.min(num("m-down"), 100), rate = num("m-rate") / 100 / 12,
        n = parseInt($("m-term").value, 10) * 12, loan = price * (1 - down / 100);
    var pi = rate ? loan * rate / (1 - Math.pow(1 + rate, -n)) : loan / n;
    var tax = num("m-tax") / 12, ins = num("m-ins") / 12, total = pi + tax + ins;
    $("m-total").textContent = money(total);
    $("m-pi").textContent = money(pi); $("m-taxm").textContent = money(tax);
    $("m-insm").textContent = money(ins); $("m-loan").textContent = money(loan);
    var est = document.querySelector("[data-est]"); if (est) est.textContent = money(total);
  }
  f.addEventListener("input", calc);
  f.addEventListener("submit", function (e) { e.preventDefault(); });
  calc();
})();
