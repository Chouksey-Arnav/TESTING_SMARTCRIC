// ================================================================
// SmartCrick AI — Open Source Integration Layer v1.0
// Runs AFTER all CDN libs (defer order), BEFORE app.js
// Sets up: PouchDB, Chart.js, SC.mascot (Lottie), SC.gsap (GSAP)
// ================================================================
(function () {
'use strict';

// ── Global SC namespace ──────────────────────────────────────────
window.SC = window.SC || {};

// ── PouchDB ──────────────────────────────────────────────────────
window.SC_SYNC_KEYS = [
  'sc_progress', 'sc_xp_log', 'sc_user',
  'sc_goals',    'sc_schedule', 'sc_theme'
];

var _pouchInstance = null;
window.getPouchDB = function () {
  if (_pouchInstance) return _pouchInstance;
  if (typeof PouchDB === 'undefined') return null;
  try {
    _pouchInstance = new PouchDB('smartcrick_local', { auto_compaction: true });
    console.log('[SC] PouchDB ready');
    return _pouchInstance;
  } catch (e) {
    console.warn('[SC] PouchDB init failed:', e);
    return null;
  }
};

// ── Chart.js Defaults ────────────────────────────────────────────
window.applyChartDefaults = function () {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.color = '#8b949e';
  Chart.defaults.borderColor = 'rgba(48,54,61,0.5)';
  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.font.size = 11;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(22,27,34,0.95)';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(48,54,61,0.9)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.titleColor = '#e6edf3';
  Chart.defaults.plugins.tooltip.bodyColor = '#8b949e';
  Chart.defaults.animation.duration = 600;
  Chart.defaults.animation.easing = 'easeInOutQuart';
  console.log('[SC] Chart.js defaults applied');
};

// ── PouchDB Migration ────────────────────────────────────────────
window.migrateLSToPouchDB = async function () {
  var db = getPouchDB();
  if (!db) return;
  var keys = window.SC_SYNC_KEYS || [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    try {
      var raw = localStorage.getItem(key);
      if (!raw) continue;
      var docId = 'sc::' + key;
      try {
        await db.get(docId);
      } catch (e) {
        if (e && e.name === 'not_found') {
          await db.put({
            _id: docId,
            value: JSON.parse(raw),
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
        }
      }
    } catch (e) {
      console.warn('[SC] Migration error for', key, ':', e);
    }
  }
};

// ================================================================
// SC.mascot — Lottie Reactive Mascot Controller
// ================================================================
SC.mascot = {
  _anim:         null,
  _container:    null,
  _currentState: null,
  _speechEl:     null,

  ANIMATIONS: {
    default:     '/lottie/mascot-idle.json',
    celebrating: '/lottie/mascot-celebrate.json',
    pumped:      '/lottie/mascot-pumped.json',
    focused:     '/lottie/mascot-focused.json',
    tired:       '/lottie/mascot-tired.json',
    sleepy:      '/lottie/mascot-sleepy.json',
  },

  _ICONS: {
    default:     '<path d="M3 21l3.5-3.5"/><path d="M5.5 19.5L16 9a2 2 0 0 0 0-2.83L14.83 5A2 2 0 0 0 12 5L2.5 16l-1 1 1 4z"/><circle cx="20" cy="4" r="1"/>',
    celebrating: '<path d="M6 9a6 6 0 0 0 12 0V3H6z"/><path d="M10 14.66V21.978"/><path d="M14 14.66V21.978"/><path d="M4 22h16"/>',
    pumped:      '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    focused:     '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    tired:       '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    sleepy:      '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  },

  _COLORS: {
    default: '#16a34a', celebrating: '#f59e0b', pumped: '#3b82f6',
    focused: '#0d9488', tired: '#8b5cf6', sleepy: '#64748b',
  },

  computeState: function (progress, schedule, xpLog) {
    var now   = Date.now();
    var today = new Date().toISOString().slice(0, 10);
    var yesterday = new Date(now - 86400000).toISOString().slice(0, 10);
    var twoDaysAgo = new Date(now - 2 * 86400000).toISOString().slice(0, 10);
    var in3Days = new Date(now + 3 * 86400000).toISOString().slice(0, 10);

    progress = progress || {};
    schedule = schedule || { sessions: [] };
    xpLog = xpLog || [];

    var streak = progress.current_streak || 0;

    var recentXP = xpLog.filter(function (e) {
      return e.date === today || e.date === yesterday;
    }).reduce(function (s, e) { return s + e.xp; }, 0);
    if (recentXP > 180 || streak === 7 || streak === 14 || streak === 30) {
      return 'celebrating';
    }

    var sessions = (schedule && schedule.sessions) || [];
    var upcomingMatch = sessions.find(function (s) {
      return s.type === 'match' && s.date >= today && s.date <= in3Days && s.status !== 'complete';
    });
    if (upcomingMatch) return 'pumped';

    var recentActivity = xpLog.filter(function (e) { return e.date >= twoDaysAgo; });
    if (recentActivity.length === 0 && (progress.drills_done || 0) > 0) {
      return 'sleepy';
    }

    var last5 = xpLog.slice(-5).map(function (e) { return e.source; });
    if (last5.length >= 5) {
      var allSame = last5.every(function (s) { return s === last5[0]; });
      if (allSame && last5[0] !== 'checkin' && last5[0] !== 'goal') {
        return 'tired';
      }
    }

    if ((progress.drills_done || 0) > 0) return 'focused';
    return 'default';
  },

  loadState: function (state) {
    var self = this;
    if (!this._container) return;
    if (state === this._currentState && this._anim) return;

    var container = this._container;
    container.style.transition = 'opacity 0.28s ease';
    container.style.opacity = '0';

    var doLoad = function () {
      if (self._anim) {
        try { self._anim.destroy(); } catch (e) {}
        self._anim = null;
      }

      if (typeof lottie !== 'undefined') {
        var src = self.ANIMATIONS[state] || self.ANIMATIONS['default'];
        try {
          self._anim = lottie.loadAnimation({
            container:    container,
            renderer:     'svg',
            loop:         true,
            autoplay:     true,
            path:         src,
          });
          self._anim.addEventListener('data_failed', function () {
            self._cssfall(container, state);
          });
          self._anim.addEventListener('config_ready', function () {
            container.style.opacity = '1';
          });
        } catch (err) {
          self._cssfall(container, state);
          container.style.opacity = '1';
        }
      } else {
        self._cssfall(container, state);
        container.style.opacity = '1';
      }

      self._currentState = state;
      setTimeout(function () { container.style.opacity = '1'; }, 500);
    };

    setTimeout(doLoad, 290);
  },

  _cssfall: function (container, state) {
    var color  = this._COLORS[state] || '#16a34a';
    var icon   = this._ICONS[state] || this._ICONS['default'];
    container.innerHTML =
      '<div class="mascot-css-ring mascot-css-ring--' + state + '" style="border-color:' + color + '40;background:' + color + '12;">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' + color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="46" height="46">' +
          icon +
        '</svg>' +
      '</div>';
  },

  onTap: function () {
    if (this._anim) {
      try {
        this._anim.playSegments([0, Math.min(30, this._anim.totalFrames - 1)], true);
      } catch (e) {}
    }
  },
};

// ================================================================
// SC.gsap — GSAP Entrance Orchestrator
// ================================================================
SC.gsap = {
  isAvailable: function () { return typeof gsap !== 'undefined'; },
  _registerPlugins: function () {
    if (this.isAvailable() && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  },
  animateHomeEntrance: function (els) {
    var self = this;
    if (!this.isAvailable()) {
      Object.values(els).forEach(function (el) {
        if (el && el.style) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      return function () {};
    }
    var mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', function () {
      var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      if (els.mascot) tl.fromTo(els.mascot,{ scale:0.72,opacity:0 },{ scale:1,opacity:1,duration:0.52,ease:'back.out(1.8)' },0.0);
      if (els.greeting) tl.fromTo(els.greeting,{ y:18,opacity:0 },{ y:0,opacity:1,duration:0.32 },0.15);
      if (els.streak) tl.fromTo(els.streak,{ x:18,opacity:0 },{ x:0,opacity:1,duration:0.26 },0.26);
      if (els.heroCard) tl.fromTo(els.heroCard,{ scale:0.965,opacity:0 },{ scale:1,opacity:1,duration:0.46 },0.34);
      if (els.xpBar) tl.fromTo(els.xpBar,{ scaleX:0,transformOrigin:'left center' },{ scaleX:1,duration:0.72,ease:'power2.out' },0.44);
      if (els.statGrid) { var statCards=Array.from(els.statGrid.children||[]); if(statCards.length) tl.fromTo(statCards,{ y:12,opacity:0 },{ y:0,opacity:1,duration:0.32,stagger:0.08 },0.54); }
      if (els.chartSection) tl.fromTo(els.chartSection,{ y:10,opacity:0 },{ y:0,opacity:1,duration:0.36 },0.64);
      if (els.quickTrain) { var qtiles=Array.from(els.quickTrain.children||[]); if(qtiles.length) tl.fromTo(qtiles,{ y:10,opacity:0 },{ y:0,opacity:1,duration:0.3,stagger:0.06 },0.74); }
      if (els.checkIn) tl.fromTo(els.checkIn,{ y:9,opacity:0 },{ y:0,opacity:1,duration:0.26 },0.86);
      return function () { tl.kill(); };
    });
    mm.add('(prefers-reduced-motion: reduce)', function () {
      var allEls = Object.values(els).filter(function (el) { return el && (el.nodeType===1||el instanceof Element); });
      gsap.set(allEls, { opacity:1,y:0,x:0,scale:1 });
    });
    return function () { try { mm.revert(); } catch (e) {} };
  },
  countUp: function (element, targetValue, duration) {
    if (!this.isAvailable() || !element) return;
    duration = duration || 0.72;
    var obj = { val: 0 };
    gsap.to(obj, { val:targetValue, duration:duration, ease:'power2.out', onUpdate:function(){ element.textContent=Math.round(obj.val).toLocaleString(); } });
  },
  levelUpCelebration: function (heroCardEl) {
    if (!this.isAvailable() || !heroCardEl) return;
    gsap.timeline()
      .to(heroCardEl, { scale:1.07, boxShadow:'0 0 48px rgba(22,163,74,0.55)', duration:0.3, ease:'power2.out' })
      .to(heroCardEl, { scale:1, boxShadow:'0 0 0px rgba(22,163,74,0)', duration:0.95, ease:'elastic.out(1, 0.48)' });
  },
  setupScrollTriggers: function (els) {
    if (!this.isAvailable() || typeof ScrollTrigger === 'undefined') return;
    var headers = els.sectionHeaders || [];
    headers.forEach(function (el) {
      if (!el) return;
      gsap.fromTo(el, { y:10,opacity:0 }, { y:0,opacity:1,duration:0.38,ease:'power2.out',
        scrollTrigger:{ trigger:el, start:'top 92%', toggleActions:'play none none none' } });
    });
  },
  addHoverEffects: function (tiles) {
    if (!this.isAvailable()) return;
    if (window.matchMedia('(hover: none)').matches) return;
    Array.from(tiles).forEach(function (tile) {
      tile.addEventListener('mouseenter', function () { gsap.to(tile, { scale:1.045,y:-2,duration:0.18,ease:'power2.out' }); });
      tile.addEventListener('mouseleave', function () { gsap.to(tile, { scale:1,y:0,duration:0.18,ease:'power2.out' }); });
    });
  },
};

SC.gsap._registerPlugins();

// ================================================================
// SC.breathe — Breathing Circle Controller
// ================================================================
SC.breathe = {
  _anim: null,
  PATTERNS: {
    box:       { inhale:4, holdIn:4, exhale:4, holdOut:4, name:'Box Breathing' },
    '4-7-8':   { inhale:4, holdIn:7, exhale:8, holdOut:0, name:'4-7-8 Breathing' },
    coherence: { inhale:5.5, holdIn:0, exhale:5.5, holdOut:0, name:'Coherence Breathing' },
    fire:      { inhale:0.5, holdIn:0, exhale:0.5, holdOut:0, name:'Fire Breath' },
    resonance: { inhale:6, holdIn:0, exhale:6, holdOut:0, name:'Resonance Breathing' },
    rhythmic:  { inhale:4, holdIn:0, exhale:4, holdOut:0, name:'Rhythmic Breathing' },
  },
  init:  function () { return false; },
  load:  function () {},
  start: function () {},
  stop:  function () {},
};

// ================================================================
// SC.ambience — Howler.js Soundscapes
// ================================================================
SC.ambience = {
  _howl:    null,
  _current: null,
  TRACKS: {
    rain:     '/audio/rain-loop.mp3',
    ocean:    '/audio/ocean-loop.mp3',
    forest:   '/audio/forest-loop.mp3',
    campfire: '/audio/campfire-loop.mp3',
    cricket:  '/audio/cricket-field-loop.mp3',
  },
  play:      function () {},
  stop:      function () {},
  setVolume: function () {},
  fadeIn:    function () {},
  fadeOut:   function () {},
};

// ================================================================
// SC.charts — Chart.js Wrappers
// ================================================================
SC.charts = {
  _instances: new Map(),
  renderSparkline:    function () {},
  renderRadar:        function () {},
  renderPerformance:  function () {},
  destroyAll:         function () { this._instances.forEach(function (c) { try { c.destroy(); } catch (e) {} }); this._instances.clear(); },
};

// ================================================================
// SC.webDrills — YouTube Data API
// ================================================================
SC.webDrills = {
  BACKEND_URL: 'https://smartcrick-backend-kgya.vercel.app',
  _cache: {},
  search:      function () { return Promise.resolve([]); },
  importDrill: function () {},
  computeXP:   function () { return 50; },
};

// ── Signal ready ─────────────────────────────────────────────────
window.SC_READY = true;
console.log('[SC] Integration layer v1.0 — GSAP + Lottie ready');

})(); // end IIFE
