import { useState } from "react";

/* ══════════ THEMES ══════════ */
const LIGHT = {
  bg: "linear-gradient(160deg,#F0F4F8 0%,#E8EEF8 60%,#EBF0FA 100%)",
  bg2: "#FFFFFF", bg3: "#F1F5F9", bg4: "#F8FAFC",
  border: "#E2E8F0", text: "#0F172A", textSub: "#475569", textMuted: "#94A3B8",
  shadow: "0 4px 24px rgba(15,23,42,0.08)",
};
const DARK = {
  bg: "linear-gradient(160deg,#07090F 0%,#0B0F19 60%,#060A14 100%)",
  bg2: "#111827", bg3: "#1A2233", bg4: "#0F1624",
  border: "#1E293B", text: "#F1F5F9", textSub: "#94A3B8", textMuted: "#475569",
  shadow: "0 4px 24px rgba(0,0,0,0.35)",
};

const F      = "'IBM Plex Sans Arabic',sans-serif";
const BLUE   = "#1D9BF0";
const PURPLE = "#8B5CF6";
const GREEN  = "#10B981";
const AMBER  = "#F59E0B";
const RED    = "#EF4444";
const PINK   = "#FE2C55";
const TEAL   = "#06B6D4";

/* ── helpers ── */
function SCard({ title, icon, accent = BLUE, children, T, noPad }) {
  return (
    <div style={{
      background: T.bg2, border: `1px solid ${T.border}`,
      borderRadius: 18, padding: noPad ? 0 : "24px 26px",
      boxShadow: T.shadow, borderTop: `3px solid ${accent}`, overflow: "hidden",
    }}>
      {title && (
        <div style={{ display:"flex", alignItems:"center", gap:10,
          marginBottom:18, direction:"rtl",
          padding: noPad ? "24px 26px 0" : 0 }}>
          <span style={{ fontSize:22 }}>{icon}</span>
          <h2 style={{ color:T.text, fontSize:16, fontWeight:700, fontFamily:F, margin:0 }}>{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

function Tag({ label, color, dark }) {
  return (
    <span style={{
      background: color + (dark ? "18" : "0F"),
      border: `1px solid ${color}30`,
      borderRadius: 20, padding: "4px 13px",
      fontSize: 12, color, fontFamily: F, fontWeight: 600,
      display: "inline-flex", alignItems: "center",
    }}>{label}</span>
  );
}

function FeatureCard({ icon, title, desc, color, T, dark }) {
  return (
    <div style={{
      background: color + (dark ? "10" : "08"),
      border: `1px solid ${color}22`,
      borderRadius: 14, padding: "18px 20px", direction: "rtl",
      transition: "transform 0.2s",
    }}>
      <div style={{ fontSize:26, marginBottom:10 }}>{icon}</div>
      <p style={{ color:T.text, fontSize:13.5, fontWeight:700, fontFamily:F, marginBottom:7 }}>{title}</p>
      <p style={{ color:T.textSub, fontSize:12.5, fontFamily:F, lineHeight:1.8 }}>{desc}</p>
    </div>
  );
}

function Step({ num, title, desc, color, T }) {
  return (
    <div style={{ display:"flex", gap:16, direction:"rtl", alignItems:"flex-start" }}>
      <div style={{
        width:38, height:38, borderRadius:"50%", flexShrink:0,
        background: `linear-gradient(135deg,${color},${color}88)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"#fff", fontWeight:700, fontSize:15, fontFamily:F,
        boxShadow:`0 4px 12px ${color}40`,
      }}>{num}</div>
      <div>
        <p style={{ color:T.text, fontWeight:700, fontSize:13.5, fontFamily:F, marginBottom:5 }}>{title}</p>
        <p style={{ color:T.textSub, fontSize:12.5, fontFamily:F, lineHeight:1.8 }}>{desc}</p>
      </div>
    </div>
  );
}

function StatBox({ icon, value, label, color, T, dark }) {
  return (
    <div style={{
      background: color + (dark ? "12" : "09"),
      border: `1px solid ${color}28`,
      borderRadius: 14, padding: "18px 16px", textAlign: "center",
    }}>
      <div style={{ fontSize:28, marginBottom:8 }}>{icon}</div>
      <p style={{ color, fontSize:22, fontWeight:700, fontFamily:F, margin:"0 0 4px" }}>{value}</p>
      <p style={{ color:T.textMuted, fontSize:11.5, fontFamily:F, lineHeight:1.5 }}>{label}</p>
    </div>
  );
}

/* ══════════ MAIN ══════════ */
export default function AboutPage({ dark }) {
  const T = dark ? DARK : LIGHT;
  const [tab, setTab] = useState("overview");

  const TABS = [
    { id:"overview",    label:"نظرة عامة",        icon:"🏛️" },
    { id:"segments",    label:"الفئات المستهدفة",  icon:"🎯" },
    { id:"features",    label:"الميزات",           icon:"⚡" },
    { id:"methodology", label:"المنهجية",          icon:"🔬" },
    { id:"data",        label:"البيانات والتقنية", icon:"⚙️" },
    { id:"reports",     label:"التقارير",          icon:"📋" },
  ];

  return (
    <div style={{ background:T.bg, fontFamily:F, direction:"rtl", color:T.text, transition:"all 0.4s" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"36px 20px 20px" }}>

        {/* ══ HERO BANNER ══ */}
        <div style={{
          background:"linear-gradient(135deg,#060B18 0%,#0F1A35 40%,#130B2E 100%)",
          borderRadius:22, padding:"52px 44px", marginBottom:32,
          position:"relative", overflow:"hidden",
          boxShadow:"0 24px 70px rgba(0,0,0,0.5)",
        }}>
          {/* glow decorations */}
          {[
            { top:-80, right:-80, size:260, color:"rgba(29,155,240,0.10)" },
            { top:40,  right:220, size:160, color:"rgba(139,92,246,0.08)" },
            { bottom:-60, left:-60, size:220, color:"rgba(16,185,129,0.07)" },
          ].map((g,i) => (
            <div key={i} style={{
              position:"absolute",
              top:g.top, bottom:g.bottom, right:g.right, left:g.left,
              width:g.size, height:g.size, borderRadius:"50%",
              background:`radial-gradient(circle,${g.color},transparent)`,
              pointerEvents:"none",
            }} />
          ))}

          <div style={{ position:"relative", zIndex:1 }}>
            {/* SaaS badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:20,
              background:"rgba(29,155,240,0.10)", border:"1px solid rgba(29,155,240,0.28)",
              borderRadius:30, padding:"7px 18px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:GREEN,
                boxShadow:`0 0 8px ${GREEN}` }} />
              <span style={{ color:GREEN, fontSize:12.5, fontFamily:F, fontWeight:600 }}>
                منصة SaaS · الإصدار 1.0 · مارس 2026
              </span>
            </div>

            {/* Title */}
            <h1 style={{ color:"#F1F5F9", fontSize:38, fontWeight:700, fontFamily:F,
              lineHeight:1.35, marginBottom:18 }}>
              منصة تحليل التأثير الرقمي العربي
              <br />
              <span style={{
                background:"linear-gradient(135deg,#1D9BF0,#8B5CF6,#10B981)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text", fontSize:32,
              }}>
                DataAnalyze
              </span>
            </h1>

            {/* Description */}
            <p style={{ color:"rgba(241,245,249,0.7)", fontSize:15.5, fontFamily:F,
              lineHeight:2.1, maxWidth:700, marginBottom:30 }}>
              منصة تقنية متقدمة تعمل بنظام{" "}
              <strong style={{color:BLUE}}>البرمجيات كخدمة (SaaS)</strong>،
              متخصصة في تحليل بيانات المؤثرين والحملات الرقمية في{" "}
              <strong style={{color:GREEN}}>العالم العربي والإسلامي</strong>.
              تعتمد على تقنيات{" "}
              <strong style={{color:PURPLE}}>الذكاء الاصطناعي</strong>{" "}
              وتحليل اللغة العربية واللهجات المحلية لتحويل البيانات الضخمة إلى
              تقارير تحليلية ورؤى استراتيجية قابلة للتطبيق.
            </p>

            {/* KPIs */}
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              {[
                { v:"3",       l:"تقارير منشورة",      c:BLUE   },
                { v:"158+",    l:"منشور محلَّل",        c:GREEN  },
                { v:"24.6M+",  l:"مشاهدة في العينة",   c:AMBER  },
                { v:"3",       l:"منصة مدعومة",         c:PURPLE },
                { v:"4 أشهر", l:"فترة جمع البيانات",  c:TEAL   },
                { v:"15+",     l:"توصية استراتيجية",   c:PINK   },
              ].map(s => (
                <div key={s.l} style={{
                  background:"rgba(255,255,255,0.06)",
                  border:"1px solid rgba(255,255,255,0.09)",
                  borderRadius:12, padding:"12px 18px", textAlign:"center", minWidth:105,
                }}>
                  <p style={{ color:s.c, fontSize:20, fontWeight:700, fontFamily:F, margin:"0 0 3px" }}>{s.v}</p>
                  <p style={{ color:"rgba(255,255,255,0.4)", fontSize:10.5, fontFamily:F }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ TABS ══ */}
        <div style={{
          display:"flex", gap:5, marginBottom:26, flexWrap:"wrap",
          background:T.bg2, borderRadius:14, padding:8,
          border:`1px solid ${T.border}`,
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex:1, minWidth:110, padding:"9px 12px",
              borderRadius:9, border:"none", cursor:"pointer",
              fontFamily:F, fontSize:12.5, fontWeight:600, transition:"all 0.2s",
              background: tab === t.id
                ? "linear-gradient(135deg,#1D9BF0,#8B5CF6)"
                : "transparent",
              color: tab === t.id ? "#fff" : T.textSub,
              boxShadow: tab === t.id ? "0 4px 14px rgba(29,155,240,0.35)" : "none",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ══════════ TAB: OVERVIEW ══════════ */}
        {tab === "overview" && (
          <div style={{ display:"grid", gap:22 }}>

            {/* Mission */}
            <SCard title="الرسالة" icon="🏛️" accent={BLUE} T={T}>
              <p style={{ color:T.textSub, fontSize:14.5, lineHeight:2.1, fontFamily:F }}>
                تأسست <strong style={{color:BLUE}}>DataAnalyze</strong> بهدف تمكين{" "}
                <strong style={{color:T.text}}>الشركات والمؤسسات الإعلامية والجمعيات الخيرية وصناع المحتوى</strong>{" "}
                من فهم تأثيرهم الرقمي الحقيقي. نحن نؤمن أن البيانات يجب أن تكون في متناول كل مؤسسة
                عربية بصرف النظر عن حجمها، وأن كل رقم يحكي قصة تستحق أن تُفهم وتُترجم إلى قرار.
              </p>
            </SCard>

            {/* Vision + Values */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>

              <SCard title="الرؤية" icon="🔭" accent={PURPLE} T={T}>
                <p style={{ color:T.textSub, fontSize:13.5, lineHeight:1.95, fontFamily:F }}>
                  أن نكون المرجع الأول والأكثر موثوقية لتحليل التأثير الرقمي في المنطقة العربية،
                  ونمكّن كل مؤسسة من اتخاذ قرارات إعلامية وتسويقية مبنية على بيانات حقيقية
                  وليس على التخمين.
                </p>
              </SCard>

              <SCard title="القيم" icon="⭐" accent={GREEN} T={T}>
                <div style={{ display:"grid", gap:10 }}>
                  {[
                    { icon:"🎯", label:"الدقة أولاً",    desc:"100% بيانات فعلية، لا أرقام مُضخَّمة" },
                    { icon:"🔍", label:"الشفافية الكاملة", desc:"كل رقم مع مصدره وطريقة حسابه" },
                    { icon:"🌍", label:"الهوية العربية",  desc:"نفهم ثقافة الجمهور العربي وخصوصيته" },
                    { icon:"⚡", label:"القابلية للتطبيق", desc:"توصيات عملية لا تقارير نظرية فارغة" },
                  ].map(v => (
                    <div key={v.label} style={{ display:"flex", gap:10, alignItems:"flex-start", direction:"rtl" }}>
                      <span style={{ fontSize:18, flexShrink:0 }}>{v.icon}</span>
                      <div>
                        <p style={{ color:T.text, fontWeight:700, fontSize:12.5, fontFamily:F }}>{v.label}</p>
                        <p style={{ color:T.textMuted, fontSize:11.5, fontFamily:F }}>{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SCard>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:14 }}>
              <StatBox icon="📊" value="3"      label="تقارير تحليلية متكاملة"  color={BLUE}   T={T} dark={dark} />
              <StatBox icon="📝" value="158+"   label="منشور وفيديو محلَّل"     color={GREEN}  T={T} dark={dark} />
              <StatBox icon="👁️" value="24.6M+" label="مشاهدة في عينة التحليل" color={AMBER}  T={T} dark={dark} />
              <StatBox icon="🧠" value="AI"     label="ذكاء اصطناعي وNLP عربي" color={PURPLE} T={T} dark={dark} />
              <StatBox icon="🌍" value="3+"     label="منصة: YouTube · X · TikTok" color={TEAL} T={T} dark={dark} />
              <StatBox icon="🎯" value="15+"    label="توصية استراتيجية قابلة للتطبيق" color={PINK} T={T} dark={dark} />
            </div>

            {/* Problem + Solution */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>

              <div style={{
                background: dark ? "rgba(239,68,68,0.07)" : "#FFF5F5",
                border:`1px solid ${RED}25`, borderRadius:16, padding:"22px 24px", direction:"rtl",
              }}>
                <p style={{ color:RED, fontWeight:700, fontSize:14.5, fontFamily:F, marginBottom:14 }}>
                  ❌ المشكلة
                </p>
                {[
                  "المؤسسات العربية تعتمد على التخمين في قراراتها الإعلامية",
                  "أدوات التحليل العالمية لا تفهم السياق الثقافي واللغوي العربي",
                  "البيانات الخام معقدة ولا تُترجم تلقائياً إلى قرارات",
                  "غياب معايير قياس موحدة للتأثير في المنطقة العربية",
                ].map(p => (
                  <div key={p} style={{ display:"flex", gap:8, marginBottom:10, alignItems:"flex-start" }}>
                    <span style={{ color:RED, fontSize:13, flexShrink:0, marginTop:2 }}>•</span>
                    <p style={{ color:T.textSub, fontSize:13, fontFamily:F, lineHeight:1.7 }}>{p}</p>
                  </div>
                ))}
              </div>

              <div style={{
                background: dark ? "rgba(16,185,129,0.07)" : "#F0FDF4",
                border:`1px solid ${GREEN}25`, borderRadius:16, padding:"22px 24px", direction:"rtl",
              }}>
                <p style={{ color:GREEN, fontWeight:700, fontSize:14.5, fontFamily:F, marginBottom:14 }}>
                  ✅ الحل
                </p>
                {[
                  "تحليل بيانات حقيقية بخوارزميات مدرَّبة على المحتوى العربي",
                  "نماذج NLP تفهم العربية الفصحى و12+ لهجة محلية",
                  "تقارير بصرية تحوّل الأرقام إلى قرارات واضحة",
                  "معايير قياس مُعتمدة تناسب طبيعة الجمهور العربي",
                ].map(s => (
                  <div key={s} style={{ display:"flex", gap:8, marginBottom:10, alignItems:"flex-start" }}>
                    <span style={{ color:GREEN, fontSize:13, flexShrink:0, marginTop:2 }}>✓</span>
                    <p style={{ color:T.textSub, fontSize:13, fontFamily:F, lineHeight:1.7 }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════ TAB: SEGMENTS ══════════ */}
        {tab === "segments" && (
          <div style={{ display:"grid", gap:20 }}>

            <SCard title="الفئات المستهدفة" icon="🎯" accent={BLUE} T={T}>
              <p style={{ color:T.textSub, fontSize:14, lineHeight:2, fontFamily:F, marginBottom:22 }}>
                صُممت المنصة لخدمة طيف واسع من المؤسسات والأفراد في المنطقة العربية والإسلامية:
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
                {[
                  {
                    icon:"🏢", title:"الشركات والعلامات التجارية", color:BLUE,
                    desc:"قياس أثر الحملات التسويقية ومعرفة أي المؤثرين يحقق أعلى عائد على الاستثمار. تحليل منافسيك ومعرفة مكانتك في السوق الرقمي.",
                    tags:["ROI Analysis","Campaign Tracking","Brand Monitoring"],
                  },
                  {
                    icon:"📺", title:"المؤسسات الإعلامية", color:PURPLE,
                    desc:"فهم سلوك جمهورك الرقمي وتفضيلاته. تحليل أداء المحتوى الصحفي والبرامجي على منصات التواصل وتحديد الموضوعات الأعلى تفاعلاً.",
                    tags:["Audience Analytics","Content Performance","Trend Detection"],
                  },
                  {
                    icon:"🕌", title:"الجمعيات الخيرية والمؤسسات الدينية", color:GREEN,
                    desc:"قياس أثر الحملات التوعوية والخيرية. فهم كيف ينتشر المحتوى الديني والإنساني ومتى يكون أكثر تأثيراً في الجمهور المسلم.",
                    tags:["Campaign Impact","Donation Conversion","Community Engagement"],
                  },
                  {
                    icon:"🎬", title:"صناع المحتوى والمؤثرون", color:AMBER,
                    desc:"تقرير شامل لحسابك يكشف أفضل أوقات النشر والمحتوى الأعلى تفاعلاً وفرص النمو غير المستغلة. فهم جمهورك بعمق لبناء استراتيجية محتوى ناجحة.",
                    tags:["Growth Strategy","Content Optimization","Audience Insights"],
                  },
                  {
                    icon:"🎓", title:"المؤسسات الأكاديمية والبحثية", color:TEAL,
                    desc:"بيانات موثقة ومنهجية علمية شفافة لدعم الأبحاث في مجالات الإعلام الرقمي وعلم الاجتماع والتسويق في السياق العربي.",
                    tags:["Research Data","Academic Reports","Methodology Docs"],
                  },
                  {
                    icon:"🏛️", title:"الجهات الحكومية والرقابية", color:PINK,
                    desc:"رصد الرأي العام الرقمي وقياس أثر الحملات التوعوية الحكومية وتحليل المشاعر حول القرارات والسياسات العامة.",
                    tags:["Public Sentiment","Policy Impact","Crisis Monitoring"],
                  },
                ].map(seg => (
                  <div key={seg.title} style={{
                    background:seg.color + (dark?"12":"08"),
                    border:`1px solid ${seg.color}22`,
                    borderRadius:16, padding:"20px 22px", direction:"rtl",
                  }}>
                    <div style={{ fontSize:28, marginBottom:10 }}>{seg.icon}</div>
                    <p style={{ color:T.text, fontWeight:700, fontSize:14, fontFamily:F, marginBottom:8 }}>
                      {seg.title}
                    </p>
                    <p style={{ color:T.textSub, fontSize:12.5, fontFamily:F, lineHeight:1.8, marginBottom:12 }}>
                      {seg.desc}
                    </p>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {seg.tags.map(t => (
                        <span key={t} style={{
                          background:seg.color+"18", border:`1px solid ${seg.color}30`,
                          borderRadius:20, padding:"2px 10px", fontSize:10.5,
                          color:seg.color, fontFamily:F, fontWeight:600,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SCard>

          </div>
        )}

        {/* ══════════ TAB: FEATURES ══════════ */}
        {tab === "features" && (
          <div style={{ display:"grid", gap:20 }}>

            {/* Core capabilities */}
            <SCard title="الميزات الجوهرية" icon="⚡" accent={PURPLE} T={T}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
                {[
                  { icon:"📈", title:"تحليل نمو الجمهور",          color:BLUE,
                    desc:"رسم بياني تاريخي كامل مع نماذج تنبؤ ARIMA لاستشراف النمو المستقبلي بفترات ثقة واضحة." },
                  { icon:"❤️", title:"قياس التفاعل العميق",        color:RED,
                    desc:"معدلات الإعجاب والتعليق والمشاركة والحفظ مع مقارنة بمعايير الصناعة في نفس الفئة." },
                  { icon:"🧠", title:"تحليل المشاعر بالعربية",     color:PURPLE,
                    desc:"NLP مُحسَّن للغة العربية الفصحى واللهجات الخليجية والمصرية والشامية والمغاربية." },
                  { icon:"📂", title:"تصنيف المحتوى التلقائي",     color:GREEN,
                    desc:"تصنيف ذكي للمنشورات حسب النوع والموضوع والهدف مع اكتشاف الاتجاهات الناشئة." },
                  { icon:"🗺️", title:"التوزيع الجغرافي",          color:TEAL,
                    desc:"خريطة تفصيلية للجمهور عبر دول المنطقة العربية مع تحديد فرص التوسع الجغرافي." },
                  { icon:"⏰", title:"تحليل التوقيت الأمثل",       color:AMBER,
                    desc:"تحديد أفضل أيام وساعات النشر بناءً على بيانات التفاعل التاريخية لكل جمهور." },
                  { icon:"💰", title:"فرص الإيرادات",              color:PINK,
                    desc:"تقييم مصادر الدخل غير المستغلة مع تقدير العائد المالي المحتمل لكل فرصة." },
                  { icon:"🏆", title:"تحليل المنافسين",            color:PURPLE,
                    desc:"مقارنة شاملة مع أبرز الحسابات المنافسة في نفس التخصص والجمهور." },
                  { icon:"🔮", title:"التوقعات المستقبلية",        color:BLUE,
                    desc:"نماذج رياضية معتمدة للتنبؤ بالنمو والتفاعل والوصول خلال الأشهر القادمة." },
                ].map(f => (
                  <FeatureCard key={f.title} {...f} T={T} dark={dark} />
                ))}
              </div>
            </SCard>

            {/* AI capabilities */}
            <SCard title="قدرات الذكاء الاصطناعي" icon="🤖" accent={TEAL} T={T}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:14 }}>
                {[
                  {
                    icon:"🗣️", title:"معالجة اللغة العربية (NLP)",
                    color:TEAL, points:[
                      "تحليل نص كامل بالعربية الفصحى",
                      "دعم 12+ لهجة عربية محلية",
                      "استخراج الكيانات المسماة (أشخاص · أماكن · منظمات)",
                      "تحليل المشاعر متعدد الدرجات (6 فئات)",
                    ],
                  },
                  {
                    icon:"🔍", title:"اكتشاف الأنماط والشذوذات",
                    color:PURPLE, points:[
                      "كشف منشورات التفاعل الاصطناعي (Fake Engagement)",
                      "رصد الانفجارات المفاجئة في الوصول",
                      "تحديد أنماط التكرار الموسمي",
                      "تنبيه تلقائي عند الانحرافات الكبيرة",
                    ],
                  },
                  {
                    icon:"📊", title:"نماذج التنبؤ والتوقع",
                    color:BLUE, points:[
                      "ARIMA للتنبؤ بسلاسل زمنية المشتركين",
                      "انحدار متعدد المتغيرات للتفاعل",
                      "تحليل بيزي لتوقع الأداء",
                      "فترات ثقة 95% لكل توقع",
                    ],
                  },
                ].map(ai => (
                  <div key={ai.title} style={{
                    background:ai.color+(dark?"10":"08"),
                    border:`1px solid ${ai.color}22`,
                    borderRadius:14, padding:"18px 20px", direction:"rtl",
                  }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
                      <span style={{ fontSize:22 }}>{ai.icon}</span>
                      <p style={{ color:ai.color, fontWeight:700, fontSize:13.5, fontFamily:F }}>{ai.title}</p>
                    </div>
                    {ai.points.map(pt => (
                      <div key={pt} style={{ display:"flex", gap:8, marginBottom:7, alignItems:"flex-start" }}>
                        <span style={{ color:ai.color, fontSize:12, flexShrink:0, marginTop:3 }}>▸</span>
                        <p style={{ color:T.textSub, fontSize:12.5, fontFamily:F, lineHeight:1.7 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </SCard>

            {/* Deliverables */}
            <SCard title="مخرجات التقرير" icon="📄" accent={GREEN} T={T}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
                {[
                  { icon:"📊", label:"لوحة تحليلية تفاعلية",       desc:"رسوم بيانية حية مع فلاتر زمنية",      color:BLUE   },
                  { icon:"📑", label:"تقرير PDF قابل للتصدير",      desc:"تقرير منسق جاهز للعرض والمشاركة",     color:PURPLE },
                  { icon:"💡", label:"ملخص تنفيذي",                 desc:"أبرز النتائج في صفحة واحدة",          color:GREEN  },
                  { icon:"🎯", label:"توصيات استراتيجية مرقّمة",   desc:"خطوات عملية مرتبة حسب الأولوية",     color:AMBER  },
                  { icon:"📈", label:"توقعات قابلة للقياس",         desc:"KPIs متوقعة للأشهر الثلاثة القادمة", color:TEAL   },
                  { icon:"⚠️", label:"تحذيرات ونقاط ضعف",          desc:"مخاطر تحتاج معالجة فورية",           color:RED    },
                ].map(d => (
                  <div key={d.label} style={{
                    background:T.bg3, border:`1px solid ${T.border}`,
                    borderRadius:12, padding:"14px 16px", direction:"rtl",
                  }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                      <span style={{ fontSize:20 }}>{d.icon}</span>
                      <p style={{ color:d.color, fontWeight:700, fontSize:13, fontFamily:F }}>{d.label}</p>
                    </div>
                    <p style={{ color:T.textMuted, fontSize:12, fontFamily:F, lineHeight:1.6 }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </SCard>

          </div>
        )}

        {/* ══════════ TAB: METHODOLOGY ══════════ */}
        {tab === "methodology" && (
          <div style={{ display:"grid", gap:20 }}>

            <SCard title="منهجية العمل العلمية" icon="🔬" accent={GREEN} T={T}>
              <p style={{ color:T.textSub, fontSize:14, lineHeight:2, fontFamily:F, marginBottom:24 }}>
                نتبع منهجية بحثية صارمة من <strong style={{color:GREEN}}>6 مراحل متكاملة</strong>{" "}
                تضمن دقة البيانات وموثوقية النتائج وقابلية التطبيق:
              </p>
              <div style={{ display:"grid", gap:20 }}>
                {[
                  { num:1, color:BLUE,   title:"تحديد العينة والنطاق",
                    desc:"اختيار الحسابات بناءً على معايير الأصالة والتفاعل الحقيقي والتأثير الموثق. نرفض الحسابات التي تعتمد على المتابعين المشتراة أو التفاعل الاصطناعي. نحدد نطاق زمني واضح لكل عينة." },
                  { num:2, color:GREEN,  title:"جمع البيانات الخام",
                    desc:"استخدام Apify Scrapers وواجهات API الرسمية للحصول على بيانات حقيقية ودقيقة. نجمع: المنشورات الكاملة · التفاعلات التفصيلية · توقيت النشر · الخصائص الديموغرافية · التعليقات." },
                  { num:3, color:AMBER,  title:"تنظيف البيانات والتحقق",
                    desc:"فلترة البيانات المكررة والشاذة والناقصة. التحقق من سلامة التواريخ والأرقام. توحيد تنسيق البيانات. كل منشور ناقص البيانات يُستبعد لضمان نزاهة التحليل." },
                  { num:4, color:PURPLE, title:"التحليل الإحصائي والذكاء الاصطناعي",
                    desc:"تطبيق نماذج إحصائية متعددة: ARIMA للتنبؤ الزمني · انحدار متعدد المتغيرات · ارتباط بيرسون · تحليل بيزي · NLP للمشاعر والتصنيف. كل نموذج يُختبر بمعيار دقة واضح." },
                  { num:5, color:TEAL,   title:"استخراج الرؤى وتفسير النتائج",
                    desc:"تحويل الأرقام إلى رؤى مفهومة. ربط الأنماط بالسياق الثقافي والديني والموسمي للمنطقة العربية. مقارنة بمعايير الصناعة المحلية وليس المعايير العالمية غير الملائمة." },
                  { num:6, color:PINK,   title:"التصور البصري والتقرير النهائي",
                    desc:"بناء لوحات تفاعلية بـ Recharts مع دعم كامل للعربية وRTL. تصميم تقارير مرئية تفاعلية وPDF مصدَّرة. تضمين شرح آليات الحساب لضمان الشفافية الكاملة." },
                ].map(s => <Step key={s.num} {...s} T={T} />)}
              </div>
            </SCard>

            <SCard title="معايير الجودة" icon="🏅" accent={AMBER} T={T}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14 }}>
                {[
                  { icon:"🎯", label:"الدقة",          color:BLUE,   desc:"100% بيانات فعلية من المصدر مباشرةً، صفر توقعات افتراضية دون تحقق مستقل" },
                  { icon:"🔍", label:"الشفافية",        color:GREEN,  desc:"كل رقم مرفق بمصدره وطريقة حسابه ونموذجه الإحصائي — قابل للتدقيق والمراجعة" },
                  { icon:"📐", label:"الصرامة العلمية", color:PURPLE, desc:"نماذج إحصائية موثقة مع فترات ثقة 95% وتحقق من افتراضات النموذج" },
                  { icon:"🌍", label:"السياق العربي",   color:TEAL,   desc:"تفسير النتائج في ضوء الثقافة والمواسم والأحداث المحلية لا المعايير العالمية" },
                  { icon:"🔄", label:"التحديث الدوري",  color:AMBER,  desc:"مراجعة البيانات كل ربع سنة لضمان الحداثة والملاءمة للواقع الراهن" },
                  { icon:"⚖️", label:"الموضوعية",       color:PINK,   desc:"تحليل محايد لا يتأثر بتوجهات المؤثر أو الجهة الطالبة للتقرير" },
                ].map(q => (
                  <div key={q.label} style={{
                    background:q.color+(dark?"10":"07"),
                    border:`1px solid ${q.color}22`,
                    borderRadius:12, padding:"16px 18px", direction:"rtl",
                  }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                      <span style={{ fontSize:22 }}>{q.icon}</span>
                      <p style={{ color:q.color, fontWeight:700, fontSize:13.5, fontFamily:F }}>{q.label}</p>
                    </div>
                    <p style={{ color:T.textSub, fontSize:12, fontFamily:F, lineHeight:1.75 }}>{q.desc}</p>
                  </div>
                ))}
              </div>
            </SCard>

          </div>
        )}

        {/* ══════════ TAB: DATA & TECH ══════════ */}
        {tab === "data" && (
          <div style={{ display:"grid", gap:20 }}>

            {/* Data sources */}
            <SCard title="مصادر البيانات" icon="📡" accent={BLUE} T={T}>
              <div style={{ display:"grid", gap:16 }}>
                {[
                  {
                    name:"YouTube Analytics", color:"#FF0000",
                    bg:"linear-gradient(135deg,#FF0000,#CC0000)",
                    handle:"نايف الشرهان · UCwvKV9SkC4ugFEuc-4kZTtg",
                    icon:(
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                    points:["بيانات المشتركين الشهرية (12 شهراً)","إحصاءات 148 فيديو كاملة","التوزيع الجغرافي للجمهور","التركيبة العمرية والجنسية","معدلات CTR والاحتفاظ بالمشاهد","بيانات Channel Analytics Studio"],
                  },
                  {
                    name:"Apify X Scraper", color:BLUE,
                    bg:`linear-gradient(135deg,${BLUE},#0D7CC9)`,
                    handle:"@jumaianabd · ديسمبر 2025 – مارس 2026",
                    icon:(
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                    points:["50 منشور فعلي مُستخرج","تواريخ النشر الدقيقة","الإعجابات والـ Reposts والردود","عدد المشاهدات لكل منشور","المحتوى الكامل للتغريدات","الهاشتاقات والإشارات"],
                  },
                  {
                    name:"TikTok Profile Data", color:PINK,
                    bg:`linear-gradient(135deg,${PINK},#010101)`,
                    handle:"@dialog.fa · مارس 2026",
                    icon:(
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                      </svg>
                    ),
                    points:["8,311 متابع (بيانات فعلية)","94,200 إعجاب إجمالي","أداء كل فيديو على حدة","معدلات التفاعل التفصيلية","توقيت النشر وارتباطه بالأداء","بيانات البيو والوصف الكامل"],
                  },
                ].map(src => (
                  <div key={src.name} style={{
                    background:src.color+"08", border:`1px solid ${src.color}22`,
                    borderRadius:14, padding:"20px 22px", direction:"rtl",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                      <div style={{
                        width:42, height:42, borderRadius:11, background:src.bg,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        boxShadow:`0 4px 14px ${src.color}40`,
                      }}>{src.icon}</div>
                      <div>
                        <p style={{ color:T.text, fontWeight:700, fontSize:14, fontFamily:F }}>{src.name}</p>
                        <p style={{ color:src.color, fontSize:11.5, fontFamily:F }}>{src.handle}</p>
                      </div>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:7 }}>
                      {src.points.map(pt => (
                        <span key={pt} style={{
                          background:src.color+"12", border:`1px solid ${src.color}20`,
                          borderRadius:8, padding:"5px 10px", fontSize:11.5,
                          color:src.color, fontFamily:F,
                        }}>✓ {pt}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SCard>

            {/* Tech stack */}
            <SCard title="المكدس التقني" icon="⚙️" accent={PURPLE} T={T}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
                {[
                  { cat:"الواجهة الأمامية",       icon:"🖥️", color:BLUE,
                    items:["React 18","Recharts 2.10","CSS-in-JS","IBM Plex Sans Arabic","RTL Support"] },
                  { cat:"جمع البيانات",           icon:"📡", color:GREEN,
                    items:["Apify X Scraper","YouTube Analytics API","TikTok Web Data","JSON Processing"] },
                  { cat:"التحليل الإحصائي",      icon:"📐", color:AMBER,
                    items:["ARIMA Forecasting","Pearson Correlation","Linear Regression","Bayesian Analysis"] },
                  { cat:"الذكاء الاصطناعي",      icon:"🤖", color:PURPLE,
                    items:["Arabic NLP","Sentiment Analysis","Entity Recognition","Pattern Detection"] },
                  { cat:"النشر والبنية التحتية", icon:"🚀", color:PINK,
                    items:["Vercel Deployment","Create React App","GitHub CI","Responsive Design"] },
                ].map(sec => (
                  <div key={sec.cat} style={{
                    background:T.bg3, border:`1px solid ${T.border}`,
                    borderRadius:12, padding:"16px 18px", direction:"rtl",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <span style={{ fontSize:18 }}>{sec.icon}</span>
                      <p style={{ color:sec.color, fontWeight:700, fontSize:13, fontFamily:F }}>{sec.cat}</p>
                    </div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {sec.items.map(it => (
                        <span key={it} style={{
                          background:sec.color+"15", border:`1px solid ${sec.color}28`,
                          borderRadius:20, padding:"3px 10px", fontSize:11,
                          color:sec.color, fontFamily:F, fontWeight:600,
                        }}>{it}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SCard>

            {/* Disclaimer */}
            <div style={{
              background:dark?"rgba(245,158,11,0.07)":"#FFFBEB",
              border:`1px solid ${AMBER}35`, borderRadius:14, padding:"20px 24px", direction:"rtl",
            }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:22, flexShrink:0 }}>⚠️</span>
                <div>
                  <p style={{ color:AMBER, fontWeight:700, fontSize:14, fontFamily:F, marginBottom:8 }}>إخلاء مسؤولية</p>
                  <p style={{ color:T.textSub, fontSize:13, fontFamily:F, lineHeight:1.9 }}>
                    هذه التقارير لأغراض تعليمية وبحثية فقط. البيانات جُمعت من مصادر عامة متاحة
                    باحترام كامل لشروط الاستخدام الخاصة بكل منصة. التوقعات المستقبلية تقديرية
                    ولا تُعد ضماناً. أرقام التفاعل تعكس فترة جمع البيانات وقد تتغير.
                    لا تعكس التقارير أي موقف سياسي أو ديني أو ثقافي محدد.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ══════════ TAB: REPORTS ══════════ */}
        {tab === "reports" && (
          <div style={{ display:"grid", gap:20 }}>

            <SCard title="التقارير المتاحة حالياً" icon="📋" accent={BLUE} T={T}>
              <div style={{ display:"grid", gap:18 }}>
                {[
                  {
                    platform:"YouTube", color:"#FF0000", bg:"linear-gradient(135deg,#FF0000,#CC0000)",
                    influencer:"نايف الشرهان", handle:"@nayef_alshahrani", flag:"🇰🇼",
                    specialty:"منشد كويتي · أناشيد دينية وعائلية",
                    stats:["572K مشترك","148 نشيد","24.6M مشاهدة","6.8% تفاعل"],
                    depth:"~2,500 سطر تحليل",
                    sections:["نمو المشتركين (12 شهراً + ARIMA)","أداء أفضل 6 فيديوهات","التوزيع الجغرافي (5 دول)","التركيبة الديموغرافية","أفضل أيام وأوقات النشر","مقارنة 10 منافسين","خارطة طريق الإيرادات ($150K+)"],
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
                  },
                  {
                    platform:"X (تويتر)", color:BLUE, bg:`linear-gradient(135deg,${BLUE},#0D7CC9)`,
                    influencer:"عبدالرحمن الجميعان", handle:"@jumaianabd", flag:"🇸🇦",
                    specialty:"محتوى ديني وسياسي وإصلاحي",
                    stats:["3–5K متابع","50 منشور فعلي","Apify Data","مارس 2026"],
                    depth:"~2,000 سطر تحليل",
                    sections:["تحليل 50 منشوراً (ديسمبر 2025 – مارس 2026)","تحليل المشاعر (74% إيجابي)","تصنيف المحتوى (ديني · سياسي · إصلاحي)","أنماط التفاعل حسب اليوم والوقت","أثر طول التغريدة على التفاعل","تحليل الهاشتاقات الأكثر تأثيراً","توصيات نمو مبنية على البيانات"],
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                  },
                  {
                    platform:"TikTok", color:PINK, bg:`linear-gradient(135deg,${PINK},#010101)`,
                    influencer:"گفتمان فرهنگی", handle:"@dialog.fa", flag:"🌍",
                    specialty:"محتوى ثقافي فارسي-عربي حواري",
                    stats:["8,311 متابع","94,200 إعجاب","محتوى ثقافي","مارس 2026"],
                    depth:"~1,800 سطر تحليل",
                    sections:["تحليل أداء جميع الفيديوهات الفردية","معدلات التفاعل التفصيلية لكل فيديو","مقارنة المحتوى الثقافي vs الترفيهي","استراتيجية الوصول إلى 50K متابع","فرص التعاون مع منصات عربية","تحسين التوقيت والتكرار","توقعات النمو (6 أشهر)"],
                    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>,
                  },
                ].map(r => (
                  <div key={r.platform} style={{
                    background:T.bg3, border:`1px solid ${T.border}`,
                    borderRadius:16, padding:"22px 24px", direction:"rtl",
                    borderRight:`4px solid ${r.color}`,
                  }}>
                    <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:14 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:44, height:44, borderRadius:12, background:r.bg,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          boxShadow:`0 4px 14px ${r.color}40` }}>{r.icon}</div>
                        <div>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <p style={{ color:T.text, fontWeight:700, fontSize:15, fontFamily:F }}>{r.influencer}</p>
                            <span style={{ fontSize:16 }}>{r.flag}</span>
                          </div>
                          <p style={{ color:r.color, fontSize:12, fontFamily:F, fontWeight:600 }}>{r.handle} · {r.platform}</p>
                          <p style={{ color:T.textMuted, fontSize:11.5, fontFamily:F }}>{r.specialty}</p>
                        </div>
                      </div>
                      <span style={{ background:r.color+"18", border:`1px solid ${r.color}30`,
                        borderRadius:20, padding:"4px 14px", fontSize:11, color:r.color,
                        fontFamily:F, fontWeight:600, alignSelf:"flex-start" }}>{r.depth}</span>
                    </div>
                    <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
                      {r.stats.map(s => (
                        <Tag key={s} label={s} color={r.color} dark={dark} />
                      ))}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:6 }}>
                      {r.sections.map(s => (
                        <div key={s} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                          <span style={{ color:r.color, fontSize:12, flexShrink:0, marginTop:3 }}>✓</span>
                          <p style={{ color:T.textSub, fontSize:12.5, fontFamily:F, lineHeight:1.6 }}>{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SCard>

            {/* Roadmap */}
            <SCard title="خارطة الطريق · التقارير القادمة" icon="🗺️" accent={AMBER} T={T}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:12, direction:"rtl" }}>
                {[
                  { icon:"📸", name:"Instagram",   status:"قريباً",      color:PURPLE, desc:"تحليل Reels والتفاعل البصري والستوري" },
                  { icon:"💬", name:"Snapchat",    status:"قيد الدراسة", color:AMBER,  desc:"تحليل القصص والمحتوى العابر وSpotlight" },
                  { icon:"🔵", name:"LinkedIn",    status:"مخطط له",     color:BLUE,   desc:"تحليل المحتوى المهني والتجاري والتوظيفي" },
                  { icon:"📺", name:"YouTube #2",  status:"مخطط له",     color:RED,    desc:"مؤثر يوتيوب ثانٍ في قطاع ترفيهي مختلف" },
                ].map(r => (
                  <div key={r.name} style={{
                    background:T.bg3, border:`1px solid ${T.border}`,
                    borderRadius:12, padding:"16px 18px", direction:"rtl", opacity:0.85,
                  }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:20 }}>{r.icon}</span>
                        <p style={{ color:T.text, fontWeight:700, fontSize:13, fontFamily:F }}>{r.name}</p>
                      </div>
                      <span style={{ background:r.color+"18", border:`1px solid ${r.color}30`,
                        borderRadius:20, padding:"2px 9px", fontSize:10.5,
                        color:r.color, fontFamily:F, fontWeight:600 }}>{r.status}</span>
                    </div>
                    <p style={{ color:T.textMuted, fontSize:12, fontFamily:F, lineHeight:1.6 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </SCard>

          </div>
        )}

      </div>
    </div>
  );
}
