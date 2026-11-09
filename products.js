/* ==========================================================
   products.js  —  بيانات المنتجات (الأسماء، الأسعار، الأوصاف، الصور)
   ده الملف اللي تعدّل فيه أي منتج أو تضيف منتج جديد.

   كل منتج فيه:
   id     رقم فريد (متكررش)
   name   اسم الساعة
   d      الوصف بالعربي
   price  السعر بالجنيه
   style  "classic" أو "sporty" أو "minimal"
   badge  اختياري: "NEW" أو "BEST SELLER"
   c      ألوان الرسمة المؤقتة [العلبة, الوجه, السوار, العقارب]

   لإضافة صور حقيقية:
   1) حط الصورة في assets/products/
   2) أضف السطر ده جوه المنتج:
        img: "assets/products/heritage-38.jpg",
      وصورة تانية اختيارية تظهر كصورة ثانية في صفحة المنتج:
        img2: "assets/products/heritage-38-2.jpg",
   لما تضيف img الرسمة بتتبدّل بالصورة تلقائياً.
   ========================================================== */

const P = [
  {
    id: 1,
    name: "Heritage 38",
    d: "ساعة كلاسيك بوجه أبيض وسوار جلد أسود، أنيقة تليق مع الشغل والخروجات.",
    price: 1890,
    style: "classic",
    badge: "NEW",
    img: "https://i.pinimg.com/1200x/05/87/1b/05871b8c133b9060f95cdd9c06094d1c.jpg",
    size: 100,
    c: ["#c9ccd1", "#fafafa", "#1b1b1b", "#111"],
  },
  {
    id: 2,
    name: "Cairo Slate",
    d: "وجه كحلي غامق وسوار جلد بني، شكل راقي ومناسب للمناسبات.",
    price: 2150,
    style: "classic",
    size: 95,
    c: ["#b8bcc4", "#1c2a4a", "#5b3a24", "#fff"],
    img: "https://i.pinimg.com/736x/1c/fc/af/1cfcaf8b2453eeffb52492ca0246d09a.jpg",
  },
  {
    id: 3,
    name: "Nile Steel",
    d: "سوار معدني وتصميم كلاسيك ثابت، عملية وتتحمل الاستخدام اليومي.",
    price: 2450,
    style: "classic",
    badge: "NEW",
    c: ["#aeb4bc", "#e9edf2", "#9aa0a8", "#111"],
    size: 95,
    img: "https://i.pinimg.com/736x/5f/d7/bd/5fd7bdf8ae4104e4c2c382b28acfe62f.jpg",
  },
  {
    id: 4,
    name: "Sprint",
    d: "ساعة سبورت بوجه أخضر غامق وسوار مطاطي، قوية ومناسبة لليوم النشيط.",
    price: 1790,
    style: "sporty",
    badge: "BEST SELLER",
    c: ["#1a1a1a", "#1F4D3F", "#1a1a1a", "#F4EFE6"],
    size: 73,
    img: "https://i.pinimg.com/1200x/26/db/f5/26dbf51d6827b642145ad21ab8117b23.jpg",
  },
  {
    id: 5,
    name: "Dash",
    d: "إطار ذهبي هادي وسوار أخضر، شكل سبورت بلمسة فخمة.",
    price: 1650,
    style: "sporty",
    c: ["#c9a46a", "#111", "#1F4D3F", "#F4EFE6"],
    img: "https://i.pinimg.com/1200x/29/36/f6/2936f6abe36ae4a73924b7daaae28fab.jpg",
  },
  {
    id: 6,
    name: "Apex",
    d: "تصميم أسود بالكامل بسوار معدني، يجمع بين القوة والطابع الرياضي العصري",
    price: 1950,
    style: "sporty",
    badge: "NEW",
    c: ["#333", "#e8e8e8", "#1f2937", "#111"],
    size: 70,
    img: "https://i.pinimg.com/1200x/33/da/c1/33dac1868537b82195da053dfa206e0a.jpg",
  },
  {
    id: 7,
    name: "Air",
    d: "ساعة مينيمال خفيفة بوجه أبيض وسوار بيج، بسيطة وهادية.",
    price: 1490,
    style: "minimal",
    c: ["#d7d9dd", "#fff", "#e8e4dc", "#111"],
    img: "https://i.pinimg.com/1200x/b4/f4/53/b4f4536790ea801363a0d6dd93071db8.jpg",
  },
  {
    id: 8,
    name: "Void",
    d: "تصميم أسود كامل من غير تفاصيل زيادة، شكل عصري وجريء.",
    price: 1590,
    style: "minimal",
    badge: "NEW",
    size: 100,
    c: ["#111", "#1a1a1a", "#111", "#fff"],
    img: "https://i.pinimg.com/736x/46/1d/fb/461dfb71ed8f2d894fb9b9f589822f24.jpg",
  },
  {
    id: 9,
    name: "Haze",
    d: "وجه فاتح وسوار أخضر غامق، مينيمال بلمسة ألوان مميزة.",
    price: 1390,
    style: "minimal",
    c: ["#c4c7cc", "#f1f3f6", "#1F4D3F", "#111"],
    img: "https://i.pinimg.com/736x/09/87/41/098741d5fc42b415546660be558f754f.jpg",
  },
];

const byId = (id) => P.find((p) => p.id == id);
