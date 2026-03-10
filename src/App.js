import React, { useState } from 'react';
import MainPage from './MainPage';
import NayefDashboard from './nayef_dashboard_v3';
import XDashboardPage from './XDashboard';
import TikTokDialogDashboard from './TikTokDialogDashboard';
import AboutPage from './AboutPage';

const PAGE_META = {
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    bg: "linear-gradient(135deg,#FF0000,#CC0000)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    name: "نايف الشرهان",
  },
  twitter: {
    label: "X (تويتر)",
    color: "#1D9BF0",
    bg: "linear-gradient(135deg,#1D9BF0,#0D7CC9)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    name: "عبدالرحمن الجميعان",
  },
  tiktok: {
    label: "TikTok",
    color: "#FE2C55",
    bg: "linear-gradient(135deg,#FE2C55,#010101)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
    name: "گفتمان فرهنگی · @dialog.fa",
  },
};

/* ══════════ UNIFIED HEADER ══════════ */
function PageHeader({ page, dark, setDark, onBack, onAbout }) {
  const [backHovered, setBackHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const meta = PAGE_META[page];
  const isHome = page === "home";
  const isAbout = page === "about";

  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: "rgba(7,9,15,0.88)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
      fontFamily: "'IBM Plex Sans Arabic',sans-serif",
      direction: "rtl",
    }}>
      <div style={{
        maxWidth: 1440,
        margin: "0 auto",
        padding: "0 20px",
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>

        {/* Right: Brand + platform badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          {/* Logo */}
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "linear-gradient(135deg,#1D9BF0,#8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, flexShrink: 0,
            boxShadow: "0 2px 10px rgba(29,155,240,0.35)",
          }}>📊</div>

          <span style={{
            color: "#F1F5F9", fontSize: 15, fontWeight: 700,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif",
            letterSpacing: "-0.2px", flexShrink: 0,
          }}>DataAnalyze</span>

          {/* Separator + platform badge (dashboard pages only) */}
          {meta && (
            <>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18 }}>›</span>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: meta.bg,
                borderRadius: 20, padding: "4px 12px", flexShrink: 0,
                boxShadow: `0 2px 10px ${meta.color}40`,
              }}>
                {meta.icon}
                <span style={{
                  color: "#FFF", fontSize: 12, fontWeight: 600,
                  fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                }}>{meta.label}</span>
              </div>
              <span style={{
                color: "rgba(255,255,255,0.4)", fontSize: 12,
                fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>{meta.name}</span>
            </>
          )}

          {/* Home tagline */}
          {isHome && (
            <span style={{
              color: "rgba(255,255,255,0.35)", fontSize: 12,
              fontFamily: "'IBM Plex Sans Arabic',sans-serif",
            }}>منصة تحليل التأثير الرقمي العربي</span>
          )}

          {/* About page badge */}
          {isAbout && (
            <>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18 }}>›</span>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
                borderRadius: 20, padding: "4px 12px", flexShrink: 0,
                boxShadow: "0 2px 10px rgba(139,92,246,0.4)",
              }}>
                <span style={{ fontSize: 13 }}>💡</span>
                <span style={{
                  color: "#FFF", fontSize: 12, fontWeight: 600,
                  fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                }}>حول المشروع</span>
              </div>
            </>
          )}
        </div>

        {/* Left: Dark toggle + Back button */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            title={dark ? "الوضع النهاري" : "الوضع الليلي"}
            style={{
              width: 46, height: 26, borderRadius: 13,
              background: dark
                ? "linear-gradient(135deg,#1A2233,#0D1527)"
                : "linear-gradient(135deg,#E0EAFA,#C8DEFF)",
              border: `2px solid ${dark ? "rgba(29,155,240,0.6)" : "rgba(147,197,253,0.8)"}`,
              cursor: "pointer",
              display: "flex", alignItems: "center", padding: "0 3px",
              transition: "all 0.3s",
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              background: dark
                ? "linear-gradient(135deg,#1D9BF0,#8B5CF6)"
                : "linear-gradient(135deg,#FCD34D,#F59E0B)",
              transform: dark ? "translateX(-18px)" : "translateX(0px)",
              transition: "transform 0.35s",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10,
            }}>
              {dark ? "🌙" : "☀️"}
            </div>
          </button>

          {/* About button (home only) */}
          {isHome && (
            <button
              onClick={onAbout}
              onMouseEnter={() => setAboutHovered(true)}
              onMouseLeave={() => setAboutHovered(false)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: aboutHovered ? "rgba(139,92,246,0.75)" : "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.35)",
                borderRadius: 8, padding: "6px 14px",
                cursor: "pointer", color: "#C4B5FD",
                fontSize: 13, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                fontWeight: 600, transition: "all 0.2s",
              }}
            >
              💡 حول المشروع
            </button>
          )}

          {/* Back button (dashboard & about pages) */}
          {!isHome && (
            <button
              onClick={onBack}
              onMouseEnter={() => setBackHovered(true)}
              onMouseLeave={() => setBackHovered(false)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: backHovered ? "rgba(29,155,240,0.85)" : "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "6px 14px",
                cursor: "pointer", color: "#F1F5F9",
                fontSize: 13, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                fontWeight: 600, transition: "all 0.2s",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              الرئيسية
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

/* ══════════ UNIFIED FOOTER ══════════ */
function PageFooter({ dark, onAbout }) {
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const bg = dark ? "rgba(7,9,15,0.95)" : "rgba(248,250,252,0.95)";
  const textMain = dark ? "#94A3B8" : "#64748B";
  const textMuted = dark ? "#475569" : "#94A3B8";
  const accent = "#1D9BF0";

  return (
    <footer style={{
      background: bg,
      borderTop: `1px solid ${borderColor}`,
      fontFamily: "'IBM Plex Sans Arabic',sans-serif",
      direction: "rtl",
      marginTop: 40,
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto",
        padding: "28px 24px 20px",
      }}>

        {/* Top row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: 20,
          marginBottom: 20,
          paddingBottom: 20,
          borderBottom: `1px solid ${borderColor}`,
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7,
                background: "linear-gradient(135deg,#1D9BF0,#8B5CF6)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              }}>📊</div>
              <span style={{ color: dark ? "#F1F5F9" : "#0F172A", fontSize: 14, fontWeight: 700 }}>
                DataAnalyze
              </span>
            </div>
            <p style={{ color: textMuted, fontSize: 11.5, lineHeight: 1.7 }}>
              منصة تحليل التأثير الرقمي العربي
            </p>
          </div>

          {/* Platforms */}
          <div>
            <p style={{ color: textMuted, fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              التقارير
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "YouTube · نايف الشرهان",     color: "#FF0000" },
                { label: "X · عبدالرحمن الجميعان",    color: "#1D9BF0" },
                { label: "TikTok · گفتمان فرهنگی",     color: "#FE2C55" },
              ].map(p => (
                <span key={p.label} style={{
                  background: p.color + (dark ? "18" : "10"),
                  border: `1px solid ${p.color}30`,
                  borderRadius: 20, padding: "3px 11px",
                  fontSize: 11, color: p.color,
                  fontWeight: 600,
                }}>{p.label}</span>
              ))}
            </div>
          </div>

          {/* Data sources */}
          <div>
            <p style={{ color: textMuted, fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              مصادر البيانات
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[
                "YouTube Analytics",
                "Apify X Scraper",
                "TikTok Profile Data",
              ].map(s => (
                <span key={s} style={{
                  color: textMain, fontSize: 11.5,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "inline-block", flexShrink: 0 }} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 10,
        }}>
          <p style={{ color: textMuted, fontSize: 11 }}>
            © 2026 DataAnalyze · جميع الحقوق محفوظة · تقارير مدفوعة
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={onAbout}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: "#8B5CF6", fontSize: 11, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                fontWeight: 600, padding: 0, textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >💡 حول المشروع</button>
            <span style={{
              display: "flex", alignItems: "center", gap: 5,
              color: "#10B981", fontSize: 11, fontWeight: 600,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981",
                boxShadow: "0 0 6px #10B981", display: "inline-block" }} />
              بيانات محدّثة · مارس 2026
            </span>
            <span style={{ color: textMuted, fontSize: 11 }}>
              158+ منشور · 24.6M+ مشاهدة
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ══════════ APP ══════════ */
function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);

  const goHome  = () => setPage("home");
  const goAbout = () => setPage("about");

  const renderPage = () => {
    if (page === "youtube") return <NayefDashboard dark={dark} setDark={setDark} />;
    if (page === "twitter") return <XDashboardPage dark={dark} setDark={setDark} />;
    if (page === "tiktok")  return <TikTokDialogDashboard dark={dark} setDark={setDark} />;
    if (page === "about")   return <AboutPage dark={dark} />;
    return <MainPage onNavigate={setPage} dark={dark} setDark={setDark} />;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1D9BF050; border-radius: 3px; }
      `}</style>
      <PageHeader
        page={page} dark={dark} setDark={setDark}
        onBack={goHome} onAbout={goAbout}
      />
      <div style={{ flex: 1 }}>
        {renderPage()}
      </div>
      <PageFooter dark={dark} onAbout={goAbout} />
    </div>
  );
}

export default App;
