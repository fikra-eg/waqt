/* ==========================================================
   app.js  —  تشغيل الموقع (متعدّلش هنا غالباً)
   - التنقل بين الصفحات (route)
   - ظهور العناصر وقت السكرول (reveal)
   - الضغطات والكتابة (events)
   ========================================================== */

// ظهور العناصر بحركة خفيفة وقت السكرول
function reveal() {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
}

// التنقل: #shop أو #p-3 أو الرئيسية
function route() {
  const h = location.hash.slice(1) || "home",
    a = $("#app");
  document.body.classList.remove("co");
  $("#nv").classList.remove("open");
  if (h.startsWith("p-") && byId(h.slice(2))) {
    const p = byId(h.slice(2));
    a.innerHTML = V.product(p);
    document.title = p.name + " — " + BRAND;
  } else if (h.startsWith("shop")) {
    S.f = h.split("-")[1] || "all";
    S.q = "";
    a.innerHTML = V.shop();
    $("#so").value = S.s;
    grid();
    document.title = "Shop — " + BRAND;
  } else {
    a.innerHTML = V.home();
    document.title = BRAND + " — Men’s watches, Egypt";
    if (h == "collections") {
      reveal();
      const t = document.getElementById(h);
      t && t.scrollIntoView();
      return;
    }
  }
  window.scrollTo(0, 0);
  reveal();
}

// كل الضغطات (الأزرار اللي عليها data-a)
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-a]");
  if (!el) return;
  const a = el.dataset.a,
    id = el.dataset.id;
  if (a == "menu") $("#nv").classList.toggle("open");
  else if (a == "open") document.body.classList.add("co");
  else if (a == "close") document.body.classList.remove("co");
  else if (a == "f") {
    S.f = el.dataset.f;
    grid();
  } else if (a == "qp" || a == "qm") {
    const v = $("#qv");
    v.textContent = Math.max(1, Math.min(10, +v.textContent + (a == "qp" ? 1 : -1)));
  } else if (a == "th") {
    const p = byId(location.hash.slice(3));
    $("#main").innerHTML = pic(p, +el.dataset.z);
    document
      .querySelectorAll(".th .img")
      .forEach((t) => t.classList.toggle("on", t == el));
  } else if (a == "add") {
    add(id, +$("#qv").textContent);
    document.body.classList.add("co");
  } else if (a == "inc") add(id, 1);
  else if (a == "dec") add(id, -1);
  else if (a == "rm") {
    delete cart[id];
    save();
    render();
  } else if (a == "order") sendOrder();
});

// البحث والترتيب
document.addEventListener("input", (e) => {
  if (e.target.id == "q") {
    S.q = e.target.value;
    grid();
  } else if (e.target.id == "so") {
    S.s = e.target.value;
    grid();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") document.body.classList.remove("co");
});
window.addEventListener("hashchange", route);

// تشغيل
render();
route();
