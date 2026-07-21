/* ============ EsnafWeb ============ */

/* --- AYARLAR: burayı kendi bilgilerinle doldur --- */
const CONFIG = {
  whatsapp: "905414748916",
  telefon: "0541 474 89 16",
  email: "info@esnafweb.com",
  waMesaj: "Merhaba, işletmem için web sitesi yaptırmak istiyorum. Bilgi alabilir miyim?"
};

/* --- PORTFOLYO --- */
const PROJECTS = [
  {
    name: "SushiNOVA",
    sector: "Restoran",
    city: "İstanbul · Ataşehir",
    url: "https://sushinova.com.tr/",
    display: "sushinova.com.tr",
    desc: "Gel-al sipariş odaklı sushi restoranı sitesi. Menü, konum ve sipariş akışı tek ekranda.",
    embed: true, live: true,
    shot: "images/portfolio/sushinova.jpg"
  },
  {
    name: "Beylikdüzü Çiçekçi",
    sector: "Çiçekçi",
    city: "İstanbul · Beylikdüzü",
    url: "https://xn--beylikdzieki-rdbbc34ab.com.tr/",
    display: "beylikdüzüçiçekçi.com.tr",
    desc: "\"Aynı gün teslimat\" vurgulu, WhatsApp siparişli çiçekçi sitesi. Google'da bölge aramalarına odaklı.",
    embed: true, live: true,
    shot: "images/portfolio/beylikduzu-cicekci.jpg"
  },
  {
    name: "Vastam Garage",
    sector: "Premium Oto Servis",
    city: "İstanbul",
    url: "https://vastamgarage.com.tr/",
    display: "vastamgarage.com.tr",
    desc: "Mercedes, BMW, Audi, Porsche servisi için premium hissiyatlı kurumsal site.",
    embed: false, live: true,
    screenshot: "images/vastam-garage.jpg"
  },
  {
    name: "Karmer Oto Klima",
    sector: "Oto Klima",
    city: "İstanbul · Bağcılar",
    url: "https://www.karmerotoklima.com/",
    display: "karmerotoklima.com",
    desc: "Oto klima tamiri, gaz dolumu ve yedek parça. Hizmet + güven odaklı kurumsal yapı.",
    embed: true, live: true,
    shot: "images/portfolio/karmer-oto-klima.jpg"
  },
  {
    name: "Başkanlar Auto",
    sector: "Oto Galeri",
    city: "İstanbul · Bağcılar",
    url: "https://www.baskanlarauto.com/",
    display: "baskanlarauto.com",
    desc: "İkinci el araç galerisi: araç vitrini, filtreleme ve hızlı iletişim.",
    embed: true, live: true,
    shot: "images/portfolio/baskanlar-auto.jpg"
  },
  {
    name: "Kardelen Çiçekçilik",
    sector: "Çiçekçi",
    city: "Gaziantep · Şehitkamil",
    url: "https://kardelencicekcilik.com.tr/",
    display: "kardelencicekcilik.com.tr",
    desc: "Buket, aranjman ve çelenk vitrini; adrese servis ve WhatsApp sipariş akışı.",
    embed: true, live: true,
    shot: "images/portfolio/kardelen-cicekcilik.jpg"
  },
  {
    name: "Yakuplu Çiçekçilik",
    sector: "Çiçekçi",
    city: "İstanbul · Beylikdüzü",
    url: "demo/yakuplu-cicekcilik/",
    display: "yakuplucicekcilik.com (demo)",
    desc: "Buket vitrini, WhatsApp sipariş ve müşteri yorumları odaklı çiçekçi sitesi.",
    embed: true, live: false,
    shot: "images/portfolio/yakuplu-cicekcilik.jpg"
  },
  {
    name: "Armutlu Cam & Ayna",
    sector: "Cam Balkon & Pergole",
    city: "Yalova · Armutlu",
    url: "demo/armutlu-cam/",
    display: "armutlucam.com (demo)",
    desc: "Cam balkon, giyotin cam ve bioklimatik pergole. Proje galerisi ve keşif talebi odaklı.",
    embed: true, live: false,
    shot: "images/portfolio/armutlu-cam.jpg"
  }
];

/* --- SONUÇLAR: Search Console verileri (kaynak: sushinova.com.tr, son 3 ay) ---
   Rakamlar index.html'deki #sonuclar bölümünde; data-count'lu sayılar
   bölüm görünür olunca 0'dan hedefe sayarak doluyor. */
const statsSection = document.getElementById("sonuclar");
if (statsSection) {
  const animateCount = el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1400, start = performance.now();
    const finalText = target.toLocaleString("tr-TR") + suffix;
    const tick = now => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = t === 1 ? finalText : Math.round(target * eased).toLocaleString("tr-TR");
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(() => { el.textContent = finalText; }, dur + 300);
  };
  const triggerStats = () => {
    if (statsSection.classList.contains("animate")) return;
    const r = statsSection.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.8 && r.bottom > 0) {
      statsSection.classList.add("animate");
      statsSection.querySelectorAll("[data-count]").forEach(animateCount);
      window.removeEventListener("scroll", triggerStats);
    }
  };
  window.addEventListener("scroll", triggerStats, { passive: true });
  triggerStats();
}

/* --- Portfolyo kartlarını oluştur --- */
const grid = document.getElementById("portfolioGrid");

/* Mobilde canlı iframe'ler yerine ekran görüntüsü göster:
   7 dış siteyi açılışta indirmek ağı/CPU'yu boğuyor, sayfa
   "yarım" açılıyordu. İsteyen "Canlı Önizle" ile iframe'i
   o an yükler. Masaüstü davranışı değişmedi. */
const MOBILE = window.matchMedia("(max-width: 720px)").matches;

PROJECTS.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = "pf-card reveal";

  const liveTag = p.live
    ? '<span class="pf-tag pf-tag-live">● Yayında</span>'
    : '<span class="pf-tag">Demo</span>';

  const eager = i < 2;

  let frameInner;
  if (p.embed && MOBILE && p.shot) {
    frameInner = `
      <img class="pf-shot" src="${p.shot}" alt="${p.name} web sitesi ana sayfası" loading="${i === 0 ? "eager" : "lazy"}" decoding="async">
      <div class="pf-overlay">
        <button class="btn btn-explore" data-live="${p.url}">▶ Canlı Önizle</button>
        <a class="btn btn-visit" href="${p.url}" target="_blank" rel="noopener">Yeni Sekmede Aç ↗</a>
      </div>
      <button class="pf-exit" data-exit>✕ Gezintiyi Bitir</button>`;
  } else if (p.embed) {
    frameInner = `
      <div class="pf-skeleton" aria-hidden="true"></div>
      <iframe ${eager ? `src="${p.url}"` : `data-src="${p.url}"`} loading="${eager ? 'eager' : 'lazy'}" fetchpriority="${eager ? 'high' : 'low'}" title="${p.name} sitesi önizleme"></iframe>
      <div class="pf-overlay">
        <button class="btn btn-explore" data-explore>👆 Siteyi Gez</button>
        <a class="btn btn-visit" href="${p.url}" target="_blank" rel="noopener">Yeni Sekmede Aç ↗</a>
      </div>
      <button class="pf-exit" data-exit>✕ Gezintiyi Bitir</button>`;
  } else if (p.screenshot) {
    frameInner = `
      <img class="pf-shot" src="${p.screenshot}" alt="${p.name} web sitesi ana sayfası" loading="lazy">
      <div class="pf-overlay">
        <a class="btn btn-visit" href="${p.url}" target="_blank" rel="noopener">Siteyi Ziyaret Et ↗</a>
      </div>`;
  } else {
    frameInner = `
      <div class="pf-static" style="background:${p.staticBg || 'var(--dark)'}">
        <b>${p.name}</b>
        <span>${p.sector}</span>
        <a class="btn btn-visit" href="${p.url}" target="_blank" rel="noopener" style="margin-top:10px">Siteyi Ziyaret Et ↗</a>
      </div>`;
  }

  card.innerHTML = `
    <div class="pf-browser">
      <div class="pf-dots"><i></i><i></i><i></i></div>
      <div class="pf-urlbar">${p.display}</div>
    </div>
    <div class="pf-frame-wrap" data-frame>${frameInner}</div>
    <div class="pf-info">
      <div class="pf-tags">
        ${liveTag}
        <span class="pf-tag">${p.sector}</span>
        <span class="pf-tag">📍 ${p.city}</span>
      </div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
    </div>`;

  grid.appendChild(card);
});

/* --- iframe ölçekleme: 1280px genişliğindeki siteyi kartın içine sığdır --- */
function scaleFrames() {
  document.querySelectorAll(".pf-frame-wrap").forEach(wrap => {
    const iframe = wrap.querySelector("iframe");
    if (!iframe) return;
    const scale = wrap.clientWidth / 1280;
    iframe.style.transform = `scale(${scale})`;
    iframe.style.height = `${wrap.clientHeight / scale}px`;
  });
}
window.addEventListener("resize", scaleFrames);

/* --- iframe'leri görünür olunca yükle (performans) --- */
const hideSkeleton = (iframe) => {
  const skel = iframe.parentElement.querySelector(".pf-skeleton");
  if (skel) skel.classList.add("done");
};
document.querySelectorAll(".pf-frame-wrap iframe").forEach(iframe => {
  iframe.addEventListener("load", () => hideSkeleton(iframe), { once: true });
});

const frameObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const iframe = e.target.querySelector("iframe[data-src]");
    if (iframe) {
      iframe.src = iframe.dataset.src;
      iframe.removeAttribute("data-src");
      scaleFrames();
    }
    /* Mobil ekran görüntüleri: tarayıcının lazy sezgisini beklemeden
       800px kala kesin yükle (hızlı kaydırmada boş kutu kalmasın) */
    const shot = e.target.querySelector('.pf-shot[loading="lazy"]');
    if (shot) shot.loading = "eager";
    frameObserver.unobserve(e.target);
  });
}, { rootMargin: "800px" });
document.querySelectorAll("[data-frame]").forEach(el => frameObserver.observe(el));

/* Güvenlik ağı: kritik yükleme bittikten sonra kalan ekran
   görüntülerini boşta indir — hızlı kaydırmada boş kutu kalmasın */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll('.pf-shot[loading="lazy"]').forEach(img => { img.loading = "eager"; });
  }, 2500);
});

/* --- "Siteyi Gez" / "Canlı Önizle" etkileşimi --- */
document.addEventListener("click", e => {
  if (e.target.matches("[data-explore]")) {
    e.target.closest(".pf-frame-wrap").classList.add("interactive");
  }
  const liveBtn = e.target.closest("[data-live]");
  if (liveBtn) {
    const wrap = liveBtn.closest(".pf-frame-wrap");
    if (!wrap.querySelector("iframe")) {
      const skel = document.createElement("div");
      skel.className = "pf-skeleton";
      const iframe = document.createElement("iframe");
      iframe.title = "Canlı site önizleme";
      iframe.addEventListener("load", () => skel.classList.add("done"), { once: true });
      iframe.src = liveBtn.dataset.live;
      wrap.prepend(skel);
      wrap.prepend(iframe);
      scaleFrames();
    }
    wrap.classList.add("has-live", "interactive");
  }
  if (e.target.matches("[data-exit]")) {
    e.target.closest(".pf-frame-wrap").classList.remove("interactive");
  }
});

/* --- WhatsApp linkleri --- */
const waUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.waMesaj)}`;
document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = waUrl;
  el.target = "_blank";
  el.rel = "noopener";
});

/* Sevgiliye özel hediye sitesi — ayrı, duygusal ön mesaj */
const waGiftMesaj = "Merhaba, sevgilime/eşime özel bir hediye sitesi yaptırmak istiyorum. Bilgi ve fiyat alabilir miyim?";
const waGiftUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(waGiftMesaj)}`;
document.querySelectorAll("[data-wa-gift]").forEach(el => {
  el.href = waGiftUrl;
  el.target = "_blank";
  el.rel = "noopener";
});

/* --- Telefon & e-posta --- */
document.querySelectorAll("[data-tel]").forEach(el => (el.textContent = CONFIG.telefon));
document.querySelectorAll("[data-tel-link]").forEach(el => (el.href = `tel:+90${CONFIG.telefon.replace(/\s/g, "").slice(1)}`));
document.querySelectorAll("[data-mail]").forEach(el => { el.textContent = CONFIG.email; el.href = `mailto:${CONFIG.email}`; });

/* --- Mobil menü --- */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const navBackdrop = document.getElementById("navBackdrop");
const setNavOpen = (open) => {
  mainNav.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);
  navBackdrop.classList.toggle("open", open);
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
};
/* Dokunuşta anında aç: tarayıcı "click"i bazen iptal ediyor
   (parmak 1-2px kayınca). pointerup dokunmada garanti ateşlenir;
   click ise klavye/fare için yedek kalır. */
const toggleNav = () => setNavOpen(!mainNav.classList.contains("open"));
let navTapHandled = false;
navToggle.addEventListener("pointerup", e => {
  if (e.pointerType === "mouse") return;
  navTapHandled = true;
  toggleNav();
  setTimeout(() => { navTapHandled = false; }, 500);
});
navToggle.addEventListener("click", () => {
  if (navTapHandled) return;
  toggleNav();
});
navBackdrop.addEventListener("click", () => setNavOpen(false));
mainNav.addEventListener("click", e => { if (e.target.tagName === "A") setNavOpen(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setNavOpen(false); });

/* --- Scroll reveal --- */
document.querySelectorAll(".why-card, .sector-card, .step, .pf-card").forEach(el => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* --- Yıl --- */
document.getElementById("year").textContent = new Date().getFullYear();

scaleFrames();
