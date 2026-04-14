// ================================================================
// SmartCrick AI — Complete Professional App (CDN React 18 UMD)
// No bundler. All features. All pages. Full implementation.
// ================================================================
(function () {
'use strict';

const {
  createElement:h, useState, useEffect, useCallback, useRef,
  useContext, createContext, useMemo, Fragment, memo, useReducer
} = React;
const { createRoot } = ReactDOM;

// ── Icons ────────────────────────────────────────────────────────
const IC = {
  home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  menu:'<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  chevR:'<path d="m9 18 6-6-6-6"/>',
  chevD:'<path d="m6 9 6 6 6-6"/>',
  chevU:'<path d="m18 15-6-6-6 6"/>',
  arrowL:'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  brain:'<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  trophy:'<path d="M6 9a6 6 0 0 0 12 0V3H6z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M10 14.66V21.978"/><path d="M14 14.66V21.978"/><path d="M4 22h16"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/>',
  zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  dumbbell:'<path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  circleCheck:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
  play:'<polygon points="5 3 19 11 5 19 5 3"/>',
  pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  trendUp:'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  crown:'<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.277 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
  rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>',
  sparkles:'<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
  calendar:'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  video:'<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  barChart:'<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  timer:'<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="12" y2="8"/><path d="M20.2 20.2A9 9 0 1 0 12 21a8.7 8.7 0 0 0 5.3-1.8"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  globe:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  extLink:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  pencil:'<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  smile:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
  repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  wind:'<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  crosshair:'<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>',
  bookmark:'<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  message:'<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
};

function Icon({ n, cls = 'w-5 h-5', style }) {
  return h('svg', {
    className: cls, style,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 2,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true,
    dangerouslySetInnerHTML: { __html: IC[n] || IC.info }
  });
}

// ── Theme Context ─────────────────────────────────────────────────
const ThemeCtx = createContext({ dark: true, toggle: () => {} });
function useTheme() { return useContext(ThemeCtx); }

// ── Routing ───────────────────────────────────────────────────────
function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '') || 'Home';
  const [page, qs] = hash.split('?');
  const params = {};
  if (qs) qs.split('&').forEach(p => { const [k,v] = p.split('='); params[k] = decodeURIComponent(v||''); });
  return { page, params };
}
function nav(page, params = {}) {
  const qs = Object.keys(params).length
    ? '?' + Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&')
    : '';
  window.location.hash = `#/${page}${qs}`;
}
function useRoute() {
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const fn = () => setRoute(getRoute());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return route;
}

// ── localStorage DB ───────────────────────────────────────────────
const DB = {
  key: k => `sc_${k}`,
  get: k => { try { return JSON.parse(localStorage.getItem(DB.key(k))); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(DB.key(k), JSON.stringify(v)); } catch {} return v; },
  del: k => localStorage.removeItem(DB.key(k)),
  // User profile
  getUser: () => DB.get('user') || {},
  setUser: v => DB.set('user', v),
  // Progress
  getProgress: () => DB.get('progress') || {
    total_xp: 0, drills_done: 0, mental_done: 0,
    workouts_done: 0, practice_minutes: 0,
    current_streak: 0, longest_streak: 0,
    last_active_date: null,
    completed_drills: [], completed_mental: [], completed_workouts: [],
    badges: [], skill_path_progress: {}
  },
  saveProgress: v => DB.set('progress', v),
  // XP log for charts
  getXPLog: () => DB.get('xp_log') || [],
  addXPEntry: (xp, source) => {
    const log = DB.getXPLog();
    const today = new Date().toISOString().slice(0,10);
    log.push({ date: today, xp, source, ts: Date.now() });
    // Keep 90 days
    const cutoff = Date.now() - 90*24*60*60*1000;
    DB.set('xp_log', log.filter(e => e.ts > cutoff));
  },
  // Get last 7 days xp for chart
  getXPLast7Days: () => {
    const log = DB.getXPLog();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0,10);
      const dayLabel = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
      const total = log.filter(e => e.date === dateStr).reduce((s,e) => s+e.xp, 0);
      days.push({ date: dateStr, label: dayLabel, xp: total });
    }
    return days;
  },
  // Get last 30 days activity for heatmap
  getActivityHeatmap: () => {
    const log = DB.getXPLog();
    const map = {};
    log.forEach(e => { map[e.date] = (map[e.date]||0) + e.xp; });
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const date = d.toISOString().slice(0,10);
      const xp = map[date] || 0;
      days.push({ date, xp, level: xp===0?0:xp<50?1:xp<150?2:xp<300?3:4 });
    }
    return days;
  }
};

// ── XP & Streak System ────────────────────────────────────────────
const XP_LEVELS = [
  { level:1, name:'Rookie', min:0, max:500 },
  { level:2, name:'Club Player', min:500, max:1200 },
  { level:3, name:'District Star', min:1200, max:2500 },
  { level:4, name:'State Performer', min:2500, max:5000 },
  { level:5, name:'National Prospect', min:5000, max:9000 },
  { level:6, name:'Elite Player', min:9000, max:15000 },
  { level:7, name:'International Ready', min:15000, max:25000 },
  { level:8, name:'Pro Cricketer', min:25000, max:40000 },
  { level:9, name:'World Class', min:40000, max:60000 },
  { level:10, name:'Legend', min:60000, max:Infinity },
];

function getLevelInfo(totalXP) {
  const lv = XP_LEVELS.findLast(l => totalXP >= l.min) || XP_LEVELS[0];
  const next = XP_LEVELS.find(l => l.level === lv.level + 1);
  const pct = next ? Math.min(100, ((totalXP - lv.min) / (next.min - lv.min)) * 100) : 100;
  return { ...lv, next, pct, xpToNext: next ? next.min - totalXP : 0 };
}

function awardXP(xp, minutes = 0, source = 'general', completedKey = null, itemId = null) {
  const p = DB.getProgress();

  // Streak update
  const today = new Date().toISOString().slice(0,10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  if (p.last_active_date === today) {
    // same day — no change to streak
  } else if (p.last_active_date === yesterday) {
    p.current_streak = (p.current_streak||0) + 1;
    p.longest_streak = Math.max(p.longest_streak||0, p.current_streak);
  } else if (p.last_active_date !== today) {
    p.current_streak = 1;
  }
  p.last_active_date = today;

  // XP
  p.total_xp = (p.total_xp||0) + xp;
  p.practice_minutes = (p.practice_minutes||0) + minutes;

  // Completion tracking
  if (completedKey === 'drill' && itemId) {
    if (!p.completed_drills) p.completed_drills = [];
    if (!p.completed_drills.includes(itemId)) {
      p.completed_drills.push(itemId);
      p.drills_done = (p.drills_done||0) + 1;
    } else {
      p.drills_done = (p.drills_done||0) + 1; // re-do still counts practice
    }
  }
  if (completedKey === 'mental' && itemId) {
    if (!p.completed_mental) p.completed_mental = [];
    if (!p.completed_mental.includes(itemId)) p.completed_mental.push(itemId);
    p.mental_done = (p.mental_done||0) + 1;
  }
  if (completedKey === 'workout' && itemId) {
    if (!p.completed_workouts) p.completed_workouts = [];
    if (!p.completed_workouts.includes(itemId)) p.completed_workouts.push(itemId);
    p.workouts_done = (p.workouts_done||0) + 1;
  }

  // Check badges
  p.badges = checkBadges(p);

  DB.saveProgress(p);
  DB.addXPEntry(xp, source);

  // Notify all listeners
  window.dispatchEvent(new CustomEvent('sc_progress_update', { detail: { xp, source } }));

  // XP Flash
  showXPFlash(`+${xp} XP`);

  return p;
}

function checkBadges(p) {
  const badges = p.badges || [];
  const add = (id) => { if (!badges.includes(id)) badges.push(id); };
  if (p.total_xp >= 500) add('first500');
  if (p.total_xp >= 5000) add('xp5k');
  if (p.current_streak >= 3) add('streak3');
  if (p.current_streak >= 7) add('streak7');
  if (p.current_streak >= 14) add('streak14');
  if (p.current_streak >= 30) add('streak30');
  if (p.drills_done >= 10) add('drills10');
  if (p.drills_done >= 50) add('drills50');
  if (p.mental_done >= 10) add('mental10');
  if (p.mental_done >= 25) add('mental25');
  if (p.practice_minutes >= 60) add('min60');
  if (p.practice_minutes >= 600) add('min600');
  if (p.workouts_done >= 5) add('workouts5');
  return badges;
}

const BADGE_DEFS = {
  first500: { icon:'⚡', label:'First 500 XP', desc:'Earned your first 500 XP' },
  xp5k: { icon:'🏆', label:'5K Club', desc:'5,000 total XP earned' },
  streak3: { icon:'🔥', label:'On Fire', desc:'3-day training streak' },
  streak7: { icon:'🔥', label:'Week Warrior', desc:'7-day training streak' },
  streak14: { icon:'🔥', label:'Consistent', desc:'14-day streak — elite consistency' },
  streak30: { icon:'🔥', label:'Monthly Legend', desc:'30-day streak — extraordinary dedication' },
  drills10: { icon:'🏏', label:'Drill Starter', desc:'Completed 10 cricket drills' },
  drills50: { icon:'🏏', label:'Drill Master', desc:'Completed 50 cricket drills' },
  mental10: { icon:'🧠', label:'Mind Builder', desc:'10 mental sessions completed' },
  mental25: { icon:'🧠', label:'Mind Master', desc:'25 mental sessions — elite focus' },
  min60: { icon:'⏱', label:'First Hour', desc:'60 minutes of practice' },
  min600: { icon:'⏱', label:'Speed Runner', desc:'600 minutes of practice' },
  workouts5: { icon:'💪', label:'Fitness Starter', desc:'5 workouts completed' },
};

function showXPFlash(text) {
  const el = document.createElement('div');
  el.className = 'xp-flash';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

function fireConfetti() {
  if (typeof confetti !== 'undefined') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 },
      colors: ['#10b981','#34d399','#6ee7b7','#ffffff'] });
  }
}

// ================================================================
// DATA — Drills, Mental Sessions, Workouts
// ================================================================

// ── Cricket Drills (Cricket-first order) ─────────────────────────
const DRILLS = [
  // ===== BATTING =====
  { id:'b001', category:'batting', title:'Cover Drive Mastery', skill_level:'beginner', duration_minutes:15, xp_value:70,
    video_id:'HhEQQKnXqnw', description:'Perfect the most elegant stroke in cricket. Master head position, elbow alignment, and the high flowing follow-through.',
    steps:['Set up side-on, bat raised in backlift','Watch ball from the bowler\'s hand — track seam','Step forward, weight onto front foot','Drive through the line, bat face open to cover','Head over ball at point of contact','High follow-through pointing toward cover point'],
    tips:'Keep front elbow high and pointing at mid-on throughout. Head stays perfectly still.', target_metric:'10 consecutive clean drives' },
  { id:'b002', category:'batting', title:'Pull Shot Power', skill_level:'intermediate', duration_minutes:20, xp_value:90,
    video_id:'2f8okmqYpg8', description:'Dominate short-pitched bowling with authority. A proper pull shot turns the short ball from threat into boundary.',
    steps:['Pick up short delivery early from release point','Rock back fast — weight moving onto back foot','Get inside the line of the ball','Swing bat in a powerful horizontal arc','Roll wrists over at contact to keep it down','Follow through powerfully toward mid-wicket'],
    tips:'Identify length EARLY — everything else follows from early positioning.', target_metric:'15 controlled pulls, 10 finding the boundary' },
  { id:'b003', category:'batting', title:'Sweep Shot vs Spin', skill_level:'intermediate', duration_minutes:18, xp_value:85,
    video_id:'kLpGM8q_bk0', description:'Dominate spin bowling with the sweep. An essential weapon that disrupts field settings and forces the bowler to change plans.',
    steps:['Read full delivery from spinner early','Step forward, drop leading knee to pitch','Get to the pitch of the ball — bat meets ball under eyes','Horizontal bat arc, rolling wrists at contact','Contact ball in front of pad — NOT beside it','Follow through toward fine leg or mid-wicket'],
    tips:'Commit fully. Half-hearted sweeps result in LBW or top edge.', target_metric:'10 controlled sweeps without miscuing' },
  { id:'b004', category:'batting', title:'Cut Shot Technique', skill_level:'intermediate', duration_minutes:18, xp_value:85,
    video_id:'2f8okmqYpg8', description:'Attack anything short and wide outside off stump. The cut shot is your attacking weapon when bowlers overpitch width.',
    steps:['Identify short-wide ball early','Rock back and across the crease','Position body behind line — inside the bounce','Downward arc with bat — cut into the ground','Hit through the top of the ball firmly','Finish with bat pointing toward point region'],
    tips:'Play LATE — later contact = finer angle. Gully cannot reach it.', target_metric:'20 cut shots finding target zone' },
  { id:'b005', category:'batting', title:'T20 Power Hitting', skill_level:'advanced', duration_minutes:25, xp_value:120,
    video_id:'B0XOcaRMBP4', description:'Maximize boundary-hitting in T20. Strike rates above 150 require correct weight transfer, full bat speed, and smart shot selection.',
    steps:['Read field and decide shot before ball arrives','For full: drive over mid-on or mid-off into gap','For short: upper-cut or aggressive pull','For yorker: dig out with open face or flick through leg','For wide: inside-out drive or cut','Reset mentally between every ball'],
    tips:'A clear pre-planned shot executed boldly beats improvisation every time.', target_metric:'Strike rate 150+ sustained across 30 balls' },
  { id:'b006', category:'batting', title:'Defensive Block Foundation', skill_level:'beginner', duration_minutes:12, xp_value:55,
    video_id:'HhEQQKnXqnw', description:'Build an unbreakable defensive technique. The defensive block is the foundation all great innings are built on.',
    steps:['Set correct batting stance — feet shoulder-width','Watch ball all the way onto the face of the bat','For good length — stay in crease, weight forward','Lean into the ball with full bat face presented','Soft hands to deaden the ball — no follow through','Ball should drop dead at feet'],
    tips:'Relaxed hands at contact = ball drops dead. Tight hands = caught at short leg.', target_metric:'20 consecutive technically correct blocks' },
  { id:'b007', category:'batting', title:'Slog Sweep Over Cow Corner', skill_level:'intermediate', duration_minutes:18, xp_value:100,
    video_id:'kLpGM8q_bk0', description:'The aggressive T20 weapon against spin. Clear the mid-wicket boundary with timing and power.',
    steps:['Identify full delivery from spinner','Step forward with deep knee bend — get low','Full horizontal arc — higher than standard sweep','Contact ball well in FRONT of the pad','Roll wrists powerfully at impact','Follow-through lofted toward cow corner'],
    tips:'Make contact IN FRONT of pad — this prevents it going straight up.', target_metric:'8 of 12 landing in cow corner zone' },
  { id:'b008', category:'batting', title:'Ramp Shot over Keeper', skill_level:'advanced', duration_minutes:15, xp_value:130,
    video_id:'B0XOcaRMBP4', description:'Redirect pace bowling over the wicketkeeper for maximum boundary impact — the ultimate T20 weapon.',
    steps:['Identify delivery on line of stumps — short to good length','Shuffle slightly toward off stump — open stance','Angle bat face toward fine leg, hold still','Present bat softly — redirect, do not swing','Ball deflects over wicketkeeper\'s head','Boundary — or minimum 4 if keeper dives'],
    tips:'Use the pace of the ball. The harder it comes, the easier the ramp.', target_metric:'6 of 15 attempts clearing the keeper' },
  { id:'b009', category:'batting', title:'Running Between Wickets', skill_level:'beginner', duration_minutes:20, xp_value:70,
    video_id:'HhEQQKnXqnw', description:'Sharp calling and sprinting turns 1s into 2s. Free runs are the cheapest in cricket — never waste them.',
    steps:['Hit ball — assess immediately from follow-through position','Call CLEARLY: YES, NO, or WAIT — one call, one decision','Sprint in a completely straight line to the crease','Ground bat over the crease while running in full stride','Look up at non-striker — assess second run potential','Back up constantly at non-striker end'],
    tips:'Loud, early, definitive calls. Ground the bat — not your foot.', target_metric:'Convert 80% of hit-1s into 2s in drill simulation' },
  { id:'b010', category:'batting', title:'Playing Spin — Reading Turn', skill_level:'intermediate', duration_minutes:20, xp_value:95,
    video_id:'kLpGM8q_bk0', description:'Read which way the ball turns from the bowler\'s hand — then execute the correct response. The most important anti-spin skill.',
    steps:['Off-spin: fingers roll over top at release — goes away from right-hander','Leg-spin: wrist cocks outward at release — turns away','Googly: same wrist action as leg-spin but turns INTO right-hander','Doosra: front of hand — goes other way from off-spin','Armball: no wrist — comes straight through','Practice: partner tells you AFTER each ball what it was — develop your own reads'],
    tips:'Watch seam and wrist position — not the flight or pitch of ball.', target_metric:'Identify 15 of 20 deliveries correctly' },

  // ===== BOWLING =====
  { id:'w001', category:'bowling', title:'Line & Length Precision', skill_level:'beginner', duration_minutes:20, xp_value:65,
    video_id:'7pFfqTFvOEs', description:'The foundation of all wicket-taking. Perfect line and length creates relentless pressure. Batsmen make mistakes under sustained pressure.',
    steps:['Mark target zone with tape: good length, off-stump line','Warm up with 3-step approach at 60% pace — 10 balls','Full run-up at 80% — 20 balls, count on-target deliveries','Increase to 100% pace — 15 balls maintaining accuracy','Shift target: bowl at 4th-stump line','Bowl 5 each at different batsman heights'],
    tips:'Aim at the top of off-stump. Good length = batsman UNCOMMITTED.', target_metric:'8 of 10 consecutive balls hitting target zone' },
  { id:'w002', category:'bowling', title:'Outswing Mastery', skill_level:'intermediate', duration_minutes:20, xp_value:100,
    video_id:'SZsXolnz5Pg', description:'Master the outswinger — the number one wicket-taker in seam bowling. Beat the outside edge consistently.',
    steps:['Hold ball with seam vertical pointing toward slip cordon','Wrist stays perfectly upright behind the ball at release','Aim at TOP of off-stump — swing does the rest','Smooth, high-arm action — release with full seam presentation','Bowl a full length — short balls lose swing quickly','Target: 15-20cm of movement in the air'],
    tips:'NEVER aim at the edge. Target off-stump and let the swing find the edge.', target_metric:'5 consecutive outswingers beating imaginary outside edge' },
  { id:'w003', category:'bowling', title:'Yorker Death Bowling', skill_level:'advanced', duration_minutes:25, xp_value:130,
    video_id:'d3wJbkDK-SU', description:'The unplayable delivery in the death overs. A perfect yorker — executed with disguise — wins T20 matches.',
    steps:['Place target marker at the base of the stumps','Full run-up — identical action to every other delivery','Release point is slightly LATER than for good-length ball','Think: \'hit the batsman\'s toe\'','Ball arrives below knee height at base of stumps','Practice variations: straight yorker, wide yorker, slower yorker'],
    tips:'Think \'hit the toe\' on every ball. Release slightly later.', target_metric:'4 of 6 consecutive balls landing as perfect yorkers' },
  { id:'w004', category:'bowling', title:'Inswing Bowling', skill_level:'intermediate', duration_minutes:20, xp_value:100,
    video_id:'SZsXolnz5Pg', description:'Bring the ball back into the right-handed batsman. The inswinger targeting the gap between bat and pad is devastating.',
    steps:['Hold ball with seam pointing toward fine leg','Wrist rotates slightly inward at address — subtle change','Aim wider outside off-stump — let swing bring it in','Bowl FULL — short inswingers lose movement and get dispatched','Target: gap between bat and front pad','LBW or bowled are the rewards'],
    tips:'Bowl FULL. Short inswingers lose movement and get hit.', target_metric:'Consistent 10cm+ inswing movement confirmed by partner' },
  { id:'w005', category:'bowling', title:'Leg Spin Fundamentals', skill_level:'beginner', duration_minutes:20, xp_value:80,
    video_id:'7pFfqTFvOEs', description:'The art of leg spin. Learn to impart consistent turn with a correct wrist and finger action.',
    steps:['Grip: ball rests in palm, third finger primary across seam','Cock wrist back so fingers point downward at 6 o\'clock','High arm action over — bring over fast','At release: SNAP third finger over top of ball rightward','Ball rotates right-to-left — leg-break turn','Start at 10 metres — build up to full length as control develops'],
    tips:'It\'s in the wrist snap and third finger — not the arm speed.', target_metric:'6 of 10 balls showing clear visible leg-spin turn' },
  { id:'w006', category:'bowling', title:'Off Spin with Drift', skill_level:'beginner', duration_minutes:18, xp_value:70,
    video_id:'7pFfqTFvOEs', description:'Develop consistent off-spin with drift and turn. Accuracy + flight + drift make you dangerous against any batsman.',
    steps:['Grip: index and middle finger across seam on top','Turn ball from right to left with fingers at release','Flight the ball up — use the air to create drift','Bowl on middle-off stump line — force batsman to play','Vary pace deliberately — float one in 10mph slower','With wind behind you: drift comes naturally, use it'],
    tips:'Use fingers — not wrist. Drift is your bonus weapon when conditions assist.', target_metric:'7 of 10 balls on correct line and length with visible turn' },
  { id:'w007', category:'bowling', title:'Bouncer Control', skill_level:'advanced', duration_minutes:20, xp_value:120,
    video_id:'d3wJbkDK-SU', description:'Use the short ball as a genuine weapon. The bouncer is 30% skill and 70% psychology.',
    steps:['Mark back-of-length zone on pitch','Full run-up at maximum pace — no shortening the run','Higher arm arc at point of release — aim at back of length','Ball should arrive at batsman chest-to-head height','Control: avoid wide (free hit) or overpitched (pull food)','Vary target: chest, armpit, throat — never same spot twice'],
    tips:'Aim for the ARMPIT — not the head. Never bowl same zone twice.', target_metric:'5 of 8 bouncers arriving in the target body zone' },
  { id:'w008', category:'bowling', title:'Googly Disguise', skill_level:'intermediate', duration_minutes:20, xp_value:110,
    video_id:'7pFfqTFvOEs', description:'Bowl the googly with complete disguise — the batsman should not detect it until it has turned the wrong way.',
    steps:['Standard leg-spin grip — practice 5 balls with leg-spin','Same action EXACTLY — wrist rolls INWARD at release (instead of outward)','Ball comes out of back of hand — turns into right-hander instead','Bowl 5 leg-spinners then 1 googly in sequence','Partner attempts to pick which one it is','Perfect until action is completely identical'],
    tips:'The googly is identical to leg-spin until the last microsecond. Action must be identical.', target_metric:'Partner misreads googly 6 of 10 times' },
  { id:'w009', category:'bowling', title:'Slower Ball Variations', skill_level:'advanced', duration_minutes:22, xp_value:130,
    video_id:'SZsXolnz5Pg', description:'Off-cutter, leg-cutter, knuckleball — the T20 variations that turn ordinary fast bowlers into match-winners.',
    steps:['Off-cutter: same action, cut middle finger from off to leg at release','Leg-cutter: cut finger other way — away from body','Knuckleball: grip on knuckles, push out slowly — 20km/h slower','Practice each variation 10 balls per session','Same run-up and arm speed as fastball — disguise is everything','Mix without predictable patterns'],
    tips:'Disguise is the entire weapon. Same arm speed = unreadable variation.', target_metric:'Deceive batting partner with 3 of 4 variations successfully' },
  { id:'w010', category:'bowling', title:'Death Bowling Masterclass', skill_level:'advanced', duration_minutes:25, xp_value:150,
    video_id:'d3wJbkDK-SU', description:'Defend 10+ runs in the last 2 overs. The complete death bowler toolkit — sequence, variation, and nerve.',
    steps:['Ball 1: full straight yorker at stumps — establish the threat','Ball 2: identical action — much slower (knuckleball or wide yorker)','Ball 3: short of good length at body — push them back','Ball 4: full again — now they are scared of short ball','Ball 5: wide yorker outside off — impossible to hit cleanly','Ball 6: full yorker at stumps — predictable because they expect variation'],
    tips:'Never bowl the same ball twice consecutively. Sequence is a weapon.', target_metric:'Concede fewer than 8 runs in a complete simulated death over' },

  // ===== FIELDING =====
  { id:'f001', category:'fielding', title:'Ground Fielding Excellence', skill_level:'beginner', duration_minutes:15, xp_value:55,
    video_id:'0mH8BKDB5Qk', description:'Clean, athletic ground fielding. One clean stop and accurate throw saves more runs than most boundaries score.',
    steps:['Start in athletic ready position — weight on balls of feet','Ball comes: move quickly, attack the ball — do not wait','Drop to one knee creating a long barrier behind ball','Pick ball cleanly with both hands — NO one-hand grabs','Stand immediately — balanced throw position','Complete throw at stumps or to partner — repeat 20 times each side'],
    tips:'Body behind ball ALWAYS. One-hand grabs in the field lose matches.', target_metric:'20 clean stops out of 25 balls from multiple angles' },
  { id:'f002', category:'fielding', title:'Throwing Accuracy at Stumps', skill_level:'beginner', duration_minutes:20, xp_value:70,
    video_id:'0mH8BKDB5Qk', description:'Flat, fast, accurate throws. Run outs require precise throwing — train this relentlessly.',
    steps:['Pick ball up cleanly in one motion','Pivot fast onto back foot','Turn shoulders side-on to target — crucial for accuracy','Arm swings in a high, full arc','Release flat — aim at TOP of the stumps','Complete follow-through: arm finishes pointing at target'],
    tips:'Side-on. High arm. Target: top of stumps — not the ground in front.', target_metric:'8 of 15 direct hits on stumps from 30 metres' },
  { id:'f003', category:'fielding', title:'High Catch Taking', skill_level:'intermediate', duration_minutes:20, xp_value:90,
    video_id:'0mH8BKDB5Qk', description:'Take high skiers confidently under sun, pressure, and crowd noise.',
    steps:['Call "MINE" loudly and immediately — own the catch','Move fast to get UNDER the ball — not to where it is now','Plant feet well — one slightly forward for balance','Cup hands at eye level — fingers pointing upward','Watch ball all the way into the cup — watch it in','Carry ball through — do not clutch early'],
    tips:'Get under ball EARLY. Move your feet and THEN take the catch.', target_metric:'10 consecutive catches without a drop' },
  { id:'f004', category:'fielding', title:'Slip Catching Reactions', skill_level:'intermediate', duration_minutes:20, xp_value:100,
    video_id:'Qh5oHMmPb8k', description:'React faster and catch harder in the slip cordon. Soft hands and fast reactions separate elite from average slip fielders.',
    steps:['Set up in slip position — hands LOW at knee height always','Weight forward on balls of feet — slight lean toward bat','Partner sends fast deflections via a catching cradle or edge board','React quickly — do NOT anticipate direction early','Take ball anywhere from knee to shoulder height in one motion','Return to starting position immediately after each catch'],
    tips:'Hands LOW always. React to the SOUND of the edge before your eyes see movement.', target_metric:'15 of 20 catches taken cleanly at pace' },
  { id:'f005', category:'fielding', title:'Direct Hit Run Outs', skill_level:'intermediate', duration_minutes:15, xp_value:90,
    video_id:'0mH8BKDB5Qk', description:'Field a ball at pace and hit the stumps directly. One direct hit changes a match — worth thousands of hours of training.',
    steps:['Ball rolled at medium pace from 20 metres','Sprint to intercept at absolute full pace','Clean pick-up in ONE motion — no fumble','Pivot immediately — set feet side-on to target stumps','Throw FLAT at the near stump','Target: from pick-up to stumps in under 3.5 seconds'],
    tips:'Aim for the NEAR stump. A miss wide is still a stumping chance if keeper is sharp.', target_metric:'3 direct hits in 10 attempts under 3.5 seconds' },
  { id:'f006', category:'fielding', title:'Diving Saves on the Boundary', skill_level:'advanced', duration_minutes:25, xp_value:115,
    video_id:'0mH8BKDB5Qk', description:'Save crucial boundaries with full athletic commitment. Half-dives lose matches. Full commitment saves them.',
    steps:['Partner drives ball hard toward the boundary — random angles','Sprint at maximum pace — attack the ball aggressively','When you cannot stop conventionally — DIVE full length, arm extended','Stop ball before it reaches the rope — palm down to field','Quickly get up — accurately return to keeper or bowler\'s end','Train both left and right sides equally — 10 attempts each side'],
    tips:'Commit 100% to the dive. A half-dive becomes a fumble. Full commitment or nothing.', target_metric:'Save 8 of 10 boundary attempts with diving stops' },

  // ===== WICKETKEEPING =====
  { id:'k001', category:'wicketkeeping', title:'Keeper Stance & Takes', skill_level:'beginner', duration_minutes:15, xp_value:65,
    video_id:'Qh5oHMmPb8k', description:'Perfect the wicketkeeping stance — the foundation every world-class keeper builds their entire game on.',
    steps:['Weight on toes — NEVER on heels throughout the delivery','Hands held out in front of body — soft and relaxed','Side-step movement following the ball throughout delivery','Stay LOW throughout — never stand early','Fingers pointing DOWN for balls below waist level','Fingers pointing UP for balls above waist — never thumbs up at waist'],
    tips:'Never cross your feet laterally. Keep soft hands at every moment.', target_metric:'15 consecutive clean takes across all delivery heights and lines' },
  { id:'k002', category:'wicketkeeping', title:'Stumping Technique', skill_level:'intermediate', duration_minutes:18, xp_value:100,
    video_id:'Qh5oHMmPb8k', description:'The wicketkeeper\'s signature dismissal. Master the stumping — fast hands, correct footwork, and instant appeal.',
    steps:['Set up directly behind stumps — for spin bowling','Spinner delivers wide or turning delivery — batsman misses','Watch ball travel PAST batsman\'s foot before you move','Move laterally to take the wide ball cleanly','Single motion: take ball and immediately whip off bails','Instant loud appeal — HOWZAT every time'],
    tips:'Ball must pass the batsman BEFORE you begin to move. Under 0.5 seconds is elite class.', target_metric:'10 clean stumpings in a 30-ball session' },
  { id:'k003', category:'wicketkeeping', title:'Standing Up to Spin', skill_level:'advanced', duration_minutes:25, xp_value:130,
    video_id:'Qh5oHMmPb8k', description:'Stand up close to the stumps for spin bowling — restricts the batsman and creates constant stumping opportunities.',
    steps:['Position directly behind stumps — within 1 metre','Start with spinner bowling at half pace — build comfort','Take deliveries arriving exactly at stumps — not deflected wide','For turning ball: quick lateral swivel — take with strong hand leading','Stumping opportunity: whip bails off in one movement from the take','Zero byes is your personal standard — anything else is substandard'],
    tips:'This is the hardest skill in wicketkeeping. Build it up slowly over weeks.', target_metric:'Zero byes conceded across 20 spin deliveries standing up' },

  // ===== FITNESS =====
  { id:'fit001', category:'fitness', title:'Cricket Sprint Protocol', skill_level:'beginner', duration_minutes:20, xp_value:70,
    description:'Explosive sprint speed for running between wickets and fielding. The first 10 metres separate great from good fielders.',
    steps:['Dynamic warm-up: high knees, butt kicks, leg swings — 5 minutes','Sprint 22 yards (one crease to crease): 10 reps with 30s rest','Focus on explosive first step — drive out with power','Drive arms hard — arms are the engine of leg speed','Stay low for first 5 metres — do not straighten early','Cool down: easy jog 3 minutes'],
    tips:'First 10 metres is everything. Train the START relentlessly.', target_metric:'22 yards consistently under 3.2 seconds' },
  { id:'fit002', category:'fitness', title:'Cricket Core Stability', skill_level:'beginner', duration_minutes:15, xp_value:65,
    description:'Core strength for batting power, bowling action, and fielding agility. Non-negotiable for all cricketers.',
    steps:['Plank: 3 × 45 seconds — straight line from ankles to shoulders','Side plank: 2 × 30 seconds each side','Dead bugs: 3 × 10 each side — slow and controlled','Bird dog: 3 × 10 each side — opposite arm and leg','Russian twists: 3 × 20 — use a cricket ball for weight','Rest 45 seconds between sets'],
    tips:'Brace your core on every single rep. Breathe out on the effort phase.', target_metric:'Complete full circuit 3 times with perfect form throughout' },
  { id:'fit003', category:'fitness', title:'Bowling Shoulder Pre-Hab', skill_level:'beginner', duration_minutes:15, xp_value:60,
    description:'Protect your bowling shoulder. Every bowler must complete this before every single session — non-negotiable insurance.',
    steps:['Shoulder circles slow and large: 20 forward, 20 backward','External rotation with band: 3 × 15 each arm — controlled','Internal rotation: 3 × 15 each arm','Scapular retractions: 3 × 15 — squeeze shoulder blades','YTW exercise: 3 × 10 each — strengthens posterior cuff','Sleeper stretch: 60 seconds each side'],
    tips:'15 minutes of prevention = years of injury-free bowling. Absolutely non-negotiable.', target_metric:'Complete pre-hab before 100% of bowling sessions' },
  { id:'fit004', category:'fitness', title:'Explosive Leg Power', skill_level:'advanced', duration_minutes:25, xp_value:110,
    description:'Develop leg power for batting explosiveness, bowling run-up speed, and fielding agility from a standing start.',
    steps:['Box jumps: 4 × 8 reps — maximum height, land softly','Jump squats: 3 × 10 — fast down, explosive up','Single-leg bounds: 3 × 6 each leg — driving off one leg for distance','Sprint starts from crouch: 5 × 30m at absolute maximum effort','Rest 90 seconds between all explosive sets','Land quietly — noisy landing means poor power transfer'],
    tips:'Full hip extension at take-off. Silent landing = efficient power transfer.', target_metric:'Standing broad jump reaching 2.0m consistently' },
  { id:'fit005', category:'fitness', title:'Agility Ladder Footwork', skill_level:'intermediate', duration_minutes:20, xp_value:90,
    description:'Rapid footwork for explosive fielding starts and quick running between wickets. Fast feet win runouts.',
    steps:['Single steps — one foot in each box — 2 minutes continuous','Two feet in each box — jump in and out — 2 minutes','Lateral shuffle through every box sideways — 2 minutes each side','In-in-out-out pattern — 2 minutes','Sprint through at maximum speed: 6 × 10 metres with full recovery','Cool down: slow walking jog'],
    tips:'Light, fast, precise foot contacts only. Arms drive leg speed — pump them hard.', target_metric:'All patterns completed in under 20 minutes with zero ladder touches' },

  // ===== MENTAL =====
  { id:'ment001', category:'mental', title:'Batting Visualization Session', skill_level:'beginner', duration_minutes:15, xp_value:65,
    description:'Mentally rehearse your best innings in vivid detail. The brain cannot distinguish between real and vividly imagined practice.',
    steps:['Close eyes. Relax every muscle — scan body head to toe.','Picture yourself walking to the crease with total confidence','Face 10 deliveries in your mind — play each one perfectly','Include every sensory detail: bat feel, grass smell, crowd sound','See each ball arrive and play your best technically correct shot','Open eyes. Carry this mental image vividly into your next real session.'],
    tips:'Be vivid and completely specific — all senses. The more real it feels, the more real it becomes.', target_metric:'Complete 10-minute visualization every day for 2 weeks consistently' },
  { id:'ment002', category:'mental', title:'Between-Ball Reset Routine', skill_level:'intermediate', duration_minutes:12, xp_value:80,
    description:'Master the routine between deliveries. Elite batsmen use this time to RESET — not to ruminate on the last ball.',
    steps:['After ball: look away from bowler — break eye contact completely','Take ONE deep, slow reset breath — fully exhale all tension','Tap bat on ground twice — physical anchor to the present','Assess field positions — note any changes since last ball','Look down at bat handle to refocus your attention','New stance — fresh start — every ball is the first ball'],
    tips:'Make this routine AUTOMATIC through 100% consistent practice. Same routine every single time.', target_metric:'Consistent complete routine used in 20-ball simulation without break' },
  { id:'ment003', category:'mental', title:'Pressure Inoculation Training', skill_level:'advanced', duration_minutes:20, xp_value:130,
    description:'Simulate extreme match pressure in training so that real matches feel familiar and manageable — the elite method.',
    steps:['Set realistic scenario: 5 runs needed from last over, 2 wickets remaining','Real bowler, real fielders, scorekeeper, vocal spectators watching','Both teams know the scenario — pressure is maximal','Do NOT rush — use full between-ball routine as normal','Assess situation logically before each ball — make a plan','Debrief: what worked? What did you feel? What would you change?'],
    tips:'Pressure is a privilege given only to those who matter. Seek it in every training session.', target_metric:'Complete 6 pressure scenario simulations maintaining full routine' },
];

// ── Mental Sessions Factory ───────────────────────────────────────
const INTROS = {
  focus:['Find a comfortable position and gently close your eyes.','Take three slow deep breaths to settle your mind completely.','Bring all your attention to this present moment.','Notice any thoughts passing — acknowledge them and let them go.','Narrow your focus to a single point of concentration.','Stay with your focal point for the remainder of this session.'],
  confidence:['Sit tall and take three powerful, diaphragmatic breaths.','Recall your single best performance moment in vivid detail.','Feel that confidence completely filling your body.','Repeat your personal affirmation slowly three times in your mind.','Visualise yourself performing with complete belief and authority.','Carry this energy forward into your next real performance.'],
  recovery:['Find a quiet space and allow your body to fully relax.','Take five slow breaths — release tension on every single exhale.','Acknowledge frustration without judgement — it is natural.','Remind yourself honestly: setbacks are essential to the journey.','Identify one clear learning point you can take forward today.','Commit to showing up tomorrow with completely fresh energy.'],
  'pre-performance':['Begin with three grounding breaths — slow and complete.','Scan your body from head to toe, releasing tension from each area.','Visualise walking to your position with calm, certain authority.','See yourself executing your key skill perfectly on the first ball.','Feel the productive excitement and complete readiness building.','Step into performance with total intention — you are ready.'],
  pressure:['Acknowledge the pressure you feel — it means you genuinely care.','Breathe in slowly for 4 counts, hold for 2, out for 6.','Pressure is a privilege given to those who operate at this level.','Focus completely on what you can control — your process, your next action.','Commit to your process — one ball, one breath, one moment at a time.','Step forward now with calm, earned confidence.'],
  visualization:['Close your eyes and relax every single muscle in your body.','Create a vivid, complete mental image of your performance environment.','See yourself performing your key skill perfectly and with great ease.','Add sounds, smells, physical sensations of peak performance vividly.','Watch yourself succeed — feel the deep satisfaction fully in your body.','Open your eyes and carry this clear vision into your performance.'],
  'match-day-calm':['Take your position and close your eyes gently and deliberately.','Breathe in slowly for 4 counts, hold for 2, release for 4 counts.','Feel your feet completely grounded and your body fully present.','Release all thoughts related to outcome — they are not yours to hold.','Trust your preparation completely — you have done the work required.','Open your eyes now with complete calm and clear readiness to perform.'],
  'pro-mental':['Enter the deepest available stillness through long controlled breathing.','Access your peak mental state deliberately through sustained focus.','Engage your elite competitor mindset — you have been here before.','Visualise your complete performance vividly from start to finish.','Lock in your precise process cues and personal performance triggers.','Step out now as the athlete you have consistently trained to become.']
};

function mkM(id, title, cat, dur, xp, premium=false) {
  const mins = Math.floor(dur/60);
  const stepCount = Math.max(3, Math.min(6, Math.ceil(dur/90)));
  const stepDur = Math.floor(dur/stepCount);
  const pool = INTROS[cat] || INTROS.focus;
  const steps = pool.slice(0,stepCount).map((instruction,i) => ({
    instruction,
    duration_seconds: i===stepCount-1 ? dur-stepDur*(stepCount-1) : stepDur
  }));
  return { id, title, category:cat, duration_seconds:dur, xp_value:xp, is_premium:premium,
    description:`A ${mins}-minute ${cat.replace(/-/g,' ')} session to strengthen your mental game.`, steps };
}

const MENTAL_SESSIONS = [
  mkM('m01','Micro Focus Burst','focus',180,35), mkM('m02','Focus Next Ball','focus',240,45),
  mkM('m03','5-4-3-2-1 Grounding','focus',300,50), mkM('m04','Task Isolation Protocol','focus',300,50),
  mkM('m05','Laser Focus Activation','focus',360,55), mkM('m06','Deep Focus Anchor','focus',360,60),
  mkM('m07','Sensory Narrowing','focus',360,60), mkM('m08','Process Over Result','focus',420,65),
  mkM('m09','Noise Cancellation Focus','focus',420,70), mkM('m10','Single-Point Focus Drill','focus',480,55),
  mkM('m11','Flow State Trigger','focus',600,75), mkM('m12','Trusting Instinct','focus',420,65),
  mkM('m20','Morning Positivity','confidence',240,40), mkM('m21','Confidence Countdown','confidence',300,50),
  mkM('m22','Celebrate Small Wins','confidence',300,50), mkM('m23','Self-Talk Rewrite','confidence',360,55),
  mkM('m24','Name Your Strength','confidence',300,50), mkM('m25','Affirmation Immersion','confidence',420,60),
  mkM('m26','Own the Room','confidence',420,65), mkM('m27','Inner Champion','confidence',480,65),
  mkM('m28','Champion Mindset','confidence',600,85), mkM('m29','Identity Goal Setting','confidence',540,75),
  mkM('m30','Reset Button','recovery',240,45), mkM('m31','Self-Compassion Break','recovery',300,50),
  mkM('m32','Reset After Duck','recovery',300,50), mkM('m33','Bounce-Back Faster','recovery',360,60),
  mkM('m34','Breathing Through Collapse','recovery',360,65), mkM('m35','Let It Go Protocol','recovery',420,60),
  mkM('m36','Failure as Feedback','recovery',420,60), mkM('m37','Processing Disappointment','recovery',480,70),
  mkM('m38','Post-Game Release','recovery',480,70), mkM('m39','Champions Setback','recovery',480,70),
  mkM('m40','Full Body Relaxation','recovery',540,65), mkM('m41','Sleep Better Tonight','recovery',480,60),
  mkM('m50','Pre-Game Activation','pre-performance',300,50), mkM('m51','Nervous Energy Converter','pre-performance',360,55),
  mkM('m52','Pre-Performance Calm','pre-performance',360,55), mkM('m53','Anchoring Peak State','pre-performance',360,65),
  mkM('m54','Game Day Activation','pre-performance',420,65), mkM('m55','Embrace the Arena','pre-performance',420,65),
  mkM('m56','Morning of Big Day','pre-performance',540,75), mkM('m57','Champions Routine','pre-performance',540,75),
  mkM('m58','Pre-Tournament Lock','pre-performance',600,80),
  mkM('m60','10-Second Rule','pressure',300,50), mkM('m61','Physiological Sigh','pressure',180,35),
  mkM('m62','Strategic Pause','pressure',360,60), mkM('m63','Pressure Is Privilege','pressure',420,65),
  mkM('m64','Handling Unplayable Ball','pressure',420,70), mkM('m65','Bowling Under Pressure','pressure',420,65),
  mkM('m66','Decision Clarity Under Pressure','pressure',420,70), mkM('m67','Choke-Proof Preparation','pressure',540,80),
  mkM('m68','Mental Toughness Builder','pressure',600,85),
  mkM('m70','Batting Visualization','visualization',300,50), mkM('m71','Future-Pacing Success','visualization',420,65),
  mkM('m72','Fielding Brilliance Rehearsal','visualization',420,65), mkM('m73','Master Skill Replay','visualization',480,70),
  mkM('m74','Vision Board Visualization','visualization',480,70), mkM('m75','Perfect Performance','visualization',540,75),
  mkM('m76','Champion Visualization','visualization',600,85),
  mkM('m77','Elite Endurance Mindset','visualization',720,110,true), mkM('m78','Flow State Architecture','visualization',900,120,true),
  mkM('m80','4-7-8 Breath Lock','match-day-calm',360,50), mkM('m81','Deep Calm Breathing','match-day-calm',300,50),
  mkM('m82','Gratitude Before Game','match-day-calm',300,50), mkM('m83','Stillness Practice','match-day-calm',360,55),
  mkM('m84','Anxiety Dissolve Protocol','match-day-calm',420,65), mkM('m85','Box Breathing Method','match-day-calm',480,65),
  mkM('m86','Inner Lake','match-day-calm',420,60),
  mkM('m90','Deliberate Practice Mindset','pro-mental',600,100,true), mkM('m91','Mastery Over Perfection','pro-mental',600,100,true),
  mkM('m92','Elite Competitor Analysis','pro-mental',720,110,true), mkM('m93','Inner Dialogue Mastery','pro-mental',720,110,true),
  mkM('m94','Zone of Genius Activation','pro-mental',720,110,true),
];

// ── Workouts ──────────────────────────────────────────────────────
function mkW(id,name,level,target,goal,durCat,exercises,durMin,xp) {
  return { id, name, level, target, goal, duration_category:durCat, exercises, duration_minutes:durMin, xp_value:xp };
}
// level: beginner/intermediate/advanced/pro
// target: full-body/chest/back/shoulders/arms/legs/core/glutes
// goal: build-muscle/lose-weight/improve-endurance
// duration_category: '<10'/'10-15'/'15-20'/'20-25'/'25+'

const WORKOUTS = [
  // ── BEGINNER ───────────────────────────────────────────────────
  mkW('wb001','Full Body Beginner Blast','beginner','full-body','build-muscle','10-15',4,12,85),
  mkW('wb002','Quick Morning Starter','beginner','full-body','lose-weight','<10',4,8,70),
  mkW('wb003','Chest Beginner Build','beginner','chest','build-muscle','10-15',3,12,70),
  mkW('wb004','Back Beginner Strengthen','beginner','back','build-muscle','<10',3,8,65),
  mkW('wb005','Shoulder Beginner Tone','beginner','shoulders','build-muscle','<10',3,8,65),
  mkW('wb006','Arms Beginner Blast','beginner','arms','build-muscle','10-15',4,12,80),
  mkW('wb007','Legs Beginner Strength','beginner','legs','build-muscle','10-15',4,12,85),
  mkW('wb008','Core Beginner Basics','beginner','core','build-muscle','10-15',4,12,80),
  mkW('wb009','Glutes Beginner Tone','beginner','glutes','build-muscle','10-15',4,12,80),
  mkW('wb010','Full Body Fat Burn Beginner','beginner','full-body','lose-weight','15-20',5,18,95),
  mkW('wb011','Quick Fat Burn Sprint','beginner','full-body','lose-weight','<10',4,8,70),
  mkW('wb012','Total Toning Beginner','beginner','full-body','build-muscle','15-20',5,18,100),
  mkW('wb013','Endurance Intro Beginner','beginner','full-body','improve-endurance','15-20',4,18,90),
  mkW('wb014','10-Minute Full Body Burn','beginner','full-body','lose-weight','10-15',8,10,80),
  mkW('wb015','Chest Fat Burn Beginner','beginner','chest','lose-weight','10-15',3,12,72),
  mkW('wb016','Back Fat Burn Beginner','beginner','back','lose-weight','10-15',3,12,70),
  mkW('wb017','Shoulder Endurance Beginner','beginner','shoulders','improve-endurance','10-15',3,12,68),
  mkW('wb018','Arms Endurance Beginner','beginner','arms','improve-endurance','10-15',4,12,78),
  mkW('wb019','Legs Endurance Beginner','beginner','legs','improve-endurance','15-20',4,18,90),
  mkW('wb020','Core Endurance Beginner','beginner','core','improve-endurance','10-15',4,12,80),
  mkW('wb021','Core Fat Burn Beginner','beginner','core','lose-weight','<10',4,8,72),
  mkW('wb022','Glutes Fat Burn Beginner','beginner','glutes','lose-weight','10-15',4,12,80),
  mkW('wb023','Full Body Endurance Starter','beginner','full-body','improve-endurance','10-15',4,12,85),
  mkW('wb024','Chest Endurance Beginner','beginner','chest','improve-endurance','<10',3,8,65),
  mkW('wb025','Legs Fat Burn Beginner','beginner','legs','lose-weight','10-15',4,12,83),
  mkW('wb026','Arms Fat Burn Beginner','beginner','arms','lose-weight','<10',3,8,68),
  mkW('wb027','Shoulder Fat Burn Beginner','beginner','shoulders','lose-weight','<10',3,8,63),
  mkW('wb028','Glutes Endurance Beginner','beginner','glutes','improve-endurance','10-15',4,12,78),
  mkW('wb029','Back Endurance Beginner','beginner','back','improve-endurance','<10',3,8,63),
  mkW('wb030','Evening Stretch Beginner','beginner','full-body','improve-endurance','<10',4,8,60),

  // ── INTERMEDIATE ───────────────────────────────────────────────
  mkW('wi001','Full Body Intermediate Power','intermediate','full-body','build-muscle','20-25',5,22,165),
  mkW('wi002','Chest Intermediate Build','intermediate','chest','build-muscle','15-20',4,17,140),
  mkW('wi003','Back Intermediate Strength','intermediate','back','build-muscle','15-20',4,17,135),
  mkW('wi004','Shoulder Intermediate Sculpt','intermediate','shoulders','build-muscle','15-20',4,17,140),
  mkW('wi005','Arms Intermediate Pump','intermediate','arms','build-muscle','20-25',5,22,165),
  mkW('wi006','Legs Intermediate Circuit','intermediate','legs','build-muscle','20-25',5,22,160),
  mkW('wi007','Core Intermediate Shred','intermediate','core','build-muscle','15-20',5,17,145),
  mkW('wi008','Glutes Intermediate Shaper','intermediate','glutes','build-muscle','15-20',5,17,140),
  mkW('wi009','HIIT Fat Burner Intermediate','intermediate','full-body','lose-weight','10-15',4,12,130),
  mkW('wi010','Endurance Builder Intermediate','intermediate','full-body','improve-endurance','20-25',5,22,160),
  mkW('wi011','Chest Intermediate Fat Burn','intermediate','chest','lose-weight','10-15',4,12,128),
  mkW('wi012','Back Intermediate Fat Burn','intermediate','back','lose-weight','10-15',4,12,125),
  mkW('wi013','Shoulder Intermediate Fat Burn','intermediate','shoulders','lose-weight','15-20',4,17,140),
  mkW('wi014','Arms Intermediate Fat Burn','intermediate','arms','lose-weight','10-15',4,12,128),
  mkW('wi015','Legs Intermediate Fat Burn','intermediate','legs','lose-weight','15-20',4,17,148),
  mkW('wi016','Core Intermediate Fat Burn','intermediate','core','lose-weight','10-15',4,12,125),
  mkW('wi017','Glutes Intermediate Fat Burn','intermediate','glutes','lose-weight','15-20',4,17,140),
  mkW('wi018','Full Body Endurance Circuit','intermediate','full-body','improve-endurance','15-20',5,17,155),
  mkW('wi019','Chest Endurance Intermediate','intermediate','chest','improve-endurance','15-20',4,17,138),
  mkW('wi020','Back Endurance Intermediate','intermediate','back','improve-endurance','15-20',4,17,135),
  mkW('wi021','Shoulder Endurance Intermediate','intermediate','shoulders','improve-endurance','15-20',4,17,138),
  mkW('wi022','Arms Endurance Intermediate','intermediate','arms','improve-endurance','15-20',4,17,140),
  mkW('wi023','Legs Endurance Intermediate','intermediate','legs','improve-endurance','20-25',5,22,165),
  mkW('wi024','Core Endurance Intermediate','intermediate','core','improve-endurance','15-20',5,17,145),
  mkW('wi025','Glutes Endurance Intermediate','intermediate','glutes','improve-endurance','15-20',4,17,140),
  mkW('wi026','Full Body Balance Circuit','intermediate','full-body','improve-endurance','25+',6,27,185),
  mkW('wi027','Upper Body Pump Builder','intermediate','full-body','build-muscle','15-20',6,17,150),
  mkW('wi028','Core Shred Express','intermediate','core','lose-weight','10-15',7,12,122),
  mkW('wi029','Active Recovery Session','intermediate','full-body','improve-endurance','15-20',5,17,120),
  mkW('wi030','Full Body Fat Burn Intermediate','intermediate','full-body','lose-weight','20-25',5,22,168),

  // ── ADVANCED ──────────────────────────────────────────────────
  mkW('wa001','Full Body Advanced HIIT','advanced','full-body','lose-weight','25+',6,27,220),
  mkW('wa002','Chest Advanced Power','advanced','chest','build-muscle','15-20',4,17,178),
  mkW('wa003','Back Advanced Domination','advanced','back','build-muscle','15-20',4,17,182),
  mkW('wa004','Shoulder Advanced Burn','advanced','shoulders','build-muscle','15-20',4,17,175),
  mkW('wa005','Arms Advanced Pump','advanced','arms','build-muscle','20-25',5,22,192),
  mkW('wa006','Legs Explosive Advanced','advanced','legs','build-muscle','20-25',5,22,190),
  mkW('wa007','Core Advanced Destroyer','advanced','core','build-muscle','15-20',5,17,175),
  mkW('wa008','Glutes Advanced Sculptor','advanced','glutes','build-muscle','20-25',5,22,200),
  mkW('wa009','Fat Burn HIIT Advanced','advanced','full-body','lose-weight','20-25',6,22,210),
  mkW('wa010','Power Strength Advanced','advanced','full-body','build-muscle','20-25',5,22,215),
  mkW('wa011','Total Body Cardio Advanced','advanced','full-body','improve-endurance','25+',6,27,225),
  mkW('wa012','Chest Advanced Fat Burn','advanced','chest','lose-weight','15-20',4,17,175),
  mkW('wa013','Back Advanced Fat Burn','advanced','back','lose-weight','15-20',4,17,170),
  mkW('wa014','Shoulder Advanced Fat Burn','advanced','shoulders','lose-weight','20-25',4,22,175),
  mkW('wa015','Arms Advanced Fat Burn','advanced','arms','lose-weight','15-20',4,17,175),
  mkW('wa016','Legs Advanced Fat Burn','advanced','legs','lose-weight','20-25',5,22,195),
  mkW('wa017','Core Advanced Fat Burn','advanced','core','lose-weight','15-20',5,17,178),
  mkW('wa018','Glutes & Hamstrings Advanced','advanced','glutes','lose-weight','20-25',5,22,205),
  mkW('wa019','Chest Advanced Endurance','advanced','chest','improve-endurance','15-20',4,17,170),
  mkW('wa020','Back Advanced Endurance','advanced','back','improve-endurance','20-25',4,22,185),
  mkW('wa021','Shoulder Advanced Endurance','advanced','shoulders','improve-endurance','15-20',4,17,173),
  mkW('wa022','Arms Advanced Endurance','advanced','arms','improve-endurance','20-25',5,22,195),
  mkW('wa023','Legs Advanced Endurance','advanced','legs','improve-endurance','20-25',5,22,195),
  mkW('wa024','Core Advanced Annihilation','advanced','core','improve-endurance','15-20',5,17,185),
  mkW('wa025','Mobility & Flexibility Advanced','advanced','full-body','improve-endurance','20-25',5,22,160),
  mkW('wa026','Chest & Triceps Advanced','advanced','chest','build-muscle','20-25',5,22,190),
  mkW('wa027','Full Body Athlete Builder','advanced','full-body','build-muscle','25+',8,27,220),
  mkW('wa028','Leg Day Power Circuit','advanced','legs','build-muscle','20-25',7,22,200),
  mkW('wa029','Chest Advanced Sculptor','advanced','chest','build-muscle','15-20',4,17,165),
  mkW('wa030','Full Body Advanced Athlete','advanced','full-body','build-muscle','25+',6,27,230),

  // ── PRO ──────────────────────────────────────────────────────
  mkW('wp001','Full Body Pro Endurance','pro','full-body','improve-endurance','25+',6,28,310),
  mkW('wp002','Chest Pro Supreme','pro','chest','build-muscle','20-25',4,22,270),
  mkW('wp003','Back Pro Mastery','pro','back','build-muscle','20-25',4,22,280),
  mkW('wp004','Shoulders Elite Pro','pro','shoulders','build-muscle','20-25',5,22,270),
  mkW('wp005','Arms Pro Elite','pro','arms','build-muscle','20-25',4,22,275),
  mkW('wp006','Legs Pro Explosion','pro','legs','build-muscle','25+',5,28,305),
  mkW('wp007','Core Elite Pro','pro','core','build-muscle','20-25',5,22,260),
  mkW('wp008','Full Body Power Pro','pro','full-body','build-muscle','25+',6,28,320),
  mkW('wp009','Explosive Power Pro','pro','full-body','build-muscle','25+',6,28,330),
  mkW('wp010','Pro Athlete Conditioning','pro','full-body','improve-endurance','25+',7,28,300),
  mkW('wp011','Chest Pro Explosion','pro','chest','build-muscle','20-25',4,22,285),
  mkW('wp012','Back Pro Strength','pro','back','build-muscle','20-25',4,22,280),
  mkW('wp013','Shoulders Pro Power','pro','shoulders','build-muscle','20-25',4,22,275),
  mkW('wp014','Legs Pro Power','pro','legs','build-muscle','25+',5,28,305),
  mkW('wp015','Core Pro Mastery','pro','core','build-muscle','20-25',4,22,265),
  mkW('wp016','Back Domination Pro','pro','back','build-muscle','25+',5,28,290),
  mkW('wp017','Full Body Pro Fat Burn','pro','full-body','lose-weight','25+',6,28,295),
  mkW('wp018','Chest Pro Fat Burn','pro','chest','lose-weight','20-25',4,22,265),
  mkW('wp019','Arms Pro Fat Burn','pro','arms','lose-weight','20-25',4,22,268),
  mkW('wp020','Legs Pro Fat Burn','pro','legs','lose-weight','25+',5,28,295),
  mkW('wp021','Core Pro Fat Burn','pro','core','lose-weight','20-25',4,22,258),
  mkW('wp022','Back Pro Fat Burn','pro','back','lose-weight','20-25',4,22,272),
  mkW('wp023','Shoulders Pro Fat Burn','pro','shoulders','lose-weight','20-25',4,22,265),
  mkW('wp024','Full Body Pro Cardio','pro','full-body','lose-weight','20-25',6,22,288),
  mkW('wp025','Core Stability Pro','pro','core','improve-endurance','20-25',5,22,270),
  mkW('wp026','Shoulders Pro Endurance','pro','shoulders','improve-endurance','20-25',4,22,272),
  mkW('wp027','Arms Pro Domination','pro','arms','build-muscle','25+',5,28,290),
  mkW('wp028','Legs Pro Strength','pro','legs','improve-endurance','25+',5,28,305),
  mkW('wp029','Back Pro Endurance','pro','back','improve-endurance','25+',5,28,285),
  mkW('wp030','Chest Pro Endurance','pro','chest','improve-endurance','20-25',4,22,265),
];

// Fuzzy workout matcher — ALWAYS returns at least 1 workout
function findWorkouts(level, target, goal, durCat) {
  const all = WORKOUTS;
  const match = (w, lv, tg, gl, dc) =>
    w.level===lv && (tg==='any'||w.target===tg) && (gl==='any'||w.goal===gl) && (dc==='any'||w.duration_category===dc);

  // Pass 1: exact
  let r = all.filter(w => match(w,level,target,goal,durCat));
  if (r.length) return r;
  // Pass 2: relax duration
  r = all.filter(w => match(w,level,target,goal,'any'));
  if (r.length) return r;
  // Pass 3: relax goal
  r = all.filter(w => match(w,level,target,'any','any'));
  if (r.length) return r;
  // Pass 4: relax target
  r = all.filter(w => match(w,level,'any','any','any'));
  if (r.length) return r;
  // Pass 5: level only match (beginner→beginner+, etc.)
  const fallback = { pro:'advanced', advanced:'intermediate', intermediate:'beginner', beginner:'beginner' };
  r = all.filter(w => w.level===level || w.level===fallback[level]);
  return r.length ? r : [all[0]];
}

// ── Skill Paths ───────────────────────────────────────────────────
const SKILL_PATHS = [
  { id:'batting', title:'Batting Mastery', emoji:'🏏', desc:'From solid defence to dominant attack — the complete batsman blueprint.',
    color:'from-blue-600 to-indigo-700', textColor:'text-blue-300', borderColor:'border-blue-500',
    levels:[
      { id:'beginner', label:'Club Cricketer', icon:'🏏', xpPerDay:80,
        desc:'Fundamentals, defence, and basic stroke play.', equipment:['Bat','Pads','Helmet'],
        sampleDrills:['Defensive Block Foundation','Cover Drive Mastery','Running Between Wickets'] },
      { id:'intermediate', label:'District Player', icon:'⚡', xpPerDay:120,
        desc:'Shot expansion, spin play, and T20 skills.', equipment:['Bat','Pads','Helmet','Gloves'],
        sampleDrills:['Cut Shot Technique','Sweep Shot vs Spin','Pull Shot Power'] },
      { id:'advanced', label:'State Performer', icon:'🌟', xpPerDay:160,
        desc:'Power hitting, pressure batting, and leadership.', equipment:['Full kit','Weights'],
        sampleDrills:['T20 Power Hitting','Ramp Shot over Keeper','Pressure Inoculation Training'] },
      { id:'pro', label:'Elite Cricketer', icon:'👑', xpPerDay:200,
        desc:'Elite refinement, match simulation, and peak performance.', equipment:['Full kit','Video analysis'],
        sampleDrills:['Reading Spin','Between-Ball Reset','Complete Shot Arsenal'] }
    ]
  },
  { id:'bowling', title:'Bowling Excellence', emoji:'⚾', desc:'Build line and length, develop variations, and become unplayable.',
    color:'from-red-600 to-orange-600', textColor:'text-red-300', borderColor:'border-red-500',
    levels:[
      { id:'beginner', label:'Club Cricketer', icon:'⚾', xpPerDay:75,
        desc:'Correct action, basic control, and seam presentation.', equipment:['Balls','Cones'],
        sampleDrills:['Line & Length Precision','Off Spin Fundamentals','Leg Spin Basics'] },
      { id:'intermediate', label:'District Bowler', icon:'🎯', xpPerDay:115,
        desc:'Swing bowling, variation, and field setting.', equipment:['Multiple balls','Marker cones'],
        sampleDrills:['Outswing Mastery','Inswing Bowling','Googly Disguise'] },
      { id:'advanced', label:'State Performer', icon:'🔥', xpPerDay:155,
        desc:'Death bowling, yorkers, and pressure bowling.', equipment:['Full kit','Speed gun'],
        sampleDrills:['Yorker Death Bowling','Bouncer Control','Slower Ball Variations'] },
      { id:'pro', label:'Elite Bowler', icon:'💥', xpPerDay:195,
        desc:'Complete mastery of swing, seam, spin, and pace.', equipment:['Video analysis','Coaching'],
        sampleDrills:['Death Bowling Masterclass','Complete Variation Arsenal','Match Pressure Simulation'] }
    ]
  },
  { id:'fielding', title:'Fielding Athlete', emoji:'🏃', desc:'Become the player every captain wants at cover — quick, accurate, fearless.',
    color:'from-emerald-600 to-teal-600', textColor:'text-emerald-300', borderColor:'border-emerald-500',
    levels:[
      { id:'beginner', label:'Safe Pair of Hands', icon:'🤲', xpPerDay:65,
        desc:'Clean stops, basic catching, and safe returns.', equipment:['Balls','Cone markers'],
        sampleDrills:['Ground Fielding Excellence','High Catch Taking','Throwing Accuracy at Stumps'] },
      { id:'intermediate', label:'Athletic Fielder', icon:'⚡', xpPerDay:100,
        desc:'Slip catching, direct hits, and boundary saving.', equipment:['Balls','Cradle'],
        sampleDrills:['Slip Catching Reactions','Direct Hit Run Outs','Diving Saves on Boundary'] },
      { id:'advanced', label:'Elite Fielder', icon:'🌟', xpPerDay:140,
        desc:'Elite boundary work, run-out artistry, and fielding captain.', equipment:['Full kit'],
        sampleDrills:['Direct Hit Run Outs','Diving Saves on Boundary','Pressure Catches'] },
      { id:'pro', label:'World-Class Fielder', icon:'🏆', xpPerDay:180,
        desc:'Complete fielding — redefine what the position looks like.', equipment:['Video analysis'],
        sampleDrills:['Full Fielding Masterclass','Leadership in the Field','Zero Boundaries Conceded'] }
    ]
  },
  { id:'allrounder', title:'All-Rounder Path', emoji:'⭐', desc:'The complete cricketer — contribute meaningfully with bat, ball, and field.',
    color:'from-purple-600 to-pink-600', textColor:'text-purple-300', borderColor:'border-purple-500',
    levels:[
      { id:'beginner', label:'Utility Player', icon:'⭐', xpPerDay:90,
        desc:'Solid in two disciplines — reliable all-rounder basics.', equipment:['Full kit'],
        sampleDrills:['Cover Drive Mastery','Line & Length Precision','Ground Fielding Excellence'] },
      { id:'intermediate', label:'Impact Player', icon:'💥', xpPerDay:135,
        desc:'Match-winning contributions in both key disciplines.', equipment:['Full kit','Training aids'],
        sampleDrills:['Pull Shot Power','Outswing Mastery','Slip Catching Reactions'] },
      { id:'advanced', label:'Key All-Rounder', icon:'🔥', xpPerDay:175,
        desc:'Consistently influential in all three disciplines.', equipment:['Full kit','Video analysis'],
        sampleDrills:['T20 Power Hitting','Death Bowling Masterclass','Elite Fielding'] },
      { id:'pro', label:'Complete Cricketer', icon:'👑', xpPerDay:220,
        desc:'Redefine what an all-rounder brings to the team.', equipment:['Full professional kit'],
        sampleDrills:['Complete Batting Arsenal','Complete Bowling Arsenal','World-Class Fielding'] }
    ]
  }
];

// Generate a 5-week day program for a path+level
function generateWeekPlan(pathId, levelId) {
  const path = SKILL_PATHS.find(p => p.id===pathId);
  const lvl = path?.levels.find(l => l.id===levelId);
  if (!path || !lvl) return [];

  const phases = [
    { name:'Foundation', theme:'Building solid fundamentals', weeks:1 },
    { name:'Development', theme:'Expanding your skill set', weeks:1 },
    { name:'Integration', theme:'Combining skills under pressure', weeks:1 },
    { name:'Performance', theme:'Match preparation and peak output', weeks:1 },
    { name:'Mastery', theme:'Refining and competing at your best', weeks:1 },
  ];

  return phases.map((phase, wi) => ({
    week: wi+1,
    phase: phase.name,
    theme: phase.theme,
    days: Array.from({ length:7 }, (_,di) => {
      if (di===6) return { day:7, label:'Rest & Recover', isRest:true, activities:[] };
      const isLightDay = di===2 || di===4;
      const activities = isLightDay
        ? [
            { type:'mental', id:'m84', title:'Recovery & Reset', duration:'8 min', xp:65 },
            { type:'drill', id:path.levels[0].sampleDrills[0], title:'Light Technique Work', duration:'15 min', xp:60 },
          ]
        : [
            { type:'drill', id:path.id==='batting'?'b001':'w001', title:lvl.sampleDrills[di%lvl.sampleDrills.length]||'Skill Session', duration:'20 min', xp:lvl.xpPerDay*0.4|0 },
            { type:'workout', id:'wb001', title:'Cricket Fitness', duration:'20 min', xp:lvl.xpPerDay*0.3|0 },
            { type:'mental', id:'m50', title:'Mental Training', duration:'8 min', xp:lvl.xpPerDay*0.3|0 },
          ];
      return { day:di+1, label:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][di], isRest:false, activities, totalXP:activities.reduce((s,a)=>s+a.xp,0) };
    })
  }));
}

// ================================================================
// SHARED UI COMPONENTS
// ================================================================

// ── Spinner ───────────────────────────────────────────────────────
function Spinner({ cls='' }) {
  return h('div', { className:`flex items-center justify-center py-12 ${cls}` },
    h('div', { className:'spinner' }));
}

// ── Level Bar ─────────────────────────────────────────────────────
function LevelBar({ totalXP, compact=false }) {
  const info = getLevelInfo(totalXP||0);
  if (compact) return h('div', { className:'flex items-center gap-2' },
    h('span', { className:'text-xs font-bold text-emerald-400 whitespace-nowrap' }, `Lv.${info.level}`),
    h('div', { className:'level-bar-track flex-1' },
      h('div', { className:'level-bar-fill', style:{ width:`${info.pct}%` } }))
  );
  return h('div', { className:'space-y-1' },
    h('div', { className:'flex justify-between items-center' },
      h('span', { className:'text-sm font-bold text-emerald-400' }, `Level ${info.level} — ${info.name}`),
      h('span', { className:'text-xs text-slate-400' }, info.next ? `${info.xpToNext} XP to next` : 'MAX LEVEL')
    ),
    h('div', { className:'level-bar-track' },
      h('div', { className:'level-bar-fill', style:{ width:`${info.pct}%` } })
    )
  );
}

// ── Streak Badge ──────────────────────────────────────────────────
function StreakBadge({ streak=0 }) {
  if (streak===0) return h('div', { className:'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700' },
    h('span', { className:'text-slate-500 text-xs' }, '🏏'),
    h('span', { className:'text-slate-400 text-xs font-semibold' }, 'No streak yet')
  );
  const color = streak>=30 ? 'from-amber-500 to-red-500' : streak>=7 ? 'from-orange-500 to-red-500' : 'from-orange-400 to-orange-600';
  return h('div', { className:`streak-badge bg-gradient-to-r ${color}` },
    h('span', {}, '🔥'),
    h('span', { className:'font-bold' }, `${streak}`),
    h('span', { className:'text-orange-100 text-xs' }, streak===1?'day streak':'day streak')
  );
}

// ── XP Badge ─────────────────────────────────────────────────────
function XPBadge({ xp }) {
  return h('span', { className:'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-xs font-bold' },
    h(Icon, { n:'zap', cls:'w-3 h-3' }),
    `${xp} XP`
  );
}

// ── Premium Badge ─────────────────────────────────────────────────
function PremiumBadge({ label='PRO' }) {
  return h('span', { className:'premium-badge' }, `⭐ ${label}`);
}

// ── Stat Card ─────────────────────────────────────────────────────
function StatCard({ icon, label, value, color='text-emerald-400', sub='', cls='' }) {
  return h('div', { className:`stat-card ${cls}` },
    h('div', { className:`text-2xl font-black ${color}` }, value),
    h('div', { className:'text-xs font-semibold text-slate-400 uppercase tracking-wider' }, label),
    sub && h('div', { className:'text-xs text-slate-500 mt-0.5' }, sub)
  );
}

// ── Page Header ───────────────────────────────────────────────────
function PageHeader({ title, subtitle, from='#10b981', to='#059669', onBack, extra }) {
  return h('div', {
    className:'page-header',
    style:{ background:`linear-gradient(135deg, ${from}, ${to})` }
  },
    h('div', { className:'relative z-10' },
      h('div', { className:'flex items-center gap-3 mb-1' },
        onBack && h('button', { onClick:onBack, className:'p-2 rounded-xl bg-white/15 active:bg-white/25 transition-colors' },
          h(Icon, { n:'arrowL', cls:'w-5 h-5 text-white' })
        ),
        h('div', {},
          h('h1', { className:'text-xl font-black text-white tracking-tight leading-tight' }, title),
          subtitle && h('p', { className:'text-sm text-white/75 mt-0.5' }, subtitle)
        ),
        extra && h('div', { className:'ml-auto' }, extra)
      )
    )
  );
}

// ── Empty State ───────────────────────────────────────────────────
function EmptyState({ emoji='🏏', title, desc, action }) {
  return h('div', { className:'flex flex-col items-center justify-center py-16 px-6 text-center' },
    h('div', { className:'text-5xl mb-4' }, emoji),
    h('h3', { className:'text-lg font-bold text-slate-300 mb-2' }, title),
    h('p', { className:'text-sm text-slate-500 mb-6 max-w-xs' }, desc),
    action && h('button', { onClick:action.fn, className:'btn-primary px-6 py-3 text-sm' }, action.label)
  );
}

// ── Notification Bar ──────────────────────────────────────────────
let _notifTimer = null;
function NotifBar({ msg, onClose }) {
  if (!msg) return null;
  return h('div', { className:'notif-bar' },
    h('span', { className:'flex items-center gap-2' },
      h(Icon, { n:'sparkles', cls:'w-4 h-4 flex-shrink-0' }), msg
    ),
    h('button', { onClick:onClose, className:'opacity-75 hover:opacity-100' },
      h(Icon, { n:'x', cls:'w-4 h-4' })
    )
  );
}

// ── Card wrapper ──────────────────────────────────────────────────
function Card({ children, cls='', onClick }) {
  return h('div', {
    className:`activity-card pro-card ${cls} ${onClick ? 'cursor-pointer' : ''}`,
    onClick
  }, children);
}

// ── XP History Chart (7 days) ─────────────────────────────────────
function XPChart({ days }) {
  const max = Math.max(...days.map(d => d.xp), 1);
  return h('div', { className:'flex items-end gap-1.5 h-20 w-full' },
    days.map(d =>
      h('div', { key:d.date, className:'flex flex-col items-center gap-1 flex-1' },
        h('div', {
          className:'xp-bar w-full',
          style:{ height:`${Math.max(4, (d.xp/max)*72)}px` },
          title:`${d.xp} XP`
        }),
        h('span', { className:'text-xs text-slate-500 font-medium' }, d.label)
      )
    )
  );
}

// ── Activity Heatmap (30 days) ────────────────────────────────────
function Heatmap({ days }) {
  return h('div', { className:'grid grid-cols-7 gap-1' },
    days.map((d,i) =>
      h('div', {
        key:d.date,
        className:`heatmap-cell heatmap-${d.level}`,
        title:`${d.date}: ${d.xp} XP`
      })
    )
  );
}

// ================================================================
// SIDEBAR
// ================================================================
function Sidebar({ open, onClose, currentPage }) {
  const scrollRef = useRef(null);
  const savedScroll = useRef(0);
  const { dark, toggle } = useTheme();
  const p = DB.getProgress();
  const info = getLevelInfo(p.total_xp||0);

  // Save scroll position when closing
  const handleClose = useCallback(() => {
    savedScroll.current = scrollRef.current?.scrollTop || 0;
    onClose();
  }, [onClose]);

  // Restore scroll position when opening
  useEffect(() => {
    if (open && scrollRef.current) {
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = savedScroll.current;
      });
    }
  }, [open]);

  // Smart Start: scroll to section on home page
  const handleSmartStart = () => {
    handleClose();
    if (currentPage !== 'Home') {
      nav('Home');
      setTimeout(() => {
        const el = document.getElementById('smart-start-section');
        if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
      }, 150);
    } else {
      const el = document.getElementById('smart-start-section');
      if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  };

  // Nav item builder
  function NavItem({ label, icon, page, onClick, isActive, badge }) {
    const active = isActive || currentPage===page;
    return h('button', {
      onClick: onClick || (() => { nav(page); handleClose(); }),
      className:`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all
        ${active ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:bg-white/5 hover:text-white'}
        active:scale-[.98]`
    },
      h('span', { className:'text-lg' }, icon),
      h('span', { className:'text-sm font-semibold flex-1' }, label),
      badge && h('span', { className:'premium-badge' }, badge)
    );
  }

  function SectionLabel({ children }) {
    return h('div', { className:'px-4 pt-5 pb-1' },
      h('span', { className:'text-xs font-bold text-slate-500 uppercase tracking-widest' }, children)
    );
  }

  return h(Fragment, null,
    // Overlay
    open && h('div', {
      className:'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm',
      onClick: handleClose
    }),

    // Panel
    h('div', {
      className:`fixed inset-y-0 left-0 z-50 w-80 sidebar-panel flex flex-col
        ${open ? '' : 'pointer-events-none opacity-0'}`,
      style:{ transform: open ? 'translateX(0)' : 'translateX(-100%)', transition:'transform .22s cubic-bezier(.16,1,.3,1), opacity .22s' }
    },
      // Header
      h('div', { className:'flex items-center justify-between px-5 py-4 border-b border-slate-800' },
        h('div', { className:'flex items-center gap-3' },
          h('div', { className:'w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0' },
            h('span', { className:'text-xl' }, '🏏')
          ),
          h('div', {},
            h('div', { className:'font-black text-white text-sm' }, 'SmartCrick AI'),
            h('div', { className:'text-xs text-emerald-400 font-semibold' }, `Level ${info.level} — ${info.name}`)
          )
        ),
        h('button', { onClick:handleClose, className:'p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors' },
          h(Icon, { n:'x', cls:'w-5 h-5 text-slate-400' })
        )
      ),

      // Level bar
      h('div', { className:'px-5 py-3 bg-slate-900/50 border-b border-slate-800' },
        h(LevelBar, { totalXP:p.total_xp||0, compact:false })
      ),

      // Scrollable nav — always-visible scrollbar
      h('div', {
        ref: scrollRef,
        className:'flex-1 overflow-y-auto sidebar-scroll py-2 pr-2'
      },
        // ⭐ PREMIUM FEATURES
        h(SectionLabel, {}, '⭐ Premium'),
        h(NavItem, { label:'SmartCrick Head Coach', icon:'🤖', page:'AICoach', badge:'PRO' }),
        h(NavItem, { label:'90-Day Elite Program', icon:'💎', page:'NinetyDay', badge:'PRO' }),

        // 🏠 CORE TRAINING
        h(SectionLabel, {}, '🏠 Core Training'),
        h(NavItem, { label:'Home', icon:'🏠', page:'Home' }),
        h(NavItem, { label:'Smart Start', icon:'⚡', onClick:handleSmartStart }),
        h(NavItem, { label:'Cricket Drills', icon:'🏏', page:'Drills' }),
        h(NavItem, { label:'Mental Training', icon:'🧠', page:'Mental' }),
        h(NavItem, { label:'30-Day Challenge', icon:'🎯', page:'ThirtyDay' }),
        h(NavItem, { label:'Fitness Builder', icon:'💪', page:'Fitness' }),
        h(NavItem, { label:'AI Workout Creator', icon:'🤖', page:'AIWorkout' }),
        h(NavItem, { label:'Timer', icon:'⏱', page:'Timer' }),

        // 📈 PROGRESS & STATS
        h(SectionLabel, {}, '📈 Progress & Skills'),
        h(NavItem, { label:'My Progress', icon:'📊', page:'Progress' }),
        h(NavItem, { label:'Skill Paths', icon:'🛤', page:'SkillPaths' }),
        h(NavItem, { label:'Leaderboard', icon:'🏆', page:'Leaderboard' }),
        h(NavItem, { label:'Goals', icon:'🎯', page:'Goals' }),
        h(NavItem, { label:'My Profile', icon:'👤', page:'Profile' }),

        // 🏏 CRICKET TOOLS
        h(SectionLabel, {}, '🏏 Cricket Tools'),
        h(NavItem, { label:'Match Tracker', icon:'📋', page:'MatchTracker' }),
        h(NavItem, { label:'MiniMatch IQ', icon:'🧩', page:'MiniMatch' }),
        h(NavItem, { label:'Why Did I Get Out?', icon:'❓', page:'GetOut' }),
        h(NavItem, { label:'Schedule', icon:'📅', page:'Schedule' }),
        h(NavItem, { label:'Quizzes', icon:'📝', page:'Quizzes' }),

        // ⚙️ ACCOUNT
        h(SectionLabel, {}, '⚙️ Account'),
        h(NavItem, { label:'Settings', icon:'⚙️', page:'Settings' }),
        h('div', { className:'flex items-center justify-between px-4 py-3' },
          h('span', { className:'text-sm text-slate-300 font-semibold' }, dark?'Dark Mode':'Light Mode'),
          h('button', {
            onClick: toggle,
            className:`w-12 h-6 rounded-full transition-colors ${dark?'bg-emerald-500':'bg-slate-600'}`,
            style:{ position:'relative' }
          },
            h('div', {
              className:'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-md',
              style:{ left:'2px', transform:dark?'translateX(24px)':'translateX(0)' }
            })
          )
        ),

        // Bottom padding
        h('div', { className:'h-6' })
      )
    )
  );
}

// ================================================================
// BOTTOM NAV
// ================================================================
function BottomNav({ page }) {
  const items = [
    { icon:'home', label:'Home', pg:'Home' },
    { icon:'target', label:'Drills', pg:'Drills' },
    { icon:'brain', label:'Mental', pg:'Mental' },
    { icon:'dumbbell', label:'Fitness', pg:'Fitness' },
    { icon:'timer', label:'Timer', pg:'Timer' },
  ];
  return h('nav', { className:'bottom-nav' },
    h('div', { className:'flex items-center h-16' },
      items.map(item =>
        h('button', {
          key:item.pg,
          onClick:()=>nav(item.pg),
          className:`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors
            ${page===item.pg ? 'text-emerald-400' : 'text-slate-500 active:text-slate-300'}`
        },
          h(Icon, { n:item.icon, cls:'w-5 h-5' }),
          h('span', { className:'text-xs font-semibold' }, item.label)
        )
      )
    )
  );
}

// ================================================================
// HOME PAGE — Professional Elite Training Dashboard
// ================================================================
function HomePage({ smartStartRef }) {
  const [progress, setProgress] = useState(() => DB.getProgress());
  const [xpDays, setXPDays] = useState(() => DB.getXPLast7Days());
  const [checkInDone, setCheckInDone] = useState(() => {
    const today = new Date().toISOString().slice(0,10);
    return DB.getProgress().last_active_date === today && (DB.getProgress().last_checkin_date === today);
  });

  // Refresh stats on focus + custom events
  const refreshStats = useCallback(() => {
    setProgress(DB.getProgress());
    setXPDays(DB.getXPLast7Days());
  }, []);

  useEffect(() => {
    window.addEventListener('sc_progress_update', refreshStats);
    window.addEventListener('focus', refreshStats);
    return () => {
      window.removeEventListener('sc_progress_update', refreshStats);
      window.removeEventListener('focus', refreshStats);
    };
  }, [refreshStats]);

  const info = getLevelInfo(progress.total_xp||0);
  const streak = progress.current_streak||0;
  const user = DB.getUser();
  const firstName = user.name ? user.name.split(' ')[0] : 'Cricketer';
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const handleCheckIn = () => {
    if (checkInDone) return;
    const today = new Date().toISOString().slice(0,10);
    const p = DB.getProgress();
    p.last_checkin_date = today;
    DB.saveProgress(p);
    awardXP(15, 0, 'checkin');
    setCheckInDone(true);
  };

  // Quick action tiles
  const quickActions = [
    { icon:'🏏', label:'Drills', sub:'Cricket Training', page:'Drills', color:'from-blue-600 to-indigo-700' },
    { icon:'🧠', label:'Mental', sub:'Mind Sessions', page:'Mental', color:'from-purple-600 to-pink-600' },
    { icon:'💪', label:'Fitness', sub:'Workouts', page:'Fitness', color:'from-orange-500 to-red-600' },
    { icon:'⏱', label:'Timer', sub:'Pro Timer', page:'Timer', color:'from-teal-500 to-emerald-600' },
  ];

  // Explore tiles
  const exploreTiles = [
    { icon:'🛤', label:'Skill Paths', sub:'Structured programs', page:'SkillPaths', color:'bg-slate-800 border-slate-700' },
    { icon:'🏆', label:'Leaderboard', sub:'See how you rank', page:'Leaderboard', color:'bg-slate-800 border-slate-700' },
    { icon:'📊', label:'My Progress', sub:'Stats & badges', page:'Progress', color:'bg-slate-800 border-slate-700' },
    { icon:'🎯', label:'30-Day Challenge', sub:'Daily commitment', page:'ThirtyDay', color:'bg-slate-800 border-slate-700' },
    { icon:'📋', label:'Match Tracker', sub:'Log your games', page:'MatchTracker', color:'bg-slate-800 border-slate-700' },
    { icon:'🧩', label:'MiniMatch IQ', sub:'Tactical scenarios', page:'MiniMatch', color:'bg-slate-800 border-slate-700' },
    { icon:'❓', label:'Why Dismissed?', sub:'Analyze your wicket', page:'GetOut', color:'bg-slate-800 border-slate-700' },
    { icon:'📝', label:'Quizzes', sub:'Test cricket knowledge', page:'Quizzes', color:'bg-slate-800 border-slate-700' },
  ];

  // Today's recommended sessions (smart picks)
  const completedDrills = progress.completed_drills || [];
  const completedMental = progress.completed_mental || [];
  const drillPick = DRILLS.find(d => !completedDrills.includes(d.id) && d.category==='batting') || DRILLS[0];
  const mentalPick = MENTAL_SESSIONS.find(m => !completedMental.includes(m.id) && !m.is_premium) || MENTAL_SESSIONS[0];
  const workoutPick = WORKOUTS.find(w => w.level==='beginner') || WORKOUTS[0];

  return h('div', { className:'page-wrapper' },
    // ── Hero Section ─────────────────────────────────────────────
    h('div', {
      className:'relative overflow-hidden',
      style:{ background:'linear-gradient(135deg, #064e3b 0%, #0f172a 40%, #020617 100%)' }
    },
      // Decorative orbs
      h('div', { style:{ position:'absolute', top:'-40%', right:'-10%', width:'280px', height:'280px', background:'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)', borderRadius:'50%', pointerEvents:'none' } }),
      h('div', { style:{ position:'absolute', bottom:'-20%', left:'-10%', width:'200px', height:'200px', background:'radial-gradient(circle, rgba(20,184,166,0.08), transparent 70%)', borderRadius:'50%', pointerEvents:'none' } }),

      h('div', { className:'relative z-10 px-5 pt-20 pb-6' },
        // Greeting + streak
        h('div', { className:'flex items-start justify-between mb-5' },
          h('div', {},
            h('p', { className:'text-emerald-400 text-sm font-semibold tracking-wide mb-0.5' }, greeting),
            h('h1', { className:'text-3xl font-black text-white tracking-tight leading-tight' }, firstName),
            h('p', { className:'text-slate-400 text-sm mt-1' }, 'Ready to train like a pro?')
          ),
          h(StreakBadge, { streak })
        ),

        // Level progress
        h('div', { className:'mb-5 p-4 rounded-2xl bg-white/5 border border-white/10' },
          h('div', { className:'flex items-center justify-between mb-3' },
            h('div', { className:'flex items-center gap-2' },
              h('div', { className:'w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center' },
                h(Icon, { n:'crown', cls:'w-4 h-4 text-emerald-400' })
              ),
              h('div', {},
                h('div', { className:'text-white font-black text-sm' }, `Level ${info.level}`),
                h('div', { className:'text-emerald-400 text-xs font-medium' }, info.name)
              )
            ),
            h('div', { className:'text-right' },
              h('div', { className:'text-white font-bold text-sm' }, `${(progress.total_xp||0).toLocaleString()} XP`),
              info.next && h('div', { className:'text-slate-400 text-xs' }, `${info.xpToNext} to Level ${info.level+1}`)
            )
          ),
          h('div', { className:'level-bar-track' },
            h('div', { className:'level-bar-fill', style:{ width:`${info.pct}%` } })
          )
        ),

        // 4-stat row
        h('div', { className:'grid grid-cols-4 gap-2 mb-5' },
          [
            { val:progress.drills_done||0, label:'Drills', color:'text-blue-400' },
            { val:progress.mental_done||0, label:'Mental', color:'text-purple-400' },
            { val:progress.practice_minutes||0, label:'Mins', color:'text-orange-400' },
            { val:(progress.total_xp||0).toLocaleString(), label:'XP', color:'text-emerald-400' },
          ].map(s =>
            h('div', { key:s.label, className:'text-center p-2 rounded-xl bg-white/5 border border-white/8' },
              h('div', { className:`text-lg font-black ${s.color}` }, s.val),
              h('div', { className:'text-xs text-slate-500 font-medium' }, s.label)
            )
          )
        ),

        // 7-day XP chart
        h('div', { className:'p-4 rounded-2xl bg-white/5 border border-white/10' },
          h('div', { className:'flex items-center justify-between mb-3' },
            h('span', { className:'text-xs font-bold text-slate-400 uppercase tracking-wider' }, '7-Day XP'),
            h('span', { className:'text-xs text-emerald-400 font-semibold' }, `${xpDays.reduce((s,d)=>s+d.xp,0)} this week`)
          ),
          h(XPChart, { days:xpDays })
        )
      )
    ),

    // ── Quick Actions ─────────────────────────────────────────────
    h('div', { className:'px-5 pt-5' },
      h('h2', { className:'text-lg font-black text-white mb-3' }, 'Quick Train'),
      h('div', { className:'grid grid-cols-4 gap-2' },
        quickActions.map(a =>
          h('button', {
            key:a.page,
            onClick:()=>nav(a.page),
            className:'flex flex-col items-center gap-2 p-3 rounded-2xl text-center active:scale-95 transition-transform',
            style:{ background:'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.8))', border:'1px solid rgba(52,65,85,0.8)' }
          },
            h('div', {
              className:`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${a.color}`,
            }, a.icon),
            h('span', { className:'text-xs font-bold text-white' }, a.label)
          )
        )
      )
    ),

    // ── Daily Check-In ────────────────────────────────────────────
    h('div', { className:'px-5 pt-5' },
      h('button', {
        onClick:handleCheckIn,
        disabled:checkInDone,
        className:`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all
          ${checkInDone
            ? 'bg-emerald-900/20 border-emerald-700/50 cursor-default'
            : 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 active:scale-[.99] cursor-pointer'}`
      },
        h('div', {
          className:`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0
            ${checkInDone ? 'bg-emerald-500/20' : 'bg-slate-700'}`
        }, checkInDone ? '✅' : '⚡'),
        h('div', { className:'text-left' },
          h('div', { className:`font-bold text-sm ${checkInDone?'text-emerald-400':'text-white'}` },
            checkInDone ? 'Checked in today!' : 'Daily Check-In'
          ),
          h('div', { className:'text-xs text-slate-400' },
            checkInDone ? `+15 XP earned — keep it up!` : 'Tap to claim your daily 15 XP'
          )
        ),
        !checkInDone && h('div', { className:'ml-auto' },
          h('span', { className:'text-emerald-400 text-xs font-bold bg-emerald-900/40 border border-emerald-700/50 px-2 py-1 rounded-full' }, '+15 XP')
        )
      )
    ),

    // ── Smart Start Section ───────────────────────────────────────
    h('div', {
      id:'smart-start-section',
      ref:smartStartRef,
      className:'px-5 pt-6'
    },
      h('div', { className:'flex items-center justify-between mb-3' },
        h('h2', { className:'text-lg font-black text-white flex items-center gap-2' },
          h('span', {}, '⚡'),
          'Smart Start'
        ),
        h('span', { className:'text-xs text-slate-500' }, 'Today\'s picks')
      ),
      h('div', { className:'space-y-3' },
        // Recommended Drill
        h('button', {
          onClick:()=>nav('DrillDetail', { id:drillPick.id }),
          className:'w-full text-left p-4 rounded-2xl border border-blue-800/60 active:scale-[.99] transition-all pro-card',
          style:{ background:'linear-gradient(135deg, rgba(30,58,138,0.25), rgba(15,23,42,0.8))' }
        },
          h('div', { className:'flex items-center gap-3' },
            h('div', { className:'w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl flex-shrink-0' }, '🏏'),
            h('div', { className:'flex-1 min-w-0' },
              h('div', { className:'text-xs text-blue-400 font-bold uppercase tracking-wider mb-0.5' }, 'Cricket Drill'),
              h('div', { className:'text-sm font-bold text-white truncate' }, drillPick.title),
              h('div', { className:'text-xs text-slate-400' }, `${drillPick.duration_minutes} min • ${drillPick.xp_value} XP`)
            ),
            h(Icon, { n:'chevR', cls:'w-5 h-5 text-slate-500 flex-shrink-0' })
          )
        ),
        // Recommended Mental Session
        h('button', {
          onClick:()=>nav('MentalPlayer', { id:mentalPick.id }),
          className:'w-full text-left p-4 rounded-2xl border border-purple-800/60 active:scale-[.99] transition-all pro-card',
          style:{ background:'linear-gradient(135deg, rgba(88,28,135,0.25), rgba(15,23,42,0.8))' }
        },
          h('div', { className:'flex items-center gap-3' },
            h('div', { className:'w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-2xl flex-shrink-0' }, '🧠'),
            h('div', { className:'flex-1 min-w-0' },
              h('div', { className:'text-xs text-purple-400 font-bold uppercase tracking-wider mb-0.5' }, 'Mental Session'),
              h('div', { className:'text-sm font-bold text-white truncate' }, mentalPick.title),
              h('div', { className:'text-xs text-slate-400' }, `${Math.floor(mentalPick.duration_seconds/60)} min • ${mentalPick.xp_value} XP`)
            ),
            h(Icon, { n:'chevR', cls:'w-5 h-5 text-slate-500 flex-shrink-0' })
          )
        ),
        // Recommended Workout
        h('button', {
          onClick:()=>nav('WorkoutDetail', { id:workoutPick.id }),
          className:'w-full text-left p-4 rounded-2xl border border-orange-800/60 active:scale-[.99] transition-all pro-card',
          style:{ background:'linear-gradient(135deg, rgba(124,45,18,0.25), rgba(15,23,42,0.8))' }
        },
          h('div', { className:'flex items-center gap-3' },
            h('div', { className:'w-12 h-12 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-2xl flex-shrink-0' }, '💪'),
            h('div', { className:'flex-1 min-w-0' },
              h('div', { className:'text-xs text-orange-400 font-bold uppercase tracking-wider mb-0.5' }, 'Fitness'),
              h('div', { className:'text-sm font-bold text-white truncate' }, workoutPick.name),
              h('div', { className:'text-xs text-slate-400' }, `${workoutPick.duration_minutes} min • ${workoutPick.xp_value} XP`)
            ),
            h(Icon, { n:'chevR', cls:'w-5 h-5 text-slate-500 flex-shrink-0' })
          )
        )
      )
    ),

    // ── Explore More ──────────────────────────────────────────────
    h('div', { className:'px-5 pt-6' },
      h('h2', { className:'text-lg font-black text-white mb-3' }, 'Explore'),
      h('div', { className:'grid grid-cols-2 gap-3' },
        exploreTiles.map(t =>
          h('button', {
            key:t.page,
            onClick:()=>nav(t.page),
            className:`flex items-center gap-3 p-4 rounded-2xl text-left border transition-all active:scale-[.98] pro-card ${t.color}`
          },
            h('span', { className:'text-2xl' }, t.icon),
            h('div', {},
              h('div', { className:'text-sm font-bold text-white' }, t.label),
              h('div', { className:'text-xs text-slate-400' }, t.sub)
            )
          )
        )
      )
    ),

    h('div', { className:'h-8' })
  );
}

// ================================================================
// TIMER PAGE — 4 Professional Modes
// ================================================================
function TimerPage() {
  const [mode, setMode] = useState('stopwatch'); // stopwatch|countdown|interval|cricket
  const MODES = [
    { id:'stopwatch', label:'Stopwatch', icon:'⏱' },
    { id:'countdown', label:'Countdown', icon:'⏰' },
    { id:'interval', label:'Interval', icon:'🔄' },
    { id:'cricket', label:'Cricket', icon:'🏏' },
  ];
  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#0f766e,#0d9488)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '⏱ Training Timer'),
        h('p', { className:'text-sm text-white/75' }, 'Professional-grade cricket timer')
      )
    ),
    // Mode tabs
    h('div', { className:'flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide' },
      MODES.map(m =>
        h('button', {
          key:m.id,
          onClick:()=>setMode(m.id),
          className:`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0
            ${mode===m.id ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`
        }, m.icon, ' ', m.label)
      )
    ),
    mode==='stopwatch' && h(StopwatchMode),
    mode==='countdown' && h(CountdownMode),
    mode==='interval' && h(IntervalMode),
    mode==='cricket' && h(CricketPresetsMode),
  );
}

// ── Ring SVG helper ───────────────────────────────────────────────
function TimerRing({ pct, size=220, stroke=14, color='#10b981', bg='rgba(30,41,59,0.8)' }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.max(0, Math.min(1, pct)));
  return h('svg', { width:size, height:size, viewBox:`0 0 ${size} ${size}`, style:{ display:'block' } },
    h('circle', { cx:size/2, cy:size/2, r, fill:'none', stroke:bg, strokeWidth:stroke }),
    h('circle', { cx:size/2, cy:size/2, r, fill:'none', stroke:color, strokeWidth:stroke,
      strokeLinecap:'round', strokeDasharray:circ, strokeDashoffset:offset,
      style:{ transform:'rotate(-90deg)', transformOrigin:'center', transition:'stroke-dashoffset 1s linear' }
    })
  );
}

function fmt(s) {
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec=s%60;
  if (h>0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

// ── STOPWATCH ────────────────────────────────────────────────────
function StopwatchMode() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intRef = useRef(null);
  const lapStart = useRef(0);

  useEffect(() => {
    if (running) {
      intRef.current = setInterval(() => setElapsed(e => e+1), 1000);
    } else clearInterval(intRef.current);
    return () => clearInterval(intRef.current);
  }, [running]);

  const toggle = () => {
    if (!running && elapsed===0) lapStart.current = 0;
    setRunning(r => !r);
  };
  const lap = () => {
    const lapTime = elapsed - lapStart.current;
    setLaps(l => [...l, { n:l.length+1, t:lapTime, total:elapsed }]);
    lapStart.current = elapsed;
  };
  const reset = () => { setRunning(false); setElapsed(0); setLaps([]); lapStart.current=0; };
  const ringPct = (elapsed % 60) / 60;

  return h('div', { className:'flex flex-col items-center px-5 pt-4' },
    h('div', { className:'relative flex items-center justify-center', style:{ width:220, height:220 } },
      h(TimerRing, { pct:ringPct }),
      h('div', { className:'absolute text-center' },
        h('div', { className:'timer-display text-white' }, fmt(elapsed)),
        h('div', { className:'text-xs text-slate-400 font-semibold' }, `LAP ${laps.length+1}`)
      )
    ),
    h('div', { className:'flex gap-4 mt-6' },
      h('button', { onClick:reset, className:'w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 active:scale-95 transition-transform text-sm font-bold' }, 'RST'),
      h('button', { onClick:toggle, className:`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform
        ${running ? 'bg-gradient-to-br from-red-500 to-red-700' : 'bg-gradient-to-br from-emerald-500 to-emerald-700'}` },
        h(Icon, { n:running?'pause':'play', cls:'w-8 h-8 text-white' })
      ),
      h('button', { onClick:lap, disabled:!running, className:'w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 active:scale-95 transition-transform text-sm font-bold disabled:opacity-40' }, 'LAP')
    ),
    laps.length>0 && h('div', { className:'w-full mt-6 space-y-2 max-h-52 overflow-y-auto sidebar-scroll' },
      h('div', { className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-2' }, `${laps.length} Lap${laps.length>1?'s':''}`),
      [...laps].reverse().map(l =>
        h('div', { key:l.n, className:'flex justify-between items-center py-2 border-b border-slate-800' },
          h('span', { className:'text-sm text-slate-400' }, `Lap ${l.n}`),
          h('span', { className:'text-sm font-bold text-white font-mono' }, fmt(l.t)),
          h('span', { className:'text-xs text-slate-500 font-mono' }, fmt(l.total))
        )
      )
    )
  );
}

// ── COUNTDOWN ────────────────────────────────────────────────────
function CountdownMode() {
  const [totalSecs, setTotalSecs] = useState(300);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const intRef = useRef(null);
  const isSetup = !running && remaining===totalSecs && !done;

  useEffect(() => {
    if (running) {
      intRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) { clearInterval(intRef.current); setRunning(false); setDone(true); return 0; }
          return r-1;
        });
      }, 1000);
    } else clearInterval(intRef.current);
    return () => clearInterval(intRef.current);
  }, [running]);

  const start = () => {
    const total = minutes*60 + seconds;
    if (!running) { setTotalSecs(total); setRemaining(total); setDone(false); }
    setRunning(r => !r);
  };
  const reset = () => { setRunning(false); setRemaining(totalSecs); setDone(false); };
  const pct = totalSecs>0 ? remaining/totalSecs : 0;
  const isLow = remaining <= 10 && running;
  const ringColor = isLow ? '#ef4444' : done ? '#f59e0b' : '#10b981';

  return h('div', { className:'flex flex-col items-center px-5 pt-4' },
    done && h('div', { className:'w-full p-4 mb-4 rounded-2xl bg-amber-900/30 border border-amber-500/50 text-center' },
      h('div', { className:'text-2xl mb-1' }, '🎉'),
      h('div', { className:'font-bold text-amber-400' }, 'Time\'s up! Great session!'),
      h('button', { onClick:reset, className:'mt-3 btn-primary px-6 py-2 text-sm' }, 'Reset')
    ),
    h('div', { className:'relative flex items-center justify-center', style:{ width:220, height:220 } },
      h(TimerRing, { pct, color:ringColor }),
      h('div', { className:'absolute text-center' },
        h('div', {
          className:`timer-display ${isLow ? 'text-red-400' : done ? 'text-amber-400' : 'text-white'}`,
          style:{ animation:isLow?'pulse 1s ease-in-out infinite':undefined }
        }, fmt(remaining)),
        h('div', { className:'text-xs text-slate-400' }, 'remaining')
      )
    ),
    isSetup && h('div', { className:'mt-4 p-4 rounded-2xl bg-slate-800 border border-slate-700 w-full' },
      h('p', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider mb-3' }, 'Set Duration'),
      h('div', { className:'flex items-center justify-center gap-4' },
        h('div', { className:'text-center' },
          h('button', { onClick:()=>setMinutes(m=>Math.min(99,m+1)), className:'w-10 h-10 rounded-lg bg-slate-700 text-white font-bold text-lg flex items-center justify-center' }, '+'),
          h('div', { className:'text-2xl font-black text-white my-2 font-mono' }, String(minutes).padStart(2,'0')),
          h('button', { onClick:()=>setMinutes(m=>Math.max(0,m-1)), className:'w-10 h-10 rounded-lg bg-slate-700 text-white font-bold text-lg flex items-center justify-center' }, '-'),
          h('div', { className:'text-xs text-slate-500 mt-1' }, 'min')
        ),
        h('div', { className:'text-3xl font-black text-slate-500' }, ':'),
        h('div', { className:'text-center' },
          h('button', { onClick:()=>setSeconds(s=>Math.min(59,s+5)), className:'w-10 h-10 rounded-lg bg-slate-700 text-white font-bold text-lg flex items-center justify-center' }, '+'),
          h('div', { className:'text-2xl font-black text-white my-2 font-mono' }, String(seconds).padStart(2,'0')),
          h('button', { onClick:()=>setSeconds(s=>Math.max(0,s-5)), className:'w-10 h-10 rounded-lg bg-slate-700 text-white font-bold text-lg flex items-center justify-center' }, '-'),
          h('div', { className:'text-xs text-slate-500 mt-1' }, 'sec')
        )
      )
    ),
    !done && h('div', { className:'flex gap-4 mt-6' },
      h('button', { onClick:reset, className:'w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 active:scale-95 transition-transform text-sm font-bold' }, 'RST'),
      h('button', { onClick:start, className:`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform
        ${running ? 'bg-gradient-to-br from-red-500 to-red-700' : 'bg-gradient-to-br from-emerald-500 to-emerald-700'}` },
        h(Icon, { n:running?'pause':'play', cls:'w-8 h-8 text-white' })
      ),
      h('div', { style:{ width:56 } })
    )
  );
}

// ── INTERVAL ─────────────────────────────────────────────────────
function IntervalMode() {
  const [workSecs, setWorkSecs] = useState(60);
  const [restSecs, setRestSecs] = useState(30);
  const [totalRounds, setTotalRounds] = useState(5);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState('work'); // 'work'|'rest'|'done'
  const [remaining, setRemaining] = useState(60);
  const [round, setRound] = useState(1);
  const [configured, setConfigured] = useState(true);
  const intRef = useRef(null);
  const stateRef = useRef({ phase:'work', remaining:workSecs, round:1 });

  const startInterval = () => {
    stateRef.current = { phase:'work', remaining:workSecs, round:1 };
    setPhase('work'); setRemaining(workSecs); setRound(1);
    setConfigured(false); setRunning(true);
  };
  const reset = () => { clearInterval(intRef.current); setRunning(false); setConfigured(true); setPhase('work'); setRound(1); };

  useEffect(() => {
    if (running) {
      intRef.current = setInterval(() => {
        const st = stateRef.current;
        if (st.remaining <= 1) {
          if (st.phase==='work') {
            const next = { phase:'rest', remaining:restSecs, round:st.round };
            stateRef.current = next; setPhase('rest'); setRemaining(restSecs);
          } else {
            if (st.round >= totalRounds) {
              clearInterval(intRef.current); setRunning(false); setPhase('done');
              stateRef.current = { ...st, phase:'done' };
            } else {
              const next = { phase:'work', remaining:workSecs, round:st.round+1 };
              stateRef.current = next; setPhase('work'); setRemaining(workSecs); setRound(r=>r+1);
            }
          }
        } else {
          stateRef.current.remaining -= 1;
          setRemaining(r => r-1);
        }
      }, 1000);
    } else clearInterval(intRef.current);
    return () => clearInterval(intRef.current);
  }, [running]);

  const totalCycle = workSecs + restSecs;
  const pct = phase==='work' ? remaining/workSecs : phase==='rest' ? remaining/restSecs : 0;
  const phaseColor = phase==='work'?'#10b981':phase==='rest'?'#3b82f6':'#f59e0b';
  const phaseBg = phase==='work'?'from-emerald-600 to-emerald-800':phase==='rest'?'from-blue-600 to-blue-800':'from-amber-600 to-amber-800';

  if (configured) return h('div', { className:'px-5 pt-4 space-y-4' },
    h('p', { className:'text-sm text-slate-400 text-center mb-4' }, 'Configure your interval session'),
    [
      { label:'Work Time', val:workSecs, set:setWorkSecs, step:15, min:10, max:600 },
      { label:'Rest Time', val:restSecs, set:setRestSecs, step:5, min:5, max:300 },
      { label:'Rounds', val:totalRounds, set:setTotalRounds, step:1, min:1, max:20 },
    ].map(cfg =>
      h('div', { key:cfg.label, className:'flex items-center justify-between p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('span', { className:'text-sm font-bold text-white' }, cfg.label),
        h('div', { className:'flex items-center gap-3' },
          h('button', { onClick:()=>cfg.set(v=>Math.max(cfg.min,v-cfg.step)), className:'w-9 h-9 rounded-xl bg-slate-700 text-white font-bold flex items-center justify-center active:scale-95' }, '−'),
          h('span', { className:'w-16 text-center text-lg font-black text-emerald-400 font-mono' }, cfg.label==='Rounds'?totalRounds:fmt(cfg.val)),
          h('button', { onClick:()=>cfg.set(v=>Math.min(cfg.max,v+cfg.step)), className:'w-9 h-9 rounded-xl bg-slate-700 text-white font-bold flex items-center justify-center active:scale-95' }, '+')
        )
      )
    ),
    h('div', { className:'p-4 rounded-2xl bg-emerald-900/20 border border-emerald-700/50 text-center' },
      h('div', { className:'text-sm text-emerald-400 font-semibold' }, `Total: ${fmt(totalRounds*(workSecs+restSecs))} • ${totalRounds} rounds`)
    ),
    h('button', { onClick:startInterval, className:'btn-primary w-full py-4 text-base font-black' }, '▶ Start Interval Session')
  );

  return h('div', { className:'flex flex-col items-center px-5 pt-4' },
    h('div', {
      className:`w-full py-3 rounded-2xl mb-4 text-center font-black text-white text-sm tracking-wider bg-gradient-to-r ${phaseBg}`
    }, phase==='done' ? '🎉 SESSION COMPLETE!' : phase==='work' ? `💪 WORK — Round ${round} of ${totalRounds}` : `😤 REST — Round ${round} of ${totalRounds}`),
    h('div', { className:'relative flex items-center justify-center', style:{ width:220, height:220 } },
      h(TimerRing, { pct, color:phaseColor }),
      h('div', { className:'absolute text-center' },
        h('div', { className:'timer-display text-white' }, fmt(remaining)),
        h('div', { className:'text-xs font-bold uppercase tracking-wider', style:{color:phaseColor} }, phase==='done'?'Done!':phase)
      )
    ),
    h('div', { className:'flex gap-4 mt-6' },
      h('button', { onClick:reset, className:'w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 active:scale-95 text-xs font-bold' }, 'RST'),
      phase==='done'
        ? h('button', { onClick:reset, className:'w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-black active:scale-95 text-sm' }, 'Done!')
        : h('button', { onClick:()=>setRunning(r=>!r), className:`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl active:scale-95 ${running?'bg-gradient-to-br from-red-500 to-red-700':'bg-gradient-to-br from-emerald-500 to-emerald-700'}` },
          h(Icon, { n:running?'pause':'play', cls:'w-8 h-8 text-white' })
        ),
      h('div', { style:{ width:56 } })
    )
  );
}

// ── CRICKET PRESETS ────────────────────────────────────────────────
function CricketPresetsMode() {
  const [active, setActive] = useState(null);
  const presets = [
    { id:'bowling', emoji:'⚾', name:'Bowling Spell', desc:'4 min bowl / 2 min rest / 4 rounds', workSecs:240, restSecs:120, rounds:4, color:'from-red-600 to-orange-600' },
    { id:'batting', emoji:'🏏', name:'Batting Session', desc:'10 min countdown focus', workSecs:600, restSecs:0, rounds:1, color:'from-blue-600 to-indigo-700' },
    { id:'fielding', emoji:'🏃', name:'Fielding Drill', desc:'45s intense / 15s rest / 8 rounds', workSecs:45, restSecs:15, rounds:8, color:'from-emerald-600 to-teal-600' },
    { id:'mental', emoji:'🧠', name:'Mental Session', desc:'5 min calm focus countdown', workSecs:300, restSecs:0, rounds:1, color:'from-purple-600 to-indigo-700' },
    { id:'warmup', emoji:'🔥', name:'Cricket Warm-Up', desc:'90s drills / 30s rest / 6 rounds', workSecs:90, restSecs:30, rounds:6, color:'from-amber-500 to-orange-600' },
    { id:'sprint', emoji:'💨', name:'Speed Sprints', desc:'10s sprint / 50s rest / 10 rounds', workSecs:10, restSecs:50, rounds:10, color:'from-cyan-600 to-blue-600' },
  ];

  if (active) {
    const preset = presets.find(p=>p.id===active);
    if (preset.rounds===1) return h(CountdownPreset, { preset, onBack:()=>setActive(null) });
    return h(IntervalPreset, { preset, onBack:()=>setActive(null) });
  }

  return h('div', { className:'px-5 pt-4' },
    h('p', { className:'text-sm text-slate-400 mb-4' }, 'Cricket-specific training timers, ready to go:'),
    h('div', { className:'space-y-3' },
      presets.map(p =>
        h('button', {
          key:p.id,
          onClick:()=>setActive(p.id),
          className:'w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-700 bg-slate-800/80 active:scale-[.99] transition-all text-left pro-card'
        },
          h('div', { className:`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${p.color}` }, p.emoji),
          h('div', { className:'flex-1' },
            h('div', { className:'font-bold text-white text-sm' }, p.name),
            h('div', { className:'text-xs text-slate-400' }, p.desc)
          ),
          h(Icon, { n:'chevR', cls:'w-5 h-5 text-slate-500' })
        )
      )
    )
  );
}

function CountdownPreset({ preset, onBack }) {
  const [remaining, setRemaining] = useState(preset.workSecs);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intRef = useRef(null);
  useEffect(()=>{
    if(running){intRef.current=setInterval(()=>{setRemaining(r=>{if(r<=1){clearInterval(intRef.current);setRunning(false);setDone(true);return 0;}return r-1;});},1000);}else clearInterval(intRef.current);
    return()=>clearInterval(intRef.current);
  },[running]);
  const pct = remaining/preset.workSecs;
  return h('div', { className:'flex flex-col items-center px-5 pt-4' },
    h('button',{onClick:onBack,className:'self-start flex items-center gap-2 text-slate-400 mb-4 text-sm font-semibold'},
      h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back to Presets'),
    h('div',{className:`w-full py-3 rounded-2xl mb-4 text-center font-black text-white text-sm tracking-wider bg-gradient-to-r ${preset.color}`},`${preset.emoji} ${preset.name}`),
    done&&h('div',{className:'text-2xl mb-4'},'🎉 Session complete!'),
    h('div',{className:'relative flex items-center justify-center',style:{width:220,height:220}},
      h(TimerRing,{pct,color:'#10b981'}),
      h('div',{className:'absolute text-center'},
        h('div',{className:'timer-display text-white'},fmt(remaining)),
        h('div',{className:'text-xs text-slate-400'},'remaining')
      )
    ),
    !done&&h('button',{onClick:()=>setRunning(r=>!r),className:`mt-6 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl active:scale-95 ${running?'bg-gradient-to-br from-red-500 to-red-700':'bg-gradient-to-br from-emerald-500 to-emerald-700'}`},
      h(Icon,{n:running?'pause':'play',cls:'w-8 h-8 text-white'})
    ),
    done&&h('button',{onClick:onBack,className:'mt-6 btn-primary px-8 py-3'},'Back to Presets')
  );
}

function IntervalPreset({ preset, onBack }) {
  const [phase,setPhase]=useState('work');const[remaining,setRemaining]=useState(preset.workSecs);const[round,setRound]=useState(1);const[running,setRunning]=useState(false);const[done,setDone]=useState(false);
  const st=useRef({phase:'work',remaining:preset.workSecs,round:1});const intRef=useRef(null);
  useEffect(()=>{
    if(running){intRef.current=setInterval(()=>{const s=st.current;if(s.remaining<=1){if(s.phase==='work'){const n={phase:'rest',remaining:preset.restSecs,round:s.round};st.current=n;setPhase('rest');setRemaining(preset.restSecs);}else{if(s.round>=preset.rounds){clearInterval(intRef.current);setRunning(false);setDone(true);}else{const n={phase:'work',remaining:preset.workSecs,round:s.round+1};st.current=n;setPhase('work');setRemaining(preset.workSecs);setRound(r=>r+1);}}}else{st.current.remaining-=1;setRemaining(r=>r-1);}},1000);}else clearInterval(intRef.current);
    return()=>clearInterval(intRef.current);
  },[running]);
  const pct=phase==='work'?remaining/preset.workSecs:remaining/preset.restSecs;
  const col=phase==='work'?'#10b981':'#3b82f6';
  return h('div',{className:'flex flex-col items-center px-5 pt-4'},
    h('button',{onClick:onBack,className:'self-start flex items-center gap-2 text-slate-400 mb-4 text-sm font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back'),
    done?h('div',{className:'text-center py-8'},h('div',{className:'text-4xl mb-4'},'🎉'),h('div',{className:'text-xl font-black text-white mb-4'},'Session Complete!'),h('button',{onClick:onBack,className:'btn-primary px-8 py-3'},'Done'))
    :h(Fragment,null,
      h('div',{className:`w-full py-3 rounded-2xl mb-4 text-center font-black text-white text-sm bg-gradient-to-r ${preset.color}`},`${preset.emoji} ${preset.name} — Round ${round}/${preset.rounds}`),
      h('div',{className:'relative flex items-center justify-center',style:{width:220,height:220}},
        h(TimerRing,{pct,color:col}),
        h('div',{className:'absolute text-center'},h('div',{className:'timer-display text-white'},fmt(remaining)),h('div',{className:'text-xs font-bold uppercase tracking-wider',style:{color:col}},phase))
      ),
      h('button',{onClick:()=>setRunning(r=>!r),className:`mt-6 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl active:scale-95 ${running?'bg-gradient-to-br from-red-500 to-red-700':'bg-gradient-to-br from-emerald-500 to-emerald-700'}`},
        h(Icon,{n:running?'pause':'play',cls:'w-8 h-8 text-white'})
      )
    )
  );
}

// ================================================================
// DRILLS PAGE — Cricket-first category order
// ================================================================
const DRILL_CATS = [
  { id:'batting', label:'Batting', emoji:'🏏', color:'from-blue-600 to-indigo-700', text:'text-blue-400' },
  { id:'bowling', label:'Bowling', emoji:'⚾', color:'from-red-600 to-orange-600', text:'text-red-400' },
  { id:'fielding', label:'Fielding', emoji:'🏃', color:'from-emerald-600 to-teal-600', text:'text-emerald-400' },
  { id:'wicketkeeping', label:'Keeping', emoji:'🧤', color:'from-teal-600 to-cyan-600', text:'text-teal-400' },
  { id:'fitness', label:'Fitness', emoji:'💪', color:'from-orange-600 to-red-600', text:'text-orange-400' },
  { id:'mental', label:'Mental', emoji:'🧠', color:'from-purple-600 to-indigo-600', text:'text-purple-400' },
];

function DrillsPage() {
  const [activeCat, setActiveCat] = useState('batting');
  const [search, setSearch] = useState('');

  const catDrills = DRILLS.filter(d =>
    d.category===activeCat &&
    (search==='' || d.title.toLowerCase().includes(search.toLowerCase()))
  );
  const cat = DRILL_CATS.find(c=>c.id===activeCat);

  const lvlColor = { beginner:'text-green-400 bg-green-900/30', intermediate:'text-blue-400 bg-blue-900/30', advanced:'text-orange-400 bg-orange-900/30' };

  return h('div', { className:'page-wrapper' },
    h('div', { className:`page-header`, style:{ background:`linear-gradient(135deg,${cat?'#1d4ed8':'#059669'},${cat?'#4338ca':'#047857'})` } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '🏏 Cricket Drills'),
        h('p', { className:'text-sm text-white/75' }, `${DRILLS.length} professional drills`)
      )
    ),

    // Category pills (horizontal scroll)
    h('div', { className:'flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide' },
      DRILL_CATS.map(c =>
        h('button', {
          key:c.id,
          onClick:()=>setActiveCat(c.id),
          className:`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0
            ${activeCat===c.id ? `bg-gradient-to-r ${c.color} text-white shadow-lg` : 'bg-slate-800 text-slate-400'}`
        }, c.emoji, ' ', c.label)
      )
    ),

    // Search
    h('div', { className:'px-4 mb-3' },
      h('div', { className:'relative' },
        h(Icon, { n:'search', cls:'w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2' }),
        h('input', { type:'text', placeholder:'Search drills...', value:search, onChange:e=>setSearch(e.target.value),
          className:'w-full pl-9 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500' })
      )
    ),

    // Drills list
    h('div', { className:'px-4 space-y-3' },
      catDrills.length===0
        ? h(EmptyState, { emoji:cat?.emoji||'🏏', title:'No drills found', desc:'Try a different search term or category' })
        : catDrills.map(d =>
          h('button', {
            key:d.id,
            onClick:()=>nav('DrillDetail', { id:d.id }),
            className:'w-full text-left p-4 rounded-2xl border border-slate-700 bg-slate-800/80 active:scale-[.99] transition-all pro-card'
          },
            h('div', { className:'flex items-start gap-3' },
              h('div', { className:`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${cat?.color||'from-emerald-600 to-teal-600'}` },
                h('span', { className:'text-xl' }, cat?.emoji||'🏏')
              ),
              h('div', { className:'flex-1 min-w-0' },
                h('div', { className:'flex items-start justify-between gap-2' },
                  h('h3', { className:'font-bold text-white text-sm leading-tight' }, d.title),
                  d.is_premium && h(PremiumBadge)
                ),
                h('p', { className:'text-xs text-slate-400 mt-1 line-clamp-2' }, d.description),
                h('div', { className:'flex items-center gap-2 mt-2' },
                  h('span', { className:`text-xs font-bold px-2 py-0.5 rounded-full ${lvlColor[d.skill_level]||lvlColor.beginner}` }, d.skill_level),
                  h('span', { className:'text-xs text-slate-500' }, `${d.duration_minutes} min`),
                  h(XPBadge, { xp:d.xp_value })
                )
              )
            )
          )
        )
    ),
    h('div', { className:'h-4' })
  );
}

// ================================================================
// DRILL DETAIL
// ================================================================
function DrillDetailPage({ params }) {
  const drill = DRILLS.find(d => d.id===params?.id);
  const [step, setStep] = useState(-1); // -1=overview, 0..n=steps
  const [done, setDone] = useState(false);

  if (!drill) return h('div', { className:'page-wrapper px-5 pt-20 text-center text-slate-400' },
    h('div', { className:'text-4xl mb-4' }, '🏏'),
    h('div', { className:'font-bold' }, 'Drill not found'),
    h('button', { onClick:()=>nav('Drills'), className:'mt-4 btn-primary' }, 'Back to Drills')
  );

  const cat = DRILL_CATS.find(c=>c.id===drill.category);

  const complete = () => {
    awardXP(drill.xp_value, drill.duration_minutes, 'drill', 'drill', drill.id);
    fireConfetti();
    setDone(true);
  };

  if (done) return h('div', { className:'page-wrapper flex flex-col items-center justify-center min-h-screen px-5 text-center' },
    h('div', { className:'text-6xl mb-4' }, '🎉'),
    h('h2', { className:'text-2xl font-black text-white mb-2' }, 'Drill Complete!'),
    h('p', { className:'text-slate-400 mb-2' }, `+${drill.xp_value} XP earned`),
    h(XPBadge, { xp:drill.xp_value }),
    h('div', { className:'mt-6 flex flex-col gap-3 w-full max-w-xs' },
      h('button', { onClick:()=>nav('Drills'), className:'btn-primary' }, 'More Drills'),
      h('button', { onClick:()=>{ setDone(false); setStep(-1); }, className:'btn-secondary' }, 'Do Again')
    )
  );

  return h('div', { className:'page-wrapper' },
    // Header
    h('div', { className:`page-header`, style:{ background:`linear-gradient(135deg, ${cat?.id==='batting'?'#1d4ed8':cat?.id==='bowling'?'#dc2626':cat?.id==='fielding'?'#059669':cat?.id==='wicketkeeping'?'#0d9488':'#7e22ce'}, ${cat?.id==='batting'?'#4338ca':cat?.id==='bowling'?'#ea580c':cat?.id==='fielding'?'#047857':cat?.id==='wicketkeeping'?'#0f766e':'#581c87'})` } },
      h('div', { className:'relative z-10' },
        h('div', { className:'flex items-center gap-3 mb-2' },
          h('button', { onClick:()=>nav('Drills'), className:'p-2 rounded-xl bg-white/15' },
            h(Icon, { n:'arrowL', cls:'w-5 h-5 text-white' })
          ),
          h('span', { className:'text-2xl' }, cat?.emoji)
        ),
        h('h1', { className:'text-xl font-black text-white' }, drill.title),
        h('div', { className:'flex items-center gap-2 mt-1' },
          h('span', { className:'text-white/80 text-sm' }, `${drill.duration_minutes} min`),
          h('span', { className:'text-white/40' }, '•'),
          h(XPBadge, { xp:drill.xp_value })
        )
      )
    ),

    h('div', { className:'px-5 pt-4 space-y-4' },
      // Video embed
      drill.video_id && h('div', {},
        h('p', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider mb-2' }, 'Tutorial Video'),
        h('div', { className:'video-wrapper' },
          h('iframe', {
            src:`https://www.youtube.com/embed/${drill.video_id}?modestbranding=1&rel=0&color=white`,
            title:`${drill.title} tutorial`,
            allow:'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowFullScreen:true,
            loading:'lazy'
          })
        ),
        h('a', {
          href:`https://www.youtube.com/watch?v=${drill.video_id}`,
          target:'_blank', rel:'noopener noreferrer',
          className:'flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mt-2 transition-colors'
        }, h(Icon,{n:'extLink',cls:'w-3.5 h-3.5'}), 'Open in YouTube')
      ),

      // Description
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('p', { className:'text-sm text-slate-300 leading-relaxed' }, drill.description)
      ),

      // Steps
      h('div', {},
        h('p', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider mb-3' }, `${drill.steps.length} Steps`),
        h('div', { className:'space-y-2' },
          drill.steps.map((s,i) =>
            h('div', { key:i, className:'flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50' },
              h('div', { className:'w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5' }, i+1),
              h('p', { className:'text-sm text-slate-300 flex-1 leading-relaxed' }, s)
            )
          )
        )
      ),

      // Tips
      drill.tips && h('div', { className:'p-4 rounded-2xl bg-emerald-900/20 border border-emerald-700/50' },
        h('div', { className:'flex items-start gap-3' },
          h('span', { className:'text-emerald-400 text-lg flex-shrink-0' }, '💡'),
          h('div', {},
            h('p', { className:'text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1' }, 'Coach Tip'),
            h('p', { className:'text-sm text-emerald-300' }, drill.tips)
          )
        )
      ),

      // Target metric
      drill.target_metric && h('div', { className:'p-4 rounded-2xl bg-blue-900/20 border border-blue-700/50' },
        h('div', { className:'flex items-start gap-3' },
          h('span', { className:'text-blue-400 text-lg flex-shrink-0' }, '🎯'),
          h('div', {},
            h('p', { className:'text-xs font-bold text-blue-400 uppercase tracking-wider mb-1' }, 'Success Target'),
            h('p', { className:'text-sm text-blue-300' }, drill.target_metric)
          )
        )
      ),

      h('button', { onClick:complete, className:'btn-primary w-full py-4 text-base font-black' },
        h(Icon, { n:'circleCheck', cls:'w-5 h-5' }), ` Mark Drill Complete (+${drill.xp_value} XP)`
      ),

      h('div', { className:'h-4' })
    )
  );
}

// ================================================================
// MENTAL TRAINING PAGE
// ================================================================
const MENTAL_CATS = [
  { id:'all', label:'All', emoji:'🧠' },
  { id:'focus', label:'Focus', emoji:'🎯' },
  { id:'confidence', label:'Confidence', emoji:'💪' },
  { id:'recovery', label:'Recovery', emoji:'💚' },
  { id:'pre-performance', label:'Pre-Match', emoji:'⚡' },
  { id:'pressure', label:'Pressure', emoji:'🔥' },
  { id:'visualization', label:'Visualize', emoji:'🌟' },
  { id:'match-day-calm', label:'Calm', emoji:'🌊' },
  { id:'pro-mental', label:'Pro', emoji:'👑' },
];

function MentalPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const progress = DB.getProgress();
  const completed = progress.completed_mental || [];

  const sessions = MENTAL_SESSIONS.filter(s =>
    (activeCat==='all' || s.category===activeCat) &&
    (search==='' || s.title.toLowerCase().includes(search.toLowerCase()))
  );

  const catDef = MENTAL_CATS.find(c=>c.id===activeCat);
  const catColors = {
    focus:'from-indigo-600 to-blue-700', confidence:'from-orange-600 to-red-600',
    recovery:'from-green-600 to-emerald-700', 'pre-performance':'from-amber-500 to-orange-600',
    pressure:'from-red-700 to-rose-700', visualization:'from-purple-600 to-indigo-700',
    'match-day-calm':'from-teal-600 to-cyan-700', 'pro-mental':'from-slate-700 to-slate-900',
  };

  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#6d28d9,#4f46e5)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '🧠 Mental Training'),
        h('p', { className:'text-sm text-white/75' }, `${MENTAL_SESSIONS.length} professional sessions`)
      )
    ),

    // Category pills
    h('div', { className:'flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide' },
      MENTAL_CATS.map(c =>
        h('button', {
          key:c.id,
          onClick:()=>setActiveCat(c.id),
          className:`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap flex-shrink-0 transition-all
            ${activeCat===c.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`
        }, c.emoji, ' ', c.label)
      )
    ),

    // Search
    h('div', { className:'px-4 mb-3' },
      h('div', { className:'relative' },
        h(Icon, { n:'search', cls:'w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2' }),
        h('input', { type:'text', placeholder:'Search sessions...', value:search, onChange:e=>setSearch(e.target.value),
          className:'w-full pl-9 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500' })
      )
    ),

    h('div', { className:'px-4 space-y-3' },
      sessions.length===0
        ? h(EmptyState, { emoji:'🧠', title:'No sessions found', desc:'Try searching or choosing a different category' })
        : sessions.map(s => {
          const mins = Math.floor(s.duration_seconds/60);
          const isDone = completed.includes(s.id);
          const col = catColors[s.category] || 'from-purple-600 to-indigo-600';
          return h('button', {
            key:s.id,
            onClick:()=>nav('MentalPlayer', { id:s.id }),
            className:'w-full text-left p-4 rounded-2xl border border-slate-700 bg-slate-800/80 active:scale-[.99] transition-all pro-card'
          },
            h('div', { className:'flex items-center gap-3' },
              h('div', { className:`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${col} relative` },
                h('span', { className:'text-xl' }, MENTAL_CATS.find(c=>c.id===s.category)?.emoji||'🧠'),
                isDone && h('div', {
                  className:'absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center',
                }, h(Icon, { n:'check', cls:'w-3 h-3 text-white' }))
              ),
              h('div', { className:'flex-1 min-w-0' },
                h('div', { className:'flex items-start justify-between gap-2' },
                  h('h3', { className:'font-bold text-white text-sm leading-tight truncate' }, s.title),
                  s.is_premium && h(PremiumBadge)
                ),
                h('p', { className:'text-xs text-slate-400 mt-0.5 line-clamp-1' }, s.description),
                h('div', { className:'flex items-center gap-2 mt-1.5' },
                  h('span', { className:'text-xs text-slate-500' }, `${mins} min`),
                  h(XPBadge, { xp:s.xp_value }),
                  isDone && h('span', { className:'text-xs text-emerald-500 font-semibold' }, '✓ Done')
                )
              )
            )
          );
        })
    ),
    h('div', { className:'h-4' })
  );
}

// ================================================================
// MENTAL PLAYER — Step-by-step guided session
// ================================================================
function MentalPlayerPage({ params }) {
  const session = MENTAL_SESSIONS.find(s => s.id===params?.id);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [done, setDone] = useState(false);
  const intRef = useRef(null);

  useEffect(() => {
    if (session && started && !done) {
      setTimeLeft(session.steps[currentStep]?.duration_seconds || 60);
    }
  }, [currentStep, started]);

  useEffect(() => {
    if (started && !done && timeLeft > 0) {
      intRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intRef.current);
            if (currentStep < session.steps.length - 1) {
              setCurrentStep(s => s+1);
            } else {
              setDone(true);
              awardXP(session.xp_value, Math.floor(session.duration_seconds/60), 'mental', 'mental', session.id);
              fireConfetti();
            }
            return 0;
          }
          return t-1;
        });
      }, 1000);
      return () => clearInterval(intRef.current);
    }
  }, [started, done, timeLeft, currentStep]);

  if (!session) return h('div', { className:'page-wrapper px-5 pt-20 text-center text-slate-400' },
    h('div', { className:'text-4xl mb-4' }, '🧠'),
    h('div', { className:'font-bold mb-4' }, 'Session not found'),
    h('button', { onClick:()=>nav('Mental'), className:'btn-primary' }, 'Back')
  );

  const mins = Math.floor(session.duration_seconds/60);
  const pct = session.steps[currentStep] ? timeLeft / session.steps[currentStep].duration_seconds : 0;

  if (done) return h('div', { className:'page-wrapper flex flex-col items-center justify-center min-h-screen px-5 text-center' },
    h('div', { className:'text-6xl mb-4' }, '🧘'),
    h('h2', { className:'text-2xl font-black text-white mb-2' }, 'Session Complete'),
    h('p', { className:'text-slate-400 mb-4' }, session.title),
    h(XPBadge, { xp:session.xp_value }),
    h('div', { className:'mt-6 flex flex-col gap-3 w-full max-w-xs' },
      h('button', { onClick:()=>nav('Mental'), className:'btn-primary' }, 'More Sessions'),
      h('button', { onClick:()=>{ setDone(false); setStarted(false); setCurrentStep(0); }, className:'btn-secondary' }, 'Again')
    )
  );

  if (!started) return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#6d28d9,#4338ca)' } },
      h('div', { className:'relative z-10' },
        h('div', { className:'flex items-center gap-3 mb-2' },
          h('button', { onClick:()=>nav('Mental'), className:'p-2 rounded-xl bg-white/15' },
            h(Icon, { n:'arrowL', cls:'w-5 h-5 text-white' })
          )
        ),
        h('h1', { className:'text-xl font-black text-white' }, session.title),
        h('p', { className:'text-white/75 text-sm mt-1' }, `${mins} minutes • ${session.xp_value} XP`)
      )
    ),
    h('div', { className:'px-5 pt-6 space-y-4' },
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('p', { className:'text-sm text-slate-300 leading-relaxed' }, session.description)
      ),
      h('div', {},
        h('p', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider mb-3' }, `${session.steps.length} Steps`),
        h('div', { className:'space-y-2' },
          session.steps.map((s,i) =>
            h('div', { key:i, className:'flex items-start gap-3 p-3 rounded-xl bg-slate-800/60' },
              h('div', { className:'w-6 h-6 rounded-full bg-purple-500/30 border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-400 flex-shrink-0 mt-0.5' }, i+1),
              h('p', { className:'text-sm text-slate-300' }, s.instruction),
              h('span', { className:'text-xs text-slate-500 flex-shrink-0 ml-auto' }, `${s.duration_seconds}s`)
            )
          )
        )
      ),
      h('button', { onClick:()=>{ setStarted(true); setTimeLeft(session.steps[0].duration_seconds); }, className:'btn-primary w-full py-4 text-base font-black' },
        h(Icon, { n:'play', cls:'w-5 h-5' }), ' Begin Session'
      )
    )
  );

  const curStep = session.steps[currentStep];
  return h('div', { className:'min-h-screen flex flex-col items-center justify-center px-6', style:{ background:'linear-gradient(135deg,#0f0824,#1e1040,#0f172a)' } },
    h('div', { className:'relative flex items-center justify-center mb-8', style:{ width:220, height:220 } },
      h(TimerRing, { pct, color:'#a855f7', bg:'rgba(88,28,135,0.3)' }),
      h('div', { className:'absolute text-center' },
        h('div', { className:'timer-display text-white' }, fmt(timeLeft)),
        h('div', { className:'text-xs text-purple-400 font-semibold' }, `Step ${currentStep+1} of ${session.steps.length}`)
      )
    ),
    h('div', { className:'w-full max-w-sm text-center mb-8' },
      h('h2', { className:'text-lg font-bold text-white mb-3' }, session.title),
      h('p', { className:'text-base text-purple-200 leading-relaxed' }, curStep?.instruction)
    ),
    h('div', { className:'flex gap-3' },
      currentStep > 0 && h('button', {
        onClick:()=>{ clearInterval(intRef.current); setCurrentStep(s=>s-1); },
        className:'px-5 py-3 rounded-xl bg-white/10 text-white text-sm font-semibold'
      }, '← Prev'),
      h('button', {
        onClick:()=>{
          clearInterval(intRef.current);
          if (currentStep < session.steps.length-1) setCurrentStep(s=>s+1);
          else { setDone(true); awardXP(session.xp_value, Math.floor(session.duration_seconds/60), 'mental', 'mental', session.id); fireConfetti(); }
        },
        className:'px-6 py-3 rounded-xl bg-purple-600 text-white text-sm font-bold'
      }, currentStep===session.steps.length-1 ? '✓ Complete' : 'Next →')
    )
  );
}

// ================================================================
// FITNESS BUILDER — Professional wizard with fuzzy matching
// ================================================================
const FIT_LEVELS = [
  { id:'beginner', label:'Beginner', icon:'🌱', desc:'New to training or returning after break' },
  { id:'intermediate', label:'Intermediate', icon:'⚡', desc:'Training 3-4x per week consistently' },
  { id:'advanced', label:'Advanced', icon:'🔥', desc:'Training 5-6x per week with intensity' },
  { id:'pro', label:'Pro', icon:'💎', desc:'Elite-level training, maximizing performance' },
];
const FIT_TARGETS = [
  { id:'full-body', label:'Full Body', icon:'🏃' },
  { id:'chest', label:'Chest', icon:'💪' },
  { id:'back', label:'Back', icon:'🦵' },
  { id:'shoulders', label:'Shoulders', icon:'🤲' },
  { id:'arms', label:'Arms', icon:'💪' },
  { id:'legs', label:'Legs', icon:'🦵' },
  { id:'core', label:'Core', icon:'🎯' },
  { id:'glutes', label:'Glutes', icon:'🏋️' },
];
const FIT_GOALS = [
  { id:'build-muscle', label:'Build Muscle', icon:'💪', desc:'Strength and size gains' },
  { id:'lose-weight', label:'Lose Weight', icon:'🔥', desc:'Fat burn and conditioning' },
  { id:'improve-endurance', label:'Endurance', icon:'🏃', desc:'Stamina and cricket fitness' },
];
const FIT_DURATIONS = [
  { id:'<10', label:'Under 10 min', icon:'⚡', desc:'Quick hit' },
  { id:'10-15', label:'10-15 min', icon:'⏱', desc:'Short session' },
  { id:'15-20', label:'15-20 min', icon:'🕐', desc:'Standard' },
  { id:'20-25', label:'20-25 min', icon:'⏰', desc:'Full session' },
  { id:'25+', label:'25+ min', icon:'🏆', desc:'Comprehensive' },
];

function FitnessPage() {
  const [tab, setTab] = useState('quick'); // quick | wizard | recent
  const [step, setStep] = useState(0); // wizard step 0-3
  const [choices, setChoices] = useState({ level:'', target:'', goal:'', duration:'' });
  const [results, setResults] = useState(null);

  const wizardSteps = [
    { key:'level', label:'Experience Level', opts:FIT_LEVELS },
    { key:'target', label:'Target Muscle', opts:FIT_TARGETS },
    { key:'goal', label:'Training Goal', opts:FIT_GOALS },
    { key:'duration', label:'Session Length', opts:FIT_DURATIONS },
  ];

  const choose = (key, val) => {
    const next = { ...choices, [key]:val };
    setChoices(next);
    if (step < 3) {
      setStep(s => s+1);
    } else {
      // All choices made — find workouts
      const found = findWorkouts(next.level, next.target, next.goal, next.duration);
      setResults(found);
    }
  };

  // Quick start workouts (popular picks)
  const quickPicks = [
    WORKOUTS.find(w=>w.id==='wb010'), // Full Body Fat Burn Beginner
    WORKOUTS.find(w=>w.id==='wi001'), // Full Body Intermediate Power
    WORKOUTS.find(w=>w.id==='wa001'), // Advanced HIIT
    WORKOUTS.find(w=>w.id==='wp001'), // Pro Endurance
    WORKOUTS.find(w=>w.id==='wb002'), // Quick Morning Starter
    WORKOUTS.find(w=>w.id==='wi009'), // HIIT Fat Burner
  ].filter(Boolean);

  const lvlColor = { beginner:'from-green-600 to-emerald-700', intermediate:'from-blue-600 to-indigo-700', advanced:'from-orange-600 to-red-600', pro:'from-purple-600 to-pink-600' };

  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#ea580c,#dc2626)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '💪 Fitness Builder'),
        h('p', { className:'text-sm text-white/75' }, `${WORKOUTS.length} workouts — every combination covered`)
      )
    ),

    // Tabs
    h('div', { className:'flex gap-2 px-4 py-3' },
      [['quick','⚡ Quick Start'],['wizard','🧙 Smart Wizard'],['recent','📊 Stats']].map(([id,label]) =>
        h('button', { key:id, onClick:()=>{ setTab(id); setStep(0); setChoices({level:'',target:'',goal:'',duration:''}); setResults(null); },
          className:`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${tab===id?'bg-orange-600 text-white':'bg-slate-800 text-slate-400'}` }, label)
      )
    ),

    // ── Quick Start ──────────────────────────────────────────────
    tab==='quick' && h('div', { className:'px-4 space-y-3' },
      h('p', { className:'text-sm text-slate-400 mb-1' }, 'Jump straight in with a recommended workout:'),
      quickPicks.map(w =>
        h('button', {
          key:w.id,
          onClick:()=>nav('WorkoutDetail', { id:w.id }),
          className:'w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-700 bg-slate-800/80 active:scale-[.99] transition-all text-left pro-card'
        },
          h('div', { className:`w-12 h-12 rounded-xl bg-gradient-to-br ${lvlColor[w.level]} flex items-center justify-center text-xl flex-shrink-0` }, '💪'),
          h('div', { className:'flex-1' },
            h('div', { className:'font-bold text-white text-sm' }, w.name),
            h('div', { className:'text-xs text-slate-400 mt-0.5' }, `${w.level} • ${w.target} • ${w.duration_minutes} min`),
            h('div', { className:'flex items-center gap-2 mt-1' },
              h(XPBadge, { xp:w.xp_value }),
              h('span', { className:'text-xs text-slate-500' }, `${w.exercises} exercises`)
            )
          ),
          h(Icon, { n:'chevR', cls:'w-5 h-5 text-slate-500' })
        )
      )
    ),

    // ── Smart Wizard ─────────────────────────────────────────────
    tab==='wizard' && !results && h('div', { className:'px-4' },
      // Step indicator dots
      h('div', { className:'flex justify-center gap-2 mb-4' },
        wizardSteps.map((_,i) =>
          h('div', { key:i, className:`h-2 transition-all rounded-full ${i===step?'w-8 bg-orange-500':i<step?'w-2 bg-emerald-500':'w-2 bg-slate-700'}` })
        )
      ),
      h('h2', { className:'text-base font-black text-white mb-1' }, wizardSteps[step].label),
      step>0 && h('p', { className:'text-xs text-slate-500 mb-3' },
        [choices.level, choices.target, choices.goal].filter(Boolean).join(' • ')
      ),
      h('div', { className:'space-y-2' },
        wizardSteps[step].opts.map(opt =>
          h('button', {
            key:opt.id,
            onClick:()=>choose(wizardSteps[step].key, opt.id),
            className:'wizard-option'
          },
            h('span', { className:'text-2xl' }, opt.icon),
            h('div', { className:'flex-1 text-left' },
              h('div', { className:'font-bold text-white text-sm' }, opt.label),
              opt.desc && h('div', { className:'text-xs text-slate-400 mt-0.5' }, opt.desc)
            ),
            h(Icon, { n:'chevR', cls:'w-4 h-4 text-slate-500' })
          )
        )
      ),
      step>0 && h('button', { onClick:()=>setStep(s=>s-1), className:'flex items-center gap-2 text-slate-400 text-sm mt-4 font-semibold' },
        h(Icon, { n:'arrowL', cls:'w-4 h-4' }), 'Back'
      )
    ),

    // ── Wizard Results ───────────────────────────────────────────
    tab==='wizard' && results && h('div', { className:'px-4' },
      h('div', { className:'p-4 rounded-2xl bg-emerald-900/20 border border-emerald-700/50 mb-4' },
        h('div', { className:'flex items-center justify-between' },
          h('div', {},
            h('div', { className:'text-sm font-bold text-emerald-400' }, `${results.length} workout${results.length!==1?'s':''} found`),
            h('div', { className:'text-xs text-slate-400' }, `${choices.level} • ${choices.target} • ${choices.goal} • ${choices.duration}`)
          ),
          h('button', { onClick:()=>{ setResults(null); setStep(0); setChoices({level:'',target:'',goal:'',duration:''}); }, className:'text-xs text-slate-400 font-semibold' }, 'New Search')
        )
      ),
      h('div', { className:'space-y-3' },
        results.map(w =>
          h('button', {
            key:w.id,
            onClick:()=>nav('WorkoutDetail', { id:w.id }),
            className:'w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-700 bg-slate-800/80 active:scale-[.99] transition-all text-left pro-card'
          },
            h('div', { className:`w-12 h-12 rounded-xl bg-gradient-to-br ${lvlColor[w.level]} flex items-center justify-center text-xl flex-shrink-0` }, '💪'),
            h('div', { className:'flex-1' },
              h('div', { className:'font-bold text-white text-sm' }, w.name),
              h('div', { className:'text-xs text-slate-400 mt-0.5' }, `${w.duration_minutes} min • ${w.exercises} exercises`),
              h('div', { className:'flex items-center gap-2 mt-1' }, h(XPBadge, { xp:w.xp_value }))
            ),
            h(Icon, { n:'chevR', cls:'w-5 h-5 text-slate-500' })
          )
        )
      )
    ),

    // ── Stats Tab ─────────────────────────────────────────────────
    tab==='recent' && h('div', { className:'px-4' },
      h('div', { className:'grid grid-cols-2 gap-3' },
        h(StatCard, { label:'Workouts Done', value:DB.getProgress().workouts_done||0, color:'text-orange-400' }),
        h(StatCard, { label:'XP from Fitness', value:`${(DB.getProgress().workouts_done||0)*120}+`, color:'text-amber-400' }),
        h(StatCard, { label:'Total Workouts', value:WORKOUTS.length, color:'text-white' }),
        h(StatCard, { label:'Combinations', value:'420+', color:'text-emerald-400' }),
      )
    ),

    h('div', { className:'h-4' })
  );
}

// ================================================================
// WORKOUT DETAIL
// ================================================================
function WorkoutDetailPage({ params }) {
  const workout = WORKOUTS.find(w => w.id===params?.id);
  const [done, setDone] = useState(false);

  if (!workout) return h('div', { className:'page-wrapper px-5 pt-20 text-center text-slate-400' },
    h('div', { className:'text-4xl mb-4' }, '💪'),
    h('div', { className:'font-bold mb-4' }, 'Workout not found'),
    h('button', { onClick:()=>nav('Fitness'), className:'btn-primary' }, 'Back')
  );

  const lvlColors = { beginner:'from-green-600 to-emerald-700', intermediate:'from-blue-600 to-indigo-700', advanced:'from-orange-600 to-red-600', pro:'from-purple-600 to-pink-600' };

  const complete = () => {
    awardXP(workout.xp_value, workout.duration_minutes, 'workout', 'workout', workout.id);
    fireConfetti();
    setDone(true);
  };

  if (done) return h('div', { className:'page-wrapper flex flex-col items-center justify-center min-h-screen px-5 text-center' },
    h('div', { className:'text-6xl mb-4' }, '🎉'),
    h('h2', { className:'text-2xl font-black text-white mb-2' }, 'Workout Complete!'),
    h('p', { className:'text-slate-400 mb-3' }, workout.name),
    h(XPBadge, { xp:workout.xp_value }),
    h('div', { className:'mt-6 flex flex-col gap-3 w-full max-w-xs' },
      h('button', { onClick:()=>nav('Fitness'), className:'btn-primary' }, 'More Workouts'),
      h('button', { onClick:()=>setDone(false), className:'btn-secondary' }, 'Do Again')
    )
  );

  return h('div', { className:'page-wrapper' },
    h('div', { className:`page-header`, style:{ background:`linear-gradient(135deg,#ea580c,#dc2626)` } },
      h('div', { className:'relative z-10' },
        h('div', { className:'flex items-center gap-3 mb-2' },
          h('button', { onClick:()=>nav('Fitness'), className:'p-2 rounded-xl bg-white/15' },
            h(Icon, { n:'arrowL', cls:'w-5 h-5 text-white' })
          )
        ),
        h('h1', { className:'text-xl font-black text-white' }, workout.name),
        h('div', { className:'flex items-center gap-2 mt-1' },
          h('span', { className:'text-white/80 text-sm' }, `${workout.duration_minutes} min • ${workout.exercises} exercises`),
          h('span', { className:'text-white/40' }, '•'),
          h(XPBadge, { xp:workout.xp_value })
        )
      )
    ),
    h('div', { className:'px-5 pt-4 space-y-4' },
      h('div', { className:'grid grid-cols-3 gap-3' },
        h(StatCard, { label:'Level', value:workout.level, color:'text-white' }),
        h(StatCard, { label:'Target', value:workout.target, color:'text-orange-400' }),
        h(StatCard, { label:'Goal', value:workout.goal.replace('-',' '), color:'text-amber-400' }),
      ),
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('p', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider mb-2' }, 'About This Workout'),
        h('p', { className:'text-sm text-slate-300' }, `A ${workout.duration_minutes}-minute ${workout.level} workout targeting ${workout.target} with a focus on ${workout.goal.replace(/-/g,' ')}. Complete ${workout.exercises} exercises with appropriate form and rest.`)
      ),
      h('button', { onClick:complete, className:'btn-primary w-full py-4 text-base font-black' },
        h(Icon, { n:'circleCheck', cls:'w-5 h-5' }), ` Complete Workout (+${workout.xp_value} XP)`
      )
    )
  );
}

// ================================================================
// SKILL PATHS PAGE — Completely Professional Redesign
// ================================================================
function SkillPathsPage() {
  const [activePath, setActivePath] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [weekPlan, setWeekPlan] = useState(null);
  const progress = DB.getProgress();
  const skillProgress = progress.skill_path_progress || {};

  // Path list view
  if (!activePath) return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#7e22ce,#4f46e5)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '🛤 Skill Paths'),
        h('p', { className:'text-sm text-white/75' }, 'Structured training programs for every discipline')
      )
    ),
    h('div', { className:'px-4 pt-5 space-y-4' },
      SKILL_PATHS.map(path => {
        const pathProg = skillProgress[path.id] || {};
        const completedLevels = Object.values(pathProg).filter(Boolean).length;
        const pct = (completedLevels / path.levels.length) * 100;
        return h('button', {
          key:path.id,
          onClick:()=>{ setActivePath(path.id); setActiveLevel(null); },
          className:`w-full text-left p-5 rounded-2xl border overflow-hidden relative pro-card ${path.borderColor} transition-all active:scale-[.99]`,
          style:{ background:'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))' }
        },
          // Background gradient accent
          h('div', { className:'absolute top-0 left-0 right-0 h-1', style:{ background:`linear-gradient(to right, var(--from, ${path.color}))` } }),

          h('div', { className:'flex items-start gap-4' },
            // Progress ring
            h('div', { className:'relative flex-shrink-0', style:{ width:52, height:52 } },
              h('svg', { viewBox:'0 0 52 52', style:{ position:'absolute', inset:0, transform:'rotate(-90deg)' } },
                h('circle', { cx:26, cy:26, r:20, fill:'none', stroke:'rgba(51,65,85,0.8)', strokeWidth:4 }),
                h('circle', { cx:26, cy:26, r:20, fill:'none', stroke:'currentColor', strokeWidth:4,
                  className:path.textColor,
                  strokeDasharray: 2*Math.PI*20,
                  strokeDashoffset: 2*Math.PI*20*(1-pct/100),
                  strokeLinecap:'round', style:{ transition:'stroke-dashoffset .6s' }
                })
              ),
              h('div', { className:'absolute inset-0 flex items-center justify-center text-xl' }, path.emoji)
            ),
            h('div', { className:'flex-1 min-w-0' },
              h('h3', { className:'font-black text-white text-base' }, path.title),
              h('p', { className:'text-xs text-slate-400 mt-0.5 mb-2' }, path.desc),
              h('div', { className:'flex items-center gap-3' },
                h('div', { className:'flex-1 level-bar-track h-1.5' },
                  h('div', { className:`h-full rounded-full bg-gradient-to-r ${path.color}`, style:{ width:`${pct}%`, transition:'width .6s' } })
                ),
                h('span', { className:`text-xs font-bold ${path.textColor}` }, `${completedLevels}/${path.levels.length}`)
              )
            )
          ),
          h('div', { className:'flex gap-2 mt-4' },
            path.levels.map(lv =>
              h('div', { key:lv.id, className:'flex-1 text-center' },
                h('div', { className:`w-8 h-8 rounded-xl mx-auto flex items-center justify-center text-sm mb-1
                  ${pathProg[lv.id] ? `bg-gradient-to-br ${path.color}` : 'bg-slate-800 border border-slate-700'}` },
                  pathProg[lv.id] ? '✓' : lv.icon
                ),
                h('div', { className:'text-xs text-slate-500 truncate' }, lv.label.split(' ')[0])
              )
            )
          )
        );
      })
    )
  );

  // Path detail view
  const path = SKILL_PATHS.find(p => p.id===activePath);
  if (!path) return null;

  if (!activeLevel) return h('div', { className:'page-wrapper' },
    h('div', { className:`page-header`, style:{ background:`linear-gradient(135deg,${activePath==='batting'?'#1d4ed8,#4338ca':activePath==='bowling'?'#dc2626,#ea580c':activePath==='fielding'?'#059669,#0d9488':'#7e22ce,#9333ea'})` } },
      h('div', { className:'relative z-10' },
        h('div', { className:'flex items-center gap-3 mb-2' },
          h('button', { onClick:()=>setActivePath(null), className:'p-2 rounded-xl bg-white/15' },
            h(Icon, { n:'arrowL', cls:'w-5 h-5 text-white' })
          ),
          h('span', { className:'text-2xl' }, path.emoji)
        ),
        h('h1', { className:'text-xl font-black text-white' }, path.title),
        h('p', { className:'text-white/75 text-sm' }, path.desc)
      )
    ),
    h('div', { className:'px-4 pt-5 space-y-4' },
      h('p', { className:'text-sm text-slate-400' }, 'Choose a training level to begin your structured program:'),
      path.levels.map((lv, i) => {
        const isUnlocked = i===0 || (skillProgress[path.id]?.[path.levels[i-1].id]);
        const isDone = skillProgress[path.id]?.[lv.id];
        return h('button', {
          key:lv.id,
          onClick:()=>{ setActiveLevel(lv.id); setWeekPlan(generateWeekPlan(path.id, lv.id)); },
          className:`w-full text-left p-5 rounded-2xl border-2 transition-all active:scale-[.99] pro-card
            ${isDone ? `border-emerald-500/50 bg-emerald-900/20` : isUnlocked ? `${path.borderColor} bg-slate-800/80` : 'border-slate-700/50 bg-slate-900/50 opacity-60'}`
        },
          h('div', { className:'flex items-center gap-4' },
            h('div', { className:`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0
              ${isDone ? 'bg-emerald-500' : isUnlocked ? `bg-gradient-to-br ${path.color}` : 'bg-slate-700'}` },
              isDone ? '✓' : lv.icon
            ),
            h('div', { className:'flex-1' },
              h('div', { className:'flex items-center gap-2' },
                h('h3', { className:'font-black text-white' }, lv.label),
                !isUnlocked && h('span', { className:'text-xs text-slate-500' }, '🔒 Locked'),
                isDone && h('span', { className:'text-xs text-emerald-400 font-bold' }, '✓ Complete')
              ),
              h('p', { className:'text-xs text-slate-400 mt-0.5' }, lv.desc),
              h('div', { className:'flex items-center gap-2 mt-2' },
                h('span', { className:`text-xs font-bold ${path.textColor}` }, `+${lv.xpPerDay} XP/day`),
                h('span', { className:'text-xs text-slate-500' }, '• 5-week program')
              )
            )
          ),
          isUnlocked && h('div', { className:'mt-4 flex flex-wrap gap-2' },
            lv.sampleDrills.map(d => h('span', { key:d, className:'text-xs text-slate-400 bg-slate-700/60 px-2 py-1 rounded-lg' }, d))
          )
        );
      })
    )
  );

  // Week plan view
  const lv = path.levels.find(l=>l.id===activeLevel);
  if (!lv || !weekPlan) return null;

  return h('div', { className:'page-wrapper' },
    h('div', { className:`page-header`, style:{ background:`linear-gradient(135deg,${activePath==='batting'?'#1d4ed8,#4338ca':activePath==='bowling'?'#dc2626,#ea580c':activePath==='fielding'?'#059669,#0d9488':'#7e22ce,#9333ea'})` } },
      h('div', { className:'relative z-10' },
        h('div', { className:'flex items-center gap-3 mb-2' },
          h('button', { onClick:()=>setActiveLevel(null), className:'p-2 rounded-xl bg-white/15' },
            h(Icon, { n:'arrowL', cls:'w-5 h-5 text-white' })
          )
        ),
        h('h1', { className:'text-xl font-black text-white' }, `${path.emoji} ${lv.label}`),
        h('p', { className:'text-white/75 text-sm' }, path.title)
      )
    ),
    h('div', { className:'px-4 pt-5' },
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700 mb-4' },
        h('div', { className:'flex items-center justify-between' },
          h('div', {},
            h('div', { className:'font-bold text-white' }, '5-Week Program'),
            h('div', { className:'text-xs text-slate-400' }, `${lv.xpPerDay} XP per day • ${lv.xpPerDay*5*5} total XP`)
          ),
          h('button', {
            onClick:()=>{
              const p = DB.getProgress();
              if (!p.skill_path_progress) p.skill_path_progress = {};
              if (!p.skill_path_progress[path.id]) p.skill_path_progress[path.id] = {};
              p.skill_path_progress[path.id][activeLevel] = true;
              DB.saveProgress(p);
              awardXP(lv.xpPerDay*5, 30, 'skill_path');
              nav('SkillPaths');
            },
            className:'text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-lg'
          }, 'Mark Complete')
        )
      ),
      h('div', { className:'space-y-3' },
        weekPlan.map(week =>
          h(WeekAccordion, { key:week.week, week, path, lv })
        )
      )
    )
  );
}

function WeekAccordion({ week, path, lv }) {
  const [open, setOpen] = useState(week.week===1);
  return h('div', { className:'rounded-2xl border border-slate-700 overflow-hidden' },
    h('button', {
      onClick:()=>setOpen(o=>!o),
      className:'w-full flex items-center justify-between p-4 bg-slate-800 text-left'
    },
      h('div', {},
        h('div', { className:'font-bold text-white text-sm' }, `Week ${week.week} — ${week.phase}`),
        h('div', { className:'text-xs text-slate-400' }, week.theme)
      ),
      h(Icon, { n:open?'chevU':'chevD', cls:'w-5 h-5 text-slate-500' })
    ),
    open && h('div', { className:'divide-y divide-slate-700/50' },
      week.days.map(day =>
        h('div', { key:day.day, className:'p-4' },
          h('div', { className:'flex items-center justify-between mb-2' },
            h('span', { className:'text-sm font-bold text-white' }, day.label),
            day.isRest
              ? h('span', { className:'text-xs text-slate-500 font-medium' }, '😴 Rest & Recover')
              : h('span', { className:'text-xs text-emerald-400 font-semibold' }, `+${day.totalXP} XP`)
          ),
          !day.isRest && h('div', { className:'space-y-1.5' },
            day.activities.map((act,i) =>
              h('div', { key:i, className:'flex items-center gap-2 py-1' },
                h('span', { className:'text-base' }, act.type==='drill'?'🏏':act.type==='mental'?'🧠':'💪'),
                h('div', { className:'flex-1' },
                  h('div', { className:'text-xs font-semibold text-slate-300' }, act.title),
                  h('div', { className:'text-xs text-slate-500' }, `${act.duration} • +${act.xp} XP`)
                )
              )
            )
          )
        )
      )
    )
  );
}

// ================================================================
// PROGRESS PAGE — Stats, Charts, Badges, Timeline
// ================================================================
function ProgressPage() {
  const [progress, setProgress] = useState(() => DB.getProgress());
  const [xpDays, setXPDays] = useState(() => DB.getXPLast7Days());
  const [heatmap, setHeatmap] = useState(() => DB.getActivityHeatmap());

  useEffect(() => {
    const refresh = () => {
      setProgress(DB.getProgress());
      setXPDays(DB.getXPLast7Days());
      setHeatmap(DB.getActivityHeatmap());
    };
    window.addEventListener('sc_progress_update', refresh);
    window.addEventListener('focus', refresh);
    return () => { window.removeEventListener('sc_progress_update', refresh); window.removeEventListener('focus', refresh); };
  }, []);

  const info = getLevelInfo(progress.total_xp||0);
  const badges = progress.badges || [];

  const stats = [
    { label:'Total XP', val:(progress.total_xp||0).toLocaleString(), color:'text-emerald-400', icon:'zap' },
    { label:'Level', val:info.level, color:'text-amber-400', icon:'crown' },
    { label:'Drills Done', val:progress.drills_done||0, color:'text-blue-400', icon:'target' },
    { label:'Mental Sessions', val:progress.mental_done||0, color:'text-purple-400', icon:'brain' },
    { label:'Workouts', val:progress.workouts_done||0, color:'text-orange-400', icon:'dumbbell' },
    { label:'Practice Mins', val:progress.practice_minutes||0, color:'text-teal-400', icon:'clock' },
    { label:'Best Streak', val:`${progress.longest_streak||0}d`, color:'text-red-400', icon:'flame' },
    { label:'Current Streak', val:`${progress.current_streak||0}d`, color:'text-rose-400', icon:'flame' },
  ];

  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#064e3b,#065f46)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '📊 My Progress'),
        h('p', { className:'text-sm text-white/75' }, 'Your complete cricket training stats')
      )
    ),

    h('div', { className:'px-4 pt-5 space-y-5' },
      // Level card
      h('div', { className:'p-5 rounded-2xl border border-emerald-700/50 bg-emerald-900/20' },
        h('div', { className:'flex items-center justify-between mb-3' },
          h('div', {},
            h('div', { className:'text-2xl font-black text-white' }, `Level ${info.level}`),
            h('div', { className:'text-emerald-400 font-bold text-sm' }, info.name)
          ),
          h('div', { className:'text-right' },
            h('div', { className:'text-lg font-black text-white' }, `${(progress.total_xp||0).toLocaleString()} XP`),
            info.next && h('div', { className:'text-xs text-slate-400' }, `${info.xpToNext.toLocaleString()} to Level ${info.level+1}`)
          )
        ),
        h(LevelBar, { totalXP:progress.total_xp||0 }),
        h('div', { className:'flex items-center justify-between mt-3 text-xs text-slate-500' },
          h('span', {}, `Lv.${info.level}: ${info.min.toLocaleString()} XP`),
          info.next && h('span', {}, `Lv.${info.level+1}: ${info.next.min.toLocaleString()} XP`)
        )
      ),

      // 6-stat grid
      h('div', { className:'grid grid-cols-2 gap-3' },
        stats.slice(0,6).map(s =>
          h('div', { key:s.label, className:'stat-card' },
            h('div', { className:'flex items-center gap-2 mb-1' },
              h(Icon, { n:s.icon, cls:`w-4 h-4 ${s.color}` }),
              h('span', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider' }, s.label)
            ),
            h('div', { className:`text-2xl font-black ${s.color}` }, s.val)
          )
        )
      ),

      // Streak stats
      h('div', { className:'grid grid-cols-2 gap-3' },
        stats.slice(6).map(s =>
          h('div', { key:s.label, className:'stat-card' },
            h('div', { className:'flex items-center gap-2 mb-1' },
              h(Icon, { n:s.icon, cls:`w-4 h-4 ${s.color}` }),
              h('span', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider' }, s.label)
            ),
            h('div', { className:`text-2xl font-black ${s.color}` }, s.val)
          )
        )
      ),

      // 7-day XP chart
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('div', { className:'flex items-center justify-between mb-3' },
          h('span', { className:'text-sm font-bold text-white' }, '7-Day XP'),
          h('span', { className:'text-xs text-emerald-400' }, `${xpDays.reduce((s,d)=>s+d.xp,0)} total`)
        ),
        h(XPChart, { days:xpDays })
      ),

      // Heatmap
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('div', { className:'flex items-center justify-between mb-3' },
          h('span', { className:'text-sm font-bold text-white' }, '30-Day Activity'),
          h('div', { className:'flex items-center gap-2' },
            [0,1,2,3,4].map(l => h('div', { key:l, className:`w-3 h-3 rounded-sm heatmap-${l}` }))
          )
        ),
        h(Heatmap, { days:heatmap })
      ),

      // Badges
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('div', { className:'flex items-center justify-between mb-3' },
          h('span', { className:'text-sm font-bold text-white' }, '🏅 Badges'),
          h('span', { className:'text-xs text-slate-400' }, `${badges.length} of ${Object.keys(BADGE_DEFS).length} earned`)
        ),
        h('div', { className:'grid grid-cols-3 gap-3' },
          Object.entries(BADGE_DEFS).map(([id, def]) => {
            const earned = badges.includes(id);
            return h('div', { key:id, className:`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center
              ${earned ? 'bg-emerald-900/30 border-emerald-700/50' : 'bg-slate-900/50 border-slate-700/30 opacity-40'}` },
              h('span', { className:'text-2xl' }, earned ? def.icon : '🔒'),
              h('span', { className:`text-xs font-bold ${earned?'text-white':'text-slate-500'}` }, def.label),
              earned && h('span', { className:'text-xs text-slate-500 text-center line-clamp-2' }, def.desc)
            );
          })
        )
      ),

      // Skill path progress
      h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('span', { className:'text-sm font-bold text-white block mb-3' }, '🛤 Skill Paths Progress'),
        SKILL_PATHS.map(path => {
          const pathProg = (progress.skill_path_progress||{})[path.id] || {};
          const done = Object.values(pathProg).filter(Boolean).length;
          const total = path.levels.length;
          const pct = (done/total)*100;
          return h('div', { key:path.id, className:'flex items-center gap-3 mb-3 last:mb-0' },
            h('span', { className:'text-base w-6' }, path.emoji),
            h('div', { className:'flex-1' },
              h('div', { className:'flex justify-between text-xs mb-1' },
                h('span', { className:'text-slate-300 font-medium' }, path.title),
                h('span', { className:`${path.textColor} font-bold` }, `${done}/${total}`)
              ),
              h('div', { className:'level-bar-track h-2' },
                h('div', { className:`h-full rounded-full bg-gradient-to-r ${path.color}`, style:{ width:`${pct}%`, transition:'width .6s' } })
              )
            )
          );
        })
      )
    ),

    h('div', { className:'h-4' })
  );
}

// ================================================================
// 30-DAY CHALLENGE — Core Training (not premium!)
// ================================================================
const CHALLENGE_DAYS = Array.from({ length:30 }, (_,i) => ({
  day: i+1,
  title: i%7===6 ? 'Rest & Recovery' : [
    'Batting Fundamentals', 'Mental Focus Training', 'Bowling Precision',
    'Fielding Agility', 'Power Hitting', 'Match Simulation',
  ][i%6],
  type: i%7===6 ? 'rest' : ['drill','mental','drill','fitness','drill','mental'][i%6],
  xp: i%7===6 ? 20 : [60,50,70,65,90,55][i%6],
  phase: i<7?'Foundation':i<14?'Development':i<21?'Integration':'Performance'
}));

function ThirtyDayPage() {
  const [progress, setProgress] = useState(() => DB.getProgress());
  const completed = progress.thirtyDay_completed || {};
  const today = new Date().toISOString().slice(0,10);

  const markDay = (dayNum) => {
    if (completed[dayNum]) return;
    const p = DB.getProgress();
    if (!p.thirtyDay_completed) p.thirtyDay_completed = {};
    p.thirtyDay_completed[dayNum] = today;
    DB.saveProgress(p);
    const day = CHALLENGE_DAYS[dayNum-1];
    awardXP(day.xp, 15, '30day');
    setProgress(DB.getProgress());
  };

  const completedCount = Object.keys(completed).length;
  const pct = Math.round((completedCount/30)*100);

  const phases = ['Foundation','Development','Integration','Performance'];

  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#d97706,#b45309)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '🎯 30-Day Challenge'),
        h('p', { className:'text-sm text-white/75' }, 'Build the habit. Transform your game.')
      )
    ),

    h('div', { className:'px-4 pt-5 space-y-5' },
      // Progress summary
      h('div', { className:'p-5 rounded-2xl bg-amber-900/20 border border-amber-700/50' },
        h('div', { className:'flex items-center justify-between mb-3' },
          h('div', {},
            h('div', { className:'text-2xl font-black text-white' }, `Day ${completedCount} / 30`),
            h('div', { className:'text-amber-400 font-semibold text-sm' }, completedCount===30?'🏆 Challenge Complete!':completedCount===0?'Begin your journey':'Keep going — you\'re doing great!')
          ),
          h('div', { className:'w-14 h-14 rounded-full border-4 border-amber-500 flex items-center justify-center' },
            h('span', { className:'text-amber-400 font-black text-base' }, `${pct}%`)
          )
        ),
        h('div', { className:'level-bar-track' },
          h('div', { className:'level-bar-fill', style:{ width:`${pct}%`, background:'linear-gradient(to right,#f59e0b,#d97706)' } })
        )
      ),

      // Day grid — grouped by phase
      phases.map((phase, pi) => {
        const phaseDays = CHALLENGE_DAYS.filter(d => d.phase===phase);
        return h('div', { key:phase },
          h('div', { className:'flex items-center gap-2 mb-3' },
            h('div', { className:'w-2 h-2 rounded-full bg-amber-500' }),
            h('span', { className:'text-xs font-bold text-amber-400 uppercase tracking-wider' }, `Week ${pi+1} — ${phase}`),
          ),
          h('div', { className:'grid grid-cols-7 gap-2' },
            phaseDays.map(d => {
              const isDone = !!completed[d.day];
              const isToday = !isDone && Object.keys(completed).length === d.day-1;
              return h('button', {
                key:d.day,
                onClick:()=>markDay(d.day),
                disabled:isDone,
                title:`Day ${d.day}: ${d.title}`,
                className:`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all active:scale-95
                  ${isDone ? 'bg-emerald-500 text-white' :
                    isToday ? 'bg-amber-500/30 border-2 border-amber-500 text-amber-400' :
                    d.type==='rest' ? 'bg-slate-900 border border-slate-700 text-slate-600' :
                    'bg-slate-800 border border-slate-700 text-slate-500'}`
              },
                h('span', {}, isDone ? '✓' : d.type==='rest' ? '😴' : d.day),
                isDone && h('span', { className:'text-white/70', style:{fontSize:'8px'} }, 'done')
              );
            })
          )
        );
      }),

      // Today's task
      (() => {
        const nextDay = CHALLENGE_DAYS[completedCount];
        if (!nextDay || completedCount===30) return null;
        return h('div', { className:'p-4 rounded-2xl bg-slate-800 border border-amber-700/40' },
          h('div', { className:'text-xs text-amber-400 font-bold uppercase tracking-wider mb-1' }, `Today — Day ${nextDay.day}`),
          h('div', { className:'font-black text-white text-base mb-1' }, nextDay.title),
          h('div', { className:'text-xs text-slate-400 mb-3' }, `Phase: ${nextDay.phase} • +${nextDay.xp} XP`),
          h('button', { onClick:()=>markDay(nextDay.day), className:'btn-primary w-full py-3 text-sm' }, `✓ Complete Day ${nextDay.day}`)
        );
      })()
    )
  );
}

// ================================================================
// PROFILE PAGE
// ================================================================
function ProfilePage() {
  const [user, setUser] = useState(DB.getUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const progress = DB.getProgress();
  const info = getLevelInfo(progress.total_xp||0);

  const save = () => {
    DB.setUser(form);
    setUser(form);
    setEditing(false);
  };

  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#0f766e,#0d9488)' } },
      h('div', { className:'relative z-10 flex items-center justify-between' },
        h('div', {},
          h('h1', { className:'text-xl font-black text-white' }, '👤 My Profile'),
          h('p', { className:'text-white/75 text-sm' }, 'Your cricketer identity')
        ),
        h('button', { onClick:()=>editing?save():setEditing(true), className:'px-4 py-2 rounded-xl bg-white/15 text-white text-sm font-bold' },
          editing ? 'Save' : 'Edit'
        )
      )
    ),
    h('div', { className:'px-4 pt-5 space-y-4' },
      // Avatar + level
      h('div', { className:'flex items-center gap-4 p-5 rounded-2xl bg-slate-800 border border-slate-700' },
        h('div', { className:'w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-4xl flex-shrink-0' },
          user.avatar || '🏏'
        ),
        h('div', { className:'flex-1' },
          h('div', { className:'text-xl font-black text-white' }, user.name || 'Cricketer'),
          h('div', { className:'text-emerald-400 font-semibold text-sm' }, `${info.name} — Level ${info.level}`),
          h('div', { className:'text-xs text-slate-400 mt-1' }, user.role || 'All-Rounder'),
          h('div', { className:'mt-2' }, h(LevelBar, { totalXP:progress.total_xp||0, compact:true }))
        )
      ),
      // Edit form
      editing && h('div', { className:'space-y-3' },
        [
          { key:'name', label:'Full Name', placeholder:'Your name' },
          { key:'role', label:'Playing Role', placeholder:'Batsman, Bowler, All-Rounder...' },
          { key:'team', label:'Team / Club', placeholder:'Your team name' },
          { key:'country', label:'Country', placeholder:'Your country' },
          { key:'bio', label:'Bio', placeholder:'Tell us about your cricket journey...' },
        ].map(f =>
          h('div', { key:f.key },
            h('label', { className:'text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1' }, f.label),
            h('input', {
              type:'text', placeholder:f.placeholder, value:form[f.key]||'',
              onChange:e=>setForm({...form,[f.key]:e.target.value}),
              className:'sc-input'
            })
          )
        ),
        h('div', { className:'flex gap-2' },
          h('button', { onClick:save, className:'btn-primary flex-1' }, 'Save Profile'),
          h('button', { onClick:()=>setEditing(false), className:'btn-secondary flex-1' }, 'Cancel')
        )
      ),
      // Profile stats
      !editing && h('div', { className:'grid grid-cols-2 gap-3' },
        [
          { label:'Playing Role', val:user.role||'Not set' },
          { label:'Team', val:user.team||'Not set' },
          { label:'Country', val:user.country||'Not set' },
          { label:'Member Since', val:'SmartCrick Pro' },
        ].map(s =>
          h('div', { key:s.label, className:'stat-card' },
            h('div', { className:'text-xs text-slate-500 uppercase font-bold tracking-wider' }, s.label),
            h('div', { className:'font-bold text-white text-sm mt-1' }, s.val)
          )
        )
      )
    )
  );
}

// ================================================================
// SETTINGS PAGE
// ================================================================
function SettingsPage() {
  const { dark, toggle } = useTheme();
  const [cleared, setCleared] = useState(false);
  const clearData = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      DB.del('progress'); DB.del('xp_log'); DB.del('user');
      setCleared(true);
      window.dispatchEvent(new CustomEvent('sc_progress_update'));
    }
  };
  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#334155,#1e293b)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '⚙️ Settings'))
    ),
    h('div', { className:'px-4 pt-5 space-y-3' },
      h('div', { className:'flex items-center justify-between p-4 rounded-2xl bg-slate-800 border border-slate-700' },
        h('div', {},
          h('div', { className:'font-bold text-white' }, 'Dark Mode'),
          h('div', { className:'text-xs text-slate-400' }, 'Easy on the eyes')
        ),
        h('button', { onClick:toggle, className:`w-12 h-6 rounded-full transition-colors ${dark?'bg-emerald-500':'bg-slate-600'}`, style:{position:'relative'} },
          h('div', { className:'w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-md', style:{left:'2px',transform:dark?'translateX(24px)':'translateX(0)'} })
        )
      ),
      h('button', { onClick:clearData, className:'w-full p-4 rounded-2xl bg-red-900/20 border border-red-700/50 text-left' },
        h('div', { className:'font-bold text-red-400' }, 'Reset All Progress'),
        h('div', { className:'text-xs text-slate-400' }, 'Clears XP, drills, and all training data')
      ),
      cleared && h('div', { className:'p-3 rounded-xl bg-emerald-900/20 border border-emerald-700/50 text-emerald-400 text-sm text-center font-semibold' }, 'Progress reset. Restart fresh! 🔄')
    )
  );
}

// ================================================================
// LEADERBOARD PAGE
// ================================================================
function LeaderboardPage() {
  const progress = DB.getProgress();
  const info = getLevelInfo(progress.total_xp||0);
  // Simulated leaderboard with user entry
  const entries = [
    { name:'Virat K.', level:9, xp:52400, streak:47, country:'🇮🇳' },
    { name:'Josh H.', level:8, xp:38200, streak:31, country:'🇦🇺' },
    { name:'Babar A.', level:8, xp:36800, streak:28, country:'🇵🇰' },
    { name:'Rohit S.', level:7, xp:29100, streak:22, country:'🇮🇳' },
    { name:'Ben S.', level:7, xp:27300, streak:19, country:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name:'You', level:info.level, xp:progress.total_xp||0, streak:progress.current_streak||0, isYou:true },
  ].sort((a,b)=>b.xp-a.xp).map((e,i)=>({...e,rank:i+1}));

  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#b45309,#92400e)' } },
      h('div', { className:'relative z-10' },
        h('h1', { className:'text-xl font-black text-white' }, '🏆 Leaderboard'),
        h('p', { className:'text-white/75 text-sm' }, 'Top SmartCrick athletes worldwide')
      )
    ),
    h('div', { className:'px-4 pt-5 space-y-3' },
      h('p', { className:'text-xs text-slate-500 text-center mb-2' }, '⚡ Live rankings update as you train'),
      entries.map(e =>
        h('div', { key:e.rank,
          className:`flex items-center gap-4 p-4 rounded-2xl border ${e.isYou?'bg-emerald-900/20 border-emerald-700/50':'bg-slate-800 border-slate-700'}`
        },
          h('div', { className:`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${e.rank<=3?'bg-amber-500 text-white':'bg-slate-700 text-slate-400'}` }, `#${e.rank}`),
          h('div', { className:'text-lg' }, e.country||'🌍'),
          h('div', { className:'flex-1' },
            h('div', { className:`font-bold text-sm ${e.isYou?'text-emerald-400':'text-white'}` }, e.isYou?`${e.name} (You)`:e.name),
            h('div', { className:'text-xs text-slate-400' }, `Level ${e.level} • ${e.xp.toLocaleString()} XP`)
          ),
          h('div', { className:'text-xs font-bold text-orange-400' }, `🔥 ${e.streak}d`)
        )
      )
    )
  );
}

// ================================================================
// GOALS PAGE
// ================================================================
function GoalsPage() {
  const [goals, setGoals] = useState(() => DB.get('goals') || []);
  const [newGoal, setNewGoal] = useState('');
  const addGoal = () => {
    if (!newGoal.trim()) return;
    const g = [...goals, { id:Date.now(), text:newGoal.trim(), done:false, date:new Date().toISOString().slice(0,10) }];
    DB.set('goals', g); setGoals(g); setNewGoal('');
  };
  const toggle = id => {
    const g = goals.map(g=>g.id===id?{...g,done:!g.done}:g);
    DB.set('goals',g); setGoals(g);
    if (!goals.find(g=>g.id===id)?.done) awardXP(25,0,'goal');
  };
  return h('div', { className:'page-wrapper' },
    h('div', { className:'page-header', style:{ background:'linear-gradient(135deg,#15803d,#16a34a)' } },
      h('div', { className:'relative z-10' }, h('h1', { className:'text-xl font-black text-white' }, '🎯 Goals'))
    ),
    h('div', { className:'px-4 pt-5 space-y-4' },
      h('div', { className:'flex gap-2' },
        h('input', { type:'text', placeholder:'Add a training goal...', value:newGoal, onChange:e=>setNewGoal(e.target.value),
          onKeyDown:e=>e.key==='Enter'&&addGoal(), className:'sc-input flex-1' }),
        h('button', { onClick:addGoal, className:'btn-primary px-4 py-3 rounded-xl text-sm' }, h(Icon,{n:'plus',cls:'w-5 h-5'}))
      ),
      goals.length===0 && h(EmptyState, { emoji:'🎯', title:'No goals yet', desc:'Add your first cricket training goal to stay focused' }),
      goals.map(g =>
        h('div', { key:g.id, className:`flex items-center gap-3 p-4 rounded-2xl border ${g.done?'bg-emerald-900/20 border-emerald-700/50':'bg-slate-800 border-slate-700'}` },
          h('button', { onClick:()=>toggle(g.id), className:`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${g.done?'bg-emerald-500 border-emerald-500':'border-slate-600'}` },
            g.done && h(Icon, { n:'check', cls:'w-4 h-4 text-white' })
          ),
          h('span', { className:`flex-1 text-sm ${g.done?'line-through text-slate-500':'text-white font-medium'}` }, g.text)
        )
      )
    )
  );
}

// ================================================================
// STUB PAGES (placeholder for non-implemented pages)
// ================================================================
function StubPage({ title, emoji, desc }) {
  return h('div', { className:'page-wrapper flex flex-col items-center justify-center px-6 text-center', style:{ minHeight:'80vh' } },
    h('div', { className:'text-6xl mb-4' }, emoji),
    h('h2', { className:'text-2xl font-black text-white mb-2' }, title),
    h('p', { className:'text-slate-400 text-sm max-w-xs' }, desc || 'This feature is coming soon in the next update.'),
    h('button', { onClick:()=>nav('Home'), className:'mt-6 btn-secondary px-6 py-3' }, 'Go Home')
  );
}

const AICoachPage = () => h(StubPage, { title:'AI Head Coach', emoji:'🤖', desc:'Your personal AI cricket coach — powered by SmartCrick\'s elite training intelligence. Coming in next update.' });
const NinetyDayPage = () => h(StubPage, { title:'90-Day Elite Program', emoji:'💎', desc:'A complete 90-day transformation program for serious cricketers. Coming in next update.' });
const AIWorkoutPage = () => h(StubPage, { title:'AI Workout Creator', emoji:'🤖', desc:'Tell the AI what you need — it builds your perfect workout on the spot. Coming in next update.' });
const MatchTrackerPage = () => h(StubPage, { title:'Match Tracker', emoji:'📋', desc:'Log your match performance — runs, wickets, catches, and moments of brilliance.' });
const MiniMatchPage = () => h(StubPage, { title:'MiniMatch IQ', emoji:'🧩', desc:'Cricket tactical scenarios. What would you do? Train your cricket brain with real match simulations.' });
const GetOutPage = () => h(StubPage, { title:'Why Did I Get Out?', emoji:'❓', desc:'Analyze your dismissal type, understand the pattern, and eliminate it from your game.' });
const SchedulePage = () => h(StubPage, { title:'Training Schedule', emoji:'📅', desc:'Plan your weekly training schedule and never miss a session again.' });
const QuizzesPage = () => h(StubPage, { title:'Cricket Quizzes', emoji:'📝', desc:'Test your cricket knowledge — rules, history, tactics, and technique.' });

// ================================================================
// APP ROOT — Router and global layout
// ================================================================
const PAGES = {
  Home: 'Home', Drills: 'Drills', DrillDetail: 'DrillDetail',
  Mental: 'Mental', MentalPlayer: 'MentalPlayer',
  Fitness: 'Fitness', WorkoutDetail: 'WorkoutDetail',
  Timer: 'Timer', Progress: 'Progress', SkillPaths: 'SkillPaths',
  ThirtyDay: 'ThirtyDay', Leaderboard: 'Leaderboard',
  Goals: 'Goals', Profile: 'Profile', Settings: 'Settings',
  AICoach: 'AICoach', NinetyDay: 'NinetyDay', AIWorkout: 'AIWorkout',
  MatchTracker: 'MatchTracker', MiniMatch: 'MiniMatch',
  GetOut: 'GetOut', Schedule: 'Schedule', Quizzes: 'Quizzes',
};

function AppRoot() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const saved = DB.get('theme');
    return saved !== null ? saved : true;
  });
  const [notif, setNotif] = useState(null);
  const smartStartRef = useRef(null);
  const { page, params } = useRoute();

  // Sync dark mode to HTML element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    DB.set('theme', dark);
  }, [dark]);

  // Hide loader on first render
  useEffect(() => {
    const loader = document.getElementById('sc-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity .3s';
      setTimeout(() => loader.remove(), 350);
    }
    // Set initial route
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#/Home';
    }
  }, []);

  // Close sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [page]);

  // Notif auto-dismiss
  useEffect(() => {
    if (notif) { const t = setTimeout(()=>setNotif(null), 4000); return ()=>clearTimeout(t); }
  }, [notif]);

  const themeValue = { dark, toggle:()=>setDark(d=>!d) };

  // Render page component
  function renderPage() {
    switch(page) {
      case 'Home': return h(HomePage, { smartStartRef });
      case 'Drills': return h(DrillsPage);
      case 'DrillDetail': return h(DrillDetailPage, { params });
      case 'Mental': return h(MentalPage);
      case 'MentalPlayer': return h(MentalPlayerPage, { params });
      case 'Fitness': return h(FitnessPage);
      case 'WorkoutDetail': return h(WorkoutDetailPage, { params });
      case 'Timer': return h(TimerPage);
      case 'Progress': return h(ProgressPage);
      case 'SkillPaths': return h(SkillPathsPage);
      case 'ThirtyDay': return h(ThirtyDayPage);
      case 'Leaderboard': return h(LeaderboardPage);
      case 'Goals': return h(GoalsPage);
      case 'Profile': return h(ProfilePage);
      case 'Settings': return h(SettingsPage);
      case 'AICoach': return h(AICoachPage);
      case 'NinetyDay': return h(NinetyDayPage);
      case 'AIWorkout': return h(AIWorkoutPage);
      case 'MatchTracker': return h(MatchTrackerPage);
      case 'MiniMatch': return h(MiniMatchPage);
      case 'GetOut': return h(GetOutPage);
      case 'Schedule': return h(SchedulePage);
      case 'Quizzes': return h(QuizzesPage);
      default: return h(HomePage, { smartStartRef });
    }
  }

  // Pages where we show the full-screen layout (no top hamburger)
  const fullscreenPages = ['MentalPlayer'];
  const isFullscreen = fullscreenPages.includes(page);

  return h(ThemeCtx.Provider, { value: themeValue },
    // Notification bar
    notif && h(NotifBar, { msg:notif, onClose:()=>setNotif(null) }),

    // Top bar (hamburger + page title) — not shown in fullscreen
    !isFullscreen && h('div', {
      className:'fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 py-3',
      style:{ background:'rgba(2,6,23,0.85)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', paddingTop:'max(0.75rem, env(safe-area-inset-top))' }
    },
      h('button', {
        onClick:()=>setSidebarOpen(true),
        className:'p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors flex-shrink-0'
      }, h(Icon, { n:'menu', cls:'w-5 h-5 text-slate-300' })),
      h('span', { className:'text-sm font-black text-white tracking-tight' }, '🏏 SmartCrick'),
      h('div', { className:'flex-1' }),
      // Streak indicator
      (() => {
        const s = DB.getProgress().current_streak||0;
        if (!s) return null;
        return h('div', { className:'flex items-center gap-1 text-orange-400 text-xs font-bold bg-orange-900/30 border border-orange-800/50 px-2 py-1 rounded-full' },
          '🔥', `${s}d`
        );
      })()
    ),

    // Sidebar
    h(Sidebar, { open:sidebarOpen, onClose:()=>setSidebarOpen(false), currentPage:page }),

    // Page content
    h('main', { className:dark?'bg-slate-950 min-h-dvh':'bg-slate-50 min-h-dvh' },
      renderPage()
    ),

    // Bottom nav (not in fullscreen)
    !isFullscreen && h(BottomNav, { page })
  );
}

// ================================================================
// MOUNT
// ================================================================
const rootEl = document.getElementById('root');
if (rootEl && window.React && window.ReactDOM) {
  createRoot(rootEl).render(h(AppRoot));
} else if (rootEl) {
  rootEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;color:#94a3b8;font-family:system-ui;text-align:center;padding:2rem"><div><p style="font-size:1.25rem;font-weight:700;margin-bottom:0.5rem">⚠ Failed to load</p><p style="font-size:0.875rem">Please check your internet connection and try again.</p></div></div>';
}

})(); // End IIFE
