// Icon map: variants and search keywords per theme library
export type IconMap = {
  [key: string]: {
    solar: string;
    lucide: string;
    keywords?: string[];
    /**
     * When Solar's glyph does not fit the UI, keep Lucide (or another library) even if
     * the theme uses iconLibrary "solar". Alternative: set `solar` to a lucide:… id directly.
     */
    preferLibrary?: "solar" | "lucide";
  };
};

// Default icon map entries
const icons: IconMap = {
  default: {
    solar: "solar:file-outline",
    lucide: "lucide:sticky-note",
    keywords: ["default"],
  },
  users: {
    solar: "solar:users-group-rounded-outline",
    lucide: "lucide:users",
    keywords: [
      "users",
      "people",
      "user group",
      "users group",
      "team",
      "person",
      "profile",
      "members",
    ],
  },
  labs: {
    solar: "solar:test-tube-outline",
    lucide: "lucide:test-tube-diagonal",
    keywords: ["labs", "experiment", "experimentation"],
  },
  magic: {
    solar: "solar:magic-stick-3-outline",
    lucide: "lucide:wand-sparkles",
    keywords: ["magic", "wand", "sparkles"],
  },

  kbd: {
    solar: "mingcute:command-line",
    lucide: "lucide:command",
    keywords: ["kbd", "ctrl", "command"],
  },

  kbdShift: {
    solar: "solar:arrow-up-linear",
    lucide: "lucide:arrow-up",
    keywords: ["shift", "kbd", "modifier"],
  },

  kbdEnter: {
    solar: "solar:round-arrow-down-outline",
    lucide: "lucide:corner-down-left",
    keywords: ["enter", "return", "kbd"],
  },

  kbdSpace: {
    solar: "solar:minimize-square-minimalistic-outline",
    lucide: "lucide:space",
    keywords: ["space", "spacebar", "kbd"],
  },

  rocket: {
    solar: "solar:rocket-outline",
    lucide: "lucide:rocket",
    keywords: [
      "rocket",
      "space",
      "launch",
      "tools",
      "wp-rocket",
      "wprocket",
      "wp rocket",
    ],
  },

  ai: {
    solar: "hugeicons:adobe-illustrator",
    lucide: "lucide:wand-sparkles",
    keywords: ["ai", "artificial", "intelligence"],
  },

  book: {
    solar: "hugeicons:book-open-02",
    lucide: "lucide:book",
    keywords: ["book", "book", "book", "book"],
  },

  verified: {
    solar: "hugeicons:checkmark-badge-01",
    lucide: "lucide:badge-check",
    keywords: ["verified", "validated"],
  },

  ads: {
    solar: "hugeicons:advertisement",
    lucide: "hugeicons:advertisement",
    keywords: ["ads"],
  },

  acf: {
    solar: "solar:list-check-outline",
    lucide: "lucide:form-input",
    keywords: [
      "acf",
      "advanced custom fields",
      "custom fields",
      "field group",
      "field groups",
      "acf-field-group",
    ],
  },

  emoji: {
    solar: "hugeicons:smile",
    lucide: "lucide:smile",
    keywords: ["emoji", "icons"],
  },

  funnel: {
    solar: "solar:filter-outline",
    lucide: "lucide:funnel",
    keywords: ["funnel", "filter", "filter", "filter"],
  },

  full: {
    solar: "hugeicons:full-signal",
    lucide: "lucide:chart-no-axes-column-increasing",
    keywords: ["full", "grow"],
  },

  bolt: {
    solar: "solar:bolt-outline",
    lucide: "lucide:zap",
    keywords: ["bolt", "zap", "lightning", "flash", "power", "turbo", "fast"],
  },

  send: {
    solar: "solar:plain-2-outline",
    lucide: "lucide:send",
    keywords: ["send", "send", "send", "send"],
  },

  forum: {
    solar: "solar:chat-line-outline",
    lucide: "lucide:message-square",
    keywords: ["forum", "message", "chat", "discussion"],
  },
  stat: {
    solar: "solar:pulse-2-outline",
    lucide: "lucide:chart-no-axes-column",
    keywords: ["stat", "chart", "column", "stat"],
  },

  flow: {
    solar: "solar:routing-outline",
    lucide: "lucide:git-branch",
    keywords: ["flow", "git", "branch", "flow", "git", "branch", "logic"],
  },

  link: {
    solar: "solar:link-round-angle-outline",
    lucide: "lucide:link",
    keywords: ["link", "url", "web", "internet"],
  },

  thumbsDown: {
    solar: "solar:dislike-outline",
    lucide: "lucide:thumbs-down",
    keywords: ["thumbs-down", "dislike", "thumb-down", "deny"],
  },

  thumbsUp: {
    solar: "solar:like-outline",
    lucide: "lucide:thumbs-up",
    keywords: ["thumbs-up", "thumbs-up", "thumbs-up", "thumbs-up"],
  },

  community: {
    solar: "solar:users-group-two-rounded-outline",
    lucide: "lucide:users-round",
    keywords: ["community", "users", "people", "group", "team", "person"],
  },

  login: {
    solar: "solar:login-2-outline",
    lucide: "lucide:log-in",
    keywords: ["login", "log in", "sign in", "authentication"],
  },
  logout: {
    solar: "solar:logout-2-outline",
    lucide: "lucide:log-out",
    keywords: ["logout", "log out", "sign out", "authentication"],
  },

  event: {
    solar: "solar:calendar-minimalistic-outline",
    lucide: "lucide:calendar",
    keywords: ["event", "calendar", "date", "schedule", "time"],
  },

  comment: {
    solar: "solar:chat-round-outline",
    lucide: "lucide:message-circle",
    keywords: ["comment", "message", "chat", "discussion", "repl"],
  },

  membership: {
    solar: "solar:user-rounded-outline",
    lucide: "lucide:user-round",
    keywords: ["membership", "users", "people", "group", "team", "person"],
  },

  category: {
    solar: "solar:archive-minimalistic-outline",
    lucide: "lucide:panel-bottom-close",
    keywords: ["categor", "archive"],
  },
  command: {
    solar: "solar:command-outline",
    lucide: "lucide:command",
    keywords: ["command", "command", "command"],
  },

  home: {
    solar: "solar:home-2-outline",
    lucide: "lucide:house",
    keywords: ["home", "house", "main"],
  },

  integration: {
    solar: "solar:widget-add-outline",
    lucide: "lucide:grid-2x2-plus",
    keywords: ["integration", "widget", "add", "grid", "plus"],
  },
  viewGrid: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:layout-grid",
    keywords: ["view", "grid", "cards"],
  },
  viewList: {
    solar: "solar:list-outline",
    lucide: "lucide:list",
    keywords: ["view", "list", "rows"],
  },
  /** Page header view switcher (WordPress / Table / Calendar). */
  viewModes: {
    solar: "solar:reorder-outline",
    lucide: "lucide:layers",
    keywords: ["views", "view", "mode", "switch", "reorder"],
  },
  appWindow: {
    solar: "solar:widget-outline",
    lucide: "lucide:app-window",
    keywords: ["app", "application", "window"],
  },

  /** FleekDash top-level admin menu (slug fleekdash) — avoid fuzzy match on keyword "dash". */
  fleekdash: {
    solar: "solar:widget-outline",
    lucide: "lucide:app-window",
    keywords: ["fleekdash", "fleek", "brand"],
  },
  idea: {
    solar: "solar:lightbulb-outline",
    lucide: "lucide:lightbulb",
    keywords: ["idea", "tip", "hint", "lightbulb"],
  },
  eye: {
    solar: "solar:eye-outline",
    lucide: "lucide:eye",
    keywords: ["eye", "preview", "view", "visible"],
  },
  eyeOff: {
    // Keep both libraries on a guaranteed existing glyph to avoid blank auto-hide icon.
    solar: "lucide:eye-off",
    lucide: "lucide:eye-off",
    keywords: ["eye", "hidden", "hide", "invisible"],
  },

  template: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:layout-panel-left",
    keywords: ["template", "layout"],
  },

  layout: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:layout",
    keywords: ["layout", "structure", "panels"],
  },

  layoutDashboard: {
    solar: "solar:widget-5-outline",
    lucide: "lucide:layout-dashboard",
    keywords: ["dashboard", "layout", "admin bar"],
  },

  theme: {
    solar: "proicons:dark-theme",
    lucide: "proicons:dark-theme",
    keywords: ["theme"],
  },

  palette: {
    solar: "solar:palette-outline",
    lucide: "lucide:palette",
    keywords: ["palette", "appearance"],
  },

  library: {
    solar: "solar:book-minimalistic-outline",
    lucide: "lucide:library-big",
    keywords: ["library", "book", "library", "big"],
  },

  calendar: {
    solar: "solar:calendar-minimalistic-outline",
    lucide: "lucide:calendar",
    keywords: ["calendar", "date", "schedule", "time"],
  },

  cache: {
    solar: "solar:database-outline",
    lucide: "lucide:database",
    keywords: [
      "cache",
      "caching",
      "cached",
      "purge",
      "flush",
      "object cache",
      "page cache",
      "redis",
      "memcached",
      "transient",
      "autoptimize",
      "w3 total cache",
    ],
  },

  archive: {
    solar: "solar:archive-minimalistic-outline",
    lucide: "lucide:archive",
    keywords: ["archive", "box", "storage"],
  },

  security: {
    solar: "solar:shield-minimalistic-outline",
    lucide: "lucide:shield",
    keywords: ["security", "shield", "protection", "safety"],
  },

  lock: {
    solar: "solar:lock-outline",
    lucide: "lucide:lock",
    keywords: ["lock", "locked", "secure", "private"],
  },

  key: {
    solar: "solar:key-outline",
    lucide: "lucide:key",
    keywords: ["key", "password", "secret", "credentials"],
  },

  shieldCheck: {
    solar: "solar:shield-check-outline",
    lucide: "lucide:shield-check",
    keywords: ["shield", "check", "verified", "secure"],
  },

  shieldX: {
    solar: "solar:shield-cross-outline",
    lucide: "lucide:shield-x",
    keywords: ["shield", "x", "deny", "block", "restricted"],
  },

  shieldAlert: {
    solar: "solar:shield-warning-outline",
    lucide: "lucide:shield-alert",
    keywords: ["shield", "alert", "warning", "permission", "restriction"],
  },

  dashboard: {
    solar: "solar:widget-outline",
    lucide: "lucide:layout-panel-left",
    keywords: ["dashboard", "dash"],
  },

  widget: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:layout-panel-left",
    keywords: ["widget"],
  },

  update: {
    solar: "solar:revote-outline",
    lucide: "lucide:refresh-ccw",
    keywords: ["update"],
  },

  menu: {
    solar: "solar:hamburger-menu-outline",
    lucide: "lucide:menu",
    keywords: ["menu", "hamburger"],
  },

  pricing: {
    solar: "solar:dollar-minimalistic-outline",
    lucide: "lucide:coins",
    keywords: ["pricing", "dollar", "coins", "price", "cost", "pay", "payment"],
  },

  planUpgrade: {
    solar: "solar:stars-minimalistic-outline",
    lucide: "lucide:sparkles",
    keywords: ["upgrade", "plan", "license", "premium", "feature", "sparkles"],
  },

  reset: {
    solar: "solar:refresh-outline",
    lucide: "lucide:iteration-ccw",
    keywords: ["reset", "refresh", "random", "restart"],
  },

  coupon: {
    solar: "solar:ticker-star-outline",
    lucide: "lucide:tag",
    keywords: ["coupon", "tag", "coupon", "tag"],
  },

  data: {
    solar: "solar:server-minimalistic-outline",
    lucide: "lucide:rows-3",
    keywords: ["data", "server", "rows", "data"],
  },

  tunning: {
    solar: "solar:tuning-2-outline",
    lucide: "lucide:settings",
    keywords: ["tunning", "config"],
  },

  star: {
    solar: "solar:star-outline",
    lucide: "lucide:star",
    keywords: ["star", "feature", "favorite"],
  },

  starFilled: {
    solar: "solar:star-bold",
    lucide: "lucide:star",
    keywords: ["star", "favorite", "filled", "active"],
  },

  reward: {
    solar: "solar:cup-outline",
    lucide: "lucide:medal",
    keywords: ["reward", "medal"],
  },

  design: {
    solar: "solar:ruler-cross-pen-outline",
    lucide: "lucide:pencil-ruler",
    keywords: ["design", "ruler", "pen"],
  },

  paintbrush: {
    solar: "solar:palette-round-outline",
    lucide: "lucide:paintbrush",
    keywords: ["paintbrush", "brush", "color", "gradient"],
  },

  stop: {
    solar: "solar:stop-circle-outline",
    lucide: "lucide:square",
    keywords: ["stop", "square", "halt", "cancel generation"],
  },

  chartPie: {
    solar: "solar:pie-chart-3-outline",
    lucide: "lucide:chart-pie",
    keywords: ["chart", "pie"],
  },

  chartDonut: {
    solar: "solar:chart-2-outline",
    lucide: "lucide:chart-pie",
    keywords: ["chart", "donut", "pie"],
  },

  graph: {
    solar: "solar:round-graph-outline",
    lucide: "lucide:chart-no-axes-combined",
    keywords: ["graph"],
  },

  chartSquare: {
    solar: "solar:chart-square-outline",
    lucide: "lucide:chart-column-increasing",
    keywords: ["chart", "square"],
  },

  courseUp: {
    solar: "solar:course-up-outline",
    lucide: "lucide:chart-column-increasing",
    keywords: ["course-up"],
  },

  courseDown: {
    solar: "solar:course-down-outline",
    lucide: "lucide:chart-column-increasing",
    keywords: ["course-down"],
  },

  download: {
    solar: "solar:download-minimalistic-outline",
    lucide: "lucide:download",
    keywords: ["download"],
  },

  upload: {
    solar: "solar:upload-minimalistic-linear",
    lucide: "lucide:upload",
    keywords: ["upload", "import", "file"],
  },

  sortAsc: {
    solar: "solar:sort-from-top-to-bottom-linear",
    lucide: "lucide:arrow-down-narrow-wide",
    keywords: ["sort", "order", "ascending"],
  },

  sortVertical: {
    solar: "solar:sort-vertical-outline",
    lucide: "lucide:arrow-down-up",
    keywords: ["sort", "order", "vertical", "reorder"],
  },

  structure: {
    solar: "solar:structure-outline",
    lucide: "lucide:align-horizontal-distribute-center",
    keywords: ["structure", "construction", "building"],
  },

  check: {
    solar: "solar:check-read-outline",
    lucide: "lucide:circle-check-big",
    keywords: ["check", "check", "check", "check"],
  },

  checkCircle: {
    solar: "solar:check-circle-outline",
    lucide: "lucide:check-circle",
    keywords: ["check", "circle", "success", "complete"],
  },

  task: {
    solar: "solar:check-square-outline",
    lucide: "lucide:table-of-contents",
    keywords: ["task", "task", "task", "task"],
  },

  memo: {
    solar: "hugeicons:brain-03",
    lucide: "lucide:brain",
    keywords: ["memo", "memo", "memo", "memo"],
  },

  save: {
    solar: "solar:sim-card-minimalistic-outline",
    lucide: "lucide:save",
    keywords: ["save", "save", "save", "save"],
  },

  inbox: {
    solar: "solar:inbox-in-outline",
    lucide: "lucide:inbox",
    keywords: ["inbox", "email", "mail", "message"],
  },

  post: {
    solar: "solar:document-outline",
    lucide: "lucide:file-text",
    keywords: ["post", "document", "file", "text", "before"],
  },

  kit: {
    solar: "solar:box-minimalistic-outline",
    lucide: "lucide:blocks",
    keywords: ["kit", "box", "blocks", "kit", "box"],
  },

  place: {
    solar: "solar:map-outline",
    lucide: "lucide:map-pinned",
    keywords: ["place", "map", "map", "map"],
  },

  property: {
    solar: "solar:buildings-2-outline",
    lucide: "lucide:building-2",
    keywords: ["property", "building", "building", "building"],
  },

  area: {
    solar: "solar:map-outline",
    lucide: "lucide:map-pinned",
    keywords: ["area", "map"],
  },

  game: {
    solar: "solar:gamepad-outline",
    lucide: "lucide:gamepad-2",
    keywords: ["game", "gamepad", "gamepad", "gamepad"],
  },

  gallery: {
    solar: "solar:wallpaper-outline",
    lucide: "lucide:images",
    keywords: ["gallery", "media", "images", "gallery"],
  },

  mediaGallery: {
    solar: "solar:gallery-minimalistic-linear",
    lucide: "lucide:images",
    keywords: ["gallery", "media", "all media", "library"],
  },

  seo: {
    solar: "solar:rounded-magnifer-linear",
    lucide: "lucide:search",
    keywords: ["seo"],
  },

  speed: {
    solar: "solar:spedometer-max-outline",
    lucide: "lucide:gauge",
    keywords: [
      "speed",
      "fast",
      "faster",
      "quick",
      "accelerate",
      "acceleration",
      "latency",
      "litespeed",
      "optimize",
      "optimization",
      "optimise",
      "performance",
      "cdn",
      "boost",
    ],
  },

  image: {
    solar: "solar:gallery-outline",
    lucide: "lucide:image",
    keywords: ["image", "thumbnail", "picture", "photo"],
  },

  layers: {
    solar: "solar:layers-minimalistic-outline",
    lucide: "lucide:layers",
    keywords: ["layers", "stack", "size", "storage", "library"],
  },

  text: {
    solar: "solar:text-square-outline",
    lucide: "lucide:text",
    keywords: ["text", "formatting"],
  },

  edit: {
    solar: "solar:pen-new-square-outline",
    lucide: "lucide:pencil",
    keywords: ["edit", "pencil"],
  },

  plugin: {
    solar: "solar:plug-circle-outline",
    lucide: "lucide:plug",
    keywords: ["plugin", "plug", "plugin", "plug"],
  },

  uninstall: {
    solar: "solar:box-minimalistic-outline",
    lucide: "lucide:package-minus",
    keywords: ["uninstall", "remove", "package", "plugin", "theme"],
  },

  time: {
    solar: "solar:clock-circle-outline",
    lucide: "lucide:clock",
    keywords: ["time", "clock", "time", "clock"],
  },

  alert: {
    solar: "solar:bell-outline",
    lucide: "lucide:bell",
    keywords: ["alert", "bell"],
  },

  addon: {
    solar: "solar:box-minimalistic-outline",
    lucide: "lucide:package-plus",
    keywords: ["addon", "add-on"],
  },

  search: {
    solar: "solar:minimalistic-magnifer-outline",
    lucide: "lucide:search",
    keywords: ["search"],
  },

  searchX: {
    solar: "solar:magnifer-zoom-out-outline",
    lucide: "lucide:search-x",
    keywords: ["search", "empty", "not found", "no results"],
  },

  zoomIn: {
    solar: "solar:magnifer-zoom-in-outline",
    lucide: "lucide:zoom-in",
    keywords: ["zoom", "enlarge", "magnify", "preview", "expand"],
  },

  cardExpand: {
    solar: "solar:maximize-square-outline",
    lucide: "lucide:maximize-2",
    keywords: ["expand", "maximize", "card", "enlarge"],
  },

  cardCollapse: {
    solar: "solar:minimize-square-outline",
    lucide: "lucide:minimize-2",
    keywords: ["collapse", "minimize", "card", "shrink"],
  },

  postCardCompact: {
    solar: "solar:minimize-square-2-outline",
    lucide: "lucide:minimize-2",
    keywords: ["compact", "card", "density", "small", "minimize", "kanban"],
  },

  postCardMedium: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:layout-grid",
    keywords: ["medium", "card", "density", "default", "kanban"],
  },

  postCardLarge: {
    solar: "solar:maximize-square-2-outline",
    lucide: "lucide:maximize-2",
    keywords: ["large", "card", "density", "big", "maximize", "kanban"],
  },

  postCardInspiration: {
    solar: "solar:gallery-minimalistic-outline",
    lucide: "lucide:images",
    keywords: [
      "inspiration",
      "card",
      "density",
      "gallery",
      "masonry",
      "kanban",
    ],
  },

  store: {
    solar: "solar:shop-2-outline",
    lucide: "lucide:store",
    keywords: ["store", "loja"],
  },

  delete: {
    solar: "solar:trash-bin-2-outline",
    lucide: "lucide:trash",
    keywords: ["delete", "trash", "delete", "trash"],
  },

  clearCache: {
    solar: "solar:trash-bin-2-outline",
    lucide: "lucide:trash",
    keywords: ["clear", "cache", "broom", "clean", "purge", "eraser"],
  },

  developer: {
    solar: "solar:code-square-outline",
    lucide: "lucide:square-terminal",
    keywords: ["developer", "code", "terminal"],
  },

  product: {
    solar: "solar:box-minimalistic-outline",
    lucide: "lucide:box",
    keywords: ["product", "box", "product", "box"],
  },

  page: {
    solar: "solar:documents-minimalistic-outline",
    lucide: "lucide:file",
    keywords: ["page", "file", "text"],
  },

  pages: {
    solar: "solar:documents-outline",
    lucide: "lucide:files",
    keywords: ["pages", "static", "wordpress pages"],
  },

  fileText: {
    solar: "solar:document-text-linear",
    lucide: "lucide:file-text",
    keywords: ["file", "text", "document"],
  },

  fleekDocs: {
    solar: "solar:document-text-linear",
    lucide: "lucide:file-text",
    keywords: ["fleek", "docs", "document", "documentation", "knowledge"],
  },

  plainText: {
    solar: "solar:plain-2-linear",
    lucide: "lucide:text",
    keywords: ["plain", "text", "note"],
  },

  clipboardList: {
    solar: "solar:clipboard-list-linear",
    lucide: "lucide:clipboard-list",
    keywords: ["clipboard", "list", "tasks", "checklist"],
  },

  wallet: {
    solar: "solar:wallet-outline",
    lucide: "lucide:wallet",
    keywords: ["wallet", "pay", "payment"],
  },

  chart: {
    solar: "solar:chart-outline",
    lucide: "lucide:bar-chart",
    keywords: ["chart", "graph", "statistics", "analytics"],
  },

  tool: {
    solar: "solar:widget-add-outline",
    lucide: "lucide:square-mouse-pointer",
    keywords: ["tools", "tool"],
  },
  sales: {
    solar: "solar:shop-outline",
    lucide: "lucide:shopping-cart",
    keywords: ["sales", "shop", "store", "commerce", "cart"],
  },
  pin: {
    solar: "solar:pin-outline",
    lucide: "lucide:pin",
    keywords: ["pin", "sticky"],
  },

  pinFilled: {
    solar: "solar:pin-bold",
    lucide: "lucide:pin",
    keywords: ["pin", "pinned", "filled", "active"],
  },

  pinOff: {
    solar: "lucide:pin-off",
    lucide: "lucide:pin-off",
    keywords: ["pin-off", "unpin", "sticky-off", "unsticky"],
  },

  panelLeft: {
    solar: "gravity-ui:layout-split-side-content-left",
    lucide: "lucide:panel-left",
    keywords: ["panel", "collapse"],
  },

  panelRight: {
    solar: "mynaui:panel-left-open",
    lucide: "lucide:panel-right-close",
    keywords: ["panelRight", "collapse"],
  },

  /** Vaul modal ↔ drawer layout toggle (drawer / side panel view). */
  layoutDrawer: {
    solar: "lucide:panels-top-left",
    lucide: "lucide:panels-top-left",
    keywords: ["drawer", "layout", "panels", "sidebar", "switch to drawer"],
  },

  /** Vaul modal ↔ drawer layout toggle (modal / centered view). */
  layoutModal: {
    solar: "lucide:square",
    lucide: "lucide:square",
    keywords: ["modal", "layout", "square", "window", "switch to modal"],
  },

  /** Dashboard layout: chart row on top (split-top). */
  layoutSplitTop: {
    solar: "fluent:layout-row-two-split-top-16-regular",
    lucide: "fluent:layout-row-two-split-top-16-regular",
    keywords: ["layout", "split", "top", "dashboard", "split-top"],
  },

  /** Dashboard layout: chart row on bottom (split-bottom). */
  layoutSplitBottom: {
    solar: "fluent:layout-row-two-split-bottom-16-regular",
    lucide: "fluent:layout-row-two-split-bottom-16-regular",
    keywords: ["layout", "split", "bottom", "dashboard", "split-bottom"],
  },

  /** Dashboard layout: three stacked rows (three-row). */
  layoutThreeRow: {
    solar: "lucide:rows-3",
    lucide: "lucide:rows-3",
    keywords: ["layout", "three", "row", "dashboard", "three-row"],
  },

  /** Dashboard layout editor / row settings (Fluent-only glyph). */
  layoutRowSettings: {
    solar: "fluent:layout-row-two-settings-24-regular",
    lucide: "fluent:layout-row-two-settings-24-regular",
    keywords: ["layout", "settings", "dashboard", "edit mode"],
  },

  loading: {
    solar: "svg-spinners:90-ring-with-bg",
    lucide: "svg-spinners:tadpole",
    keywords: ["loading", "spinner", "loader", "loader-2"],
  },

  loadingInfinity: {
    solar: "svg-spinners:blocks-wave",
    lucide: "svg-spinners:blocks-wave",
    keywords: ["loading", "infinity", "spinner", "button"],
  },

  loadingTwist: {
    solar: "svg-spinners:ring-resize",
    lucide: "svg-spinners:ring-resize",
    keywords: ["loading", "twist", "spinner", "button"],
  },

  pulse: {
    solar: "svg-spinners:pulse-ring",
    lucide: "svg-spinners:pulse-multiple",
    keywords: ["loading-pulse", "pulsing", "pulse"],
  },

  api: {
    solar: "hugeicons:api",
    lucide: "gravity-ui:abbr-api",
    keywords: ["api"],
  },

  webhook: {
    solar: "material-symbols:webhook",
    lucide: "octicon:webhook-16",
    keywords: ["webhook"],
  },

  bag: {
    solar: "solar:bag-outline",
    lucide: "lucide:weight",
    keywords: ["bag", "shopping", "purchase"],
  },
  fire: {
    solar: "solar:fire-outline",
    lucide: "lucide:flame",
    keywords: ["fire", "flame", "heat", "burn"],
  },
  health: {
    solar: "solar:stethoscope-outline",
    lucide: "lucide:stethoscope",
    keywords: ["health", "doctor", "hospital", "medicine", "healthcare"],
  },
  revenue: {
    solar: "solar:wallet-money-outline",
    lucide: "lucide:dollar-sign",
    keywords: [
      "revenue",
      "money",
      "finance",
      "dollar",
      "currency",
      "payment",
      "pay",
    ],
  },
  trending: {
    solar: "solar:graph-up-outline",
    lucide: "lucide:trending-up",
    keywords: ["trending", "growth", "increase", "up"],
  },

  assistant: {
    solar: "hugeicons:robotic",
    lucide: "lucide:bot-message-square",
    keywords: ["assistant", "chatbot"],
  },

  language: {
    solar: "solar:global-outline",
    lucide: "lucide:globe",
    keywords: ["language", "translation", "localization", "globe"],
  },

  globe: {
    solar: "solar:global-linear",
    lucide: "lucide:globe",
    keywords: ["globe", "network", "multisite", "world", "site"],
  },

  shield: {
    solar: "solar:shield-user-outline",
    lucide: "lucide:shield",
    keywords: [
      "shield",
      "network admin",
      "super admin",
      "administration",
      "security",
    ],
  },

  stay: {
    solar: "solar:buildings-2-outline",
    lucide: "lucide:building-2",
    keywords: ["stay", "building", "hotel", "accommodation", "room"],
  },

  //   events: {
  //     solar: "solar:calendar-outline",
  //     lucide: "lucide:calendar",
  //     keywords: ["events", "agenda", "date", "schedule"],
  //   },

  notification: {
    solar: "solar:bell-outline",
    lucide: "lucide:bell",
    keywords: ["notification", "alert", "bell", "reminder"],
  },
  profile: {
    solar: "solar:user-circle-outline",
    lucide: "lucide:user",
    keywords: ["profile", "user", "account", "person"],
  },

  userCog: {
    solar: "solar:user-id-outline",
    lucide: "lucide:user-cog",
    keywords: ["user", "cog", "roles", "permissions"],
  },

  userCheck: {
    solar: "solar:user-check-rounded-outline",
    lucide: "lucide:user-check",
    keywords: ["user", "check", "approval", "verified user"],
  },

  kpi: {
    solar: "solar:chart-outline",
    lucide: "lucide:chart-no-axes-column",
    keywords: ["kpi", "chart", "graph", "kpi"],
  },

  cmdk: {
    solar: "solar:command-outline",
    lucide: "lucide:command",
    keywords: ["cmdk", "command", "command-palette"],
  },

  chevronDown: {
    solar: "solar:alt-arrow-down-outline",
    lucide: "lucide:chevron-down",
    keywords: ["down", "arrow", "expand"],
  },
  chevronUp: {
    solar: "solar:alt-arrow-up-outline",
    lucide: "lucide:chevron-up",
    keywords: ["up", "arrow", "collapse"],
  },
  chevronRight: {
    solar: "solar:alt-arrow-right-outline",
    lucide: "lucide:chevron-right",
    keywords: ["right", "arrow", "next"],
  },
  chevronLeft: {
    solar: "solar:alt-arrow-left-outline",
    lucide: "lucide:chevron-left",
    keywords: ["left", "arrow", "previous"],
  },
  close: {
    solar: "mingcute:close-fill",
    lucide: "lucide:x",
    keywords: ["close", "exit", "cancel"],
  },

  columns: {
    solar: "solar:slider-vertical-outline",
    lucide: "lucide:columns-2",
    keywords: ["columns", "column", "grid columns", "manage columns", "layout"],
  },

  incognito: {
    solar: "solar:incognito-outline",
    lucide: "fluent:incognito-24-regular",
    keywords: ["incognito", "browser", "privacy", "incognito"],
  },

  newtab: {
    solar: "solar:square-top-down-outline",
    lucide: "lucide:external-link",
    keywords: ["new", "tab", "link", "external", "external-link", "open"],
  },

  dotsvertical: {
    solar: "solar:menu-dots-outline",
    lucide: "lucide:more-vertical",
    keywords: ["dots", "actions"],
  },

  options: {
    solar: "solar:add-square-outline",
    lucide: "lucide:list-plus",
    keywords: ["more", "options", "actions"],
  },

  info: {
    solar: "solar:info-circle-outline",
    lucide: "lucide:info",
    keywords: ["info", "information", "details", "about", "help"],
  },

  academy: {
    solar: "solar:square-academic-cap-outline",
    lucide: "lucide:book-check",
    keywords: ["academy", "book", "check", "academy"],
  },

  play: {
    solar: "solar:play-outline",
    lucide: "lucide:play",
    keywords: ["play", "video", "music", "audio"],
  },

  map: {
    solar: "solar:streets-map-point-outline",
    lucide: "lucide:land-plot",
    keywords: ["map", "location"],
  },

  cloudUpload: {
    solar: "solar:cloud-upload-linear",
    lucide: "lucide:cloud-upload",
    keywords: ["cloud", "upload", "offload", "remote", "storage"],
  },

  copy: {
    solar: "solar:copy-outline",
    lucide: "lucide:copy",
    keywords: ["copy", "clipboard", "paste"],
  },

  crop: {
    solar: "solar:crop-minimalistic-linear",
    lucide: "lucide:crop",
    keywords: ["crop", "resize", "thumbnail", "dimensions", "frame"],
  },

  mail: {
    solar: "solar:letter-outline",
    lucide: "lucide:mail",
    keywords: ["mail", "email", "letter", "envelope"],
  },

  heart: {
    solar: "solar:heart-outline",
    lucide: "lucide:heart",
    keywords: ["heart", "like", "favorite", "love"],
  },

  arrowRight: {
    solar: "solar:arrow-right-outline",
    lucide: "lucide:arrow-right",
    keywords: ["arrow", "right", "next", "forward"],
  },

  folder: {
    solar: "solar:folder-with-files-outline",
    lucide: "lucide:folder",
    keywords: ["folder"],
  },

  folderPlain: {
    solar: "solar:folder-linear",
    lucide: "lucide:folder",
    keywords: ["folder", "plain", "directory"],
  },

  folderOpen: {
    solar: "solar:folder-open-linear",
    lucide: "lucide:folder-open",
    keywords: ["folder", "open", "expanded"],
  },

  folderBold: {
    solar: "solar:folder-bold",
    lucide: "lucide:folder",
    keywords: ["folder", "bold", "colored"],
  },

  folderOpenBold: {
    solar: "solar:folder-open-bold",
    lucide: "lucide:folder-open",
    keywords: ["folder", "open", "bold", "colored"],
  },

  addFolder: {
    solar: "solar:add-folder-linear",
    lucide: "lucide:folder-plus",
    keywords: ["folder", "add", "create", "new"],
  },

  flag: {
    solar: "solar:flag-outline",
    lucide: "lucide:flag",
    keywords: ["flag", "complaint", "redflag"],
  },

  forwardRight: {
    solar: "solar:multiple-forward-right-outline",
    lucide: "lucide:forward",
    keywords: ["forward", "reply", "forward-right"],
  },

  arrowUpRight: {
    solar: "solar:square-top-down-outline",
    lucide: "lucide:arrow-up-right",
    keywords: ["arrow", "up", "right", "external", "open"],
  },

  forwardLeft: {
    solar: "solar:multiple-forward-left-outline",
    lucide: "lucide:reply",
    keywords: ["backward", "forward-left"],
  },

  rollback: {
    solar: "solar:undo-left-round-square-outline",
    lucide: "lucide:clock-arrow-left",
    keywords: ["rollback", "undo", "revert", "downgrade", "restore"],
  },

  arrowUpLinear: {
    solar: "solar:arrow-up-linear",
    lucide: "lucide:arrow-up",
    keywords: ["arrow", "up", "scroll-top"],
  },

  block: {
    solar: "solar:forbidden-circle-outline",
    lucide: "lucide:circle-off",
    keywords: ["block", "block", "block", "block"],
  },

  clip: {
    solar: "solar:paperclip-outline",
    lucide: "lucide:paperclip",
    keywords: ["clip", "paperclip"],
  },

  money: {
    solar: "solar:dollar-minimalistic-outline",
    lucide: "lucide:circle-dollar-sign",
    keywords: ["money", "finance", "dollar", "currency", "pay", "payment"],
  },

  payments: {
    solar: "solar:wallet-money-outline",
    lucide: "lucide:credit-card",
    keywords: [
      "payments",
      "payment",
      "pay",
      "payout",
      "billing",
      "checkout",
      "gateway",
      "transactions",
    ],
  },

  note: {
    solar: "solar:notes-outline",
    lucide: "lucide:square-equal",
    keywords: ["note", "nota"],
  },

  cookie: {
    solar: "material-symbols-light:cookie-outline",
    lucide: "lucide:cookie",
    keywords: ["cookie"],
  },

  code: {
    solar: "solar:code-outline",
    lucide: "lucide:code-xml",
    keywords: ["code", "programming", "development"],
  },

  sun: {
    solar: "solar:sun-2-outline",
    lucide: "lucide:sun",
    keywords: ["sun", "light", "day"],
  },

  moon: {
    solar: "solar:moon-outline",
    lucide: "lucide:moon",
    keywords: ["moon", "night", "dark"],
  },

  circleDot: {
    solar: "solar:record-circle-outline",
    lucide: "lucide:circle-dot",
    keywords: ["circle", "dot", "radio", "auto", "system"],
  },

  monitor: {
    solar: "solar:monitor-outline",
    lucide: "lucide:monitor",
    keywords: ["monitor", "system", "auto", "display", "os"],
  },

  tag: {
    solar: "solar:tag-outline",
    lucide: "lucide:tags",
    keywords: ["tag"],
  },

  reach: {
    solar: "solar:translation-2-outline",
    lucide: "lucide:user-search",
    keywords: ["reach", "reach", "reach", "reach"],
  },

  company: {
    solar: "solar:buildings-outline",
    lucide: "lucide:building-2",
    keywords: ["company", "space", "business"],
  },

  danger: {
    solar: "solar:danger-outline",
    lucide: "lucide:alert-triangle",
    keywords: ["danger", "error", "alert", "critical"],
  },

  warning: {
    solar: "solar:danger-triangle-outline",
    lucide: "lucide:alert-triangle",
    keywords: ["warning", "alert", "caution"],
  },

  social: {
    solar: "solar:share-outline",
    lucide: "lucide:chart-no-axes-column-increasing",
    keywords: ["social", "share", "chart", "column", "increasing"],
  },

  share: {
    solar: "solar:share-outline",
    lucide: "lucide:share-2",
    keywords: ["share", "social", "send", "export"],
  },

  settings: {
    solar: "solar:settings-outline",
    lucide: "lucide:settings",
    keywords: ["settings", "config", "preferences", "options"],
  },
  bookmark: {
    solar: "solar:bookmark-outline",
    lucide: "lucide:bookmark",
    keywords: ["bookmark", "favorite", "save", "favorite"],
  },
  collection: {
    solar: "solar:bookmark-square-minimalistic-outline",
    lucide: "lucide:album",
    keywords: ["collection", "album", "save", "favorite", "bookmarks"],
  },
  add: {
    solar: "solar:add-circle-outline",
    lucide: "lucide:plus",
    keywords: ["add", "plus", "new", "create"],
  },

  minus: {
    solar: "solar:minus-circle-outline",
    lucide: "lucide:minus",
    keywords: ["minus", "remove", "subtract"],
  },

  plusCircle: {
    solar: "solar:add-circle-outline",
    lucide: "lucide:plus-circle",
    keywords: ["plus", "circle", "add", "create"],
  },

  refreshCw: {
    solar: "solar:refresh-outline",
    lucide: "lucide:refresh-cw",
    keywords: ["refresh", "reload", "retry", "cw", "try again"],
  },

  replace: {
    solar: "solar:transfer-horizontal-outline",
    lucide: "lucide:replace",
    keywords: ["replace", "swap", "exchange", "substitute"],
  },

  email: {
    solar: "solar:letter-outline",
    lucide: "lucide:mail",
    keywords: ["email", "mail", "envelope", "message"],
  },

  loader2: {
    solar: "svg-spinners:90-ring-with-bg",
    lucide: "lucide:loader-2",
    keywords: ["loader", "loading", "spinner", "loader-2"],
  },

  analytics: {
    solar: "solar:chart-outline",
    lucide: "lucide:chart-no-axes-column",
    keywords: ["analytics", "chart", "stats", "bar", "metrics"],
  },

  // BRANDS

  builder: {
    solar: "solar:ruler-cross-pen-outline",
    lucide: "lucide:pencil-ruler",
    keywords: ["builder", "design"],
  },
  wordpress: {
    solar: "simple-icons:wordpress",
    lucide: "simple-icons:wordpress",
    keywords: ["wordpress", "wp"],
  },
  woocommerce: {
    solar: "solar:cart-large-minimalistic-outline",
    lucide: "lucide:shopping-cart",
    keywords: ["woocommerce", "shop", "cart", "shopping", "purchase"],
  },
  elementor: {
    solar:
      "streamline:interface-setting-menu-parallel-hamburger-circle-navigation-parallel-hamburger-buttonmenu-circle",
    lucide:
      "streamline:interface-setting-menu-parallel-hamburger-circle-navigation-parallel-hamburger-buttonmenu-circle",
    keywords: ["elementor"],
  },
  bricks: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:blocks",
    keywords: ["bricks", "page builder"],
  },
  oxygen: {
    solar: "solar:atom-outline",
    lucide: "lucide:atom",
    keywords: ["oxygen", "page builder"],
  },
  breakdance: {
    solar: "solar:play-circle-outline",
    lucide: "lucide:play-circle",
    keywords: ["breakdance", "page builder"],
  },
  beaver: {
    solar: "solar:home-2-outline",
    lucide: "lucide:home",
    keywords: ["beaver", "beaver builder", "page builder"],
  },
  divi: {
    solar: "solar:layers-minimalistic-outline",
    lucide: "lucide:layers",
    keywords: ["divi", "page builder"],
  },
  thrive: {
    solar: "solar:pallete-2-outline",
    lucide: "lucide:palette",
    keywords: ["thrive", "thrive architect", "page builder"],
  },
  brizy: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:layout-template",
    keywords: ["brizy", "page builder", "brizy builder"],
  },
  builderius: {
    solar: "solar:structure-outline",
    lucide: "lucide:component",
    keywords: ["builderius", "page builder"],
  },
  etch: {
    solar: "solar:code-square-outline",
    lucide: "lucide:square-code",
    keywords: ["etch", "etchwp", "page builder", "digital gravy"],
  },
  gripVertical: {
    solar: "solar:sort-vertical-outline",
    lucide: "lucide:grip-vertical",
    keywords: ["grip", "drag", "reorder", "sort", "handle"],
  },
  pagebuilder: {
    solar: "solar:widget-4-outline",
    lucide: "lucide:layout-panel-left",
    keywords: [
      "pagebuilder",
      "page builder",
      "layout",
      "panel",
      "brizy",
      "breakdance",
    ],
  },
  shopify: {
    solar: "solar:shop-outline",
    lucide: "lucide:shopping-cart",
    keywords: ["shopify", "shop", "cart", "shopping", "ecommerce"],
  },
  facebook: {
    solar: "hugeicons:facebook-01",
    lucide: "lucide:facebook",
    keywords: ["facebook", "fb"],
  },
  instagram: {
    solar: "hugeicons:instagram",
    lucide: "lucide:instagram",
    keywords: ["instagram"],
  },
  twitter: {
    solar: "hugeicons:twitter",
    lucide: "lucide:twitter",
    keywords: ["twitter"],
  },
  linkedin: {
    solar: "hugeicons:linkedin-01",
    lucide: "lucide:linkedin",
    keywords: ["linkedin"],
  },
  youtube: {
    solar: "hugeicons:youtube",
    lucide: "lucide:youtube",
    keywords: ["youtube", "tube"],
  },
  pinterest: {
    solar: "hugeicons:pinterest",
    lucide: "tabler:brand-pinterest",
    keywords: ["pinterest"],
  },
  github: {
    solar: "hugeicons:github",
    lucide: "lucide:github",
    keywords: ["github"],
  },
  vimeo: {
    solar: "hugeicons:vimeo",
    lucide: "hugeicons:vimeo",
    keywords: ["vimeo"],
  },
  dribbble: {
    solar: "simple-icons:dribbble",
    lucide: "simple-icons:dribbble",
    keywords: ["dribbble"],
  },
  behance: {
    solar: "simple-icons:behance",
    lucide: "simple-icons:behance",
    keywords: ["behance"],
  },
  gmail: {
    solar: "logos:google-gmail",
    lucide: "logos:google-gmail",
    keywords: ["gmail", "google", "email"],
  },
  outlook: {
    solar: "vscode-icons:file-type-outlook",
    lucide: "vscode-icons:file-type-outlook",
    keywords: ["outlook", "microsoft", "email"],
  },
  // Chart type icons
  chartLine: {
    solar: "solar:graph-outline",
    lucide: "lucide:trending-up",
    keywords: ["chart", "line"],
  },

  chartArea: {
    solar: "solar:diagram-down-outline",
    lucide: "lucide:chart-no-axes-combined",
    keywords: ["chart", "area"],
  },

  chartBar: {
    solar: "solar:chart-outline",
    lucide: "lucide:chart-no-axes-column",
    keywords: ["chart", "bar"],
  },

  chartRadial: {
    solar: "solar:round-graph-outline",
    lucide: "lucide:target",
    keywords: ["chart", "radial"],
  },

  chartRadar: {
    solar: "solar:radar-2-outline",
    lucide: "lucide:target",
    keywords: ["chart", "radar"],
  },

  // END BRANDS
};

export default icons;
