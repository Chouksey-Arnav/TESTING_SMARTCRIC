(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react3 = __require("react");

  // node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

  // node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react2 = __require("react");

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };

  // node_modules/lucide-react/dist/esm/context.js
  var import_react = __require("react");
  var LucideContext = (0, import_react.createContext)({});
  var useLucideContext = () => (0, import_react.useContext)(LucideContext);

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react2.forwardRef)(
    ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
      const {
        size: contextSize = 24,
        strokeWidth: contextStrokeWidth = 2,
        absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
        color: contextColor = "currentColor",
        className: contextClass = ""
      } = useLucideContext() ?? {};
      const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
      return (0, import_react2.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size ?? contextSize ?? defaultAttributes.width,
          height: size ?? contextSize ?? defaultAttributes.height,
          stroke: color ?? contextColor,
          strokeWidth: calculatedStrokeWidth,
          className: mergeClasses("lucide", contextClass, className),
          ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react2.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react3.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react3.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/arrow-left.js
  var __iconNode = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ];
  var ArrowLeft = createLucideIcon("arrow-left", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/award.js
  var __iconNode2 = [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        key: "1yiouv"
      }
    ],
    ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
  ];
  var Award = createLucideIcon("award", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/bell.js
  var __iconNode3 = [
    ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
    [
      "path",
      {
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
        key: "11g9vi"
      }
    ]
  ];
  var Bell = createLucideIcon("bell", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/book-open.js
  var __iconNode4 = [
    ["path", { d: "M12 7v14", key: "1akyts" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
        key: "ruj8y"
      }
    ]
  ];
  var BookOpen = createLucideIcon("book-open", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/bookmark.js
  var __iconNode5 = [
    [
      "path",
      {
        d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
        key: "oz39mx"
      }
    ]
  ];
  var Bookmark = createLucideIcon("bookmark", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/brain.js
  var __iconNode6 = [
    ["path", { d: "M12 18V5", key: "adv99a" }],
    ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
    ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
    ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
    ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
    ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
    ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
    ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
  ];
  var Brain = createLucideIcon("brain", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/calendar.js
  var __iconNode7 = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
    ["path", { d: "M3 10h18", key: "8toen8" }]
  ];
  var Calendar = createLucideIcon("calendar", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js
  var __iconNode8 = [
    ["path", { d: "M5 21v-6", key: "1hz6c0" }],
    ["path", { d: "M12 21V3", key: "1lcnhd" }],
    ["path", { d: "M19 21V9", key: "unv183" }]
  ];
  var ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/check.js
  var __iconNode9 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("check", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var __iconNode10 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("chevron-down", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/chevron-right.js
  var __iconNode11 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var ChevronRight = createLucideIcon("chevron-right", __iconNode11);

  // node_modules/lucide-react/dist/esm/icons/chevron-up.js
  var __iconNode12 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
  var ChevronUp = createLucideIcon("chevron-up", __iconNode12);

  // node_modules/lucide-react/dist/esm/icons/circle-check.js
  var __iconNode13 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var CircleCheck = createLucideIcon("circle-check", __iconNode13);

  // node_modules/lucide-react/dist/esm/icons/circle-question-mark.js
  var __iconNode14 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ];
  var CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode14);

  // node_modules/lucide-react/dist/esm/icons/clock.js
  var __iconNode15 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
  ];
  var Clock = createLucideIcon("clock", __iconNode15);

  // node_modules/lucide-react/dist/esm/icons/crown.js
  var __iconNode16 = [
    [
      "path",
      {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
        key: "1vdc57"
      }
    ],
    ["path", { d: "M5 21h14", key: "11awu3" }]
  ];
  var Crown = createLucideIcon("crown", __iconNode16);

  // node_modules/lucide-react/dist/esm/icons/dumbbell.js
  var __iconNode17 = [
    [
      "path",
      {
        d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
        key: "9m4mmf"
      }
    ],
    ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
    ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
    [
      "path",
      {
        d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
        key: "1t2c92"
      }
    ],
    ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
  ];
  var Dumbbell = createLucideIcon("dumbbell", __iconNode17);

  // node_modules/lucide-react/dist/esm/icons/flame.js
  var __iconNode18 = [
    [
      "path",
      {
        d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
        key: "1slcih"
      }
    ]
  ];
  var Flame = createLucideIcon("flame", __iconNode18);

  // node_modules/lucide-react/dist/esm/icons/frown.js
  var __iconNode19 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2", key: "epbg0q" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
  ];
  var Frown = createLucideIcon("frown", __iconNode19);

  // node_modules/lucide-react/dist/esm/icons/heart.js
  var __iconNode20 = [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
        key: "mvr1a0"
      }
    ]
  ];
  var Heart = createLucideIcon("heart", __iconNode20);

  // node_modules/lucide-react/dist/esm/icons/history.js
  var __iconNode21 = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
    ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
  ];
  var History = createLucideIcon("history", __iconNode21);

  // node_modules/lucide-react/dist/esm/icons/house.js
  var __iconNode22 = [
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "r6nss1"
      }
    ]
  ];
  var House = createLucideIcon("house", __iconNode22);

  // node_modules/lucide-react/dist/esm/icons/layers.js
  var __iconNode23 = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
        key: "zw3jo"
      }
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
        key: "1wduqc"
      }
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
        key: "kqbvx6"
      }
    ]
  ];
  var Layers = createLucideIcon("layers", __iconNode23);

  // node_modules/lucide-react/dist/esm/icons/list.js
  var __iconNode24 = [
    ["path", { d: "M3 5h.01", key: "18ugdj" }],
    ["path", { d: "M3 12h.01", key: "nlz23k" }],
    ["path", { d: "M3 19h.01", key: "noohij" }],
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M8 12h13", key: "1za7za" }],
    ["path", { d: "M8 19h13", key: "m83p4d" }]
  ];
  var List = createLucideIcon("list", __iconNode24);

  // node_modules/lucide-react/dist/esm/icons/lock.js
  var __iconNode25 = [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
  ];
  var Lock = createLucideIcon("lock", __iconNode25);

  // node_modules/lucide-react/dist/esm/icons/meh.js
  var __iconNode26 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "8", x2: "16", y1: "15", y2: "15", key: "1xb1d9" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
  ];
  var Meh = createLucideIcon("meh", __iconNode26);

  // node_modules/lucide-react/dist/esm/icons/menu.js
  var __iconNode27 = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }]
  ];
  var Menu = createLucideIcon("menu", __iconNode27);

  // node_modules/lucide-react/dist/esm/icons/message-circle.js
  var __iconNode28 = [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s"
      }
    ]
  ];
  var MessageCircle = createLucideIcon("message-circle", __iconNode28);

  // node_modules/lucide-react/dist/esm/icons/mic.js
  var __iconNode29 = [
    ["path", { d: "M12 19v3", key: "npa21l" }],
    ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
    ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3", key: "s6n7sd" }]
  ];
  var Mic = createLucideIcon("mic", __iconNode29);

  // node_modules/lucide-react/dist/esm/icons/moon.js
  var __iconNode30 = [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
        key: "kfwtm"
      }
    ]
  ];
  var Moon = createLucideIcon("moon", __iconNode30);

  // node_modules/lucide-react/dist/esm/icons/pencil.js
  var __iconNode31 = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ];
  var Pencil = createLucideIcon("pencil", __iconNode31);

  // node_modules/lucide-react/dist/esm/icons/play.js
  var __iconNode32 = [
    [
      "path",
      {
        d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
        key: "10ikf1"
      }
    ]
  ];
  var Play = createLucideIcon("play", __iconNode32);

  // node_modules/lucide-react/dist/esm/icons/refresh-cw.js
  var __iconNode33 = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ];
  var RefreshCw = createLucideIcon("refresh-cw", __iconNode33);

  // node_modules/lucide-react/dist/esm/icons/rocket.js
  var __iconNode34 = [
    ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }],
    [
      "path",
      {
        d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
        key: "u4xsad"
      }
    ],
    [
      "path",
      {
        d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
        key: "676m9"
      }
    ],
    ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05", key: "92ym6u" }]
  ];
  var Rocket = createLucideIcon("rocket", __iconNode34);

  // node_modules/lucide-react/dist/esm/icons/search.js
  var __iconNode35 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  var Search = createLucideIcon("search", __iconNode35);

  // node_modules/lucide-react/dist/esm/icons/settings.js
  var __iconNode36 = [
    [
      "path",
      {
        d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
        key: "1i5ecw"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ];
  var Settings = createLucideIcon("settings", __iconNode36);

  // node_modules/lucide-react/dist/esm/icons/shield.js
  var __iconNode37 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ];
  var Shield = createLucideIcon("shield", __iconNode37);

  // node_modules/lucide-react/dist/esm/icons/smile.js
  var __iconNode38 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }]
  ];
  var Smile = createLucideIcon("smile", __iconNode38);

  // node_modules/lucide-react/dist/esm/icons/sparkles.js
  var __iconNode39 = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ];
  var Sparkles = createLucideIcon("sparkles", __iconNode39);

  // node_modules/lucide-react/dist/esm/icons/star.js
  var __iconNode40 = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ];
  var Star = createLucideIcon("star", __iconNode40);

  // node_modules/lucide-react/dist/esm/icons/sun.js
  var __iconNode41 = [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
    ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
    ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
  ];
  var Sun = createLucideIcon("sun", __iconNode41);

  // node_modules/lucide-react/dist/esm/icons/target.js
  var __iconNode42 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
  ];
  var Target = createLucideIcon("target", __iconNode42);

  // node_modules/lucide-react/dist/esm/icons/trending-down.js
  var __iconNode43 = [
    ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
    ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
  ];
  var TrendingDown = createLucideIcon("trending-down", __iconNode43);

  // node_modules/lucide-react/dist/esm/icons/trending-up.js
  var __iconNode44 = [
    ["path", { d: "M16 7h6v6", key: "box55l" }],
    ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
  ];
  var TrendingUp = createLucideIcon("trending-up", __iconNode44);

  // node_modules/lucide-react/dist/esm/icons/trophy.js
  var __iconNode45 = [
    ["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978", key: "1n3hpd" }],
    ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978", key: "rfe1zi" }],
    ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }],
    ["path", { d: "M4 22h16", key: "57wxv0" }],
    ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }],
    ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }]
  ];
  var Trophy = createLucideIcon("trophy", __iconNode45);

  // node_modules/lucide-react/dist/esm/icons/user.js
  var __iconNode46 = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
  ];
  var User = createLucideIcon("user", __iconNode46);

  // node_modules/lucide-react/dist/esm/icons/video.js
  var __iconNode47 = [
    [
      "path",
      {
        d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
        key: "ftymec"
      }
    ],
    ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
  ];
  var Video = createLucideIcon("video", __iconNode47);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode48 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode48);

  // node_modules/lucide-react/dist/esm/icons/zap.js
  var __iconNode49 = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db"
      }
    ]
  ];
  var Zap = createLucideIcon("zap", __iconNode49);

  // src/data.js
  function makeSteps(title, secs, cat) {
    const cores = {
      confidence: "Recall your three most powerful performances. See yourself at your best. Your body knows how to perform. Trust it completely. Feel the confidence rising.",
      focus: "Narrow your attention to a single point. Let distracting thoughts float past like clouds. Return to your anchor. Pure, clean, locked-in focus is your natural state.",
      recovery: "Release the tension. Forgive what happened. Every great player bounces back. You are not your last performance. Reset. Refresh. Return stronger.",
      "pre-performance": "You have prepared. You are ready. Feel your body activate with controlled energy. Channel the nerves into sharpness. Your skills are ready to flow.",
      pressure: "Pressure is the weight of opportunity. You welcome it. Breathe into the challenge. The game slows down when your mind is still. You are the calmest person on the field.",
      visualization: "Paint a vivid, detailed mental image of perfect execution. See your technique. Feel the timing. Hear the sound. Your brain cannot tell the difference between a vivid image and reality.",
      "match-day-calm": "Today is the day. You are ready. Calm and energized. Focus on your process, not the result. Play one ball at a time. Trust your preparation.",
      "pro-mental": "Champions operate at this level \u2014 fully present, fully committed, fully trusting their game. There is no outcome \u2014 only process. Your mind is your greatest weapon."
    };
    const b = Math.min(30, Math.floor(secs * 0.12));
    const main = Math.floor(secs * 0.65);
    const end = secs - b - Math.floor(secs * 0.12);
    return [
      { instruction: "Find a comfortable position. Close your eyes. Take three slow deep breaths. Let go of everything outside this session.", duration_seconds: b },
      { instruction: "This is your dedicated " + title + " session. Focus your full attention. Let the process work.", duration_seconds: Math.floor(secs * 0.1) },
      { instruction: cores[cat] || cores.focus, duration_seconds: main },
      { instruction: "As this session closes, take two slow deep breaths. Bring your awareness back. Carry what you have built into your next performance.", duration_seconds: end }
    ];
  }
  function mr(id, title, cat, secs, xp, premium) {
    return {
      id,
      title,
      category: cat,
      duration_seconds: secs,
      xp_value: xp,
      is_premium: !!premium,
      description: Math.floor(secs / 60) + "-minute " + cat.replace("-", " ") + " session.",
      steps: makeSteps(title, secs, cat)
    };
  }
  var jokes = [
    "Why did the cricket team go to the bank? To get their bowler!",
    "What do you call a cricket match in winter? A snow bowl!",
    "Why dont cricketers ever get lost? They always follow the pitch!",
    "Whats a cricketers favorite type of music? Swing!",
    "Why did the batsman bring string to the match? To tie the score!",
    "What do you call a cricket player whos always cold? A chilly fielder!",
    "Whats a bowlers favorite subject? Spin class!",
    "Why did the cricket bat go to the doctor? It had a bad case of the runs!",
    "Why was the cricket stadium so hot? All the fans left!",
    "What did the cricket ball say to the bat? Catch you later!",
    "Why dont cricket players ever get hungry? Theyre always at the crease!",
    "What did one cricket stump say to the other? Youre bailing on me!",
    "Why cant cricketers ever win at chess? They always think its a draw!",
    "What do you call a cricket player who becomes a chef? A batter!",
    "What do you call a cricket match between cats? A meow-t!",
    "Whats a batsmans favorite dessert? A sweet spot!",
    "What do you call a cricketer with perfect hair? Well-groomed for the crease!",
    "What do you call a cricket match with no boundaries? Very limited overs!",
    "What do you call a fast bowler who can cook? A microwave \u2014 always heating things up!",
    "What do you call a cricketer who loses every toss? A coin flipper with no luck!",
    "Whats a spiders favorite fielding position? Silly mid-on, right in the web!",
    "What do you call a cricketer whos always early? A pre-match overachiever!",
    "What do you call a cricket match between accountants? A long-run affair!",
    "What do you call a cricket bat with no willow? A real stick in the mud!",
    "Did the cricket team open a bakery? They knew how to roll the dough!",
    "Whats a cricketers favourite superhero? Captain No-Ball Man!",
    "Why did the cricket coach bring scissors to training? To cut short the bad overs!",
    "Why do cricket bowlers make great musicians? They always find the perfect pitch!",
    "What did the cricket bat say at the end of the season? Im absolutely stumped!",
    "Why did the fielder bring a compass? He kept losing his position at square leg!"
  ];
  var facts = [
    "The fastest recorded cricket ball was bowled at 161.3 km/h by Shoaib Akhtar!",
    "The longest cricket match lasted 14 days between England and South Africa in 1939!",
    "Sachin Tendulkar holds the record for most runs in international cricket with 34,357!",
    "The first-ever Test match was played in 1877 between Australia and England!",
    "The highest team score in ODI cricket is 498/4 by England against Netherlands!",
    "Muttiah Muralitharan has the most Test wickets with 800!",
    "The Cricket World Cup trophy weighs 11 kilograms!",
    "The term duck comes from ducks egg because 0 looks like an egg!",
    "India has won the Cricket World Cup twice: 1983 and 2011!",
    "The fastest Test century was scored in 35 balls by AB de Villiers!",
    "Cricket stumps are exactly 28 inches (71.1 cm) high!",
    "Shane Warnes Ball of the Century spun 18 inches!",
    "Brian Lara holds the record for highest Test innings: 400 not out!",
    "The DRS Decision Review System was first used in 2008!",
    "The fastest ODI century was scored in 31 balls by AB de Villiers!",
    "Women's cricket was first played in 1745 in England!",
    "The googly was invented by Bernard Bosanquet in 1900!",
    "MS Dhoni's lightning-fast stumping can happen in under 0.1 seconds!",
    "Don Bradman's average of 99.94 is considered the greatest statistical achievement in sport.",
    "Chris Gayle is the only player to hit a six off the first ball of a Test match!",
    "A cricket ball weighs between 155.9 and 163 grams \u2014 precisely regulated.",
    "India's 2011 World Cup win was watched by over 1 billion people live!",
    "The first Cricket World Cup was held in England in 1975 and won by the West Indies.",
    "The highest partnership in Test cricket is 624 runs by Jayawardene and Sangakkara.",
    "T20 cricket was introduced in England in 2003 to attract younger audiences.",
    "Cricket is the second most popular sport in the world after football!",
    "A cricket ball swings more when one side is polished and the other is rough.",
    "Sachin Tendulkar scored 100 international centuries \u2014 a record that may never be broken.",
    "MS Dhoni invented the helicopter shot \u2014 a unique scoop-sweep innovation!",
    "Jonty Rhodes revolutionized fielding standards in the 1990s with his athletic diving stops!"
  ];
  var mentalRoutines = [
    mr("m001", "Micro Focus Burst", "focus", 180, 35),
    mr("m002", "Physiological Sigh", "recovery", 180, 35),
    mr("m003", "Reset Button", "recovery", 240, 45),
    mr("m004", "Focus Next Ball", "focus", 240, 45),
    mr("m005", "Morning Positivity Charge", "confidence", 240, 40),
    mr("m006", "5-4-3-2-1 Grounding", "match-day-calm", 300, 50),
    mr("m007", "Countdown to Clarity", "focus", 300, 50),
    mr("m008", "Power Pose Reset", "confidence", 300, 50),
    mr("m009", "Confidence Countdown", "confidence", 300, 50),
    mr("m010", "10-Second Rule", "pressure", 300, 50),
    mr("m011", "Celebrate Small Wins", "confidence", 300, 50),
    mr("m012", "Focus Lock-In", "focus", 300, 50),
    mr("m013", "2-Minute Warrior", "confidence", 300, 50),
    mr("m014", "Micro-Win Review", "confidence", 300, 50),
    mr("m015", "Self-Compassion Break", "recovery", 300, 50),
    mr("m016", "Embracing Change", "recovery", 300, 50),
    mr("m017", "Pre-Game Activation", "pre-performance", 300, 50),
    mr("m018", "Gratitude for Journey", "recovery", 300, 50),
    mr("m019", "Deep Calm Breathing", "match-day-calm", 300, 50),
    mr("m020", "Positive Morning Anchor", "confidence", 300, 50),
    mr("m021", "Mental Recovery Sprint", "recovery", 300, 50),
    mr("m022", "Win the Morning", "confidence", 300, 50),
    mr("m023", "Breathe Through Anger", "pressure", 300, 50),
    mr("m024", "Team Player Mindset", "confidence", 300, 50),
    mr("m025", "Reset After Duck", "recovery", 300, 50),
    mr("m026", "Bowling Mindset Lock-In", "focus", 300, 50),
    mr("m027", "Deep Breathing Anxiety", "match-day-calm", 300, 50),
    mr("m028", "Gratitude Before Game", "match-day-calm", 300, 50),
    mr("m029", "Worry Drawer", "pressure", 300, 50),
    mr("m030", "Name Your Strength Challenge", "confidence", 300, 50),
    mr("m031", "Task Isolation Protocol", "focus", 300, 50),
    mr("m032", "Running Between Wickets", "focus", 300, 50),
    mr("m033", "Five Senses Slow Down", "match-day-calm", 300, 50),
    mr("m034", "Night Review 3 Good Things", "recovery", 300, 50),
    mr("m035", "Celebrating Others Success", "confidence", 300, 45),
    mr("m036", "4-7-8 Breath Lock", "match-day-calm", 360, 50),
    mr("m037", "Self-Talk Rewrite", "confidence", 360, 55),
    mr("m038", "Rejection Bounce", "recovery", 360, 65),
    mr("m039", "Nervous Energy Converter", "pre-performance", 360, 55),
    mr("m040", "Gratitude Anchor", "match-day-calm", 360, 55),
    mr("m041", "Pre-Performance Calm", "pre-performance", 360, 55),
    mr("m042", "Team Energy Alignment", "confidence", 360, 55),
    mr("m043", "Present Moment Is Enough", "focus", 360, 55),
    mr("m044", "Detox Breath", "recovery", 360, 55),
    mr("m045", "Joy Audit", "recovery", 360, 55),
    mr("m046", "Vocal Physical Presence", "confidence", 360, 60),
    mr("m047", "Anchoring Peak State", "pre-performance", 360, 65),
    mr("m048", "Grounding Instant Presence", "focus", 360, 55),
    mr("m049", "Strategic Pause Activation", "pressure", 360, 60),
    mr("m050", "Learning from Opponents", "recovery", 360, 60),
    mr("m051", "Mental Highlight Reel", "confidence", 360, 60),
    mr("m052", "Cultivating Beginners Mind", "focus", 360, 60),
    mr("m053", "Deep Focus Anchor", "focus", 360, 60),
    mr("m054", "Stillness Practice", "match-day-calm", 360, 55),
    mr("m055", "Calm Before Storm", "pre-performance", 360, 55),
    mr("m056", "Laser Focus Activation", "focus", 360, 55),
    mr("m057", "Gratitude Perspective Shift", "recovery", 360, 55),
    mr("m058", "Bounce-Back Faster", "recovery", 360, 60),
    mr("m059", "Focus What You Control", "pressure", 360, 55),
    mr("m060", "Optimism Training", "confidence", 360, 55),
    mr("m061", "Mindful Performance Reset", "focus", 360, 55),
    mr("m062", "Dealing with Criticism", "recovery", 360, 55),
    mr("m063", "Dealing Nerves Batting", "pre-performance", 360, 60),
    mr("m064", "Accountability Mirror", "confidence", 360, 60),
    mr("m065", "Cold Pressure Simulation", "pressure", 360, 75),
    mr("m066", "1% Better Mindset", "focus", 360, 55),
    mr("m067", "Sensory Narrowing", "focus", 360, 60),
    mr("m068", "Trusted Teammate Lens", "confidence", 360, 55),
    mr("m069", "Pressure Release Valve", "pressure", 360, 55),
    mr("m070", "Breathing Through Batting Collapse", "pressure", 360, 65),
    mr("m071", "Environmental Intention Setting", "pre-performance", 360, 55),
    mr("m072", "Compassionate Coaching Voice", "recovery", 360, 55),
    mr("m073", "Catching Under Pressure", "pressure", 360, 60),
    mr("m074", "Discipline Contract", "focus", 360, 60),
    mr("m075", "Craving the Challenge", "confidence", 360, 65),
    mr("m076", "Separating Result from Worth", "recovery", 360, 55),
    mr("m077", "Possibility Scanner", "confidence", 360, 55),
    mr("m078", "Believing in Tomorrow", "recovery", 360, 55),
    mr("m079", "Calm Competitor", "pressure", 360, 60),
    mr("m080", "Motivation Without Mood", "confidence", 360, 60),
    mr("m081", "Pressure Is Information", "pressure", 360, 60),
    mr("m082", "Positive Pressure Partnership", "pressure", 360, 55),
    mr("m083", "Long View Perspective", "recovery", 360, 55),
    mr("m084", "Distraction Shield", "focus", 420, 65),
    mr("m085", "Evidence of Strength", "confidence", 420, 60),
    mr("m086", "Affirmation Immersion", "confidence", 420, 60),
    mr("m087", "Own the Room", "confidence", 420, 65),
    mr("m088", "Pressure Is Privilege", "pressure", 420, 65),
    mr("m089", "Let It Go Protocol", "recovery", 420, 60),
    mr("m090", "Breathe Through Bad Day", "recovery", 420, 60),
    mr("m091", "Failure as Feedback", "recovery", 420, 60),
    mr("m092", "Best Self Morning", "confidence", 420, 60),
    mr("m093", "Game Day Activation", "pre-performance", 420, 65),
    mr("m094", "Letting Go of Last Time", "recovery", 420, 65),
    mr("m095", "Dealing Crowd Environment", "pressure", 420, 65),
    mr("m096", "Process Over Result", "focus", 420, 65),
    mr("m097", "Evening Review Unwind", "recovery", 420, 60),
    mr("m098", "Emotional Intelligence Check-In", "recovery", 420, 65),
    mr("m099", "Discipline Over Motivation", "focus", 420, 65),
    mr("m100", "Relationship with Effort", "confidence", 420, 65),
    mr("m101", "Silent Minute Protocol", "focus", 420, 65),
    mr("m102", "Abundance Mindset Shift", "confidence", 420, 65),
    mr("m103", "Owning Your Uniqueness", "confidence", 420, 65),
    mr("m104", "Competition as Fuel", "pressure", 420, 65),
    mr("m105", "Morning Clarity Protocol", "focus", 420, 60),
    mr("m106", "Embrace the Discomfort", "pressure", 420, 70),
    mr("m107", "Closing the Loop", "recovery", 420, 65),
    mr("m108", "Noise Cancellation Focus", "focus", 420, 70),
    mr("m109", "Embrace the Arena", "pre-performance", 420, 65),
    mr("m110", "Energy Source Identification", "confidence", 420, 60),
    mr("m111", "What If Neutralizer", "pressure", 420, 65),
    mr("m112", "Future-Pacing Success", "visualization", 420, 65),
    mr("m113", "Decision Clarity Under Pressure", "pressure", 420, 70),
    mr("m114", "Responding to Unfairness", "recovery", 420, 70),
    mr("m115", "Handling Unplayable Ball", "recovery", 420, 70),
    mr("m116", "Bowling Under Pressure", "pressure", 420, 65),
    mr("m117", "Fuel Your Fire", "confidence", 420, 60),
    mr("m118", "Rediscovering Your Why", "confidence", 420, 65),
    mr("m119", "Anxiety Dissolve Protocol", "match-day-calm", 420, 65),
    mr("m120", "Deep Recovery Breathing", "recovery", 420, 65),
    mr("m121", "Motivational Momentum Builder", "confidence", 420, 65),
    mr("m122", "Deep Pressure Release", "pressure", 420, 60),
    mr("m123", "Believe It Session", "confidence", 420, 65),
    mr("m124", "Beat Fear of Failure", "confidence", 420, 65),
    mr("m125", "Body Scan Energy Reset", "recovery", 420, 60),
    mr("m126", "Overcome Overthinking", "focus", 420, 65),
    mr("m127", "Worst-Case Freedom", "pressure", 420, 65),
    mr("m128", "Confidence Through Preparation", "confidence", 420, 60),
    mr("m129", "Performing for Love of It", "confidence", 420, 60),
    mr("m130", "Repair After a Row", "recovery", 420, 65),
    mr("m131", "Fielding Brilliance Rehearsal", "visualization", 420, 65),
    mr("m132", "Bounce-Back Blueprint", "recovery", 420, 65),
    mr("m133", "Inner Lake", "match-day-calm", 420, 60),
    mr("m134", "Positive Reframe Machine", "recovery", 420, 65),
    mr("m135", "4-7-8 Breath Reset", "match-day-calm", 420, 60),
    mr("m136", "Power of No Excuses", "confidence", 420, 70),
    mr("m137", "Competitors Code", "pressure", 420, 65),
    mr("m138", "Mind Over Fatigue", "pressure", 420, 75),
    mr("m139", "Trusting Instinct", "focus", 420, 65),
    mr("m140", "Single-Point Focus Drill", "focus", 480, 55),
    mr("m141", "Attention Anchor", "focus", 480, 65),
    mr("m142", "Inner Champion", "confidence", 480, 65),
    mr("m143", "Courage Over Comfort", "confidence", 480, 70),
    mr("m144", "Storm and Stillness", "pressure", 480, 70),
    mr("m145", "Adversity as Advantage", "recovery", 480, 70),
    mr("m146", "Self-Compassion Practice", "recovery", 480, 65),
    mr("m147", "Emotional Drain Release", "recovery", 480, 70),
    mr("m148", "Boundaries Burnout Prevention", "recovery", 480, 70),
    mr("m149", "Master Skill Replay", "visualization", 480, 70),
    mr("m150", "Future Memory", "visualization", 480, 70),
    mr("m151", "Obstacle Visualisation", "visualization", 480, 70),
    mr("m152", "Calm Under Pressure Visualisation", "visualization", 480, 70),
    mr("m153", "Post-Performance Review", "recovery", 480, 70),
    mr("m154", "Composed Under Fire", "pressure", 480, 80),
    mr("m155", "Morning Mindset Ritual", "confidence", 480, 65),
    mr("m156", "Stress Inoculation", "pressure", 480, 80),
    mr("m157", "Resilience Story", "recovery", 480, 70),
    mr("m158", "Patience Long-Game Thinking", "focus", 480, 70),
    mr("m159", "Decision Maker", "pressure", 480, 70),
    mr("m160", "Under the Microscope", "pressure", 480, 80),
    mr("m161", "Why Engine", "confidence", 480, 70),
    mr("m162", "Champions Setback", "recovery", 480, 70),
    mr("m163", "Box Breathing Method", "match-day-calm", 480, 65),
    mr("m164", "Imposter Dissolve", "confidence", 480, 70),
    mr("m165", "Releasing Expectations", "pressure", 480, 70),
    mr("m166", "Breaking the Mental Block", "focus", 480, 80),
    mr("m167", "Freedom from Judgment", "pressure", 480, 70),
    mr("m168", "Releasing Outcome Attachment", "focus", 480, 75),
    mr("m169", "Inner Critic Translator", "recovery", 480, 70),
    mr("m170", "Growth Mindset Fuel", "confidence", 480, 70),
    mr("m171", "Decision-Making Clarity", "focus", 480, 70),
    mr("m172", "Active Listening for Insight", "focus", 480, 70),
    mr("m173", "Vision Board Visualization", "visualization", 480, 70),
    mr("m174", "Batting Through Hard Session", "pressure", 480, 70),
    mr("m175", "Staying Calm Under Fire", "pressure", 480, 70),
    mr("m176", "Unbreakable Mindset", "confidence", 480, 80),
    mr("m177", "Positive Self-Image Builder", "confidence", 480, 70),
    mr("m178", "Quiet the Noise", "focus", 480, 70),
    mr("m179", "Comeback Mindset", "recovery", 480, 70),
    mr("m180", "Sleep Better Tonight", "recovery", 480, 60),
    mr("m181", "Handling Losing Streak", "recovery", 480, 70),
    mr("m182", "Post-Game Emotional Release", "recovery", 480, 70),
    mr("m183", "Winning the Inner Battle", "confidence", 480, 70),
    mr("m184", "Pre-Match Ritual Builder", "pre-performance", 480, 70),
    mr("m185", "Breath as Anchor", "match-day-calm", 480, 60),
    mr("m186", "Pressure Rehearsal Crucial Over", "pressure", 480, 80),
    mr("m187", "Decompression Zone", "recovery", 480, 65),
    mr("m188", "Thought Labeling Practice", "focus", 480, 65),
    mr("m189", "Failure Inventory", "recovery", 480, 70),
    mr("m190", "Box Breathing Navy Seal", "pressure", 480, 65),
    mr("m191", "Processing Disappointment", "recovery", 480, 70),
    mr("m192", "Finding Flow Through Challenge", "focus", 480, 75),
    mr("m193", "Staying Positive After Being Dropped", "recovery", 480, 70),
    mr("m194", "Radical Acceptance", "recovery", 480, 70),
    mr("m195", "Developing Elite Patience", "focus", 480, 75),
    mr("m196", "Body Scan Focus Reset", "focus", 540, 60),
    mr("m197", "Comparison Detox", "confidence", 540, 70),
    mr("m198", "Unshakeable Foundation", "confidence", 540, 75),
    mr("m199", "Forgiveness Forward Movement", "recovery", 540, 80),
    mr("m200", "Perfect Performance", "visualization", 540, 75),
    mr("m201", "Healing Visualisation", "recovery", 540, 70),
    mr("m202", "Morning of Big Day", "pre-performance", 540, 75),
    mr("m203", "Deep Work Session Primer", "focus", 540, 70),
    mr("m204", "Process Film", "visualization", 540, 75),
    mr("m205", "Grief Permission", "recovery", 540, 80),
    mr("m206", "10 Years Forward", "visualization", 540, 75),
    mr("m207", "Pre-Sleep Mental Shutdown", "recovery", 540, 70),
    mr("m208", "Choke-Proof Preparation", "pressure", 540, 80),
    mr("m209", "Life Balance Audit", "recovery", 540, 75),
    mr("m210", "Post-Performance Debrief", "recovery", 540, 70),
    mr("m211", "Patience Cultivation", "focus", 540, 80),
    mr("m212", "Detaching from Perfectionism", "recovery", 540, 80),
    mr("m213", "Champions Routine", "pre-performance", 540, 75),
    mr("m214", "Full Body Relaxation", "recovery", 540, 65),
    mr("m215", "Visualization for Skill Building", "visualization", 540, 75),
    mr("m216", "Identity-Based Goal Setting", "confidence", 540, 75),
    mr("m217", "Comeback Innings", "recovery", 540, 75),
    mr("m218", "Letter to Future Self", "visualization", 540, 75),
    mr("m219", "Pressure Ladder", "pressure", 540, 80),
    mr("m220", "Flow State Trigger", "focus", 600, 75),
    mr("m221", "Deep Work Preparation", "focus", 600, 75),
    mr("m222", "Mental Toughness Builder", "pressure", 600, 85),
    mr("m223", "High Stakes Rehearsal", "pressure", 600, 85),
    mr("m224", "Sleep Recovery Reset", "recovery", 600, 70),
    mr("m225", "Intentional Rest", "recovery", 600, 70),
    mr("m226", "Goal Movie", "visualization", 600, 80),
    mr("m227", "Champion Mindset Simulation", "pro-mental", 600, 85),
    mr("m228", "New Identity Visualisation", "visualization", 600, 85),
    mr("m229", "Deliberate Practice Mindset", "pro-mental", 600, 100, true),
    mr("m230", "Mastery Over Perfection", "pro-mental", 600, 100, true),
    mr("m231", "Sensory Performance Blueprint", "visualization", 600, 85),
    mr("m232", "Vivid Goal Map", "visualization", 600, 80),
    mr("m233", "Recharge Internal Battery", "recovery", 600, 75),
    mr("m234", "Pre-Tournament Mind Lock", "pre-performance", 600, 80),
    mr("m235", "Performance Rituals Design", "pro-mental", 660, 105, true),
    mr("m236", "Psychological Safety Risk-Taking", "pro-mental", 660, 105, true),
    mr("m237", "Identity Leverage", "pro-mental", 720, 110, true),
    mr("m238", "Zone of Genius Activation", "pro-mental", 720, 110, true),
    mr("m239", "Elite Competitor Analysis", "pro-mental", 720, 110, true),
    mr("m240", "Inner Dialogue Mastery", "pro-mental", 720, 110, true),
    mr("m241", "Elite Endurance Mindset", "pro-mental", 720, 110, true),
    mr("m242", "Flow State Architecture", "pro-mental", 900, 120, true)
  ];
  var drills = [
    { id: "d001", title: "Cover Drive Mastery", category: "Batting", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Perfect the cover drive.", instructions: "Stand side-on. Step forward. Drive through the line. Follow through high toward cover.", tips: ["Head over the ball", "Front elbow toward mid-on", "Watch the ball onto the bat"] },
    { id: "d002", title: "Pull Shot Power", category: "Batting", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Powerful pull shot against short-pitched bowling.", instructions: "Rock back early. Pivot on back foot. Whip through the line toward mid-wicket.", tips: ["Get in position early", "Stay tall on back foot", "Roll wrists at contact"] },
    { id: "d003", title: "Straight Drive Precision", category: "Batting", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Hit straight back down the ground.", instructions: "Watch the full delivery. Step in. Present full bat face. Drive through the V.", tips: ["Head still at contact", "High elbow on backlift", "Follow through toward bowler"] },
    { id: "d004", title: "Cut Shot Technique", category: "Batting", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Attack short-wide deliveries with cut shot.", instructions: "Identify short wide ball. Rock back across. Chop down toward point.", tips: ["Give yourself room to cut", "Keep shot down", "Watch ball closely"] },
    { id: "d005", title: "Sweep Shot Drills", category: "Batting", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Master the sweep against spin bowling.", instructions: "Get to the pitch. Get down low. Sweep toward fine leg or square leg.", tips: ["Commit to shot", "Protect stumps with pad", "Vary sweep and slog sweep"] },
    { id: "d006", title: "Defensive Technique", category: "Batting", difficulty: "Beginner", duration_minutes: 15, xp_value: 50, is_premium: false, description: "Build an unbreakable defensive foundation.", instructions: "Get behind the line. Present bat and pad together. Soft hands.", tips: ["Lean front foot for length balls", "Relax hands at contact", "Keep bat angle closed"] },
    { id: "d007", title: "Flick Shot Perfection", category: "Batting", difficulty: "Advanced", duration_minutes: 25, xp_value: 100, is_premium: false, description: "Master the on-side flick.", instructions: "Ball on leg stump. Open hips early. Flick wrists at contact.", tips: ["Stay balanced", "Use wrist not arm", "Get inside the line"] },
    { id: "d008", title: "Slog Sweep for T20", category: "Batting", difficulty: "Advanced", duration_minutes: 20, xp_value: 120, is_premium: true, description: "Aggressive hitting weapon against spinners.", instructions: "Get to the pitch. Front knee down. Hit over mid-wicket with power.", tips: ["Choose the right ball", "Get under it", "Use depth of crease"] },
    { id: "d009", title: "Running Between Wickets", category: "Batting", difficulty: "Beginner", duration_minutes: 20, xp_value: 70, is_premium: false, description: "Communication and speed running.", instructions: "Call early: yes no wait. Sprint and ground the bat. Back up constantly.", tips: ["Loud clear calls", "Turn with bat in hand", "Always back up"] },
    { id: "d010", title: "Yorker Defense", category: "Batting", difficulty: "Advanced", duration_minutes: 25, xp_value: 110, is_premium: false, description: "Survive and score off yorkers.", instructions: "Read release point. Get bat down early. Dig out along ground. Use the crease.", tips: ["Read the wrist", "Get bat down fast", "Use depth of crease"] },
    { id: "d011", title: "Outswing Basics", category: "Bowling", difficulty: "Beginner", duration_minutes: 20, xp_value: 70, is_premium: false, description: "Swing the ball away from right-handed batsman.", instructions: "Seam toward fine slip. High wrist. Bowl full length.", tips: ["Shine one side", "Seam upright at release", "Hit good length"] },
    { id: "d012", title: "Inswing Bowling", category: "Bowling", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Bring ball into right-handed batsman.", instructions: "Seam toward fine leg. Wrist rotates slightly. Fuller length.", tips: ["Bowl full", "Target gap between bat and pad", "Seam upright"] },
    { id: "d013", title: "Leg Spin Grips & Action", category: "Bowling", difficulty: "Intermediate", duration_minutes: 25, xp_value: 90, is_premium: false, description: "Master the basic leg spin delivery.", instructions: "Third finger on seam. Cock wrist. Spin from third finger.", tips: ["Overspin for dip", "Consistent run-up", "Rip third finger hard"] },
    { id: "d014", title: "Off Spin Fundamentals", category: "Bowling", difficulty: "Beginner", duration_minutes: 20, xp_value: 70, is_premium: false, description: "Develop consistent off spin.", instructions: "Grip across seam. Turn ball from right to left. Flight it up.", tips: ["Use fingers not wrist", "Drift with wind", "Vary pace with flighted deliveries"] },
    { id: "d015", title: "Yorker Accuracy Drill", category: "Bowling", difficulty: "Advanced", duration_minutes: 30, xp_value: 110, is_premium: false, description: "Hit the yorker length repeatedly under pressure.", instructions: "Place cone at yorker zone. Bowl full. Aim to hit cone. Repeat 30 balls.", tips: ["Think: hit the feet", "Run in hard", "Use at death overs"] },
    { id: "d016", title: "Slower Ball Variations", category: "Bowling", difficulty: "Advanced", duration_minutes: 25, xp_value: 120, is_premium: true, description: "Add cutters and slower balls.", instructions: "Off-cutter: cut finger across seam. Leg-cutter: opposite way. Same action.", tips: ["Disguise is everything", "One variation at a time", "Bowl at stumps"] },
    { id: "d017", title: "Reverse Swing", category: "Bowling", difficulty: "Advanced", duration_minutes: 30, xp_value: 130, is_premium: true, description: "Master reverse swing with old ball.", instructions: "Old ball shiny side facing batsman. Bowl full and fast. Target off stump.", tips: ["40+ overs old ball", "Bowl fuller", "Hard seam upright"] },
    { id: "d018", title: "Line & Length Consistency", category: "Bowling", difficulty: "Beginner", duration_minutes: 20, xp_value: 60, is_premium: false, description: "Bowl 30 balls on consistent line and length.", instructions: "Mark good-length zone and 4th-stump line. Bowl aiming to hit both zones.", tips: ["Same run-up every ball", "Watch where ball pitches", "Adjust release height"] },
    { id: "d019", title: "Googly Bowling", category: "Bowling", difficulty: "Advanced", duration_minutes: 25, xp_value: 130, is_premium: true, description: "Develop the mystery googly.", instructions: "Leg spin grip. Rotate wrist over the top. Ball spins other way.", tips: ["Disguise wrist position", "Bowl wide of off stump", "Master leg break first"] },
    { id: "d020", title: "Death Bowling Masterclass", category: "Bowling", difficulty: "Advanced", duration_minutes: 30, xp_value: 140, is_premium: true, description: "Bowl final overs in T20 under pressure.", instructions: "Mix yorkers slower balls and bouncers. Vary pace and length every ball.", tips: ["Never bowl same ball twice", "Wide yorkers", "Bouncer as surprise"] },
    { id: "d021", title: "Ground Fielding Basics", category: "Fielding", difficulty: "Beginner", duration_minutes: 15, xp_value: 50, is_premium: false, description: "Long-barrier and clean pick-up.", instructions: "Get side-on. Long leg back. Scoop ball into cupped hands.", tips: ["Body behind ball", "Watch into hands", "Quick release after pick-up"] },
    { id: "d022", title: "Catching High Balls", category: "Fielding", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Take high skiers with confidence.", instructions: "Call early. Position under ball. Cup hands above face. Soft hands.", tips: ["Call loud: I HAVE IT", "Move feet early", "Steady platform"] },
    { id: "d023", title: "Diving Stops & Saves", category: "Fielding", difficulty: "Advanced", duration_minutes: 25, xp_value: 100, is_premium: false, description: "Superman dive to save boundaries.", instructions: "React fast. Full dive. Get body behind ball. Get up quickly.", tips: ["Commit to dive", "Land on hip not elbow", "Train both sides"] },
    { id: "d024", title: "Flat Throw to Stumps", category: "Fielding", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Accurate flat throws to either end.", instructions: "Pick up clean. Side-on to target. Overarm throw. Aim at top of stumps.", tips: ["Follow through toward target", "Use lead shoulder", "Practice 20m and 30m"] },
    { id: "d025", title: "Slip Catching Drill", category: "Fielding", difficulty: "Intermediate", duration_minutes: 20, xp_value: 90, is_premium: false, description: "React to edges and take clean slip catches.", instructions: "Ready position \u2014 knees bent. Watch the bat. React to edge. Soft hands.", tips: ["Move after ball not before", "Cup hands and give", "Stay low"] },
    { id: "d026", title: "Boundary Saving", category: "Fielding", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Stop balls at the boundary.", instructions: "Track ball to boundary. Step over rope. Flick ball back before feet land outside.", tips: ["Watch the rope", "Lean back into field", "Quick hand action"] },
    { id: "d027", title: "Inner Circle Fielding", category: "Fielding", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Save singles inside 30-yard circle.", instructions: "Aggressive ready position. Attack the ball. Get low. Quick throw.", tips: ["Cut off singles", "Attack not retreat", "Stay on toes"] },
    { id: "d028", title: "Run Out Techniques", category: "Fielding", difficulty: "Intermediate", duration_minutes: 20, xp_value: 90, is_premium: false, description: "Improve run out success rate.", instructions: "Pick up quick. Throw with accuracy. Aim at base of stumps.", tips: ["Hit stumps not keeper", "Underarm for close run outs", "One stump wide safety margin"] },
    { id: "d029", title: "Keeper Stance & Movement", category: "Wicketkeeping", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Perfect keeping stance.", instructions: "Weight on toes. Hands out front. Side-step with ball. Stay low.", tips: ["Never cross feet", "Soft hands", "Move with ball early"] },
    { id: "d030", title: "Standing Up to Spinners", category: "Wicketkeeping", difficulty: "Advanced", duration_minutes: 25, xp_value: 120, is_premium: true, description: "Keep wicket up to stumps against spin.", instructions: "Stand close to stumps. Watch pitch of ball. React to spin direction.", tips: ["Take ball late", "Give yourself room", "Ready for stumping always"] },
    { id: "d031", title: "Cricket Sprint Training", category: "Fitness", difficulty: "Beginner", duration_minutes: 20, xp_value: 70, is_premium: false, description: "Build explosive sprint speed.", instructions: "Sprint 22 yards 10 times. Rest 30s. Focus on first step explosion.", tips: ["Drive the arms", "Stay low first 5 metres", "Push off back foot"] },
    { id: "d032", title: "Footwork Ladder Drills", category: "Fitness", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Rapid footwork with agility ladder.", instructions: "Two feet in each rung. One foot each. Lateral shuffles. 5 passes.", tips: ["Stay on toes", "Arms drive legs", "Increase speed each pass"] },
    { id: "d033", title: "Core Stability", category: "Fitness", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Core strength for all cricket skills.", instructions: "Plank 3x30s. Side plank 2x20s. Dead bug 3x10. Bird dog 3x10.", tips: ["Brace core throughout", "Never let hips sag", "Breathe steadily"] },
    { id: "d034", title: "Shoulder Strength & Mobility", category: "Fitness", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Protect shoulder and build power.", instructions: "Band pull-aparts 3x15. Face pulls 3x12. External rotations 3x15.", tips: ["No heavy weights", "Focus on form", "Include in every session"] },
    { id: "d035", title: "Explosive Leg Power", category: "Fitness", difficulty: "Advanced", duration_minutes: 25, xp_value: 100, is_premium: false, description: "Leg power for batting bowling and fielding.", instructions: "Box jumps 4x8. Jump squats 3x10. Single-leg bounds 3x6. Sprint starts 5x30m.", tips: ["Land softly", "Full hip extension on take-off", "Rest 90s between explosive sets"] },
    { id: "d036", title: "Pressure Batting Simulation", category: "Mental", difficulty: "Intermediate", duration_minutes: 20, xp_value: 90, is_premium: false, description: "Bat under simulated match pressure.", instructions: "Last 5 overs. Need 30 runs. Face 20 balls. Stay process-focused.", tips: ["One ball at a time", "Between-ball routine", "Celebrate good balls faced"] },
    { id: "d037", title: "Visualization Batting", category: "Mental", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Mentally rehearse your best batting.", instructions: "Close eyes. Picture walking to crease. Face 10 deliveries in your mind. Play each perfectly.", tips: ["Be vivid and specific", "Include crowd noise", "Feel the bat in your hands"] },
    { id: "d038", title: "Reset After Wicket", category: "Mental", difficulty: "Intermediate", duration_minutes: 10, xp_value: 70, is_premium: false, description: "Mental reset after losing your wicket.", instructions: "3 deep breaths. Write what happened. Identify one learning. Commit to next innings.", tips: ["No self-blame", "Focus forward", "Keep a match journal"] },
    { id: "d039", title: "T20 Power Hitting", category: "Batting", difficulty: "Advanced", duration_minutes: 25, xp_value: 110, is_premium: false, description: "Maximize boundary hitting in T20.", instructions: "Face throwdowns on good length. Aim to clear mid-wicket and long-on. 20 balls per set.", tips: ["Get to pitch of ball", "Stay balanced", "Clear front leg for width"] },
    { id: "d040", title: "Reverse Sweep & Ramp", category: "Batting", difficulty: "Advanced", duration_minutes: 20, xp_value: 130, is_premium: true, description: "Ramp and reverse sweep for T20.", instructions: "Ramp: step outside off stump. Reverse sweep: convert at last moment.", tips: ["Use against full toss or good length", "Practice half pace first", "Watch ball late"] },
    { id: "d041", title: "Leg Glance & Tickle", category: "Batting", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Easy runs on leg side with deflections.", instructions: "Ball on leg stump. Angle bat face. Let ball glance toward fine leg.", tips: ["Less is more", "Let ball do the work", "Stay behind the line"] },
    { id: "d042", title: "Lofted Drive Over Mid-On", category: "Batting", difficulty: "Intermediate", duration_minutes: 20, xp_value: 85, is_premium: false, description: "Hit spinner over the top with control.", instructions: "Pick the full delivery. Get under ball. Full swing with high follow-through.", tips: ["Get to pitch of ball", "Open body slightly", "Swing through contact"] },
    { id: "d043", title: "Playing Swing Bowling", category: "Batting", difficulty: "Intermediate", duration_minutes: 20, xp_value: 85, is_premium: false, description: "Handle inswing and outswing.", instructions: "Play late against swing. Soft top hand. Bat behind pad for inswinger.", tips: ["Watch seam out of hand", "Play straight", "Soft hands reduce edges"] },
    { id: "d044", title: "Batting Against Spin", category: "Batting", difficulty: "Intermediate", duration_minutes: 25, xp_value: 90, is_premium: false, description: "Use feet and sweep against quality spin.", instructions: "Use your crease. Get to pitch or go back. Mix sweep with defensive push.", tips: ["Read hand at release", "Use crease wisely", "Sweep the straight ones"] },
    { id: "d045", title: "Bouncer Strategy", category: "Bowling", difficulty: "Intermediate", duration_minutes: 20, xp_value: 90, is_premium: false, description: "Use bouncer as a weapon.", instructions: "Bowl short of length. Target outside shoulder. Follow with full ball.", tips: ["Aim at armpit", "Steep and straight", "Unsettle then target stumps"] },
    { id: "d046", title: "Seam Bowling Consistency", category: "Bowling", difficulty: "Beginner", duration_minutes: 20, xp_value: 65, is_premium: false, description: "Bowl with upright seam for movement.", instructions: "Hold across seam. Keep seam upright. Roll fingers over top at release.", tips: ["Seam upright = movement", "Bowl full enough", "High action helps"] },
    { id: "d047", title: "Bowling to Plans", category: "Bowling", difficulty: "Advanced", duration_minutes: 25, xp_value: 120, is_premium: true, description: "Target batsman weaknesses with clear bowling plan.", instructions: "Identify weakness. Design 6-ball plan. Bowl to it without deviation.", tips: ["Set the trap early", "Two in a row to establish pattern", "Vary pace not line"] },
    { id: "d048", title: "Keeper Down Leg Side", category: "Wicketkeeping", difficulty: "Intermediate", duration_minutes: 20, xp_value: 85, is_premium: false, description: "Take balls angled down leg side.", instructions: "Quick side-step. Gloves together. Catch ball outside left leg.", tips: ["Soft hands", "Weight on toes", "Stay low"] },
    { id: "d049", title: "Net Session Discipline", category: "Mental", difficulty: "Beginner", duration_minutes: 20, xp_value: 60, is_premium: false, description: "Get the most out of net sessions.", instructions: "Set goal before you go in. Play proper match shots. Evaluate after 10 balls.", tips: ["Quality over quantity", "Specific goal", "Get uncomfortable deliberately"] },
    { id: "d050", title: "Match Simulation", category: "Mental", difficulty: "Advanced", duration_minutes: 30, xp_value: 130, is_premium: true, description: "Replicate match conditions in training.", instructions: "Set a scenario. Last over needed. Batting first ball. Make it count.", tips: ["Raise the stakes", "Record yourself", "Get a team to field"] },
    { id: "d051", title: "Switch Hit Technique", category: "Batting", difficulty: "Advanced", duration_minutes: 20, xp_value: 140, is_premium: true, description: "The audacious switch hit.", instructions: "Change hands and stance at last moment. Hit to the opposite side.", tips: ["Practice in slow motion", "Pick a full delivery", "Commit fully"] },
    { id: "d052", title: "Scoop Shot Ramp", category: "Batting", difficulty: "Advanced", duration_minutes: 20, xp_value: 110, is_premium: false, description: "Ramp over the keeper for six.", instructions: "Open stance. Get inside line. Scoop over fine leg. Full face.", tips: ["Full and straight ball", "Best against pace", "Watch till contact"] },
    { id: "d053", title: "Long Barrier Fielding", category: "Fielding", difficulty: "Beginner", duration_minutes: 15, xp_value: 50, is_premium: false, description: "Safest way to stop ball on boundary.", instructions: "Turn side-on. Drop one knee. Cup hands. Let ball roll in.", tips: ["Never rush", "Body behind ball", "Two hands always"] },
    { id: "d054", title: "Outfield Sprinting & Sliding", category: "Fielding", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Aggressive outfield running and sliding.", instructions: "Sprint full speed at ball. Slide on hip. Pick up and throw.", tips: ["Slide on hip not knee", "Keep ball in sight", "Throw from ground if needed"] },
    { id: "d055", title: "Bowling Run-Up Consistency", category: "Bowling", difficulty: "Beginner", duration_minutes: 15, xp_value: 60, is_premium: false, description: "Build a repeatable rhythmical run-up.", instructions: "Mark approach. Count steps. Practice without ball 20 times.", tips: ["Measure from bowling crease", "Accelerate into crease", "Same footfall every time"] },
    { id: "d056", title: "Power Play Batting", category: "Batting", difficulty: "Intermediate", duration_minutes: 20, xp_value: 85, is_premium: false, description: "Maximize first 6 overs.", instructions: "Play attacking cricket. Use the gaps. Clear inner ring. Convert 1s to 2s.", tips: ["Pick gaps not over fielders", "Use powerplay field", "Stay positive"] },
    { id: "d057", title: "Middle Overs Batting", category: "Batting", difficulty: "Intermediate", duration_minutes: 20, xp_value: 80, is_premium: false, description: "Build innings and accelerate in overs 7-15.", instructions: "Set platform first 5 balls. Hit the sixth. Rotate strike constantly.", tips: ["Never 4 balls without run", "Target spinner you fancy", "Singles are not failures"] },
    { id: "d058", title: "Catching Practice Pairs", category: "Fielding", difficulty: "Beginner", duration_minutes: 15, xp_value: 55, is_premium: false, description: "Build catching reflexes with partner.", instructions: "Stand 5m apart. Throw underarm at various heights. 20 each. Progress to 10m.", tips: ["Two hands unless forced", "Watch it in", "Soft hands"] },
    { id: "d059", title: "Wrist Spin Variations", category: "Bowling", difficulty: "Advanced", duration_minutes: 25, xp_value: 130, is_premium: true, description: "Add flipper and topspinner.", instructions: "Flipper: squeeze from under hand. Topspinner: bowl over the top.", tips: ["Master leg break first", "Practice slowly", "Use to deceive not replace"] },
    { id: "d060", title: "Grip Pressure & Bat Speed", category: "Batting", difficulty: "Intermediate", duration_minutes: 15, xp_value: 75, is_premium: false, description: "Light grip means fast hands.", instructions: "Hold bat at 30% pressure. Shadow-bat 50 strokes. Focus on wrist snap.", tips: ["Light top hand", "Tight at contact only", "Feel the bat whip through"] }
  ];
  var workouts = [
    { id: "w001", name: "Back Strength Builder", level: "intermediate", exercises_count: 5, duration: "15-20", xp_value: 140, target: "back", category: "strength" },
    { id: "w002", name: "Arms Beginner Blast", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 85, target: "arms", category: "strength" },
    { id: "w003", name: "Full Body Power Pro", level: "pro", exercises_count: 6, duration: "25+", xp_value: 320, target: "full body", category: "power" },
    { id: "w004", name: "Chest Sculpt Starter", level: "beginner", exercises_count: 5, duration: "10-15", xp_value: 90, target: "chest", category: "strength" },
    { id: "w005", name: "Fat Burn HIIT 20", level: "advanced", exercises_count: 6, duration: "20-25", xp_value: 210, target: "full body", category: "cardio" },
    { id: "w006", name: "Back Intermediate Strength", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 135, target: "back", category: "strength" },
    { id: "w007", name: "Total Body Toning", level: "beginner", exercises_count: 5, duration: "15-20", xp_value: 100, target: "full body", category: "toning" },
    { id: "w008", name: "Shoulder Strength Supreme", level: "advanced", exercises_count: 5, duration: "15-20", xp_value: 170, target: "shoulders", category: "strength" },
    { id: "w009", name: "Arms & Core Power", level: "intermediate", exercises_count: 4, duration: "10-15", xp_value: 110, target: "arms", category: "strength" },
    { id: "w010", name: "Shoulders Intermediate Sculpt", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 140, target: "shoulders", category: "strength" },
    { id: "w011", name: "Chest Intermediate Build", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 145, target: "chest", category: "strength" },
    { id: "w012", name: "Core Crusher Advanced", level: "advanced", exercises_count: 5, duration: "15-20", xp_value: 180, target: "core", category: "strength" },
    { id: "w013", name: "Legs Beginner Strength", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 90, target: "legs", category: "strength" },
    { id: "w014", name: "Shoulder Mobility Warm-Up", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 60, target: "shoulders", category: "mobility" },
    { id: "w015", name: "Back & Posture Fix", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 85, target: "back", category: "posture" },
    { id: "w016", name: "Shoulders Elite Pro", level: "pro", exercises_count: 5, duration: "20-25", xp_value: 270, target: "shoulders", category: "power" },
    { id: "w017", name: "Legs Advanced Blast", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 190, target: "legs", category: "strength" },
    { id: "w018", name: "Legs Intermediate Circuit", level: "intermediate", exercises_count: 5, duration: "20-25", xp_value: 165, target: "legs", category: "circuit" },
    { id: "w019", name: "Shoulders Beginner Tone", level: "beginner", exercises_count: 3, duration: "<10", xp_value: 65, target: "shoulders", category: "toning" },
    { id: "w020", name: "Quick Fat Burn", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 75, target: "full body", category: "cardio" },
    { id: "w021", name: "Legs & Glutes Shaper", level: "intermediate", exercises_count: 5, duration: "15-20", xp_value: 140, target: "legs", category: "toning" },
    { id: "w022", name: "Back Pro Mastery", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 280, target: "back", category: "strength" },
    { id: "w023", name: "Back & Biceps Blast", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 200, target: "back", category: "strength" },
    { id: "w024", name: "Legs Explosive Pro", level: "pro", exercises_count: 5, duration: "25+", xp_value: 310, target: "legs", category: "power" },
    { id: "w025", name: "Shoulder Definition Blast", level: "intermediate", exercises_count: 5, duration: "15-20", xp_value: 130, target: "shoulders", category: "strength" },
    { id: "w026", name: "Core Intermediate Shred", level: "intermediate", exercises_count: 5, duration: "15-20", xp_value: 145, target: "core", category: "strength" },
    { id: "w027", name: "Core Beginner Basics", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 85, target: "core", category: "strength" },
    { id: "w028", name: "Chest Beginner Build", level: "beginner", exercises_count: 3, duration: "<10", xp_value: 70, target: "chest", category: "strength" },
    { id: "w029", name: "Full Body Balance Intermediate", level: "intermediate", exercises_count: 6, duration: "25+", xp_value: 185, target: "full body", category: "balance" },
    { id: "w030", name: "Chest Advanced Power", level: "advanced", exercises_count: 4, duration: "15-20", xp_value: 180, target: "chest", category: "power" },
    { id: "w031", name: "Back Advanced Power", level: "advanced", exercises_count: 4, duration: "15-20", xp_value: 170, target: "back", category: "power" },
    { id: "w032", name: "Arms Pro Domination", level: "pro", exercises_count: 5, duration: "25+", xp_value: 290, target: "arms", category: "power" },
    { id: "w033", name: "Full Body Intermediate Power", level: "intermediate", exercises_count: 5, duration: "20-25", xp_value: 175, target: "full body", category: "power" },
    { id: "w034", name: "Evening Stretch & Tone", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 80, target: "full body", category: "flexibility" },
    { id: "w035", name: "Legs Pro Explosion", level: "pro", exercises_count: 5, duration: "25+", xp_value: 300, target: "legs", category: "power" },
    { id: "w036", name: "Back & Core Intermediate", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 140, target: "back", category: "strength" },
    { id: "w037", name: "Chest Power Pro", level: "pro", exercises_count: 5, duration: "25+", xp_value: 280, target: "chest", category: "power" },
    { id: "w038", name: "Arms Advanced Strength", level: "advanced", exercises_count: 4, duration: "15-20", xp_value: 175, target: "arms", category: "strength" },
    { id: "w039", name: "Beginner Leg Tone", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 90, target: "legs", category: "toning" },
    { id: "w040", name: "Core Advanced Destroyer", level: "advanced", exercises_count: 5, duration: "15-20", xp_value: 175, target: "core", category: "strength" },
    { id: "w041", name: "Power Strength Advanced", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 215, target: "full body", category: "power" },
    { id: "w042", name: "Chest Advanced Sculptor", level: "advanced", exercises_count: 4, duration: "15-20", xp_value: 165, target: "chest", category: "strength" },
    { id: "w043", name: "Arms Advanced Pump", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 195, target: "arms", category: "strength" },
    { id: "w044", name: "Mobility & Flexibility Advanced", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 160, target: "full body", category: "flexibility" },
    { id: "w045", name: "Core Elite Pro", level: "pro", exercises_count: 5, duration: "20-25", xp_value: 260, target: "core", category: "strength" },
    { id: "w046", name: "Legs Advanced Strength", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 195, target: "legs", category: "strength" },
    { id: "w047", name: "Shoulders Advanced Burn", level: "advanced", exercises_count: 4, duration: "15-20", xp_value: 175, target: "shoulders", category: "strength" },
    { id: "w048", name: "Endurance Builder Intermediate", level: "intermediate", exercises_count: 5, duration: "20-25", xp_value: 160, target: "full body", category: "cardio" },
    { id: "w049", name: "Core Shred Express", level: "intermediate", exercises_count: 7, duration: "10-15", xp_value: 120, target: "core", category: "cardio" },
    { id: "w050", name: "Abs Intermediate Carve", level: "intermediate", exercises_count: 5, duration: "15-20", xp_value: 155, target: "core", category: "strength" },
    { id: "w051", name: "Post-Workout Cool Down Beginner", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 55, target: "full body", category: "recovery" },
    { id: "w052", name: "Legs Fat Burn Intermediate", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 150, target: "legs", category: "cardio" },
    { id: "w053", name: "Shoulders & Legs Intermediate", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 145, target: "shoulders", category: "strength" },
    { id: "w054", name: "Full Body Pro Endurance", level: "pro", exercises_count: 6, duration: "25+", xp_value: 310, target: "full body", category: "cardio" },
    { id: "w055", name: "Upper Body Pump Builder", level: "intermediate", exercises_count: 6, duration: "15-20", xp_value: 150, target: "upper body", category: "strength" },
    { id: "w056", name: "Core Advanced Annihilation", level: "advanced", exercises_count: 5, duration: "15-20", xp_value: 185, target: "core", category: "strength" },
    { id: "w057", name: "Active Recovery Intermediate", level: "intermediate", exercises_count: 5, duration: "15-20", xp_value: 125, target: "full body", category: "recovery" },
    { id: "w058", name: "Mobility Flow Beginner", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 60, target: "full body", category: "mobility" },
    { id: "w059", name: "Legs Pro Power", level: "pro", exercises_count: 5, duration: "25+", xp_value: 305, target: "legs", category: "power" },
    { id: "w060", name: "Shoulders Pro Power", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 275, target: "shoulders", category: "power" },
    { id: "w061", name: "Chest Pro Explosion", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 285, target: "chest", category: "power" },
    { id: "w062", name: "Upper Advanced Total", level: "advanced", exercises_count: 6, duration: "25+", xp_value: 220, target: "upper body", category: "strength" },
    { id: "w063", name: "Shoulders Pro Peak", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 275, target: "shoulders", category: "power" },
    { id: "w064", name: "Stretch & Recovery Beginner", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 75, target: "full body", category: "recovery" },
    { id: "w065", name: "Arms & Chest Intermediate Power", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 145, target: "arms", category: "strength" },
    { id: "w066", name: "Legs & Core Beginner", level: "beginner", exercises_count: 4, duration: "15-20", xp_value: 95, target: "legs", category: "strength" },
    { id: "w067", name: "Shoulders & Abs Beginner", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 85, target: "shoulders", category: "strength" },
    { id: "w068", name: "HIIT Fat Burner Intermediate", level: "intermediate", exercises_count: 4, duration: "10-15", xp_value: 130, target: "full body", category: "cardio" },
    { id: "w069", name: "Total Toning Beginner", level: "beginner", exercises_count: 5, duration: "15-20", xp_value: 100, target: "full body", category: "toning" },
    { id: "w070", name: "Back & Glutes Beginner", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 85, target: "back", category: "strength" },
    { id: "w071", name: "Chest & Core Beginner", level: "beginner", exercises_count: 4, duration: "10-15", xp_value: 80, target: "chest", category: "strength" },
    { id: "w072", name: "Core Stability Pro", level: "pro", exercises_count: 5, duration: "20-25", xp_value: 270, target: "core", category: "strength" },
    { id: "w073", name: "Quick Lower Body Beginner", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 70, target: "legs", category: "strength" },
    { id: "w074", name: "Total Body Cardio Advanced", level: "advanced", exercises_count: 6, duration: "25+", xp_value: 225, target: "full body", category: "cardio" },
    { id: "w075", name: "Upper Body Beginner Foundation", level: "beginner", exercises_count: 4, duration: "15-20", xp_value: 95, target: "upper body", category: "strength" },
    { id: "w076", name: "Core Fat Burn Intermediate", level: "intermediate", exercises_count: 4, duration: "10-15", xp_value: 125, target: "core", category: "cardio" },
    { id: "w077", name: "Full Body Fat Burn Intermediate", level: "intermediate", exercises_count: 5, duration: "20-25", xp_value: 170, target: "full body", category: "cardio" },
    { id: "w078", name: "Back Advanced Domination", level: "advanced", exercises_count: 4, duration: "15-20", xp_value: 185, target: "back", category: "strength" },
    { id: "w079", name: "Arms Pro Elite", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 275, target: "arms", category: "power" },
    { id: "w080", name: "Back & Shoulders Intermediate", level: "intermediate", exercises_count: 5, duration: "20-25", xp_value: 165, target: "back", category: "strength" },
    { id: "w081", name: "10-Minute Beginner Fat Burn", level: "beginner", exercises_count: 8, duration: "<10", xp_value: 80, target: "full body", category: "cardio" },
    { id: "w082", name: "Pro Athlete Conditioning", level: "pro", exercises_count: 7, duration: "25+", xp_value: 300, target: "full body", category: "conditioning" },
    { id: "w083", name: "Full Body Cardio Blast", level: "intermediate", exercises_count: 5, duration: "15-20", xp_value: 150, target: "full body", category: "cardio" },
    { id: "w084", name: "Core & Cardio Intermediate", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 140, target: "core", category: "cardio" },
    { id: "w085", name: "Chest & Shoulders Intermediate", level: "intermediate", exercises_count: 4, duration: "15-20", xp_value: 135, target: "chest", category: "strength" },
    { id: "w086", name: "Core Pro Mastery", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 265, target: "core", category: "strength" },
    { id: "w087", name: "Leg Day Power Circuit", level: "advanced", exercises_count: 7, duration: "20-25", xp_value: 200, target: "legs", category: "circuit" },
    { id: "w088", name: "Back Domination Pro", level: "pro", exercises_count: 5, duration: "25+", xp_value: 290, target: "back", category: "power" },
    { id: "w089", name: "Shoulders Advanced Build", level: "advanced", exercises_count: 4, duration: "15-20", xp_value: 160, target: "shoulders", category: "strength" },
    { id: "w090", name: "Back Pro Strength", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 280, target: "back", category: "strength" },
    { id: "w091", name: "Explosive Power Pro", level: "pro", exercises_count: 6, duration: "25+", xp_value: 330, target: "full body", category: "power" },
    { id: "w092", name: "Full Body Quick Tone", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 70, target: "full body", category: "toning" },
    { id: "w093", name: "Chest Pro Supreme", level: "pro", exercises_count: 4, duration: "20-25", xp_value: 270, target: "chest", category: "power" },
    { id: "w094", name: "Full Body Athlete Builder", level: "advanced", exercises_count: 8, duration: "25+", xp_value: 220, target: "full body", category: "conditioning" },
    { id: "w095", name: "Arms Intermediate Pump", level: "intermediate", exercises_count: 5, duration: "20-25", xp_value: 170, target: "arms", category: "strength" },
    { id: "w096", name: "Morning Energy Boost", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 65, target: "full body", category: "energy" },
    { id: "w097", name: "Chest & Triceps Burner", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 190, target: "chest", category: "strength" },
    { id: "w098", name: "Full Body Advanced Athlete", level: "advanced", exercises_count: 6, duration: "25+", xp_value: 230, target: "full body", category: "conditioning" },
    { id: "w099", name: "Legs & Glutes Intermediate Power", level: "intermediate", exercises_count: 5, duration: "20-25", xp_value: 170, target: "legs", category: "strength" },
    { id: "w100", name: "Back Beginner Strengthen", level: "beginner", exercises_count: 3, duration: "<10", xp_value: 70, target: "back", category: "strength" },
    { id: "w101", name: "Glutes & Hamstrings Advanced", level: "advanced", exercises_count: 5, duration: "20-25", xp_value: 205, target: "legs", category: "strength" },
    { id: "w102", name: "Quick Arms Tone", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 65, target: "arms", category: "toning" },
    { id: "w103", name: "Full Body Advanced HIIT", level: "advanced", exercises_count: 6, duration: "25+", xp_value: 225, target: "full body", category: "cardio" },
    { id: "w104", name: "Quick Core Stabilizer", level: "beginner", exercises_count: 4, duration: "<10", xp_value: 70, target: "core", category: "strength" }
  ];
  var quickStartWorkouts = [
    { name: "Morning Cricket Warm-Up", level: "beginner", target: "full body", goal: "keep fit", duration_category: "<10", xp_value: 65, is_premium: false, exercises: [{ name: "Jumping Jacks", sets: 2, reps: 20, rest_seconds: 30 }, { name: "Arm Circles", sets: 2, reps: 15, rest_seconds: 20 }, { name: "Hip Rotations", sets: 2, reps: 10, rest_seconds: 20 }, { name: "High Knees", sets: 2, reps: 20, rest_seconds: 30 }] },
    { name: "Batting Power Builder", level: "intermediate", target: "arms", goal: "build muscle", duration_category: "15-20", xp_value: 145, is_premium: false, exercises: [{ name: "Push-Ups", sets: 3, reps: 15, rest_seconds: 45 }, { name: "Tricep Dips", sets: 3, reps: 12, rest_seconds: 45 }, { name: "Wrist Curls", sets: 3, reps: 20, rest_seconds: 30 }, { name: "Forearm Plank Hold", sets: 3, reps: 30, rest_seconds: 45 }] },
    { name: "Bowler Shoulder Circuit", level: "intermediate", target: "shoulders", goal: "build muscle", duration_category: "15-20", xp_value: 140, is_premium: false, exercises: [{ name: "Band Pull-Aparts", sets: 3, reps: 15, rest_seconds: 30 }, { name: "Face Pulls", sets: 3, reps: 12, rest_seconds: 30 }, { name: "External Rotations", sets: 3, reps: 15, rest_seconds: 30 }, { name: "Lateral Raises", sets: 3, reps: 12, rest_seconds: 45 }] },
    { name: "Fielder Agility Blast", level: "intermediate", target: "legs", goal: "keep fit", duration_category: "10-15", xp_value: 130, is_premium: false, exercises: [{ name: "Lateral Shuffles", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Sprint & Stop", sets: 4, reps: 5, rest_seconds: 45 }, { name: "Squat Jumps", sets: 3, reps: 10, rest_seconds: 45 }, { name: "Direction Changes", sets: 3, reps: 8, rest_seconds: 30 }] },
    { name: "Core Stability for Cricket", level: "beginner", target: "core", goal: "keep fit", duration_category: "10-15", xp_value: 90, is_premium: false, exercises: [{ name: "Plank Hold", sets: 3, reps: 30, rest_seconds: 30 }, { name: "Dead Bug", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Bird Dog", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Glute Bridge", sets: 3, reps: 15, rest_seconds: 30 }] },
    { name: "Explosive Leg Day", level: "advanced", target: "legs", goal: "build muscle", duration_category: "20-25", xp_value: 200, is_premium: false, exercises: [{ name: "Box Jumps", sets: 4, reps: 8, rest_seconds: 60 }, { name: "Jump Squats", sets: 3, reps: 10, rest_seconds: 60 }, { name: "Bulgarian Split Squats", sets: 3, reps: 10, rest_seconds: 60 }, { name: "Single Leg Bounds", sets: 3, reps: 6, rest_seconds: 60 }, { name: "Sprint Starts", sets: 5, reps: 1, rest_seconds: 45 }] },
    { name: "Quick HIIT Fat Burn", level: "intermediate", target: "full body", goal: "lose weight", duration_category: "<10", xp_value: 100, is_premium: false, exercises: [{ name: "Burpees", sets: 3, reps: 10, rest_seconds: 20 }, { name: "Mountain Climbers", sets: 3, reps: 20, rest_seconds: 20 }, { name: "High Knees", sets: 3, reps: 30, rest_seconds: 20 }, { name: "Jump Lunges", sets: 3, reps: 10, rest_seconds: 20 }] },
    { name: "Upper Body Endurance", level: "intermediate", target: "upper body", goal: "keep fit", duration_category: "15-20", xp_value: 150, is_premium: false, exercises: [{ name: "Push-Up Variations", sets: 4, reps: 15, rest_seconds: 30 }, { name: "Superman Hold", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Shoulder Taps", sets: 3, reps: 20, rest_seconds: 30 }, { name: "Tricep Push-Ups", sets: 3, reps: 12, rest_seconds: 30 }] },
    { name: "Wicketkeeper Power", level: "intermediate", target: "legs", goal: "build muscle", duration_category: "15-20", xp_value: 155, is_premium: false, exercises: [{ name: "Deep Squat Hold", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Lateral Lunges", sets: 3, reps: 12, rest_seconds: 30 }, { name: "Calf Raises", sets: 3, reps: 20, rest_seconds: 20 }, { name: "Squat Jumps", sets: 3, reps: 8, rest_seconds: 45 }] },
    { name: "Full Body Cricket Conditioning", level: "advanced", target: "full body", goal: "keep fit", duration_category: "20-25", xp_value: 210, is_premium: false, exercises: [{ name: "Burpees", sets: 4, reps: 10, rest_seconds: 30 }, { name: "Pull-Up Simulation", sets: 3, reps: 12, rest_seconds: 45 }, { name: "Box Jumps", sets: 3, reps: 8, rest_seconds: 45 }, { name: "Plank to Push-Up", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Sprint Drill", sets: 5, reps: 1, rest_seconds: 30 }] },
    { name: "Beginner Strength Foundation", level: "beginner", target: "full body", goal: "build muscle", duration_category: "15-20", xp_value: 100, is_premium: false, exercises: [{ name: "Wall Push-Ups", sets: 3, reps: 15, rest_seconds: 30 }, { name: "Chair Squats", sets: 3, reps: 15, rest_seconds: 30 }, { name: "Plank Hold", sets: 3, reps: 20, rest_seconds: 30 }, { name: "Glute Bridge", sets: 3, reps: 15, rest_seconds: 30 }] },
    { name: "Pro Athlete Power", level: "pro", target: "full body", goal: "build muscle", duration_category: "25+", xp_value: 320, is_premium: true, exercises: [{ name: "Plyometric Push-Ups", sets: 5, reps: 8, rest_seconds: 60 }, { name: "Pistol Squat Progressions", sets: 4, reps: 6, rest_seconds: 90 }, { name: "Explosive Pull-Ups", sets: 4, reps: 6, rest_seconds: 90 }, { name: "Sprint Intervals", sets: 8, reps: 1, rest_seconds: 30 }, { name: "L-Sit Practice", sets: 3, reps: 10, rest_seconds: 60 }] },
    { name: "Spine & Posture Restore", level: "beginner", target: "back", goal: "keep fit", duration_category: "10-15", xp_value: 80, is_premium: false, exercises: [{ name: "Cat-Cow Stretch", sets: 3, reps: 10, rest_seconds: 15 }, { name: "Childs Pose", sets: 3, reps: 30, rest_seconds: 15 }, { name: "Cobra Pose", sets: 3, reps: 10, rest_seconds: 15 }, { name: "Thoracic Rotations", sets: 2, reps: 15, rest_seconds: 20 }] },
    { name: "Pre-Match Activation", level: "beginner", target: "full body", goal: "keep fit", duration_category: "<10", xp_value: 65, is_premium: false, exercises: [{ name: "Dynamic Stretches", sets: 2, reps: 10, rest_seconds: 15 }, { name: "Ankle Rotations", sets: 2, reps: 15, rest_seconds: 10 }, { name: "Hip Flexor Activation", sets: 2, reps: 10, rest_seconds: 15 }, { name: "Shoulder Warm-Up Circles", sets: 2, reps: 15, rest_seconds: 10 }] },
    { name: "Posterior Chain Power", level: "advanced", target: "back", goal: "build muscle", duration_category: "20-25", xp_value: 195, is_premium: false, exercises: [{ name: "Deadlift BW", sets: 4, reps: 12, rest_seconds: 60 }, { name: "Good Mornings", sets: 3, reps: 12, rest_seconds: 45 }, { name: "Reverse Hypers", sets: 3, reps: 15, rest_seconds: 45 }, { name: "Superman Hold", sets: 3, reps: 15, rest_seconds: 30 }] },
    { name: "Shoulder Longevity", level: "beginner", target: "shoulders", goal: "keep fit", duration_category: "10-15", xp_value: 75, is_premium: false, exercises: [{ name: "Pendulum Swings", sets: 2, reps: 20, rest_seconds: 20 }, { name: "Wall Slides", sets: 3, reps: 12, rest_seconds: 20 }, { name: "Band Face Pulls", sets: 3, reps: 15, rest_seconds: 20 }, { name: "Cross-Body Shoulder Stretch", sets: 2, reps: 30, rest_seconds: 15 }] },
    { name: "Sprint Speed Development", level: "intermediate", target: "legs", goal: "keep fit", duration_category: "15-20", xp_value: 155, is_premium: false, exercises: [{ name: "A-Skip Drills", sets: 3, reps: 20, rest_seconds: 45 }, { name: "B-Skip Drills", sets: 3, reps: 20, rest_seconds: 45 }, { name: "Running Arms Drill", sets: 3, reps: 20, rest_seconds: 30 }, { name: "Acceleration Sprints 20m", sets: 6, reps: 1, rest_seconds: 60 }] },
    { name: "Core Rotation Power", level: "intermediate", target: "core", goal: "build muscle", duration_category: "15-20", xp_value: 145, is_premium: false, exercises: [{ name: "Russian Twists", sets: 3, reps: 20, rest_seconds: 30 }, { name: "Woodchops", sets: 3, reps: 12, rest_seconds: 30 }, { name: "Side Plank Rotation", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Pallof Press BW", sets: 3, reps: 12, rest_seconds: 30 }] },
    { name: "Total Body Fat Torch", level: "advanced", target: "full body", goal: "lose weight", duration_category: "20-25", xp_value: 215, is_premium: false, exercises: [{ name: "Burpee Box Jumps", sets: 4, reps: 8, rest_seconds: 30 }, { name: "Sprint 30m", sets: 6, reps: 1, rest_seconds: 30 }, { name: "Jump Lunges", sets: 4, reps: 12, rest_seconds: 30 }, { name: "Mountain Climbers Fast", sets: 4, reps: 30, rest_seconds: 20 }] },
    { name: "Balance & Proprioception", level: "beginner", target: "legs", goal: "keep fit", duration_category: "10-15", xp_value: 85, is_premium: false, exercises: [{ name: "Single Leg Stand", sets: 3, reps: 30, rest_seconds: 20 }, { name: "Eyes Closed Balance", sets: 3, reps: 20, rest_seconds: 20 }, { name: "Tandem Walk", sets: 3, reps: 10, rest_seconds: 20 }, { name: "Single Leg Reach", sets: 3, reps: 10, rest_seconds: 20 }] },
    { name: "Arm Endurance Circuit", level: "intermediate", target: "arms", goal: "keep fit", duration_category: "10-15", xp_value: 120, is_premium: false, exercises: [{ name: "Push-Ups Max", sets: 4, reps: 20, rest_seconds: 30 }, { name: "Tricep Dips", sets: 4, reps: 15, rest_seconds: 30 }, { name: "Diamond Push-Ups", sets: 3, reps: 12, rest_seconds: 30 }, { name: "Plank Hold", sets: 3, reps: 30, rest_seconds: 20 }] },
    { name: "Elite Conditioning Circuit", level: "pro", target: "full body", goal: "keep fit", duration_category: "25+", xp_value: 310, is_premium: true, exercises: [{ name: "Plyometric Lunges", sets: 4, reps: 12, rest_seconds: 60 }, { name: "Sprint Pyramid", sets: 5, reps: 1, rest_seconds: 45 }, { name: "Clapping Push-Ups", sets: 4, reps: 8, rest_seconds: 60 }, { name: "Tuck Jumps", sets: 4, reps: 10, rest_seconds: 45 }] },
    { name: "Lower Body Stretch", level: "beginner", target: "legs", goal: "keep fit", duration_category: "<10", xp_value: 60, is_premium: false, exercises: [{ name: "Quad Stretch", sets: 2, reps: 30, rest_seconds: 10 }, { name: "Hamstring Stretch", sets: 2, reps: 30, rest_seconds: 10 }, { name: "Hip Flexor Lunge", sets: 2, reps: 30, rest_seconds: 10 }, { name: "Calf Stretch", sets: 2, reps: 30, rest_seconds: 10 }] },
    { name: "Chest & Back Superset", level: "intermediate", target: "chest", goal: "build muscle", duration_category: "15-20", xp_value: 150, is_premium: false, exercises: [{ name: "Push-Ups", sets: 4, reps: 15, rest_seconds: 30 }, { name: "Superman Hold", sets: 4, reps: 15, rest_seconds: 30 }, { name: "Wide Push-Ups", sets: 3, reps: 12, rest_seconds: 30 }, { name: "Back Extension", sets: 3, reps: 15, rest_seconds: 30 }] },
    { name: "Game Ready Warm-Up", level: "beginner", target: "full body", goal: "keep fit", duration_category: "<10", xp_value: 60, is_premium: false, exercises: [{ name: "Jog in Place", sets: 1, reps: 60, rest_seconds: 10 }, { name: "Arm Swings", sets: 2, reps: 20, rest_seconds: 10 }, { name: "Leg Swings", sets: 2, reps: 15, rest_seconds: 10 }, { name: "Torso Twists", sets: 2, reps: 20, rest_seconds: 10 }] },
    { name: "Power Endurance Advanced", level: "advanced", target: "full body", goal: "keep fit", duration_category: "20-25", xp_value: 210, is_premium: false, exercises: [{ name: "10m Sprint Repeats", sets: 8, reps: 1, rest_seconds: 20 }, { name: "Burpees", sets: 4, reps: 10, rest_seconds: 20 }, { name: "Box Step-Ups Fast", sets: 4, reps: 12, rest_seconds: 20 }, { name: "Plyo Push-Ups", sets: 3, reps: 8, rest_seconds: 30 }, { name: "Jump Squats", sets: 4, reps: 10, rest_seconds: 20 }] },
    { name: "Glute Activation", level: "beginner", target: "legs", goal: "build muscle", duration_category: "<10", xp_value: 70, is_premium: false, exercises: [{ name: "Clamshells", sets: 3, reps: 15, rest_seconds: 20 }, { name: "Glute Bridge", sets: 3, reps: 20, rest_seconds: 20 }, { name: "Donkey Kicks", sets: 3, reps: 15, rest_seconds: 20 }, { name: "Fire Hydrants", sets: 3, reps: 15, rest_seconds: 20 }] },
    { name: "Cricket Strength & Power", level: "advanced", target: "full body", goal: "build muscle", duration_category: "25+", xp_value: 225, is_premium: false, exercises: [{ name: "Single Leg Squat", sets: 4, reps: 8, rest_seconds: 60 }, { name: "Explosive Push-Ups", sets: 4, reps: 10, rest_seconds: 60 }, { name: "Nordic Hamstring Curls", sets: 3, reps: 6, rest_seconds: 90 }, { name: "Sprint Bounds", sets: 5, reps: 8, rest_seconds: 60 }, { name: "Core Anti-Rotation", sets: 3, reps: 12, rest_seconds: 45 }] },
    { name: "Desk Cricketer Relief", level: "beginner", target: "full body", goal: "keep fit", duration_category: "<10", xp_value: 55, is_premium: false, exercises: [{ name: "Neck Rolls", sets: 2, reps: 10, rest_seconds: 10 }, { name: "Chest Opener Stretch", sets: 2, reps: 30, rest_seconds: 10 }, { name: "Hip Flexor Stretch", sets: 2, reps: 30, rest_seconds: 10 }, { name: "Wrist Mobility", sets: 2, reps: 15, rest_seconds: 10 }] },
    { name: "Interval Sprint Series", level: "intermediate", target: "legs", goal: "lose weight", duration_category: "15-20", xp_value: 160, is_premium: false, exercises: [{ name: "30m Sprint", sets: 6, reps: 1, rest_seconds: 60 }, { name: "Walk Recovery", sets: 6, reps: 1, rest_seconds: 60 }, { name: "Bounding", sets: 4, reps: 10, rest_seconds: 45 }, { name: "High Knees Fast", sets: 4, reps: 30, rest_seconds: 30 }] },
    { name: "Shoulder Health Protocol", level: "intermediate", target: "shoulders", goal: "keep fit", duration_category: "15-20", xp_value: 130, is_premium: false, exercises: [{ name: "YTW Exercise", sets: 3, reps: 10, rest_seconds: 30 }, { name: "Band External Rotation", sets: 3, reps: 15, rest_seconds: 30 }, { name: "Wall Slides", sets: 3, reps: 12, rest_seconds: 30 }, { name: "Prone T Exercise", sets: 3, reps: 12, rest_seconds: 30 }] },
    { name: "Knee Stability Builder", level: "beginner", target: "legs", goal: "keep fit", duration_category: "10-15", xp_value: 80, is_premium: false, exercises: [{ name: "Wall Sit Hold", sets: 3, reps: 30, rest_seconds: 30 }, { name: "Terminal Knee Extension", sets: 3, reps: 15, rest_seconds: 20 }, { name: "Straight Leg Raise", sets: 3, reps: 15, rest_seconds: 20 }, { name: "Step-Ups", sets: 3, reps: 12, rest_seconds: 30 }] },
    { name: "Advanced HIIT Finisher", level: "advanced", target: "full body", goal: "lose weight", duration_category: "10-15", xp_value: 175, is_premium: false, exercises: [{ name: "Tabata Burpees", sets: 8, reps: 8, rest_seconds: 10 }, { name: "Tabata Mountain Climbers", sets: 8, reps: 20, rest_seconds: 10 }, { name: "Sprint 20m", sets: 5, reps: 1, rest_seconds: 15 }] },
    { name: "Upper Body Volume Day", level: "intermediate", target: "upper body", goal: "build muscle", duration_category: "20-25", xp_value: 170, is_premium: false, exercises: [{ name: "Push-Up Max Sets", sets: 5, reps: 15, rest_seconds: 30 }, { name: "Pike Push-Ups", sets: 4, reps: 10, rest_seconds: 30 }, { name: "Dips", sets: 4, reps: 12, rest_seconds: 30 }, { name: "Plank Shoulder Taps", sets: 3, reps: 20, rest_seconds: 30 }] },
    { name: "Mobility Master Class", level: "intermediate", target: "full body", goal: "keep fit", duration_category: "15-20", xp_value: 140, is_premium: false, exercises: [{ name: "Worlds Greatest Stretch", sets: 3, reps: 8, rest_seconds: 15 }, { name: "90 90 Hip Rotation", sets: 3, reps: 10, rest_seconds: 15 }, { name: "Thoracic Spine Rotation", sets: 3, reps: 12, rest_seconds: 15 }, { name: "Deep Squat Hold", sets: 3, reps: 30, rest_seconds: 20 }] },
    { name: "Pro Power Sprint Series", level: "pro", target: "legs", goal: "keep fit", duration_category: "20-25", xp_value: 285, is_premium: true, exercises: [{ name: "Flying 30s Sprint", sets: 6, reps: 1, rest_seconds: 120 }, { name: "Wicket Runs Simulation", sets: 5, reps: 4, rest_seconds: 60 }, { name: "Resisted Sprints", sets: 4, reps: 1, rest_seconds: 90 }, { name: "Depth Jump to Sprint", sets: 4, reps: 3, rest_seconds: 90 }] },
    { name: "Core Comprehensive", level: "intermediate", target: "core", goal: "build muscle", duration_category: "15-20", xp_value: 145, is_premium: false, exercises: [{ name: "Plank Hold", sets: 3, reps: 45, rest_seconds: 30 }, { name: "Side Plank", sets: 3, reps: 30, rest_seconds: 30 }, { name: "V-Ups", sets: 3, reps: 12, rest_seconds: 30 }, { name: "Flutter Kicks", sets: 3, reps: 30, rest_seconds: 30 }, { name: "Russian Twists", sets: 3, reps: 20, rest_seconds: 30 }] },
    { name: "Active Recovery Flow", level: "beginner", target: "full body", goal: "keep fit", duration_category: "10-15", xp_value: 75, is_premium: false, exercises: [{ name: "Light Walking", sets: 1, reps: 120, rest_seconds: 0 }, { name: "Gentle Yoga Stretches", sets: 3, reps: 30, rest_seconds: 10 }, { name: "Deep Breathing", sets: 3, reps: 10, rest_seconds: 10 }] },
    { name: "Plyometric Power Dev", level: "advanced", target: "legs", goal: "build muscle", duration_category: "20-25", xp_value: 205, is_premium: false, exercises: [{ name: "Depth Jumps", sets: 4, reps: 6, rest_seconds: 90 }, { name: "Broad Jumps", sets: 4, reps: 6, rest_seconds: 60 }, { name: "Single Leg Hops", sets: 3, reps: 8, rest_seconds: 60 }, { name: "Reactive Sprint", sets: 5, reps: 1, rest_seconds: 45 }] },
    { name: "Neck & Trap Strength", level: "beginner", target: "back", goal: "keep fit", duration_category: "<10", xp_value: 60, is_premium: false, exercises: [{ name: "Neck Isometrics", sets: 3, reps: 10, rest_seconds: 15 }, { name: "Shrug Hold", sets: 3, reps: 10, rest_seconds: 15 }, { name: "Upper Trap Stretch", sets: 2, reps: 30, rest_seconds: 10 }, { name: "Chin Tucks", sets: 3, reps: 12, rest_seconds: 10 }] },
    { name: "Functional Movement Screen", level: "beginner", target: "full body", goal: "keep fit", duration_category: "10-15", xp_value: 70, is_premium: false, exercises: [{ name: "Overhead Squat", sets: 2, reps: 10, rest_seconds: 20 }, { name: "Hurdle Step Simulation", sets: 2, reps: 10, rest_seconds: 20 }, { name: "In-Line Lunge", sets: 2, reps: 10, rest_seconds: 20 }, { name: "Shoulder Mobility Test", sets: 2, reps: 5, rest_seconds: 15 }] },
    { name: "Hamstring & Glute Focus", level: "intermediate", target: "legs", goal: "build muscle", duration_category: "15-20", xp_value: 155, is_premium: false, exercises: [{ name: "Romanian Deadlift BW", sets: 4, reps: 12, rest_seconds: 45 }, { name: "Glute Bridge Marching", sets: 3, reps: 15, rest_seconds: 30 }, { name: "Nordic Curl Negatives", sets: 3, reps: 6, rest_seconds: 90 }, { name: "Step-Up & Drive", sets: 3, reps: 10, rest_seconds: 30 }] },
    { name: "Wrist & Forearm Strength", level: "beginner", target: "arms", goal: "build muscle", duration_category: "<10", xp_value: 65, is_premium: false, exercises: [{ name: "Wrist Curls", sets: 3, reps: 20, rest_seconds: 20 }, { name: "Reverse Wrist Curls", sets: 3, reps: 20, rest_seconds: 20 }, { name: "Grip Squeeze", sets: 3, reps: 30, rest_seconds: 15 }, { name: "Finger Extensions", sets: 3, reps: 15, rest_seconds: 15 }] },
    { name: "Cross-Training Triathlon", level: "advanced", target: "full body", goal: "keep fit", duration_category: "25+", xp_value: 220, is_premium: false, exercises: [{ name: "1km Run Pace", sets: 1, reps: 1, rest_seconds: 120 }, { name: "50 Push-Ups", sets: 1, reps: 50, rest_seconds: 60 }, { name: "50 Squats", sets: 1, reps: 50, rest_seconds: 60 }, { name: "2min Plank", sets: 1, reps: 120, rest_seconds: 60 }, { name: "Sprint Finish 200m", sets: 1, reps: 1, rest_seconds: 0 }] },
    { name: "Power Up Morning Routine", level: "intermediate", target: "full body", goal: "keep fit", duration_category: "10-15", xp_value: 125, is_premium: false, exercises: [{ name: "Jumping Jacks", sets: 3, reps: 20, rest_seconds: 15 }, { name: "Push-Ups", sets: 3, reps: 12, rest_seconds: 20 }, { name: "Bodyweight Squats", sets: 3, reps: 15, rest_seconds: 20 }, { name: "Plank Hold", sets: 3, reps: 30, rest_seconds: 15 }] },
    { name: "Cricket Sprints & Recovery", level: "intermediate", target: "legs", goal: "keep fit", duration_category: "15-20", xp_value: 150, is_premium: false, exercises: [{ name: "22-yard Pitch Sprint", sets: 8, reps: 1, rest_seconds: 30 }, { name: "Walk Back Recovery", sets: 8, reps: 1, rest_seconds: 30 }, { name: "Lateral Shuffle 5m", sets: 4, reps: 10, rest_seconds: 20 }] }
  ];
  var skillPathsDb = {
    batting: {
      id: "sp_batting",
      title: "Batting Mastery",
      description: "Master all aspects of cricket batting",
      icon: "Target",
      color: "from-blue-500 to-indigo-600",
      levels: [
        { level: 1, title: "Stance & Grip", xp_required: 0, drills: ["d001", "d003", "d006"] },
        { level: 2, title: "Basic Shots", xp_required: 200, drills: ["d001", "d003", "d041", "d009"] },
        { level: 3, title: "Rotation & Running", xp_required: 500, drills: ["d009", "d056", "d057"] },
        { level: 4, title: "Power Hitting", xp_required: 1e3, drills: ["d002", "d039", "d040"] },
        { level: 5, title: "Advanced Technique", xp_required: 2e3, drills: ["d007", "d010", "d051", "d052"] }
      ]
    },
    bowling: {
      id: "sp_bowling",
      title: "Bowling Excellence",
      description: "Develop pace swing spin and variation",
      icon: "Zap",
      color: "from-emerald-500 to-teal-600",
      levels: [
        { level: 1, title: "Action & Run-Up", xp_required: 0, drills: ["d018", "d055", "d046"] },
        { level: 2, title: "Swing & Seam", xp_required: 200, drills: ["d011", "d012", "d046"] },
        { level: 3, title: "Line & Length", xp_required: 500, drills: ["d015", "d018", "d045"] },
        { level: 4, title: "Variations", xp_required: 1e3, drills: ["d016", "d019", "d059"] },
        { level: 5, title: "Death Bowling", xp_required: 2e3, drills: ["d015", "d020", "d047"] }
      ]
    },
    fielding: {
      id: "sp_fielding",
      title: "Fielding Brilliance",
      description: "Become an elite fielder",
      icon: "Shield",
      color: "from-orange-500 to-red-600",
      levels: [
        { level: 1, title: "Ground Fielding", xp_required: 0, drills: ["d021", "d053", "d027"] },
        { level: 2, title: "Throwing", xp_required: 150, drills: ["d024", "d028"] },
        { level: 3, title: "Catching", xp_required: 350, drills: ["d022", "d025", "d058"] },
        { level: 4, title: "Boundary Fielding", xp_required: 700, drills: ["d023", "d026", "d054"] },
        { level: 5, title: "Elite Fielder", xp_required: 1500, drills: ["d023", "d024", "d025", "d028"] }
      ]
    },
    mental: {
      id: "sp_mental",
      title: "Mental Strength",
      description: "Build the mental game of champions",
      icon: "Brain",
      color: "from-purple-500 to-pink-600",
      levels: [
        { level: 1, title: "Foundations", xp_required: 0, drills: ["d037", "d049", "d038"] },
        { level: 2, title: "Focus", xp_required: 200, drills: ["d036", "d037", "d038"] },
        { level: 3, title: "Pressure", xp_required: 500, drills: ["d036", "d050"] },
        { level: 4, title: "Visualization", xp_required: 1e3, drills: ["d037", "d050"] },
        { level: 5, title: "Elite Mindset", xp_required: 2e3, drills: ["d036", "d037", "d038", "d049", "d050"] }
      ]
    }
  };
  var SC_DATA = { jokes, facts, drills, mentalRoutines, workouts, quickStartWorkouts, skillPathsDb };

  // src/app.jsx
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
  function lsFilter(entity, fn) {
    return getAll(entity).filter(fn);
  }
  function lsCreate(entity, data) {
    const arr = getAll(entity);
    const r = { ...data, id: data.id || uuid(), created_date: data.created_date || now() };
    arr.push(r);
    setAll(entity, arr);
    return r;
  }
  function lsUpdate(entity, id, updates) {
    const arr = getAll(entity);
    const i = arr.findIndex((r) => r.id === id);
    if (i === -1) return null;
    arr[i] = { ...arr[i], ...updates, updated_date: now() };
    setAll(entity, arr);
    return arr[i];
  }
  function lsDelete(entity, id) {
    setAll(entity, getAll(entity).filter((r) => r.id !== id));
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
      window.location.reload();
    },
    isLoggedIn() {
      return !!Auth.me();
    }
  };
  function getGuestId() {
    const u = Auth.me();
    if (u?.email) return u.email;
    let g = localStorage.getItem("smartcrick_guest_id");
    if (!g) {
      g = "guest_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
      localStorage.setItem("smartcrick_guest_id", g);
    }
    return g;
  }
  function getPremiumStatus() {
    try {
      const r = localStorage.getItem("smartcrick_premium");
      if (!r) return { is_premium: false, plan: null };
      const d = JSON.parse(r);
      return { is_premium: true, plan: d.plan || "monthly" };
    } catch {
      return { is_premium: false, plan: null };
    }
  }
  var entities = {
    UserProgress: { filter: (q) => lsFilter("UserProgress", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("UserProgress", d), update: (id, u) => lsUpdate("UserProgress", id, u), list: () => lsList("UserProgress") },
    UserProfile: { filter: (q) => lsFilter("UserProfile", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("UserProfile", d), update: (id, u) => lsUpdate("UserProfile", id, u) },
    Profile: { filter: (q) => lsFilter("Profile", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("Profile", d), update: (id, u) => lsUpdate("Profile", id, u) },
    Leaderboard: { filter: (q) => lsFilter("Leaderboard", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("Leaderboard", d), update: (id, u) => lsUpdate("Leaderboard", id, u), list: () => lsList("Leaderboard") },
    Workout: { filter: (q) => lsFilter("Workout", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("Workout", d), update: (id, u) => lsUpdate("Workout", id, u), delete: (id) => lsDelete("Workout", id), list: () => lsList("Workout") },
    Notification: { filter: (q) => lsFilter("Notification", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("Notification", d), update: (id, u) => lsUpdate("Notification", id, u), list: () => lsList("Notification") },
    ScheduledActivity: { filter: (q) => lsFilter("ScheduledActivity", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("ScheduledActivity", d), update: (id, u) => lsUpdate("ScheduledActivity", id, u) },
    PremiumSubscription: { filter: () => {
      const p = getPremiumStatus();
      if (!p.is_premium) return [];
      return [{ id: "prem_local", user_email: getGuestId(), is_premium: true, plan: p.plan }];
    } },
    Match: { filter: (q) => lsFilter("Match", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("Match", d), update: (id, u) => lsUpdate("Match", id, u), delete: (id) => lsDelete("Match", id) },
    SkillPath: { filter: (q) => lsFilter("SkillPath", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("SkillPath", d), update: (id, u) => lsUpdate("SkillPath", id, u) },
    CustomDrillWorkout: { filter: (q) => lsFilter("CustomDrillWorkout", (r) => Object.keys(q).every((k) => r[k] === q[k])), create: (d) => lsCreate("CustomDrillWorkout", d), update: (id, u) => lsUpdate("CustomDrillWorkout", id, u), delete: (id) => lsDelete("CustomDrillWorkout", id) }
  };
  function createPageUrl(page) {
    const b = page.includes("?") ? page.split("?")[0] : page;
    const q = page.includes("?") ? "?" + page.split("?")[1] : "";
    return "#/" + b + q;
  }
  function navigate(page) {
    window.location.hash = createPageUrl(page);
  }
  function parseHash() {
    const raw = window.location.hash.replace(/^#\/?/, "") || "Home";
    const [path, qs] = raw.split("?");
    const params = {};
    if (qs) qs.split("&").forEach((p) => {
      const [k, v] = p.split("=");
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || "");
    });
    return { page: path || "Home", params };
  }
  function getPageParam(key) {
    return parseHash().params[key] || null;
  }
  function useLocation() {
    const R2 = window.React;
    const [loc, setLoc] = R2.useState(parseHash);
    R2.useEffect(() => {
      const h = () => setLoc(parseHash());
      window.addEventListener("hashchange", h);
      return () => window.removeEventListener("hashchange", h);
    }, []);
    return loc;
  }
  var _cache = {};
  var _listeners = {};
  function _notify(k) {
    (_listeners[k] || []).forEach((f) => f());
  }
  function invalidateQuery(key) {
    const k = Array.isArray(key) ? key.join("|") : key;
    delete _cache[k];
    _notify(k);
  }
  function useQuery(key, fn, opts = {}) {
    const R2 = window.React;
    const k = Array.isArray(key) ? key.join("|") : key;
    const [s, setS] = R2.useState({ data: void 0, isLoading: opts.enabled !== false, error: null });
    R2.useEffect(() => {
      if (opts.enabled === false) {
        setS((p) => ({ ...p, isLoading: false }));
        return;
      }
      let cancel = false;
      if (!_listeners[k]) _listeners[k] = [];
      const refresh = () => {
        if (cancel) return;
        delete _cache[k];
        run();
      };
      _listeners[k].push(refresh);
      async function run() {
        if (_cache[k] !== void 0 && opts.staleTime !== 0) {
          setS({ data: _cache[k], isLoading: false, error: null });
          return;
        }
        setS((p) => ({ ...p, isLoading: true }));
        try {
          const d = await fn();
          if (!cancel) {
            _cache[k] = d;
            setS({ data: d, isLoading: false, error: null });
          }
        } catch (e) {
          if (!cancel) setS({ data: void 0, isLoading: false, error: e });
        }
      }
      run();
      return () => {
        cancel = true;
        _listeners[k] = (_listeners[k] || []).filter((f) => f !== refresh);
      };
    }, [k, opts.enabled]);
    return s;
  }
  function useQueryClient() {
    return { invalidateQueries({ queryKey }) {
      invalidateQuery(queryKey);
    } };
  }
  var R = window.React;
  var { useState, useEffect, useRef, useCallback, createContext: createContext2, useContext: useContext2 } = R;
  var DarkModeCtx = createContext2({ isDarkMode: true, toggleDarkMode: () => {
  } });
  var useDarkMode = () => useContext2(DarkModeCtx);
  var dm = (dark, darkVal, lightVal) => dark ? darkVal : lightVal;
  function showXPFlash(xp) {
    const el = document.createElement("div");
    el.className = "xp-flash";
    el.textContent = "+" + xp + " XP";
    el.style.left = window.innerWidth / 2 - 30 + "px";
    el.style.top = window.innerHeight / 2 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
  function fireConfetti() {
    if (window.confetti) window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.55 } });
  }
  function buildDrillList(exercises) {
    const dl = [];
    (exercises || []).forEach((ex) => {
      const sets = ex.sets || 3, rest = ex.rest_seconds || 60;
      for (let s = 1; s <= sets; s++) {
        dl.push({ drill_id: "fit_" + Math.random().toString(36).substr(2, 6) + "_s" + s, drill_title: ex.name + " \u2014 Set " + s, sets: 1, reps: ex.reps || 10, completed_sets: 0, type: "exercise", rest_seconds: rest });
        if (s < sets) dl.push({ drill_id: "rest_" + Math.random().toString(36).substr(2, 6), drill_title: "Rest Period", sets: 1, reps: rest, completed_sets: 0, type: "rest", rest_seconds: rest });
      }
    });
    return dl;
  }
  async function addProgressXP(guestId, xpToAdd, extraMinutes = 0, entityId = null, entityField = null) {
    const res = await entities.UserProgress.filter({ user_email: guestId });
    const prog = res[0];
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const yest = /* @__PURE__ */ new Date();
    yest.setDate(yest.getDate() - 1);
    const yStr = yest.toISOString().split("T")[0];
    if (prog) {
      const already = entityField ? (prog[entityField] || []).includes(entityId) : false;
      const streak = prog.last_practice_date === yStr ? (prog.current_streak || 0) + 1 : prog.last_practice_date === today ? prog.current_streak || 1 : 1;
      const updates = {
        total_xp: (prog.total_xp || 0) + (already ? 0 : xpToAdd),
        total_practice_minutes: (prog.total_practice_minutes || 0) + extraMinutes,
        last_practice_date: today,
        current_streak: streak,
        longest_streak: Math.max(streak, prog.longest_streak || 0)
      };
      if (entityField && !already) updates[entityField] = [...prog[entityField] || [], entityId];
      await entities.UserProgress.update(prog.id, updates);
      const lbs = await entities.Leaderboard.filter({ user_email: guestId });
      if (lbs[0]) await entities.Leaderboard.update(lbs[0].id, { total_xp: (lbs[0].total_xp || 0) + (already ? 0 : xpToAdd), current_streak: streak });
      else await entities.Leaderboard.create({ user_email: guestId, username: prog.display_name || "Player", total_xp: xpToAdd, current_streak: streak });
      return { alreadyDone: already, streak };
    } else {
      await entities.UserProgress.create({ user_email: guestId, total_xp: xpToAdd, total_practice_minutes: extraMinutes, last_practice_date: today, current_streak: 1, longest_streak: 1, ...entityField ? { [entityField]: [entityId] } : {} });
      await entities.Leaderboard.create({ user_email: guestId, username: "Player", total_xp: xpToAdd, current_streak: 1 });
      return { alreadyDone: false, streak: 1 };
    }
  }
  var LEVEL_THRESH = [0, 300, 800, 1800, 4e3, 8e3, 15e3, 25e3];
  var LEVEL_NAMES = ["Rookie", "Amateur", "Club Player", "District", "State", "National", "International", "Legend"];
  function getLevel(xp) {
    let l = 0;
    for (let i = LEVEL_THRESH.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESH[i]) {
        l = i;
        break;
      }
    }
    return l;
  }
  function LevelProgressBar({ xp = 0 }) {
    const { isDarkMode } = useDarkMode();
    const lvl = getLevel(xp);
    const cur = LEVEL_THRESH[lvl] || 0;
    const next = LEVEL_THRESH[lvl + 1] || cur + 1e4;
    const pct = Math.min(100, Math.round((xp - cur) / (next - cur) * 100));
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-emerald-400" }, LEVEL_NAMES[lvl] || "Legend"), /* @__PURE__ */ React.createElement("span", { className: dm(isDarkMode, "text-slate-400", "text-slate-500") }, xp.toLocaleString(), " XP")), /* @__PURE__ */ React.createElement("div", { className: "level-bar-track" }, /* @__PURE__ */ React.createElement("div", { className: "level-bar-fill", style: { width: pct + "%" } })), lvl < LEVEL_THRESH.length - 1 && /* @__PURE__ */ React.createElement("p", { className: `text-xs ${dm(isDarkMode, "text-slate-500", "text-slate-400")}` }, (next - xp).toLocaleString(), " XP to ", LEVEL_NAMES[lvl + 1]));
  }
  function StreakDisplay({ streak = 0 }) {
    return /* @__PURE__ */ React.createElement("div", { className: "streak-badge" }, /* @__PURE__ */ React.createElement(Flame, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, streak, " day", streak !== 1 ? "s" : ""));
  }
  function HomeStats({ progress }) {
    const { isDarkMode } = useDarkMode();
    const stats = [
      { Icon: Zap, label: "Total XP", value: progress?.total_xp || 0, color: "from-yellow-400 to-orange-500" },
      { Icon: Target, label: "Drills", value: progress?.completed_drills?.length || 0, color: "from-blue-400 to-cyan-500" },
      { Icon: Brain, label: "Mental", value: progress?.completed_mental_routines?.length || 0, color: "from-purple-400 to-indigo-500" },
      { Icon: Clock, label: "Minutes", value: progress?.total_practice_minutes || 0, color: "from-emerald-400 to-teal-500" },
      { Icon: Flame, label: "Streak", value: progress?.current_streak || 0, color: "from-orange-400 to-red-500" },
      { Icon: Trophy, label: "Match IQ", value: progress?.match_iq || 50, color: "from-amber-400 to-yellow-500" }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, stats.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, className: `rounded-2xl p-4 shadow-lg border ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2` }, /* @__PURE__ */ React.createElement(s.Icon, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("p", { className: `text-2xl font-bold ${dm(isDarkMode, "text-white", "text-slate-800")}` }, s.value.toLocaleString?.() ?? s.value), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${dm(isDarkMode, "text-slate-400", "text-slate-600")}` }, s.label))));
  }
  var SEARCH_PAGES = [
    { name: "Home", kw: ["home", "dashboard", "start"] },
    { name: "Drills", kw: ["drill", "practice", "batting", "bowling", "fielding"] },
    { name: "MentalCoaching", kw: ["mental", "mind", "meditation", "focus", "calm", "brain", "session"] },
    { name: "Coach", kw: ["coach", "ai", "help", "chat", "assistant"] },
    { name: "AIWorkout", kw: ["workout", "ai workout", "saved workouts"] },
    { name: "FitnessBuilder", kw: ["fitness", "builder", "gym", "generate", "bodyweight"] },
    { name: "SkillPaths", kw: ["skill", "path", "journey", "roadmap", "level up"] },
    { name: "Progress", kw: ["progress", "stats", "xp", "achievement", "badge"] },
    { name: "Profile", kw: ["profile", "account", "name", "me"] },
    { name: "Timer", kw: ["timer", "stopwatch", "countdown", "clock"] },
    { name: "Premium", kw: ["premium", "upgrade", "subscription", "pro", "lifetime", "yearly"] },
    { name: "Leaderboard", kw: ["leaderboard", "rank", "compete", "top", "board"] },
    { name: "Goals", kw: ["goals", "target", "objective"] },
    { name: "Schedule", kw: ["schedule", "calendar", "plan", "training plan"] },
    { name: "MatchTracker", kw: ["match", "tracker", "game", "cricket match", "log"] },
    { name: "WorkoutBuilder", kw: ["workout builder", "custom workout"] },
    { name: "NinetyDayChallenge", kw: ["90 day", "challenge", "program", "lifetime"] },
    { name: "ThirtyDayChallenge", kw: ["30 day", "thirty", "challenge"] },
    { name: "WhyDidIGetOut", kw: ["dismissal", "out", "wicket", "analyze", "why"] },
    { name: "DrillYouTubeFinder", kw: ["youtube", "video", "watch", "find drill"] },
    { name: "Quizzes", kw: ["quiz", "test", "knowledge", "question"] },
    { name: "HeadCoach", kw: ["head coach", "personal coach", "premium coach"] },
    { name: "ConfidenceCheckIn", kw: ["confidence", "confidence check", "how confident"] },
    { name: "MiniMatch", kw: ["mini match", "iq", "scenario"] }
  ];
  function QuickPageSearch() {
    const { isDarkMode } = useDarkMode();
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const filtered = SEARCH_PAGES.filter((p) => term.length > 0 && (p.name.toLowerCase().includes(term.toLowerCase()) || p.kw.some((k) => k.includes(term.toLowerCase()))));
    return /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: term,
        onChange: (e) => {
          setTerm(e.target.value);
          setOpen(true);
        },
        onFocus: () => setOpen(true),
        placeholder: "Quick search: Drills, Coach, Goals...",
        className: `w-full h-14 pl-12 pr-12 rounded-2xl border-2 text-sm focus:outline-none transition-all ${dm(isDarkMode, "bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500", "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-emerald-400")}`
      }
    ), term && /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setTerm("");
      setOpen(false);
    }, className: "absolute right-4 top-1/2 -translate-y-1/2" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4 text-slate-400" }))), open && filtered.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "search-dropdown" }, filtered.slice(0, 7).map((p) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: p.name,
        onClick: () => {
          navigate(p.name);
          setTerm("");
          setOpen(false);
        },
        className: "w-full px-5 py-3 text-left flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 last:border-b-0 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
      },
      /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-emerald-500 flex-shrink-0" }),
      /* @__PURE__ */ React.createElement("span", { className: `font-medium text-sm ${dm(isDarkMode, "text-slate-200", "text-slate-800")}` }, p.name)
    ))), /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) })));
  }
  var MOODS = [
    { value: "great", label: "Great!", Icon: Smile },
    { value: "good", label: "Good", Icon: Smile },
    { value: "okay", label: "Okay", Icon: Meh },
    { value: "not_great", label: "Not Great", Icon: Frown }
  ];
  function PlayerCheckIn() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const todayKey = `checkin_date_${guestId}_${(/* @__PURE__ */ new Date()).toDateString()}`;
    const [checked, setChecked] = useState(() => !!localStorage.getItem(todayKey));
    const [pending, setPending] = useState(false);
    if (checked) return null;
    const checkIn = async (mood) => {
      setPending(true);
      setChecked(true);
      localStorage.setItem(todayKey, "1");
      try {
        const today = /* @__PURE__ */ new Date();
        const d = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        await entities.ScheduledActivity.create({ user_email: guestId, title: `Mood Check-In: ${mood.label}`, notes: `Feeling ${mood.label.toLowerCase()} today`, date: d, activity_type: "custom" });
        setTimeout(() => navigate("ScheduleExtendedView"), 1e3);
      } catch (e) {
        console.error(e);
      }
      setPending(false);
    };
    return /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border ${dm(isDarkMode, "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700", "bg-gradient-to-br from-white to-pink-50/30 border-white/50")}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-2 text-lg flex items-center gap-2 ${dm(isDarkMode, "text-white", "text-slate-800")}` }, /* @__PURE__ */ React.createElement(Heart, { className: "w-6 h-6 text-pink-500" }), "Player Check-In"), /* @__PURE__ */ React.createElement("p", { className: `text-sm mb-4 ${dm(isDarkMode, "text-slate-300", "text-slate-600")}` }, "How are you feeling today?"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, MOODS.map((mood) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: mood.value,
        onClick: () => checkIn(mood),
        disabled: pending,
        className: `p-4 rounded-2xl flex flex-col items-center transition-all border active:scale-95 disabled:opacity-50 ${dm(isDarkMode, "bg-slate-700 hover:bg-slate-600 border-slate-600", "bg-white hover:bg-slate-50 border-slate-200")}`
      },
      /* @__PURE__ */ React.createElement(mood.Icon, { className: `w-10 h-10 mb-2 ${dm(isDarkMode, "text-slate-300", "text-slate-600")}` }),
      /* @__PURE__ */ React.createElement("p", { className: `font-semibold text-sm ${dm(isDarkMode, "text-white", "text-slate-800")}` }, mood.label)
    ))));
  }
  function SmartStart() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const prem = getPremiumStatus();
    const qc = useQueryClient();
    const [recs, setRecs] = useState([]);
    const [doneKeys, setDoneKeys] = useState([]);
    const [pending, setPending] = useState(false);
    useEffect(() => {
      const drills2 = SC_DATA.drills || [];
      const mentals = SC_DATA.mentalRoutines || [];
      const workouts2 = SC_DATA.quickStartWorkouts || [];
      if (!mentals.length) return;
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const seed = (today + guestId).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      const pick = (arr, n) => {
        const s = [...arr];
        for (let i = s.length - 1; i > 0; i--) {
          const j = Math.abs(seed * (i + 1) * 1664525 + 1013904223) % s.length;
          [s[i], s[j]] = [s[j], s[i]];
        }
        return s.slice(0, n);
      };
      const avD = drills2.filter((d) => !d.is_premium || prem.is_premium);
      const avM = mentals.filter((m) => !m.is_premium || prem.is_premium);
      const avW = workouts2.filter((w) => !w.is_premium || prem.is_premium);
      const total = [3, 4, 5][seed % 3];
      const mCnt = total === 5 ? 2 : 1, dCnt = total === 3 ? 1 : 2;
      const built = [];
      pick(avM, mCnt).forEach((m) => built.push({ type: "mental", id: m.id, title: m.title, category: m.category?.replace(/-/g, " ") || "Mental", label: "Mental Session", Icon: Brain, data: m }));
      pick(avD, dCnt).forEach((d) => built.push({ type: "drill", id: d.id, title: d.title, category: d.category, label: "Cricket Drill", Icon: Target, data: d }));
      if (avW.length) {
        const w = avW[Math.abs(seed) % avW.length];
        built.push({ type: "workout", id: w.name, title: w.name, category: `${w.target} \xB7 ${w.level}`, label: "Featured Workout", Icon: Dumbbell, data: w, isPremium: !!w.is_premium });
      }
      setRecs(built);
      setDoneKeys(JSON.parse(localStorage.getItem(`smartstart_completed_${today}_${guestId}`) || "[]"));
      const nk = `smartstart_notif_${today}_${guestId}`;
      if (!localStorage.getItem(nk) && built.length) {
        localStorage.setItem(nk, "1");
        entities.Notification.create({ user_email: guestId, type: "schedule", title: "Smart Start: Your Daily Picks!", message: `Today: ${built.map((r) => r.title).join(", ")}`, is_read: false }).catch(() => {
        });
      }
    }, [guestId]);
    useEffect(() => {
      const handler = (e) => {
        const { type, id } = e.detail || {};
        if (!type) return;
        const today = (/* @__PURE__ */ new Date()).toDateString();
        const k = `smartstart_completed_${today}_${guestId}`;
        const done = JSON.parse(localStorage.getItem(k) || "[]");
        const ik = `${type}_${id}`;
        if (!done.includes(ik)) {
          done.push(ik);
          localStorage.setItem(k, JSON.stringify(done));
          setDoneKeys([...done]);
        }
      };
      window.addEventListener("smartstart_item_completed", handler);
      return () => window.removeEventListener("smartstart_item_completed", handler);
    }, [guestId]);
    const isDone = (item) => doneKeys.includes(`${item.type}_${item.id}`);
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
          navigate("Premium");
          return;
        }
        setPending(true);
        try {
          const dl = buildDrillList(item.data.exercises || []);
          localStorage.removeItem("workoutProgress");
          const c = await entities.Workout.create({ user_email: guestId, name: item.data.name, drills: dl, status: "not_started", xp_value: item.data.xp_value || 100 });
          localStorage.setItem("fitnessbuilder_new_workout_id", c.id);
          qc.invalidateQueries({ queryKey: ["userGeneratedWorkouts", guestId] });
          navigate("AIWorkout");
        } catch (e) {
          console.error(e);
        }
        setPending(false);
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border mt-2 ${dm(isDarkMode, "bg-gradient-to-br from-orange-600 to-red-600 border-orange-500", "bg-gradient-to-br from-orange-500 to-red-500 border-orange-400")}` }, /* @__PURE__ */ React.createElement("h2", { className: "font-bold mb-1 text-lg flex items-center gap-2 text-white" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-6 h-6 text-yellow-300" }), "Smart Start"), /* @__PURE__ */ React.createElement("p", { className: "text-xs mb-4 text-orange-100" }, "Personalised picks just for today \u2014 updated daily"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, recs.map((rec) => {
      const done = isDone(rec);
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: `${rec.type}-${rec.id}`,
          onClick: () => handleClick(rec),
          disabled: pending,
          className: `w-full text-left p-4 rounded-xl backdrop-blur-sm border transition-all active:scale-98 ${done ? "bg-white/30 border-white/50" : "bg-white/20 hover:bg-white/30 border-white/30"}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, done ? /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-5 h-5 text-white flex-shrink-0" }) : /* @__PURE__ */ React.createElement(rec.Icon, { className: "w-5 h-5 text-white/80 flex-shrink-0" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: `font-semibold text-sm truncate ${done ? "line-through text-white/70" : "text-white"}` }, rec.title), /* @__PURE__ */ React.createElement("p", { className: `text-xs capitalize ${done ? "text-white/60" : "text-orange-100"}` }, done ? "Done today \u2014 tap to do again" : `${rec.label} \xB7 ${rec.category}`)), rec.isPremium && !prem.is_premium && !done && /* @__PURE__ */ React.createElement(Lock, { className: "w-4 h-4 text-amber-300 flex-shrink-0" }), done && /* @__PURE__ */ React.createElement("span", { className: "text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium flex-shrink-0" }, "Again"), pending && rec.type === "workout" && /* @__PURE__ */ React.createElement("div", { className: "spinner-sm border-white border-t-transparent flex-shrink-0" }))
      );
    }), !recs.length && /* @__PURE__ */ React.createElement("div", { className: "text-center py-4 text-orange-100 text-sm" }, "Loading your picks...")));
  }
  var MENU_ITEMS = [
    { name: "SmartCrick Head Coach", Icon: Crown, page: "HeadCoach", color: "text-purple-600", premium: "yearly", highlight: true },
    { name: "90-Day Challenge", Icon: Rocket, page: "NinetyDayChallenge", color: "text-purple-500", premium: "lifetime", highlight: true },
    { name: "30-Day Challenge", Icon: Flame, page: "ThirtyDayChallenge", color: "text-orange-500", highlight: true },
    { name: "Get Started", Icon: Sparkles, page: "GetToKnowYou", color: "text-pink-500", highlight: true },
    { name: "Home", Icon: House, page: "Home", color: "text-emerald-500" },
    { name: "Goals", Icon: Target, page: "Goals", color: "text-purple-600", highlight: true },
    { name: "AI Coach", Icon: MessageCircle, page: "Coach", color: "text-blue-500" },
    { name: "Skill Paths", Icon: TrendingUp, page: "SkillPaths", color: "text-teal-500" },
    { name: "Drills", Icon: Target, page: "Drills", color: "text-purple-500" },
    { name: "YouTube Drill Finder", Icon: Video, page: "DrillYouTubeFinder", color: "text-red-500" },
    { name: "Drill Workout", Icon: Target, page: "DrillWorkoutCreator", color: "text-blue-500" },
    { name: "Workout Builder", Icon: Dumbbell, page: "WorkoutBuilder", color: "text-purple-600" },
    { name: "AI Workout", Icon: Sparkles, page: "AIWorkout", color: "text-pink-500" },
    { name: "Fitness Builder", Icon: Zap, page: "FitnessBuilder", color: "text-orange-500" },
    { name: "Mental Training", Icon: Brain, page: "MentalCoaching", color: "text-indigo-500" },
    { name: "Mental Creator", Icon: Brain, page: "MentalTrainingCreator", color: "text-purple-500" },
    { name: "Quizzes", Icon: BookOpen, page: "Quizzes", color: "text-amber-500" },
    { name: "Match Tracker", Icon: Trophy, page: "MatchTracker", color: "text-green-600" },
    { name: "Mini-Match", Icon: Zap, page: "MiniMatch", color: "text-orange-500" },
    { name: "Schedule", Icon: Calendar, page: "Schedule", color: "text-violet-500" },
    { name: "Why Did I Get Out?", Icon: TrendingDown, page: "WhyDidIGetOut", color: "text-red-600" },
    { name: "Progress", Icon: Trophy, page: "Progress", color: "text-pink-500" },
    { name: "My Profile", Icon: User, page: "Profile", color: "text-indigo-600" }
  ];
  function Sidebar() {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const scrollRef = useRef(null);
    const scrollPos = useRef(0);
    const { page: currentPage } = useLocation();
    const close = useCallback(() => {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 220);
    }, []);
    const go = useCallback((page) => {
      close();
      setTimeout(() => navigate(page), 80);
    }, [close]);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setOpen(true),
        style: { WebkitTapHighlightColor: "transparent" },
        className: "fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-200"
      },
      /* @__PURE__ */ React.createElement(Menu, { className: "w-6 h-6 text-white" })
    ), open && /* @__PURE__ */ React.createElement("div", { className: `sidebar-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50${closing ? " opacity-0 transition-opacity duration-200" : ""}`, onClick: close }), open && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `sidebar-panel${closing ? " closing" : ""} fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 flex flex-col`,
        onAnimationStart: () => requestAnimationFrame(() => {
          if (scrollRef.current) scrollRef.current.scrollTop = scrollPos.current;
        })
      },
      /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-emerald-500 to-teal-500 p-6 flex items-center justify-between", style: { paddingTop: "max(1.5rem, env(safe-area-inset-top))" } }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white" }, "Smart Cricket"), /* @__PURE__ */ React.createElement("p", { className: "text-emerald-100 text-sm" }, "Train Like a Pro")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("button", { onClick: () => go("Home"), className: "p-2 hover:bg-white/20 rounded-lg transition-colors" }, /* @__PURE__ */ React.createElement(House, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("button", { onClick: close, className: "p-2 hover:bg-white/20 rounded-lg transition-colors" }, /* @__PURE__ */ React.createElement(X, { className: "w-6 h-6 text-white" })))),
      /* @__PURE__ */ React.createElement("div", { className: "flex-1 relative overflow-hidden" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          ref: scrollRef,
          onScroll: () => {
            scrollPos.current = scrollRef.current?.scrollTop || 0;
          },
          className: "h-full overflow-y-auto p-4 space-y-1 scrollbar-visible",
          style: { paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }
        },
        MENU_ITEMS.map((item, i) => {
          const isActive = currentPage === item.page;
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: item.page,
              onClick: () => go(item.page),
              className: `w-full text-left group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive ? "bg-emerald-50 shadow-sm" : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-md"}`
            },
            /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-lg transition-colors ${item.highlight ? "bg-gradient-to-r from-purple-100 to-pink-100" : "bg-slate-50 group-hover:bg-white"} ${item.color}` }, /* @__PURE__ */ React.createElement(item.Icon, { className: "w-5 h-5 transition-transform group-hover:scale-110" })),
            /* @__PURE__ */ React.createElement("span", { className: `font-medium text-sm flex-1 ${item.highlight ? "text-purple-700" : isActive ? "text-emerald-700" : "text-slate-700"}` }, item.name),
            item.premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge" }, item.premium === "yearly" ? "Yearly" : "Lifetime")
          );
        })
      ))
    ));
  }
  var NAV_ITEMS = [
    { name: "Home", Icon: House, page: "Home" },
    { name: "Coach", Icon: MessageCircle, page: "Coach" },
    { name: "Drills", Icon: Target, page: "Drills" },
    { name: "Premium", Icon: Crown, page: "Premium" },
    { name: "Timer", Icon: Clock, page: "Timer" }
  ];
  function BottomNav() {
    const { page: currentPage } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    return /* @__PURE__ */ React.createElement("nav", { className: `bottom-nav-container fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-emerald-100 dark:border-slate-700 z-40 transition-transform duration-300${collapsed ? " translate-y-full" : ""}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setCollapsed((c) => !c),
        "aria-label": collapsed ? "Show navigation" : "Hide navigation",
        className: "absolute left-1/2 -translate-x-1/2 -top-10 bg-white dark:bg-slate-800 rounded-t-xl px-4 py-2 shadow-lg border border-b-0 border-emerald-100 dark:border-slate-700 min-h-[40px] flex items-center justify-center"
      },
      collapsed ? /* @__PURE__ */ React.createElement(ChevronUp, { className: "w-5 h-5 text-slate-600 dark:text-slate-300" }) : /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-5 h-5 text-slate-600 dark:text-slate-300" })
    ), /* @__PURE__ */ React.createElement("div", { className: "max-w-lg mx-auto flex items-center justify-around px-2 py-2" }, NAV_ITEMS.map((item) => {
      const isActive = currentPage === item.page;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: item.name,
          onClick: () => navigate(item.page),
          "aria-label": `Navigate to ${item.name}`,
          className: `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 min-h-[52px] min-w-[52px] justify-center ${isActive ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400"}`
        },
        /* @__PURE__ */ React.createElement(item.Icon, { className: `w-5 h-5 transition-transform duration-300${isActive ? " scale-110" : ""}` }),
        /* @__PURE__ */ React.createElement("span", { className: `text-xs font-medium${isActive ? " text-emerald-600 dark:text-emerald-400" : " text-slate-500 dark:text-slate-400"}` }, item.name)
      );
    })));
  }
  function NotificationBar() {
    const guestId = getGuestId();
    const [notif, setNotif] = useState(null);
    useEffect(() => {
      const load = async () => {
        try {
          const all = await entities.Notification.filter({ user_email: guestId });
          const u = all.find((n) => !n.is_read);
          if (u) setNotif(u);
        } catch (e) {
        }
      };
      load();
      const t = setInterval(load, 6e4);
      return () => clearInterval(t);
    }, [guestId]);
    if (!notif) return null;
    const dismiss = async () => {
      try {
        await entities.Notification.update(notif.id, { is_read: true });
      } catch (e) {
      }
      setNotif(null);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "notification-bar" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 min-w-0" }, /* @__PURE__ */ React.createElement(Bell, { className: "w-4 h-4 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "truncate text-sm" }, notif.title, ": ", notif.message)), /* @__PURE__ */ React.createElement("button", { onClick: dismiss, className: "text-white/80 hover:text-white flex-shrink-0 ml-2" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })));
  }
  function RelevanceChatbot() {
    useEffect(() => {
      if (document.getElementById("rai-script")) return;
      const s = document.createElement("script");
      s.id = "rai-script";
      s.src = "https://app.relevanceai.com/static/js/agent-widget.js?shareId=" + encodeURIComponent("bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/796ea726-3ea3-4505-87cc-0efc3338f064");
      s.async = true;
      document.body.appendChild(s);
      return () => {
        const el = document.getElementById("rai-script");
        if (el) el.remove();
      };
    }, []);
    return null;
  }
  var NO_NAV_PAGES = ["Onboarding", "DrillDetail", "MentalRoutinePlayer", "QuizPlayer", "GetToKnowYou"];
  var LIGHT_BG_PAGES = ["HeadCoach", "NinetyDayChallenge", "ThirtyDayChallenge", "Coach", "DrillYouTubeFinder", "AIDrillRecommendation"];
  function Layout({ children, page }) {
    const showNav = !NO_NAV_PAGES.includes(page);
    const lightBg = LIGHT_BG_PAGES.includes(page);
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen${lightBg ? " bg-white" : ""}` }, showNav && /* @__PURE__ */ React.createElement(Sidebar, null), showNav && /* @__PURE__ */ React.createElement(NotificationBar, null), /* @__PURE__ */ React.createElement("main", { className: showNav ? "page-content" : "min-h-screen" }, children), showNav && /* @__PURE__ */ React.createElement(BottomNav, null), showNav && /* @__PURE__ */ React.createElement(RelevanceChatbot, null));
  }
  function Home() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const qc = useQueryClient();
    const [greeting, setGreeting] = useState("");
    const { data: user } = useQuery(["currentUser"], () => Auth.me());
    const { data: progress } = useQuery(["userProgress", guestId], async () => {
      const r = await entities.UserProgress.filter({ user_email: guestId });
      return r[0] || null;
    }, { staleTime: 0 });
    const { data: profile } = useQuery(["profile", guestId], async () => {
      const r = await entities.Profile.filter({ user_email: guestId });
      return r[0] || null;
    }, { staleTime: 3e4 });
    const { data: userProfile } = useQuery(["userProfile", guestId], async () => {
      const r = await entities.UserProfile.filter({ user_email: guestId });
      return r[0] || null;
    }, { enabled: true });
    useEffect(() => {
      const done = sessionStorage.getItem("onboarding_redirect_done");
      if (user && userProfile !== void 0 && !userProfile?.quiz_completed && !done) {
        sessionStorage.setItem("onboarding_redirect_done", "1");
        navigate("GetToKnowYou");
      }
    }, [user, userProfile]);
    useEffect(() => {
      const h = (/* @__PURE__ */ new Date()).getHours();
      setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
      window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
      const h = () => qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
      window.addEventListener("smartstart_item_completed", h);
      return () => window.removeEventListener("smartstart_item_completed", h);
    }, [guestId]);
    const getJoke = () => {
      const today = (/* @__PURE__ */ new Date()).toDateString();
      if (localStorage.getItem("cricket_joke_date") === today) return localStorage.getItem("cricket_joke") || "";
      const jokes2 = SC_DATA.jokes || [];
      const j = jokes2[Math.floor(Math.random() * jokes2.length)] || "";
      localStorage.setItem("cricket_joke_date", today);
      localStorage.setItem("cricket_joke", j);
      return j;
    };
    const getFact = () => {
      const today = (/* @__PURE__ */ new Date()).toDateString();
      if (localStorage.getItem("cricket_fact_date") === today) return localStorage.getItem("cricket_fact") || "";
      const facts2 = SC_DATA.facts || [];
      const f = facts2[Math.floor(Math.random() * facts2.length)] || "";
      localStorage.setItem("cricket_fact_date", today);
      localStorage.setItem("cricket_fact", f);
      return f;
    };
    const displayName = profile?.username || progress?.display_name || user?.full_name?.split(" ")[0] || "Champ";
    const bg = dm(isDarkMode, "bg-gradient-to-br from-gray-900 via-slate-950 to-black", "bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50");
    const hdrBg = dm(isDarkMode, "bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900", "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500");
    const cardBg = dm(isDarkMode, "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700", "bg-gradient-to-br from-white to-blue-50/30 border-white/50");
    const QUICK = [
      { name: "Ask Coach", Icon: MessageCircle, color: "bg-emerald-500", page: "Coach", desc: "Get instant cricket tips" },
      { name: "Practice", Icon: Target, color: "bg-blue-500", page: "Drills", desc: "Start a drill session" },
      { name: "Mental Training", Icon: Brain, color: "bg-purple-500", page: "MentalCoaching", desc: "Build mental strength" },
      { name: "Quiz", Icon: BookOpen, color: "bg-amber-500", page: "Quizzes", desc: "Test your knowledge" }
    ];
    const EXPLORE = [
      { name: "Fitness Builder", Icon: Dumbbell, page: "FitnessBuilder", color: "from-orange-500 to-red-500", desc: "AI workout plans" },
      { name: "AI Workout", Icon: Dumbbell, page: "AIWorkout", color: "from-cyan-500 to-blue-500", desc: "Your custom workouts" },
      { name: "Mini-Match", Icon: Zap, page: "MiniMatch", color: "from-purple-500 to-pink-500", desc: "Test your IQ" },
      { name: "Skill Paths", Icon: TrendingUp, page: "SkillPaths", color: "from-emerald-500 to-teal-500", desc: "Level up now" },
      { name: "Leaderboard", Icon: Award, page: "Leaderboard", color: "from-amber-500 to-orange-500", desc: "Compete globally" },
      { name: "Drill Workout", Icon: Target, page: "DrillWorkoutCreator", color: "from-indigo-500 to-purple-500", desc: "Build your workout" },
      { name: "Why Got Out?", Icon: Search, page: "WhyDidIGetOut", color: "from-red-500 to-orange-500", desc: "Analyze dismissals" },
      { name: "Match Tracker", Icon: Trophy, page: "MatchTracker", color: "from-green-500 to-teal-500", desc: "Log your matches" }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 transition-colors duration-300 ${bg}` }, /* @__PURE__ */ React.createElement("div", { className: `relative overflow-hidden px-6 pt-8 pb-24 ${hdrBg}` }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-32 translate-x-32", style: { filter: "blur(100px)" } }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-24 -translate-x-24", style: { filter: "blur(100px)" } }), /* @__PURE__ */ React.createElement("div", { className: "relative max-w-lg mx-auto pt-8" }, /* @__PURE__ */ React.createElement("div", { className: "glass rounded-2xl p-4 mb-4 animate-fade-up" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-5 h-5 text-amber-300" }), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-sm" }, "Cricket Joke of the Day")), /* @__PURE__ */ React.createElement("p", { className: "text-white/90 text-sm leading-relaxed" }, getJoke())), /* @__PURE__ */ React.createElement("div", { className: "glass rounded-2xl p-4 mb-4 animate-fade-up delay-50" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement(Target, { className: "w-5 h-5 text-emerald-300" }), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-sm" }, "Cricket Fact of the Day")), /* @__PURE__ */ React.createElement("p", { className: "text-white/90 text-sm leading-relaxed" }, getFact())), /* @__PURE__ */ React.createElement("button", { onClick: toggleDarkMode, className: "w-full glass rounded-2xl p-4 mb-4 flex items-center justify-between hover:bg-white/20 transition-colors animate-fade-up delay-100" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, isDarkMode ? /* @__PURE__ */ React.createElement(Sun, { className: "w-5 h-5 text-white" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-5 h-5 text-white" }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-white text-sm" }, isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode")), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("div", { className: "mb-6 animate-fade-up delay-100" }, /* @__PURE__ */ React.createElement("p", { className: "text-emerald-100 text-sm mb-1" }, greeting, "!"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-white" }, "Hey, ", displayName), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("ScheduleExtendedView"), className: "text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-1 text-sm transition-colors" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-5 h-5" }), /* @__PURE__ */ React.createElement("span", null, "Schedule"))), (progress?.current_streak || 0) >= 0 && /* @__PURE__ */ React.createElement(StreakDisplay, { streak: progress?.current_streak || 0 })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 animate-fade-up delay-150" }, [{ Icon: Target, val: progress?.completed_drills?.length || 0, label: "Drills" }, { Icon: Brain, val: progress?.completed_mental_routines?.length || 0, label: "Mental" }, { Icon: Clock, val: progress?.total_practice_minutes || 0, label: "Minutes" }, { Icon: Trophy, val: progress?.total_xp || 0, label: "XP" }].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, className: "bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg" }, /* @__PURE__ */ React.createElement(s.Icon, { className: "w-8 h-8 text-white mx-auto mb-1" }), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-white" }, s.val.toLocaleString?.() ?? s.val), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-emerald-50 font-medium" }, s.label)))))), /* @__PURE__ */ React.createElement("div", { className: "px-6 -mt-12 max-w-lg mx-auto space-y-6" }, /* @__PURE__ */ React.createElement(SmartStart, null), /* @__PURE__ */ React.createElement(PlayerCheckIn, null), /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border ${cardBg}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-5 flex items-center gap-2 text-lg ${dm(isDarkMode, "text-white", "text-slate-800")}` }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-6 h-6 text-amber-500" }), "Let's Train!"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, QUICK.map((a) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: a.name,
        onClick: () => navigate(a.page),
        className: `rounded-2xl p-5 transition-all shadow-lg hover:shadow-xl border text-left active:scale-95 ${dm(isDarkMode, "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:from-slate-600", "bg-gradient-to-br from-white to-slate-50 border-slate-100 hover:from-slate-50")}`
      },
      /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 ${a.color} rounded-xl flex items-center justify-center mb-3 shadow-md` }, /* @__PURE__ */ React.createElement(a.Icon, { className: "w-6 h-6 text-white" })),
      /* @__PURE__ */ React.createElement("h3", { className: `font-bold text-sm mb-1 ${dm(isDarkMode, "text-white", "text-slate-800")}` }, a.name),
      /* @__PURE__ */ React.createElement("p", { className: `text-xs ${dm(isDarkMode, "text-slate-300", "text-slate-600")}` }, a.desc)
    )))), /* @__PURE__ */ React.createElement(HomeStats, { progress }), /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl shadow-2xl p-6 border ${dm(isDarkMode, "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700", "bg-gradient-to-br from-white to-purple-50/30 border-white/50")}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-5 text-lg flex items-center gap-2 ${dm(isDarkMode, "text-white", "text-slate-800")}` }, /* @__PURE__ */ React.createElement(Star, { className: "w-6 h-6 text-purple-500" }), "Explore More"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-4" }, EXPLORE.map((e) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: e.name,
        onClick: () => navigate(e.page),
        className: `bg-gradient-to-br ${e.color} rounded-2xl p-5 text-left shadow-lg hover:shadow-xl hover:opacity-90 transition-all active:scale-95`
      },
      /* @__PURE__ */ React.createElement(e.Icon, { className: "w-10 h-10 text-white mb-2" }),
      /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-sm mb-0.5" }, e.name),
      /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/80" }, e.desc)
    )))), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => navigate("Progress"),
        className: "w-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-6 flex items-center justify-between hover:shadow-2xl transition-all border border-emerald-400 active:scale-95"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30" }, /* @__PURE__ */ React.createElement(Trophy, { className: "w-7 h-7 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-white text-lg" }, "Your Progress"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-emerald-50 font-medium" }, progress?.badges?.length || 0, " badges \xB7 ", progress?.completed_drills?.length || 0, " drills"))),
      /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-6 h-6 text-white" })
    ), /* @__PURE__ */ React.createElement(QuickPageSearch, null), /* @__PURE__ */ React.createElement("div", { className: "h-16" })));
  }
  function Drills() {
    const { isDarkMode } = useDarkMode();
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("All");
    const drills2 = SC_DATA.drills || [];
    const cats = ["All", ...Array.from(new Set(drills2.map((d) => d.category)))];
    const filtered = drills2.filter((d) => (cat === "All" || d.category === cat) && d.title.toLowerCase().includes(search.toLowerCase()));
    const diffColor = { Beginner: "bg-emerald-100 text-emerald-700", Intermediate: "bg-amber-100 text-amber-700", Advanced: "bg-red-100 text-red-700" };
    const c = (s) => dm(isDarkMode, s.dark, s.light);
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${dm(isDarkMode, "bg-slate-950", "bg-slate-50")}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-emerald-600 to-teal-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Cricket Drills"), /* @__PURE__ */ React.createElement("p", { className: "text-emerald-100 text-sm mb-4" }, drills2.length, " drills across all categories"), /* @__PURE__ */ React.createElement("div", { className: "relative mb-4" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Search drills...",
        className: "w-full h-12 pl-12 pr-4 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:outline-none focus:bg-white/30"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide" }, cats.map((c2) => /* @__PURE__ */ React.createElement("button", { key: c2, onClick: () => setCat(c2), className: `px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all ${cat === c2 ? "bg-white text-emerald-700 border-white" : "bg-white/20 text-white border-white/30 hover:bg-white/30"}` }, c2)))), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 space-y-3 max-w-lg mx-auto" }, filtered.map((d) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: d.id,
        onClick: () => navigate(`DrillDetail?id=${d.id}`),
        className: `w-full text-left rounded-2xl p-4 shadow-md border transition-all hover:scale-[1.01] active:scale-[.99] ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1 flex-wrap" }, /* @__PURE__ */ React.createElement("span", { className: `text-xs font-semibold px-2 py-0.5 rounded-full ${diffColor[d.difficulty] || "bg-gray-100 text-gray-700"}` }, d.difficulty), /* @__PURE__ */ React.createElement("span", { className: `text-xs px-2 py-0.5 rounded-full ${dm(isDarkMode, "bg-slate-700 text-slate-300", "bg-slate-100 text-slate-600")}` }, d.category), d.is_premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge" }, "Pro")), /* @__PURE__ */ React.createElement("h3", { className: `font-bold text-base ${dm(isDarkMode, "text-white", "text-slate-800")}` }, d.title), /* @__PURE__ */ React.createElement("p", { className: `text-sm mt-1 line-clamp-2 ${dm(isDarkMode, "text-slate-400", "text-slate-600")}` }, d.description), /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-4 mt-2 text-xs ${dm(isDarkMode, "text-slate-400", "text-slate-500")}` }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3" }), d.duration_minutes, " min"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-3 h-3 text-amber-500" }), d.xp_value, " XP"))), /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-5 h-5 mt-2 flex-shrink-0 ${dm(isDarkMode, "text-slate-500", "text-slate-400")}` }))
    )), !filtered.length && /* @__PURE__ */ React.createElement("p", { className: `text-center py-12 ${dm(isDarkMode, "text-slate-500", "text-slate-400")}` }, 'No drills found for "', search, '"')));
  }
  function DrillDetail() {
    const { isDarkMode } = useDarkMode();
    const id = getPageParam("id");
    const drill = (SC_DATA.drills || []).find((d) => d.id === id);
    const guestId = getGuestId();
    const qc = useQueryClient();
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const complete = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const { alreadyDone } = await addProgressXP(guestId, drill.xp_value, drill.duration_minutes, drill.id, "completed_drills");
        window.dispatchEvent(new CustomEvent("smartstart_item_completed", { detail: { type: "drill", id: drill.id, title: drill.title } }));
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        if (!alreadyDone) {
          showXPFlash(drill.xp_value);
          fireConfetti();
        }
        setCompleted(true);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    if (!drill) return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Drills"), className: "text-emerald-500 font-bold flex items-center gap-2" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" }), "Back to Drills"));
    const diffColor = { Beginner: "bg-white/20 text-white", Intermediate: "bg-amber-300/30 text-amber-100", Advanced: "bg-red-300/30 text-red-100" };
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${dm(isDarkMode, "bg-slate-950", "bg-slate-50")}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-emerald-600 to-teal-500 px-6 pt-14 pb-8" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Drills"), className: "flex items-center gap-2 text-white/80 hover:text-white mb-4" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" }), "Back"), /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("span", { className: `text-xs font-semibold px-3 py-1 rounded-full ${diffColor[drill.difficulty] || "bg-white/20 text-white"}` }, drill.difficulty), drill.is_premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge" }, "Pro")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white" }, drill.title), /* @__PURE__ */ React.createElement("p", { className: "text-emerald-100 mt-1" }, drill.category))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 mt-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-4 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold text-white" }, drill.duration_minutes), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/70" }, "minutes")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-4 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold text-amber-300" }, drill.xp_value), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/70" }, "XP")))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-6 max-w-lg mx-auto space-y-4" }, [["Description", drill.description], ["Instructions", drill.instructions]].map(([title, text]) => text && /* @__PURE__ */ React.createElement("div", { key: title, className: `rounded-2xl p-5 border ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-2 ${dm(isDarkMode, "text-white", "text-slate-800")}` }, title), /* @__PURE__ */ React.createElement("p", { className: `leading-relaxed ${dm(isDarkMode, "text-slate-300", "text-slate-600")}` }, text))), drill.tips?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl p-5 border ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-3 ${dm(isDarkMode, "text-white", "text-slate-800")}` }, "Pro Tips"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, drill.tips.map((tip, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("p", { className: dm(isDarkMode, "text-slate-300", "text-slate-600") }, tip))))), completed ? /* @__PURE__ */ React.createElement("div", { className: "w-full bg-emerald-100 text-emerald-700 font-bold py-4 rounded-2xl text-center flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-5 h-5" }), "Completed! Great work!") : /* @__PURE__ */ React.createElement("button", { onClick: complete, disabled: loading, className: "w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50" }, loading ? "Saving..." : `\u2713 Mark Complete (+${drill.xp_value} XP)`)));
  }
  function MentalCoaching() {
    const { isDarkMode } = useDarkMode();
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("All");
    const routines = SC_DATA.mentalRoutines || [];
    const cats = ["All", "confidence", "focus", "recovery", "pre-performance", "pressure", "visualization", "match-day-calm", "pro-mental"];
    const catColors = { confidence: "bg-amber-100 text-amber-700", focus: "bg-blue-100 text-blue-700", recovery: "bg-emerald-100 text-emerald-700", "pre-performance": "bg-purple-100 text-purple-700", pressure: "bg-red-100 text-red-700", visualization: "bg-indigo-100 text-indigo-700", "match-day-calm": "bg-orange-100 text-orange-700", "pro-mental": "bg-purple-200 text-purple-800" };
    const catIcons = { confidence: Sparkles, focus: Target, recovery: RefreshCw, "pre-performance": Heart, pressure: Zap, visualization: Brain, "match-day-calm": Sun, "pro-mental": Crown };
    const filtered = routines.filter((r) => (cat === "All" || r.category === cat) && r.title.toLowerCase().includes(search.toLowerCase()));
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${dm(isDarkMode, "bg-slate-950", "bg-slate-50")}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-purple-600 to-indigo-600 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Mental Training"), /* @__PURE__ */ React.createElement("p", { className: "text-purple-200 mb-4" }, routines.length, "+ sessions \xB7 Build your mental game"), /* @__PURE__ */ React.createElement("div", { className: "relative mb-4" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" }), /* @__PURE__ */ React.createElement("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search sessions...", className: "w-full h-12 pl-12 pr-4 rounded-2xl bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:outline-none" })), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide" }, cats.map((c) => /* @__PURE__ */ React.createElement("button", { key: c, onClick: () => setCat(c), className: `px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border capitalize transition-all ${cat === c ? "bg-white text-purple-700 border-white" : "bg-white/20 text-white border-white/30"}` }, c === "All" ? "All" : c.replace("-", " "))))), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 space-y-3 max-w-lg mx-auto" }, filtered.map((r) => {
      const CatIcon = catIcons[r.category] || Brain;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: r.id,
          onClick: () => navigate(`MentalRoutinePlayer?id=${r.id}`),
          className: `w-full text-left rounded-2xl p-4 shadow-md border transition-all hover:scale-[1.01] active:scale-[.99] ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ React.createElement("div", { className: `p-2.5 rounded-xl flex-shrink-0 ${catColors[r.category] || "bg-gray-100 text-gray-700"}` }, /* @__PURE__ */ React.createElement(CatIcon, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-0.5" }, /* @__PURE__ */ React.createElement("h3", { className: `font-bold text-sm truncate ${dm(isDarkMode, "text-white", "text-slate-800")}` }, r.title), r.is_premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge flex-shrink-0" }, "Pro")), /* @__PURE__ */ React.createElement("p", { className: `text-xs capitalize mb-1 ${dm(isDarkMode, "text-slate-400", "text-slate-500")}` }, r.category?.replace("-", " ")), /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-4 text-xs ${dm(isDarkMode, "text-slate-400", "text-slate-500")}` }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-3 h-3" }), Math.floor(r.duration_seconds / 60), " min"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Zap, { className: "w-3 h-3 text-amber-500" }), r.xp_value, " XP"))), /* @__PURE__ */ React.createElement(Play, { className: "w-5 h-5 text-purple-500 mt-1 flex-shrink-0" }))
      );
    }), !filtered.length && /* @__PURE__ */ React.createElement("p", { className: `text-center py-12 ${dm(isDarkMode, "text-slate-500", "text-slate-400")}` }, "No sessions found.")));
  }
  function MentalRoutinePlayer() {
    const { isDarkMode } = useDarkMode();
    const id = getPageParam("id");
    const routine = (SC_DATA.mentalRoutines || []).find((r) => r.id === id);
    const guestId = getGuestId();
    const qc = useQueryClient();
    const [phase, setPhase] = useState("intro");
    const [stepIdx, setStepIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalLeft, setTotalLeft] = useState(0);
    const [saved, setSaved] = useState(false);
    const intRef = useRef(null);
    useEffect(() => () => clearInterval(intRef.current), []);
    useEffect(() => {
      if (phase !== "playing" || !routine) return;
      clearInterval(intRef.current);
      intRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const next = stepIdx + 1;
            if (next >= routine.steps.length) {
              clearInterval(intRef.current);
              setPhase("done");
              if (!saved) {
                setSaved(true);
                saveProgress();
              }
              return 0;
            }
            setStepIdx(next);
            return routine.steps[next].duration_seconds;
          }
          return prev - 1;
        });
        setTotalLeft((p) => Math.max(0, p - 1));
      }, 1e3);
      return () => clearInterval(intRef.current);
    }, [phase, stepIdx]);
    const saveProgress = async () => {
      try {
        const { alreadyDone } = await addProgressXP(guestId, routine.xp_value, Math.floor(routine.duration_seconds / 60), routine.id, "completed_mental_routines");
        window.dispatchEvent(new CustomEvent("smartstart_item_completed", { detail: { type: "mental", id: routine.id, title: routine.title } }));
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        if (!alreadyDone) {
          showXPFlash(routine.xp_value);
          fireConfetti();
        }
      } catch (e) {
        console.error(e);
      }
    };
    const startSession = () => {
      if (!routine) return;
      setPhase("playing");
      setStepIdx(0);
      setTimeLeft(routine.steps[0].duration_seconds);
      setTotalLeft(routine.duration_seconds);
      setSaved(false);
    };
    const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    const totalSecs = routine?.duration_seconds || 1;
    const pctDone = Math.round((totalSecs - totalLeft) / totalSecs * 100);
    const step = routine?.steps?.[stepIdx];
    const ringPct = timeLeft / (step?.duration_seconds || 1);
    const circ = 2 * Math.PI * 90;
    if (!routine) return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("MentalCoaching"), className: "text-purple-500 font-bold flex items-center gap-2" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" }), "Back"));
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen flex flex-col ${dm(isDarkMode, "bg-gradient-to-br from-purple-950 to-slate-950", "bg-gradient-to-br from-purple-50 to-indigo-50")}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-purple-600 to-indigo-600 px-6 pt-14 pb-6" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      clearInterval(intRef.current);
      navigate("MentalCoaching");
    }, className: "flex items-center gap-2 text-white/80 hover:text-white mb-4" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" }), "Back"), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, routine.title), /* @__PURE__ */ React.createElement("p", { className: "text-purple-200 text-sm capitalize" }, routine.category?.replace("-", " "), " \xB7 ", Math.floor(routine.duration_seconds / 60), " min \xB7 ", routine.xp_value, " XP"), phase === "playing" && /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs text-purple-200 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "Progress"), /* @__PURE__ */ React.createElement("span", null, fmtTime(totalLeft), " remaining")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-full h-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-full h-2 transition-all", style: { width: pctDone + "%" } })))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 px-6 py-8 flex flex-col items-center justify-center max-w-lg mx-auto w-full" }, phase === "intro" && /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-6 w-full" }, /* @__PURE__ */ React.createElement("div", { className: "w-28 h-28 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-2xl" }, /* @__PURE__ */ React.createElement(Brain, { className: "w-14 h-14 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-2xl font-bold mb-2 ${dm(isDarkMode, "text-white", "text-slate-800")}` }, routine.title), /* @__PURE__ */ React.createElement("p", { className: `leading-relaxed ${dm(isDarkMode, "text-slate-300", "text-slate-600")}` }, routine.description)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 justify-center" }, [[Clock, `${Math.floor(routine.duration_seconds / 60)} min`], [Zap, `${routine.xp_value} XP`], [Layers, `${routine.steps?.length} steps`]].map(([Icon2, val], i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `rounded-2xl px-4 py-3 text-center border ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}` }, /* @__PURE__ */ React.createElement(Icon2, { className: "w-5 h-5 text-purple-500 mx-auto mb-1" }), /* @__PURE__ */ React.createElement("p", { className: `font-bold text-sm ${dm(isDarkMode, "text-white", "text-slate-800")}` }, val)))), /* @__PURE__ */ React.createElement("button", { onClick: startSession, className: "w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg text-lg hover:shadow-xl transition-all" }, "Begin Session")), phase === "playing" && step && /* @__PURE__ */ React.createElement("div", { className: "w-full space-y-6 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-52 h-52 mx-auto" }, /* @__PURE__ */ React.createElement("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 200 200" }, /* @__PURE__ */ React.createElement("circle", { cx: "100", cy: "100", r: "90", fill: "none", stroke: "rgba(139,92,246,.2)", strokeWidth: "10" }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: "100",
        cy: "100",
        r: "90",
        fill: "none",
        stroke: "#8b5cf6",
        strokeWidth: "10",
        strokeLinecap: "round",
        strokeDasharray: circ,
        strokeDashoffset: circ * (1 - ringPct),
        style: { transition: "stroke-dashoffset 1s linear" }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl font-bold text-purple-400" }, fmtTime(timeLeft)), /* @__PURE__ */ React.createElement("span", { className: `text-xs mt-1 ${dm(isDarkMode, "text-slate-400", "text-slate-500")}` }, "Step ", stepIdx + 1, "/", routine.steps.length))), /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl p-6 border text-left shadow-xl ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}` }, /* @__PURE__ */ React.createElement("p", { className: `leading-relaxed text-base ${dm(isDarkMode, "text-slate-200", "text-slate-700")}` }, step.instruction)), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      clearInterval(intRef.current);
      setPhase("done");
      if (!saved) {
        setSaved(true);
        saveProgress();
      }
    }, className: "text-sm text-slate-400 hover:text-slate-600 underline" }, "Skip to complete")), phase === "done" && /* @__PURE__ */ React.createElement("div", { className: "text-center space-y-6 w-full" }, /* @__PURE__ */ React.createElement("div", { className: "w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-in" }, /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-14 h-14 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-2xl font-bold mb-2 ${dm(isDarkMode, "text-white", "text-slate-800")}` }, "Session Complete! \u{1F9E0}"), /* @__PURE__ */ React.createElement("p", { className: dm(isDarkMode, "text-slate-300", "text-slate-600") }, "+", routine.xp_value, " XP earned. Outstanding work.")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 w-full" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("MentalCoaching"), className: `flex-1 py-4 rounded-2xl font-bold ${dm(isDarkMode, "bg-slate-700 text-white", "bg-slate-200 text-slate-700")}` }, "Done"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setSaved(false);
      startSession();
    }, className: "flex-1 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500" }, "Again")))));
  }
  function Coach() {
    return /* @__PURE__ */ React.createElement("div", { className: "h-screen flex flex-col bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, "AI Coach"), /* @__PURE__ */ React.createElement("p", { className: "text-blue-200 text-xs" }, "Powered by Relevance AI"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://app.relevanceai.com/agents/bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/c1b8c3fd-1141-42ff-a6fa-f16c03c2a111/embed-chat", className: "w-full h-full border-0", title: "SmartCrick AI Coach" })));
  }
  function HeadCoach() {
    const prem = getPremiumStatus();
    if (!prem.is_premium || prem.plan !== "yearly" && prem.plan !== "lifetime") return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center" }, /* @__PURE__ */ React.createElement(Crown, { className: "w-16 h-16 text-purple-500 mb-4" }), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-slate-800 mb-2" }, "SmartCrick Head Coach"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mb-2" }, "Requires a ", /* @__PURE__ */ React.createElement("strong", null, "Yearly"), " or ", /* @__PURE__ */ React.createElement("strong", null, "Lifetime"), " subscription."), /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-sm mb-6" }, "One-on-one personalised AI coaching for every aspect of your game."), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Premium"), className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg" }, "Upgrade Now"));
    return /* @__PURE__ */ React.createElement("div", { className: "h-screen flex flex-col bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, "SmartCrick Head Coach"), /* @__PURE__ */ React.createElement("p", { className: "text-purple-200 text-xs" }, "Yearly \xB7 Lifetime exclusive"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://app.relevanceai.com/agents/bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/366636d2-101a-46ed-ac68-c6ec3b4b1daa/embed-chat", className: "w-full h-full border-0", title: "SmartCrick Head Coach" })));
  }
  function NinetyDayChallenge() {
    const prem = getPremiumStatus();
    if (!prem.is_premium || prem.plan !== "lifetime") return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center" }, /* @__PURE__ */ React.createElement(Rocket, { className: "w-16 h-16 text-purple-500 mb-4" }), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-slate-800 mb-2" }, "90-Day Challenge"), /* @__PURE__ */ React.createElement("p", { className: "text-slate-600 mb-2" }, "Exclusive ", /* @__PURE__ */ React.createElement("strong", null, "Lifetime"), " member feature."), /* @__PURE__ */ React.createElement("p", { className: "text-slate-500 text-sm mb-6" }, "A complete structured 90-day programme to transform your cricket."), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Premium"), className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg" }, "Get Lifetime Access"));
    return /* @__PURE__ */ React.createElement("div", { className: "h-screen flex flex-col bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-purple-600 to-indigo-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, "90-Day Challenge"), /* @__PURE__ */ React.createElement("p", { className: "text-purple-200 text-xs" }, "Lifetime exclusive"))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement("iframe", { src: "https://app.relevanceai.com/agents/bcbe5a/e5e3eeef-250d-4d16-8d49-ebcf5906ce75/366636d2-101a-46ed-ac68-c6ec3b4b1daa/embed-chat", className: "w-full h-full border-0", title: "90-Day Challenge" })));
  }
  function Timer() {
    const { isDarkMode } = useDarkMode();
    const [mode, setMode] = useState("stopwatch");
    const [running, setRunning] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [cdSecs, setCdSecs] = useState(300);
    const [inputMin, setInputMin] = useState("5");
    const ref = useRef(null);
    useEffect(() => {
      if (running) {
        ref.current = setInterval(() => {
          if (mode === "stopwatch") setElapsed((e) => e + 1);
          else setCdSecs((s) => {
            if (s <= 1) {
              clearInterval(ref.current);
              setRunning(false);
              if (window.confetti) window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
              return 0;
            }
            return s - 1;
          });
        }, 1e3);
      }
      return () => clearInterval(ref.current);
    }, [running, mode]);
    const fmt = (s) => {
      const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };
    const reset = () => {
      clearInterval(ref.current);
      setRunning(false);
      setElapsed(0);
      setCdSecs(parseInt(inputMin || "5") * 60);
    };
    const switchMode = (m) => {
      reset();
      setMode(m);
    };
    const display = mode === "stopwatch" ? elapsed : cdSecs;
    const ringPct = mode === "stopwatch" ? elapsed % 60 / 60 : cdSecs / (parseInt(inputMin || "5") * 60);
    const circ = 2 * Math.PI * 110;
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${dm(isDarkMode, "bg-slate-950", "bg-slate-50")}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-emerald-600 to-teal-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-4" }, "Timer"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, ["stopwatch", "countdown"].map((m) => /* @__PURE__ */ React.createElement("button", { key: m, onClick: () => switchMode(m), className: `px-4 py-2 rounded-full text-sm font-semibold capitalize border transition-all ${mode === m ? "bg-white text-emerald-700 border-white" : "bg-white/20 text-white border-white/30"}` }, m)))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-8 flex flex-col items-center max-w-lg mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-64 h-64 mb-8" }, /* @__PURE__ */ React.createElement("svg", { className: "w-full h-full -rotate-90", viewBox: "0 0 240 240" }, /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "120", r: "110", fill: "none", stroke: isDarkMode ? "#1e293b" : "#e2e8f0", strokeWidth: "12" }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        cx: "120",
        cy: "120",
        r: "110",
        fill: "none",
        stroke: "#10b981",
        strokeWidth: "12",
        strokeLinecap: "round",
        strokeDasharray: circ,
        strokeDashoffset: circ * (1 - ringPct),
        className: running ? "animate-timer-pulse" : "",
        style: { transition: running ? "stroke-dashoffset 1s linear" : "none" }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center" }, /* @__PURE__ */ React.createElement("span", { className: "timer-display" }, fmt(display)), /* @__PURE__ */ React.createElement("span", { className: `text-sm capitalize mt-1 ${dm(isDarkMode, "text-slate-400", "text-slate-500")}` }, mode))), mode === "countdown" && !running && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-6" }, /* @__PURE__ */ React.createElement("label", { className: `text-sm font-medium ${dm(isDarkMode, "text-slate-300", "text-slate-600")}` }, "Minutes:"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      const v = Math.max(1, parseInt(inputMin || "5") - 1);
      setInputMin(String(v));
      setCdSecs(v * 60);
    }, className: `w-10 h-10 rounded-xl font-bold text-lg ${dm(isDarkMode, "bg-slate-700 text-white", "bg-slate-200 text-slate-700")}` }, "\u2212"), /* @__PURE__ */ React.createElement("span", { className: `w-12 text-center font-bold text-2xl ${dm(isDarkMode, "text-white", "text-slate-800")}` }, inputMin), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      const v = Math.min(120, parseInt(inputMin || "5") + 1);
      setInputMin(String(v));
      setCdSecs(v * 60);
    }, className: `w-10 h-10 rounded-xl font-bold text-lg ${dm(isDarkMode, "bg-slate-700 text-white", "bg-slate-200 text-slate-700")}` }, "+"))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 w-full max-w-xs" }, /* @__PURE__ */ React.createElement("button", { onClick: reset, className: `flex-1 py-4 rounded-2xl font-bold ${dm(isDarkMode, "bg-slate-700 text-white hover:bg-slate-600", "bg-slate-200 text-slate-700 hover:bg-slate-300")}` }, "Reset"), /* @__PURE__ */ React.createElement("button", { onClick: () => setRunning((r) => !r), className: `flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${running ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-xl"}` }, running ? "Pause" : "Start"))));
  }
  function FitnessBuilder() {
    const { isDarkMode } = useDarkMode();
    const [step, setStep] = useState(1);
    const [bp, setBp] = useState("");
    const [level, setLevel] = useState("");
    const [goal, setGoal] = useState("");
    const [dur, setDur] = useState("");
    const [workout, setWorkout] = useState(null);
    const [saving, setSaving] = useState(false);
    const guestId = getGuestId();
    const qc = useQueryClient();
    const prem = getPremiumStatus();
    const BPS = ["arms", "chest", "back", "legs", "shoulders", "core", "full body"];
    const GOALS = ["lose weight", "build muscle", "keep fit"];
    const DURS = ["<10", "10-15", "15-20", "20-25", "25+"];
    const LEVELS = [{ id: "beginner", label: "Beginner", Icon: Smile, premium: false }, { id: "intermediate", label: "Intermediate", Icon: Zap, premium: false }, { id: "advanced", label: "Advanced", Icon: Flame, premium: false }, { id: "pro", label: "Pro", Icon: Crown, premium: true }];
    const findWorkout = () => {
      const pool = SC_DATA.quickStartWorkouts || [];
      const match = pool.filter((w) => (w.target === bp || w.target === "full body" || bp === "full body") && w.level === level && w.goal === goal && w.duration_category === dur && (!w.is_premium || prem.is_premium));
      if (match.length) return match[Math.floor(Math.random() * match.length)];
      const fb = pool.filter((w) => w.level === level && (!w.is_premium || prem.is_premium));
      return fb[Math.floor(Math.random() * fb.length)] || pool[0];
    };
    const startWorkout = async (w) => {
      setSaving(true);
      try {
        const dl = buildDrillList(w.exercises || []);
        localStorage.removeItem("workoutProgress");
        const c = await entities.Workout.create({ user_email: guestId, name: w.name, drills: dl, status: "not_started", xp_value: w.xp_value || 100 });
        localStorage.setItem("fitnessbuilder_new_workout_id", c.id);
        qc.invalidateQueries({ queryKey: ["userGeneratedWorkouts", guestId] });
        navigate("AIWorkout");
      } catch (e) {
        console.error(e);
      }
      setSaving(false);
    };
    const generate = () => {
      if (bp && level && goal && dur) {
        setWorkout(findWorkout());
        setStep(4);
      }
    };
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const card = dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-400", "text-slate-500");
    const selBtn = (sel, val) => sel === val ? "bg-orange-500 text-white border-orange-500 shadow-lg" : `border ${card} ${dm(isDarkMode, "hover:border-orange-400", "hover:border-orange-300")}`;
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-orange-500 to-red-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Fitness Builder"), /* @__PURE__ */ React.createElement("p", { className: "text-orange-100 text-sm" }, "Build your perfect workout in seconds"), step > 1 && /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5 mt-4" }, [1, 2, 3, 4].map((s) => /* @__PURE__ */ React.createElement("div", { key: s, className: `flex-1 h-1.5 rounded-full ${s <= step ? "bg-white" : "bg-white/30"}` })))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-6 max-w-lg mx-auto" }, step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-4 ${txt}` }, "Quick Start Workouts"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-4" }, (SC_DATA.quickStartWorkouts || []).slice(0, 8).map((w) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: w.name,
        onClick: () => startWorkout(w),
        disabled: saving,
        className: `w-full text-left rounded-2xl p-4 border shadow-sm transition-all hover:scale-[1.01] active:scale-[.99] disabled:opacity-50 ${card}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `font-bold ${txt}` }, w.name), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-0.5 ${sub}` }, w.level, " \xB7 ", w.target, " \xB7 ", w.duration_category, " min")), /* @__PURE__ */ React.createElement("span", { className: "text-amber-500 font-bold text-sm" }, w.xp_value, " XP"))
    ))), /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), className: "w-full border-2 border-dashed border-orange-300 text-orange-600 dark:text-orange-400 font-bold py-4 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all" }, "+ Create Custom Workout")), step === 2 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-4 ${txt}` }, "Target Body Part"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-6" }, BPS.map((b) => /* @__PURE__ */ React.createElement("button", { key: b, onClick: () => setBp(b), className: `py-4 rounded-2xl font-semibold capitalize text-sm border transition-all ${selBtn(bp, b)}` }, b))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(1), className: `flex-1 py-3 rounded-2xl font-bold ${dm(isDarkMode, "bg-slate-700 text-white", "bg-slate-200 text-slate-700")}` }, "Back"), /* @__PURE__ */ React.createElement("button", { onClick: () => bp && setStep(3), className: `flex-1 py-3 rounded-2xl font-bold text-white ${bp ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg" : "bg-slate-400 cursor-not-allowed"}` }, "Next \u2192"))), step === 3 && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-3 ${txt}` }, "Fitness Level"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, LEVELS.map((l) => /* @__PURE__ */ React.createElement("button", { key: l.id, onClick: () => {
      if (!l.premium || prem.is_premium) setLevel(l.id);
      else navigate("Premium");
    }, className: `py-3 rounded-2xl font-semibold text-sm border transition-all flex items-center justify-center gap-2 ${selBtn(level, l.id)}` }, /* @__PURE__ */ React.createElement(l.Icon, { className: "w-4 h-4" }), l.label, l.premium && /* @__PURE__ */ React.createElement("span", { className: "premium-badge" }, "Pro"))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-3 ${txt}` }, "Your Goal"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, GOALS.map((g) => /* @__PURE__ */ React.createElement("button", { key: g, onClick: () => setGoal(g), className: `py-3 rounded-2xl font-semibold text-xs capitalize border transition-all ${selBtn(goal, g)}` }, g)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-3 ${txt}` }, "Duration (min)"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 flex-wrap" }, DURS.map((d) => /* @__PURE__ */ React.createElement("button", { key: d, onClick: () => setDur(d), className: `px-4 py-3 rounded-2xl font-semibold text-sm border transition-all ${selBtn(dur, d)}` }, d)))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), className: `flex-1 py-3 rounded-2xl font-bold ${dm(isDarkMode, "bg-slate-700 text-white", "bg-slate-200 text-slate-700")}` }, "Back"), /* @__PURE__ */ React.createElement("button", { onClick: generate, className: `flex-1 py-3 rounded-2xl font-bold text-white ${level && goal && dur ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg" : "bg-slate-400 cursor-not-allowed"}` }, "Generate!"))), step === 4 && workout && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold mb-1" }, workout.name), /* @__PURE__ */ React.createElement("p", { className: "text-orange-100 text-sm capitalize" }, workout.level, " \xB7 ", workout.target, " \xB7 ", workout.duration_category, " min"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-3 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold" }, workout.exercises?.length || 0), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-orange-100" }, "exercises")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-xl px-3 py-2 text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-amber-300" }, workout.xp_value), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-orange-100" }, "XP")))), /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl border divide-y overflow-hidden ${card}` }, (workout.exercises || []).map((ex, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "px-4 py-3 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: `font-semibold text-sm ${txt}` }, ex.name), /* @__PURE__ */ React.createElement("span", { className: `text-xs ${sub}` }, ex.sets, "\xD7", ex.reps)))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setWorkout(null);
      setStep(3);
    }, className: `flex-1 py-3 rounded-2xl font-bold ${dm(isDarkMode, "bg-slate-700 text-white", "bg-slate-200 text-slate-700")}` }, "Regenerate"), /* @__PURE__ */ React.createElement("button", { onClick: () => startWorkout(workout), disabled: saving, className: "flex-1 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg disabled:opacity-50" }, saving ? "Starting..." : "Start Workout \u2192")))));
  }
  function AIWorkout() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const qc = useQueryClient();
    const [activeId, setActiveId] = useState(null);
    const [drillStates, setDrillStates] = useState({});
    const [completing, setCompleting] = useState(false);
    const [doneScreen, setDoneScreen] = useState(false);
    const { data: workouts2 = [], isLoading } = useQuery(["userGeneratedWorkouts", guestId], () => entities.Workout.filter({ user_email: guestId }), { staleTime: 0 });
    useEffect(() => {
      const pid = localStorage.getItem("fitnessbuilder_new_workout_id");
      if (pid) {
        setActiveId(pid);
        localStorage.removeItem("fitnessbuilder_new_workout_id");
      }
    }, []);
    const activeWorkout = workouts2.find((w) => w.id === activeId);
    useEffect(() => {
      if (activeWorkout) {
        const init = {};
        (activeWorkout.drills || []).forEach((d) => {
          init[d.drill_id] = false;
        });
        setDrillStates(init);
        setDoneScreen(false);
      }
    }, [activeId, activeWorkout?.id]);
    const exDrills = (activeWorkout?.drills || []).filter((d) => d.type !== "rest");
    const completedCount = exDrills.filter((d) => drillStates[d.drill_id]).length;
    const pct = exDrills.length ? Math.round(completedCount / exDrills.length * 100) : 0;
    const completeWorkout = async () => {
      if (!activeWorkout || completing) return;
      setCompleting(true);
      try {
        await entities.Workout.update(activeWorkout.id, { status: "completed" });
        const xp = activeWorkout.xp_value || 90;
        await addProgressXP(guestId, xp, 25);
        await entities.Notification.create({ user_email: guestId, type: "achievement", title: "Workout Complete!", message: `You earned ${xp} XP! Keep it up.`, is_read: false });
        window.dispatchEvent(new CustomEvent("smartstart_item_completed", { detail: { type: "workout", id: activeWorkout.id, title: activeWorkout.name } }));
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        qc.invalidateQueries({ queryKey: ["userGeneratedWorkouts", guestId] });
        showXPFlash(xp);
        fireConfetti();
        setDoneScreen(true);
      } catch (e) {
        console.error(e);
      }
      setCompleting(false);
    };
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const card = dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-400", "text-slate-500");
    if (isLoading) return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "spinner" }));
    if (activeWorkout && !doneScreen) return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-pink-500 to-rose-500 px-6 pt-14 pb-6" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setActiveId(null), className: "flex items-center gap-2 text-white/80 hover:text-white mb-3" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" }), "My Workouts"), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-white" }, activeWorkout.name), /* @__PURE__ */ React.createElement("p", { className: "text-pink-200 text-sm" }, activeWorkout.xp_value, " XP \xB7 ", exDrills.length, " exercises"), /* @__PURE__ */ React.createElement("div", { className: "mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs text-pink-200 mb-1" }, /* @__PURE__ */ React.createElement("span", null, completedCount, "/", exDrills.length, " done"), /* @__PURE__ */ React.createElement("span", null, pct, "%")), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-full h-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-full h-2 transition-all duration-500", style: { width: pct + "%" } })))), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-2" }, (activeWorkout.drills || []).map((drill) => {
      const isRest = drill.type === "rest";
      const checked = drillStates[drill.drill_id] || false;
      return /* @__PURE__ */ React.createElement("div", { key: drill.drill_id, className: `rounded-2xl border transition-all ${isRest ? dm(isDarkMode, "bg-slate-900 border-slate-800", "bg-slate-100 border-slate-200") : checked ? "bg-emerald-500/10 border-emerald-500/30" : card}` }, isRest ? /* @__PURE__ */ React.createElement("div", { className: `px-4 py-3 flex items-center gap-2 ${sub}` }, /* @__PURE__ */ React.createElement(Clock, { className: "w-4 h-4 flex-shrink-0" }), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Rest \u2014 ", drill.reps, "s")) : /* @__PURE__ */ React.createElement("button", { onClick: () => setDrillStates((p) => ({ ...p, [drill.drill_id]: !p[drill.drill_id] })), className: "w-full px-4 py-4 flex items-center gap-4 text-left" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked ? "bg-emerald-500 border-emerald-500" : dm(isDarkMode, "border-slate-500", "border-slate-300")}` }, checked && /* @__PURE__ */ React.createElement(Check, { className: "w-4 h-4 text-white" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `font-bold text-sm ${checked ? "line-through text-emerald-500" : txt}` }, drill.drill_title), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-0.5 ${sub}` }, drill.reps, " reps \xB7 ", drill.rest_seconds, "s rest"))));
    }), /* @__PURE__ */ React.createElement("button", { onClick: completeWorkout, disabled: completing, className: "w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 mt-4" }, completing ? "Saving..." : `\u{1F389} Complete Workout (+${activeWorkout.xp_value} XP)`)));
    if (doneScreen && activeWorkout) return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen flex flex-col items-center justify-center px-6 text-center ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce-in" }, /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-14 h-14 text-white" })), /* @__PURE__ */ React.createElement("h1", { className: `text-3xl font-bold mb-2 ${txt}` }, "Workout Done! \u{1F4AA}"), /* @__PURE__ */ React.createElement("p", { className: `mb-8 ${sub}` }, activeWorkout.name, " \xB7 +", activeWorkout.xp_value, " XP earned"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 w-full max-w-xs" }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setDoneScreen(false);
      setActiveId(null);
    }, className: `flex-1 py-4 rounded-2xl font-bold ${dm(isDarkMode, "bg-slate-700 text-white", "bg-slate-200 text-slate-700")}` }, "My Workouts"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("FitnessBuilder"), className: "flex-1 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500" }, "New Workout")));
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-pink-500 to-rose-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "AI Workout"), /* @__PURE__ */ React.createElement("p", { className: "text-pink-100 text-sm" }, workouts2.length, " saved workouts")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto" }, !workouts2.length ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-16" }, /* @__PURE__ */ React.createElement(Dumbbell, { className: `w-16 h-16 mx-auto mb-4 ${dm(isDarkMode, "text-slate-700", "text-slate-300")}` }), /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-2 ${txt}` }, "No workouts yet"), /* @__PURE__ */ React.createElement("p", { className: `mb-6 ${sub}` }, "Create one in Fitness Builder"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("FitnessBuilder"), className: "bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg" }, "Build a Workout")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, workouts2.sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0)).map((w) => /* @__PURE__ */ React.createElement("button", { key: w.id, onClick: () => setActiveId(w.id), className: `w-full text-left rounded-2xl p-4 shadow-md border transition-all hover:scale-[1.01] active:scale-[.99] ${card}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `font-bold ${txt}` }, w.name), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-0.5 ${sub}` }, (w.drills || []).filter((d) => d.type !== "rest").length, " exercises \xB7 ", w.xp_value, " XP")), /* @__PURE__ */ React.createElement("div", { className: `px-3 py-1.5 rounded-full text-xs font-semibold ${w.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-pink-100 text-pink-700"}` }, w.status === "completed" ? "\u2713 Done" : "\u25B6 Ready")))), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("FitnessBuilder"), className: "w-full border-2 border-dashed border-pink-300 text-pink-600 dark:text-pink-400 font-bold py-4 rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-950/20 transition-all" }, "+ New Workout"))));
  }
  function Premium() {
    const { isDarkMode } = useDarkMode();
    const prem = getPremiumStatus();
    const [loading, setLoading] = useState(null);
    const PLANS = [
      { id: "monthly", name: "Monthly", price: "$9.99", period: "/month", priceId: "price_1SugNn6MhuIR6zbAZMSb1Vrc", color: "from-blue-500 to-indigo-500", badge: null, features: ["All drills & workouts", "242 mental training sessions", "Progress tracking & XP", "AI Coach (Relevance AI)"] },
      { id: "yearly", name: "Yearly", price: "$59.99", period: "/year", priceId: "price_1SugSq6MhuIR6zbAw991j7Ur", color: "from-emerald-500 to-teal-500", badge: "BEST VALUE", features: ["Everything in Monthly", "SmartCrick Head Coach (personal AI)", "Advanced analytics & insights", "Save $60/year vs monthly"] },
      { id: "lifetime", name: "Lifetime", price: "$149.99", period: "one-time", priceId: "price_1SugW66MhuIR6zbAEq9yThmh", color: "from-purple-500 to-pink-500", badge: "MOST POPULAR", features: ["Everything in Yearly", "90-Day Challenge Programme", "All future features forever", "Lifetime access \u2014 pay once"] }
    ];
    const checkout = async (plan) => {
      setLoading(plan.id);
      try {
        const res = await fetch("https://smartcrick-backend-kgya.vercel.app/api/create-checkout-session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ priceId: plan.priceId, successUrl: window.location.href + "?success=1", cancelUrl: window.location.href }) });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
        else throw new Error("No URL");
      } catch (e) {
        alert("Unable to process checkout. Please try again.");
        console.error(e);
      }
      setLoading(null);
    };
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const sub = dm(isDarkMode, "text-slate-300", "text-slate-700");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 px-6 pt-16 pb-10 text-center" }, /* @__PURE__ */ React.createElement(Crown, { className: "w-12 h-12 text-yellow-300 mx-auto mb-3" }), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-white mb-2" }, "Go Premium"), /* @__PURE__ */ React.createElement("p", { className: "text-purple-100 mb-2" }, "Unlock your full cricket potential"), prem.is_premium && /* @__PURE__ */ React.createElement("div", { className: "mt-3 bg-white/20 rounded-2xl px-4 py-2 inline-block text-white font-semibold text-sm capitalize" }, "\u2713 You're on the ", prem.plan, " plan")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-6 max-w-lg mx-auto space-y-4" }, PLANS.map((plan) => /* @__PURE__ */ React.createElement("div", { key: plan.id, className: `rounded-3xl border shadow-xl overflow-hidden ${dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100")}` }, /* @__PURE__ */ React.createElement("div", { className: `bg-gradient-to-r ${plan.color} px-6 py-4 flex items-start justify-between` }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-0.5" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white" }, plan.name), plan.badge && /* @__PURE__ */ React.createElement("span", { className: "bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full" }, plan.badge)), /* @__PURE__ */ React.createElement("p", { className: "text-white/75 text-sm" }, plan.period)), /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-white" }, plan.price)), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-4" }, plan.features.map((f) => /* @__PURE__ */ React.createElement("div", { key: f, className: "flex items-start gap-2 py-1.5" }, /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" }), /* @__PURE__ */ React.createElement("span", { className: `text-sm ${sub}` }, f))), /* @__PURE__ */ React.createElement("button", { onClick: () => checkout(plan), disabled: !!loading, className: `w-full mt-4 bg-gradient-to-r ${plan.color} text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-70` }, loading === plan.id ? "Redirecting..." : `Get ${plan.name} Access \u2192`)))), /* @__PURE__ */ React.createElement("p", { className: `text-center text-xs mt-2 ${dm(isDarkMode, "text-slate-500", "text-slate-400")}` }, "Secure payment via Stripe. Cancel monthly plans anytime.")));
  }
  function Progress() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const { data: prog } = useQuery(["userProgress", guestId], async () => {
      const r = await entities.UserProgress.filter({ user_email: guestId });
      return r[0] || null;
    }, { staleTime: 0 });
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const card = dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-400", "text-slate-600");
    const BADGES = [
      { id: "b1", label: "First Drill", Icon: Target, color: "from-emerald-400 to-teal-400", test: (p) => (p.completed_drills?.length || 0) >= 1 },
      { id: "b2", label: "5 Drills", Icon: Target, color: "from-blue-400 to-cyan-400", test: (p) => (p.completed_drills?.length || 0) >= 5 },
      { id: "b3", label: "25 Drills", Icon: Trophy, color: "from-purple-400 to-pink-400", test: (p) => (p.completed_drills?.length || 0) >= 25 },
      { id: "b4", label: "100 Drills", Icon: Star, color: "from-amber-400 to-orange-400", test: (p) => (p.completed_drills?.length || 0) >= 100 },
      { id: "b5", label: "Mindful", Icon: Brain, color: "from-indigo-400 to-purple-400", test: (p) => (p.completed_mental_routines?.length || 0) >= 1 },
      { id: "b6", label: "10 Sessions", Icon: Brain, color: "from-pink-400 to-rose-400", test: (p) => (p.completed_mental_routines?.length || 0) >= 10 },
      { id: "b7", label: "50 Sessions", Icon: Crown, color: "from-purple-500 to-pink-500", test: (p) => (p.completed_mental_routines?.length || 0) >= 50 },
      { id: "b8", label: "3-Day Streak", Icon: Flame, color: "from-orange-400 to-red-400", test: (p) => (p.current_streak || 0) >= 3 },
      { id: "b9", label: "Week Warrior", Icon: Flame, color: "from-red-400 to-pink-400", test: (p) => (p.current_streak || 0) >= 7 },
      { id: "b10", label: "30-Day Beast", Icon: Rocket, color: "from-red-500 to-purple-500", test: (p) => (p.current_streak || 0) >= 30 },
      { id: "b11", label: "500 XP", Icon: Zap, color: "from-amber-400 to-yellow-400", test: (p) => (p.total_xp || 0) >= 500 },
      { id: "b12", label: "2000 XP", Icon: Zap, color: "from-yellow-400 to-orange-400", test: (p) => (p.total_xp || 0) >= 2e3 },
      { id: "b13", label: "10K XP Legend", Icon: Award, color: "from-orange-500 to-red-500", test: (p) => (p.total_xp || 0) >= 1e4 }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-pink-500 to-purple-600 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Your Progress"), /* @__PURE__ */ React.createElement("p", { className: "text-pink-100 text-sm" }, "Track your full cricket journey")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl p-6 border shadow-xl ${card}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-4 ${txt}` }, "Level Progress"), /* @__PURE__ */ React.createElement(LevelProgressBar, { xp: prog?.total_xp || 0 })), /* @__PURE__ */ React.createElement(HomeStats, { progress: prog }), /* @__PURE__ */ React.createElement("div", { className: `rounded-3xl p-6 border shadow-xl ${card}` }, /* @__PURE__ */ React.createElement("h2", { className: `font-bold text-lg mb-2 ${txt}` }, "Badges"), /* @__PURE__ */ React.createElement("p", { className: `text-sm mb-4 ${sub}` }, BADGES.filter((b) => prog && b.test(prog)).length, "/", BADGES.length, " earned"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, BADGES.map((b) => {
      const earned = prog ? b.test(prog) : false;
      return /* @__PURE__ */ React.createElement("div", { key: b.id, className: `rounded-2xl p-3 text-center border transition-all ${earned ? card : dm(isDarkMode, "bg-slate-900 border-slate-800 opacity-40", "bg-slate-100 border-slate-200 opacity-50")}` }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 bg-gradient-to-br ${earned ? b.color : "from-slate-400 to-slate-500"} rounded-full flex items-center justify-center mx-auto mb-2 shadow-md` }, /* @__PURE__ */ React.createElement(b.Icon, { className: "w-6 h-6 text-white" })), /* @__PURE__ */ React.createElement("p", { className: `text-xs font-semibold ${dm(isDarkMode, "text-slate-300", "text-slate-700")}` }, b.label));
    })))));
  }
  function Profile() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const qc = useQueryClient();
    const user = Auth.me();
    const prem = getPremiumStatus();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const { data: prog } = useQuery(["userProgress", guestId], async () => {
      const r = await entities.UserProgress.filter({ user_email: guestId });
      return r[0] || null;
    });
    const { data: profile } = useQuery(["profile", guestId], async () => {
      const r = await entities.Profile.filter({ user_email: guestId });
      return r[0] || null;
    });
    const displayName = profile?.username || prog?.display_name || user?.full_name?.split(" ")[0] || "Champ";
    const saveName = async () => {
      if (!name.trim()) return;
      setSaving(true);
      try {
        if (profile) await entities.Profile.update(profile.id, { username: name.trim() });
        else await entities.Profile.create({ user_email: guestId, username: name.trim() });
        if (prog) {
          await entities.UserProgress.update(prog.id, { display_name: name.trim() });
          const lbs = await entities.Leaderboard.filter({ user_email: guestId });
          if (lbs[0]) await entities.Leaderboard.update(lbs[0].id, { username: name.trim() });
        }
        qc.invalidateQueries({ queryKey: ["profile", guestId] });
        qc.invalidateQueries({ queryKey: ["userProgress", guestId] });
        setEditing(false);
      } catch (e) {
        console.error(e);
      }
      setSaving(false);
    };
    const deleteAccount = async () => {
      if (!confirm("Delete all your SmartCrick AI data? This cannot be undone.")) return;
      ["sc_UserProgress", "sc_Profile", "sc_Leaderboard", "sc_Workout", "sc_Notification", "sc_SkillPath", "sc_Match", "sc_ScheduledActivity", "sc_UserProfile", "sc_PremiumSubscription", "sc_CustomDrillWorkout", "smartcrick_premium", "sc_session_v2", "sc_users_v2", "smartcrick_guest_id", "theme", "cricket_joke", "cricket_joke_date", "cricket_fact", "cricket_fact_date"].forEach((k) => localStorage.removeItem(k));
      window.location.reload();
    };
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const card = dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-400", "text-slate-500");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-16 pb-10 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30" }, /* @__PURE__ */ React.createElement(User, { className: "w-12 h-12 text-white" })), editing ? /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 justify-center" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: name,
        onChange: (e) => setName(e.target.value),
        placeholder: displayName,
        autoFocus: true,
        onKeyDown: (e) => e.key === "Enter" && saveName(),
        className: "bg-white/20 text-white placeholder:text-white/60 border border-white/30 rounded-xl px-4 py-2 text-center font-bold focus:outline-none w-48"
      }
    ), /* @__PURE__ */ React.createElement("button", { onClick: saveName, disabled: saving, className: "bg-white text-indigo-700 font-bold px-4 py-2 rounded-xl text-sm" }, saving ? "..." : "Save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing(false), className: "text-white/60 hover:text-white" }, /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" }))) : /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 justify-center" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white" }, displayName), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      setName(displayName);
      setEditing(true);
    }, className: "text-white/60 hover:text-white" }, /* @__PURE__ */ React.createElement(Pencil, { className: "w-4 h-4" }))), prem.is_premium && /* @__PURE__ */ React.createElement("div", { className: "mt-2 bg-white/20 rounded-full px-4 py-1 inline-block text-white font-semibold text-sm capitalize" }, "\u2713 ", prem.plan, " member")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-3" }, [{ label: "Total XP", val: (prog?.total_xp || 0).toLocaleString(), Icon: Zap }, { label: "Current Streak", val: `${prog?.current_streak || 0} days`, Icon: Flame }, { label: "Drills Done", val: prog?.completed_drills?.length || 0, Icon: Target }, { label: "Mental Sessions", val: prog?.completed_mental_routines?.length || 0, Icon: Brain }].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, className: `rounded-2xl p-4 border flex items-center gap-4 ${card}` }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(s.Icon, { className: "w-5 h-5 text-emerald-600" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `text-sm ${sub}` }, s.label), /* @__PURE__ */ React.createElement("p", { className: `font-bold text-lg ${txt}` }, s.val)))), /* @__PURE__ */ React.createElement("div", { className: "pt-4 space-y-3" }, !prem.is_premium && /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Premium"), className: "w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95" }, "Upgrade to Premium"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Settings"), className: `w-full flex items-center justify-between p-4 rounded-2xl border font-medium transition-all ${card} ${txt}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Settings, { className: "w-5 h-5 text-slate-500" }), "Settings"), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-slate-400" })), /* @__PURE__ */ React.createElement("button", { onClick: deleteAccount, className: "w-full border-2 border-red-300 text-red-600 dark:text-red-400 font-bold py-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all" }, "Delete All Data"))));
  }
  function SkillPaths() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const { data: prog } = useQuery(["userProgress", guestId], async () => {
      const r = await entities.UserProgress.filter({ user_email: guestId });
      return r[0] || null;
    });
    const xp = prog?.total_xp || 0;
    const paths = Object.values(SC_DATA.skillPathsDb || {});
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const card = dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-400", "text-slate-600");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-teal-500 to-emerald-600 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Skill Paths"), /* @__PURE__ */ React.createElement("p", { className: "text-teal-100 text-sm" }, "Level up your cricket systematically")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-4" }, paths.map((path) => {
      let lvl = 0;
      for (const l of path.levels) {
        if (xp >= l.xp_required) lvl = l.level;
      }
      const cur = path.levels.find((l) => l.level === lvl);
      const next = path.levels.find((l) => l.level === lvl + 1);
      const pct = next ? Math.min(100, Math.round((xp - (cur?.xp_required || 0)) / (next.xp_required - (cur?.xp_required || 0)) * 100)) : 100;
      return /* @__PURE__ */ React.createElement("div", { key: path.id, className: `rounded-3xl border shadow-xl overflow-hidden ${card}` }, /* @__PURE__ */ React.createElement("div", { className: `bg-gradient-to-r ${path.color} p-5` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Trophy, { className: "w-6 h-6 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-white" }, path.title), /* @__PURE__ */ React.createElement("p", { className: "text-white/80 text-sm" }, "Level ", lvl, "/", path.levels.length))), /* @__PURE__ */ React.createElement("div", { className: "bg-white/20 rounded-full h-2 mb-1" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-full h-2 transition-all", style: { width: pct + "%" } })), /* @__PURE__ */ React.createElement("p", { className: "text-white/70 text-xs" }, next ? `${(next.xp_required - xp).toLocaleString()} XP to Level ${lvl + 1}` : "\u{1F3C6} Max Level!")), /* @__PURE__ */ React.createElement("div", { className: "p-4" }, /* @__PURE__ */ React.createElement("p", { className: `text-sm mb-3 ${sub}` }, path.description), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, path.levels.map((l) => /* @__PURE__ */ React.createElement("div", { key: l.level, className: `flex items-center gap-3 p-2.5 rounded-xl ${l.level <= lvl ? dm(isDarkMode, "bg-emerald-900/20", "bg-emerald-50") : dm(isDarkMode, "bg-slate-900", "bg-slate-50")}` }, /* @__PURE__ */ React.createElement("div", { className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${l.level <= lvl ? "bg-emerald-500 text-white" : dm(isDarkMode, "bg-slate-700 text-slate-400", "bg-slate-200 text-slate-500")}` }, l.level), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `text-sm font-semibold ${l.level <= lvl ? dm(isDarkMode, "text-emerald-400", "text-emerald-700") : sub}` }, l.title), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${dm(isDarkMode, "text-slate-500", "text-slate-400")}` }, l.xp_required.toLocaleString(), " XP")), l.level <= lvl && /* @__PURE__ */ React.createElement(CircleCheck, { className: "w-5 h-5 text-emerald-500 flex-shrink-0" }))))));
    })));
  }
  function Leaderboard() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const { data: entries = [] } = useQuery(["leaderboard"], () => entities.Leaderboard.list(), { staleTime: 3e4 });
    const sorted = [...entries].sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0));
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const card = dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-400", "text-slate-500");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-amber-500 to-orange-500 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, "Leaderboard"), /* @__PURE__ */ React.createElement("p", { className: "text-amber-100 text-sm" }, "Top SmartCrick players by XP")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto" }, !sorted.length ? /* @__PURE__ */ React.createElement("div", { className: "text-center py-16" }, /* @__PURE__ */ React.createElement(Trophy, { className: `w-16 h-16 mx-auto mb-4 ${dm(isDarkMode, "text-slate-700", "text-slate-300")}` }), /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-2 ${txt}` }, "No entries yet"), /* @__PURE__ */ React.createElement("p", { className: `mb-6 ${sub}` }, "Complete workouts & drills to appear here!"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("FitnessBuilder"), className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-2xl" }, "Start Training")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, sorted.slice(0, 20).map((e, i) => /* @__PURE__ */ React.createElement("div", { key: e.id, className: `rounded-2xl p-4 border flex items-center gap-4 ${e.user_email === guestId ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20" : card}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${i === 0 ? "bg-yellow-400 text-yellow-900" : i === 1 ? "bg-slate-300 text-slate-700" : i === 2 ? "bg-amber-600 text-white" : dm(isDarkMode, "bg-slate-700 text-slate-300", "bg-slate-100 text-slate-500")}` }, i + 1), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: `font-bold ${txt}` }, e.username || "Anonymous", e.user_email === guestId ? " (You)" : ""), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${sub}` }, e.current_streak || 0, " day streak")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "font-bold text-amber-500" }, (e.total_xp || 0).toLocaleString()), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${sub}` }, "XP")))))));
  }
  function GetToKnowYou() {
    const { isDarkMode } = useDarkMode();
    const guestId = getGuestId();
    const [role, setRole] = useState("");
    const [exp, setExp] = useState("");
    const [saving, setSaving] = useState(false);
    const ROLES = ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"];
    const EXPS = ["Just starting", "1-2 years", "3-5 years", "5+ years", "Competitive/Club"];
    const finish = async () => {
      setSaving(true);
      try {
        await entities.UserProfile.create({ user_email: guestId, cricket_role: role, experience_years: exp, quiz_completed: true, main_goals: [] });
        sessionStorage.removeItem("onboarding_redirect_done");
        navigate("Home");
      } catch (e) {
        console.error(e);
        navigate("Home");
      }
      setSaving(false);
    };
    const base = dm(isDarkMode, "bg-slate-950", "bg-gradient-to-br from-emerald-50 to-teal-50");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-300", "text-slate-600");
    const selBtn = (sel, val) => sel === val ? "bg-emerald-500 text-white border-emerald-500 shadow-lg" : `border-2 ${dm(isDarkMode, "border-slate-600 text-slate-200 hover:border-emerald-400", "border-slate-200 text-slate-700 hover:border-emerald-400")}`;
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen flex flex-col items-center justify-center px-6 py-12 ${base}` }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-16 h-16 text-emerald-500 mb-4" }), /* @__PURE__ */ React.createElement("h1", { className: `text-2xl font-bold mb-2 text-center ${txt}` }, "Welcome to SmartCrick AI!"), /* @__PURE__ */ React.createElement("p", { className: `text-center mb-8 text-sm ${sub}` }, "Tell us about yourself so we can personalise your experience."), /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-sm space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-3 ${txt}` }, "Your cricket role"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2" }, ROLES.map((r) => /* @__PURE__ */ React.createElement("button", { key: r, onClick: () => setRole(r), className: `py-3 rounded-2xl font-semibold text-sm border transition-all ${selBtn(role, r)}` }, r)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: `font-bold mb-3 ${txt}` }, "Playing experience"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, EXPS.map((e) => /* @__PURE__ */ React.createElement("button", { key: e, onClick: () => setExp(e), className: `w-full py-3 rounded-2xl font-semibold text-sm border text-left px-4 transition-all ${selBtn(exp, e)}` }, e)))), /* @__PURE__ */ React.createElement("button", { onClick: finish, disabled: !role || !exp || saving, className: `w-full py-4 rounded-2xl font-bold text-white text-lg transition-all ${role && exp ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg hover:shadow-xl active:scale-95" : "bg-slate-400 cursor-not-allowed"}` }, saving ? "Setting up..." : "Get Started \u2192")));
  }
  function DrillYouTubeFinder() {
    const [query, setQuery] = useState("cricket batting drills");
    const [submitted, setSubmitted] = useState("cricket batting drills");
    return /* @__PURE__ */ React.createElement("div", { className: "h-screen flex flex-col bg-white" }, /* @__PURE__ */ React.createElement("div", { className: "bg-red-600 px-6 pt-14 pb-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-white/80 hover:text-white" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-5 h-5" })), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h1", { className: "text-lg font-bold text-white" }, "YouTube Drill Finder"), /* @__PURE__ */ React.createElement(
      "input",
      {
        value: query,
        onChange: (e) => setQuery(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && setSubmitted(query),
        placeholder: "Search cricket drills...",
        className: "mt-1 w-full bg-white/20 text-white placeholder:text-white/60 border border-white/30 rounded-xl px-3 py-1.5 text-sm focus:outline-none"
      }
    )), /* @__PURE__ */ React.createElement("button", { onClick: () => setSubmitted(query), className: "bg-white text-red-600 font-bold px-3 py-2 rounded-xl text-sm" }, "Go")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-hidden" }, /* @__PURE__ */ React.createElement("iframe", { src: `https://www.youtube.com/results?search_query=${encodeURIComponent(submitted)}`, className: "w-full h-full border-0", title: "YouTube Drill Finder" })));
  }
  function Settings2() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const card = dm(isDarkMode, "bg-slate-800 border-slate-700", "bg-white border-slate-100");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-slate-700 to-slate-800 px-6 pt-16 pb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white" }, "Settings")), /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 max-w-lg mx-auto space-y-3" }, /* @__PURE__ */ React.createElement("button", { onClick: toggleDarkMode, className: `w-full flex items-center justify-between p-4 rounded-2xl border ${card}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, isDarkMode ? /* @__PURE__ */ React.createElement(Sun, { className: "w-5 h-5 text-amber-500" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-5 h-5 text-indigo-500" }), /* @__PURE__ */ React.createElement("span", { className: `font-medium ${txt}` }, isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode")), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-slate-400" })), [["Bell", "Notifications", Bell], ["Shield", "Privacy", Shield], ["HelpCircle", "Help & Support", CircleQuestionMark]].map(([, label, Icon2]) => /* @__PURE__ */ React.createElement("button", { key: label, className: `w-full flex items-center justify-between p-4 rounded-2xl border ${card}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Icon2, { className: "w-5 h-5 text-slate-500" }), /* @__PURE__ */ React.createElement("span", { className: `font-medium ${txt}` }, label)), /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5 text-slate-400" })))));
  }
  function StubPage({ title, Icon: Icon2, headerColor, description }) {
    const { isDarkMode } = useDarkMode();
    const base = dm(isDarkMode, "bg-slate-950", "bg-slate-50");
    const txt = dm(isDarkMode, "text-white", "text-slate-800");
    const sub = dm(isDarkMode, "text-slate-400", "text-slate-500");
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen pb-24 ${base}` }, /* @__PURE__ */ React.createElement("div", { className: `bg-gradient-to-br ${headerColor} px-6 pt-16 pb-8` }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold text-white mb-1" }, title), description && /* @__PURE__ */ React.createElement("p", { className: "text-white/80 text-sm" }, description)), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-12 max-w-lg mx-auto text-center" }, /* @__PURE__ */ React.createElement(Icon2, { className: `w-16 h-16 mx-auto mb-4 ${dm(isDarkMode, "text-slate-700", "text-slate-300")}` }), /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-bold mb-2 ${txt}` }, title), /* @__PURE__ */ React.createElement("p", { className: `mb-6 ${sub}` }, "Actively being developed. Check back soon!"), /* @__PURE__ */ React.createElement("button", { onClick: () => navigate("Home"), className: "text-emerald-500 font-semibold hover:text-emerald-400 flex items-center gap-2 mx-auto" }, /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-4 h-4" }), "Back to Home")));
  }
  var Goals = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Goals", Icon: Target, headerColor: "from-purple-600 to-indigo-600", description: "Set and track your cricket goals" });
  var Chat = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Chat", Icon: MessageCircle, headerColor: "from-blue-600 to-cyan-600", description: "Connect with teammates" });
  var ConfidenceCheckIn = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Confidence Check-In", Icon: Heart, headerColor: "from-pink-500 to-rose-500", description: "Track your confidence levels daily" });
  var AIDrillRecommendation = () => /* @__PURE__ */ React.createElement(StubPage, { title: "AI Drill Recommendations", Icon: Sparkles, headerColor: "from-emerald-500 to-teal-600", description: "Personalised AI-powered drill suggestions" });
  var MatchTracker = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Match Tracker", Icon: Trophy, headerColor: "from-green-600 to-teal-600", description: "Log and analyse your matches" });
  var MatchDetail = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Match Detail", Icon: Trophy, headerColor: "from-green-600 to-teal-600" });
  var MatchHistory = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Match History", Icon: History, headerColor: "from-green-600 to-teal-600", description: "Your complete match record" });
  var ViewLogMatches = () => /* @__PURE__ */ React.createElement(StubPage, { title: "View & Log Matches", Icon: List, headerColor: "from-green-600 to-teal-600" });
  var Schedule = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Training Schedule", Icon: Calendar, headerColor: "from-violet-600 to-purple-600", description: "Plan your training schedule" });
  var ScheduleExtendedView = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Schedule", Icon: Calendar, headerColor: "from-violet-600 to-purple-600", description: "Your full training plan" });
  var Quizzes = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Cricket Quizzes", Icon: BookOpen, headerColor: "from-amber-500 to-yellow-500", description: "Test your cricket knowledge" });
  var QuizPlayer = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Quiz", Icon: BookOpen, headerColor: "from-amber-500 to-yellow-500" });
  var MiniMatch = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Mini-Match", Icon: Zap, headerColor: "from-orange-500 to-red-500", description: "Quick scenario-based cricket IQ tests" });
  var WorkoutBuilder = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Workout Builder", Icon: Dumbbell, headerColor: "from-purple-600 to-indigo-600", description: "Build custom workout plans manually" });
  var WorkoutPlayer = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Workout Player", Icon: Play, headerColor: "from-pink-500 to-rose-500" });
  var WorkoutHistory = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Workout History", Icon: History, headerColor: "from-slate-600 to-slate-700", description: "Your past workouts" });
  var WhyDidIGetOut = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Why Did I Get Out?", Icon: TrendingDown, headerColor: "from-red-600 to-orange-600", description: "AI-powered dismissal analysis" });
  var DrillWorkoutCreator = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Drill Workout Creator", Icon: Target, headerColor: "from-blue-500 to-cyan-600", description: "Build custom drill workout sessions" });
  var CustomDrillWorkoutCreator = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Custom Drill Workout", Icon: Target, headerColor: "from-blue-500 to-cyan-600" });
  var SavedDrillWorkout = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Saved Drill Workouts", Icon: Bookmark, headerColor: "from-blue-500 to-cyan-600" });
  var MentalTrainingCreator = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Mental Training Creator", Icon: Brain, headerColor: "from-purple-600 to-indigo-600", description: "Create custom mental training sessions" });
  var ThirtyDayChallenge = () => /* @__PURE__ */ React.createElement(StubPage, { title: "30-Day Challenge", Icon: Flame, headerColor: "from-orange-500 to-red-500", description: "Your 30-day cricket improvement challenge" });
  var CoachVoiceMode = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Coach Voice Mode", Icon: Mic, headerColor: "from-blue-600 to-indigo-600", description: "Voice-powered coaching experience" });
  var AdminSeedMentals = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Admin: Seed Mentals", Icon: Settings, headerColor: "from-slate-600 to-slate-700" });
  var AdvancedPathDetails = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Advanced Path Details", Icon: TrendingUp, headerColor: "from-teal-500 to-emerald-600" });
  var ExpandedProgress = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Expanded Progress", Icon: ChartNoAxesColumn, headerColor: "from-pink-500 to-purple-600" });
  var ExtendedMilestones = () => /* @__PURE__ */ React.createElement(StubPage, { title: "Extended Milestones", Icon: Award, headerColor: "from-amber-500 to-orange-500" });
  function Onboarding() {
    useEffect(() => {
      navigate("GetToKnowYou");
    }, []);
    return null;
  }
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
    MatchDetail,
    MatchHistory,
    ViewLogMatches,
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
    CoachVoiceMode,
    Settings: Settings2,
    GetToKnowYou,
    Onboarding
  };
  function App() {
    const { page } = useLocation();
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => {
      const saved = localStorage.getItem("theme");
      if (!saved) {
        localStorage.setItem("theme", "dark");
        return true;
      }
      return saved === "dark";
    });
    const toggleDarkMode = useCallback(() => {
      const next = !isDarkMode;
      setIsDarkMode(next);
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
    }, [isDarkMode]);
    useEffect(() => {
      document.documentElement.classList.toggle("dark", isDarkMode);
      if (!window.location.hash) window.location.hash = "#/Home";
      setTimeout(() => setLoading(false), 350);
    }, []);
    if (loading) return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen flex items-center justify-center ${isDarkMode ? "bg-slate-900" : "bg-white"}` }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), /* @__PURE__ */ React.createElement("p", { className: `font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}` }, "Loading SmartCrick AI...")));
    const PageComp = PAGES[page] || Home;
    return /* @__PURE__ */ React.createElement(DarkModeCtx.Provider, { value: { isDarkMode, toggleDarkMode } }, /* @__PURE__ */ React.createElement(Layout, { page }, /* @__PURE__ */ React.createElement(PageComp, null)));
  }
  window.ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/mergeClasses.js:
lucide-react/dist/esm/shared/src/utils/toKebabCase.js:
lucide-react/dist/esm/shared/src/utils/toCamelCase.js:
lucide-react/dist/esm/shared/src/utils/toPascalCase.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.js:
lucide-react/dist/esm/context.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-left.js:
lucide-react/dist/esm/icons/award.js:
lucide-react/dist/esm/icons/bell.js:
lucide-react/dist/esm/icons/book-open.js:
lucide-react/dist/esm/icons/bookmark.js:
lucide-react/dist/esm/icons/brain.js:
lucide-react/dist/esm/icons/calendar.js:
lucide-react/dist/esm/icons/chart-no-axes-column.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/chevron-up.js:
lucide-react/dist/esm/icons/circle-check.js:
lucide-react/dist/esm/icons/circle-question-mark.js:
lucide-react/dist/esm/icons/clock.js:
lucide-react/dist/esm/icons/crown.js:
lucide-react/dist/esm/icons/dumbbell.js:
lucide-react/dist/esm/icons/flame.js:
lucide-react/dist/esm/icons/frown.js:
lucide-react/dist/esm/icons/heart.js:
lucide-react/dist/esm/icons/history.js:
lucide-react/dist/esm/icons/house.js:
lucide-react/dist/esm/icons/layers.js:
lucide-react/dist/esm/icons/list.js:
lucide-react/dist/esm/icons/lock.js:
lucide-react/dist/esm/icons/meh.js:
lucide-react/dist/esm/icons/menu.js:
lucide-react/dist/esm/icons/message-circle.js:
lucide-react/dist/esm/icons/mic.js:
lucide-react/dist/esm/icons/moon.js:
lucide-react/dist/esm/icons/pencil.js:
lucide-react/dist/esm/icons/play.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/rocket.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/settings.js:
lucide-react/dist/esm/icons/shield.js:
lucide-react/dist/esm/icons/smile.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/star.js:
lucide-react/dist/esm/icons/sun.js:
lucide-react/dist/esm/icons/target.js:
lucide-react/dist/esm/icons/trending-down.js:
lucide-react/dist/esm/icons/trending-up.js:
lucide-react/dist/esm/icons/trophy.js:
lucide-react/dist/esm/icons/user.js:
lucide-react/dist/esm/icons/video.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/icons/zap.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v1.7.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
