(() => {
  // src/db.js
  function uuid() {
    return "sc_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
  }
  function now() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  function getAll(entity) {
    try {
      return JSON.parse(localStorage.getItem("sc_" + entity) || "[]");
    } catch {
      return [];
    }
  }
  function setAll(entity, arr) {
    localStorage.setItem("sc_" + entity, JSON.stringify(arr));
  }
  function lsList(entity) {
    return getAll(entity);
  }
  function lsFilter(entity, predFn) {
    return getAll(entity).filter(predFn);
  }
  function lsCreate(entity, data) {
    const arr = getAll(entity);
    const record = { ...data, id: data.id || uuid(), created_date: data.created_date || now() };
    arr.push(record);
    setAll(entity, arr);
    return record;
  }
  function lsUpdate(entity, id, updates) {
    const arr = getAll(entity);
    const idx = arr.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    arr[idx] = { ...arr[idx], ...updates, updated_date: now() };
    setAll(entity, arr);
    return arr[idx];
  }
  function lsDelete(entity, id) {
    const arr = getAll(entity).filter((r) => r.id !== id);
    setAll(entity, arr);
    return true;
  }
  var Auth = {
    me() {
      try {
        const s = JSON.parse(localStorage.getItem("sc_session_v2"));
        if (!s) return null;
        if (s.expires && Date.now() > s.expires) {
          localStorage.removeItem("sc_session_v2");
          return null;
        }
        return s;
      } catch {
        return null;
      }
    },
    logout() {
      localStorage.removeItem("sc_session_v2");
      window.location.hash = "#/Home";
      window.location.reload();
    },
    isLoggedIn() {
      return !!Auth.me();
    }
  };
  function getGuestId() {
    const user = Auth.me();
    if (user?.email) return user.email;
    let gId = localStorage.getItem("smartcrick_guest_id");
    if (!gId) {
      gId = "guest_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
      localStorage.setItem("smartcrick_guest_id", gId);
    }
    return gId;
  }
  function getPremiumStatus() {
    try {
      const raw = localStorage.getItem("smartcrick_premium");
      if (!raw) return { is_premium: false, plan: null };
      const data = JSON.parse(raw);
      return { is_premium: true, plan: data.plan || "monthly" };
    } catch {
      return { is_premium: false, plan: null };
    }
  }
  var cache = {};
  var listeners = {};
  function notify(key) {
    (listeners[key] || []).forEach((fn) => fn());
  }
  function invalidate(key) {
    delete cache[key];
    notify(key);
  }
  function useQuery(key, fetchFn, options = {}) {
    const R4 = window.React;
    const [state, setState] = R4.useState({ data: void 0, isLoading: true, error: null });
    const keyStr = Array.isArray(key) ? key.join("|") : key;
    R4.useEffect(() => {
      if (options.enabled === false) {
        setState((s) => ({ ...s, isLoading: false }));
        return;
      }
      let cancelled = false;
      if (!listeners[keyStr]) listeners[keyStr] = [];
      const refresh = () => {
        if (cancelled) return;
        delete cache[keyStr];
        run();
      };
      listeners[keyStr].push(refresh);
      async function run() {
        if (cache[keyStr] !== void 0 && options.staleTime !== 0) {
          setState({ data: cache[keyStr], isLoading: false, error: null });
          return;
        }
        setState((s) => ({ ...s, isLoading: true }));
        try {
          const data = await fetchFn();
          if (!cancelled) {
            cache[keyStr] = data;
            setState({ data, isLoading: false, error: null });
          }
        } catch (err) {
          if (!cancelled) setState({ data: void 0, isLoading: false, error: err });
        }
      }
      run();
      return () => {
        cancelled = true;
        listeners[keyStr] = (listeners[keyStr] || []).filter((fn) => fn !== refresh);
      };
    }, [keyStr, options.enabled]);
    return state;
  }
  function useQueryClient() {
    return {
      invalidateQueries({ queryKey }) {
        const key = Array.isArray(queryKey) ? queryKey.join("|") : queryKey;
        invalidate(key);
      }
    };
  }
  var entities = {
    UserProgress: {
      async filter(q) {
        return lsFilter("UserProgress", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("UserProgress", d);
      },
      async update(id, d) {
        return lsUpdate("UserProgress", id, d);
      },
      async list() {
        return lsList("UserProgress");
      }
    },
    UserProfile: {
      async filter(q) {
        return lsFilter("UserProfile", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("UserProfile", d);
      },
      async update(id, d) {
        return lsUpdate("UserProfile", id, d);
      },
      async list() {
        return lsList("UserProfile");
      }
    },
    Profile: {
      async filter(q) {
        return lsFilter("Profile", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("Profile", d);
      },
      async update(id, d) {
        return lsUpdate("Profile", id, d);
      },
      async list() {
        return lsList("Profile");
      }
    },
    PremiumSubscription: {
      async filter(q) {
        const prem = getPremiumStatus();
        if (!prem.is_premium) return [];
        const gId = getGuestId();
        return [{ id: "prem_local", user_email: gId, is_premium: true, plan: prem.plan }];
      }
    },
    Drill: {
      async list() {
        return window.SC_DATA?.drills || [];
      },
      async filter(q) {
        return (window.SC_DATA?.drills || []).filter((d) => Object.keys(q).every((k) => d[k] === q[k]));
      }
    },
    MentalRoutine: {
      async list() {
        return window.SC_DATA?.mentalRoutines || [];
      },
      async filter(q) {
        return (window.SC_DATA?.mentalRoutines || []).filter((r) => Object.keys(q).every((k) => r[k] === q[k]));
      }
    },
    Workout: {
      async filter(q) {
        return lsFilter("Workout", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("Workout", d);
      },
      async update(id, d) {
        return lsUpdate("Workout", id, d);
      },
      async delete(id) {
        return lsDelete("Workout", id);
      },
      async list() {
        return lsList("Workout");
      }
    },
    Leaderboard: {
      async filter(q) {
        return lsFilter("Leaderboard", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("Leaderboard", d);
      },
      async update(id, d) {
        return lsUpdate("Leaderboard", id, d);
      },
      async list() {
        return lsList("Leaderboard");
      }
    },
    Notification: {
      async filter(q) {
        return lsFilter("Notification", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("Notification", d);
      },
      async update(id, d) {
        return lsUpdate("Notification", id, d);
      },
      async delete(id) {
        return lsDelete("Notification", id);
      },
      async list() {
        return lsList("Notification");
      }
    },
    SkillPath: {
      async filter(q) {
        return lsFilter("SkillPath", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("SkillPath", d);
      },
      async update(id, d) {
        return lsUpdate("SkillPath", id, d);
      },
      async list() {
        return lsList("SkillPath");
      }
    },
    Match: {
      async filter(q) {
        return lsFilter("Match", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("Match", d);
      },
      async update(id, d) {
        return lsUpdate("Match", id, d);
      },
      async delete(id) {
        return lsDelete("Match", id);
      },
      async list() {
        return lsList("Match");
      }
    },
    ScheduledActivity: {
      async filter(q) {
        return lsFilter("ScheduledActivity", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("ScheduledActivity", d);
      },
      async update(id, d) {
        return lsUpdate("ScheduledActivity", id, d);
      },
      async delete(id) {
        return lsDelete("ScheduledActivity", id);
      },
      async list() {
        return lsList("ScheduledActivity");
      }
    },
    CustomDrillWorkout: {
      async filter(q) {
        return lsFilter("CustomDrillWorkout", (r) => Object.keys(q).every((k) => r[k] === q[k]));
      },
      async create(d) {
        return lsCreate("CustomDrillWorkout", d);
      },
      async update(id, d) {
        return lsUpdate("CustomDrillWorkout", id, d);
      },
      async delete(id) {
        return lsDelete("CustomDrillWorkout", id);
      },
      async list() {
        return lsList("CustomDrillWorkout");
      }
    }
  };

  // src/router.js
  var R = window.React;
  function createPageUrl(page) {
    const base = page.includes("?") ? page.split("?")[0] : page;
    const qs = page.includes("?") ? "?" + page.split("?")[1] : "";
    return "#/" + base + qs;
  }
  function navigate(page) {
    window.location.hash = createPageUrl(page);
  }
  function useLocation() {
    const [loc, setLoc] = R.useState(() => parseHash());
    R.useEffect(() => {
      const handler = () => setLoc(parseHash());
      window.addEventListener("hashchange", handler);
      return () => window.removeEventListener("hashchange", handler);
    }, []);
    return loc;
  }
  function parseHash() {
    const raw = window.location.hash.replace(/^#\/?/, "") || "Home";
    const [path, qs] = raw.split("?");
    const params = {};
    if (qs) {
      qs.split("&").forEach((p) => {
        const [k, v] = p.split("=");
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || "");
      });
    }
    return { page: path || "Home", params, pathname: "#/" + path, search: qs ? "?" + qs : "" };
  }
  function getPageParam(key) {
    return parseHash().params[key] || null;
  }

  // src/components.jsx
  var R2 = window.React;
  var { useState, useEffect, useRef, useMemo, useCallback } = R2;
  function Icon({ name, className = "w-5 h-5", ...props }) {
    const icons = window.lucide || {};
    const Comp = icons[name];
    if (!Comp) return React.createElement("span", { className });
    return React.createElement(Comp, { className, ...props });
  }
  function StreakDisplay({ streak = 0 }) {
    return /* @__PURE__ */ React.createElement("div", { className: "streak-badge" }, /* @__PURE__ */ React.createElement(Icon, { name: "Flame", className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, streak, " day", streak !== 1 ? "s" : ""));
  }
  function LevelProgressBar({ xp = 0 }) {
    const levelThresholds = [0, 500, 1500, 3500, 7500, 15e3, 3e4];
    const levelNames = ["Rookie", "Amateur", "Club Player", "District", "State", "National", "International"];
    let level = 0;
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
      if (xp >= levelThresholds[i]) {
        level = i;
        break;
      }
    }
    const current = levelThresholds[level] || 0;
    const next = levelThresholds[level + 1] || levelThresholds[level] + 5e3;
    const pct = Math.min(100, Math.round((xp - current) / (next - current) * 100));
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs text-slate-400" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-emerald-400" }, levelNames[level] || "Legend"), /* @__PURE__ */ React.createElement("span", null, xp, " XP")), /* @__PURE__ */ React.createElement("div", { className: "level-bar-track" }, /* @__PURE__ */ React.createElement("div", { className: "level-bar-fill", style: { width: pct + "%" } })));
  }
  var MENU_ITEMS = [
    { name: "SmartCrick Head Coach", icon: "Crown", page: "HeadCoach", color: "text-purple-600", premium: "yearly", highlight: true },
    { name: "90-Day Challenge", icon: "Rocket", page: "NinetyDayChallenge", color: "text-purple-500", premium: "lifetime", highlight: true },
    { name: "30-Day Challenge", icon: "Flame", page: "ThirtyDayChallenge", color: "text-orange-500", highlight: true },
    { name: "Get Started", icon: "Sparkles", page: "GetToKnowYou", color: "text-pink-500", highlight: true },
    { name: "Home", icon: "Home", page: "Home", color: "text-emerald-500" },
    { name: "Goals", icon: "Target", page: "Goals", color: "text-purple-600", highlight: true },
    { name: "AI Coach", icon: "MessageCircle", page: "Coach", color: "text-blue-500" },
    { name: "Skill Paths", icon: "TrendingUp", page: "SkillPaths", color: "text-teal-500" },
    { name: "Drills", icon: "Target", page: "Drills", color: "text-purple-500" },
    { name: "YouTube Drill Finder", icon: "Video", page: "DrillYouTubeFinder", color: "text-red-500" },
    { name: "Drill Workout", icon: "Target", page: "DrillWorkoutCreator", color: "text-blue-500" },
    { name: "Workout Builder", icon: "Dumbbell", page: "WorkoutBuilder", color: "text-purple-600" },
    { name: "AI Workout", icon: "Sparkles", page: "AIWorkout", color: "text-pink-500" },
    { name: "Fitness Builder", icon: "Zap", page: "FitnessBuilder", color: "text-orange-500" },
    { name: "Mental Training", icon: "Brain", page: "MentalCoaching", color: "text-indigo-500" },
    { name: "Mental Creator", icon: "Brain", page: "MentalTrainingCreator", color: "text-purple-500" },
    { name: "Quizzes", icon: "BookOpen", page: "Quizzes", color: "text-amber-500" },
    { name: "Match Tracker", icon: "Trophy", page: "MatchTracker", color: "text-green-600" },
    { name: "Mini-Match", icon: "Zap", page: "MiniMatch", color: "text-orange-500" },
    { name: "Schedule", icon: "Calendar", page: "Schedule", color: "text-violet-500" },
    { name: "Why Did I Get Out?", icon: "TrendingDown", page: "WhyDidIGetOut", color: "text-red-600" },
    { name: "Progress", icon: "Trophy", page: "Progress", color: "text-pink-500" },
    { name: "My Profile", icon: "User", page: "Profile", color: "text-indigo-600" }
  ];
  function Sidebar() {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const scrollRef = useRef(null);
    const scrollPos = useRef(0);
    const { page: currentPage } = useLocation();
    const close = () => {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 220);
    };
    const go = (page) => {
      close();
      setTimeout(() => navigate(page), 80);
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setOpen(true),
        style: { WebkitTapHighlightColor: "transparent" },
        className: "fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-200"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "Menu", className: "w-6 h-6 text-white" })
    ), open && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "sidebar-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
        onClick: close
      }
    ), open && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `sidebar-panel${closing ? " closing" : ""} fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col`,
        onAnimationStart: () => {
          requestAnimationFrame(() => {
            if (scrollRef.current) scrollRef.current.scrollTop = scrollPos.current;
          });
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "bg-gradient-to-r from-emerald-500 to-teal-500 p-6 flex items-center justify-between",
          style: { paddingTop: "max(1.5rem, env(safe-area-inset-top))" }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white" }, "Smart Cricket"), /* @__PURE__ */ React.createElement("p", { className: "text-emerald-100 text-sm" }, "Train Like a Pro")),
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => go("Home"),
            className: "p-2 hover:bg-white/20 rounded-lg transition-colors"
          },
          /* @__PURE__ */ React.createElement(Icon, { name: "Home", className: "w-5 h-5 text-white" })
        ), /* @__PURE__ */ React.createElement("button", { onClick: close, className: "p-2 hover:bg-white/20 rounded-lg transition-colors" }, /* @__PURE__ */ React.createElement(Icon, { name: "X", className: "w-6 h-6 text-white" })))
      ),
      /* @__PURE__ */ React.createElement("div", { className: "flex-1 relative overflow-hidden" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          ref: scrollRef,
          onScroll: () => {
            scrollPos.current = scrollRef.current?.scrollTop || 0;
          },
          className: "h-full overflow-y-auto p-4 space-y-2 scrollbar-visible",
          style: { paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }
        },
        MENU_ITEMS.map((item, i) => {
          const isActive = currentPage === item.page;
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: item.page,
              onClick: () => go(item.page),
              className: `w-full text-left group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 relative hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md ${isActive ? "bg-emerald-50 shadow-sm" : ""}`,
              style: { animationDelay: i * 30 + "ms" }
            },
            /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-lg transition-colors duration-200 ${item.highlight ? "bg-gradient-to-r from-purple-100 to-pink-100" : "bg-slate-50"} ${item.color}` }, /* @__PURE__ */ React.createElement(Icon, { name: item.icon, className: "w-5 h-5 transition-transform duration-200 group-hover:scale-110" })),
            /* @__PURE__ */ React.createElement("span", { className: `font-medium transition-colors flex-1 text-sm ${item.highlight ? "text-purple-700" : "text-slate-700"}` }, item.name),
            item.premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge" }, item.premium === "yearly" ? "Yearly" : "Lifetime")
          );
        })
      ))
    ));
  }
  var NAV_ITEMS = [
    { name: "Home", icon: "Home", page: "Home" },
    { name: "Coach", icon: "MessageCircle", page: "Coach" },
    { name: "Drills", icon: "Target", page: "Drills" },
    { name: "Premium", icon: "Crown", page: "Premium" },
    { name: "Timer", icon: "Clock", page: "Timer" }
  ];
  function BottomNav() {
    const { page: currentPage } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    return /* @__PURE__ */ React.createElement("nav", { className: `bottom-nav-container fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-emerald-100 dark:border-slate-700 z-50 transition-transform duration-300${collapsed ? " translate-y-full" : ""}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCollapsed((c) => !c),
        "aria-label": collapsed ? "Show navigation" : "Hide navigation",
        className: "absolute left-1/2 -translate-x-1/2 -top-10 bg-white dark:bg-slate-800 rounded-t-xl px-4 py-2 shadow-lg border border-b-0 border-emerald-100 dark:border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: collapsed ? "ChevronUp" : "ChevronDown", className: "w-5 h-5 text-slate-600 dark:text-slate-300" })
    ), /* @__PURE__ */ React.createElement("div", { className: "max-w-lg mx-auto flex items-center justify-around px-2 py-2" }, NAV_ITEMS.map((item) => {
      const isActive = currentPage === item.page;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: item.name,
          onClick: () => navigate(item.page),
          "aria-label": `Navigate to ${item.name}`,
          className: `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-h-[52px] min-w-[52px] justify-center ${isActive ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500 hover:text-emerald-500"}`
        },
        /* @__PURE__ */ React.createElement(Icon, { name: item.icon, className: `w-5 h-5 transition-transform duration-300${isActive ? " scale-110" : ""}` }),
        /* @__PURE__ */ React.createElement("span", { className: `text-xs font-medium${isActive ? " text-emerald-600 dark:text-emerald-400" : " text-slate-500 dark:text-slate-400"}` }, item.name)
      );
    })));
  }
  var SEARCH_PAGES = [
    { name: "Drills", keywords: ["drill", "practice", "batting", "bowling"] },
    { name: "Coach", keywords: ["coach", "ai", "help", "chat"] },
    { name: "AIWorkout", keywords: ["workout", "fitness", "exercise", "ai workout"] },
    { name: "FitnessBuilder", keywords: ["fitness", "builder", "gym"] },
    { name: "MentalCoaching", keywords: ["mental", "mind", "meditation", "focus"] },
    { name: "SkillPaths", keywords: ["skill", "path", "journey"] },
    { name: "Progress", keywords: ["progress", "stats", "xp", "achievement"] },
    { name: "Premium", keywords: ["premium", "upgrade", "subscription"] },
    { name: "Profile", keywords: ["profile", "account", "settings"] },
    { name: "Timer", keywords: ["timer", "stopwatch", "countdown"] },
    { name: "MatchTracker", keywords: ["match", "tracker", "game"] },
    { name: "Leaderboard", keywords: ["leaderboard", "rank", "compete"] },
    { name: "Goals", keywords: ["goals", "target", "objective"] },
    { name: "Schedule", keywords: ["schedule", "calendar", "plan"] },
    { name: "WorkoutBuilder", keywords: ["workout builder", "custom"] },
    { name: "NinetyDayChallenge", keywords: ["90 day", "challenge", "program"] },
    { name: "WhyDidIGetOut", keywords: ["dismissal", "out", "wicket"] }
  ];
  function QuickPageSearch({ isDarkMode }) {
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const filtered = SEARCH_PAGES.filter(
      (p) => p.name.toLowerCase().includes(term.toLowerCase()) || p.keywords.some((k) => k.includes(term.toLowerCase()))
    );
    return /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Icon, { name: "Search", className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        value: term,
        onChange: (e) => {
          setTerm(e.target.value);
          setOpen(true);
        },
        onFocus: () => setOpen(true),
        placeholder: "Quick search: Drills, Coach, Goals...",
        className: `w-full h-14 pl-12 pr-12 rounded-2xl border-2 focus:outline-none text-sm ${isDarkMode ? "bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500" : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-emerald-400"}`
      }
    ), term && /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setTerm("");
      setOpen(false);
    }, className: "absolute right-4 top-1/2 -translate-y-1/2" }, /* @__PURE__ */ React.createElement(Icon, { name: "X", className: "w-4 h-4 text-slate-500" }))), open && term && filtered.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "search-dropdown" }, filtered.slice(0, 6).map((p) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: p.name,
        onClick: () => {
          navigate(p.name);
          setTerm("");
          setOpen(false);
        },
        className: "w-full px-5 py-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0 flex items-center gap-3"
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "Search", className: "w-4 h-4 text-emerald-500" }),
      /* @__PURE__ */ React.createElement("span", { className: "font-medium text-slate-800 dark:text-slate-200 text-sm" }, p.name)
    ))), /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) })));
  }
  var MOODS = [
    { value: "great", label: "Great!", icon: "Smile", color: "from-emerald-500 to-teal-500" },
    { value: "good", label: "Good", icon: "Smile", color: "from-blue-500 to-cyan-500" },
    { value: "okay", label: "Okay", icon: "Meh", color: "from-amber-500 to-orange-500" },
    { value: "not_great", label: "Not Great", icon: "Frown", color: "from-orange-500 to-red-500" }
  ];
  function PlayerCheckIn({ isDarkMode }) {
    const [checked, setChecked] = useState(() => {
      return localStorage.getItem("checkin_date") === (/* @__PURE__ */ new Date()).toDateString();
    });
    const [pending, setPending] = useState(false);
    if (checked) return null;
    const checkIn = async (mood) => {
      setPending(true);
      setChecked(true);
      try {
        const gId = getGuestId();
        const today = /* @__PURE__ */ new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        await entities.ScheduledActivity.create({
          user_email: gId,
          title: `Mood Check-In: ${mood.label}`,
          notes: `Feeling ${mood.label.toLowerCase()} today`,
          date: dateStr,
          activity_type: "custom"
        });
        localStorage.setItem("checkin_date", (/* @__PURE__ */ new Date()).toDateString());
        setTimeout(() => navigate("ScheduleExtendedView"), 1e3);
      } catch (e) {
        console.error(e);
      }
      setPending(false);
    };
    return /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border ${isDarkMode ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" : "bg-gradient-to-br from-white to-pink-50/30 border-white/50"}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-4 text-lg flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}` }, /* @__PURE__ */ React.createElement(Icon, { name: "Heart", className: "w-6 h-6 text-pink-500" }), "Player Check-In"), /* @__PURE__ */ React.createElement("p", { className: `text-sm mb-4 ${isDarkMode ? "text-slate-300" : "text-slate-600"}` }, "How are you feeling today?"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, MOODS.map((mood) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: mood.value,
        onClick: () => checkIn(mood),
        disabled: pending,
        className: `p-4 rounded-2xl transition-all flex flex-col items-center ${isDarkMode ? "bg-slate-700 hover:bg-slate-600 border border-slate-600" : "bg-white hover:bg-slate-50 border border-slate-200"} ${pending ? "opacity-50" : ""}`
      },
      /* @__PURE__ */ React.createElement(Icon, { name: mood.icon, className: `w-10 h-10 mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}` }),
      /* @__PURE__ */ React.createElement("p", { className: `font-semibold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}` }, mood.label)
    ))));
  }
  function SmartStart({ isDarkMode }) {
    const guestId = getGuestId();
    const prem = getPremiumStatus();
    const [recs, setRecs] = useState([]);
    const [completedKeys, setCompletedKeys] = useState([]);
    const [pending, setPending] = useState(false);
    const qc = useQueryClient();
    useEffect(() => {
      const drills = window.SC_DATA?.drills || [];
      const mentals = window.SC_DATA?.mentalRoutines || [];
      const workouts = window.SC_DATA?.quickStartWorkouts || [];
      if (!drills.length && !mentals.length) return;
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const seed = (today + guestId).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      const pick = (arr, n) => {
        const s = [...arr];
        for (let i = s.length - 1; i > 0; i--) {
          const j = seed * (i + 1) % s.length;
          [s[i], s[j]] = [s[j], s[i]];
        }
        return s.slice(0, n);
      };
      const avDrills = drills.filter((d) => !d.is_premium || prem.is_premium);
      const avMentals = mentals.filter((m) => !m.is_premium || prem.is_premium);
      const avWorkouts = workouts.filter((w) => !w.is_premium || prem.is_premium);
      const total = [3, 4, 5][seed % 3];
      const mCount = total === 5 ? 2 : 1;
      const dCount = total === 3 ? 1 : 2;
      const built = [];
      pick(avMentals, mCount).forEach((m) => built.push({ type: "mental", id: m.id, title: m.title, category: m.category?.replace("-", " ") || "Mental", label: "Mental Session", icon: "brain", data: m }));
      pick(avDrills, dCount).forEach((d) => built.push({ type: "drill", id: d.id, title: d.title, category: d.category, label: "Cricket Drill", icon: "target", data: d }));
      if (avWorkouts.length) {
        const w = avWorkouts[seed % avWorkouts.length];
        built.push({ type: "workout", id: w.name, title: w.name, category: `${w.target} \xB7 ${w.level}`, label: "Featured Workout", icon: "dumbbell", data: w, isPremium: !!w.is_premium });
      }
      setRecs(built);
      const key = `smartstart_completed_${today}_${guestId}`;
      setCompletedKeys(JSON.parse(localStorage.getItem(key) || "[]"));
    }, [guestId]);
    useEffect(() => {
      const handler = (e) => {
        const { type, id } = e.detail || {};
        if (!type) return;
        const today = (/* @__PURE__ */ new Date()).toDateString();
        const key = `smartstart_completed_${today}_${guestId}`;
        const done = JSON.parse(localStorage.getItem(key) || "[]");
        const ik = `${type}_${id}`;
        if (!done.includes(ik)) {
          done.push(ik);
          localStorage.setItem(key, JSON.stringify(done));
          setCompletedKeys([...done]);
        }
      };
      window.addEventListener("smartstart_item_completed", handler);
      return () => window.removeEventListener("smartstart_item_completed", handler);
    }, [guestId]);
    const handleClick = async (item) => {
      if (item.type === "drill") {
        navigate(`DrillDetail?id=${item.id}`);
        return;
      }
      if (item.type === "mental") {
        navigate(`MentalRoutinePlayer?id=${item.id}`);
        return;
      }
      if (item.type === "workout") {
        if (item.isPremium && !prem.is_premium) {
          alert("This workout requires Premium!");
          return;
        }
        setPending(true);
        try {
          const drillList = [];
          (item.data.exercises || []).forEach((ex) => {
            const sets = ex.sets || 3;
            for (let s = 1; s <= sets; s++) {
              drillList.push({ drill_id: `fit_${Math.random().toString(36).substr(2, 6)}_s${s}`, drill_title: `${ex.name} \u2014 Set ${s}`, sets: 1, reps: ex.reps || 10, completed_sets: 0, type: "exercise", category: "fitness", instructions: ex.instructions || "", rest_seconds: ex.rest_seconds || 60 });
              if (s < sets) drillList.push({ drill_id: `rest_${Math.random().toString(36).substr(2, 6)}`, drill_title: "Rest Period", sets: 1, reps: ex.rest_seconds || 60, completed_sets: 0, type: "rest", rest_seconds: ex.rest_seconds || 60 });
            }
          });
          localStorage.removeItem("workoutProgress");
          const created = await entities.Workout.create({ user_email: guestId, name: item.data.name, drills: drillList, status: "not_started", xp_value: item.data.xp_value || 100 });
          localStorage.setItem("fitnessbuilder_new_workout_id", created.id);
          qc.invalidateQueries({ queryKey: ["userGeneratedWorkouts"] });
          navigate("AIWorkout");
        } catch (e) {
          console.error(e);
        }
        setPending(false);
      }
    };
    const isDone = (item) => completedKeys.includes(`${item.type}_${item.id}`);
    const iconMap = { brain: "Brain", target: "Target", dumbbell: "Dumbbell" };
    return /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border mt-2 ${isDarkMode ? "bg-gradient-to-br from-orange-600 to-red-600 border-orange-500" : "bg-gradient-to-br from-orange-500 to-red-500 border-orange-400"}` }, /* @__PURE__ */ React.createElement("h2", { className: "font-bold mb-1 text-lg flex items-center gap-2 text-white" }, /* @__PURE__ */ React.createElement(Icon, { name: "Zap", className: "w-6 h-6 text-yellow-300" }), "Smart Start"), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4 text-orange-100" }, "Personalised picks just for today \u2014 updated daily"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, recs.map((rec, i) => {
      const done = isDone(rec);
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: `${rec.type}-${rec.id}`,
          onClick: () => handleClick(rec),
          disabled: pending,
          className: `w-full text-left p-4 rounded-xl backdrop-blur-sm transition-all border ${done ? "bg-white/30 border-white/50" : "bg-white/20 hover:bg-white/30 border-white/30"}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, done ? /* @__PURE__ */ React.createElement(Icon, { name: "CheckCircle2", className: "w-5 h-5 text-white flex-shrink-0" }) : /* @__PURE__ */ React.createElement(Icon, { name: iconMap[rec.icon] || "Zap", className: "w-5 h-5 text-white/80 flex-shrink-0" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: `font-semibold text-sm truncate ${done ? "line-through text-white/70" : "text-white"}` }, rec.title), /* @__PURE__ */ React.createElement("p", { className: `text-xs capitalize ${done ? "text-white/60" : "text-orange-100"}` }, done ? "Done today \u2014 tap to do again" : `${rec.label} \xB7 ${rec.category}`)), rec.isPremium && !prem.is_premium && !done && /* @__PURE__ */ React.createElement(Icon, { name: "Lock", className: "w-4 h-4 text-amber-300 flex-shrink-0" }), done && /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium flex-shrink-0" }, "Again"), pending && rec.type === "workout" && /* @__PURE__ */ React.createElement("div", { className: "spinner-sm flex-shrink-0" }))
      );
    }), !recs.length && /* @__PURE__ */ React.createElement("div", { className: "text-center py-4 text-orange-100 text-sm" }, "Loading your picks...")));
  }
  var NO_NAV_PAGES = ["Onboarding", "DrillDetail", "MentalRoutinePlayer", "QuizPlayer", "GetToKnowYou"];
  var LIGHT_BG_PAGES = ["HeadCoach", "NinetyDayChallenge", "ThirtyDayChallenge", "Coach", "DrillYouTubeFinder", "AIDrillRecommendation"];
  function Layout({ children, page }) {
    const showNav = !NO_NAV_PAGES.includes(page);
    const lightBg = LIGHT_BG_PAGES.includes(page);
    useEffect(() => {
      const theme = localStorage.getItem("theme") || "dark";
      document.documentElement.classList.toggle("dark", theme === "dark");
    }, []);
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen ${lightBg ? "bg-white" : ""}` }, showNav && /* @__PURE__ */ React.createElement(Sidebar, null), /* @__PURE__ */ React.createElement("main", { className: showNav ? "page-content" : "min-h-screen" }, children), showNav && /* @__PURE__ */ React.createElement(BottomNav, null), showNav && /* @__PURE__ */ React.createElement(RelevanceChatbot, null));
  }
  function RelevanceChatbot() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setLoaded(true), 3e3);
      return () => clearTimeout(t);
    }, []);
    if (!loaded) return null;
    return /* @__PURE__ */ React.createElement("div", { id: "relevance-chatbot-wrapper" }, /* @__PURE__ */ React.createElement("script", { dangerouslySetInnerHTML: { __html: `
        (function(r,e,l,e2,v,a,n,t){
          r.RelevanceAIObject=n;r[n]=r[n]||function(){(r[n].q=r[n].q||[]).push(arguments)};
        })(window,document,'script','','','','relevanceai');
        relevanceai('init','bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/796ea726-3ea3-4505-87cc-0efc3338f064');
      ` } }));
  }

  // src/app.jsx
  var R3 = window.React;
  var { useState: useState2, useEffect: useEffect2, useRef: useRef2, useMemo: useMemo2, useCallback: useCallback2 } = R3;
  function Icon2({ name, className = "w-5 h-5", ...props }) {
    const icons = window.lucide || {};
    const Comp = icons[name];
    if (!Comp) return React.createElement("span", { className });
    return React.createElement(Comp, { className, ...props });
  }
  function showXPFlash(xp, x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const el = document.createElement("div");
    el.className = "xp-flash";
    el.textContent = `+${xp} XP`;
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
  function Home() {
    const guestId = getGuestId();
    const [isDarkMode, setIsDarkMode] = useState2(() => {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      return true;
    });
    const [greeting, setGreeting] = useState2("");
    const qc = useQueryClient();
    const { data: user } = useQuery(["currentUser"], () => Auth.me());
    const { data: progress } = useQuery(["userProgress", guestId], async () => {
      const results = await entities.UserProgress.filter({ user_email: guestId });
      return results[0] || null;
    }, { staleTime: 0 });
    const { data: profile } = useQuery(["profile", guestId], async () => {
      const ps = await entities.Profile.filter({ user_email: guestId });
      return ps[0] || null;
    }, { staleTime: 3e4 });
    useEffect2(() => {
      const h = (/* @__PURE__ */ new Date()).getHours();
      setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
      window.scrollTo(0, 0);
    }, []);
    useEffect2(() => {
      document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);
    useEffect2(() => {
      const handler = () => qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
      window.addEventListener("smartstart_item_completed", handler);
      return () => window.removeEventListener("smartstart_item_completed", handler);
    }, [guestId]);
    const toggleDark = () => {
      const next = !isDarkMode;
      setIsDarkMode(next);
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
    };
    const getJoke = () => {
      const today = (/* @__PURE__ */ new Date()).toDateString();
      if (localStorage.getItem("cricket_joke_date") === today) return localStorage.getItem("cricket_joke") || "";
      const jokes = window.SC_DATA?.jokes || [];
      const j = jokes[Math.floor(Math.random() * jokes.length)];
      localStorage.setItem("cricket_joke_date", today);
      localStorage.setItem("cricket_joke", j);
      return j;
    };
    const getFact = () => {
      const today = (/* @__PURE__ */ new Date()).toDateString();
      if (localStorage.getItem("cricket_fact_date") === today) return localStorage.getItem("cricket_fact") || "";
      const facts = window.SC_DATA?.facts || [];
      const f = facts[Math.floor(Math.random() * facts.length)];
      localStorage.setItem("cricket_fact_date", today);
      localStorage.setItem("cricket_fact", f);
      return f;
    };
    const displayName = profile?.username || progress?.display_name || user?.full_name?.split(" ")[0] || "Champ";
    const QUICK_ACTIONS = [
      { name: "Ask Coach", icon: "MessageCircle", color: "bg-emerald-500", page: "Coach", description: "Get instant cricket tips" },
      { name: "Practice", icon: "Target", color: "bg-blue-500", page: "Drills", description: "Start a drill session" },
      { name: "Mental Training", icon: "Brain", color: "bg-purple-500", page: "MentalCoaching", description: "Build mental strength" },
      { name: "Quiz", icon: "BookOpen", color: "bg-amber-500", page: "Quizzes", description: "Test your knowledge" }
    ];
    const EXPLORE = [
      { name: "Fitness Builder", icon: "Dumbbell", page: "FitnessBuilder", color: "from-orange-500 to-red-500", desc: "AI workout plans" },
      { name: "AI Workout", icon: "Dumbbell", page: "AIWorkout", color: "from-cyan-500 to-blue-500", desc: "Your custom workouts" },
      { name: "Mini-Match", icon: "Zap", page: "MiniMatch", color: "from-purple-500 to-pink-500", desc: "Test your IQ" },
      { name: "Skill Paths", icon: "TrendingUp", page: "SkillPaths", color: "from-emerald-500 to-teal-500", desc: "Level up now" },
      { name: "Leaderboard", icon: "Award", page: "Leaderboard", color: "from-amber-500 to-orange-500", desc: "Compete globally" },
      { name: "Drill Workout", icon: "Target", page: "DrillWorkoutCreator", color: "from-indigo-500 to-purple-500", desc: "Build your workout" },
      { name: "Why Got Out?", icon: "Search", page: "WhyDidIGetOut", color: "from-red-500 to-orange-500", desc: "Analyze dismissals" },
      { name: "Match Tracker", icon: "Trophy", page: "MatchTracker", color: "from-green-500 to-teal-500", desc: "Log your matches" }
    ];
    const bg = isDarkMode ? "bg-gradient-to-br from-gray-900 via-slate-950 to-black" : "bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50";
    const headerBg = isDarkMode ? "bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900" : "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500";
    const cardBg = isDarkMode ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" : "bg-gradient-to-br from-white to-blue-50/30 border-white/50";
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 transition-colors duration-300 ${bg}` }, /* @__PURE__ */ React.createElement("div", { className: `relative overflow-hidden px-6 pt-8 pb-24 transition-colors duration-300 ${headerBg}` }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-32 translate-x-32", style: { filter: "blur(100px)" } }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-24 -translate-x-24", style: { filter: "blur(100px)" } }), /* @__PURE__ */ React.createElement("div", { className: "relative max-w-lg mx-auto pt-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-4 animate-fade-up" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Sparkles", className: "w-5 h-5 text-amber-300" }), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-sm" }, "Cricket Joke of the Day")), /* @__PURE__ */ React.createElement("p", { className: "text-white/90 text-sm leading-relaxed" }, getJoke())), /* @__PURE__ */ React.createElement("div", { className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-4 animate-fade-up delay-50" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Target", className: "w-5 h-5 text-emerald-300" }), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-sm" }, "Cricket Fact of the Day")), /* @__PURE__ */ React.createElement("p", { className: "text-white/90 text-sm leading-relaxed" }, getFact())), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: toggleDark,
        className: "w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-4 flex items-center justify-between hover:bg-white/20 transition-colors animate-fade-up delay-100"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Icon2, { name: isDarkMode ? "Sun" : "Moon", className: "w-5 h-5 text-white" }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-white text-sm" }, isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode")),
      /* @__PURE__ */ React.createElement(Icon2, { name: "ChevronRight", className: "w-5 h-5 text-white" })
    ), /* @__PURE__ */ React.createElement("div", { className: "mb-6 animate-fade-up delay-100" }, /* @__PURE__ */ React.createElement("p", { className: "text-emerald-100 text-sm mb-1" }, greeting, "!"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-white" }, "Hey, ", displayName), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("ScheduleExtendedView"), className: "text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-1 text-sm transition-colors" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Calendar", className: "w-5 h-5" }), /* @__PURE__ */ React.createElement("span", null, "Schedule"))), (progress?.current_streak || 0) >= 0 && /* @__PURE__ */ React.createElement(StreakDisplay, { streak: progress?.current_streak || 0 })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 animate-fade-up delay-150" }, [
      { icon: "Target", val: progress?.completed_drills?.length || 0, label: "Drills" },
      { icon: "Brain", val: progress?.completed_mental_routines?.length || 0, label: "Mental" },
      { icon: "Clock", val: progress?.total_practice_minutes || 0, label: "Minutes" },
      { icon: "Trophy", val: progress?.total_xp || 0, label: "XP" }
    ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, className: "bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg" }, /* @__PURE__ */ React.createElement(Icon2, { name: s.icon, className: "w-8 h-8 text-white mx-auto mb-1" }), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-white" }, s.val), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-emerald-50 font-medium" }, s.label)))))), /* @__PURE__ */ React.createElement("div", { className: "px-6 -mt-12 max-w-lg mx-auto space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "pt-2 mt-2" }, /* @__PURE__ */ React.createElement(SmartStart, { isDarkMode })), /* @__PURE__ */ React.createElement(PlayerCheckIn, { isDarkMode }), /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border ${cardBg}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-5 flex items-center gap-2 text-lg ${isDarkMode ? "text-white" : "text-slate-800"}` }, /* @__PURE__ */ React.createElement(Icon2, { name: "Sparkles", className: "w-6 h-6 text-amber-500" }), "Let's Train!"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, QUICK_ACTIONS.map((a) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: a.name,
        onClick: () => navigate(a.page),
        className: `rounded-2xl p-5 transition-all shadow-lg hover:shadow-xl border text-left ${isDarkMode ? "bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border-slate-600" : "bg-gradient-to-br from-white to-slate-50 hover:from-slate-50 hover:to-slate-100 border-slate-100"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 ${a.color} rounded-xl flex items-center justify-center mb-3 shadow-md` }, /* @__PURE__ */ React.createElement(Icon2, { name: a.icon, className: "w-6 h-6 text-white" })),
      /* @__PURE__ */ React.createElement("h3", { className: `font-bold text-sm mb-1 ${isDarkMode ? "text-white" : "text-slate-800"}` }, a.name),
      /* @__PURE__ */ React.createElement("p", { className: `text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}` }, a.description)
    )))), /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border ${isDarkMode ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" : "bg-gradient-to-br from-white to-purple-50/30 border-white/50"}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-5 text-lg flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}` }, /* @__PURE__ */ React.createElement(Icon2, { name: "Star", className: "w-6 h-6 text-purple-500" }), "Explore More"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, EXPLORE.map((e) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: e.name,
        onClick: () => navigate(e.page),
        className: `bg-gradient-to-br ${e.color} hover:opacity-90 rounded-2xl p-5 transition-all shadow-lg hover:shadow-xl text-left`
      },
      /* @__PURE__ */ React.createElement(Icon2, { name: e.icon, className: "w-10 h-10 text-white mb-2" }),
      /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-sm mb-1" }, e.name),
      /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/80" }, e.desc)
    )))), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Progress"), className: "w-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-6 flex items-center justify-between hover:shadow-2xl transition-all border border-emerald-400" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Trophy", className: "w-7 h-7 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-lg" }, "Your Progress"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-emerald-50 font-medium" }, progress?.badges?.length || 0, " badges \xB7 ", progress?.completed_drills?.length || 0, " drills"))), /* @__PURE__ */ React.createElement(Icon2, { name: "ChevronRight", className: "w-6 h-6 text-white" })), /* @__PURE__ */ React.createElement(QuickPageSearch, { isDarkMode }), /* @__PURE__ */ React.createElement("div", { className: "h-16" })));
  }
  function Drills() {
    const [search, setSearch] = useState2("");
    const [category, setCategory] = useState2("All");
    const drills = window.SC_DATA?.drills || [];
    const cats = ["All", ...Array.from(new Set(drills.map((d) => d.category)))];
    const filtered = drills.filter(
      (d) => (category === "All" || d.category === category) && (!search || d.title.toLowerCase().includes(search.toLowerCase()))
    );
    const isDark = document.documentElement.classList.contains("dark");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-emerald-600 to-teal-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-4" }, "Cricket Drills"), /* @__PURE__ */ React.createElement("div", { className: "relative mb-4" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Search", className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search drills...",
        className: "w-full h-12 pl-12 pr-4 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:outline-none focus:bg-white/30"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 overflow-x-auto pb-1" }, cats.map((c) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: c,
        onClick: () => setCategory(c),
        className: `px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all ${category === c ? "bg-white text-emerald-600 border-white" : "bg-white/20 text-white border-white/30 hover:bg-white/30"}`
      },
      c
    )))), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 space-y-3 max-w-lg mx-auto" }, filtered.map((d) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d.id,
        onClick: () => navigate(`DrillDetail?id=${d.id}`),
        className: `w-full text-left rounded-2xl p-4 shadow-md border transition-all hover:scale-[1.01] ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: `text-xs font-semibold px-2 py-0.5 rounded-full ${d.difficulty === "Beginner" ? "bg-emerald-100 text-emerald-700" : d.difficulty === "Intermediate" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}` }, d.difficulty), d.is_premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge" }, "Pro")), /* @__PURE__ */ React.createElement("h3", { className: `font-bold text-base ${isDark ? "text-white" : "text-slate-800"}` }, d.title), /* @__PURE__ */ React.createElement("p", { className: `text-sm mt-1 line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}` }, d.description), /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-3 mt-2 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}` }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Clock", className: "w-3 h-3" }), d.duration_minutes, " min"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Zap", className: "w-3 h-3 text-amber-500" }), d.xp_value, " XP"))), /* @__PURE__ */ React.createElement(Icon2, { name: "ChevronRight", className: `w-5 h-5 mt-2 flex-shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}` }))
    )), !filtered.length && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12 text-slate-500" }, "No drills found.")));
  }
  function DrillDetail() {
    const id = getPageParam("id");
    const drill = (window.SC_DATA?.drills || []).find((d) => d.id === id);
    const isDark = document.documentElement.classList.contains("dark");
    const guestId = getGuestId();
    const qc = useQueryClient();
    const complete = async () => {
      try {
        const results = await entities.UserProgress.filter({ user_email: guestId });
        const prog = results[0];
        const already = prog?.completed_drills?.includes(drill.id);
        if (prog) {
          const newDrills = already ? prog.completed_drills : [...prog.completed_drills || [], drill.id];
          await entities.UserProgress.update(prog.id, {
            completed_drills: newDrills,
            total_xp: (prog.total_xp || 0) + (already ? 0 : drill.xp_value),
            total_practice_minutes: (prog.total_practice_minutes || 0) + drill.duration_minutes,
            last_practice_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          });
        } else {
          await entities.UserProgress.create({ user_email: guestId, completed_drills: [drill.id], total_xp: drill.xp_value, total_practice_minutes: drill.duration_minutes, last_practice_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] });
        }
        window.dispatchEvent(new CustomEvent("smartstart_item_completed", { detail: { type: "drill", id: drill.id, title: drill.title } }));
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        showXPFlash(drill.xp_value);
        if (window.confetti) window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        console.error(e);
      }
    };
    if (!drill) return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 mb-4" }, "Drill not found"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Drills"), className: "text-emerald-500 font-semibold" }, "\u2190 Back to Drills")));
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-emerald-600 to-teal-500 px-6 pt-14 pb-8" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Drills"), className: "flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors" }, /* @__PURE__ */ React.createElement(Icon2, { name: "ArrowLeft", className: "w-5 h-5" }), " Back"), /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: `text-xs font-semibold px-2 py-1 rounded-full ${drill.difficulty === "Beginner" ? "bg-white/20 text-white" : drill.difficulty === "Intermediate" ? "bg-amber-300/30 text-amber-100" : "bg-red-300/30 text-red-100"}` }, drill.difficulty), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mt-2" }, drill.title), /* @__PURE__ */ React.createElement("p", { className: "text-emerald-100 mt-1" }, drill.category)), drill.is_premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge mt-2" }, "Pro")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 mt-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-3 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-white" }, drill.duration_minutes), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/80" }, "min")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-3 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-amber-300" }, drill.xp_value), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/80" }, "XP")))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-6 max-w-lg mx-auto space-y-5" }, /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl p-5 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-2 ${isDark ? "text-white" : "text-slate-800"}` }, "Description"), /* @__PURE__ */ React.createElement("p", { className: isDark ? "text-slate-300" : "text-slate-600" }, drill.description)), /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl p-5 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-2 ${isDark ? "text-white" : "text-slate-800"}` }, "Instructions"), /* @__PURE__ */ React.createElement("p", { className: isDark ? "text-slate-300" : "text-slate-600" }, drill.instructions)), drill.tips?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl p-5 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-3 ${isDark ? "text-white" : "text-slate-800"}` }, "Pro Tips"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, drill.tips.map((tip, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement(Icon2, { name: "CheckCircle2", className: "w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("p", { className: isDark ? "text-slate-300" : "text-slate-600" }, tip))))), /* @__PURE__ */ React.createElement("button", { onClick: complete, className: "w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95" }, "\u2713 Mark as Complete (+", drill.xp_value, " XP)")));
  }
  function MentalCoaching() {
    const [search, setSearch] = useState2("");
    const [category, setCategory] = useState2("All");
    const routines = window.SC_DATA?.mentalRoutines || [];
    const cats = ["All", "confidence", "focus", "recovery", "pre-performance", "pressure", "visualization", "match-day-calm", "pro-mental"];
    const catColors = { confidence: "bg-amber-100 text-amber-700", focus: "bg-blue-100 text-blue-700", recovery: "bg-emerald-100 text-emerald-700", "pre-performance": "bg-purple-100 text-purple-700", pressure: "bg-red-100 text-red-700", visualization: "bg-indigo-100 text-indigo-700", "match-day-calm": "bg-orange-100 text-orange-700", "pro-mental": "bg-purple-200 text-purple-800" };
    const catIcons = { confidence: "Sparkles", focus: "Target", recovery: "RefreshCw", "pre-performance": "Heart", pressure: "Zap", visualization: "Brain", "match-day-calm": "Sun", "pro-mental": "Crown" };
    const filtered = routines.filter(
      (r) => (category === "All" || r.category === category) && (!search || r.title.toLowerCase().includes(search.toLowerCase()))
    );
    const isDark = document.documentElement.classList.contains("dark");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-purple-600 to-indigo-600 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Mental Training"), /* @__PURE__ */ React.createElement("p", { className: "text-purple-200 mb-4" }, routines.length, "+ sessions \xB7 Build your mental game"), /* @__PURE__ */ React.createElement("div", { className: "relative mb-4" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Search", className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search sessions...",
        className: "w-full h-12 pl-12 pr-4 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:outline-none"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 overflow-x-auto pb-1" }, cats.map((c) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: c,
        onClick: () => setCategory(c),
        className: `px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all capitalize ${category === c ? "bg-white text-purple-700 border-white" : "bg-white/20 text-white border-white/30"}`
      },
      c === "All" ? "All" : c.replace("-", " ")
    )))), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 space-y-3 max-w-lg mx-auto" }, filtered.map((r) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: r.id,
        onClick: () => navigate(`MentalRoutinePlayer?id=${r.id}`),
        className: `w-full text-left rounded-2xl p-4 shadow-md border transition-all hover:scale-[1.01] ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ React.createElement("div", { className: `p-2.5 rounded-xl ${catColors[r.category] || "bg-gray-100 text-gray-700"}` }, /* @__PURE__ */ React.createElement(Icon2, { name: catIcons[r.category] || "Brain", className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-0.5" }, /* @__PURE__ */ React.createElement("h3", { className: `font-bold text-sm truncate ${isDark ? "text-white" : "text-slate-800"}` }, r.title), r.is_premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge flex-shrink-0" }, "Pro")), /* @__PURE__ */ React.createElement("p", { className: `text-xs capitalize mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}` }, r.category?.replace("-", " ")), /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-3 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}` }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Clock", className: "w-3 h-3" }), Math.floor(r.duration_seconds / 60), " min"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Zap", className: "w-3 h-3 text-amber-500" }), r.xp_value, " XP"))), /* @__PURE__ */ React.createElement(Icon2, { name: "Play", className: `w-5 h-5 mt-1 flex-shrink-0 text-purple-500` }))
    )), !filtered.length && /* @__PURE__ */ React.createElement("div", { className: "text-center py-12 text-slate-500" }, "No sessions found.")));
  }
  function MentalRoutinePlayer() {
    const id = getPageParam("id");
    const routine = (window.SC_DATA?.mentalRoutines || []).find((r) => r.id === id);
    const [phase, setPhase] = useState2("intro");
    const [stepIdx, setStepIdx] = useState2(0);
    const [timeLeft, setTimeLeft] = useState2(0);
    const [totalLeft, setTotalLeft] = useState2(0);
    const timerRef = useRef2(null);
    const guestId = getGuestId();
    const qc = useQueryClient();
    const isDark = document.documentElement.classList.contains("dark");
    const start = () => {
      if (!routine) return;
      setPhase("playing");
      setStepIdx(0);
      const firstStep = routine.steps[0];
      setTimeLeft(firstStep.duration_seconds);
      setTotalLeft(routine.duration_seconds);
    };
    useEffect2(() => {
      if (phase !== "playing") return;
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            const nextIdx = stepIdx + 1;
            if (nextIdx >= (routine?.steps?.length || 0)) {
              clearInterval(timerRef.current);
              setPhase("done");
              completeRoutine();
              return 0;
            }
            setStepIdx(nextIdx);
            return routine.steps[nextIdx].duration_seconds;
          }
          return t - 1;
        });
        setTotalLeft((t) => Math.max(0, t - 1));
      }, 1e3);
      return () => clearInterval(timerRef.current);
    }, [phase, stepIdx]);
    const completeRoutine = async () => {
      try {
        const results = await entities.UserProgress.filter({ user_email: guestId });
        const prog = results[0];
        const already = prog?.completed_mental_routines?.includes(routine.id);
        if (prog) {
          await entities.UserProgress.update(prog.id, {
            completed_mental_routines: already ? prog.completed_mental_routines : [...prog.completed_mental_routines || [], routine.id],
            total_xp: (prog.total_xp || 0) + (already ? 0 : routine.xp_value),
            total_practice_minutes: (prog.total_practice_minutes || 0) + Math.floor(routine.duration_seconds / 60),
            last_practice_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          });
        } else {
          await entities.UserProgress.create({ user_email: guestId, completed_mental_routines: [routine.id], total_xp: routine.xp_value, total_practice_minutes: Math.floor(routine.duration_seconds / 60), last_practice_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] });
        }
        window.dispatchEvent(new CustomEvent("smartstart_item_completed", { detail: { type: "mental", id: routine.id, title: routine.title } }));
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        if (window.confetti) window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch (e) {
        console.error(e);
      }
    };
    const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    const totalSecs = routine?.duration_seconds || 1;
    const progress = Math.round((totalSecs - totalLeft) / totalSecs * 100);
    const step = routine?.steps?.[stepIdx];
    if (!routine) return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("MentalCoaching"), className: "text-purple-500 font-semibold" }, "\u2190 Back"));
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen flex flex-col ${isDark ? "bg-gradient-to-br from-purple-950 to-slate-950" : "bg-gradient-to-br from-purple-50 to-indigo-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-purple-600 to-indigo-600 px-6 pt-14 pb-6" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      clearInterval(timerRef.current);
      navigate("MentalCoaching");
    }, className: "flex items-center gap-2 text-white/80 hover:text-white mb-4" }, /* @__PURE__ */ React.createElement(Icon2, { name: "ArrowLeft", className: "w-5 h-5" }), " Back"), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, routine.title), /* @__PURE__ */ React.createElement("p", { className: "text-purple-200 text-sm capitalize" }, routine.category?.replace("-", " "), " \xB7 ", Math.floor(routine.duration_seconds / 60), " min \xB7 ", routine.xp_value, " XP"), phase === "playing" && /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs text-purple-200 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "Progress"), /* @__PURE__ */ React.createElement("span", null, fmtTime(totalLeft), " remaining")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-full h-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-full h-2 transition-all duration-1000", style: { width: progress + "%" } })))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 px-6 py-8 flex flex-col items-center justify-center max-w-lg mx-auto w-full" }, phase === "intro" && /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-2xl" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Brain", className: "w-12 h-12 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}` }, routine.title), /* @__PURE__ */ React.createElement("p", { className: `leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}` }, routine.description)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 justify-center" }, [["Clock", `${Math.floor(routine.duration_seconds / 60)} min`], ["Zap", `${routine.xp_value} XP`], ["Layers", `${routine.steps?.length} steps`]].map(([icon, val]) => /* @__PURE__ */ React.createElement("div", { key: icon, className: `rounded-2xl px-4 py-3 text-center border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement(Icon2, { name: icon, className: "w-5 h-5 text-purple-500 mx-auto mb-1" }), /* @__PURE__ */ React.createElement("p", { className: `font-bold text-sm ${isDark ? "text-white" : "text-slate-800"}` }, val)))), /* @__PURE__ */ React.createElement("button", { onClick: start, className: "w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg text-lg" }, "Begin Session")), phase === "playing" && step && /* @__PURE__ */ React.createElement("div", { className: "w-full space-y-6 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-40 h-40 mx-auto" }, /* @__PURE__ */ React.createElement("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 100 100" }, /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "rgba(139,92,246,.2)", strokeWidth: "8" }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: "50",
        cy: "50",
        r: "45",
        fill: "none",
        stroke: "#8b5cf6",
        strokeWidth: "8",
        strokeLinecap: "round",
        strokeDasharray: `${2 * Math.PI * 45}`,
        strokeDashoffset: `${2 * Math.PI * 45 * (1 - timeLeft / (step.duration_seconds || 1))}`,
        className: "transition-all duration-1000"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl font-bold text-purple-400" }, fmtTime(timeLeft)), /* @__PURE__ */ React.createElement("span", { className: `text-xs ${isDark ? "text-slate-400" : "text-slate-500"}` }, "Step ", stepIdx + 1, "/", routine.steps.length))), /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl p-6 border text-left ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"} shadow-xl` }, /* @__PURE__ */ React.createElement("p", { className: `leading-relaxed text-base ${isDark ? "text-slate-200" : "text-slate-700"}` }, step.instruction)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          clearInterval(timerRef.current);
          setPhase("done");
          completeRoutine();
        },
        className: "text-sm text-slate-400 hover:text-slate-600 underline"
      },
      "Skip to end"
    )), phase === "done" && /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl" }, /* @__PURE__ */ React.createElement(Icon2, { name: "CheckCircle2", className: "w-12 h-12 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}` }, "Session Complete!"), /* @__PURE__ */ React.createElement("p", { className: isDark ? "text-slate-300" : "text-slate-600" }, "+", routine.xp_value, " XP earned")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("MentalCoaching"), className: "flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-bold py-4 rounded-2xl" }, "Done"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setPhase("intro");
      setStepIdx(0);
      setTotalLeft(routine.duration_seconds);
    }, className: "flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 rounded-2xl" }, "Again")))));
  }
  function Coach() {
    return /* @__PURE__ */ React.createElement("div", { className: "h-screen flex flex-col bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(Icon2, { name: "ArrowLeft", className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, "AI Coach"), /* @__PURE__ */ React.createElement("p", { className: "text-blue-200 text-xs" }, "Powered by Relevance AI"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        src: "https://app.relevanceai.com/agents/bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/c1b8c3fd-1141-42ff-a6fa-f16c03c2a111/embed-chat",
        className: "w-full h-full border-0",
        title: "SmartCrick AI Coach"
      }
    )));
  }
  function HeadCoach() {
    const prem = getPremiumStatus();
    if (!prem.is_premium || prem.plan === "monthly") {
      return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Crown", className: "w-16 h-16 text-purple-500 mb-4" }), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-slate-800 mb-2" }, "SmartCrick Head Coach"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mb-6" }, "This premium feature requires a Yearly or Lifetime subscription."), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Premium"), className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg" }, "Upgrade Now"));
    }
    return /* @__PURE__ */ React.createElement("div", { className: "h-screen flex flex-col bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(Icon2, { name: "ArrowLeft", className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, "SmartCrick Head Coach")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        src: "https://app.relevanceai.com/agents/bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/366636d2-101a-46ed-ac68-c6ec3b4b1daa/embed-chat",
        className: "w-full h-full border-0",
        title: "SmartCrick Head Coach"
      }
    )));
  }
  function NinetyDayChallenge() {
    const prem = getPremiumStatus();
    if (!prem.is_premium || prem.plan !== "lifetime") {
      return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Rocket", className: "w-16 h-16 text-purple-500 mb-4" }), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-slate-800 mb-2" }, "90-Day Challenge"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mb-6" }, "This is an exclusive Lifetime member feature."), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Premium"), className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg" }, "Get Lifetime Access"));
    }
    return /* @__PURE__ */ React.createElement("div", { className: "h-screen flex flex-col bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-purple-600 to-indigo-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(Icon2, { name: "ArrowLeft", className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, "90-Day Challenge")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        src: "https://app.relevanceai.com/agents/bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/366636d2-101a-46ed-ac68-c6ec3b4b1daa/embed-chat",
        className: "w-full h-full border-0",
        title: "90-Day Challenge"
      }
    )));
  }
  function Timer() {
    const [mode, setMode] = useState2("stopwatch");
    const [running, setRunning] = useState2(false);
    const [elapsed, setElapsed] = useState2(0);
    const [countdownSecs, setCountdownSecs] = useState2(300);
    const [inputMins, setInputMins] = useState2("5");
    const intervalRef = useRef2(null);
    const isDark = document.documentElement.classList.contains("dark");
    useEffect2(() => {
      if (running) {
        intervalRef.current = setInterval(() => {
          if (mode === "stopwatch") {
            setElapsed((e) => e + 1);
          } else {
            setCountdownSecs((s) => {
              if (s <= 1) {
                clearInterval(intervalRef.current);
                setRunning(false);
                if (window.confetti) window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
                return 0;
              }
              return s - 1;
            });
          }
        }, 1e3);
      }
      return () => clearInterval(intervalRef.current);
    }, [running, mode]);
    const fmtTime = (s) => {
      const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };
    const reset = () => {
      clearInterval(intervalRef.current);
      setRunning(false);
      setElapsed(0);
      setCountdownSecs(parseInt(inputMins || "5") * 60);
    };
    const displaySecs = mode === "stopwatch" ? elapsed : countdownSecs;
    const totalSecs = parseInt(inputMins || "5") * 60;
    const ringPct = mode === "stopwatch" ? elapsed % 60 / 60 : countdownSecs / totalSecs;
    const circumference = 2 * Math.PI * 110;
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-emerald-600 to-teal-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-4" }, "Timer"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, ["stopwatch", "countdown"].map((m) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m,
        onClick: () => {
          setMode(m);
          reset();
        },
        className: `px-4 py-2 rounded-full text-sm font-semibold capitalize border transition-all ${mode === m ? "bg-white text-emerald-600 border-white" : "bg-white/20 text-white border-white/30"}`
      },
      m
    )))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-8 flex flex-col items-center max-w-lg mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-64 h-64 mb-8" }, /* @__PURE__ */ React.createElement("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 240 240" }, /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "120", r: "110", fill: "none", stroke: isDark ? "#1e293b" : "#e2e8f0", strokeWidth: "12" }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: "120",
        cy: "120",
        r: "110",
        fill: "none",
        stroke: "#10b981",
        strokeWidth: "12",
        strokeLinecap: "round",
        strokeDasharray: circumference,
        strokeDashoffset: circumference * (1 - ringPct),
        className: running ? "animate-timer-pulse" : "",
        style: { transition: running ? "stroke-dashoffset 1s linear" : "none" }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "timer-display" }, fmtTime(displaySecs)), /* @__PURE__ */ React.createElement("span", { className: `text-sm capitalize mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}` }, mode))), mode === "countdown" && !running && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-6" }, /* @__PURE__ */ React.createElement("label", { className: `text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-600"}` }, "Minutes:"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        value: inputMins,
        min: "1",
        max: "120",
        onChange: (e) => {
          setInputMins(e.target.value);
          setCountdownSecs(parseInt(e.target.value || "5") * 60);
        },
        className: `w-20 text-center rounded-xl border px-3 py-2 font-bold text-lg ${isDark ? "bg-slate-800 border-slate-600 text-white" : "bg-white border-slate-200 text-slate-800"}`
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 w-full max-w-xs" }, /* @__PURE__ */ React.createElement("button", { onClick: reset, className: `flex-1 py-4 rounded-2xl font-bold transition-all ${isDark ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}` }, "Reset"), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setRunning((r) => !r),
        className: `flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${running ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-xl"}`
      },
      running ? "Pause" : "Start"
    ))));
  }
  function FitnessBuilder() {
    const [step, setStep] = useState2(1);
    const [bodyPart, setBodyPart] = useState2("");
    const [level, setLevel] = useState2("");
    const [goal, setGoal] = useState2("");
    const [duration, setDuration] = useState2("");
    const [workout, setWorkout] = useState2(null);
    const [saving, setSaving] = useState2(false);
    const guestId = getGuestId();
    const qc = useQueryClient();
    const isDark = document.documentElement.classList.contains("dark");
    const prem = getPremiumStatus();
    const BODY_PARTS = ["arms", "chest", "back", "legs", "shoulders", "core", "full body"];
    const GOALS = ["lose weight", "build muscle", "keep fit"];
    const DURATIONS = ["<10", "10-15", "15-20", "20-25", "25+"];
    const LEVELS = [
      { id: "beginner", label: "Beginner", icon: "Smile" },
      { id: "intermediate", label: "Intermediate", icon: "Zap" },
      { id: "advanced", label: "Advanced", icon: "Flame" },
      { id: "pro", label: "Pro", icon: "Crown", premium: true }
    ];
    const findWorkout = () => {
      const pool = window.SC_DATA?.quickStartWorkouts || [];
      const filtered = pool.filter(
        (w) => (w.target === bodyPart || w.target === "full body" || bodyPart === "full body") && w.level === level && w.goal === goal && w.duration_category === duration && (prem.is_premium || !w.is_premium)
      );
      if (filtered.length) return filtered[Math.floor(Math.random() * filtered.length)];
      const fallback = pool.filter((w) => w.level === level && (prem.is_premium || !w.is_premium));
      return fallback[Math.floor(Math.random() * fallback.length)] || pool[0];
    };
    const generate = () => {
      if (!bodyPart || !level || !goal || !duration) return;
      const found = findWorkout();
      setWorkout(found);
      setStep(4);
    };
    const saveAndStart = async () => {
      if (!workout) return;
      setSaving(true);
      try {
        const drillList = [];
        (workout.exercises || []).forEach((ex) => {
          for (let s = 1; s <= (ex.sets || 3); s++) {
            drillList.push({ drill_id: `fit_${Math.random().toString(36).substr(2, 6)}_s${s}`, drill_title: `${ex.name} \u2014 Set ${s}`, sets: 1, reps: ex.reps || 10, completed_sets: 0, type: "exercise", rest_seconds: ex.rest_seconds || 60 });
            if (s < (ex.sets || 3)) drillList.push({ drill_id: `rest_${Math.random().toString(36).substr(2, 6)}`, drill_title: "Rest Period", sets: 1, reps: ex.rest_seconds || 60, completed_sets: 0, type: "rest", rest_seconds: ex.rest_seconds || 60 });
          }
        });
        localStorage.removeItem("workoutProgress");
        const created = await entities.Workout.create({ user_email: guestId, name: workout.name, drills: drillList, status: "not_started", xp_value: workout.xp_value || 100 });
        localStorage.setItem("fitnessbuilder_new_workout_id", created.id);
        qc.invalidateQueries({ queryKey: ["userGeneratedWorkouts"] });
        navigate("AIWorkout");
      } catch (e) {
        console.error(e);
      }
      setSaving(false);
    };
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-orange-500 to-red-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Fitness Builder"), /* @__PURE__ */ React.createElement("p", { className: "text-orange-100 text-sm" }, "Build your perfect workout in seconds"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-4" }, [1, 2, 3, 4].map((s) => /* @__PURE__ */ React.createElement("div", { key: s, className: `flex-1 h-1.5 rounded-full transition-all ${s <= step ? "bg-white" : "bg-white/30"}` })))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-6 max-w-lg mx-auto" }, step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-800"}` }, "Quick Start Workouts"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-6" }, (window.SC_DATA?.quickStartWorkouts || []).slice(0, 5).map((w) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: w.name,
        onClick: async () => {
          setWorkout(w);
          setSaving(true);
          try {
            const dl = [];
            (w.exercises || []).forEach((ex) => {
              for (let s = 1; s <= (ex.sets || 3); s++) {
                dl.push({ drill_id: `fit_${Math.random().toString(36).substr(2, 6)}_s${s}`, drill_title: `${ex.name} \u2014 Set ${s}`, sets: 1, reps: ex.reps || 10, completed_sets: 0, type: "exercise", rest_seconds: ex.rest_seconds || 60 });
                if (s < (ex.sets || 3)) dl.push({ drill_id: `rest_${Math.random().toString(36).substr(2, 6)}`, drill_title: "Rest Period", sets: 1, reps: ex.rest_seconds || 60, completed_sets: 0, type: "rest", rest_seconds: ex.rest_seconds || 60 });
              }
            });
            localStorage.removeItem("workoutProgress");
            const c = await entities.Workout.create({ user_email: guestId, name: w.name, drills: dl, status: "not_started", xp_value: w.xp_value || 100 });
            localStorage.setItem("fitnessbuilder_new_workout_id", c.id);
            navigate("AIWorkout");
          } catch (e) {
            console.error(e);
          }
          setSaving(false);
        },
        className: `w-full text-left rounded-2xl p-4 border shadow-sm transition-all hover:scale-[1.01] ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `font-bold ${isDark ? "text-white" : "text-slate-800"}` }, w.name), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}` }, w.level, " \xB7 ", w.target, " \xB7 ", w.duration_category, " min")), /* @__PURE__ */ React.createElement("span", { className: "text-amber-500 font-bold text-sm" }, w.xp_value, " XP"))
    ))), /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), className: "w-full border-2 border-dashed border-orange-300 text-orange-600 dark:text-orange-400 font-bold py-4 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all" }, "+ Create Custom Workout")), step === 2 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-800"}` }, "Target Body Part"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, BODY_PARTS.map((bp) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: bp,
        onClick: () => setBodyPart(bp),
        className: `py-4 rounded-2xl font-semibold capitalize text-sm border transition-all ${bodyPart === bp ? "bg-orange-500 text-white border-orange-500 shadow-lg" : isDark ? "bg-slate-800 border-slate-600 text-slate-200 hover:border-orange-400" : "bg-white border-slate-200 text-slate-700 hover:border-orange-300"}`
      },
      bp
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-6" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(1), className: `flex-1 py-3 rounded-2xl font-bold ${isDark ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"}` }, "Back"), /* @__PURE__ */ React.createElement("button", { onClick: () => bodyPart && setStep(3), className: `flex-1 py-3 rounded-2xl font-bold text-white transition-all ${bodyPart ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg" : "bg-slate-400 cursor-not-allowed"}` }, "Next"))), step === 3 && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-lg font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}` }, "Fitness Level"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, LEVELS.map((l) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: l.id,
        onClick: () => {
          if (!l.premium || prem.is_premium) setLevel(l.id);
          else navigate("Premium");
        },
        className: `py-3 rounded-2xl font-semibold text-sm border transition-all flex items-center justify-center gap-2 ${level === l.id ? "bg-orange-500 text-white border-orange-500" : isDark ? "bg-slate-800 border-slate-600 text-slate-200" : "bg-white border-slate-200 text-slate-700"}`
      },
      /* @__PURE__ */ React.createElement(Icon2, { name: l.icon, className: "w-4 h-4" }),
      l.label,
      l.premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge" }, "Pro")
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}` }, "Goal"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, GOALS.map((g) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: g,
        onClick: () => setGoal(g),
        className: `py-3 rounded-2xl font-semibold text-xs border capitalize transition-all ${goal === g ? "bg-orange-500 text-white border-orange-500" : isDark ? "bg-slate-800 border-slate-600 text-slate-200" : "bg-white border-slate-200 text-slate-700"}`
      },
      g
    )))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"}` }, "Duration (min)"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 flex-wrap" }, DURATIONS.map((d) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d,
        onClick: () => setDuration(d),
        className: `px-4 py-3 rounded-2xl font-semibold text-sm border transition-all ${duration === d ? "bg-orange-500 text-white border-orange-500" : isDark ? "bg-slate-800 border-slate-600 text-slate-200" : "bg-white border-slate-200 text-slate-700"}`
      },
      d
    )))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), className: `flex-1 py-3 rounded-2xl font-bold ${isDark ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"}` }, "Back"), /* @__PURE__ */ React.createElement("button", { onClick: generate, className: `flex-1 py-3 rounded-2xl font-bold text-white transition-all ${level && goal && duration ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg" : "bg-slate-400 cursor-not-allowed"}` }, "Generate!"))), step === 4 && workout && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold mb-1" }, workout.name), /* @__PURE__ */ React.createElement("p", { className: "text-orange-100 text-sm capitalize" }, workout.level, " \xB7 ", workout.target, " \xB7 ", workout.duration_category, " min"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-3 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold" }, workout.exercises?.length || 0), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-orange-100" }, "exercises")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-3 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-amber-300" }, workout.xp_value), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-orange-100" }, "XP")))), /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl border divide-y ${isDark ? "bg-slate-800 border-slate-700 divide-slate-700" : "bg-white border-slate-100 divide-slate-100"}` }, (workout.exercises || []).map((ex, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: `font-semibold text-sm ${isDark ? "text-white" : "text-slate-800"}` }, ex.name), /* @__PURE__ */ React.createElement("span", { className: `text-xs ${isDark ? "text-slate-400" : "text-slate-500"}` }, ex.sets, "\xD7", ex.reps))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(3), className: `flex-1 py-3 rounded-2xl font-bold ${isDark ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-700"}` }, "Regenerate"), /* @__PURE__ */ React.createElement("button", { onClick: saveAndStart, disabled: saving, className: "flex-1 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg disabled:opacity-50" }, saving ? "Starting..." : "Start Workout \u2192")))));
  }
  function AIWorkout() {
    const guestId = getGuestId();
    const qc = useQueryClient();
    const [activeId, setActiveId] = useState2(null);
    const [currentDrillIdx, setCurrentDrillIdx] = useState2(0);
    const [completing, setCompleting] = useState2(false);
    const isDark = document.documentElement.classList.contains("dark");
    const { data: workouts = [], isLoading } = useQuery(["userGeneratedWorkouts", guestId], async () => {
      return entities.Workout.filter({ user_email: guestId });
    }, { staleTime: 0 });
    useEffect2(() => {
      const pendingId = localStorage.getItem("fitnessbuilder_new_workout_id");
      if (pendingId) {
        setActiveId(pendingId);
        localStorage.removeItem("fitnessbuilder_new_workout_id");
      }
    }, []);
    const activeWorkout = workouts.find((w) => w.id === activeId);
    const completeWorkout = async () => {
      if (!activeWorkout) return;
      setCompleting(true);
      try {
        await entities.Workout.update(activeWorkout.id, { status: "completed" });
        const results = await entities.UserProgress.filter({ user_email: guestId });
        const prog = results[0];
        const xpEarned = activeWorkout.xp_value || 90;
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        if (prog) {
          const yesterday = /* @__PURE__ */ new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().split("T")[0];
          const newStreak = prog.last_practice_date === yStr ? (prog.current_streak || 0) + 1 : 1;
          await entities.UserProgress.update(prog.id, {
            total_xp: (prog.total_xp || 0) + xpEarned,
            total_practice_minutes: (prog.total_practice_minutes || 0) + 25,
            last_practice_date: today,
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, prog.longest_streak || 0)
          });
          const lbs = await entities.Leaderboard.filter({ user_email: guestId });
          if (lbs[0]) await entities.Leaderboard.update(lbs[0].id, { total_xp: (lbs[0].total_xp || 0) + xpEarned, current_streak: newStreak });
        } else {
          await entities.UserProgress.create({ user_email: guestId, total_xp: xpEarned, total_practice_minutes: 25, last_practice_date: today, current_streak: 1, longest_streak: 1 });
        }
        await entities.Notification.create({ user_email: guestId, type: "achievement", title: "Workout Complete!", message: `You earned ${xpEarned} XP!`, is_read: false });
        window.dispatchEvent(new CustomEvent("smartstart_item_completed", { detail: { type: "workout", id: activeWorkout.id, title: activeWorkout.name } }));
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        qc.invalidateQueries({ queryKey: ["userGeneratedWorkouts", guestId] });
        if (window.confetti) window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        showXPFlash(xpEarned);
        setActiveId(null);
      } catch (e) {
        console.error(e);
      }
      setCompleting(false);
    };
    if (isLoading) return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "spinner" }));
    if (activeWorkout) {
      const drills = activeWorkout.drills || [];
      const exerciseDrills = drills.filter((d) => d.type !== "rest");
      const completedCount = drills.filter((d) => d.completed_sets >= d.sets).length;
      const pct = drills.length ? Math.round(completedCount / drills.length * 100) : 0;
      return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-pink-500 to-rose-500 px-6 pt-14 pb-6" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setActiveId(null), className: "flex items-center gap-2 text-white/80 mb-3" }, /* @__PURE__ */ React.createElement(Icon2, { name: "ArrowLeft", className: "w-5 h-5" }), "Back"), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, activeWorkout.name), /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs text-pink-200 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "Progress"), /* @__PURE__ */ React.createElement("span", null, pct, "%")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-full h-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-full h-2 transition-all", style: { width: pct + "%" } })))), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-3" }, drills.map((drill, i) => /* @__PURE__ */ React.createElement("div", { key: drill.drill_id, className: `rounded-2xl p-4 border transition-all ${drill.type === "rest" ? isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200" : isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, drill.type === "rest" ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-slate-400" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Clock", className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Rest \u2014 ", drill.reps, "s")) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `font-bold text-sm ${isDark ? "text-white" : "text-slate-800"}` }, drill.drill_title), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}` }, drill.reps, " reps")), /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-full border-2 flex items-center justify-center ${drill.completed_sets >= drill.sets ? "bg-emerald-500 border-emerald-500" : isDark ? "border-slate-500" : "border-slate-300"}` }, drill.completed_sets >= drill.sets && /* @__PURE__ */ React.createElement(Icon2, { name: "Check", className: "w-4 h-4 text-white" }))))), /* @__PURE__ */ React.createElement("button", { onClick: completeWorkout, disabled: completing, className: "w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4 disabled:opacity-50" }, completing ? "Saving..." : "\u{1F389} Complete Workout")));
    }
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-pink-500 to-rose-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "AI Workout"), /* @__PURE__ */ React.createElement("p", { className: "text-pink-100 text-sm" }, "Your saved workouts")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto" }, !workouts.length ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-16" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Dumbbell", className: "w-16 h-16 text-slate-300 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}` }, "No workouts yet"), /* @__PURE__ */ React.createElement("p", { className: `mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}` }, "Create one in Fitness Builder"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("FitnessBuilder"), className: "bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg" }, "Build a Workout")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, workouts.map((w) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: w.id,
        onClick: () => setActiveId(w.id),
        className: `w-full text-left rounded-2xl p-4 shadow-md border transition-all hover:scale-[1.01] ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `font-bold ${isDark ? "text-white" : "text-slate-800"}` }, w.name), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}` }, w.drills?.filter((d) => d.type !== "rest").length || 0, " exercises \xB7 ", w.xp_value, " XP")), /* @__PURE__ */ React.createElement("div", { className: `px-3 py-1 rounded-full text-xs font-semibold ${w.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-pink-100 text-pink-700"}` }, w.status === "completed" ? "Done" : "Ready"))
    )), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("FitnessBuilder"), className: "w-full border-2 border-dashed border-pink-300 text-pink-600 dark:text-pink-400 font-bold py-4 rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-950/20 transition-all" }, "+ New Workout"))));
  }
  function Premium() {
    const isDark = document.documentElement.classList.contains("dark");
    const prem = getPremiumStatus();
    const PLANS = [
      { id: "monthly", name: "Monthly", price: "$9.99", period: "/month", priceId: "price_1SugNn6MhuIR6zbAZMSb1Vrc", color: "from-blue-500 to-indigo-500", features: ["All drills & workouts", "Mental training library", "Progress tracking", "AI Coach"] },
      { id: "yearly", name: "Yearly", price: "$59.99", period: "/year", priceId: "price_1SugSq6MhuIR6zbAw991j7Ur", color: "from-emerald-500 to-teal-500", badge: "BEST VALUE", features: ["Everything in Monthly", "SmartCrick Head Coach", "Advanced analytics", "Priority support"] },
      { id: "lifetime", name: "Lifetime", price: "$149.99", period: "one-time", priceId: "price_1SugW66MhuIR6zbAEq9yThmh", color: "from-purple-500 to-pink-500", badge: "MOST POPULAR", features: ["Everything in Yearly", "90-Day Challenge", "All future features", "Lifetime access"] }
    ];
    const checkout = async (plan) => {
      try {
        const res = await fetch("https://smartcrick-backend-kgya.vercel.app/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId: plan.priceId, successUrl: window.location.href, cancelUrl: window.location.href })
        });
        const { url } = await res.json();
        if (url) window.location.href = url;
      } catch (e) {
        alert("Unable to process checkout. Please try again.");
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 px-6 pt-16 pb-10 text-center" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Crown", className: "w-12 h-12 text-yellow-300 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-white mb-2" }, "Go Premium"), /* @__PURE__ */ React.createElement("p", { className: "text-purple-100" }, "Unlock your full potential"), prem.is_premium && /* @__PURE__ */ React.createElement("div", { className: "mt-4 bg-white/20 rounded-2xl px-4 py-2 inline-block text-white font-semibold" }, "\u2713 You're on ", prem.plan, " plan")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-6 max-w-lg mx-auto space-y-4" }, PLANS.map((plan) => /* @__PURE__ */ React.createElement("div", { key: plan.id, className: `rounded-3xl border shadow-xl overflow-hidden ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("div", { className: `bg-gradient-to-r ${plan.color} px-6 py-4 flex items-center justify-between` }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white" }, plan.name), plan.badge && /* @__PURE__ */ React.createElement("span", { className: "bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full" }, plan.badge)), /* @__PURE__ */ React.createElement("p", { className: "text-white/80 text-sm" }, plan.period)), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-white" }, plan.price))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-4" }, plan.features.map((f) => /* @__PURE__ */ React.createElement("div", { key: f, className: "flex items-center gap-2 py-1.5" }, /* @__PURE__ */ React.createElement(Icon2, { name: "CheckCircle2", className: "w-5 h-5 text-emerald-500 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: `text-sm ${isDark ? "text-slate-300" : "text-slate-700"}` }, f))), /* @__PURE__ */ React.createElement("button", { onClick: () => checkout(plan), className: `w-full mt-4 bg-gradient-to-r ${plan.color} text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95` }, "Get ", plan.name, " \u2192"))))));
  }
  function Progress() {
    const guestId = getGuestId();
    const isDark = document.documentElement.classList.contains("dark");
    const { data: prog } = useQuery(["userProgress", guestId], async () => {
      const r = await entities.UserProgress.filter({ user_email: guestId });
      return r[0] || null;
    }, { staleTime: 0 });
    const BADGES = [
      { id: "first_drill", label: "First Drill", icon: "Target", color: "from-emerald-400 to-teal-400", threshold: 1, field: "completed_drills" },
      { id: "drill_5", label: "5 Drills", icon: "Target", color: "from-blue-400 to-cyan-400", threshold: 5, field: "completed_drills" },
      { id: "drill_25", label: "25 Drills", icon: "Trophy", color: "from-purple-400 to-pink-400", threshold: 25, field: "completed_drills" },
      { id: "mental_1", label: "Mindful", icon: "Brain", color: "from-indigo-400 to-purple-400", threshold: 1, field: "completed_mental_routines" },
      { id: "mental_10", label: "10 Sessions", icon: "Brain", color: "from-pink-400 to-rose-400", threshold: 10, field: "completed_mental_routines" },
      { id: "streak_3", label: "3 Day Streak", icon: "Flame", color: "from-orange-400 to-red-400", threshold: 3, field: "current_streak" },
      { id: "streak_7", label: "Week Streak", icon: "Flame", color: "from-red-400 to-pink-400", threshold: 7, field: "current_streak" },
      { id: "xp_500", label: "500 XP", icon: "Zap", color: "from-amber-400 to-yellow-400", threshold: 500, field: "total_xp" },
      { id: "xp_2000", label: "2000 XP", icon: "Star", color: "from-yellow-400 to-orange-400", threshold: 2e3, field: "total_xp" }
    ];
    const hasBadge = (badge) => {
      if (!prog) return false;
      const val = badge.field === "completed_drills" ? prog.completed_drills?.length || 0 : badge.field === "completed_mental_routines" ? prog.completed_mental_routines?.length || 0 : prog[badge.field] || 0;
      return val >= badge.threshold;
    };
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-pink-500 to-purple-600 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Your Progress"), /* @__PURE__ */ React.createElement("p", { className: "text-pink-100 text-sm" }, "Track your cricket journey")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl p-6 border shadow-xl ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-4 ${isDark ? "text-white" : "text-slate-800"}` }, "Level Progress"), /* @__PURE__ */ React.createElement(LevelProgressBar, { xp: prog?.total_xp || 0 })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, [
      { label: "Total XP", value: prog?.total_xp || 0, icon: "Zap", color: "from-amber-400 to-yellow-400" },
      { label: "Current Streak", value: prog?.current_streak || 0, icon: "Flame", color: "from-orange-400 to-red-500" },
      { label: "Drills Done", value: prog?.completed_drills?.length || 0, icon: "Target", color: "from-blue-400 to-cyan-400" },
      { label: "Mental Sessions", value: prog?.completed_mental_routines?.length || 0, icon: "Brain", color: "from-purple-400 to-indigo-400" },
      { label: "Longest Streak", value: prog?.longest_streak || 0, icon: "Trophy", color: "from-emerald-400 to-teal-400" },
      { label: "Practice Mins", value: prog?.total_practice_minutes || 0, icon: "Clock", color: "from-pink-400 to-rose-400" }
    ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, className: `rounded-2xl p-4 border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mb-2` }, /* @__PURE__ */ React.createElement(Icon2, { name: s.icon, className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("p", { className: `text-2xl font-bold ${isDark ? "text-white" : "text-slate-800"}` }, s.value), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${isDark ? "text-slate-400" : "text-slate-600"}` }, s.label)))), /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl p-6 border shadow-xl ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-4 ${isDark ? "text-white" : "text-slate-800"}` }, "Badges"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, BADGES.map((b) => {
      const earned = hasBadge(b);
      return /* @__PURE__ */ React.createElement("div", { key: b.id, className: `rounded-2xl p-3 text-center border transition-all ${earned ? isDark ? "bg-slate-700 border-slate-600" : "bg-slate-50 border-slate-200" : isDark ? "bg-slate-900 border-slate-800 opacity-40" : "bg-slate-100 border-slate-200 opacity-50"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 bg-gradient-to-br ${earned ? b.color : "from-slate-400 to-slate-500"} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg` }, /* @__PURE__ */ React.createElement(Icon2, { name: b.icon, className: "w-6 h-6 text-white" })), /* @__PURE__ */ React.createElement("p", { className: `text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}` }, b.label));
    })))));
  }
  function Profile() {
    const guestId = getGuestId();
    const isDark = document.documentElement.classList.contains("dark");
    const qc = useQueryClient();
    const [editing, setEditing] = useState2(false);
    const [name, setName] = useState2("");
    const [saving, setSaving] = useState2(false);
    const { data: prog } = useQuery(["userProgress", guestId], async () => {
      const r = await entities.UserProgress.filter({ user_email: guestId });
      return r[0] || null;
    });
    const { data: profile } = useQuery(["profile", guestId], async () => {
      const r = await entities.Profile.filter({ user_email: guestId });
      return r[0] || null;
    });
    const user = Auth.me();
    const displayName = profile?.username || prog?.display_name || user?.full_name?.split(" ")[0] || "Champ";
    const saveName = async () => {
      if (!name.trim()) return;
      setSaving(true);
      try {
        if (profile) await entities.Profile.update(profile.id, { username: name });
        else await entities.Profile.create({ user_email: guestId, username: name });
        if (prog) await entities.UserProgress.update(prog.id, { display_name: name });
        qc.invalidateQueries({ queryKey: ["profile", guestId] });
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        setEditing(false);
      } catch (e) {
        console.error(e);
      }
      setSaving(false);
    };
    const deleteAccount = async () => {
      if (!confirm("Delete all your data? This cannot be undone.")) return;
      const keys = ["sc_UserProgress", "sc_Profile", "sc_Leaderboard", "sc_Workout", "sc_Notification", "sc_SkillPath", "sc_Match", "sc_ScheduledActivity", "sc_UserProfile", "sc_PremiumSubscription", "smartcrick_premium", "sc_session_v2", "sc_users_v2", "smartcrick_guest_id"];
      keys.forEach((k) => localStorage.removeItem(k));
      Auth.logout();
    };
    const prem = getPremiumStatus();
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-16 pb-10 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-white/30" }, /* @__PURE__ */ React.createElement(Icon2, { name: "User", className: "w-10 h-10 text-white" })), editing ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 justify-center mt-2" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: name,
        onChange: (e) => setName(e.target.value),
        placeholder: displayName,
        className: "bg-white/20 text-white placeholder:text-white/60 border border-white/30 rounded-xl px-4 py-2 text-center font-bold focus:outline-none"
      }
    ), /* @__PURE__ */ React.createElement("button", { onClick: saveName, disabled: saving, className: "bg-white text-indigo-700 font-bold px-4 py-2 rounded-xl text-sm" }, saving ? "..." : "Save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing(false), className: "text-white/60 hover:text-white" }, /* @__PURE__ */ React.createElement(Icon2, { name: "X", className: "w-5 h-5" }))) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 justify-center mt-2" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white" }, displayName), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setName(displayName);
      setEditing(true);
    }, className: "text-white/60 hover:text-white" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Pencil", className: "w-4 h-4" }))), prem.is_premium && /* @__PURE__ */ React.createElement("div", { className: "mt-2 bg-white/20 rounded-full px-4 py-1 inline-block text-sm text-white font-semibold capitalize" }, "\u2713 ", prem.plan, " member")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-3" }, [
      { label: "Total XP", val: prog?.total_xp || 0, icon: "Zap" },
      { label: "Current Streak", val: `${prog?.current_streak || 0} days`, icon: "Flame" },
      { label: "Drills Completed", val: prog?.completed_drills?.length || 0, icon: "Target" },
      { label: "Mental Sessions", val: prog?.completed_mental_routines?.length || 0, icon: "Brain" }
    ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, className: `rounded-2xl p-4 border flex items-center gap-4 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Icon2, { name: s.icon, className: "w-5 h-5 text-emerald-600" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `text-sm ${isDark ? "text-slate-400" : "text-slate-500"}` }, s.label), /* @__PURE__ */ React.createElement("p", { className: `font-bold text-lg ${isDark ? "text-white" : "text-slate-800"}` }, s.val)))), /* @__PURE__ */ React.createElement("div", { className: "pt-4 space-y-3" }, !prem.is_premium && /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Premium"), className: "w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg" }, "Upgrade to Premium"), /* @__PURE__ */ React.createElement("button", { onClick: deleteAccount, className: "w-full border-2 border-red-300 text-red-600 dark:text-red-400 font-bold py-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all" }, "Delete Account"))));
  }
  function SkillPaths() {
    const guestId = getGuestId();
    const isDark = document.documentElement.classList.contains("dark");
    const { data: prog } = useQuery(["userProgress", guestId], async () => {
      const r = await entities.UserProgress.filter({ user_email: guestId });
      return r[0] || null;
    });
    const xp = prog?.total_xp || 0;
    const paths = Object.values(window.SC_DATA?.skillPathsDb || {});
    const getLevel = (path) => {
      let level = 0;
      for (const l of path.levels) {
        if (xp >= l.xp_required) level = l.level;
      }
      return level;
    };
    const colors = { "from-blue-500 to-indigo-600": "bg-blue-500", "from-emerald-500 to-teal-600": "bg-emerald-500", "from-orange-500 to-red-600": "bg-orange-500", "from-purple-500 to-pink-600": "bg-purple-500" };
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-teal-500 to-emerald-600 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Skill Paths"), /* @__PURE__ */ React.createElement("p", { className: "text-teal-100 text-sm" }, "Level up your cricket systematically")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-4" }, paths.map((path) => {
      const level = getLevel(path);
      const nextLevel = path.levels.find((l) => l.level === level + 1);
      const currentLevel = path.levels.find((l) => l.level === level);
      const pct = nextLevel ? Math.min(100, Math.round((xp - (currentLevel?.xp_required || 0)) / (nextLevel.xp_required - (currentLevel?.xp_required || 0)) * 100)) : 100;
      return /* @__PURE__ */ React.createElement("div", { key: path.id, className: `rounded-3xl border shadow-xl overflow-hidden ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("div", { className: `bg-gradient-to-r ${path.color} p-5` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Icon2, { name: path.icon, className: "w-6 h-6 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white" }, path.title), /* @__PURE__ */ React.createElement("p", { className: "text-white/80 text-sm" }, "Level ", level, " / ", path.levels.length))), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-full h-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-full h-2 transition-all", style: { width: pct + "%" } })), /* @__PURE__ */ React.createElement("p", { className: "text-white/70 text-xs mt-1" }, nextLevel ? `${nextLevel.xp_required - xp} XP to Level ${level + 1}` : "Max Level Reached!")), /* @__PURE__ */ React.createElement("div", { className: "p-4" }, /* @__PURE__ */ React.createElement("p", { className: `text-sm mb-3 ${isDark ? "text-slate-400" : "text-slate-600"}` }, path.description), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, path.levels.map((l) => /* @__PURE__ */ React.createElement("div", { key: l.level, className: `flex items-center gap-3 p-2 rounded-xl ${l.level <= level ? isDark ? "bg-emerald-900/20" : "bg-emerald-50" : isDark ? "bg-slate-900" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${l.level <= level ? "bg-emerald-500 text-white" : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-500"}` }, l.level), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `text-sm font-semibold ${l.level <= level ? isDark ? "text-emerald-400" : "text-emerald-700" : isDark ? "text-slate-400" : "text-slate-600"}` }, l.title), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${isDark ? "text-slate-500" : "text-slate-400"}` }, l.xp_required, " XP required")), l.level <= level && /* @__PURE__ */ React.createElement(Icon2, { name: "CheckCircle2", className: "w-5 h-5 text-emerald-500" }))))));
    })));
  }
  function Leaderboard() {
    const guestId = getGuestId();
    const isDark = document.documentElement.classList.contains("dark");
    const { data: entries = [] } = useQuery(["leaderboard"], async () => {
      return entities.Leaderboard.list();
    }, { staleTime: 3e4 });
    const sorted = [...entries].sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0));
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-amber-500 to-orange-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Leaderboard"), /* @__PURE__ */ React.createElement("p", { className: "text-amber-100 text-sm" }, "Top cricketers this month")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto" }, !sorted.length ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-16" }, /* @__PURE__ */ React.createElement(Icon2, { name: "Trophy", className: "w-16 h-16 text-slate-300 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}` }, "No entries yet"), /* @__PURE__ */ React.createElement("p", { className: `mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}` }, "Complete workouts and drills to appear here!")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, sorted.map((entry, i) => /* @__PURE__ */ React.createElement("div", { key: entry.id, className: `rounded-2xl p-4 border flex items-center gap-4 ${entry.user_email === guestId ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20" : isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${i === 0 ? "bg-yellow-400 text-yellow-900" : i === 1 ? "bg-slate-300 text-slate-700" : i === 2 ? "bg-amber-600 text-white" : isDark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-500"}` }, i + 1), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `font-bold ${isDark ? "text-white" : "text-slate-800"}` }, entry.username || "Anonymous"), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${isDark ? "text-slate-400" : "text-slate-500"}` }, entry.current_streak || 0, " day streak")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-amber-500" }, entry.total_xp || 0), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${isDark ? "text-slate-400" : "text-slate-500"}` }, "XP")))))));
  }
  function StubPage({ title, icon, color, description, children }) {
    const isDark = document.documentElement.classList.contains("dark");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${isDark ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: `bg-gradient-to-br ${color} px-6 pt-16 pb-8` }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, title), description && /* @__PURE__ */ React.createElement("p", { className: "text-white/80 text-sm" }, description)), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-8 max-w-lg mx-auto text-center" }, children || /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icon2, { name: icon, className: "w-16 h-16 text-slate-300 mx-auto mb-4" }), /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-800"}` }, title), /* @__PURE__ */ React.createElement("p", { className: `${isDark ? "text-slate-400" : "text-slate-500"}` }, "Coming soon \u2014 in active development!"))));
  }
  var Goals = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Goals", icon: "Target", color: "from-purple-600 to-indigo-600", description: "Set and track your cricket goals" });
  var Chat = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Chat", icon: "MessageCircle", color: "from-blue-600 to-cyan-600", description: "Connect with teammates" });
  var ConfidenceCheckIn = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Confidence Check-In", icon: "Heart", color: "from-pink-500 to-rose-500", description: "Track your confidence levels" });
  var AIDrillRecommendation = () => /* @__PURE__ */ React.createElement(StubPage, { title: "AI Drill Recommendations", icon: "Sparkles", color: "from-emerald-500 to-teal-600", description: "AI-powered drill recommendations" });
  var MatchTracker = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Match Tracker", icon: "Trophy", color: "from-green-600 to-teal-600", description: "Log and analyze your matches" });
  var Schedule = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Schedule", icon: "Calendar", color: "from-violet-600 to-purple-600", description: "Plan your training schedule" });
  var ScheduleExtendedView = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Schedule", icon: "Calendar", color: "from-violet-600 to-purple-600", description: "Your full training schedule" });
  var Quizzes = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Cricket Quizzes", icon: "BookOpen", color: "from-amber-500 to-yellow-500", description: "Test your cricket knowledge" });
  var QuizPlayer = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Quiz", icon: "BookOpen", color: "from-amber-500 to-yellow-500" });
  var MiniMatch = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Mini-Match", icon: "Zap", color: "from-orange-500 to-red-500", description: "Quick scenario-based cricket IQ tests" });
  var WorkoutBuilder = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Workout Builder", icon: "Dumbbell", color: "from-purple-600 to-indigo-600", description: "Build custom workout plans" });
  var WorkoutPlayer = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Workout Player", icon: "Play", color: "from-pink-500 to-rose-500" });
  var WorkoutHistory = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Workout History", icon: "History", color: "from-slate-600 to-slate-700", description: "Your past workouts" });
  var WhyDidIGetOut = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Why Did I Get Out?", icon: "TrendingDown", color: "from-red-600 to-orange-600", description: "Analyze your dismissals with AI" });
  var DrillYouTubeFinder = () => /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-white flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "bg-red-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(Icon2, { name: "ArrowLeft", className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, "YouTube Drill Finder")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://www.youtube.com/results?search_query=cricket+drills+training", className: "w-full h-full border-0", title: "YouTube Drill Finder" })));
  var DrillWorkoutCreator = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Drill Workout Creator", icon: "Target", color: "from-blue-500 to-cyan-600", description: "Create custom drill workouts" });
  var CustomDrillWorkoutCreator = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Custom Drill Workout Creator", icon: "Target", color: "from-blue-500 to-cyan-600" });
  var SavedDrillWorkout = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Saved Drill Workouts", icon: "Bookmark", color: "from-blue-500 to-cyan-600" });
  var MentalTrainingCreator = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Mental Training Creator", icon: "Brain", color: "from-purple-600 to-indigo-600", description: "Create custom mental training sessions" });
  var ThirtyDayChallenge = () => /* @__PURE__ */ React.createElement(StubPage, { title: "30-Day Challenge", icon: "Flame", color: "from-orange-500 to-red-500", description: "Your 30-day cricket improvement challenge" });
  var AdminSeedMentals = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Admin: Seed Mentals", icon: "Settings", color: "from-slate-600 to-slate-700" });
  var AdvancedPathDetails = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Advanced Path Details", icon: "TrendingUp", color: "from-teal-500 to-emerald-600" });
  var ExpandedProgress = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Expanded Progress", icon: "BarChart2", color: "from-pink-500 to-purple-600" });
  var ExtendedMilestones = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Extended Milestones", icon: "Award", color: "from-amber-500 to-orange-500" });
  var ViewLogMatches = () => /* @__PURE__ */ React.createElement(StubPage, { title: "View Log Matches", icon: "List", color: "from-green-600 to-teal-600" });
  var MatchDetail = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Match Detail", icon: "Trophy", color: "from-green-600 to-teal-600" });
  var MatchHistory = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Match History", icon: "History", color: "from-green-600 to-teal-600" });
  var CoachVoiceMode = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Coach Voice Mode", icon: "Mic", color: "from-blue-600 to-indigo-600" });
  var Settings = () => /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${document.documentElement.classList.contains("dark") ? "bg-slate-950" : "bg-slate-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-slate-700 to-slate-800 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Settings")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-3" }, [["Bell", "Notifications"], ["Moon", "Dark Mode"], ["Shield", "Privacy"], ["HelpCircle", "Help & Support"]].map(([icon, label]) => /* @__PURE__ */ React.createElement("button", { key: label, className: `w-full flex items-center gap-4 p-4 rounded-2xl border ${document.documentElement.classList.contains("dark") ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}` }, /* @__PURE__ */ React.createElement(Icon2, { name: icon, className: "w-5 h-5 text-slate-500" }), /* @__PURE__ */ React.createElement("span", { className: document.documentElement.classList.contains("dark") ? "text-white font-medium" : "text-slate-800 font-medium" }, label), /* @__PURE__ */ React.createElement(Icon2, { name: "ChevronRight", className: "w-5 h-5 text-slate-400 ml-auto" })))));
  var GetToKnowYou = () => {
    const [done, setDone] = useState2(false);
    const guestId = getGuestId();
    const [role, setRole] = useState2("");
    const isDark = document.documentElement.classList.contains("dark");
    if (done) {
      navigate("Home");
      return null;
    }
    const roles = ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"];
    const save = async () => {
      try {
        await entities.UserProfile.create({ user_email: guestId, cricket_role: role, quiz_completed: true });
        setDone(true);
      } catch (e) {
        setDone(true);
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen flex flex-col items-center justify-center px-6 ${isDark ? "bg-slate-950" : "bg-gradient-to-br from-emerald-50 to-teal-50"}` }, /* @__PURE__ */ React.createElement(Icon2, { name: "Sparkles", className: "w-16 h-16 text-emerald-500 mb-4" }), /* @__PURE__ */ React.createElement("h1", { className: `text-2xl font-bold mb-2 text-center ${isDark ? "text-white" : "text-slate-800"}` }, "Welcome to SmartCrick AI!"), /* @__PURE__ */ React.createElement("p", { className: `text-center mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}` }, "What's your primary cricket role?"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 w-full max-w-xs mb-8" }, roles.map((r) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: r,
        onClick: () => setRole(r),
        className: `py-4 rounded-2xl font-bold border transition-all text-sm ${role === r ? "bg-emerald-500 text-white border-emerald-500 shadow-lg" : isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-700"}`
      },
      r
    ))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: save,
        disabled: !role,
        className: `w-full max-w-xs py-4 rounded-2xl font-bold text-white transition-all ${role ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg" : "bg-slate-400 cursor-not-allowed"}`
      },
      "Get Started \u2192"
    ));
  };
  var Onboarding = () => {
    useEffect2(() => {
      navigate("GetToKnowYou");
    }, []);
    return null;
  };
  var PAGES = {
    Home,
    Drills,
    DrillDetail,
    MentalCoaching,
    MentalRoutinePlayer,
    Coach,
    HeadCoach,
    NinetyDayChallenge,
    ThirtyDayChallenge,
    Timer,
    FitnessBuilder,
    AIWorkout,
    Progress,
    Profile,
    SkillPaths,
    Leaderboard,
    Premium,
    AIDrillRecommendation,
    Chat,
    ConfidenceCheckIn,
    Goals,
    MatchTracker,
    Schedule,
    ScheduleExtendedView,
    Quizzes,
    QuizPlayer,
    MiniMatch,
    WorkoutBuilder,
    WorkoutPlayer,
    WorkoutHistory,
    WhyDidIGetOut,
    DrillYouTubeFinder,
    DrillWorkoutCreator,
    CustomDrillWorkoutCreator,
    SavedDrillWorkout,
    MentalTrainingCreator,
    AdminSeedMentals,
    AdvancedPathDetails,
    ExpandedProgress,
    ExtendedMilestones,
    ViewLogMatches,
    MatchDetail,
    MatchHistory,
    CoachVoiceMode,
    Settings,
    GetToKnowYou,
    Onboarding
  };
  function App() {
    const { page } = useLocation();
    const [loading, setLoading] = useState2(true);
    useEffect2(() => {
      const theme = localStorage.getItem("theme") || "dark";
      document.documentElement.classList.toggle("dark", theme === "dark");
      if (!window.location.hash) window.location.hash = "#/Home";
      setTimeout(() => setLoading(false), 400);
    }, []);
    if (loading) return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-black flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 dark:text-slate-400 font-medium" }, "Loading SmartCrick...")));
    const PageComp = PAGES[page] || Home;
    return /* @__PURE__ */ React.createElement(Layout, { page }, /* @__PURE__ */ React.createElement(PageComp, null));
  }
  var root = window.ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App));
})();
