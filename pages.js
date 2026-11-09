/* ==========================================================
   pages.js  —  محتوى الصفحات (النصوص والأقسام)
   كل قسم في الصفحة الرئيسية دالة لوحدها. عدّل النص جوّاها.
   ========================================================== */

/* ---------- كارت المنتج (بيظهر في كل الشبكات) ---------- */
const card = (p) =>
  `<a class="card rv" href="#p-${p.id}"><div class="img">${p.badge ? `<i class="badge">${p.badge}</i>` : ""}${pic(p)}</div><div class="meta"><b>${p.name}</b><span>${EGP(p.price)}</span></div><small>${cap(p.style)}</small></a>`;

/* ================= الصفحة الرئيسية ================= */

// 1) الـ Hero: الشاشة الأولى (العنوان، الجملة، الزرار، الخلفية)
// لصورة حقيقية في الخلفية: شوف README
function heroSection() {
  return `<section class="hero" style="padding:0">
    <div class="a">
      <img src="${HERO_IMAGE}" alt="WAQT Men's Watches">
    </div>
    <div class="t">
      <small>MEN’S WATCHES · EGYPT</small>
      <h1>A watch for every day</h1>
      <div class="hero-bottom">
  <a class="btn" href="#shop">Shop now</a>
</div>
    </div>
  </section>`;
}

// 2) New arrivals: أول 4 ساعات (اللي عليها NEW الأول)
function newArrivalsSection() {
  const list = P.filter((p) => p.badge == "NEW")
    .concat(P.filter((p) => p.badge != "NEW"))
    .slice(0, 4);
  return `<section><div class="wrap">
    <div class="sh"><h2 class="rv">New arrivals</h2><a href="#shop-new">View all</a></div>
    <div class="grid">${list.map(card).join("")}</div>
  </div></section>`;
}

// 3) Featured: ساعة مميزة (الـ id في config.js)
function featuredSection() {
  const f = byId(FEATURED_ID);
  return `<section style="padding-top:0"><div class="wrap"><div class="feat rv">
    <div class="img">${pic(f)}</div>
    <div class="t">
      <small style="color:var(--acc);font-weight:700">FEATURED</small>
      <h2>${f.name}</h2>
      <p dir="rtl">${f.d}</p>
      <b style="color:var(--ink)">${EGP(f.price)}</b>
      <a class="btn dk" href="#p-${f.id}">Explore watch</a>
    </div>
  </div></div></section>`;
}

// 4) Shop by style: Classic / Sporty / Minimal
function collectionsSection() {
  const cols = ["classic", "sporty", "minimal"]
    .map(
      (s) =>
        `<a class="col rv" href="#shop-${s}"><div><h3>${s.toUpperCase()}</h3><span>${STY[s]}</span></div></a>`,
    )
    .join("");
  return `<section id="collections" style="padding-top:0"><div class="wrap">
    <div class="sh"><h2 class="rv">Shop by style</h2></div>
    <div class="cols">${cols}</div>
  </div></section>`;
}

// 5) القسم الأخير (العنوان + زرار Shop all)
function ctaSection() {
  return `<div class="cta"><h2 class="rv">Your time starts here</h2><a class="btn" href="#shop">Shop all</a></div>`;
}

// ترتيب الأقسام في الصفحة الرئيسية (غيّر الترتيب أو امسح سطر)
const V = {
  home() {
    return (
      heroSection() +
      newArrivalsSection() +
      featuredSection() +
      collectionsSection() +
      ctaSection()
    );
  },

  /* ================= صفحة المتجر (Shop) ================= */
  shop() {
    return `<div class="wrap" style="padding-top:36px;padding-bottom:72px">
      <h1 style="font-size:clamp(28px,4vw,44px);margin-bottom:24px">Shop</h1>
      <div class="ctl">
        <div class="chips">${["all", "classic", "sporty", "minimal"].map((f) => `<button class="chip" data-a="f" data-f="${f}">${cap(f)}</button>`).join("")}</div>
        <input id="q" type="search" placeholder="Search watches" aria-label="Search watches">
        <select id="so" aria-label="Sort"><option value="new">Newest</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select>
      </div>
      <p id="n" style="color:var(--mute);margin:0 0 16px"></p>
      <div class="grid" id="grid"></div>
    </div>`;
  },

  /* ================= صفحة المنتج ================= */
  product(p) {
    const same = P.filter((x) => x.style == p.style && x.id != p.id).slice(
      0,
      4,
    );
    return `<div class="wrap">
      <div class="crumb"><a href="#shop">Shop</a> / ${cap(p.style)} / ${p.name}</div>
      <div class="pd">
        <div>
          <div class="img" id="main">${pic(p)}</div>
          <div class="th">
            <div class="img on" data-a="th" data-z="0">${pic(p)}</div>
            <div class="img" data-a="th" data-z="1">${pic(p, 1)}</div>
          </div>
        </div>
        <div class="i">
          <small style="color:var(--acc);font-weight:700">${p.style.toUpperCase()}</small>
          <h1>${p.name}</h1>
          <div class="pr">${EGP(p.price)}</div>
          <p dir="rtl">${p.d}</p>
          <span class="ok" dir="rtl">● متوفر · الشحن لكل محافظات مصر</span>
          <div class="q"><button data-a="qm" aria-label="Less">−</button><span id="qv">1</span><button data-a="qp" aria-label="More">+</button></div>
          <button class="btn" data-a="add" data-id="${p.id}">Add to bag</button>
        </div>
      </div>
      ${same.length ? `<div class="sh"><h2>More ${p.style}</h2></div><div class="grid" style="padding-bottom:72px">${same.map(card).join("")}</div>` : ""}
    </div>`;
  },
};

/* ---------- فلترة وترتيب المنتجات في صفحة Shop ---------- */
const S = { f: "all", q: "", s: "new" };
function grid() {
  let l = P.filter(
    (p) =>
      (S.f == "all" || p.style == S.f || (S.f == "new" && p.badge == "NEW")) &&
      p.name.toLowerCase().includes(S.q.toLowerCase()),
  );
  if (S.s == "lo") l.sort((a, b) => a.price - b.price);
  else if (S.s == "hi") l.sort((a, b) => b.price - a.price);
  else l.sort((a, b) => b.id - a.id);
  $("#n").textContent = l.length + (l.length == 1 ? " watch" : " watches");
  $("#grid").innerHTML = l.length
    ? l.map(card).join("")
    : `<div class="empty">No watches match your search.<br><br><button class="btn dk" data-a="f" data-f="all">Clear filters</button></div>`;
  document
    .querySelectorAll(".chip")
    .forEach((c) => c.classList.toggle("on", c.dataset.f == S.f));
  reveal();
}
