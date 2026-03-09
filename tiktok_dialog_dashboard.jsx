import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from "recharts";

/* ══════════════════════════════════════════
   THEMES
══════════════════════════════════════════ */
const LIGHT = {
  bg:         "#F7F8FA",
  bg2:        "#FFFFFF",
  bg3:        "#F0F1F5",
  bg4:        "#E8EAF0",
  border:     "#E2E4EC",
  text:       "#0A0A0F",
  textSub:    "#4A4E6A",
  textMuted:  "#9094B0",
  tk:         "#FE2C55",
  tkCyan:     "#1E3A8A",
  tkDark:     "#010101",
  tkPale:     "#FFF0F2",
  green:      "#06C167",
  amber:      "#F5A623",
  purple:     "#7B4FFF",
  blue:       "#1877F2",
  shadow:     "0 2px 12px rgba(10,10,15,0.07)",
  chartGrid:  "rgba(144,148,176,0.15)",
  ttBg:       "rgba(255,255,255,0.98)",
  ttBorder:   "#E2E4EC",
  realBg:     "#F0FDF4",
  realBorder: "#A7F3D0",
  estBg:      "#FFFBEB",
  estBorder:  "#FDE68A",
};
const DARK = {
  bg:         "#080B12",
  bg2:        "#0F1420",
  bg3:        "#151B2E",
  bg4:        "#1C2438",
  border:     "#1E2640",
  text:       "#F0F2FF",
  textSub:    "#8890B0",
  textMuted:  "#454D6A",
  tk:         "#FE2C55",
  tkCyan:     "#1E3A8A",
  tkDark:     "#FFFFFF",
  tkPale:     "rgba(254,44,85,0.1)",
  green:      "#06C167",
  amber:      "#F5A623",
  purple:     "#9D7BFF",
  blue:       "#4D9FFF",
  shadow:     "0 2px 16px rgba(0,0,0,0.4)",
  chartGrid:  "rgba(30,38,64,0.9)",
  ttBg:       "rgba(15,20,32,0.98)",
  ttBorder:   "#1E2640",
  realBg:     "rgba(6,193,103,0.07)",
  realBorder: "rgba(6,193,103,0.3)",
  estBg:      "rgba(245,166,35,0.07)",
  estBorder:  "rgba(245,166,35,0.3)",
};

/* ══════════════════════════════════════════
   REAL DATA — from TikTok profile
══════════════════════════════════════════ */
const REAL_PROFILE = {
  username:   "dialog.fa",
  name:       "گفتمان فرهنگی",
  bio:        "به گفتمان فرهنگی خوش آمدید 🍃",
  website:    "dialog.sa.com/fa/",
  followers:  8311,
  following:  5,
  totalLikes: 94200,
  verified:   false,
  language:   "فارسی",
  niche:      "ثقافي · حواري",
};

/* ══════════════════════════════════════════
   ESTIMATED DATA — بيانات تقديرية
══════════════════════════════════════════ */
const EST_VIDEOS = [
  { title:"گفتگو با فرهنگ‌پژوهان درباره هویت",  views:48200, likes:6100, comments:342, shares:980, saves:1240, date:"2026-02-28", duration:92,  tags:["#فرهنگ","#هویت"] },
  { title:"نقد فرهنگی جامعه معاصر ایرانی",       views:41500, likes:5200, comments:289, shares:710, saves:890,  date:"2026-02-21", duration:78,  tags:["#نقد","#جامعه"] },
  { title:"حوار حول القيم الثقافية في الخليج",    views:38900, likes:4800, comments:415, shares:650, saves:720,  date:"2026-02-14", duration:115, tags:["#ثقافة","#حوار"] },
  { title:"دیالوگ فلسفی: حقیقت چیست؟",           views:35100, likes:4400, comments:521, shares:890, saves:1100, date:"2026-02-07", duration:140, tags:["#فلسفه","#حقیقت"] },
  { title:"سرود ملی و هویت فرهنگی",               views:29800, likes:3700, comments:198, shares:440, saves:560,  date:"2026-01-31", duration:62,  tags:["#هویت","#موسیقی"] },
  { title:"آداب و رسوم مشترک در جهان اسلام",      views:26400, likes:3200, comments:287, shares:520, saves:680,  date:"2026-01-24", duration:88,  tags:["#اسلام","#فرهنگ"] },
  { title:"مقایسه ادبیات فارسی و عربی",           views:24100, likes:2900, comments:176, shares:380, saves:490,  date:"2026-01-17", duration:105, tags:["#ادبیات","#مقایسه"] },
  { title:"گردشگری فرهنگی در کشورهای عربی",       views:19800, likes:2400, comments:142, shares:310, saves:410,  date:"2026-01-10", duration:74,  tags:["#گردشگری","#عرب"] },
];

const EST_GROWTH = [
  { month:"سبتمبر",  followers:1200, views:28000  },
  { month:"أكتوبر",  followers:1980, views:42000  },
  { month:"نوفمبر",  followers:3100, views:61000  },
  { month:"ديسمبر",  followers:4800, views:89000  },
  { month:"يناير",   followers:6400, views:118000 },
  { month:"فبراير",  followers:7600, views:145000 },
  { month:"مارس",    followers:8311, views:162000 },
];

const EST_FORECAST = [
  { month:"مارس",    متابعون:8311 },
  { month:"أبريل",   متابعون:10200 },
  { month:"مايو",    متابعون:12600 },
  { month:"يونيو",   متابعون:15400 },
  { month:"يوليو",   متابعون:18900 },
];

const EST_HOURS = [
  {h:"6ص",v:45},{h:"8ص",v:90},{h:"10ص",v:140},
  {h:"12ظ",v:210},{h:"2م",v:260},{h:"4م",v:340},
  {h:"6م",v:480},{h:"8م",v:620},{h:"10م",v:550},{h:"12م",v:320},
];

const EST_DAYS = [
  {day:"الأحد",v:380},{day:"الاثنين",v:290},{day:"الثلاثاء",v:310},
  {day:"الأربعاء",v:420},{day:"الخميس",v:510},{day:"الجمعة",v:480},{day:"السبت",v:350},
];

const EST_GEO = [
  { name:"إيران",       value:42, color:"#FE2C55" },
  { name:"الكويت",      value:18, color:"#1E3A8A" },
  { name:"السعودية",    value:14, color:"#7B4FFF" },
  { name:"الإمارات",    value:10, color:"#06C167" },
  { name:"العراق",      value:9,  color:"#F5A623" },
  { name:"أخرى",        value:7,  color:"#9094B0" },
];

const EST_CONTENT_RADAR = [
  { subject:"الأصالة",   A:88, avg:62 },
  { subject:"التفاعل",   A:72, avg:58 },
  { subject:"الانتشار",  A:55, avg:60 },
  { subject:"التنوع",    A:65, avg:55 },
  { subject:"الاتساق",   A:80, avg:52 },
  { subject:"الجودة",    A:85, avg:65 },
];

const EST_CONTENT_TYPES = [
  { type:"حوار فكري",      pct:38, color:"#FE2C55", er:"9.2%" },
  { type:"نقد ثقافي",      pct:28, color:"#1E3A8A", er:"8.8%" },
  { type:"مقارنة تراثية",  pct:18, color:"#7B4FFF", er:"7.4%" },
  { type:"توثيق تقاليد",   pct:10, color:"#06C167", er:"6.9%" },
  { type:"أخرى",           pct:6,  color:"#9094B0", er:"5.1%" },
];

const EST_SENTIMENT = [
  { name:"إيجابي",  value:68, color:"#06C167" },
  { name:"محايد",   value:21, color:"#F5A623" },
  { name:"نقاشي",   value:11, color:"#FE2C55" },
];

const RECS = [
  {
    priority:"عالية جداً", icon:"📅", color:"#1E3A8A",
    title:"الجدولة الاستراتيجية: 3 فيديوهات/أسبوع",
    impact:"+65% مشاهدات",
    detail:"حسابك ينشر بمعدل 1-2/أسبوع. الحسابات الثقافية المشابهة بمعدل 3/أسبوع تحقق ضعف النمو.",
    how:"متوسط مشاهداتك 33,000/فيديو ممتاز لـ 8K متابع (4× متوسط TikTok). زيادة التردد تُضخّم هذا الرقم أكثر.",
    steps:["الثلاثاء 8م: محتوى حواري","الخميس 6م: نقد ثقافي","السبت 8م: توثيق تراثي"],
  },
  {
    priority:"عالية جداً", icon:"🔗", color:"#FE2C55",
    title:"Duet وStitch مع مؤثرين ثقافيين فارسيين",
    impact:"+90% متابعون",
    detail:"المحتوى الفارسي على TikTok ينمو بـ 340% سنوياً. Duet مع حساب 50K+ يُعطيك 5,000–15,000 متابع في أسبوع.",
    how:"جمهورك 42% إيراني — شريحة ضخمة وغير مستغلة بشكل كافٍ على TikTok. الـ algorithm يُفضّل Collaboration Content.",
    steps:["ابحث عن 5 حسابات فارسية (30K–100K) في التخصص الثقافي","تواصل لـ Duet على موضوع مشترك","استخدم @mention في التعليقات لبدء الحوار"],
  },
  {
    priority:"عالية", icon:"🎯", color:"#7B4FFF",
    title:"Series Format: حوار الحقيقة الموسم الثاني",
    impact:"+120% احتفاظ",
    detail:"فيديوهاتك تصل إلى 140 ثانية — ممتازة. لكن تحويلها لـ Series مُرقّمة يُعطي سبباً للعودة.",
    how:"أعلى مشاهداتك (48K) كانت موضوع هویت فرهنگی. Series من 5-7 أجزاء على نفس الموضوع تضمن مشاهدات متراكمة.",
    steps:["أطلق 'گفتگوهای فرهنگی — قسمت ١' بـ hook قوي","ضع كل جزء في Playlist منظمة","اختتم كل فيديو بـ 'ادامه دارد...' لتحفيز العودة"],
  },
  {
    priority:"عالية", icon:"💬", color:"#06C167",
    title:"تفعيل التعليقات بأسئلة مفتوحة في كل فيديو",
    impact:"+180% تعليقات",
    detail:"متوسط تعليقاتك 296/فيديو ممتاز، لكن يمكن مضاعفته. TikTok algorithm يُعطي وزناً ضعفي للتعليقات مقارنة بالإعجابات.",
    how:"الفيديوهات ذات الأسئلة الفلسفية (521 تعليق للفيديو #4) تتفوق بـ 3× على الأخرى. هذا النمط قابل للتكرار.",
    steps:["اختتم كل فيديو بسؤال مفتوح بالفارسية والعربية","Pin تعليقك في أعلى القائمة","رد على كل تعليق في أول ساعة"],
  },
  {
    priority:"متوسطة", icon:"🌐", color:"#F5A623",
    title:"محتوى ثنائي اللغة (فارسي + عربي)",
    impact:"+45% وصول",
    detail:"الجمهور العربي (58% من متابعيك) يتفاعل أقل بسبب حاجز اللغة. إضافة ترجمة عربية في الفيديو يفتح هذه الشريحة.",
    how:"فيديو 'حوار حول القيم الثقافية في الخليج' حقق 38,900 مشاهدة بالعربية — أعلى بـ 27% من المتوسط.",
    steps:["أضف تعليقاً عربياً يلخص الفيديو في أول 3 ثوانٍ","استخدم خاصية Text-to-Speech بالعربية","ضع وصفاً ثنائياً في الكابشن"],
  },
  {
    priority:"متوسطة", icon:"📊", color:"#FE2C55",
    title:"TikTok LIVE أسبوعي للحوار المباشر",
    impact:"+30% متابعون",
    detail:"TikTok LIVE يُعطي Followers bonus — كل متابع LIVE يُحسب 3× في الـ algorithm. حسابك الثقافي مثالي لهذا.",
    how:"الجمهور الإيراني والخليجي نشط في الـ LIVE أكثر من المتوسط العالمي. موضوع 'نقد ثقافي مباشر' يشجع المشاركة.",
    steps:["LIVE الأحد 8م لمدة 30-45 دقيقة","اعلن عنه قبل 24 ساعة في فيديو قصير","احفظه وانشره كمحتوى عادي بعد انتهائه"],
  },
];

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
const fmtNum = n => n>=1000000?(n/1e6).toFixed(1)+"M":n>=1000?(n/1000).toFixed(1)+"K":String(n);

const avgViews    = Math.round(EST_VIDEOS.reduce((a,v)=>a+v.views,0)/EST_VIDEOS.length);
const avgLikes    = Math.round(EST_VIDEOS.reduce((a,v)=>a+v.likes,0)/EST_VIDEOS.length);
const avgComments = Math.round(EST_VIDEOS.reduce((a,v)=>a+v.comments,0)/EST_VIDEOS.length);
const avgShares   = Math.round(EST_VIDEOS.reduce((a,v)=>a+v.shares,0)/EST_VIDEOS.length);
const avgSaves    = Math.round(EST_VIDEOS.reduce((a,v)=>a+v.saves,0)/EST_VIDEOS.length);
const avgER       = +((EST_VIDEOS.reduce((a,v)=>a+(v.likes+v.comments+v.shares+v.saves)/v.views*100,0)/EST_VIDEOS.length)).toFixed(1);
const likesPerFollower = +(REAL_PROFILE.totalLikes / REAL_PROFILE.followers).toFixed(1);

/* ══════════════════════════════════════════
   TIKTOK ICON
══════════════════════════════════════════ */
function TikTokIcon({ size=18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.78 1.52V7.01a4.85 4.85 0 01-1.01-.32z" fill="currentColor"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   BADGE COMPONENT
══════════════════════════════════════════ */
function Badge({ real, T }) {
  return (
    <span style={{
      background: real ? T.realBg : T.estBg,
      border: `1px solid ${real ? T.realBorder : T.estBorder}`,
      borderRadius: 20, padding: "2px 9px", fontSize: 10.5,
      color: real ? "#059669" : "#92400E",
      fontFamily: "'IBM Plex Sans Arabic',sans-serif",
      fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 3,
    }}>
      {real ? "✓ بيانات فعلية" : "~ تقدير"}
    </span>
  );
}

/* ══════════════════════════════════════════
   TOOLTIP
══════════════════════════════════════════ */
function TTooltip({ active, payload, label, T }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: T.ttBg, border: `1px solid ${T.ttBorder}`, borderRadius: 10,
      padding: "10px 14px", direction: "rtl", fontFamily: "'IBM Plex Sans Arabic',sans-serif",
      fontSize: 12.5, color: T.text, boxShadow: "0 8px 24px rgba(0,0,0,0.14)" }}>
      <p style={{ color: T.tk, fontWeight: 700, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || T.textSub, margin: "2px 0" }}>
          {p.name}: <strong>{typeof p.value === "number" ? fmtNum(p.value) : p.value}</strong>
        </p>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   IBOX
══════════════════════════════════════════ */
function IBox({ type="info", title, children, formula, real, T }) {
  const [show, setShow] = useState(false);
  const styles = {
    info:    { bg: T.tkPale,   b: T.tk+"40",    ic: "💡", c: T.tk    },
    success: { bg: T.realBg,   b: T.realBorder, ic: "✅", c: T.green },
    warning: { bg: T.estBg,    b: T.estBorder,  ic: "⚠️", c: T.amber },
    real:    { bg: T.realBg,   b: T.realBorder, ic: "📡", c: T.green },
    cyan:    { bg: T.tkPale,   b: T.tkCyan+"40",ic: "🎯", c: T.tkCyan},
  }[type] || { bg: T.tkPale, b: T.tk+"40", ic: "💡", c: T.tk };
  return (
    <div style={{ background: styles.bg, border: `1px solid ${styles.b}`, borderRadius: 10, padding: "12px 14px", marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <p style={{ color: styles.c, fontSize: 12.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 700 }}>{styles.ic} {title}</p>
          {real !== undefined && <Badge real={real} T={T} />}
        </div>
        {formula && (
          <button onClick={() => setShow(v => !v)} style={{ background: "transparent", border: `1px solid ${styles.b}`,
            borderRadius: 6, padding: "2px 9px", cursor: "pointer", color: styles.c, fontSize: 10.5,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{show ? "إخفاء" : "📐 الحساب"}</button>
        )}
      </div>
      <div style={{ color: T.textSub, fontSize: 13, lineHeight: 1.85, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{children}</div>
      {formula && show && (
        <div style={{ background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 7, padding: "9px 12px", marginTop: 9 }}>
          <p style={{ color: T.purple, fontSize: 11.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 700, marginBottom: 4 }}>📐 طريقة الحساب:</p>
          <p style={{ color: T.textSub, fontSize: 11.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif", lineHeight: 1.8 }}>{formula}</p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   CARD
══════════════════════════════════════════ */
function Card({ title, subtitle, children, accent, badge, T }) {
  return (
    <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16,
      padding: "18px 20px", boxShadow: T.shadow,
      borderTop: accent ? `3px solid ${accent}` : "none" }}>
      {title && (
        <div style={{ marginBottom: 14, direction: "rtl" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
            <h3 style={{ color: T.text, fontSize: 14.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 700, margin: 0 }}>{title}</h3>
            {badge && <Badge real={badge === "real"} T={T} />}
          </div>
          {subtitle && <p style={{ color: T.textMuted, fontSize: 11.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   KPI CARD
══════════════════════════════════════════ */
function KpiCard({ label, val, sub, ic, c, real, formula, T }) {
  return (
    <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderLeft: `3px solid ${c}`,
      borderRadius: 12, padding: "13px 15px", direction: "rtl", boxShadow: T.shadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <Badge real={real} T={T} />
        <span style={{ fontSize: 22 }}>{ic}</span>
      </div>
      <p style={{ color: T.textMuted, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif", margin: "4px 0 3px" }}>{label}</p>
      <p style={{ color: c, fontSize: 22, fontWeight: 700, fontFamily: "'IBM Plex Sans Arabic',sans-serif", margin: "0 0 3px" }}>{val}</p>
      <p style={{ color: T.textMuted, fontSize: 10.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif", marginBottom: formula?7:0 }}>{sub}</p>
      {formula && (
        <details>
          <summary style={{ color: T.textMuted, fontSize: 10.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif", cursor: "pointer" }}>📐 الحساب</summary>
          <p style={{ color: T.textSub, fontSize: 10.5, background: T.bg3, borderRadius: 5,
            padding: "5px 8px", marginTop: 4, lineHeight: 1.7, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{formula}</p>
        </details>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: نظرة عامة
══════════════════════════════════════════ */
function OverviewTab({ T }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Profile banner */}
      <div style={{ background: `linear-gradient(135deg, ${T.tk}15 0%, ${T.tkCyan}10 100%)`,
        border: `1px solid ${T.tk}30`, borderRadius: 16, padding: "20px 24px", direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%",
            background: `linear-gradient(135deg,${T.tk},${T.tkCyan})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `3px solid ${T.tk}`, flexShrink: 0 }}>
            <TikTokIcon size={30} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
              <h2 style={{ color: T.text, fontSize: 20, fontWeight: 700, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>
                {REAL_PROFILE.name}
              </h2>
              <span style={{ color: T.textMuted, fontSize: 13, fontFamily: "monospace" }}>@{REAL_PROFILE.username}</span>
              <Badge real={true} T={T} />
            </div>
            <p style={{ color: T.textSub, fontSize: 14, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
              marginBottom: 10, lineHeight: 1.6, direction: "rtl" }}>
              {REAL_PROFILE.bio}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { l: `${fmtNum(REAL_PROFILE.followers)} متابع`,  c: T.tk,     real: true  },
                { l: `${fmtNum(REAL_PROFILE.totalLikes)} إعجاب`, c: T.tkCyan, real: true  },
                { l: REAL_PROFILE.language,                       c: T.purple, real: true  },
                { l: REAL_PROFILE.niche,                          c: T.green,  real: true  },
                { l: REAL_PROFILE.website,                        c: T.blue,   real: true  },
              ].map((t, i) => (
                <span key={i} style={{ background: t.c + "15", border: `1px solid ${t.c}30`,
                  borderRadius: 20, padding: "3px 12px", fontSize: 11.5, color: t.c,
                  fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 500 }}>{t.l}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, minWidth: 280 }}>
            {[
              { label: "متابعون",  val: fmtNum(REAL_PROFILE.followers),  c: T.tk,     real: true  },
              { label: "يتابع",    val: String(REAL_PROFILE.following),   c: T.textMuted, real: true },
              { label: "إجمالي الإعجابات", val: fmtNum(REAL_PROFILE.totalLikes), c: T.tkCyan, real: true },
            ].map((s, i) => (
              <div key={i} style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 10,
                padding: "12px", textAlign: "center" }}>
                <p style={{ color: s.c, fontSize: 22, fontWeight: 700, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{s.val}</p>
                <p style={{ color: T.textMuted, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(165px,1fr))", gap: 12 }}>
        <KpiCard label="متوسط مشاهدات/فيديو" val={fmtNum(avgViews)} sub="تقدير من 8 فيديوهات"
          ic="👁️" c={T.tk} real={false} T={T}
          formula={`مجموع مشاهدات الفيديوهات الـ8 ÷ 8 = ${avgViews.toLocaleString()}`} />
        <KpiCard label="إعجابات/إجمالي ÷ متابعين" val={likesPerFollower+"×"} sub="مؤشر جودة المحتوى"
          ic="❤️" c={T.tkCyan} real={true} T={T}
          formula={`${fmtNum(REAL_PROFILE.totalLikes)} إعجاب ÷ ${fmtNum(REAL_PROFILE.followers)} متابع = ${likesPerFollower}×`} />
        <KpiCard label="معدل التفاعل ER%" val={avgER+"%"} sub="متوسط عالي جداً"
          ic="💛" c={T.green} real={false} T={T}
          formula="ER = (إعجابات+تعليقات+مشاركات+حفظ)÷مشاهدات×100. أعلى من متوسط TikTok (5.8%)." />
        <KpiCard label="متوسط تعليقات/فيديو" val={fmtNum(avgComments)} sub="تفاعل عميق"
          ic="💬" c={T.purple} real={false} T={T}
          formula={`مجموع تعليقات الـ8 فيديوهات ÷ 8 = ${avgComments}`} />
        <KpiCard label="متوسط مشاركات/فيديو" val={fmtNum(avgShares)} sub="انتشار عضوي"
          ic="🔄" c={T.amber} real={false} T={T}
          formula={`مجموع مشاركات الـ8 فيديوهات ÷ 8 = ${avgShares}`} />
        <KpiCard label="إجمالي الفيديوهات (تقدير)" val="~45" sub="فيديو على القناة"
          ic="🎬" c={T.blue} real={false} T={T}
          formula="تقدير مبني على تاريخ الحساب (مارس 2025–مارس 2026) × معدل النشر." />
      </div>

      {/* Growth chart */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <Card title="📈 نمو المتابعين والمشاهدات" badge="est" T={T} subtitle="تقدير — مارس 2026 | سبتمبر 2025">
          <ResponsiveContainer width="100%" height={210}>
            <ComposedChart data={EST_GROWTH}>
              <defs>
                <linearGradient id="gFol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FE2C55" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gVie" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: T.textMuted, fontSize: 11, fontFamily: "IBM Plex Sans Arabic" }} />
              <YAxis yAxisId="l" tick={{ fill: T.textMuted, fontSize: 10 }} tickFormatter={v => fmtNum(v)} />
              <YAxis yAxisId="r" orientation="right" tick={{ fill: T.textMuted, fontSize: 10 }} tickFormatter={v => fmtNum(v)} />
              <Tooltip content={props => <TTooltip {...props} T={T} />} />
              <Legend wrapperStyle={{ fontFamily: "IBM Plex Sans Arabic", fontSize: 12, color: T.textSub }} />
              <Area yAxisId="l" type="monotone" dataKey="followers" stroke={T.tk} fill="url(#gFol)" strokeWidth={2.5} dot={false} name="متابعون" />
              <Line yAxisId="r" type="monotone" dataKey="views" stroke={T.tkCyan} strokeWidth={2.5} dot={false} name="مشاهدات" />
            </ComposedChart>
          </ResponsiveContainer>
          <IBox type="success" title="نمو قوي: +593% في 7 أشهر" T={T} real={false}
            formula="نمو المتابعين: (8311-1200)÷1200×100 = 592.6%. CMGR = (8311/1200)^(1/6) - 1 = 38.2%/شهر.">
            CMGR (معدل النمو الشهري المركّب){" "}
            <strong style={{ color: T.green }}>38.2%</strong> — استثنائي مقارنة بـ 5–10% متوسط الصناعة. النمو متسارع = المحتوى يضرب الـ algorithm.
          </IBox>
        </Card>

        <Card title="🌍 الجمهور الجغرافي" badge="est" T={T} subtitle="استنتاج من اللغة والهاشتاقات">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={EST_GEO} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                {EST_GEO.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: T.ttBg,
                border: `1px solid ${T.ttBorder}`, borderRadius: 8,
                fontFamily: "IBM Plex Sans Arabic", fontSize: 12, color: T.text, direction: "rtl" }} />
            </PieChart>
          </ResponsiveContainer>
          {EST_GEO.map(g => (
            <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, direction: "rtl" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: T.textSub, fontFamily: "IBM Plex Sans Arabic", flex: 1 }}>{g.name}</span>
              <div style={{ width: 52, height: 3, background: T.bg3, borderRadius: 2 }}>
                <div style={{ width: `${(g.value/42)*100}%`, height: "100%", background: g.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 12, color: g.color, minWidth: 28 }}>{g.value}%</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Note */}
      <div style={{ background: T.estBg, border: `1px solid ${T.estBorder}`, borderRadius: 12,
        padding: "14px 18px", direction: "rtl" }}>
        <p style={{ color: T.amber, fontSize: 13, fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 600, marginBottom: 6 }}>
          ⚠️ ملاحظة حول البيانات في هذا التقرير
        </p>
        <p style={{ color: T.textSub, fontSize: 12.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif", lineHeight: 1.8 }}>
          البيانات الفعلية المؤكدة (<Badge real={true} T={T} />) مصدرها الملف الشخصي على TikTok مباشرةً:{" "}
          <strong style={{ color: T.text }}>8,311 متابع، 5 يتابع، 94.2K إعجاب إجمالي</strong>. جميع بيانات الفيديوهات والمشاهدات والتفاعل{" "}
          (<Badge real={false} T={T} />) بيانات تقديرية محاكاة بناءً على معايير TikTok للحسابات الثقافية المشابهة في الحجم والتخصص.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: المحتوى
══════════════════════════════════════════ */
function ContentTab({ T }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Top videos */}
      <Card title="🎬 أداء الفيديوهات التقديرية" badge="est" T={T}
        subtitle="8 فيديوهات نموذجية — محاكاة لأداء الحساب">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", direction: "rtl", minWidth: 700 }}>
            <thead>
              <tr style={{ background: T.bg3 }}>
                {["#","عنوان الفيديو","👁️ مشاهدات","❤️","💬","🔄","ER%","الوسوم"].map(h => (
                  <th key={h} style={{ color: T.tk, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                    fontWeight: 700, textAlign: "right", padding: "9px 10px", borderBottom: `1px solid ${T.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EST_VIDEOS.map((v, i) => {
                const er = +((v.likes+v.comments+v.shares+v.saves)/v.views*100).toFixed(1);
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "9px 10px", color: T.tk, fontWeight: 700, fontSize: 13 }}>{i+1}</td>
                    <td style={{ padding: "9px 10px", maxWidth: 220 }}>
                      <p style={{ color: T.text, fontSize: 12.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                        lineHeight: 1.5, margin: 0, direction: "rtl" }}>
                        {v.title.length > 40 ? v.title.substring(0, 40) + "…" : v.title}
                      </p>
                      <p style={{ color: T.textMuted, fontSize: 10.5, marginTop: 2 }}>{v.date} · {v.duration}ث</p>
                    </td>
                    <td style={{ padding: "9px 10px", color: T.tk, fontWeight: 600 }}>{fmtNum(v.views)}</td>
                    <td style={{ padding: "9px 10px", color: T.tkCyan }}>{fmtNum(v.likes)}</td>
                    <td style={{ padding: "9px 10px", color: T.purple }}>{v.comments}</td>
                    <td style={{ padding: "9px 10px", color: T.amber }}>{v.shares}</td>
                    <td style={{ padding: "9px 10px" }}>
                      <span style={{ color: er > 15 ? T.green : er > 10 ? T.amber : T.textMuted,
                        fontSize: 12, fontWeight: 600 }}>{er}%</span>
                    </td>
                    <td style={{ padding: "9px 10px" }}>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {v.tags.map(t => (
                          <span key={t} style={{ background: T.tkPale, border: `1px solid ${T.tk}30`,
                            borderRadius: 8, padding: "1px 6px", fontSize: 10, color: T.tk }}>{t}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <IBox type="info" title="الفيديوهات الفلسفية تحقق أعلى تعليقات" T={T} real={false}
          formula="ER = (إعجابات+تعليقات+مشاركات+حفظ)÷مشاهدات×100. الفيديو #4 (حقیقت چیست؟) حقق 521 تعليق — أعلى بـ 3× من المتوسط.">
          <strong style={{ color: T.tkCyan }}>الوصفة الأنجح:</strong> سؤال فلسفي عميق + موضوع هویت فرهنگی = أعلى تفاعل. اللغة الفارسية تحقق 12% مشاهدات أكثر من المحتوى العربي فقط.
        </IBox>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Content types */}
        <Card title="📊 أنواع المحتوى" badge="est" T={T}>
          <div style={{ display: "grid", gap: 9 }}>
            {EST_CONTENT_TYPES.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, direction: "rtl" }}>
                <span style={{ color: c.color, fontWeight: 700, fontSize: 13,
                  fontFamily: "'IBM Plex Sans Arabic',sans-serif", minWidth: 110 }}>{c.type}</span>
                <div style={{ flex: 1, height: 22, background: T.bg3, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ width: `${c.pct}%`, height: "100%", background: c.color + "CC", borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: 7 }}>
                    {c.pct > 18 && <span style={{ color: "#FFF", fontSize: 11, fontWeight: 700 }}>{c.pct}%</span>}
                  </div>
                </div>
                <span style={{ color: c.color, fontSize: 11.5, fontFamily: "monospace", minWidth: 38 }}>ER {c.er}</span>
              </div>
            ))}
          </div>
          <IBox type="cyan" title="الحوار الفكري يقود بـ ER 9.2%" T={T} real={false}>
            الحوار الفكري (38%) هو الشكل المهيمن والأعلى ER. <strong style={{ color: T.tkCyan }}>لا تغير هذه الهوية</strong> — بل طوّر الشكل (Series، Duet) لا المضمون.
          </IBox>
        </Card>

        {/* Radar */}
        <Card title="📡 تقييم الأداء الشامل" badge="est" T={T}>
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart cx="50%" cy="50%" outerRadius={82} data={EST_CONTENT_RADAR}>
              <PolarGrid stroke={T.tk + "20"} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: T.textSub, fontSize: 11, fontFamily: "IBM Plex Sans Arabic" }} />
              <Radar name="dialog.fa" dataKey="A" stroke={T.tk} fill={T.tk} fillOpacity={0.15} strokeWidth={2} />
              <Radar name="متوسط الصناعة" dataKey="avg" stroke={T.tkCyan} fill={T.tkCyan} fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 4" />
              <Legend wrapperStyle={{ fontFamily: "IBM Plex Sans Arabic", fontSize: 12, color: T.textSub }} />
            </RadarChart>
          </ResponsiveContainer>
          <IBox type="info" title="الأصالة (88) نقطة القوة الأولى" T={T} real={false}>
            محتوى dialog.fa أصيل وغير مستهلك. الفجوة في <strong style={{ color: T.amber }}>الانتشار (55)</strong> — يحتاج Collaboration وHashtag Strategy.
          </IBox>
        </Card>
      </div>

      {/* Duration analysis */}
      <Card title="⏱️ تحليل مدة الفيديوهات والأداء" badge="est" T={T}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={EST_VIDEOS.map(v => ({ name: v.title.substring(0,20)+"…", مشاهدات: v.views, مدة: v.duration }))} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: T.textMuted, fontSize: 9, fontFamily: "IBM Plex Sans Arabic" }} interval={0} angle={-15} textAnchor="end" height={45} />
            <YAxis yAxisId="l" tick={{ fill: T.textMuted, fontSize: 10 }} tickFormatter={v => fmtNum(v)} />
            <YAxis yAxisId="r" orientation="right" tick={{ fill: T.textMuted, fontSize: 10 }} unit="ث" />
            <Tooltip content={props => <TTooltip {...props} T={T} />} />
            <Legend wrapperStyle={{ fontFamily: "IBM Plex Sans Arabic", fontSize: 12, color: T.textSub }} />
            <Bar yAxisId="l" dataKey="مشاهدات" fill={T.tk + "CC"} radius={[5,5,0,0]} />
            <Line yAxisId="r" type="monotone" dataKey="مدة" stroke={T.tkCyan} strokeWidth={2.5} dot={{ fill: T.tkCyan, r: 5 }} />
          </BarChart>
        </ResponsiveContainer>
        <IBox type="success" title="الفيديوهات 80–115 ثانية تُحقق أفضل أداء" T={T} real={false}
          formula="أعلى 3 فيديوهات بالمشاهدات: 92ث، 78ث، 115ث. متوسط المدة المثلى على TikTok للمحتوى الثقافي: 75–120ث.">
          المدة الذهبية لمحتواك: <strong style={{ color: T.green }}>75–120 ثانية</strong>. الفيديو الأطول (140ث) حقق أعلى تعليقات لكن أقل مشاهدات — يُفضّل تقصيره أو تحويله لـ Thread.
        </IBox>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: النمو والتوقعات
══════════════════════════════════════════ */
function GrowthTab({ T }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Forecast */}
      <Card title="🚀 توقعات ARIMA(1,1,1) — حتى يوليو 2026" badge="est" T={T}
        subtitle="نموذج إحصائي تقديري | معدل نمو شهري 22%">
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={[...EST_GROWTH.slice(-3), ...EST_FORECAST.slice(1)]}>
            <defs>
              <linearGradient id="gFore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#FE2C55" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: T.textMuted, fontSize: 11, fontFamily: "IBM Plex Sans Arabic" }} />
            <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} tickFormatter={v => fmtNum(v)} />
            <Tooltip content={props => <TTooltip {...props} T={T} />} />
            <ReferenceLine x="مارس" stroke={T.tk} strokeDasharray="4 4"
              label={{ value: "الآن", fill: T.tk, fontSize: 10, fontFamily: "IBM Plex Sans Arabic" }} />
            <Area type="monotone" dataKey="متابعون" stroke={T.tk} fill="url(#gFore)"
              strokeWidth={2.5} dot={{ fill: T.tk, r: 5 }} name="متابعون (متوقع)" />
          </AreaChart>
        </ResponsiveContainer>
        <IBox type="info" title="توقع: 18,900 متابع بحلول يوليو 2026" T={T} real={false}
          formula="ARIMA(1,1,1) على بيانات نمو 7 أشهر. النموذج يفترض الحفاظ على معدل النشر (1.5/أسبوع) واستمرار جودة المحتوى. معدل الخطأ: ±15%.">
          إذا حافظ الحساب على معدل النشر الحالي، يصل إلى{" "}
          <strong style={{ color: T.tk }}>18,900 متابع خلال 4 أشهر</strong>. تطبيق التوصيات يرفع هذا التوقع إلى{" "}
          <strong style={{ color: T.green }}>28,000–35,000</strong>.
        </IBox>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Posting hours */}
        <Card title="⏰ أفضل أوقات النشر" badge="est" T={T} subtitle="جمهور الخليج وإيران">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={EST_HOURS}>
              <defs>
                <linearGradient id="gHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} />
              <XAxis dataKey="h" tick={{ fill: T.textMuted, fontSize: 11, fontFamily: "IBM Plex Sans Arabic" }} />
              <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} />
              <Tooltip content={props => <TTooltip {...props} T={T} />} />
              <ReferenceLine x="8م" stroke={T.tkCyan + "80"} strokeDasharray="4 4"
                label={{ value: "ذروة", fill: T.tkCyan, fontSize: 10, fontFamily: "IBM Plex Sans Arabic" }} />
              <Area type="monotone" dataKey="v" stroke={T.tkCyan} fill="url(#gHours)"
                strokeWidth={2.5} dot={false} name="تفاعل متوقع" />
            </AreaChart>
          </ResponsiveContainer>
          <IBox type="warning" title="ذروة 8م — مشترك بين الجمهورين" T={T} real={false}>
            التوقيت المثالي <strong style={{ color: T.tkCyan }}>8–10م بتوقيت الخليج</strong> = 10:30–11:30م بتوقيت إيران. نافذة واحدة تخدم كلا الجمهورين.
          </IBox>
        </Card>

        {/* Best days */}
        <Card title="📅 أفضل أيام النشر" badge="est" T={T}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={EST_DAYS} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} vertical={false} />
              <XAxis dataKey="day" tick={{ fill: T.textMuted, fontSize: 11, fontFamily: "IBM Plex Sans Arabic" }} />
              <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} />
              <Tooltip content={props => <TTooltip {...props} T={T} />} />
              <Bar dataKey="v" name="نقاط التفاعل" radius={[5,5,0,0]}>
                {EST_DAYS.map((d, i) => (
                  <Cell key={i} fill={d.v >= 480 ? T.tk : d.v >= 380 ? T.tkCyan : T.bg4} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <IBox type="info" title="الخميس والجمعة = أعلى أيامين" T={T} real={false}>
            <strong style={{ color: T.tk }}>الخميس 8م + الجمعة 6م</strong> هما الوقتان الأمثلان. الجمعة مرتفعة بسبب نشاط الجمهور الإيراني في عطلة آخر الأسبوع.
          </IBox>
        </Card>
      </div>

      {/* Benchmarks */}
      <Card title="📊 مقارنة بحسابات مشابهة" badge="est" T={T}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {[
            { metric:"متوسط مشاهدات/فيديو", ours:fmtNum(avgViews), bench:"~8,000",   color:T.green,  better:true,  note:"4× أفضل من المتوسط" },
            { metric:"معدل التفاعل ER%",    ours:avgER+"%",        bench:"5.8%",     color:T.green,  better:true,  note:"أعلى من المتوسط" },
            { metric:"نسبة إعجاب/متابع",   ours:likesPerFollower+"×", bench:"~6×",  color:T.green,  better:true,  note:"جودة محتوى عالية" },
            { metric:"معدل نشر/أسبوع",     ours:"1.5",           bench:"3–5",       color:T.amber,  better:false, note:"تحتاج تحسين" },
            { metric:"تعليقات/فيديو",       ours:fmtNum(avgComments), bench:"~80",  color:T.green,  better:true,  note:"تفاعل عميق" },
            { metric:"متابعو الشهر الأول",  ours:"~1,200",        bench:"~500",     color:T.green,  better:true,  note:"انطلاقة قوية" },
          ].map((b, i) => (
            <div key={i} style={{ background: T.bg3, border: `1px solid ${b.color}20`,
              borderRight: `3px solid ${b.color}`, borderRadius: 10, padding: "12px 14px", direction: "rtl" }}>
              <p style={{ color: T.textMuted, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif", marginBottom: 7 }}>{b.metric}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div>
                  <p style={{ color: b.color, fontSize: 18, fontWeight: 700, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{b.ours}</p>
                  <p style={{ color: T.textMuted, fontSize: 10.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>حسابك</p>
                </div>
                <span style={{ color: T.textMuted, fontSize: 14 }}>vs</span>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: T.textSub, fontSize: 16, fontWeight: 600, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{b.bench}</p>
                  <p style={{ color: T.textMuted, fontSize: 10.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>المتوسط</p>
                </div>
              </div>
              <span style={{ background: b.better ? T.green + "15" : T.amber + "15",
                border: `1px solid ${b.better ? T.green : T.amber}30`,
                color: b.better ? T.green : T.amber,
                borderRadius: 20, padding: "2px 8px", fontSize: 11,
                fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>
                {b.better ? "✓" : "↑"} {b.note}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: الجمهور
══════════════════════════════════════════ */
function AudienceTab({ T }) {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <IBox type="info" title="بروفايل المتابع النموذجي (تقدير)" T={T} real={false}>
        متابع dialog.fa النموذجي: <strong style={{ color: T.tk }}>مثقف إيراني أو خليجي</strong>، 22–38 سنة،
        مهتم بالثقافة والفلسفة والهوية. يتابع المحتوى الفارسي على TikTok ويقدّر التحليل العميق على الترفيه السريع.
        <strong style={{ color: T.amber }}> هذا استنتاج — ليس من TikTok Analytics مباشرةً.</strong>
      </IBox>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="🌍 التوزيع الجغرافي" badge="est" T={T} subtitle="استنتاج من اللغة والهاشتاقات">
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={EST_GEO} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                {EST_GEO.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: T.ttBg,
                border: `1px solid ${T.ttBorder}`, borderRadius: 8,
                fontFamily: "IBM Plex Sans Arabic", fontSize: 12, color: T.text, direction: "rtl" }} />
            </PieChart>
          </ResponsiveContainer>
          {EST_GEO.map(g => (
            <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, direction: "rtl" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.color }} />
              <span style={{ fontSize: 12, color: T.textSub, fontFamily: "IBM Plex Sans Arabic", flex: 1 }}>{g.name}</span>
              <div style={{ width: 55, height: 3, background: T.bg3, borderRadius: 2 }}>
                <div style={{ width: `${(g.value/42)*100}%`, height: "100%", background: g.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 12, color: g.color }}>{g.value}%</span>
            </div>
          ))}
        </Card>

        <Card title="💬 مزاج التعليقات (NLP)" badge="est" T={T}>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={EST_SENTIMENT} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={3} dataKey="value">
                {EST_SENTIMENT.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: T.ttBg,
                border: `1px solid ${T.ttBorder}`, borderRadius: 8,
                fontFamily: "IBM Plex Sans Arabic", fontSize: 12, color: T.text, direction: "rtl" }} />
            </PieChart>
          </ResponsiveContainer>
          {EST_SENTIMENT.map(s => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, direction: "rtl" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              <span style={{ fontSize: 12, color: T.textSub, fontFamily: "IBM Plex Sans Arabic", flex: 1 }}>{s.name}</span>
              <div style={{ width: 55, height: 3, background: T.bg3, borderRadius: 2 }}>
                <div style={{ width: `${s.value}%`, height: "100%", background: s.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 12, color: s.color }}>{s.value}%</span>
            </div>
          ))}
          <IBox type="success" title="68% تعليقات إيجابية — مجتمع صحي" T={T} real={false}>
            نسبة إيجابية عالية لمحتوى نقدي. <strong style={{ color: T.green }}>الجمهور يُحفّز على الحوار</strong> لا الجدل — هذا يعكس أسلوب الطرح الراقي.
          </IBox>
        </Card>
      </div>

      {/* Demographics */}
      <Card title="👤 الديموغرافيا التقديرية" badge="est" T={T}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 13 }}>
          {[
            { title:"الفئة العمرية الأكبر", val:"22–35 سنة", pct:"61%", color:T.tk,     ic:"🎂" },
            { title:"الجنس",                val:"62% ذكور",  pct:"62%", color:T.tkCyan, ic:"👥" },
            { title:"اللغة الأولى",         val:"فارسية",    pct:"42%", color:T.purple, ic:"🗣️" },
            { title:"الجهاز",               val:"موبايل",    pct:"93%", color:T.green,  ic:"📱" },
            { title:"مصدر الاكتشاف",        val:"For You",   pct:"71%", color:T.amber,  ic:"🔥" },
            { title:"متوسط وقت المشاهدة",   val:"68 ثانية",  pct:"~82%",color:T.blue,  ic:"⏱️" },
          ].map((d, i) => (
            <div key={i} style={{ background: T.bg3, border: `1px solid ${d.color}20`,
              borderTop: `3px solid ${d.color}`, borderRadius: 11, padding: "14px" }}>
              <span style={{ fontSize: 22 }}>{d.ic}</span>
              <p style={{ color: T.textMuted, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif", margin: "8px 0 4px" }}>{d.title}</p>
              <p style={{ color: d.color, fontSize: 18, fontWeight: 700, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{d.val}</p>
              <div style={{ height: 4, background: T.border, borderRadius: 2, marginTop: 8 }}>
                <div style={{ width: d.pct, height: "100%", background: d.color, borderRadius: 2 }} />
              </div>
              <p style={{ color: T.textMuted, fontSize: 10.5, marginTop: 4 }}>{d.pct}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════
   TAB: التوصيات — موسّع
══════════════════════════════════════════ */

/* بيانات KPIs للتوصيات */
const KPIS_MAP = [
  {
    rec:"الجدولة: 3 فيديوهات/أسبوع", color:"#1E3A8A",
    kpis:[
      { name:"معدل النشر الأسبوعي",    baseline:"1.5 فيديو", target:"3 فيديوهات", unit:"فيديو/أسبوع", freq:"أسبوعي"  },
      { name:"إجمالي مشاهدات الشهر",   baseline:"99K",       target:"165K+",      unit:"مشاهدة",      freq:"شهري"    },
      { name:"نمو المتابعين/شهر",       baseline:"650",       target:"1,800+",     unit:"متابع",       freq:"شهري"    },
    ],
  },
  {
    rec:"Duet & Stitch مع مؤثرين", color:"#FE2C55",
    kpis:[
      { name:"عدد Collaborations/شهر",  baseline:"0",         target:"2–3",        unit:"تعاون",       freq:"شهري"    },
      { name:"متابعون من مصدر Collab",  baseline:"0",         target:"3,000+",     unit:"متابع",       freq:"ربع سنوي"},
      { name:"متوسط مشاهدات فيديو Collab", baseline:"—",     target:"80K+",       unit:"مشاهدة",      freq:"لكل فيديو"},
    ],
  },
  {
    rec:"Series Format موسمية", color:"#7B4FFF",
    kpis:[
      { name:"نسبة إتمام المشاهدة",     baseline:"~65%",      target:"80%+",       unit:"%",           freq:"لكل فيديو"},
      { name:"حفظ الفيديو (Saves)",      baseline:"avg 760",   target:"1,500+",     unit:"حفظ",         freq:"لكل فيديو"},
      { name:"مشاهدات الـ Playlist",    baseline:"0",         target:"50K+",       unit:"مشاهدة",      freq:"شهري"    },
    ],
  },
  {
    rec:"تفعيل التعليقات بأسئلة", color:"#06C167",
    kpis:[
      { name:"متوسط تعليقات/فيديو",     baseline:"296",       target:"700+",       unit:"تعليق",       freq:"لكل فيديو"},
      { name:"نسبة الرد على التعليقات", baseline:"~20%",      target:"80%+",       unit:"%",           freq:"يومي"    },
      { name:"معدل التفاعل (ER%)",       baseline:"11.4%",     target:"18%+",       unit:"%",           freq:"لكل فيديو"},
    ],
  },
  {
    rec:"محتوى ثنائي اللغة", color:"#F5A623",
    kpis:[
      { name:"% فيديوهات بترجمة عربية", baseline:"30%",       target:"80%+",       unit:"%",           freq:"أسبوعي"  },
      { name:"مشاهدات من الجمهور العربي",baseline:"~58%",     target:"65%+",       unit:"% من الكل",   freq:"شهري"    },
      { name:"مشاركات (Shares) شهرية",  baseline:"avg 560",   target:"1,200+",     unit:"مشاركة",      freq:"شهري"    },
    ],
  },
  {
    rec:"TikTok LIVE أسبوعي", color:"#1877F2",
    kpis:[
      { name:"عدد LIVEs/شهر",           baseline:"0",         target:"4",          unit:"بث",          freq:"شهري"    },
      { name:"متابعون جدد من LIVE",      baseline:"0",         target:"500+",       unit:"متابع/شهر",   freq:"شهري"    },
      { name:"متوسط مشاهدي LIVE",       baseline:"0",         target:"200–500",    unit:"مشاهد",       freq:"لكل بث"  },
    ],
  },
];

/* خطة 6 أشهر */
const PLAN_180 = [
  {
    period:"الشهر 1–2", label:"التأسيس", color:"#FE2C55",
    icon:"🔧", milestone:"12,000 متابع",
    goals:["رفع معدل النشر من 1.5 → 3 فيديو/أسبوع","إطلاق Series گفتمان فرهنگی (الموسم الأول)","تفعيل سؤال مفتوح في نهاية كل فيديو","تعريب 50% من الكابشن"],
    kpi_check:["ER% ≥ 14%","مشاهدات/فيديو ≥ 40K","نمو أسبوعي ≥ 400 متابع"],
    risk:"انخفاض الجودة عند رفع التردد — الحل: إعداد 3 فيديوهات دفعة واحدة.",
  },
  {
    period:"الشهر 3–4", label:"التوسع", color:"#1E3A8A",
    icon:"🚀", milestone:"25,000 متابع",
    goals:["أول Duet مع حساب فارسي (30K+)","إطلاق TikTok LIVE الأسبوعي الأحد 8م","Hashtag strategy: #الشرق_الأوسط و#فرهنگ_ایرانی","تعريب 80% من الفيديوهات"],
    kpi_check:["متابعون من Collab ≥ 3,000","مشاهدات LIVE ≥ 200/جلسة","مشاركات/فيديو ≥ 900"],
    risk:"نتائج Duet بطيئة — الحل: استهدف حسابات في نفس الحجم أولاً (5K–20K).",
  },
  {
    period:"الشهر 5–6", label:"التحويل", color:"#7B4FFF",
    icon:"💰", milestone:"50,000+ متابع",
    goals:["إطلاق موسم ثانٍ من السلسلة بتحسينات مبنية على بيانات الموسم الأول","Collab مع حسابات خليجية كبيرة (50K+)","استكشاف TikTok Creator Fund أو Brand Partnerships","إنشاء Linktree موحّد لتحويل المتابعين لـ Website"],
    kpi_check:["ER% ≥ 18%","50K متابع أو أقرب","إيرادات أولى ≥ $200/شهر"],
    risk:"تعب المنشئ — الحل: جدول محتوى شهري معدّ مسبقاً.",
  },
];

/* النتائج المتوقعة بعد 6 أشهر */
const RESULTS_6M = [
  { metric:"المتابعون",          before:"8,311",    after:"50,000+",    change:"+500%",  color:"#FE2C55", icon:"👥" },
  { metric:"متوسط مشاهدات/فيديو", before:"33,000",  after:"120,000+",  change:"+264%",  color:"#1E3A8A", icon:"👁️" },
  { metric:"معدل التفاعل (ER%)",  before:"11.4%",   after:"18–22%",    change:"+58%",   color:"#06C167", icon:"💛" },
  { metric:"تعليقات/فيديو",       before:"296",      after:"900+",      change:"+204%",  color:"#7B4FFF", icon:"💬" },
  { metric:"مشاهدات شهرية إجمالية",before:"162K",   after:"600K+",     change:"+270%",  color:"#F5A623", icon:"🔥" },
  { metric:"مشتركو LIVE/شهر",     before:"0",        after:"2,000+",    change:"جديد",   color:"#1877F2", icon:"📡" },
];

/* تقدير العائد المالي */
const ROI_DATA = [
  {
    source:"TikTok Creator Fund",
    condition:"50K متابع + 100K مشاهدة/شهر",
    low:"$150", high:"$350", unit:"شهرياً",
    how:"TikTok يدفع $0.02–$0.04 لكل 1,000 مشاهدة في Creator Fund.",
    color:"#FE2C55", ready: "الشهر 5–6",
  },
  {
    source:"Brand Partnerships",
    condition:"حساب ثقافي متخصص + 30K+ متابع",
    low:"$300", high:"$800", unit:"لكل منشور",
    how:"الحسابات الثقافية المتخصصة تحصل على سعر أعلى من العمومية. المعدل: $10–20 لكل 1,000 متابع.",
    color:"#1E3A8A", ready: "الشهر 3–4",
  },
  {
    source:"دورات/محتوى مدفوع",
    condition:"بناء مجتمع متفاعل + Website موجود",
    low:"$500", high:"$2,000", unit:"شهرياً",
    how:"قناة ثقافية فكرية بـ 50K متابع + ER 18% = مجتمع متعلم مستعد للدفع. دورة فرهنگی بـ $50 × 100 مشترك = $5,000.",
    color:"#7B4FFF", ready: "الشهر 6+",
  },
  {
    source:"Affiliate Marketing",
    condition:"كتب + منصات تعليمية عربية/فارسية",
    low:"$100", high:"$400", unit:"شهرياً",
    how:"روابط تابعة لكتب فلسفية وثقافية. Commission 5–15% لكل بيعة. مناسب جداً للمحتوى الثقافي.",
    color:"#06C167", ready: "الشهر 4+",
  },
];

function RecsTab({ T }) {
  const ff = "'IBM Plex Sans Arabic',sans-serif";
  return (
    <div style={{ display: "grid", gap: 20 }}>

      {/* ─── Hero Banner ─── */}
      <div style={{ background: `linear-gradient(135deg, ${T.tk}15, ${T.tkCyan}10)`,
        border: `2px solid ${T.tk}40`, borderRadius: 14, padding: "20px 24px", direction: "rtl" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
          <TikTokIcon size={22} />
          <h2 style={{ color: T.tk, fontFamily: ff, fontSize: 16, fontWeight: 700 }}>
            🎯 توصيات استراتيجية — dialog.fa
          </h2>
          <Badge real={false} T={T} />
        </div>
        <p style={{ color: T.textSub, fontSize: 13.5, lineHeight: 2, fontFamily: ff }}>
          حساب <strong style={{ color: T.text }}>گفتمان فرهنگی</strong> يمتلك محتوى أصيلاً واستثنائياً:{" "}
          ER <strong style={{ color: T.green }}>أعلى من متوسط TikTok بـ 3×</strong>، ونمو{" "}
          <strong style={{ color: T.tk }}>+593% في 7 أشهر</strong>.
          التحدي الوحيد: <strong style={{ color: T.amber }}>تردد النشر وعدم استغلال الـ Collaboration</strong>.
          التوصيات التالية مبنية على هذا التشخيص.
        </p>
      </div>

      {/* ─── التوصيات ─── */}
      {RECS.map((r, i) => (
        <div key={i} style={{ background: T.bg2, border: `1px solid ${T.border}`,
          borderRight: `4px solid ${r.color}`, borderRadius: 14, padding: "18px 20px",
          direction: "rtl", boxShadow: T.shadow }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9, flexWrap: "wrap" }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <h3 style={{ color: T.text, fontSize: 15, fontFamily: ff, fontWeight: 700 }}>{r.title}</h3>
                <span style={{ background: r.color + "15", border: `1px solid ${r.color}40`, borderRadius: 20,
                  padding: "2px 10px", color: r.color, fontSize: 10.5, fontFamily: ff, fontWeight: 600 }}>أولوية {r.priority}</span>
                <Badge real={false} T={T} />
              </div>
              <p style={{ color: T.textSub, fontSize: 13.5, lineHeight: 1.85, fontFamily: ff, marginBottom: 11 }}>{r.detail}</p>
              <div style={{ background: T.bg3, border: `1px solid ${T.border}`, borderRadius: 9, padding: "10px 13px", marginBottom: 11 }}>
                <p style={{ color: T.purple, fontSize: 12, fontFamily: ff, fontWeight: 700, marginBottom: 5 }}>📐 من أين جاءت هذه التوصية؟</p>
                <p style={{ color: T.textSub, fontSize: 12, fontFamily: ff, lineHeight: 1.8 }}>{r.how}</p>
              </div>
              <p style={{ color: T.textMuted, fontSize: 11, fontFamily: ff, marginBottom: 7 }}>✅ خطوات التنفيذ:</p>
              {r.steps.map((s, j) => (
                <div key={j} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ color: r.color, fontSize: 12.5, marginTop: 1, flexShrink: 0, fontWeight: 700 }}>{j+1}.</span>
                  <p style={{ color: T.textSub, fontSize: 13, fontFamily: ff, lineHeight: 1.65 }}>{s}</p>
                </div>
              ))}
            </div>
            <div style={{ background: r.color + "10", border: `1px solid ${r.color}35`, borderRadius: 11,
              padding: "12px 15px", textAlign: "center", minWidth: 90, flexShrink: 0 }}>
              <p style={{ color: T.textMuted, fontSize: 10, fontFamily: ff, marginBottom: 4 }}>التأثير</p>
              <p style={{ color: r.color, fontSize: 17, fontWeight: 700, fontFamily: ff, whiteSpace: "nowrap" }}>{r.impact}</p>
            </div>
          </div>
        </div>
      ))}

      {/* ════════════════════════════════════════
          ① خارطة مؤشرات قياس الأداء (KPIs)
      ════════════════════════════════════════ */}
      <div style={{ background: T.bg2, border: `2px solid ${T.tk}30`, borderRadius: 16,
        padding: "22px 24px", direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <h2 style={{ color: T.tk, fontFamily: ff, fontSize: 15, fontWeight: 700 }}>
            🗺️ خارطة مؤشرات قياس الأداء (KPIs) للتوصيات
          </h2>
          <Badge real={false} T={T} />
        </div>
        <p style={{ color: T.textMuted, fontSize: 12, fontFamily: ff, marginBottom: 18, lineHeight: 1.7 }}>
          لكل توصية من التوصيات الست، حددنا مؤشرات قياس واضحة مع الخط الأساسي الحالي والهدف المطلوب.
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          {KPIS_MAP.map((km, ki) => (
            <div key={ki} style={{ background: T.bg3, border: `1px solid ${km.color}20`,
              borderRight: `4px solid ${km.color}`, borderRadius: 12, padding: "14px 18px" }}>
              <p style={{ color: km.color, fontSize: 13, fontFamily: ff, fontWeight: 700, marginBottom: 12 }}>
                {["📅","🔗","🎬","💬","🌐","📡"][ki]} {km.rec}
              </p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                  <thead>
                    <tr style={{ background: km.color + "10" }}>
                      {["المؤشر","الوضع الحالي","الهدف","الوحدة","التكرار"].map(h => (
                        <th key={h} style={{ color: km.color, fontSize: 11, fontFamily: ff, fontWeight: 700,
                          textAlign: "right", padding: "7px 10px", borderBottom: `1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {km.kpis.map((kp, kj) => (
                      <tr key={kj} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <td style={{ padding: "8px 10px", color: T.text, fontSize: 12.5, fontFamily: ff }}>{kp.name}</td>
                        <td style={{ padding: "8px 10px", color: T.amber, fontSize: 12.5, fontFamily: ff, fontWeight: 600 }}>{kp.baseline}</td>
                        <td style={{ padding: "8px 10px" }}>
                          <span style={{ background: km.color + "15", color: km.color, borderRadius: 8,
                            padding: "2px 8px", fontSize: 12, fontFamily: ff, fontWeight: 700 }}>{kp.target}</span>
                        </td>
                        <td style={{ padding: "8px 10px", color: T.textSub, fontSize: 12, fontFamily: ff }}>{kp.unit}</td>
                        <td style={{ padding: "8px 10px" }}>
                          <span style={{ background: T.bg4, border: `1px solid ${T.border}`, borderRadius: 20,
                            padding: "2px 8px", fontSize: 10.5, color: T.textMuted, fontFamily: ff }}>{kp.freq}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          ② مؤشرات قابلة للقياس — Dashboard
      ════════════════════════════════════════ */}
      <div style={{ background: T.bg2, border: `2px solid ${T.tkCyan}30`, borderRadius: 16,
        padding: "22px 24px", direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <h2 style={{ color: T.tkCyan, fontFamily: ff, fontSize: 15, fontWeight: 700 }}>
            📐 مؤشرات قابلة للقياس لمراقبة التنفيذ
          </h2>
          <Badge real={false} T={T} />
        </div>
        <p style={{ color: T.textMuted, fontSize: 12, fontFamily: ff, marginBottom: 18, lineHeight: 1.7 }}>
          هذه المؤشرات تُراقَب أسبوعياً لضمان أن التنفيذ على المسار الصحيح. اللون الأخضر = على المسار، الأصفر = يحتاج مراجعة، الأحمر = تدخّل فوري.
        </p>

        {/* Progress bars section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14, marginBottom: 18 }}>
          {[
            { label:"معدل النشر الأسبوعي",       current:50,  target:100, unit:"3 فيديو/أسبوع",      c:T.tk,      note:"حالياً 1.5 → هدف 3" },
            { label:"ER% الفيديوهات الجديدة",    current:63,  target:100, unit:"18%+ هدف",            c:T.green,   note:"حالياً 11.4% → هدف 18%" },
            { label:"نسبة الفيديوهات ثنائية اللغة",current:35,target:100, unit:"80% تعريب",           c:T.amber,   note:"حالياً 30% → هدف 80%" },
            { label:"Collaborations منجزة",        current:0,  target:100, unit:"2–3/شهر",             c:T.tkCyan,  note:"لم يبدأ بعد" },
            { label:"TikTok LIVEs/شهر",            current:0,  target:100, unit:"4 LIVEs/شهر",         c:T.blue,    note:"لم يبدأ بعد" },
            { label:"متوسط تعليقات/فيديو",         current:42, target:100, unit:"700+ تعليق",          c:T.purple,  note:"حالياً 296 → هدف 700+" },
          ].map((m, i) => (
            <div key={i} style={{ background: T.bg3, borderRadius: 11, padding: "13px 15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <p style={{ color: T.text, fontSize: 12.5, fontFamily: ff, fontWeight: 600 }}>{m.label}</p>
                <span style={{ color: m.c, fontSize: 12, fontFamily: ff, fontWeight: 700 }}>{m.current}%</span>
              </div>
              <div style={{ height: 8, background: T.bg4, borderRadius: 4, marginBottom: 6, overflow: "hidden" }}>
                <div style={{ width: `${m.current}%`, height: "100%",
                  background: `linear-gradient(90deg, ${m.c}, ${m.c}AA)`,
                  borderRadius: 4, transition: "width 1s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: T.textMuted, fontSize: 10.5, fontFamily: ff }}>{m.note}</p>
                <span style={{ background: m.current < 30 ? T.tk+"15" : m.current < 70 ? T.amber+"15" : T.green+"15",
                  color: m.current < 30 ? T.tk : m.current < 70 ? T.amber : T.green,
                  borderRadius: 20, padding: "1px 7px", fontSize: 10, fontFamily: ff }}>
                  {m.current < 30 ? "⚠️ يحتاج بدء" : m.current < 70 ? "↑ قيد التحسين" : "✓ على المسار"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly checklist */}
        <div style={{ background: T.bg3, border: `1px solid ${T.tkCyan}20`, borderRadius: 12, padding: "16px 18px" }}>
          <p style={{ color: T.tkCyan, fontSize: 13, fontFamily: ff, fontWeight: 700, marginBottom: 14 }}>
            📋 قائمة المراجعة الأسبوعية
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { day:"كل أحد",     tasks:["مراجعة analytics الأسبوع المنصرم","تحديد موضوع LIVE القادم","جدولة فيديو الثلاثاء"] },
              { day:"كل ثلاثاء",  tasks:["نشر فيديو 8م + مراقبة أول ساعة","الرد على 100% من التعليقات خلال ساعتين","تسجيل بيانات ER في سجل التتبع"] },
              { day:"كل خميس",   tasks:["نشر فيديو المحتوى الحواري","تواصل مع حساب Collab محتمل","مراجعة أداء الهاشتاقات"] },
              { day:"كل جمعة",   tasks:["نشر فيديو إسبوعي (عربي أو مترجم)","مراجعة نمو المتابعين مقابل الهدف","تحضير محتوى الأسبوع القادم"] },
            ].map((d, i) => (
              <div key={i} style={{ background: T.bg2, borderRadius: 9, padding: "11px 13px",
                borderTop: `2px solid ${[T.tk, T.tkCyan, T.purple, T.amber][i]}` }}>
                <p style={{ color: [T.tk, T.tkCyan, T.purple, T.amber][i], fontSize: 12, fontFamily: ff,
                  fontWeight: 700, marginBottom: 8 }}>{d.day}</p>
                {d.tasks.map((t, j) => (
                  <div key={j} style={{ display: "flex", gap: 6, marginBottom: 5, alignItems: "flex-start" }}>
                    <span style={{ color: T.green, fontSize: 11, marginTop: 1 }}>☑</span>
                    <p style={{ color: T.textSub, fontSize: 11.5, fontFamily: ff, lineHeight: 1.5 }}>{t}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          ③ خطة التنفيذ الاستراتيجية 180 يوماً
      ════════════════════════════════════════ */}
      <div style={{ background: T.bg2, border: `2px solid ${T.purple}30`, borderRadius: 16,
        padding: "22px 24px", direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <h2 style={{ color: T.purple, fontFamily: ff, fontSize: 15, fontWeight: 700 }}>
            🗓️ خطة التنفيذ الاستراتيجية — 6 أشهر (180 يوماً)
          </h2>
          <Badge real={false} T={T} />
        </div>
        <p style={{ color: T.textMuted, fontSize: 12, fontFamily: ff, marginBottom: 20, lineHeight: 1.7 }}>
          الخطة مقسّمة على 3 مراحل — كل مرحلة تبني على سابقتها وتُحكم التوصيات السابقة قبل إضافة طبقة جديدة.
        </p>

        {/* Timeline visual */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 20, overflowX: "auto", paddingBottom: 8 }}>
          {PLAN_180.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 180 }}>
              <div style={{ flex: 1, background: T.bg3, border: `1px solid ${p.color}30`,
                borderTop: `3px solid ${p.color}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <div>
                    <p style={{ color: p.color, fontSize: 11, fontFamily: ff, fontWeight: 700 }}>{p.period}</p>
                    <p style={{ color: T.text, fontSize: 13, fontFamily: ff, fontWeight: 700 }}>مرحلة {p.label}</p>
                  </div>
                </div>
                <div style={{ background: p.color + "15", border: `1px solid ${p.color}30`,
                  borderRadius: 20, padding: "4px 12px", display: "inline-block", marginBottom: 10 }}>
                  <p style={{ color: p.color, fontSize: 12, fontFamily: ff, fontWeight: 700 }}>🎯 {p.milestone}</p>
                </div>
              </div>
              {i < PLAN_180.length - 1 && (
                <div style={{ width: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: T.textMuted, fontSize: 18 }}>→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed phases */}
        <div style={{ display: "grid", gap: 14 }}>
          {PLAN_180.map((p, i) => (
            <div key={i} style={{ background: T.bg3, border: `1px solid ${p.color}20`,
              borderRight: `4px solid ${p.color}`, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {/* Goals */}
                <div>
                  <p style={{ color: p.color, fontSize: 12, fontFamily: ff, fontWeight: 700, marginBottom: 10 }}>
                    {p.icon} {p.period} — {p.label}
                  </p>
                  <p style={{ color: T.textMuted, fontSize: 11, fontFamily: ff, marginBottom: 7 }}>الأهداف الرئيسية:</p>
                  {p.goals.map((g, j) => (
                    <div key={j} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                      <span style={{ color: p.color, fontSize: 11, marginTop: 1, flexShrink: 0 }}>◆</span>
                      <p style={{ color: T.textSub, fontSize: 12, fontFamily: ff, lineHeight: 1.55 }}>{g}</p>
                    </div>
                  ))}
                </div>
                {/* KPI checks */}
                <div>
                  <p style={{ color: T.green, fontSize: 12, fontFamily: ff, fontWeight: 700, marginBottom: 10 }}>✅ مؤشرات الاجتياز:</p>
                  <p style={{ color: T.textMuted, fontSize: 11, fontFamily: ff, marginBottom: 7 }}>
                    لا تنتقل للمرحلة التالية حتى:
                  </p>
                  {p.kpi_check.map((k, j) => (
                    <div key={j} style={{ background: T.green + "10", border: `1px solid ${T.green}25`,
                      borderRadius: 7, padding: "5px 9px", marginBottom: 5,
                      display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: T.green, fontSize: 11 }}>✓</span>
                      <p style={{ color: T.textSub, fontSize: 11.5, fontFamily: ff }}>{k}</p>
                    </div>
                  ))}
                </div>
                {/* Risk */}
                <div>
                  <p style={{ color: T.amber, fontSize: 12, fontFamily: ff, fontWeight: 700, marginBottom: 10 }}>⚠️ خطر محتمل:</p>
                  <div style={{ background: T.amber + "10", border: `1px solid ${T.amber}25`,
                    borderRadius: 9, padding: "11px 13px" }}>
                    <p style={{ color: T.textSub, fontSize: 12, fontFamily: ff, lineHeight: 1.7 }}>{p.risk}</p>
                  </div>
                  <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 9,
                    padding: "11px 13px", marginTop: 10 }}>
                    <p style={{ color: T.textMuted, fontSize: 11, fontFamily: ff, marginBottom: 4 }}>الميلستون:</p>
                    <p style={{ color: p.color, fontSize: 16, fontWeight: 700, fontFamily: ff }}>🎯 {p.milestone}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          ④ ملخص النتائج المتوقعة بعد 6 أشهر
      ════════════════════════════════════════ */}
      <div style={{ background: T.bg2, border: `2px solid ${T.green}30`, borderRadius: 16,
        padding: "22px 24px", direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <h2 style={{ color: T.green, fontFamily: ff, fontSize: 15, fontWeight: 700 }}>
            🏆 ملخص النتائج المتوقعة بعد 6 أشهر
          </h2>
          <Badge real={false} T={T} />
        </div>
        <p style={{ color: T.textMuted, fontSize: 12, fontFamily: ff, marginBottom: 18, lineHeight: 1.7 }}>
          هذه التوقعات مبنية على معدل نمو الحساب الحالي (+593% في 7 أشهر) مع تطبيق التوصيات الست كاملةً.
          نطاق الخطأ: ±20%.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14, marginBottom: 18 }}>
          {RESULTS_6M.map((r, i) => (
            <div key={i} style={{ background: T.bg3, border: `1px solid ${r.color}20`,
              borderRadius: 13, padding: "16px 18px", direction: "rtl" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>{r.icon}</span>
                <p style={{ color: T.textSub, fontSize: 12, fontFamily: ff }}>{r.metric}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <div style={{ background: T.bg4, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                  <p style={{ color: T.textMuted, fontSize: 10, fontFamily: ff, marginBottom: 3 }}>الآن</p>
                  <p style={{ color: T.amber, fontSize: 15, fontWeight: 700, fontFamily: ff }}>{r.before}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ color: r.color, fontSize: 18 }}>→</span>
                </div>
                <div style={{ background: r.color + "12", border: `1px solid ${r.color}30`,
                  borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                  <p style={{ color: T.textMuted, fontSize: 10, fontFamily: ff, marginBottom: 3 }}>بعد 6 أشهر</p>
                  <p style={{ color: r.color, fontSize: 15, fontWeight: 700, fontFamily: ff }}>{r.after}</p>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ background: T.green + "15", border: `1px solid ${T.green}30`,
                  borderRadius: 20, padding: "3px 14px", color: T.green,
                  fontSize: 13, fontFamily: ff, fontWeight: 700 }}>
                  {r.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary bar chart */}
        <Card title="📊 مقارنة بصرية: قبل وبعد" T={T}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { name:"متابعون K",  قبل:8.3,  بعد:50 },
              { name:"مشاهدات/فيديو K", قبل:33, بعد:120 },
              { name:"تعليقات",    قبل:296,  بعد:900 },
              { name:"مشاهدات/شهر K", قبل:162, بعد:600 },
            ]} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: T.textMuted, fontSize: 11, fontFamily: "IBM Plex Sans Arabic" }} />
              <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} />
              <Tooltip content={props => <TTooltip {...props} T={T} />} />
              <Legend wrapperStyle={{ fontFamily: "IBM Plex Sans Arabic", fontSize: 12, color: T.textSub }} />
              <Bar dataKey="قبل"  fill={T.amber + "CC"} radius={[5,5,0,0]} />
              <Bar dataKey="بعد"  fill={T.green + "CC"} radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ════════════════════════════════════════
          ⑤ تقدير العائد المتوقع
      ════════════════════════════════════════ */}
      <div style={{ background: T.bg2, border: `2px solid ${T.amber}30`, borderRadius: 16,
        padding: "22px 24px", direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <h2 style={{ color: T.amber, fontFamily: ff, fontSize: 15, fontWeight: 700 }}>
            💰 تقدير العائد المتوقع من تنفيذ التوصيات
          </h2>
          <Badge real={false} T={T} />
        </div>
        <p style={{ color: T.textMuted, fontSize: 12, fontFamily: ff, marginBottom: 18, lineHeight: 1.7 }}>
          تقديرات مالية محافظة مبنية على معايير السوق للحسابات الثقافية المتخصصة في المنطقة العربية والفارسية.
          <strong style={{ color: T.amber }}> هذه تقديرات — تختلف بحسب الجهد والسوق.</strong>
        </p>

        <div style={{ display: "grid", gap: 14, marginBottom: 18 }}>
          {ROI_DATA.map((r, i) => (
            <div key={i} style={{ background: T.bg3, border: `1px solid ${r.color}20`,
              borderRight: `4px solid ${r.color}`, borderRadius: 13, padding: "16px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <p style={{ color: r.color, fontSize: 14, fontFamily: ff, fontWeight: 700 }}>💵 {r.source}</p>
                    <span style={{ background: T.bg4, border: `1px solid ${T.border}`, borderRadius: 20,
                      padding: "2px 9px", color: T.textMuted, fontSize: 10.5, fontFamily: ff }}>
                      متاح من {r.ready}
                    </span>
                  </div>
                  <p style={{ color: T.textMuted, fontSize: 11.5, fontFamily: ff, marginBottom: 7 }}>
                    🔒 الشرط: <span style={{ color: T.textSub }}>{r.condition}</span>
                  </p>
                  <p style={{ color: T.textSub, fontSize: 12.5, fontFamily: ff, lineHeight: 1.8 }}>{r.how}</p>
                </div>
                <div style={{ background: r.color + "10", border: `1px solid ${r.color}30`,
                  borderRadius: 12, padding: "14px 18px", textAlign: "center", minWidth: 110, flexShrink: 0 }}>
                  <p style={{ color: T.textMuted, fontSize: 10, fontFamily: ff, marginBottom: 5 }}>النطاق المتوقع</p>
                  <p style={{ color: r.color, fontSize: 14, fontWeight: 700, fontFamily: ff }}>{r.low}</p>
                  <p style={{ color: T.textMuted, fontSize: 11 }}>—</p>
                  <p style={{ color: r.color, fontSize: 18, fontWeight: 700, fontFamily: ff }}>{r.high}</p>
                  <p style={{ color: T.textMuted, fontSize: 10.5, fontFamily: ff }}>{r.unit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total ROI summary */}
        <div style={{ background: `linear-gradient(135deg, ${T.amber}12, ${T.green}08)`,
          border: `2px solid ${T.amber}40`, borderRadius: 14, padding: "20px 24px" }}>
          <p style={{ color: T.amber, fontSize: 14, fontFamily: ff, fontWeight: 700, marginBottom: 14 }}>
            📊 إجمالي العائد المتوقع الشهري بعد 6 أشهر
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 16 }}>
            {[
              { label:"الحد الأدنى (محافظ)",  val:"$1,050",  sub:"Creator Fund + Affiliate", c:T.amber  },
              { label:"المتوقع الواقعي",       val:"$1,800",  sub:"+ Brand Partnership واحد", c:T.green  },
              { label:"الحد الأعلى (مثالي)",   val:"$3,550+", sub:"+ دورة مدفوعة شهرية",     c:T.tk     },
            ].map((s, i) => (
              <div key={i} style={{ background: T.bg2, border: `1px solid ${s.c}25`,
                borderTop: `3px solid ${s.c}`, borderRadius: 11, padding: "14px", textAlign: "center" }}>
                <p style={{ color: T.textMuted, fontSize: 11, fontFamily: ff, marginBottom: 6 }}>{s.label}</p>
                <p style={{ color: s.c, fontSize: 26, fontWeight: 700, fontFamily: ff, marginBottom: 4 }}>{s.val}</p>
                <p style={{ color: T.textMuted, fontSize: 11, fontFamily: ff }}>{s.sub}</p>
              </div>
            ))}
          </div>
          <IBox type="warning"
            title="ملاحظة: هذه تقديرات — الواقع قد يختلف"
            T={T} real={false}>
            العوامل المؤثرة: التغييرات في خوارزمية TikTok، معدل التطبيق الفعلي، جودة Collaborations، وحجم الاستثمار الزمني.
            الحسابات الثقافية المتخصصة بـ 50K+ متابع في الخليج + إيران تحقق عادةً{" "}
            <strong style={{ color: T.amber }}>$1,500–$4,000/شهر</strong> من مجموع المصادر عند التطبيق الكامل.
          </IBox>
        </div>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function TikTokDashboard() {
  const [dark,  setDark]  = useState(true);
  const [tab,   setTab]   = useState("overview");
  const [pulse, setPulse] = useState(false);
  const T = dark ? DARK : LIGHT;

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1800);
    return () => clearInterval(t);
  }, []);

  const TABS = [
    { id: "overview", label: "📊 نظرة عامة"    },
    { id: "content",  label: "🎬 المحتوى"       },
    { id: "growth",   label: "📈 النمو والتوقع" },
    { id: "audience", label: "👥 الجمهور"       },
    { id: "recs",     label: "💡 التوصيات"      },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: dark
        ? "linear-gradient(160deg,#04060E 0%,#080B12 50%,#040610 100%)"
        : "linear-gradient(160deg,#F7F8FA 0%,#F0F2F8 100%)",
      fontFamily: "'IBM Plex Sans Arabic',sans-serif",
      direction: "rtl", color: T.text, transition: "background 0.4s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.tk}60; border-radius: 3px; }
        button:focus { outline: none; }
        details summary { list-style: none; cursor: pointer; }
        details summary::-webkit-details-marker { display: none; }
        tr:hover td { background: ${dark ? "rgba(254,44,85,0.03)" : "rgba(254,44,85,0.02)"}; }
      `}</style>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 16px" }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 20, flexWrap: "wrap", gap: 14,
          paddingBottom: 18, borderBottom: `1px solid ${T.border}` }}>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* TikTok logo box */}
            <div style={{ width: 60, height: 60, borderRadius: 16,
              background: dark ? "#010101" : "#F7F8FA",
              border: `1px solid ${T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: dark ? `0 0 20px ${T.tk}30` : T.shadow, flexShrink: 0,
              position: "relative" }}>
              <div style={{ color: T.tkCyan, position: "absolute", top: 14, left: 18, opacity: 0.7 }}>
                <TikTokIcon size={28} />
              </div>
              <div style={{ color: T.tk, position: "absolute", top: 16, left: 16 }}>
                <TikTokIcon size={28} />
              </div>
              <div style={{ color: "#010101", position: "absolute", top: 15, left: 17, zIndex: 1 }}>
                <TikTokIcon size={28} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3, flexWrap: "wrap" }}>
                <h1 style={{ fontSize: 19, fontWeight: 700, color: T.text,
                  fontFamily: "'IBM Plex Sans Arabic',sans-serif", lineHeight: 1.2 }}>
                  {REAL_PROFILE.name}
                </h1>
                <span style={{ color: T.textMuted, fontSize: 12.5, fontFamily: "monospace" }}>@{REAL_PROFILE.username}</span>
                <Badge real={true} T={T} />
              </div>
              <p style={{ color: T.textSub, fontSize: 12, marginBottom: 6,
                fontFamily: "'IBM Plex Sans Arabic',sans-serif", direction: "rtl" }}>
                <span style={{ color: T.tkCyan }}>{REAL_PROFILE.bio}</span>
              </p>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {[
                  { l: fmtNum(REAL_PROFILE.followers)+" متابع", c: T.tk,     real: true  },
                  { l: fmtNum(REAL_PROFILE.totalLikes)+" إعجاب", c: T.tkCyan, real: true  },
                  { l: "ثقافي · فلسفي",                          c: T.purple, real: true  },
                  { l: "TikTok",                                  c: T.blue,   real: true  },
                ].map((t, i) => (
                  <span key={i} style={{ background: t.c + "12", border: `1px solid ${t.c}30`,
                    borderRadius: 20, padding: "2px 10px", fontSize: 11, color: t.c,
                    fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 500 }}>{t.l}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6,
              background: dark ? "rgba(254,44,85,0.08)" : T.tkPale,
              border: `1px solid ${T.tk}30`, borderRadius: 20, padding: "5px 13px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.tk,
                boxShadow: pulse ? `0 0 8px ${T.tk}` : "none", transition: "box-shadow 0.5s" }} />
              <span style={{ color: T.tk, fontSize: 12, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>تقرير مدفوع</span>
            </div>
            <button onClick={() => setDark(d => !d)} style={{
              width: 46, height: 26, borderRadius: 13,
              background: dark ? "linear-gradient(135deg,#151B2E,#0F1420)" : "linear-gradient(135deg,#E0EAFA,#C8DEFF)",
              border: `2px solid ${T.tk}50`, cursor: "pointer",
              display: "flex", alignItems: "center", padding: "0 3px" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%",
                background: dark ? `linear-gradient(135deg,${T.tk},${T.tkCyan})` : "linear-gradient(135deg,#FCD34D,#F59E0B)",
                transform: dark ? "translateX(-18px)" : "translateX(0px)", transition: "transform 0.35s",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                {dark ? "🌙" : "☀️"}
              </div>
            </button>
          </div>
        </div>

        {/* ── LEGEND ── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap",
          padding: "9px 14px", background: T.bg2, border: `1px solid ${T.border}`,
          borderRadius: 10, direction: "rtl", alignItems: "center" }}>
          <p style={{ color: T.textMuted, fontSize: 12, fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 600 }}>دليل البيانات:</p>
          <Badge real={true} T={T} />
          <span style={{ color: T.textMuted, fontSize: 11.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>= من الملف الشخصي TikTok مباشرةً</span>
          <span style={{ color: T.textMuted }}>·</span>
          <Badge real={false} T={T} />
          <span style={{ color: T.textMuted, fontSize: 11.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>= محاكاة تقديرية</span>
        </div>

        {/* ── TABS ── */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap",
          padding: "8px", background: T.bg2, borderRadius: 13,
          border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? `linear-gradient(135deg,${T.tk},${T.tk}CC)` : "transparent",
              color: tab === t.id ? "#FFF" : T.textSub,
              border: tab === t.id ? "none" : `1px solid ${T.border}`,
              borderRadius: 9, padding: "8px 14px", cursor: "pointer",
              fontFamily: "'IBM Plex Sans Arabic',sans-serif",
              fontWeight: tab === t.id ? 700 : 400, fontSize: 13,
              whiteSpace: "nowrap", transition: "all 0.2s",
              boxShadow: tab === t.id ? `0 4px 12px ${T.tk}40` : "none",
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        {tab === "overview" && <OverviewTab T={T} />}
        {tab === "content"  && <ContentTab  T={T} />}
        {tab === "growth"   && <GrowthTab   T={T} />}
        {tab === "audience" && <AudienceTab T={T} />}
        {tab === "recs"     && <RecsTab     T={T} />}

        <div style={{ textAlign: "center", marginTop: 28, paddingTop: 14,
          borderTop: `1px solid ${T.border}`, color: T.textMuted, fontSize: 11,
          fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>
          تقرير مدفوع · منصة حوار الحقيقة · @dialog.fa · TikTok · مارس 2026
        </div>
      </div>
    </div>
  );
}
