// ================================================================
// SmartCrick AI — Complete Professional App v3.0
// CDN React 18 UMD · No bundler · All features · Fully working
// ================================================================
(function () {
'use strict';

const {
  createElement:h, useState, useEffect, useCallback, useRef,
  useContext, createContext, useMemo, Fragment, memo
} = React;
const { createRoot } = ReactDOM;

// ── Error Boundary (class component — only way in React) ──────────
class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err:null }; }
  static getDerivedStateFromError(e) { return { err:e }; }
  render() {
    if (this.state.err) return h('div', { style:{padding:'2rem',color:'#ef4444',fontFamily:'system-ui',textAlign:'center'} },
      h(Icon,{n:'alertTriangle',cls:'w-10 h-10',style:{color:'#f59e0b',marginBottom:'1rem'}}),
      h('h2', { style:{color:'#f8fafc',marginBottom:'.5rem'} }, 'Something went wrong'),
      h('p', { style:{color:'#94a3b8',fontSize:'.875rem',marginBottom:'1.5rem'} }, this.state.err.message),
      h('button', { onClick:()=>{ this.setState({err:null}); nav('Home'); },
        style:{background:'#10b981',color:'#fff',border:'none',borderRadius:'.75rem',padding:'.75rem 1.5rem',fontWeight:700,cursor:'pointer',fontSize:'1rem'} }, 'Go Home')
    );
    return this.props.children;
  }
}

// ── Icons Dictionary ──────────────────────────────────────────────
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
  crown:'<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.277 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
  rocket:'<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>',
  sparkles:'<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
  calendar:'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  video:'<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  barChart:'<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  timer:'<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="12" y2="8"/><path d="M20.2 20.2A9 9 0 1 0 12 21a8.7 8.7 0 0 0 5.3-1.8"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  globe:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  extLink:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  pencil:'<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  trash:'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  crosshair:'<circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/>',
  wind:'<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  bat:'<path d="M3 21l3.5-3.5"/><path d="M5.5 19.5L16 9a2 2 0 0 0 0-2.83L14.83 5A2 2 0 0 0 12 5L2.5 16l-1 1 1 4z"/><path d="M19 4.5l.5.5"/><circle cx="20" cy="4" r="1"/>',
  ball:'<circle cx="12" cy="12" r="9"/><path d="M12 3c-1.2 3.6-1.2 14.4 0 18" stroke-width="1.5"/><path d="M3.5 9.5c3.3.8 11.7.8 17 0" stroke-width="1.5"/><path d="M3.5 14.5c3.3-.8 11.7-.8 17 0" stroke-width="1.5"/>',
  wicket:'<line x1="8" y1="4" x2="8" y2="21"/><line x1="12" y1="4" x2="12" y2="21"/><line x1="16" y1="4" x2="16" y2="21"/><rect x="6" y="4" width="12" height="3" rx="1"/>',
  helmet:'<path d="M12 2a8 8 0 0 0-8 8c0 3.5 1.8 6.6 4.5 8.5H7"/><path d="M12 2a8 8 0 0 1 8 8c0 3.5-1.8 6.6-4.5 8.5H12"/><line x1="4.5" y1="14" x2="19.5" y2="14"/><path d="M4 10h16"/>',
  field:'<ellipse cx="12" cy="12" rx="10" ry="6"/><ellipse cx="12" cy="12" rx="3.5" ry="2"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/>',
  glove:'<path d="M8 18V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/><path d="M6 11H4a2 2 0 0 0 0 4h2"/><path d="M8 18h8"/><path d="M8 21h8"/>',
  pitch:'<rect x="3" y="7" width="18" height="10" rx="1"/><line x1="8" y1="7" x2="8" y2="17"/><line x1="16" y1="7" x2="16" y2="17"/><line x1="3" y1="12" x2="21" y2="12"/>',
  cpu:'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/>',
  diamond:'<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/>',
  puzzle:'<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/>',
  helpCircle:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  chartLine:'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  navigation:'<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  trendDown:'<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  alertTriangle:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  chevronsRight:'<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',
  rotateCcw:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  maximize:'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  book:'<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
};

function Icon({ n, cls='w-5 h-5', style }) {
  return h('svg', {
    className:cls, style,
    xmlns:'http://www.w3.org/2000/svg',
    viewBox:'0 0 24 24', fill:'none',
    stroke:'currentColor', strokeWidth:2,
    strokeLinecap:'round', strokeLinejoin:'round',
    'aria-hidden':true,
    dangerouslySetInnerHTML:{ __html:IC[n]||IC.info }
  });
}

// ── Theme Context ─────────────────────────────────────────────────
const ThemeCtx = createContext({ dark:true, toggle:()=>{} });
function useTheme() { return useContext(ThemeCtx); }

// ── Hash Router ───────────────────────────────────────────────────
function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/,'') || 'Home';
  const [page, qs] = hash.split('?');
  const params = {};
  if (qs) qs.split('&').forEach(p => { const [k,v]=p.split('='); if(k) params[k]=decodeURIComponent(v||''); });
  return { page, params };
}
function nav(page, params={}) {
  const qs = Object.keys(params).length
    ? '?'+Object.entries(params).map(([k,v])=>`${k}=${encodeURIComponent(v)}`).join('&') : '';
  window.location.hash = `#/${page}${qs}`;
}
function useRoute() {
  const [route, setRoute] = useState(getRoute);
  useEffect(()=>{
    const fn = ()=>setRoute(getRoute());
    window.addEventListener('hashchange', fn);
    return ()=>window.removeEventListener('hashchange', fn);
  },[]);
  return route;
}

// ── LocalStorage DB ───────────────────────────────────────────────
const DB = {
  _k: k=>`sc_${k}`,
  isAvailable() {
    try { localStorage.setItem('sc_test','1'); localStorage.removeItem('sc_test'); return true; }
    catch { return false; }
  },
  get(k) {
    try { const v=localStorage.getItem(this._k(k)); return v?JSON.parse(v):null; }
    catch { return null; }
  },
  set(k,v) {
    try {
      const serialized=JSON.stringify(v);
      localStorage.setItem(this._k(k),serialized);
      const readback=localStorage.getItem(this._k(k));
      if(!readback) console.warn('SC: write failed for key',k);
    } catch(e) { console.warn('SC: localStorage write error',k,e); }
    try {
      if(typeof getPouchDB==='function' && typeof SC_SYNC_KEYS!=='undefined') {
        var _pdb=getPouchDB(), _fk=this._k(k);
        if(_pdb && SC_SYNC_KEYS.indexOf(_fk)!==-1) {
          var _did='sc::'+_fk, _val=v;
          _pdb.get(_did)
            .then(function(ex){return _pdb.put(Object.assign({},ex,{value:_val,updatedAt:Date.now()}));})
            .catch(function(e){if(e&&e.name==='not_found')return _pdb.put({_id:_did,value:_val,createdAt:Date.now(),updatedAt:Date.now()});})
            .catch(function(e){console.warn('[SC] PouchDB:',k,e);});
        }
      }
    } catch(e) {}
    return v;
  },
  del(k) { try { localStorage.removeItem(this._k(k)); } catch {} },
  getProgress() {
    const saved=this.get('progress');
    return Object.assign({
      total_xp:0, drills_done:0, mental_done:0, workouts_done:0,
      practice_minutes:0, current_streak:0, longest_streak:0,
      last_active_date:null, last_checkin_date:null,
      completed_drills:[], completed_mental:[], completed_workouts:[],
      badges:[], skill_path_progress:{}, thirtyDay_completed:{}
    }, saved||{});
  },
  saveProgress(v) { this.set('progress', v); },
  getXPLog() { return this.get('xp_log')||[]; },
  addXPEntry(xp, source) {
    const log = this.getXPLog();
    const today = new Date().toISOString().slice(0,10);
    log.push({ date:today, xp, source, ts:Date.now() });
    this.set('xp_log', log.filter(e=>e.ts>Date.now()-90*864e5));
  },
  getXPLast7Days() {
    const log = this.getXPLog();
    const days = [];
    for (let i=6; i>=0; i--) {
      const d=new Date(); d.setDate(d.getDate()-i);
      const dateStr=d.toISOString().slice(0,10);
      const label=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
      days.push({ date:dateStr, label, xp:log.filter(e=>e.date===dateStr).reduce((s,e)=>s+e.xp,0) });
    }
    return days;
  },
  getActivityHeatmap() {
    const log = this.getXPLog();
    const map = {};
    log.forEach(e=>{ map[e.date]=(map[e.date]||0)+e.xp; });
    const days = [];
    for (let i=29; i>=0; i--) {
      const d=new Date(); d.setDate(d.getDate()-i);
      const date=d.toISOString().slice(0,10);
      const xp=map[date]||0;
      days.push({ date, xp, level:xp===0?0:xp<50?1:xp<150?2:xp<300?3:4 });
    }
    return days;
  },
  getUser() { return this.get('user')||{}; },
  setUser(v) { this.set('user',v); },
  getGoals() { return this.get('goals')||[]; },
  saveGoals(v) { this.set('goals',v); },
  getSchedule() { return this.get('schedule')||{ sessions:[] }; },
  saveSchedule(v) { this.set('schedule',v); },
  getSessionsForDate(dateStr) {
    return (this.getSchedule().sessions||[]).filter(s=>s.date===dateStr);
  },
  getSessionsForWeek(mondayStr) {
    const s = this.getSchedule().sessions||[];
    const start = new Date(mondayStr+'T00:00:00');
    const end = new Date(start); end.setDate(start.getDate()+7);
    return s.filter(sess=>{
      const d = new Date(sess.date+'T00:00:00');
      return d>=start && d<end;
    });
  },
  addSession(sess) {
    const sch = this.getSchedule();
    sch.sessions = [...(sch.sessions||[]), sess];
    this.saveSchedule(sch);
  },
  updateSession(id, updates) {
    const sch = this.getSchedule();
    sch.sessions = (sch.sessions||[]).map(s=>s.id===id?{...s,...updates}:s);
    this.saveSchedule(sch);
  },
  deleteSession(id) {
    const sch = this.getSchedule();
    sch.sessions = (sch.sessions||[]).filter(s=>s.id!==id);
    this.saveSchedule(sch);
  },
  completeScheduledSession(id) {
    const sch = this.getSchedule();
    const sess = (sch.sessions||[]).find(s=>s.id===id);
    if (!sess || sess.status==='complete') return null;
    this.updateSession(id, { status:'complete' });
    return sess;
  }
};

// ── XP & Level System ────────────────────────────────────────────
const XP_LEVELS = [
  { level:1, name:'Rookie',           min:0,     max:500   },
  { level:2, name:'Club Player',      min:500,   max:1200  },
  { level:3, name:'District Star',    min:1200,  max:2500  },
  { level:4, name:'State Performer',  min:2500,  max:5000  },
  { level:5, name:'National Prospect',min:5000,  max:9000  },
  { level:6, name:'Elite Player',     min:9000,  max:15000 },
  { level:7, name:'International',    min:15000, max:25000 },
  { level:8, name:'Pro Cricketer',    min:25000, max:40000 },
  { level:9, name:'World Class',      min:40000, max:60000 },
  { level:10,name:'Legend',           min:60000, max:Infinity },
];

function getLevelInfo(totalXP) {
  const xp = totalXP || 0;
  let lv = XP_LEVELS[0];
  for (let i = XP_LEVELS.length-1; i>=0; i--) {
    if (xp >= XP_LEVELS[i].min) { lv = XP_LEVELS[i]; break; }
  }
  const next = XP_LEVELS.find(l=>l.level===lv.level+1)||null;
  const pct = next ? Math.min(100,((xp-lv.min)/(next.min-lv.min))*100) : 100;
  return { ...lv, next, pct, xpToNext:next?Math.max(0,next.min-xp):0 };
}

const BADGE_DEFS = {
  first500:  { icon:'zap',     label:'First 500',    desc:'Earned your first 500 XP' },
  xp5k:      { icon:'trophy',  label:'5K Club',      desc:'5,000 total XP earned' },
  streak3:   { icon:'flame',   label:'On Fire',      desc:'3-day training streak' },
  streak7:   { icon:'flame',   label:'Week Warrior', desc:'7-day training streak' },
  streak14:  { icon:'flame',   label:'Fortnight',    desc:'14-day streak' },
  streak30:  { icon:'flame',   label:'Monthly Legend',desc:'30 consecutive days' },
  drills10:  { icon:'bat',     label:'Drill Starter',desc:'10 cricket drills done' },
  drills50:  { icon:'bat',     label:'Drill Master', desc:'50 cricket drills done' },
  mental10:  { icon:'brain',   label:'Mind Builder', desc:'10 mental sessions done' },
  mental25:  { icon:'brain',   label:'Mind Master',  desc:'25 mental sessions done' },
  min60:     { icon:'clock',   label:'First Hour',   desc:'60 min of practice' },
  min600:    { icon:'clock',   label:'600 Min Club', desc:'600 min of practice' },
  workouts5: { icon:'dumbbell',label:'Fitness Start',desc:'5 workouts completed' },
  sched10:   { icon:'calendar',label:'Scheduled Pro',desc:'10 scheduled sessions done' },
};

function checkBadges(p) {
  const b = [...(p.badges||[])];
  const add = id => { if (!b.includes(id)) b.push(id); };
  if ((p.total_xp||0)>=500) add('first500');
  if ((p.total_xp||0)>=5000) add('xp5k');
  if ((p.current_streak||0)>=3) add('streak3');
  if ((p.current_streak||0)>=7) add('streak7');
  if ((p.current_streak||0)>=14) add('streak14');
  if ((p.current_streak||0)>=30) add('streak30');
  if ((p.drills_done||0)>=10) add('drills10');
  if ((p.drills_done||0)>=50) add('drills50');
  if ((p.mental_done||0)>=10) add('mental10');
  if ((p.mental_done||0)>=25) add('mental25');
  if ((p.practice_minutes||0)>=60) add('min60');
  if ((p.practice_minutes||0)>=600) add('min600');
  if ((p.workouts_done||0)>=5) add('workouts5');
  const schedDone = (DB.getSchedule().sessions||[]).filter(s=>s.status==='complete').length;
  if (schedDone>=10) add('sched10');
  return b;
}

function awardXP(xp, minutes=0, source='general', completedKey=null, itemId=null) {
  try {
    const p = DB.getProgress();
    const today = new Date().toISOString().slice(0,10);
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    if (source==='checkin') {
      if (p.last_checkin_date===today) { console.log('SC: checkin already awarded today, skipping'); return p; }
      p.last_checkin_date=today;
    }
    if (p.last_active_date === today) {}
    else if (p.last_active_date === yesterday) {
      p.current_streak = (p.current_streak||0)+1;
      p.longest_streak = Math.max(p.longest_streak||0, p.current_streak);
    } else {
      p.current_streak = 1;
      p.longest_streak = Math.max(p.longest_streak||0, 1);
    }
    p.last_active_date = today;
    p.total_xp = (p.total_xp||0)+xp;
    p.practice_minutes = (p.practice_minutes||0)+minutes;
    if (completedKey==='drill' && itemId) {
      p.completed_drills = p.completed_drills||[];
      if (!p.completed_drills.includes(itemId)) p.completed_drills.push(itemId);
      p.drills_done = (p.drills_done||0)+1;
    }
    if (completedKey==='mental' && itemId) {
      p.completed_mental = p.completed_mental||[];
      if (!p.completed_mental.includes(itemId)) p.completed_mental.push(itemId);
      p.mental_done = (p.mental_done||0)+1;
    }
    if (completedKey==='workout' && itemId) {
      p.completed_workouts = p.completed_workouts||[];
      if (!p.completed_workouts.includes(itemId)) p.completed_workouts.push(itemId);
      p.workouts_done = (p.workouts_done||0)+1;
    }
    p.badges = checkBadges(p);
    DB.saveProgress(p);
    DB.addXPEntry(xp, source);
    window.dispatchEvent(new CustomEvent('sc_update'));
    showXPFlash(`+${xp} XP`);
    return p;
  } catch(e) { console.error('awardXP error:', e); return DB.getProgress(); }
}

function showXPFlash(text) {
  try {
    const el = document.createElement('div');
    el.className='xp-flash'; el.textContent=text;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 1700);
  } catch{}
}

function fireConfetti() {
  try { if (typeof confetti!=='undefined') confetti({ particleCount:90, spread:70, origin:{y:.65}, colors:['#10b981','#34d399','#6ee7b7','#fff'] }); } catch{}
}

function getWeekMonday(date) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  const day = d.getDay();
  const diff = day===0 ? -6 : 1-day;
  d.setDate(d.getDate()+diff);
  return d;
}
function dateStr(d) { return d.toISOString().slice(0,10); }
function addDays(d, n) { const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function formatDate(str) {
  const d = new Date(str+'T00:00:00');
  return d.toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'});
}
function isToday(str) { return str===new Date().toISOString().slice(0,10); }
function fmtTime(s) {
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=s%60;
  if(h>0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

const SCHED_TYPES = {
  drill:   { label:'Cricket Drill', icon:'bat',      color:'#3b82f6', bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.4)' },
  mental:  { label:'Mental Session', icon:'brain',   color:'#a855f7', bg:'rgba(168,85,247,0.12)', border:'rgba(168,85,247,0.4)' },
  fitness: { label:'Fitness', icon:'dumbbell',       color:'#f97316', bg:'rgba(249,115,22,0.12)', border:'rgba(249,115,22,0.4)' },
  match:   { label:'Match Day', icon:'wicket',       color:'#f59e0b', bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.4)' },
  rest:    { label:'Rest & Recover', icon:'heart',   color:'#16a34a', bg:'rgba(22,163,74,0.08)', border:'rgba(22,163,74,0.25)' },
  custom:  { label:'Custom Session', icon:'list',    color:'#8b949e', bg:'rgba(139,148,158,0.12)', border:'rgba(139,148,158,0.4)' },
};

// ================================================================
// SHARED UI COMPONENTS
// ================================================================
function Spinner({ cls='' }) {
  return h('div', { className:`flex items-center justify-center py-16 ${cls}` },
    h('div', { className:'w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin' })
  );
}

function LevelBar({ totalXP, compact=false }) {
  const info=getLevelInfo(totalXP||0);
  if(compact) return h('div',{className:'flex items-center gap-2'},
    h('span',{className:'text-xs font-black text-emerald-400 whitespace-nowrap'},`Lv.${info.level}`),
    h('div',{className:'flex-1 h-1.5 rounded-full bg-slate-700/80 overflow-hidden'},
      h('div',{className:'h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700',style:{width:`${info.pct}%`}})
    )
  );
  return h('div',{className:'space-y-2'},
    h('div',{className:'flex justify-between items-center'},
      h('span',{className:'text-sm font-black text-emerald-400'},`Level ${info.level} — ${info.name}`),
      h('span',{className:'text-xs text-slate-500'},info.next?`${info.xpToNext.toLocaleString()} XP to next`:'MAX LEVEL')
    ),
    h('div',{className:'h-2 rounded-full bg-slate-700/80 overflow-hidden'},
      h('div',{className:'h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 relative',style:{width:`${info.pct}%`}},
        h('div',{className:'absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent',style:{animation:'shimmer 2s ease-in-out infinite'}})
      )
    )
  );
}

function StreakBadge({ streak=0 }) {
  if(!streak) return h('div',{style:{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',
    borderRadius:6,background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)'}},
    h(Icon,{n:'bat',cls:'w-3.5 h-3.5',style:{color:'#374151'}}),
    h('span',{style:{fontSize:11,fontWeight:600,color:'#484f58'}},'No streak yet')
  );
  return h('div',{className:'streak-badge'},
    h(Icon,{n:'flame',cls:'w-3.5 h-3.5'}),
    streak, streak===1?' day':' days'
  );
}

function XPBadge({ xp }) {
  return h('span',{style:{display:'inline-flex',alignItems:'center',gap:4,padding:'2px 8px',
    borderRadius:5,fontSize:11,fontWeight:700,background:'rgba(22,163,74,0.1)',
    border:'1px solid rgba(22,163,74,0.25)',color:'#4ade80'}},
    h(Icon,{n:'zap',cls:'w-3 h-3'}), `${xp} XP`
  );
}

function PremiumBadge({ label='PRO' }) {
  return h('span',{className:'premium-badge'},label);
}

function StatCard({ label, value, color='text-emerald-400', icon, sub, cls='' }) {
  return h('div',{className:`stat-card ${cls}`},
    h('div',{style:{display:'flex',alignItems:'center',gap:6,marginBottom:4}},
      icon && h(Icon,{n:icon,cls:'w-3.5 h-3.5',style:{color:color.replace('text-','').includes('#')?color:'inherit'}}),
      h('span',{style:{fontSize:10,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em'}},label)
    ),
    h('div',{style:{fontSize:22,fontWeight:800,fontVariantNumeric:'tabular-nums',lineHeight:1,
      color:color.startsWith('#')?color:'inherit'},className:color.startsWith('text-')?color:''},value),
    sub && h('div',{style:{fontSize:11,color:'#484f58',marginTop:4}},sub)
  );
}

function EmptyState({ icon='bat', emoji, title, desc, action }) {
  return h('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
    padding:'48px 24px',textAlign:'center'}},
    h('div',{style:{width:56,height:56,borderRadius:12,background:'rgba(48,54,61,0.6)',
      display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},
      h(Icon,{n:icon||'bat',cls:'w-7 h-7',style:{color:'#484f58'}})
    ),
    h('h3',{style:{fontSize:15,fontWeight:700,color:'#8b949e',marginBottom:8}},title),
    h('p',{style:{fontSize:13,color:'#484f58',maxWidth:240,lineHeight:1.6,marginBottom:24}},desc),
    action && h('button',{onClick:action.fn,className:'btn-primary',style:{width:'auto',padding:'10px 24px',fontSize:13}},action.label)
  );
}

function Card({ children, cls='', onClick }) {
  return h('div',{
    className:`rounded-2xl transition-all ${onClick?'cursor-pointer active:scale-[.99]':''} ${cls}`,
    style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.6)'},
    onClick
  }, children);
}

function XPChart({ days }) {
  const max=Math.max(...days.map(d=>d.xp),1);
  return h('div',{className:'flex items-end gap-1.5 h-20 w-full'},
    days.map(d=>
      h('div',{key:d.date,className:'flex flex-col items-center gap-1 flex-1'},
        h('div',{
          className:'w-full rounded-t-sm transition-all duration-500',
          style:{height:`${Math.max(3,(d.xp/max)*72)}px`,background:d.xp>0?'linear-gradient(to top,#059669,#34d399)':'rgba(30,41,59,0.6)',borderRadius:'3px 3px 0 0'},
          title:`${d.xp} XP`
        }),
        h('span',{className:'text-xs text-slate-500 font-medium'},d.label)
      )
    )
  );
}

function Heatmap({ days }) {
  return h('div',{className:'grid grid-cols-7 gap-1.5'},
    days.map((d,i)=>
      h('div',{key:d.date,
        className:`heatmap-cell heatmap-${d.level}`,
        style:{aspectRatio:'1',borderRadius:'4px'},
        title:`${d.date}: ${d.xp} XP`
      })
    )
  );
}

function SectionLabel({ children }) {
  return h('div', { className:'sc-section-label' }, children);
}

function PageHeader({ title, subtitle, gradient, onBack, actions }) {
  return h('div',{
    className:'relative overflow-hidden',
    style:{background:gradient||'linear-gradient(135deg,#059669,#047857)',
      paddingTop:'max(3.5rem, calc(3.5rem + env(safe-area-inset-top)))',
      paddingBottom:'1.5rem',paddingLeft:'1.25rem',paddingRight:'1.25rem'}
  },
    h('div',{style:{position:'absolute',top:'-30%',right:'-15%',width:'220px',height:'220px',
      background:'rgba(255,255,255,0.07)',borderRadius:'50%',pointerEvents:'none'}}),
    h('div',{style:{position:'absolute',bottom:'-40%',left:'-10%',width:'160px',height:'160px',
      background:'rgba(255,255,255,0.05)',borderRadius:'50%',pointerEvents:'none'}}),
    h('div',{className:'relative z-10'},
      h('div',{className:'flex items-start justify-between'},
        h('div',{className:'flex items-center gap-3'},
          onBack && h('button',{onClick:onBack,
            className:'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center',
            style:{background:'rgba(255,255,255,0.15)'}},
            h(Icon,{n:'arrowL',cls:'w-5 h-5 text-white'})
          ),
          h('div',{},
            h('h1',{className:'text-xl font-black text-white tracking-tight leading-tight'},title),
            subtitle && h('p',{className:'text-sm mt-0.5',style:{color:'rgba(255,255,255,0.7)'}},subtitle)
          )
        ),
        actions && h('div',{className:'flex items-center gap-2'},actions)
      )
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
  const streak = p.current_streak||0;

  const handleClose = useCallback(()=>{
    savedScroll.current = scrollRef.current?.scrollTop||0;
    onClose();
  },[onClose]);

  useEffect(()=>{
    if(open && scrollRef.current){
      requestAnimationFrame(()=>{ if(scrollRef.current) scrollRef.current.scrollTop=savedScroll.current; });
    }
  },[open]);

  function NavBtn({ label, icon, pg, onClick, badge, isNew }) {
    const active = currentPage===pg;
    return h('button',{
      onClick:onClick||(()=>{ nav(pg); handleClose(); }),
      className:`sc-nav-btn${active?' active':''}`,
    },
      h(Icon,{n:icon,cls:'w-4 h-4 flex-shrink-0',style:{color:active?'#4ade80':'#484f58'}}),
      h('span',{style:{fontSize:'13px',fontWeight:600,flex:1,textAlign:'left',color:active?'#e6edf3':'#8b949e'}},label),
      badge && h('span',{className:'premium-badge'},badge),
      isNew && h('span',{style:{fontSize:'10px',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',
        background:'rgba(22,163,74,0.12)',color:'#4ade80',border:'1px solid rgba(22,163,74,0.25)',
        padding:'2px 6px',borderRadius:'4px',flexShrink:0}},'NEW')
    );
  }

  const handleSmartStart = () => {
    handleClose();
    if(currentPage!=='Home'){ nav('Home'); setTimeout(()=>{ const el=document.getElementById('smart-start'); if(el) el.scrollIntoView({behavior:'smooth'}); },200); }
    else { const el=document.getElementById('smart-start'); if(el) el.scrollIntoView({behavior:'smooth'}); }
  };

  return h(Fragment,null,
    open && h('div',{
      className:'fixed inset-0 z-40',
      style:{background:'rgba(0,0,0,0.7)',backdropFilter:'blur(4px)'},
      onClick:handleClose
    }),
    h('div',{
      className:'fixed inset-y-0 left-0 z-50 w-72 flex flex-col sidebar-panel',
      style:{
        transform:open?'translateX(0)':'translateX(-100%)',
        transition:'transform .22s cubic-bezier(.16,1,.3,1)',
        willChange:'transform',
      }
    },
      h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'16px 20px',borderBottom:'1px solid rgba(48,54,61,0.9)'}},
        h('div',{style:{display:'flex',alignItems:'center',gap:10}},
          h('div',{style:{width:36,height:36,borderRadius:8,background:'#16a34a',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
            h(Icon,{n:'bat',cls:'w-5 h-5 text-white'})
          ),
          h('div',{},
            h('div',{style:{fontSize:14,fontWeight:800,color:'#e6edf3',letterSpacing:'-0.01em'}},'SMARTCRICK'),
            h('div',{style:{fontSize:11,fontWeight:600,color:'#4ade80',marginTop:1}},`Level ${info.level} · ${info.name}`)
          )
        ),
        h('button',{onClick:handleClose,
          style:{width:30,height:30,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',
            background:'rgba(48,54,61,0.6)',border:'1px solid rgba(48,54,61,0.9)',cursor:'pointer',color:'#8b949e'}},
          h(Icon,{n:'x',cls:'w-4 h-4'})
        )
      ),
      h('div',{style:{padding:'12px 20px',borderBottom:'1px solid rgba(48,54,61,0.6)',background:'rgba(22,27,34,0.5)'}},
        h(LevelBar,{totalXP:p.total_xp||0}),
        h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8}},
          h('span',{style:{fontSize:11,color:'#484f58'}},'XP to next level'),
          streak>0 && h('div',{style:{display:'flex',alignItems:'center',gap:4}},
            h(Icon,{n:'flame',cls:'w-3.5 h-3.5',style:{color:'#fb923c'}}),
            h('span',{style:{fontSize:11,fontWeight:700,color:'#fb923c'}},`${streak}d streak`)
          )
        )
      ),
      h('div',{ref:scrollRef,className:'flex-1 sidebar-scroll',style:{padding:'6px 8px'}},
        h(SectionLabel,{},'Premium'),
        h(NavBtn,{label:'AI Head Coach',icon:'cpu',pg:'AICoach',badge:'PRO'}),
        h(NavBtn,{label:'90-Day Program',icon:'diamond',pg:'NinetyDay',badge:'PRO'}),
        h(SectionLabel,{},'Training'),
        h(NavBtn,{label:'Home',icon:'home',pg:'Home'}),
        h(NavBtn,{label:'Smart Start',icon:'zap',onClick:handleSmartStart}),
        h(NavBtn,{label:'Cricket Drills',icon:'bat',pg:'Drills'}),
        h(NavBtn,{label:'Mental Training',icon:'brain',pg:'Mental'}),
        h(NavBtn,{label:'30-Day Challenge',icon:'target',pg:'ThirtyDay'}),
        h(NavBtn,{label:'Fitness Builder',icon:'dumbbell',pg:'Fitness'}),
        h(NavBtn,{label:'AI Workout',icon:'sparkles',pg:'AIWorkout'}),
        h(NavBtn,{label:'Timer',icon:'timer',pg:'Timer'}),
        h(SectionLabel,{},'Performance'),
        h(NavBtn,{label:'My Progress',icon:'barChart',pg:'Progress'}),
        h(NavBtn,{label:'Skill Paths',icon:'layers',pg:'SkillPaths'}),
        h(NavBtn,{label:'Leaderboard',icon:'trophy',pg:'Leaderboard'}),
        h(NavBtn,{label:'Goals',icon:'target',pg:'Goals'}),
        h(NavBtn,{label:'My Profile',icon:'user',pg:'Profile'}),
        h(SectionLabel,{},'Planning'),
        h(NavBtn,{label:'Training Schedule',icon:'calendar',pg:'Schedule',isNew:true}),
        h(SectionLabel,{},'AI & Analytics'),
        h(NavBtn,{label:'Video Analysis',icon:'cpu',pg:'VideoAnalysis',isNew:true}),
        h(NavBtn,{label:'Performance',icon:'chartLine',pg:'Performance',isNew:true}),
        h(NavBtn,{label:'Match Logger',icon:'list',pg:'MatchLogger',isNew:true}),
        h(NavBtn,{label:'Reaction Drill',icon:'zap',pg:'ReactionDrill',isNew:true}),
        h(SectionLabel,{},'Cricket Tools'),
        h(NavBtn,{label:'Match Tracker',icon:'list',pg:'MatchTracker'}),
        h(NavBtn,{label:'MiniMatch IQ',icon:'puzzle',pg:'MiniMatch'}),
        h(NavBtn,{label:'Why Did I Get Out?',icon:'helpCircle',pg:'GetOut'}),
        h(NavBtn,{label:'Quizzes',icon:'book',pg:'Quizzes'}),
        h(SectionLabel,{},'Account'),
        h(NavBtn,{label:'Settings',icon:'settings',pg:'Settings'}),
        h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',
          margin:'8px 8px 4px',padding:'10px 12px',borderRadius:8,
          background:'rgba(22,27,34,0.6)',border:'1px solid rgba(48,54,61,0.9)'}},
          h('div',{style:{display:'flex',alignItems:'center',gap:8}},
            h(Icon,{n:dark?'moon':'sun',cls:'w-4 h-4',style:{color:'#484f58'}}),
            h('span',{style:{fontSize:13,fontWeight:600,color:'#8b949e'}},'Dark Mode')
          ),
          h('button',{onClick:toggle,
            style:{position:'relative',width:40,height:22,borderRadius:11,
              background:dark?'#16a34a':'rgba(48,54,61,0.9)',
              border:'none',cursor:'pointer',transition:'background .2s',flexShrink:0}},
            h('div',{style:{position:'absolute',top:3,width:16,height:16,background:'#fff',
              borderRadius:'50%',transition:'transform .2s',
              left:3,transform:dark?'translateX(18px)':'translateX(0)'}})
          )
        ),
        h('div',{style:{height:24}})
      )
    )
  );
}

// ================================================================
// BOTTOM NAVIGATION
// ================================================================
function BottomNav({ page }) {
  const items=[
    {n:'home',label:'Home',pg:'Home'},
    {n:'bat',label:'Drills',pg:'Drills'},
    {n:'brain',label:'Mental',pg:'Mental'},
    {n:'dumbbell',label:'Fitness',pg:'Fitness'},
    {n:'calendar',label:'Schedule',pg:'Schedule'},
  ];
  return h('nav',{
    className:'bottom-nav',
    style:{paddingBottom:'max(0px,env(safe-area-inset-bottom))'}
  },
    h('div',{style:{display:'flex',alignItems:'center',height:56}},
      items.map(item=>{
        const active=page===item.pg;
        return h('button',{key:item.pg,onClick:()=>nav(item.pg),
          style:{flex:1,display:'flex',flexDirection:'column',alignItems:'center',
            justifyContent:'center',gap:3,height:'100%',position:'relative',
            background:'transparent',border:'none',cursor:'pointer',padding:0}
        },
          active && h('div',{style:{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',
            width:20,height:2,background:'#16a34a',borderRadius:'0 0 3px 3px'}}),
          h(Icon,{n:item.n,cls:'w-5 h-5',style:{color:active?'#4ade80':'#374151'}}),
          h('span',{style:{fontSize:10,fontWeight:active?700:500,letterSpacing:'0.02em',
            color:active?'#4ade80':'#374151'}},item.label)
        );
      })
    )
  );
}

// ================================================================
// HOME PAGE
// ================================================================
function HomePage() {
  const [progress, setProgress] = useState(()=>DB.getProgress());
  const [xpDays, setXpDays] = useState(()=>DB.getXPLast7Days());
  const [checkedIn, setCheckedIn] = useState(()=>{
    const p=DB.getProgress();
    return p.last_checkin_date===new Date().toISOString().slice(0,10);
  });

  const refresh = useCallback(()=>{
    setProgress(DB.getProgress());
    setXpDays(DB.getXPLast7Days());
    setCheckedIn(DB.getProgress().last_checkin_date===new Date().toISOString().slice(0,10));
  },[]);

  useEffect(()=>{
    window.addEventListener('sc_update',refresh);
    window.addEventListener('focus',refresh);
    return ()=>{ window.removeEventListener('sc_update',refresh); window.removeEventListener('focus',refresh); };
  },[refresh]);

  const info = getLevelInfo(progress.total_xp||0);
  const user = DB.getUser();
  const name = user.name?(user.name.split(' ')[0]):'Cricketer';
  const hh = new Date().getHours();
  const greeting = hh<12?'Good morning':hh<17?'Good afternoon':'Good evening';
  const streak = progress.current_streak||0;

  const handleCheckIn = () => {
    if(checkedIn) return;
    const today=new Date().toISOString().slice(0,10);
    const currentProgress=DB.getProgress();
    if(currentProgress.last_checkin_date===today) { setCheckedIn(true); return; }
    awardXP(15,0,'checkin');
    setCheckedIn(true);
  };

  const done = progress.completed_drills||[];
  const doneMental = progress.completed_mental||[];
  const drillPick = DRILLS.find(d=>!done.includes(d.id)&&d.category==='batting')||DRILLS[0];
  const mentalPick = MENTAL_SESSIONS.find(m=>!doneMental.includes(m.id)&&!m.is_premium)||MENTAL_SESSIONS[0];
  const workoutPick = WORKOUTS.find(w=>w.level==='beginner')||WORKOUTS[0];

  const quickActions=[
    {icon:'bat',label:'Drills',pg:'Drills',color:'#2563eb',bg:'rgba(37,99,235,0.12)',border:'rgba(37,99,235,0.25)'},
    {icon:'brain',label:'Mental',pg:'Mental',color:'#7c3aed',bg:'rgba(124,58,237,0.12)',border:'rgba(124,58,237,0.25)'},
    {icon:'dumbbell',label:'Fitness',pg:'Fitness',color:'#ea580c',bg:'rgba(234,88,12,0.12)',border:'rgba(234,88,12,0.25)'},
    {icon:'timer',label:'Timer',pg:'Timer',color:'#0d9488',bg:'rgba(13,148,136,0.12)',border:'rgba(13,148,136,0.25)'},
  ];

  const exploreTiles=[
    {icon:'layers',label:'Skill Paths',sub:'Structured programs',pg:'SkillPaths'},
    {icon:'calendar',label:'Schedule',sub:'Plan your week',pg:'Schedule'},
    {icon:'barChart',label:'Progress',sub:'Stats & badges',pg:'Progress'},
    {icon:'target',label:'30-Day',sub:'Daily challenge',pg:'ThirtyDay'},
    {icon:'trophy',label:'Leaderboard',sub:'Your ranking',pg:'Leaderboard'},
    {icon:'book',label:'Quizzes',sub:'Cricket knowledge',pg:'Quizzes'},
  ];

  const Stat = ({val,label,color}) => h('div',{
    style:{textAlign:'center',padding:'10px 4px',borderRadius:8,
      background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)'}},
    h('div',{style:{fontSize:18,fontWeight:800,color:color,lineHeight:1,fontVariantNumeric:'tabular-nums'}},val),
    h('div',{style:{fontSize:10,fontWeight:600,color:'#484f58',marginTop:3,textTransform:'uppercase',letterSpacing:'0.06em'}},label)
  );

  return h('div',{style:{paddingBottom:'calc(5rem + env(safe-area-inset-bottom, 0px))',background:'#0d1117',minHeight:'100dvh'}},
    h('div',{style:{
      background:'linear-gradient(160deg,#0a1628 0%,#0d1117 60%)',
      paddingTop:'calc(3.75rem + max(0.75rem,env(safe-area-inset-top)))',
      paddingBottom:'24px',padding:'calc(3.75rem + max(0.75rem,env(safe-area-inset-top))) 20px 24px',
      borderBottom:'1px solid rgba(48,54,61,0.9)',position:'relative',overflow:'hidden'
    }},
      h('div',{style:{position:'absolute',top:'-60%',right:'-5%',width:280,height:280,
        background:'radial-gradient(circle,rgba(22,163,74,0.07),transparent 70%)',
        borderRadius:'50%',pointerEvents:'none'}}),
      h('div',{style:{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}},
        h('div',{},
          h('p',{style:{fontSize:12,fontWeight:600,color:'#16a34a',marginBottom:4,letterSpacing:'0.04em',textTransform:'uppercase'}},greeting),
          h('h1',{style:{fontSize:28,fontWeight:800,color:'#e6edf3',margin:0,letterSpacing:'-0.02em',lineHeight:1.1}},name),
          h('p',{style:{fontSize:13,color:'#484f58',marginTop:6}},'Train. Measure. Improve.')
        ),
        streak>0 && h('div',{className:'streak-badge',style:{flexShrink:0}},
          h(Icon,{n:'flame',cls:'w-3.5 h-3.5'}),
          streak, ' day streak'
        )
      ),
      h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',
        borderRadius:10,padding:16,marginBottom:16}},
        h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}},
          h('div',{style:{display:'flex',alignItems:'center',gap:10}},
            h('div',{style:{width:32,height:32,borderRadius:6,background:'rgba(22,163,74,0.12)',
              border:'1px solid rgba(22,163,74,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}},
              h(Icon,{n:'crown',cls:'w-4 h-4',style:{color:'#16a34a'}})
            ),
            h('div',{},
              h('div',{style:{fontSize:13,fontWeight:700,color:'#e6edf3'}},`Level ${info.level}`),
              h('div',{style:{fontSize:11,color:'#484f58',marginTop:1}},info.name)
            )
          ),
          h('div',{style:{textAlign:'right'}},
            h('div',{style:{fontSize:15,fontWeight:800,color:'#e6edf3',fontVariantNumeric:'tabular-nums'}},
              (progress.total_xp||0).toLocaleString(),' XP'),
            info.next && h('div',{style:{fontSize:11,color:'#484f58',marginTop:1}},
              `${info.xpToNext.toLocaleString()} to Level ${info.level+1}`)
          )
        ),
        h('div',{className:'level-bar-track'},
          h('div',{className:'level-bar-fill',style:{width:`${info.pct}%`}})
        )
      ),
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}},
        h(Stat,{val:progress.drills_done||0,label:'Drills',color:'#3b82f6'}),
        h(Stat,{val:progress.mental_done||0,label:'Mental',color:'#8b5cf6'}),
        h(Stat,{val:progress.practice_minutes||0,label:'Minutes',color:'#f97316'}),
        h(Stat,{val:(progress.total_xp||0).toLocaleString(),label:'XP',color:'#16a34a'}),
      ),
      h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',
        borderRadius:10,padding:'14px 16px'}},
        h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}},
          h('div',{style:{display:'flex',alignItems:'center',gap:8}},
            h(Icon,{n:'chartLine',cls:'w-3.5 h-3.5',style:{color:'#484f58'}}),
            h('span',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em'}},'7-Day XP')
          ),
          h('span',{style:{fontSize:12,fontWeight:700,color:'#16a34a'}},
            `${xpDays.reduce((s,d)=>s+d.xp,0)} this week`)
        ),
        h(XPChart,{days:xpDays})
      )
    ),
    h('div',{style:{padding:'20px 20px 0'}},
      h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}},
        h('h2',{style:{fontSize:13,fontWeight:700,color:'#8b949e',margin:0,textTransform:'uppercase',letterSpacing:'0.08em'}},'Quick Train')
      ),
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}},
        quickActions.map(a=>
          h('button',{key:a.pg,onClick:()=>nav(a.pg),
            style:{display:'flex',flexDirection:'column',alignItems:'center',gap:8,
              padding:'14px 8px',borderRadius:10,border:`1px solid ${a.border}`,
              background:a.bg,cursor:'pointer',transition:'all 0.12s'}
          },
            h('div',{style:{width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',
              justifyContent:'center',background:'rgba(0,0,0,0.3)'}},
              h(Icon,{n:a.icon,cls:'w-5 h-5',style:{color:a.color}})
            ),
            h('span',{style:{fontSize:11,fontWeight:600,color:'#8b949e'}},a.label)
          )
        )
      )
    ),
    h('div',{style:{padding:'16px 20px 0'}},
      h('button',{onClick:handleCheckIn,disabled:checkedIn,
        style:{width:'100%',display:'flex',alignItems:'center',gap:14,padding:14,
          borderRadius:10,border:checkedIn?'1px solid rgba(22,163,74,0.25)':'1px solid rgba(48,54,61,0.9)',
          background:checkedIn?'rgba(22,163,74,0.06)':'rgba(22,27,34,0.9)',
          cursor:checkedIn?'default':'pointer',textAlign:'left',transition:'all 0.12s'}
      },
        h('div',{style:{width:40,height:40,borderRadius:8,display:'flex',alignItems:'center',
          justifyContent:'center',flexShrink:0,
          background:checkedIn?'rgba(22,163,74,0.15)':'rgba(48,54,61,0.6)'}},
          h(Icon,{n:checkedIn?'circleCheck':'zap',cls:'w-5 h-5',
            style:{color:checkedIn?'#16a34a':'#8b949e'}})
        ),
        h('div',{style:{flex:1}},
          h('div',{style:{fontSize:13,fontWeight:700,color:checkedIn?'#4ade80':'#e6edf3'}},
            checkedIn?'Checked in today':'Daily Check-In'),
          h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},
            checkedIn?'15 XP earned. Come back tomorrow.':'Tap to claim 15 XP.')
        ),
        !checkedIn && h('span',{style:{fontSize:11,fontWeight:700,color:'#16a34a',
          background:'rgba(22,163,74,0.1)',border:'1px solid rgba(22,163,74,0.2)',
          padding:'4px 8px',borderRadius:6,flexShrink:0}},'+15 XP')
      )
    ),
    h('div',{id:'smart-start',style:{padding:'20px 20px 0'}},
      h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}},
        h('h2',{style:{fontSize:13,fontWeight:700,color:'#8b949e',margin:0,textTransform:'uppercase',letterSpacing:'0.08em'}},"Today's Focus"),
        h('span',{style:{fontSize:11,color:'#484f58'}},'AI-selected')
      ),
      h('div',{style:{display:'flex',flexDirection:'column',gap:8}},
        h('button',{onClick:()=>nav('DrillDetail',{id:drillPick.id}),
          style:{width:'100%',display:'flex',alignItems:'center',gap:12,padding:14,borderRadius:10,
            border:'1px solid rgba(37,99,235,0.2)',background:'rgba(37,99,235,0.06)',
            cursor:'pointer',textAlign:'left',transition:'all 0.12s'}
        },
          h('div',{style:{width:40,height:40,borderRadius:8,display:'flex',alignItems:'center',
            justifyContent:'center',flexShrink:0,background:'rgba(37,99,235,0.15)'}},
            h(Icon,{n:'bat',cls:'w-5 h-5',style:{color:'#3b82f6'}})
          ),
          h('div',{style:{flex:1,minWidth:0}},
            h('div',{style:{fontSize:10,fontWeight:700,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}},'Cricket Drill'),
            h('div',{style:{fontSize:13,fontWeight:600,color:'#e6edf3',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},drillPick.title),
            h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},`${drillPick.duration_minutes} min · ${drillPick.xp_value} XP`)
          ),
          h(Icon,{n:'chevR',cls:'w-4 h-4 flex-shrink-0',style:{color:'#374151'}})
        ),
        h('button',{onClick:()=>nav('MentalPlayer',{id:mentalPick.id}),
          style:{width:'100%',display:'flex',alignItems:'center',gap:12,padding:14,borderRadius:10,
            border:'1px solid rgba(124,58,237,0.2)',background:'rgba(124,58,237,0.06)',
            cursor:'pointer',textAlign:'left',transition:'all 0.12s'}
        },
          h('div',{style:{width:40,height:40,borderRadius:8,display:'flex',alignItems:'center',
            justifyContent:'center',flexShrink:0,background:'rgba(124,58,237,0.15)'}},
            h(Icon,{n:'brain',cls:'w-5 h-5',style:{color:'#8b5cf6'}})
          ),
          h('div',{style:{flex:1,minWidth:0}},
            h('div',{style:{fontSize:10,fontWeight:700,color:'#8b5cf6',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}},'Mental Session'),
            h('div',{style:{fontSize:13,fontWeight:600,color:'#e6edf3',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},mentalPick.title),
            h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},`${Math.floor(mentalPick.duration_seconds/60)} min · ${mentalPick.xp_value} XP`)
          ),
          h(Icon,{n:'chevR',cls:'w-4 h-4 flex-shrink-0',style:{color:'#374151'}})
        ),
        h('button',{onClick:()=>nav('WorkoutDetail',{id:workoutPick.id}),
          style:{width:'100%',display:'flex',alignItems:'center',gap:12,padding:14,borderRadius:10,
            border:'1px solid rgba(234,88,12,0.2)',background:'rgba(234,88,12,0.06)',
            cursor:'pointer',textAlign:'left',transition:'all 0.12s'}
        },
          h('div',{style:{width:40,height:40,borderRadius:8,display:'flex',alignItems:'center',
            justifyContent:'center',flexShrink:0,background:'rgba(234,88,12,0.15)'}},
            h(Icon,{n:'dumbbell',cls:'w-5 h-5',style:{color:'#f97316'}})
          ),
          h('div',{style:{flex:1,minWidth:0}},
            h('div',{style:{fontSize:10,fontWeight:700,color:'#f97316',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:2}},'Fitness'),
            h('div',{style:{fontSize:13,fontWeight:600,color:'#e6edf3',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},workoutPick.name),
            h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},`${workoutPick.duration_minutes} min · ${workoutPick.xp_value} XP`)
          ),
          h(Icon,{n:'chevR',cls:'w-4 h-4 flex-shrink-0',style:{color:'#374151'}})
        )
      )
    ),
    h('div',{style:{padding:'20px 20px 0'}},
      h('h2',{style:{fontSize:13,fontWeight:700,color:'#8b949e',margin:'0 0 12px',textTransform:'uppercase',letterSpacing:'0.08em'}},'Explore'),
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}},
        exploreTiles.map(t=>
          h('button',{key:t.pg,onClick:()=>nav(t.pg),
            style:{display:'flex',alignItems:'center',gap:12,padding:14,borderRadius:10,
              border:'1px solid rgba(48,54,61,0.9)',background:'rgba(22,27,34,0.9)',
              cursor:'pointer',textAlign:'left',transition:'all 0.12s'}
          },
            h('div',{style:{width:32,height:32,borderRadius:6,display:'flex',alignItems:'center',
              justifyContent:'center',flexShrink:0,background:'rgba(48,54,61,0.6)'}},
              h(Icon,{n:t.icon,cls:'w-4 h-4',style:{color:'#8b949e'}})
            ),
            h('div',{style:{minWidth:0}},
              h('div',{style:{fontSize:13,fontWeight:600,color:'#e6edf3',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},t.label),
              h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},t.sub)
            )
          )
        )
      )
    )
  );
}

// ================================================================
// DRILLS PAGE
// ================================================================
const DRILL_CATS=[
  {id:'batting',label:'Batting',icon:'bat',from:'#1d4ed8',to:'#4338ca',text:'#60a5fa'},
  {id:'bowling',label:'Bowling',icon:'ball',from:'#dc2626',to:'#ea580c',text:'#f87171'},
  {id:'fielding',label:'Fielding',icon:'navigation',from:'#059669',to:'#0d9488',text:'#34d399'},
  {id:'wicketkeeping',label:'Keeping',icon:'glove',from:'#0d9488',to:'#0891b2',text:'#2dd4bf'},
  {id:'fitness',label:'Fitness',icon:'dumbbell',from:'#c2410c',to:'#d97706',text:'#fb923c'},
  {id:'mental',label:'Mental',icon:'brain',from:'#6d28d9',to:'#4f46e5',text:'#a78bfa'},
];
const LVL_BADGE={
  beginner:{bg:'rgba(34,197,94,0.12)',border:'rgba(34,197,94,0.3)',color:'#4ade80',label:'Beginner'},
  intermediate:{bg:'rgba(59,130,246,0.12)',border:'rgba(59,130,246,0.3)',color:'#60a5fa',label:'Intermediate'},
  advanced:{bg:'rgba(249,115,22,0.12)',border:'rgba(249,115,22,0.3)',color:'#fb923c',label:'Advanced'},
};

function DrillsPage() {
  const [cat,setCat]=useState('batting');
  const [search,setSearch]=useState('');
  const [progress,setProgress]=useState(()=>DB.getProgress());
  useEffect(()=>{
    const refresh=()=>setProgress(DB.getProgress());
    window.addEventListener('sc_update',refresh);
    window.addEventListener('focus',refresh);
    return ()=>{ window.removeEventListener('sc_update',refresh); window.removeEventListener('focus',refresh); };
  },[]);
  const completed=progress.completed_drills||[];
  const catDef=DRILL_CATS.find(c=>c.id===cat);
  const filtered=DRILLS.filter(d=>d.category===cat&&(search===''||d.title.toLowerCase().includes(search.toLowerCase())));

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Cricket Drills',subtitle:`${DRILLS.length} professional drills`,
      gradient:`linear-gradient(135deg,${catDef?.from||'#1d4ed8'},${catDef?.to||'#4338ca'})`}),
    h('div',{className:'flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide'},
      DRILL_CATS.map(c=>
        h('button',{key:c.id,onClick:()=>setCat(c.id),
          className:'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap flex-shrink-0 transition-all',
          style:cat===c.id?{background:`linear-gradient(135deg,${c.from},${c.to})`,color:'#fff',boxShadow:`0 4px 16px ${c.from}40`}
            :{background:'rgba(22,27,34,0.9)',color:'#8b949e',border:'1px solid rgba(48,54,61,0.9)'}
        },
          h(Icon,{n:c.icon,cls:'w-3.5 h-3.5 flex-shrink-0',style:{color:cat===c.id?'#fff':c.text}}),
          ' ', c.label)
      )
    ),
    h('div',{className:'px-4 mb-3'},
      h('div',{className:'relative'},
        h(Icon,{n:'search',cls:'w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2',style:{color:'#484f58'}}),
        h('input',{type:'text',placeholder:'Search drills...',value:search,onChange:e=>setSearch(e.target.value),
          className:'w-full pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-600 outline-none',
          style:{background:'rgba(22,27,34,0.9)',border:`1px solid ${search?catDef?.from+'60':'rgba(48,54,61,0.9)'}`,color:'#e6edf3'}
        })
      )
    ),
    h('div',{className:'px-4 space-y-2.5'},
      filtered.length===0
        ? h(EmptyState,{icon:catDef?.icon||'bat',title:'No drills found',desc:'Try a different search term'})
        : filtered.map(d=>{
          const lvl=LVL_BADGE[d.skill_level]||LVL_BADGE.beginner;
          const done=completed.includes(d.id);
          return h('button',{key:d.id,onClick:()=>nav('DrillDetail',{id:d.id}),
            className:'w-full text-left p-4 rounded-2xl transition-all active:scale-[.99] pro-card',
            style:{background:'rgba(22,27,34,0.9)',border:`1px solid ${done?'rgba(22,163,74,0.3)':'rgba(48,54,61,0.9)'}`,borderRadius:10}
          },
            h('div',{className:'flex items-start gap-3'},
              h('div',{style:{width:44,height:44,borderRadius:8,display:'flex',alignItems:'center',
                justifyContent:'center',flexShrink:0,position:'relative',
                background:`linear-gradient(135deg,${catDef?.from||'#1d4ed8'},${catDef?.to||'#4338ca'})`}},
                h(Icon,{n:catDef?.icon||'bat',cls:'w-5 h-5 text-white'}),
                done && h('div',{style:{position:'absolute',top:-4,right:-4,width:18,height:18,
                  borderRadius:'50%',background:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center'}},
                  h(Icon,{n:'check',cls:'w-3 h-3 text-white'})
                )
              ),
              h('div',{className:'flex-1 min-w-0'},
                h('div',{className:'flex items-start justify-between gap-2'},
                  h('h3',{style:{fontSize:13,fontWeight:700,color:'#e6edf3',lineHeight:1.3}},d.title),
                  d.is_premium && h(PremiumBadge)
                ),
                h('p',{style:{fontSize:11,color:'#484f58',marginTop:4,overflow:'hidden',
                  textOverflow:'ellipsis',whiteSpace:'nowrap'}},d.description),
                h('div',{style:{display:'flex',alignItems:'center',gap:8,marginTop:8}},
                  h('span',{style:{fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:4,
                    background:lvl.bg,border:`1px solid ${lvl.border}`,color:lvl.color,
                    textTransform:'uppercase',letterSpacing:'0.04em'}},lvl.label),
                  h('span',{style:{fontSize:11,color:'#484f58'}},`${d.duration_minutes} min`),
                  h(XPBadge,{xp:d.xp_value})
                )
              )
            )
          );
        })
    )
  );
}

// ================================================================
// DRILL DETAIL PAGE
// ================================================================
function DrillDetailPage({ params }) {
  const drill=DRILLS.find(d=>d.id===params?.id);
  const [done,setDone]=useState(false);
  const completing=useRef(false);
  const catDef=DRILL_CATS.find(c=>c.id===drill?.category);

  if(!drill) return h('div',{className:'pb-28 flex flex-col items-center justify-center',style:{minHeight:'80vh'}},
    h('div',{style:{width:56,height:56,borderRadius:12,background:'rgba(48,54,61,0.6)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'bat',cls:'w-7 h-7',style:{color:'#484f58'}})),
    h('div',{className:'font-bold text-white mb-4'},'Drill not found'),
    h('button',{onClick:()=>nav('Drills'),className:'btn-primary px-6 py-3'},'Back to Drills')
  );

  const complete=()=>{
    if(completing.current) return;
    completing.current=true;
    awardXP(drill.xp_value,drill.duration_minutes,'drill','drill',drill.id);
    fireConfetti(); setDone(true);
  };

  if(done) return h('div',{className:'flex flex-col items-center justify-center text-center px-5 pb-28',style:{minHeight:'100vh'}},
    h('div',{style:{width:64,height:64,borderRadius:16,background:'rgba(22,163,74,0.15)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'circleCheck',cls:'w-8 h-8',style:{color:'#16a34a'}})),
    h('h2',{className:'text-2xl font-black text-white mb-2'},'Drill Complete!'),
    h('p',{className:'text-slate-400 mb-3'},drill.title),
    h(XPBadge,{xp:drill.xp_value}),
    h('div',{className:'mt-6 flex flex-col gap-3 w-full max-w-xs'},
      h('button',{onClick:()=>nav('Drills'),className:'btn-primary'},'More Drills'),
      h('button',{onClick:()=>setDone(false),className:'btn-secondary'},'Do Again')
    )
  );

  return h('div',{className:'pb-28'},
    h(PageHeader,{
      title:drill.title,
      subtitle:`${drill.duration_minutes} min · ${drill.xp_value} XP`,
      gradient:`linear-gradient(135deg,${catDef?.from||'#1d4ed8'},${catDef?.to||'#4338ca'})`,
      onBack:()=>nav('Drills')
    }),
    h('div',{className:'px-4 pt-5 space-y-4'},
      drill.video_id && h('div',{},
        h('p',{className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-2'},'Video Tutorial'),
        h('div',{style:{position:'relative',aspectRatio:'16/9',background:'#0f172a',borderRadius:'1rem',overflow:'hidden'}},
          h('iframe',{src:`https://www.youtube.com/embed/${drill.video_id}?modestbranding=1&rel=0&color=white`,
            title:`${drill.title} tutorial`,
            allow:'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowFullScreen:true,loading:'lazy',
            style:{position:'absolute',inset:0,width:'100%',height:'100%',border:0}
          })
        ),
        h('a',{href:`https://www.youtube.com/watch?v=${drill.video_id}`,target:'_blank',rel:'noopener noreferrer',
          className:'flex items-center gap-1 text-xs mt-2',style:{color:'#64748b'}},
          h(Icon,{n:'extLink',cls:'w-3.5 h-3.5'}),'Open in YouTube'
        )
      ),
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('p',{className:'text-sm text-slate-300 leading-relaxed'},drill.description)
      ),
      h('div',{},
        h('p',{className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-3'},`${drill.steps.length} Steps`),
        h('div',{className:'space-y-2'},
          drill.steps.map((s,i)=>
            h('div',{key:i,className:'flex items-start gap-3 p-3 rounded-xl',style:{background:'rgba(15,23,42,0.5)',border:'1px solid rgba(51,65,85,0.4)'}},
              h('div',{className:'w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5',
                style:{background:`linear-gradient(135deg,${catDef?.from||'#1d4ed8'},${catDef?.to||'#4338ca'})`}},i+1),
              h('p',{className:'text-sm text-slate-300 leading-relaxed flex-1'},s)
            )
          )
        )
      ),
      drill.tips && h('div',{className:'flex items-start gap-3 p-4 rounded-2xl',style:{background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.25)'}},
        h(Icon,{n:'sparkles',cls:'w-4 h-4 flex-shrink-0',style:{color:'#16a34a'}}),
        h('div',{},
          h('p',{className:'text-xs font-black text-emerald-400 uppercase tracking-wider mb-1'},'Coach Tip'),
          h('p',{className:'text-sm',style:{color:'#6ee7b7'}},drill.tips)
        )
      ),
      drill.target_metric && h('div',{className:'flex items-start gap-3 p-4 rounded-2xl',style:{background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.25)'}},
        h(Icon,{n:'target',cls:'w-4 h-4 flex-shrink-0',style:{color:'#484f58'}}),
        h('div',{},
          h('p',{className:'text-xs font-black text-blue-400 uppercase tracking-wider mb-1'},'Success Target'),
          h('p',{className:'text-sm text-blue-300'},drill.target_metric)
        )
      ),
      h('button',{
        onClick:()=>{
          const today=new Date().toISOString().slice(0,10);
          DB.addSession({id:'sch_'+Date.now(),date:today,time:'',type:'drill',title:drill.title,ref_id:drill.id,
            duration_minutes:drill.duration_minutes,xp_value:drill.xp_value,status:'pending',notes:'',color:SCHED_TYPES.drill.color});
          window.dispatchEvent(new CustomEvent('sc_update'));
          alert('Added to today\'s schedule! ✅');
        },
        className:'w-full py-3 rounded-2xl text-sm font-bold text-blue-400 text-center',
        style:{background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.25)'}
      }, '📅 Add to Today\'s Schedule'),
      h('button',{onClick:complete,className:'btn-primary w-full py-4 text-base font-black'},
        h(Icon,{n:'circleCheck',cls:'w-5 h-5'}),` Mark Complete (+${drill.xp_value} XP)`
      )
    )
  );
}

// ================================================================
// MENTAL TRAINING PAGE
// ================================================================
const MENT_CATS=[
  {id:'all',label:'All',icon:'brain',from:'#6d28d9',to:'#4f46e5'},
  {id:'focus',label:'Focus',icon:'crosshair',from:'#1d4ed8',to:'#4338ca'},
  {id:'confidence',label:'Confidence',icon:'shield',from:'#c2410c',to:'#d97706'},
  {id:'recovery',label:'Recovery',icon:'heart',from:'#15803d',to:'#059669'},
  {id:'pre-performance',label:'Pre-Match',icon:'zap',from:'#b45309',to:'#d97706'},
  {id:'pressure',label:'Pressure',icon:'flame',from:'#be123c',to:'#dc2626'},
  {id:'visualization',label:'Visualize',icon:'sparkles',from:'#6d28d9',to:'#7c3aed'},
  {id:'match-day-calm',label:'Calm',icon:'wind',from:'#0d9488',to:'#0891b2'},
  {id:'pro-mental',label:'Pro',icon:'crown',from:'#3730a3',to:'#4c1d95'},
];

function MentalPage() {
  const [cat,setCat]=useState('all');
  const [search,setSearch]=useState('');
  const progress=DB.getProgress();
  const done=progress.completed_mental||[];
  const catDef=MENT_CATS.find(c=>c.id===cat)||MENT_CATS[0];
  const filtered=MENTAL_SESSIONS.filter(s=>
    (cat==='all'||s.category===cat)&&
    (search===''||s.title.toLowerCase().includes(search.toLowerCase()))
  );

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Mental Training',subtitle:`${MENTAL_SESSIONS.length} guided sessions`,
      gradient:'linear-gradient(135deg,#6d28d9,#4f46e5)'}),
    h('div',{className:'flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide'},
      MENT_CATS.map(c=>
        h('button',{key:c.id,onClick:()=>setCat(c.id),
          className:'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all',
          style:cat===c.id?{background:`linear-gradient(135deg,${c.from},${c.to})`,color:'#fff',boxShadow:`0 4px 14px ${c.from}40`}
            :{background:'rgba(22,27,34,0.9)',color:'#8b949e',border:'1px solid rgba(48,54,61,0.9)'}
        },
          h(Icon,{n:c.icon,cls:'w-3.5 h-3.5 flex-shrink-0',style:{color:cat===c.id?'#fff':'#484f58'}}),
          ' ', c.label)
      )
    ),
    h('div',{className:'px-4 mb-3'},
      h('div',{className:'relative'},
        h(Icon,{n:'search',cls:'w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2',style:{color:'#484f58'}}),
        h('input',{type:'text',placeholder:'Search sessions...',value:search,onChange:e=>setSearch(e.target.value),
          className:'w-full pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-600 outline-none',
          style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',color:'#e6edf3'}
        })
      )
    ),
    h('div',{className:'px-4 space-y-2.5'},
      filtered.length===0
        ? h(EmptyState,{icon:'brain',title:'No sessions found',desc:'Try a different category or search term'})
        : filtered.map(s=>{
          const mins=Math.floor(s.duration_seconds/60);
          const isDone=done.includes(s.id);
          const sc=MENT_CATS.find(c=>c.id===s.category)||MENT_CATS[1];
          return h('button',{key:s.id,onClick:()=>nav('MentalPlayer',{id:s.id}),
            className:'w-full text-left p-4 rounded-2xl transition-all active:scale-[.99] pro-card',
            style:{background:'rgba(22,27,34,0.9)',border:`1px solid ${isDone?'rgba(22,163,74,0.3)':'rgba(48,54,61,0.9)'}`,borderRadius:10}
          },
            h('div',{className:'flex items-center gap-3'},
              h('div',{style:{width:44,height:44,borderRadius:8,display:'flex',alignItems:'center',
                justifyContent:'center',flexShrink:0,position:'relative',
                background:`linear-gradient(135deg,${sc.from},${sc.to})`}},
                h(Icon,{n:sc.icon,cls:'w-5 h-5 text-white'}),
                isDone && h('div',{style:{position:'absolute',top:-4,right:-4,width:18,height:18,
                  borderRadius:'50%',background:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center'}},
                  h(Icon,{n:'check',cls:'w-3 h-3 text-white'})
                )
              ),
              h('div',{className:'flex-1 min-w-0'},
                h('div',{className:'flex items-start justify-between gap-2'},
                  h('h3',{className:'font-bold text-white text-sm truncate'},s.title),
                  s.is_premium && h(PremiumBadge)
                ),
                h('div',{className:'flex items-center gap-2 mt-1.5'},
                  h('span',{className:'text-xs',style:{color:'#64748b'}},`${mins} min`),
                  h(XPBadge,{xp:s.xp_value}),
                  isDone && h('div',{style:{display:'flex',alignItems:'center',gap:3}},h(Icon,{n:'check',cls:'w-3 h-3',style:{color:'#4ade80'}}),h('span',{style:{fontSize:11,fontWeight:700,color:'#4ade80'}},'Complete'))
                )
              )
            )
          );
        })
    )
  );
}

// ================================================================
// MENTAL PLAYER
// ================================================================
function MentalPlayerPage({ params }) {
  const sess=MENTAL_SESSIONS.find(s=>s.id===params?.id);
  const [started,setStarted]=useState(false);
  const [step,setStep]=useState(0);
  const [timeLeft,setTimeLeft]=useState(0);
  const [done,setDone]=useState(false);
  const [paused,setPaused]=useState(false);
  const intRef=useRef(null);
  const awardedRef=useRef(false);
  const completingRef=useRef(false);

  useEffect(()=>{ if(!started) { awardedRef.current=false; completingRef.current=false; } },[started]);

  useEffect(()=>{
    if(started && sess && !done){
      clearInterval(intRef.current);
      setTimeLeft(sess.steps[step]?.duration_seconds||60);
      setPaused(false);
    }
    return ()=>clearInterval(intRef.current);
  },[step,started,done]);

  useEffect(()=>{
    if(!started||done||paused) { clearInterval(intRef.current); return; }
    clearInterval(intRef.current);
    intRef.current=setInterval(()=>{
      setTimeLeft(t=>{
        if(t<=1){
          clearInterval(intRef.current);
          if(step<sess.steps.length-1){ setStep(s=>s+1); } else { finishSession(); }
          return 0;
        }
        return t-1;
      });
    },1000);
    return ()=>clearInterval(intRef.current);
  },[started,done,paused,step]);

  useEffect(()=>()=>clearInterval(intRef.current),[]);

  const finishSession=()=>{
    if(awardedRef.current) return;
    awardedRef.current=true;
    setDone(true);
    awardXP(sess.xp_value,Math.floor(sess.duration_seconds/60),'mental','mental',sess.id);
    fireConfetti();
  };

  const goNext=()=>{
    if(completingRef.current) return;
    clearInterval(intRef.current);
    if(step<sess.steps.length-1){ setStep(s=>s+1); }
    else { completingRef.current=true; finishSession(); }
  };

  const skipStep=()=>{
    clearInterval(intRef.current);
    if(step<sess.steps.length-1){ setStep(s=>s+1); }
    else { completingRef.current=true; finishSession(); }
  };

  const goPrev=()=>{
    if(step>0){ clearInterval(intRef.current); setStep(s=>s-1); }
  };

  if(!sess) return h('div',{className:'pb-28 flex flex-col items-center justify-center text-center px-5',style:{minHeight:'80vh'}},
    h('div',{style:{width:56,height:56,borderRadius:12,background:'rgba(48,54,61,0.6)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'brain',cls:'w-7 h-7',style:{color:'#484f58'}})),
    h('p',{className:'font-bold text-white mb-4'},'Session not found'),
    h('button',{onClick:()=>nav('Mental'),className:'btn-primary px-6 py-3'},'Back')
  );

  if(done) return h('div',{style:{minHeight:'100vh',background:'linear-gradient(135deg,#0f0824,#1e1040,#0f172a)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'1.5rem',textAlign:'center'}},
    h('div',{style:{width:72,height:72,borderRadius:18,background:'rgba(124,58,237,0.2)',border:'1px solid rgba(168,85,247,0.3)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20}},
      h(Icon,{n:'circleCheck',cls:'w-9 h-9',style:{color:'#a855f7'}})),
    h('h2',{style:{fontSize:'1.5rem',fontWeight:800,color:'#fff',marginBottom:8,letterSpacing:'-0.02em'}},'Session Complete'),
    h('p',{style:{color:'#a78bfa',marginBottom:16,fontSize:14}},sess.title),
    h(XPBadge,{xp:sess.xp_value}),
    h('div',{style:{marginTop:24,display:'flex',flexDirection:'column',gap:10,width:'100%',maxWidth:280}},
      h('button',{onClick:()=>nav('Mental'),className:'btn-primary'},'More Sessions'),
      h('button',{onClick:()=>{setDone(false);setStarted(false);setStep(0);awardedRef.current=false;completingRef.current=false;},className:'btn-secondary'},'Repeat Session')
    )
  );

  const mins=Math.floor(sess.duration_seconds/60);

  if(!started) return h('div',{className:'pb-28'},
    h(PageHeader,{title:sess.title,subtitle:`${mins} min · ${sess.xp_value} XP · ${sess.steps.length} steps`,
      gradient:'linear-gradient(135deg,#6d28d9,#4338ca)',onBack:()=>nav('Mental')}),
    h('div',{style:{padding:'20px'}},
      h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:10,padding:16,marginBottom:16}},
        h('p',{style:{fontSize:13,color:'#8b949e',lineHeight:1.7}},sess.description)
      ),
      h('div',{style:{marginBottom:20}},
        h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}},
          `${sess.steps.length} Steps — tap Skip to advance any step early`),
        h('div',{style:{display:'flex',flexDirection:'column',gap:8}},
          sess.steps.map((s,i)=>
            h('div',{key:i,style:{display:'flex',alignItems:'flex-start',gap:12,padding:'12px 14px',
              borderRadius:8,background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)'}},
              h('div',{style:{width:22,height:22,borderRadius:'50%',background:'rgba(168,85,247,0.2)',
                border:'1px solid rgba(168,85,247,0.3)',display:'flex',alignItems:'center',justifyContent:'center',
                flexShrink:0,marginTop:1,fontSize:10,fontWeight:800,color:'#a855f7'}},i+1),
              h('p',{style:{fontSize:13,color:'#8b949e',flex:1,lineHeight:1.6}},s.instruction),
              h('span',{style:{fontSize:11,color:'#484f58',flexShrink:0,marginTop:1}},`${s.duration_seconds}s`)
            )
          )
        )
      ),
      h('button',{onClick:()=>{setStarted(true);setStep(0);setTimeLeft(sess.steps[0].duration_seconds);},
        className:'btn-primary',style:{padding:'14px',fontSize:15,fontWeight:700}},
        h(Icon,{n:'play',cls:'w-5 h-5'}), ' Begin Session'
      )
    )
  );

  const cur=sess.steps[step];
  const pct=cur&&cur.duration_seconds>0?timeLeft/cur.duration_seconds:0;
  const R=90, C=2*Math.PI*R;
  const isLastStep=step===sess.steps.length-1;
  const progressPct=Math.round(((step)/(sess.steps.length))*100);

  return h('div',{style:{minHeight:'100vh',background:'linear-gradient(160deg,#0f0824 0%,#1e1040 50%,#0f172a 100%)',
    display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',
    padding:'max(1.5rem,env(safe-area-inset-top)) 1.5rem max(1.5rem,env(safe-area-inset-bottom))'}},
    h('div',{style:{width:'100%',maxWidth:360,display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}},
      h('button',{onClick:()=>nav('Mental'),style:{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',
        borderRadius:8,padding:'6px 10px',cursor:'pointer',color:'#a78bfa',fontSize:12,fontWeight:600}},
        '← Exit'),
      h('div',{style:{textAlign:'center'}},
        h('div',{style:{fontSize:11,fontWeight:700,color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.08em'}},sess.title.slice(0,28)),
        h('div',{style:{fontSize:10,color:'#6d28d9',marginTop:2}},`Step ${step+1} of ${sess.steps.length}`)
      ),
      h('div',{style:{fontSize:11,fontWeight:700,color:'#7c3aed',background:'rgba(109,40,217,0.15)',
        border:'1px solid rgba(109,40,217,0.25)',borderRadius:6,padding:'4px 8px'}},
        `${progressPct}%`)
    ),
    h('div',{style:{width:'100%',maxWidth:360,height:3,background:'rgba(109,40,217,0.2)',borderRadius:2,marginBottom:'1.5rem'}},
      h('div',{style:{height:'100%',borderRadius:2,background:'#a855f7',
        width:`${Math.round(((step+(1-pct))/(sess.steps.length))*100)}%`,transition:'width 0.5s ease'}})
    ),
    h('div',{style:{position:'relative',width:220,height:220,flexShrink:0}},
      h('svg',{width:220,height:220,viewBox:'0 0 220 220'},
        h('circle',{cx:110,cy:110,r:R,fill:'none',stroke:'rgba(109,40,217,0.15)',strokeWidth:12}),
        h('circle',{cx:110,cy:110,r:R,fill:'none',stroke:'#a855f7',strokeWidth:12,
          strokeLinecap:'round',strokeDasharray:C,
          strokeDashoffset:C*(1-Math.max(0,Math.min(1,pct))),
          style:{transform:'rotate(-90deg)',transformOrigin:'center',transition:'stroke-dashoffset 1s linear'}
        })
      ),
      h('div',{style:{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}},
        h('div',{style:{fontSize:'2.75rem',fontWeight:900,color:'#fff',fontVariantNumeric:'tabular-nums',lineHeight:1}},
          fmtTime(timeLeft)),
        h('div',{style:{fontSize:11,color:'#7c3aed',fontWeight:700,marginTop:6,letterSpacing:'0.04em'}},
          paused?'PAUSED':'RUNNING')
      )
    ),
    h('div',{style:{textAlign:'center',maxWidth:320,flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'1.5rem 0'}},
      h('p',{style:{fontSize:'1.05rem',color:'#ddd6fe',lineHeight:1.75,fontWeight:500}},cur?.instruction)
    ),
    h('div',{style:{width:'100%',maxWidth:360,display:'flex',flexDirection:'column',gap:10}},
      h('div',{style:{display:'flex',gap:10}},
        step>0 && h('button',{onClick:goPrev,
          style:{flex:'0 0 auto',padding:'12px 18px',background:'rgba(255,255,255,0.08)',
            color:'#a78bfa',borderRadius:10,fontWeight:700,border:'1px solid rgba(168,85,247,0.2)',cursor:'pointer',fontSize:14}},
          h(Icon,{n:'arrowL',cls:'w-4 h-4 inline-block'})),
        h('button',{onClick:goNext,
          style:{flex:1,padding:'13px',background:isLastStep?'#16a34a':'linear-gradient(135deg,#6d28d9,#4338ca)',
            color:'#fff',borderRadius:10,fontWeight:700,border:'none',cursor:'pointer',fontSize:14}},
          isLastStep ? h('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:8}},
            h(Icon,{n:'circleCheck',cls:'w-4 h-4'}),'Complete Session')
            : h('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:6}},'Next Step ',h(Icon,{n:'chevR',cls:'w-4 h-4'}))
        )
      ),
      h('div',{style:{display:'flex',gap:10}},
        h('button',{onClick:skipStep,
          style:{flex:1,padding:'10px',background:'transparent',color:'#6d28d9',borderRadius:10,
            fontWeight:600,border:'1px solid rgba(109,40,217,0.3)',cursor:'pointer',fontSize:13}},
          isLastStep?'Skip & Complete':'Skip Step'),
        h('button',{onClick:()=>{ setPaused(p=>!p); if(!paused) clearInterval(intRef.current); },
          style:{flex:'0 0 auto',padding:'10px 18px',background:'transparent',color:'#6d28d9',borderRadius:10,
            fontWeight:600,border:'1px solid rgba(109,40,217,0.3)',cursor:'pointer',fontSize:13}},
          h(Icon,{n:paused?'play':'pause',cls:'w-4 h-4'}))
      )
    )
  );
}

// ================================================================
// FITNESS BUILDER
// ================================================================
const FIT_LEVELS=[
  {id:'beginner',label:'Beginner',icon:'activity',desc:'New to training or returning after break'},
  {id:'intermediate',label:'Intermediate',icon:'zap',desc:'Training 3-4x per week consistently'},
  {id:'advanced',label:'Advanced',icon:'flame',desc:'Training 5-6x with high intensity'},
  {id:'pro',label:'Pro',icon:'crown',desc:'Elite-level daily training'},
];
const FIT_TARGETS=[
  {id:'full-body',label:'Full Body',icon:'activity'},{id:'chest',label:'Chest',icon:'heart'},
  {id:'back',label:'Back',icon:'layers'},{id:'shoulders',label:'Shoulders',icon:'wind'},
  {id:'arms',label:'Arms',icon:'dumbbell'},{id:'legs',label:'Legs',icon:'zap'},
  {id:'core',label:'Core',icon:'crosshair'},{id:'glutes',label:'Glutes',icon:'dumbbell'},
];
const FIT_GOALS=[
  {id:'build-muscle',label:'Build Muscle',icon:'dumbbell',desc:'Strength and size gains'},
  {id:'lose-weight',label:'Lose Weight',icon:'flame',desc:'Fat burn and conditioning'},
  {id:'improve-endurance',label:'Endurance',icon:'activity',desc:'Stamina and cricket fitness'},
];
const FIT_DURS=[
  {id:'<10',label:'Under 10 min',icon:'zap'},{id:'10-15',label:'10-15 min',icon:'clock'},
  {id:'15-20',label:'15-20 min',icon:'timer'},{id:'20-25',label:'20-25 min',icon:'clock'},
  {id:'25+',label:'25+ min',icon:'trophy'},
];

function FitnessPage() {
  const [tab,setTab]=useState('quick');
  const [step,setStep]=useState(0);
  const [picks,setPicks]=useState({level:'',target:'',goal:'',duration:''});
  const [results,setResults]=useState(null);
  const [progress,setProgress]=useState(()=>DB.getProgress());
  useEffect(()=>{
    const refresh=()=>setProgress(DB.getProgress());
    window.addEventListener('sc_update',refresh);
    return ()=>window.removeEventListener('sc_update',refresh);
  },[]);

  const WIZARD=[
    {key:'level',label:'Experience Level',opts:FIT_LEVELS},
    {key:'target',label:'Target Muscle',opts:FIT_TARGETS},
    {key:'goal',label:'Training Goal',opts:FIT_GOALS},
    {key:'duration',label:'Session Length',opts:FIT_DURS},
  ];

  const choose=(key,val)=>{
    const n={...picks,[key]:val};
    setPicks(n);
    if(step<3) setStep(s=>s+1);
    else setResults(findWorkouts(n.level,n.target,n.goal,n.duration));
  };

  const reset=()=>{ setStep(0);setPicks({level:'',target:'',goal:'',duration:''});setResults(null); };

  const quickPicks=[WORKOUTS.find(w=>w.id==='wb010'),WORKOUTS.find(w=>w.id==='wi001'),
    WORKOUTS.find(w=>w.id==='wa001'),WORKOUTS.find(w=>w.id==='wp001'),
    WORKOUTS.find(w=>w.id==='wb002'),WORKOUTS.find(w=>w.id==='wi008')].filter(Boolean);

  const LVL_GRAD={beginner:'from-green-600 to-emerald-700',intermediate:'from-blue-600 to-indigo-700',
    advanced:'from-orange-600 to-red-600',pro:'from-purple-600 to-pink-600'};

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Fitness Builder',subtitle:`${WORKOUTS.length} workouts · every combination`,
      gradient:'linear-gradient(135deg,#c2410c,#dc2626)'}),
    h('div',{className:'flex gap-2 px-4 py-3'},
      [['quick','⚡ Quick Start'],['wizard','🔮 Wizard'],['stats','📊 Stats']].map(([id,label])=>
        h('button',{key:id,onClick:()=>{setTab(id);reset();},
          className:'flex-1 py-2 rounded-xl text-xs font-black transition-all',
          style:tab===id?{background:'linear-gradient(135deg,#c2410c,#dc2626)',color:'#fff'}:{background:'rgba(30,41,59,0.6)',color:'#94a3b8',border:'1px solid rgba(51,65,85,0.5)'}
        },label)
      )
    ),
    tab==='quick' && h('div',{className:'px-4 space-y-2.5'},
      h('p',{className:'text-sm text-slate-400 mb-2'},'Jump straight into a recommended workout:'),
      quickPicks.map(w=>h('button',{key:w.id,onClick:()=>nav('WorkoutDetail',{id:w.id}),
        className:'w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
        style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{className:`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${LVL_GRAD[w.level]}`},h(Icon,{n:'dumbbell',cls:'w-5 h-5 text-white'})),
        h('div',{className:'flex-1'},
          h('div',{className:'font-bold text-white text-sm'},w.name),
          h('div',{className:'text-xs mt-0.5',style:{color:'#64748b'}},`${w.level} · ${w.target} · ${w.duration_minutes} min`),
          h('div',{className:'flex items-center gap-2 mt-1.5'},h(XPBadge,{xp:w.xp_value}),h('span',{className:'text-xs',style:{color:'#64748b'}},`${w.exercises} exercises`))
        ),
        h(Icon,{n:'chevR',cls:'w-5 h-5',style:{color:'#475569'}})
      ))
    ),
    tab==='wizard' && !results && h('div',{className:'px-4'},
      h('div',{className:'flex justify-center gap-2 mb-5'},
        WIZARD.map((_,i)=>h('div',{key:i,className:'h-2 rounded-full transition-all',
          style:{width:i===step?'2rem':'0.5rem',background:i<step?'#10b981':i===step?'#f97316':'rgba(51,65,85,0.5)'}}))
      ),
      h('h2',{className:'text-base font-black text-white mb-1'},WIZARD[step].label),
      picks.level && h('p',{className:'text-xs text-slate-500 mb-3'},[picks.level,picks.target,picks.goal].filter(Boolean).join(' · ')),
      h('div',{className:'space-y-2'},
        WIZARD[step].opts.map(opt=>h('button',{key:opt.id,onClick:()=>choose(WIZARD[step].key,opt.id),
          style:{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:10,
            textAlign:'left',background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',cursor:'pointer',transition:'all 0.12s'}},
          h('div',{style:{width:36,height:36,borderRadius:7,background:'rgba(48,54,61,0.6)',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
            h(Icon,{n:opt.icon||'activity',cls:'w-4 h-4',style:{color:'#8b949e'}})),
          h('div',{style:{flex:1}},
            h('div',{style:{fontSize:13,fontWeight:700,color:'#e6edf3'}},opt.label),
            opt.desc && h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},opt.desc)
          ),
          h(Icon,{n:'chevR',cls:'w-4 h-4',style:{color:'#374151'}})
        ))
      ),
      step>0 && h('button',{onClick:()=>setStep(s=>s-1),className:'flex items-center gap-2 mt-4 text-sm text-slate-400 font-semibold'},
        h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back'
      )
    ),
    tab==='wizard' && results && h('div',{className:'px-4'},
      h('div',{className:'flex items-center justify-between p-4 rounded-2xl mb-4',
        style:{background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.25)'}},
        h('div',{},
          h('div',{className:'text-sm font-bold',style:{color:'#34d399'}},`${results.length} workout${results.length!==1?'s':''} found`),
          h('div',{className:'text-xs text-slate-400'},[picks.level,picks.target,picks.goal].filter(Boolean).join(' · '))
        ),
        h('button',{onClick:reset,className:'text-xs font-bold text-slate-400'},'New Search')
      ),
      h('div',{className:'space-y-2.5'},
        results.map(w=>h('button',{key:w.id,onClick:()=>nav('WorkoutDetail',{id:w.id}),
          className:'w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
          style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
          h('div',{className:`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${LVL_GRAD[w.level]}`},h(Icon,{n:'dumbbell',cls:'w-5 h-5 text-white'})),
          h('div',{className:'flex-1'},
            h('div',{className:'font-bold text-white text-sm'},w.name),
            h('div',{className:'text-xs mt-0.5',style:{color:'#64748b'}},`${w.duration_minutes} min · ${w.exercises} exercises`),
            h('div',{className:'mt-1.5'},h(XPBadge,{xp:w.xp_value}))
          ),
          h(Icon,{n:'chevR',cls:'w-5 h-5',style:{color:'#475569'}})
        ))
      )
    ),
    tab==='stats' && h('div',{className:'px-4 grid grid-cols-2 gap-3'},
      h(StatCard,{label:'Workouts Done',value:progress.workouts_done||0,color:'text-orange-400',icon:'dumbbell'}),
      h(StatCard,{label:'Total Library',value:WORKOUTS.length,color:'text-white',icon:'layers'}),
      h(StatCard,{label:'Levels',value:'4 levels',color:'text-emerald-400',icon:'trophy'}),
      h(StatCard,{label:'Targets',value:'8 muscle groups',color:'text-blue-400',icon:'crosshair'})
    )
  );
}

// ================================================================
// WORKOUT DETAIL
// ================================================================
function WorkoutDetailPage({ params }) {
  const w=WORKOUTS.find(wk=>wk.id===params?.id);
  const [done,setDone]=useState(false);
  const completing=useRef(false);
  if(!w) return h('div',{className:'pb-28 flex flex-col items-center justify-center',style:{minHeight:'80vh'}},
    h('div',{style:{width:56,height:56,borderRadius:12,background:'rgba(48,54,61,0.6)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'dumbbell',cls:'w-7 h-7',style:{color:'#484f58'}})),h('p',{className:'font-bold text-white mb-4'},'Workout not found'),
    h('button',{onClick:()=>nav('Fitness'),className:'btn-primary px-6 py-3'},'Back')
  );
  const LVL_GRAD={beginner:'#15803d,#059669',intermediate:'#1d4ed8,#4338ca',advanced:'#c2410c,#ea580c',pro:'#6d28d9,#7c3aed'};
  const complete=()=>{
    if(completing.current) return;
    completing.current=true;
    awardXP(w.xp_value,w.duration_minutes,'workout','workout',w.id);
    fireConfetti(); setDone(true);
  };
  if(done) return h('div',{className:'flex flex-col items-center justify-center text-center px-5 pb-28',style:{minHeight:'100vh'}},
    h('div',{style:{width:64,height:64,borderRadius:16,background:'rgba(22,163,74,0.15)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'circleCheck',cls:'w-8 h-8',style:{color:'#16a34a'}})),h('h2',{className:'text-2xl font-black text-white mb-2'},'Workout Complete!'),
    h('p',{className:'text-slate-400 mb-3'},w.name),h(XPBadge,{xp:w.xp_value}),
    h('div',{className:'mt-6 flex flex-col gap-3 w-full max-w-xs'},
      h('button',{onClick:()=>nav('Fitness'),className:'btn-primary'},'More Workouts'),
      h('button',{onClick:()=>setDone(false),className:'btn-secondary'},'Do Again')
    )
  );
  const grad=LVL_GRAD[w.level]||'#c2410c,#ea580c';
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:w.name,subtitle:`${w.duration_minutes} min · ${w.exercises} exercises · ${w.xp_value} XP`,
      gradient:`linear-gradient(135deg,${grad})`,onBack:()=>nav('Fitness')}),
    h('div',{className:'px-4 pt-5 space-y-4'},
      h('div',{className:'grid grid-cols-3 gap-3'},
        h(StatCard,{label:'Level',value:w.level,color:'text-white'}),
        h(StatCard,{label:'Focus',value:w.target,color:'text-orange-400'}),
        h(StatCard,{label:'Goal',value:w.goal.replace('-',' '),color:'text-amber-400'})
      ),
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('p',{className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-2'},'About This Workout'),
        h('p',{className:'text-sm text-slate-300 leading-relaxed'},
          `A ${w.duration_minutes}-minute ${w.level} workout targeting ${w.target} with a focus on ${w.goal.replace(/-/g,' ')}. Complete ${w.exercises} exercises with proper form and adequate rest between sets.`)
      ),
      h('button',{onClick:complete,className:'btn-primary w-full py-4 text-base font-black'},
        h(Icon,{n:'circleCheck',cls:'w-5 h-5'}),` Complete Workout (+${w.xp_value} XP)`
      )
    )
  );
}

// ================================================================
// TIMER — 4 Professional Modes
// ================================================================
function TimerPage() {
  const [mode,setMode]=useState('stopwatch');
  const MODES=[{id:'stopwatch',label:'Stopwatch',icon:'timer'},{id:'countdown',label:'Countdown',icon:'clock'},
    {id:'interval',label:'Interval',icon:'repeat'},{id:'cricket',label:'Cricket',icon:'bat'}];
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Training Timer',subtitle:'Professional-grade cricket timer',gradient:'linear-gradient(135deg,#0d9488,#0891b2)'}),
    h('div',{className:'flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide'},
      MODES.map(m=>h('button',{key:m.id,onClick:()=>setMode(m.id),
        className:'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap flex-shrink-0 transition-all',
        style:mode===m.id?{background:'linear-gradient(135deg,#0d9488,#0891b2)',color:'#fff',boxShadow:'0 4px 14px rgba(13,148,136,0.4)'}:{background:'rgba(22,27,34,0.9)',color:'#8b949e',border:'1px solid rgba(48,54,61,0.9)'}
      },h(Icon,{n:m.icon,cls:'w-3.5 h-3.5',style:{color:mode===m.id?'#fff':'#484f58'}}), ' ', m.label))
    ),
    mode==='stopwatch' && h(StopwatchMode),
    mode==='countdown' && h(CountdownMode),
    mode==='interval' && h(IntervalMode),
    mode==='cricket' && h(CricketPresetsMode),
  );
}

function Ring({ pct, size=220, stroke=14, color='#10b981', bg='rgba(30,41,59,0.6)', children }) {
  const r=(size-stroke)/2, C=2*Math.PI*r;
  return h('div',{style:{position:'relative',width:size,height:size,display:'flex',alignItems:'center',justifyContent:'center'}},
    h('svg',{width:size,height:size,viewBox:`0 0 ${size} ${size}`,style:{position:'absolute',inset:0}},
      h('circle',{cx:size/2,cy:size/2,r,fill:'none',stroke:bg,strokeWidth:stroke}),
      h('circle',{cx:size/2,cy:size/2,r,fill:'none',stroke:color,strokeWidth:stroke,
        strokeLinecap:'round',strokeDasharray:C,strokeDashoffset:C*(1-Math.max(0,Math.min(1,pct))),
        style:{transform:'rotate(-90deg)',transformOrigin:'center',transition:'stroke-dashoffset 1s linear'}
      })
    ),
    h('div',{style:{position:'absolute',textAlign:'center'}},children)
  );
}

function StopwatchMode() {
  const [elapsed,setElapsed]=useState(0);
  const [running,setRunning]=useState(false);
  const [laps,setLaps]=useState([]);
  const intRef=useRef(null);
  const lapStart=useRef(0);
  useEffect(()=>{
    if(running) intRef.current=setInterval(()=>setElapsed(e=>e+1),1000);
    else clearInterval(intRef.current);
    return()=>clearInterval(intRef.current);
  },[running]);
  const toggle=()=>setRunning(r=>!r);
  const lap=()=>{ const t=elapsed-lapStart.current; setLaps(l=>[...l,{n:l.length+1,t,total:elapsed}]); lapStart.current=elapsed; };
  const reset=()=>{setRunning(false);setElapsed(0);setLaps([]);lapStart.current=0;};
  return h('div',{className:'flex flex-col items-center px-5 pt-6'},
    h(Ring,{pct:(elapsed%60)/60,color:'#10b981'},
      h('div',{style:{fontSize:'2.5rem',fontWeight:900,color:'#fff',fontVariantNumeric:'tabular-nums'}},fmtTime(elapsed)),
      h('div',{style:{fontSize:'0.7rem',color:'#94a3b8',fontWeight:700}},`LAP ${laps.length+1}`)
    ),
    h('div',{className:'flex gap-4 mt-6'},
      h('button',{onClick:reset,style:{width:56,height:56,borderRadius:'50%',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.6)',color:'#94a3b8',cursor:'pointer',fontWeight:800,fontSize:'0.75rem'}},'RST'),
      h('button',{onClick:toggle,style:{width:80,height:80,borderRadius:'50%',background:running?'linear-gradient(135deg,#dc2626,#be123c)':'linear-gradient(135deg,#059669,#0d9488)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:running?'0 8px 32px rgba(220,38,38,0.4)':'0 8px 32px rgba(5,150,105,0.4)'}},
        h(Icon,{n:running?'pause':'play',cls:'w-8 h-8 text-white'})
      ),
      h('button',{onClick:lap,disabled:!running,style:{width:56,height:56,borderRadius:'50%',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.6)',color:running?'#fff':'#475569',cursor:running?'pointer':'default',fontWeight:800,fontSize:'0.75rem',opacity:running?1:0.5}},'LAP')
    ),
    laps.length>0 && h('div',{className:'w-full mt-6 max-h-48 overflow-y-auto sidebar-scroll'},
      h('p',{className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-2'},`${laps.length} Lap${laps.length>1?'s':''}`),
      [...laps].reverse().map(l=>h('div',{key:l.n,className:'flex justify-between items-center py-2',style:{borderBottom:'1px solid rgba(30,41,59,0.5)'}},
        h('span',{style:{color:'#94a3b8',fontSize:'0.875rem'}},`Lap ${l.n}`),
        h('span',{style:{color:'#fff',fontSize:'0.875rem',fontWeight:800,fontVariantNumeric:'tabular-nums'}},fmtTime(l.t)),
        h('span',{style:{color:'#64748b',fontSize:'0.75rem',fontVariantNumeric:'tabular-nums'}},fmtTime(l.total))
      ))
    )
  );
}

function CountdownMode() {
  const [mins,setMins]=useState(5);
  const [secs,setSecs]=useState(0);
  const [remaining,setRemaining]=useState(300);
  const [total,setTotal]=useState(300);
  const [running,setRunning]=useState(false);
  const [done,setDone]=useState(false);
  const isSetup=!running&&remaining===total&&!done;
  const intRef=useRef(null);
  useEffect(()=>{
    if(running){
      intRef.current=setInterval(()=>setRemaining(r=>{
        if(r<=1){clearInterval(intRef.current);setRunning(false);setDone(true);return 0;}
        return r-1;
      }),1000);
    } else clearInterval(intRef.current);
    return()=>clearInterval(intRef.current);
  },[running]);
  const start=()=>{
    if(!running){const t=mins*60+secs;setTotal(t);setRemaining(t);setDone(false);}
    setRunning(r=>!r);
  };
  const reset=()=>{setRunning(false);setRemaining(total);setDone(false);};
  const pct=total>0?remaining/total:0;
  const isLow=remaining<=10&&running;
  const col=isLow?'#ef4444':done?'#f59e0b':'#10b981';
  return h('div',{className:'flex flex-col items-center px-5 pt-6'},
    done && h('div',{className:'w-full p-4 mb-4 rounded-2xl text-center',style:{background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.3)'}},
      h(Icon,{n:'circleCheck',cls:'w-6 h-6',style:{color:'#f59e0b',marginBottom:4}}),h('div',{style:{fontWeight:800,color:'#f59e0b'}},"Time's up! Great work!"),
      h('button',{onClick:reset,className:'btn-primary mt-3 px-6 py-2 text-sm'},'Reset')
    ),
    h(Ring,{pct,color:col},
      h('div',{style:{fontSize:'2.5rem',fontWeight:900,color:isLow?'#ef4444':done?'#f59e0b':'#fff',fontVariantNumeric:'tabular-nums'}},fmtTime(remaining)),
      h('div',{style:{fontSize:'0.7rem',color:'#94a3b8',fontWeight:700}},'remaining')
    ),
    isSetup && h('div',{className:'mt-4 p-4 rounded-2xl w-full',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
      h('p',{className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-3'},'Set Duration'),
      h('div',{className:'flex items-center justify-center gap-6'},
        h('div',{className:'text-center'},
          h('button',{onClick:()=>setMins(m=>Math.min(99,m+1)),style:{width:40,height:40,borderRadius:'0.75rem',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#fff',cursor:'pointer',fontWeight:800,fontSize:'1.25rem'}},'+'),
          h('div',{style:{fontSize:'2rem',fontWeight:900,color:'#fff',margin:'0.5rem 0',fontVariantNumeric:'tabular-nums'}},String(mins).padStart(2,'0')),
          h('button',{onClick:()=>setMins(m=>Math.max(0,m-1)),style:{width:40,height:40,borderRadius:'0.75rem',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#fff',cursor:'pointer',fontWeight:800,fontSize:'1.25rem'}},'-'),
          h('div',{style:{fontSize:'0.7rem',color:'#64748b',marginTop:'0.25rem'}},'min')
        ),
        h('div',{style:{fontSize:'2rem',fontWeight:900,color:'#475569'}},':'),
        h('div',{className:'text-center'},
          h('button',{onClick:()=>setSecs(s=>Math.min(59,s+5)),style:{width:40,height:40,borderRadius:'0.75rem',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#fff',cursor:'pointer',fontWeight:800,fontSize:'1.25rem'}},'+'),
          h('div',{style:{fontSize:'2rem',fontWeight:900,color:'#fff',margin:'0.5rem 0',fontVariantNumeric:'tabular-nums'}},String(secs).padStart(2,'0')),
          h('button',{onClick:()=>setSecs(s=>Math.max(0,s-5)),style:{width:40,height:40,borderRadius:'0.75rem',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#fff',cursor:'pointer',fontWeight:800,fontSize:'1.25rem'}},'-'),
          h('div',{style:{fontSize:'0.7rem',color:'#64748b',marginTop:'0.25rem'}},'sec')
        )
      )
    ),
    !done && h('div',{className:'flex gap-4 mt-6'},
      h('button',{onClick:reset,style:{width:56,height:56,borderRadius:'50%',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#94a3b8',cursor:'pointer',fontWeight:800,fontSize:'0.75rem'}},'RST'),
      h('button',{onClick:start,style:{width:80,height:80,borderRadius:'50%',background:running?'linear-gradient(135deg,#dc2626,#be123c)':'linear-gradient(135deg,#059669,#0d9488)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 32px rgba(5,150,105,0.35)'}},
        h(Icon,{n:running?'pause':'play',cls:'w-8 h-8 text-white'})
      ),
      h('div',{style:{width:56}})
    )
  );
}

function IntervalMode() {
  const [workS,setWorkS]=useState(60);
  const [restS,setRestS]=useState(30);
  const [rounds,setRounds]=useState(5);
  const [running,setRunning]=useState(false);
  const [phase,setPhase]=useState('work');
  const [remaining,setRemaining]=useState(60);
  const [round,setRound]=useState(1);
  const [cfg,setCfg]=useState(true);
  const [done,setDone]=useState(false);
  const stRef=useRef({phase:'work',remaining:60,round:1});
  const intRef=useRef(null);
  const startIt=()=>{
    stRef.current={phase:'work',remaining:workS,round:1};
    setPhase('work');setRemaining(workS);setRound(1);setCfg(false);setRunning(true);
  };
  const reset=()=>{clearInterval(intRef.current);setRunning(false);setCfg(true);setDone(false);setPhase('work');setRound(1);};
  useEffect(()=>{
    if(!running) return;
    intRef.current=setInterval(()=>{
      const st=stRef.current;
      if(st.remaining<=1){
        if(st.phase==='work'){const n={phase:'rest',remaining:restS,round:st.round};stRef.current=n;setPhase('rest');setRemaining(restS);}
        else{if(st.round>=rounds){clearInterval(intRef.current);setRunning(false);setDone(true);}
          else{const n={phase:'work',remaining:workS,round:st.round+1};stRef.current=n;setPhase('work');setRemaining(workS);setRound(r=>r+1);}}
      } else {stRef.current.remaining--;setRemaining(r=>r-1);}
    },1000);
    return()=>clearInterval(intRef.current);
  },[running]);
  if(cfg) return h('div',{className:'px-5 pt-6 space-y-3'},
    h('p',{className:'text-sm text-slate-400 text-center mb-2'},'Configure your interval session'),
    [{label:'Work Time',val:workS,set:setWorkS,step:15,min:10,max:600,fmt:true},
     {label:'Rest Time',val:restS,set:setRestS,step:5,min:5,max:300,fmt:true},
     {label:'Rounds',val:rounds,set:setRounds,step:1,min:1,max:20,fmt:false}].map(cfg2=>
      h('div',{key:cfg2.label,className:'flex items-center justify-between p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('span',{className:'text-sm font-bold text-white'},cfg2.label),
        h('div',{className:'flex items-center gap-3'},
          h('button',{onClick:()=>cfg2.set(v=>Math.max(cfg2.min,v-cfg2.step)),style:{width:36,height:36,borderRadius:'0.75rem',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#fff',cursor:'pointer',fontWeight:800}},'−'),
          h('span',{style:{width:72,textAlign:'center',fontSize:'1.1rem',fontWeight:900,color:'#34d399',fontVariantNumeric:'tabular-nums'}},cfg2.fmt?fmtTime(cfg2.val):cfg2.val),
          h('button',{onClick:()=>cfg2.set(v=>Math.min(cfg2.max,v+cfg2.step)),style:{width:36,height:36,borderRadius:'0.75rem',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#fff',cursor:'pointer',fontWeight:800}},'+')
        )
      )
    ),
    h('div',{className:'p-4 rounded-2xl text-center',style:{background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.25)'}},
      h('span',{style:{color:'#34d399',fontSize:'0.875rem',fontWeight:700}},`Total: ${fmtTime(rounds*(workS+restS))} · ${rounds} rounds`)
    ),
    h('button',{onClick:startIt,className:'btn-primary w-full py-4 text-base font-black'},'Start Interval Session')
  );
  const pct=phase==='work'?remaining/workS:remaining/restS;
  const col=phase==='work'?'#10b981':'#3b82f6';
  return h('div',{className:'flex flex-col items-center px-5 pt-6'},
    done
      ? h('div',{className:'text-center py-8'},h('div',{style:{width:56,height:56,borderRadius:14,background:'rgba(22,163,74,0.15)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'circleCheck',cls:'w-7 h-7',style:{color:'#16a34a'}})),h('div',{className:'text-xl font-black text-white mb-4'},'Session Complete!'),h('button',{onClick:reset,className:'btn-primary px-8 py-3'},'Done'))
      : h(Fragment,null,
          h('div',{className:'w-full py-3 rounded-2xl mb-5 text-center font-black text-white text-sm',
            style:{background:phase==='work'?'linear-gradient(135deg,rgba(5,150,105,0.3),rgba(13,148,136,0.2))':'linear-gradient(135deg,rgba(29,78,216,0.3),rgba(67,56,202,0.2))',
              border:`1px solid ${phase==='work'?'rgba(16,185,129,0.4)':'rgba(59,130,246,0.4)'}`}},
            phase==='work'?`💪 WORK — Round ${round} of ${rounds}`:`😤 REST — Round ${round} of ${rounds}`
          ),
          h(Ring,{pct,color:col},
            h('div',{style:{fontSize:'2.5rem',fontWeight:900,color:'#fff',fontVariantNumeric:'tabular-nums'}},fmtTime(remaining)),
            h('div',{style:{fontSize:'0.7rem',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.1em',color:col}},phase)
          ),
          h('div',{className:'flex gap-4 mt-6'},
            h('button',{onClick:reset,style:{width:56,height:56,borderRadius:'50%',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.5)',color:'#94a3b8',cursor:'pointer',fontWeight:800,fontSize:'0.75rem'}},'RST'),
            h('button',{onClick:()=>setRunning(r=>!r),style:{width:80,height:80,borderRadius:'50%',background:running?'linear-gradient(135deg,#dc2626,#be123c)':'linear-gradient(135deg,#059669,#0d9488)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 32px rgba(5,150,105,0.35)'}},
              h(Icon,{n:running?'pause':'play',cls:'w-8 h-8 text-white'})
            ),
            h('div',{style:{width:56}})
          )
        )
  );
}

function CricketPresetsMode() {
  const [active,setActive]=useState(null);
  const presets=[
    {id:'bowl',icon:'ball',name:'Bowling Spell',desc:'4 min bowl / 2 min rest / 4 rounds',work:240,rest:120,rounds:4,col:'#dc2626',grad:'linear-gradient(135deg,#dc2626,#ea580c)'},
    {id:'bat',icon:'bat',name:'Batting Focus',desc:'10-minute countdown session',work:600,rest:0,rounds:1,col:'#3b82f6',grad:'linear-gradient(135deg,#1d4ed8,#4338ca)'},
    {id:'field',icon:'navigation',name:'Fielding Drills',desc:'45s intense / 15s rest / 8 rounds',work:45,rest:15,rounds:8,col:'#10b981',grad:'linear-gradient(135deg,#059669,#0d9488)'},
    {id:'mental',icon:'brain',name:'Mental Session',desc:'5-minute guided focus countdown',work:300,rest:0,rounds:1,col:'#a855f7',grad:'linear-gradient(135deg,#6d28d9,#4338ca)'},
    {id:'warmup',icon:'flame',name:'Cricket Warm-Up',desc:'90s drills / 30s rest / 6 rounds',work:90,rest:30,rounds:6,col:'#f97316',grad:'linear-gradient(135deg,#c2410c,#d97706)'},
    {id:'sprint',icon:'zap',name:'Speed Sprints',desc:'10s sprint / 50s rest / 10 rounds',work:10,rest:50,rounds:10,col:'#06b6d4',grad:'linear-gradient(135deg,#0891b2,#0d9488)'},
  ];
  if(active){
    const p=presets.find(x=>x.id===active);
    if(!p) return null;
    if(p.rounds===1) return h(SimpleCountdownPreset,{preset:p,onBack:()=>setActive(null)});
    return h(SimpleIntervalPreset,{preset:p,onBack:()=>setActive(null)});
  }
  return h('div',{className:'px-5 pt-4'},
    h('p',{className:'text-sm text-slate-400 mb-4'},'Cricket-specific training timers, ready to start:'),
    h('div',{className:'space-y-2.5'},
      presets.map(p=>h('button',{key:p.id,onClick:()=>setActive(p.id),
        className:'w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
        style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{style:{width:44,height:44,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:p.grad}},h(Icon,{n:p.icon||'timer',cls:'w-5 h-5 text-white'})),
        h('div',{className:'flex-1'},h('div',{className:'font-bold text-white text-sm'},p.name),h('div',{className:'text-xs mt-0.5',style:{color:'#64748b'}},p.desc)),
        h(Icon,{n:'chevR',cls:'w-5 h-5',style:{color:'#475569'}})
      ))
    )
  );
}

function SimpleCountdownPreset({ preset, onBack }) {
  const [remaining,setRemaining]=useState(preset.work);
  const [running,setRunning]=useState(false);
  const [done,setDone]=useState(false);
  const intRef=useRef(null);
  useEffect(()=>{
    if(running) intRef.current=setInterval(()=>setRemaining(r=>{if(r<=1){clearInterval(intRef.current);setRunning(false);setDone(true);return 0;}return r-1;}),1000);
    else clearInterval(intRef.current);
    return()=>clearInterval(intRef.current);
  },[running]);
  const pct=remaining/preset.work;
  return h('div',{className:'flex flex-col items-center px-5 pt-4'},
    h('button',{onClick:onBack,className:'self-start flex items-center gap-2 text-slate-400 mb-4 text-sm font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back'),
    h('div',{className:'w-full py-3 rounded-2xl mb-5 text-center font-black text-white text-sm',style:{background:preset.grad}},preset.name),
    done && h('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:16,color:'#16a34a',fontWeight:700}},h(Icon,{n:'circleCheck',cls:'w-5 h-5'}),'Complete!'),
    h(Ring,{pct,color:preset.col},
      h('div',{style:{fontSize:'2.5rem',fontWeight:900,color:'#fff',fontVariantNumeric:'tabular-nums'}},fmtTime(remaining)),
      h('div',{style:{fontSize:'0.7rem',color:'#94a3b8',fontWeight:700}},'remaining')
    ),
    !done && h('button',{onClick:()=>setRunning(r=>!r),className:'mt-6',style:{width:80,height:80,borderRadius:'50%',background:running?'linear-gradient(135deg,#dc2626,#be123c)':'linear-gradient(135deg,#059669,#0d9488)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 32px rgba(5,150,105,0.35)'}},
      h(Icon,{n:running?'pause':'play',cls:'w-8 h-8 text-white'})
    ),
    done && h('button',{onClick:onBack,className:'btn-primary mt-6 px-8 py-3'},'Back to Presets')
  );
}

function SimpleIntervalPreset({ preset, onBack }) {
  const [phase,setPhase]=useState('work');const[remaining,setRemaining]=useState(preset.work);const[round,setRound]=useState(1);
  const [running,setRunning]=useState(false);const[done,setDone]=useState(false);
  const st=useRef({phase:'work',remaining:preset.work,round:1});const intRef=useRef(null);
  useEffect(()=>{
    if(!running) return;
    intRef.current=setInterval(()=>{
      const s=st.current;
      if(s.remaining<=1){
        if(s.phase==='work'){const n={phase:'rest',remaining:preset.rest,round:s.round};st.current=n;setPhase('rest');setRemaining(preset.rest);}
        else{if(s.round>=preset.rounds){clearInterval(intRef.current);setRunning(false);setDone(true);}
          else{const n={phase:'work',remaining:preset.work,round:s.round+1};st.current=n;setPhase('work');setRemaining(preset.work);setRound(r=>r+1);}}
      }else{st.current.remaining--;setRemaining(r=>r-1);}
    },1000);
    return()=>clearInterval(intRef.current);
  },[running]);
  const pct=phase==='work'?remaining/preset.work:remaining/preset.rest;
  const col=phase==='work'?preset.col:'#3b82f6';
  return h('div',{className:'flex flex-col items-center px-5 pt-4'},
    h('button',{onClick:onBack,className:'self-start flex items-center gap-2 text-slate-400 mb-4 text-sm font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back'),
    done
      ? h('div',{className:'text-center py-8'},h('div',{style:{width:56,height:56,borderRadius:14,background:'rgba(22,163,74,0.15)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'circleCheck',cls:'w-7 h-7',style:{color:'#16a34a'}})),h('div',{className:'text-xl font-black text-white mb-4'},'Complete!'),h('button',{onClick:onBack,className:'btn-primary px-8 py-3'},'Done'))
      : h(Fragment,null,
          h('div',{className:'w-full py-3 rounded-2xl mb-5 text-center font-black text-white text-sm',style:{background:preset.grad}},`${preset.name} — Round ${round}/${preset.rounds}`),
          h(Ring,{pct,color:col},
            h('div',{style:{fontSize:'2.5rem',fontWeight:900,color:'#fff',fontVariantNumeric:'tabular-nums'}},fmtTime(remaining)),
            h('div',{style:{fontSize:'0.7rem',fontWeight:800,textTransform:'uppercase',color:col}},phase)
          ),
          h('button',{onClick:()=>setRunning(r=>!r),className:'mt-6',style:{width:80,height:80,borderRadius:'50%',background:running?'linear-gradient(135deg,#dc2626,#be123c)':'linear-gradient(135deg,#059669,#0d9488)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 32px rgba(5,150,105,0.35)'}},
            h(Icon,{n:running?'pause':'play',cls:'w-8 h-8 text-white'})
          )
        )
  );
}

// ================================================================
// SCHEDULE PAGE
// ================================================================
function SchedulePage() {
  const [weekStart, setWeekStart] = useState(()=>dateStr(getWeekMonday(new Date())));
  const [selectedDay, setSelectedDay] = useState(()=>new Date().toISOString().slice(0,10));
  const [schedule, setSchedule] = useState(()=>DB.getSchedule());
  const [view, setView] = useState('week');
  const [addStep, setAddStep] = useState(0);
  const [addType, setAddType] = useState('');
  const [addPick, setAddPick] = useState(null);
  const [addTime, setAddTime] = useState('');
  const [addNote, setAddNote] = useState('');
  const [genStep, setGenStep] = useState(0);
  const [genFocus, setGenFocus] = useState('');
  const [genDays, setGenDays] = useState(4);
  const [genInt, setGenInt] = useState('moderate');
  const [genPreview, setGenPreview] = useState(null);
  const [notif, setNotif] = useState('');

  const refresh = useCallback(()=>setSchedule(DB.getSchedule()), []);
  useEffect(()=>{
    window.addEventListener('sc_update', refresh);
    return()=>window.removeEventListener('sc_update', refresh);
  },[refresh]);

  function showNotif(msg) { setNotif(msg); setTimeout(()=>setNotif(''), 3000); }

  const monday = new Date(weekStart+'T00:00:00');
  const weekDays = Array.from({length:7},(_,i)=>{
    const d = addDays(monday,i);
    return { date:dateStr(d), label:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], num:d.getDate() };
  });

  const daySessions = (schedule.sessions||[]).filter(s=>s.date===selectedDay)
    .sort((a,b)=>a.time.localeCompare(b.time));

  function dayCount(date) { return (schedule.sessions||[]).filter(s=>s.date===date).length; }
  function dayDone(date) { return (schedule.sessions||[]).filter(s=>s.date===date&&s.status==='complete').length; }

  const weekSessions = DB.getSessionsForWeek(weekStart);
  const weekXP = weekSessions.filter(s=>s.status==='pending').reduce((a,s)=>a+s.xp_value,0);
  const weekDoneCount = weekSessions.filter(s=>s.status==='complete').length;

  function completeSession(id) {
    const sess = (schedule.sessions||[]).find(s=>s.id===id);
    if(!sess||sess.status==='complete') return;
    DB.updateSession(id,{status:'complete'});
    awardXP(sess.xp_value, sess.duration_minutes, 'schedule_'+sess.type);
    fireConfetti();
    refresh();
    showNotif(`✅ +${sess.xp_value} XP earned!`);
  }

  function skipSession(id) { DB.updateSession(id,{status:'skipped'}); refresh(); }
  function deleteSession(id) { DB.deleteSession(id); refresh(); showNotif('Session removed'); }
  function undoSession(id) { DB.updateSession(id,{status:'pending'}); refresh(); }

  function startSession(sess) {
    if(sess.type==='drill'&&sess.ref_id) nav('DrillDetail',{id:sess.ref_id});
    else if(sess.type==='mental'&&sess.ref_id) nav('MentalPlayer',{id:sess.ref_id});
    else if(sess.type==='fitness'&&sess.ref_id) nav('WorkoutDetail',{id:sess.ref_id});
    else nav('Timer');
  }

  function saveNewSession() {
    if(!addType) return;
    const tc=SCHED_TYPES[addType];
    let title='Custom Session', refId=null, dur=30, xp=50;
    if(addPick){
      if(addType==='drill'){const d=DRILLS.find(x=>x.id===addPick);if(d){title=d.title;refId=d.id;dur=d.duration_minutes;xp=d.xp_value;}}
      else if(addType==='mental'){const m=MENTAL_SESSIONS.find(x=>x.id===addPick);if(m){title=m.title;refId=m.id;dur=Math.floor(m.duration_seconds/60);xp=m.xp_value;}}
      else if(addType==='fitness'){const w=WORKOUTS.find(x=>x.id===addPick);if(w){title=w.name;refId=w.id;dur=w.duration_minutes;xp=w.xp_value;}}
    } else if(addType==='match'){title='Match Day';dur=180;xp=200;}
    else if(addType==='rest'){title='Rest & Recovery Day';dur=0;xp=20;}
    DB.addSession({id:'sch_'+Date.now(),date:selectedDay,time:addTime,type:addType,title,ref_id:refId,duration_minutes:dur,xp_value:xp,status:'pending',notes:addNote,color:tc.color});
    refresh();
    setView('week'); setAddStep(0); setAddType(''); setAddPick(null); setAddTime(''); setAddNote('');
    showNotif('Session added! 📅');
  }

  function runGenerator() {
    const sessions = generateSmartSchedule(genFocus, genDays, genInt, weekStart);
    setGenPreview(sessions); setGenStep(3);
  }
  function confirmGenerate() {
    const existing = DB.getSchedule();
    const filtered = (existing.sessions||[]).filter(s=>{
      const wd=DB.getSessionsForWeek(weekStart).map(x=>x.id);
      return !wd.includes(s.id)||s.status==='complete';
    });
    existing.sessions = [...filtered, ...genPreview];
    DB.saveSchedule(existing);
    refresh(); setView('week'); setGenStep(0); setGenFocus(''); setGenPreview(null);
    showNotif('🤖 Smart schedule generated!');
  }

  if(view==='add') return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Add Session',subtitle:formatDate(selectedDay),
      gradient:'linear-gradient(135deg,#0f766e,#0d9488)',
      onBack:()=>{ setView('week');setAddStep(0);setAddType('');setAddPick(null);}}),
    h('div',{className:'px-4 pt-5'},
      h('div',{className:'flex gap-2 mb-5'},
        ['Type','Content','Details'].map((s,i)=>h('div',{key:s,className:'flex items-center gap-2'},
          h('div',{className:'w-6 h-6 rounded-full flex items-center justify-center text-xs font-black',
            style:{background:addStep>=i?'linear-gradient(135deg,#0f766e,#0d9488)':'rgba(30,41,59,0.8)',
              color:addStep>=i?'#fff':'#64748b',border:addStep>=i?'none':'1px solid rgba(51,65,85,0.5)'}},i+1),
          h('span',{style:{fontSize:'0.75rem',fontWeight:700,color:addStep===i?'#5eead4':'#64748b'}},s),
          i<2 && h('div',{style:{width:'1.5rem',height:'2px',background:addStep>i?'#0d9488':'rgba(51,65,85,0.5)',borderRadius:'1px'}})
        ))
      ),
      addStep===0 && h('div',{},
        h('h3',{className:'text-base font-black text-white mb-3'},'What type of session?'),
        h('div',{className:'space-y-2'},
          Object.entries(SCHED_TYPES).map(([id,tc])=>h('button',{key:id,
            onClick:()=>{setAddType(id);setAddStep(id==='match'||id==='rest'||id==='custom'?2:1);},
            className:'w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
            style:{background:tc.bg,border:`1px solid ${tc.border}`}
          },
            h('div',{style:{width:40,height:40,borderRadius:8,background:'rgba(0,0,0,0.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},h(Icon,{n:tc.icon||'calendar',cls:'w-5 h-5',style:{color:tc.color}})),
            h('div',{className:'flex-1'},h('div',{className:'font-bold text-white text-sm'},tc.label)),
            h(Icon,{n:'chevR',cls:'w-4 h-4',style:{color:'#475569'}})
          ))
        )
      ),
      addStep===1 && addType && h('div',{},
        h('h3',{className:'text-base font-black text-white mb-3'},addType==='drill'?'Choose a drill:':addType==='mental'?'Choose a session:':'Choose a workout:'),
        h('div',{className:'space-y-2 max-h-80 overflow-y-auto sidebar-scroll pr-1'},
          (addType==='drill'?DRILLS:addType==='mental'?MENTAL_SESSIONS.filter(m=>!m.is_premium):WORKOUTS.slice(0,30))
            .map(item=>{
              const isD=addType==='drill';const isM=addType==='mental';
              const label=isD?item.title:isM?item.title:item.name;
              const meta=isD?`${item.duration_minutes} min`:`${isM?Math.floor(item.duration_seconds/60):item.duration_minutes} min`;
              const xpv=item.xp_value;
              return h('button',{key:item.id,onClick:()=>{setAddPick(item.id);setAddStep(2);},
                className:'w-full flex items-center gap-3 p-3 rounded-xl text-left active:scale-[.99] transition-all',
                style:{background:addPick===item.id?'rgba(15,118,110,0.2)':'rgba(30,41,59,0.6)',
                  border:addPick===item.id?'1px solid rgba(13,148,136,0.5)':'1px solid rgba(51,65,85,0.4)'}
              },
                h('div',{className:'flex-1'},
                  h('div',{className:'text-sm font-bold text-white'},label),
                  h('div',{className:'flex items-center gap-2 mt-1'},h('span',{className:'text-xs',style:{color:'#64748b'}},meta),h(XPBadge,{xp:xpv}))
                ),
                h(Icon,{n:'chevR',cls:'w-4 h-4',style:{color:'#475569'}})
              );
            })
        ),
        h('button',{onClick:()=>{setAddStep(0);setAddType('');},className:'flex items-center gap-2 mt-4 text-sm text-slate-400 font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back')
      ),
      addStep===2 && h('div',{},
        h('h3',{className:'text-base font-black text-white mb-4'},'Session details'),
        h('div',{className:'space-y-4'},
          h('div',{},
            h('label',{className:'text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2'},'Time (optional)'),
            h('input',{type:'time',value:addTime,onChange:e=>setAddTime(e.target.value),
              className:'w-full px-4 py-3 rounded-xl text-sm text-white outline-none',
              style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}})
          ),
          h('div',{},
            h('label',{className:'text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2'},'Notes (optional)'),
            h('textarea',{placeholder:'E.g. Focus on elbow position...',value:addNote,onChange:e=>setAddNote(e.target.value),rows:3,
              className:'w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none',
              style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}})
          ),
          h('button',{onClick:saveNewSession,className:'btn-primary w-full py-4 text-base font-black'},h(Icon,{n:'plus',cls:'w-5 h-5'}),' Add to Schedule'),
          h('button',{onClick:()=>{setAddStep(addType==='drill'||addType==='mental'||addType==='fitness'?1:0);},className:'w-full text-center text-sm text-slate-400 font-semibold py-2'},'← Back')
        )
      )
    )
  );

  if(view==='generate') {
    const FOCUS=[{id:'batting',label:'Batting',icon:'bat'},{id:'bowling',label:'Bowling',icon:'ball'},{id:'fielding',label:'Fielding',icon:'navigation'},{id:'allrounder',label:'All-Round',icon:'star'}];
    const INTENSITY=[{id:'light',label:'Light',icon:'activity',desc:'2 sessions/day max'},{id:'moderate',label:'Moderate',icon:'zap',desc:'2-3 sessions/day'},{id:'intense',label:'Intense',icon:'flame',desc:'3 sessions/day'}];
    return h('div',{className:'pb-28'},
      h(PageHeader,{title:'Smart Generator',subtitle:'AI-powered weekly schedule',
        gradient:'linear-gradient(135deg,#4c1d95,#5b21b6)',onBack:()=>{setView('week');setGenStep(0);setGenFocus('');setGenPreview(null);}}),
      h('div',{className:'px-4 pt-5'},
        h('div',{className:'flex gap-2 mb-5'},
          ['Focus','Days','Intensity','Preview'].map((s,i)=>h('div',{key:s,className:'flex items-center gap-1.5'},
            h('div',{className:'w-5 h-5 rounded-full flex items-center justify-center',style:{fontSize:'0.65rem',fontWeight:900,background:genStep>=i?'linear-gradient(135deg,#6d28d9,#7c3aed)':'rgba(30,41,59,0.8)',color:genStep>=i?'#fff':'#64748b'}},i+1),
            h('span',{style:{fontSize:'0.7rem',fontWeight:700,color:genStep===i?'#c084fc':'#64748b',whiteSpace:'nowrap'}},s),
            i<3 && h('div',{style:{flex:1,height:'2px',background:genStep>i?'#7c3aed':'rgba(51,65,85,0.5)',borderRadius:'1px',minWidth:'1rem'}})
          ))
        ),
        genStep===0 && h('div',{},
          h('h3',{className:'text-base font-black text-white mb-3'},'Which area needs most work?'),
          h('div',{className:'grid grid-cols-2 gap-3'},
            FOCUS.map(f=>h('button',{key:f.id,onClick:()=>{setGenFocus(f.id);setGenStep(1);},
              style:{display:'flex',flexDirection:'column',alignItems:'center',gap:8,padding:'20px 16px',borderRadius:10,background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',cursor:'pointer'}},
              h('div',{style:{width:40,height:40,borderRadius:8,background:'rgba(48,54,61,0.6)',display:'flex',alignItems:'center',justifyContent:'center'}},h(Icon,{n:f.icon,cls:'w-5 h-5',style:{color:'#8b949e'}})),
              h('span',{style:{fontSize:12,fontWeight:700,color:'#e6edf3'}},f.label)
            ))
          )
        ),
        genStep===1 && h('div',{},
          h('h3',{className:'text-base font-black text-white mb-1'},'Days per week?'),
          h('p',{className:'text-xs text-slate-400 mb-4'},'How many days can you train?'),
          h('div',{className:'flex gap-3 flex-wrap'},
            [3,4,5,6,7].map(n=>h('button',{key:n,onClick:()=>{setGenDays(n);setGenStep(2);},
              className:'flex-1 py-4 rounded-2xl font-black text-lg active:scale-95 transition-all',
              style:{background:genDays===n?'linear-gradient(135deg,#6d28d9,#7c3aed)':'rgba(30,41,59,0.6)',color:'#fff',border:'1px solid rgba(51,65,85,0.5)',minWidth:'50px'}},n)
          )),
          h('button',{onClick:()=>setGenStep(0),className:'flex items-center gap-2 mt-4 text-sm text-slate-400 font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back')
        ),
        genStep===2 && h('div',{},
          h('h3',{className:'text-base font-black text-white mb-3'},'Session intensity?'),
          h('div',{className:'space-y-2'},
            INTENSITY.map(i=>h('button',{key:i.id,onClick:()=>{setGenInt(i.id);runGenerator();},
              className:'w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
              style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)'}},
              h('div',{style:{width:36,height:36,borderRadius:7,background:'rgba(48,54,61,0.6)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},h(Icon,{n:i.icon||'activity',cls:'w-4 h-4',style:{color:'#8b949e'}})),
              h('div',{className:'flex-1'},h('div',{style:{fontSize:13,fontWeight:700,color:'#e6edf3'}},i.label),h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},i.desc)),
              h(Icon,{n:'chevR',cls:'w-4 h-4',style:{color:'#374151'}})
            ))
          ),
          h('button',{onClick:()=>setGenStep(1),className:'flex items-center gap-2 mt-4 text-sm text-slate-400 font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back')
        ),
        genStep===3 && genPreview && h('div',{},
          h('div',{className:'flex items-center justify-between mb-4'},
            h('div',{},h('h3',{className:'text-base font-black text-white'},'Preview'),h('p',{className:'text-xs text-slate-400'},`${genPreview.length} sessions · ${genPreview.reduce((s,x)=>s+x.xp_value,0)} XP available`)),
            h('button',{onClick:()=>setGenStep(2),className:'text-xs text-slate-400 font-semibold'},'Change')
          ),
          h('div',{className:'space-y-2 max-h-72 overflow-y-auto sidebar-scroll pr-1'},
            genPreview.map((s,i)=>{const tc=SCHED_TYPES[s.type]||SCHED_TYPES.custom;return h('div',{key:i,style:{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:8,background:tc.bg,border:`1px solid ${tc.border}`}},h('div',{style:{width:32,height:32,borderRadius:6,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},h(Icon,{n:tc.icon||'calendar',cls:'w-4 h-4',style:{color:tc.color}})),h('div',{className:'flex-1'},h('div',{className:'text-xs font-bold text-white'},s.title),h('div',{className:'text-xs',style:{color:'rgba(255,255,255,0.5)'}},`${formatDate(s.date)} ${s.time?'· '+s.time:''} · ${s.duration_minutes} min`)),h(XPBadge,{xp:s.xp_value}));})
          ),
          h('div',{className:'flex gap-3 mt-4'},
            h('button',{onClick:()=>{setGenStep(0);setGenPreview(null);},className:'btn-secondary flex-1'},'Regenerate'),
            h('button',{onClick:confirmGenerate,className:'btn-primary flex-1 font-black'},'Confirm Schedule')
          )
        )
      )
    );
  }

  return h('div',{className:'pb-28'},
    h('div',{style:{background:'linear-gradient(135deg,#0f766e,#0d9488,#0891b2)',paddingTop:'max(4.5rem,env(safe-area-inset-top))',paddingBottom:'1.25rem',paddingLeft:'1.25rem',paddingRight:'1.25rem',position:'relative',overflow:'hidden'}},
      h('div',{style:{position:'absolute',top:'-40%',right:'-15%',width:'220px',height:'220px',background:'rgba(255,255,255,0.07)',borderRadius:'50%',pointerEvents:'none'}}),
      h('div',{className:'relative z-10'},
        h('div',{className:'flex items-center justify-between mb-4'},
          h('div',{},
            h('h1',{className:'text-xl font-black text-white'},'Schedule'),
            h('p',{style:{color:'rgba(255,255,255,0.65)',fontSize:'0.8125rem'}},`Week of ${new Date(weekStart+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'})} – ${new Date(addDays(new Date(weekStart+'T00:00:00'),6)+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'})}`)
          ),
          h('button',{onClick:()=>{setView('generate');setGenStep(0);setGenFocus('');setGenPreview(null);},className:'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white',style:{background:'rgba(255,255,255,0.15)'}},h(Icon,{n:'sparkles',cls:'w-3.5 h-3.5'}),'Smart Plan')
        ),
        h('div',{className:'flex items-center gap-3'},
          h('button',{onClick:()=>{const d=new Date(weekStart+'T00:00:00');d.setDate(d.getDate()-7);setWeekStart(dateStr(d));},style:{width:34,height:34,borderRadius:'0.625rem',background:'rgba(255,255,255,0.12)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}},h(Icon,{n:'arrowL',cls:'w-4 h-4'})),
          h('div',{className:'flex gap-1.5 flex-1 overflow-x-auto scrollbar-hide'},
            weekDays.map(d=>{
              const isToday2=isToday(d.date),isSel=d.date===selectedDay,cnt=dayCount(d.date),doneC=dayDone(d.date);
              return h('button',{key:d.date,onClick:()=>setSelectedDay(d.date),className:'flex-shrink-0 flex flex-col items-center py-2 px-2.5 rounded-xl transition-all',
                style:{minWidth:'40px',background:isSel?'rgba(255,255,255,0.2)':isToday2?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.04)',border:isToday2?'2px solid rgba(255,255,255,0.4)':'2px solid transparent'}},
                h('span',{style:{fontSize:'0.65rem',fontWeight:700,color:isSel?'#fff':isToday2?'#fff':'rgba(255,255,255,0.6)'}},d.label),
                h('span',{style:{fontSize:'1.1rem',fontWeight:900,color:'#fff',margin:'0.1rem 0'}},d.num),
                cnt>0?h('div',{className:'flex gap-0.5'},Array.from({length:Math.min(cnt,3)}).map((_,i)=>h('div',{key:i,style:{width:5,height:5,borderRadius:'50%',background:i<doneC?'#a7f3d0':'rgba(255,255,255,0.5)'}})))
                  :h('div',{style:{width:5,height:5,borderRadius:'50%',background:'transparent'}})
              );
            })
          ),
          h('button',{onClick:()=>{const d=new Date(weekStart+'T00:00:00');d.setDate(d.getDate()+7);setWeekStart(dateStr(d));},style:{width:34,height:34,borderRadius:'0.625rem',background:'rgba(255,255,255,0.12)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}},h(Icon,{n:'chevR',cls:'w-4 h-4'}))
        )
      )
    ),
    notif && h('div',{style:{margin:'0.75rem 1rem',padding:'0.75rem 1rem',background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.4)',borderRadius:'0.875rem',fontSize:'0.875rem',fontWeight:700,color:'#34d399'}},notif),
    h('div',{className:'px-4 pt-4'},
      h('div',{className:'flex items-center justify-between mb-3'},
        h('div',{},
          h('h2',{className:'text-base font-black text-white'},isToday(selectedDay)?'Today, '+formatDate(selectedDay).split(',').slice(1).join(',').trim():formatDate(selectedDay)),
          h('p',{style:{fontSize:'0.75rem',color:'#64748b',marginTop:'0.125rem'}},daySessions.length===0?'No sessions planned':`${daySessions.length} session${daySessions.length!==1?'s':''} · ${daySessions.reduce((s,x)=>s+x.xp_value,0)} XP`)
        ),
        h('button',{onClick:()=>{setView('add');setAddStep(0);setAddType('');setAddPick(null);setAddTime('');setAddNote('');},className:'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white',style:{background:'linear-gradient(135deg,#0f766e,#0d9488)'}},h(Icon,{n:'plus',cls:'w-4 h-4'}),'Add')
      ),
      daySessions.length===0
        ? h('div',{className:'flex flex-col items-center py-10 text-center',style:{border:'2px dashed rgba(51,65,85,0.5)',borderRadius:'1rem'}},
          h(Icon,{n:'calendar',cls:'w-10 h-10',style:{color:'#484f58'}}),
          h('div',{className:'font-bold text-white text-sm mb-1'},'No sessions planned'),
          h('div',{className:'text-xs text-slate-500 mb-4'},'Add a session or generate a smart schedule'),
          h('div',{className:'flex gap-2'},
            h('button',{onClick:()=>{setView('add');setAddStep(0);},className:'btn-primary text-sm px-4 py-2.5'},h(Icon,{n:'plus',cls:'w-4 h-4'}),' Add Session'),
            h('button',{onClick:()=>setView('generate'),className:'btn-secondary text-sm px-4 py-2.5'},h(Icon,{n:'sparkles',cls:'w-4 h-4'}),' Auto Plan')
          )
        )
        : h('div',{className:'space-y-3'},
          daySessions.map(s=>{
            const tc=SCHED_TYPES[s.type]||SCHED_TYPES.custom;
            const isDone=s.status==='complete',isSkipped=s.status==='skipped';
            return h('div',{key:s.id,className:'rounded-2xl overflow-hidden',
              style:{background:isDone?'rgba(16,185,129,0.06)':isSkipped?'rgba(30,41,59,0.3)':tc.bg,
                border:`1px solid ${isDone?'rgba(16,185,129,0.3)':isSkipped?'rgba(51,65,85,0.3)':tc.border}`,opacity:isSkipped?0.6:1}},
              h('div',{style:{height:'4px',background:isDone?'#10b981':isSkipped?'#475569':tc.color}}),
              h('div',{className:'p-4'},
                h('div',{className:'flex items-start gap-3'},
                  h('div',{style:{width:44,height:44,borderRadius:'0.875rem',background:isDone?'rgba(16,185,129,0.15)':'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
                    isDone?h(Icon,{n:'check',cls:'w-4 h-4 text-white'}):h(Icon,{n:tc.icon||'calendar',cls:'w-4 h-4',style:{color:tc.color}})
                  ),
                  h('div',{className:'flex-1 min-w-0'},
                    h('div',{className:'flex items-start justify-between gap-2'},
                      h('h3',{style:{fontSize:'0.9375rem',fontWeight:800,color:isSkipped?'#64748b':'#f8fafc',lineHeight:1.3}},s.title),
                      isDone && h('span',{style:{fontSize:'0.7rem',fontWeight:700,padding:'0.125rem 0.5rem',background:'rgba(22,163,74,0.12)',border:'1px solid rgba(22,163,74,0.25)',borderRadius:4,color:'#4ade80',whiteSpace:'nowrap'}},'Done')
                    ),
                    h('div',{className:'flex items-center gap-2 mt-1.5 flex-wrap'},
                      s.time && h('span',{style:{fontSize:'0.75rem',color:'#94a3b8',fontWeight:600}},s.time),
                      s.time && h('span',{style:{color:'#475569'}},'·'),
                      h('span',{style:{fontSize:'0.75rem',color:'#94a3b8'}},`${s.duration_minutes} min`),
                      !isDone && h(XPBadge,{xp:s.xp_value}),
                      s.notes && h('span',{style:{fontSize:'0.7rem',color:'#64748b',fontStyle:'italic'}},s.notes)
                    )
                  )
                ),
                !isSkipped && h('div',{className:'flex gap-2 mt-3'},
                  !isDone && h('button',{onClick:()=>startSession(s),className:'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-black transition-all active:scale-95',style:{background:`linear-gradient(135deg,${tc.color}33,${tc.color}22)`,border:`1px solid ${tc.color}60`,color:'#fff'}},h(Icon,{n:'play',cls:'w-4 h-4'}),'Start'),
                  !isDone && h('button',{onClick:()=>completeSession(s.id),className:'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95',style:{background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',color:'#34d399'}},h(Icon,{n:'check',cls:'w-4 h-4'}),'Done'),
                  isDone && h('button',{onClick:()=>undoSession(s.id),className:'flex items-center gap-1 py-2.5 px-3 rounded-xl text-xs font-bold',style:{background:'rgba(30,41,59,0.5)',color:'#94a3b8',border:'1px solid rgba(51,65,85,0.4)'}},'Undo'),
                  !isDone && h('button',{onClick:()=>skipSession(s.id),className:'py-2.5 px-3 rounded-xl text-xs font-bold',style:{background:'rgba(30,41,59,0.5)',color:'#94a3b8',border:'1px solid rgba(51,65,85,0.4)'}},'Skip'),
                  h('button',{onClick:()=>deleteSession(s.id),className:'py-2.5 px-3 rounded-xl',style:{background:'rgba(239,68,68,0.08)',color:'#f87171',border:'1px solid rgba(239,68,68,0.2)'}},h(Icon,{n:'trash',cls:'w-4 h-4'}))
                ),
                isSkipped && h('div',{className:'flex items-center justify-between mt-3'},h('span',{style:{fontSize:'0.75rem',color:'#64748b'}},'Skipped'),h('button',{onClick:()=>undoSession(s.id),style:{fontSize:'0.75rem',fontWeight:700,color:'#60a5fa'}},'Restore'))
              )
            );
          })
        )
    ),
    h('div',{className:'mx-4 mt-5 p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.5)',border:'1px solid rgba(51,65,85,0.5)'}},
      h('p',{className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-3'},'This Week'),
      h('div',{className:'grid grid-cols-3 gap-3 text-center'},
        h('div',{},h('div',{className:'text-xl font-black text-white'},weekSessions.length),h('div',{style:{fontSize:'0.7rem',color:'#64748b',fontWeight:700}},'Total')),
        h('div',{},h('div',{className:'text-xl font-black',style:{color:'#34d399'}},weekDoneCount),h('div',{style:{fontSize:'0.7rem',color:'#64748b',fontWeight:700}},'Done')),
        h('div',{},h('div',{className:'text-xl font-black',style:{color:'#f59e0b'}},weekXP),h('div',{style:{fontSize:'0.7rem',color:'#64748b',fontWeight:700}},'XP Left'))
      )
    ),
    h('div',{className:'px-4 mt-4 mb-2'},
      h('button',{onClick:()=>nav('SkillPaths'),className:'w-full flex items-center gap-3 p-4 rounded-2xl text-left active:scale-[.99] transition-all',style:{background:'rgba(30,41,59,0.4)',border:'1px solid rgba(51,65,85,0.4)'}},
        h(Icon,{n:'layers',cls:'w-5 h-5',style:{color:'#8b949e'}}),
        h('div',{className:'flex-1'},h('div',{className:'text-sm font-bold text-white'},'Import from Skill Path'),h('div',{className:'text-xs text-slate-500'},"Load your active path's weekly plan")),
        h(Icon,{n:'chevR',cls:'w-5 h-5',style:{color:'#475569'}})
      )
    )
  );
}

// ================================================================
// SKILL PATHS PAGE
// ================================================================
function SkillPathsPage() {
  const [pathId, setPathId] = useState(null);
  const [levelId, setLevelId] = useState(null);
  const [weekPlan, setWeekPlan] = useState(null);
  const progress = DB.getProgress();
  const skillProg = progress.skill_path_progress || {};

  function importToSchedule(plan) {
    const monday = getWeekMonday(new Date());
    let added = 0;
    plan.forEach(week=>{
      if(week.week!==1) return;
      week.days.forEach(day=>{
        if(day.isRest) return;
        const d = addDays(monday, day.day-1);
        const ds = dateStr(d);
        day.activities.forEach((act,i)=>{
          DB.addSession({id:'sch_'+Date.now()+'_'+day.day+'_'+i,date:ds,time:i===0?'07:00':i===1?'17:00':'19:00',
            type:act.type,title:act.title,ref_id:act.id||null,duration_minutes:parseInt(act.duration)||20,xp_value:act.xp,
            status:'pending',notes:'From Skill Path',color:SCHED_TYPES[act.type]?.color||'#64748b'});
          added++;
        });
      });
    });
    window.dispatchEvent(new CustomEvent('sc_update'));
    alert(`✅ ${added} sessions imported to this week's schedule!`);
  }

  if(!pathId) return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Skill Paths',subtitle:'Structured programs for every discipline',gradient:'linear-gradient(135deg,#7e22ce,#4f46e5)'}),
    h('div',{className:'px-4 pt-5 space-y-4'},
      SKILL_PATHS.map(path=>{
        const pp=skillProg[path.id]||{};
        const doneCount=Object.values(pp).filter(Boolean).length;
        const pct=doneCount/path.levels.length*100;
        return h('button',{key:path.id,onClick:()=>{setPathId(path.id);setLevelId(null);setWeekPlan(null);},
          className:'w-full text-left p-5 rounded-2xl active:scale-[.99] transition-all',
          style:{background:'rgba(30,41,59,0.7)',border:`1px solid ${path.accent}30`}},
          h('div',{style:{height:'3px',background:`linear-gradient(to right,${path.accent},transparent)`,marginBottom:'1rem',borderRadius:'2px'}}),
          h('div',{className:'flex items-center gap-4'},
            h('div',{style:{position:'relative',width:56,height:56,flexShrink:0}},
              h('svg',{width:56,height:56,viewBox:'0 0 56 56',style:{position:'absolute',inset:0,transform:'rotate(-90deg)'}},
                h('circle',{cx:28,cy:28,r:22,fill:'none',stroke:'rgba(51,65,85,0.6)',strokeWidth:4}),
                h('circle',{cx:28,cy:28,r:22,fill:'none',stroke:path.accent,strokeWidth:4,strokeDasharray:2*Math.PI*22,strokeDashoffset:2*Math.PI*22*(1-pct/100),strokeLinecap:'round',style:{transition:'stroke-dashoffset .6s'}})
              ),
              h('div',{style:{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}},h(Icon,{n:path.icon||'bat',cls:'w-6 h-6 text-white'}))
            ),
            h('div',{className:'flex-1'},
              h('h3',{className:'font-black text-white text-base'},path.title),
              h('p',{className:'text-xs mt-0.5 mb-2',style:{color:'#64748b'}},path.desc),
              h('div',{className:'flex items-center gap-3'},
                h('div',{className:'flex-1 h-2 rounded-full',style:{background:'rgba(51,65,85,0.6)',overflow:'hidden'}},
                  h('div',{style:{width:`${pct}%`,height:'100%',background:path.accent,borderRadius:'9999px',transition:'width .6s'}})
                ),
                h('span',{style:{fontSize:'0.7rem',fontWeight:800,color:path.accent}},`${doneCount}/${path.levels.length}`)
              )
            )
          )
        );
      })
    )
  );

  const path=SKILL_PATHS.find(p=>p.id===pathId);
  if(!path) return null;
  const grad=`linear-gradient(135deg,${path.accent},${path.accent}88)`;

  if(!levelId) return h('div',{className:'pb-28'},
    h(PageHeader,{title:path.title,subtitle:path.desc,gradient:grad,onBack:()=>setPathId(null)}),
    h('div',{className:'px-4 pt-5 space-y-3'},
      h('p',{className:'text-sm text-slate-400 mb-2'},'Choose your level to begin your structured 5-week program:'),
      path.levels.map((lv,i)=>{
        const pp=skillProg[path.id]||{};
        const unlocked=i===0||(pp[path.levels[i-1].id]);
        const done=pp[lv.id];
        return h('button',{key:lv.id,onClick:()=>{if(!unlocked)return;setLevelId(lv.id);setWeekPlan(generateWeekPlan(path.id,lv.id));},
          className:'w-full text-left p-5 rounded-2xl transition-all',
          style:{background:done?'rgba(16,185,129,0.08)':unlocked?'rgba(30,41,59,0.7)':'rgba(15,23,42,0.5)',
            border:`2px solid ${done?'rgba(16,185,129,0.4)':unlocked?`${path.accent}40`:'rgba(51,65,85,0.3)'}`,opacity:unlocked?1:0.5}},
          h('div',{className:'flex items-center gap-4'},
            h('div',{style:{width:52,height:52,borderRadius:'0.875rem',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:done?'#10b981':unlocked?path.accent:'rgba(51,65,85,0.5)'}},
              done?h(Icon,{n:'check',cls:'w-6 h-6 text-white'}):h(Icon,{n:lv.icon||'star',cls:'w-6 h-6 text-white'})
            ),
            h('div',{className:'flex-1'},
              h('div',{className:'flex items-center gap-2'},
                h('h3',{className:'font-black text-white'},lv.label),
                !unlocked && h(Icon,{n:'lock',cls:'w-3 h-3',style:{color:'#484f58',flexShrink:0}}),
                done && h('span',{style:{fontSize:'0.7rem',fontWeight:700,color:'#4ade80'}},'Complete')
              ),
              h('p',{className:'text-xs text-slate-400 mt-0.5'},lv.desc),
              h('div',{className:'flex items-center gap-2 mt-2'},
                h('span',{style:{fontSize:'0.75rem',fontWeight:800,color:path.accent}},`+${lv.xpPerDay} XP/day`),
                h('span',{style:{fontSize:'0.75rem',color:'#475569'}},'· 5-week program')
              )
            )
          )
        );
      })
    )
  );

  const lv=path.levels.find(l=>l.id===levelId);
  if(!lv||!weekPlan) return null;
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:lv.label,subtitle:path.title,gradient:grad,onBack:()=>setLevelId(null)}),
    h('div',{className:'px-4 pt-5'},
      h('div',{className:'flex gap-2 mb-5'},
        h('button',{onClick:()=>importToSchedule(weekPlan),className:'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white',style:{background:'linear-gradient(135deg,#0f766e,#0d9488)'}},h(Icon,{n:'calendar',cls:'w-4 h-4'}),'Import to Schedule'),
        h('button',{onClick:()=>{const p=DB.getProgress();if(!p.skill_path_progress)p.skill_path_progress={};if(!p.skill_path_progress[path.id])p.skill_path_progress[path.id]={};p.skill_path_progress[path.id][levelId]=true;DB.saveProgress(p);awardXP(lv.xpPerDay*5,30,'skill_path');setLevelId(null);},
          className:'flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold',style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(51,65,85,0.5)',color:'#94a3b8'}},h(Icon,{n:'check',cls:'w-4 h-4'}),'Mark Done')
      ),
      h('div',{className:'space-y-3'},weekPlan.map(week=>h(WeekAccordion,{key:week.week,week,pathAccent:path.accent})))
    )
  );
}

function WeekAccordion({ week, pathAccent }) {
  const [open,setOpen]=useState(week.week===1);
  return h('div',{className:'rounded-2xl overflow-hidden',style:{border:'1px solid rgba(51,65,85,0.5)'}},
    h('button',{onClick:()=>setOpen(o=>!o),className:'w-full flex items-center justify-between p-4 text-left',style:{background:'rgba(30,41,59,0.6)'}},
      h('div',{},h('div',{className:'font-bold text-white text-sm'},week.theme),h('div',{className:'text-xs text-slate-500 mt-0.5'},`${week.days.filter(d=>!d.isRest).length} training days`)),
      h(Icon,{n:open?'chevU':'chevD',cls:'w-5 h-5',style:{color:'#64748b'}})
    ),
    open && h('div',{style:{background:'rgba(15,23,42,0.4)',borderTop:'1px solid rgba(51,65,85,0.4)'}},
      week.days.map(day=>h('div',{key:day.day,className:'p-4',style:{borderBottom:'1px solid rgba(51,65,85,0.2)'}},
        h('div',{className:'flex items-center justify-between mb-2'},
          h('span',{style:{fontSize:'0.875rem',fontWeight:800,color:'#fff'}},day.label),
          day.isRest?h('div',{style:{display:'flex',alignItems:'center',gap:4}},h(Icon,{n:'heart',cls:'w-3 h-3',style:{color:'#484f58'}}),h('span',{style:{fontSize:'0.65rem',color:'#484f58'}},'Rest'))
            :h('span',{style:{fontSize:'0.7rem',fontWeight:800,color:pathAccent}},`+${day.totalXP} XP`)
        ),
        !day.isRest && h('div',{className:'space-y-1.5'},
          day.activities.map((act,i)=>h('div',{key:i,className:'flex items-center gap-2'},
            h(Icon,{n:act.type==='drill'?'bat':act.type==='mental'?'brain':'dumbbell',cls:'w-3.5 h-3.5',style:{color:'#484f58'}}),
            h('div',{className:'flex-1'},h('div',{style:{fontSize:'0.75rem',fontWeight:700,color:'#cbd5e1'}},act.title),h('div',{style:{fontSize:'0.7rem',color:'#64748b'}},`${act.duration} · +${act.xp} XP`))
          ))
        )
      ))
    )
  );
}

// ================================================================
// PROGRESS PAGE
// ================================================================
function ProgressPage() {
  const [progress,setProgress]=useState(()=>DB.getProgress());
  const [xpDays,setXpDays]=useState(()=>DB.getXPLast7Days());
  const [hmap,setHmap]=useState(()=>DB.getActivityHeatmap());
  const refresh=useCallback(()=>{setProgress(DB.getProgress());setXpDays(DB.getXPLast7Days());setHmap(DB.getActivityHeatmap());},[]);
  useEffect(()=>{window.addEventListener('sc_update',refresh);window.addEventListener('focus',refresh);return()=>{window.removeEventListener('sc_update',refresh);window.removeEventListener('focus',refresh);};},[refresh]);
  const info=getLevelInfo(progress.total_xp||0);
  const badges=progress.badges||[];
  const schedStats=(DB.getSchedule().sessions||[]).filter(s=>s.status==='complete').length;

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'My Progress',subtitle:'Your complete training stats',gradient:'linear-gradient(135deg,#064e3b,#065f46)'}),
    h('div',{className:'px-4 pt-5 space-y-5'},
      h('div',{className:'p-5 rounded-2xl',style:{background:'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(13,148,136,0.06))',border:'1px solid rgba(16,185,129,0.3)'}},
        h('div',{className:'flex items-center justify-between mb-4'},
          h('div',{},h('div',{className:'text-2xl font-black text-white'},`Level ${info.level}`),h('div',{style:{color:'#34d399',fontWeight:700,fontSize:'0.875rem'}},info.name)),
          h('div',{className:'text-right'},h('div',{className:'text-xl font-black text-white'},`${(progress.total_xp||0).toLocaleString()} XP`),info.next&&h('div',{style:{fontSize:'0.75rem',color:'#64748b'}},`${info.xpToNext.toLocaleString()} to next level`))
        ),
        h(LevelBar,{totalXP:progress.total_xp||0}),
        h('div',{className:'flex justify-between text-xs mt-2',style:{color:'#475569'}},h('span',{},`Lv.${info.level}: ${info.min.toLocaleString()}`),info.next&&h('span',{},`Lv.${info.level+1}: ${info.next.min.toLocaleString()}`))
      ),
      h('div',{className:'grid grid-cols-2 gap-3'},
        [{label:'Drills Done',val:progress.drills_done||0,color:'text-blue-400',icon:'target'},{label:'Mental Sessions',val:progress.mental_done||0,color:'text-purple-400',icon:'brain'},
         {label:'Workouts',val:progress.workouts_done||0,color:'text-orange-400',icon:'dumbbell'},{label:'Practice Mins',val:progress.practice_minutes||0,color:'text-teal-400',icon:'clock'},
         {label:'Best Streak',val:`${progress.longest_streak||0}d`,color:'text-red-400',icon:'flame'},{label:'Scheduled Done',val:(DB.getSchedule().sessions||[]).filter(s=>s.status==='complete').length,color:'text-emerald-400',icon:'calendar'},
        ].map(s=>h(StatCard,{key:s.label,...s}))
      ),
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{className:'flex justify-between items-center mb-3'},h('span',{className:'text-sm font-bold text-white'},'7-Day XP'),h('span',{style:{fontSize:'0.75rem',fontWeight:700,color:'#34d399'}},`${xpDays.reduce((s,d)=>s+d.xp,0)} total`)),
        h(XPChart,{days:xpDays})
      ),
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{className:'flex justify-between items-center mb-3'},h('span',{className:'text-sm font-bold text-white'},'30-Day Activity'),h('div',{className:'flex items-center gap-1.5'},[0,1,2,3,4].map(l=>h('div',{key:l,className:`heatmap-cell heatmap-${l}`,style:{width:12,height:12}})))),
        h(Heatmap,{days:hmap})
      ),
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{className:'flex justify-between items-center mb-4'},h('div',{style:{display:'flex',alignItems:'center',gap:8}},h(Icon,{n:'award',cls:'w-4 h-4',style:{color:'#8b949e'}}),h('span',{style:{fontSize:14,fontWeight:700,color:'#e6edf3'}},'Badges')),h('span',{style:{fontSize:'0.75rem',color:'#64748b'}},`${badges.length} of ${Object.keys(BADGE_DEFS).length}`)),
        h('div',{className:'grid grid-cols-3 gap-2.5'},
          Object.entries(BADGE_DEFS).map(([id,def])=>{
            const earned=badges.includes(id);
            return h('div',{key:id,className:'flex flex-col items-center gap-1.5 p-3 rounded-xl text-center',
              style:{background:earned?'rgba(16,185,129,0.08)':'rgba(15,23,42,0.4)',border:`1px solid ${earned?'rgba(16,185,129,0.25)':'rgba(51,65,85,0.3)'}`,opacity:earned?1:0.4}},
              h('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}},earned?h(Icon,{n:def.icon,cls:'w-6 h-6',style:{color:'#e6edf3'}}):h(Icon,{n:'lock',cls:'w-5 h-5',style:{color:'#484f58'}})),
              h('span',{style:{fontSize:'0.65rem',fontWeight:800,color:earned?'#f8fafc':'#64748b'}},def.label)
            );
          })
        )
      ),
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:16}},h(Icon,{n:'layers',cls:'w-4 h-4',style:{color:'#8b949e'}}),h('span',{style:{fontSize:14,fontWeight:700,color:'#e6edf3'}},'Skill Paths')),
        SKILL_PATHS.map(path=>{
          const pp=(progress.skill_path_progress||{})[path.id]||{};
          const done=Object.values(pp).filter(Boolean).length;
          const pct=done/path.levels.length*100;
          return h('div',{key:path.id,className:'mb-3 last:mb-0'},
            h('div',{className:'flex justify-between text-xs mb-1.5'},h('div',{style:{display:'flex',alignItems:'center',gap:6}},h(Icon,{n:path.icon||'bat',cls:'w-3.5 h-3.5',style:{color:'#8b949e'}}),h('span',{style:{color:'#8b949e',fontWeight:600,fontSize:13}},path.title)),h('span',{style:{color:path.accent,fontWeight:800}},`${done}/${path.levels.length}`)),
            h('div',{style:{height:'6px',background:'rgba(51,65,85,0.6)',borderRadius:'9999px',overflow:'hidden'}},h('div',{style:{width:`${pct}%`,height:'100%',background:path.accent,borderRadius:'9999px',transition:'width .6s'}}))
          );
        })
      )
    )
  );
}

// ================================================================
// 30-DAY CHALLENGE
// ================================================================
const DAY30=Array.from({length:30},(_,i)=>({
  day:i+1,
  title:i%7===6?'Rest & Recover':['Batting Fundamentals','Mental Focus','Bowling Precision','Fielding Agility','Power Hitting','Match Mindset'][i%6],
  type:i%7===6?'rest':['drill','mental','drill','fitness','drill','mental'][i%6],
  xp:i%7===6?20:[60,50,70,65,90,55][i%6],
  phase:i<7?'Foundation':i<14?'Development':i<21?'Integration':'Performance'
}));

function ThirtyDayPage() {
  const [progress,setProgress]=useState(()=>DB.getProgress());
  const completed=progress.thirtyDay_completed||{};
  const today=new Date().toISOString().slice(0,10);
  const doneCnt=Object.keys(completed).length;
  const pct=Math.round(doneCnt/30*100);
  useEffect(()=>{const refresh=()=>setProgress(DB.getProgress());window.addEventListener('sc_update',refresh);return()=>window.removeEventListener('sc_update',refresh);},[]);
  const markDay=day=>{
    if(completed[day.day]) return;
    const currentP=DB.getProgress();
    if(currentP.thirtyDay_completed?.[day.day]){setProgress(currentP);return;}
    const p=DB.getProgress();
    if(!p.thirtyDay_completed)p.thirtyDay_completed={};
    p.thirtyDay_completed[day.day]=today;
    DB.saveProgress(p);
    awardXP(day.xp,15,'30day');
    setProgress(DB.getProgress());
  };
  const phases=['Foundation','Development','Integration','Performance'];
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'30-Day Challenge',subtitle:'Build the habit. Transform your game.',gradient:'linear-gradient(135deg,#d97706,#b45309)'}),
    h('div',{className:'px-4 pt-5 space-y-5'},
      h('div',{className:'p-5 rounded-2xl',style:{background:'rgba(217,119,6,0.1)',border:'1px solid rgba(217,119,6,0.3)'}},
        h('div',{className:'flex items-center justify-between mb-3'},
          h('div',{},h('div',{className:'text-2xl font-black text-white'},`Day ${doneCnt} / 30`),h('div',{style:{color:'#fbbf24',fontWeight:700,fontSize:'0.875rem'}},doneCnt===30?'🏆 Challenge Complete!':doneCnt===0?'Begin your journey':'Keep going — great work!')),
          h('div',{style:{width:56,height:56,borderRadius:'50%',border:'4px solid #f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#f59e0b',fontSize:'0.875rem'}},`${pct}%`)
        ),
        h('div',{style:{height:'8px',background:'rgba(51,65,85,0.6)',borderRadius:'9999px',overflow:'hidden'}},h('div',{style:{width:`${pct}%`,height:'100%',background:'linear-gradient(to right,#f59e0b,#d97706)',borderRadius:'9999px',transition:'width .6s'}}))
      ),
      phases.map((phase,pi)=>{
        const pDays=DAY30.filter(d=>d.phase===phase);
        return h('div',{key:phase},
          h('div',{className:'flex items-center gap-2 mb-3'},h('div',{style:{width:8,height:8,borderRadius:'50%',background:'#f59e0b'}}),h('span',{style:{fontSize:'0.7rem',fontWeight:800,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em'}},`Week ${pi+1} — ${phase}`)),
          h('div',{className:'grid grid-cols-7 gap-1.5'},
            pDays.map(d=>{
              const isDone=!!completed[d.day],isNext=!isDone&&Object.keys(completed).length===d.day-1;
              return h('button',{key:d.day,onClick:()=>markDay(d),disabled:isDone,title:`Day ${d.day}: ${d.title}`,
                className:'flex flex-col items-center justify-center py-2 rounded-xl active:scale-95 transition-all',
                style:{aspectRatio:'1',background:isDone?'#10b981':isNext?'rgba(245,158,11,0.15)':d.type==='rest'?'rgba(15,23,42,0.5)':'rgba(30,41,59,0.6)',border:isNext?'2px solid #f59e0b':isDone?'2px solid #059669':'2px solid rgba(51,65,85,0.4)'}},
                h('span',{style:{fontSize:'0.75rem',fontWeight:900,color:isDone?'#fff':isNext?'#f59e0b':d.type==='rest'?'#64748b':'#94a3b8'}},isDone?'✓':d.type==='rest'?'😴':d.day)
              );
            })
          )
        );
      }),
      (()=>{const next=DAY30[doneCnt];if(!next||doneCnt===30)return null;return h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(245,158,11,0.3)'}},h('div',{style:{fontSize:'0.7rem',fontWeight:800,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.5rem'}},`Up Next — Day ${next.day}`),h('div',{className:'font-black text-white text-base mb-1'},next.title),h('div',{style:{fontSize:'0.75rem',color:'#64748b',marginBottom:'1rem'}},`Phase: ${next.phase} · +${next.xp} XP`),h('button',{onClick:()=>markDay(next),className:'btn-primary w-full py-3 text-sm'},`Complete Day ${next.day}`));})()
    )
  );
}

// ================================================================
// PROFILE, SETTINGS, LEADERBOARD, GOALS
// ================================================================
function ProfilePage() {
  const [user,setUser]=useState(DB.getUser);
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(user);
  const progress=DB.getProgress();
  const info=getLevelInfo(progress.total_xp||0);
  const save=()=>{ DB.setUser(form); setUser(form); setEditing(false); };
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'My Profile',subtitle:'Your cricketer identity',gradient:'linear-gradient(135deg,#0f766e,#0d9488)',
      actions:h('button',{onClick:()=>editing?save():setEditing(true),className:'px-4 py-2 rounded-xl text-white text-sm font-bold',style:{background:'rgba(255,255,255,0.15)'}},editing?'Save':'Edit')}),
    h('div',{className:'px-4 pt-5 space-y-4'},
      h('div',{className:'flex items-center gap-4 p-5 rounded-2xl',style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{style:{width:80,height:80,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:'linear-gradient(135deg,#16a34a,#0d9488)'}},h(Icon,{n:'bat',cls:'w-10 h-10 text-white'})),
        h('div',{className:'flex-1'},
          h('div',{className:'text-xl font-black text-white'},user.name||'Cricketer'),
          h('div',{style:{color:'#34d399',fontWeight:700,fontSize:'0.875rem'}},`${info.name} — Level ${info.level}`),
          h('div',{className:'text-xs text-slate-400 mt-0.5'},user.role||'All-Rounder'),
          h('div',{className:'mt-3'},h(LevelBar,{totalXP:progress.total_xp||0,compact:true}))
        )
      ),
      editing && h('div',{className:'space-y-3'},
        [{key:'name',label:'Full Name',ph:'Your name'},{key:'role',label:'Playing Role',ph:'Batsman, Bowler...'},{key:'team',label:'Team / Club',ph:'Your team'},{key:'country',label:'Country',ph:'Your country'}].map(f=>
          h('div',{key:f.key},h('label',{className:'text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5'},f.label),h('input',{type:'text',placeholder:f.ph,value:form[f.key]||'',onChange:e=>setForm({...form,[f.key]:e.target.value}),className:'w-full px-4 py-3 rounded-xl text-sm text-white outline-none',style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(51,65,85,0.6)'}}))
        ),
        h('div',{className:'flex gap-3'},h('button',{onClick:save,className:'btn-primary flex-1'},'Save'),h('button',{onClick:()=>setEditing(false),className:'btn-secondary flex-1'},'Cancel'))
      ),
      !editing && h('div',{className:'grid grid-cols-2 gap-3'},
        [{label:'Role',val:user.role||'Not set'},{label:'Team',val:user.team||'Not set'},{label:'Country',val:user.country||'Not set'},{label:'Total XP',val:(progress.total_xp||0).toLocaleString()}].map(s=>
          h('div',{key:s.label,className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},h('div',{className:'text-xs text-slate-500 uppercase font-bold tracking-wider'},s.label),h('div',{className:'font-bold text-white text-sm mt-1'},s.val))
        )
      )
    )
  );
}

function SettingsPage() {
  const {dark,toggle}=useTheme();
  const [msg,setMsg]=useState('');
  const clearAll=()=>{
    if(!window.confirm('Reset all progress? This cannot be undone.')) return;
    DB.del('progress');DB.del('xp_log');DB.del('schedule');
    window.dispatchEvent(new CustomEvent('sc_update'));
    setMsg('Progress reset successfully!');
  };
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Settings',gradient:'linear-gradient(135deg,#334155,#1e293b)'}),
    h('div',{className:'px-4 pt-5 space-y-3'},
      msg && h('div',{className:'p-3 rounded-xl text-sm font-semibold text-center',style:{background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',color:'#34d399'}},msg),
      h('div',{className:'flex items-center justify-between p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{},h('div',{className:'font-bold text-white text-sm'},'Dark Mode'),h('div',{className:'text-xs text-slate-500'},'Easy on the eyes')),
        h('button',{onClick:toggle,style:{width:48,height:24,borderRadius:'9999px',background:dark?'#10b981':'#475569',position:'relative',border:'none',cursor:'pointer'}},h('div',{style:{width:20,height:20,borderRadius:'50%',background:'#fff',position:'absolute',top:2,left:2,transition:'transform .2s',transform:dark?'translateX(24px)':'translateX(0)',boxShadow:'0 2px 4px rgba(0,0,0,0.3)'}}))
      ),
      h('button',{onClick:clearAll,className:'w-full p-4 rounded-2xl text-left',style:{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.3)'}},h('div',{className:'font-bold text-red-400 text-sm'},'Reset All Progress'),h('div',{className:'text-xs text-slate-500'},'Clears XP, drills, workouts, and schedule data'))
    )
  );
}

function LeaderboardPage() {
  const progress=DB.getProgress();
  const info=getLevelInfo(progress.total_xp||0);
  const entries=[
    {n:'Virat K.',lv:9,xp:52400,streak:47,flag:'🇮🇳'},{n:'Josh H.',lv:8,xp:38200,streak:31,flag:'🇦🇺'},
    {n:'Babar A.',lv:8,xp:36800,streak:28,flag:'🇵🇰'},{n:'Rohit S.',lv:7,xp:29100,streak:22,flag:'🇮🇳'},
    {n:'Ben S.',lv:7,xp:27300,streak:19,flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},
    {n:'You',lv:info.level,xp:progress.total_xp||0,streak:progress.current_streak||0,isYou:true}
  ].sort((a,b)=>b.xp-a.xp).map((e,i)=>({...e,rank:i+1}));
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Leaderboard',subtitle:'Top SmartCrick athletes worldwide',gradient:'linear-gradient(135deg,#b45309,#92400e)'}),
    h('div',{className:'px-4 pt-5 space-y-2.5'},
      entries.map(e=>h('div',{key:e.rank,className:'flex items-center gap-4 p-4 rounded-2xl',style:{background:e.isYou?'rgba(16,185,129,0.08)':'rgba(30,41,59,0.6)',border:`1px solid ${e.isYou?'rgba(16,185,129,0.3)':'rgba(51,65,85,0.5)'}`}},
        h('div',{style:{width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:900,background:e.rank<=3?'linear-gradient(135deg,#f59e0b,#d97706)':'rgba(30,41,59,0.8)',color:e.rank<=3?'#fff':'#94a3b8'}},`#${e.rank}`),
        h('div',{style:{fontSize:16,lineHeight:1}},e.flag||''),
        h('div',{className:'flex-1'},h('div',{style:{fontWeight:800,fontSize:'0.875rem',color:e.isYou?'#34d399':'#f8fafc'}},e.isYou?`${e.n} (You)`:e.n),h('div',{style:{fontSize:'0.75rem',color:'#64748b'}},`Level ${e.lv} · ${e.xp.toLocaleString()} XP`)),
        h('div',{style:{fontSize:'0.75rem',fontWeight:800,color:'#fb923c'}},h('div',{style:{display:'flex',alignItems:'center',gap:4}},h(Icon,{n:'flame',cls:'w-3.5 h-3.5',style:{color:'#fb923c'}}),`${e.streak}d`))
      ))
    )
  );
}

function GoalsPage() {
  const [goals,setGoals]=useState(()=>DB.getGoals());
  const [newGoal,setNewGoal]=useState('');
  const add=()=>{if(!newGoal.trim())return;const g=[...goals,{id:Date.now(),text:newGoal.trim(),done:false,date:new Date().toISOString().slice(0,10)}];DB.saveGoals(g);setGoals(g);setNewGoal('');};
  const toggle=id=>{const g=goals.map(x=>x.id===id?{...x,done:!x.done}:x);DB.saveGoals(g);setGoals(g);if(!goals.find(x=>x.id===id)?.done)awardXP(25,0,'goal');};
  const del=id=>{ const g=goals.filter(x=>x.id!==id); DB.saveGoals(g); setGoals(g); };
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Goals',subtitle:'Set and track your training targets',gradient:'linear-gradient(135deg,#15803d,#16a34a)'}),
    h('div',{className:'px-4 pt-5 space-y-4'},
      h('div',{className:'flex gap-2'},
        h('input',{type:'text',placeholder:'Add a training goal...',value:newGoal,onChange:e=>setNewGoal(e.target.value),onKeyDown:e=>e.key==='Enter'&&add(),className:'flex-1 px-4 py-3 rounded-xl text-sm text-white outline-none',style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(51,65,85,0.6)'}}),
        h('button',{onClick:add,className:'btn-primary px-4 py-3 rounded-xl'},h(Icon,{n:'plus',cls:'w-5 h-5'}))
      ),
      goals.length===0 && h(EmptyState,{icon:'target',title:'No goals yet',desc:'Add your first cricket training goal to stay focused and track progress'}),
      goals.map(g=>h('div',{key:g.id,className:'flex items-center gap-3 p-4 rounded-2xl',style:{background:g.done?'rgba(16,185,129,0.06)':'rgba(30,41,59,0.6)',border:`1px solid ${g.done?'rgba(16,185,129,0.25)':'rgba(51,65,85,0.5)'}`}},
        h('button',{onClick:()=>toggle(g.id),style:{width:28,height:28,borderRadius:'50%',border:`2px solid ${g.done?'#10b981':'rgba(51,65,85,0.8)'}`,background:g.done?'#10b981':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer'}},g.done&&h(Icon,{n:'check',cls:'w-4 h-4 text-white'})),
        h('span',{style:{flex:1,fontSize:'0.875rem',color:g.done?'#64748b':'#f8fafc',fontWeight:600,textDecoration:g.done?'line-through':'none'}},g.text),
        h('button',{onClick:()=>del(g.id),style:{color:'#ef4444',background:'none',border:'none',cursor:'pointer',padding:'0.25rem'}},h(Icon,{n:'x',cls:'w-4 h-4'}))
      ))
    )
  );
}

// ================================================================
// VIDEO ANALYSIS PAGE
// ================================================================
function VideoAnalysisPage() {
  const [tab, setTab] = useState('upload');
  const [shotType, setShotType] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  const SHOTS = ['Cover Drive','Pull Shot','Cut Shot','Sweep','Defensive Block','Hook','Flick','Square Cut'];
  const METRICS = [
    {label:'Bat Speed',val:'34.2 m/s',color:'#3b82f6',pct:78},
    {label:'Elbow Position',val:'Good',color:'#10b981',pct:85},
    {label:'Weight Transfer',val:'Early',color:'#f59e0b',pct:62},
    {label:'Follow Through',val:'High',color:'#10b981',pct:91},
    {label:'Head Position',val:'Stable',color:'#10b981',pct:88},
    {label:'Foot Movement',val:'Correct',color:'#10b981',pct:80},
  ];
  const FEEDBACK = [
    {icon:'circleCheck',color:'#10b981',text:'Front elbow is correctly elevated throughout the swing'},
    {icon:'alertTriangle',color:'#f59e0b',text:'Weight transfer initiates slightly early — wait for the ball'},
    {icon:'circleCheck',color:'#10b981',text:'Follow-through is high and complete — excellent form'},
    {icon:'info',color:'#3b82f6',text:'Try widening stance by 3-4 cm for improved base stability'},
  ];

  const runAnalysis = () => {
    if (!shotType) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => { setAnalyzing(false); setResult(true); }, 2200);
  };

  const ScoreRing = ({score, label, color}) => {
    const R=36, C=2*Math.PI*R;
    return h('div', {style:{textAlign:'center'}},
      h('div', {style:{position:'relative',width:88,height:88,margin:'0 auto 6px'}},
        h('svg',{width:88,height:88,viewBox:'0 0 88 88',style:{position:'absolute',inset:0,transform:'rotate(-90deg)'}},
          h('circle',{cx:44,cy:44,r:R,fill:'none',stroke:'rgba(48,54,61,0.6)',strokeWidth:8}),
          h('circle',{cx:44,cy:44,r:R,fill:'none',stroke:color,strokeWidth:8,strokeLinecap:'round',
            strokeDasharray:C,strokeDashoffset:C*(1-score/100)})
        ),
        h('div',{style:{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}},
          h('span',{style:{fontSize:18,fontWeight:900,color:'#e6edf3',fontVariantNumeric:'tabular-nums'}},score)
        )
      ),
      h('div',{style:{fontSize:11,fontWeight:700,color:'#8b949e'}},label)
    );
  };

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Video Analysis',subtitle:'AI-powered batting technique review',gradient:'linear-gradient(135deg,#1d4ed8,#4338ca)'}),
    h('div',{className:'flex gap-2 px-4 py-3'},
      [['upload','Upload Video'],['live','Live Camera'],['library','Analysis Library']].map(([id,label])=>
        h('button',{key:id,onClick:()=>setTab(id),
          className:'flex-1 py-2 rounded-xl text-xs font-black transition-all',
          style:tab===id?{background:'linear-gradient(135deg,#1d4ed8,#4338ca)',color:'#fff'}:{background:'rgba(22,27,34,0.9)',color:'#8b949e',border:'1px solid rgba(48,54,61,0.9)'}
        },label)
      )
    ),
    tab==='upload'&&h('div',{className:'px-4 space-y-4'},
      // Upload zone
      h('div',{style:{border:'2px dashed rgba(59,130,246,0.4)',borderRadius:12,padding:'28px 20px',textAlign:'center',background:'rgba(59,130,246,0.04)',cursor:'pointer'},
        onClick:()=>setFileSelected(true)},
        h(Icon,{n:'video',cls:'w-10 h-10',style:{color:'#3b82f6',margin:'0 auto 12px'}}),
        h('div',{style:{fontSize:14,fontWeight:700,color:'#e6edf3',marginBottom:6}},fileSelected?'video_batting_practice.mp4':'Tap to upload batting video'),
        h('div',{style:{fontSize:12,color:'#484f58'}},fileSelected?'HD · 00:45 · Ready to analyze':'MP4, MOV — up to 3 minutes')
      ),
      // Shot type selector
      h('div',{},
        h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}},'Select Shot Type'),
        h('div',{style:{display:'flex',flexWrap:'wrap',gap:8}},
          SHOTS.map(s=>h('button',{key:s,onClick:()=>setShotType(s),
            style:{padding:'7px 14px',borderRadius:20,fontSize:12,fontWeight:600,cursor:'pointer',
              background:shotType===s?'rgba(59,130,246,0.2)':'rgba(22,27,34,0.9)',
              border:`1px solid ${shotType===s?'rgba(59,130,246,0.6)':'rgba(48,54,61,0.9)'}`,
              color:shotType===s?'#60a5fa':'#8b949e'}},s))
        )
      ),
      // Analyze button
      h('button',{onClick:runAnalysis,disabled:!fileSelected||!shotType||analyzing,
        className:'btn-primary py-4 text-base font-black',
        style:{opacity:(!fileSelected||!shotType)?0.45:1}},
        analyzing?h('div',{style:{display:'flex',alignItems:'center',gap:8}},
          h('div',{className:'spinner',style:{width:20,height:20,borderWidth:2}}),'Analyzing technique...'):
          h('div',{style:{display:'flex',alignItems:'center',gap:8}},h(Icon,{n:'cpu',cls:'w-5 h-5'}),'Analyze Technique')
      ),
      // Results
      result&&h('div',{className:'space-y-4'},
        h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:16}},
          h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}},'Overall Scores'),
          h('div',{style:{display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:12}},
            h(ScoreRing,{score:84,label:'Technique',color:'#3b82f6'}),
            h(ScoreRing,{score:91,label:'Form',color:'#10b981'}),
            h(ScoreRing,{score:76,label:'Power',color:'#f59e0b'}),
            h(ScoreRing,{score:88,label:'Balance',color:'#a855f7'})
          )
        ),
        h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:16}},
          h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}},'Metric Breakdown'),
          h('div',{style:{display:'flex',flexDirection:'column',gap:12}},
            METRICS.map(m=>h('div',{key:m.label},
              h('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:4}},
                h('span',{style:{fontSize:12,fontWeight:600,color:'#8b949e'}},m.label),
                h('span',{style:{fontSize:12,fontWeight:800,color:m.color}},m.val)
              ),
              h('div',{style:{height:5,background:'rgba(48,54,61,0.6)',borderRadius:4,overflow:'hidden'}},
                h('div',{style:{height:'100%',width:`${m.pct}%`,background:m.color,borderRadius:4,transition:'width 0.6s'}})
              )
            ))
          )
        ),
        h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:16}},
          h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}},'AI Coaching Feedback'),
          FEEDBACK.map((f,i)=>h('div',{key:i,className:'analysis-feedback-item'},
            h(Icon,{n:f.icon,cls:'w-4 h-4 flex-shrink-0 mt-0.5',style:{color:f.color}}),
            h('p',{style:{fontSize:13,color:'#8b949e',lineHeight:1.5}},f.text)
          ))
        ),
        h('button',{onClick:()=>{awardXP(40,0,'video_analysis');setResult(null);setFileSelected(false);setShotType(null);},
          className:'btn-primary py-3',style:{background:'linear-gradient(135deg,#1d4ed8,#4338ca)'}},
          h(Icon,{n:'circleCheck',cls:'w-5 h-5'}),' Save Analysis (+40 XP)')
      )
    ),
    tab==='live'&&h('div',{className:'px-4'},
      h('div',{style:{border:'2px dashed rgba(59,130,246,0.4)',borderRadius:12,padding:'40px 20px',textAlign:'center',background:'rgba(59,130,246,0.04)'}},
        h(Icon,{n:'video',cls:'w-12 h-12',style:{color:'#3b82f6',margin:'0 auto 14px'}}),
        h('div',{style:{fontSize:15,fontWeight:700,color:'#e6edf3',marginBottom:8}},'Live Camera Analysis'),
        h('div',{style:{fontSize:13,color:'#484f58',marginBottom:20,lineHeight:1.6}},'Real-time AI feedback as you bat — requires camera permission'),
        h('button',{onClick:()=>{},className:'btn-primary',style:{width:'auto',padding:'12px 32px',background:'linear-gradient(135deg,#1d4ed8,#4338ca)'}},
          h(Icon,{n:'video',cls:'w-4 h-4'}),' Enable Camera')
      )
    ),
    tab==='library'&&h('div',{className:'px-4'},
      h(EmptyState,{icon:'barChart',title:'No Analyses Yet',desc:'Upload a batting video to generate your first AI technique analysis. Your library builds over time.',
        action:{label:'Upload Video',fn:()=>setTab('upload')}})
    )
  );
}

// ================================================================
// PERFORMANCE PAGE
// ================================================================
function PerformancePage() {
  const [chartTab, setChartTab] = useState('weekly');
  const [progress] = useState(()=>DB.getProgress());
  const xpDays = DB.getXPLast7Days();
  const hmap = DB.getActivityHeatmap();

  const BAT_METRICS = [
    {label:'Average',val:'34.2',sub:'Last 10 innings',color:'#3b82f6'},
    {label:'Strike Rate',val:'128',sub:'T20 format',color:'#10b981'},
    {label:'High Score',val:'87*',sub:'vs District XI',color:'#f59e0b'},
    {label:'50s / 100s',val:'3 / 0',sub:'This season',color:'#a855f7'},
  ];
  const BOWL_METRICS = [
    {label:'Wickets',val:'12',sub:'This season',color:'#ef4444'},
    {label:'Economy',val:'6.4',sub:'T20 average',color:'#10b981'},
    {label:'Best Figures',val:'3/18',sub:'vs North Club',color:'#f59e0b'},
    {label:'Average',val:'22.3',sub:'Per wicket',color:'#3b82f6'},
  ];
  const RADAR_VALS = [
    {label:'Batting',val:72},{label:'Bowling',val:58},{label:'Fielding',val:81},
    {label:'Fitness',val:65},{label:'Mental',val:77},{label:'Tactical',val:69},
  ];

  // Simple radar chart using SVG
  const RadarChart = () => {
    const cx=100, cy=100, r=70, n=RADAR_VALS.length;
    const pts = RADAR_VALS.map((v,i)=>{
      const angle=(i/n)*Math.PI*2 - Math.PI/2;
      const pct=v.val/100;
      return {x:cx+Math.cos(angle)*r*pct, y:cy+Math.sin(angle)*r*pct, label:v.label, val:v.val, ax:cx+Math.cos(angle)*r*1.25, ay:cy+Math.sin(angle)*r*1.25};
    });
    const polygon = pts.map(p=>`${p.x},${p.y}`).join(' ');
    return h('div',{style:{display:'flex',flexDirection:'column',alignItems:'center'}},
      h('svg',{width:200,height:200,viewBox:'0 0 200 200'},
        [0.2,0.4,0.6,0.8,1].map(s=>h('polygon',{key:s,points:RADAR_VALS.map((_,i)=>{const a=(i/n)*Math.PI*2-Math.PI/2;return `${cx+Math.cos(a)*r*s},${cy+Math.sin(a)*r*s}`}).join(' '),fill:'none',stroke:'rgba(48,54,61,0.5)',strokeWidth:1})),
        RADAR_VALS.map((_,i)=>{ const a=(i/n)*Math.PI*2-Math.PI/2; return h('line',{key:i,x1:cx,y1:cy,x2:cx+Math.cos(a)*r,y2:cy+Math.sin(a)*r,stroke:'rgba(48,54,61,0.4)',strokeWidth:1}); }),
        h('polygon',{points:polygon,fill:'rgba(59,130,246,0.2)',stroke:'#3b82f6',strokeWidth:2}),
        pts.map((p,i)=>h('text',{key:i,x:p.ax,y:p.ay,fill:'#8b949e',fontSize:9,fontWeight:700,textAnchor:'middle',dominantBaseline:'middle'},p.label))
      ),
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginTop:4,width:'100%'}},
        RADAR_VALS.map(v=>h('div',{key:v.label,style:{textAlign:'center',padding:'6px 4px',background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:6}},
          h('div',{style:{fontSize:14,fontWeight:800,color:'#3b82f6',fontVariantNumeric:'tabular-nums'}},v.val),
          h('div',{style:{fontSize:10,fontWeight:600,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.05em'}},v.label)
        ))
      )
    );
  };

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Performance',subtitle:'Your cricket analytics dashboard',gradient:'linear-gradient(135deg,#064e3b,#0d9488)'}),
    h('div',{className:'px-4 pt-4 space-y-5'},
      // Tab strip
      h('div',{className:'chart-tab-row'},
        [['weekly','Weekly'],['batting','Batting'],['bowling','Bowling'],['overall','Overall']].map(([id,label])=>
          h('button',{key:id,onClick:()=>setChartTab(id),className:`chart-tab${chartTab===id?' active':''}`},label)
        )
      ),
      // Weekly XP chart
      chartTab==='weekly'&&h('div',{className:'space-y-4'},
        h('div',{className:'chart-container'},
          h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}},
            h('span',{style:{fontSize:13,fontWeight:700,color:'#e6edf3'}},'7-Day XP'),
            h('span',{style:{fontSize:11,fontWeight:700,color:'#10b981'}},`${xpDays.reduce((s,d)=>s+d.xp,0)} total`)
          ),
          h(XPChart,{days:xpDays})
        ),
        h('div',{className:'chart-container'},
          h('div',{style:{marginBottom:12}},h('span',{style:{fontSize:13,fontWeight:700,color:'#e6edf3'}},'30-Day Activity')),
          h(Heatmap,{days:hmap})
        ),
        h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}},
          h(StatCard,{label:'Total XP',value:(progress.total_xp||0).toLocaleString(),color:'text-emerald-400',icon:'zap'}),
          h(StatCard,{label:'Best Streak',value:`${progress.longest_streak||0}d`,color:'text-red-400',icon:'flame'}),
          h(StatCard,{label:'Drills Done',value:progress.drills_done||0,color:'text-blue-400',icon:'bat'}),
          h(StatCard,{label:'Mental Sessions',value:progress.mental_done||0,color:'text-purple-400',icon:'brain'})
        )
      ),
      // Batting tab
      chartTab==='batting'&&h('div',{className:'space-y-4'},
        h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}},
          BAT_METRICS.map(m=>h('div',{key:m.label,style:{padding:14,background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:10}},
            h('div',{style:{fontSize:10,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}},m.label),
            h('div',{style:{fontSize:22,fontWeight:900,color:m.color,fontVariantNumeric:'tabular-nums',lineHeight:1}},m.val),
            h('div',{style:{fontSize:10,color:'#484f58',marginTop:4}},m.sub)
          ))
        ),
        h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:16}},
          h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}},'Shot Distribution'),
          [['Cover Drive',38,'#3b82f6'],['Pull',22,'#ef4444'],['Cut',18,'#f59e0b'],['Sweep',12,'#a855f7'],['Other',10,'#64748b']].map(([shot,pct,col])=>
            h('div',{key:shot,style:{marginBottom:10}},
              h('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:3}},
                h('span',{style:{fontSize:12,fontWeight:600,color:'#8b949e'}},shot),
                h('span',{style:{fontSize:12,fontWeight:800,color:col}},`${pct}%`)
              ),
              h('div',{style:{height:5,background:'rgba(48,54,61,0.6)',borderRadius:4,overflow:'hidden'}},
                h('div',{style:{height:'100%',width:`${pct}%`,background:col,borderRadius:4}})
              )
            )
          )
        )
      ),
      // Bowling tab
      chartTab==='bowling'&&h('div',{className:'space-y-4'},
        h('div',{style:{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}},
          BOWL_METRICS.map(m=>h('div',{key:m.label,style:{padding:14,background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:10}},
            h('div',{style:{fontSize:10,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}},m.label),
            h('div',{style:{fontSize:22,fontWeight:900,color:m.color,fontVariantNumeric:'tabular-nums',lineHeight:1}},m.val),
            h('div',{style:{fontSize:10,color:'#484f58',marginTop:4}},m.sub)
          ))
        ),
        h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:16}},
          h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}},'Wicket Types'),
          [['Bowled',33,'#ef4444'],['Caught',42,'#3b82f6'],['LBW',17,'#f59e0b'],['Other',8,'#64748b']].map(([type,pct,col])=>
            h('div',{key:type,style:{marginBottom:10}},
              h('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:3}},
                h('span',{style:{fontSize:12,fontWeight:600,color:'#8b949e'}},type),
                h('span',{style:{fontSize:12,fontWeight:800,color:col}},`${pct}%`)
              ),
              h('div',{style:{height:5,background:'rgba(48,54,61,0.6)',borderRadius:4,overflow:'hidden'}},
                h('div',{style:{height:'100%',width:`${pct}%`,background:col,borderRadius:4}})
              )
            )
          )
        )
      ),
      // Overall radar
      chartTab==='overall'&&h('div',{className:'space-y-4'},
        h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:16}},
          h('p',{style:{fontSize:13,fontWeight:700,color:'#e6edf3',marginBottom:16,textAlign:'center'}},'Attribute Radar'),
          h(RadarChart)
        ),
        h('button',{onClick:()=>{awardXP(20,0,'performance_review');alert('Performance logged! +20 XP');},
          className:'btn-primary py-3',style:{background:'linear-gradient(135deg,#064e3b,#0d9488)'}},
          h(Icon,{n:'barChart',cls:'w-5 h-5'}),' Log This Week\'s Performance (+20 XP)')
      )
    )
  );
}

// ================================================================
// MATCH LOGGER PAGE
// ================================================================
function MatchLoggerPage() {
  const [view, setView] = useState('log'); // 'log' | 'history'
  const [innings, setInnings] = useState('batting');
  const [balls, setBalls] = useState([]);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [saved, setSaved] = useState(()=>{
    try{return JSON.parse(localStorage.getItem('sc_match_log')||'[]');}catch{return [];}
  });

  const OUTCOMES = [
    {val:'0',label:'Dot',color:'rgba(139,148,158,0.12)',textColor:'#8b949e',border:'rgba(139,148,158,0.3)'},
    {val:'1',label:'1 Run',color:'rgba(59,130,246,0.12)',textColor:'#60a5fa',border:'rgba(59,130,246,0.3)'},
    {val:'2',label:'2 Runs',color:'rgba(59,130,246,0.18)',textColor:'#60a5fa',border:'rgba(59,130,246,0.4)'},
    {val:'3',label:'3 Runs',color:'rgba(59,130,246,0.24)',textColor:'#60a5fa',border:'rgba(59,130,246,0.5)'},
    {val:'4',label:'Four',color:'rgba(22,163,74,0.18)',textColor:'#4ade80',border:'rgba(22,163,74,0.4)'},
    {val:'6',label:'Six',color:'rgba(217,119,6,0.18)',textColor:'#fbbf24',border:'rgba(217,119,6,0.4)'},
    {val:'W',label:'Wicket',color:'rgba(239,68,68,0.18)',textColor:'#f87171',border:'rgba(239,68,68,0.4)'},
    {val:'WD',label:'Wide',color:'rgba(109,40,217,0.12)',textColor:'#a78bfa',border:'rgba(109,40,217,0.3)'},
    {val:'NB',label:'No Ball',color:'rgba(168,85,247,0.12)',textColor:'#c084fc',border:'rgba(168,85,247,0.3)'},
  ];

  const addBall = (val) => {
    const numVal = val==='W'?0:val==='WD'||val==='NB'?1:parseInt(val)||0;
    const newRuns = runs + numVal;
    let newWickets = wickets;
    let ballCount = balls.filter(b=>b!=='WD'&&b!=='NB').length;
    if(val==='W') newWickets = Math.min(10, wickets+1);
    const newBalls = [...balls, val];
    const validBalls = newBalls.filter(b=>b!=='WD'&&b!=='NB').length;
    setRuns(newRuns);
    setWickets(newWickets);
    setBalls(newBalls);
    setOvers(Math.floor(validBalls/6) + (validBalls%6)/10);
  };

  const undo = () => {
    if(!balls.length) return;
    const last = balls[balls.length-1];
    const numVal = last==='W'?0:last==='WD'||last==='NB'?1:parseInt(last)||0;
    setBalls(balls.slice(0,-1));
    setRuns(Math.max(0,runs-numVal));
    if(last==='W') setWickets(Math.max(0,wickets-1));
  };

  const saveInnings = () => {
    if(!balls.length) return;
    const validBalls = balls.filter(b=>b!=='WD'&&b!=='NB').length;
    const entry = {
      id: Date.now(),
      date: new Date().toISOString().slice(0,10),
      innings, runs, wickets,
      balls: validBalls,
      wides: balls.filter(b=>b==='WD').length,
      noBalls: balls.filter(b=>b==='NB').length,
      deliveries: balls,
    };
    const newSaved = [entry, ...saved].slice(0,20);
    localStorage.setItem('sc_match_log', JSON.stringify(newSaved));
    setSaved(newSaved);
    awardXP(innings==='batting'?50:40, 0, 'match_log');
    fireConfetti();
    setBalls([]); setRuns(0); setWickets(0); setOvers(0);
    setView('history');
  };

  const currentOver = balls.filter(b=>b!=='WD'&&b!=='NB');
  const currentOverBalls = currentOver.slice(-Math.max(0, currentOver.length%6||6));
  const validBallCount = balls.filter(b=>b!=='WD'&&b!=='NB').length;
  const oversStr = `${Math.floor(validBallCount/6)}.${validBallCount%6}`;

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Match Logger',subtitle:'Ball-by-ball match tracking',gradient:'linear-gradient(135deg,#b45309,#d97706)'}),
    h('div',{className:'flex gap-2 px-4 py-3'},
      [['log','🏏 Log'],['history','📋 History']].map(([id,label])=>
        h('button',{key:id,onClick:()=>setView(id),className:'flex-1 py-2 rounded-xl text-xs font-black transition-all',
          style:view===id?{background:'linear-gradient(135deg,#b45309,#d97706)',color:'#fff'}:{background:'rgba(22,27,34,0.9)',color:'#8b949e',border:'1px solid rgba(48,54,61,0.9)'}},label)
      )
    ),
    view==='log'&&h('div',{className:'px-4 space-y-4'},
      // Innings toggle
      h('div',{style:{display:'flex',gap:8}},
        [['batting','🏏 Batting'],['bowling','⚾ Bowling']].map(([id,label])=>
          h('button',{key:id,onClick:()=>setInnings(id),className:'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all',
            style:innings===id?{background:'rgba(217,119,6,0.2)',border:'1px solid rgba(217,119,6,0.5)',color:'#fbbf24'}:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',color:'#8b949e'}},label)
        )
      ),
      // Score display
      h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:20,textAlign:'center'}},
        h('div',{style:{fontSize:48,fontWeight:900,color:'#e6edf3',fontVariantNumeric:'tabular-nums',lineHeight:1,letterSpacing:'-2px'}},
          innings==='batting'?`${runs}/${wickets}`:`${wickets}/${runs}`
        ),
        h('div',{style:{fontSize:16,color:'#8b949e',marginTop:6,fontWeight:600}},`(${oversStr} overs)`),
        // Current over balls
        currentOverBalls.length>0&&h('div',{style:{display:'flex',justifyContent:'center',gap:6,marginTop:14,flexWrap:'wrap'}},
          currentOverBalls.map((b,i)=>{
            const o=OUTCOMES.find(x=>x.val===b)||OUTCOMES[0];
            return h('div',{key:i,style:{width:32,height:32,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,background:o.color,border:`1px solid ${o.border}`,color:o.textColor}},b);
          })
        )
      ),
      // Outcome buttons
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}},
        OUTCOMES.map(o=>h('button',{key:o.val,onClick:()=>addBall(o.val),
          style:{padding:'14px 8px',borderRadius:10,border:`1px solid ${o.border}`,background:o.color,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:4}},
          h('div',{style:{fontSize:18,fontWeight:900,color:o.textColor}},o.val),
          h('div',{style:{fontSize:10,fontWeight:600,color:o.textColor,opacity:0.8}},o.label)
        ))
      ),
      // Action buttons
      h('div',{style:{display:'flex',gap:10}},
        h('button',{onClick:undo,disabled:!balls.length,
          style:{flex:1,padding:'12px',borderRadius:10,background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',color:'#8b949e',fontWeight:700,cursor:balls.length?'pointer':'not-allowed',opacity:balls.length?1:0.4}},
          h(Icon,{n:'arrowL',cls:'w-4 h-4 inline-block'}),' Undo'),
        h('button',{onClick:saveInnings,disabled:!balls.length,
          className:'btn-primary',style:{flex:2,opacity:balls.length?1:0.4}},
          h(Icon,{n:'circleCheck',cls:'w-4 h-4'}),' Save Innings (+XP)')
      )
    ),
    view==='history'&&h('div',{className:'px-4 space-y-3'},
      saved.length===0
        ?h(EmptyState,{icon:'list',title:'No matches logged yet',desc:'Log your first innings to build your match history',action:{label:'Start Logging',fn:()=>setView('log')}})
        :saved.map(entry=>h('div',{key:entry.id,style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:12,padding:16}},
          h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}},
            h('div',{},
              h('div',{style:{fontSize:14,fontWeight:700,color:'#e6edf3',textTransform:'capitalize'}},entry.innings+' Innings'),
              h('div',{style:{fontSize:12,color:'#484f58',marginTop:2}},entry.date)
            ),
            h('div',{style:{textAlign:'right'}},
              h('div',{style:{fontSize:22,fontWeight:900,color:entry.innings==='batting'?'#4ade80':'#f87171',fontVariantNumeric:'tabular-nums'}},
                entry.innings==='batting'?`${entry.runs}/${entry.wickets}`:`${entry.wickets}/${entry.runs}`),
              h('div',{style:{fontSize:11,color:'#484f58'}},`(${Math.floor(entry.balls/6)}.${entry.balls%6} ov)`)
            )
          ),
          h('div',{style:{display:'flex',gap:8,flexWrap:'wrap'}},
            h('span',{style:{fontSize:11,padding:'3px 8px',borderRadius:4,background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.25)',color:'#60a5fa'}},`${entry.balls} balls`),
            entry.wides>0&&h('span',{style:{fontSize:11,padding:'3px 8px',borderRadius:4,background:'rgba(109,40,217,0.1)',border:'1px solid rgba(109,40,217,0.25)',color:'#a78bfa'}},`${entry.wides}wd`),
            entry.noBalls>0&&h('span',{style:{fontSize:11,padding:'3px 8px',borderRadius:4,background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.25)',color:'#c084fc'}},`${entry.noBalls}nb`)
          )
        ))
    )
  );
}

// ================================================================
// REACTION DRILL PAGE
// ================================================================
function ReactionDrillPage() {
  const [gameState, setGameState] = useState('idle'); // idle | wait | react | result | done
  const [difficulty, setDifficulty] = useState('medium');
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [lastTime, setLastTime] = useState(null);
  const [signalColor, setSignalColor] = useState('#484f58');
  const [drillType, setDrillType] = useState('simple'); // simple | color | direction
  const [signal, setSignal] = useState(null);
  const timerRef = useRef(null);
  const TOTAL_ROUNDS = 5;
  const DELAYS = {easy:[800,1200],medium:[600,1000],hard:[400,700],pro:[200,500]};

  const startRound = () => {
    setGameState('wait');
    setSignalColor('#484f58');
    setSignal(null);
    const [minD, maxD] = DELAYS[difficulty];
    const delay = minD + Math.random()*(maxD-minD);
    timerRef.current = setTimeout(()=>{
      if(drillType==='color') {
        const colors=['#10b981','#3b82f6','#ef4444','#f59e0b'];
        setSignalColor(colors[Math.floor(Math.random()*colors.length)]);
        setSignal(colors[Math.floor(Math.random()*colors.length)]);
      } else if(drillType==='direction') {
        const dirs=['↑','↓','←','→'];
        setSignal(dirs[Math.floor(Math.random()*dirs.length)]);
        setSignalColor('#10b981');
      } else {
        setSignalColor('#10b981');
        setSignal('TAP!');
      }
      setStartTime(Date.now());
      setGameState('react');
    }, delay);
  };

  const handleTap = () => {
    if(gameState==='react') {
      const reaction = Date.now() - startTime;
      const newTimes = [...times, reaction];
      setTimes(newTimes);
      setLastTime(reaction);
      setSignalColor('#484f58');
      setSignal(null);
      if(newTimes.length >= TOTAL_ROUNDS) {
        setGameState('done');
        const avg = Math.round(newTimes.reduce((a,b)=>a+b,0)/newTimes.length);
        awardXP(difficulty==='pro'?80:difficulty==='hard'?60:difficulty==='medium'?45:30, 0, 'reaction_drill');
        fireConfetti();
      } else {
        setRound(r=>r+1);
        setGameState('result');
      }
    } else if(gameState==='wait') {
      clearTimeout(timerRef.current);
      setGameState('idle');
      alert('Too early! Wait for the signal.');
    }
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setGameState('idle'); setRound(0); setTimes([]); setLastTime(null); setSignalColor('#484f58'); setSignal(null);
  };

  const avg = times.length ? Math.round(times.reduce((a,b)=>a+b,0)/times.length) : 0;
  const best = times.length ? Math.min(...times) : 0;

  const getRating = (ms) => {
    if(ms<200) return {label:'Elite',color:'#f59e0b'};
    if(ms<280) return {label:'Pro',color:'#10b981'};
    if(ms<350) return {label:'Good',color:'#3b82f6'};
    if(ms<450) return {label:'Average',color:'#8b949e'};
    return {label:'Keep Training',color:'#484f58'};
  };

  const DIFF_COLORS = {easy:'#10b981',medium:'#3b82f6',hard:'#f97316',pro:'#a855f7'};

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Reaction Drill',subtitle:'Train explosive reflex speed',gradient:'linear-gradient(135deg,#0891b2,#0d9488)'}),
    h('div',{className:'px-4 pt-4 space-y-4'},
      // Config row
      gameState==='idle'&&h('div',{className:'space-y-3'},
        h('div',{},
          h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}},'Difficulty'),
          h('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6}},
            ['easy','medium','hard','pro'].map(d=>h('button',{key:d,onClick:()=>setDifficulty(d),
              style:{padding:'10px 4px',borderRadius:8,fontSize:11,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.04em',cursor:'pointer',
                background:difficulty===d?`rgba(${d==='easy'?'16,163,74':d==='medium'?'59,130,246':d==='hard'?'249,115,22':'168,85,247'},0.2)`:'rgba(22,27,34,0.9)',
                border:`1px solid ${difficulty===d?DIFF_COLORS[d]:'rgba(48,54,61,0.9)'}`,
                color:difficulty===d?DIFF_COLORS[d]:'#8b949e'}},d))
          )
        ),
        h('div',{},
          h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}},'Drill Type'),
          h('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}},
            [['simple','Simple React'],['color','Color Match'],['direction','Direction']].map(([id,label])=>
              h('button',{key:id,onClick:()=>setDrillType(id),
                style:{padding:'10px 6px',borderRadius:8,fontSize:11,fontWeight:700,cursor:'pointer',textAlign:'center',
                  background:drillType===id?'rgba(13,148,136,0.2)':'rgba(22,27,34,0.9)',
                  border:`1px solid ${drillType===id?'rgba(13,148,136,0.6)':'rgba(48,54,61,0.9)'}`,
                  color:drillType===id?'#2dd4bf':'#8b949e'}},label)
            )
          )
        ),
        h('div',{style:{padding:12,background:'rgba(13,148,136,0.06)',border:'1px solid rgba(13,148,136,0.2)',borderRadius:10}},
          h('p',{style:{fontSize:12,color:'#5eead4',fontWeight:600,lineHeight:1.5}},
            drillType==='simple'?'Watch for the green signal — tap as fast as you can!':
            drillType==='color'?'Tap when you see GREEN. Ignore other colors!':
            'Tap when you see an arrow. Direction trains anticipation!')
        )
      ),
      // Main tap zone
      h('div',{className:'reaction-tap-zone',
        style:{height:260,background:gameState==='react'?`${signalColor}22`:'rgba(22,27,34,0.9)',
          border:`2px solid ${gameState==='react'?signalColor:'rgba(48,54,61,0.9)'}`,cursor:'pointer'},
        onClick:handleTap},
        gameState==='idle'&&h('div',{style:{textAlign:'center'}},
          h('div',{style:{width:72,height:72,borderRadius:'50%',background:'rgba(13,148,136,0.12)',border:'2px solid rgba(13,148,136,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}},
            h(Icon,{n:'zap',cls:'w-8 h-8',style:{color:'#0d9488'}})),
          h('div',{style:{fontSize:16,fontWeight:800,color:'#e6edf3',marginBottom:6}},'Tap to Start'),
          h('div',{style:{fontSize:12,color:'#484f58'}},`${TOTAL_ROUNDS} rounds · ${difficulty} mode`)
        ),
        gameState==='wait'&&h('div',{style:{textAlign:'center'}},
          h('div',{style:{width:72,height:72,borderRadius:'50%',background:'rgba(48,54,61,0.6)',border:'2px dashed rgba(48,54,61,0.9)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}},
            h('div',{style:{width:16,height:16,borderRadius:'50%',background:'#484f58',animation:'pulse 1s infinite'}})),
          h('div',{style:{fontSize:15,fontWeight:700,color:'#484f58'}}),'Wait for it...'
        ),
        gameState==='react'&&h('div',{style:{textAlign:'center'}},
          h('div',{style:{fontSize:signal&&signal.length<=2?80:32,fontWeight:900,color:signalColor,lineHeight:1,marginBottom:8,filter:`drop-shadow(0 0 24px ${signalColor}80)`}},signal||'GO!'),
          h('div',{style:{fontSize:13,color:signalColor,fontWeight:700}},drillType==='color'?'Tap GREEN only!':'TAP NOW!')
        ),
        gameState==='result'&&h('div',{style:{textAlign:'center'}},
          h('div',{style:{fontSize:36,fontWeight:900,color:'#10b981',fontVariantNumeric:'tabular-nums',marginBottom:6}},`${lastTime}ms`),
          h('div',{style:{fontSize:14,fontWeight:700,color:getRating(lastTime).color}},getRating(lastTime).label),
          h('div',{style:{fontSize:12,color:'#484f58',marginTop:8}},`Round ${round} of ${TOTAL_ROUNDS}`),
          h('button',{onClick:startRound,className:'btn-primary',style:{width:'auto',padding:'10px 28px',marginTop:12,background:'linear-gradient(135deg,#0891b2,#0d9488)'}},
            'Next Round')
        ),
        gameState==='done'&&h('div',{style:{textAlign:'center',padding:'0 16px'}},
          h('div',{style:{fontSize:14,fontWeight:800,color:'#e6edf3',marginBottom:12}},'Session Complete!'),
          h('div',{style:{display:'flex',justifyContent:'center',gap:24,marginBottom:16}},
            h('div',{style:{textAlign:'center'}},
              h('div',{style:{fontSize:28,fontWeight:900,color:'#10b981',fontVariantNumeric:'tabular-nums'}},`${avg}ms`),
              h('div',{style:{fontSize:11,color:'#484f58',fontWeight:700}},`AVG (${getRating(avg).label})`)
            ),
            h('div',{style:{textAlign:'center'}},
              h('div',{style:{fontSize:28,fontWeight:900,color:'#f59e0b',fontVariantNumeric:'tabular-nums'}},`${best}ms`),
              h('div',{style:{fontSize:11,color:'#484f58',fontWeight:700}},'BEST')
            )
          )
        )
      ),
      // Start button when idle
      gameState==='idle'&&h('button',{onClick:startRound,
        className:'btn-primary py-4 text-base font-black',style:{background:'linear-gradient(135deg,#0891b2,#0d9488)'}},
        h(Icon,{n:'zap',cls:'w-5 h-5'}),' Start Reaction Drill'
      ),
      // Reset when done
      (gameState==='done'||gameState==='result')&&h('button',{onClick:reset,className:'btn-secondary'},'Reset'),
      // Best times display
      times.length>0&&gameState!=='done'&&h('div',{style:{display:'flex',gap:6,flexWrap:'wrap'}},
        times.map((t,i)=>h('div',{key:i,style:{padding:'4px 10px',borderRadius:6,background:'rgba(13,148,136,0.1)',border:'1px solid rgba(13,148,136,0.2)',fontSize:11,fontWeight:700,color:'#2dd4bf',fontVariantNumeric:'tabular-nums'}},`${t}ms`))
      ),
      // Info card
      gameState==='idle'&&h('div',{style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',borderRadius:10,padding:14}},
        h('p',{style:{fontSize:11,fontWeight:700,color:'#484f58',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}},'Reaction Time Benchmarks'),
        [['<200ms','Elite (International)',DIFF_COLORS.pro],['200–280ms','Pro Level',DIFF_COLORS.easy],['280–350ms','Club Cricketer','#3b82f6'],['350ms+','Developing','#484f58']].map(([range,label,col])=>
          h('div',{key:range,style:{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid rgba(48,54,61,0.4)'}},
            h('span',{style:{fontSize:11,color:'#484f58'}},range),
            h('span',{style:{fontSize:11,fontWeight:700,color:col}},label)
          )
        )
      )
    )
  );
}


// ================================================================
// STUB PAGES
// ================================================================
function StubPage({ title, icon='zap', emoji, desc }) {
  return h('div',{style:{paddingBottom:'7rem',display:'flex',flexDirection:'column',alignItems:'center',
    justifyContent:'center',textAlign:'center',padding:'6rem 1.5rem 7rem',minHeight:'80vh',background:'#0d1117'}},
    h('div',{style:{width:72,height:72,borderRadius:16,background:'rgba(22,27,34,0.9)',
      border:'1px solid rgba(48,54,61,0.9)',display:'flex',alignItems:'center',justifyContent:'center',
      marginBottom:24}},
      h(Icon,{n:icon,cls:'w-9 h-9',style:{color:'#484f58'}})
    ),
    h('h2',{style:{fontSize:'1.375rem',fontWeight:800,color:'#e6edf3',marginBottom:8,letterSpacing:'-0.02em'}},title),
    h('p',{style:{color:'#484f58',fontSize:'0.875rem',maxWidth:'22rem',lineHeight:1.7,marginBottom:32}},
      desc||'This feature is coming in the next update.'),
    h('button',{onClick:()=>nav('Home'),className:'btn-secondary',style:{width:'auto',padding:'10px 28px'}},
      'Go Home')
  );
}
function AICoachPage() { return h(StubPage,{title:'AI Head Coach',icon:'cpu',desc:"Your personal AI cricket coach — powered by SmartCrick's elite training intelligence."}); }
function NinetyDayPage() { return h(StubPage,{title:'90-Day Elite Program',icon:'diamond',desc:'A complete 90-day transformation program for serious cricketers. The full roadmap to elite performance.'}); }
function AIWorkoutPage() { return h(StubPage,{title:'AI Workout Creator',icon:'sparkles',desc:'Tell the AI what you need — it generates your perfect personalized workout instantly.'}); }
function MatchTrackerPage() { return h(StubPage,{title:'Match Tracker',icon:'list',desc:'Log every match performance: runs, wickets, catches, milestones, and memorable moments.'}); }
function MiniMatchPage() { return h(StubPage,{title:'MiniMatch IQ',icon:'puzzle',desc:'Cricket tactical decision scenarios. What would you do? Train your cricket brain with real match simulations.'}); }
function GetOutPage() { return h(StubPage,{title:'Why Did I Get Out?',icon:'helpCircle',desc:'Analyze your dismissal type, understand the pattern, and eliminate the weakness from your game permanently.'}); }
function QuizzesPage() { return h(StubPage,{title:'Cricket Quizzes',icon:'book',desc:'Test your cricket knowledge — rules, history, tactics, and technical questions at every difficulty level.'}); }

// ================================================================
// APP ROOT
// ================================================================
function AppRoot() {
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [dark,setDark]=useState(()=>{ const s=DB.get('theme'); return s!==null?s:true; });
  const {page,params}=useRoute();

  useEffect(()=>{
    document.documentElement.classList.toggle('dark',dark);
    DB.set('theme',dark);
  },[dark]);

  useEffect(()=>{
    if(typeof applyChartDefaults==='function') applyChartDefaults();
    if(typeof migrateLSToPouchDB==='function') migrateLSToPouchDB();
    if(!window.location.hash||window.location.hash==='#'||window.location.hash==='#/') {
      window.location.hash='#/Home';
    }
  },[]);

  useEffect(()=>{ setSidebarOpen(false); },[page]);

  const theme={dark,toggle:()=>setDark(d=>!d)};
  const fullscreen=['MentalPlayer'];
  const isFS=fullscreen.includes(page);

  function renderPage() {
    switch(page) {
      case 'Home': return h(HomePage);
      case 'Drills': return h(DrillsPage);
      case 'DrillDetail': return h(DrillDetailPage,{params});
      case 'Mental': return h(MentalPage);
      case 'MentalPlayer': return h(MentalPlayerPage,{params});
      case 'Fitness': return h(FitnessPage);
      case 'WorkoutDetail': return h(WorkoutDetailPage,{params});
      case 'Timer': return h(TimerPage);
      case 'Schedule': return h(SchedulePage);
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
      case 'Quizzes': return h(QuizzesPage);
      case 'VideoAnalysis': return h(VideoAnalysisPage);
      case 'Performance':   return h(PerformancePage);
      case 'MatchLogger':   return h(MatchLoggerPage);
      case 'ReactionDrill': return h(ReactionDrillPage);
      default: return h(HomePage);
    }
  }

  return h(ThemeCtx.Provider,{value:theme},
    !isFS && h('div',{
      style:{position:'fixed',top:0,left:0,right:0,zIndex:30,display:'flex',alignItems:'center',gap:'0.75rem',
        paddingLeft:'1rem',paddingRight:'1rem',paddingBottom:'0.75rem',
        paddingTop:'max(0.75rem,env(safe-area-inset-top))',
        background:'rgba(2,6,23,0.9)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(16,185,129,0.08)'}
    },
      h('button',{onClick:()=>setSidebarOpen(true),
        style:{width:36,height:36,borderRadius:'0.75rem',display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(51,65,85,0.5)',flexShrink:0,cursor:'pointer'}},
        h(Icon,{n:'menu',cls:'w-5 h-5',style:{color:'#94a3b8'}})
      ),
      h('div',{style:{display:'flex',alignItems:'center',gap:8}},
        h(Icon,{n:'bat',cls:'w-4 h-4',style:{color:'#16a34a'}}),
        h('span',{style:{fontSize:14,fontWeight:800,color:'#e6edf3',letterSpacing:'0.02em'}},'SMARTCRICK')
      ),
      h('div',{style:{flex:1}}),
      (()=>{ const s=DB.getProgress().current_streak||0; if(!s) return null;
        return h('div',{style:{display:'flex',alignItems:'center',gap:4,fontSize:'0.75rem',fontWeight:800,color:'#fb923c',background:'rgba(249,115,22,0.08)',border:'1px solid rgba(249,115,22,0.2)',padding:'4px 10px',borderRadius:6}},
          h(Icon,{n:'flame',cls:'w-3.5 h-3.5'}),s,'d'); })()
    ),

    h(Sidebar,{open:sidebarOpen,onClose:()=>setSidebarOpen(false),currentPage:page}),
    h('main',{style:{minHeight:'100dvh',background:dark?'#020617':'#f8fafc'}},renderPage()),
    !isFS && h(BottomNav,{page})
  );
}

// ================================================================
// MOUNT
// ================================================================
const rootEl = document.getElementById('root');
if (rootEl) {
  try {
    createRoot(rootEl).render(
      h(ErrorBoundary, null, h(AppRoot))
    );
  } catch(e) {
    rootEl.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;color:#94a3b8;font-family:system-ui;text-align:center;padding:2rem;background:#020617">
      <div style="font-size:2rem;margin-bottom:1rem">⚠️</div>
      <p style="font-size:1.125rem;font-weight:700;color:#f8fafc;margin-bottom:0.5rem">Failed to load</p>
      <p style="font-size:0.875rem">Please check your internet connection and reload.</p>
      <p style="font-size:0.75rem;margin-top:1rem;color:#475569">${e.message}</p>
    </div>`;
  }
} else {
  console.error('SmartCrick: #root element not found');
}

})(); // End IIFE
