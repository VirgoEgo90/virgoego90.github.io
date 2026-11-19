/* Sample quote calculator. Edit the RATES object before you publish.
   This is not a binding price — it only shows a figure from the placeholder rates. */
(function () {
  "use strict";
  var RATES = {
    base: 80,
    bedroom: 25,
    bathroom: 30,
    extras: { oven: 40, fridge: 35, windows: 45 },
    frequency: { once: 1, weekly: 0.85, biweekly: 0.9, monthly: 0.95 }
  };
  var form = document.querySelector("[data-quote]");
  if (!form) return;
  var out = document.getElementById("quote-amount");
  var list = document.getElementById("quote-break");
  var hidden = document.querySelector("#book [name=estimated_total], [data-quote] [name=estimated_total]");

  function num(id) {
    var n = parseInt(document.getElementById(id).value, 10);
    return isNaN(n) || n < 0 ? 0 : n;
  }
  function money(n) { return "$" + n.toFixed(0); }

  function recalc() {
    var beds = num("q-beds");
    var baths = num("q-baths");
    var freq = document.getElementById("q-freq").value || "once";
    var items = [["Starting rate", RATES.base]];
    if (beds) items.push([beds + " bedroom" + (beds === 1 ? "" : "s"), beds * RATES.bedroom]);
    if (baths) items.push([baths + " bathroom" + (baths === 1 ? "" : "s"), baths * RATES.bathroom]);
    Object.keys(RATES.extras).forEach(function (key) {
      var el = document.getElementById("q-" + key);
      if (el && el.checked) items.push([el.getAttribute("data-label") || key, RATES.extras[key]]);
    });
    var sub = items.reduce(function (s, it) { return s + it[1]; }, 0);
    var mul = RATES.frequency[freq] || 1;
    if (mul !== 1) items.push(["Frequency adjustment", Math.round(sub * mul) - sub]);
    var total = Math.round(sub * mul);
    if (out) out.textContent = money(total);
    if (hidden) hidden.value = money(total);
    if (list) {
      list.innerHTML = items.map(function (it) {
        return "<li><span>" + it[0] + "</span><span>" + money(it[1]) + "</span></li>";
      }).join("");
    }
  }
  form.addEventListener("input", recalc);
  form.addEventListener("change", recalc);
  recalc();
})();
