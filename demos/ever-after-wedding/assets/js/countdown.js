/* Wedding countdown. Set the date on the element: data-countdown="2027-06-12T16:00:00" (local time). */
(function () {
  "use strict";
  var el = document.querySelector("[data-countdown]");
  if (!el) return;
  var target = new Date(el.getAttribute("data-countdown")).getTime();
  var out = { days: el.querySelector('[data-unit="days"]'), hours: el.querySelector('[data-unit="hours"]'),
              minutes: el.querySelector('[data-unit="minutes"]'), seconds: el.querySelector('[data-unit="seconds"]') };
  var text = document.querySelector("[data-countdown-text]");
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24,
        m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60;
    out.days.textContent = d; out.hours.textContent = pad(h); out.minutes.textContent = pad(m); out.seconds.textContent = pad(s);
    if (text) text.textContent = diff ? d + " days to go" : "Today's the day!";
    if (!diff) clearInterval(timer);
  }
  var timer = setInterval(tick, 1000);
  tick();
})();
