import React, { useState } from 'react';
import MainPage from './MainPage';
import NayefDashboard from './nayef_dashboard_v3';
import XDashboardPage from './XDashboard';
import TikTokDialogDashboard from './TikTokDialogDashboard';

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

function PageHeader({ page, onBack }) {
  const [hovered, setHovered] = useState(false);
  const meta = PAGE_META[page];

  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: "rgba(7,9,15,0.82)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 2px 20px rgba(0,0,0,0.35)",
      fontFamily: "'IBM Plex Sans Arabic',sans-serif",
      direction: "rtl",
    }}>
      <div style={{
        maxWidth: 1440,
        margin: "0 auto",
        padding: "0 20px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>

        {/* Right: DataAnalyze branding */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg,#1D9BF0,#8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, flexShrink: 0,
          }}>📊</div>
          <span style={{
            color: "#F1F5F9", fontSize: 15, fontWeight: 700,
            fontFamily: "'IBM Plex Sans Arabic',sans-serif",
            letterSpacing: "-0.2px",
          }}>DataAnalyze</span>

          {/* Separator */}
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18, marginRight: 2 }}>›</span>

          {/* Platform badge */}
          {meta && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: meta.bg,
              borderRadius: 20, padding: "4px 12px",
              boxShadow: `0 2px 10px ${meta.color}40`,
            }}>
              {meta.icon}
              <span style={{
                color: "#FFF", fontSize: 12, fontWeight: 600,
                fontFamily: "'IBM Plex Sans Arabic',sans-serif",
              }}>{meta.label}</span>
            </div>
          )}

          {/* Influencer name */}
          {meta?.name && (
            <span style={{
              color: "rgba(255,255,255,0.45)", fontSize: 12,
              fontFamily: "'IBM Plex Sans Arabic',sans-serif",
              display: "flex",
            }}>{meta.name}</span>
          )}
        </div>

        {/* Left: Back button */}
        <button
          onClick={onBack}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: hovered ? "rgba(29,155,240,0.85)" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, padding: "6px 14px",
            cursor: "pointer", color: "#F1F5F9",
            fontSize: 13, fontFamily: "'IBM Plex Sans Arabic',sans-serif",
            fontWeight: 600, transition: "all 0.2s",
            flexShrink: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          الرئيسية
        </button>

      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");

  if (page === "youtube") {
    return (
      <div>
        <PageHeader page="youtube" onBack={() => setPage("home")} />
        <NayefDashboard />
      </div>
    );
  }

  if (page === "twitter") {
    return (
      <div>
        <PageHeader page="twitter" onBack={() => setPage("home")} />
        <XDashboardPage />
      </div>
    );
  }

  if (page === "tiktok") {
    return (
      <div>
        <PageHeader page="tiktok" onBack={() => setPage("home")} />
        <TikTokDialogDashboard />
      </div>
    );
  }

  return <MainPage onNavigate={setPage} />;
}

export default App;
