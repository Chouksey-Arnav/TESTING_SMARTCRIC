/* ============================================================================
 * SmartCrick AI — app.js (standalone, no build required)
 * ============================================================================
 * CDN deps (loaded in index.html):
 *   React 19, ReactDOM 19, lucide, i18next, brain.js, matter-js, canvas-confetti, Stripe.js
 *
 * Architecture:
 *   window.SmartCrick.i18n     — i18next wrapper (6 languages, RTL-aware)
 *   window.SmartCrick.brain    — brain.js neural recommendation engine
 *   window.SmartCrick.physics  — matter-js bowling physics simulator
 *   window.SmartCrick.coach    — AI coach (Groq-backed via /api/coach)
 *   window.SmartCrick.storage  — localStorage data layer
 *
 * Backend (smartcrick-backend-kgya.vercel.app):
 *   POST /api/coach        → AI coach (Groq llama-3.1-8b)
 *   POST /api/checkout     → Stripe checkout session
 *
 * Routing: hash-based (#/Home, #/Drills, #/AICoach, #/BowlingScience, …)
 * Data: localStorage only (no server state, no SDK)
 * ========================================================================= */

"use strict";

/* ─────────────── Namespace ─────────────── */
window.SmartCrick = window.SmartCrick || {};
const SC = window.SmartCrick;

/* ─────────────── Constants ─────────────── */
const BACKEND_URL = "https://smartcrick-backend-kgya.vercel.app";
const STRIPE_PRICES = {
  monthly:  "price_1SugNn6MhuIR6zbAZMSb1Vrc",
  yearly:   "price_1SugSq6MhuIR6zbAw991j7Ur",
  lifetime: "price_1SugW66MhuIR6zbAEq9yThmh",
};
const APP_VERSION = "4.7.0";

const SUPPORTED_LANGS = ["en", "hi", "ur", "bn", "ta", "si"];
const LANG_META = {
  en: { native: "English", english: "English", rtl: false },
  hi: { native: "हिन्दी",    english: "Hindi",   rtl: false },
  ur: { native: "اردو",      english: "Urdu",    rtl: true  },
  bn: { native: "বাংলা",     english: "Bengali", rtl: false },
  ta: { native: "தமிழ்",     english: "Tamil",   rtl: false },
  si: { native: "සිංහල",     english: "Sinhala", rtl: false },
};

/* ─────────────── Helpers ─────────────── */
const uid = () => Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
const now = () => Date.now();
const clamp = (n, mn, mx) => Math.max(mn, Math.min(mx, n));
const startOfDay = (ts) => { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); };
const daysBetween = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / 86400000);
const cx = (...xs) => xs.filter(Boolean).join(" ");
const safeParse = (s, f) => { try { return s ? JSON.parse(s) : f; } catch { return f; } };
const humanDate = (ts) => {
  const d = new Date(ts);
  const today = startOfDay(Date.now());
  const day = startOfDay(ts);
  const diff = Math.round((day - today) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 1 && diff < 7) return d.toLocaleDateString(undefined, { weekday: "long" });
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: d.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined });
};

/* ─────────────── Event bus ─────────────── */
SC.bus = new EventTarget();
const emit = (n, d) => SC.bus.dispatchEvent(new CustomEvent(n, { detail: d }));
const on = (n, fn) => { SC.bus.addEventListener(n, fn); return () => SC.bus.removeEventListener(n, fn); };

/* ============================================================================
 * DATA: Drill catalog
 * ========================================================================= */
const DRILL_CATEGORIES = [
  { id: "batting",  icon: "Swords",    color: "emerald" },
  { id: "bowling",  icon: "Wind",      color: "sky"     },
  { id: "fielding", icon: "Target",    color: "amber"   },
  { id: "keeping",  icon: "Shield",    color: "violet"  },
  { id: "fitness",  icon: "Dumbbell",  color: "rose"    },
];

const DRILLS = [
  { id: "bat-001", category: "batting", title: "Front Foot Drive Groove", level: "beginner",    duration_min: 10, xp: 80,  equipment: "Tennis ball, bat", description: "Tee up a tennis ball at medium height. Drive 20 balls down the ground with high elbow and weight transferred onto your front knee.", cues: ["High elbow", "Head over the ball", "Transfer weight"] },
  { id: "bat-002", category: "batting", title: "Back Foot Punch",         level: "intermediate", duration_min: 15, xp: 120, equipment: "Bat, stumps",     description: "Face 30 short-pitched throw-downs. Rock back, punch through the ball. Keep the ball down and play late.", cues: ["Rock back early", "Play late", "Soft hands"] },
  { id: "bat-003", category: "batting", title: "Pull Shot Control",       level: "advanced",    duration_min: 20, xp: 180, equipment: "Bat, short-ball feeder", description: "25 pulls against throw-downs at hip-to-shoulder height. Land 80% in front of square. Eyes on the ball until contact.", cues: ["Sway inside the line", "Roll the wrists", "Eyes through contact"] },
  { id: "bat-004", category: "batting", title: "Late Cut Precision",       level: "advanced",    duration_min: 15, xp: 150, equipment: "Bat, wide feeder", description: "20 late cuts against wide deliveries. Open the face, use soft hands, aim for the gap between slip and gully.", cues: ["Wait for the ball", "Open face", "Soft hands"] },
  { id: "bat-005", category: "batting", title: "Defensive Block Shape",    level: "beginner",    duration_min: 10, xp: 70,  equipment: "Bat, throw-downs", description: "30 forward defensives. Bat and pad together, head over the ball, soft hands absorbing pace.", cues: ["Bat and pad together", "Soft hands", "Head still"] },
  { id: "bat-006", category: "batting", title: "Sweep Shot Builder",       level: "intermediate", duration_min: 12, xp: 110, equipment: "Bat, spinner feed", description: "20 conventional sweeps against spin. Get low, front knee on ground, hit with the spin through square leg.", cues: ["Get low", "Hit with the spin", "Roll wrists"] },
  { id: "bat-007", category: "batting", title: "Straight Drive Meditation", level: "intermediate", duration_min: 15, xp: 130, equipment: "Bat, feeder",     description: "30 straight drives on a full length. Bat face straight through the line. Aim for the sightscreen.", cues: ["Full follow-through", "Bat face down the ground", "Stay tall"] },
  { id: "bat-008", category: "batting", title: "Pressure Session — 6 an over", level: "pro",     duration_min: 25, xp: 260, equipment: "Net bowler",     description: "Simulated T20 finish. You need 6 an over for 4 overs. Mix dots with boundaries, track strike rotation.", cues: ["Pick gaps not power", "Commit early", "Reset each ball"] },
  { id: "bat-009", category: "batting", title: "Reverse Sweep Builder",     level: "advanced",    duration_min: 12, xp: 140, equipment: "Bat, spinner",    description: "15 reverse sweeps. Get low, flip the bottom hand, aim between point and short third.", cues: ["Deep squat", "Flip bottom hand late", "Play with the length"] },
  { id: "bat-010", category: "batting", title: "Trigger Movement Drill",    level: "intermediate", duration_min: 10, xp: 90,  equipment: "Bat, shadow",    description: "Shadow-practice your trigger movement 40 times. Back-and-across for seamers, forward press for spin. Film and review.", cues: ["Head still", "Small movement", "Ready position"] },

  { id: "bwl-001", category: "bowling", title: "Seam-Up Repetition",      level: "beginner",    duration_min: 15, xp: 100, equipment: "Ball, stumps",   description: "30 balls at a line 2ft outside off. Seam vertical, wrist behind the ball. Aim for a good length (6–7m from batsman).", cues: ["Wrist behind seam", "Big step on front leg", "Follow through straight"] },
  { id: "bwl-002", category: "bowling", title: "Yorker Target Drill",     level: "intermediate", duration_min: 15, xp: 130, equipment: "Ball, cone",     description: "20 balls at a cone on the popping crease. 10 points for direct hit, 5 for within a bat-length. Beat your old score.", cues: ["Aim at the cone, not the stumps", "Fuller than you think", "Drive through the crease"] },
  { id: "bwl-003", category: "bowling", title: "Off-Spin Dip & Turn",     level: "advanced",    duration_min: 20, xp: 170, equipment: "Ball, net",      description: "30 balls focused on rpm. Over-spin for dip, side-spin for turn. Aim for drift middle-and-off toward off.", cues: ["Rip it hard", "Loop the ball", "Release over the stumps"] },
  { id: "bwl-004", category: "bowling", title: "Leg-Spin Googly Setup",   level: "pro",         duration_min: 20, xp: 200, equipment: "Ball, net",      description: "Set up with 6 leg-breaks, slip in the googly on ball 7. Repeat for 4 overs. Video-review your wrist position.", cues: ["Disguise the wrist", "Same release point", "Same seam angle"] },
  { id: "bwl-005", category: "bowling", title: "Outswing Repeatability",   level: "intermediate", duration_min: 18, xp: 150, equipment: "New ball, net",  description: "25 balls, seam angled toward slip, shiny side on leg. Aim for top of off-stump. Count how many move.", cues: ["Seam at 1st/2nd slip", "Shiny side on leg", "Full length"] },
  { id: "bwl-006", category: "bowling", title: "Reverse Swing Release",    level: "pro",         duration_min: 20, xp: 220, equipment: "Old ball",       description: "Seam tilted, rough side toward the batsman's pads. 20 balls at 140+ kph. Aim for yorker length. Reverse kicks in late.", cues: ["Rough side forward", "Seam tilted", "Max pace commit"] },
  { id: "bwl-007", category: "bowling", title: "Slower Ball Variations",   level: "advanced",    duration_min: 15, xp: 140, equipment: "Ball, stumps",   description: "Practice 3 slower balls: off-cutter, back-of-the-hand, split-finger. 5 of each, same action for all.", cues: ["Same run-up", "Same action", "Grip changes everything"] },
  { id: "bwl-008", category: "bowling", title: "Bouncer Accuracy",         level: "advanced",    duration_min: 15, xp: 150, equipment: "Ball, net",      description: "15 short balls. Aim chest-to-throat height. Count the on-target ratio. Don't overpitch short.", cues: ["Hit the pitch hard", "Wrist up, not down", "Shoulder drive"] },
  { id: "bwl-009", category: "bowling", title: "Full-Length Attack",       level: "beginner",    duration_min: 12, xp: 95,  equipment: "Ball, stumps",   description: "30 balls, all fuller than a good length. Make the batsman drive. Aim pads or just outside off.", cues: ["Pitch it up", "Attack the stumps", "Follow through"] },
  { id: "bwl-010", category: "bowling", title: "Death Over Simulation",     level: "pro",         duration_min: 20, xp: 230, equipment: "Net bowler",     description: "Bowl 4-over simulation: yorker, wide yorker, slower bouncer, hard length. Repeat. Score 0 for any long-hop.", cues: ["Pre-plan each ball", "Calm between deliveries", "Commit to the plan"] },

  { id: "fld-001", category: "fielding", title: "Close Catch Ladder",     level: "beginner",    duration_min: 10, xp: 70,  equipment: "Ball, partner",  description: "50 close catches at waist height. Partner throws varied speeds. Soft hands, give with the ball.", cues: ["Watch the ball", "Soft hands", "Give with the catch"] },
  { id: "fld-002", category: "fielding", title: "High Catching Patterns", level: "intermediate", duration_min: 15, xp: 120, equipment: "Ball launcher", description: "20 high catches. Alternate long-on/long-off patterns. Communicate and call.", cues: ["Both hands up", "Eye on the ball", "Call early"] },
  { id: "fld-003", category: "fielding", title: "Direct Hit Drill",       level: "advanced",    duration_min: 15, xp: 140, equipment: "Ball, stumps",  description: "20 throws from 25m at a single stump. Aim for chest-height throws. Count hits.", cues: ["Low pickup", "Straight arm", "Follow through toward stumps"] },
  { id: "fld-004", category: "fielding", title: "Slip Catching Reps",     level: "advanced",    duration_min: 12, xp: 130, equipment: "Slip cradle",    description: "40 catches from a slip cradle. Focus on low, wide, and high reactions.", cues: ["Watch the edge of the bat", "Relaxed hands", "Scoop don't snatch"] },
  { id: "fld-005", category: "fielding", title: "Ground Fielding Sprints", level: "beginner",   duration_min: 10, xp: 80,  equipment: "Cones",          description: "10 × 15m sprints, pickup, underarm return. Focus on clean pickups.", cues: ["Stay low", "Clean scoop", "Quick release"] },
  { id: "fld-006", category: "fielding", title: "Boundary Slide Save",     level: "intermediate", duration_min: 12, xp: 110, equipment: "Mat, ball",     description: "15 slides along a practice mat. Scoop the ball back before the rope. Protect knee with pad.", cues: ["Slide feet-first", "Flick back in one motion", "Stay balanced"] },
  { id: "fld-007", category: "fielding", title: "Outfield Run & Catch",    level: "advanced",    duration_min: 15, xp: 135, equipment: "Launcher",       description: "20 running catches over 15m. Coming forward, running back, over the shoulder.", cues: ["Judge early", "Smooth stride", "Two hands if possible"] },

  { id: "kpr-001", category: "keeping", title: "Take Catches Off Spin",   level: "intermediate", duration_min: 15, xp: 140, equipment: "Gloves, spinner", description: "30 balls from a spinner. Stay low, come up with the ball, watch the bat edge.", cues: ["Stay down", "Watch edge of bat", "Soft hands"] },
  { id: "kpr-002", category: "keeping", title: "Standing Back Reflexes",  level: "advanced",    duration_min: 15, xp: 150, equipment: "Gloves, pacer",   description: "25 balls standing back. Split-second reaction catches, both sides. Full extension.", cues: ["Balanced stance", "Hands ready", "Reset between balls"] },
  { id: "kpr-003", category: "keeping", title: "Stumping Agility",         level: "intermediate", duration_min: 12, xp: 110, equipment: "Gloves, stumps", description: "20 simulated stumpings. Quick hands over stumps, feet behind bails.", cues: ["Hands over stumps", "Balance", "Break the bails clean"] },

  { id: "fit-001", category: "fitness", title: "Cricket Shuttle Run",      level: "intermediate", duration_min: 15, xp: 120, equipment: "Cones",          description: "10 × 22-yard sprints with 30s rest. Mimic batting between wickets. Track the time.", cues: ["Turn on the ball of your foot", "Quick arms", "Explosive push"] },
  { id: "fit-002", category: "fitness", title: "Core Strength for Batters", level: "intermediate", duration_min: 20, xp: 150, equipment: "Mat",            description: "3 rounds: plank 45s, side plank 30s each side, bicycle crunches 40 reps, bird-dog 20 reps.", cues: ["Squeeze glutes", "Breathe", "Slow and controlled"] },
  { id: "fit-003", category: "fitness", title: "Bowling Shoulder Prehab",   level: "beginner",    duration_min: 15, xp: 100, equipment: "Resistance band", description: "Band pulls, external rotations, face pulls. 3 rounds, 15 reps each.", cues: ["Slow and controlled", "Feel the rear shoulder", "Don't shrug"] },
  { id: "fit-004", category: "fitness", title: "Explosive Plyometrics",     level: "advanced",    duration_min: 20, xp: 180, equipment: "Box, space",     description: "3 rounds: box jumps 10, broad jumps 10, lateral bounds 10 each side, jump squats 15.", cues: ["Soft landing", "Maximum effort", "Reset between reps"] },
];

/* ============================================================================
 * DATA: Mental library (from Arnav's 240-session catalog)
 * ========================================================================= */
const MENTAL_CATEGORIES = [
  { id: "focus",      color: "sky"     },
  { id: "confidence", color: "emerald" },
  { id: "pressure",   color: "rose"    },
  { id: "recovery",   color: "violet"  },
  { id: "mindset",    color: "amber"   },
];

// Format: [title, duration_min, xp, category, isPremium?]
const MENTAL_RAW = [
  ["Micro Focus Burst",3,35,"focus"],["Physiological Sigh",3,35,"recovery"],
  ["Reset Button",4,45,"recovery"],["Focus Next Ball",4,45,"focus"],["Morning Positivity Charge",4,40,"mindset"],
  ["5-4-3-2-1 Grounding",5,50,"focus"],["Countdown to Clarity",5,50,"focus"],["Power Pose Reset",5,50,"confidence"],
  ["Confidence Countdown",5,50,"confidence"],["10-Second Rule",5,50,"pressure"],["Celebrate Small Wins",5,50,"confidence"],
  ["Focus Lock-In",5,50,"focus"],["2-Minute Warrior",5,50,"mindset"],["Micro-Win Review",5,50,"confidence"],
  ["Self-Compassion Break",5,50,"recovery"],["Embracing Change",5,50,"mindset"],["Pre-Game Activation",5,50,"confidence"],
  ["Gratitude for Journey",5,50,"mindset"],
  ["Deep Calm Breathing",5,50,"recovery"],["Positive Morning Anchor",5,50,"mindset"],["Mental Recovery Sprint",5,50,"recovery"],
  ["Win the Morning",5,50,"mindset"],["Breathe Through Anger",5,50,"recovery"],["Team Player Mindset",5,50,"mindset"],
  ["Reset After Duck",5,50,"recovery"],["Bowling Mindset Lock-In",5,50,"focus"],["Deep Breathing Anxiety",5,50,"pressure"],
  ["Gratitude Before Game",5,50,"mindset"],["Worry Drawer",5,50,"pressure"],["Name Your Strength Challenge",5,50,"confidence"],
  ["Task Isolation Protocol",5,50,"focus"],["Running Between Wickets",5,50,"focus"],["Five Senses Slow Down",5,50,"focus"],
  ["Night Review 3 Good Things",5,50,"recovery"],["Celebrating Others Success",5,45,"mindset"],
  ["4-7-8 Breath Lock",6,50,"recovery"],["Self-Talk Rewrite",6,55,"confidence"],["Rejection Bounce",6,65,"recovery"],
  ["Nervous Energy Converter",6,55,"pressure"],["Gratitude Anchor",6,55,"mindset"],["Pre-Performance Calm",6,55,"pressure"],
  ["Team Energy Alignment",6,55,"mindset"],["Present Moment Is Enough",6,55,"focus"],["Detox Breath",6,55,"recovery"],
  ["Joy Audit",6,55,"mindset"],["Vocal Physical Presence",6,60,"confidence"],["Anchoring Peak State",6,65,"confidence"],
  ["Grounding Instant Presence",6,55,"focus"],["Strategic Pause Activation",6,60,"focus"],["Learning from Opponents",6,60,"mindset"],
  ["Mental Highlight Reel",6,60,"confidence"],["Cultivating Beginners Mind",6,60,"mindset"],["Deep Focus Anchor",6,60,"focus"],
  ["Stillness Practice",6,55,"recovery"],["Calm Before Storm",6,55,"pressure"],["Laser Focus Activation",6,55,"focus"],
  ["Gratitude Perspective Shift",6,55,"mindset"],["Bounce-Back Faster",6,60,"recovery"],["Focus What You Control",6,55,"focus"],
  ["Optimism Training",6,55,"mindset"],["Mindful Performance Reset",6,55,"recovery"],["Dealing with Criticism",6,55,"pressure"],
  ["Dealing Nerves Batting",6,60,"pressure"],["Accountability Mirror",6,60,"mindset"],["Cold Pressure Simulation",6,75,"pressure"],
  ["1% Better Mindset",6,55,"mindset"],["Sensory Narrowing",6,60,"focus"],["Trusted Teammate Lens",6,55,"mindset"],
  ["Pressure Release Valve",6,55,"pressure"],["Breathing Through Batting Collapse",6,65,"pressure"],["Environmental Intention Setting",6,55,"focus"],
  ["Compassionate Coaching Voice",6,55,"recovery"],["Catching Under Pressure",6,60,"pressure"],["Discipline Contract",6,60,"mindset"],
  ["Craving the Challenge",6,65,"mindset"],["Separating Result from Worth",6,55,"mindset"],["Possibility Scanner",6,55,"mindset"],
  ["Believing in Tomorrow",6,55,"confidence"],["Calm Competitor",6,60,"pressure"],["Motivation Without Mood",6,60,"mindset"],
  ["Pressure Is Information",6,60,"pressure"],["Positive Pressure Partnership",6,55,"pressure"],["Long View Perspective",6,55,"mindset"],
  ["Distraction Shield",7,65,"focus"],["Evidence of Strength",7,60,"confidence"],["Affirmation Immersion",7,60,"confidence"],
  ["Own the Room",7,65,"confidence"],["Pressure Is Privilege",7,65,"pressure"],["Let It Go Protocol",7,60,"recovery"],
  ["Breathe Through Bad Day",7,60,"recovery"],["Failure as Feedback",7,60,"recovery"],["Best Self Morning",7,60,"mindset"],
  ["Game Day Activation",7,65,"confidence"],["Letting Go of Last Time",7,65,"recovery"],
  ["Dealing Crowd Environment",7,65,"pressure"],["Process Over Result",7,65,"mindset"],["Evening Review Unwind",7,60,"recovery"],
  ["Emotional Intelligence Check-In",7,65,"mindset"],["Discipline Over Motivation",7,65,"mindset"],["Relationship with Effort",7,65,"mindset"],
  ["Silent Minute Protocol",7,65,"focus"],["Abundance Mindset Shift",7,65,"mindset"],["Owning Your Uniqueness",7,65,"confidence"],
  ["Competition as Fuel",7,65,"pressure"],["Morning Clarity Protocol",7,60,"focus"],["Embrace the Discomfort",7,70,"mindset"],
  ["Closing the Loop",7,65,"recovery"],["Noise Cancellation Focus",7,70,"focus"],["Embrace the Arena",7,65,"pressure"],
  ["Energy Source Identification",7,60,"mindset"],["What If Neutralizer",7,65,"pressure"],["Future-Pacing Success",7,65,"confidence"],
  ["Decision Clarity Under Pressure",7,70,"pressure"],["Responding to Unfairness",7,70,"mindset"],["Handling Unplayable Ball",7,70,"recovery"],
  ["Bowling Under Pressure",7,65,"pressure"],["Fuel Your Fire",7,60,"confidence"],["Rediscovering Your Why",7,65,"mindset"],
  ["Anxiety Dissolve Protocol",7,65,"pressure"],["Deep Recovery Breathing",7,65,"recovery"],["Motivational Momentum Builder",7,65,"confidence"],
  ["Deep Pressure Release",7,60,"pressure"],["Believe It Session",7,65,"confidence"],["Beat Fear of Failure",7,65,"pressure"],
  ["Body Scan Energy Reset",7,60,"recovery"],["Overcome Overthinking",7,65,"focus"],["Worst-Case Freedom",7,65,"pressure"],
  ["Confidence Through Preparation",7,60,"confidence"],["Performing for Love of It",7,60,"mindset"],["Repair After a Row",7,65,"recovery"],
  ["Fielding Brilliance Rehearsal",7,65,"confidence"],["Bounce-Back Blueprint",7,65,"recovery"],["Inner Lake",7,60,"recovery"],
  ["Positive Reframe Machine",7,65,"mindset"],["4-7-8 Breath Reset",7,60,"recovery"],["Power of No Excuses",7,70,"mindset"],
  ["Competitor's Code",7,65,"mindset"],["Mind Over Fatigue",7,75,"recovery"],["Trusting Instinct",7,65,"confidence"],
  ["Single-Point Focus Drill",8,55,"focus"],["Attention Anchor",8,65,"focus"],["Inner Champion",8,65,"confidence"],
  ["Courage Over Comfort",8,70,"mindset"],["Storm and Stillness",8,70,"recovery"],["Adversity as Advantage",8,70,"mindset"],
  ["Self-Compassion Practice",8,65,"recovery"],["Emotional Drain Release",8,70,"recovery"],["Boundaries Burnout Prevention",8,70,"recovery"],
  ["Master Skill Replay",8,70,"confidence"],["Future Memory",8,70,"confidence"],["Obstacle Visualisation",8,70,"pressure"],
  ["Calm Under Pressure Visualisation",8,70,"pressure"],["Post-Performance Review",8,70,"recovery"],["Composed Under Fire",8,80,"pressure"],
  ["Morning Mindset Ritual",8,65,"mindset"],["Stress Inoculation",8,80,"pressure"],["Resilience Story",8,70,"mindset"],
  ["Patience Long-Game Thinking",8,70,"mindset"],["Decision Maker",8,70,"focus"],["Under the Microscope",8,80,"pressure"],
  ["Why Engine",8,70,"mindset"],["Champion's Setback",8,70,"recovery"],["Box Breathing Method",8,65,"recovery"],
  ["Imposter Dissolve",8,70,"confidence"],["Releasing Expectations",8,70,"pressure"],["Breaking the Mental Block",8,80,"focus"],
  ["Freedom from Judgment",8,70,"mindset"],["Releasing Outcome Attachment",8,75,"pressure"],["Inner Critic Translator",8,70,"confidence"],
  ["Growth Mindset Fuel",8,70,"mindset"],["Decision-Making Clarity",8,70,"focus"],["Active Listening for Insight",8,70,"mindset"],
  ["Vision Board Visualization",8,70,"confidence"],["Batting Through Hard Session",8,70,"pressure"],["Staying Calm Under Fire",8,70,"pressure"],
  ["Unbreakable Mindset",8,80,"mindset"],["Positive Self-Image Builder",8,70,"confidence"],["Quiet the Noise",8,70,"focus"],
  ["Comeback Mindset",8,70,"recovery"],["Sleep Better Tonight",8,60,"recovery"],["Handling Losing Streak",8,70,"recovery"],
  ["Post-Game Emotional Release",8,70,"recovery"],["Winning the Inner Battle",8,70,"mindset"],["Pre-Match Ritual Builder",8,70,"confidence"],
  ["Breath as Anchor",8,60,"recovery"],["Pressure Rehearsal Crucial Over",8,80,"pressure"],["Decompression Zone",8,65,"recovery"],
  ["Thought Labeling Practice",8,65,"focus"],["Failure Inventory",8,70,"mindset"],["Box Breathing Navy Seal",8,65,"recovery"],
  ["Processing Disappointment",8,70,"recovery"],["Finding Flow Through Challenge",8,75,"focus"],["Staying Positive After Being Dropped",8,70,"recovery"],
  ["Radical Acceptance",8,70,"mindset"],["Developing Elite Patience",8,75,"mindset"],
  ["Body Scan Focus Reset",9,60,"recovery"],["Comparison Detox",9,70,"mindset"],
  ["Unshakeable Foundation",9,75,"confidence"],["Forgiveness Forward Movement",9,80,"recovery"],["Perfect Performance",9,75,"confidence"],
  ["Healing Visualisation",9,70,"recovery"],["Morning of Big Day",9,75,"confidence"],["Deep Work Session Primer",9,70,"focus"],
  ["Process Film",9,75,"focus"],["Grief Permission",9,80,"recovery"],["10 Years Forward",9,75,"mindset"],
  ["Pre-Sleep Mental Shutdown",9,70,"recovery"],["Choke-Proof Preparation",9,80,"pressure"],["Life Balance Audit",9,75,"mindset"],
  ["Post-Performance Debrief",9,70,"recovery"],["Patience Cultivation",9,80,"mindset"],["Detaching from Perfectionism",9,80,"pressure"],
  ["Champion's Routine",9,75,"confidence"],["Full Body Relaxation",9,65,"recovery"],["Visualization for Skill Building",9,75,"confidence"],
  ["Identity-Based Goal Setting",9,75,"mindset"],["Comeback Innings",9,75,"recovery"],["Letter to Future Self",9,75,"mindset"],
  ["Pressure Ladder",9,80,"pressure"],
  ["Flow State Trigger",10,75,"focus"],["Deep Work Preparation",10,75,"focus"],["Mental Toughness Builder",10,85,"mindset"],
  ["High Stakes Rehearsal",10,85,"pressure"],["Sleep Recovery Reset",10,70,"recovery"],["Intentional Rest",10,70,"recovery"],
  ["Goal Movie",10,80,"confidence"],["Champion Mindset Simulation",10,85,"confidence"],
  ["New Identity Visualisation",10,85,"confidence"],
  ["Deliberate Practice Mindset",10,100,"focus",true],["Mastery Over Perfection",10,100,"mindset",true],
  ["Sensory Performance Blueprint",10,85,"focus"],["Vivid Goal Map",10,80,"confidence"],["Recharge Internal Battery",10,75,"recovery"],
  ["Pre-Tournament Mind Lock",10,80,"pressure"],
  ["Performance Rituals Design",11,105,"confidence",true],["Psychological Safety Risk-Taking",11,105,"confidence",true],
  ["Identity Leverage",12,110,"mindset",true],["Zone of Genius Activation",12,110,"confidence",true],
  ["Elite Competitor Analysis",12,110,"mindset",true],["Inner Dialogue Mastery",12,110,"confidence",true],
  ["Elite Endurance Mindset",12,110,"mindset",true],
  ["Flow State Architecture",15,120,"focus",true],
];

const MENTAL_SESSIONS = MENTAL_RAW.map((r, i) => ({
  id: `mnt-${String(i + 1).padStart(3, "0")}`,
  title: r[0], duration_min: r[1], xp: r[2], category: r[3], is_premium: !!r[4],
}));

/* ============================================================================
 * DATA: Workout library (from Arnav's 104-workout catalog)
 * ========================================================================= */
// Format: [title, levelCode, exercises, duration, xp]
const WORKOUT_RAW = [
  ["Back Strength Builder","i",5,"15-20",140],["Arms Beginner Blast","b",4,"10-15",85],["Full Body Power Pro","p",6,"25+",320],
  ["Chest Sculpt Starter","b",5,"10-15",90],["Fat Burn HIIT 20","a",6,"20-25",210],["Back Intermediate Strength","i",4,"15-20",135],
  ["Total Body Toning","b",5,"15-20",100],["Shoulder Strength Supreme","a",5,"15-20",170],["Arms & Core Power","i",4,"10-15",110],
  ["Shoulders Intermediate Sculpt","i",4,"15-20",140],["Chest Intermediate Build","i",4,"15-20",145],["Core Crusher Advanced","a",5,"15-20",180],
  ["Legs Beginner Strength","b",4,"10-15",90],["Shoulder Mobility Warm-Up","b",4,"<10",60],["Back & Posture Fix","b",4,"10-15",85],
  ["Shoulders Elite Pro","p",5,"20-25",270],["Legs Advanced Blast","a",5,"20-25",190],["Legs Intermediate Circuit","i",5,"20-25",165],
  ["Shoulders Beginner Tone","b",3,"<10",65],["Quick Fat Burn","b",4,"<10",75],["Legs & Glutes Shaper","i",5,"15-20",140],
  ["Back Pro Mastery","p",4,"20-25",280],["Back & Biceps Blast","a",5,"20-25",200],["Legs Explosive Pro","p",5,"25+",310],
  ["Shoulder Definition Blast","i",5,"15-20",130],["Core Intermediate Shred","i",5,"15-20",145],["Core Beginner Basics","b",4,"10-15",85],
  ["Chest Beginner Build","b",3,"<10",70],["Full Body Balance Intermediate","i",6,"25+",185],["Chest Advanced Power","a",4,"15-20",180],
  ["Back Advanced Power","a",4,"15-20",170],["Arms Pro Domination","p",5,"25+",290],["Full Body Intermediate Power","i",5,"20-25",175],
  ["Evening Stretch & Tone","b",4,"10-15",80],["Legs Pro Explosion","p",5,"25+",300],["Back & Core Intermediate","i",4,"15-20",140],
  ["Chest Power Pro","p",5,"25+",280],["Arms Advanced Strength","a",4,"15-20",175],["Beginner Leg Tone","b",4,"10-15",90],
  ["Core Advanced Destroyer","a",5,"15-20",175],["Power Strength Advanced","a",5,"20-25",215],["Chest Advanced Sculptor","a",4,"15-20",165],
  ["Arms Advanced Pump","a",5,"20-25",195],["Mobility & Flexibility Advanced","a",5,"20-25",160],["Core Elite Pro","p",5,"20-25",260],
  ["Legs Advanced Strength","a",5,"20-25",195],["Shoulders Advanced Burn","a",4,"15-20",175],["Endurance Builder Intermediate","i",5,"20-25",160],
  ["Core Shred Express","i",7,"10-15",120],["Abs Intermediate Carve","i",5,"15-20",155],["Post-Workout Cool Down Beginner","b",4,"<10",55],
  ["Legs Fat Burn Intermediate","i",4,"15-20",150],["Shoulders & Legs Intermediate","i",4,"15-20",145],["Full Body Pro Endurance","p",6,"25+",310],
  ["Upper Body Pump Builder","i",6,"15-20",150],["Core Advanced Annihilation","a",5,"15-20",185],["Active Recovery Intermediate","i",5,"15-20",125],
  ["Mobility Flow Beginner","b",4,"<10",60],["Legs Pro Power","p",5,"25+",305],["Shoulders Pro Power","p",4,"20-25",275],
  ["Chest Pro Explosion","p",4,"20-25",285],["Upper Advanced Total","a",6,"25+",220],["Shoulders Pro Peak","p",4,"20-25",275],
  ["Stretch & Recovery Beginner","b",4,"10-15",75],["Arms & Chest Intermediate Power","i",4,"15-20",145],["Legs & Core Beginner","b",4,"15-20",95],
  ["Shoulders & Abs Beginner","b",4,"10-15",85],["HIIT Fat Burner Intermediate","i",4,"10-15",130],["Total Toning Beginner","b",5,"15-20",100],
  ["Back & Glutes Beginner","b",4,"10-15",85],["Chest & Core Beginner","b",4,"10-15",80],["Core Stability Pro","p",5,"20-25",270],
  ["Quick Lower Body Beginner","b",4,"<10",70],["Total Body Cardio Advanced","a",6,"25+",225],["Upper Body Beginner Foundation","b",4,"15-20",95],
  ["Core Fat Burn Intermediate","i",4,"10-15",125],["Full Body Fat Burn Intermediate","i",5,"20-25",170],["Back Advanced Domination","a",4,"15-20",185],
  ["Arms Pro Elite","p",4,"20-25",275],["Back & Shoulders Intermediate","i",5,"20-25",165],["10-Minute Beginner Fat Burn","b",8,"<10",80],
  ["Pro Athlete Conditioning","p",7,"25+",300],["Full Body Cardio Blast","i",5,"15-20",150],["Core & Cardio Intermediate","i",4,"15-20",140],
  ["Chest & Shoulders Intermediate","i",4,"15-20",135],["Core Pro Mastery","p",4,"20-25",265],["Leg Day Power Circuit","a",7,"20-25",200],
  ["Back Domination Pro","p",5,"25+",290],["Shoulders Advanced Build","a",4,"15-20",160],["Back Pro Strength","p",4,"20-25",280],
  ["Explosive Power Pro","p",6,"25+",330],["Full Body Quick Tone","b",4,"<10",70],["Chest Pro Supreme","p",4,"20-25",270],
  ["Full Body Athlete Builder","a",8,"25+",220],["Arms Intermediate Pump","i",5,"20-25",170],["Morning Energy Boost","b",4,"<10",65],
  ["Chest & Triceps Burner","a",5,"20-25",190],["Full Body Advanced Athlete","a",6,"25+",230],["Legs & Glutes Intermediate Power","i",5,"20-25",170],
  ["Back Beginner Strengthen","b",3,"<10",70],["Glutes & Hamstrings Advanced","a",5,"20-25",205],["Quick Arms Tone","b",4,"<10",65],
  ["Full Body Advanced HIIT","a",6,"25+",225],["Quick Core Stabilizer","b",4,"<10",70],
];

const LEVEL_MAP = { b: "beginner", i: "intermediate", a: "advanced", p: "pro" };
function inferWorkoutTarget(title) {
  const t = title.toLowerCase();
  if (t.includes("back")) return "back";
  if (t.includes("chest")) return "chest";
  if (t.includes("arms") || t.includes("biceps") || t.includes("triceps")) return "arms";
  if (t.includes("shoulder")) return "shoulders";
  if (t.includes("leg") || t.includes("glute") || t.includes("hamstring")) return "legs";
  if (t.includes("core") || t.includes("abs")) return "core";
  if (t.includes("mobility") || t.includes("stretch") || t.includes("recovery") || t.includes("cool")) return "recovery";
  if (t.includes("cardio") || t.includes("hiit") || t.includes("fat burn")) return "cardio";
  return "full_body";
}
const WORKOUTS = WORKOUT_RAW.map((r, i) => ({
  id: `wkt-${String(i + 1).padStart(3, "0")}`,
  title: r[0], level: LEVEL_MAP[r[1]], exercises: r[2], duration: r[3], xp: r[4],
  target: inferWorkoutTarget(r[0]),
}));

/* ============================================================================
 * DATA: Cricket jokes + facts (rotates daily on Home)
 * ========================================================================= */
const CRICKET_JOKES = [
  "Why did the batsman take a ladder to the nets? He heard the coach wanted him to raise his game.",
  "What's a cricketer's favorite type of music? Anything with a good hook shot.",
  "Why don't cricketers ever get lost? They always know the way back to the pavilion.",
  "How does a cricketer keep warm in winter? Near a boundary.",
  "Why did the spin bowler break up with his girlfriend? She said he put too much twist on everything.",
  "What did the umpire say to the batsman who kept arguing? 'That's out of order.'",
  "Why are cricketers bad at poker? They always show their swing.",
  "What do you call a sleeping cricket bat? A pad.",
];
const CRICKET_FACTS = [
  "A cricket ball travels roughly 160 km/h off the bat on a powerful pull shot — faster than a Formula 1 pit stop.",
  "The fastest delivery ever recorded was 161.3 km/h by Shoaib Akhtar against England in 2003.",
  "Test cricket is the only major sport where a single match can last five days and still end in a draw.",
  "The SCG (Sydney Cricket Ground) is the only international venue with a historic Ladies Pavilion from 1896 still in use.",
  "Reverse swing was first popularised by Pakistani pace bowlers in the 1970s — it requires one side of the ball to be significantly rougher than the other.",
  "A batter's eye can track the ball for only about 75% of its flight — the last 0.1 seconds is played on instinct and pre-read.",
  "Sachin Tendulkar is the only player to score 100 international centuries across Tests and ODIs.",
  "The average reaction time to a 150 km/h delivery is 0.4 seconds — about the same as blinking twice.",
];

console.log(`[SmartCrick] Loaded ${DRILLS.length} drills · ${MENTAL_SESSIONS.length} mental sessions · ${WORKOUTS.length} workouts`);
/* ============================================================================
 * TRANSLATIONS — 6 languages (en, hi, ur, bn, ta, si)
 * ~350 core keys covering nav, headers, buttons, stats, empty states.
 * ========================================================================= */
const TRANSLATIONS = {
  en: {
    nav: { home: "Home", drills: "Drills", mental: "Mental", workouts: "Workouts", coach: "AI Coach",
           physics: "Physics Lab", progress: "Progress", premium: "Premium", settings: "Settings",
           schedule: "Schedule", menu: "Menu", tools: "Cricket Tools" },
    common: { start: "Start", stop: "Stop", pause: "Pause", resume: "Resume", complete: "Complete",
              next: "Next", back: "Back", cancel: "Cancel", save: "Save", close: "Close",
              loading: "Loading…", retry: "Retry", done: "Done", continue: "Continue",
              min: "min", mins: "mins", sec: "sec", xp: "XP", level: "Level", day: "Day", days: "Days",
              today: "Today", yesterday: "Yesterday", all: "All", beginner: "Beginner",
              intermediate: "Intermediate", advanced: "Advanced", pro: "Pro", premium: "Premium",
              free: "Free", yes: "Yes", no: "No", or: "or", and: "and",
              search: "Search", filter: "Filter", sort: "Sort", edit: "Edit", delete: "Delete",
              confirm: "Confirm", error_generic: "Something went wrong. Try again.",
              offline: "Offline", online: "Online", unlock_premium: "Unlock Premium" },
    home: { greeting_morning: "Good morning", greeting_afternoon: "Good afternoon",
            greeting_evening: "Good evening", greeting_night: "Still grinding",
            subtitle: "Let's make today count",
            focus_title: "Today's Focus", focus_view_drills: "View recommended →",
            focus_confidence: "confidence",
            focus_reason_days: "You haven't worked on {{category}} in {{days}} days",
            focus_reason_weak: "{{category}} is your weakest area — let's build it up",
            focus_reason_streak: "You're on fire in {{category}} — let's keep it going",
            smart_start_title: "Smart Start", smart_start_sub: "A quick 10-minute session tuned to today",
            streak_title: "Streak", streak_days: "{{count}} day streak",
            streak_none: "Start your streak today", streak_broken: "Streak broken — restart today",
            overview_title: "Your week at a glance", joke_title: "Cricket joke of the day",
            fact_title: "Cricket fact of the day", quickstart: "Quick start",
            weak_area_title: "Mental Training Gap",
            weak_area_mental: "You've trained physically but only {{count}} mental sessions. Try one today.",
            overtraining_title: "Rest Day Suggested",
            overtraining_msg: "You've done {{category}} {{count}} days in a row. Your body needs rest.",
            match_week_title: "Match in {{days}} days",
            match_week_msg: "Time for light technical work + mental prep." },
    drills: { title: "Drills", subtitle: "Pick a category, pick a drill, get better",
              search: "Search drills…",
              cat_batting: "Batting", cat_bowling: "Bowling", cat_fielding: "Fielding",
              cat_keeping: "Keeping", cat_fitness: "Fitness",
              filter_all: "All", filter_level: "Level",
              start_drill: "Start drill", complete_drill: "Mark complete",
              equipment: "Equipment", cues: "Key cues", duration: "Duration",
              ask_coach: "Ask Coach about this", empty: "No drills match your filter",
              physics_lab_card_title: "Bowling Science Lab",
              physics_lab_card_desc: "Simulate swing, spin & seam. See what humidity really does.",
              physics_lab_card_cta: "Open lab →" },
    mental: { title: "Mental Training", subtitle: "Train the part no one sees",
              search: "Search sessions…",
              cat_focus: "Focus", cat_confidence: "Confidence", cat_pressure: "Pressure",
              cat_recovery: "Recovery", cat_mindset: "Mindset",
              start_session: "Start session", complete_session: "Session complete",
              premium_locked: "Premium session", debrief: "Get coach debrief" },
    workouts: { title: "Workouts", subtitle: "Physical prep for cricket performance",
                search: "Search workouts…",
                target_full_body: "Full body", target_arms: "Arms", target_back: "Back",
                target_chest: "Chest", target_shoulders: "Shoulders", target_legs: "Legs",
                target_core: "Core", target_cardio: "Cardio", target_recovery: "Recovery",
                exercises: "exercises", start: "Start workout" },
    physics: { title: "Bowling Science Lab", subtitle: "See the physics of every delivery",
               preset_outswing: "Outswing", preset_inswing: "Inswing", preset_reverse: "Reverse",
               preset_offspin: "Off-spin", preset_legspin: "Leg-spin",
               label_speed: "Speed", label_seam: "Seam angle", label_spin: "Spin rate",
               label_humidity: "Humidity", label_hardness: "Pitch hardness",
               label_kmh: "km/h", label_rpm: "rpm", label_deg: "°", label_pct: "%",
               readout_deviation: "Lateral deviation", readout_peak: "Peak swing distance",
               readout_flight: "Time of flight", readout_zone: "Final zone",
               bowl: "Bowl", reset: "Reset", compare: "Compare with…", save_preset: "Save preset",
               saved_presets: "Saved presets", no_saved: "No saved deliveries yet",
               zone_off: "Off stump", zone_middle: "Middle", zone_leg: "Leg stump",
               zone_wide_off: "Wide off", zone_wide_leg: "Wide leg" },
    progress: { title: "Progress", subtitle: "Numbers don't lie — look how far you've come",
                skill_radar: "Skill distribution",
                xp_trend: "30-day XP trend",
                total_xp: "Total XP", current_level: "Level", streak: "Streak",
                drills_done: "Drills done", mental_done: "Mental sessions",
                workouts_done: "Workouts", this_week: "This week", all_time: "All time",
                breakdown: "XP breakdown", next_level: "{{xp}} XP to level {{level}}" },
    premium: { title: "SmartCrick Premium", subtitle: "Unlock every session, every feature",
               monthly: "Monthly", yearly: "Yearly", lifetime: "Lifetime",
               per_month: "/month", per_year: "/year", once: "one time",
               feature_all_drills: "All 150+ drills",
               feature_all_mental: "All 240 mental sessions including elite series",
               feature_unlimited_coach: "Unlimited AI Coach conversations",
               feature_physics: "Bowling Physics Lab",
               feature_brain: "Neural training recommendations",
               feature_no_ads: "No interruptions, ever",
               feature_priority: "Priority support",
               checkout: "Go Premium", already_premium: "You're premium — thank you." },
    settings: { title: "Settings", subtitle: "Customize SmartCrick your way",
                audio: "Sound",
                audio_sub: "Chimes on timers, XP, and level-ups",
                language: "Language", language_sub: "भाषा · زبان · ভাষা",
                theme: "Theme", theme_dark: "Dark", theme_light: "Light",
                profile: "Profile", name: "Name", level: "Playing level", role: "Primary role",
                role_batter: "Batter", role_bowler: "Bowler", role_allrounder: "All-rounder",
                role_keeper: "Wicket-keeper", role_fielder: "Fielder",
                notifications: "Notifications", daily_reminder: "Daily reminder",
                data: "Your data", export: "Export progress", reset: "Reset all data",
                reset_confirm: "Reset everything? This cannot be undone.",
                account: "Account", signout: "Sign out", about: "About", version: "Version {{v}}" },
    onboarding: { welcome: "Welcome to SmartCrick",
                  welcome_sub: "Let's set up your training in under a minute",
                  step_name: "What should we call you?", step_name_ph: "Your name",
                  step_role: "What's your primary cricket role?",
                  step_level: "What's your level?",
                  step_language: "Pick your language",
                  get_started: "Let's go" },
    schedule: { title: "Schedule", subtitle: "Plan your week, your match prep, your rest",
                add: "Add activity", type_training: "Training", type_match: "Match",
                type_mental: "Mental session", type_rest: "Rest day",
                upcoming: "Upcoming", past: "Past" },
    xp_flash: "+{{xp}} XP", level_up: "Level up! Level {{level}}",
  },

  hi: {
    nav: { home: "होम", drills: "ड्रिल्स", mental: "मानसिक", workouts: "वर्कआउट",
           coach: "एआई कोच", physics: "फिज़िक्स लैब", progress: "प्रगति", premium: "प्रीमियम",
           settings: "सेटिंग्स", schedule: "शेड्यूल", menu: "मेनू", tools: "क्रिकेट टूल्स" },
    common: { start: "शुरू करें", stop: "रोकें", pause: "रुकें", resume: "जारी रखें",
              complete: "पूरा", next: "अगला", back: "वापस", cancel: "रद्द", save: "सेव",
              close: "बंद करें", loading: "लोड हो रहा है…", retry: "पुनः प्रयास",
              done: "हो गया", continue: "जारी रखें",
              min: "मिनट", mins: "मिनट", sec: "सेकंड", xp: "XP", level: "स्तर",
              day: "दिन", days: "दिन", today: "आज", yesterday: "कल", all: "सभी",
              beginner: "शुरुआती", intermediate: "मध्यम", advanced: "उन्नत",
              pro: "प्रो", premium: "प्रीमियम", free: "मुफ्त", yes: "हाँ", no: "नहीं",
              or: "या", and: "और", search: "खोज", filter: "फ़िल्टर", sort: "क्रमबद्ध",
              edit: "संपादित करें", delete: "हटाएं", confirm: "पुष्टि करें",
              error_generic: "कुछ गलत हुआ। फिर से कोशिश करें।",
              offline: "ऑफ़लाइन", online: "ऑनलाइन", unlock_premium: "प्रीमियम अनलॉक करें" },
    home: { greeting_morning: "सुप्रभात", greeting_afternoon: "शुभ दोपहर",
            greeting_evening: "शुभ संध्या", greeting_night: "अभी भी मेहनत में",
            subtitle: "आज को खास बनाते हैं",
            focus_title: "आज का फोकस", focus_view_drills: "सुझाई गई ड्रिल्स →",
            focus_confidence: "विश्वास",
            focus_reason_days: "आपने {{days}} दिनों से {{category}} नहीं किया है",
            focus_reason_weak: "{{category}} आपका कमज़ोर क्षेत्र है — इसे बेहतर बनाएं",
            focus_reason_streak: "{{category}} में आप बेहतरीन हैं — इसे जारी रखें",
            smart_start_title: "स्मार्ट स्टार्ट",
            smart_start_sub: "आज के लिए 10 मिनट का त्वरित सत्र",
            streak_title: "स्ट्रीक", streak_days: "{{count}} दिन की स्ट्रीक",
            streak_none: "आज से स्ट्रीक शुरू करें",
            streak_broken: "स्ट्रीक टूटी — आज फिर से शुरू करें",
            overview_title: "इस हफ्ते का सारांश",
            joke_title: "आज का क्रिकेट चुटकुला", fact_title: "आज का क्रिकेट तथ्य",
            quickstart: "त्वरित शुरुआत",
            weak_area_title: "मानसिक प्रशिक्षण में कमी",
            weak_area_mental: "आपने शारीरिक अभ्यास किया है लेकिन केवल {{count}} मानसिक सत्र। आज एक करें।",
            overtraining_title: "आराम का दिन सुझाया गया",
            overtraining_msg: "आपने लगातार {{count}} दिनों तक {{category}} किया है। शरीर को आराम चाहिए।",
            match_week_title: "{{days}} दिनों में मैच",
            match_week_msg: "हल्के तकनीकी अभ्यास + मानसिक तैयारी का समय।" },
    drills: { title: "ड्रिल्स", subtitle: "श्रेणी चुनें, ड्रिल चुनें, बेहतर बनें",
              cat_batting: "बल्लेबाज़ी", cat_bowling: "गेंदबाज़ी", cat_fielding: "फील्डिंग",
              cat_keeping: "विकेटकीपिंग", cat_fitness: "फ़िटनेस",
              filter_all: "सभी", filter_level: "स्तर",
              start_drill: "ड्रिल शुरू करें", complete_drill: "पूरा करें",
              equipment: "सामग्री", cues: "मुख्य संकेत", duration: "अवधि",
              ask_coach: "इस बारे में कोच से पूछें",
              empty: "कोई ड्रिल फ़िल्टर से मेल नहीं खाता",
              physics_lab_card_title: "बॉलिंग साइंस लैब",
              physics_lab_card_desc: "स्विंग, स्पिन और सीम का सिमुलेशन। वास्तव में नमी क्या करती है देखें।",
              physics_lab_card_cta: "लैब खोलें →" },
    mental: { title: "मानसिक प्रशिक्षण", subtitle: "उस हिस्से को प्रशिक्षित करें जो कोई नहीं देखता",
              cat_focus: "फोकस", cat_confidence: "विश्वास", cat_pressure: "दबाव",
              cat_recovery: "रिकवरी", cat_mindset: "मानसिकता",
              start_session: "सत्र शुरू करें", complete_session: "सत्र पूरा",
              premium_locked: "प्रीमियम सत्र", debrief: "कोच से समीक्षा लें" },
    workouts: { title: "वर्कआउट", subtitle: "क्रिकेट प्रदर्शन के लिए शारीरिक तैयारी",
                target_full_body: "पूरा शरीर", target_arms: "बाहें", target_back: "पीठ",
                target_chest: "छाती", target_shoulders: "कंधे", target_legs: "पैर",
                target_core: "कोर", target_cardio: "कार्डियो", target_recovery: "रिकवरी",
                exercises: "व्यायाम", start: "वर्कआउट शुरू करें" },
    physics: { title: "बॉलिंग साइंस लैब", subtitle: "हर डिलीवरी की फिज़िक्स देखें",
               preset_outswing: "आउटस्विंग", preset_inswing: "इनस्विंग",
               preset_reverse: "रिवर्स", preset_offspin: "ऑफ-स्पिन", preset_legspin: "लेग-स्पिन",
               label_speed: "गति", label_seam: "सीम कोण", label_spin: "स्पिन दर",
               label_humidity: "नमी", label_hardness: "पिच कठोरता",
               label_kmh: "कि.मी./घं.", label_rpm: "आरपीएम", label_deg: "°", label_pct: "%",
               readout_deviation: "पार्श्व विचलन", readout_peak: "शिखर स्विंग दूरी",
               readout_flight: "उड़ान का समय", readout_zone: "अंतिम ज़ोन",
               bowl: "गेंद डालें", reset: "रीसेट", compare: "तुलना करें…",
               save_preset: "प्रीसेट सेव करें", saved_presets: "सहेजे गए प्रीसेट",
               no_saved: "अभी तक कोई डिलीवरी सेव नहीं",
               zone_off: "ऑफ स्टंप", zone_middle: "मिडल", zone_leg: "लेग स्टंप",
               zone_wide_off: "वाइड ऑफ", zone_wide_leg: "वाइड लेग" },
    progress: { title: "प्रगति", subtitle: "आँकड़े झूठ नहीं बोलते — देखिए आप कितने आगे आए हैं",
                total_xp: "कुल XP", current_level: "स्तर", streak: "स्ट्रीक",
                drills_done: "ड्रिल्स पूरी", mental_done: "मानसिक सत्र",
                workouts_done: "वर्कआउट", this_week: "इस हफ्ते", all_time: "सर्वकालिक",
                breakdown: "XP विवरण", next_level: "स्तर {{level}} के लिए {{xp}} XP" },
    premium: { title: "SmartCrick प्रीमियम", subtitle: "हर सत्र, हर सुविधा अनलॉक करें",
               monthly: "मासिक", yearly: "वार्षिक", lifetime: "आजीवन",
               per_month: "/माह", per_year: "/वर्ष", once: "एक बार",
               feature_all_drills: "सभी 150+ ड्रिल्स",
               feature_all_mental: "सभी 240 मानसिक सत्र एलीट सीरीज़ सहित",
               feature_unlimited_coach: "असीमित एआई कोच बातचीत",
               feature_physics: "बॉलिंग फिज़िक्स लैब",
               feature_brain: "न्यूरल प्रशिक्षण सुझाव",
               feature_no_ads: "कोई विज्ञापन नहीं, कभी नहीं",
               feature_priority: "प्राथमिकता समर्थन",
               checkout: "प्रीमियम लें", already_premium: "आप प्रीमियम हैं — धन्यवाद।" },
    settings: { title: "सेटिंग्स", subtitle: "SmartCrick को अपने अनुसार बनाएं",
                language: "भाषा", language_sub: "Language · زبان · ভাষা",
                theme: "थीम", theme_dark: "डार्क", theme_light: "लाइट",
                profile: "प्रोफ़ाइल", name: "नाम", level: "खेलने का स्तर",
                role: "मुख्य भूमिका",
                role_batter: "बल्लेबाज़", role_bowler: "गेंदबाज़",
                role_allrounder: "ऑलराउंडर", role_keeper: "विकेटकीपर", role_fielder: "फील्डर",
                notifications: "सूचनाएं", daily_reminder: "दैनिक अनुस्मारक",
                data: "आपका डेटा", export: "प्रगति निर्यात करें",
                reset: "सभी डेटा रीसेट करें",
                reset_confirm: "सब कुछ रीसेट करें? यह पूर्ववत नहीं हो सकता।",
                account: "खाता", signout: "साइन आउट",
                about: "परिचय", version: "संस्करण {{v}}" },
    onboarding: { welcome: "SmartCrick में स्वागत है",
                  welcome_sub: "एक मिनट से कम में अपना प्रशिक्षण सेट करें",
                  step_name: "हम आपको क्या कहें?", step_name_ph: "आपका नाम",
                  step_role: "आपकी मुख्य क्रिकेट भूमिका क्या है?",
                  step_level: "आपका स्तर क्या है?",
                  step_language: "अपनी भाषा चुनें", get_started: "चलिए शुरू करें" },
    schedule: { title: "शेड्यूल",
                subtitle: "अपने हफ्ते, मैच तैयारी, विश्राम की योजना बनाएं",
                add: "गतिविधि जोड़ें", type_training: "प्रशिक्षण", type_match: "मैच",
                type_mental: "मानसिक सत्र", type_rest: "विश्राम",
                upcoming: "आगामी", past: "बीता हुआ" },
    xp_flash: "+{{xp}} XP", level_up: "लेवल अप! स्तर {{level}}",
  },

  ur: {
    nav: { home: "ہوم", drills: "ڈرلز", mental: "ذہنی", workouts: "ورزش",
           coach: "اے آئی کوچ", physics: "فزکس لیب", progress: "پیش رفت",
           premium: "پریمیم", settings: "ترتیبات", schedule: "شیڈول",
           menu: "مینو", tools: "کرکٹ ٹولز" },
    common: { start: "شروع کریں", stop: "رکیں", pause: "وقفہ", resume: "جاری رکھیں",
              complete: "مکمل", next: "اگلا", back: "پیچھے", cancel: "منسوخ",
              save: "محفوظ کریں", close: "بند کریں", loading: "لوڈ ہو رہا ہے…",
              retry: "دوبارہ کوشش", done: "ہو گیا", continue: "جاری رکھیں",
              min: "منٹ", mins: "منٹ", sec: "سیکنڈ", xp: "XP", level: "سطح",
              day: "دن", days: "دن", today: "آج", yesterday: "کل", all: "تمام",
              beginner: "ابتدائی", intermediate: "درمیانی", advanced: "ایڈوانسڈ",
              pro: "پرو", premium: "پریمیم", free: "مفت", yes: "ہاں", no: "نہیں",
              or: "یا", and: "اور", search: "تلاش", filter: "فلٹر", sort: "ترتیب",
              edit: "ترمیم", delete: "حذف", confirm: "تصدیق",
              error_generic: "کچھ غلط ہوا۔ دوبارہ کوشش کریں۔",
              offline: "آف لائن", online: "آن لائن", unlock_premium: "پریمیم کھولیں" },
    home: { greeting_morning: "صبح بخیر", greeting_afternoon: "دوپہر بخیر",
            greeting_evening: "شام بخیر", greeting_night: "ابھی بھی محنت میں",
            subtitle: "آج کو خاص بنائیں",
            focus_title: "آج کی توجہ", focus_view_drills: "تجویز کردہ ڈرلز →",
            focus_confidence: "اعتماد",
            focus_reason_days: "آپ نے {{days}} دنوں سے {{category}} نہیں کیا",
            focus_reason_weak: "{{category}} آپ کا کمزور ترین شعبہ ہے — اسے مضبوط کریں",
            focus_reason_streak: "{{category}} میں آپ شاندار ہیں — اسے جاری رکھیں",
            smart_start_title: "سمارٹ اسٹارٹ", smart_start_sub: "آج کے لیے 10 منٹ کا سیشن",
            streak_title: "تسلسل", streak_days: "{{count}} دن کا تسلسل",
            streak_none: "آج سے تسلسل شروع کریں",
            streak_broken: "تسلسل ٹوٹا — آج دوبارہ شروع کریں",
            overview_title: "اس ہفتے کا جائزہ",
            joke_title: "آج کا کرکٹ لطیفہ", fact_title: "آج کی کرکٹ حقیقت",
            quickstart: "فوری آغاز", weak_area_title: "ذہنی تربیت میں کمی",
            weak_area_mental: "آپ نے جسمانی مشق کی لیکن صرف {{count}} ذہنی سیشن۔ آج ایک کریں۔",
            overtraining_title: "آرام کا دن تجویز کردہ",
            overtraining_msg: "آپ نے مسلسل {{count}} دن {{category}} کیا۔ جسم کو آرام چاہیے۔",
            match_week_title: "{{days}} دنوں میں میچ",
            match_week_msg: "ہلکی تکنیکی تیاری + ذہنی تیاری کا وقت۔" },
    drills: { title: "ڈرلز", subtitle: "زمرہ منتخب کریں، ڈرل منتخب کریں، بہتر بنیں",
              cat_batting: "بیٹنگ", cat_bowling: "بولنگ", cat_fielding: "فیلڈنگ",
              cat_keeping: "وکٹ کیپنگ", cat_fitness: "فٹنس",
              filter_all: "تمام", filter_level: "سطح",
              start_drill: "ڈرل شروع کریں", complete_drill: "مکمل کریں",
              equipment: "سامان", cues: "اہم اشارے", duration: "دورانیہ",
              ask_coach: "کوچ سے اس بارے میں پوچھیں",
              empty: "کوئی ڈرل فلٹر سے مماثل نہیں",
              physics_lab_card_title: "بولنگ سائنس لیب",
              physics_lab_card_desc: "سوئنگ، اسپن اور سیم کا سمولیشن۔ دیکھیں نمی واقعی کیا کرتی ہے۔",
              physics_lab_card_cta: "لیب کھولیں →" },
    mental: { title: "ذہنی تربیت", subtitle: "اس حصے کی تربیت کریں جو کوئی نہیں دیکھتا",
              cat_focus: "توجہ", cat_confidence: "اعتماد", cat_pressure: "دباؤ",
              cat_recovery: "بحالی", cat_mindset: "ذہنیت",
              start_session: "سیشن شروع کریں", complete_session: "سیشن مکمل",
              premium_locked: "پریمیم سیشن", debrief: "کوچ سے جائزہ لیں" },
    workouts: { title: "ورزش", subtitle: "کرکٹ کارکردگی کے لیے جسمانی تیاری",
                target_full_body: "پورا جسم", target_arms: "بازو", target_back: "کمر",
                target_chest: "سینہ", target_shoulders: "کندھے", target_legs: "ٹانگیں",
                target_core: "کور", target_cardio: "کارڈیو", target_recovery: "بحالی",
                exercises: "مشقیں", start: "ورزش شروع کریں" },
    physics: { title: "بولنگ سائنس لیب", subtitle: "ہر ڈلیوری کی فزکس دیکھیں",
               preset_outswing: "آؤٹ سوئنگ", preset_inswing: "ان سوئنگ",
               preset_reverse: "ریورس", preset_offspin: "آف اسپن", preset_legspin: "لیگ اسپن",
               label_speed: "رفتار", label_seam: "سیم زاویہ", label_spin: "اسپن کی شرح",
               label_humidity: "نمی", label_hardness: "پچ سختی",
               label_kmh: "کلومیٹر/گھنٹہ", label_rpm: "آر پی ایم", label_deg: "°", label_pct: "%",
               readout_deviation: "پس منظری انحراف", readout_peak: "چوٹی سوئنگ فاصلہ",
               readout_flight: "اڑان کا وقت", readout_zone: "آخری زون",
               bowl: "بال کرائیں", reset: "ری سیٹ", compare: "موازنہ…",
               save_preset: "پری سیٹ محفوظ کریں", saved_presets: "محفوظ پری سیٹس",
               no_saved: "ابھی تک کوئی ڈلیوری محفوظ نہیں",
               zone_off: "آف اسٹمپ", zone_middle: "مڈل", zone_leg: "لیگ اسٹمپ",
               zone_wide_off: "وائیڈ آف", zone_wide_leg: "وائیڈ لیگ" },
    progress: { title: "پیش رفت", subtitle: "اعداد جھوٹ نہیں بولتے — دیکھیں آپ کتنے آگے آئے",
                total_xp: "کل XP", current_level: "سطح", streak: "تسلسل",
                drills_done: "ڈرلز مکمل", mental_done: "ذہنی سیشنز",
                workouts_done: "ورزشیں", this_week: "اس ہفتے", all_time: "ہمہ وقت",
                breakdown: "XP تفصیل", next_level: "سطح {{level}} کے لیے {{xp}} XP" },
    premium: { title: "SmartCrick پریمیم", subtitle: "ہر سیشن، ہر خصوصیت کھولیں",
               monthly: "ماہانہ", yearly: "سالانہ", lifetime: "تاحیات",
               per_month: "/ماہ", per_year: "/سال", once: "ایک بار",
               feature_all_drills: "تمام 150+ ڈرلز",
               feature_all_mental: "تمام 240 ذہنی سیشن بشمول ایلیٹ سیریز",
               feature_unlimited_coach: "لامحدود اے آئی کوچ گفتگو",
               feature_physics: "بولنگ فزکس لیب",
               feature_brain: "نیورل تربیتی تجاویز",
               feature_no_ads: "کوئی اشتہار نہیں، کبھی نہیں",
               feature_priority: "ترجیحی سپورٹ",
               checkout: "پریمیم لیں", already_premium: "آپ پریمیم ہیں — شکریہ۔" },
    settings: { title: "ترتیبات", subtitle: "SmartCrick کو اپنی مرضی کے مطابق بنائیں",
                language: "زبان", language_sub: "Language · भाषा · ভাষা",
                theme: "تھیم", theme_dark: "ڈارک", theme_light: "لائٹ",
                profile: "پروفائل", name: "نام", level: "کھیلنے کی سطح",
                role: "بنیادی کردار",
                role_batter: "بلے باز", role_bowler: "گیند باز",
                role_allrounder: "آل راؤنڈر", role_keeper: "وکٹ کیپر", role_fielder: "فیلڈر",
                notifications: "اطلاعات", daily_reminder: "روزانہ یاددہانی",
                data: "آپ کا ڈیٹا", export: "پیش رفت برآمد کریں",
                reset: "تمام ڈیٹا ری سیٹ",
                reset_confirm: "سب کچھ ری سیٹ کریں؟ یہ واپس نہیں ہو سکتا۔",
                account: "اکاؤنٹ", signout: "سائن آؤٹ",
                about: "بارے میں", version: "ورژن {{v}}" },
    onboarding: { welcome: "SmartCrick میں خوش آمدید",
                  welcome_sub: "ایک منٹ سے کم میں اپنی تربیت ترتیب دیں",
                  step_name: "ہم آپ کو کیا پکاریں؟", step_name_ph: "آپ کا نام",
                  step_role: "آپ کا بنیادی کرکٹ کردار کیا ہے؟",
                  step_level: "آپ کی سطح کیا ہے؟",
                  step_language: "اپنی زبان منتخب کریں", get_started: "چلیں شروع کریں" },
    schedule: { title: "شیڈول",
                subtitle: "اپنے ہفتے، میچ کی تیاری، آرام کی منصوبہ بندی کریں",
                add: "سرگرمی شامل کریں", type_training: "تربیت", type_match: "میچ",
                type_mental: "ذہنی سیشن", type_rest: "آرام کا دن",
                upcoming: "آنے والا", past: "گزرا ہوا" },
    xp_flash: "+{{xp}} XP", level_up: "لیول اپ! سطح {{level}}",
  },

  bn: {
    nav: { home: "হোম", drills: "ড্রিল", mental: "মানসিক", workouts: "ওয়ার্কআউট",
           coach: "এআই কোচ", physics: "ফিজিক্স ল্যাব", progress: "অগ্রগতি",
           premium: "প্রিমিয়াম", settings: "সেটিংস", schedule: "সময়সূচি",
           menu: "মেনু", tools: "ক্রিকেট টুলস" },
    common: { start: "শুরু", stop: "থামান", pause: "বিরতি", resume: "চালিয়ে যান",
              complete: "সম্পূর্ণ", next: "পরবর্তী", back: "পিছনে", cancel: "বাতিল",
              save: "সংরক্ষণ", close: "বন্ধ", loading: "লোড হচ্ছে…",
              retry: "আবার চেষ্টা", done: "হয়ে গেছে", continue: "চালিয়ে যান",
              min: "মিনিট", mins: "মিনিট", sec: "সেকেন্ড", xp: "XP", level: "স্তর",
              day: "দিন", days: "দিন", today: "আজ", yesterday: "গতকাল", all: "সব",
              beginner: "প্রাথমিক", intermediate: "মধ্যবর্তী", advanced: "উন্নত",
              pro: "প্রো", premium: "প্রিমিয়াম", free: "বিনামূল্যে", yes: "হ্যাঁ", no: "না",
              or: "বা", and: "এবং", search: "অনুসন্ধান", filter: "ফিল্টার",
              sort: "সাজান", edit: "সম্পাদনা", delete: "মুছুন", confirm: "নিশ্চিত করুন",
              error_generic: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
              offline: "অফলাইন", online: "অনলাইন", unlock_premium: "প্রিমিয়াম আনলক করুন" },
    home: { greeting_morning: "সুপ্রভাত", greeting_afternoon: "শুভ দুপুর",
            greeting_evening: "শুভ সন্ধ্যা", greeting_night: "এখনও পরিশ্রমে",
            subtitle: "আজকের দিনটিকে গুরুত্বপূর্ণ করি",
            focus_title: "আজকের মনোযোগ", focus_view_drills: "প্রস্তাবিত ড্রিল →",
            focus_confidence: "আত্মবিশ্বাস",
            focus_reason_days: "আপনি {{days}} দিন ধরে {{category}} করেননি",
            focus_reason_weak: "{{category}} আপনার দুর্বলতম ক্ষেত্র — এটি উন্নত করুন",
            focus_reason_streak: "{{category}}-এ আপনি দুর্দান্ত — চালিয়ে যান",
            smart_start_title: "স্মার্ট স্টার্ট", smart_start_sub: "আজকের জন্য ১০ মিনিটের সেশন",
            streak_title: "ধারাবাহিকতা", streak_days: "{{count}} দিনের ধারা",
            streak_none: "আজ থেকে শুরু করুন",
            streak_broken: "ধারা ভেঙেছে — আজ আবার শুরু করুন",
            overview_title: "এই সপ্তাহের সংক্ষিপ্তসার",
            joke_title: "আজকের ক্রিকেট কৌতুক", fact_title: "আজকের ক্রিকেট তথ্য",
            quickstart: "দ্রুত শুরু", weak_area_title: "মানসিক প্রশিক্ষণে ঘাটতি",
            weak_area_mental: "আপনি শারীরিক অনুশীলন করেছেন কিন্তু মাত্র {{count}} মানসিক সেশন। আজ একটি করুন।",
            overtraining_title: "বিশ্রামের দিন প্রস্তাবিত",
            overtraining_msg: "আপনি টানা {{count}} দিন {{category}} করেছেন। শরীরের বিশ্রাম প্রয়োজন।",
            match_week_title: "{{days}} দিনে ম্যাচ",
            match_week_msg: "হালকা কৌশলগত কাজ + মানসিক প্রস্তুতির সময়।" },
    drills: { title: "ড্রিল", subtitle: "ক্যাটাগরি বাছুন, ড্রিল বাছুন, উন্নত হোন",
              cat_batting: "ব্যাটিং", cat_bowling: "বোলিং", cat_fielding: "ফিল্ডিং",
              cat_keeping: "উইকেটকিপিং", cat_fitness: "ফিটনেস",
              filter_all: "সব", filter_level: "স্তর",
              start_drill: "ড্রিল শুরু", complete_drill: "সম্পূর্ণ করুন",
              equipment: "সরঞ্জাম", cues: "মূল সংকেত", duration: "সময়কাল",
              ask_coach: "কোচকে এটি সম্পর্কে জিজ্ঞাসা করুন",
              empty: "কোন ড্রিল ফিল্টারের সাথে মিলছে না",
              physics_lab_card_title: "বোলিং সায়েন্স ল্যাব",
              physics_lab_card_desc: "সুইং, স্পিন ও সিমের সিমুলেশন। আর্দ্রতা আসলে কী করে দেখুন।",
              physics_lab_card_cta: "ল্যাব খুলুন →" },
    mental: { title: "মানসিক প্রশিক্ষণ", subtitle: "যে অংশটি কেউ দেখে না সেটি প্রশিক্ষণ দিন",
              cat_focus: "মনোযোগ", cat_confidence: "আত্মবিশ্বাস", cat_pressure: "চাপ",
              cat_recovery: "পুনরুদ্ধার", cat_mindset: "মানসিকতা",
              start_session: "সেশন শুরু", complete_session: "সেশন সম্পূর্ণ",
              premium_locked: "প্রিমিয়াম সেশন", debrief: "কোচের পর্যালোচনা নিন" },
    workouts: { title: "ওয়ার্কআউট", subtitle: "ক্রিকেট পারফরম্যান্সের জন্য শারীরিক প্রস্তুতি",
                target_full_body: "পূর্ণ শরীর", target_arms: "বাহু", target_back: "পিঠ",
                target_chest: "বুক", target_shoulders: "কাঁধ", target_legs: "পা",
                target_core: "কোর", target_cardio: "কার্ডিও", target_recovery: "পুনরুদ্ধার",
                exercises: "ব্যায়াম", start: "ওয়ার্কআউট শুরু" },
    physics: { title: "বোলিং সায়েন্স ল্যাব", subtitle: "প্রতিটি ডেলিভারির পদার্থবিদ্যা দেখুন",
               preset_outswing: "আউটসুইং", preset_inswing: "ইনসুইং",
               preset_reverse: "রিভার্স", preset_offspin: "অফ-স্পিন", preset_legspin: "লেগ-স্পিন",
               label_speed: "গতি", label_seam: "সিম কোণ", label_spin: "স্পিন হার",
               label_humidity: "আর্দ্রতা", label_hardness: "পিচ কঠিনতা",
               label_kmh: "কিমি/ঘ", label_rpm: "আরপিএম", label_deg: "°", label_pct: "%",
               readout_deviation: "পার্শ্বীয় বিচ্যুতি", readout_peak: "সর্বোচ্চ সুইং দূরত্ব",
               readout_flight: "উড়ানের সময়", readout_zone: "চূড়ান্ত অঞ্চল",
               bowl: "বোল করুন", reset: "রিসেট", compare: "তুলনা…",
               save_preset: "প্রিসেট সংরক্ষণ", saved_presets: "সংরক্ষিত প্রিসেট",
               no_saved: "এখনও কোন ডেলিভারি সংরক্ষণ নেই",
               zone_off: "অফ স্টাম্প", zone_middle: "মিডল", zone_leg: "লেগ স্টাম্প",
               zone_wide_off: "ওয়াইড অফ", zone_wide_leg: "ওয়াইড লেগ" },
    progress: { title: "অগ্রগতি", subtitle: "সংখ্যা মিথ্যা বলে না — দেখুন আপনি কতদূর এসেছেন",
                total_xp: "মোট XP", current_level: "স্তর", streak: "ধারাবাহিকতা",
                drills_done: "সম্পন্ন ড্রিল", mental_done: "মানসিক সেশন",
                workouts_done: "ওয়ার্কআউট", this_week: "এই সপ্তাহে", all_time: "সর্বকালের",
                breakdown: "XP বিবরণ", next_level: "স্তর {{level}}-এর জন্য {{xp}} XP" },
    premium: { title: "SmartCrick প্রিমিয়াম",
               subtitle: "প্রতিটি সেশন, প্রতিটি বৈশিষ্ট্য আনলক করুন",
               monthly: "মাসিক", yearly: "বার্ষিক", lifetime: "আজীবন",
               per_month: "/মাস", per_year: "/বছর", once: "একবার",
               feature_all_drills: "সব ১৫০+ ড্রিল",
               feature_all_mental: "সব ২৪০ মানসিক সেশন এলিট সিরিজ সহ",
               feature_unlimited_coach: "সীমাহীন এআই কোচ কথোপকথন",
               feature_physics: "বোলিং ফিজিক্স ল্যাব",
               feature_brain: "নিউরাল প্রশিক্ষণ সুপারিশ",
               feature_no_ads: "কোন বিজ্ঞাপন নেই, কখনোই না",
               feature_priority: "অগ্রাধিকার সহায়তা",
               checkout: "প্রিমিয়াম নিন", already_premium: "আপনি প্রিমিয়াম — ধন্যবাদ।" },
    settings: { title: "সেটিংস", subtitle: "SmartCrick আপনার পছন্দমতো সাজান",
                language: "ভাষা", language_sub: "Language · भाषा · زبان",
                theme: "থিম", theme_dark: "ডার্ক", theme_light: "লাইট",
                profile: "প্রোফাইল", name: "নাম", level: "খেলার স্তর",
                role: "প্রাথমিক ভূমিকা",
                role_batter: "ব্যাটার", role_bowler: "বোলার",
                role_allrounder: "অলরাউন্ডার", role_keeper: "উইকেটকিপার", role_fielder: "ফিল্ডার",
                notifications: "বিজ্ঞপ্তি", daily_reminder: "দৈনিক অনুস্মারক",
                data: "আপনার ডেটা", export: "অগ্রগতি রপ্তানি",
                reset: "সব ডেটা রিসেট",
                reset_confirm: "সবকিছু রিসেট করবেন? এটি পূর্বাবস্থায় ফেরানো যাবে না।",
                account: "অ্যাকাউন্ট", signout: "সাইন আউট",
                about: "সম্পর্কে", version: "সংস্করণ {{v}}" },
    onboarding: { welcome: "SmartCrick-এ স্বাগতম",
                  welcome_sub: "এক মিনিটের কম সময়ে আপনার প্রশিক্ষণ সেট করুন",
                  step_name: "আমরা আপনাকে কী বলব?", step_name_ph: "আপনার নাম",
                  step_role: "আপনার প্রাথমিক ক্রিকেট ভূমিকা কী?",
                  step_level: "আপনার স্তর কী?",
                  step_language: "আপনার ভাষা বাছুন", get_started: "চলুন শুরু করি" },
    schedule: { title: "সময়সূচি",
                subtitle: "আপনার সপ্তাহ, ম্যাচ প্রস্তুতি, বিশ্রাম পরিকল্পনা করুন",
                add: "কার্যকলাপ যোগ করুন", type_training: "প্রশিক্ষণ", type_match: "ম্যাচ",
                type_mental: "মানসিক সেশন", type_rest: "বিশ্রামের দিন",
                upcoming: "আসন্ন", past: "অতীত" },
    xp_flash: "+{{xp}} XP", level_up: "লেভেল আপ! স্তর {{level}}",
  },

  ta: {
    nav: { home: "முகப்பு", drills: "பயிற்சிகள்", mental: "மன",
           workouts: "உடற்பயிற்சி", coach: "AI பயிற்சியாளர்",
           physics: "இயற்பியல் ஆய்வகம்", progress: "முன்னேற்றம்",
           premium: "பிரீமியம்", settings: "அமைப்புகள்", schedule: "அட்டவணை",
           menu: "பட்டி", tools: "கிரிக்கெட் கருவிகள்" },
    common: { start: "தொடங்கு", stop: "நிறுத்து", pause: "இடைநிறுத்து", resume: "தொடர்",
              complete: "முடித்தது", next: "அடுத்து", back: "பின்", cancel: "ரத்து",
              save: "சேமி", close: "மூடு", loading: "ஏற்றுகிறது…",
              retry: "மீண்டும் முயற்சி", done: "முடிந்தது", continue: "தொடர்",
              min: "நிமிடம்", mins: "நிமிடங்கள்", sec: "வினாடி", xp: "XP", level: "நிலை",
              day: "நாள்", days: "நாட்கள்", today: "இன்று", yesterday: "நேற்று", all: "அனைத்து",
              beginner: "ஆரம்ப", intermediate: "இடைநிலை", advanced: "மேம்பட்ட",
              pro: "புரோ", premium: "பிரீமியம்", free: "இலவசம்", yes: "ஆம்", no: "இல்லை",
              or: "அல்லது", and: "மற்றும்", search: "தேடு", filter: "வடிகட்டி",
              sort: "வரிசைப்படுத்து", edit: "திருத்து", delete: "அழி", confirm: "உறுதிப்படுத்து",
              error_generic: "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.",
              offline: "ஆஃப்லைன்", online: "ஆன்லைன்", unlock_premium: "பிரீமியம் திற" },
    home: { greeting_morning: "காலை வணக்கம்", greeting_afternoon: "மதிய வணக்கம்",
            greeting_evening: "மாலை வணக்கம்", greeting_night: "இன்னும் கடின உழைப்பில்",
            subtitle: "இன்றை சிறப்பாக்குவோம்",
            focus_title: "இன்றைய கவனம்", focus_view_drills: "பரிந்துரைக்கப்பட்ட பயிற்சிகள் →",
            focus_confidence: "நம்பிக்கை",
            focus_reason_days: "நீங்கள் {{days}} நாட்களாக {{category}} செய்யவில்லை",
            focus_reason_weak: "{{category}} உங்களின் பலவீனமான பகுதி — மேம்படுத்துவோம்",
            focus_reason_streak: "{{category}}-இல் நீங்கள் சிறப்பாக உள்ளீர்கள் — தொடருங்கள்",
            smart_start_title: "ஸ்மார்ட் தொடக்கம்", smart_start_sub: "இன்றைய 10 நிமிட அமர்வு",
            streak_title: "தொடர்ச்சி", streak_days: "{{count}} நாள் தொடர்ச்சி",
            streak_none: "இன்று தொடங்குங்கள்",
            streak_broken: "தொடர்ச்சி உடைந்தது — இன்று மீண்டும் தொடங்குங்கள்",
            overview_title: "இந்த வார சுருக்கம்",
            joke_title: "இன்றைய கிரிக்கெட் நகைச்சுவை",
            fact_title: "இன்றைய கிரிக்கெட் உண்மை",
            quickstart: "விரைவு தொடக்கம்", weak_area_title: "மனப் பயிற்சி இடைவெளி",
            weak_area_mental: "நீங்கள் உடல் பயிற்சி செய்துள்ளீர்கள் ஆனால் {{count}} மன அமர்வுகள் மட்டுமே. இன்று ஒன்று செய்யுங்கள்.",
            overtraining_title: "ஓய்வு நாள் பரிந்துரைக்கப்பட்டது",
            overtraining_msg: "{{count}} நாட்களாக தொடர்ந்து {{category}} செய்துள்ளீர்கள். உடலுக்கு ஓய்வு தேவை.",
            match_week_title: "{{days}} நாட்களில் போட்டி",
            match_week_msg: "இலகுவான தொழில்நுட்ப வேலை + மன தயாரிப்பு நேரம்." },
    drills: { title: "பயிற்சிகள்", subtitle: "வகை தேர்வு செய்யவும், பயிற்சி தேர்வு செய்யவும்",
              cat_batting: "பேட்டிங்", cat_bowling: "பௌலிங்", cat_fielding: "களப்பணி",
              cat_keeping: "விக்கெட் கீப்பிங்", cat_fitness: "உடற்தகுதி",
              filter_all: "அனைத்து", filter_level: "நிலை",
              start_drill: "பயிற்சி தொடங்கு", complete_drill: "முடித்ததாக குறி",
              equipment: "சாதனம்", cues: "முக்கிய குறிப்புகள்", duration: "காலஅளவு",
              ask_coach: "இதைப் பற்றி பயிற்சியாளரிடம் கேள்",
              empty: "எந்த பயிற்சியும் வடிகட்டிக்கு பொருந்தவில்லை",
              physics_lab_card_title: "பௌலிங் அறிவியல் ஆய்வகம்",
              physics_lab_card_desc: "ஸ்விங், ஸ்பின் & சீம் உருவகப்படுத்தல்.",
              physics_lab_card_cta: "ஆய்வகத்தைத் திற →" },
    mental: { title: "மனப் பயிற்சி", subtitle: "யாரும் பார்க்காத பகுதியை பயிற்றுவிக்கவும்",
              cat_focus: "கவனம்", cat_confidence: "நம்பிக்கை", cat_pressure: "அழுத்தம்",
              cat_recovery: "மீட்சி", cat_mindset: "மனநிலை",
              start_session: "அமர்வு தொடங்கு", complete_session: "அமர்வு முடிந்தது",
              premium_locked: "பிரீமியம் அமர்வு", debrief: "பயிற்சியாளரிடமிருந்து மதிப்பாய்வு" },
    workouts: { title: "உடற்பயிற்சி", subtitle: "கிரிக்கெட் செயல்திறனுக்கான உடல் தயாரிப்பு",
                target_full_body: "முழு உடல்", target_arms: "கைகள்", target_back: "முதுகு",
                target_chest: "மார்பு", target_shoulders: "தோள்கள்", target_legs: "கால்கள்",
                target_core: "மையப்பகுதி", target_cardio: "கார்டியோ", target_recovery: "மீட்சி",
                exercises: "பயிற்சிகள்", start: "உடற்பயிற்சி தொடங்கு" },
    physics: { title: "பௌலிங் அறிவியல் ஆய்வகம்", subtitle: "ஒவ்வொரு டெலிவரியின் இயற்பியல்",
               preset_outswing: "அவுட்ஸ்விங்", preset_inswing: "இன்ஸ்விங்",
               preset_reverse: "ரிவர்ஸ்", preset_offspin: "ஆஃப்-ஸ்பின்", preset_legspin: "லெக்-ஸ்பின்",
               label_speed: "வேகம்", label_seam: "சீம் கோணம்", label_spin: "ஸ்பின் விகிதம்",
               label_humidity: "ஈரப்பதம்", label_hardness: "பிட்ச் கடினத்தன்மை",
               label_kmh: "கி.மீ/மணி", label_rpm: "RPM", label_deg: "°", label_pct: "%",
               readout_deviation: "பக்க விலகல்", readout_peak: "உச்ச ஸ்விங் தூரம்",
               readout_flight: "பறக்கும் நேரம்", readout_zone: "இறுதி மண்டலம்",
               bowl: "பௌல்", reset: "மீட்டமை", compare: "ஒப்பிடு…",
               save_preset: "முன்னமைப்பை சேமி", saved_presets: "சேமிக்கப்பட்ட முன்னமைப்புகள்",
               no_saved: "இதுவரை டெலிவரிகள் சேமிக்கப்படவில்லை",
               zone_off: "ஆஃப் ஸ்டம்ப்", zone_middle: "மிடில்", zone_leg: "லெக் ஸ்டம்ப்",
               zone_wide_off: "வைட் ஆஃப்", zone_wide_leg: "வைட் லெக்" },
    progress: { title: "முன்னேற்றம்", subtitle: "எண்கள் பொய் சொல்லாது",
                total_xp: "மொத்த XP", current_level: "நிலை", streak: "தொடர்ச்சி",
                drills_done: "முடித்த பயிற்சிகள்", mental_done: "மன அமர்வுகள்",
                workouts_done: "உடற்பயிற்சிகள்", this_week: "இந்த வாரம்", all_time: "எல்லா நேரமும்",
                breakdown: "XP விவரம்", next_level: "நிலை {{level}}-க்கு {{xp}} XP" },
    premium: { title: "SmartCrick பிரீமியம்", subtitle: "ஒவ்வொரு அமர்வையும் திறக்கவும்",
               monthly: "மாதாந்திர", yearly: "ஆண்டுதோறும்", lifetime: "வாழ்நாள்",
               per_month: "/மாதம்", per_year: "/ஆண்டு", once: "ஒருமுறை",
               feature_all_drills: "அனைத்து 150+ பயிற்சிகள்",
               feature_all_mental: "உயரடுக்கு தொடர் உட்பட அனைத்து 240 மன அமர்வுகள்",
               feature_unlimited_coach: "வரம்பற்ற AI பயிற்சியாளர் உரையாடல்கள்",
               feature_physics: "பௌலிங் இயற்பியல் ஆய்வகம்",
               feature_brain: "நியூரல் பயிற்சி பரிந்துரைகள்",
               feature_no_ads: "எந்த விளம்பரமும் இல்லை",
               feature_priority: "முன்னுரிமை ஆதரவு",
               checkout: "பிரீமியம் பெறு", already_premium: "நீங்கள் பிரீமியம் — நன்றி." },
    settings: { title: "அமைப்புகள்", subtitle: "SmartCrick ஐ உங்கள் விருப்பப்படி",
                language: "மொழி", language_sub: "Language · भाषा · زبان",
                theme: "தீம்", theme_dark: "இருண்ட", theme_light: "ஒளி",
                profile: "சுயவிவரம்", name: "பெயர்", level: "விளையாட்டு நிலை",
                role: "முதன்மை பங்கு",
                role_batter: "பேட்டர்", role_bowler: "பௌலர்",
                role_allrounder: "ஆல் ரவுண்டர்", role_keeper: "விக்கெட் கீப்பர்", role_fielder: "களக்காரர்",
                notifications: "அறிவிப்புகள்", daily_reminder: "தினசரி நினைவூட்டல்",
                data: "உங்கள் தரவு", export: "முன்னேற்றத்தை ஏற்றுமதி",
                reset: "எல்லா தரவையும் மீட்டமை",
                reset_confirm: "எல்லாவற்றையும் மீட்டமைக்கவா? இது திரும்பப் பெற முடியாது.",
                account: "கணக்கு", signout: "வெளியேறு",
                about: "பற்றி", version: "பதிப்பு {{v}}" },
    onboarding: { welcome: "SmartCrick க்கு வரவேற்கிறோம்",
                  welcome_sub: "ஒரு நிமிடத்திற்கும் குறைவான நேரத்தில் உங்கள் பயிற்சியை அமைக்கவும்",
                  step_name: "உங்களை எப்படி அழைக்க வேண்டும்?", step_name_ph: "உங்கள் பெயர்",
                  step_role: "உங்கள் முதன்மை கிரிக்கெட் பங்கு என்ன?",
                  step_level: "உங்கள் நிலை என்ன?",
                  step_language: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
                  get_started: "தொடங்குவோம்" },
    schedule: { title: "அட்டவணை",
                subtitle: "உங்கள் வாரம், போட்டி தயாரிப்பு, ஓய்வை திட்டமிடுங்கள்",
                add: "செயல்பாடு சேர்", type_training: "பயிற்சி", type_match: "போட்டி",
                type_mental: "மன அமர்வு", type_rest: "ஓய்வு நாள்",
                upcoming: "வரவிருக்கும்", past: "கடந்த" },
    xp_flash: "+{{xp}} XP", level_up: "நிலை உயர்ந்தது! நிலை {{level}}",
  },

  si: {
    nav: { home: "මුල් පිටුව", drills: "අභ්‍යාස", mental: "මානසික",
           workouts: "ව්‍යායාම", coach: "AI පුහුණුකරු",
           physics: "භෞතික විද්‍යා රසායනාගාරය", progress: "ප්‍රගතිය",
           premium: "ප්‍රිමියම්", settings: "සැකසුම්", schedule: "කාල සටහන",
           menu: "මෙනු", tools: "ක්‍රිකට් මෙවලම්" },
    common: { start: "අරඹන්න", stop: "නවත්වන්න", pause: "විරාමය", resume: "දිගටම",
              complete: "සම්පූර්ණයි", next: "ඊළඟ", back: "ආපසු", cancel: "අවලංගු",
              save: "සුරකින්න", close: "වසන්න", loading: "පූරණය වෙමින්…",
              retry: "නැවත උත්සාහ", done: "සිදු විය", continue: "දිගටම",
              min: "මිනි", mins: "මිනි", sec: "තත්", xp: "XP", level: "මට්ටම",
              day: "දින", days: "දින", today: "අද", yesterday: "ඊයේ", all: "සියල්ල",
              beginner: "ආරම්භක", intermediate: "මධ්‍යම", advanced: "උසස්",
              pro: "ප්‍රෝ", premium: "ප්‍රිමියම්", free: "නොමිලේ", yes: "ඔව්", no: "නැහැ",
              or: "හෝ", and: "සහ", search: "සොයන්න", filter: "පෙරහන",
              sort: "වර්ග කරන්න", edit: "සංස්කරණය", delete: "මකන්න", confirm: "තහවුරු",
              error_generic: "යමක් වැරදී ඇත. නැවත උත්සාහ කරන්න.",
              offline: "නොබැඳි", online: "සබැඳි", unlock_premium: "ප්‍රිමියම් අගුළු හරින්න" },
    home: { greeting_morning: "සුභ උදෑසනක්", greeting_afternoon: "සුභ දවල්ක්",
            greeting_evening: "සුභ සැන්දෑවක්", greeting_night: "තවමත් වැඩ",
            subtitle: "අද වැදගත් කරමු",
            focus_title: "අද වැඩි අවධානය", focus_view_drills: "නිර්දේශිත අභ්‍යාස →",
            focus_confidence: "විශ්වාසය",
            focus_reason_days: "ඔබ දින {{days}} ක සිට {{category}} කර නැත",
            focus_reason_weak: "{{category}} ඔබගේ දුර්වලම ක්ෂේත්‍රය — එය ගොඩනඟමු",
            focus_reason_streak: "{{category}} හි ඔබ නිපුණය — දිගටම කරගෙන යන්න",
            smart_start_title: "ස්මාර්ට් ආරම්භය", smart_start_sub: "අද සඳහා මිනිත්තු 10 ක සැසියක්",
            streak_title: "අඛණ්ඩතාව", streak_days: "දින {{count}} ක අඛණ්ඩතාව",
            streak_none: "අද සිට ආරම්භ කරන්න",
            streak_broken: "අඛණ්ඩතාව කැඩී ඇත — අද නැවත ආරම්භ කරන්න",
            overview_title: "මෙම සතියේ සාරාංශය",
            joke_title: "අද දිනයේ ක්‍රිකට් විහිළුව", fact_title: "අද දිනයේ ක්‍රිකට් කරුණ",
            quickstart: "ඉක්මන් ආරම්භය", weak_area_title: "මානසික පුහුණු හිඩැස",
            weak_area_mental: "ඔබ ශාරීරිකව පුහුණු වී ඇත නමුත් මානසික සැසි {{count}} ක් පමණි. අද එකක් උත්සාහ කරන්න.",
            overtraining_title: "විවේක දිනය නිර්දේශ කෙරේ",
            overtraining_msg: "ඔබ දින {{count}} ක් අඛණ්ඩව {{category}} කර ඇත. ඔබේ ශරීරයට විවේකයක් අවශ්‍යයි.",
            match_week_title: "දින {{days}} කින් තරඟය",
            match_week_msg: "සැහැල්ලු තාක්ෂණික වැඩ + මානසික සූදානමේ කාලය." },
    drills: { title: "අභ්‍යාස", subtitle: "කාණ්ඩයක් තෝරන්න, අභ්‍යාසයක් තෝරන්න",
              cat_batting: "පිතිහරඹය", cat_bowling: "පන්දු යැවීම",
              cat_fielding: "ක්ෂේත්‍ර රැකවරණය", cat_keeping: "වීකට් කීපින්",
              cat_fitness: "යෝග්‍යතාව",
              filter_all: "සියල්ල", filter_level: "මට්ටම",
              start_drill: "අභ්‍යාසය අරඹන්න", complete_drill: "සම්පූර්ණ කරන්න",
              equipment: "උපකරණ", cues: "ප්‍රධාන ඉඟි", duration: "කාලය",
              ask_coach: "මෙය ගැන පුහුණුකරුගෙන් අසන්න",
              empty: "පෙරහනට ගැලපෙන අභ්‍යාස නැත",
              physics_lab_card_title: "පන්දු යැවීමේ විද්‍යා රසායනාගාරය",
              physics_lab_card_desc: "ස්විංග්, ස්පින් සහ සීම් අනුකරණය.",
              physics_lab_card_cta: "රසායනාගාරය විවෘත කරන්න →" },
    mental: { title: "මානසික පුහුණුව", subtitle: "කිසිවෙකු නොදකින කොටස පුහුණු කරන්න",
              cat_focus: "අවධානය", cat_confidence: "විශ්වාසය", cat_pressure: "පීඩනය",
              cat_recovery: "යථා තත්ත්වයට පත්වීම", cat_mindset: "මානසිකත්වය",
              start_session: "සැසිය අරඹන්න", complete_session: "සැසිය සම්පූර්ණයි",
              premium_locked: "ප්‍රිමියම් සැසිය", debrief: "පුහුණුකරුගේ සමාලෝචනයක්" },
    workouts: { title: "ව්‍යායාම", subtitle: "ක්‍රිකට් කාර්ය සාධනය සඳහා ශාරීරික සූදානම",
                target_full_body: "සම්පූර්ණ ශරීරය", target_arms: "දෑත්", target_back: "පිට",
                target_chest: "පපුව", target_shoulders: "උරහිස්", target_legs: "පාද",
                target_core: "මධ්‍යස්ථානය", target_cardio: "කාඩියෝ",
                target_recovery: "යථා තත්ත්වයට පත්වීම",
                exercises: "අභ්‍යාස", start: "ව්‍යායාමය අරඹන්න" },
    physics: { title: "පන්දු යැවීමේ විද්‍යා රසායනාගාරය",
               subtitle: "සෑම බෝලයකම භෞතික විද්‍යාව බලන්න",
               preset_outswing: "අවුට්ස්විංග්", preset_inswing: "ඉන්ස්විංග්",
               preset_reverse: "රිවර්ස්", preset_offspin: "ඔෆ්-ස්පින්", preset_legspin: "ලෙග්-ස්පින්",
               label_speed: "වේගය", label_seam: "සීම් කෝණය", label_spin: "ස්පින් අනුපාතය",
               label_humidity: "තෙතමනය", label_hardness: "පිටියේ දෘඪතාව",
               label_kmh: "කි.මී/පැය", label_rpm: "RPM", label_deg: "°", label_pct: "%",
               readout_deviation: "පාර්ශ්වීය අපගමනය", readout_peak: "උපරිම ස්විංග් දුර",
               readout_flight: "පියාසර කාලය", readout_zone: "අවසාන කලාපය",
               bowl: "පන්දු යවන්න", reset: "යළි සකසන්න", compare: "සංසන්දනය…",
               save_preset: "පෙරසැකසුම සුරකින්න", saved_presets: "සුරකින ලද පෙරසැකසුම්",
               no_saved: "තවම බෝල සුරකින ලැබ නැත",
               zone_off: "ඔෆ් ස්ටම්ප්", zone_middle: "මැද", zone_leg: "ලෙග් ස්ටම්ප්",
               zone_wide_off: "වයිඩ් ඔෆ්", zone_wide_leg: "වයිඩ් ලෙග්" },
    progress: { title: "ප්‍රගතිය", subtitle: "සංඛ්‍යා බොරු කියන්නේ නැත",
                total_xp: "මුළු XP", current_level: "මට්ටම", streak: "අඛණ්ඩතාව",
                drills_done: "සම්පූර්ණ අභ්‍යාස", mental_done: "මානසික සැසි",
                workouts_done: "ව්‍යායාම", this_week: "මේ සතියේ", all_time: "සියලු කාලයේ",
                breakdown: "XP බිඳවැටීම", next_level: "මට්ටම {{level}} සඳහා {{xp}} XP" },
    premium: { title: "SmartCrick ප්‍රිමියම්", subtitle: "සෑම සැසියක්ම විවෘත කරන්න",
               monthly: "මාසික", yearly: "වාර්ෂික", lifetime: "ජීවිත කාලය",
               per_month: "/මාසය", per_year: "/වසර", once: "එක් වරක්",
               feature_all_drills: "සියලු අභ්‍යාස 150+",
               feature_all_mental: "එලිට් ශ්‍රේණිය ඇතුළු සියලු මානසික සැසි 240",
               feature_unlimited_coach: "සීමා රහිත AI පුහුණුකරු සංවාද",
               feature_physics: "පන්දු යැවීමේ භෞතික විද්‍යා රසායනාගාරය",
               feature_brain: "ස්නායු පුහුණු නිර්දේශ",
               feature_no_ads: "කිසිදු ප්‍රචාරණයක් නොමැත",
               feature_priority: "ප්‍රමුඛතා සහාය",
               checkout: "ප්‍රිමියම් ලබා ගන්න", already_premium: "ඔබ ප්‍රිමියම් — ස්තූතියි." },
    settings: { title: "සැකසුම්", subtitle: "SmartCrick ඔබේ ආකාරයට අභිරුචිකරණය කරන්න",
                language: "භාෂාව", language_sub: "Language · भाषा · زبان",
                theme: "තේමාව", theme_dark: "අඳුරු", theme_light: "ආලෝකය",
                profile: "පැතිකඩ", name: "නම", level: "ක්‍රීඩා මට්ටම",
                role: "ප්‍රාථමික කාර්යභාරය",
                role_batter: "පිතිකරු", role_bowler: "පන්දු යවන්නා",
                role_allrounder: "සර්ව කුසලතා", role_keeper: "වීකට් කීපර්", role_fielder: "ක්ෂේත්‍ර රකින්නා",
                notifications: "දැනුම්දීම්", daily_reminder: "දෛනික මතක් කිරීම",
                data: "ඔබේ දත්ත", export: "ප්‍රගතිය අපනයනය",
                reset: "සියලු දත්ත යළි සකසන්න",
                reset_confirm: "සියල්ල යළි සකසනවාද? මෙය අවලංගු කළ නොහැක.",
                account: "ගිණුම", signout: "ඉවත් වන්න",
                about: "පිළිබඳව", version: "අනුවාදය {{v}}" },
    onboarding: { welcome: "SmartCrick වෙත සාදරයෙන් පිළිගනිමු",
                  welcome_sub: "මිනිත්තුවකටත් අඩු කාලයකින් ඔබේ පුහුණුව සකස් කරමු",
                  step_name: "අපි ඔබට කුමන නමකින් ඇමතිය යුතුද?", step_name_ph: "ඔබේ නම",
                  step_role: "ඔබේ ප්‍රාථමික ක්‍රිකට් කාර්යභාරය කුමක්ද?",
                  step_level: "ඔබේ මට්ටම කුමක්ද?",
                  step_language: "ඔබේ භාෂාව තෝරන්න", get_started: "අරඹමු" },
    schedule: { title: "කාල සටහන",
                subtitle: "ඔබේ සතිය, තරඟ සූදානම, විවේකය සැලසුම් කරන්න",
                add: "ක්‍රියාකාරකම් එක් කරන්න", type_training: "පුහුණුව",
                type_match: "තරඟය", type_mental: "මානසික සැසිය", type_rest: "විවේක දිනය",
                upcoming: "ඉදිරියේදී", past: "අතීත" },
    xp_flash: "+{{xp}} XP", level_up: "මට්ටම වැඩි වී! මට්ටම {{level}}",
  },
};

console.log(`[SmartCrick] Translations loaded: ${Object.keys(TRANSLATIONS).length} languages`);
/* ============================================================================
 * CORE MODULES — storage, i18n, brain.js, matter.js, coach
 * ========================================================================= */

/* ────────────────────────── Storage layer ────────────────────────── */
const STORAGE_KEYS = {
  profile:          "sc_profile",
  progress:         "sc_progress_v2",
  completed_drills: "sc_completed_drills",
  completed_mental: "sc_completed_mental",
  completed_workouts: "sc_completed_workouts",
  scheduled:        "sc_scheduled",
  brain_model:      "sc_brain_model",
  brain_training:   "sc_brain_training",
  brain_trained_at: "sc_brain_trained_at",
  physics_presets:  "sc_physics_presets",
  i18n_lang:        "sc_i18n_lang",
  theme:            "sc_theme",
  onboarded:        "sc_onboarded",
  is_premium:       "sc_is_premium",
  settings:         "sc_settings",
};

const DEFAULT_PROFILE = {
  name: "",
  role: "allrounder",
  level: "intermediate",
  created_at: 0,
};
const DEFAULT_PROGRESS = {
  total_xp: 0,
  streak: 0,
  last_active_day: 0,
  xp_by_category: { batting: 0, bowling: 0, fielding: 0, keeping: 0, fitness: 0, mental: 0 },
};

SC.storage = {
  get(key, fallback = null) { return safeParse(localStorage.getItem(key), fallback); },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); emit("sc_storage_change", { key }); },
  remove(key) { localStorage.removeItem(key); emit("sc_storage_change", { key }); },
  getProfile() { return { ...DEFAULT_PROFILE, ...(this.get(STORAGE_KEYS.profile) || {}) }; },
  setProfile(p) { this.set(STORAGE_KEYS.profile, p); },
  getProgress() { return { ...DEFAULT_PROGRESS, ...(this.get(STORAGE_KEYS.progress) || {}), xp_by_category: { ...DEFAULT_PROGRESS.xp_by_category, ...((this.get(STORAGE_KEYS.progress) || {}).xp_by_category || {}) } }; },
  setProgress(p) { this.set(STORAGE_KEYS.progress, p); },
  isPremium() { return this.get(STORAGE_KEYS.is_premium, false) === true; },
  setPremium(v) { this.set(STORAGE_KEYS.is_premium, v); },
  isOnboarded() { return this.get(STORAGE_KEYS.onboarded, false) === true; },
  setOnboarded(v) { this.set(STORAGE_KEYS.onboarded, v); },
  getCompletedDrills()  { return this.get(STORAGE_KEYS.completed_drills, []); },
  getCompletedMental()  { return this.get(STORAGE_KEYS.completed_mental, []); },
  getCompletedWorkouts(){ return this.get(STORAGE_KEYS.completed_workouts, []); },
  getScheduled()        { return this.get(STORAGE_KEYS.scheduled, []); },
  pushScheduled(item)   { const list = this.getScheduled(); list.push(item); this.set(STORAGE_KEYS.scheduled, list); },
  removeScheduled(id)   { this.set(STORAGE_KEYS.scheduled, this.getScheduled().filter(s => s.id !== id)); },
  resetAll() {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    emit("sc_storage_change", { key: "ALL" });
  },
  exportAll() {
    const data = {};
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => { data[name] = this.get(key); });
    return data;
  },
};

/* ────────────────────────── XP / Progress engine ────────────────────────── */
function xpForLevel(level) { return Math.floor(100 * Math.pow(1.35, level - 1)); }
function levelFromXp(xp) {
  let lvl = 1, remaining = xp;
  while (remaining >= xpForLevel(lvl)) { remaining -= xpForLevel(lvl); lvl++; if (lvl > 99) break; }
  return { level: lvl, xpInLevel: remaining, xpNeeded: xpForLevel(lvl) };
}

function awardXp(category, xp, meta = {}) {
  const progress = SC.storage.getProgress();
  const prevLevel = levelFromXp(progress.total_xp).level;
  progress.total_xp += xp;
  progress.xp_by_category[category] = (progress.xp_by_category[category] || 0) + xp;

  const today = startOfDay(now());
  if (progress.last_active_day === 0) {
    progress.streak = 1;
  } else {
    const dayDiff = daysBetween(progress.last_active_day, today);
    if (dayDiff === 0) { /* same day, no streak change */ }
    else if (dayDiff === 1) progress.streak += 1;
    else progress.streak = 1;
  }
  progress.last_active_day = today;
  SC.storage.setProgress(progress);

  const newLevel = levelFromXp(progress.total_xp).level;
  if (newLevel > prevLevel) emit("sc_level_up", { level: newLevel });
  emit("sc_xp_flash", { xp });
  emit("sc_progress_updated", progress);

  // Log for brain.js training (batting, bowling, fielding, mental only)
  if (["batting", "bowling", "fielding", "mental"].includes(category)) {
    SC.brain?.logEvent(category);
  }
  return progress;
}

function completeDrill(drillId) {
  const drill = DRILLS.find(d => d.id === drillId);
  if (!drill) return;
  const list = SC.storage.getCompletedDrills();
  list.push({ drill_id: drillId, category: drill.category, timestamp: now(), xp: drill.xp });
  SC.storage.set(STORAGE_KEYS.completed_drills, list.slice(-500));
  awardXp(drill.category, drill.xp);
}
function completeMental(sessionId) {
  const session = MENTAL_SESSIONS.find(m => m.id === sessionId);
  if (!session) return;
  const list = SC.storage.getCompletedMental();
  list.push({ session_id: sessionId, category: session.category, timestamp: now(), xp: session.xp });
  SC.storage.set(STORAGE_KEYS.completed_mental, list.slice(-500));
  awardXp("mental", session.xp);
}
function completeWorkout(workoutId) {
  const workout = WORKOUTS.find(w => w.id === workoutId);
  if (!workout) return;
  const list = SC.storage.getCompletedWorkouts();
  list.push({ workout_id: workoutId, timestamp: now(), xp: workout.xp });
  SC.storage.set(STORAGE_KEYS.completed_workouts, list.slice(-500));
  awardXp("fitness", workout.xp);
}

/* ────────────────────────── i18next initialization ────────────────────────── */
function interpolate(template, vars) {
  if (!template) return "";
  return String(template).replace(/\{\{(\w+)\}\}/g, (_, k) => vars?.[k] ?? "");
}

function resolveTranslationKey(lang, key) {
  const parts = key.split(".");
  let node = TRANSLATIONS[lang];
  for (const p of parts) {
    if (node == null) return null;
    node = node[p];
  }
  return node;
}

// Lightweight, self-contained translator (we use i18next if loaded, fallback otherwise)
function initI18n() {
  const saved = SC.storage.get(STORAGE_KEYS.i18n_lang);
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  const lang = SUPPORTED_LANGS.includes(saved) ? saved : (SUPPORTED_LANGS.includes(browser) ? browser : "en");

  // Initialize i18next if available (used for pluralization and richer features in future)
  if (window.i18next && !window.i18next.isInitialized) {
    const resources = {};
    SUPPORTED_LANGS.forEach(l => { resources[l] = { translation: TRANSLATIONS[l] || {} }; });
    try {
      window.i18next.init({ lng: lang, fallbackLng: "en", resources, interpolation: { escapeValue: false } });
    } catch (err) { console.warn("[i18next] init failed, falling back to custom translator", err); }
  }

  applyLangToDocument(lang);

  SC.i18n = {
    t(key, opts) {
      let val = resolveTranslationKey(SC.i18n.current, key);
      if (val == null) val = resolveTranslationKey("en", key);
      if (val == null) return key;
      return interpolate(val, opts);
    },
    setLang(newLang) {
      if (!SUPPORTED_LANGS.includes(newLang)) return;
      SC.i18n.current = newLang;
      SC.storage.set(STORAGE_KEYS.i18n_lang, newLang);
      if (window.i18next?.changeLanguage) { try { window.i18next.changeLanguage(newLang); } catch {} }
      applyLangToDocument(newLang);
      emit("sc_lang_changed", { lang: newLang });
    },
    getLang() { return SC.i18n.current; },
    isRtl() { return LANG_META[SC.i18n.current]?.rtl === true; },
    current: lang,
    supported: SUPPORTED_LANGS,
    meta: LANG_META,
  };
}

function applyLangToDocument(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = LANG_META[lang]?.rtl ? "rtl" : "ltr";
}

/* ============================================================================
 * BRAIN.JS — Neural Training Recommendation Engine
 * ========================================================================= */
SC.brain = (() => {
  let net = null;
  const TRAIN_CATEGORIES = ["batting", "bowling", "fielding", "mental"];

  function logEvent(category) {
    const hist = SC.storage.get(STORAGE_KEYS.brain_training, []);
    hist.push({
      category,
      timestamp: now(),
      day_of_week: new Date().getDay(),
      hour: new Date().getHours(),
    });
    SC.storage.set(STORAGE_KEYS.brain_training, hist.slice(-60));
    if (shouldRetrain()) scheduleRetrain();
  }

  function daysSinceLast(completedList, predicate, atDate = new Date()) {
    const last = completedList.filter(predicate).sort((a, b) => b.timestamp - a.timestamp)[0];
    if (!last) return 30;
    return clamp(daysBetween(last.timestamp, atDate.getTime()), 0, 30);
  }

  function buildFeatureVector(atDate = new Date()) {
    const progress = SC.storage.getProgress();
    const drills = SC.storage.getCompletedDrills();
    const mental = SC.storage.getCompletedMental();

    const daysSinceBatting  = daysSinceLast(drills, d => d.category === "batting",  atDate);
    const daysSinceBowling  = daysSinceLast(drills, d => d.category === "bowling",  atDate);
    const daysSinceFielding = daysSinceLast(drills, d => d.category === "fielding", atDate);
    const daysSinceMental   = mental.length ? clamp(daysBetween(mental[mental.length - 1].timestamp, atDate.getTime()), 0, 30) : 30;

    const totalXp = Math.max(1, progress.total_xp);
    const xpBat = (progress.xp_by_category.batting  || 0) / totalXp;
    const xpBwl = (progress.xp_by_category.bowling  || 0) / totalXp;
    const xpFld = (progress.xp_by_category.fielding || 0) / totalXp;
    const xpMnt = (progress.xp_by_category.mental   || 0) / totalXp;

    return {
      day_of_week: atDate.getDay() / 6,
      days_since_batting:  daysSinceBatting  / 30,
      days_since_bowling:  daysSinceBowling  / 30,
      days_since_fielding: daysSinceFielding / 30,
      days_since_mental:   daysSinceMental   / 30,
      xp_ratio_batting:  xpBat,
      xp_ratio_bowling:  xpBwl,
      xp_ratio_fielding: xpFld,
      xp_ratio_mental:   xpMnt,
      streak: clamp(progress.streak, 0, 30) / 30,
    };
  }

  function buildTrainingSet() {
    const history = SC.storage.get(STORAGE_KEYS.brain_training, []);
    return history
      .filter(ev => TRAIN_CATEGORIES.includes(ev.category))
      .map(ev => ({
        input: buildFeatureVector(new Date(ev.timestamp)),
        output: {
          batting:  ev.category === "batting"  ? 1 : 0,
          bowling:  ev.category === "bowling"  ? 1 : 0,
          fielding: ev.category === "fielding" ? 1 : 0,
          mental:   ev.category === "mental"   ? 1 : 0,
        },
      }));
  }

  async function waitForBrainJs(timeoutMs = 4000) {
    const start = Date.now();
    while (!window.brain) {
      if (Date.now() - start > timeoutMs) return false;
      await new Promise(r => setTimeout(r, 100));
    }
    return true;
  }

  async function train() {
    const history = SC.storage.get(STORAGE_KEYS.brain_training, []);
    if (history.length < 10) return null;
    const ok = await waitForBrainJs();
    if (!ok) { console.warn("[brain.js] library failed to load"); return null; }
    try {
      net = new window.brain.NeuralNetwork({ hiddenLayers: [8, 6], activation: "sigmoid" });
      const data = buildTrainingSet();
      net.train(data, { iterations: 2000, errorThresh: 0.005, log: false });
      SC.storage.set(STORAGE_KEYS.brain_model, net.toJSON());
      SC.storage.set(STORAGE_KEYS.brain_trained_at, now());
      emit("sc_brain_trained", { history_len: history.length });
      return net;
    } catch (err) { console.warn("[brain.js] train failed", err); return null; }
  }

  async function loadModel() {
    if (net) return net;
    const saved = SC.storage.get(STORAGE_KEYS.brain_model);
    if (!saved) return null;
    const ok = await waitForBrainJs();
    if (!ok) return null;
    try {
      net = new window.brain.NeuralNetwork({ hiddenLayers: [8, 6], activation: "sigmoid" });
      net.fromJSON(saved);
      return net;
    } catch (err) { console.warn("[brain.js] load failed", err); return null; }
  }

  function heuristicPredict() {
    const f = buildFeatureVector();
    const days = {
      batting: f.days_since_batting, bowling: f.days_since_bowling,
      fielding: f.days_since_fielding, mental: f.days_since_mental,
    };
    const ratios = {
      batting: f.xp_ratio_batting, bowling: f.xp_ratio_bowling,
      fielding: f.xp_ratio_fielding, mental: f.xp_ratio_mental,
    };
    const scores = {};
    Object.keys(days).forEach(k => { scores[k] = 2 * days[k] + (1 - ratios[k]); });
    const sum = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    const normalized = {};
    Object.entries(scores).forEach(([k, v]) => { normalized[k] = v / sum; });
    return normalized;
  }

  async function predict() {
    try {
      const model = await loadModel();
      if (!model) return { ...heuristicPredict(), _source: "heuristic" };
      const output = model.run(buildFeatureVector());
      const sum = Object.values(output).reduce((a, b) => a + b, 0) || 1;
      const normalized = {};
      Object.entries(output).forEach(([k, v]) => { normalized[k] = v / sum; });
      return { ...normalized, _source: "neural" };
    } catch (err) {
      console.warn("[brain.js] predict failed, falling back", err);
      return { ...heuristicPredict(), _source: "heuristic" };
    }
  }

  function shouldRetrain() {
    const history = SC.storage.get(STORAGE_KEYS.brain_training, []);
    if (history.length < 10) return false;
    const trainedAt = SC.storage.get(STORAGE_KEYS.brain_trained_at, 0);
    return (now() - trainedAt) > 72 * 60 * 60 * 1000;
  }

  function scheduleRetrain() {
    const runner = () => train().catch(() => {});
    if (typeof requestIdleCallback === "function") requestIdleCallback(runner, { timeout: 3000 });
    else setTimeout(runner, 1500);
  }

  function detectOvertrainingStreak() {
    // Returns {category, streak_days} if user has done same category 10+ days in a row
    const drills = SC.storage.getCompletedDrills().slice().sort((a, b) => b.timestamp - a.timestamp);
    if (drills.length < 10) return null;
    const byDay = {};
    drills.forEach(d => {
      const day = startOfDay(d.timestamp);
      if (!byDay[day]) byDay[day] = new Set();
      byDay[day].add(d.category);
    });
    const days = Object.keys(byDay).map(Number).sort((a, b) => b - a);
    if (days.length < 10) return null;
    let category = null, streak = 0;
    for (let i = 0; i < days.length; i++) {
      const cats = byDay[days[i]];
      if (cats.size !== 1) break;
      const cat = [...cats][0];
      if (category === null) { category = cat; streak = 1; }
      else if (cat === category) streak++;
      else break;
      if (i > 0 && daysBetween(days[i], days[i - 1]) !== 1) break;
    }
    return streak >= 10 ? { category, streak_days: streak } : null;
  }

  function detectUpcomingMatch() {
    const list = SC.storage.getScheduled();
    const today = startOfDay(now());
    const matches = list
      .filter(s => s.type === "match")
      .map(s => ({ ...s, days_until: daysBetween(today, new Date(s.date).getTime()) }))
      .filter(m => m.days_until >= 0 && m.days_until <= 3)
      .sort((a, b) => a.days_until - b.days_until);
    return matches[0] || null;
  }

  function getRecommendation() {
    return predict().then(pred => {
      const entries = Object.entries(pred).filter(([k]) => !k.startsWith("_"));
      entries.sort((a, b) => b[1] - a[1]);
      const [topCat, topConf] = entries[0];
      return { category: topCat, confidence: topConf, source: pred._source, all: pred };
    });
  }

  return {
    logEvent, train, predict, loadModel,
    shouldRetrain, scheduleRetrain,
    detectOvertrainingStreak, detectUpcomingMatch,
    getRecommendation, buildFeatureVector, heuristicPredict,
  };
})();

/* ============================================================================
 * MATTER.JS — Bowling Physics Simulator
 * ========================================================================= */
SC.physics = (() => {
  // Cricket ball: 0.163 kg, 36mm radius, air density 1.225 kg/m³
  const PHYS = { ball_mass: 0.163, ball_radius_m: 0.036, rho_air: 1.225, C_drag: 0.47 };

  const PRESETS = {
    outswing: { speed: 135, seam_angle: 22, spin_rate: 1500, humidity: 65, pitch_hardness: 55, reverse: false, spinner: false },
    inswing:  { speed: 135, seam_angle: -22, spin_rate: 1500, humidity: 65, pitch_hardness: 55, reverse: false, spinner: false },
    reverse:  { speed: 145, seam_angle: 5,  spin_rate: 1800, humidity: 30, pitch_hardness: 65, reverse: true,  spinner: false },
    offspin:  { speed: 85,  seam_angle: 15, spin_rate: 2800, humidity: 50, pitch_hardness: 60, reverse: false, spinner: true, spin_direction: 1 },
    legspin:  { speed: 85,  seam_angle: -15, spin_rate: 2800, humidity: 50, pitch_hardness: 60, reverse: false, spinner: true, spin_direction: -1 },
  };

  function humidityFactor(humidity) {
    // Swing peaks around 65-75% humidity
    const peak = 70;
    const dist = Math.abs(humidity - peak);
    return clamp(1.2 - (dist / 100), 0.3, 1.2);
  }

  function computeDeviation(params) {
    // Analytic estimate (for readout) — in cm
    const h = humidityFactor(params.humidity);
    if (params.spinner) {
      // Spin deviation based on rpm + pitch hardness
      const base = (params.spin_rate / 3000) * 14;
      return base * (params.pitch_hardness / 60);
    }
    const seamFactor = Math.abs(params.seam_angle) / 45;
    const speedFactor = params.speed / 140;
    let base = 22 * seamFactor * speedFactor * h;
    if (params.reverse) base = base * 0.9; // reverse slightly less in magnitude but opposite
    return base;
  }

  function zoneFromOffset(offsetPx, widthPx) {
    const pct = offsetPx / widthPx;
    if (pct < 0.15) return "zone_wide_leg";
    if (pct < 0.35) return "zone_leg";
    if (pct < 0.55) return "zone_middle";
    if (pct < 0.75) return "zone_off";
    return "zone_wide_off";
  }

  // Simulate one ball — returns metadata + animates canvas
  function simulate({ canvas, params, onEnd, trailColor = "#10b981" }) {
    if (!window.Matter) return { stop: () => {}, reset: () => {} };
    const M = window.Matter;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    // Clear any previous frame
    ctx.clearRect(0, 0, W, H);

    const engine = M.Engine.create({ gravity: { x: 0, y: 0 } });
    const world = engine.world;

    // Spawn ball on left side (bowler's end)
    const startX = 30, startY = H / 2;
    const ballRadiusPx = 7;
    const ball = M.Bodies.circle(startX, startY, ballRadiusPx, {
      restitution: 0.3, frictionAir: 0.002, density: 0.0012, label: "ball",
    });
    M.World.add(world, ball);

    // Set initial velocity — tuned for visual clarity (slow-mo ~3x)
    const scale = W / 20.12; // px per meter
    const v_mps = params.speed / 3.6;
    const vxInit = v_mps * scale / 60 / 3; // /3 for visual slow-mo
    M.Body.setVelocity(ball, { x: vxInit, y: 0 });

    // Force scale — tuned empirically so the visual deviation matches real cricket
    const FORCE_SCALE = 0.0000009;

    const hFactor = humidityFactor(params.humidity);
    const releaseTime = Date.now();

    const trail = [];

    function beforeUpdate() {
      const vx = ball.velocity.x, vy = ball.velocity.y;
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed < 0.1) return;

      // Drag
      const Fd = 0.5 * PHYS.rho_air * speed * speed * PHYS.C_drag * 0.004;
      M.Body.applyForce(ball, ball.position, {
        x: -(vx / speed) * Fd * FORCE_SCALE,
        y: -(vy / speed) * Fd * FORCE_SCALE,
      });

      // Swing / Spin (lateral force perpendicular to velocity)
      const perpX = -vy / speed, perpY = vx / speed;
      let CL = 0;
      if (params.spinner) {
        CL = (params.spin_rate / 3000) * 0.18 * (params.spin_direction || 1) * (params.pitch_hardness / 60);
      } else {
        const seamFactor = params.seam_angle / 45;
        CL = 0.16 * seamFactor * hFactor;
        if (params.reverse) CL = -CL * 0.95;
      }
      // Swing grows over the flight (peaks mid-pitch)
      const distFrac = clamp((ball.position.x - startX) / (W - startX), 0, 1);
      const swingMul = Math.sin(distFrac * Math.PI) * 1.4;
      const Fs = 0.5 * PHYS.rho_air * speed * speed * 0.004 * CL * swingMul;
      M.Body.applyForce(ball, ball.position, {
        x: perpX * Fs * FORCE_SCALE,
        y: perpY * Fs * FORCE_SCALE,
      });
    }
    M.Events.on(engine, "beforeUpdate", beforeUpdate);

    // Runner
    let rafId = null;
    let stopped = false;
    const stepMs = 1000 / 60;
    function step() {
      if (stopped) return;
      M.Engine.update(engine, stepMs);
      trail.push({ x: ball.position.x, y: ball.position.y });
      if (trail.length > 220) trail.shift();
      drawFrame();
      if (ball.position.x >= W - 20 || ball.position.x < -20 || ball.position.y < -20 || ball.position.y > H + 20) {
        stopped = true;
        cleanup();
        const dev_cm = Math.abs(ball.position.y - startY) / scale * 100;
        const flight_s = (Date.now() - releaseTime) / 1000;
        const zone = zoneFromOffset(ball.position.y, H);
        onEnd?.({ lateral_deviation_cm: dev_cm, flight_time_s: flight_s, final_zone: zone, trail });
        return;
      }
      rafId = requestAnimationFrame(step);
    }

    function drawFrame() {
      // Pitch background
      ctx.fillStyle = "#1a3d14";
      ctx.fillRect(0, 0, W, H);
      // Crease lines
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(22, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W - 22, 0); ctx.lineTo(W - 22, H); ctx.stroke();
      // Good-length zone
      ctx.fillStyle = "rgba(16,185,129,0.08)";
      ctx.fillRect(W * 0.68, 0, W * 0.1, H);
      // Trail
      ctx.strokeStyle = trailColor;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      trail.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
      ctx.stroke();
      // Ball
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(ball.position.x, ball.position.y, ballRadiusPx, 0, Math.PI * 2);
      ctx.fill();
      // Bowler marker (left)
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(10, H / 2 - 10, 8, 20);
      // Batsman marker (right)
      ctx.fillStyle = "rgba(251,191,36,0.6)";
      ctx.fillRect(W - 18, H / 2 - 10, 8, 20);
    }

    function cleanup() {
      if (rafId) cancelAnimationFrame(rafId);
      M.Events.off(engine, "beforeUpdate", beforeUpdate);
      M.World.clear(world, false);
      M.Engine.clear(engine);
    }

    drawFrame(); // initial frame
    rafId = requestAnimationFrame(step);

    return {
      stop() { stopped = true; cleanup(); },
      reset() {
        stopped = true; cleanup();
        ctx.clearRect(0, 0, W, H);
      },
    };
  }

  function savePreset(name, params) {
    const presets = SC.storage.get(STORAGE_KEYS.physics_presets, []);
    presets.push({ id: uid(), name, params: { ...params }, saved_at: now() });
    SC.storage.set(STORAGE_KEYS.physics_presets, presets.slice(-30));
  }
  function getPresets() { return SC.storage.get(STORAGE_KEYS.physics_presets, []); }
  function deletePreset(id) {
    SC.storage.set(STORAGE_KEYS.physics_presets, getPresets().filter(p => p.id !== id));
  }

  return { simulate, PRESETS, computeDeviation, savePreset, getPresets, deletePreset, humidityFactor };
})();

/* ============================================================================
 * STRIPE CHECKOUT
 * ========================================================================= */
SC.stripe = {
  async checkout(priceKey) {
    const priceId = STRIPE_PRICES[priceKey];
    if (!priceId) throw new Error("invalid plan");
    try {
      const res = await fetch(`${BACKEND_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price_id: priceId, success_url: location.origin + "/#/Premium?success=1", cancel_url: location.origin + "/#/Premium" }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error("no_url");
    } catch (err) {
      console.error("[stripe] checkout error", err);
      alert("Checkout unavailable right now. Please try again soon.");
    }
  },
};

/* ============================================================================
 * BOOT SEQUENCE
 * ========================================================================= */
function bootCore() {
  initI18n();
  // Try to pre-load brain model in the background
  setTimeout(() => { SC.brain.loadModel().catch(() => {}); }, 600);
  // If we have data and model is stale, retrain
  setTimeout(() => { if (SC.brain.shouldRetrain()) SC.brain.scheduleRetrain(); }, 2000);
  console.log("[SmartCrick] Core initialized");
}

// Boot immediately on script load
try { bootCore(); } catch (err) { console.error("[SmartCrick] boot failed", err); }
/* ============================================================================
 * REACT UI LAYER — helpers, icons, hooks, primitives
 * ========================================================================= */

// Aliases
const h = React.createElement;
const F = React.Fragment;
const { useState, useEffect, useMemo, useCallback, useRef, useLayoutEffect } = React;

/* ────────────────────────── Icon map (inline SVG paths) ──────────────────────────
 * Each entry: array of [element_type, attrs_obj] children inside <svg>.
 * Kept minimal — only the icons we use.
 * ============================================================================ */
const ICON_PATHS = {
  home: [["path", { d: "M3 9.5 12 3l9 6.5V20a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" }]],
  swords: [["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5" }], ["line", { x1: "13", y1: "19", x2: "19", y2: "13" }], ["line", { x1: "16", y1: "16", x2: "20", y2: "20" }], ["line", { x1: "19", y1: "21", x2: "21", y2: "19" }], ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5" }], ["line", { x1: "5", y1: "14", x2: "9", y2: "18" }], ["line", { x1: "7", y1: "17", x2: "4", y2: "20" }], ["line", { x1: "3", y1: "19", x2: "5", y2: "21" }]],
  wind: [["path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" }], ["path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2" }], ["path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2" }]],
  target: [["circle", { cx: "12", cy: "12", r: "10" }], ["circle", { cx: "12", cy: "12", r: "6" }], ["circle", { cx: "12", cy: "12", r: "2" }]],
  shield: [["path", { d: "M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1 1 0 0 1 1.3 0C14.3 3.8 16.8 5 18.8 5a1 1 0 0 1 1 1z" }]],
  dumbbell: [["path", { d: "M14.4 14.4 9.6 9.6" }], ["path", { d: "M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" }], ["path", { d: "m21.5 21.5-1.4-1.4" }], ["path", { d: "M3.9 3.9 2.5 2.5" }], ["path", { d: "M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" }]],
  brain: [["path", { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }], ["path", { d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" }]],
  chevron_right: [["path", { d: "m9 18 6-6-6-6" }]],
  chevron_left: [["path", { d: "m15 18-6-6 6-6" }]],
  chevron_down: [["path", { d: "m6 9 6 6 6-6" }]],
  chevron_up: [["path", { d: "m6 15 6-6 6 6" }]],
  arrow_left: [["path", { d: "m12 19-7-7 7-7" }], ["path", { d: "M19 12H5" }]],
  arrow_right: [["path", { d: "M5 12h14" }], ["path", { d: "m12 5 7 7-7 7" }]],
  play: [["polygon", { points: "6 3 20 12 6 21 6 3" }]],
  pause: [["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1" }], ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1" }]],
  check: [["path", { d: "M20 6 9 17l-5-5" }]],
  check_circle: [["circle", { cx: "12", cy: "12", r: "10" }], ["path", { d: "m9 12 2 2 4-4" }]],
  x: [["path", { d: "M18 6 6 18" }], ["path", { d: "m6 6 12 12" }]],
  flame: [["path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" }]],
  trophy: [["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }], ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }], ["path", { d: "M4 22h16" }], ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }], ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }], ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z" }]],
  sparkles: [["path", { d: "m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" }], ["path", { d: "M5 3v4" }], ["path", { d: "M19 17v4" }], ["path", { d: "M3 5h4" }], ["path", { d: "M17 19h4" }]],
  crown: [["path", { d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" }], ["path", { d: "M5 21h14" }]],
  star: [["polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" }]],
  settings: [["path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }], ["circle", { cx: "12", cy: "12", r: "3" }]],
  calendar: [["path", { d: "M8 2v4" }], ["path", { d: "M16 2v4" }], ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }], ["path", { d: "M3 10h18" }]],
  bar_chart: [["line", { x1: "12", y1: "20", x2: "12", y2: "10" }], ["line", { x1: "18", y1: "20", x2: "18", y2: "4" }], ["line", { x1: "6", y1: "20", x2: "6", y2: "14" }]],
  zap: [["path", { d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" }]],
  globe: [["circle", { cx: "12", cy: "12", r: "10" }], ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }], ["path", { d: "M2 12h20" }]],
  bell: [["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }], ["path", { d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" }]],
  lock: [["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2" }], ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }]],
  plus: [["path", { d: "M5 12h14" }], ["path", { d: "M12 5v14" }]],
  minus: [["path", { d: "M5 12h14" }]],
  menu: [["line", { x1: "4", y1: "6", x2: "20", y2: "6" }], ["line", { x1: "4", y1: "12", x2: "20", y2: "12" }], ["line", { x1: "4", y1: "18", x2: "20", y2: "18" }]],
  search: [["circle", { cx: "11", cy: "11", r: "8" }], ["path", { d: "m21 21-4.3-4.3" }]],
  filter: [["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }]],
  message: [["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }]],
  send: [["path", { d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }], ["path", { d: "m21.854 2.147-10.94 10.939" }]],
  moon: [["path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }]],
  sun: [["circle", { cx: "12", cy: "12", r: "4" }], ["path", { d: "M12 2v2" }], ["path", { d: "M12 20v2" }], ["path", { d: "m4.93 4.93 1.41 1.41" }], ["path", { d: "m17.66 17.66 1.41 1.41" }], ["path", { d: "M2 12h2" }], ["path", { d: "M20 12h2" }], ["path", { d: "m6.34 17.66-1.41 1.41" }], ["path", { d: "m19.07 4.93-1.41 1.41" }]],
  activity: [["path", { d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.5.5 0 0 1-.96 0L9.24 2.18a.5.5 0 0 0-.96 0l-2.35 8.36A2 2 0 0 1 4 12H2" }]],
  trending_up: [["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }], ["polyline", { points: "16 7 22 7 22 13" }]],
  refresh: [["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }], ["path", { d: "M21 3v5h-5" }], ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }], ["path", { d: "M3 21v-5h5" }]],
  download: [["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }], ["polyline", { points: "7 10 12 15 17 10" }], ["line", { x1: "12", y1: "15", x2: "12", y2: "3" }]],
  alert: [["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }], ["line", { x1: "12", y1: "9", x2: "12", y2: "13" }], ["line", { x1: "12", y1: "17", x2: "12.01", y2: "17" }]],
  book: [["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }]],
  users: [["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }], ["circle", { cx: "9", cy: "7", r: "4" }], ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }], ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }]],
  timer: [["line", { x1: "10", y1: "2", x2: "14", y2: "2" }], ["line", { x1: "12", y1: "14", x2: "15", y2: "11" }], ["circle", { cx: "12", cy: "14", r: "8" }]],
  bolt: [["path", { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" }]],
  compass: [["circle", { cx: "12", cy: "12", r: "10" }], ["polygon", { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" }]],
  waves: [["path", { d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }], ["path", { d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }], ["path", { d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }]],
  sliders: [["line", { x1: "4", y1: "21", x2: "4", y2: "14" }], ["line", { x1: "4", y1: "10", x2: "4", y2: "3" }], ["line", { x1: "12", y1: "21", x2: "12", y2: "12" }], ["line", { x1: "12", y1: "8", x2: "12", y2: "3" }], ["line", { x1: "20", y1: "21", x2: "20", y2: "16" }], ["line", { x1: "20", y1: "12", x2: "20", y2: "3" }], ["line", { x1: "1", y1: "14", x2: "7", y2: "14" }], ["line", { x1: "9", y1: "8", x2: "15", y2: "8" }], ["line", { x1: "17", y1: "16", x2: "23", y2: "16" }]],
  logout: [["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }], ["polyline", { points: "16 17 21 12 16 7" }], ["line", { x1: "21", y1: "12", x2: "9", y2: "12" }]],
};

function Icon({ name, size = 20, className = "", strokeWidth = 2, style }) {
  const parts = ICON_PATHS[name];
  if (!parts) return null;
  return h("svg", {
    xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
    className, style,
  }, parts.map((p, i) => h(p[0], { ...p[1], key: i })));
}

/* ────────────────────────── Hooks ────────────────────────── */
function useForceUpdate() { const [, set] = useState(0); return useCallback(() => set(n => n + 1), []); }

function useT() {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const handler = () => forceUpdate();
    on("sc_lang_changed", handler);
    return () => SC.bus.removeEventListener("sc_lang_changed", handler);
  }, [forceUpdate]);
  return useCallback((key, opts) => SC.i18n?.t(key, opts) ?? key, []);
}

function useRoute() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const handler = () => setRoute(parseHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return route;
}

function navigate(path) {
  if (!path.startsWith("#")) path = "#" + path;
  if (window.location.hash !== path) window.location.hash = path;
  else window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function parseHash() {
  const raw = (window.location.hash || "#/Home").slice(1);
  const clean = raw.startsWith("/") ? raw.slice(1) : raw;
  const [page = "Home", ...rest] = clean.split("/");
  const [pageName, queryString] = (page || "Home").split("?");
  const query = {};
  if (queryString) queryString.split("&").forEach(pair => { const [k, v] = pair.split("="); if (k) query[k] = decodeURIComponent(v || ""); });
  return { page: pageName || "Home", params: rest, query };
}

function useStorageValue(getter, deps = []) {
  const [val, setVal] = useState(getter);
  const update = useCallback(() => setVal(getter()), [getter]);
  useEffect(() => {
    on("sc_storage_change", update);
    on("sc_progress_updated", update);
    return () => {
      SC.bus.removeEventListener("sc_storage_change", update);
      SC.bus.removeEventListener("sc_progress_updated", update);
    };
  }, deps);
  return [val, update];
}

function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on_ = () => setOnline(true);
    const off_ = () => setOnline(false);
    window.addEventListener("online", on_);
    window.addEventListener("offline", off_);
    return () => { window.removeEventListener("online", on_); window.removeEventListener("offline", off_); };
  }, []);
  return online;
}

function useLangTick() {
  // Re-render on language change (for components that compute translations)
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const handler = () => forceUpdate();
    on("sc_lang_changed", handler);
    return () => SC.bus.removeEventListener("sc_lang_changed", handler);
  }, [forceUpdate]);
}

/* ────────────────────────── Primitives ────────────────────────── */
function Button({ variant = "primary", size, icon, iconRight, fullWidth, children, onClick, disabled, type = "button", className = "", style }) {
  const cls = cx(
    "btn",
    variant === "primary" && "btn-primary",
    variant === "ghost"   && "btn-ghost",
    variant === "danger"  && "btn-danger",
    size === "sm" && "btn-sm",
    size === "lg" && "btn-lg",
    fullWidth && "btn-full",
    disabled && "btn-disabled",
    className
  );
  return h("button", { type, className: cls, onClick, disabled, style },
    icon && h(Icon, { name: icon, size: size === "lg" ? 20 : 16 }),
    h("span", null, children),
    iconRight && h(Icon, { name: iconRight, size: size === "lg" ? 20 : 16 }),
  );
}

function IconButton({ icon, onClick, className = "", label, size = 20 }) {
  return h("button", { type: "button", className: cx("btn-icon", className), onClick, "aria-label": label },
    h(Icon, { name: icon, size }));
}

function Card({ variant, onClick, className = "", children, style }) {
  const cls = cx(
    "card",
    variant === "emerald" && "card-emerald",
    variant === "amber"   && "card-amber",
    variant === "rose"    && "card-rose",
    variant === "sky"     && "card-sky",
    variant === "violet"  && "card-violet",
    onClick && "card-clickable",
    className
  );
  return h("div", { className: cls, onClick, style }, children);
}

function PageHeader({ title, subtitle, onBack, action }) {
  return h("div", { className: "page-header" },
    onBack && h(IconButton, { icon: "arrow_left", onClick: onBack, label: "Back" }),
    h("div", { className: "grow" },
      h("h1", { className: "page-title" }, title),
      subtitle && h("div", { className: "page-subtitle" }, subtitle),
    ),
    action,
  );
}

function Input({ value, onChange, placeholder, type = "text", className = "", autoFocus }) {
  return h("input", {
    className: cx("input", className),
    type, value: value ?? "", placeholder, autoFocus,
    onChange: e => onChange?.(e.target.value),
  });
}

function Textarea({ value, onChange, placeholder, rows = 3, className = "", onKeyDown }) {
  return h("textarea", {
    className: cx("textarea", className),
    rows, value: value ?? "", placeholder,
    onChange: e => onChange?.(e.target.value),
    onKeyDown,
  });
}

function Toggle({ checked, onChange }) {
  return h("button", {
    type: "button",
    className: cx("toggle", checked && "on"),
    onClick: () => onChange?.(!checked),
    "aria-pressed": checked,
  });
}

function Modal({ onClose, children, title }) {
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);
  return h("div", { className: "modal-backdrop", onClick: e => { if (e.target === e.currentTarget) onClose?.(); } },
    h("div", { className: "modal", onClick: e => e.stopPropagation() },
      title && h("div", { className: "row-between", style: { marginBottom: 16 } },
        h("h2", { className: "t-xl t-bold" }, title),
        h(IconButton, { icon: "x", onClick: onClose, label: "Close" }),
      ),
      children,
    ),
  );
}

function EmptyState({ icon = "sparkles", title, subtitle, action }) {
  return h("div", { className: "empty-state" },
    h("div", { className: "empty-state-icon" }, h(Icon, { name: icon, size: 28 })),
    h("div", { className: "t-lg t-bold t-white" }, title),
    subtitle && h("div", { className: "t-sm t-muted", style: { marginTop: 6 } }, subtitle),
    action && h("div", { style: { marginTop: 16 } }, action),
  );
}

function ProgressBar({ percent }) {
  return h("div", { className: "progress-bar" },
    h("div", { className: "progress-bar-fill", style: { width: `${clamp(percent, 0, 100)}%` } }),
  );
}

function LevelBadge({ level }) {
  return h("span", { className: cx("level-badge", level) }, level);
}

function PremiumBadge() {
  const t = useT();
  return h("span", { className: "premium-badge" }, h(Icon, { name: "crown", size: 12 }), t("common.premium"));
}

/* ────────────────────────── XP flash & level-up toast ────────────────────────── */
function XpFlashHost() {
  const [flashes, setFlashes] = useState([]);
  const t = useT();
  useEffect(() => {
    const onXp = (e) => {
      const id = uid();
      setFlashes(f => [...f, { id, type: "xp", xp: e.detail.xp }]);
      setTimeout(() => setFlashes(f => f.filter(x => x.id !== id)), 2200);
    };
    const onLvl = (e) => {
      const id = uid();
      setFlashes(f => [...f, { id, type: "level", level: e.detail.level }]);
      setTimeout(() => setFlashes(f => f.filter(x => x.id !== id)), 2800);
      if (typeof confetti !== "undefined") {
        try { confetti({ particleCount: 90, spread: 70, origin: { y: 0.4 }, colors: ["#10b981", "#34d399", "#fbbf24"] }); } catch {}
      }
    };
    on("sc_xp_flash", onXp);
    on("sc_level_up", onLvl);
    return () => {
      SC.bus.removeEventListener("sc_xp_flash", onXp);
      SC.bus.removeEventListener("sc_level_up", onLvl);
    };
  }, []);
  return h(F, null, flashes.map(f =>
    h("div", { key: f.id, className: "xp-flash" },
      f.type === "xp" ? t("xp_flash", { xp: f.xp }) : t("level_up", { level: f.level })
    )
  ));
}
/* ============================================================================
 * PAGE COMPONENTS
 * ========================================================================= */

/* ────────────────────────── HOME PAGE ────────────────────────── */
function HomePage() {
  const t = useT();
  const [profile] = useStorageValue(() => SC.storage.getProfile());
  const [progress] = useStorageValue(() => SC.storage.getProgress());
  const [drillsDone] = useStorageValue(() => SC.storage.getCompletedDrills());
  const [mentalDone] = useStorageValue(() => SC.storage.getCompletedMental());
  const [workoutsDone] = useStorageValue(() => SC.storage.getCompletedWorkouts());
  const [rec, setRec] = useState(null);
  const [overtraining, setOvertraining] = useState(null);
  const [upcomingMatch, setUpcomingMatch] = useState(null);

  useEffect(() => {
    SC.brain.getRecommendation().then(setRec).catch(() => {});
    setOvertraining(SC.brain.detectOvertrainingStreak());
    setUpcomingMatch(SC.brain.detectUpcomingMatch());
  }, [drillsDone.length, mentalDone.length]);

  const greeting = useMemo(() => {
    const hr = new Date().getHours();
    if (hr < 5)  return t("home.greeting_night");
    if (hr < 12) return t("home.greeting_morning");
    if (hr < 17) return t("home.greeting_afternoon");
    if (hr < 22) return t("home.greeting_evening");
    return t("home.greeting_night");
  }, [t]);

  const levelInfo = levelFromXp(progress.total_xp);
  const xpPct = (levelInfo.xpInLevel / levelInfo.xpNeeded) * 100;
  const lastSession = useMemo(() => SC.state.getLastSessionSummary(), [drillsDone.length, mentalDone.length, workoutsDone.length]);

  // Streak bar: last 7 days
  const streakDays = useMemo(() => {
    const today = startOfDay(now());
    const all = [
      ...drillsDone.map(d => startOfDay(d.timestamp)),
      ...mentalDone.map(m => startOfDay(m.timestamp)),
      ...workoutsDone.map(w => startOfDay(w.timestamp)),
    ];
    const set = new Set(all);
    return Array.from({ length: 7 }, (_, i) => {
      const day = today - (6 - i) * 86400000;
      return { day, done: set.has(day) };
    });
  }, [drillsDone, mentalDone, workoutsDone]);

  // Mental training gap
  const showWeakMental = progress.total_xp > 500 && (progress.xp_by_category.mental || 0) / progress.total_xp < 0.1;
  const totalSessions = drillsDone.length + mentalDone.length + workoutsDone.length;

  // Auto-animate the alert stack
  const alertsRef = useAutoAnimate();

  return h("div", { className: "page" },
    // Top bar: profile chip (personalization thread)
    h("div", { className: "row-between", style: { marginBottom: 14 } },
      h("div", { className: "row", style: { gap: 12 } },
        h("div", { className: "profile-avatar" },
          (profile.name || "S").slice(0, 1).toUpperCase(),
        ),
        h("div", null,
          h("div", { className: "t-xs t-muted" }, greeting + (profile.name ? "," : "")),
          h("div", { className: "t-lg t-bold t-white", style: { lineHeight: 1.1 } },
            profile.name || t("settings.profile")),
          h("div", { className: "t-xs t-muted", style: { marginTop: 2 } },
            t(`common.${profile.level || "intermediate"}`) + " · " + t(`settings.role_${profile.role || "allrounder"}`)),
        ),
      ),
      progress.streak > 0 && h("div", { className: "streak-chip" },
        h(Icon, { name: "flame", size: 14 }),
        h("span", null, progress.streak),
      ),
    ),

    // Level & XP card (hero)
    h(Card, { variant: "emerald", className: "focus-card", style: { marginBottom: 16 } },
      h("div", { className: "row-between", style: { marginBottom: 10 } },
        h("div", null,
          h("div", { className: "t-xs t-muted t-upper t-semi" }, t("common.level")),
          h("div", { className: "t-3xl t-extra t-white" }, levelInfo.level),
        ),
        h("div", { style: { textAlign: "right" } },
          h("div", { className: "t-xs t-muted t-upper t-semi" }, t("progress.total_xp")),
          h("div", { className: "t-2xl t-extra t-emerald" }, progress.total_xp.toLocaleString()),
        ),
      ),
      h(ProgressBar, { percent: xpPct }),
      h("div", { className: "t-xs t-muted", style: { marginTop: 8 } },
        t("progress.next_level", { xp: levelInfo.xpNeeded - levelInfo.xpInLevel, level: levelInfo.level + 1 })),
    ),

    // Last session (Day.js powered)
    lastSession && h(Card, { style: { marginBottom: 16, cursor: "pointer" },
      onClick: () => lastSession.kind === "drill" ? navigate("/Drills") : lastSession.kind === "mental" ? navigate("/Mental") : navigate("/Workouts"),
    },
      h("div", { className: "row-between" },
        h("div", null,
          h("div", { className: "t-xs t-upper t-muted t-semi" }, t("home.last_session") || "Last session"),
          h("div", { className: "t-base t-semi t-white", style: { marginTop: 4 } },
            (lastSession.kind === "drill" ? t("nav.drills") : lastSession.kind === "mental" ? t("nav.mental") : t("nav.workouts"))
            + " · " + t(`drills.cat_${lastSession.cat}`, { defaultValue: lastSession.cat })),
          h("div", { className: "t-xs t-muted", style: { marginTop: 2 } },
            SC.dates.fromNow(lastSession.ts) + "  ·  +" + lastSession.xp + " XP"),
        ),
        h(Icon, { name: "chevron_right", size: 20, className: "drill-chev" }),
      ),
    ),

    // Alerts stack (auto-animated)
    h("div", { ref: alertsRef },
      // Today's Focus (brain.js-powered)
      rec && rec.confidence > 0.28 && h(TodayFocusCard, { key: "focus", rec, t }),

      // Match week alert
      upcomingMatch && h(Card, { key: "match", variant: "amber", style: { marginTop: 12 } },
        h("div", { className: "row", style: { marginBottom: 8 } },
          h(Icon, { name: "calendar", size: 20, className: "t-amber" }),
          h("div", { className: "t-lg t-bold" }, t("home.match_week_title", { days: upcomingMatch.days_until })),
        ),
        h("div", { className: "t-sm t-muted" }, t("home.match_week_msg")),
      ),

      // Overtraining alert
      overtraining && h(Card, { key: "overtrain", variant: "rose", style: { marginTop: 12 } },
        h("div", { className: "row", style: { marginBottom: 6 } },
          h(Icon, { name: "alert", size: 18, className: "t-rose" }),
          h("div", { className: "t-bold t-white" }, t("home.overtraining_title")),
        ),
        h("div", { className: "t-sm t-muted" }, t("home.overtraining_msg", {
          category: t(`drills.cat_${overtraining.category}`), count: overtraining.streak_days,
        })),
      ),

      // Weak mental gap
      showWeakMental && h(Card, { key: "weak", variant: "sky", style: { marginTop: 12, cursor: "pointer" }, onClick: () => navigate("/Mental") },
        h("div", { className: "row", style: { marginBottom: 6 } },
          h(Icon, { name: "brain", size: 20, className: "t-sky" }),
          h("div", { className: "t-bold t-white" }, t("home.weak_area_title")),
        ),
        h("div", { className: "t-sm t-muted" }, t("home.weak_area_mental", { count: mentalDone.length })),
      ),
    ),

    // Streak card
    h(Card, { style: { marginTop: 16 } },
      h("div", { className: "row-between", style: { marginBottom: 12 } },
        h("div", { className: "row" },
          h(Icon, { name: "flame", size: 20, className: "t-amber" }),
          h("div", { className: "t-bold t-white" }, t("home.streak_title")),
        ),
        h("div", { className: "t-sm t-muted" },
          progress.streak > 0 ? t("home.streak_days", { count: progress.streak }) : t("home.streak_none")),
      ),
      h("div", { className: "row", style: { gap: 6, justifyContent: "center" } },
        streakDays.map(d => h("div", { key: d.day, className: cx("streak-dot", d.done && "done") })),
      ),
    ),

    // Quick tools grid
    h("div", { style: { marginTop: 20 } },
      h("div", { className: "t-sm t-upper t-muted t-semi", style: { marginBottom: 10 } }, t("home.quickstart")),
      h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
        h(QuickTile, { icon: "swords",   label: t("nav.drills"),   color: "emerald", to: "/Drills" }),
        h(QuickTile, { icon: "brain",    label: t("nav.mental"),   color: "sky",     to: "/Mental" }),
        h(QuickTile, { icon: "dumbbell", label: t("nav.workouts"), color: "rose",    to: "/Workouts" }),
        h(QuickTile, { icon: "waves",    label: t("nav.physics"),  color: "amber",   to: "/BowlingScience" }),
      ),
    ),

    // Trainer footer: session count + achievement hint
    totalSessions > 0 && h("div", { className: "t-xs t-muted t-center", style: { marginTop: 28 } },
      (t("home.total_sessions") || "Total sessions logged:") + " " + totalSessions),
  );
}

function TodayFocusCard({ rec, t }) {
  const drills = DRILLS.filter(d => d.category === rec.category).slice(0, 3);
  const catLabel = t(`drills.cat_${rec.category}`);
  return h(Card, { variant: "emerald", className: "focus-card", style: { marginTop: 16 } },
    h("div", { className: "row-between", style: { marginBottom: 10 } },
      h("div", null,
        h("div", { className: "t-xs t-muted t-upper t-semi" }, t("home.focus_title")),
        h("div", { className: "t-xl t-extra t-white", style: { marginTop: 2 } }, catLabel),
      ),
      h("div", { className: "t-xs t-muted t-upper t-semi" },
        Math.round(rec.confidence * 100) + "% " + t("home.focus_confidence")),
    ),
    h("div", { className: "t-sm t-muted", style: { marginBottom: 12 } },
      t("home.focus_reason_weak", { category: catLabel })),
    drills.length > 0 && h(Button, {
      variant: "primary", iconRight: "chevron_right",
      onClick: () => navigate("/Drills?cat=" + rec.category),
    }, t("home.focus_view_drills")),
  );
}

function QuickTile({ icon, label, color, to }) {
  return h(Card, {
    variant: color,
    onClick: () => navigate(to),
    style: { padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, minHeight: 100 },
  },
    h(Icon, { name: icon, size: 28, className: `t-${color}` }),
    h("div", { className: "t-sm t-semi t-white", style: { textAlign: "center" } }, label),
  );
}

/* ────────────────────────── DRILLS PAGE ────────────────────────── */
function DrillsPage() {
  const t = useT();
  const route = useRoute();
  const initialCat = route.query?.cat || null;
  const [cat, setCat] = useState(initialCat);
  const [level, setLevel] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => DRILLS.filter(d =>
    (!cat || d.category === cat) && (!level || d.level === level)
  ), [cat, level]);

  const drills = useMemo(() => {
    if (!query.trim()) return filtered;
    return SC.search.search("drills", query, filtered, ["title", "description", "equipment"]);
  }, [filtered, query]);

  return h("div", { className: "page" },
    h(PageHeader, { title: t("drills.title"), subtitle: t("drills.subtitle") }),

    // Search bar
    h(SearchBar, { value: query, onChange: setQuery, placeholder: t("drills.search") || "Search drills…" }),

    // Category chips
    h("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 12 } },
      h(FilterChip, { active: !cat, onClick: () => setCat(null), label: t("drills.filter_all") }),
      DRILL_CATEGORIES.map(c => h(FilterChip, {
        key: c.id, active: cat === c.id, onClick: () => setCat(c.id), label: t(c.label_key),
      })),
    ),

    // Level chips
    h("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 } },
      h(FilterChip, { active: !level, onClick: () => setLevel(null), label: t("drills.filter_level") + ": " + t("common.all") }),
      ["beginner", "intermediate", "advanced", "pro"].map(lv => h(FilterChip, {
        key: lv, active: level === lv, onClick: () => setLevel(lv), label: t(`common.${lv}`),
      })),
    ),

    // Physics Lab feature card (inline in Bowling category only, or All)
    (!cat || cat === "bowling") && h(Card, {
      variant: "amber", onClick: () => navigate("/BowlingScience"),
      style: { marginBottom: 16 },
    },
      h("div", { className: "row" },
        h("div", { className: "drill-icon", style: { background: "linear-gradient(135deg, rgba(245,158,11,.25), rgba(245,158,11,.08))", color: "#f59e0b" } },
          h(Icon, { name: "waves", size: 22 }),
        ),
        h("div", { className: "grow" },
          h("div", { className: "t-bold t-white" }, t("drills.physics_lab_card_title")),
          h("div", { className: "t-sm t-muted", style: { marginTop: 2 } }, t("drills.physics_lab_card_desc")),
        ),
        h(Icon, { name: "chevron_right", size: 20, className: "drill-chev" }),
      ),
    ),

    drills.length === 0
      ? h(EmptyState, { icon: "search", title: t("drills.empty") })
      : h(AnimatedList, null,
          drills.map(d => h(DrillRow, { key: d.id, drill: d, t })),
        ),
  );
}

// List wrapper that auto-animates when children change
function AnimatedList({ children }) {
  const ref = useAutoAnimate();
  return h("div", { className: "stack", ref }, children);
}

function FilterChip({ active, onClick, label }) {
  return h("button", {
    type: "button",
    onClick: () => { SC.audio?.play("tap"); onClick?.(); },
    className: cx("chip", active && "preset-chip", active && "active"),
    style: { padding: "6px 12px", fontSize: 13, fontWeight: 600, flexShrink: 0, cursor: "pointer", whiteSpace: "nowrap" },
  }, label);
}

const categoryIconMap = {
  batting: "swords", bowling: "wind", fielding: "target", keeping: "shield", fitness: "dumbbell",
};

function DrillRow({ drill, t }) {
  const iconName = categoryIconMap[drill.category] || "target";
  const completed = useMemo(() => SC.state.getCompletedDrillIds().has(drill.id), [drill.id]);
  return h("div", {
    className: cx("drill-row", completed && "completed"),
    onClick: () => navigate("/Drills/" + drill.id),
  },
    h("div", { className: "drill-icon" }, h(Icon, { name: iconName, size: 20 })),
    h("div", { className: "drill-meta" },
      h("div", { className: "drill-title" },
        drill.title,
        completed && h("span", { className: "completion-pill" },
          h(Icon, { name: "check", size: 11 })),
      ),
      h("div", { className: "drill-sub" }, drill.duration_min + " " + t("common.min") + " · " + t(`common.${drill.level}`) + " · +" + drill.xp + " " + t("common.xp")),
    ),
    h(Icon, { name: "chevron_right", size: 20, className: "drill-chev" }),
  );
}

function DrillDetailPage() {
  const t = useT();
  const route = useRoute();
  const drill = DRILLS.find(d => d.id === route.params[0]);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  if (!drill) return h("div", { className: "page" }, h(EmptyState, { title: "Drill not found", action: h(Button, { onClick: () => navigate("/Drills") }, t("common.back")) }));

  const targetSecs = drill.duration_min * 60;
  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  function handleComplete() {
    completeDrill(drill.id);
    SC.audio?.play("drill_complete");
    setFinished(true);
  }

  return h("div", { className: "page" },
    h(PageHeader, { title: drill.title, onBack: () => navigate("/Drills") }),

    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "row", style: { marginBottom: 10, flexWrap: "wrap", gap: 8 } },
        h(LevelBadge, { level: drill.level }),
        h("span", { className: "chip" }, drill.duration_min + " " + t("common.min")),
        h("span", { className: "chip" }, "+" + drill.xp + " " + t("common.xp")),
      ),
      h("p", { style: { fontSize: 15, lineHeight: 1.6, marginTop: 8 } }, drill.description),
    ),

    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "t-sm t-upper t-muted t-semi", style: { marginBottom: 8 } }, t("drills.equipment")),
      h("div", { className: "t-base" }, drill.equipment),
    ),

    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "t-sm t-upper t-muted t-semi", style: { marginBottom: 10 } }, t("drills.cues")),
      drill.cues.map((c, i) => h("div", { key: i, className: "row", style: { marginBottom: 6 } },
        h(Icon, { name: "check_circle", size: 16, className: "t-emerald" }),
        h("span", null, c),
      )),
    ),

    // Timer
    h(Card, { variant: "emerald", style: { textAlign: "center", padding: 28 } },
      h("div", { className: "timer-display" }, formatTime(seconds)),
      h("div", { className: "t-sm t-muted", style: { marginTop: 8 } },
        t("drills.duration") + ": " + formatTime(targetSecs)),
      h("div", { className: "row", style: { marginTop: 18, justifyContent: "center" } },
        !running && !finished && h(Button, { variant: "primary", size: "lg", icon: "play", onClick: () => setRunning(true) }, t("common.start")),
        running && h(Button, { variant: "ghost", size: "lg", icon: "pause", onClick: () => setRunning(false) }, t("common.pause")),
        !finished && h(Button, { variant: "primary", size: "lg", icon: "check", onClick: handleComplete }, t("drills.complete_drill")),
      ),
    ),

    finished && h("div", { style: { marginTop: 16 } },
      h(Card, { variant: "emerald", style: { textAlign: "center" } },
        h(Icon, { name: "sparkles", size: 40, className: "t-emerald", style: { marginBottom: 12 } }),
        h("div", { className: "t-xl t-bold t-white", style: { marginBottom: 8 } }, t("mental.complete_session")),
        h("div", { className: "t-sm t-muted", style: { marginBottom: 16 } }, "+" + drill.xp + " XP"),
        h(Button, { variant: "primary", fullWidth: true, onClick: () => navigate("/Drills") }, t("common.done")),
      ),
    ),
  );
}

/* ────────────────────────── MENTAL PAGE ────────────────────────── */
function MentalPage() {
  const t = useT();
  const [cat, setCat] = useState(null);
  const [query, setQuery] = useState("");
  const isPremium = SC.storage.isPremium();

  const filtered = useMemo(() => MENTAL_SESSIONS.filter(m => !cat || m.category === cat), [cat]);
  const sessions = useMemo(() => {
    if (!query.trim()) return filtered;
    return SC.search.search("mental", query, filtered, ["title"]);
  }, [filtered, query]);

  return h("div", { className: "page" },
    h(PageHeader, { title: t("mental.title"), subtitle: t("mental.subtitle") }),

    h(SearchBar, { value: query, onChange: setQuery, placeholder: t("mental.search") || "Search sessions…" }),

    h("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 } },
      h(FilterChip, { active: !cat, onClick: () => setCat(null), label: t("common.all") }),
      MENTAL_CATEGORIES.map(c => h(FilterChip, {
        key: c.id, active: cat === c.id, onClick: () => setCat(c.id), label: t(c.label_key),
      })),
    ),

    h(AnimatedList, null,
      sessions.map(s => h(MentalRow, { key: s.id, session: s, locked: s.is_premium && !isPremium, t })),
    ),
  );
}

function MentalRow({ session, locked, t }) {
  const completed = useMemo(() => SC.state.getCompletedMentalIds().has(session.id), [session.id]);
  return h("div", {
    className: cx("mental-row", completed && "completed"),
    onClick: () => locked ? navigate("/Premium") : navigate("/Mental/" + session.id),
  },
    h("div", { className: "drill-icon", style: { color: locked ? "#64748b" : "#38bdf8", background: locked ? "rgba(100,116,139,0.1)" : "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(14,165,233,0.08))" } },
      h(Icon, { name: locked ? "lock" : "brain", size: 20 })),
    h("div", { className: "drill-meta" },
      h("div", { className: "drill-title" },
        session.title,
        completed && h("span", { className: "completion-pill" },
          h(Icon, { name: "check", size: 11 })),
      ),
      h("div", { className: "drill-sub" }, session.duration_min + " " + t("common.min") + " · " + t(`mental.cat_${session.category}`) + " · +" + session.xp + " " + t("common.xp")),
    ),
    session.is_premium && h(PremiumBadge),
    h(Icon, { name: "chevron_right", size: 20, className: "drill-chev" }),
  );
}

function MentalDetailPage() {
  const t = useT();
  const route = useRoute();
  const session = MENTAL_SESSIONS.find(m => m.id === route.params[0]);
  const isPremium = SC.storage.isPremium();
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => {
      if (s + 1 >= (session?.duration_min || 0) * 60) { setRunning(false); return s + 1; }
      return s + 1;
    }), 1000);
    return () => clearInterval(id);
  }, [running, session]);

  if (!session) return h("div", { className: "page" }, h(EmptyState, { title: "Session not found", action: h(Button, { onClick: () => navigate("/Mental") }, t("common.back")) }));
  if (session.is_premium && !isPremium) {
    return h("div", { className: "page" },
      h(PageHeader, { title: session.title, onBack: () => navigate("/Mental") }),
      h(Card, { variant: "violet", style: { textAlign: "center", padding: 40 } },
        h(Icon, { name: "crown", size: 40, className: "t-amber", style: { marginBottom: 12 } }),
        h("div", { className: "t-xl t-bold t-white", style: { marginBottom: 8 } }, t("mental.premium_locked")),
        h(Button, { variant: "primary", onClick: () => navigate("/Premium"), style: { marginTop: 16 } }, t("common.unlock_premium")),
      ),
    );
  }

  const target = session.duration_min * 60;
  const pct = (seconds / target) * 100;

  return h("div", { className: "page" },
    h(PageHeader, { title: session.title, onBack: () => navigate("/Mental") }),
    h(Card, { variant: "sky", style: { textAlign: "center", padding: 32 } },
      h("div", { className: "t-xs t-upper t-muted t-semi", style: { marginBottom: 6 } }, t(`mental.cat_${session.category}`)),
      h("div", { className: "timer-display" }, Math.floor((target - seconds) / 60).toString().padStart(2, "0") + ":" + ((target - seconds) % 60).toString().padStart(2, "0")),
      h("div", { style: { marginTop: 18 } }, h(ProgressBar, { percent: pct })),
      h("div", { className: "row", style: { marginTop: 20, justifyContent: "center" } },
        !running && !finished && h(Button, { variant: "primary", size: "lg", icon: "play", onClick: () => setRunning(true) }, t("mental.start_session")),
        running && h(Button, { variant: "ghost", size: "lg", icon: "pause", onClick: () => setRunning(false) }, t("common.pause")),
        !finished && seconds > 0 && h(Button, { variant: "primary", size: "lg", icon: "check", onClick: () => { completeMental(session.id); SC.audio?.play("mental_complete"); setFinished(true); } }, t("mental.complete_session")),
      ),
    ),
    finished && h(Card, { variant: "emerald", style: { marginTop: 16, textAlign: "center" } },
      h(Icon, { name: "sparkles", size: 36, className: "t-emerald", style: { marginBottom: 8 } }),
      h("div", { className: "t-xl t-bold t-white" }, "+" + session.xp + " XP"),
      h(Button, { variant: "primary", fullWidth: true, onClick: () => navigate("/Mental"), style: { marginTop: 16 } }, t("common.done")),
    ),
  );
}

/* ────────────────────────── WORKOUTS PAGE ────────────────────────── */
function WorkoutsPage() {
  const t = useT();
  const [target, setTarget] = useState(null);
  const [level, setLevel] = useState(null);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => WORKOUTS.filter(w =>
    (!target || w.target === target) && (!level || w.level === level)
  ), [target, level]);
  const list = useMemo(() => {
    if (!query.trim()) return filtered;
    return SC.search.search("workouts", query, filtered, ["title", "target"]);
  }, [filtered, query]);
  const targets = ["full_body", "arms", "back", "chest", "shoulders", "legs", "core", "cardio", "recovery"];

  return h("div", { className: "page" },
    h(PageHeader, { title: t("workouts.title"), subtitle: t("workouts.subtitle") }),

    h(SearchBar, { value: query, onChange: setQuery, placeholder: t("workouts.search") || "Search workouts…" }),

    h("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 12 } },
      h(FilterChip, { active: !target, onClick: () => setTarget(null), label: t("common.all") }),
      targets.map(tg => h(FilterChip, {
        key: tg, active: target === tg, onClick: () => setTarget(tg), label: t(`workouts.target_${tg}`),
      })),
    ),

    h("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 } },
      h(FilterChip, { active: !level, onClick: () => setLevel(null), label: t("drills.filter_level") }),
      ["beginner", "intermediate", "advanced", "pro"].map(lv =>
        h(FilterChip, { key: lv, active: level === lv, onClick: () => setLevel(lv), label: t(`common.${lv}`) })),
    ),

    h(AnimatedList, null,
      list.map(w => h(WorkoutRow, { key: w.id, workout: w, t })),
    ),
  );
}

function WorkoutRow({ workout, t }) {
  return h("div", { className: "drill-row", onClick: () => {
    if (confirm(`Complete "${workout.title}"? You'll earn ${workout.xp} XP.`)) completeWorkout(workout.id);
  } },
    h("div", { className: "drill-icon", style: { background: "linear-gradient(135deg, rgba(244,63,94,0.2), rgba(225,29,72,0.08))", color: "#f43f5e" } },
      h(Icon, { name: "dumbbell", size: 20 })),
    h("div", { className: "drill-meta" },
      h("div", { className: "drill-title" }, workout.title),
      h("div", { className: "drill-sub" },
        workout.exercises + " " + t("workouts.exercises") + " · " + workout.duration + " " + t("common.min") + " · " + t(`common.${workout.level}`) + " · +" + workout.xp + " XP"),
    ),
    h(Icon, { name: "check", size: 20, className: "drill-chev" }),
  );
}

/* ────────────────────────── BOWLING SCIENCE (PHYSICS) PAGE ────────────────────────── */
function BowlingSciencePage() {
  const t = useT();
  const canvasRef = useRef(null);
  const [preset, setPreset] = useState("outswing");
  const [params, setParams] = useState(() => ({ ...SC.physics.PRESETS.outswing }));
  const [readout, setReadout] = useState(null);
  const simRef = useRef(null);
  const [awarded, setAwarded] = useState(false);

  useEffect(() => {
    setParams({ ...SC.physics.PRESETS[preset] });
  }, [preset]);

  function setP(k, v) { setParams(p => ({ ...p, [k]: v })); }

  function bowl() {
    if (simRef.current) simRef.current.stop();
    if (!canvasRef.current) return;
    SC.audio?.play("bowl");
    const sim = SC.physics.simulate({
      canvas: canvasRef.current,
      params,
      onEnd: (res) => {
        setReadout(res);
        if (!awarded) {
          awardXp("bowling", 20);
          setAwarded(true);
        }
      },
    });
    simRef.current = sim;
  }

  function resetSim() {
    if (simRef.current) simRef.current.stop();
    setReadout(null);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) { ctx.fillStyle = "#1a3d14"; ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); }
  }

  function savePreset() {
    const name = prompt("Name this delivery:");
    if (name?.trim()) {
      SC.physics.savePreset(name.trim(), params);
      alert("Saved!");
    }
  }

  // Resize canvas to container
  useEffect(() => {
    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      c.width = Math.floor(rect.width);
      c.height = Math.floor(rect.height);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#1a3d14";
      ctx.fillRect(0, 0, c.width, c.height);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (simRef.current) simRef.current.stop();
    };
  }, []);

  const presets = ["outswing", "inswing", "reverse", "offspin", "legspin"];

  return h("div", { className: "page" },
    h(PageHeader, { title: t("physics.title"), subtitle: t("physics.subtitle"), onBack: () => navigate("/Drills") }),

    // Canvas
    h("div", { className: "physics-canvas-wrap", style: { marginBottom: 14 } },
      h("canvas", { ref: canvasRef }),
    ),

    // Preset chips
    h("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 14 } },
      presets.map(p => h("button", {
        key: p, type: "button",
        className: cx("preset-chip", preset === p && "active"),
        onClick: () => setPreset(p),
      }, t(`physics.preset_${p}`))),
    ),

    // Sliders
    h(Card, { style: { marginBottom: 14 } },
      h(Slider, { label: t("physics.label_speed"), value: params.speed, min: 60, max: 160, step: 1, unit: t("physics.label_kmh"), onChange: v => setP("speed", v) }),
      h(Slider, { label: t("physics.label_seam"), value: params.seam_angle, min: -45, max: 45, step: 1, unit: t("physics.label_deg"), onChange: v => setP("seam_angle", v) }),
      h(Slider, { label: t("physics.label_spin"), value: params.spin_rate, min: 500, max: 3500, step: 50, unit: t("physics.label_rpm"), onChange: v => setP("spin_rate", v) }),
      h(Slider, { label: t("physics.label_humidity"), value: params.humidity, min: 10, max: 100, step: 1, unit: t("physics.label_pct"), onChange: v => setP("humidity", v) }),
      h(Slider, { label: t("physics.label_hardness"), value: params.pitch_hardness, min: 20, max: 100, step: 1, unit: t("physics.label_pct"), onChange: v => setP("pitch_hardness", v) }),
    ),

    // Readout
    readout && h("div", { className: "physics-readout", style: { marginBottom: 14 } },
      h(Readout, { label: t("physics.readout_deviation"), value: readout.lateral_deviation_cm.toFixed(1) + " cm" }),
      h(Readout, { label: t("physics.readout_flight"), value: readout.flight_time_s.toFixed(2) + "s" }),
      h(Readout, { label: t("physics.readout_zone"), value: t(`physics.${readout.final_zone}`) }),
      h(Readout, { label: t("physics.readout_peak"), value: "—" }),
    ),

    // Controls
    h("div", { className: "row", style: { gap: 8, flexWrap: "wrap" } },
      h(Button, { variant: "primary", icon: "play", onClick: bowl }, t("physics.bowl")),
      h(Button, { variant: "ghost", icon: "refresh", onClick: resetSim }, t("physics.reset")),
      h(Button, { variant: "ghost", icon: "download", onClick: savePreset }, t("physics.save_preset")),
    ),
  );
}

function Slider({ label, value, min, max, step, unit, onChange }) {
  return h("div", { className: "slider-row" },
    h("div", { className: "slider-row-header" },
      h("span", null, label),
      h("span", { className: "slider-row-value" }, value + (unit ? " " + unit : "")),
    ),
    h("input", {
      type: "range", className: "slider", value, min, max, step,
      onChange: e => onChange?.(Number(e.target.value)),
    }),
  );
}

function Readout({ label, value }) {
  return h("div", { className: "physics-readout-item" },
    h("div", { className: "physics-readout-label" }, label),
    h("div", { className: "physics-readout-value" }, value),
  );
}

/* ────────────────────────── PROGRESS PAGE (Chart.js powered) ────────────────────────── */
function ProgressPage() {
  const t = useT();
  useLangTick();
  const [progress] = useStorageValue(() => SC.storage.getProgress());
  const [drills] = useStorageValue(() => SC.storage.getCompletedDrills());
  const [mental] = useStorageValue(() => SC.storage.getCompletedMental());
  const [workouts] = useStorageValue(() => SC.storage.getCompletedWorkouts());

  const radarRef = useRef(null);
  const lineRef = useRef(null);
  const barRef = useRef(null);
  const chartsRef = useRef({ radar: null, line: null, bar: null });

  const levelInfo = levelFromXp(progress.total_xp);
  const pct = (levelInfo.xpInLevel / levelInfo.xpNeeded) * 100;

  // Build charts when data or language changes
  useEffect(() => {
    // Destroy any existing
    SC.charts.destroy(chartsRef.current.radar);
    SC.charts.destroy(chartsRef.current.line);
    SC.charts.destroy(chartsRef.current.bar);

    // Wait a tick for Chart.js to be available from CDN
    const build = () => {
      if (typeof window.Chart === "undefined") { setTimeout(build, 200); return; }
      if (radarRef.current) chartsRef.current.radar = SC.charts.radarSkill(radarRef.current, progress, t);
      if (lineRef.current) {
        const allEvents = [
          ...drills.map(d => ({ timestamp: d.timestamp, xp: d.xp })),
          ...mental.map(m => ({ timestamp: m.timestamp, xp: m.xp })),
          ...workouts.map(w => ({ timestamp: w.timestamp, xp: w.xp })),
        ];
        chartsRef.current.line = SC.charts.lineXpTrend(lineRef.current, allEvents, t);
      }
      if (barRef.current) chartsRef.current.bar = SC.charts.barWeeklyActivity(barRef.current, drills, mental, workouts, t);
    };
    build();

    return () => {
      SC.charts.destroy(chartsRef.current.radar);
      SC.charts.destroy(chartsRef.current.line);
      SC.charts.destroy(chartsRef.current.bar);
    };
  }, [progress.total_xp, drills.length, mental.length, workouts.length, SC.i18n?.getLang()]);

  return h("div", { className: "page" },
    h(PageHeader, { title: t("progress.title"), subtitle: t("progress.subtitle") }),

    // Hero — level & total XP
    h(Card, { variant: "emerald", style: { marginBottom: 16 } },
      h("div", { className: "row-between", style: { marginBottom: 12 } },
        h("div", null,
          h("div", { className: "t-xs t-muted t-upper t-semi" }, t("progress.current_level")),
          h("div", { className: "t-3xl t-extra t-white" }, levelInfo.level),
        ),
        h("div", { style: { textAlign: "right" } },
          h("div", { className: "t-xs t-muted t-upper t-semi" }, t("progress.total_xp")),
          h("div", { className: "t-2xl t-extra t-emerald" }, progress.total_xp.toLocaleString()),
        ),
      ),
      h(ProgressBar, { percent: pct }),
      h("div", { className: "t-xs t-muted", style: { marginTop: 8 } },
        t("progress.next_level", { xp: levelInfo.xpNeeded - levelInfo.xpInLevel, level: levelInfo.level + 1 })),
    ),

    // Stats grid
    h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 20 } },
      h(StatTile, { icon: "flame", color: "amber", label: t("progress.streak"), value: progress.streak + " " + t("common.days") }),
      h(StatTile, { icon: "swords", color: "emerald", label: t("progress.drills_done"), value: drills.length }),
      h(StatTile, { icon: "brain", color: "sky", label: t("progress.mental_done"), value: mental.length }),
      h(StatTile, { icon: "dumbbell", color: "rose", label: t("progress.workouts_done"), value: workouts.length }),
    ),

    // Skill Radar (Chart.js)
    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "row", style: { marginBottom: 12 } },
        h(Icon, { name: "target", size: 18, className: "t-emerald" }),
        h("div", { className: "t-sm t-upper t-muted t-semi" }, t("progress.skill_radar") || "Skill distribution"),
      ),
      h("div", { style: { position: "relative", height: 260 } },
        h("canvas", { ref: radarRef }),
      ),
    ),

    // 30-day XP trend (Chart.js)
    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "row", style: { marginBottom: 12 } },
        h(Icon, { name: "trending_up", size: 18, className: "t-emerald" }),
        h("div", { className: "t-sm t-upper t-muted t-semi" }, t("progress.xp_trend") || "30-day XP"),
      ),
      h("div", { style: { position: "relative", height: 180 } },
        h("canvas", { ref: lineRef }),
      ),
    ),

    // Weekly activity (Chart.js)
    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "row", style: { marginBottom: 12 } },
        h(Icon, { name: "bar_chart", size: 18, className: "t-emerald" }),
        h("div", { className: "t-sm t-upper t-muted t-semi" }, t("progress.this_week")),
      ),
      h("div", { style: { position: "relative", height: 220 } },
        h("canvas", { ref: barRef }),
      ),
    ),
  );
}

function StatTile({ icon, color, label, value }) {
  return h(Card, { variant: color, style: { padding: 14 } },
    h(Icon, { name: icon, size: 22, className: `t-${color}`, style: { marginBottom: 8 } }),
    h("div", { className: "t-2xl t-extra t-white" }, value),
    h("div", { className: "t-xs t-muted t-upper", style: { marginTop: 2 } }, label),
  );
}

/* ────────────────────────── PREMIUM PAGE ────────────────────────── */
function PremiumPage() {
  const t = useT();
  const route = useRoute();
  const isPremium = SC.storage.isPremium();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (route.query?.success === "1") {
      SC.storage.setPremium(true);
      if (typeof confetti !== "undefined") {
        try { confetti({ particleCount: 150, spread: 90, origin: { y: 0.4 } }); } catch {}
      }
    }
  }, [route.query?.success]);

  async function checkout(plan) {
    setLoading(plan);
    try { await SC.stripe.checkout(plan); } finally { setLoading(null); }
  }

  const features = [
    { icon: "swords", key: "feature_all_drills" },
    { icon: "brain", key: "feature_all_mental" },
    { icon: "message", key: "feature_unlimited_coach" },
    { icon: "waves", key: "feature_physics" },
    { icon: "sparkles", key: "feature_brain" },
    { icon: "check_circle", key: "feature_no_ads" },
    { icon: "bolt", key: "feature_priority" },
  ];

  return h("div", { className: "page" },
    h("div", { style: { textAlign: "center", marginBottom: 28 } },
      h("div", { style: { display: "inline-block", padding: 14, borderRadius: 20, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", marginBottom: 14 } },
        h(Icon, { name: "crown", size: 32, style: { color: "#0b0f1a" } })),
      h("h1", { className: "page-title" }, t("premium.title")),
      h("div", { className: "page-subtitle" }, t("premium.subtitle")),
    ),

    isPremium && h(Card, { variant: "emerald", style: { textAlign: "center", marginBottom: 24 } },
      h(Icon, { name: "check_circle", size: 32, className: "t-emerald", style: { marginBottom: 8 } }),
      h("div", { className: "t-lg t-bold t-white" }, t("premium.already_premium")),
    ),

    // Features list
    h(Card, { style: { marginBottom: 24 } },
      features.map(f => h("div", { key: f.key, className: "row", style: { padding: "8px 0" } },
        h(Icon, { name: "check_circle", size: 18, className: "t-emerald" }),
        h("span", { className: "t-base" }, t(`premium.${f.key}`)),
      )),
    ),

    !isPremium && h("div", { style: { display: "grid", gap: 12 } },
      h(PlanCard, { plan: "monthly", price: "$9.99", sub: t("premium.per_month"), loading: loading === "monthly", onBuy: () => checkout("monthly"), t }),
      h(PlanCard, { plan: "yearly", price: "$79.99", sub: t("premium.per_year"), loading: loading === "yearly", highlighted: true, onBuy: () => checkout("yearly"), t }),
      h(PlanCard, { plan: "lifetime", price: "$199.99", sub: t("premium.once"), loading: loading === "lifetime", onBuy: () => checkout("lifetime"), t }),
    ),
  );
}

function PlanCard({ plan, price, sub, loading, highlighted, onBuy, t }) {
  return h(Card, { variant: highlighted ? "emerald" : null },
    h("div", { className: "row-between", style: { marginBottom: 12 } },
      h("div", null,
        h("div", { className: "t-sm t-upper t-muted t-semi" }, t(`premium.${plan}`)),
        h("div", { className: "t-2xl t-extra t-white" }, price, h("span", { className: "t-sm t-muted" }, " " + sub)),
      ),
      highlighted && h("span", { className: "chip", style: { background: "#fbbf24", color: "#0b0f1a", fontWeight: 800 } }, "BEST VALUE"),
    ),
    h(Button, { variant: "primary", fullWidth: true, onClick: onBuy, disabled: loading },
      loading ? t("common.loading") : t("premium.checkout")),
  );
}

/* ────────────────────────── SETTINGS PAGE ────────────────────────── */
function SettingsPage() {
  const t = useT();
  const [profile, setProfile] = useState(() => SC.storage.getProfile());

  function updateProfile(patch) {
    const next = { ...profile, ...patch };
    setProfile(next);
    SC.storage.setProfile(next);
  }

  function setLang(lang) { SC.i18n.setLang(lang); }

  function resetAll() {
    if (confirm(t("settings.reset_confirm"))) {
      SC.storage.resetAll();
      navigate("/Home");
      location.reload();
    }
  }

  function exportData() {
    const data = SC.storage.exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `smartcrick-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return h("div", { className: "page" },
    h(PageHeader, { title: t("settings.title"), subtitle: t("settings.subtitle") }),

    // Profile
    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "t-sm t-upper t-muted t-semi", style: { marginBottom: 12 } }, t("settings.profile")),
      h("div", { className: "stack-sm" },
        h("label", { className: "t-xs t-muted" }, t("settings.name")),
        h(Input, { value: profile.name, onChange: v => updateProfile({ name: v }) }),
        h("label", { className: "t-xs t-muted", style: { marginTop: 12 } }, t("settings.role")),
        h("select", { className: "select input", value: profile.role, onChange: e => updateProfile({ role: e.target.value }) },
          ["batter", "bowler", "allrounder", "keeper", "fielder"].map(r =>
            h("option", { key: r, value: r }, t(`settings.role_${r}`))),
        ),
        h("label", { className: "t-xs t-muted", style: { marginTop: 12 } }, t("settings.level")),
        h("select", { className: "select input", value: profile.level, onChange: e => updateProfile({ level: e.target.value }) },
          ["beginner", "intermediate", "advanced", "pro"].map(lv =>
            h("option", { key: lv, value: lv }, t(`common.${lv}`))),
        ),
      ),
    ),

    // Language
    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "row-between", style: { marginBottom: 4 } },
        h("div", { className: "t-sm t-upper t-muted t-semi" }, t("settings.language")),
        h(Icon, { name: "globe", size: 16, className: "t-muted" }),
      ),
      h("div", { className: "t-xs t-muted", style: { marginBottom: 12 } }, t("settings.language_sub")),
      h("div", { className: "lang-grid" },
        SUPPORTED_LANGS.map(lng => {
          const meta = LANG_META[lng];
          const active = SC.i18n.getLang() === lng;
          return h("div", { key: lng, className: cx("lang-option", active && "active"), onClick: () => setLang(lng) },
            h("div", { className: "lang-native" }, meta.native),
            h("div", { className: "lang-english" }, meta.english),
          );
        }),
      ),
    ),

    // Audio (Tone.js)
    h(Card, { style: { marginBottom: 16 } },
      h(AudioToggle),
    ),

    // Data
    h(Card, { style: { marginBottom: 16 } },
      h("div", { className: "t-sm t-upper t-muted t-semi", style: { marginBottom: 12 } }, t("settings.data")),
      h("div", { className: "row", style: { gap: 10, flexWrap: "wrap" } },
        h(Button, { variant: "primary", icon: "download", onClick: () => SC.pdf.exportProgressReport() },
          t("settings.export_pdf") || "Export PDF"),
        h(Button, { variant: "ghost", icon: "download", onClick: exportData }, t("settings.export")),
        h(Button, { variant: "danger", onClick: resetAll }, t("settings.reset")),
      ),
    ),

    // About
    h("div", { className: "t-xs t-muted t-center", style: { marginTop: 24 } }, t("settings.version", { v: "4.7.0" })),
  );
}

/* ────────────────────────── SCHEDULE PAGE ────────────────────────── */
function SchedulePage() {
  const t = useT();
  const [list, refresh] = useStorageValue(() => SC.storage.getScheduled());
  const [showAdd, setShowAdd] = useState(false);

  const today = startOfDay(now());
  const upcoming = list.filter(a => new Date(a.date).getTime() >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
  const past = list.filter(a => new Date(a.date).getTime() < today).sort((a, b) => new Date(b.date) - new Date(a.date));

  function addActivity({ type, date, title, notes }) {
    SC.storage.pushScheduled({ id: uid(), type, date, title, notes, created_at: now() });
    setShowAdd(false);
    refresh();
  }

  return h("div", { className: "page" },
    h(PageHeader, { title: t("schedule.title"), subtitle: t("schedule.subtitle"),
      action: h(Button, { variant: "primary", size: "sm", icon: "plus", onClick: () => setShowAdd(true) }, t("schedule.add")),
    }),

    h("div", { style: { marginBottom: 20 } },
      h("div", { className: "t-sm t-upper t-muted t-semi", style: { marginBottom: 10 } }, t("schedule.upcoming")),
      upcoming.length === 0 ? h(EmptyState, { icon: "calendar", title: t("schedule.upcoming"), subtitle: t("schedule.add") })
        : h("div", { className: "stack" }, upcoming.map(a => h(ScheduleRow, { key: a.id, activity: a, t, onRemove: () => { SC.storage.removeScheduled(a.id); refresh(); } }))),
    ),

    past.length > 0 && h("div", null,
      h("div", { className: "t-sm t-upper t-muted t-semi", style: { marginBottom: 10 } }, t("schedule.past")),
      h("div", { className: "stack" }, past.slice(0, 10).map(a => h(ScheduleRow, { key: a.id, activity: a, t, onRemove: () => { SC.storage.removeScheduled(a.id); refresh(); }, faded: true }))),
    ),

    showAdd && h(AddScheduleModal, { onClose: () => setShowAdd(false), onSave: addActivity, t }),
  );
}

function ScheduleRow({ activity, t, onRemove, faded }) {
  const icons = { training: "dumbbell", match: "trophy", mental: "brain", rest: "moon" };
  const colors = { training: "#10b981", match: "#f59e0b", mental: "#38bdf8", rest: "#a78bfa" };
  return h("div", { className: "drill-row", style: faded ? { opacity: 0.5 } : null },
    h("div", { className: "drill-icon", style: { color: colors[activity.type] || "#94a3b8", background: "rgba(255,255,255,0.03)" } },
      h(Icon, { name: icons[activity.type] || "calendar", size: 20 })),
    h("div", { className: "drill-meta" },
      h("div", { className: "drill-title" }, activity.title || t(`schedule.type_${activity.type}`)),
      h("div", { className: "drill-sub" }, SC.dates.fromNow(new Date(activity.date).getTime()) + (activity.notes ? " · " + activity.notes : "")),
    ),
    h(IconButton, { icon: "x", onClick: onRemove, label: "Remove" }),
  );
}

function AddScheduleModal({ onClose, onSave, t }) {
  const [type, setType] = useState("training");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  return h(Modal, { onClose, title: t("schedule.add") },
    h("div", { className: "stack" },
      h("label", { className: "t-xs t-muted" }, "Type"),
      h("select", { className: "select input", value: type, onChange: e => setType(e.target.value) },
        ["training", "match", "mental", "rest"].map(ty => h("option", { key: ty, value: ty }, t(`schedule.type_${ty}`)))),
      h("label", { className: "t-xs t-muted" }, t("settings.name")),
      h(Input, { value: title, onChange: setTitle, placeholder: "Session title" }),
      h("label", { className: "t-xs t-muted" }, "Date"),
      h("input", { type: "date", className: "input", value: date, onChange: e => setDate(e.target.value) }),
      h("label", { className: "t-xs t-muted" }, "Notes"),
      h(Textarea, { value: notes, onChange: setNotes, rows: 2 }),
      h(Button, { variant: "primary", fullWidth: true, onClick: () => onSave({ type, date, title, notes }) }, t("common.save")),
    ),
  );
}

/* ────────────────────────── ONBOARDING ────────────────────────── */
function OnboardingPage() {
  const t = useT();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => SC.storage.getProfile());

  function next() {
    if (step < 3) setStep(step + 1);
    else finish();
  }
  function finish() {
    SC.storage.setProfile({ ...data, created_at: now() });
    SC.storage.setOnboarded(true);
    navigate("/Home");
  }

  const steps = [
    { key: "step_language", render: () => h("div", { className: "lang-grid" },
        SUPPORTED_LANGS.map(lng => {
          const meta = LANG_META[lng];
          const active = SC.i18n.getLang() === lng;
          return h("div", { key: lng, className: cx("lang-option", active && "active"), onClick: () => SC.i18n.setLang(lng) },
            h("div", { className: "lang-native" }, meta.native),
            h("div", { className: "lang-english" }, meta.english),
          );
        })) },
    { key: "step_name", render: () => h(Input, { value: data.name, onChange: v => setData({ ...data, name: v }), placeholder: t("onboarding.step_name_ph"), autoFocus: true }) },
    { key: "step_role", render: () => h("div", { className: "stack-sm" },
        ["batter", "bowler", "allrounder", "keeper", "fielder"].map(r =>
          h("div", { key: r, className: cx("lang-option", data.role === r && "active"), onClick: () => setData({ ...data, role: r }) },
            h("div", { className: "t-base t-semi" }, t(`settings.role_${r}`))))) },
    { key: "step_level", render: () => h("div", { className: "stack-sm" },
        ["beginner", "intermediate", "advanced", "pro"].map(lv =>
          h("div", { key: lv, className: cx("lang-option", data.level === lv && "active"), onClick: () => setData({ ...data, level: lv }) },
            h("div", { className: "t-base t-semi" }, t(`common.${lv}`))))) },
  ];

  const current = steps[step];

  return h("div", { className: "page", style: { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 20px" } },
    h("div", { style: { textAlign: "center", marginBottom: 32 } },
      h("div", { className: "sidebar-logo", style: { width: 56, height: 56, margin: "0 auto 16px", fontSize: 22 } }, "SC"),
      h("h1", { className: "page-title", style: { marginBottom: 8 } }, t("onboarding.welcome")),
      h("div", { className: "t-sm t-muted" }, t("onboarding.welcome_sub")),
    ),
    h("div", { className: "row", style: { gap: 6, justifyContent: "center", marginBottom: 24 } },
      steps.map((_, i) => h("div", { key: i, style: {
        width: 28, height: 4, borderRadius: 2,
        background: i <= step ? "#10b981" : "rgba(255,255,255,0.12)",
      } })),
    ),
    h(Card, { style: { marginBottom: 20 } },
      h("div", { className: "t-lg t-bold t-white", style: { marginBottom: 16 } }, t(`onboarding.${current.key}`)),
      current.render(),
    ),
    h(Button, { variant: "primary", size: "lg", fullWidth: true, iconRight: "arrow_right", onClick: next },
      step === steps.length - 1 ? t("onboarding.get_started") : t("common.next")),
  );
}
/* ============================================================================
 * NEW OSS INTEGRATIONS — Chart.js, Day.js, Fuse.js, Tone.js
 * All libraries loaded via CDN in index.html.
 * Each module is lazy — if the library failed to load, falls back gracefully.
 * ========================================================================= */

/* ────────────────────────── Day.js — localized dates ────────────────────────── */
SC.dates = (() => {
  const LOCALE_MAP = { en: "en", hi: "hi", ur: "ur", bn: "bn", ta: "ta", si: "si" };

  function ensureReady() {
    if (typeof window.dayjs !== "function") return false;
    if (window.dayjs_plugin_relativeTime) {
      try { window.dayjs.extend(window.dayjs_plugin_relativeTime); } catch {}
    }
    if (window.dayjs_plugin_localizedFormat) {
      try { window.dayjs.extend(window.dayjs_plugin_localizedFormat); } catch {}
    }
    applyLocale();
    return true;
  }

  function applyLocale() {
    const lang = SC.i18n?.getLang?.() || "en";
    const loc = LOCALE_MAP[lang] || "en";
    try { window.dayjs.locale(loc); } catch { try { window.dayjs.locale("en"); } catch {} }
  }

  function fromNow(ts) {
    if (!ensureReady() || ts == null) {
      // graceful fallback
      return humanDate(ts);
    }
    return window.dayjs(ts).fromNow();
  }

  function format(ts, fmt = "LL") {
    if (!ensureReady() || ts == null) return humanDate(ts);
    return window.dayjs(ts).format(fmt);
  }

  function shortDate(ts) {
    if (!ensureReady() || ts == null) return humanDate(ts);
    return window.dayjs(ts).format("ll");
  }

  // Re-apply locale whenever language changes
  on("sc_lang_changed", applyLocale);

  return { fromNow, format, shortDate, applyLocale };
})();


/* ────────────────────────── Fuse.js — fuzzy search ────────────────────────── */
SC.search = (() => {
  const indexes = {};

  function getIndex(name, items, keys) {
    if (typeof window.Fuse !== "function") return null;
    if (indexes[name]) return indexes[name];
    try {
      indexes[name] = new window.Fuse(items, {
        keys,
        threshold: 0.4,
        ignoreLocation: true,
        includeScore: false,
        minMatchCharLength: 2,
      });
      return indexes[name];
    } catch (err) { console.warn("[Fuse] index failed", err); return null; }
  }

  function search(name, query, items, keys) {
    if (!query || !query.trim()) return items;
    const idx = getIndex(name, items, keys);
    if (!idx) {
      // fallback: simple substring match on title
      const q = query.toLowerCase();
      return items.filter(i => (i.title || "").toLowerCase().includes(q));
    }
    return idx.search(query).map(r => r.item);
  }

  function invalidate(name) { delete indexes[name]; }

  return { search, invalidate };
})();


/* ────────────────────────── Tone.js — procedural audio ────────────────────────── */
SC.audio = (() => {
  let started = false;
  let enabled = SC.storage.get("sc_audio_enabled", true) !== false;
  let synth = null, bellSynth = null, kickSynth = null;

  async function ensureStarted() {
    if (!enabled) return false;
    if (typeof window.Tone === "undefined") return false;
    if (started) return true;
    try {
      if (window.Tone.context.state !== "running") {
        await window.Tone.start();
      }
      synth = new window.Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.02, decay: 0.15, sustain: 0.1, release: 0.4 },
      }).toDestination();
      synth.volume.value = -14;

      bellSynth = new window.Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.001, decay: 1.4, release: 0.5 },
        harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5,
      }).toDestination();
      bellSynth.volume.value = -28;

      kickSynth = new window.Tone.MembraneSynth({
        pitchDecay: 0.05, octaves: 4,
        envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.3 },
      }).toDestination();
      kickSynth.volume.value = -18;

      started = true;
      return true;
    } catch (err) { console.warn("[Tone] init failed", err); return false; }
  }

  function setEnabled(v) {
    enabled = !!v;
    SC.storage.set("sc_audio_enabled", enabled);
  }
  function isEnabled() { return enabled; }

  function play(which) {
    if (!enabled) return;
    ensureStarted().then(ok => {
      if (!ok || !synth) return;
      const now_ = window.Tone.now();
      try {
        switch (which) {
          case "xp":
            synth.triggerAttackRelease("E5", "16n", now_);
            synth.triggerAttackRelease("A5", "16n", now_ + 0.08);
            break;
          case "level_up":
            synth.triggerAttackRelease("E5", "8n", now_);
            synth.triggerAttackRelease("G5", "8n", now_ + 0.15);
            synth.triggerAttackRelease("C6", "4n", now_ + 0.3);
            break;
          case "drill_complete":
            synth.triggerAttackRelease("C5", "8n", now_);
            synth.triggerAttackRelease("E5", "8n", now_ + 0.1);
            synth.triggerAttackRelease("G5", "4n", now_ + 0.2);
            break;
          case "mental_start":
            if (bellSynth) bellSynth.triggerAttackRelease("C4", "2n", now_);
            break;
          case "mental_tick":
            synth.triggerAttackRelease("E4", "32n", now_);
            break;
          case "mental_complete":
            if (bellSynth) bellSynth.triggerAttackRelease("C4", "1n", now_);
            if (bellSynth) bellSynth.triggerAttackRelease("E4", "1n", now_ + 0.5);
            break;
          case "bowl":
            if (kickSynth) kickSynth.triggerAttackRelease("C2", "8n", now_);
            break;
          case "tap":
            synth.triggerAttackRelease("A5", "64n", now_);
            break;
        }
      } catch (err) { console.warn("[Tone] play failed", err); }
    });
  }

  // XP & level events → audio
  on("sc_xp_flash", () => play("xp"));
  on("sc_level_up", () => play("level_up"));

  return { play, setEnabled, isEnabled, ensureStarted };
})();


/* ────────────────────────── Chart.js — Progress visualizations ────────────────────────── */
SC.charts = (() => {
  // Dark-theme defaults applied once
  let themed = false;
  function applyTheme() {
    if (themed) return;
    if (typeof window.Chart === "undefined") return;
    try {
      window.Chart.defaults.color = "#94a3b8";
      window.Chart.defaults.font.family = "'Inter', -apple-system, sans-serif";
      window.Chart.defaults.font.size = 12;
      window.Chart.defaults.borderColor = "rgba(255,255,255,0.08)";
      themed = true;
    } catch (err) { console.warn("[Chart] theme failed", err); }
  }

  const CAT_COLORS = {
    batting: "#10b981", bowling: "#38bdf8", fielding: "#fbbf24",
    keeping: "#a78bfa", fitness: "#f43f5e", mental: "#8b5cf6",
  };

  function destroy(chart) {
    if (chart && typeof chart.destroy === "function") {
      try { chart.destroy(); } catch {}
    }
  }

  function radarSkill(canvas, progress, t) {
    if (typeof window.Chart === "undefined" || !canvas) return null;
    applyTheme();
    const labels = [
      t("drills.cat_batting"), t("drills.cat_bowling"), t("drills.cat_fielding"),
      t("drills.cat_keeping"), t("drills.cat_fitness"), t("nav.mental"),
    ];
    const data = [
      progress.xp_by_category.batting  || 0,
      progress.xp_by_category.bowling  || 0,
      progress.xp_by_category.fielding || 0,
      progress.xp_by_category.keeping  || 0,
      progress.xp_by_category.fitness  || 0,
      progress.xp_by_category.mental   || 0,
    ];
    try {
      return new window.Chart(canvas, {
        type: "radar",
        data: {
          labels,
          datasets: [{
            label: "XP",
            data,
            backgroundColor: "rgba(16,185,129,0.18)",
            borderColor: "#10b981",
            borderWidth: 2,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#0b0f1a",
            pointBorderWidth: 2,
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              angleLines: { color: "rgba(255,255,255,0.08)" },
              grid: { color: "rgba(255,255,255,0.08)" },
              pointLabels: { color: "#e5e7eb", font: { size: 11, weight: "600" } },
              ticks: { display: false, backdropColor: "transparent" },
              suggestedMin: 0,
            },
          },
        },
      });
    } catch (err) { console.warn("[Chart] radar failed", err); return null; }
  }

  function lineXpTrend(canvas, events, t) {
    if (typeof window.Chart === "undefined" || !canvas) return null;
    applyTheme();
    // last 30 days buckets
    const today = startOfDay(now());
    const days = Array.from({ length: 30 }, (_, i) => today - (29 - i) * 86400000);
    const xpByDay = Object.fromEntries(days.map(d => [d, 0]));
    events.forEach(ev => {
      const d = startOfDay(ev.timestamp);
      if (xpByDay[d] != null) xpByDay[d] += (ev.xp || 0);
    });
    const labels = days.map(d => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" }));
    const data = days.map(d => xpByDay[d]);
    try {
      return new window.Chart(canvas, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "XP",
            data,
            borderColor: "#10b981",
            backgroundColor: "rgba(16,185,129,0.12)",
            fill: true, tension: 0.35, borderWidth: 2,
            pointRadius: 0, pointHoverRadius: 5,
            pointHoverBackgroundColor: "#10b981",
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { maxTicksLimit: 6, color: "#6b7280" } },
            y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#6b7280" } },
          },
        },
      });
    } catch (err) { console.warn("[Chart] line failed", err); return null; }
  }

  function barWeeklyActivity(canvas, drillsEv, mentalEv, workoutEv, t) {
    if (typeof window.Chart === "undefined" || !canvas) return null;
    applyTheme();
    const today = startOfDay(now());
    const days = Array.from({ length: 7 }, (_, i) => today - (6 - i) * 86400000);
    const countBy = (evs, target) => evs.filter(e => startOfDay(e.timestamp) === target).length;
    const drillsData  = days.map(d => countBy(drillsEv, d));
    const mentalData  = days.map(d => countBy(mentalEv, d));
    const workoutData = days.map(d => countBy(workoutEv, d));
    const labels = days.map(d => new Date(d).toLocaleDateString(undefined, { weekday: "short" }));
    try {
      return new window.Chart(canvas, {
        type: "bar",
        data: {
          labels,
          datasets: [
            { label: t("progress.drills_done"), data: drillsData, backgroundColor: "#10b981", borderRadius: 6 },
            { label: t("progress.mental_done"), data: mentalData, backgroundColor: "#8b5cf6", borderRadius: 6 },
            { label: t("progress.workouts_done"), data: workoutData, backgroundColor: "#f43f5e", borderRadius: 6 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: true, position: "bottom",
              labels: { color: "#94a3b8", boxWidth: 10, boxHeight: 10, padding: 12, font: { size: 11 } } },
          },
          scales: {
            x: { stacked: false, grid: { display: false }, ticks: { color: "#6b7280" } },
            y: { stacked: false, beginAtZero: true, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#6b7280", stepSize: 1 } },
          },
        },
      });
    } catch (err) { console.warn("[Chart] bar failed", err); return null; }
  }

  return { radarSkill, lineXpTrend, barWeeklyActivity, destroy };
})();


/* ────────────────────────── SearchBar — React component using Fuse ────────────────────────── */
function SearchBar({ value, onChange, placeholder }) {
  return h("div", { className: "search-bar" },
    h(Icon, { name: "search", size: 18, className: "search-icon" }),
    h("input", {
      className: "search-input",
      type: "text",
      value: value || "",
      placeholder: placeholder,
      onChange: e => onChange(e.target.value),
    }),
    value && h("button", {
      className: "search-clear", type: "button",
      onClick: () => onChange(""),
      "aria-label": "Clear",
    }, h(Icon, { name: "x", size: 14 })),
  );
}


/* ────────────────────────── Audio toggle in Settings ────────────────────────── */
function AudioToggle() {
  const t = useT();
  const [on_, setOn] = useState(() => SC.audio.isEnabled());
  return h("div", { className: "row-between", style: { padding: "10px 0" } },
    h("div", null,
      h("div", { className: "t-base t-semi" }, t("settings.audio") || "Sound"),
      h("div", { className: "t-xs t-muted" }, t("settings.audio_sub") || "Chimes on timers, XP, level-ups"),
    ),
    h(Toggle, { checked: on_, onChange: (v) => { SC.audio.setEnabled(v); setOn(v); if (v) SC.audio.play("tap"); } }),
  );
}


console.log("[SmartCrick] OSS modules loaded: Chart.js, Day.js, Fuse.js, Tone.js");


/* ────────────────────────── @formkit/auto-animate — effortless list animations ────────────────────────── */
SC.anim = (() => {
  function apply(el, options = {}) {
    if (!el) return;
    if (typeof window.autoAnimate !== "function") return;
    try { window.autoAnimate(el, { duration: 200, easing: "ease-in-out", ...options }); }
    catch (err) { console.warn("[auto-animate] apply failed", err); }
  }
  return { apply };
})();

function useAutoAnimate() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    // Retry a couple times if autoAnimate hasn't loaded yet
    let tries = 0;
    const tryApply = () => {
      if (typeof window.autoAnimate === "function") { SC.anim.apply(ref.current); return; }
      if (tries++ > 20) return;
      setTimeout(tryApply, 100);
    };
    tryApply();
  }, []);
  return ref;
}


/* ────────────────────────── jsPDF — export Progress Report ────────────────────────── */
SC.pdf = (() => {
  function ensureReady() {
    return typeof window.jspdf !== "undefined" && typeof window.jspdf.jsPDF === "function";
  }

  function exportProgressReport() {
    if (!ensureReady()) {
      alert("PDF engine is still loading. Please try again in a moment.");
      return;
    }
    const { jsPDF } = window.jspdf;
    const profile = SC.storage.getProfile();
    const progress = SC.storage.getProgress();
    const drills = SC.storage.getCompletedDrills();
    const mental = SC.storage.getCompletedMental();
    const workouts = SC.storage.getCompletedWorkouts();
    const levelInfo = levelFromXp(progress.total_xp);

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();

    // Header band
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pw, 90, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold"); doc.setFontSize(22);
    doc.text("SmartCrick AI — Progress Report", 40, 44);
    doc.setFont("helvetica", "normal"); doc.setFontSize(11);
    doc.text(new Date().toLocaleDateString(undefined, { dateStyle: "full" }), 40, 66);

    let y = 120;
    doc.setTextColor(20, 24, 40);
    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("Athlete", 40, y); y += 22;
    doc.setFont("helvetica", "normal"); doc.setFontSize(12);
    doc.text(`Name: ${profile.name || "—"}`, 40, y); y += 18;
    doc.text(`Role: ${profile.role || "—"}`, 40, y); y += 18;
    doc.text(`Level: ${profile.level || "—"}`, 40, y); y += 30;

    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("Overall", 40, y); y += 22;
    doc.setFont("helvetica", "normal"); doc.setFontSize(12);
    doc.text(`Total XP: ${progress.total_xp.toLocaleString()}`, 40, y); y += 18;
    doc.text(`Current level: ${levelInfo.level}`, 40, y); y += 18;
    doc.text(`Current streak: ${progress.streak} day${progress.streak === 1 ? "" : "s"}`, 40, y); y += 18;
    doc.text(`Drills completed: ${drills.length}`, 40, y); y += 18;
    doc.text(`Mental sessions: ${mental.length}`, 40, y); y += 18;
    doc.text(`Workouts finished: ${workouts.length}`, 40, y); y += 30;

    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("XP by category", 40, y); y += 22;
    doc.setFont("helvetica", "normal"); doc.setFontSize(12);
    ["batting", "bowling", "fielding", "keeping", "fitness", "mental"].forEach(cat => {
      const xp = progress.xp_by_category[cat] || 0;
      const pctVal = progress.total_xp > 0 ? Math.round(xp / progress.total_xp * 100) : 0;
      doc.text(`${cat.charAt(0).toUpperCase() + cat.slice(1)}: ${xp.toLocaleString()} XP (${pctVal}%)`, 40, y);
      // bar
      doc.setFillColor(230, 232, 236);
      doc.rect(300, y - 10, 200, 10, "F");
      doc.setFillColor(16, 185, 129);
      doc.rect(300, y - 10, Math.max(2, pctVal * 2), 10, "F");
      y += 20;
    });
    y += 20;

    if (y > ph - 120) { doc.addPage(); y = 60; }
    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    doc.text("Last 10 sessions", 40, y); y += 22;
    doc.setFont("helvetica", "normal"); doc.setFontSize(11);
    const recent = [
      ...drills.map(d => ({ type: "Drill", cat: d.category, xp: d.xp, ts: d.timestamp })),
      ...mental.map(m => ({ type: "Mental", cat: m.category || "mental", xp: m.xp, ts: m.timestamp })),
      ...workouts.map(w => ({ type: "Workout", cat: "fitness", xp: w.xp, ts: w.timestamp })),
    ].sort((a, b) => b.ts - a.ts).slice(0, 10);
    if (recent.length === 0) {
      doc.text("No sessions logged yet.", 40, y); y += 18;
    } else {
      recent.forEach(ev => {
        if (y > ph - 60) { doc.addPage(); y = 60; }
        const when = new Date(ev.ts).toLocaleDateString();
        doc.text(`${when}  —  ${ev.type} (${ev.cat})  +${ev.xp} XP`, 40, y);
        y += 16;
      });
    }

    // Footer on each page
    const pages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p);
      doc.setFontSize(9); doc.setTextColor(150, 160, 180);
      doc.text(`SmartCrick AI  ·  Page ${p} of ${pages}`, pw / 2, ph - 24, { align: "center" });
    }

    doc.save(`smartcrick-progress-${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  return { exportProgressReport };
})();


/* ────────────────────────── Enhanced completion-state helpers ────────────────────────── */
SC.state = (() => {
  function getCompletedDrillIds() {
    return new Set(SC.storage.getCompletedDrills().map(d => d.drill_id));
  }
  function getCompletedMentalIds() {
    return new Set(SC.storage.getCompletedMental().map(m => m.session_id));
  }
  function getLastEventTimestamp() {
    const all = [
      ...SC.storage.getCompletedDrills().map(d => d.timestamp),
      ...SC.storage.getCompletedMental().map(m => m.timestamp),
      ...SC.storage.getCompletedWorkouts().map(w => w.timestamp),
    ];
    if (all.length === 0) return null;
    return Math.max(...all);
  }
  function getLastSessionSummary() {
    const drills = SC.storage.getCompletedDrills().sort((a, b) => b.timestamp - a.timestamp);
    const mental = SC.storage.getCompletedMental().sort((a, b) => b.timestamp - a.timestamp);
    const workouts = SC.storage.getCompletedWorkouts().sort((a, b) => b.timestamp - a.timestamp);
    const candidates = [
      drills[0] && { kind: "drill", ts: drills[0].timestamp, cat: drills[0].category, xp: drills[0].xp, item_id: drills[0].drill_id },
      mental[0] && { kind: "mental", ts: mental[0].timestamp, cat: mental[0].category, xp: mental[0].xp, item_id: mental[0].session_id },
      workouts[0] && { kind: "workout", ts: workouts[0].timestamp, cat: "fitness", xp: workouts[0].xp, item_id: workouts[0].workout_id },
    ].filter(Boolean);
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => b.ts - a.ts);
    return candidates[0];
  }
  return { getCompletedDrillIds, getCompletedMentalIds, getLastEventTimestamp, getLastSessionSummary };
})();


console.log("[SmartCrick] Extended OSS: auto-animate, jsPDF, Mousetrap ready");
/* ============================================================================
 * APP ROOT — routing, sidebar, bottom nav, and mount
 * ========================================================================= */

function Sidebar({ onNav }) {
  const t = useT();
  const route = useRoute();
  const items = [
    { id: "Home",    icon: "home",       key: "nav.home" },
    { id: "Drills",  icon: "swords",     key: "nav.drills" },
    { id: "Mental",  icon: "brain",      key: "nav.mental" },
    { id: "Workouts", icon: "dumbbell",  key: "nav.workouts" },
    { id: "Schedule", icon: "calendar",  key: "nav.schedule" },
    { id: "Progress", icon: "bar_chart", key: "nav.progress" },
  ];
  const toolItems = [
    { id: "BowlingScience", icon: "waves", key: "nav.physics" },
  ];

  return h("aside", { className: "sidebar" },
    h("div", { className: "sidebar-header" },
      h("div", { className: "sidebar-logo" }, "SC"),
      h("div", null,
        h("div", { className: "sidebar-title" }, "SmartCrick"),
        h("div", { className: "t-xs t-muted" }, "AI"),
      ),
    ),
    items.map(it => h("a", {
      key: it.id,
      className: cx("sidebar-item", route.page === it.id && "active"),
      onClick: () => onNav ? onNav(it.id) : navigate("/" + it.id),
    },
      h(Icon, { name: it.icon, size: 18 }),
      h("span", null, t(it.key)),
    )),
    h("div", { className: "sidebar-section" }, t("nav.tools")),
    toolItems.map(it => h("a", {
      key: it.id,
      className: cx("sidebar-item", route.page === it.id && "active"),
      onClick: () => onNav ? onNav(it.id) : navigate("/" + it.id),
    },
      h(Icon, { name: it.icon, size: 18 }),
      h("span", null, t(it.key)),
    )),
    h("div", { style: { flex: 1 } }),
    h("a", {
      className: cx("sidebar-item", route.page === "Premium" && "active"),
      onClick: () => onNav ? onNav("Premium") : navigate("/Premium"),
    },
      h(Icon, { name: "crown", size: 18, className: "t-amber" }),
      h("span", null, t("nav.premium")),
    ),
    h("a", {
      className: cx("sidebar-item", route.page === "Settings" && "active"),
      onClick: () => onNav ? onNav("Settings") : navigate("/Settings"),
    },
      h(Icon, { name: "settings", size: 18 }),
      h("span", null, t("nav.settings")),
    ),
  );
}

function BottomNav() {
  const t = useT();
  const route = useRoute();
  const items = [
    { id: "Home",    icon: "home",      key: "nav.home" },
    { id: "Drills",  icon: "swords",    key: "nav.drills" },
    { id: "Mental",  icon: "brain",     key: "nav.mental" },
    { id: "Workouts", icon: "dumbbell", key: "nav.workouts" },
    { id: "Progress", icon: "bar_chart", key: "nav.progress" },
  ];
  return h("nav", { className: "bottom-nav" },
    items.map(it => h("a", {
      key: it.id,
      className: cx("bottom-nav-item", route.page === it.id && "active"),
      onClick: () => navigate("/" + it.id),
    },
      h(Icon, { name: it.icon, size: 22 }),
      h("span", null, t(it.key)),
    )),
  );
}

function MobileTopBar({ onMenu }) {
  const t = useT();
  return h("div", { className: "top-bar" },
    h(IconButton, { icon: "menu", onClick: onMenu, label: "Menu" }),
    h("div", { className: "sidebar-logo", style: { width: 32, height: 32, fontSize: 13 } }, "SC"),
    h("div", { style: { width: 40 } }), // spacer for balance
  );
}

function MobileMenu({ onClose }) {
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);

  function close() {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    setTimeout(onClose, 200);
  }

  return h(F, null,
    h("div", { className: cx("sidebar-backdrop", closing && "closing"), onClick: close }),
    h("div", { className: cx("sidebar-panel", closing && "closing") },
      h(Sidebar, { onNav: (page) => { navigate("/" + page); close(); } }),
    ),
  );
}

/* ────────────────────────── Router ────────────────────────── */
function Router() {
  const route = useRoute();
  useLangTick();
  const isOnboarded = SC.storage.isOnboarded();

  // Force onboarding if not done — redirect cleanly via effect, not render
  useEffect(() => {
    if (!isOnboarded && route.page !== "Onboarding") {
      navigate("/Onboarding");
    }
  }, [isOnboarded, route.page]);

  if (!isOnboarded && route.page !== "Onboarding") {
    return h(OnboardingPage);
  }

  switch (route.page) {
    case "Home":           return h(HomePage);
    case "Drills":         return route.params[0] ? h(DrillDetailPage) : h(DrillsPage);
    case "Mental":         return route.params[0] ? h(MentalDetailPage) : h(MentalPage);
    case "Workouts":       return h(WorkoutsPage);
    case "BowlingScience": return h(BowlingSciencePage);
    case "Progress":       return h(ProgressPage);
    case "Premium":        return h(PremiumPage);
    case "Settings":       return h(SettingsPage);
    case "Schedule":       return h(SchedulePage);
    case "Onboarding":     return h(OnboardingPage);
    default:               return h(HomePage);
  }
}

/* ────────────────────────── App ────────────────────────── */
function App() {
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide boot loader once mounted
  useEffect(() => {
    const loader = document.getElementById("boot-loader");
    if (loader) {
      loader.classList.add("done");
      setTimeout(() => loader.remove(), 400);
    }
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [route.page]);

  // Skip chrome on onboarding
  const isOnboarding = route.page === "Onboarding" || !SC.storage.isOnboarded();

  if (isOnboarding) {
    return h(F, null, h(Router), h(XpFlashHost));
  }

  return h("div", { className: "app-shell" },
    h(Sidebar),
    h("div", { className: "main-scroll" },
      h(MobileTopBar, { onMenu: () => setMenuOpen(true) }),
      h(Router),
    ),
    h(BottomNav),
    menuOpen && h(MobileMenu, { onClose: () => setMenuOpen(false) }),
    h(XpFlashHost),
  );
}

/* ────────────────────────── Mount ────────────────────────── */
let mountAttempts = 0;
const MAX_MOUNT_ATTEMPTS = 100; // 5 seconds @ 50ms each

function showBootError(title, detail) {
  const loader = document.getElementById("boot-loader");
  if (loader) { loader.classList.add("done"); setTimeout(() => loader.remove(), 400); }
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = `
    <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;text-align:center;background:radial-gradient(ellipse at top,#0f1a2e 0%,#0b0f1a 60%);color:#e5e7eb;font-family:Inter,sans-serif">
      <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,#f43f5e,#e11d48);display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:24px;margin-bottom:20px">!</div>
      <h2 style="font-size:20px;font-weight:800;color:#fff;margin-bottom:8px">${title}</h2>
      <p style="color:#94a3b8;font-size:14px;max-width:400px;line-height:1.6;margin-bottom:20px">${detail}</p>
      <button onclick="location.reload()" style="padding:12px 24px;border-radius:12px;background:#10b981;color:white;border:0;font-weight:700;font-size:14px;cursor:pointer">Refresh</button>
    </div>`;
}

function mountApp() {
  if (typeof React === "undefined" || typeof ReactDOM === "undefined") {
    mountAttempts++;
    if (mountAttempts > MAX_MOUNT_ATTEMPTS) {
      showBootError("Couldn't load React",
        "The core framework didn't load from CDN. Check your internet connection and try refreshing. If the problem persists, your network may be blocking cdn.jsdelivr.net or unpkg.com.");
      return;
    }
    setTimeout(mountApp, 50);
    return;
  }
  const rootEl = document.getElementById("root");
  if (!rootEl) {
    console.error("[SmartCrick] #root element not found");
    return;
  }
  try {
    const root = ReactDOM.createRoot(rootEl);
    root.render(h(App));
    console.log("[SmartCrick] App mounted ✓");
    // Wire up keyboard shortcuts once React is up
    if (typeof Mousetrap !== "undefined") { initKeyboardShortcuts(); }
  } catch (err) {
    console.error("[SmartCrick] mount failed", err);
    showBootError("Something went wrong",
      "The app hit an error while starting up. Try refreshing — and if it keeps happening, clearing your browser cache usually fixes it.<br><br><code style='font-size:11px;color:#6b7280;display:inline-block;margin-top:8px'>" + (err?.message || err) + "</code>");
  }
}

// Mousetrap keyboard shortcuts — power-user navigation
function initKeyboardShortcuts() {
  if (typeof Mousetrap === "undefined") return;
  try {
    Mousetrap.bind("g h", () => navigate("/Home"));
    Mousetrap.bind("g d", () => navigate("/Drills"));
    Mousetrap.bind("g m", () => navigate("/Mental"));
    Mousetrap.bind("g w", () => navigate("/Workouts"));
    Mousetrap.bind("g p", () => navigate("/Progress"));
    Mousetrap.bind("g b", () => navigate("/BowlingScience"));
    Mousetrap.bind("g s", () => navigate("/Settings"));
    Mousetrap.bind("g c", () => navigate("/Schedule"));
    Mousetrap.bind("?", () => alert("Shortcuts:\ng h — Home\ng d — Drills\ng m — Mental\ng w — Workouts\ng p — Progress\ng b — Bowling Lab\ng c — Schedule\ng s — Settings\n? — This help"));
    console.log("[SmartCrick] Keyboard shortcuts active (type ? for help)");
  } catch (err) { console.warn("[Mousetrap] bind failed", err); }
}

// Wait for DOM + CDN libs
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(mountApp, 50));
} else {
  setTimeout(mountApp, 50);
}
