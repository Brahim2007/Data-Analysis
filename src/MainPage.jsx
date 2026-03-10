import { useState } from "react";

/* ══════════ THEMES ══════════ */
const LIGHT = {
  bg: "linear-gradient(160deg,#F0F4F8 0%,#E8EEF8 60%,#EBF0FA 100%)",
  bg2: "#FFFFFF",
  bg3: "#F1F5F9",
  border: "#E2E8F0",
  text: "#0F172A",
  textSub: "#475569",
  textMuted: "#94A3B8",
  shadow: "0 4px 24px rgba(15,23,42,0.08)",
  shadowHover: "0 12px 40px rgba(15,23,42,0.14)",
};
const DARK = {
  bg: "linear-gradient(160deg,#07090F 0%,#0B0F19 60%,#060A14 100%)",
  bg2: "#111827",
  bg3: "#1A2233",
  border: "#1E293B",
  text: "#F1F5F9",
  textSub: "#94A3B8",
  textMuted: "#475569",
  shadow: "0 4px 24px rgba(0,0,0,0.35)",
  shadowHover: "0 12px 40px rgba(0,0,0,0.5)",
};

/* ══════════ REPORTS CONFIG ══════════ */
const REPORTS = [
  {
    id: "youtube",
    platform: "YouTube",
    platformColor: "#FF0000",
    platformBg: "linear-gradient(135deg,#FF0000,#CC0000)",
    platformIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    influencer: "نايف الشرهان",
    influencerEn: "Nayef Al-Shahrani",
    handle: "@nayef_alshahrani",
    bio: "منشد كويتي · أناشيد دينية وعائلية",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_nExTb5kK_jj0V22QCFB1d8PWJSJ8TSnLGYGHb8lw=s176-c-k-c0x00ffffff-no-rj",
    stats: [
      { label: "المشتركون", value: "572K", icon: "👥", color: "#FF0000" },
      { label: "إجمالي المشاهدات", value: "24.6M", icon: "👁️", color: "#FF0000" },
      { label: "معدل التفاعل", value: "6.8%", icon: "💛", color: "#FF9900" },
      { label: "الفيديوهات", value: "148+", icon: "🎬", color: "#FF0000" },
    ],
    badge: { label: "بيانات YouTube Analytics", color: "#FF0000" },
    description: "تقرير شامل لقناة نايف الشرهان على يوتيوب — يتضمن تحليل المشتركين والمشاهدات ومعدلات التفاعل والتوقعات المستقبلية مع خطة نمو.",
    tags: ["أناشيد إسلامية", "محتوى عائلي", "الكويت", "572K مشترك"],
    highlight: "أعلى فيديو: 4.2M مشاهدة",
    depth: "تحليل عميق · 8 تبويبات",
  },
  {
    id: "tiktok",
    platform: "TikTok",
    platformColor: "#FE2C55",
    platformBg: "linear-gradient(135deg,#FE2C55,#010101)",
    platformIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
    influencer: "گفتمان فرهنگی",
    influencerEn: "Dialog Cultural",
    handle: "@dialog.fa",
    bio: "محتوى ثقافي حواري · فارسي وعربي",
    avatar: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/default-avatar.webp",
    stats: [
      { label: "المتابعون", value: "8.3K", icon: "👥", color: "#FE2C55" },
      { label: "إجمالي الإعجابات", value: "94.2K", icon: "❤️", color: "#FE2C55" },
      { label: "معدل التفاعل", value: "12.4%", icon: "💛", color: "#F5A623" },
      { label: "الفيديوهات المحللة", value: "8", icon: "🎬", color: "#06C167" },
    ],
    badge: { label: "بيانات TikTok فعلية", color: "#FE2C55" },
    description: "تقرير متعمق لحساب @dialog.fa على TikTok — يشمل تحليل الفيديوهات والمشاركة والأنماط الثقافية مع توقعات نمو لـ 6 أشهر.",
    tags: ["محتوى ثقافي", "فارسي عربي", "حواري", "8.3K متابع"],
    highlight: "أعلى فيديو: 48.2K مشاهدة",
    depth: "تحليل عميق · 7 تبويبات",
  },
  {
    id: "twitter",
    platform: "X (تويتر)",
    platformColor: "#1D9BF0",
    platformBg: "linear-gradient(135deg,#1D9BF0,#0D7CC9)",
    platformIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    influencer: "عبدالرحمن الجميعان",
    influencerEn: "Abdulrahman Al-Jumaian",
    handle: "@jumaianabd",
    bio: "كاتب كويتي · ديني وسياسي · \"اللهم أحسن ختامنا\"",
    avatar: "https://pbs.twimg.com/profile_images/1983632610199851008/39A-1PDO.jpg",
    stats: [
      { label: "المتابعون (تقدير)", value: "3–5K", icon: "👥", color: "#1D9BF0" },
      { label: "متوسط المشاهدات", value: "334", icon: "👁️", color: "#1D9BF0" },
      { label: "معدل التفاعل", value: "0.85%", icon: "💛", color: "#F59E0B" },
      { label: "المنشورات المحللة", value: "10", icon: "📝", color: "#10B981" },
    ],
    badge: { label: "بيانات Apify فعلية", color: "#10B981" },
    description: "تقرير متعمق لحساب @jumaianabd على X — يشمل تحليل المشاعر والأنماط والتوصيات المبنية على البيانات الفعلية مع توقعات نمو لـ 6 أشهر.",
    tags: ["محتوى ديني", "سياسي خليجي", "الكويت", "Apify API"],
    highlight: "أعلى منشور: 635 مشاهدة",
    depth: "تحليل عميق · 7 تبويبات",
  },
];

/* ══════════ STAT CARD ══════════ */
function StatBadge({ stat, platformColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: platformColor + "10",
      border: `1px solid ${platformColor}25`, borderRadius: 8, padding: "6px 10px" }}>
      <span style={{ fontSize: 14 }}>{stat.icon}</span>
      <div>
        <p style={{ color: stat.color, fontSize: 14, fontWeight: 700,
          fontFamily: "'IBM Plex Sans Arabic',sans-serif", lineHeight: 1.1 }}>{stat.value}</p>
        <p style={{ color: "#94A3B8", fontSize: 9.5, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{stat.label}</p>
      </div>
    </div>
  );
}

/* ══════════ REPORT CARD ══════════ */
function ReportCard({ report, dark, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr]   = useState(false);
  const T = dark ? DARK : LIGHT;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        background: T.bg2,
        border: `1px solid ${hovered ? report.platformColor + "60" : T.border}`,
        borderRadius: 20,
        padding: "26px 24px",
        cursor: "pointer",
        boxShadow: hovered ? report.platformColor + "20 0 0 0 4px, " + T.shadowHover : T.shadow,
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.3s ease",
        direction: "rtl",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow effect */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 220, height: 220,
        borderRadius: "50%", background: report.platformColor + "06",
        transform: "translate(50%, -50%)", pointerEvents: "none",
      }} />

      {/* Platform badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ background: report.platformBg, borderRadius: 12,
            width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 14px ${report.platformColor}40` }}>
            {report.platformIcon}
          </div>
          <div>
            <p style={{ color: report.platformColor, fontSize: 13, fontWeight: 700,
              fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{report.platform}</p>
            <p style={{ color: T.textMuted, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{report.depth}</p>
          </div>
        </div>
        <div style={{ background: report.badge.color + "15", border: `1px solid ${report.badge.color}30`,
          borderRadius: 20, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: report.badge.color }} />
          <span style={{ color: report.badge.color, fontSize: 10, fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 600 }}>
            {report.badge.label}
          </span>
        </div>
      </div>

      {/* Influencer info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        {!imgErr
          ? <img src={report.avatar} alt={report.influencer} onError={() => setImgErr(true)}
              style={{ width: 58, height: 58, borderRadius: "50%", objectFit: "cover",
                border: `3px solid ${report.platformColor}`, boxShadow: `0 0 0 4px ${report.platformColor}15`,
                flexShrink: 0 }} />
          : <div style={{ width: 58, height: 58, borderRadius: "50%",
              background: `linear-gradient(135deg,${report.platformColor},${report.platformColor}88)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0 }}>👤</div>
        }
        <div>
          <h3 style={{ color: T.text, fontSize: 17, fontWeight: 700,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif", marginBottom: 3 }}>{report.influencer}</h3>
          <p style={{ color: report.platformColor, fontSize: 12, fontFamily: "'IBM Plex Sans Arabic',sans-serif", marginBottom: 3 }}>
            {report.handle}
          </p>
          <p style={{ color: T.textMuted, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{report.bio}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {report.stats.map((s, i) => <StatBadge key={i} stat={s} platformColor={report.platformColor} />)}
      </div>

      {/* Description */}
      <p style={{ color: T.textSub, fontSize: 13, lineHeight: 1.75,
        fontFamily: "'IBM Plex Sans Arabic',sans-serif", marginBottom: 14 }}>
        {report.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
        {report.tags.map(tag => (
          <span key={tag} style={{ background: T.bg3, border: `1px solid ${T.border}`,
            borderRadius: 20, padding: "3px 9px", fontSize: 10.5, color: T.textSub,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{tag}</span>
        ))}
      </div>

      {/* Highlight + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
        <span style={{ color: report.platformColor, fontSize: 12, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
          fontWeight: 600, background: report.platformColor + "10", padding: "4px 10px", borderRadius: 8 }}>
          ⭐ {report.highlight}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6,
          background: hovered ? report.platformBg : T.bg3,
          border: `1px solid ${hovered ? "transparent" : T.border}`,
          borderRadius: 10, padding: "8px 16px", transition: "all 0.3s" }}>
          <span style={{ color: hovered ? "#FFF" : T.textSub, fontSize: 13,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: hovered ? 700 : 400 }}>
            فتح التقرير
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={hovered ? "#FFF" : T.textMuted} strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ══════════ MAIN PAGE ══════════ */
export default function MainPage({ onNavigate, dark, setDark }) {
  const T = dark ? DARK : LIGHT;

  return (
    <div style={{
      background: T.bg,
      fontFamily: "'IBM Plex Sans Arabic',sans-serif",
      direction: "rtl",
      color: T.text,
      transition: "all 0.4s",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg,#1D9BF010,#8B5CF610)",
            border: "1px solid #1D9BF030", borderRadius: 30, padding: "6px 18px", marginBottom: 20 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981",
              boxShadow: "0 0 8px #10B981" }} />
            <span style={{ color: "#10B981", fontSize: 12, fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontWeight: 600 }}>
              تقارير محدّثة · مارس 2026
            </span>
          </div>

          <h2 style={{ fontSize: 34, fontWeight: 700, color: T.text,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif", lineHeight: 1.3, marginBottom: 14 }}>
            تقارير التحليل الرقمي
          </h2>
          <p style={{ color: T.textSub, fontSize: 15, lineHeight: 1.85,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif", maxWidth: 560, margin: "0 auto" }}>
            منصة SaaS متقدمة لتحليل بيانات المؤثرين والحملات الرقمية في العالم العربي —
            تحويل البيانات الضخمة إلى رؤى استراتيجية مدعومة بالذكاء الاصطناعي
          </p>
        </div>

        {/* ── REPORTS GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: 24, marginBottom: 48 }}>
          {REPORTS.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              dark={dark}
              onOpen={() => onNavigate(report.id)}
            />
          ))}
        </div>

        {/* ── STATS BAR ── */}
        <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16,
          padding: "20px 28px", display: "flex", justifyContent: "space-around",
          flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
          {[
            { label: "إجمالي المنشورات المحللة", value: "158+", icon: "📝", color: "#1D9BF0" },
            { label: "إجمالي المشاهدات المحللة", value: "24.6M+", icon: "👁️", color: "#EF4444" },
            { label: "البيانات الفعلية", value: "100%", icon: "✅", color: "#10B981" },
            { label: "التوصيات القابلة للتطبيق", value: "15+", icon: "🎯", color: "#8B5CF6" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <p style={{ color: s.color, fontSize: 22, fontWeight: 700,
                fontFamily: "'IBM Plex Sans Arabic',sans-serif", margin: "4px 0 2px" }}>{s.value}</p>
              <p style={{ color: T.textMuted, fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
