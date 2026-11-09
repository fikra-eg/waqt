/* ==========================================================
   cart.js  —  حقيبة التسوق والطلب على واتساب
   - حفظ الحقيبة في المتصفح (localStorage)
   - رسم محتوى الحقيبة (render)
   - التحقق من البيانات وإرسال الطلب (sendOrder)
   ========================================================== */

let cart = {};
try {
  cart = JSON.parse(localStorage.getItem("waqt-cart") || "{}");
} catch (e) {}

const save = () => {
  try {
    localStorage.setItem("waqt-cart", JSON.stringify(cart));
  } catch (e) {}
};
const count = () => Object.values(cart).reduce((a, b) => a + b, 0);

// زيادة أو نقص كمية منتج
function add(id, n) {
  cart[id] = (cart[id] || 0) + n;
  if (cart[id] <= 0) delete cart[id];
  save();
  render();
}

// رسم الحقيبة (المنتجات + الإجمالي + فورم البيانات)
function render() {
  $("#cnt").textContent = count();
  const ids = Object.keys(cart).filter((i) => byId(i)),
    sub = ids.reduce((a, i) => a + byId(i).price * cart[i], 0);
  $("#ci").innerHTML = ids.length
    ? ids
        .map((i) => {
          const p = byId(i);
          return `<div class="li"><div class="img">${pic(p)}</div><div><b style="color:var(--ink)">${p.name}</b><br><small>${EGP(p.price)}</small><div class="q"><button data-a="dec" data-id="${i}" aria-label="Less">−</button><span>${cart[i]}</span><button data-a="inc" data-id="${i}" aria-label="More">+</button></div></div><button class="rm" data-a="rm" data-id="${i}">Remove</button></div>`;
        })
        .join("")
    : `<div class="empty" style="padding:48px 0">Your bag is empty.<br><br><a class="btn dk" href="#shop" data-a="close">Start shopping</a></div>`;
  const keep = ["fn", "fp", "fa"].map((k) => $("#" + k)?.value || "");
  $("#cf").innerHTML = ids.length
    ? `<div class="tot"><span>Subtotal</span><span>${EGP(sub)}</span></div><div class="f"><input id="fn" placeholder="Full name" autocomplete="name" value="${keep[0]}"><input id="fp" placeholder="Phone (01XXXXXXXXX)" inputmode="tel" autocomplete="tel" value="${keep[1]}"><input id="fa" placeholder="Delivery address" autocomplete="street-address" value="${keep[2]}"></div><div class="err" id="er"></div><button class="btn" data-a="order">Order on WhatsApp</button>`
    : "";
}

// التحقق من البيانات وفتح واتساب برسالة الطلب (الرسالة بالعربي)
function sendOrder() {
  const n = $("#fn"),
    p = $("#fp"),
    d = $("#fa");
  const phoneOk = /^01[0125]\d{8}$/.test(p.value.replace(/\s/g, ""));
  n.classList.toggle("bad", !n.value.trim());
  p.classList.toggle("bad", !phoneOk);
  d.classList.toggle("bad", d.value.trim().length < 6);
  if (!n.value.trim() || !phoneOk || d.value.trim().length < 6) {
    $("#er").textContent =
      "Please enter a valid name, Egyptian mobile number and address.";
    return;
  }
  const ids = Object.keys(cart).filter((i) => byId(i)),
    sub = ids.reduce((a, i) => a + byId(i).price * cart[i], 0);
  const msg =
    `طلب جديد — وقت\n` +
    ids
      .map((i) => `• ${byId(i).name} × ${cart[i]} = ${EGP(byId(i).price * cart[i])}`)
      .join("\n") +
    `\nالإجمالي: ${EGP(sub)}\n\nالاسم: ${n.value.trim()}\nالموبايل: ${p.value.trim()}\nالعنوان: ${d.value.trim()}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
}
