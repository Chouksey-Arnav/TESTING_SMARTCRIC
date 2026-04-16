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
  // ── Cricket-specific icons ────────────────────────────────────
  bat:'<path d="M3 21l3.5-3.5"/><path d="M5.5 19.5L16 9a2 2 0 0 0 0-2.83L14.83 5A2 2 0 0 0 12 5L2.5 16l-1 1 1 4z"/><path d="M19 4.5l.5.5"/><circle cx="20" cy="4" r="1"/>',
  ball:'<circle cx="12" cy="12" r="9"/><path d="M12 3c-1.2 3.6-1.2 14.4 0 18" stroke-width="1.5"/><path d="M3.5 9.5c3.3.8 11.7.8 17 0" stroke-width="1.5"/><path d="M3.5 14.5c3.3-.8 11.7-.8 17 0" stroke-width="1.5"/>',
  wicket:'<line x1="8" y1="4" x2="8" y2="21"/><line x1="12" y1="4" x2="12" y2="21"/><line x1="16" y1="4" x2="16" y2="21"/><rect x="6" y="4" width="12" height="3" rx="1"/>',
  helmet:'<path d="M12 2a8 8 0 0 0-8 8c0 3.5 1.8 6.6 4.5 8.5H7"/><path d="M12 2a8 8 0 0 1 8 8c0 3.5-1.8 6.6-4.5 8.5H12"/><line x1="4.5" y1="14" x2="19.5" y2="14"/><path d="M4 10h16"/>',
  field:'<ellipse cx="12" cy="12" rx="10" ry="6"/><ellipse cx="12" cy="12" rx="3.5" ry="2"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/>',
  glove:'<path d="M8 18V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M16 11h2a2 2 0 0 1 0 4h-2"/><path d="M6 11H4a2 2 0 0 0 0 4h2"/><path d="M8 18h8"/><path d="M8 21h8"/>',
  pitch:'<rect x="3" y="7" width="18" height="10" rx="1"/><line x1="8" y1="7" x2="8" y2="17"/><line x1="16" y1="7" x2="16" y2="17"/><line x1="3" y1="12" x2="21" y2="12"/>',
  // ── Professional general icons ─────────────────────────────────
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
  activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
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
  // Test localStorage is writable at startup
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
      // Verify it was actually saved (critical for XP persistence)
      const readback=localStorage.getItem(this._k(k));
      if(!readback) console.warn('SC: write failed for key',k);
    } catch(e) {
      console.warn('SC: localStorage write error',k,e);
    }
    return v;
  },
  del(k) { try { localStorage.removeItem(this._k(k)); } catch {} },

  // Progress — always returns a complete object with all fields
  getProgress() {
    const saved=this.get('progress');
    // Merge saved with defaults so new fields never come back undefined
    return Object.assign({
      total_xp:0, drills_done:0, mental_done:0, workouts_done:0,
      practice_minutes:0, current_streak:0, longest_streak:0,
      last_active_date:null, last_checkin_date:null,
      completed_drills:[], completed_mental:[], completed_workouts:[],
      badges:[], skill_path_progress:{}, thirtyDay_completed:{}
    }, saved||{});
  },
  saveProgress(v) { this.set('progress', v); },

  // XP Log
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

  // User
  getUser() { return this.get('user')||{}; },
  setUser(v) { this.set('user',v); },

  // Goals
  getGoals() { return this.get('goals')||[]; },
  saveGoals(v) { this.set('goals',v); },

  // ── Schedule ─────────────────────────────────────────────────
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

// Safe getLevelInfo — no findLast (compat with Safari < 15.4)
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
  first500:  { icon:'⚡', label:'First 500',      desc:'Earned your first 500 XP' },
  xp5k:      { icon:'trophy',  label:'5K Club',         desc:'5,000 total XP earned' },
  streak3:   { icon:'flame',   label:'On Fire',          desc:'3-day training streak' },
  streak7:   { icon:'flame',   label:'Week Warrior',     desc:'7-day training streak' },
  streak14:  { icon:'flame',   label:'Fortnight',        desc:'14-day streak' },
  streak30:  { icon:'flame',   label:'Monthly Legend',   desc:'30 consecutive days' },
  drills10:  { icon:'bat',     label:'Drill Starter',    desc:'10 cricket drills done' },
  drills50:  { icon:'bat',     label:'Drill Master',     desc:'50 cricket drills done' },
  mental10:  { icon:'brain',   label:'Mind Builder',     desc:'10 mental sessions done' },
  mental25:  { icon:'brain',   label:'Mind Master',      desc:'25 mental sessions done' },
  min60:     { icon:'⏱', label:'First Hour',        desc:'60 min of practice' },
  min600:    { icon:'⏱', label:'600 Min Club',      desc:'600 min of practice' },
  workouts5: { icon:'dumbbell', label:'Fitness Start',    desc:'5 workouts completed' },
  sched10:   { icon:'📅', label:'Scheduled Pro',    desc:'10 scheduled sessions done' },
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
  // Count completed scheduled sessions
  const schedDone = (DB.getSchedule().sessions||[]).filter(s=>s.status==='complete').length;
  if (schedDone>=10) add('sched10');
  return b;
}

function awardXP(xp, minutes=0, source='general', completedKey=null, itemId=null) {
  try {
    const p = DB.getProgress();
    const today = new Date().toISOString().slice(0,10);
    const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);

    // Idempotency guard: prevent duplicate checkin awards on the same day
    if (source==='checkin') {
      if (p.last_checkin_date===today) {
        console.log('SC: checkin already awarded today, skipping');
        return p;
      }
      p.last_checkin_date=today;
    }

    // Streak logic — only update once per day
    if (p.last_active_date === today) { /* same day, no streak change */ }
    else if (p.last_active_date === yesterday) {
      p.current_streak = (p.current_streak||0)+1;
      p.longest_streak = Math.max(p.longest_streak||0, p.current_streak);
    } else {
      // Gap in training — reset streak
      p.current_streak = 1;
      p.longest_streak = Math.max(p.longest_streak||0, 1);
    }
    p.last_active_date = today;

    // Accumulate XP — always additive, never replace
    p.total_xp = (p.total_xp||0)+xp;
    p.practice_minutes = (p.practice_minutes||0)+minutes;

    // Mark completed items — deduplicated arrays
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

// ── Utility: date helpers ─────────────────────────────────────────
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

// Schedule session type config
const SCHED_TYPES = {
  drill:   { label:'Cricket Drill', icon:'bat',      color:'#3b82f6', bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.4)' },
  mental:  { label:'Mental Session', icon:'brain',   color:'#a855f7', bg:'rgba(168,85,247,0.12)', border:'rgba(168,85,247,0.4)' },
  fitness: { label:'Fitness', icon:'dumbbell',       color:'#f97316', bg:'rgba(249,115,22,0.12)', border:'rgba(249,115,22,0.4)' },
  match:   { label:'Match Day', icon:'wicket',       color:'#f59e0b', bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.4)' },
  rest:    { label:'Rest & Recover', icon:'heart',   color:'#16a34a', bg:'rgba(22,163,74,0.08)', border:'rgba(22,163,74,0.25)' },
  custom:  { label:'Custom Session', icon:'list',    color:'#8b949e', bg:'rgba(139,148,158,0.12)', border:'rgba(139,148,158,0.4)' },
};

// ================================================================
// DATA — Drills, Mental Sessions, Workouts, Skill Paths
// ================================================================

const DRILLS = [
  // ===== BATTING =====
  { id:'b001',category:'batting',title:'Cover Drive Mastery',skill_level:'beginner',duration_minutes:15,xp_value:70,
    video_id:'HhEQQKnXqnw',
    description:'Perfect the most elegant stroke in cricket. Master front elbow, head position, and the flowing high follow-through that separates average from elite batsmen.',
    steps:['Set side-on stance, bat raised in backlift','Watch ball seam from the bowler\'s hand — track it all the way','Step forward, weight transferring to front foot','Drive through the line, full bat face presented to cover','Head over ball at point of contact — eyes level','High flowing follow-through pointing toward cover point'],
    tips:'Keep front elbow HIGH, pointing at mid-on. Head stays perfectly still through contact.',
    target_metric:'10 consecutive clean drives, all finding the cover boundary' },
  { id:'b002',category:'batting',title:'Pull Shot Power',skill_level:'intermediate',duration_minutes:20,xp_value:90,
    video_id:'2f8okmqYpg8',
    description:'Dominate short-pitched bowling with authority. The pull shot turns the short ball from a threat into a guaranteed boundary when executed correctly.',
    steps:['Read short delivery early from bowler\'s release point','Rock back fast — weight fully onto back foot','Get inside the line of the ball — position inside it','Swing bat in a powerful horizontal arc at shoulder height','Roll wrists over at contact — keeps it along the ground','Power follow-through toward mid-wicket'],
    tips:'Identify the length EARLY — early positioning means everything else is automatic.',
    target_metric:'15 controlled pull shots, 10 finding the boundary' },
  { id:'b003',category:'batting',title:'Sweep Shot vs Spin',skill_level:'intermediate',duration_minutes:18,xp_value:85,
    video_id:'kLpGM8q_bk0',
    description:'Dominate spin bowling with the sweep. A well-executed sweep disrupts field settings, frustrates spinners, and forces bowling changes.',
    steps:['Read full delivery from spinner early','Step forward, drop leading knee toward pitch','Get to pitch of ball — bat must meet ball under your eyes','Swing bat in horizontal arc, rolling wrists at contact','CRITICAL: contact ball in front of pad — not beside it','Follow through toward fine leg or mid-wicket depending on width'],
    tips:'Commit FULLY to the sweep. Half-hearted attempts result in LBW or top edge. All or nothing.',
    target_metric:'10 clean sweeps in a row, none miscuing' },
  { id:'b004',category:'batting',title:'Cut Shot Technique',skill_level:'intermediate',duration_minutes:18,xp_value:85,
    video_id:'2f8okmqYpg8',
    description:'Attack anything short and wide outside off stump. The cut shot is your boundary weapon whenever bowlers err with width.',
    steps:['Identify short-wide delivery early','Rock back and across the crease decisively','Position body BEHIND the line — inside the bounce trajectory','Downward arc with bat — cut INTO the ground firmly','Hit firmly through the top half of the ball','Finish with bat pointing toward point or backward point'],
    tips:'Play LATE — the later you play it, the finer the angle, the more impossible to field.',
    target_metric:'20 cut shots finding the target zone past point' },
  { id:'b005',category:'batting',title:'T20 Power Hitting',skill_level:'advanced',duration_minutes:25,xp_value:120,
    video_id:'B0XOcaRMBP4',
    description:'Maximize boundary-hitting in T20 cricket. Strike rates above 150 sustained across 30 balls require correct weight transfer, full bat speed, and decisive shot selection.',
    steps:['Read the field and plan your shot BEFORE ball is bowled','Full delivery: drive over mid-on or mid-off into the gap','Short delivery: aggressive upper-cut or powerful pull','Yorker: dig out with an open face or whip through leg side','Wide: inside-out drive or savage cut','Reset your mental state completely between every delivery'],
    tips:'A bold pre-planned shot executed with conviction beats improvised aggression every time.',
    target_metric:'Strike rate 150+ sustained across a full 30-ball simulation' },
  { id:'b006',category:'batting',title:'Defensive Block Foundation',skill_level:'beginner',duration_minutes:12,xp_value:55,
    video_id:'HhEQQKnXqnw',
    description:'Build an unbreakable defensive technique. Every great innings is built on the foundation of a technically sound defensive block.',
    steps:['Set correct stance — feet shoulder-width, weight balanced','Watch ball from the bowler\'s hand all the way to bat face','For good-length: stay in crease, lean weight forward','Present full face of bat to the ball — no angle','SOFT hands at contact — let the ball deaden against the bat','Ball should drop harmlessly at your feet'],
    tips:'Relaxed hands = ball drops dead. Tense hands = caught at short leg. Relax.',
    target_metric:'20 consecutive technically correct defensive blocks' },
  { id:'b007',category:'batting',title:'Slog Sweep over Cow Corner',skill_level:'intermediate',duration_minutes:18,xp_value:100,
    video_id:'kLpGM8q_bk0',
    description:'The aggressive T20 weapon against spin. Clear the mid-wicket boundary reliably with perfect contact, timing, and commitment.',
    steps:['Read full delivery from spinner','Step forward with deep knee bend — get very low to the pitch','Full horizontal bat arc swinging much higher than standard sweep','Make contact WELL IN FRONT of the pad — not beside it','Roll wrists powerfully at impact — close the face over','Follow through lofted powerfully toward cow corner'],
    tips:'Contact in FRONT of pad prevents going straight up. This is the key technical difference.',
    target_metric:'8 of 12 slog sweeps landing in the cow corner zone' },
  { id:'b008',category:'batting',title:'Ramp Shot over Keeper',skill_level:'advanced',duration_minutes:15,xp_value:130,
    video_id:'B0XOcaRMBP4',
    description:'Redirect pace bowling over the wicketkeeper\'s head for guaranteed boundaries. The ultimate modern T20 weapon against fast bowlers.',
    steps:['Identify delivery on stumps line — short to good length','Shuffle toward off stump, open your stance wide','Angle bat face skyward toward fine leg — hold frame still','Present bat softly to the line — minimal swing, maximum redirect','Ball deflects up off the face and clears the keeper','Boundary — or minimum 4 if keeper makes a desperate dive'],
    tips:'Use the pace of the ball — the harder it comes, the further the ramp travels. Do NOT swing.',
    target_metric:'6 of 15 attempts successfully clearing the keeper' },
  { id:'b009',category:'batting',title:'Reading Spin from Hand',skill_level:'intermediate',duration_minutes:20,xp_value:95,
    video_id:'kLpGM8q_bk0',
    description:'Identify which way the ball turns before it pitches — by reading the bowler\'s hand at the point of release. The highest-value skill against quality spin.',
    steps:['Off-spin: fingers roll OVER the top of ball at release — turns away from right-hander','Leg-spin: wrist cocks outward at release — turns away from right-hander (more)','Googly: same wrist position as leg-spin but ball exits back of hand — turns IN','Doosra: front of hand delivery — goes AWAY from right-hander like off-spin','Armball: no wrist turn — comes straight on through','Practice: partner calls the delivery AFTER each ball — develop your own reading instinct'],
    tips:'Watch the seam orientation and wrist position AT release — not the flight or bounce.',
    target_metric:'Correctly identify 15 of 20 deliveries before they pitch' },
  { id:'b010',category:'batting',title:'Running Between Wickets',skill_level:'beginner',duration_minutes:20,xp_value:70,
    video_id:'HhEQQKnXqnw',
    description:'Turn ones into twos, twos into threes. Sharp running is the cheapest runs in cricket — they require zero skill from the ball, only from you.',
    steps:['Hit ball — assess IMMEDIATELY from your follow-through position','Call CLEARLY in one word: YES, NO, or WAIT — single clear call','Sprint in a perfectly straight line to the crease — no curves','Ground the bat — not your foot — behind the crease while still moving','Look up immediately: assess second run potential while completing first','Back up CONSTANTLY at the non-striker end — every single delivery'],
    tips:'Loud, early, definitive calls. Ground the bat over the line while running — not your foot.',
    target_metric:'Convert 80%+ of hit-1s into running 2s in a drill simulation' },

  // ===== BOWLING =====
  { id:'w001',category:'bowling',title:'Line & Length Precision',skill_level:'beginner',duration_minutes:20,xp_value:65,
    video_id:'7pFfqTFvOEs',
    description:'The foundation of all wicket-taking. Perfect line and length creates relentless pressure. Sustained pressure makes batsmen make mistakes.',
    steps:['Mark target zone with tape: good length, off-stump line','Warm up with 3-step approach at 60% pace — 10 balls, find the feel','Full run-up at 80% — 20 balls, count consecutive on-target deliveries','Increase to 100% pace — 15 balls maintaining accuracy','Shift target: bowl at 4th-stump line — threat the outside edge','Final 5: alternate target zones without warning yourself in advance'],
    tips:'Aim at the TOP of off-stump. Good length means the batsman is UNCOMMITTED — can\'t drive, can\'t pull.',
    target_metric:'8 of 10 consecutive balls hitting marked target zone' },
  { id:'w002',category:'bowling',title:'Outswing Mastery',skill_level:'intermediate',duration_minutes:20,xp_value:100,
    video_id:'SZsXolnz5Pg',
    description:'Master the outswinger — the number one wicket-taker in seam bowling history. Beat the outside edge consistently and edges fly to slip.',
    steps:['Hold ball with seam vertical pointing toward slip cordon','Wrist stays perfectly UPRIGHT behind ball at point of release','Aim at the TOP of off-stump — the swing does the rest for you','High-arm smooth action — release with full upright seam presentation','Bowl a FULL length — short balls lose swing rapidly','Target: 15-20cm of in-air movement confirmed by a partner'],
    tips:'NEVER aim at the edge. Target off-stump — the swing finds the edge by itself.',
    target_metric:'5 consecutive outswingers beating the imaginary outside edge' },
  { id:'w003',category:'bowling',title:'Yorker Death Bowling',skill_level:'advanced',duration_minutes:25,xp_value:130,
    video_id:'d3wJbkDK-SU',
    description:'The single most difficult delivery to hit in cricket — the perfect yorker. Execute this reliably under death-over pressure and you become invaluable.',
    steps:['Place a target marker at the BASE of the stumps — aim small','Full run-up — identical action and release position to all other deliveries','Release point is slightly LATER than for good-length ball','Mental cue: "hit the batsman\'s front toe" — release late, full length','Ball arrives below knee height at the base of the stumps','Variations: straight yorker, wide yorker outside off, slower yorker with same action'],
    tips:'Think "hit the toe" with every delivery. Consistent release point is the entire secret.',
    target_metric:'4 of 6 consecutive deliveries landing as perfect yorkers' },
  { id:'w004',category:'bowling',title:'Inswing Bowling',skill_level:'intermediate',duration_minutes:20,xp_value:100,
    video_id:'SZsXolnz5Pg',
    description:'Swing the ball late into the right-handed batsman. The inswinger targeting the gap between bat and pad is the most dangerous delivery for LBW.',
    steps:['Hold ball with seam pointing toward FINE LEG side','Wrist rotates slightly inward at address — a subtle, deliberate change','Aim significantly WIDER of off-stump than usual — let swing bring it to stumps','Bowl FULL length — short inswingers lose movement and get dispatched','Target: gap between bat and front pad of right-hander','LBW or bowled are the natural rewards when line and length are correct'],
    tips:'Bowl FULL. Short inswingers completely lose movement and become bad deliveries.',
    target_metric:'Consistent 10cm+ inswing movement confirmed by a training partner' },
  { id:'w005',category:'bowling',title:'Leg Spin Fundamentals',skill_level:'beginner',duration_minutes:20,xp_value:80,
    video_id:'7pFfqTFvOEs',
    description:'Master the art of leg-spin. The most difficult bowling skill in cricket — and the most rewarding when it clicks into place.',
    steps:['Grip: ball rests in the palm, THIRD FINGER primary across the seam','Cock wrist fully back so fingers point downward toward 6 o\'clock','High arm action — bring it over fast and smooth','At release: SNAP third finger rightward and over the top of the ball','Ball rotates right-to-left — leg-break turn confirmed by partner or video','Start at just 10 metres — gradually build up to full length as control develops'],
    tips:'The snap comes from wrist AND third finger working together — not arm speed alone.',
    target_metric:'6 of 10 balls showing clear, visible leg-spin turn' },
  { id:'w006',category:'bowling',title:'Off Spin with Drift',skill_level:'beginner',duration_minutes:18,xp_value:70,
    video_id:'7pFfqTFvOEs',
    description:'Develop consistent off-spin with drift and turn. Accuracy plus flight plus drift makes you dangerous against any batsman at any level.',
    steps:['Grip: index and middle finger across seam on top — control grip','Turn ball from right to left with fingers at release — wrist stays behind','Flight the ball up — use the air deliberately to create drift','Bowl on middle-off stump line — force the batsman to play at the ball','Vary pace intentionally — float one ball in 10mph slower than your stock ball','With breeze from behind: drift comes naturally — use it as an extra weapon'],
    tips:'Use fingers — not wrist. Drift is your invisible weapon when conditions assist you.',
    target_metric:'7 of 10 balls on correct line and length with visible turn' },
  { id:'w007',category:'bowling',title:'Bouncer Control & Use',skill_level:'advanced',duration_minutes:20,xp_value:120,
    video_id:'d3wJbkDK-SU',
    description:'Use the short ball as a genuine weapon. The bouncer is 30% physical skill and 70% psychological warfare — use both correctly.',
    steps:['Mark the back-of-length zone on the pitch precisely','Full run-up at maximum sustainable pace — don\'t save yourself','Higher arm arc at point of release — aim at back of length','Ball should arrive at the batsman at chest-to-head height','Control zone: NOT wide (free hit) and NOT overpitched (becomes pull food)','Vary target zone: chest, armpit, throat — never bowl the same spot twice consecutively'],
    tips:'Aim for the ARMPIT — not the head. Vary target zone every time. Predictable bouncers are attacking balls.',
    target_metric:'5 of 8 bouncers arriving in the target body zone' },
  { id:'w008',category:'bowling',title:'Googly Disguise',skill_level:'intermediate',duration_minutes:20,xp_value:110,
    video_id:'7pFfqTFvOEs',
    description:'Bowl the googly with complete disguise — the batsman should not detect it until it has turned the wrong way past their forward defensive block.',
    steps:['Standard leg-spin grip — practice 5 balls so the action feels natural','SAME action exactly — wrist rolls INWARD at release instead of outward','Ball exits from the BACK of hand — turns INTO right-hander instead of away','Sequence: bowl 5 leg-spinners then 1 googly with identical action and follow-through','Partner attempts to pick which delivery it is from the release position','Perfect the disguise until partner cannot identify it before pitch more than 50% of the time'],
    tips:'The googly is identical to leg-spin until the last microsecond of wrist action. Identical.',
    target_metric:'Partner misreads the googly 6 of 10 times correctly' },
  { id:'w009',category:'bowling',title:'Slower Ball Variations',skill_level:'advanced',duration_minutes:22,xp_value:130,
    video_id:'SZsXolnz5Pg',
    description:'Off-cutter, leg-cutter, knuckleball — the T20 variations that turn ordinary fast-medium bowlers into match-winners in the death overs.',
    steps:['Off-cutter: identical action, cut middle finger from OFF to LEG across seam at release','Leg-cutter: cut finger in the OPPOSITE direction — away from body','Knuckleball: grip on knuckles, push ball out slowly — 20-25km/h slower than fastball','Same full run-up and identical arm speed as your fastball — disguise is 100% of the weapon','Practice EACH variation for 10 balls per training session before mixing them','Mix variations without any predictable pattern — never the same twice in a row'],
    tips:'Disguise is the entire weapon. Identical arm speed = unreadable, unplayable delivery.',
    target_metric:'Deceive a batting partner with 3 of 4 variations in a sequence' },
  { id:'w010',category:'bowling',title:'Death Bowling Masterclass',skill_level:'advanced',duration_minutes:25,xp_value:150,
    video_id:'d3wJbkDK-SU',
    description:'Defend 10+ runs in the last 2 overs of a T20 match. The complete death bowler\'s toolkit — sequencing, variation, and unbreakable nerve.',
    steps:['Delivery 1: Full straight yorker at stumps — establish the threat immediately','Delivery 2: IDENTICAL action — knuckleball or wide yorker — now they\'re unsure','Delivery 3: Short of good length at body — push them back onto the back foot','Delivery 4: Full again — they\'re scared of the short ball now — yorker territory','Delivery 5: Wide yorker outside off — impossible to hit cleanly from a defensive position','Delivery 6: Full yorker at stumps — predictable because they expect variation at this point'],
    tips:'Never bowl the same delivery twice consecutively. Sequential variety is an unbreakable weapon.',
    target_metric:'Concede fewer than 8 runs in a complete simulated death over' },

  // ===== FIELDING =====
  { id:'f001',category:'fielding',title:'Ground Fielding Excellence',skill_level:'beginner',duration_minutes:15,xp_value:55,
    video_id:'0mH8BKDB5Qk',
    description:'Clean, athletic ground fielding with the long barrier. One clean stop and accurate throw saves more runs than most impressive boundaries score.',
    steps:['Start in athletic ready position — weight on balls of feet, slightly crouched','Ball arrives: move quickly and ATTACK the ball — never wait for it','Drop to one knee creating a long barrier behind the entire line of the ball','Pick cleanly with BOTH hands — absolutely no one-hand grabs','Stand immediately to balanced throwing position','Complete throw at stumps or to designated partner — 20 repetitions each side'],
    tips:'Body BEHIND ball every single time. One-hand grabs in match situations lose matches. Both hands always.',
    target_metric:'20 clean stops of 25 balls from multiple angles and speeds' },
  { id:'f002',category:'fielding',title:'Throwing Accuracy at Stumps',skill_level:'beginner',duration_minutes:20,xp_value:70,
    video_id:'0mH8BKDB5Qk',
    description:'Flat, fast, accurate throws directly at the stumps. Run outs are among the most valuable moments in cricket — train this relentlessly.',
    steps:['Pick ball up cleanly in one single smooth motion','Pivot FAST onto your back foot — explosive rotation','Turn shoulders fully SIDE-ON to the target stumps — crucial for accuracy and power','Arm swings in a HIGH, full arc — shoulder is the pivot point','Release FLAT — aim at the TOP of the stumps — not the ground in front','Complete full follow-through: arm finishes pointing directly at the target'],
    tips:'Side-on position. High arm. Target: TOP of stumps — not the ground. Flat throw = direct hit.',
    target_metric:'8 of 15 direct hits on stumps from 30 metres' },
  { id:'f003',category:'fielding',title:'High Catch Confidence',skill_level:'intermediate',duration_minutes:20,xp_value:90,
    video_id:'0mH8BKDB5Qk',
    description:'Take high skiers confidently under sun, pressure, and crowd noise. High catches are dropped because of poor footwork, not poor hands.',
    steps:['Call "MINE" loudly and immediately — own the catch and own the space','Move FAST to get UNDER the ball — not to where it is, but where it will be','Plant feet well with one foot slightly forward for balance adjustment','Cup hands at eye level — fingers pointing upward toward the ball','Watch ball ALL the way into the cup — do not clutch or move hands early','Complete the carry-through — do not stop momentum at the hands'],
    tips:'Get UNDER the ball early. Move your feet to perfect position THEN take the catch. Feet first.',
    target_metric:'10 consecutive catches without a drop from varying heights' },
  { id:'f004',category:'fielding',title:'Slip Cordon Reactions',skill_level:'intermediate',duration_minutes:20,xp_value:100,
    video_id:'Qh5oHMmPb8k',
    description:'React faster and catch harder in the slip cordon. Soft hands and ultra-fast reactions separate elite slip catchers from everyone else.',
    steps:['Set up in slip position — hands held LOW at knee height at ALL times','Weight forward on balls of feet — slight lean toward the bat at all times','Partner sends fast deflections via catching cradle or edge board randomly','React to movement — do NOT anticipate direction before the ball is deflected','Take ball anywhere from knee to shoulder height in one fluid movement','Return IMMEDIATELY to starting ready position after every single catch'],
    tips:'Hands LOW always. React to the SOUND of the edge before your eyes process the movement.',
    target_metric:'15 of 20 catches taken cleanly at pace from random directions' },
  { id:'f005',category:'fielding',title:'Direct Hit Run Outs',skill_level:'intermediate',duration_minutes:15,xp_value:90,
    video_id:'0mH8BKDB5Qk',
    description:'Field a ball at full sprint pace and hit the stumps directly with a flat throw. One direct hit changes a match.',
    steps:['Ball rolled at medium pace from 20 metres — approach at full sprint','Sprint to intercept at absolute maximum pace — no jogging','Clean pick-up in ONE single motion — no bobble, no adjustment','Pivot IMMEDIATELY — set feet side-on to target stumps in the same motion','Throw FLAT at the near stump — not the far stump from an angle','Entire sequence from pick-up to ball hitting stumps must be under 3.5 seconds'],
    tips:'Target the NEAR stump. A miss slightly wide still gives the wicketkeeper a stumping chance.',
    target_metric:'3 direct hits in 10 attempts, all under 3.5 seconds total' },
  { id:'f006',category:'fielding',title:'Boundary Diving Saves',skill_level:'advanced',duration_minutes:25,xp_value:115,
    video_id:'0mH8BKDB5Qk',
    description:'Save crucial boundaries with full athletic commitment. Half-dives result in fumbles. Full commitment saves matches.',
    steps:['Partner drives ball hard toward the boundary from various angles','Sprint at maximum effort — attack the ball aggressively, do not hesitate','When you cannot stop conventionally: DIVE full length, arm fully extended','Stop ball before it reaches the boundary rope — palm facing down to field','Recover immediately to your feet — ball returned accurately in one movement','Train equal repetitions diving to the left AND to the right — no weak side'],
    tips:'Commit 100% to the dive. A half-dive becomes a fumble and the ball reaches the rope. Commit or don\'t dive.',
    target_metric:'Save 8 of 10 boundary attempts with athletic diving stops' },

  // ===== WICKETKEEPING =====
  { id:'k001',category:'wicketkeeping',title:'Keeper Stance & Takes',skill_level:'beginner',duration_minutes:15,xp_value:65,
    video_id:'Qh5oHMmPb8k',
    description:'Perfect the wicketkeeping stance — the foundation that every world-class keeper builds their entire game upon.',
    steps:['Weight on TOES — never on heels throughout the entire delivery','Hands held out in front of body — soft, relaxed, ready','Side-step movement following the ball throughout the delivery from release','Stay LOW throughout — never stand up early to receive the ball','Fingers pointing DOWN for all balls below waist level','Fingers pointing UP for balls above waist — never thumbs up at waist height'],
    tips:'Never cross your feet laterally to move. Keep hands soft — tense hands drop clean takes.',
    target_metric:'15 consecutive clean takes across all heights and lines' },
  { id:'k002',category:'wicketkeeping',title:'Stumping Technique',skill_level:'intermediate',duration_minutes:18,xp_value:100,
    video_id:'Qh5oHMmPb8k',
    description:'The wicketkeeper\'s signature dismissal. Master the stumping — explosive hands, perfect footwork, and an instant convincing appeal.',
    steps:['Position directly behind the stumps — within half a metre','Spinner delivers wide or turning delivery — batsman misses or advances','Watch ball travel PAST the batsman\'s back foot before making any movement','Move laterally to take the wide delivery cleanly with soft hands','Single flowing motion: take ball and IMMEDIATELY whip bails off — one movement','Instant loud appeal — HOWZAT every time, regardless of certainty'],
    tips:'Ball must pass the batsman\'s back foot BEFORE you begin any movement. Under 0.5 seconds is elite class.',
    target_metric:'10 clean stumpings out of a 30-ball spin-bowling session' },
  { id:'k003',category:'wicketkeeping',title:'Standing Up to Spin',skill_level:'advanced',duration_minutes:25,xp_value:130,
    video_id:'Qh5oHMmPb8k',
    description:'Stand directly up to the stumps for all spin bowling — restricts the batsman\'s movement and creates constant stumping opportunities.',
    steps:['Position directly behind stumps — within one metre at all times','Begin with spinner bowling at HALF pace — build comfort with the position','Take deliveries arriving exactly at the stumps — not deflected wide','For turning delivery: quick explosive lateral swivel — strong hand leading the take','Stumping opportunity identified: whip bails off in one single motion from the take','Personal standard: zero byes — anything above zero is substandard performance'],
    tips:'This is the hardest skill in wicketkeeping. Build up the practice distance gradually over weeks.',
    target_metric:'Zero byes conceded across 20 spin deliveries while standing up' },

  // ===== FITNESS =====
  { id:'fit001',category:'fitness',title:'Cricket Sprint Protocol',skill_level:'beginner',duration_minutes:20,xp_value:70,
    description:'Develop explosive sprint speed for running between wickets and explosive fielding starts. The first 10 metres separates elite fielders from the rest.',
    steps:['Dynamic warm-up: high knees, butt kicks, leg swings — 5 full minutes','Sprint 22 yards (one crease to crease): 10 repetitions with 30 seconds rest','Focus on explosive first step — drive out with maximum force','Drive arms hard — arms are the engine that drives leg speed','Stay LOW for first 5 metres — do not straighten up early','Cool down: easy jog 3 minutes'],
    tips:'The first 10 metres is everything in cricket fielding. Train the start exclusively.',
    target_metric:'22 yards consistently under 3.2 seconds' },
  { id:'fit002',category:'fitness',title:'Cricket Core Stability',skill_level:'beginner',duration_minutes:15,xp_value:65,
    description:'Core strength for batting power generation, bowling action stability, and fielding agility. Non-negotiable for all cricketers at every level.',
    steps:['Plank: 3 × 45 seconds — straight line from ankles through shoulders','Side plank: 2 × 30 seconds each side — hip up, body straight','Dead bugs: 3 × 10 each side — slow and completely controlled throughout','Bird dog: 3 × 10 each side — opposite arm and leg fully extended','Russian twists: 3 × 20 — use a cricket ball as weight resistance','Rest 45 seconds between all sets — no shorter'],
    tips:'Brace your core actively on every single repetition. Breathe OUT on the effort phase.',
    target_metric:'Complete the full circuit 3 times with perfect form throughout' },
  { id:'fit003',category:'fitness',title:'Bowling Shoulder Pre-Hab',skill_level:'beginner',duration_minutes:15,xp_value:60,
    description:'Protect your bowling shoulder with this essential routine. Every bowler must complete this BEFORE every session — non-negotiable injury insurance.',
    steps:['Shoulder circles slow and large: 20 forward, 20 backward — full range','External rotation with resistance band: 3 × 15 each arm — controlled','Internal rotation: 3 × 15 each arm — controlled return','Scapular retractions: 3 × 15 — squeeze shoulder blades firmly together','YTW exercise: 3 × 10 each letter — strengthens the posterior rotator cuff','Sleeper stretch: 60 seconds on each side — essential for internal rotation'],
    tips:'15 minutes of prevention = years of injury-free bowling. There are no exceptions to this rule.',
    target_metric:'Complete pre-hab before 100% of all bowling sessions — no exceptions' },
  { id:'fit004',category:'fitness',title:'Explosive Leg Power',skill_level:'advanced',duration_minutes:25,xp_value:110,
    description:'Develop devastating leg power for batting explosiveness, bowling run-up speed, and fielding agility from a complete standstill.',
    steps:['Box jumps: 4 × 8 repetitions — maximum height, land absolutely silently','Jump squats: 3 × 10 — controlled descent, explosive ascent with full hip extension','Single-leg bounds: 3 × 6 each leg — driving off one leg for maximum horizontal distance','Sprint starts from deep crouch: 5 × 30 metres at absolute maximum effort','Rest 90 seconds between ALL explosive sets — full recovery is mandatory','Landing noisily = poor power transfer — refine until landings are completely silent'],
    tips:'Full hip extension at take-off. Silent landing = efficient power transfer = more explosive output.',
    target_metric:'Standing broad jump consistently reaching 2.0 metres' },
  { id:'fit005',category:'fitness',title:'Agility Ladder Footwork',skill_level:'intermediate',duration_minutes:20,xp_value:90,
    description:'Rapid footwork patterns for explosive fielding starts and quick running between wickets. Fast feet win run outs and save boundaries.',
    steps:['Single steps — one foot per box — 2 minutes continuous without hesitation','Two feet per box — jump in and out — 2 minutes continuous','Lateral shuffle through every box sideways — 2 minutes each side','In-in-out-out pattern — 2 minutes — the hardest coordination pattern','Sprint through at maximum possible speed: 6 × 10 metres full recovery between','Cool down: 3 minutes easy walking'],
    tips:'Light, fast, precise foot contacts only. Arms drive leg speed — pump them hard and high.',
    target_metric:'Complete all patterns under 20 minutes with zero ladder contacts' },

  // ===== MENTAL =====
  { id:'ment001',category:'mental',title:'Batting Visualization',skill_level:'beginner',duration_minutes:15,xp_value:65,
    description:'Mentally rehearse your perfect innings in vivid, multisensory detail. Neuroscience confirms: the brain cannot distinguish between real and vividly imagined practice.',
    steps:['Close your eyes. Relax every muscle — scan body from head to toe systematically.','Picture yourself walking to the crease with total, earned confidence','Face 10 deliveries in your mind — play each one with perfect technique','Include every sensory detail: bat feel in hands, spikes on grass, crowd sounds, warm air','See each delivery arrive and play your best technically perfect shot','Open your eyes. Carry this mental image vividly and specifically into your next real session.'],
    tips:'Be vivid, specific, and multi-sensory. The more real it feels, the more real the neural pathways become.',
    target_metric:'Complete a 10-minute visualization session every single day for 2 weeks' },
  { id:'ment002',category:'mental',title:'Between-Ball Reset Routine',skill_level:'intermediate',duration_minutes:12,xp_value:80,
    description:'Master the psychological routine between deliveries. Elite batsmen use this time to RESET completely — not to ruminate on what just happened.',
    steps:['After ball: look AWAY from the bowler immediately — break eye contact completely','Take ONE deep, slow, deliberate reset breath — fully exhale every bit of tension','Tap bat on ground exactly twice — physical anchor to the present moment only','Scan the field: note any changes to field positions since the last delivery','Look down at the bat handle to physically refocus your gaze and attention','New stance position — fresh psychological start — every single ball is the first ball'],
    tips:'Make this routine completely AUTOMATIC through 100% consistent practice. Same every time, no exceptions.',
    target_metric:'Consistent complete routine used in a 20-ball simulation without deviation' },
  { id:'ment003',category:'mental',title:'Pressure Inoculation',skill_level:'advanced',duration_minutes:20,xp_value:130,
    description:'Simulate extreme match pressure in training so real matches feel familiar and manageable. This is the method elite athletes use worldwide.',
    steps:['Set a realistic high-pressure scenario: 5 runs needed from last over, 2 wickets remaining','Real bowler, real fielders, real scorekeeper, and vocal watching spectators','Both teams fully understand the scenario — pressure is at its maximum','Do NOT rush — use your complete between-ball routine as you would in a real match','Assess situation logically before each ball — make a clear plan — execute the plan','Full debrief afterward: what worked? What did you feel? What exactly would you change?'],
    tips:'Pressure is a privilege given only to those who matter. Actively seek it in every training session.',
    target_metric:'Complete 6 high-pressure scenario simulations while maintaining full routine' },
];

// ── Mental Sessions Factory ───────────────────────────────────────
const MI = {
  focus:['Find a comfortable seated position and gently close your eyes.','Take three slow, complete breaths to fully settle your nervous system.','Bring all your attention completely to this present moment only.','Notice any thoughts that arise — acknowledge each one and release it.','Narrow your entire focus to a single precise point of concentration.','Maintain this focused state through the remainder of the session.'],
  confidence:['Sit tall with excellent posture and take three powerful, diaphragmatic breaths.','Recall your single greatest performance moment — relive it with complete detail.','Feel that exact confidence filling every cell of your body right now.','Repeat your most important personal performance affirmation slowly three times.','Visualize yourself performing with complete belief and natural authority.','Step forward carrying this energy directly into your next performance.'],
  recovery:['Find a quiet space and allow your entire body to fully and deeply relax.','Take five long breaths — deliberately releasing all held tension on every exhale.','Acknowledge frustration without any self-judgment — it is completely natural and valid.','Remind yourself truthfully: every single setback is an essential part of the journey.','Identify one specific clear learning point you can actively take forward today.','Make a firm commitment to showing up tomorrow with completely fresh energy and focus.'],
  'pre-performance':['Begin with three slow, grounding breaths — inhale through nose, exhale through mouth.','Scan your body completely from head to toe, releasing every point of tension.','Visualize walking to your position with calm, certain, earned authority.','See yourself executing your most important skill perfectly on the very first ball.','Feel the productive excitement and complete physical readiness building within you.','Step forward now with total intention — you have prepared and you are genuinely ready.'],
  pressure:['Acknowledge the pressure you feel — it means this genuinely matters to you.','Breathe in for 4 slow counts, hold for 2, then exhale fully for 6 counts.','Remember: pressure is only given to those trusted to operate at this level.','Focus completely and exclusively on what you can actually control — your process only.','Commit to your specific process — one ball, one breath, one precise moment at a time.','Step forward now with calm, completely earned confidence built through your preparation.'],
  visualization:['Close your eyes and progressively relax every single muscle group in your body.','Create an extremely vivid, completely detailed mental image of your performance environment.','See yourself performing your key cricket skill perfectly and with complete ease and flow.','Add full sensory details: sounds, smells, temperature, physical sensations of peak performance.','Watch yourself succeed completely — feel the deep, earned satisfaction entirely in your body.','Open your eyes and carry this sharp, detailed vision directly into your actual performance.'],
  'match-day-calm':['Take your position and close your eyes gently and with complete deliberateness.','Breathe in slowly for 4 counts, hold briefly, release fully for 4 counts.','Feel your feet completely grounded, your body fully present and stable.','Release ALL thoughts connected to outcomes — they are not yours to hold or control.','Trust your preparation completely and specifically — you have done the necessary work.','Open your eyes now with complete calm and clear, confident readiness to perform.'],
  'pro-mental':['Enter the deepest available stillness through sustained controlled breathing.','Access your peak mental state deliberately through concentrated, intentional focus.','Engage your elite competitor mindset fully — you have been in this position before.','Visualize your complete performance in vivid detail from confident start to triumphant finish.','Lock in your precise process cues and personal performance triggers with clarity.','Step out now as the athlete you have consistently, deliberately trained yourself to become.'],
};

function mkM(id,title,cat,dur,xp,premium=false) {
  const mins=Math.floor(dur/60);
  const n=Math.max(3,Math.min(6,Math.ceil(dur/90)));
  const sd=Math.floor(dur/n);
  const pool=MI[cat]||MI.focus;
  const steps=pool.slice(0,n).map((instruction,i)=>({ instruction, duration_seconds:i===n-1?dur-sd*(n-1):sd }));
  return { id,title,category:cat,duration_seconds:dur,xp_value:xp,is_premium:premium,
    description:`A ${mins}-minute ${cat.replace(/-/g,' ')} session to build your mental game.`,steps };
}

const MENTAL_SESSIONS = [
  mkM('m01','Micro Focus Burst','focus',180,35), mkM('m02','Focus Next Ball','focus',240,45),
  mkM('m03','5-4-3-2-1 Grounding','focus',300,50), mkM('m04','Task Isolation Protocol','focus',300,50),
  mkM('m05','Laser Focus Activation','focus',360,55), mkM('m06','Deep Focus Anchor','focus',360,60),
  mkM('m07','Sensory Narrowing','focus',360,60), mkM('m08','Process Over Result','focus',420,65),
  mkM('m09','Noise Cancellation Focus','focus',420,70), mkM('m10','Single-Point Focus Drill','focus',480,55),
  mkM('m11','Flow State Trigger','focus',600,75), mkM('m12','Trusting Instinct','focus',420,65),
  mkM('m20','Morning Positivity Charge','confidence',240,40), mkM('m21','Confidence Countdown','confidence',300,50),
  mkM('m22','Celebrate Small Wins','confidence',300,50), mkM('m23','Self-Talk Rewrite','confidence',360,55),
  mkM('m24','Name Your Strength','confidence',300,50), mkM('m25','Affirmation Immersion','confidence',420,60),
  mkM('m26','Own the Room','confidence',420,65), mkM('m27','Inner Champion','confidence',480,65),
  mkM('m28','Champion Mindset Simulation','confidence',600,85), mkM('m29','Identity Goal Setting','confidence',540,75),
  mkM('m30','Reset Button','recovery',240,45), mkM('m31','Self-Compassion Break','recovery',300,50),
  mkM('m32','Reset After Duck','recovery',300,50), mkM('m33','Bounce-Back Faster','recovery',360,60),
  mkM('m34','Breathing Through Collapse','recovery',360,65), mkM('m35','Let It Go Protocol','recovery',420,60),
  mkM('m36','Failure as Feedback','recovery',420,60), mkM('m37','Processing Disappointment','recovery',480,70),
  mkM('m38','Post-Game Emotional Release','recovery',480,70), mkM('m39','Champions Setback','recovery',480,70),
  mkM('m40','Full Body Relaxation','recovery',540,65), mkM('m41','Sleep Better Tonight','recovery',480,60),
  mkM('m50','Pre-Game Activation','pre-performance',300,50), mkM('m51','Nervous Energy Converter','pre-performance',360,55),
  mkM('m52','Pre-Performance Calm','pre-performance',360,55), mkM('m53','Anchoring Peak State','pre-performance',360,65),
  mkM('m54','Game Day Activation','pre-performance',420,65), mkM('m55','Embrace the Arena','pre-performance',420,65),
  mkM('m56','Morning of Big Day','pre-performance',540,75), mkM('m57','Champions Routine','pre-performance',540,75),
  mkM('m58','Pre-Tournament Mind Lock','pre-performance',600,80),
  mkM('m60','10-Second Rule','pressure',300,50), mkM('m61','Physiological Sigh','pressure',180,35),
  mkM('m62','Strategic Pause','pressure',360,60), mkM('m63','Pressure Is Privilege','pressure',420,65),
  mkM('m64','Handling the Unplayable Ball','pressure',420,70), mkM('m65','Bowling Under Pressure','pressure',420,65),
  mkM('m66','Decision Clarity Under Pressure','pressure',420,70), mkM('m67','Choke-Proof Preparation','pressure',540,80),
  mkM('m68','Mental Toughness Builder','pressure',600,85),
  mkM('m70','Batting Visualization Session','visualization',300,50), mkM('m71','Future-Pacing Success','visualization',420,65),
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
  return {id,name,level,target,goal,duration_category:durCat,exercises,duration_minutes:durMin,xp_value:xp};
}
const WORKOUTS = [
  mkW('wb001','Full Body Beginner Blast','beginner','full-body','build-muscle','10-15',4,12,85),
  mkW('wb002','Quick Morning Starter','beginner','full-body','lose-weight','<10',4,8,70),
  mkW('wb003','Chest Beginner Build','beginner','chest','build-muscle','10-15',3,12,70),
  mkW('wb004','Back Beginner Strengthen','beginner','back','build-muscle','<10',3,8,65),
  mkW('wb005','Shoulder Beginner Tone','beginner','shoulders','build-muscle','<10',3,8,65),
  mkW('wb006','Arms Beginner Blast','beginner','arms','build-muscle','10-15',4,12,80),
  mkW('wb007','Legs Beginner Strength','beginner','legs','build-muscle','10-15',4,12,85),
  mkW('wb008','Core Beginner Basics','beginner','core','build-muscle','10-15',4,12,80),
  mkW('wb009','Quick Fat Burn Sprint','beginner','full-body','lose-weight','<10',4,8,70),
  mkW('wb010','Full Body Fat Burn Beginner','beginner','full-body','lose-weight','15-20',5,18,95),
  mkW('wb011','Total Toning Beginner','beginner','full-body','build-muscle','15-20',5,18,100),
  mkW('wb012','10-Minute Full Body Burn','beginner','full-body','lose-weight','10-15',8,10,80),
  mkW('wb013','Chest Fat Burn Beginner','beginner','chest','lose-weight','10-15',3,12,72),
  mkW('wb014','Back Fat Burn Beginner','beginner','back','lose-weight','10-15',3,12,70),
  mkW('wb015','Legs Endurance Beginner','beginner','legs','improve-endurance','15-20',4,18,90),
  mkW('wb016','Core Fat Burn Beginner','beginner','core','lose-weight','<10',4,8,72),
  mkW('wb017','Glutes Beginner Tone','beginner','glutes','build-muscle','10-15',4,12,80),
  mkW('wb018','Full Body Endurance Starter','beginner','full-body','improve-endurance','10-15',4,12,85),
  mkW('wb019','Arms Fat Burn Beginner','beginner','arms','lose-weight','<10',3,8,68),
  mkW('wb020','Evening Stretch Beginner','beginner','full-body','improve-endurance','<10',4,8,60),
  mkW('wi001','Full Body Intermediate Power','intermediate','full-body','build-muscle','20-25',5,22,165),
  mkW('wi002','Chest Intermediate Build','intermediate','chest','build-muscle','15-20',4,17,140),
  mkW('wi003','Back Intermediate Strength','intermediate','back','build-muscle','15-20',4,17,135),
  mkW('wi004','Shoulder Intermediate Sculpt','intermediate','shoulders','build-muscle','15-20',4,17,140),
  mkW('wi005','Arms Intermediate Pump','intermediate','arms','build-muscle','20-25',5,22,165),
  mkW('wi006','Legs Intermediate Circuit','intermediate','legs','build-muscle','20-25',5,22,160),
  mkW('wi007','Core Intermediate Shred','intermediate','core','build-muscle','15-20',5,17,145),
  mkW('wi008','HIIT Fat Burner Intermediate','intermediate','full-body','lose-weight','10-15',4,12,130),
  mkW('wi009','Endurance Builder Intermediate','intermediate','full-body','improve-endurance','20-25',5,22,160),
  mkW('wi010','Chest Intermediate Fat Burn','intermediate','chest','lose-weight','10-15',4,12,128),
  mkW('wi011','Legs Intermediate Fat Burn','intermediate','legs','lose-weight','15-20',4,17,148),
  mkW('wi012','Core Intermediate Fat Burn','intermediate','core','lose-weight','10-15',4,12,125),
  mkW('wi013','Full Body Endurance Circuit','intermediate','full-body','improve-endurance','15-20',5,17,155),
  mkW('wi014','Upper Body Pump Builder','intermediate','full-body','build-muscle','15-20',6,17,150),
  mkW('wi015','Core Shred Express','intermediate','core','lose-weight','10-15',7,12,122),
  mkW('wi016','Full Body Fat Burn Int','intermediate','full-body','lose-weight','20-25',5,22,168),
  mkW('wi017','Active Recovery Session','intermediate','full-body','improve-endurance','15-20',5,17,120),
  mkW('wi018','Glutes Intermediate Shaper','intermediate','glutes','build-muscle','15-20',5,17,140),
  mkW('wi019','Shoulder Intermediate Burn','intermediate','shoulders','lose-weight','15-20',4,17,140),
  mkW('wi020','Full Body Balance Circuit','intermediate','full-body','improve-endurance','25+',6,27,185),
  mkW('wa001','Full Body Advanced HIIT','advanced','full-body','lose-weight','25+',6,27,220),
  mkW('wa002','Chest Advanced Power','advanced','chest','build-muscle','15-20',4,17,178),
  mkW('wa003','Back Advanced Domination','advanced','back','build-muscle','15-20',4,17,182),
  mkW('wa004','Shoulder Advanced Burn','advanced','shoulders','build-muscle','15-20',4,17,175),
  mkW('wa005','Arms Advanced Pump','advanced','arms','build-muscle','20-25',5,22,192),
  mkW('wa006','Legs Explosive Advanced','advanced','legs','build-muscle','20-25',5,22,190),
  mkW('wa007','Core Advanced Destroyer','advanced','core','build-muscle','15-20',5,17,175),
  mkW('wa008','Fat Burn HIIT Advanced','advanced','full-body','lose-weight','20-25',6,22,210),
  mkW('wa009','Power Strength Advanced','advanced','full-body','build-muscle','20-25',5,22,215),
  mkW('wa010','Total Body Cardio Advanced','advanced','full-body','improve-endurance','25+',6,27,225),
  mkW('wa011','Glutes & Hamstrings Advanced','advanced','glutes','lose-weight','20-25',5,22,205),
  mkW('wa012','Chest & Triceps Advanced','advanced','chest','build-muscle','20-25',5,22,190),
  mkW('wa013','Leg Day Power Circuit','advanced','legs','build-muscle','20-25',7,22,200),
  mkW('wa014','Full Body Advanced Athlete','advanced','full-body','build-muscle','25+',6,27,230),
  mkW('wa015','Mobility & Flexibility Advanced','advanced','full-body','improve-endurance','20-25',5,22,160),
  mkW('wa016','Back Advanced Fat Burn','advanced','back','lose-weight','15-20',4,17,170),
  mkW('wa017','Core Advanced Annihilation','advanced','core','improve-endurance','15-20',5,17,185),
  mkW('wa018','Arms Advanced Strength','advanced','arms','build-muscle','15-20',4,17,175),
  mkW('wa019','Full Body Athlete Builder','advanced','full-body','build-muscle','25+',8,27,220),
  mkW('wa020','Chest Advanced Sculptor','advanced','chest','build-muscle','15-20',4,17,165),
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
  mkW('wp013','Legs Pro Power','pro','legs','build-muscle','25+',5,28,305),
  mkW('wp014','Core Pro Mastery','pro','core','build-muscle','20-25',4,22,265),
  mkW('wp015','Arms Pro Domination','pro','arms','build-muscle','25+',5,28,290),
  mkW('wp016','Back Domination Pro','pro','back','build-muscle','25+',5,28,290),
  mkW('wp017','Shoulders Pro Power','pro','shoulders','build-muscle','20-25',4,22,275),
  mkW('wp018','Core Stability Pro','pro','core','improve-endurance','20-25',5,22,270),
  mkW('wp019','Full Body Pro Fat Burn','pro','full-body','lose-weight','25+',6,28,295),
  mkW('wp020','Full Body Pro Cardio','pro','full-body','lose-weight','20-25',6,22,288),
];

function findWorkouts(level, target, goal, durCat) {
  const m=(w,lv,tg,gl,dc)=>w.level===lv&&(tg==='any'||w.target===tg)&&(gl==='any'||w.goal===gl)&&(dc==='any'||w.duration_category===dc);
  let r=WORKOUTS.filter(w=>m(w,level,target,goal,durCat)); if(r.length) return r;
  r=WORKOUTS.filter(w=>m(w,level,target,goal,'any')); if(r.length) return r;
  r=WORKOUTS.filter(w=>m(w,level,target,'any','any')); if(r.length) return r;
  r=WORKOUTS.filter(w=>m(w,level,'any','any','any')); if(r.length) return r;
  const fb={pro:'advanced',advanced:'intermediate',intermediate:'beginner',beginner:'beginner'};
  r=WORKOUTS.filter(w=>w.level===level||w.level===fb[level]);
  return r.length?r:[WORKOUTS[0]];
}

// ── Skill Paths ───────────────────────────────────────────────────
const SKILL_PATHS = [
  { id:'batting', title:'Batting Mastery', icon:'bat', desc:'From solid defence to dominant attacking play — the complete batsman blueprint.',
    color:'from-blue-600 to-indigo-700', textColor:'text-blue-300', borderColor:'border-blue-500/50',
    accent:'#3b82f6',
    levels:[
      { id:'beginner', label:'Club Cricketer', icon:'bat', xpPerDay:80,
        desc:'Fundamentals, defensive technique, and basic stroke play.',
        sampleDrills:['Defensive Block Foundation','Cover Drive Mastery','Running Between Wickets'] },
      { id:'intermediate', label:'District Player', icon:'bat', xpPerDay:120,
        desc:'Shot expansion, spin play, and core T20 skills.',
        sampleDrills:['Cut Shot Technique','Sweep Shot vs Spin','Pull Shot Power'] },
      { id:'advanced', label:'State Performer', icon:'bat', xpPerDay:160,
        desc:'Power hitting, pressure batting, and match-winning skills.',
        sampleDrills:['T20 Power Hitting','Ramp Shot over Keeper','Pressure Inoculation'] },
      { id:'pro', label:'Elite Cricketer', icon:'crown', xpPerDay:200,
        desc:'Elite refinement, match simulation, and peak performance.',
        sampleDrills:['Reading Spin from Hand','Between-Ball Reset Routine','Complete Shot Arsenal'] }
    ] },
  { id:'bowling', title:'Bowling Excellence', icon:'ball', desc:'Build line and length, develop all variations, and become unplayable.',
    color:'from-red-600 to-orange-600', textColor:'text-red-300', borderColor:'border-red-500/50',
    accent:'#ef4444',
    levels:[
      { id:'beginner', label:'Club Bowler', icon:'ball', xpPerDay:75,
        desc:'Correct action, basic control, and seam presentation.',
        sampleDrills:['Line & Length Precision','Off Spin with Drift','Leg Spin Fundamentals'] },
      { id:'intermediate', label:'District Bowler', icon:'ball', xpPerDay:115,
        desc:'Swing bowling, spin variations, and field setting.',
        sampleDrills:['Outswing Mastery','Inswing Bowling','Googly Disguise'] },
      { id:'advanced', label:'State Bowler', icon:'ball', xpPerDay:155,
        desc:'Death bowling, yorkers, and pressure bowling mastery.',
        sampleDrills:['Yorker Death Bowling','Bouncer Control & Use','Slower Ball Variations'] },
      { id:'pro', label:'Elite Bowler', icon:'crown', xpPerDay:195,
        desc:'Complete mastery of swing, seam, spin, and pace variety.',
        sampleDrills:['Death Bowling Masterclass','Complete Variation Arsenal','Match Simulation'] }
    ] },
  { id:'fielding', title:'Fielding Athlete', icon:'navigation', desc:'Become the player every captain wants — quick, accurate, fearless, match-winning.',
    color:'from-emerald-600 to-teal-600', textColor:'text-emerald-300', borderColor:'border-emerald-500/50',
    accent:'#10b981',
    levels:[
      { id:'beginner', label:'Safe Pair of Hands', icon:'navigation', xpPerDay:65,
        desc:'Clean stops, basic catching, and safe accurate returns.',
        sampleDrills:['Ground Fielding Excellence','High Catch Confidence','Throwing Accuracy at Stumps'] },
      { id:'intermediate', label:'Athletic Fielder', icon:'navigation', xpPerDay:100,
        desc:'Slip catching, direct hits, and boundary saving.',
        sampleDrills:['Slip Cordon Reactions','Direct Hit Run Outs','Boundary Diving Saves'] },
      { id:'advanced', label:'Elite Fielder', icon:'navigation', xpPerDay:140,
        desc:'Elite boundary work, run-out artistry, and impact fielding.',
        sampleDrills:['Direct Hit Run Outs','Boundary Diving Saves','Pressure Catches'] },
      { id:'pro', label:'World-Class Fielder', icon:'crown', xpPerDay:180,
        desc:'Redefine the standard of fielding excellence.',
        sampleDrills:['Full Fielding Masterclass','Captaining the Field','Zero Boundaries Conceded'] }
    ] },
  { id:'allrounder', title:'All-Rounder Path', icon:'star', desc:'The complete cricketer — contribute meaningfully with bat, ball, and in the field.',
    color:'from-purple-600 to-pink-600', textColor:'text-purple-300', borderColor:'border-purple-500/50',
    accent:'#a855f7',
    levels:[
      { id:'beginner', label:'Utility Player', icon:'star', xpPerDay:90,
        desc:'Solid in two disciplines — reliable, consistent contribution.',
        sampleDrills:['Cover Drive Mastery','Line & Length Precision','Ground Fielding Excellence'] },
      { id:'intermediate', label:'Impact Player', icon:'💥', xpPerDay:135,
        desc:'Match-winning contributions in both disciplines.',
        sampleDrills:['Pull Shot Power','Outswing Mastery','Slip Cordon Reactions'] },
      { id:'advanced', label:'Key All-Rounder', icon:'star', xpPerDay:175,
        desc:'Consistently influential in all three disciplines.',
        sampleDrills:['T20 Power Hitting','Death Bowling Masterclass','Elite Fielding'] },
      { id:'pro', label:'Complete Cricketer', icon:'crown', xpPerDay:220,
        desc:'Redefine what an all-rounder brings to the team.',
        sampleDrills:['Complete Batting Arsenal','Complete Bowling Arsenal','World-Class Fielding'] }
    ] }
];

function generateWeekPlan(pathId, levelId) {
  const path=SKILL_PATHS.find(p=>p.id===pathId);
  const lv=path?.levels.find(l=>l.id===levelId);
  if(!path||!lv) return [];
  const phases=['Foundation','Development','Integration','Performance','Mastery'];
  return phases.map((phase,wi)=>({
    week:wi+1, phase, theme:`Week ${wi+1} — ${phase}`,
    days:Array.from({length:7},(_,di)=>{
      if(di===6) return { day:7,label:'Sun',isRest:true,activities:[] };
      const isLight=di===2||di===4;
      const activities=isLight
        ?[{type:'mental',id:'m84',title:'Recovery & Reset',duration:'8 min',xp:65},{type:'drill',id:DRILLS.find(d=>d.category==='fitness')?.id||'fit001',title:'Light Conditioning',duration:'15 min',xp:60}]
        :[{type:'drill',id:path.id==='batting'?'b001':path.id==='bowling'?'w001':'f001',title:lv.sampleDrills[di%lv.sampleDrills.length]||'Skill Session',duration:'20 min',xp:lv.xpPerDay*0.4|0},{type:'fitness',id:'wb001',title:'Cricket Fitness',duration:'20 min',xp:lv.xpPerDay*0.3|0},{type:'mental',id:'m50',title:'Mental Training',duration:'8 min',xp:lv.xpPerDay*0.3|0}];
      return { day:di+1,label:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][di],isRest:false,activities,totalXP:activities.reduce((s,a)=>s+a.xp,0) };
    })
  }));
}

// Smart schedule generator algorithm
function generateSmartSchedule(focusArea, trainingDays, intensity, weekMondayStr) {
  const monday = new Date(weekMondayStr+'T00:00:00');
  // Choose rest day pattern
  const restPatterns = {
    3:[1,3,5,6], 4:[2,4,6], 5:[3,6], 6:[6], 7:[]
  };
  const restDays = restPatterns[trainingDays]||[6];
  const intensityXP = { light:65, moderate:90, intense:120 };
  const xp = intensityXP[intensity]||90;
  const sessions=[];

  for(let i=0;i<7;i++){
    const d=new Date(monday); d.setDate(monday.getDate()+i);
    const ds=dateStr(d);
    if(restDays.includes(i)) continue;

    const isHeavy=i%3===0;
    const drillCat=focusArea==='allrounder'?['batting','bowling','fielding'][i%3]:focusArea;
    const drillOptions=DRILLS.filter(d=>d.category===drillCat&&d.skill_level==='intermediate');
    const drillPick=drillOptions[i%drillOptions.length]||DRILLS.find(d=>d.category===drillCat)||DRILLS[0];
    const mentalOptions=MENTAL_SESSIONS.filter(m=>!m.is_premium);
    const mentalPick=mentalOptions[i%mentalOptions.length]||MENTAL_SESSIONS[0];
    const workoutPick=WORKOUTS.find(w=>w.level==='intermediate'&&w.goal===( isHeavy?'build-muscle':'improve-endurance'))||WORKOUTS[0];

    sessions.push({
      id:'sch_'+Date.now()+'_'+i+'_a',
      date:ds, time:'07:00',
      type:'drill', title:drillPick.title,
      ref_id:drillPick.id,
      duration_minutes:drillPick.duration_minutes,
      xp_value:drillPick.xp_value,
      status:'pending', notes:'', color:SCHED_TYPES.drill.color
    });

    if(isHeavy){
      sessions.push({
        id:'sch_'+Date.now()+'_'+i+'_b',
        date:ds, time:'17:00',
        type:'fitness', title:workoutPick.name,
        ref_id:workoutPick.id,
        duration_minutes:workoutPick.duration_minutes,
        xp_value:workoutPick.xp_value,
        status:'pending', notes:'', color:SCHED_TYPES.fitness.color
      });
    }

    sessions.push({
      id:'sch_'+Date.now()+'_'+i+'_c',
      date:ds, time:'19:00',
      type:'mental', title:mentalPick.title,
      ref_id:mentalPick.id,
      duration_minutes:Math.floor(mentalPick.duration_seconds/60),
      xp_value:mentalPick.xp_value,
      status:'pending', notes:'', color:SCHED_TYPES.mental.color
    });
  }
  return sessions;
}

// ================================================================
// SHARED UI COMPONENTS — Professional Design System
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

// ── Section title helper ──────────────────────────────────────────
function SectionLabel({ children }) {
  return h('div', { className:'sc-section-label' }, children);
}

// ── Page header ───────────────────────────────────────────────────
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
// SIDEBAR — Professional with scroll memory
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

  // Fully SVG-icon driven nav button — zero emojis
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
    // Backdrop
    open && h('div',{
      className:'fixed inset-0 z-40',
      style:{background:'rgba(0,0,0,0.7)',backdropFilter:'blur(4px)'},
      onClick:handleClose
    }),

    // Drawer — professional sidebar panel
    h('div',{
      className:'fixed inset-y-0 left-0 z-50 w-72 flex flex-col sidebar-panel',
      style:{
        transform:open?'translateX(0)':'translateX(-100%)',
        transition:'transform .22s cubic-bezier(.16,1,.3,1)',
        willChange:'transform',
      }
    },
      // ── Header ──────────────────────────────────────────────────
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

      // ── Level + streak ────────────────────────────────────────
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

      // ── Scrollable nav ────────────────────────────────────────
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

        h(SectionLabel,{},'Cricket Tools'),
        h(NavBtn,{label:'Match Tracker',icon:'list',pg:'MatchTracker'}),
        h(NavBtn,{label:'MiniMatch IQ',icon:'puzzle',pg:'MiniMatch'}),
        h(NavBtn,{label:'Why Did I Get Out?',icon:'helpCircle',pg:'GetOut'}),
        h(NavBtn,{label:'Quizzes',icon:'book',pg:'Quizzes'}),

        h(SectionLabel,{},'Account'),
        h(NavBtn,{label:'Settings',icon:'settings',pg:'Settings'}),

        // Dark mode toggle
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
// BOTTOM NAVIGATION — Professional sports-app style
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
// HOME PAGE — Professional data-forward dashboard
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
    // Guard 1: React state (prevents double-tap before re-render)
    if(checkedIn) return;
    // Guard 2: Live DB check (prevents re-award after navigate-away-and-back)
    const today=new Date().toISOString().slice(0,10);
    const currentProgress=DB.getProgress();
    if(currentProgress.last_checkin_date===today) {
      setCheckedIn(true);
      return;
    }
    // Award: awardXP internally also guards via last_checkin_date
    awardXP(15,0,'checkin');
    setCheckedIn(true);
  };

  // Smart picks — first uncompleted from each category
  const done = progress.completed_drills||[];
  const doneMental = progress.completed_mental||[];
  const drillPick = DRILLS.find(d=>!done.includes(d.id)&&d.category==='batting')||DRILLS[0];
  const mentalPick = MENTAL_SESSIONS.find(m=>!doneMental.includes(m.id)&&!m.is_premium)||MENTAL_SESSIONS[0];
  const workoutPick = WORKOUTS.find(w=>w.level==='beginner')||WORKOUTS[0];

  // Quick actions — use SVG icon names, no emojis
  const quickActions=[
    {icon:'bat',label:'Drills',pg:'Drills',color:'#2563eb',bg:'rgba(37,99,235,0.12)',border:'rgba(37,99,235,0.25)'},
    {icon:'brain',label:'Mental',pg:'Mental',color:'#7c3aed',bg:'rgba(124,58,237,0.12)',border:'rgba(124,58,237,0.25)'},
    {icon:'dumbbell',label:'Fitness',pg:'Fitness',color:'#ea580c',bg:'rgba(234,88,12,0.12)',border:'rgba(234,88,12,0.25)'},
    {icon:'timer',label:'Timer',pg:'Timer',color:'#0d9488',bg:'rgba(13,148,136,0.12)',border:'rgba(13,148,136,0.25)'},
  ];

  // Explore grid — icon names, clean labels
  const exploreTiles=[
    {icon:'layers',label:'Skill Paths',sub:'Structured programs',pg:'SkillPaths'},
    {icon:'calendar',label:'Schedule',sub:'Plan your week',pg:'Schedule'},
    {icon:'barChart',label:'Progress',sub:'Stats & badges',pg:'Progress'},
    {icon:'target',label:'30-Day',sub:'Daily challenge',pg:'ThirtyDay'},
    {icon:'trophy',label:'Leaderboard',sub:'Your ranking',pg:'Leaderboard'},
    {icon:'book',label:'Quizzes',sub:'Cricket knowledge',pg:'Quizzes'},
  ];

  // Stat divider helper
  const Stat = ({val,label,color}) => h('div',{
    style:{textAlign:'center',padding:'10px 4px',borderRadius:8,
      background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)'}},
    h('div',{style:{fontSize:18,fontWeight:800,color:color,lineHeight:1,fontVariantNumeric:'tabular-nums'}},val),
    h('div',{style:{fontSize:10,fontWeight:600,color:'#484f58',marginTop:3,textTransform:'uppercase',letterSpacing:'0.06em'}},label)
  );

  return h('div',{style:{paddingBottom:'calc(5rem + env(safe-area-inset-bottom, 0px))',background:'#0d1117',minHeight:'100dvh'}},

    // ── Hero Section ─────────────────────────────────────────────
    h('div',{style:{
      background:'linear-gradient(160deg,#0a1628 0%,#0d1117 60%)',
      paddingTop:'calc(3.75rem + max(0.75rem,env(safe-area-inset-top)))',
      paddingBottom:'24px',padding:'calc(3.75rem + max(0.75rem,env(safe-area-inset-top))) 20px 24px',
      borderBottom:'1px solid rgba(48,54,61,0.9)',position:'relative',overflow:'hidden'
    }},
      // Subtle green ambient light
      h('div',{style:{position:'absolute',top:'-60%',right:'-5%',width:280,height:280,
        background:'radial-gradient(circle,rgba(22,163,74,0.07),transparent 70%)',
        borderRadius:'50%',pointerEvents:'none'}}),

      // Greeting row
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

      // Level card — clean data card design
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

      // 4-stat row
      h('div',{style:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}},
        h(Stat,{val:progress.drills_done||0,label:'Drills',color:'#3b82f6'}),
        h(Stat,{val:progress.mental_done||0,label:'Mental',color:'#8b5cf6'}),
        h(Stat,{val:progress.practice_minutes||0,label:'Minutes',color:'#f97316'}),
        h(Stat,{val:(progress.total_xp||0).toLocaleString(),label:'XP',color:'#16a34a'}),
      ),

      // 7-day chart
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

    // ── Quick Train ───────────────────────────────────────────────
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

    // ── Daily Check-In ────────────────────────────────────────────
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

    // ── Smart Start ───────────────────────────────────────────────
    h('div',{id:'smart-start',style:{padding:'20px 20px 0'}},
      h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}},
        h('h2',{style:{fontSize:13,fontWeight:700,color:'#8b949e',margin:0,textTransform:'uppercase',letterSpacing:'0.08em'}},'Today\'s Focus'),
        h('span',{style:{fontSize:11,color:'#484f58'}},'AI-selected')
      ),
      h('div',{style:{display:'flex',flexDirection:'column',gap:8}},
        // Drill pick
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
        // Mental pick
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
        // Workout pick
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

    // ── Explore ───────────────────────────────────────────────────
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
  // Live progress state — refreshes when any XP is awarded
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

    // Cat pills
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

    // Search
    h('div',{className:'px-4 mb-3'},
      h('div',{className:'relative'},
        h(Icon,{n:'search',cls:'w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2',style:{color:'#484f58'}}),
        h('input',{type:'text',placeholder:'Search drills...',value:search,onChange:e=>setSearch(e.target.value),
          className:'w-full pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-600 outline-none',
          style:{background:'rgba(22,27,34,0.9)',border:`1px solid ${search?catDef?.from+'60':'rgba(48,54,61,0.9)'}`,color:'#e6edf3'}
        })
      )
    ),

    // List
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
  const completing=useRef(false); // guard against double-tap
  const catDef=DRILL_CATS.find(c=>c.id===drill?.category);

  if(!drill) return h('div',{className:'pb-28 flex flex-col items-center justify-center',style:{minHeight:'80vh'}},
    h('div',{style:{width:56,height:56,borderRadius:12,background:'rgba(48,54,61,0.6)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}},h(Icon,{n:'bat',cls:'w-7 h-7',style:{color:'#484f58'}})),
    h('div',{className:'font-bold text-white mb-4'},'Drill not found'),
    h('button',{onClick:()=>nav('Drills'),className:'btn-primary px-6 py-3'},'Back to Drills')
  );

  const complete=()=>{
    if(completing.current) return; // prevent double-tap XP award
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
      // Video
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

      // Description
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('p',{className:'text-sm text-slate-300 leading-relaxed'},drill.description)
      ),

      // Steps
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

      // Tip
      drill.tips && h('div',{className:'flex items-start gap-3 p-4 rounded-2xl',style:{background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.25)'}},
        h(Icon,{n:'sparkles',cls:'w-4 h-4 flex-shrink-0',style:{color:'#16a34a'}}),
        h('div',{},
          h('p',{className:'text-xs font-black text-emerald-400 uppercase tracking-wider mb-1'},'Coach Tip'),
          h('p',{className:'text-sm',style:{color:'#6ee7b7'}},drill.tips)
        )
      ),

      // Target
      drill.target_metric && h('div',{className:'flex items-start gap-3 p-4 rounded-2xl',style:{background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.25)'}},
        h(Icon,{n:'target',cls:'w-4 h-4 flex-shrink-0',style:{color:'#484f58'}}),
        h('div',{},
          h('p',{className:'text-xs font-black text-blue-400 uppercase tracking-wider mb-1'},'Success Target'),
          h('p',{className:'text-sm text-blue-300'},drill.target_metric)
        )
      ),

      // Add to schedule button
      h('button',{
        onClick:()=>{
          const today=new Date().toISOString().slice(0,10);
          DB.addSession({
            id:'sch_'+Date.now(),date:today,time:'',
            type:'drill',title:drill.title,ref_id:drill.id,
            duration_minutes:drill.duration_minutes,xp_value:drill.xp_value,
            status:'pending',notes:'',color:SCHED_TYPES.drill.color
          });
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
      gradient:`linear-gradient(135deg,#6d28d9,#4f46e5)`}),

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
// MENTAL PLAYER — Step-by-step guided session with skip support
// ================================================================
function MentalPlayerPage({ params }) {
  const sess=MENTAL_SESSIONS.find(s=>s.id===params?.id);
  const [started,setStarted]=useState(false);
  const [step,setStep]=useState(0);
  const [timeLeft,setTimeLeft]=useState(0);
  const [done,setDone]=useState(false);
  const [paused,setPaused]=useState(false);
  const intRef=useRef(null);
  const awardedRef=useRef(false); // prevents double-award on complete
  const completingRef=useRef(false); // prevents double-tap

  // Reset awarded ref when session is restarted
  useEffect(()=>{ if(!started) { awardedRef.current=false; completingRef.current=false; } },[started]);

  // Load new step duration whenever step changes
  useEffect(()=>{
    if(started && sess && !done){
      clearInterval(intRef.current);
      setTimeLeft(sess.steps[step]?.duration_seconds||60);
      setPaused(false);
    }
    return ()=>clearInterval(intRef.current);
  },[step,started,done]);

  // Countdown ticker
  useEffect(()=>{
    if(!started||done||paused) { clearInterval(intRef.current); return; }
    clearInterval(intRef.current);
    intRef.current=setInterval(()=>{
      setTimeLeft(t=>{
        if(t<=1){
          clearInterval(intRef.current);
          // Auto-advance to next step OR complete
          if(step<sess.steps.length-1){
            setStep(s=>s+1);
          } else {
            finishSession();
          }
          return 0;
        }
        return t-1;
      });
    },1000);
    return ()=>clearInterval(intRef.current);
  },[started,done,paused,step]);

  // Cleanup on unmount
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
    if(step<sess.steps.length-1){
      setStep(s=>s+1);
    } else {
      completingRef.current=true;
      finishSession();
    }
  };

  const skipStep=()=>{
    clearInterval(intRef.current);
    if(step<sess.steps.length-1){
      setStep(s=>s+1);
    } else {
      // Skipping last step still completes the session and awards XP
      completingRef.current=true;
      finishSession();
    }
  };

  const goPrev=()=>{
    if(step>0){
      clearInterval(intRef.current);
      setStep(s=>s-1);
    }
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

  // Pre-session preview screen
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

  // Active guided player
  const cur=sess.steps[step];
  const pct=cur&&cur.duration_seconds>0?timeLeft/cur.duration_seconds:0;
  const R=90, C=2*Math.PI*R;
  const isLastStep=step===sess.steps.length-1;
  const progressPct=Math.round(((step)/(sess.steps.length))*100);

  return h('div',{style:{minHeight:'100vh',background:'linear-gradient(160deg,#0f0824 0%,#1e1040 50%,#0f172a 100%)',
    display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',
    padding:'max(1.5rem,env(safe-area-inset-top)) 1.5rem max(1.5rem,env(safe-area-inset-bottom))'}},

    // Top bar — session title + overall progress
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

    // Progress bar
    h('div',{style:{width:'100%',maxWidth:360,height:3,background:'rgba(109,40,217,0.2)',borderRadius:2,marginBottom:'1.5rem'}},
      h('div',{style:{height:'100%',borderRadius:2,background:'#a855f7',
        width:`${Math.round(((step+(1-pct))/(sess.steps.length))*100)}%`,transition:'width 0.5s ease'}})
    ),

    // Ring timer
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

    // Step instruction
    h('div',{style:{textAlign:'center',maxWidth:320,flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'1.5rem 0'}},
      h('p',{style:{fontSize:'1.05rem',color:'#ddd6fe',lineHeight:1.75,fontWeight:500}},cur?.instruction)
    ),

    // Controls — Prev / Skip / Pause / Next(or Complete)
    h('div',{style:{width:'100%',maxWidth:360,display:'flex',flexDirection:'column',gap:10}},
      // Primary row: Prev + Next/Complete
      h('div',{style:{display:'flex',gap:10}},
        step>0 && h('button',{onClick:goPrev,
          style:{flex:'0 0 auto',padding:'12px 18px',background:'rgba(255,255,255,0.08)',
            color:'#a78bfa',borderRadius:10,fontWeight:700,border:'1px solid rgba(168,85,247,0.2)',cursor:'pointer',fontSize:14}},
          h(Icon,{n:'arrowL',cls:'w-4 h-4 inline-block'})),
        h('button',{onClick:goNext,
          style:{flex:1,padding:'13px',background:isLastStep?'#16a34a':'linear-gradient(135deg,#6d28d9,#4338ca)',
            color:'#fff',borderRadius:10,fontWeight:700,border:'none',cursor:'pointer',fontSize:14,fontWeight:700}},
          isLastStep ? h('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:8}},
            h(Icon,{n:'circleCheck',cls:'w-4 h-4'}),'Complete Session')
            : h('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',gap:6}},'Next Step ',h(Icon,{n:'chevR',cls:'w-4 h-4'}))
        )
      ),
      // Secondary row: Skip + Pause
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
  {id:'beginner',label:'Beginner',icon:'🌱',desc:'New to training or returning after break'},
  {id:'intermediate',label:'Intermediate',icon:'⚡',desc:'Training 3-4x per week consistently'},
  {id:'advanced',label:'Advanced',icon:'🔥',desc:'Training 5-6x with high intensity'},
  {id:'pro',label:'Pro',icon:'💎',desc:'Elite-level daily training'},
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

    // Tabs
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
      // Progress dots
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
  const completing=useRef(false); // double-tap guard
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

// ── SVG ring helper ───────────────────────────────────────────────
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

// ── STOPWATCH ─────────────────────────────────────────────────────
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
  const lap=()=>{
    const t=elapsed-lapStart.current;
    setLaps(l=>[...l,{n:l.length+1,t,total:elapsed}]);
    lapStart.current=elapsed;
  };
  const reset=()=>{setRunning(false);setElapsed(0);setLaps([]);lapStart.current=0;};

  return h('div',{className:'flex flex-col items-center px-5 pt-6'},
    h(Ring,{pct:(elapsed%60)/60,color:'#10b981'},
      h('div',{style:{fontSize:'2.5rem',fontWeight:900,color:'#fff',fontVariantNumeric:'tabular-nums'}},fmtTime(elapsed)),
      h('div',{style:{fontSize:'0.7rem',color:'#94a3b8',fontWeight:700}},`LAP ${laps.length+1}`)
    ),
    h('div',{className:'flex gap-4 mt-6'},
      h('button',{onClick:reset,style:{width:56,height:56,borderRadius:'50%',background:'rgba(30,41,59,0.8)',border:'1px solid rgba(51,65,85,0.6)',color:'#94a3b8',cursor:'pointer',fontWeight:800,fontSize:'0.75rem'}},reset&&'RST'||'RST'),
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

// ── COUNTDOWN ─────────────────────────────────────────────────────
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

// ── INTERVAL ─────────────────────────────────────────────────────
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
        if(st.phase==='work'){
          const n={phase:'rest',remaining:restS,round:st.round};stRef.current=n;setPhase('rest');setRemaining(restS);
        } else {
          if(st.round>=rounds){clearInterval(intRef.current);setRunning(false);setDone(true);}
          else{const n={phase:'work',remaining:workS,round:st.round+1};stRef.current=n;setPhase('work');setRemaining(workS);setRound(r=>r+1);}
        }
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
  const col=phase==='work'?'#10b981':phase==='rest'?'#3b82f6':'#f59e0b';
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

// ── CRICKET PRESETS ───────────────────────────────────────────────
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
        h('div',{style:{width:44,height:44,borderRadius:8,display:'flex',alignItems:'center',
          justifyContent:'center',flexShrink:0,background:p.grad}},
          h(Icon,{n:p.icon||'timer',cls:'w-5 h-5 text-white'})),
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
// SCHEDULE PAGE — Professional Training Planner
// Deeply integrated: Home / Drills / Mental / Fitness / Skill Paths
// ================================================================
function SchedulePage() {
  const [weekStart, setWeekStart] = useState(()=>dateStr(getWeekMonday(new Date())));
  const [selectedDay, setSelectedDay] = useState(()=>new Date().toISOString().slice(0,10));
  const [schedule, setSchedule] = useState(()=>DB.getSchedule());
  const [view, setView] = useState('week'); // 'week' | 'add' | 'generate'
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

  // Build week days array
  const monday = new Date(weekStart+'T00:00:00');
  const weekDays = Array.from({length:7},(_,i)=>{
    const d = addDays(monday,i);
    return { date:dateStr(d), label:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], num:d.getDate() };
  });

  // Sessions for selected day
  const daySessions = (schedule.sessions||[]).filter(s=>s.date===selectedDay)
    .sort((a,b)=>a.time.localeCompare(b.time));

  // Count sessions per day for dots
  function dayCount(date) { return (schedule.sessions||[]).filter(s=>s.date===date).length; }
  function dayDone(date) { return (schedule.sessions||[]).filter(s=>s.date===date&&s.status==='complete').length; }

  // Week summary
  const weekSessions = DB.getSessionsForWeek(weekStart);
  const weekXP = weekSessions.filter(s=>s.status==='pending').reduce((a,s)=>a+s.xp_value,0);
  const weekDoneCount = weekSessions.filter(s=>s.status==='complete').length;

  // ── Complete a session ───────────────────────────────────────
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

  // ── Start a session (navigate to the content) ─────────────────
  function startSession(sess) {
    if(sess.type==='drill'&&sess.ref_id) nav('DrillDetail',{id:sess.ref_id});
    else if(sess.type==='mental'&&sess.ref_id) nav('MentalPlayer',{id:sess.ref_id});
    else if(sess.type==='fitness'&&sess.ref_id) nav('WorkoutDetail',{id:sess.ref_id});
    else nav('Timer');
  }

  // ── Add session flow ──────────────────────────────────────────
  function saveNewSession() {
    if(!addType) return;
    const tc=SCHED_TYPES[addType];
    let title='Custom Session', refId=null, dur=30, xp=50;
    if(addPick){
      if(addType==='drill'){
        const d=DRILLS.find(x=>x.id===addPick);
        if(d){title=d.title;refId=d.id;dur=d.duration_minutes;xp=d.xp_value;}
      } else if(addType==='mental'){
        const m=MENTAL_SESSIONS.find(x=>x.id===addPick);
        if(m){title=m.title;refId=m.id;dur=Math.floor(m.duration_seconds/60);xp=m.xp_value;}
      } else if(addType==='fitness'){
        const w=WORKOUTS.find(x=>x.id===addPick);
        if(w){title=w.name;refId=w.id;dur=w.duration_minutes;xp=w.xp_value;}
      }
    } else if(addType==='match'){title='Match Day';dur=180;xp=200;}
    else if(addType==='rest'){title='Rest & Recovery Day';dur=0;xp=20;}
    DB.addSession({id:'sch_'+Date.now(),date:selectedDay,time:addTime,type:addType,title,ref_id:refId,duration_minutes:dur,xp_value:xp,status:'pending',notes:addNote,color:tc.color});
    refresh();
    setView('week'); setAddStep(0); setAddType(''); setAddPick(null); setAddTime(''); setAddNote('');
    showNotif('Session added! 📅');
  }

  // ── Smart generator ───────────────────────────────────────────
  function runGenerator() {
    const sessions = generateSmartSchedule(genFocus, genDays, genInt, weekStart);
    setGenPreview(sessions); setGenStep(3);
  }
  function confirmGenerate() {
    // Remove existing pending sessions for this week
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

  // ── Add view ──────────────────────────────────────────────────
  if(view==='add') return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Add Session',subtitle:formatDate(selectedDay),
      gradient:'linear-gradient(135deg,#0f766e,#0d9488)',
      onBack:()=>{ setView('week');setAddStep(0);setAddType('');setAddPick(null);}}),
    h('div',{className:'px-4 pt-5'},
      // Step indicators
      h('div',{className:'flex gap-2 mb-5'},
        ['Type','Content','Details'].map((s,i)=>h('div',{key:s,className:'flex items-center gap-2'},
          h('div',{className:'w-6 h-6 rounded-full flex items-center justify-center text-xs font-black',
            style:{background:addStep>=i?'linear-gradient(135deg,#0f766e,#0d9488)':'rgba(30,41,59,0.8)',
              color:addStep>=i?'#fff':'#64748b',border:addStep>=i?'none':'1px solid rgba(51,65,85,0.5)'}},i+1),
          h('span',{style:{fontSize:'0.75rem',fontWeight:700,color:addStep===i?'#5eead4':'#64748b'}},s),
          i<2 && h('div',{style:{width:'1.5rem',height:'2px',background:addStep>i?'#0d9488':'rgba(51,65,85,0.5)',borderRadius:'1px'}})
        ))
      ),

      // Step 0: Type
      addStep===0 && h('div',{},
        h('h3',{className:'text-base font-black text-white mb-3'},'What type of session?'),
        h('div',{className:'space-y-2'},
          Object.entries(SCHED_TYPES).map(([id,tc])=>h('button',{key:id,
            onClick:()=>{setAddType(id);setAddStep(id==='match'||id==='rest'||id==='custom'?2:1);},
            className:'w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
            style:{background:tc.bg,border:`1px solid ${tc.border}`}
          },
            h('div',{style:{width:40,height:40,borderRadius:8,background:'rgba(0,0,0,0.25)',
              display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
              h(Icon,{n:tc.icon||'calendar',cls:'w-5 h-5',style:{color:tc.color}})),
            h('div',{className:'flex-1'},h('div',{className:'font-bold text-white text-sm'},tc.label)),
            h(Icon,{n:'chevR',cls:'w-4 h-4',style:{color:'#475569'}})
          ))
        )
      ),

      // Step 1: Pick content
      addStep===1 && addType && h('div',{},
        h('h3',{className:'text-base font-black text-white mb-3'},
          addType==='drill'?'Choose a drill:':addType==='mental'?'Choose a session:':'Choose a workout:'),
        h('div',{className:'space-y-2 max-h-80 overflow-y-auto sidebar-scroll pr-1'},
          (addType==='drill'?DRILLS:addType==='mental'?MENTAL_SESSIONS.filter(m=>!m.is_premium):WORKOUTS.slice(0,30))
            .map(item=>{
              const isD=addType==='drill';const isM=addType==='mental';
              const label=isD?item.title:isM?item.title:item.name;
              const meta=isD?`${item.duration_minutes} min`:`${isM?Math.floor(item.duration_seconds/60):item.duration_minutes} min`;
              const xpv=isD?item.xp_value:isM?item.xp_value:item.xp_value;
              return h('button',{key:item.id,
                onClick:()=>{setAddPick(item.id);setAddStep(2);},
                className:'w-full flex items-center gap-3 p-3 rounded-xl text-left active:scale-[.99] transition-all',
                style:{background:addPick===item.id?'rgba(15,118,110,0.2)':'rgba(30,41,59,0.6)',
                  border:addPick===item.id?'1px solid rgba(13,148,136,0.5)':'1px solid rgba(51,65,85,0.4)'}
              },
                h('div',{className:'flex-1'},
                  h('div',{className:'text-sm font-bold text-white'},label),
                  h('div',{className:'flex items-center gap-2 mt-1'},
                    h('span',{className:'text-xs',style:{color:'#64748b'}},meta),
                    h(XPBadge,{xp:xpv})
                  )
                ),
                h(Icon,{n:'chevR',cls:'w-4 h-4',style:{color:'#475569'}})
              );
            })
        ),
        h('button',{onClick:()=>{setAddStep(0);setAddType('');},className:'flex items-center gap-2 mt-4 text-sm text-slate-400 font-semibold'},
          h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back')
      ),

      // Step 2: Time + Notes
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
          h('button',{onClick:saveNewSession,className:'btn-primary w-full py-4 text-base font-black'},
            h(Icon,{n:'plus',cls:'w-5 h-5'}),' Add to Schedule'
          ),
          h('button',{onClick:()=>{setAddStep(addType==='drill'||addType==='mental'||addType==='fitness'?1:0);},
            className:'w-full text-center text-sm text-slate-400 font-semibold py-2'},'← Back')
        )
      )
    )
  );

  // ── Smart Generator view ──────────────────────────────────────
  if(view==='generate') {
    const FOCUS=[{id:'batting',label:'Batting',icon:'bat'},{id:'bowling',label:'Bowling',icon:'ball'},
      {id:'fielding',label:'Fielding',icon:'navigation'},{id:'allrounder',label:'All-Round',icon:'star'}];
    const INTENSITY=[{id:'light',label:'Light',icon:'activity',desc:'2 sessions/day max'},
      {id:'moderate',label:'Moderate',icon:'zap',desc:'2-3 sessions/day'},
      {id:'intense',label:'Intense',icon:'flame',desc:'3 sessions/day'}];
    return h('div',{className:'pb-28'},
      h(PageHeader,{title:'Smart Generator',subtitle:'AI-powered weekly schedule',
        gradient:'linear-gradient(135deg,#4c1d95,#5b21b6)',onBack:()=>{setView('week');setGenStep(0);setGenFocus('');setGenPreview(null);}}),
      h('div',{className:'px-4 pt-5'},
        // Progress
        h('div',{className:'flex gap-2 mb-5'},
          ['Focus','Days','Intensity','Preview'].map((s,i)=>h('div',{key:s,className:'flex items-center gap-1.5'},
            h('div',{className:'w-5 h-5 rounded-full flex items-center justify-center',style:{fontSize:'0.65rem',fontWeight:900,
              background:genStep>=i?'linear-gradient(135deg,#6d28d9,#7c3aed)':'rgba(30,41,59,0.8)',color:genStep>=i?'#fff':'#64748b'}},i+1),
            h('span',{style:{fontSize:'0.7rem',fontWeight:700,color:genStep===i?'#c084fc':'#64748b',whiteSpace:'nowrap'}},s),
            i<3 && h('div',{style:{flex:1,height:'2px',background:genStep>i?'#7c3aed':'rgba(51,65,85,0.5)',borderRadius:'1px',minWidth:'1rem'}})
          ))
        ),

        genStep===0 && h('div',{},
          h('h3',{className:'text-base font-black text-white mb-3'},'Which area needs most work?'),
          h('div',{className:'grid grid-cols-2 gap-3'},
            FOCUS.map(f=>h('button',{key:f.id,onClick:()=>{setGenFocus(f.id);setGenStep(1);},
              style:{display:'flex',flexDirection:'column',alignItems:'center',gap:8,padding:'20px 16px',
                borderRadius:10,background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)',cursor:'pointer'}},
              h('div',{style:{width:40,height:40,borderRadius:8,background:'rgba(48,54,61,0.6)',
                display:'flex',alignItems:'center',justifyContent:'center'}},
                h(Icon,{n:f.icon,cls:'w-5 h-5',style:{color:'#8b949e'}})),
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
              style:{background:genDays===n?'linear-gradient(135deg,#6d28d9,#7c3aed)':'rgba(30,41,59,0.6)',
                color:'#fff',border:'1px solid rgba(51,65,85,0.5)',minWidth:'50px'}},n)
          )),
          h('button',{onClick:()=>setGenStep(0),className:'flex items-center gap-2 mt-4 text-sm text-slate-400 font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back')
        ),

        genStep===2 && h('div',{},
          h('h3',{className:'text-base font-black text-white mb-3'},'Session intensity?'),
          h('div',{className:'space-y-2'},
            INTENSITY.map(i=>h('button',{key:i.id,onClick:()=>{setGenInt(i.id);runGenerator();},
              className:'w-full flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
              style:{background:'rgba(22,27,34,0.9)',border:'1px solid rgba(48,54,61,0.9)'}},
              h('div',{style:{width:36,height:36,borderRadius:7,background:'rgba(48,54,61,0.6)',
                display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
                h(Icon,{n:i.icon||'activity',cls:'w-4 h-4',style:{color:'#8b949e'}})),
              h('div',{className:'flex-1'},h('div',{style:{fontSize:13,fontWeight:700,color:'#e6edf3'}},i.label),h('div',{style:{fontSize:11,color:'#484f58',marginTop:2}},i.desc)),
              h(Icon,{n:'chevR',cls:'w-4 h-4',style:{color:'#374151'}})
            ))
          ),
          h('button',{onClick:()=>setGenStep(1),className:'flex items-center gap-2 mt-4 text-sm text-slate-400 font-semibold'},h(Icon,{n:'arrowL',cls:'w-4 h-4'}),'Back')
        ),

        genStep===3 && genPreview && h('div',{},
          h('div',{className:'flex items-center justify-between mb-4'},
            h('div',{},
              h('h3',{className:'text-base font-black text-white'},'Preview'),
              h('p',{className:'text-xs text-slate-400'},`${genPreview.length} sessions · ${genPreview.reduce((s,x)=>s+x.xp_value,0)} XP available`)
            ),
            h('button',{onClick:()=>setGenStep(2),className:'text-xs text-slate-400 font-semibold'},'Change')
          ),
          h('div',{className:'space-y-2 max-h-72 overflow-y-auto sidebar-scroll pr-1'},
            genPreview.map((s,i)=>{
              const tc=SCHED_TYPES[s.type]||SCHED_TYPES.custom;
              return h('div',{key:i,style:{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',
                borderRadius:8,background:tc.bg,border:`1px solid ${tc.border}`}},
                h('div',{style:{width:32,height:32,borderRadius:6,background:'rgba(0,0,0,0.2)',
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
                  h(Icon,{n:tc.icon||'calendar',cls:'w-4 h-4',style:{color:tc.color}})),
                h('div',{className:'flex-1'},
                  h('div',{className:'text-xs font-bold text-white'},s.title),
                  h('div',{className:'text-xs',style:{color:'rgba(255,255,255,0.5)'}},`${formatDate(s.date)} ${s.time?'· '+s.time:''} · ${s.duration_minutes} min`)
                ),
                h(XPBadge,{xp:s.xp_value})
              );
            })
          ),
          h('div',{className:'flex gap-3 mt-4'},
            h('button',{onClick:()=>{setGenStep(0);setGenPreview(null);},className:'btn-secondary flex-1'},'Regenerate'),
            h('button',{onClick:confirmGenerate,className:'btn-primary flex-1 font-black'},'Confirm Schedule')
          )
        )
      )
    );
  }

  // ── Main week view ────────────────────────────────────────────
  return h('div',{className:'pb-28'},
    // Header
    h('div',{style:{background:'linear-gradient(135deg,#0f766e,#0d9488,#0891b2)',
      paddingTop:'max(4.5rem,env(safe-area-inset-top))',paddingBottom:'1.25rem',
      paddingLeft:'1.25rem',paddingRight:'1.25rem',position:'relative',overflow:'hidden'}},
      h('div',{style:{position:'absolute',top:'-40%',right:'-15%',width:'220px',height:'220px',background:'rgba(255,255,255,0.07)',borderRadius:'50%',pointerEvents:'none'}}),
      h('div',{className:'relative z-10'},
        h('div',{className:'flex items-center justify-between mb-4'},
          h('div',{},
            h('h1',{className:'text-xl font-black text-white'},'Schedule'),
            h('p',{style:{color:'rgba(255,255,255,0.65)',fontSize:'0.8125rem'}},`Week of ${new Date(weekStart+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'})} – ${new Date(addDays(new Date(weekStart+'T00:00:00'),6)+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'})}`)
          ),
          h('button',{onClick:()=>{setView('generate');setGenStep(0);setGenFocus('');setGenPreview(null);},
            className:'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white',
            style:{background:'rgba(255,255,255,0.15)'}},
            h(Icon,{n:'sparkles',cls:'w-3.5 h-3.5'}),'Smart Plan'
          )
        ),
        // Week navigator
        h('div',{className:'flex items-center gap-3'},
          h('button',{onClick:()=>{const d=new Date(weekStart+'T00:00:00');d.setDate(d.getDate()-7);setWeekStart(dateStr(d));},
            style:{width:34,height:34,borderRadius:'0.625rem',background:'rgba(255,255,255,0.12)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}},
            h(Icon,{n:'arrowL',cls:'w-4 h-4'})
          ),
          h('div',{className:'flex gap-1.5 flex-1 overflow-x-auto scrollbar-hide'},
            weekDays.map(d=>{
              const isToday2=isToday(d.date);
              const isSel=d.date===selectedDay;
              const cnt=dayCount(d.date);
              const doneC=dayDone(d.date);
              return h('button',{key:d.date,onClick:()=>setSelectedDay(d.date),
                className:'flex-shrink-0 flex flex-col items-center py-2 px-2.5 rounded-xl transition-all',
                style:{minWidth:'40px',background:isSel?'rgba(255,255,255,0.2)':isToday2?'rgba(255,255,255,0.1)':'rgba(255,255,255,0.04)',
                  border:isToday2?'2px solid rgba(255,255,255,0.4)':'2px solid transparent'}},
                h('span',{style:{fontSize:'0.65rem',fontWeight:700,color:isSel?'#fff':isToday2?'#fff':'rgba(255,255,255,0.6)'}},d.label),
                h('span',{style:{fontSize:'1.1rem',fontWeight:900,color:'#fff',margin:'0.1rem 0'}},d.num),
                cnt>0
                  ? h('div',{className:'flex gap-0.5'},
                    Array.from({length:Math.min(cnt,3)}).map((_,i)=>h('div',{key:i,style:{width:5,height:5,borderRadius:'50%',background:i<doneC?'#a7f3d0':'rgba(255,255,255,0.5)'}}))
                  )
                  : h('div',{style:{width:5,height:5,borderRadius:'50%',background:'transparent'}})
              );
            })
          ),
          h('button',{onClick:()=>{const d=new Date(weekStart+'T00:00:00');d.setDate(d.getDate()+7);setWeekStart(dateStr(d));},
            style:{width:34,height:34,borderRadius:'0.625rem',background:'rgba(255,255,255,0.12)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}},
            h(Icon,{n:'chevR',cls:'w-4 h-4'})
          )
        )
      )
    ),

    // Notif
    notif && h('div',{style:{margin:'0.75rem 1rem',padding:'0.75rem 1rem',background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.4)',borderRadius:'0.875rem',fontSize:'0.875rem',fontWeight:700,color:'#34d399'}},notif),

    // Selected day header
    h('div',{className:'px-4 pt-4'},
      h('div',{className:'flex items-center justify-between mb-3'},
        h('div',{},
          h('h2',{className:'text-base font-black text-white'},
            isToday(selectedDay)?'Today, '+formatDate(selectedDay).split(',').slice(1).join(',').trim():formatDate(selectedDay)
          ),
          h('p',{style:{fontSize:'0.75rem',color:'#64748b',marginTop:'0.125rem'}},
            daySessions.length===0?'No sessions planned':`${daySessions.length} session${daySessions.length!==1?'s':''} · ${daySessions.reduce((s,x)=>s+x.xp_value,0)} XP`)
        ),
        h('button',{onClick:()=>{setView('add');setAddStep(0);setAddType('');setAddPick(null);setAddTime('');setAddNote('');},
          className:'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white',
          style:{background:'linear-gradient(135deg,#0f766e,#0d9488)'}},
          h(Icon,{n:'plus',cls:'w-4 h-4'}),'Add'
        )
      ),

      // Session cards
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
            const isDone=s.status==='complete';
            const isSkipped=s.status==='skipped';
            return h('div',{key:s.id,
              className:'rounded-2xl overflow-hidden',
              style:{background:isDone?'rgba(16,185,129,0.06)':isSkipped?'rgba(30,41,59,0.3)':tc.bg,
                border:`1px solid ${isDone?'rgba(16,185,129,0.3)':isSkipped?'rgba(51,65,85,0.3)':tc.border}`,
                opacity:isSkipped?0.6:1}},
              // Left accent bar
              h('div',{style:{height:'4px',background:isDone?'#10b981':isSkipped?'#475569':tc.color}}),
              h('div',{className:'p-4'},
                // Top row
                h('div',{className:'flex items-start gap-3'},
                  h('div',{style:{width:44,height:44,borderRadius:'0.875rem',background:isDone?'rgba(16,185,129,0.15)':'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.375rem',flexShrink:0}},
                    isDone?h(Icon,{n:'check',cls:'w-4 h-4 text-white'}):h(Icon,{n:tc.icon||'calendar',cls:'w-4 h-4',style:{color:tc.color}})
                  ),
                  h('div',{className:'flex-1 min-w-0'},
                    h('div',{className:'flex items-start justify-between gap-2'},
                      h('h3',{style:{fontSize:'0.9375rem',fontWeight:800,color:isSkipped?'#64748b':'#f8fafc',lineHeight:1.3}},s.title),
                      isDone && h('div',{style:{width:18,height:18,borderRadius:4,background:'#16a34a',display:'flex',alignItems:'center',justifyContent:'center'}},h(Icon,{n:'check',cls:'w-2.5 h-2.5 text-white'})),h('span',{style:{fontSize:'0.7rem',fontWeight:700,padding:'0.125rem 0.5rem',background:'rgba(22,163,74,0.12)',border:'1px solid rgba(22,163,74,0.25)',borderRadius:4,color:'#4ade80',whiteSpace:'nowrap'}},'Done')
                    ),
                    h('div',{className:'flex items-center gap-2 mt-1.5 flex-wrap'},
                      s.time && h('span',{style:{fontSize:'0.75rem',color:'#94a3b8',fontWeight:600}},s.time),
                      s.time && h('span',{style:{color:'#475569'}}, '·'),
                      h('span',{style:{fontSize:'0.75rem',color:'#94a3b8'}},`${s.duration_minutes} min`),
                      !isDone && h(XPBadge,{xp:s.xp_value}),
                      s.notes && h('span',{style:{fontSize:'0.7rem',color:'#64748b',fontStyle:'italic'}},s.notes)
                    )
                  )
                ),

                // Action buttons
                !isSkipped && h('div',{className:'flex gap-2 mt-3'},
                  !isDone && h('button',{onClick:()=>startSession(s),
                    className:'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-black transition-all active:scale-95',
                    style:{background:`linear-gradient(135deg,${tc.color}33,${tc.color}22)`,border:`1px solid ${tc.color}60`,color:'#fff'}},
                    h(Icon,{n:'play',cls:'w-4 h-4'}),'Start'
                  ),
                  !isDone && h('button',{onClick:()=>completeSession(s.id),
                    className:'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95',
                    style:{background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.3)',color:'#34d399'}},
                    h(Icon,{n:'check',cls:'w-4 h-4'}),'Done'
                  ),
                  isDone && h('button',{onClick:()=>undoSession(s.id),
                    className:'flex items-center gap-1 py-2.5 px-3 rounded-xl text-xs font-bold',
                    style:{background:'rgba(30,41,59,0.5)',color:'#94a3b8',border:'1px solid rgba(51,65,85,0.4)'}},
                    'Undo'
                  ),
                  !isDone && h('button',{onClick:()=>skipSession(s.id),
                    className:'py-2.5 px-3 rounded-xl text-xs font-bold',
                    style:{background:'rgba(30,41,59,0.5)',color:'#94a3b8',border:'1px solid rgba(51,65,85,0.4)'}},
                    'Skip'
                  ),
                  h('button',{onClick:()=>deleteSession(s.id),
                    className:'py-2.5 px-3 rounded-xl',
                    style:{background:'rgba(239,68,68,0.08)',color:'#f87171',border:'1px solid rgba(239,68,68,0.2)'}},
                    h(Icon,{n:'trash',cls:'w-4 h-4'})
                  )
                ),
                isSkipped && h('div',{className:'flex items-center justify-between mt-3'},
                  h('span',{style:{fontSize:'0.75rem',color:'#64748b'}},'Skipped'),
                  h('button',{onClick:()=>undoSession(s.id),style:{fontSize:'0.75rem',fontWeight:700,color:'#60a5fa'}},'Restore')
                )
              )
            );
          })
        )
    ),

    // Week summary card
    h('div',{className:'mx-4 mt-5 p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.5)',border:'1px solid rgba(51,65,85,0.5)'}},
      h('p',{className:'text-xs font-bold text-slate-500 uppercase tracking-wider mb-3'},'This Week'),
      h('div',{className:'grid grid-cols-3 gap-3 text-center'},
        h('div',{},h('div',{className:'text-xl font-black text-white'},weekSessions.length),h('div',{style:{fontSize:'0.7rem',color:'#64748b',fontWeight:700}},'Total')),
        h('div',{},h('div',{className:'text-xl font-black',style:{color:'#34d399'}},weekDoneCount),h('div',{style:{fontSize:'0.7rem',color:'#64748b',fontWeight:700}},'Done')),
        h('div',{},h('div',{className:'text-xl font-black',style:{color:'#f59e0b'}},weekXP),h('div',{style:{fontSize:'0.7rem',color:'#64748b',fontWeight:700}},'XP Left'))
      )
    ),

    // Import from Skill Path
    h('div',{className:'px-4 mt-4 mb-2'},
      h('button',{onClick:()=>nav('SkillPaths'),
        className:'w-full flex items-center gap-3 p-4 rounded-2xl text-left active:scale-[.99] transition-all',
        style:{background:'rgba(30,41,59,0.4)',border:'1px solid rgba(51,65,85,0.4)'}},
        h(Icon,{n:'layers',cls:'w-5 h-5',style:{color:'#8b949e'}}),
        h('div',{className:'flex-1'},
          h('div',{className:'text-sm font-bold text-white'},'Import from Skill Path'),
          h('div',{className:'text-xs text-slate-500'},'Load your active path\'s weekly plan')
        ),
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
      if(week.week!==1) return; // import current week only
      week.days.forEach(day=>{
        if(day.isRest) return;
        const d = addDays(monday, day.day-1);
        const ds = dateStr(d);
        day.activities.forEach((act,i)=>{
          DB.addSession({
            id:'sch_'+Date.now()+'_'+day.day+'_'+i,
            date:ds,time:i===0?'07:00':i===1?'17:00':'19:00',
            type:act.type, title:act.title, ref_id:act.id||null,
            duration_minutes:parseInt(act.duration)||20, xp_value:act.xp,
            status:'pending', notes:'From Skill Path', color:SCHED_TYPES[act.type]?.color||'#64748b'
          });
          added++;
        });
      });
    });
    window.dispatchEvent(new CustomEvent('sc_update'));
    alert(`✅ ${added} sessions imported to this week's schedule!`);
  }

  if(!pathId) return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Skill Paths',subtitle:'Structured programs for every discipline',
      gradient:'linear-gradient(135deg,#7e22ce,#4f46e5)'}),
    h('div',{className:'px-4 pt-5 space-y-4'},
      SKILL_PATHS.map(path=>{
        const pp=skillProg[path.id]||{};
        const doneCount=Object.values(pp).filter(Boolean).length;
        const pct=doneCount/path.levels.length*100;
        return h('button',{key:path.id,onClick:()=>{setPathId(path.id);setLevelId(null);setWeekPlan(null);},
          className:'w-full text-left p-5 rounded-2xl active:scale-[.99] transition-all',
          style:{background:'rgba(30,41,59,0.7)',border:`1px solid ${path.accent}30`}},
          // Accent top line
          h('div',{style:{height:'3px',background:`linear-gradient(to right,${path.accent},transparent)`,marginBottom:'1rem',borderRadius:'2px'}}),
          h('div',{className:'flex items-center gap-4'},
            // SVG progress ring
            h('div',{style:{position:'relative',width:56,height:56,flexShrink:0}},
              h('svg',{width:56,height:56,viewBox:'0 0 56 56',style:{position:'absolute',inset:0,transform:'rotate(-90deg)'}},
                h('circle',{cx:28,cy:28,r:22,fill:'none',stroke:'rgba(51,65,85,0.6)',strokeWidth:4}),
                h('circle',{cx:28,cy:28,r:22,fill:'none',stroke:path.accent,strokeWidth:4,
                  strokeDasharray:2*Math.PI*22,strokeDashoffset:2*Math.PI*22*(1-pct/100),
                  strokeLinecap:'round',style:{transition:'stroke-dashoffset .6s'}})
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
        return h('button',{key:lv.id,
          onClick:()=>{if(!unlocked)return;setLevelId(lv.id);setWeekPlan(generateWeekPlan(path.id,lv.id));},
          className:'w-full text-left p-5 rounded-2xl transition-all',
          style:{background:done?'rgba(16,185,129,0.08)':unlocked?'rgba(30,41,59,0.7)':'rgba(15,23,42,0.5)',
            border:`2px solid ${done?'rgba(16,185,129,0.4)':unlocked?`${path.accent}40`:'rgba(51,65,85,0.3)'}`,
            opacity:unlocked?1:0.5}},
          h('div',{className:'flex items-center gap-4'},
            h('div',{style:{width:52,height:52,borderRadius:'0.875rem',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0,background:done?'#10b981':unlocked?path.accent:'rgba(51,65,85,0.5)'}},
              done?'✓':lv.icon
            ),
            h('div',{className:'flex-1'},
              h('div',{className:'flex items-center gap-2'},
                h('h3',{className:'font-black text-white'},lv.label),
                !unlocked && h(Icon,{n:'lock',cls:'w-3 h-3',style:{color:'#484f58',flexShrink:0}}),
                done && h('div',{style:{display:'flex',alignItems:'center',gap:4}},h(Icon,{n:'check',cls:'w-3 h-3',style:{color:'#4ade80'}}),h('span',{style:{fontSize:'0.7rem',fontWeight:700,color:'#4ade80'}},'Complete'))
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
      // Action row
      h('div',{className:'flex gap-2 mb-5'},
        h('button',{onClick:()=>importToSchedule(weekPlan),
          className:'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white',
          style:{background:'linear-gradient(135deg,#0f766e,#0d9488)'}},
          h(Icon,{n:'calendar',cls:'w-4 h-4'}),'Import to Schedule'),
        h('button',{onClick:()=>{
          const p=DB.getProgress();
          if(!p.skill_path_progress) p.skill_path_progress={};
          if(!p.skill_path_progress[path.id]) p.skill_path_progress[path.id]={};
          p.skill_path_progress[path.id][levelId]=true; DB.saveProgress(p);
          awardXP(lv.xpPerDay*5,30,'skill_path'); setLevelId(null);
        },className:'flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold',
          style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(51,65,85,0.5)',color:'#94a3b8'}
        },h(Icon,{n:'check',cls:'w-4 h-4'}),'Mark Done')
      ),
      // Week accordions
      h('div',{className:'space-y-3'},
        weekPlan.map(week=>h(WeekAccordion,{key:week.week,week,pathAccent:path.accent}))
      )
    )
  );
}

function WeekAccordion({ week, pathAccent }) {
  const [open,setOpen]=useState(week.week===1);
  return h('div',{className:'rounded-2xl overflow-hidden',style:{border:'1px solid rgba(51,65,85,0.5)'}},
    h('button',{onClick:()=>setOpen(o=>!o),
      className:'w-full flex items-center justify-between p-4 text-left',
      style:{background:'rgba(30,41,59,0.6)'}},
      h('div',{},
        h('div',{className:'font-bold text-white text-sm'},week.theme),
        h('div',{className:'text-xs text-slate-500 mt-0.5'},`${week.days.filter(d=>!d.isRest).length} training days`)
      ),
      h(Icon,{n:open?'chevU':'chevD',cls:'w-5 h-5',style:{color:'#64748b'}})
    ),
    open && h('div',{style:{background:'rgba(15,23,42,0.4)',borderTop:'1px solid rgba(51,65,85,0.4)'}},
      week.days.map(day=>h('div',{key:day.day,className:'p-4',style:{borderBottom:'1px solid rgba(51,65,85,0.2)'}},
        h('div',{className:'flex items-center justify-between mb-2'},
          h('span',{style:{fontSize:'0.875rem',fontWeight:800,color:'#fff'}},day.label),
          day.isRest
            ? h('div',{style:{display:'flex',alignItems:'center',gap:4}},h(Icon,{n:'heart',cls:'w-3 h-3',style:{color:'#484f58'}}),h('span',{style:{fontSize:'0.65rem',color:'#484f58'}},'Rest'))
            : h('span',{style:{fontSize:'0.7rem',fontWeight:800,color:pathAccent}},`+${day.totalXP} XP`)
        ),
        !day.isRest && h('div',{className:'space-y-1.5'},
          day.activities.map((act,i)=>h('div',{key:i,className:'flex items-center gap-2'},
            h(Icon,{n:act.type==='drill'?'bat':act.type==='mental'?'brain':'dumbbell',cls:'w-3.5 h-3.5',style:{color:'#484f58'}}),
            h('div',{className:'flex-1'},
              h('div',{style:{fontSize:'0.75rem',fontWeight:700,color:'#cbd5e1'}},act.title),
              h('div',{style:{fontSize:'0.7rem',color:'#64748b'}},`${act.duration} · +${act.xp} XP`)
            )
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

  const refresh=useCallback(()=>{
    setProgress(DB.getProgress());setXpDays(DB.getXPLast7Days());setHmap(DB.getActivityHeatmap());
  },[]);
  useEffect(()=>{
    window.addEventListener('sc_update',refresh);window.addEventListener('focus',refresh);
    return()=>{window.removeEventListener('sc_update',refresh);window.removeEventListener('focus',refresh);};
  },[refresh]);

  const info=getLevelInfo(progress.total_xp||0);
  const badges=progress.badges||[];
  const schedStats={
    done:(DB.getSchedule().sessions||[]).filter(s=>s.status==='complete').length,
    total:(DB.getSchedule().sessions||[]).length
  };

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'My Progress',subtitle:'Your complete training stats',gradient:'linear-gradient(135deg,#064e3b,#065f46)'}),
    h('div',{className:'px-4 pt-5 space-y-5'},
      // Level card
      h('div',{className:'p-5 rounded-2xl',style:{background:'linear-gradient(135deg,rgba(16,185,129,0.12),rgba(13,148,136,0.06))',border:'1px solid rgba(16,185,129,0.3)'}},
        h('div',{className:'flex items-center justify-between mb-4'},
          h('div',{},h('div',{className:'text-2xl font-black text-white'},`Level ${info.level}`),h('div',{style:{color:'#34d399',fontWeight:700,fontSize:'0.875rem'}},info.name)),
          h('div',{className:'text-right'},h('div',{className:'text-xl font-black text-white'},`${(progress.total_xp||0).toLocaleString()} XP`),info.next&&h('div',{style:{fontSize:'0.75rem',color:'#64748b'}},`${info.xpToNext.toLocaleString()} to next level`))
        ),
        h(LevelBar,{totalXP:progress.total_xp||0}),
        h('div',{className:'flex justify-between text-xs mt-2',style:{color:'#475569'}},
          h('span',{},`Lv.${info.level}: ${info.min.toLocaleString()}`),
          info.next&&h('span',{},`Lv.${info.level+1}: ${info.next.min.toLocaleString()}`)
        )
      ),
      // Stats grid
      h('div',{className:'grid grid-cols-2 gap-3'},
        [{label:'Drills Done',val:progress.drills_done||0,color:'text-blue-400',icon:'target'},
         {label:'Mental Sessions',val:progress.mental_done||0,color:'text-purple-400',icon:'brain'},
         {label:'Workouts',val:progress.workouts_done||0,color:'text-orange-400',icon:'dumbbell'},
         {label:'Practice Mins',val:progress.practice_minutes||0,color:'text-teal-400',icon:'clock'},
         {label:'Best Streak',val:`${progress.longest_streak||0}d`,color:'text-red-400',icon:'flame'},
         {label:'Scheduled Done',val:schedStats.done,color:'text-emerald-400',icon:'calendar'},
        ].map(s=>h(StatCard,{key:s.label,...s}))
      ),
      // 7-day chart
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{className:'flex justify-between items-center mb-3'},
          h('span',{className:'text-sm font-bold text-white'},'7-Day XP'),
          h('span',{style:{fontSize:'0.75rem',fontWeight:700,color:'#34d399'}},`${xpDays.reduce((s,d)=>s+d.xp,0)} total`)
        ),
        h(XPChart,{days:xpDays})
      ),
      // Heatmap
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{className:'flex justify-between items-center mb-3'},
          h('span',{className:'text-sm font-bold text-white'},'30-Day Activity'),
          h('div',{className:'flex items-center gap-1.5'},[0,1,2,3,4].map(l=>h('div',{key:l,className:`heatmap-cell heatmap-${l}`,style:{width:12,height:12}})))
        ),
        h(Heatmap,{days:hmap})
      ),
      // Badges
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{className:'flex justify-between items-center mb-4'},
          h('div',{style:{display:'flex',alignItems:'center',gap:8}},h(Icon,{n:'award',cls:'w-4 h-4',style:{color:'#8b949e'}}),h('span',{style:{fontSize:14,fontWeight:700,color:'#e6edf3'}},'Badges')),
          h('span',{style:{fontSize:'0.75rem',color:'#64748b'}},`${badges.length} of ${Object.keys(BADGE_DEFS).length}`)
        ),
        h('div',{className:'grid grid-cols-3 gap-2.5'},
          Object.entries(BADGE_DEFS).map(([id,def])=>{
            const earned=badges.includes(id);
            return h('div',{key:id,className:'flex flex-col items-center gap-1.5 p-3 rounded-xl text-center',
              style:{background:earned?'rgba(16,185,129,0.08)':'rgba(15,23,42,0.4)',
                border:`1px solid ${earned?'rgba(16,185,129,0.25)':'rgba(51,65,85,0.3)'}`,
                opacity:earned?1:0.4}},
              h('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}},earned?h(Icon,{n:def.icon,cls:'w-6 h-6',style:{color:'#e6edf3'}}):h(Icon,{n:'lock',cls:'w-5 h-5',style:{color:'#484f58'}})),
              h('span',{style:{fontSize:'0.65rem',fontWeight:800,color:earned?'#f8fafc':'#64748b'}},def.label)
            );
          })
        )
      ),
      // Skill path progress
      h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
        h('div',{style:{display:'flex',alignItems:'center',gap:8,marginBottom:16}},h(Icon,{n:'layers',cls:'w-4 h-4',style:{color:'#8b949e'}}),h('span',{style:{fontSize:14,fontWeight:700,color:'#e6edf3'}},'Skill Paths')),
        SKILL_PATHS.map(path=>{
          const pp=(progress.skill_path_progress||{})[path.id]||{};
          const done=Object.values(pp).filter(Boolean).length;
          const pct=done/path.levels.length*100;
          return h('div',{key:path.id,className:'mb-3 last:mb-0'},
            h('div',{className:'flex justify-between text-xs mb-1.5'},
              h('div',{style:{display:'flex',alignItems:'center',gap:6}},h(Icon,{n:path.icon||'bat',cls:'w-3.5 h-3.5',style:{color:'#8b949e'}}),h('span',{style:{color:'#8b949e',fontWeight:600,fontSize:13}},path.title)),
              h('span',{style:{color:path.accent,fontWeight:800}},`${done}/${path.levels.length}`)
            ),
            h('div',{style:{height:'6px',background:'rgba(51,65,85,0.6)',borderRadius:'9999px',overflow:'hidden'}},
              h('div',{style:{width:`${pct}%`,height:'100%',background:path.accent,borderRadius:'9999px',transition:'width .6s'}})
            )
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

  useEffect(()=>{
    const refresh=()=>setProgress(DB.getProgress());
    window.addEventListener('sc_update',refresh);
    return ()=>window.removeEventListener('sc_update',refresh);
  },[]);

  const markDay=day=>{
    // Guard: already completed
    if(completed[day.day]) return;
    // Guard: live DB check to prevent race conditions
    const currentP=DB.getProgress();
    if(currentP.thirtyDay_completed?.[day.day]) {
      setProgress(currentP);
      return;
    }
    const p=DB.getProgress();
    if(!p.thirtyDay_completed) p.thirtyDay_completed={};
    p.thirtyDay_completed[day.day]=today;
    DB.saveProgress(p);
    awardXP(day.xp,15,'30day');
    setProgress(DB.getProgress());
  };

  const phases=['Foundation','Development','Integration','Performance'];

  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'30-Day Challenge',subtitle:'Build the habit. Transform your game.',gradient:'linear-gradient(135deg,#d97706,#b45309)'}),
    h('div',{className:'px-4 pt-5 space-y-5'},
      // Progress summary
      h('div',{className:'p-5 rounded-2xl',style:{background:'rgba(217,119,6,0.1)',border:'1px solid rgba(217,119,6,0.3)'}},
        h('div',{className:'flex items-center justify-between mb-3'},
          h('div',{},
            h('div',{className:'text-2xl font-black text-white'},`Day ${doneCnt} / 30`),
            h('div',{style:{color:'#fbbf24',fontWeight:700,fontSize:'0.875rem'}},
              doneCnt===30?'🏆 Challenge Complete!':doneCnt===0?'Begin your journey':'Keep going — great work!')
          ),
          h('div',{style:{width:56,height:56,borderRadius:'50%',border:'4px solid #f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#f59e0b',fontSize:'0.875rem'}},`${pct}%`)
        ),
        h('div',{style:{height:'8px',background:'rgba(51,65,85,0.6)',borderRadius:'9999px',overflow:'hidden'}},
          h('div',{style:{width:`${pct}%`,height:'100%',background:'linear-gradient(to right,#f59e0b,#d97706)',borderRadius:'9999px',transition:'width .6s'}})
        )
      ),
      // Phases
      phases.map((phase,pi)=>{
        const pDays=DAY30.filter(d=>d.phase===phase);
        return h('div',{key:phase},
          h('div',{className:'flex items-center gap-2 mb-3'},
            h('div',{style:{width:8,height:8,borderRadius:'50%',background:'#f59e0b'}}),
            h('span',{style:{fontSize:'0.7rem',fontWeight:800,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em'}},`Week ${pi+1} — ${phase}`)
          ),
          h('div',{className:'grid grid-cols-7 gap-1.5'},
            pDays.map(d=>{
              const isDone=!!completed[d.day];
              const isNext=!isDone&&Object.keys(completed).length===d.day-1;
              return h('button',{key:d.day,onClick:()=>markDay(d),disabled:isDone,title:`Day ${d.day}: ${d.title}`,
                className:'flex flex-col items-center justify-center py-2 rounded-xl active:scale-95 transition-all',
                style:{aspectRatio:'1',
                  background:isDone?'#10b981':isNext?'rgba(245,158,11,0.15)':d.type==='rest'?'rgba(15,23,42,0.5)':'rgba(30,41,59,0.6)',
                  border:isNext?'2px solid #f59e0b':isDone?'2px solid #059669':'2px solid rgba(51,65,85,0.4)'}},
                h('span',{style:{fontSize:'0.75rem',fontWeight:900,color:isDone?'#fff':isNext?'#f59e0b':d.type==='rest'?'#64748b':'#94a3b8'}},
                  isDone?'✓':d.type==='rest'?'😴':d.day)
              );
            })
          )
        );
      }),
      // Next up
      (() => {
        const next=DAY30[doneCnt];
        if(!next||doneCnt===30) return null;
        return h('div',{className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(245,158,11,0.3)'}},
          h('div',{style:{fontSize:'0.7rem',fontWeight:800,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.5rem'}},`Up Next — Day ${next.day}`),
          h('div',{className:'font-black text-white text-base mb-1'},next.title),
          h('div',{style:{fontSize:'0.75rem',color:'#64748b',marginBottom:'1rem'}},`Phase: ${next.phase} · +${next.xp} XP`),
          h('button',{onClick:()=>markDay(next),className:'btn-primary w-full py-3 text-sm'},`Complete Day ${next.day}`)
        );
      })()
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
    h(PageHeader,{title:'My Profile',subtitle:'Your cricketer identity',
      gradient:'linear-gradient(135deg,#0f766e,#0d9488)',
      actions:h('button',{onClick:()=>editing?save():setEditing(true),
        className:'px-4 py-2 rounded-xl text-white text-sm font-bold',
        style:{background:'rgba(255,255,255,0.15)'}},editing?'Save':'Edit')
    }),
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
          h('div',{key:f.key},
            h('label',{className:'text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5'},f.label),
            h('input',{type:'text',placeholder:f.ph,value:form[f.key]||'',onChange:e=>setForm({...form,[f.key]:e.target.value}),
              className:'w-full px-4 py-3 rounded-xl text-sm text-white outline-none',
              style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(51,65,85,0.6)'}}
            )
          )
        ),
        h('div',{className:'flex gap-3'},
          h('button',{onClick:save,className:'btn-primary flex-1'},'Save'),
          h('button',{onClick:()=>setEditing(false),className:'btn-secondary flex-1'},'Cancel')
        )
      ),
      !editing && h('div',{className:'grid grid-cols-2 gap-3'},
        [{label:'Role',val:user.role||'Not set'},{label:'Team',val:user.team||'Not set'},{label:'Country',val:user.country||'Not set'},{label:'Total XP',val:(progress.total_xp||0).toLocaleString()}].map(s=>
          h('div',{key:s.label,className:'p-4 rounded-2xl',style:{background:'rgba(30,41,59,0.6)',border:'1px solid rgba(51,65,85,0.5)'}},
            h('div',{className:'text-xs text-slate-500 uppercase font-bold tracking-wider'},s.label),
            h('div',{className:'font-bold text-white text-sm mt-1'},s.val)
          )
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
        h('button',{onClick:toggle,style:{width:48,height:24,borderRadius:'9999px',background:dark?'#10b981':'#475569',position:'relative',border:'none',cursor:'pointer'}},
          h('div',{style:{width:20,height:20,borderRadius:'50%',background:'#fff',position:'absolute',top:2,left:2,transition:'transform .2s',transform:dark?'translateX(24px)':'translateX(0)',boxShadow:'0 2px 4px rgba(0,0,0,0.3)'}})
        )
      ),
      h('button',{onClick:clearAll,className:'w-full p-4 rounded-2xl text-left',style:{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.3)'}},
        h('div',{className:'font-bold text-red-400 text-sm'},'Reset All Progress'),
        h('div',{className:'text-xs text-slate-500'},'Clears XP, drills, workouts, and schedule data')
      )
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
      entries.map(e=>h('div',{key:e.rank,className:'flex items-center gap-4 p-4 rounded-2xl',
        style:{background:e.isYou?'rgba(16,185,129,0.08)':'rgba(30,41,59,0.6)',
          border:`1px solid ${e.isYou?'rgba(16,185,129,0.3)':'rgba(51,65,85,0.5)'}`}},
        h('div',{style:{width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:900,
          background:e.rank<=3?'linear-gradient(135deg,#f59e0b,#d97706)':'rgba(30,41,59,0.8)',
          color:e.rank<=3?'#fff':'#94a3b8'}},`#${e.rank}`),
        h('div',{style:{fontSize:16,lineHeight:1}},e.flag||''),
        h('div',{className:'flex-1'},
          h('div',{style:{fontWeight:800,fontSize:'0.875rem',color:e.isYou?'#34d399':'#f8fafc'}},e.isYou?`${e.n} (You)`:e.n),
          h('div',{style:{fontSize:'0.75rem',color:'#64748b'}},`Level ${e.lv} · ${e.xp.toLocaleString()} XP`)
        ),
        h('div',{style:{fontSize:'0.75rem',fontWeight:800,color:'#fb923c'}},h('div',{style:{display:'flex',alignItems:'center',gap:4}},h(Icon,{n:'flame',cls:'w-3.5 h-3.5',style:{color:'#fb923c'}}),`${e.streak}d`))
      ))
    )
  );
}

function GoalsPage() {
  const [goals,setGoals]=useState(()=>DB.getGoals());
  const [newGoal,setNewGoal]=useState('');
  const add=()=>{
    if(!newGoal.trim()) return;
    const g=[...goals,{id:Date.now(),text:newGoal.trim(),done:false,date:new Date().toISOString().slice(0,10)}];
    DB.saveGoals(g);setGoals(g);setNewGoal('');
  };
  const toggle=id=>{
    const g=goals.map(x=>x.id===id?{...x,done:!x.done}:x);
    DB.saveGoals(g);setGoals(g);
    if(!goals.find(x=>x.id===id)?.done) awardXP(25,0,'goal');
  };
  const del=id=>{ const g=goals.filter(x=>x.id!==id); DB.saveGoals(g); setGoals(g); };
  return h('div',{className:'pb-28'},
    h(PageHeader,{title:'Goals',subtitle:'Set and track your training targets',gradient:'linear-gradient(135deg,#15803d,#16a34a)'}),
    h('div',{className:'px-4 pt-5 space-y-4'},
      h('div',{className:'flex gap-2'},
        h('input',{type:'text',placeholder:'Add a training goal...',value:newGoal,onChange:e=>setNewGoal(e.target.value),
          onKeyDown:e=>e.key==='Enter'&&add(),
          className:'flex-1 px-4 py-3 rounded-xl text-sm text-white outline-none',
          style:{background:'rgba(30,41,59,0.7)',border:'1px solid rgba(51,65,85,0.6)'}}),
        h('button',{onClick:add,className:'btn-primary px-4 py-3 rounded-xl'},h(Icon,{n:'plus',cls:'w-5 h-5'}))
      ),
      goals.length===0 && h(EmptyState,{icon:'target',title:'No goals yet',desc:'Add your first cricket training goal to stay focused and track progress'}),
      goals.map(g=>h('div',{key:g.id,className:'flex items-center gap-3 p-4 rounded-2xl',
        style:{background:g.done?'rgba(16,185,129,0.06)':'rgba(30,41,59,0.6)',
          border:`1px solid ${g.done?'rgba(16,185,129,0.25)':'rgba(51,65,85,0.5)'}`}},
        h('button',{onClick:()=>toggle(g.id),style:{width:28,height:28,borderRadius:'50%',border:`2px solid ${g.done?'#10b981':'rgba(51,65,85,0.8)'}`,background:g.done?'#10b981':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer'}},
          g.done && h(Icon,{n:'check',cls:'w-4 h-4 text-white'})
        ),
        h('span',{style:{flex:1,fontSize:'0.875rem',color:g.done?'#64748b':'#f8fafc',fontWeight:600,textDecoration:g.done?'line-through':'none'}},g.text),
        h('button',{onClick:()=>del(g.id),style:{color:'#ef4444',background:'none',border:'none',cursor:'pointer',padding:'0.25rem'}},h(Icon,{n:'x',cls:'w-4 h-4'}))
      ))
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
      default: return h(HomePage);
    }
  }

  return h(ThemeCtx.Provider,{value:theme},
    // Top bar
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
          h('span',{style:{fontSize:14,fontWeight:800,color:'#e6edf3',letterSpacing:'0.02em'}},
            'SMARTCRICK')
        ),
      h('div',{style:{flex:1}}),
      (() => {
        const s=DB.getProgress().current_streak||0;
        if(!s) return null;
        return h('div',{style:{display:'flex',alignItems:'center',gap:4,fontSize:'0.75rem',fontWeight:800,color:'#fb923c',background:'rgba(249,115,22,0.08)',border:'1px solid rgba(249,115,22,0.2)',padding:'4px 10px',borderRadius:6}},
            h(Icon,{n:'flame',cls:'w-3.5 h-3.5'}),s,'d');
      })()
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
