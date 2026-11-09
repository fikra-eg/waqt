/* ==========================================================
   config.js  —  الإعدادات العامة
   عدّل هنا: اسم البراند، رقم واتساب، وصف الستايلات،
   والساعات اللي بتظهر في الـ Hero والـ Featured.
   ========================================================== */

const BRAND = "WAQT";
const WA = "201000000000"; // رقم واتساب: كود الدولة + الرقم، من غير + أو مسافات

const HERO_IMAGE =
  "https://i.pinimg.com/736x/7b/93/79/7b9379f86095f4de8d224ff105a9a167.jpg";

const HERO_WATCH_ID = 4; // الساعة اللي بتظهر كخلفية في الـ Hero (id من products.js)
const FEATURED_ID = 6; // الساعة اللي في قسم Featured

// الساعة اللي بتمثّل كل Collection في قسم "Shop by style"
const COLLECTION_PICS = { classic: 3, sporty: 4, minimal: 7 };

// الوصف القصير تحت كل Collection (إنجليزي)
const STY = {
  classic: "Timeless lines for every outfit, from class to dinner.",
  sporty: "Built to move. Bold, tough and ready for anything.",
  minimal: "Clean and quiet. Nothing extra, nothing missing.",
};

/* ---------- أدوات مساعدة (متعدّلش فيها) ---------- */
const $ = (s) => document.querySelector(s);
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const EGP = (n) => n.toLocaleString("en-US") + " EGP";
