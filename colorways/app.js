/* Neon Sankofa Colorways — palette generator (static, no backend) */

(function () {
  "use strict";

  const ROLES = [
    { id: "ground", label: "Ground", hint: "The body of the one-piece — night, the stage." },
    { id: "field", label: "Field", hint: "Side panels, a cloth, a dyed plane." },
    { id: "accent", label: "Accent", hint: "Belt, collar — placed light or a print story." },
    { id: "metal", label: "Metal", hint: "Zipper, buckle, hardware." },
    { id: "trim", label: "Trim", hint: "Pockets, hems, binding." },
  ];

  const THEMES = [
    {
      id: "night-gold",
      name: "Night + Gold",
      desc: "Deep black ground. Gold as placed light, not a pile of metal.",
      chips: ["#0a0a0c", "#16141a", "#d4a017", "#f0e0a8", "#7a5c18"],
      generate: () => {
        const ground = hsl(rand(0, 40) < 20 ? rand(0, 30) : rand(220, 260), rand(2, 12), rand(3, 8));
        const field = hsl(hueShift(hexToHsl(ground).h, rand(-8, 8)), rand(4, 16), rand(10, 18));
        const accent = hsl(rand(36, 46), rand(62, 86), rand(44, 58));
        const metal = hsl(rand(38, 50), rand(40, 70), rand(68, 84));
        const trim = hsl(rand(32, 44), rand(45, 75), rand(28, 40));
        return [ground, field, accent, metal, trim];
      },
    },
    {
      id: "indigo-gold",
      name: "Indigo + Gold",
      desc: "Warmer and textile-forward. Leave room around the gold.",
      chips: ["#0d1630", "#1a2870", "#c9a227", "#ead889", "#3a4a9a"],
      generate: () => {
        const ground = hsl(rand(222, 236), rand(40, 62), rand(6, 12));
        const field = hsl(rand(222, 238), rand(48, 70), rand(18, 32));
        const accent = hsl(rand(36, 46), rand(64, 88), rand(46, 60));
        const metal = hsl(rand(40, 52), rand(35, 60), rand(72, 86));
        const trim = hsl(rand(220, 240), rand(30, 55), rand(40, 58));
        return [ground, field, accent, metal, trim];
      },
    },
    {
      id: "night-chrome",
      name: "Night + Chrome",
      desc: "Colder and more industrial. Sharp tailoring, one cool metal.",
      chips: ["#09090b", "#1a1c22", "#c5c8d0", "#eef0f3", "#6d7380"],
      generate: () => {
        const ground = hsl(rand(220, 250), rand(4, 14), rand(3, 8));
        const field = hsl(rand(210, 230), rand(8, 18), rand(12, 20));
        const accent = hsl(rand(210, 230), rand(4, 14), rand(72, 84));
        const metal = hsl(rand(200, 220), rand(2, 10), rand(86, 94));
        const trim = hsl(rand(210, 230), rand(6, 16), rand(38, 52));
        return [ground, field, accent, metal, trim];
      },
    },
    {
      id: "indigo-night",
      name: "Indigo + Night",
      desc: "No metal required: two deep colors and a clear silhouette.",
      chips: ["#07070a", "#15204a", "#2e4a8f", "#8aa0d8", "#1a2870"],
      generate: () => {
        const ground = hsl(rand(230, 250), rand(8, 20), rand(3, 8));
        const field = hsl(rand(222, 236), rand(44, 68), rand(16, 28));
        const accent = hsl(rand(220, 238), rand(40, 65), rand(36, 52));
        const metal = hsl(rand(220, 235), rand(10, 25), rand(70, 84));
        const trim = hsl(rand(222, 240), rand(30, 55), rand(48, 64));
        return [ground, field, accent, metal, trim];
      },
    },
    {
      id: "night-gold-indigo",
      name: "Night + Gold + Indigo",
      desc: "A black outfit, one indigo field, one gold story. Then stop.",
      chips: ["#08080a", "#1a2870", "#d4a017", "#efe3b8", "#24355c"],
      generate: () => {
        const ground = hsl(rand(0, 30), rand(0, 8), rand(3, 8));
        const field = hsl(rand(222, 236), rand(46, 70), rand(18, 30));
        const accent = hsl(rand(36, 46), rand(64, 86), rand(46, 58));
        const metal = hsl(rand(40, 50), rand(30, 55), rand(74, 88));
        const trim = hsl(rand(220, 235), rand(20, 40), rand(32, 46));
        return [ground, field, accent, metal, trim];
      },
    },
    {
      id: "kente",
      name: "Kente-inspired",
      desc: "Gold, deep green, crimson, and night — color language, not a named cloth.",
      chips: ["#0c0c0e", "#1d4a28", "#c9a227", "#7a1f1a", "#ead889"],
      generate: () => {
        const ground = hsl(rand(0, 30), rand(2, 10), rand(4, 9));
        const field = hsl(rand(130, 155), rand(40, 62), rand(16, 28));
        const accent = hsl(rand(38, 48), rand(64, 88), rand(46, 58));
        const metal = Math.random() < 0.55
          ? hsl(rand(40, 50), rand(40, 65), rand(72, 86))
          : hsl(rand(0, 12), rand(55, 75), rand(28, 40));
        const trim = hsl(rand(0, 12), rand(52, 74), rand(26, 38));
        return [ground, field, accent, metal, trim];
      },
    },
    {
      id: "adire",
      name: "Adire-inspired",
      desc: "Indigo dye depths, a resist cream, and sometimes a rust accent.",
      chips: ["#0c1630", "#1a2870", "#e8d9b8", "#8a4a28", "#3d5aa0"],
      generate: () => {
        const ground = hsl(rand(222, 236), rand(40, 60), rand(8, 14));
        const field = hsl(rand(220, 236), rand(46, 70), rand(22, 36));
        const accent = hsl(rand(38, 48), rand(20, 40), rand(78, 90));
        const metal = Math.random() < 0.6
          ? hsl(rand(20, 32), rand(40, 62), rand(32, 46))
          : hsl(rand(40, 50), rand(25, 45), rand(70, 82));
        const trim = hsl(rand(218, 232), rand(25, 45), rand(50, 68));
        return [ground, field, accent, metal, trim];
      },
    },
  ];

  const NAME_WORDS = {
    "night-gold": [["Night", "Eclipse", "Column", "Quiet", "Cipher"], ["Gold", "Filament", "Light", "Memory", "Hoard"]],
    "indigo-gold": [["Indigo", "Dye", "Field", "Depth"], ["Gold", "Warmth", "Signal", "Loom"]],
    "night-chrome": [["Night", "Voltage", "Grid", "Signal"], ["Chrome", "Edge", "Machine", "Cool"]],
    "indigo-night": [["Indigo", "Depth", "Tide", "Cloth"], ["Night", "Column", "Quiet", "Ground"]],
    "night-gold-indigo": [["Night", "Sentence", "Triad", "Stage"], ["Gold", "Field", "Story"]],
    kente: [["Band", "Loom", "Strip", "Harvest"], ["Gold", "Grove", "Ember"]],
    adire: [["Resist", "Vat", "Tide", "Cloth"], ["Cream", "Rust", "Indigo"]],
  };

  const ICONS = {
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="6" y="11" width="12" height="9" rx="1.6"/><path d="M8.5 11V8.2a3.5 3.5 0 0 1 7 0V11"/></svg>',
    unlock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="6" y="11" width="12" height="9" rx="1.6"/><path d="M8.5 11V8.2a3.5 3.5 0 0 1 6.4-1.9"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="11" height="13" rx="1.6"/><path d="M5 16V5.8A1.8 1.8 0 0 1 6.8 4H16"/></svg>',
  };

  const state = {
    themeId: "night-gold",
    colors: ["#0a0a0c", "#16141a", "#d4a017", "#f0e0a8", "#7a5c18"],
    locked: [false, false, false, false, false],
    name: "Night Filament 01",
    serial: 1,
  };

  const els = {};

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function hueShift(h, d) {
    return (h + d + 360) % 360;
  }

  function hsl(h, s, l) {
    return hslToHex(h, s, l);
  }

  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s = clamp(s, 0, 100) / 100;
    l = clamp(l, 0, 100) / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function hexToHsl(hex) {
    const { r, g, b } = hexToRgb(hex);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4;
      }
      h *= 60;
    }
    return { h, s: s * 100, l: l * 100 };
  }

  function hexToRgb(hex) {
    const h = normalizeHex(hex).slice(1);
    return {
      r: parseInt(h.slice(0, 2), 16) / 255,
      g: parseInt(h.slice(2, 4), 16) / 255,
      b: parseInt(h.slice(4, 6), 16) / 255,
    };
  }

  function normalizeHex(value) {
    let v = String(value || "").trim();
    if (v.charAt(0) !== "#") v = "#" + v;
    if (/^#[0-9a-fA-F]{3}$/.test(v)) {
      v = "#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
    }
    if (!/^#[0-9a-fA-F]{6}$/.test(v)) return null;
    return v.toLowerCase();
  }

  function shade(hex, lDelta, sDelta) {
    const { h, s, l } = hexToHsl(hex);
    return hslToHex(h, s + (sDelta || 0), l + lDelta);
  }

  function contrastText(hex) {
    const { r, g, b } = hexToRgb(hex);
    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return y > 0.55 ? "#16120a" : "#f3ead7";
  }

  function themeById(id) {
    return THEMES.find((t) => t.id === id) || THEMES[0];
  }

  function makeName(themeId, serial) {
    const banks = NAME_WORDS[themeId] || NAME_WORDS["night-gold"];
    const a = banks[0][Math.floor(Math.random() * banks[0].length)];
    const b = banks[1][Math.floor(Math.random() * banks[1].length)];
    const n = String(serial).padStart(2, "0");
    return a === b ? `${a} ${n}` : `${a} ${b} ${n}`;
  }

  function generateColors(themeId, previous, locked) {
    const next = themeById(themeId).generate();
    if (!previous || !locked) return next;
    return next.map((c, i) => (locked[i] ? previous[i] : c));
  }

  /* ---------- render ---------- */

  function renderThemes() {
    els.themeList.innerHTML = THEMES.map((t) => {
      const checked = t.id === state.themeId ? "checked" : "";
      const chips = t.chips
        .map((c) => `<i style="background:${c}"></i>`)
        .join("");
      return `
        <label class="theme-option">
          <input type="radio" name="theme" value="${t.id}" ${checked} />
          <span>
            <span class="theme-name">${t.name}</span>
            <span class="theme-desc">${t.desc}</span>
            <span class="theme-chips" aria-hidden="true">${chips}</span>
          </span>
        </label>`;
    }).join("");
    els.themeCount.textContent = `${THEMES.length} systems`;
  }

  function renderSwatches() {
    els.swatches.innerHTML = ROLES.map((role, i) => {
      const color = state.colors[i];
      const locked = state.locked[i];
      return `
        <li class="swatch" data-index="${i}" data-role="${role.id}">
          <label class="swatch-chip" style="background:${color}" title="Adjust ${role.label}">
            <span class="visually-hidden">Adjust ${role.label} color</span>
            <input type="color" value="${color}" data-index="${i}" aria-label="${role.label} color picker" />
          </label>
          <div class="swatch-meta">
            <span class="swatch-role">${role.label}</span>
            <input class="swatch-hex" value="${color}" data-index="${i}" spellcheck="false" maxlength="7" aria-label="${role.label} hex code" />
          </div>
          <button type="button" class="icon-btn btn-lock" data-index="${i}" aria-pressed="${locked}" aria-label="${locked ? "Unlock" : "Lock"} ${role.label}" title="${locked ? "Unlock" : "Lock"} this color">
            ${locked ? ICONS.lock : ICONS.unlock}
          </button>
          <button type="button" class="icon-btn btn-copy" data-index="${i}" aria-label="Copy ${role.label} hex" title="Copy hex">
            ${ICONS.copy}
          </button>
        </li>`;
    }).join("");
  }

  function applySilhouette() {
    const [ground, field, accent, metal, trim] = state.colors;
    setGradient("grad-ground", shade(ground, -8, 0), ground, shade(ground, -10, -4));
    setGradient("grad-field", shade(field, -10, 0), field, shade(field, -12, -4));
    setGradient("grad-accent", shade(accent, 10, 4), shade(accent, -12, 0));
    setGradient("grad-metal", shade(metal, 12, -6), shade(metal, -16, 0));
    document.querySelectorAll('.part-trim').forEach((el) => {
      el.setAttribute("fill", trim);
      el.style.color = trim;
      el.setAttribute("stroke", trim);
    });
    els.stageName.textContent = state.name;
    els.paletteName.textContent = state.name;
    const theme = themeById(state.themeId);
    els.themeNote.textContent = theme.desc;
  }

  function setGradient(id, a, b, c) {
    const stops = document.querySelectorAll(`#${id} stop`);
    const colors = c ? [a, b, c] : [a, b];
    stops.forEach((stop, i) => {
      if (colors[i]) stop.setAttribute("stop-color", colors[i]);
    });
  }

  function renderAll() {
    renderSwatches();
    applySilhouette();
    writeHash();
  }

  /* ---------- hash state (shareable, still local) ---------- */

  function writeHash() {
    const params = new URLSearchParams();
    params.set("t", state.themeId);
    params.set("c", state.colors.map((c) => c.slice(1)).join("-"));
    params.set("n", state.name);
    const lockBits = state.locked.map((v) => (v ? "1" : "0")).join("");
    if (lockBits !== "00000") params.set("l", lockBits);
    history.replaceState(null, "", "#" + params.toString());
  }

  function readHash() {
    const raw = location.hash.replace(/^#/, "");
    if (!raw) return false;
    const params = new URLSearchParams(raw);
    const t = params.get("t");
    const c = params.get("c");
    const n = params.get("n");
    const l = params.get("l");
    if (t && themeById(t).id === t) state.themeId = t;
    if (c) {
      const parts = c.split("-").map((p) => normalizeHex(p));
      if (parts.length === 5 && parts.every(Boolean)) state.colors = parts;
    }
    if (n) state.name = n.slice(0, 48);
    if (l && /^\d{5}$/.test(l)) state.locked = l.split("").map((ch) => ch === "1");
    return true;
  }

  /* ---------- actions ---------- */

  function generate({ surprise } = {}) {
    if (surprise) {
      state.themeId = THEMES[Math.floor(Math.random() * THEMES.length)].id;
      const radio = els.themeList.querySelector(`input[value="${state.themeId}"]`);
      if (radio) radio.checked = true;
    }
    const allLocked = state.locked.every(Boolean);
    if (allLocked) {
      toast("All five colors are locked. Unlock one to generate.");
      return;
    }
    state.serial += 1;
    state.colors = generateColors(state.themeId, state.colors, state.locked);
    if (!nameWasCustom()) state.name = makeName(state.themeId, state.serial);
    renderAll();
  }

  let customName = false;
  function nameWasCustom() {
    return customName;
  }

  function toast(message) {
    els.toast.hidden = false;
    els.toast.textContent = message;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 2200);
  }

  async function copyText(text, okMessage) {
    try {
      await navigator.clipboard.writeText(text);
      toast(okMessage);
    } catch (err) {
      // Fallback for file:// or denied clipboard
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast(okMessage);
      } catch (e) {
        toast("Could not copy. Select the hex instead.");
      }
      ta.remove();
    }
  }

  function allHexBlock() {
    return ROLES.map((role, i) => `${role.label.padEnd(8, " ")}${state.colors[i].toUpperCase()}`).join("\n")
      + `\n\n${state.name}\nNeon Sankofa Colorways — ${themeById(state.themeId).name}`;
  }

  async function exportPng() {
    const width = 1600;
    const height = 1000;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#070709";
    ctx.fillRect(0, 0, width, height);

    const night = ctx.createRadialGradient(200, 0, 40, 200, 0, 800);
    night.addColorStop(0, "rgba(42,63,143,0.28)");
    night.addColorStop(1, "rgba(7,7,9,0)");
    ctx.fillStyle = night;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(212,160,23,0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.fillStyle = "#d4a017";
    ctx.font = "500 22px 'Sora', sans-serif";
    ctx.letterSpacing = "0.2em";
    ctx.fillText("NEON SANKOFA  ·  COLORWAYS", 80, 110);

    ctx.fillStyle = "#f3ead7";
    ctx.font = "700 54px 'Syne', serif";
    ctx.letterSpacing = "0";
    ctx.fillText(state.name, 80, 180);

    ctx.fillStyle = "#9a9486";
    ctx.font = "400 22px 'Sora', sans-serif";
    ctx.fillText(themeById(state.themeId).name, 80, 220);

    const svg = document.getElementById("silhouette");
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "520");
    clone.setAttribute("height", "1040");
    const xml = new XMLSerializer().serializeToString(clone);
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    ctx.drawImage(img, 980, 80, 520, 860);

    const sw = 170;
    const sh = 420;
    const startX = 80;
    const startY = 300;
    const gap = 18;
    state.colors.forEach((color, i) => {
      const x = startX + i * (sw + gap);
      ctx.fillStyle = color;
      ctx.fillRect(x, startY, sw, sh);
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.strokeRect(x + 0.5, startY + 0.5, sw - 1, sh - 1);
      ctx.fillStyle = contrastText(color);
      ctx.font = "500 16px 'Sora', sans-serif";
      ctx.fillText(ROLES[i].label.toUpperCase(), x + 16, startY + sh - 48);
      ctx.font = "500 18px 'IBM Plex Mono', monospace";
      ctx.fillText(color.toUpperCase(), x + 16, startY + sh - 22);
    });

    ctx.fillStyle = "#9a9486";
    ctx.font = "400 16px 'Sora', sans-serif";
    ctx.fillText("Afrofuturist fashion, styled for real life.  ·  Free studio tool.", 80, 920);
    ctx.fillText("Kente- and adire-inspired palettes borrow color language, not specific cloths.", 80, 944);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const a = document.createElement("a");
    const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    a.href = URL.createObjectURL(blob);
    a.download = `neon-sankofa-${slug || "palette"}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("Palette PNG downloaded.");
  }

  function openProModal(feature) {
    const bodies = {
      batch: "Batch export would download a PNG board for every theme in one pass. It is a planned Pro extra. Payment is not wired in this prototype, and nothing will be charged or unlocked.",
      patterns: "Pattern swatches — adire-inspired resists and kente-inspired bands — are a planned Pro extra. They would be color-language tools, not copies of specific cloths. Payment is not wired in this prototype.",
    };
    els.proModalBody.textContent = bodies[feature] || els.proModalBody.dataset.default || els.proModalBody.textContent;
    if (typeof els.proModal.showModal === "function") {
      els.proModal.showModal();
    } else {
      toast("Pro is a placeholder. Payment is not wired.");
    }
  }

  /* ---------- events ---------- */

  function bind() {
    els.themeList.addEventListener("change", (e) => {
      if (e.target.name !== "theme") return;
      state.themeId = e.target.value;
      customName = false;
      state.serial += 1;
      state.colors = generateColors(state.themeId, state.colors, state.locked);
      state.name = makeName(state.themeId, state.serial);
      renderAll();
    });

    els.btnGenerate.addEventListener("click", () => generate());
    els.btnSurprise.addEventListener("click", () => generate({ surprise: true }));

    els.swatches.addEventListener("click", (e) => {
      const lockBtn = e.target.closest(".btn-lock");
      const copyBtn = e.target.closest(".btn-copy");
      if (lockBtn) {
        const i = Number(lockBtn.dataset.index);
        state.locked[i] = !state.locked[i];
        renderSwatches();
        writeHash();
        return;
      }
      if (copyBtn) {
        const i = Number(copyBtn.dataset.index);
        copyText(state.colors[i].toUpperCase(), `${ROLES[i].label} ${state.colors[i].toUpperCase()} copied.`);
      }
    });

    els.swatches.addEventListener("input", (e) => {
      if (e.target.type === "color") {
        const i = Number(e.target.dataset.index);
        const hex = normalizeHex(e.target.value);
        if (!hex) return;
        state.colors[i] = hex;
        const row = e.target.closest(".swatch");
        row.querySelector(".swatch-chip").style.background = hex;
        row.querySelector(".swatch-hex").value = hex;
        applySilhouette();
        writeHash();
      }
    });

    function applyHexInput(input) {
      const i = Number(input.dataset.index);
      const hex = normalizeHex(input.value);
      if (!hex) {
        input.value = state.colors[i];
        toast("Use a 3- or 6-digit hex code.");
        return;
      }
      state.colors[i] = hex;
      renderAll();
    }

    els.swatches.addEventListener("change", (e) => {
      if (!e.target.classList.contains("swatch-hex")) return;
      applyHexInput(e.target);
    });

    els.swatches.addEventListener("keydown", (e) => {
      if (!e.target.classList.contains("swatch-hex")) return;
      if (e.key === "Enter") {
        e.preventDefault();
        applyHexInput(e.target);
        e.target.blur();
      }
    });

    els.swatches.addEventListener("mouseover", (e) => highlight(e, true));
    els.swatches.addEventListener("mouseout", (e) => highlight(e, false));
    els.swatches.addEventListener("focusin", (e) => highlight(e, true));
    els.swatches.addEventListener("focusout", (e) => highlight(e, false));

    document.getElementById("silhouette").addEventListener("mouseover", (e) => {
      const part = e.target.closest("[data-role]");
      if (!part) return;
      setHot(part.dataset.role, true);
    });
    document.getElementById("silhouette").addEventListener("mouseout", (e) => {
      const part = e.target.closest("[data-role]");
      if (!part) return;
      setHot(part.dataset.role, false);
    });
    document.getElementById("silhouette").addEventListener("click", (e) => {
      const part = e.target.closest("[data-role]");
      if (!part) return;
      const i = ROLES.findIndex((r) => r.id === part.dataset.role);
      const row = els.swatches.querySelector(`.swatch[data-index="${i}"] .swatch-hex`);
      if (row) row.focus();
    });

    els.btnCopyAll.addEventListener("click", () => copyText(allHexBlock(), "All hex codes copied."));
    els.btnExport.addEventListener("click", () => {
      exportPng().catch(() => toast("Could not export the PNG."));
    });

    els.btnRename.addEventListener("click", () => {
      els.paletteName.focus();
      const range = document.createRange();
      range.selectNodeContents(els.paletteName);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });

    els.paletteName.addEventListener("input", () => {
      customName = true;
      state.name = els.paletteName.textContent.trim().slice(0, 48) || state.name;
      els.stageName.textContent = state.name;
    });
    els.paletteName.addEventListener("blur", () => {
      if (!els.paletteName.textContent.trim()) {
        customName = false;
        state.name = makeName(state.themeId, state.serial);
        els.paletteName.textContent = state.name;
      }
      writeHash();
    });
    els.paletteName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        els.paletteName.blur();
      }
    });

    document.querySelectorAll("[data-pro-feature]").forEach((btn) => {
      btn.addEventListener("click", () => openProModal(btn.dataset.proFeature));
    });
    els.proModalClose.addEventListener("click", () => els.proModal.close());
    els.proModalPay.addEventListener("click", (e) => {
      e.preventDefault();
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.closest("input, [contenteditable='true'], textarea, dialog")) return;
      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        generate();
      }
    });
  }

  function highlight(e, on) {
    const row = e.target.closest(".swatch");
    if (!row) return;
    setHot(row.dataset.role, on);
  }

  function setHot(role, on) {
    document.querySelectorAll(`[data-role="${role}"]`).forEach((el) => {
      el.classList.toggle("is-hot", on);
    });
  }

  /* ---------- init ---------- */

  function init() {
    els.themeList = document.getElementById("theme-list");
    els.themeCount = document.getElementById("theme-count");
    els.themeNote = document.getElementById("theme-note");
    els.swatches = document.getElementById("swatches");
    els.paletteName = document.getElementById("palette-name");
    els.stageName = document.getElementById("stage-name");
    els.btnGenerate = document.getElementById("btn-generate");
    els.btnSurprise = document.getElementById("btn-surprise");
    els.btnCopyAll = document.getElementById("btn-copy-all");
    els.btnExport = document.getElementById("btn-export");
    els.btnRename = document.getElementById("btn-rename");
    els.toast = document.getElementById("toast");
    els.proModal = document.getElementById("pro-modal");
    els.proModalBody = document.getElementById("pro-modal-body");
    els.proModalClose = document.getElementById("pro-modal-close");
    els.proModalPay = document.getElementById("pro-modal-pay");

    const hadHash = readHash();
    if (!hadHash) {
      state.colors = generateColors(state.themeId);
      state.name = makeName(state.themeId, state.serial);
    }
    renderThemes();
    bind();
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
