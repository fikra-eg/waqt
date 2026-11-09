/* ==========================================================
   watch-art.js  —  صورة الساعة
   pic(p) بترجّع صورة المنتج الحقيقية لو موجودة (img في products.js)،
   ولو مفيش بترسم ساعة SVG مؤقتة بألوان المنتج.
   لما كل المنتجات يبقى ليها صور حقيقية تقدر تمسح الدالة W.
   ========================================================== */

// الرسمة المؤقتة (SVG)
function W(p, zoom) {
  const [c, d, s, h] = p.c,
    sp = p.style == "sporty",
    mn = p.style == "minimal",
    sw = sp ? 70 : mn ? 52 : 60;
  let t = "";
  if (!mn)
    for (let i = 0; i < 12; i++)
      t += `<line x1="100" y1="${sp ? 76 : 78}" x2="100" y2="${i % 3 ? 83 : 87}" stroke="${h}" stroke-width="${i % 3 ? 1.5 : 2.5}" transform="rotate(${i * 30} 100 120)"/>`;
  else t += `<circle cx="100" cy="78" r="2" fill="${h}"/>`;
  const strapTop = `<rect x="${100 - sw / 2}" y="0" width="${sw}" height="76" rx="12" fill="${s}"/>`,
    strapBot = `<rect x="${100 - sw / 2}" y="164" width="${sw}" height="76" rx="12" fill="${s}"/>`;
  const stitch =
    p.id == 2
      ? `<path d="M${100 - sw / 2 + 6} 6V70M${100 + sw / 2 - 6} 6V70" stroke="#c9a77a" stroke-dasharray="3 3" fill="none"/>`
      : "";
  return `<svg viewBox="${zoom ? "55 70 90 100" : "0 0 200 240"}" role="img" aria-label="${p.name} watch" xmlns="http://www.w3.org/2000/svg">${strapTop}${strapBot}${stitch}<rect x="150" y="113" width="7" height="14" rx="2" fill="${c}"/><circle cx="100" cy="120" r="53" fill="${c}"/>${sp ? `<circle cx="100" cy="120" r="48" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="2 5"/>` : ""}<circle cx="100" cy="120" r="${sp ? 43 : 46}" fill="${d}"/>${t}<line x1="100" y1="120" x2="100" y2="94" stroke="${h}" stroke-width="4" stroke-linecap="round" transform="rotate(305 100 120)"/><line x1="100" y1="120" x2="100" y2="80" stroke="${h}" stroke-width="2.6" stroke-linecap="round" transform="rotate(60 100 120)"/>${sp ? `<line x1="100" y1="132" x2="100" y2="78" stroke="#C9A46A" stroke-width="1.4" transform="rotate(170 100 120)"/>` : ""}<circle cx="100" cy="120" r="3.5" fill="${sp ? "#C9A46A" : h}"/></svg>`;
}

// z = 1 يعني الصورة الثانية (في صفحة المنتج)
const pic = (p, z) => {
  const src = z ? p.img2 || p.img : p.img;
  return src
    ? `<img src="${src}" alt="${p.name}" loading="lazy" style="width:${p.size || 82}%;height:${p.size || 82}%;object-fit:contain">`
    : W(p, z);
};
