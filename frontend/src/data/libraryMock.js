/** Frontend-only placeholders until music APIs exist */
export const likedTracks = [
  {
    id: "l1",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    duration: "4:03",
    gradient: "from-violet-600 to-fuchsia-600",
  },
  {
    id: "l2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    gradient: "from-red-600 to-orange-500",
  },
  {
    id: "l3",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    duration: "6:07",
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: "l4",
    title: "Electric Feel",
    artist: "MGMT",
    album: "Oracular Spectacular",
    duration: "3:49",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    id: "l5",
    title: "After Dark",
    artist: "Mr.Kitty",
    album: "Time",
    duration: "4:18",
    gradient: "from-pink-600 to-rose-500",
  },
];

export const playlists = [
  {
    id: "p1",
    name: "Late night drive",
    description: "Chill synth & electronic",
    trackCount: 42,
    gradient: "from-indigo-700 via-purple-700 to-slate-900",
  },
  {
    id: "p2",
    name: "Studio focus",
    description: "Instrumentals, no lyrics",
    trackCount: 88,
    gradient: "from-zinc-800 to-neutral-950",
  },
  {
    id: "p3",
    name: "Weekend house",
    description: "High energy picks",
    trackCount: 56,
    gradient: "from-orange-600 to-pink-600",
  },
  {
    id: "p4",
    name: "Discover weekly (mock)",
    description: "Fresh finds — UI preview",
    trackCount: 30,
    gradient: "from-green-700 to-emerald-900",
  },
];

export const discoverStories = [
  { id: "s1", label: "Live sets", ring: "from-[#f09433] via-[#dc2743] to-[#bc1888]" },
  { id: "s2", label: "New drops", ring: "from-emerald-400 to-cyan-500" },
  { id: "s3", label: "Friends", ring: "from-violet-400 to-fuchsia-500" },
  { id: "s4", label: "For you", ring: "from-amber-400 to-orange-500" },
  { id: "s5", label: "Mix", ring: "from-sky-400 to-blue-600" },
];

export const moodBoards = [
  {
    id: "m1",
    title: "Late Night Drive",
    caption: "Neon synths, glossy roads, and quiet city lights.",
    tag: "moody",
    tone: "from-indigo-800 via-slate-900 to-black",
    accent: "23 tracks",
    height: "lg:row-span-2",
  },
  {
    id: "m2",
    title: "Monsoon Indie",
    caption: "Soft guitars for rainy windows and slow mornings.",
    tag: "dreamy",
    tone: "from-emerald-700 via-teal-900 to-slate-950",
    accent: "fresh picks",
    height: "",
  },
  {
    id: "m3",
    title: "Velvet Pop",
    caption: "Clean vocals and warm hooks with a polished feel.",
    tag: "glow",
    tone: "from-pink-700 via-rose-700 to-zinc-950",
    accent: "editor's note",
    height: "",
  },
  {
    id: "m4",
    title: "Studio Focus",
    caption: "Instrumentals for building, reading, and getting locked in.",
    tag: "focus",
    tone: "from-zinc-700 via-neutral-900 to-black",
    accent: "88 saved",
    height: "",
  },
  {
    id: "m5",
    title: "Sunset Replay",
    caption: "Golden-hour grooves that feel warm and familiar.",
    tag: "sunset",
    tone: "from-orange-500 via-amber-700 to-zinc-950",
    accent: "loop ready",
    height: "",
  },
];

export const socialPulse = [
  { id: "sp1", title: "Sarthak replayed Fix You", meta: "2 min ago", to: "/homepage/messages" },
  { id: "sp2", title: "2 friends are in Jam rooms", meta: "Join the session", to: "/homepage/rooms" },
  { id: "sp3", title: "Your weekly mix feels calmer tonight", meta: "Open playlists", to: "/homepage/playlists" },
];

export const editorialCards = [
  {
    id: "e1",
    kicker: "Because you liked M83",
    title: "Midnight textures",
    body: "Airy synth-pop and glossy electronic picks for when you want the room to feel bigger.",
    action: "Play mood",
    to: "/homepage/liked",
    tone: "from-violet-600/35 to-fuchsia-900/40",
  },
  {
    id: "e2",
    kicker: "Trending in your circle",
    title: "Soft chaos",
    body: "The songs your people keep sending when they don't know what to say.",
    action: "Open chats",
    to: "/homepage/messages",
    tone: "from-sky-600/30 to-indigo-900/40",
  },
  {
    id: "e3",
    kicker: "Mood switch",
    title: "Weekend house",
    body: "A brighter, faster lane for when the energy finally shows up.",
    action: "See playlists",
    to: "/homepage/playlists",
    tone: "from-orange-600/35 to-rose-900/40",
  },
];

export const ambientMoments = [
  {
    id: "a1",
    title: "Tonight's palette",
    body: "Moody synths, soft neon, and polished pop textures are leading your feed.",
    meta: "Live curation",
  },
  {
    id: "a2",
    title: "Inbox energy",
    body: "Your chat space works best with fast replies, warm states, and cleaner focus.",
    meta: "Quietly active",
  },
  {
    id: "a3",
    title: "Library mood",
    body: "Playlists feel stronger when they read like covers, not utility cards.",
    meta: "Premium pass",
  },
];
