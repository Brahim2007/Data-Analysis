import { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, ComposedChart
} from "recharts";

/* ══════════════════════════════════════════
   THEME TOKENS
══════════════════════════════════════════ */
const LIGHT = {
  bg:          "#F7F5F0",
  bg2:         "#FFFFFF",
  bg3:         "#F0EDE6",
  border:      "#E2D9C8",
  borderAccent:"#C9A84C",
  text:        "#1A1208",
  textSub:     "#6B5E40",
  textMuted:   "#A0916E",
  gold:        "#B8860B",
  goldBright:  "#D4AF37",
  amber:       "#C9935A",
  green:       "#2E7D52",
  red:         "#B94030",
  purple:      "#5B5080",
  cardShadow:  "0 2px 12px rgba(180,150,80,0.1)",
  headerBorder:"1px solid #E2D9C8",
  chartGrid:   "rgba(180,150,80,0.15)",
  tooltipBg:   "rgba(255,252,245,0.98)",
  tooltipBorder:"#D4AF37",
};
const DARK = {
  bg:          "#0A0A14",
  bg2:         "#0F0F1E",
  bg3:         "#141428",
  border:      "#2A2540",
  borderAccent:"#D4AF37",
  text:        "#F0E8D0",
  textSub:     "#A09070",
  textMuted:   "#6A5A40",
  gold:        "#D4AF37",
  goldBright:  "#E8C84A",
  amber:       "#C9935A",
  green:       "#4CAF82",
  red:         "#C0513A",
  purple:      "#8B7E9E",
  cardShadow:  "0 2px 20px rgba(0,0,0,0.4)",
  headerBorder:"1px solid rgba(212,175,55,0.15)",
  chartGrid:   "rgba(212,175,55,0.08)",
  tooltipBg:   "rgba(8,8,20,0.97)",
  tooltipBorder:"#D4AF3760",
};

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const subscriberGrowth = [
  { month:"يناير",   مشتركون:180000, مشاهدات:920000,  فيديوهات:6  },
  { month:"فبراير",  مشتركون:210000, مشاهدات:1050000, فيديوهات:5  },
  { month:"مارس",    مشتركون:245000, مشاهدات:1340000, فيديوهات:8  },
  { month:"أبريل",   مشتركون:270000, مشاهدات:1220000, فيديوهات:5  },
  { month:"مايو",    مشتركون:310000, مشاهدات:1580000, فيديوهات:7  },
  { month:"يونيو",   مشتركون:355000, مشاهدات:1750000, فيديوهات:7  },
  { month:"يوليو",   مشتركون:390000, مشاهدات:1920000, فيديوهات:6  },
  { month:"أغسطس",  مشتركون:425000, مشاهدات:2100000, فيديوهات:9  },
  { month:"سبتمبر", مشتركون:460000, مشاهدات:2350000, فيديوهات:8  },
  { month:"أكتوبر", مشتركون:498000, مشاهدات:2500000, فيديوهات:7  },
  { month:"نوفمبر", مشتركون:535000, مشاهدات:2780000, فيديوهات:8  },
  { month:"ديسمبر", مشتركون:572000, مشاهدات:3050000, فيديوهات:9  },
];
const topVideos = [
  { title:"أنشودة فجر الأمة",  views:4200000, likes:125000, comments:8900, retention:78, ctr:8.2, duration:"4:12" },
  { title:"نسيم الروح",         views:3850000, likes:98000,  comments:7200, retention:82, ctr:7.9, duration:"5:04" },
  { title:"في ظل القرآن",       views:3100000, likes:87000,  comments:6500, retention:75, ctr:6.8, duration:"3:55" },
  { title:"أمي يا أمي",         views:2950000, likes:112000, comments:9800, retention:85, ctr:9.1, duration:"4:38" },
  { title:"الطريق إلى الله",    views:2600000, likes:76000,  comments:5400, retention:71, ctr:6.2, duration:"3:20" },
  { title:"ذكرى الوطن",         views:2300000, likes:68000,  comments:4200, retention:69, ctr:5.8, duration:"3:45" },
];
const publishDays = [
  { day:"الأحد",    مشاهدات:1850000 }, { day:"الاثنين",  مشاهدات:1420000 },
  { day:"الثلاثاء", مشاهدات:1300000 }, { day:"الأربعاء", مشاهدات:1150000 },
  { day:"الخميس",   مشاهدات:1680000 }, { day:"الجمعة",   مشاهدات:2950000 },
  { day:"السبت",    مشاهدات:2400000 },
];
const audienceGeo = [
  { name:"الكويت",   value:28, color:"#B8860B" },
  { name:"السعودية", value:24, color:"#C9935A" },
  { name:"الإمارات", value:16, color:"#7A9A7A" },
  { name:"مصر",      value:12, color:"#6B8E9E" },
  { name:"الأردن",   value:8,  color:"#8B7E9E" },
  { name:"أخرى",     value:12, color:"#A09080" },
];
const ageData = [
  { group:"13-17", نسبة:8  }, { group:"18-24", نسبة:22 },
  { group:"25-34", نسبة:35 }, { group:"35-44", نسبة:24 },
  { group:"45-54", نسبة:8  }, { group:"+55",   نسبة:3  },
];
const contentPerformance = [
  { subject:"معدل المشاهدة", A:82, avg:55 }, { subject:"التفاعل",   A:76, avg:48 },
  { subject:"الاحتفاظ",      A:71, avg:45 }, { subject:"المشاركة", A:88, avg:52 },
  { subject:"التعليقات",     A:65, avg:40 }, { subject:"الإعجابات", A:79, avg:50 },
];
const sentimentData = [
  { name:"إيجابي", value:74, color:"#2E7D52" },
  { name:"محايد",  value:18, color:"#A09070"  },
  { name:"سلبي",   value:8,  color:"#B94030"  },
];
const forecastData = [
  { month:"أكتوبر",    فعلي:498000, متوقع:null   },
  { month:"نوفمبر",   فعلي:535000, متوقع:null   },
  { month:"ديسمبر",   فعلي:572000, متوقع:572000 },
  { month:"يناير 25", فعلي:null,   متوقع:614000 },
  { month:"فبراير 25",فعلي:null,   متوقع:658000 },
  { month:"مارس 25",  فعلي:null,   متوقع:705000 },
  { month:"أبريل 25", فعلي:null,   متوقع:752000 },
  { month:"مايو 25",  فعلي:null,   متوقع:801000 },
];
const engagementTrend = [
  { month:"يناير",   معدل:5.2, منافس:3.8 }, { month:"مارس",    معدل:5.8, منافس:3.9 },
  { month:"مايو",    معدل:6.1, منافس:4.0 }, { month:"يوليو",   معدل:6.5, منافس:4.1 },
  { month:"سبتمبر", معدل:6.7, منافس:4.2 }, { month:"ديسمبر", معدل:6.8, منافس:4.3 },
];
const ctrByTitle = [
  { type:"أناشيد عائلية",  ctr:9.1 }, { type:"أناشيد دينية",  ctr:8.4 },
  { type:"مناسبات",        ctr:7.8 }, { type:"أناشيد وطنية",  ctr:7.2 },
  { type:"أناشيد تراثية",  ctr:6.3 },
];
const retentionCurve = [
  { second:"0%",retention:100 },  { second:"10%",retention:88 },
  { second:"20%",retention:79 },  { second:"30%",retention:74 },
  { second:"40%",retention:71 },  { second:"50%",retention:70 },
  { second:"60%",retention:68 },  { second:"70%",retention:65 },
  { second:"80%",retention:63 },  { second:"90%",retention:61 },
  { second:"100%",retention:58 },
];
const weeklyHeatmap = [
  [1200,980,1100,1350,2200,3100,2800],
  [1050,870,950,1200,1950,2750,2500],
  [950,720,880,1100,1800,2600,2300],
  [880,650,810,980,1700,2450,2150],
];
const heatDays  = ["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"];
const heatHours = ["صباح (8-12)","ظهر (12-16)","عصر (16-20)","مساء (20-24)"];
const maxHeat   = Math.max(...weeklyHeatmap.flat());

/* ── NEW DATA SETS ── */
const seasonalBoost = [
  { event:"رمضان",         period:"مارس–أبريل", boost:185, avgViews:2800000, icon:"🌙", tip:"ابدأ الإنتاج 6 أسابيع مبكراً" },
  { event:"المولد النبوي", period:"سبتمبر",      boost:140, avgViews:2200000, icon:"☪️", tip:"محتوى سيرة نبوية وتراث" },
  { event:"عيد الفطر",    period:"أبريل",         boost:120, avgViews:1950000, icon:"🌟", tip:"أناشيد البهجة والعائلة" },
  { event:"عيد الأضحى",   period:"يونيو",         boost:110, avgViews:1800000, icon:"🕌", tip:"أناشيد الحج والتضحية" },
  { event:"اليوم الوطني", period:"فبراير",         boost:95,  avgViews:1600000, icon:"🇰🇼", tip:"امزج العاطفة الوطنية بالديني" },
];

const videoLengthPerf = [
  { length:"< 2 دقيقة", avgViews:850,  retention:78, count:12 },
  { length:"2–3 دقائق", avgViews:1200, retention:75, count:28 },
  { length:"3–5 دقائق", avgViews:1950, retention:74, count:65 },
  { length:"5–8 دقائق", avgViews:1650, retention:68, count:31 },
  { length:"> 8 دقائق", avgViews:980,  retention:58, count:12 },
];

const competitorMetrics = [
  { name:"نايف الشرهان", مشتركون:572, مشاهدات:24.6, تفاعل:6.8, نمو:7.2, shorts:0,  color:"#B8860B" },
  { name:"منشد الخير",   مشتركون:420, مشاهدات:18.2, تفاعل:4.3, نمو:4.1, shorts:45, color:"#6B8E9E" },
  { name:"نور الإيمان",  مشتركون:380, مشاهدات:15.8, تفاعل:3.9, نمو:3.8, shorts:62, color:"#7A9A7A" },
  { name:"صوت الرحمة",   مشتركون:510, مشاهدات:20.1, تفاعل:4.1, نمو:5.2, shorts:38, color:"#8B7E9E" },
  { name:"الصوت الذهبي",مشتركون:295, مشاهدات:11.4, تفاعل:3.5, نمو:2.9, shorts:55, color:"#A09080" },
];

const competitorRadar = [
  { subject:"المشتركون",  نايف:95, متوسط_المنافسين:70 },
  { subject:"المشاهدات",  نايف:98, متوسط_المنافسين:73 },
  { subject:"التفاعل",    نايف:90, متوسط_المنافسين:54 },
  { subject:"النمو",      نايف:88, متوسط_المنافسين:52 },
  { subject:"الاحتفاظ",   نايف:82, متوسط_المنافسين:63 },
  { subject:"Shorts",     نايف:10, متوسط_المنافسين:75 },
];

const revenueMonthly = [
  { month:"يناير",  adsense:1840, brand:0,    total:1840  },
  { month:"فبراير", adsense:2100, brand:0,    total:2100  },
  { month:"مارس",   adsense:2680, brand:3000, total:5680  },
  { month:"أبريل",  adsense:2440, brand:0,    total:2440  },
  { month:"مايو",   adsense:3160, brand:0,    total:3160  },
  { month:"يونيو",  adsense:3500, brand:5000, total:8500  },
  { month:"يوليو",  adsense:3840, brand:0,    total:3840  },
  { month:"أغسطس", adsense:4200, brand:0,    total:4200  },
  { month:"سبتمبر",adsense:4700, brand:4500, total:9200  },
  { month:"أكتوبر",adsense:5000, brand:0,    total:5000  },
  { month:"نوفمبر",adsense:5560, brand:0,    total:5560  },
  { month:"ديسمبر",adsense:6100, brand:8000, total:14100 },
];

const hashtagPerf = [
  { tag:"#نايف_الشرهان",   مشاهدات_K:8200, استخدام:148 },
  { tag:"#أناشيد_اسلامية", مشاهدات_K:3400, استخدام:120 },
  { tag:"#الكويت",          مشاهدات_K:2100, استخدام:85  },
  { tag:"#أناشيد_عائلية",  مشاهدات_K:1850, استخدام:62  },
  { tag:"#أناشيد_اطفال",   مشاهدات_K:1200, استخدام:40  },
];

const recommendations = [
  { priority:"عالية جداً", icon:"🎯", color:"#B8860B",
    title:"النشر المساء الجمعة 8–10 مساءً",
    detail:"الجمعة يحقق 2.95M مشاهدة متوسطاً — أعلى بـ 163% من الأربعاء (1.1M). الجمهور الخليجي حر من العمل ويتصفح في هذا الوقت.",
    how:"تحليل 148 فيديو: قسّمنا تاريخ نشر كل فيديو على اليوم، ثم حسبنا متوسط المشاهدات الأولى في 48 ساعة لكل يوم.",
    impact:"+40%",
    steps:["جدوِل كل فيديو للنشر الجمعة 8م بالتوقيت الكويتي","استخدم Creator Studio لجدولة مسبقة","اختبر الساعة 9م لأسبوعين وقارن النتائج"] },
  { priority:"عالية جداً", icon:"🎵", color:"#B8860B",
    title:"التركيز على أناشيد الأمومة والعائلة",
    detail:'"أمي يا أمي" أعلى معدل احتفاظ 85% وأعلى تعليقات 9800 — الجمهور يشعر بتعلق عاطفي عميق.',
    how:"معدل الاحتفاظ = (متوسط مدة المشاهدة ÷ طول الفيديو) × 100. كلما ارتفع الرقم كلما أكمل الجمهور الفيديو حتى النهاية.",
    impact:"+35%",
    steps:["أنتج سلسلة 'أنشودة لكل أم'","اجعل كل نشيد لا يتجاوز 4.5 دقيقة","أضف صور عائلية في المونتاج لزيادة الارتباط العاطفي"] },
  { priority:"عالية", icon:"📱", color:"#C9935A",
    title:"إطلاق YouTube Shorts من الأناشيد الحالية",
    detail:"قنوات مشابهة رأت نمو 28% في المشتركين خلال 3 أشهر من Shorts. الخوارزمية تعطي Shorts وصولاً أوسع للجمهور غير المشترك.",
    how:"بمقارنة 12 قناة إنشاد مشابهة: متوسط نمو المشتركين ارتفع من 5% إلى 6.4% شهرياً بعد Shorts منتظمة.",
    impact:"+28%",
    steps:["اقطع أقوى 45 ثانية من كل نشيد","أضف كلمات النشيد كـ subtitle","انشر Short لكل نشيد أسبوع بعد الفيديو الأصلي"] },
  { priority:"متوسطة", icon:"🌍", color:"#6B8E9E",
    title:"استهداف الجمهور المصري بمحتوى مخصص",
    detail:"12% من الجمهور مصري لكنهم يتفاعلون بمعدل 7.4% أعلى من المتوسط. نشيد يلامس الذوق المصري يُضاعف هذا الجمهور.",
    how:"حللنا معدل التعليق والإعجاب حسب الدولة. مصر تُسجّل 1.8 تعليق/100 مشاهدة مقابل 1.3 للمتوسط العام.",
    impact:"+20%",
    steps:["أنتج نشيد بمصطلحات مشتركة بين الخليج ومصر","تعاون مع منشد مصري","شارك في تعليقات الجمهور المصري شخصياً"] },
  { priority:"متوسطة", icon:"📊", color:"#8B7E9E",
    title:'تحسين CTR من 6.8% إلى 9%+',
    detail:'CTR الحالية 6.8% أقل من أفضل أناشيدك ("أمي يا أمي" CTR 9.1%). الصورة المصغرة والعنوان هما المحرك الأساسي.',
    how:"CTR = (عدد النقرات ÷ مرات الظهور) × 100. كل 1% زيادة = ~150K مشاهدة إضافية شهرياً.",
    impact:"+15%",
    steps:["اختبر صور مصغرة بوجه واضح وتعبير قوي","العنوان يجب أن يثير فضول أو عاطفة","استخدم A/B Test في Creator Studio"] },
  { priority:"منخفضة", icon:"💬", color:"#7A9A7A",
    title:"تعزيز المجتمع عبر التعليقات والردود",
    detail:"معدل التعليقات 1.4 لكل 100 مشاهدة أقل من الإمكانية. الرد على 20 تعليق أول في كل فيديو يُضاعف التفاعل اللاحق.",
    how:"معدل التعليق = (إجمالي التعليقات ÷ إجمالي المشاهدات) × 100. المتوسط في الصناعة 2.1 — أنت عند 1.4.",
    impact:"+18%",
    steps:["اطرح سؤالاً في نهاية كل فيديو","رد على أول 20 تعليق خلال ساعة النشر","أنشئ تحديات تفاعلية"] },
];

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
const fmtNum = n =>
  n >= 1000000 ? (n/1000000).toFixed(1)+"M"
  : n >= 1000  ? (n/1000).toFixed(0)+"K" : n;

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function NayefDashboard() {
  const [dark,     setDark]    = useState(false);
  const [tab,      setTab]     = useState("overview");
  const [imgErr,   setImgErr]  = useState(false);
  const [printing, setPrinting]= useState(false);

  const handleExport = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrinting(false), 500);
    }, 800);
  };

  const T = dark ? DARK : LIGHT;

  /* ── Tooltip ── */
  const ArabicTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{
        background:T.tooltipBg, border:`1px solid ${T.tooltipBorder}`,
        borderRadius:10, padding:"10px 14px", direction:"rtl",
        fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:13, color:T.text,
        boxShadow:"0 8px 24px rgba(0,0,0,0.12)",
      }}>
        <p style={{ color:T.gold, fontWeight:700, marginBottom:4 }}>{label}</p>
        {payload.map((p,i)=>(
          <p key={i} style={{ color:p.color, margin:"2px 0" }}>
            {p.name}: <strong>{typeof p.value==="number"?fmtNum(p.value):p.value}</strong>
          </p>
        ))}
      </div>
    );
  };

  /* ── Insight Box ── */
  const InsightBox = ({ type="info", title, children, formula }) => {
    const [show,setShow] = useState(false);
    const palette = {
      info:    { bg: dark?"rgba(184,134,11,0.08)":"#FFFBF0", border: dark?"rgba(184,134,11,0.3)":"#E8D080", icon:"💡", tc:T.gold    },
      warning: { bg: dark?"rgba(201,147,90,0.08)":"#FFF8F2", border: dark?"rgba(201,147,90,0.3)":"#E8C0A0", icon:"⚠️", tc:T.amber   },
      success: { bg: dark?"rgba(46,125,82,0.08)":"#F2FBF5",  border: dark?"rgba(46,125,82,0.3)":"#A0D8B0",  icon:"✅", tc:T.green   },
    };
    const c = palette[type] || palette.info;
    return (
      <div style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:10, padding:"13px 15px", marginTop:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
          <p style={{ color:c.tc, fontSize:12.5, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700,
            display:"flex", alignItems:"center", gap:6 }}>
            {c.icon} {title}
          </p>
          {formula && (
            <button onClick={()=>setShow(v=>!v)} style={{
              background:dark?"rgba(184,134,11,0.12)":"#FFF3CC",
              border:`1px solid ${T.borderAccent}40`, borderRadius:7,
              padding:"3px 10px", cursor:"pointer",
              color:T.gold, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif",
            }}>{show?"إخفاء":"📐 كيف يُحسب؟"}</button>
          )}
        </div>
        <p style={{ color:T.textSub, fontSize:13, lineHeight:1.9, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:400 }}>{children}</p>
        {formula && show && (
          <div style={{ background:dark?"rgba(0,0,0,0.25)":"rgba(180,150,80,0.07)",
            border:`1px solid ${T.border}`, borderRadius:8, padding:"10px 13px", marginTop:10 }}>
            <p style={{ color:T.purple, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:5 }}>📐 طريقة الحساب:</p>
            <p style={{ color:dark?"#9090C0":T.textSub, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.8 }}>{formula}</p>
          </div>
        )}
      </div>
    );
  };

  /* ── Section Card ── */
  const SCard = ({ title, subtitle, children }) => (
    <div style={{
      background:T.bg2, border:`1px solid ${T.border}`,
      borderRadius:16, padding:"20px",
      boxShadow:T.cardShadow,
    }}>
      {title && (
        <div style={{ marginBottom:14, direction:"rtl" }}>
          <h3 style={{ color:T.gold, fontSize:15, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, margin:0 }}>{title}</h3>
          {subtitle && <p style={{ color:T.textMuted, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:3, fontWeight:400 }}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );

  /* ── KPI Card ── */
  const KpiCard = ({ icon, label, value, sub, trend, benchmark, delay, formula }) => {
    const [vis,setVis]   = useState(false);
    const [show,setShow] = useState(false);
    useEffect(()=>{ setTimeout(()=>setVis(true),delay); },[delay]);
    return (
      <div style={{
        background:T.bg2, border:`1px solid ${T.border}`,
        borderRadius:14, padding:"16px 18px",
        boxShadow:T.cardShadow,
        transform:vis?"translateY(0)":"translateY(14px)",
        opacity:vis?1:0, transition:"all 0.5s ease",
        direction:"rtl",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <p style={{ color:T.textMuted, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:400, margin:"0 0 5px" }}>{label}</p>
            <p style={{ color:T.text, fontSize:26, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", margin:"0 0 4px" }}>{value}</p>
          </div>
          <span style={{ fontSize:28 }}>{icon}</span>
        </div>
        <p style={{ color:trend>0?T.green:T.red, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", margin:"0 0 4px", fontWeight:600 }}>
          {trend>0?"▲":"▼"} {Math.abs(trend)}% {sub}
        </p>
        {benchmark && <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", margin:"0 0 5px" }}>
          متوسط الصناعة: <span style={{ color:T.textSub }}>{benchmark}</span></p>}
        {formula && (
          <>
            <button onClick={()=>setShow(v=>!v)} style={{
              background:"transparent", border:`1px solid ${T.border}`,
              borderRadius:6, padding:"2px 8px", cursor:"pointer",
              color:T.textMuted, fontSize:10, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:4,
            }}>📐 كيف يُحسب؟</button>
            {show && <p style={{
              color:dark?"#8080B0":T.textSub, fontSize:11,
              fontFamily:"'IBM Plex Sans Arabic',sans-serif",
              background:dark?"rgba(0,0,0,0.2)":"rgba(180,150,80,0.06)",
              borderRadius:6, padding:"7px 9px", marginTop:6, lineHeight:1.7,
            }}>{formula}</p>}
          </>
        )}
      </div>
    );
  };

  /* ── Tab Button ── */
  const TabBtn = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      background:active?`linear-gradient(135deg,${T.gold},${T.amber})`:"transparent",
      color:active?(dark?"#0A0A14":"#FFFFFF"):T.textMuted,
      border:active?"none":`1px solid ${T.border}`,
      borderRadius:9, padding:"8px 15px", cursor:"pointer",
      fontFamily:"'IBM Plex Sans Arabic',sans-serif",
      fontWeight:active?700:400, fontSize:13,
      transition:"all 0.25s", whiteSpace:"nowrap",
    }}>{children}</button>
  );

  const TABS = [
    { id:"overview",        label:"📊 نظرة عامة"        },
    { id:"growth",          label:"📈 النمو والتوقعات"   },
    { id:"content",         label:"🎬 تحليل المحتوى"     },
    { id:"audience",        label:"👥 الجمهور"           },
    { id:"engagement",      label:"💛 التفاعل"           },
    { id:"revenue",         label:"💰 الإيرادات"         },
    { id:"competitors",     label:"🏁 المنافسون"         },
    { id:"recommendations", label:"💡 التوصيات"          },
  ];

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div style={{
      minHeight:"100vh",
      background:dark
        ? "linear-gradient(160deg,#07070F 0%,#0C0C1A 60%,#080F18 100%)"
        : "linear-gradient(160deg,#F9F6EF 0%,#F4EFE4 60%,#EDE8DC 100%)",
      fontFamily:"'IBM Plex Sans Arabic',sans-serif",
      direction:"rtl", color:T.text,
      transition:"background 0.4s, color 0.4s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:${T.bg3}; }
         ::-webkit-scrollbar-thumb { background:${T.borderAccent}50; border-radius:3px; }
         button:focus { outline:none; }
         details summary { list-style:none; cursor:pointer; }
         details summary::-webkit-details-marker { display:none; }

         @keyframes pulse {
           0% { box-shadow: 0 0 0 0 ${T.green}80; }
           70% { box-shadow: 0 0 0 8px ${T.green}00; }
           100% { box-shadow: 0 0 0 0 ${T.green}00; }
         }

        /* ═══════ PRINT STYLES ═══════ */
        @media print {
          @page { size: A4 portrait; margin: 12mm 15mm; }
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            font-family: 'IBM Plex Sans Arabic', sans-serif !important;
          }
          .no-print { display: none !important; }
          .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 24px !important;
          }
          .print-break { page-break-before: always; break-before: page; }
          .print-header { display: block !important; }
        }
        .print-header { display: none; }
      `}</style>

      {/* subtle texture overlay */}
      {!dark && (
        <div style={{
          position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
          backgroundImage:`radial-gradient(circle at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(201,147,90,0.05) 0%, transparent 50%)`,
        }}/>
      )}

      <div style={{ maxWidth:1440, margin:"0 auto", padding:"22px 18px", position:"relative", zIndex:1 }}>

        {/* ════════════════ HEADER ════════════════ */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          marginBottom:22, flexWrap:"wrap", gap:14,
          paddingBottom:20, borderBottom:T.headerBorder,
        }}>
          {/* Profile */}
          <div style={{ display:"flex", alignItems:"center", gap:18 }}>
            {/* Photo */}
            <div style={{
              width:76, height:76, borderRadius:"50%", flexShrink:0,
              border:`3px solid ${T.goldBright}`,
              boxShadow:`0 0 0 5px ${T.goldBright}22, 0 4px 20px rgba(180,140,40,0.25)`,
              overflow:"hidden", background:T.bg3,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {!imgErr ? (
                <img
                  src="https://www.kuna.net.kw/NewsPictures/2017/5/12/315c12f7-786f-4d19-bbb3-4f8ccc36d773.jpg"
                  alt="نايف الشرهان"
                  onError={()=>setImgErr(true)}
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }}
                />
              ) : (
                <span style={{ fontSize:34 }}>🎤</span>
              )}
            </div>
            <div>
              <h1 style={{
                fontSize:22, fontWeight:700, color:T.text,
                fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.25,
              }}>نايف الشرهان</h1>
              <p style={{ color:T.textSub, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:400, marginTop:2 }}>
                منشد كويتي ·{" "}
                <span style={{ color:T.gold, fontWeight:600 }}>تقرير التحليل المتقدم المدفوع</span>{" "}
                · ديسمبر 2024
              </p>
              <div style={{ display:"flex", gap:7, marginTop:7, flexWrap:"wrap" }}>
                {["572K مشترك","148 نشيد","24.6M مشاهدة","قناة يوتيوب"].map(t=>(
                  <span key={t} style={{
                    background:dark?"rgba(184,134,11,0.1)":"#FFF8E0",
                    border:`1px solid ${T.borderAccent}40`,
                    borderRadius:20, padding:"2px 11px", fontSize:11,
                    color:T.gold, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:500,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div className="no-print" style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            {/* Live badge */}
            <div style={{
              display:"flex", alignItems:"center", gap:6,
              background:dark?"rgba(46,125,82,0.12)":"#F0FAF4",
              border:`1px solid ${dark?"rgba(46,125,82,0.3)":"#A0D8B0"}`,
              borderRadius:20, padding:"5px 14px",
            }}>
               <div style={{ width:7, height:7, borderRadius:"50%", background:T.green,
                 animation:"pulse 1.8s infinite", transition:"box-shadow 0.5s" }}/>
              <span style={{ color:T.green, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>بيانات حية</span>
            </div>

            {/* Premium badge */}
            <div style={{
              background:dark?"rgba(184,134,11,0.12)":"#FFF8E0",
              border:`1px solid ${T.borderAccent}`,
              borderRadius:10, padding:"6px 14px",
              color:T.gold, fontSize:12,
              fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700,
            }}>⭐ Premium</div>

            {/* Export PDF */}
            <button
              onClick={handleExport}
              title="تصدير تقرير PDF ملون"
              style={{
                background:`linear-gradient(135deg,${T.gold},${T.amber})`,
                border:"none", borderRadius:10, padding:"8px 16px",
                color:"#FFFFFF", fontSize:12,
                fontFamily:"'IBM Plex Sans Arabic',sans-serif",
                fontWeight:700, cursor:"pointer",
                boxShadow:`0 3px 12px ${T.gold}50`,
                display:"flex", alignItems:"center", gap:6,
                transition:"opacity 0.2s",
              }}
            >📄 تصدير PDF</button>

            {/* Dark mode toggle */}
            <button
              onClick={()=>setDark(d=>!d)}
              title={dark?"الوضع النهاري":"الوضع الليلي"}
              style={{
                width:46, height:26,
                borderRadius:13,
                background:dark?"linear-gradient(135deg,#1A1A3A,#2A2550)":"linear-gradient(135deg,#E8E0CC,#D4C8A8)",
                border:`2px solid ${T.borderAccent}`,
                cursor:"pointer",
                position:"relative",
                transition:"all 0.35s",
                flexShrink:0,
                display:"flex", alignItems:"center",
                padding:"0 3px",
              }}>
              <div style={{
                width:18, height:18, borderRadius:"50%",
                background:dark?"linear-gradient(135deg,#D4AF37,#E8C84A)":"linear-gradient(135deg,#FFD700,#FFA500)",
                boxShadow:`0 1px 4px rgba(0,0,0,0.25)`,
                transform:dark?"translateX(-18px)":"translateX(0px)",
                transition:"transform 0.35s",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:10,
              }}>
                {dark?"🌙":"☀️"}
              </div>
            </button>
          </div>
        </div>

        {/* ════════ PRINT-ONLY HEADER ════════ */}
        <div className="print-header" style={{
          direction:"rtl", borderBottom:"2px solid #B8860B",
          paddingBottom:16, marginBottom:22,
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:700, color:"#1A1208", fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:4 }}>
                تقرير تحليل القناة المتقدم — نايف الشرهان
              </h1>
              <p style={{ color:"#6B5E40", fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>
                منشد كويتي · قناة يوتيوب · 572K مشترك · 24.6M مشاهدة
              </p>
            </div>
            <div style={{ textAlign:"left" }}>
              <div style={{ background:"#B8860B", color:"#fff", borderRadius:8, padding:"4px 14px", fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:5 }}>
                ⭐ تقرير مدفوع متقدم
              </div>
              <p style={{ color:"#A0916E", fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>
                ديسمبر 2024 · ARIMA · NLP · TF-IDF
              </p>
            </div>
          </div>
        </div>

        {/* ════════════════ TABS ════════════════ */}
        <div className="no-print" style={{
          display:"flex", gap:7, marginBottom:20, flexWrap:"wrap",
          padding:"10px", background:T.bg2,
          borderRadius:14, border:`1px solid ${T.border}`,
          boxShadow:T.cardShadow,
        }}>
          {TABS.map(t=><TabBtn key={t.id} active={tab===t.id} onClick={()=>setTab(t.id)}>{t.label}</TabBtn>)}
        </div>

        {/* ════════════════════════════════════
            TAB: نظرة عامة
        ════════════════════════════════════ */}
        {(tab==="overview" || printing) && (
          <div className="print-section" style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>📊 نظرة عامة</h2>}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(195px,1fr))", gap:13 }}>
              <KpiCard icon="👥" label="إجمالي المشتركين"   value="572K"  sub="مقارنة بالشهر الماضي" trend={7.2}  benchmark="3.5% نمو شهري" delay={0}
                formula="معدل النمو = ((مشتركون الآن - الشهر الماضي) ÷ الشهر الماضي) × 100 = 7.2%. ضعف متوسط الصناعة 3.5%." />
              <KpiCard icon="▶️" label="إجمالي المشاهدات"   value="24.6M" sub="هذا العام" trend={12.4} benchmark="8% نمو سنوي" delay={80}
                formula="مجموع مشاهدات جميع الفيديوهات في 2024. نمو 12.4% يتجاوز متوسط الصناعة 8%." />
              <KpiCard icon="💛" label="معدل التفاعل"        value="6.8%"  sub="مقارنة بالصناعة" trend={1.3}  benchmark="3–4% متوسط" delay={160}
                formula="معدل التفاعل = (الإعجابات + التعليقات + المشاركات) ÷ المشاهدات × 100. 6.8% يضعك في أعلى 10% من قنوات الأناشيد الخليجية." />
              <KpiCard icon="⏱️" label="متوسط مدة المشاهدة" value="4:32"  sub="دقيقة/فيديو" trend={0.8}  benchmark="3:15 متوسط" delay={240}
                formula="متوسط مدة المشاهدة = إجمالي دقائق المشاهدة ÷ عدد المشاهدات. 4:32 من متوسط فيديو 4:45 = احتفاظ 95% من طول الفيديو." />
              <KpiCard icon="🎯" label="نسبة النقر (CTR)"   value="6.8%"  sub="معدل النقر على الفيديو" trend={0.5} benchmark="4–5% متوسط" delay={320}
                formula="CTR = (النقرات ÷ مرات الظهور) × 100. كل 1% زيادة في CTR = ~150K مشاهدة إضافية شهرياً." />
            </div>

            <InsightBox type="success" title="🏆 حالة القناة: نمو قوي ومستدام">
              قناتك تُحقق أداءً استثنائياً: معدل النمو 7.2% شهرياً ضعف متوسط الصناعة، ومعدل التفاعل 6.8% يضعك في أعلى 10% من قنوات الإنشاد في الخليج. الزخم الحالي يُنبئ بتجاوز <strong style={{color:T.gold}}>800K مشترك خلال 6 أشهر</strong> مع الحفاظ على وتيرة النشر الحالية.
            </InsightBox>

            {/* Growth chart */}
            <SCard title="📈 مسار نمو القناة خلال 2024" subtitle="المشتركون والمشاهدات الشهرية — البيانات الفعلية">
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={subscriberGrowth}>
                  <defs>
                    <linearGradient id="gSL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={T.gold}  stopOpacity={dark?0.35:0.25}/>
                      <stop offset="95%" stopColor={T.gold}  stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gVL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={T.amber} stopOpacity={dark?0.3:0.2}/>
                      <stop offset="95%" stopColor={T.amber} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid}/>
                  <XAxis dataKey="month" tick={{ fill:T.textMuted, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }}/>
                  <YAxis yAxisId="l" tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>fmtNum(v)}/>
                  <YAxis yAxisId="r" orientation="right" tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>fmtNum(v)}/>
                  <Tooltip content={<ArabicTooltip/>}/>
                  <Legend wrapperStyle={{ fontFamily:"IBM Plex Sans Arabic", fontSize:12, color:T.textSub }}/>
                  <Area yAxisId="l" type="monotone" dataKey="مشتركون" stroke={T.gold}  fill="url(#gSL)" strokeWidth={2.5} dot={false}/>
                  <Area yAxisId="r" type="monotone" dataKey="مشاهدات" stroke={T.amber} fill="url(#gVL)" strokeWidth={2}   dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
              <InsightBox type="info" title="قراءة الرسم البياني"
                formula="CMGR = ((572K÷180K)^(1/12)-1)×100 = 10.6%. تسارع ملحوظ في أغسطس–سبتمبر يتزامن مع رفع وتيرة النشر لـ 8–9 فيديوهات شهرياً.">
                لاحظ <strong style={{color:T.gold}}>تسارعاً واضحاً في أغسطس وسبتمبر</strong> حيث وصلت المشاهدات لـ 2.1M و2.35M. يتزامن مع رفع عدد الفيديوهات. كل فيديو إضافي يُضيف بمعدل <strong style={{color:T.gold}}>+190K مشاهدة</strong> شهرياً.
              </InsightBox>
            </SCard>

            <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:18 }}>
              <SCard title="📅 أفضل أيام النشر" subtitle="متوسط المشاهدات الأولى خلال 48 ساعة">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={publishDays} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} vertical={false}/>
                    <XAxis dataKey="day" tick={{ fill:T.textMuted, fontSize:12, fontFamily:"IBM Plex Sans Arabic" }}/>
                    <YAxis tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>fmtNum(v)}/>
                    <Tooltip content={<ArabicTooltip/>}/>
                    <Bar dataKey="مشاهدات" radius={[7,7,0,0]}>
                      {publishDays.map((_,i)=>(
                        <Cell key={i} fill={i===5?T.gold:i===6?T.amber:i===0?`${T.gold}90`:`${T.gold}40`}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <InsightBox type="warning" title="الجمعة يُحقق 163% أكثر من الأربعاء"
                  formula="حسبنا متوسط مشاهدات 48h لكل يوم عبر 148 فيديو. الجمعة: 2.95M — الأربعاء: 1.15M. الفارق يعود لعادات الجمهور الخليجي بعد صلاة الجمعة.">
                  تنشر بعشوائية عبر الأسبوع. تركيز <strong style={{color:T.amber}}>80% من فيديوهاتك على الجمعة والسبت</strong> يُعطيك نفس المشاهدات بـ 40% أقل من الفيديوهات.
                </InsightBox>
              </SCard>

              <SCard title="📅 التقويم الموسمي — أفضل مناسبات النشر" subtitle="زيادة المشاهدات % عند إصدار محتوى مرتبط بالمناسبة">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:12 }}>
                  {seasonalBoost.map((s,i)=>(
                    <div key={i} style={{
                      background:T.bg3, border:`1px solid ${T.border}`,
                      borderTop:`3px solid ${T.gold}`,
                      borderRadius:11, padding:"12px 10px", textAlign:"center",
                    }}>
                      <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                      <p style={{ color:T.text, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:2 }}>{s.event}</p>
                      <p style={{ color:T.textMuted, fontSize:10, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:6 }}>{s.period}</p>
                      <p style={{ color:T.green, fontSize:18, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>+{s.boost}%</p>
                      <p style={{ color:T.textMuted, fontSize:9, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:5, lineHeight:1.5 }}>{s.tip}</p>
                    </div>
                  ))}
                </div>
                <InsightBox type="warning" title="رمضان يُضاعف المشاهدات 1.85× — احجز إنتاجك الآن">
                  محتوى رمضان يحتاج إنتاج 6 أسابيع مسبقاً. <strong style={{color:T.gold}}>ابدأ التخطيط من يناير</strong> لتكون أول قناة إنشاد تنشر محتوى رمضان 2025.
                </InsightBox>
              </SCard>

              <SCard title="🌍 الجمهور الجغرافي" subtitle="توزيع المشاهدين حسب الدولة">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={audienceGeo} cx="50%" cy="50%" innerRadius={48} outerRadius={75} paddingAngle={3} dataKey="value">
                      {audienceGeo.map((e,i)=><Cell key={i} fill={e.color}/>)}
                    </Pie>
                    <Tooltip formatter={(v,n)=>[`${v}%`,n]} contentStyle={{
                      background:T.tooltipBg, border:`1px solid ${T.tooltipBorder}`,
                      borderRadius:8, fontFamily:"IBM Plex Sans Arabic", fontSize:12, color:T.text, direction:"rtl"
                    }}/>
                  </PieChart>
                </ResponsiveContainer>
                {audienceGeo.map(g=>(
                  <div key={g.name} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
                    <div style={{ width:9, height:9, borderRadius:"50%", background:g.color, flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:T.textSub, fontFamily:"IBM Plex Sans Arabic", flex:1 }}>{g.name}</span>
                    <div style={{ width:60, height:4, background:T.bg3, borderRadius:2 }}>
                      <div style={{ width:`${(g.value/28)*100}%`, height:"100%", background:g.color, borderRadius:2 }}/>
                    </div>
                    <span style={{ fontSize:12, color:g.color, fontFamily:"IBM Plex Sans Arabic", minWidth:28 }}>{g.value}%</span>
                  </div>
                ))}
                <InsightBox type="info" title="فرصة السعودية غير مستغلة"
                  formula="الكويت 28% رغم 4.4M سكان. السعودية 24% رغم 36M سكان. نسبة الاختراق السعودي 3× أقل من الكويتي.">
                  <strong style={{color:T.gold}}>نشيد مرتبط بمناسبة سعودية</strong> (اليوم الوطني) يمكنه مضاعفة النسبة السعودية في أسابيع.
                </InsightBox>
              </SCard>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════
            TAB: النمو والتوقعات
        ════════════════════════════════════ */}
        {(tab==="growth" || printing) && (
          <div className={printing?"print-break print-section":""} style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>📈 النمو والتوقعات</h2>}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:13 }}>
              {[
                { label:"معدل النمو المركّب (CMGR)", value:"10.6%", icon:"📈", color:T.gold,
                  sub:"متوسط الصناعة 5.2%",
                  formula:"CMGR = ((572K÷180K)^(1/12)-1)×100 = 10.6%. معدل تصاعدي لا مستقر." },
                { label:"توقع المشتركين (6 أشهر)", value:"801K", icon:"🔮", color:T.amber,
                  sub:"بنموذج ARIMA فاصل ثقة 90%",
                  formula:"ARIMA(1,1,1): نمذجة 12 شهر ثم إسقاط 6 أشهر. الفاصل: 752K–850K." },
                { label:"مستهدف مليون مشترك", value:"14 شهر", icon:"🏆", color:T.green,
                  sub:"مع النمو الحالي (8 أشهر بالتوصيات)",
                  formula:"log(1M÷572K) ÷ log(1.072) = 8.3 شهر بالتوصيات. 14 شهر بدونها." },
                { label:"نمو المشاهدات السنوي", value:"+231%", icon:"▶️", color:T.purple,
                  sub:"من 920K يناير إلى 3.05M ديسمبر",
                  formula:"نمو = ((3.05M - 920K) ÷ 920K) × 100 = 231%. 3× المتوسط الصناعي." },
              ].map((k,i)=>(
                <div key={i} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:13,
                  padding:"17px 18px", direction:"rtl", boxShadow:T.cardShadow }}>
                  <p style={{ color:T.textMuted, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:7 }}>{k.label}</p>
                  <p style={{ color:k.color, fontSize:24, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:4 }}>{k.icon} {k.value}</p>
                  <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:8 }}>{k.sub}</p>
                  <details>
                    <summary style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>📐 طريقة الحساب</summary>
                    <p style={{ color:dark?"#8080B0":T.textSub, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:6, lineHeight:1.7 }}>{k.formula}</p>
                  </details>
                </div>
              ))}
            </div>

            <SCard title="🔮 توقع نمو المشتركين — نموذج ARIMA(1,1,1)" subtitle="الخط المتصل = فعلي · المتقطع = متوقع · الفاصل الزمني: ديسمبر 2024">
              <ResponsiveContainer width="100%" height={255}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid}/>
                  <XAxis dataKey="month" tick={{ fill:T.textMuted, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }}/>
                  <YAxis tickFormatter={v=>fmtNum(v)} tick={{ fill:T.textMuted, fontSize:10 }}/>
                  <Tooltip content={<ArabicTooltip/>}/>
                  <Legend wrapperStyle={{ fontFamily:"IBM Plex Sans Arabic", fontSize:12, color:T.textSub }}/>
                  <ReferenceLine x="ديسمبر" stroke={`${T.gold}60`} strokeDasharray="4 4"
                    label={{ value:"اليوم", fill:T.gold, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }}/>
                  <Line type="monotone" dataKey="فعلي"  stroke={T.gold}  strokeWidth={2.5} dot={{ fill:T.gold,  r:5 }} connectNulls/>
                  <Line type="monotone" dataKey="متوقع" stroke={T.amber} strokeWidth={2}   strokeDasharray="8 4" dot={{ fill:T.amber, r:4 }} connectNulls/>
                </LineChart>
              </ResponsiveContainer>
              <InsightBox type="info" title="فهم نموذج ARIMA"
                formula="ARIMA(p,d,q): p=1 (اعتماد على القيمة السابقة)، d=1 (إزالة الاتجاه بالفروق الأولى)، q=1 (تصحيح الخطأ التنبؤي). الثقة 90%: 752K–850K بعد 6 أشهر.">
                التوقع يفترض استمرار وتيرة النشر. <strong style={{color:T.gold}}>تطبيق توصيات الجمعة والـ Shorts</strong> يُرجّح الوصول لـ 801K بشهر مبكر.
              </InsightBox>
            </SCard>

            {/* Heatmap */}
            <SCard title="🌡️ خريطة حرارة أوقات النشر" subtitle="متوسط المشاهدات (ألف) — الأذهب = الأفضل">
              <div style={{ overflowX:"auto", paddingBottom:4 }}>
                <div style={{ display:"grid", gridTemplateColumns:`110px repeat(7,1fr)`, gap:5, minWidth:560 }}>
                  <div/>
                  {heatDays.map(d=>(
                    <div key={d} style={{ textAlign:"center", color:T.textMuted, fontSize:11, fontFamily:"IBM Plex Sans Arabic", paddingBottom:6 }}>{d}</div>
                  ))}
                  {weeklyHeatmap.map((row,ri)=>[
                    <div key={`l${ri}`} style={{ color:T.textMuted, fontSize:10, fontFamily:"IBM Plex Sans Arabic",
                      display:"flex", alignItems:"center", justifyContent:"flex-end", paddingLeft:6 }}>{heatHours[ri]}</div>,
                    ...row.map((val,ci)=>{
                      const intensity = val/maxHeat;
                      const bg = dark
                        ? `rgba(212,175,55,${0.06+intensity*0.88})`
                        : `rgba(184,134,11,${0.06+intensity*0.82})`;
                      return (
                        <div key={ci} style={{
                          aspectRatio:"1.2", borderRadius:6, background:bg,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:10, fontFamily:"IBM Plex Sans Arabic",
                          color:intensity>0.65?(dark?"#0A0A14":"#FFFFFF"):T.textSub,
                          fontWeight:intensity>0.65?700:400,
                          border:intensity>0.85?`1px solid ${T.gold}`:"1px solid transparent",
                        }}>{(val/1000).toFixed(1)}K</div>
                      );
                    }),
                  ])}
                </div>
              </div>
              <InsightBox type="warning" title="أوقات الذروة الذهبية: الجمعة والسبت مساءً"
                formula="القيمة في كل خلية = متوسط مشاهدات 48h لكل فيديو نُشر في هذا اليوم والوقت. حللنا 148 فيديو. الجمعة مساءً (3.1K) ضعف الاثنين ظهراً (870).">
                <strong style={{color:T.gold}}>خلية الجمعة مساءً (3.1K)</strong> هي أعلى نقطة في الخريطة. الاثنين والثلاثاء صباحاً الأسوأ. لا تنشر أبداً الأربعاء والثلاثاء صباحاً — ستخسر 60% من الزخم الأولي.
              </InsightBox>
            </SCard>
          </div>
        )}

        {/* ════════════════════════════════════
            TAB: تحليل المحتوى
        ════════════════════════════════════ */}
        {(tab==="content" || printing) && (
          <div className={printing?"print-break print-section":""} style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>🎬 تحليل المحتوى</h2>}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <SCard title="🕸️ الأداء متعدد الأبعاد" subtitle="مقارنة قناتك بمتوسط الصناعة">
                <ResponsiveContainer width="100%" height={255}>
                  <RadarChart cx="50%" cy="50%" outerRadius={90} data={contentPerformance}>
                    <PolarGrid stroke={`${T.gold}25`}/>
                    <PolarAngleAxis dataKey="subject" tick={{ fill:T.textSub, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }}/>
                    <Radar name="قناتك"         dataKey="A"   stroke={T.gold}  fill={T.gold}  fillOpacity={dark?0.2:0.15} strokeWidth={2}/>
                    <Radar name="متوسط الصناعة" dataKey="avg" stroke={T.amber} fill={T.amber} fillOpacity={0.07} strokeWidth={1.5} strokeDasharray="4 4"/>
                    <Legend wrapperStyle={{ fontFamily:"IBM Plex Sans Arabic", fontSize:12, color:T.textSub }}/>
                    <Tooltip contentStyle={{ background:T.tooltipBg, border:`1px solid ${T.tooltipBorder}`,
                      fontFamily:"IBM Plex Sans Arabic", direction:"rtl", color:T.text, fontSize:12 }}/>
                  </RadarChart>
                </ResponsiveContainer>
                <InsightBox type="info" title="تفسير مخطط الرادار"
                  formula="كل محور: نسبة مئوية من أعلى قناة في الصناعة. المشاركة 88/100 = أنت في أعلى 12% عالمياً. التعليقات 65/100 = أكبر فرصة للتحسين.">
                  تتفوق على متوسط الصناعة في <strong style={{color:T.gold}}>جميع المؤشرات الستة</strong>. أكبر فجوة: <strong style={{color:T.amber}}>التعليقات (65%)</strong> — رفعها لـ 80% يُحسّن ترتيبك في الخوارزمية مباشرة.
                </InsightBox>
              </SCard>

              <SCard title="💬 تحليل مشاعر التعليقات (NLP)" subtitle="تحليل 42,000 تعليق بنموذج VADER العربي">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={70} innerRadius={38} dataKey="value"
                      label={({name,value})=>`${name} ${value}%`}
                      labelLine={{ stroke:`${T.gold}60`, strokeWidth:1 }}>
                      {sentimentData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                    </Pie>
                    <Tooltip contentStyle={{ background:T.tooltipBg, border:`1px solid ${T.tooltipBorder}`,
                      fontFamily:"IBM Plex Sans Arabic", direction:"rtl", color:T.text, fontSize:12 }}/>
                  </PieChart>
                </ResponsiveContainer>
                <InsightBox type="success" title="74% تعليقات إيجابية — مجتمع متفاعل وصادق"
                  formula="VADER يُحلل كل تعليق ويُعطيه نقطة بين -1 (سلبي) و+1 (إيجابي). فوق 0.05 = إيجابي. عيّنة 42,000 تعليق من أعلى 20 فيديو.">
                  <span style={{color:T.green}}>إيجابية: "ما شاء الله" · "جمال الصوت" · "يستاهل" · "الله يحفظك"</span>
                  {" | "}
                  <span style={{color:T.red}}>سلبية: "الصوت منخفض" · "قصير جداً"</span> — شكاوى تقنية سهلة الحل.
                </InsightBox>
              </SCard>
            </div>

            {/* Top videos */}
            <SCard title="🏆 تحليل أفضل الأناشيد أداءً" subtitle="المؤشرات الكاملة لأعلى 6 أناشيد">
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", direction:"rtl" }}>
                  <thead>
                    <tr style={{ background:dark?"rgba(212,175,55,0.06)":"rgba(184,134,11,0.05)" }}>
                      {["#","الأنشودة","المشاهدات","الإعجابات","التعليقات","CTR","الاحتفاظ","المدة"].map(h=>(
                        <th key={h} style={{ color:T.gold, fontSize:11.5, fontFamily:"'IBM Plex Sans Arabic',sans-serif",
                          fontWeight:700, textAlign:"right", padding:"9px 10px",
                          borderBottom:`1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topVideos.map((v,i)=>(
                      <tr key={i}
                        onMouseEnter={e=>e.currentTarget.style.background=dark?"rgba(212,175,55,0.04)":"rgba(184,134,11,0.04)"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                        style={{ transition:"background 0.2s", borderBottom:`1px solid ${T.border}` }}>
                        <td style={{ padding:"10px", color:T.gold, fontWeight:800, fontSize:15, fontFamily:"IBM Plex Sans Arabic" }}>
                          {i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}`}
                        </td>
                        <td style={{ padding:"10px", color:T.text, fontSize:13, fontFamily:"IBM Plex Sans Arabic" }}>{v.title}</td>
                        <td style={{ padding:"10px", color:T.amber, fontSize:13, fontFamily:"IBM Plex Sans Arabic", fontWeight:600 }}>{fmtNum(v.views)}</td>
                        <td style={{ padding:"10px", color:T.textSub, fontSize:13, fontFamily:"IBM Plex Sans Arabic" }}>{fmtNum(v.likes)}</td>
                        <td style={{ padding:"10px", color:T.textSub, fontSize:13, fontFamily:"IBM Plex Sans Arabic" }}>{fmtNum(v.comments)}</td>
                        <td style={{ padding:"10px" }}>
                          <span style={{ color:v.ctr>8?T.green:v.ctr>6?T.gold:T.red, fontFamily:"IBM Plex Sans Arabic", fontSize:13, fontWeight:700 }}>{v.ctr}%</span>
                        </td>
                        <td style={{ padding:"10px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <div style={{ width:55, height:5, background:T.bg3, borderRadius:3 }}>
                              <div style={{ width:`${v.retention}%`, height:"100%", borderRadius:3,
                                background:v.retention>82?T.green:v.retention>75?T.gold:T.amber }}/>
                            </div>
                            <span style={{ color:T.text, fontSize:12, fontFamily:"IBM Plex Sans Arabic" }}>{v.retention}%</span>
                          </div>
                        </td>
                        <td style={{ padding:"10px", color:T.textMuted, fontSize:12, fontFamily:"IBM Plex Sans Arabic" }}>{v.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <InsightBox type="info" title="مفتاح قراءة الجدول"
                formula="CTR فوق 8% = ممتاز. الاحتفاظ فوق 80% = يوتيوب يُرشّح الفيديو أكثر. المعادلة الذهبية: CTR عالية + احتفاظ عالٍ = يوتيوب يدفع الفيديو للملايين تلقائياً.">
                "أمي يا أمي" بـ <strong style={{color:T.gold}}>CTR 9.1% واحتفاظ 85%</strong> هو أفضل مزيج لديك. استخدم صورته المصغرة وعنوانه مرجعاً لكل الأناشيد القادمة. "ذكرى الوطن" CTR 5.8% — يحتاج إعادة تصميم صورة مصغرة.
              </InsightBox>
            </SCard>

            {/* Video Length Performance */}
            <SCard title="⏱️ الطول المثالي للأنشودة" subtitle="تحليل 148 فيديو: المشاهدات الإجمالية (K) حسب طول الفيديو">
              <ResponsiveContainer width="100%" height={210}>
                <ComposedChart data={videoLengthPerf} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} horizontal={false}/>
                  <XAxis type="number" tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`${v}K`}/>
                  <YAxis type="category" dataKey="length" tick={{ fill:T.textSub, fontSize:12, fontFamily:"IBM Plex Sans Arabic" }} width={80}/>
                  <Tooltip content={<ArabicTooltip/>}/>
                  <Bar dataKey="avgViews" name="متوسط المشاهدات" radius={[0,7,7,0]}>
                    {videoLengthPerf.map((_,i)=>(
                      <Cell key={i} fill={i===2?T.gold:i===3?T.amber:i===1?`${T.gold}BB`:`${T.gold}60`}/>
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{ display:"flex", gap:10, marginTop:10, flexWrap:"wrap", direction:"rtl" }}>
                {videoLengthPerf.map((v,i)=>(
                  <div key={i} style={{ background:T.bg3, borderRadius:8, padding:"8px 12px", border:`1px solid ${i===2?T.gold:T.border}`, flex:"1 1 100px" }}>
                    <p style={{ color:i===2?T.gold:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:i===2?700:400 }}>{v.length}</p>
                    <p style={{ color:T.textSub, fontSize:10, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>{v.count} فيديو · احتفاظ {v.retention}%</p>
                  </div>
                ))}
              </div>
              <InsightBox type="success" title="3–5 دقائق هو النطاق الذهبي"
                formula="قسّمنا 148 فيديو في 5 فئات حسب المدة، ثم حسبنا متوسط المشاهدات لكل فئة. الفئة 3–5 دقائق (65 فيديو) تحقق 1.95M مشاهدة متوسطاً — 63% أعلى من الفيديوهات الأقصر من دقيقتين.">
                الفيديوهات 3–5 دقائق تحقق أعلى مشاهدات <strong style={{color:T.gold}}>(1.95M)</strong> مع احتفاظ جيد (74%). <strong style={{color:T.amber}}>الفيديوهات فوق 8 دقائق تخسر 50% من الزخم</strong> — لا تتجاوز 5 دقائق إلا للمحتوى الديني العميق.
              </InsightBox>
            </SCard>

            {/* Retention + CTR by type */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <SCard title="📉 منحنى الاحتفاظ بالمشاهدين" subtitle="نسبة من يكمل الفيديو في كل لحظة">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={retentionCurve}>
                    <defs>
                      <linearGradient id="gRL" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={T.green} stopOpacity={dark?0.3:0.2}/>
                        <stop offset="95%" stopColor={T.green} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid}/>
                    <XAxis dataKey="second" tick={{ fill:T.textMuted, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }}/>
                    <YAxis domain={[40,100]} tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`${v}%`}/>
                    <Tooltip content={<ArabicTooltip/>}/>
                    <ReferenceLine y={70} stroke={`${T.amber}80`} strokeDasharray="4 4"
                      label={{ value:"متوسط الصناعة 70%", fill:T.amber, fontSize:10, fontFamily:"IBM Plex Sans Arabic" }}/>
                    <Area type="monotone" dataKey="retention" stroke={T.green} fill="url(#gRL)" strokeWidth={2.5} dot={false} name="معدل الاحتفاظ"/>
                  </AreaChart>
                </ResponsiveContainer>
                <InsightBox type="success" title="منحنى احتفاظ صحي جداً"
                  formula="منحنى الاحتفاظ = لكل لحظة: (مشاهدو اللحظة X ÷ إجمالي المشاهدين) × 100. المنحنى الأمثل: انخفاض بطيء وسلس بدون حواف حادة.">
                  تفقد 12% في أول 10% — طبيعي جداً. ثم يتباطأ ويستقر عند 58% في النهاية. <strong style={{color:T.green}}>مقدمة أناشيدك جذابة</strong>. يمكن تحسين الـ 10 ثوانٍ الأولى لتقليل الخروج المبكر إلى أقل من 8%.
                </InsightBox>
              </SCard>

              <SCard title="🎯 CTR حسب نوع المحتوى" subtitle="أي تصنيف يجذب أكثر نقرات؟">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ctrByTitle} layout="vertical" barSize={22}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} horizontal={false}/>
                    <XAxis type="number" tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`${v}%`}/>
                    <YAxis type="category" dataKey="type" tick={{ fill:T.textSub, fontSize:12, fontFamily:"IBM Plex Sans Arabic" }} width={95}/>
                    <Tooltip content={<ArabicTooltip/>}/>
                    <Bar dataKey="ctr" radius={[0,7,7,0]} name="نسبة النقر">
                      {ctrByTitle.map((_,i)=>(
                        <Cell key={i} fill={i===0?T.gold:i===1?`${T.gold}CC`:i===2?T.amber:`${T.gold}70`}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <InsightBox type="info" title="أناشيد العائلة تتصدر بـ 9.1%"
                  formula="CTR التصنيف = متوسط CTR جميع الفيديوهات في نفس الفئة. صنّفنا 148 فيديو في 5 فئات يدوياً.">
                  أناشيد العائلة 9.1% تتفوق بفارق كبير على التراثية 6.3%. <strong style={{color:T.gold}}>خصص 40% من إنتاجك للأناشيد العائلية</strong> مع عناوين عاطفية.
                </InsightBox>
              </SCard>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════
            TAB: الجمهور
        ════════════════════════════════════ */}
        {(tab==="audience" || printing) && (
          <div className={printing?"print-break print-section":""} style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>👥 الجمهور</h2>}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:13 }}>
              {[
                { label:"ذكور",             pct:"62%",   icon:"👨", color:T.gold,   note:"الأناشيد الوطنية والدينية تجذب الرجال أكثر" },
                { label:"إناث",             pct:"38%",   icon:"👩", color:T.amber,  note:"المحتوى العائلي يرفع هذه النسبة بشكل ملحوظ" },
                { label:"متوسط العمر",      pct:"28 سنة",icon:"🎂", color:T.green,  note:"الفئة 25–34 (35%) هي الأكثر تفاعلاً" },
                { label:"مشتركون جدد/شهر", pct:"37K",   icon:"🆕", color:T.purple, note:"صافي بعد خصم إلغاء الاشتراكات 5K/شهر" },
              ].map((g,i)=>(
                <div key={i} style={{ background:T.bg2, border:`1px solid ${T.border}`,
                  borderRadius:13, padding:"17px 16px", direction:"rtl", boxShadow:T.cardShadow }}>
                  <div style={{ fontSize:30, marginBottom:8 }}>{g.icon}</div>
                  <p style={{ color:T.textMuted, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:5 }}>{g.label}</p>
                  <p style={{ color:g.color, fontSize:22, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:5 }}>{g.pct}</p>
                  <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.5 }}>{g.note}</p>
                </div>
              ))}
            </div>

            <InsightBox type="info" title="من هو مشاهدك النموذجي؟"
              formula="بروفايل الجمهور مُستخرج من: Demographics في YouTube Analytics + تحليل التعليقات NLP + تحليل أوقات المشاهدة للاستدلال على نمط الحياة.">
              مشاهدك النموذجي: <strong style={{color:T.gold}}>رجل خليجي عمره 28 سنة</strong>، يعيش في الكويت أو السعودية، يُشاهد من الجوال (72%) في وقت الفراغ مساءً. متدين، يُقدّر الأناشيد الدينية والعائلية، ويُشارك المحتوى مع عائلته. هذا البروفايل يجب أن يُحكم قرارات المحتوى بالكامل.
            </InsightBox>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <SCard title="📊 توزيع الفئات العمرية" subtitle="نسبة كل فئة من إجمالي المشاهدين">
                <ResponsiveContainer width="100%" height={225}>
                  <BarChart data={ageData} layout="vertical" barSize={24}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} horizontal={false}/>
                    <XAxis type="number" tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`${v}%`}/>
                    <YAxis type="category" dataKey="group" tick={{ fill:T.textSub, fontSize:12, fontFamily:"IBM Plex Sans Arabic" }} width={50}/>
                    <Tooltip content={<ArabicTooltip/>}/>
                    <Bar dataKey="نسبة" radius={[0,7,7,0]}>
                      {ageData.map((_,i)=>(
                        <Cell key={i} fill={i===2?T.gold:i===3?T.amber:i===1?`${T.gold}BB`:`${T.gold}60`}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <InsightBox type="info" title="الفئة 25–34 هي قلب جمهورك"
                  formula="نسبة الفئة العمرية = (مشاهدو الفئة ÷ إجمالي المشاهدين) × 100. من YouTube Analytics Demographics Report.">
                  الفئة 25–34 (35%) + 35–44 (24%) = <strong style={{color:T.gold}}>59% من جمهورك بالغون مستقرون</strong> يتخذون قرارات الشراء — جذابون جداً للإعلانات الأسرية.
                </InsightBox>
              </SCard>

              <SCard title="📱 الأجهزة وطريقة الوصول">
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                  {[
                    { label:"الجوال",    pct:72, icon:"📱", color:T.gold  },
                    { label:"الكمبيوتر", pct:19, icon:"💻", color:T.amber },
                    { label:"التلفزيون", pct:6,  icon:"📺", color:T.green },
                    { label:"التابلت",   pct:3,  icon:"📟", color:T.purple},
                  ].map(d=>(
                    <div key={d.label} style={{ background:T.bg3, border:`1px solid ${T.border}`,
                      borderRadius:10, padding:"12px", textAlign:"center" }}>
                      <div style={{ fontSize:24, marginBottom:5 }}>{d.icon}</div>
                      <p style={{ color:d.color, fontSize:20, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>{d.pct}%</p>
                      <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>{d.label}</p>
                    </div>
                  ))}
                </div>
                <InsightBox type="warning" title="72% جوال — يؤثر على تصميم الصور المصغرة"
                  formula="بيانات الأجهزة من YouTube Studio > Analytics > Audience > Devices. عينة آخر 28 يوم.">
                  72% جوال يعني: <strong style={{color:T.amber}}>الصورة المصغرة يجب أن تكون واضحة على شاشة 6 بوصة</strong>. تجنب النصوص الصغيرة. وجه كبير + لون متباين = CTR أعلى.
                </InsightBox>
              </SCard>
            </div>

            <SCard title="🗺️ مصادر الوصول — من أين يأتي المشاهدون؟">
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:12, direction:"rtl" }}>
                {[
                  { src:"الاقتراح التلقائي", pct:42, color:T.gold,   note:"الخوارزمية تُرشّح فيديوهاتك لجمهور جديد" },
                  { src:"البحث المباشر",      pct:23, color:T.amber,  note:"المشاهدون يبحثون عن اسمك مباشرة" },
                  { src:"الصفحة الرئيسية",   pct:18, color:T.green,  note:"يوتيوب يضع فيديوهاتك في الهوم" },
                  { src:"التشغيل التلقائي",   pct:11, color:T.purple, note:"بعد نهاية فيديو قناة أخرى" },
                  { src:"خارجي وسوشيال",      pct:6,  color:T.textSub,note:"روابط من خارج يوتيوب" },
                ].map(s=>(
                  <div key={s.src} style={{ background:T.bg3, border:`1px solid ${T.border}`,
                    borderRadius:12, padding:"13px" }}>
                    <p style={{ color:s.color, fontSize:20, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:4 }}>{s.pct}%</p>
                    <p style={{ color:T.text, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:5 }}>{s.src}</p>
                    <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.5 }}>{s.note}</p>
                    <div style={{ height:4, background:T.border, borderRadius:2, marginTop:8 }}>
                      <div style={{ width:`${(s.pct/42)*100}%`, height:"100%", background:s.color, borderRadius:2 }}/>
                    </div>
                  </div>
                ))}
              </div>
              <InsightBox type="success" title="42% من الاقتراحات — الخوارزمية تُحبّ قناتك"
                formula="مصادر الوصول من YouTube Studio > Analytics > Traffic Sources. 42% من الاقتراحات مقابل متوسط 35% للصناعة.">
                الاقتراحات التلقائية 42% تعني <strong style={{color:T.green}}>يوتيوب يُوزّع فيديوهاتك تلقائياً للجمهور غير المشترك</strong> — أقوى محرك نمو مجاني. حافظ عليه بالاحتفاظ العالي والـ CTR الجيد.
              </InsightBox>
            </SCard>
          </div>
        )}

        {/* ════════════════════════════════════
            TAB: التفاعل
        ════════════════════════════════════ */}
        {(tab==="engagement" || printing) && (
          <div className={printing?"print-break print-section":""} style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>💛 التفاعل</h2>}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:13 }}>
              {[
                { label:"معدل التفاعل الكلي",     value:"6.8%", icon:"💛", color:T.gold,
                  formula:"معدل التفاعل = (الإعجابات + التعليقات + المشاركات) ÷ المشاهدات × 100. المتوسط الصناعي: 3–4%." },
                { label:"إعجابات / 1000 مشاهدة",  value:"38",   icon:"👍", color:T.amber,
                  formula:"Likes per 1000 Views = (إجمالي الإعجابات ÷ المشاهدات) × 1000 = 38. المتوسط: 25." },
                { label:"تعليقات / 1000 مشاهدة",  value:"14",   icon:"💬", color:T.green,
                  formula:"Comments per 1000 Views = 14. المتوسط الصناعي: 21. هنا أكبر فرصة للتحسين." },
                { label:"مشاركات / 1000 مشاهدة",  value:"8.2",  icon:"🔗", color:T.purple,
                  formula:"Shares per 1000 Views = 8.2. المشاركة مؤشر قوي جداً للخوارزمية — تزن أكثر من الإعجابات." },
              ].map((k,i)=>(
                <div key={i} style={{ background:T.bg2, border:`1px solid ${T.border}`,
                  borderRadius:13, padding:"17px 18px", direction:"rtl", boxShadow:T.cardShadow }}>
                  <div style={{ fontSize:30, marginBottom:8 }}>{k.icon}</div>
                  <p style={{ color:T.textMuted, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:5 }}>{k.label}</p>
                  <p style={{ color:k.color, fontSize:24, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:8 }}>{k.value}</p>
                  <details>
                    <summary style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>📐 كيف يُحسب؟</summary>
                    <p style={{ color:dark?"#8080B0":T.textSub, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:6, lineHeight:1.7 }}>{k.formula}</p>
                  </details>
                </div>
              ))}
            </div>

            <SCard title="📈 تطور معدل التفاعل مقابل المنافسين" subtitle="مقارنة بمتوسط أعلى 10 قنوات إنشاد خليجية">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={engagementTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid}/>
                  <XAxis dataKey="month" tick={{ fill:T.textMuted, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }}/>
                  <YAxis tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`${v}%`}/>
                  <Tooltip content={<ArabicTooltip/>}/>
                  <Legend wrapperStyle={{ fontFamily:"IBM Plex Sans Arabic", fontSize:12, color:T.textSub }}/>
                  <ReferenceLine y={4} stroke={`${T.red}60`} strokeDasharray="4 4"
                    label={{ value:"حد الصناعة الأدنى", fill:T.red, fontSize:10, fontFamily:"IBM Plex Sans Arabic" }}/>
                  <Line type="monotone" dataKey="معدل"  stroke={T.gold}  strokeWidth={2.5} dot={{ fill:T.gold,  r:5 }}/>
                  <Line type="monotone" dataKey="منافس" stroke={T.red}   strokeWidth={2}   strokeDasharray="5 3" dot={{ fill:T.red,   r:4 }}/>
                </LineChart>
              </ResponsiveContainer>
              <InsightBox type="success" title="تتفوق على المنافسين بـ 58% في التفاعل"
                formula="بيانات المنافسين من Apify YouTube Scraper لأعلى 10 قنوات مشابهة. متوسط تفاعل المنافسين: 4.3%. نايف: 6.8%.">
                معدل تفاعلك 6.8% يتجاوز جميع المنافسين المباشرين. الفجوة تتسع باستمرار لصالحك. <strong style={{color:T.green}}>هذا مؤشر ثقة جمهورك العميق بمحتواك</strong> — أصعب شيء على المنافسين تقليده.
              </InsightBox>
            </SCard>

            <SCard title="💬 تحليل التعليقات المتعمق — عيّنة 42,000 تعليق">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:13, direction:"rtl" }}>
                {[
                  {
                    title:"🗣️ أكثر الكلمات تكراراً",
                    items:[
                      { word:"ما شاء الله",  count:"4,230", color:T.gold   },
                      { word:"جمال الصوت",   count:"3,180", color:T.gold   },
                      { word:"يستاهل",        count:"2,940", color:T.amber  },
                      { word:"الله يحفظك",   count:"2,610", color:T.amber  },
                      { word:"رائع",          count:"2,200", color:T.textSub},
                    ],
                  },
                  {
                    title:"📌 طلبات متكررة",
                    items:[
                      { word:"أنشودة عن الأب",    count:"1,850 طلب", color:T.gold   },
                      { word:"أنشودة رمضانية",    count:"1,620 طلب", color:T.gold   },
                      { word:"نسخة بدون موسيقى", count:"1,410 طلب", color:T.amber  },
                      { word:"أنشودة للأطفال",   count:"1,280 طلب", color:T.amber  },
                      { word:"كلمات الأنشودة",   count:"980 طلب",   color:T.textSub},
                    ],
                  },
                  {
                    title:"⚠️ شكاوى شائعة",
                    items:[
                      { word:"الصوت منخفض",   count:"820 ذكر", color:T.red     },
                      { word:"الفيديو قصير",  count:"640 ذكر", color:T.red     },
                      { word:"أريد الكلمات",  count:"580 ذكر", color:T.amber   },
                      { word:"نوعية الصورة",  count:"310 ذكر", color:T.textSub },
                      { word:"عناوين باللغات",count:"210 ذكر", color:T.textSub },
                    ],
                  },
                ].map(col=>(
                  <div key={col.title} style={{ background:T.bg3, border:`1px solid ${T.border}`, borderRadius:11, padding:"13px" }}>
                    <p style={{ color:T.text, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:10 }}>{col.title}</p>
                    {col.items.map((it,i)=>(
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7, borderBottom:`1px solid ${T.border}`, paddingBottom:7 }}>
                        <span style={{ color:it.color, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:500 }}>{it.word}</span>
                        <span style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>{it.count}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <InsightBox type="info" title="كنز من البيانات في التعليقات"
                formula="استخرجنا الكلمات بنموذج TF-IDF (Term Frequency–Inverse Document Frequency) على 42,000 تعليق. TF-IDF يُحدد الكلمات المميزة لقناتك تحديداً لا الكلمات العامة.">
                <strong style={{color:T.gold}}>1,850 طلب لأنشودة عن الأب</strong> هي خارطة طريق مجانية. إنتاج هذه الأنشودة قبل عيد الآباء أو اليوم الوطني يضمن مشاهدات مليونية تقريباً.
              </InsightBox>
            </SCard>

            {/* Hashtag Performance */}
            <SCard title="🔖 أداء الهاشتاقات — أي وسم يجلب أكثر مشاهدات؟" subtitle="إجمالي المشاهدات (K) لكل هاشتاق عبر 148 فيديو">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={hashtagPerf} layout="vertical" barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} horizontal={false}/>
                  <XAxis type="number" tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`${(v/1000).toFixed(0)}M`}/>
                  <YAxis type="category" dataKey="tag" tick={{ fill:T.textSub, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }} width={130}/>
                  <Tooltip content={<ArabicTooltip/>}/>
                  <Bar dataKey="مشاهدات_K" name="المشاهدات (K)" radius={[0,7,7,0]}>
                    {hashtagPerf.map((_,i)=>(
                      <Cell key={i} fill={i===0?T.gold:i===1?`${T.gold}CC`:i===2?T.amber:`${T.gold}70`}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <InsightBox type="info" title="هاشتاق اسمك يتصدر بـ 8.2M مشاهدة"
                formula="مشاهدات الهاشتاق = مجموع مشاهدات كل فيديو يستخدم هذا الهاشتاق. البيانات من YouTube Studio > Analytics > Traffic Sources > Hashtags.">
                أضف <strong style={{color:T.gold}}>#نايف_الشرهان + #أناشيد_اسلامية</strong> في كل فيديو — هذا المزيج يُغطي 67% من المشاهدات القادمة من الوسوم. أضف هاشتاق المناسبة الموسمية للفيديوهات المرتبطة.
              </InsightBox>
            </SCard>
          </div>
        )}

        {/* ════════════════════════════════════
            TAB: الإيرادات
        ════════════════════════════════════ */}
        {(tab==="revenue" || printing) && (
          <div className={printing?"print-break print-section":""} style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>💰 الإيرادات التقديرية</h2>}

            {/* KPIs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(195px,1fr))", gap:13 }}>
              {[
                { label:"إجمالي الإيرادات 2024",  value:"71.4K$", icon:"💵", color:T.gold,
                  note:"AdSense + 3 صفقات برانداً",
                  formula:"مجموع كل الأشهر: AdSense ($46.4K) + Brand Deals ($20.5K) = $66.9K تقريباً. الأرقام تقديرية بناءً على RPM متوسط $1.5–2.5 لكل 1000 مشاهدة." },
                { label:"أعلى شهر (ديسمبر)",      value:"14.1K$", icon:"🏆", color:T.amber,
                  note:"بسبب صفقة براند $8K + 3M مشاهدة",
                  formula:"ديسمبر: AdSense $6,100 (3.05M مشاهدة × $2/1000) + Brand Deal $8,000 = $14,100." },
                { label:"متوسط RPM الشهري",       value:"$2.0",   icon:"📊", color:T.green,
                  note:"مقابل متوسط الصناعة $1.2",
                  formula:"RPM = (الإيرادات ÷ المشاهدات) × 1000. متوسط الصناعة لقنوات الأناشيد العربية: $1.2–1.8." },
                { label:"عدد صفقات البراند 2024",  value:"3 صفقات",icon:"🤝", color:T.purple,
                  note:"مارس + يونيو + سبتمبر + ديسمبر",
                  formula:"أفضل وقت لعروض البراند: قبل رمضان (فبراير) وقبل المواسم الكبرى. 4 صفقات سنوياً هي الطاقة الاستيعابية المثلى." },
              ].map((k,i)=>(
                <div key={i} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:13,
                  padding:"17px 18px", direction:"rtl", boxShadow:T.cardShadow }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <p style={{ color:T.textMuted, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:5 }}>{k.label}</p>
                      <p style={{ color:k.color, fontSize:24, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:4 }}>{k.value}</p>
                      <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:8 }}>{k.note}</p>
                    </div>
                    <span style={{ fontSize:28 }}>{k.icon}</span>
                  </div>
                  <details>
                    <summary style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>📐 طريقة الحساب</summary>
                    <p style={{ color:dark?"#8080B0":T.textSub, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:6, lineHeight:1.7 }}>{k.formula}</p>
                  </details>
                </div>
              ))}
            </div>

            {/* Revenue chart */}
            <SCard title="💰 الإيرادات الشهرية التقديرية 2024" subtitle="AdSense (أشرطة) + صفقات البراند (خط) · بالدولار الأمريكي">
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={revenueMonthly}>
                  <defs>
                    <linearGradient id="gAds" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={T.gold}  stopOpacity={dark?0.4:0.3}/>
                      <stop offset="95%" stopColor={T.gold}  stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid}/>
                  <XAxis dataKey="month" tick={{ fill:T.textMuted, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }}/>
                  <YAxis tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/>
                  <Tooltip content={<ArabicTooltip/>}/>
                  <Legend wrapperStyle={{ fontFamily:"IBM Plex Sans Arabic", fontSize:12, color:T.textSub }}/>
                  <Bar dataKey="adsense" name="AdSense" fill={T.gold} radius={[4,4,0,0]} fillOpacity={0.85}/>
                  <Bar dataKey="brand"   name="براند ديل" fill={T.green} radius={[4,4,0,0]} fillOpacity={0.85}/>
                  <Line type="monotone" dataKey="total" name="الإجمالي" stroke={T.amber} strokeWidth={2.5} dot={{ fill:T.amber, r:4 }}/>
                </ComposedChart>
              </ResponsiveContainer>
              <InsightBox type="info" title="النمو من $1.8K إلى $14.1K في سنة واحدة (+665%)"
                formula="نمو الإيرادات أسرع من نمو المشاهدات بسبب: (1) زيادة RPM في نهاية السنة بسبب موسم الإعلانات (Q4)، (2) إضافة صفقات براند بقيمة أعلى مع كل موسم.">
                الإيرادات تنمو أسرع من المشاهدات لأن <strong style={{color:T.gold}}>RPM يرتفع في Q4 (أكتوبر–ديسمبر)</strong> بسبب ارتفاع إنفاق الإعلانات عالمياً. حافظ على هذه الوتيرة وستتجاوز <strong style={{color:T.green}}>$100K سنوياً في 2025.</strong>
              </InsightBox>
            </SCard>

            {/* Monetization Opportunities */}
            <SCard title="🚀 فرص تعظيم الإيرادات — مصادر غير مستغلة">
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, direction:"rtl" }}>
                {[
                  { icon:"🎵", title:"حقوق النغمات",       potential:"$8K–15K/سنة",  color:T.gold,
                    detail:"ترخيص أناشيدك لتطبيقات القرآن والأذكار. الطلب كبير وعائد شبه سلبي." },
                  { icon:"📱", title:"YouTube Shorts",      potential:"+$500/شهر",    color:T.amber,
                    detail:"Shorts تُدرّ إيرادات منفصلة عبر Shorts Fund. كل Short يُضيف $50–150." },
                  { icon:"🎁", title:"YouTube Membership",  potential:"$1K–3K/شهر",   color:T.green,
                    detail:"عضوية شهرية بـ $4.99 للجمهور المتحمس. 200 عضو = $1K/شهر تلقائياً." },
                  { icon:"📦", title:"منتجات رقمية",        potential:"$5K–20K",       color:T.purple,
                    detail:"بيع كلمات الأناشيد أو نوتات موسيقية أو كورس الإنشاد عبر Gumroad." },
                ].map((o,i)=>(
                  <div key={i} style={{ background:T.bg3, border:`1px solid ${o.color}30`,
                    borderTop:`3px solid ${o.color}`, borderRadius:12, padding:"14px" }}>
                    <div style={{ fontSize:28, marginBottom:6 }}>{o.icon}</div>
                    <p style={{ color:T.text, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:4 }}>{o.title}</p>
                    <p style={{ color:o.color, fontSize:15, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:8 }}>{o.potential}</p>
                    <p style={{ color:T.textMuted, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.6 }}>{o.detail}</p>
                  </div>
                ))}
              </div>
              <InsightBox type="success" title="إضافة هذه المصادر تُضاعف الإيرادات إلى $150K+ سنوياً"
                formula="التوقع: AdSense 2025 ($80K) + براند ديلز ($30K) + Membership ($15K) + حقوق ($12K) + منتجات رقمية ($10K) = $147K تقديرياً.">
                الخطوة الأولى والأسهل: <strong style={{color:T.gold}}>فعّل YouTube Membership الآن</strong> — يستغرق 10 دقائق في Studio وسيبدأ الدخل فور التفعيل من جمهورك الـ 572K.
              </InsightBox>
            </SCard>
          </div>
        )}

        {/* ════════════════════════════════════
            TAB: المنافسون
        ════════════════════════════════════ */}
        {(tab==="competitors" || printing) && (
          <div className={printing?"print-break print-section":""} style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>🏁 تحليل المنافسين</h2>}

            <InsightBox type="success" title="🥇 نايف الشرهان يتصدر جميع مؤشرات المنافسة">
              تحليل 5 قنوات إنشاد خليجية مباشرة: نايف يتفوق في المشتركين، المشاهدات، والتفاعل. <strong style={{color:T.gold}}>الفجوة الوحيدة: Shorts</strong> — المنافسون أكثر نشاطاً فيها بكثير.
            </InsightBox>

            {/* Competitor comparison charts */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <SCard title="📊 مقارنة المشتركين (K)" subtitle="أعمدة مرتبة حسب الحجم">
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={competitorMetrics} layout="vertical" barSize={26}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.chartGrid} horizontal={false}/>
                    <XAxis type="number" tick={{ fill:T.textMuted, fontSize:10 }} tickFormatter={v=>`${v}K`}/>
                    <YAxis type="category" dataKey="name" tick={{ fill:T.textSub, fontSize:11, fontFamily:"IBM Plex Sans Arabic" }} width={90}/>
                    <Tooltip content={<ArabicTooltip/>}/>
                    <Bar dataKey="مشتركون" name="المشتركون (K)" radius={[0,7,7,0]}>
                      {competitorMetrics.map((c,i)=>(
                        <Cell key={i} fill={c.color}/>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </SCard>

              <SCard title="🕸️ المركز التنافسي الشامل" subtitle="مقارنة 6 محاور — نايف مقابل متوسط المنافسين">
                <ResponsiveContainer width="100%" height={210}>
                  <RadarChart cx="50%" cy="50%" outerRadius={80} data={competitorRadar}>
                    <PolarGrid stroke={`${T.gold}25`}/>
                    <PolarAngleAxis dataKey="subject" tick={{ fill:T.textSub, fontSize:10, fontFamily:"IBM Plex Sans Arabic" }}/>
                    <Radar name="نايف الشرهان"      dataKey="نايف"               stroke={T.gold}  fill={T.gold}  fillOpacity={dark?0.25:0.18} strokeWidth={2.5}/>
                    <Radar name="متوسط المنافسين"   dataKey="متوسط_المنافسين"   stroke={T.red}   fill={T.red}   fillOpacity={0.07} strokeWidth={1.5} strokeDasharray="4 4"/>
                    <Legend wrapperStyle={{ fontFamily:"IBM Plex Sans Arabic", fontSize:11, color:T.textSub }}/>
                    <Tooltip contentStyle={{ background:T.tooltipBg, border:`1px solid ${T.tooltipBorder}`,
                      fontFamily:"IBM Plex Sans Arabic", direction:"rtl", color:T.text, fontSize:12 }}/>
                  </RadarChart>
                </ResponsiveContainer>
              </SCard>
            </div>

            {/* Competitor table */}
            <SCard title="🏆 جدول المقارنة الكاملة" subtitle="مصدر البيانات: Apify YouTube Scraper · ديسمبر 2024">
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", direction:"rtl" }}>
                  <thead>
                    <tr style={{ background:dark?"rgba(212,175,55,0.06)":"rgba(184,134,11,0.05)" }}>
                      {["القناة","المشتركون","المشاهدات M","التفاعل %","النمو %/شهر","Shorts عدد","الميزة"].map(h=>(
                        <th key={h} style={{ color:T.gold, fontSize:11.5, fontFamily:"'IBM Plex Sans Arabic',sans-serif",
                          fontWeight:700, textAlign:"right", padding:"9px 10px",
                          borderBottom:`1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {competitorMetrics.map((c,i)=>(
                      <tr key={i}
                        onMouseEnter={e=>e.currentTarget.style.background=dark?"rgba(212,175,55,0.04)":"rgba(184,134,11,0.04)"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                        style={{ transition:"background 0.2s", borderBottom:`1px solid ${T.border}`,
                          background: i===0?(dark?"rgba(184,134,11,0.06)":"rgba(184,134,11,0.04)"):"transparent" }}>
                        <td style={{ padding:"10px", fontFamily:"IBM Plex Sans Arabic" }}>
                          <span style={{ color:c.color, fontWeight:700, fontSize:13 }}>{i===0?"👑 ":""}{c.name}</span>
                        </td>
                        <td style={{ padding:"10px", color:c.color, fontSize:13, fontFamily:"IBM Plex Sans Arabic", fontWeight:i===0?700:400 }}>{c.مشتركون}K</td>
                        <td style={{ padding:"10px", color:T.textSub, fontSize:13, fontFamily:"IBM Plex Sans Arabic" }}>{c.مشاهدات}M</td>
                        <td style={{ padding:"10px" }}>
                          <span style={{ color:c.تفاعل>5?T.green:c.تفاعل>4?T.gold:T.red, fontWeight:700, fontSize:13, fontFamily:"IBM Plex Sans Arabic" }}>{c.تفاعل}%</span>
                        </td>
                        <td style={{ padding:"10px" }}>
                          <span style={{ color:c.نمو>6?T.green:c.نمو>4?T.gold:T.textSub, fontSize:13, fontFamily:"IBM Plex Sans Arabic" }}>{c.نمو}%</span>
                        </td>
                        <td style={{ padding:"10px", color:c.shorts===0?T.red:T.textSub, fontSize:13, fontFamily:"IBM Plex Sans Arabic" }}>
                          {c.shorts===0?"❌ 0":c.shorts}
                        </td>
                        <td style={{ padding:"10px", color:T.textMuted, fontSize:12, fontFamily:"IBM Plex Sans Arabic" }}>
                          {i===0?"تفاعل + مشاهدات":i===1?"Shorts نشط":i===2?"Shorts متصدر":i===3?"قاعدة ثانية":i===4?"تعليقات عالية":"—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <InsightBox type="warning" title="ثغرة Shorts خطيرة — المنافسون يتقدمون"
                formula="متوسط Shorts للمنافسين: 50 قصير. نايف: 0. القنوات التي بدأت Shorts رأت نمو مشتركين 28% إضافي في أول 3 أشهر — هذا ما يفوّت نايف كل شهر.">
                المنافسون ينشرون Shorts بمعدل 3–5 أسبوعياً وينمون مشتركين من جمهور جديد لا يعرف نايف. <strong style={{color:T.amber}}>كل شهر تأخير = 10K–15K مشترك محتمل ضاع.</strong>
              </InsightBox>
            </SCard>

            {/* SWOT */}
            <SCard title="🔍 تحليل SWOT — الموقف التنافسي">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:13, direction:"rtl" }}>
                {[
                  { title:"💪 نقاط القوة", color:T.green, items:["أعلى معدل تفاعل في الصناعة (6.8%)","خوارزمية تُحب القناة (42% اقتراح)","مجتمع وفي ومتفاعل (74% إيجابي)","أعلى احتفاظ (85% في أفضل الفيديوهات)"] },
                  { title:"⚠️ نقاط الضعف", color:T.red, items:["غياب Shorts كلياً (0 فيديو)","توقيت النشر عشوائي","CTR دون الطموح في بعض الفيديوهات","ضعف الاستهداف الجغرافي للسعودية"] },
                  { title:"🚀 الفرص",      color:T.gold, items:["سوق Shorts فارغ محلياً","جمهور مصري عالي التفاعل غير مستغل","موسم رمضان 2025 يقترب","YouTube Membership غير مفعّل"] },
                  { title:"🌩️ التهديدات", color:T.amber, items:["منافسون يتسارعون في Shorts","خوارزمية YouTube تُكافئ التنوع","إشباع محتوى الأناشيد في السعودية","تغير أذواق فئة 18–24 نحو Shorts"] },
                ].map(s=>(
                  <div key={s.title} style={{ background:T.bg3, border:`1px solid ${s.color}25`,
                    borderRight:`3px solid ${s.color}`, borderRadius:11, padding:"13px" }}>
                    <p style={{ color:s.color, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:10 }}>{s.title}</p>
                    {s.items.map((it,j)=>(
                      <div key={j} style={{ display:"flex", gap:7, marginBottom:6, alignItems:"flex-start" }}>
                        <span style={{ color:s.color, fontSize:12, flexShrink:0 }}>◆</span>
                        <p style={{ color:T.textSub, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.55 }}>{it}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </SCard>
          </div>
        )}

        {/* ════════════════════════════════════
            TAB: التوصيات
        ════════════════════════════════════ */}
        {(tab==="recommendations" || printing) && (
          <div className={printing?"print-break print-section":""} style={{ display:"grid", gap:18 }}>
          {printing && <h2 style={{ color:"#B8860B", fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:16, fontWeight:700, direction:"rtl", borderBottom:"1px solid #E2D9C8", paddingBottom:8, marginBottom:4 }}>💡 التوصيات والخطة</h2>}

            {/* Executive summary */}
            <div style={{
              background:dark?"rgba(184,134,11,0.08)":"#FFFBEE",
              border:`2px solid ${T.borderAccent}`,
              borderRadius:18, padding:"22px 26px", direction:"rtl",
            }}>
              <h2 style={{ color:T.gold, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:17, fontWeight:700, marginBottom:10 }}>
                🤖 ملخص تنفيذي — التقييم الشامل
              </h2>
              <p style={{ color:T.textSub, fontSize:14, lineHeight:2, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:400 }}>
                بعد تحليل <strong style={{color:T.gold}}>12 شهراً من البيانات، 148 نشيد، وأكثر من 42,000 تعليق</strong>: قناة نايف الشرهان في أفضل حالاتها. معدل النمو 7.2% شهرياً ضعف متوسط الصناعة، والخوارزمية تُحبّ المحتوى (42% وصول من الاقتراحات). <strong style={{color:T.green}}>القيمة الأساسية قوية جداً.</strong>
                <br/><br/>
                التحدي الأكبر ليس الجودة — بل <strong style={{color:T.amber}}>الاستراتيجية</strong>: توقيت النشر العشوائي يُضيّع 40% من إمكانية المشاهدات، وغياب Shorts يترك بوابة نمو ضخمة مفتوحة. تطبيق التوصيات الست يُسرّع الوصول لـ <strong style={{color:T.gold}}>مليون مشترك خلال 8 أشهر بدلاً من 14.</strong>
              </p>
            </div>

            {recommendations.map((r,i)=>(
              <div key={i} style={{
                background:T.bg2, border:`1px solid ${T.border}`,
                borderRight:`4px solid ${r.color}`,
                borderRadius:14, padding:"20px 22px", direction:"rtl",
                boxShadow:T.cardShadow,
              }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:16, alignItems:"flex-start" }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, flexWrap:"wrap" }}>
                      <span style={{ fontSize:24 }}>{r.icon}</span>
                      <h3 style={{ color:T.text, fontSize:15, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700 }}>{r.title}</h3>
                      <span style={{
                        background:dark?`${r.color}18`:`${r.color}15`,
                        border:`1px solid ${r.color}50`,
                        borderRadius:20, padding:"2px 11px",
                        color:r.color, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:600,
                      }}>أولوية {r.priority}</span>
                    </div>
                    <p style={{ color:T.textSub, fontSize:13.5, lineHeight:1.9, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:400, marginBottom:12 }}>{r.detail}</p>
                    <div style={{ background:dark?"rgba(107,110,158,0.08)":"rgba(120,110,200,0.05)",
                      border:`1px solid ${dark?"rgba(107,110,158,0.22)":"rgba(180,170,220,0.4)"}`,
                      borderRadius:9, padding:"10px 13px", marginBottom:12 }}>
                      <p style={{ color:T.purple, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:5 }}>
                        📐 كيف توصّلنا لهذه التوصية؟
                      </p>
                      <p style={{ color:dark?"#8080AA":T.textSub, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.8 }}>{r.how}</p>
                    </div>
                    <div>
                      <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:7 }}>✅ خطوات التنفيذ:</p>
                      {r.steps.map((s,j)=>(
                        <div key={j} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:7 }}>
                          <span style={{ color:r.color, fontSize:13, marginTop:1, flexShrink:0, fontWeight:700 }}>{j+1}.</span>
                          <p style={{ color:T.textSub, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.65, fontWeight:400 }}>{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{
                    background:dark?`${r.color}10`:`${r.color}10`,
                    border:`1px solid ${r.color}35`,
                    borderRadius:12, padding:"14px 18px", textAlign:"center",
                    minWidth:96, flexShrink:0,
                  }}>
                    <p style={{ color:T.textMuted, fontSize:10, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:4 }}>التأثير المتوقع</p>
                    <p style={{ color:r.color, fontSize:22, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif", whiteSpace:"nowrap" }}>{r.impact}</p>
                    <p style={{ color:T.textMuted, fontSize:10, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:4 }}>مشاهدات/تفاعل</p>
                  </div>
                </div>
              </div>
            ))}

            {/* 90-day plan */}
            <SCard title="📋 خطة التنفيذ التفصيلية — 90 يوماً">
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                {[
                  { period:"الشهر الأول",  color:T.gold,  goal:"الأساس والتهيئة",     kpi:"هدف: +8% نمو شهري",
                    steps:["جدوِل كل فيديو للجمعة 8م","اقطع Shorts من أفضل 5 أناشيد","رد على 20 تعليق أول لكل فيديو","أعد تصميم صور مصغرة لأضعف 3 فيديوهات"] },
                  { period:"الشهر الثاني", color:T.amber, goal:"التوسع والمحتوى الجديد",kpi:"هدف: +620K مشترك",
                    steps:["أطلق سلسلة 'أنشودة لكل أم'","أنتج نشيد رمضاني مبكراً","تعاون مع منشد سعودي","انشر Short يومياً"] },
                  { period:"الشهر الثالث", color:T.green, goal:"القياس والتحسين",      kpi:"هدف: +670K مشترك",
                    steps:["قيّم تأثير كل توصية بالأرقام","استهدف الجمهور المصري","أطلق بث مباشر شهري","أعد ضبط Shorts بناءً على النتائج"] },
                ].map(p=>(
                  <div key={p.period} style={{ background:T.bg3, border:`1px solid ${p.color}25`,
                    borderTop:`3px solid ${p.color}`, borderRadius:12, padding:"15px" }}>
                    <h4 style={{ color:p.color, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:700, marginBottom:3 }}>📅 {p.period}</h4>
                    <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:2 }}>{p.goal}</p>
                    <p style={{ color:p.color, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontWeight:600, marginBottom:12 }}>{p.kpi}</p>
                    {p.steps.map((s,j)=>(
                      <div key={j} style={{ display:"flex", gap:7, marginBottom:8, alignItems:"flex-start" }}>
                        <span style={{ color:p.color, fontSize:13, marginTop:1, flexShrink:0 }}>◆</span>
                        <p style={{ color:T.textSub, fontSize:12, fontFamily:"'IBM Plex Sans Arabic',sans-serif", lineHeight:1.5 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </SCard>

            {/* ROI */}
            <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:15,
              padding:"20px 22px", boxShadow:T.cardShadow }}>
              <h3 style={{ color:T.gold, fontFamily:"'IBM Plex Sans Arabic',sans-serif", fontSize:15, fontWeight:700, marginBottom:14, direction:"rtl" }}>
                💰 تقدير العائد المتوقع من تنفيذ التوصيات
              </h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:12 }}>
                {[
                  { label:"مشتركون إضافيون", current:"572K",  after:"800K+",  icon:"👥", note:"خلال 6 أشهر" },
                  { label:"مشاهدات شهرية",   current:"3.05M", after:"5M+",    icon:"▶️", note:"بعد تطبيق التوصيات" },
                  { label:"معدل التفاعل",     current:"6.8%",  after:"8.5%+",  icon:"💛", note:"بزيادة التعليقات والـ Shorts" },
                  { label:"CTR الفيديوهات",   current:"6.8%",  after:"9%+",    icon:"🎯", note:"بتحسين الصور المصغرة" },
                ].map(r=>(
                  <div key={r.label} style={{ background:T.bg3, border:`1px solid ${T.border}`, borderRadius:11, padding:"13px", textAlign:"center", direction:"rtl" }}>
                    <div style={{ fontSize:22, marginBottom:5 }}>{r.icon}</div>
                    <p style={{ color:T.textMuted, fontSize:11, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginBottom:4 }}>{r.label}</p>
                    <p style={{ color:T.textMuted, fontSize:13, fontFamily:"'IBM Plex Sans Arabic',sans-serif", textDecoration:"line-through", marginBottom:2 }}>{r.current}</p>
                    <p style={{ color:T.green, fontSize:18, fontWeight:700, fontFamily:"'IBM Plex Sans Arabic',sans-serif" }}>{r.after}</p>
                    <p style={{ color:T.textMuted, fontSize:10, fontFamily:"'IBM Plex Sans Arabic',sans-serif", marginTop:4 }}>{r.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign:"center", marginTop:30, paddingTop:16,
          borderTop:`1px solid ${T.border}`,
          color:T.textMuted, fontSize:11,
          fontFamily:"'IBM Plex Sans Arabic',sans-serif", direction:"rtl",
        }}>
          تقرير تحليل متقدم مدفوع · بيانات توضيحية · نايف الشرهان © 2024
          <br/>ARIMA · VADER NLP · TF-IDF · SWOT · Pearson Correlation · CMGR Analysis
          <br/>
          <span className="no-print" style={{ color:T.textMuted, fontSize:10 }}>
            لتصدير PDF ملون: اضغط "تصدير PDF" ثم اختر "حفظ كـ PDF" في نافذة الطباعة مع تفعيل خيار "الألوان الخلفية"
          </span>
        </div>
      </div>
    </div>
  );
}
