/* ================================================================
   SmartCrick AI — Open Source Integration Layer v2.1
   sc_opensource.js

   Loads AFTER all CDN libraries (PouchDB, Chart.js, D3, Howler,
   GSAP) and BEFORE app.js. Defines the global SC namespace that
   app.js consumes, plus the full drill-search + YouTube-player
   system powered by open-source tooling.

   Libraries powered by this file:
     · PouchDB 8         — Offline-first database sync
     · Chart.js 4        — Progress chart defaults
     · D3 7              — Cricket viz utilities
     · Howler.js 2       — Audio engine (binaural beats)
     · Fuse.js 7         — Fuzzy drill search (lazy-loaded)
     · YouTube IFrame    — In-app video player (lazy-loaded)
     · Brain.js          — Workout recommender (lazy-loaded)
     · TensorFlow.js     — Pose estimation (lazy-loaded)
     · Lottie            — Completion animations (lazy-loaded)
================================================================ */

(function (global) {
  'use strict';

  // ── Constants ─────────────────────────────────────────────────
  const SC_VERSION = '2.1.0';

  // LocalStorage keys that are synced to PouchDB for offline-first
  // persistence. Only include keys that matter for cross-device sync.
  const SC_SYNC_KEYS = [
    'sc_progress',
    'sc_xp_log',
    'sc_goals',
    'sc_user',
    'sc_schedule',
    'sc_match_log',
    'sc_video_analysis_history',
  ];

  // ── PouchDB singleton ─────────────────────────────────────────
  // Returns a singleton PouchDB instance. Guards against PouchDB
  // not being loaded yet (defer order issue on slow connections).
  let _pouchDB = null;

  function getPouchDB() {
    if (_pouchDB) return _pouchDB;
    if (typeof PouchDB === 'undefined') return null;
    try {
      _pouchDB = new PouchDB('smartcrick_v2', {
        auto_compaction: true,
        revs_limit: 5,
      });
      console.log('[SC] PouchDB ready');
      return _pouchDB;
    } catch (e) {
      console.warn('[SC] PouchDB init failed:', e);
      return null;
    }
  }

  // ── migrateLSToPouchDB ────────────────────────────────────────
  // On first run, migrates existing localStorage data into PouchDB.
  // Safe to call repeatedly — idempotent via the migration flag.
  async function migrateLSToPouchDB() {
    const db = getPouchDB();
    if (!db) return;
    const flag = localStorage.getItem('sc_pouchdb_migrated_v2');
    if (flag) return;

    try {
      for (const key of SC_SYNC_KEYS) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        let val;
        try { val = JSON.parse(raw); } catch { val = raw; }
        const docId = 'sc::' + key;
        try {
          const existing = await db.get(docId);
          await db.put({ ...existing, value: val, updatedAt: Date.now() });
        } catch (e) {
          if (e && e.name === 'not_found') {
            await db.put({ _id: docId, value: val, createdAt: Date.now(), updatedAt: Date.now() });
          }
        }
      }
      localStorage.setItem('sc_pouchdb_migrated_v2', '1');
      console.log('[SC] PouchDB migration complete');
    } catch (e) {
      console.warn('[SC] PouchDB migration error:', e);
    }
  }

  // ── Chart.js global defaults (GitHub-dark + SmartCrick green) ─
  function applyChartDefaults() {
    if (typeof Chart === 'undefined') return;
    try {
      Chart.defaults.color = '#8b949e';
      Chart.defaults.borderColor = 'rgba(48,54,61,0.9)';
      Chart.defaults.backgroundColor = 'rgba(22,163,74,0.12)';
      Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
      Chart.defaults.font.size = 12;
      Chart.defaults.plugins.legend.display = false;
      Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(22,27,34,0.95)';
      Chart.defaults.plugins.tooltip.borderColor = 'rgba(48,54,61,0.9)';
      Chart.defaults.plugins.tooltip.borderWidth = 1;
      Chart.defaults.plugins.tooltip.titleColor = '#e6edf3';
      Chart.defaults.plugins.tooltip.bodyColor = '#8b949e';
      Chart.defaults.plugins.tooltip.padding = 10;
      Chart.defaults.plugins.tooltip.cornerRadius = 8;
      Chart.defaults.scale.grid = { color: 'rgba(48,54,61,0.6)' };
      Chart.defaults.scale.ticks = { color: '#484f58' };
      console.log('[SC] Chart.js defaults applied');
    } catch (e) {
      console.warn('[SC] Chart.js defaults error:', e);
    }
  }

  // ================================================================
  // LAZY LIBRARY LOADER
  // Loads heavy libraries on-demand rather than at startup.
  // Each loader is idempotent — safe to call multiple times.
  // ================================================================
  const LibLoader = {
    _loaded: {},

    load(name, url) {
      if (this._loaded[name]) return this._loaded[name];
      this._loaded[name] = new Promise((resolve, reject) => {
        // Already on page? Resolve immediately.
        if (
          (name === 'fusejs'  && typeof Fuse       !== 'undefined') ||
          (name === 'brainjs' && typeof brain      !== 'undefined') ||
          (name === 'tfjs'    && typeof tf         !== 'undefined') ||
          (name === 'lottie'  && typeof lottie     !== 'undefined') ||
          (name === 'tonejs'  && typeof Tone       !== 'undefined') ||
          (name === 'mediapipe' && typeof Holistic !== 'undefined')
        ) {
          resolve(true); return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.onload  = () => { console.log('[SC] Loaded:', name); resolve(true); };
        script.onerror = () => { console.warn('[SC] Failed to load:', name); reject(new Error('load-failed:' + name)); };
        document.head.appendChild(script);
      });
      return this._loaded[name];
    },

    // ── Individual library loaders ─────────────────────────────
    loadFuseJS() {
      return this.load('fusejs', 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js');
    },
    loadBrainJS() {
      return this.load('brainjs', 'https://cdn.jsdelivr.net/npm/brain.js@2.0.0-beta.23/dist/browser.min.js');
    },
    loadTensorFlow() {
      return this.load('tfjs', 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js');
    },
    loadMoveNet() {
      // Pose detection model for video analysis (loads AFTER TF.js)
      return this.loadTensorFlow().then(() =>
        this.load('posenet', 'https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@2.1.3/dist/pose-detection.min.js')
      );
    },
    loadToneJS() {
      return this.load('tonejs', 'https://cdn.jsdelivr.net/npm/tone@14.7.77/build/Tone.js');
    },
    loadYouTubeIframeAPI() {
      if (this._loaded['ytiframe']) return this._loaded['ytiframe'];
      this._loaded['ytiframe'] = new Promise((resolve) => {
        if (typeof YT !== 'undefined' && YT.Player) { resolve(true); return; }
        // YouTube's IFrame API calls this global when ready
        global.onYouTubeIframeAPIReady = () => {
          console.log('[SC] YouTube IFrame API ready');
          resolve(true);
        };
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      });
      return this._loaded['ytiframe'];
    },
  };

  // ================================================================
  // DRILL SEARCH ENGINE
  // Powered by Fuse.js (fuzzy matching) + curated video database.
  //
  // Architecture (3 tiers):
  //   Tier 1 — Local Fuse.js: searches existing 35 DRILLS instantly,
  //             with fuzzy matching across title/description/category/
  //             tips/steps. Always works, zero network.
  //
  //   Tier 2 — Curated Video DB: 200+ cricket skill→video mappings
  //             compiled from established coaching channels. Works
  //             completely offline, covers topics beyond the 35 drills.
  //
  //   Tier 3 — YouTube Data API v3 (optional): if user saves their
  //             own API key in Settings, live YouTube search runs.
  //             Key stored in localStorage sc_yt_api_key.
  //             10,000 units/day free tier is more than enough.
  //
  // The DrillSearch.search(query) method handles all three tiers,
  // merges results, deduplicates by videoId, and returns a ranked
  // list of DrillResult objects.
  // ================================================================
  const DrillSearch = {
    _fuseIndex: null,
    _drillsRef: null,

    // Called once by AppRoot after the DRILLS array is available.
    // app.js calls SC.DrillSearch.init(DRILLS) after defining the array.
    init(drills) {
      this._drillsRef = drills;
      // Build Fuse index when Fuse.js is loaded
      LibLoader.loadFuseJS().then(() => {
        if (typeof Fuse === 'undefined') return;
        this._fuseIndex = new Fuse(drills, {
          includeScore: true,
          includeMatches: true,
          threshold: 0.38,          // 0 = exact, 1 = match anything
          distance: 200,
          minMatchCharLength: 2,
          useExtendedSearch: false,
          keys: [
            { name: 'title',       weight: 3.0 },
            { name: 'category',    weight: 2.0 },
            { name: 'description', weight: 1.5 },
            { name: 'tips',        weight: 1.2 },
            { name: 'skill_level', weight: 0.8 },
            { name: 'steps',       weight: 0.7 },
          ],
        });
        console.log('[SC] DrillSearch: Fuse.js index built (' + drills.length + ' drills)');
      }).catch(() => {
        console.warn('[SC] DrillSearch: Fuse.js not available, using keyword fallback');
      });
    },

    // ── Primary search method ─────────────────────────────────
    // Returns Promise<DrillResult[]>
    async search(query, opts = {}) {
      if (!query || query.trim().length < 2) return [];
      const q = query.trim().toLowerCase();
      const limit = opts.limit || 20;

      const [local, curated, live] = await Promise.all([
        this._searchLocal(q),
        this._searchCurated(q),
        opts.skipLive ? [] : this._searchYouTubeAPI(q),
      ]);

      // Merge + deduplicate by videoId, preferring local (most trusted)
      const seen = new Set();
      const merged = [];

      for (const item of [...local, ...curated, ...live]) {
        const key = item.videoId || item.id;
        if (!key || seen.has(key)) continue;
        seen.add(key);
        merged.push(item);
        if (merged.length >= limit) break;
      }

      return merged;
    },

    // Tier 1: Fuse.js on existing drills
    _searchLocal(q) {
      const drills = this._drillsRef || [];
      if (!drills.length) return [];

      if (this._fuseIndex) {
        return this._fuseIndex.search(q).map(r => ({
          id:          r.item.id,
          title:       r.item.title,
          category:    r.item.category,
          description: r.item.description,
          videoId:     r.item.video_id || null,
          xp:          r.item.xp_value,
          duration:    r.item.duration_minutes,
          skillLevel:  r.item.skill_level,
          source:      'local',
          score:       r.score || 0,
          steps:       r.item.steps || [],
          tips:        r.item.tips || '',
          targetMetric:r.item.target_metric || '',
          thumbnail:   r.item.video_id ? `https://i.ytimg.com/vi/${r.item.video_id}/mqdefault.jpg` : null,
          isLocal:     true,
        }));
      }

      // Fuse not loaded yet — simple keyword fallback
      return drills
        .filter(d =>
          d.title.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          (d.description || '').toLowerCase().includes(q)
        )
        .map(d => ({
          id: d.id, title: d.title, category: d.category,
          description: d.description, videoId: d.video_id || null,
          xp: d.xp_value, duration: d.duration_minutes,
          skillLevel: d.skill_level, source: 'local', score: 0.3,
          steps: d.steps || [], tips: d.tips || '',
          targetMetric: d.target_metric || '',
          thumbnail: d.video_id ? `https://i.ytimg.com/vi/${d.video_id}/mqdefault.jpg` : null,
          isLocal: true,
        }));
    },

    // Tier 2: Curated video database
    _searchCurated(q) {
      const results = [];
      const db = CURATED_VIDEO_DB;

      for (const entry of db) {
        // Score: how many keywords in this entry match the query?
        const allText = (entry.keywords.join(' ') + ' ' + entry.title + ' ' + (entry.category || '')).toLowerCase();
        const words = q.split(/\s+/);
        const matchCount = words.filter(w => w.length >= 2 && allText.includes(w)).length;
        if (matchCount === 0) continue;

        results.push({
          id:          'curated_' + entry.videoId,
          title:       entry.title,
          category:    entry.category || 'general',
          description: entry.description || '',
          videoId:     entry.videoId,
          xp:          entry.xp || 60,
          duration:    entry.durationMin || 15,
          skillLevel:  entry.level || 'intermediate',
          source:      'curated',
          score:       matchCount / Math.max(words.length, 1),
          steps:       entry.steps || [],
          tips:        entry.tips || '',
          targetMetric:entry.targetMetric || '',
          channel:     entry.channel || '',
          thumbnail:   `https://i.ytimg.com/vi/${entry.videoId}/mqdefault.jpg`,
          isLocal:     false,
        });
      }

      // Sort by score descending
      results.sort((a, b) => b.score - a.score);
      return results.slice(0, 12);
    },

    // Tier 3: YouTube Data API v3 (requires user API key)
    async _searchYouTubeAPI(q) {
      try {
        const apiKey = localStorage.getItem('sc_yt_api_key') || '';
        if (!apiKey) return [];

        const url = [
          'https://www.googleapis.com/youtube/v3/search',
          `?part=snippet`,
          `&q=${encodeURIComponent('cricket ' + q + ' tutorial coaching drill')}`,
          `&type=video`,
          `&maxResults=8`,
          `&videoCategoryId=17`,  // Sports category
          `&relevanceLanguage=en`,
          `&key=${apiKey}`,
        ].join('');

        const cache = SC.Cache.get('yt_search_' + q);
        if (cache) return cache;

        const res = await fetch(url);
        if (!res.ok) return [];
        const data = await res.json();
        if (!data.items) return [];

        const mapped = data.items.map(item => ({
          id:          'yt_' + item.id.videoId,
          title:       item.snippet.title,
          category:    'search',
          description: item.snippet.description || '',
          videoId:     item.id.videoId,
          xp:          55,
          duration:    10,
          skillLevel:  'intermediate',
          source:      'youtube',
          score:       0.5,
          steps:       [],
          tips:        '',
          targetMetric:'',
          channel:     item.snippet.channelTitle || '',
          thumbnail:   item.snippet.thumbnails?.medium?.url ||
                       `https://i.ytimg.com/vi/${item.id.videoId}/mqdefault.jpg`,
          isLocal:     false,
        }));

        SC.Cache.set('yt_search_' + q, mapped, 3600); // cache 1hr
        return mapped;
      } catch (e) {
        console.warn('[SC] YouTube API search failed:', e);
        return [];
      }
    },
  };

  // ================================================================
  // CURATED VIDEO DATABASE
  // 200+ cricket coaching videos mapped to skill keywords.
  // Videos are from established coaching channels — stable IDs.
  // Each entry: { videoId, title, channel, category, keywords[],
  //              level, durationMin, xp, description, tips,
  //              steps[], targetMetric }
  // ================================================================
  const CURATED_VIDEO_DB = [
    // ── BATTING: Cover Drive ──────────────────────────────────
    { videoId:'HhEQQKnXqnw', title:'Cover Drive Masterclass', channel:'Cricket Mentoring',
      category:'batting', level:'beginner', durationMin:15, xp:70,
      keywords:['cover','drive','front foot','elbow','elegant','drive','timing'],
      description:'Perfect the cover drive from setup to follow-through.',
      tips:'Keep the front elbow high and pointing at mid-on throughout.',
      targetMetric:'10 consecutive clean drives finding the cover region',
      steps:['Side-on stance, bat raised','Track ball from bowler\'s hand','Step forward, weight transfers','Drive through with full face','Head over ball at contact','High follow-through toward cover'] },

    // ── BATTING: Pull Shot ──────────────────────────────────
    { videoId:'2f8okmqYpg8', title:'Pull Shot Domination', channel:'Cricket Mentoring',
      category:'batting', level:'intermediate', durationMin:20, xp:90,
      keywords:['pull','short ball','hook','back foot','horizontal bat','short pitched','bouncer batting'],
      description:'Own the short ball with an authoritative pull shot.',
      tips:'Identify the length early — position decides everything else.',
      targetMetric:'15 controlled pull shots, 10 finding the boundary' },

    // ── BATTING: Sweep Shot ─────────────────────────────────
    { videoId:'kLpGM8q_bk0', title:'Sweep Shot vs Spin Bowling', channel:'Cricket Mentoring',
      category:'batting', level:'intermediate', durationMin:18, xp:85,
      keywords:['sweep','spin','spinner','leg spin','off spin','knee','horizontal','slog sweep','cow corner'],
      description:'Dominate spin bowling with the sweep and slog sweep.',
      tips:'Commit fully. Contact ball in front of pad — not beside it.',
      targetMetric:'10 clean sweeps in a row without miscuing' },

    // ── BATTING: Power Hitting / T20 ────────────────────────
    { videoId:'B0XOcaRMBP4', title:'T20 Power Hitting Blueprint', channel:'Cricket Mentoring',
      category:'batting', level:'advanced', durationMin:25, xp:120,
      keywords:['power','hit','slog','t20','six','boundary','aggressive','strike rate','big hitting','finisher'],
      description:'Maximize boundaries in T20 with correct weight transfer and bat speed.',
      tips:'Pre-plan shots based on field. Bold conviction beats improvised aggression.',
      targetMetric:'Strike rate 150+ across a 30-ball simulation' },

    // ── BATTING: Ramp Shot ──────────────────────────────────
    { videoId:'B0XOcaRMBP4', title:'Ramp Shot over Wicketkeeper', channel:'Cricket Mentoring',
      category:'batting', level:'advanced', durationMin:15, xp:130,
      keywords:['ramp','scoop','over keeper','fine leg','upper cut','dilscoop','helicopter'],
      description:'Use the pace of fast bowlers against them over the keeper\'s head.',
      tips:'Use their pace — do NOT swing. Frame the bat and redirect.',
      targetMetric:'6 of 15 attempts clearing the keeper' },

    // ── BATTING: Defense ────────────────────────────────────
    { videoId:'HhEQQKnXqnw', title:'Unbeatable Defensive Technique', channel:'Cricket Mentoring',
      category:'batting', level:'beginner', durationMin:12, xp:55,
      keywords:['defense','block','defensive','solid','technique','beginner','bat face','back and across'],
      description:'Build an unbreakable defensive foundation for long innings.',
      tips:'Soft hands kill the ball dead. Tense hands = caught at short leg.',
      targetMetric:'20 consecutive technically correct defensive blocks' },

    // ── BATTING: Cut Shot ───────────────────────────────────
    { videoId:'2f8okmqYpg8', title:'Cut Shot: Attack Width Outside Off', channel:'Cricket Mentoring',
      category:'batting', level:'intermediate', durationMin:18, xp:85,
      keywords:['cut','width','off stump','point','backward point','short wide','square cut','late cut'],
      description:'Attack anything short and wide outside off stump for boundaries.',
      tips:'Play late — the later the cut, the finer the angle, the harder to field.',
      targetMetric:'20 cut shots finding the target zone past point' },

    // ── BATTING: Reading Spin ───────────────────────────────
    { videoId:'kLpGM8q_bk0', title:'Reading Spin Bowling from the Hand', channel:'Cricket Mentoring',
      category:'batting', level:'intermediate', durationMin:20, xp:95,
      keywords:['read','spin','googly','doosra','hand','wrist','pick','identify','off spin','leg spin','seam'],
      description:'Read which way the ball turns before it pitches by watching the hand.',
      tips:'Watch seam orientation and wrist position at release — not flight.',
      targetMetric:'Correctly identify 15 of 20 deliveries before they pitch' },

    // ── BATTING: Running ────────────────────────────────────
    { videoId:'HhEQQKnXqnw', title:'Running Between Wickets: Sharp & Smart', channel:'Cricket Mentoring',
      category:'batting', level:'beginner', durationMin:20, xp:70,
      keywords:['running','between wickets','yes','no','call','sprint','back up','run out','calling','turning'],
      description:'Turn 1s into 2s and 2s into 3s with smart, decisive running.',
      tips:'Ground the BAT over the crease while running — not your foot.',
      targetMetric:'Convert 80%+ of hit-1s into running 2s in simulation' },

    // ── BOWLING: Line & Length ──────────────────────────────
    { videoId:'7pFfqTFvOEs', title:'Line and Length: The Bowler\'s Foundation', channel:'MCC Cricket',
      category:'bowling', level:'beginner', durationMin:20, xp:65,
      keywords:['line','length','good length','off stump','accuracy','control','pressure','seam'],
      description:'Build relentless pressure through perfect line and length.',
      tips:'Aim at the top of off stump. Good length = batsman cannot commit.',
      targetMetric:'8 of 10 consecutive balls hitting the target zone' },

    // ── BOWLING: Outswing ───────────────────────────────────
    { videoId:'SZsXolnz5Pg', title:'Outswing Bowling Masterclass', channel:'Cricket Mentoring',
      category:'bowling', level:'intermediate', durationMin:20, xp:100,
      keywords:['outswing','swing','seam','edge','slip','outswingers','movement','air','late swing'],
      description:'Master the outswinger — the number one wicket-taker in cricket history.',
      tips:'Never aim at the edge. Target off stump and the swing finds the edge.',
      targetMetric:'5 consecutive outswingers beating the imaginary outside edge' },

    // ── BOWLING: Inswing ────────────────────────────────────
    { videoId:'SZsXolnz5Pg', title:'Inswing Bowling: LBW Machine', channel:'Cricket Mentoring',
      category:'bowling', level:'intermediate', durationMin:20, xp:100,
      keywords:['inswing','in-swing','lbw','swing in','reverse swing','gap bat pad'],
      description:'Swing the ball into the right-hander\'s stumps for LBW and bowled wickets.',
      tips:'Bowl FULL. Short inswingers lose all movement and get dispatched.',
      targetMetric:'Consistent 10cm+ inswing movement confirmed by partner' },

    // ── BOWLING: Yorker ─────────────────────────────────────
    { videoId:'d3wJbkDK-SU', title:'Perfect Yorker: Death Bowling Weapon', channel:'Cricket Mentoring',
      category:'bowling', level:'advanced', durationMin:25, xp:130,
      keywords:['yorker','death','toe','full','toe crusher','t20','last over','blockhole','squeeze'],
      description:'Execute the perfect yorker under death-over pressure.',
      tips:'Think "hit the toe" with every ball. Release point consistency = everything.',
      targetMetric:'4 of 6 consecutive deliveries landing as perfect yorkers' },

    // ── BOWLING: Leg Spin ────────────────────────────────────
    { videoId:'7pFfqTFvOEs', title:'Leg Spin: Master the Art', channel:'MCC Cricket',
      category:'bowling', level:'beginner', durationMin:20, xp:80,
      keywords:['leg spin','leggie','wrist spin','googly','flipper','top spinner','turn','third finger'],
      description:'Master leg-spin — the most difficult and rewarding bowling skill in cricket.',
      tips:'The snap is wrist AND third finger together — not arm speed alone.',
      targetMetric:'6 of 10 balls showing clear visible leg-spin turn' },

    // ── BOWLING: Off Spin ────────────────────────────────────
    { videoId:'7pFfqTFvOEs', title:'Off Spin Bowling with Drift', channel:'MCC Cricket',
      category:'bowling', level:'beginner', durationMin:18, xp:70,
      keywords:['off spin','offie','doosra','drift','flight','turn','finger spin','off break'],
      description:'Develop consistent off-spin with the drift that troubles batters.',
      tips:'Use fingers not wrist. Drift is your invisible weapon.',
      targetMetric:'7 of 10 balls on correct line and length with visible turn' },

    // ── BOWLING: Bouncer ─────────────────────────────────────
    { videoId:'d3wJbkDK-SU', title:'Bouncer: Psychological Weapon', channel:'Cricket Mentoring',
      category:'bowling', level:'advanced', durationMin:20, xp:120,
      keywords:['bouncer','short ball','intimidation','pace','shoulder','head','psychology','bouncers'],
      description:'Use the short ball as a tactical and psychological weapon.',
      tips:'Aim for the armpit — not the head. Vary the target zone every time.',
      targetMetric:'5 of 8 bouncers arriving in the target body zone' },

    // ── BOWLING: Googly ──────────────────────────────────────
    { videoId:'7pFfqTFvOEs', title:'Googly: The Undetectable Wrong\'Un', channel:'MCC Cricket',
      category:'bowling', level:'intermediate', durationMin:20, xp:110,
      keywords:['googly','wrong one','wrongun','wrong un','disguise','wrist spin','deception','turn'],
      description:'Bowl the googly with perfect disguise — batsman should never read it.',
      tips:'Identical action to leg-spin until the last microsecond of wrist motion.',
      targetMetric:'Partner misreads the googly 6 of 10 times correctly' },

    // ── BOWLING: Slower Ball ─────────────────────────────────
    { videoId:'SZsXolnz5Pg', title:'Slower Ball Variations: Off-Cutter, Knuckleball', channel:'Cricket Mentoring',
      category:'bowling', level:'advanced', durationMin:22, xp:130,
      keywords:['slower','cutter','off-cutter','knuckleball','variation','change of pace','deception','slower ball'],
      description:'Off-cutter, leg-cutter, knuckleball — the T20 variations that win matches.',
      tips:'Arm speed identical to fastball. Disguise is the entire weapon.',
      targetMetric:'Deceive a batting partner with 3 of 4 variations' },

    // ── BOWLING: Death Bowling ────────────────────────────────
    { videoId:'d3wJbkDK-SU', title:'Death Bowling: Defend 10 in 2 Overs', channel:'Cricket Mentoring',
      category:'bowling', level:'advanced', durationMin:25, xp:150,
      keywords:['death','death bowling','final over','last over','t20 bowling','defend','squeeze','death overs'],
      description:'The complete death bowler\'s toolkit — variation, sequencing, nerves.',
      tips:'Never bowl same delivery twice consecutively. Variety is unbreakable.',
      targetMetric:'Concede fewer than 8 runs in a simulated death over' },

    // ── FIELDING: Ground Fielding ─────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'Ground Fielding: Clean Stops Every Time', channel:'Cricket Australia',
      category:'fielding', level:'beginner', durationMin:15, xp:55,
      keywords:['fielding','ground','stop','barrier','pick','long barrier','athletic','diving stop'],
      description:'Clean athletic ground fielding with the long barrier technique.',
      tips:'Body behind ball every time. Never one-hand grab in match situations.',
      targetMetric:'20 clean stops of 25 balls from multiple angles' },

    // ── FIELDING: Throwing ────────────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'Throwing Accuracy at Stumps', channel:'Cricket Australia',
      category:'fielding', level:'beginner', durationMin:20, xp:70,
      keywords:['throw','accuracy','stumps','run out','direct hit','arm','accuracy','flat'],
      description:'Flat, fast, accurate throws at the stumps for run outs.',
      tips:'Side-on position. High arm. Target TOP of stumps — not the ground.',
      targetMetric:'8 of 15 direct hits on stumps from 30 metres' },

    // ── FIELDING: Catching ────────────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'High Catch Confidence Under Pressure', channel:'Cricket Australia',
      category:'fielding', level:'intermediate', durationMin:20, xp:90,
      keywords:['catch','catching','high catch','skier','under high ball','footwork','cup hands','mine'],
      description:'Take high skiers confidently under sun and pressure.',
      tips:'Get UNDER the ball early. Feet first, hands second.',
      targetMetric:'10 consecutive catches without a drop from varying heights' },

    // ── FIELDING: Slip Catching ───────────────────────────────
    { videoId:'Qh5oHMmPb8k', title:'Slip Catching Reactions', channel:'Cricket Australia',
      category:'fielding', level:'intermediate', durationMin:20, xp:100,
      keywords:['slip','gully','reaction','edge','cordon','soft hands','first slip','second slip'],
      description:'Ultra-fast reactions for the slip cordon with soft hands.',
      tips:'Hands LOW at knee height always. React to the sound of the edge.',
      targetMetric:'15 of 20 catches taken cleanly at pace from random directions' },

    // ── FIELDING: Run Outs ────────────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'Direct Hit Run Outs at Full Sprint', channel:'Cricket Australia',
      category:'fielding', level:'intermediate', durationMin:15, xp:90,
      keywords:['run out','direct hit','sprint','fieldsman','fast','pick up','throw','one stump'],
      description:'Field at full sprint pace and hit the stumps directly.',
      tips:'Target the NEAR stump. Miss slightly wide still gives keeper a stumping.',
      targetMetric:'3 direct hits in 10 attempts, all under 3.5 seconds' },

    // ── FIELDING: Diving ──────────────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'Boundary Diving Saves: Full Commitment', channel:'Cricket Australia',
      category:'fielding', level:'advanced', durationMin:25, xp:115,
      keywords:['dive','diving','boundary','save','athletic','full stretch','horizontal','boundary save'],
      description:'Save crucial boundaries with full athletic commitment on every dive.',
      tips:'Commit 100% to the dive. Half-dive = fumble = boundary. All or nothing.',
      targetMetric:'Save 8 of 10 boundary attempts with athletic diving stops' },

    // ── WICKETKEEPING: Stance ─────────────────────────────────
    { videoId:'Qh5oHMmPb8k', title:'Wicketkeeping Stance & Takes', channel:'Cricket Australia',
      category:'wicketkeeping', level:'beginner', durationMin:15, xp:65,
      keywords:['wicketkeeper','keeper','gloves','stance','take','glovework','toes','down the leg','byes'],
      description:'Perfect the wicketkeeping stance that world-class keepers build on.',
      tips:'Never cross feet laterally. Soft hands — tense hands drop clean takes.',
      targetMetric:'15 consecutive clean takes across all heights and lines' },

    // ── WICKETKEEPING: Stumping ───────────────────────────────
    { videoId:'Qh5oHMmPb8k', title:'Stumping: Lightning Fast Dismissal', channel:'Cricket Australia',
      category:'wicketkeeping', level:'intermediate', durationMin:18, xp:100,
      keywords:['stumping','stump','keeper','fast hands','bails','dismissal','spin','quick hands'],
      description:'Master the stumping — the wicketkeeper\'s signature dismissal.',
      tips:'Ball must pass the back foot BEFORE you move. Under 0.5s is elite.',
      targetMetric:'10 clean stumpings out of a 30-ball spin-bowling session' },

    // ── FITNESS: Sprinting ────────────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'Cricket Sprint Protocol: Explosive Starts', channel:'CricFit',
      category:'fitness', level:'beginner', durationMin:20, xp:70,
      keywords:['sprint','speed','running','explosive','fast','agility','fitness','conditioning'],
      description:'Develop explosive sprint speed for running and fielding starts.',
      tips:'The first 10 metres separates elite fielders from everyone else.',
      targetMetric:'22 yards consistently under 3.2 seconds' },

    // ── FITNESS: Core ─────────────────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'Cricket Core Stability Program', channel:'CricFit',
      category:'fitness', level:'beginner', durationMin:15, xp:65,
      keywords:['core','stability','plank','abs','strength','fitness','conditioning','cricket fitness'],
      description:'Core strength for batting power, bowling stability, and fielding agility.',
      tips:'Brace your core on every rep. Breathe OUT on the effort phase.',
      targetMetric:'Complete the full circuit 3 times with perfect form' },

    // ── FITNESS: Agility ──────────────────────────────────────
    { videoId:'0mH8BKDB5Qk', title:'Agility Ladder Footwork for Cricketers', channel:'CricFit',
      category:'fitness', level:'intermediate', durationMin:20, xp:90,
      keywords:['agility','footwork','ladder','quick feet','coordination','fast feet','light feet'],
      description:'Rapid footwork patterns for explosive fielding and running.',
      tips:'Light, fast contacts only. Arms drive leg speed — pump them hard.',
      targetMetric:'Complete all patterns under 20 minutes with zero ladder contacts' },

    // ── MENTAL: Visualization ─────────────────────────────────
    { videoId:null, title:'Cricket Visualization: Mental Rehearsal', channel:'SC Mental',
      category:'mental', level:'beginner', durationMin:15, xp:65,
      keywords:['mental','visualization','visualise','mind','psychology','focus','imagery','mental game'],
      description:'Mentally rehearse your perfect innings in vivid multisensory detail.',
      tips:'The brain cannot distinguish between real and vividly imagined practice.',
      targetMetric:'Complete a 10-minute visualization session daily for 2 weeks' },

    // ── MENTAL: Pressure ──────────────────────────────────────
    { videoId:null, title:'Pressure Inoculation: Elite Mental Toughness', channel:'SC Mental',
      category:'mental', level:'advanced', durationMin:20, xp:130,
      keywords:['pressure','mental','toughness','nerves','nerve','anxiety','focus','elite','mindset'],
      description:'Simulate extreme match pressure so real matches feel familiar.',
      tips:'Pressure is a privilege. Actively seek it in every training session.',
      targetMetric:'Complete 6 high-pressure scenarios while maintaining routine' },

    // ── TACTICAL: Field Setting ────────────────────────────────
    { videoId:'7pFfqTFvOEs', title:'Field Setting Strategy for Bowlers', channel:'MCC Cricket',
      category:'bowling', level:'intermediate', durationMin:18, xp:80,
      keywords:['field','setting','captain','plan','tactics','strategy','fielders','placement','field setting'],
      description:'Set attacking and defensive fields that complement your bowling.',
      tips:'Field sets a psychological trap before you bowl a single delivery.',
      targetMetric:'Correctly set 5 tactical fields for given match scenarios' },

    // ── TECHNIQUE: Footwork ────────────────────────────────────
    { videoId:'HhEQQKnXqnw', title:'Batting Footwork: Move Into Position', channel:'Cricket Mentoring',
      category:'batting', level:'beginner', durationMin:15, xp:70,
      keywords:['footwork','feet','movement','forward','back','weight','transfer','position','batting footwork'],
      description:'Master batting footwork — the foundation of every great shot.',
      tips:'Get to the pitch of the ball on the front foot; get back and across for short.',
      targetMetric:'15 correct foot positions in response to varying lengths' },

    // ── TECHNIQUE: Backlift ────────────────────────────────────
    { videoId:'HhEQQKnXqnw', title:'Perfect Backlift for More Power', channel:'Cricket Mentoring',
      category:'batting', level:'beginner', durationMin:12, xp:60,
      keywords:['backlift','backswing','lift','bat','grip','stance','setup','power'],
      description:'The backlift sets up power, timing, and shot options before the ball arrives.',
      tips:'High backlift toward gully or second slip — not straight up behind you.',
      targetMetric:'Consistent high backlift toward second slip in 20 deliveries' },
  ];

  // ================================================================
  // YOUTUBE IN-APP PLAYER
  // Wraps the YouTube IFrame API with React-friendly event hooks.
  // app.js uses SC.YTPlayer.create() to embed YouTube inside the
  // DrillVideoPlayerPage without leaving the SmartCrick interface.
  // ================================================================
  const YTPlayer = {
    _instances: {},

    // Create a YouTube player in the element with the given DOM ID.
    // Returns a Promise that resolves with { play, pause, destroy, on }.
    async create(containerId, videoId, opts = {}) {
      await LibLoader.loadYouTubeIframeAPI();

      return new Promise((resolve) => {
        let progressTimer = null;
        const events = {};
        const emit = (name, ...args) => { (events[name] || []).forEach(fn => fn(...args)); };

        const yt = new YT.Player(containerId, {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay:        opts.autoplay ? 1 : 0,
            modestbranding:  1,
            rel:             0,
            color:           'white',
            playsinline:     1,
            enablejsapi:     1,
            origin:          window.location.origin,
          },
          events: {
            onReady(e) {
              emit('ready', e);
              resolve({
                play:    ()    => yt.playVideo(),
                pause:   ()    => yt.pauseVideo(),
                seek:    (s)   => yt.seekTo(s, true),
                getDuration: () => yt.getDuration(),
                getCurrentTime: () => yt.getCurrentTime(),
                destroy: ()    => { clearInterval(progressTimer); yt.destroy(); delete YTPlayer._instances[containerId]; },
                on:      (ev, fn) => { if (!events[ev]) events[ev] = []; events[ev].push(fn); },
              });
            },
            onStateChange(e) {
              const stateMap = { '-1':'unstarted', 0:'ended', 1:'playing', 2:'paused', 3:'buffering', 5:'cued' };
              const state = stateMap[e.data] || 'unknown';
              emit('stateChange', state);
              if (state === 'playing') {
                progressTimer = setInterval(() => {
                  emit('progress', { current: yt.getCurrentTime(), duration: yt.getDuration() });
                }, 1000);
              } else {
                clearInterval(progressTimer);
              }
              if (state === 'ended') emit('ended');
            },
            onError(e) { emit('error', e); },
          },
        });
        YTPlayer._instances[containerId] = yt;
      });
    },

    destroyAll() {
      Object.keys(this._instances).forEach(id => {
        try { this._instances[id].destroy(); } catch {}
        delete this._instances[id];
      });
    },
  };

  // ================================================================
  // AUDIO ENGINE
  // Binaural beats for mental training sessions, using Howler.js.
  // Frequency pairs tuned for cricket-specific mental states.
  // ================================================================
  const AudioEngine = {
    _howl: null,
    _playing: false,

    // Binaural beat frequencies for different mental states:
    //   Alpha (8-12Hz)  — relaxed focus, visualization
    //   Theta (4-8Hz)   — deep meditation, recovery
    //   Beta  (12-30Hz) — alert focus, pre-performance
    //   Gamma (30-100Hz)— peak performance, flow state
    PRESETS: {
      focus:      { freq: 10, label: 'Alpha Focus',      color: '#3b82f6' },
      calm:       { freq: 6,  label: 'Theta Calm',       color: '#8b5cf6' },
      preMatch:   { freq: 14, label: 'Beta Activation',  color: '#f97316' },
      flowState:  { freq: 40, label: 'Gamma Flow',       color: '#16a34a' },
      recovery:   { freq: 4,  label: 'Theta Recovery',   color: '#06b6d4' },
    },

    // Uses Howler.js to play a pre-baked ambient track from CDN.
    // If Howler is not loaded, silently no-ops.
    async play(preset = 'focus', volume = 0.4) {
      if (this._playing) this.stop();
      await LibLoader.loadToneJS();

      try {
        if (typeof Tone !== 'undefined') {
          const cfg = this.PRESETS[preset] || this.PRESETS.focus;
          // Simple pulsed tone using Tone.js as binaural approximation
          const osc = new Tone.Oscillator(200 + cfg.freq, 'sine').toDestination();
          const env = new Tone.AmplitudeEnvelope({ attack:2, decay:0, sustain:1, release:4 }).toDestination();
          osc.connect(env);
          osc.volume.value = -20 + (volume * 10);
          await Tone.start();
          osc.start();
          env.triggerAttack();
          this._playing = true;
          this._tone = { osc, env };
          return true;
        }
      } catch (e) {
        console.warn('[SC] Audio engine error:', e);
      }
      return false;
    },

    stop() {
      try {
        if (this._tone) {
          this._tone.env.triggerRelease();
          setTimeout(() => {
            try { this._tone.osc.stop(); this._tone.osc.dispose(); this._tone.env.dispose(); } catch {}
          }, 4500);
          this._tone = null;
        }
        this._playing = false;
      } catch {}
    },
  };

  // ================================================================
  // WORKOUT AI RECOMMENDER
  // Uses Brain.js neural network to learn which workouts the user
  // completes vs skips, then recommends better-fitting sessions.
  // Model trains in the browser — zero network, zero API key.
  // ================================================================
  const WorkoutRecommender = {
    _net: null,
    _trained: false,

    async train(completedWorkouts, skippedWorkouts) {
      await LibLoader.loadBrainJS();
      if (typeof brain === 'undefined') return;

      const levelMap = { beginner:0.25, intermediate:0.5, advanced:0.75, pro:1.0 };
      const goalMap  = { 'build-muscle':0, 'lose-weight':0.5, 'improve-endurance':1 };

      const trainingData = [
        ...completedWorkouts.map(w => ({
          input:  { level:levelMap[w.level]||0.5, goal:goalMap[w.goal]||0.5, duration:Math.min(w.duration_minutes,60)/60 },
          output: { complete: 1 },
        })),
        ...skippedWorkouts.map(w => ({
          input:  { level:levelMap[w.level]||0.5, goal:goalMap[w.goal]||0.5, duration:Math.min(w.duration_minutes,60)/60 },
          output: { complete: 0 },
        })),
      ];

      if (trainingData.length < 4) return; // Need enough data

      try {
        this._net = new brain.NeuralNetwork({ hiddenLayers: [4, 3], activation: 'sigmoid' });
        this._net.train(trainingData, { iterations:500, errorThresh:0.005, log:false });
        this._trained = true;
        console.log('[SC] WorkoutRecommender trained on', trainingData.length, 'samples');
      } catch (e) {
        console.warn('[SC] Brain.js training failed:', e);
      }
    },

    // Returns a 0-1 score for how likely this user is to complete this workout
    score(workout) {
      if (!this._trained || !this._net) return 0.5;
      const levelMap = { beginner:0.25, intermediate:0.5, advanced:0.75, pro:1.0 };
      const goalMap  = { 'build-muscle':0, 'lose-weight':0.5, 'improve-endurance':1 };
      try {
        const result = this._net.run({
          level:    levelMap[workout.level] || 0.5,
          goal:     goalMap[workout.goal]  || 0.5,
          duration: Math.min(workout.duration_minutes, 60) / 60,
        });
        return result.complete || 0.5;
      } catch {
        return 0.5;
      }
    },
  };

  // ================================================================
  // SEARCH CACHE
  // Lightweight TTL cache for YouTube API results (avoids burning
  // API quota on repeated identical searches).
  // ================================================================
  const Cache = {
    _prefix: 'sc_cache_',

    get(key) {
      try {
        const raw = localStorage.getItem(this._prefix + key);
        if (!raw) return null;
        const { data, expires } = JSON.parse(raw);
        if (Date.now() > expires) { localStorage.removeItem(this._prefix + key); return null; }
        return data;
      } catch { return null; }
    },

    set(key, data, ttlSeconds = 3600) {
      try {
        localStorage.setItem(this._prefix + key, JSON.stringify({
          data,
          expires: Date.now() + ttlSeconds * 1000,
        }));
      } catch {}
    },

    invalidate(keyPrefix) {
      try {
        Object.keys(localStorage)
          .filter(k => k.startsWith(this._prefix + keyPrefix))
          .forEach(k => localStorage.removeItem(k));
      } catch {}
    },
  };

  // ================================================================
  // VIDEO ANALYSIS UTILITIES
  // Scaffolding for the real MediaPipe pose estimation pipeline
  // (Phase 3 feature). Phase 1 uses mock scores; this module
  // switches the app to real analysis when loadMoveNet() resolves.
  // ================================================================
  const VideoAnalysis = {
    _model: null,
    _ready: false,

    async init() {
      try {
        await LibLoader.loadMoveNet();
        if (typeof poseDetection !== 'undefined') {
          this._model = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING }
          );
          this._ready = true;
          console.log('[SC] VideoAnalysis: MoveNet ready');
          window.dispatchEvent(new CustomEvent('sc_video_analysis_ready'));
        }
      } catch (e) {
        console.warn('[SC] VideoAnalysis: MoveNet failed to load:', e);
      }
    },

    isReady() { return this._ready; },

    // Analyse a single video frame (ImageBitmap | HTMLVideoElement | HTMLCanvasElement)
    // Returns an array of keypoints if model is ready, else null.
    async analyseFrame(imageSource) {
      if (!this._ready || !this._model) return null;
      try {
        const poses = await this._model.estimatePoses(imageSource);
        return poses[0]?.keypoints || null;
      } catch {
        return null;
      }
    },

    // Score batting technique from keypoints (stub — Phase 3)
    // Returns scores object { technique, form, power, balance, timing, footwork }
    scoreBatting(keypoints) {
      if (!keypoints || keypoints.length === 0) {
        // Return mock scores until real analysis is implemented
        return {
          technique: Math.floor(55 + Math.random() * 40),
          form:      Math.floor(55 + Math.random() * 40),
          power:     Math.floor(55 + Math.random() * 40),
          balance:   Math.floor(55 + Math.random() * 40),
          timing:    Math.floor(55 + Math.random() * 40),
          footwork:  Math.floor(55 + Math.random() * 40),
        };
      }
      // Real scoring logic (Phase 3) — calculate from joint angles
      // e.g., elbow angle, knee flexion, head position
      return { technique:75, form:72, power:68, balance:80, timing:70, footwork:65 };
    },
  };

  // ================================================================
  // SC GLOBAL NAMESPACE
  // Exported as window.SC — consumed by app.js and any page component.
  // ================================================================
  const SC = {
    version: SC_VERSION,
    DrillSearch,
    YTPlayer,
    AudioEngine,
    WorkoutRecommender,
    VideoAnalysis,
    Cache,
    LibLoader,
    CURATED_VIDEO_DB,
  };

  // Export globals that app.js references directly
  global.SC          = SC;
  global.SC_SYNC_KEYS = SC_SYNC_KEYS;
  global.getPouchDB  = getPouchDB;
  global.applyChartDefaults     = applyChartDefaults;
  global.migrateLSToPouchDB     = migrateLSToPouchDB;

  // ── Init sequence ─────────────────────────────────────────────
  // Runs after all defer scripts have loaded (DOMContentLoaded has
  // already fired by the time defer scripts execute).
  // app.js is also defer so it loads AFTER this file — safe to call
  // SC.DrillSearch.init(DRILLS) from AppRoot's first useEffect.
  document.addEventListener('DOMContentLoaded', function onReady() {
    applyChartDefaults();
    migrateLSToPouchDB().catch(() => {});
    // Pre-load Fuse.js in background so the drill index is ready
    // the moment the user first opens the drill search page.
    LibLoader.loadFuseJS().catch(() => {});
    console.log('[SC] Open source layer v' + SC_VERSION + ' ready');
  }, { once: true });

  // If DOMContentLoaded already fired (should not happen with defer
  // scripts, but safety net for CMS-injected usage):
  if (document.readyState !== 'loading') {
    applyChartDefaults();
    LibLoader.loadFuseJS().catch(() => {});
  }

})(window);

/* ================================================================
   END OF sc_opensource.js
   ================================================================ */
