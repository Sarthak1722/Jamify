import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ambientMoments,
  discoverStories,
  editorialCards,
  likedTracks,
  moodBoards,
  playlists,
  socialPulse,
} from "../data/libraryMock.js";
import {
  IoArrowForward,
  IoHeadset,
  IoMusicalNotes,
  IoPlay,
  IoSparkles,
  IoTrendingUp,
} from "react-icons/io5";

const greetingByHour = (hour) => {
  if(hour>0 && hour<5) return "Good Night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const DiscoverPage = () => {
  const { authUser } = useSelector((store) => store.user);
  const now = new Date();
  const greeting = greetingByHour(now.getHours());
  const firstName = authUser?.fullName?.trim()?.split(/\s+/)?.[0][0].toUpperCase() + authUser?.fullName?.trim()?.split(/\s+/)?.[0].slice(1);
  const liveContext = `${now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  })} · curated right now`;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <header className="sticky top-0 z-10 border-b border-white/[0.06] bg-[#0a0a0a]/80 px-8 py-6 backdrop-blur-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-400/90">
          Home
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          {firstName ? `${greeting}, ${firstName}` : "Hello"}. Ready for a quick Jam??
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          A curated home feed built from moods, playlists, and social energy.
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-zinc-500">{liveContext}</p>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <section className="mb-8 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(16,25,22,0.96),rgba(8,8,10,0.92))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300">
                <IoSparkles className="text-emerald-400" />
                Today&apos;s aesthetic
              </div>
              <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-tight text-white">
                Late-night textures for quiet scrolling
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-300">
                Think glossy synths, soft vocals, and cinematic playlists that feel curated even before uploads or posts exist.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-300">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                  {playlists.length} mixes in rotation
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                  {likedTracks.length} tracks ready to play
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                  quiet social energy
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/homepage/playlists"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100"
                >
                  Explore playlists
                  <IoArrowForward />
                </Link>
                <Link
                  to="/homepage/liked"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
                >
                  Play available tracks
                  <IoPlay />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {socialPulse.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                      Pulse
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-zinc-500">{item.meta}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Stories
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {discoverStories.map((s) => (
              <button
                key={s.id}
                type="button"
                className="flex shrink-0 flex-col items-center gap-2 text-center"
              >
                <div
                  className={`rounded-full bg-gradient-to-tr p-[2px] ${s.ring}`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#111] ring-4 ring-[#0a0a0a]">
                    <IoMusicalNotes className="text-xl text-zinc-500" />
                  </div>
                </div>
                <span className="max-w-[72px] truncate text-xs text-zinc-300">{s.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-4 lg:grid-cols-3">
          {ambientMoments.map((moment) => (
            <article
              key={moment.id}
              className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                {moment.meta}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{moment.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{moment.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Mood Boards
            </h2>
            <span className="inline-flex items-center gap-2 text-xs text-zinc-500">
              <IoTrendingUp className="text-emerald-400" />
              Curated for the current UI
            </span>
          </div>

          <div className="grid auto-rows-[190px] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {moodBoards.map((board) => (
              <article
                key={board.id}
                className={`group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br ${board.tone} p-5 transition hover:border-white/[0.14] ${board.height}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200">
                    {board.tag}
                  </span>
                  <span className="text-xs font-medium text-zinc-400">{board.accent}</span>
                </div>
                <div className="absolute -right-5 -top-4 h-28 w-28 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/15" />
                <div className="relative mt-10">
                  <h3 className="text-2xl font-semibold text-white">{board.title}</h3>
                  <p className="mt-3 max-w-[16rem] text-sm leading-6 text-zinc-300">{board.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Editorial Picks
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {editorialCards.map((card) => (
              <Link
                key={card.id}
                to={card.to}
                className={`group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br ${card.tone} p-5 transition hover:border-white/[0.14]`}
              >
                <IoHeadset className="absolute -right-2 -top-2 text-7xl text-white/[0.06]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-300">
                  {card.kicker}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{card.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  {card.action}
                  <IoArrowForward />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Tracks To Loop
            </h2>
            <div className="mt-4 space-y-3">
              {likedTracks.slice(0, 4).map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.03] px-3 py-3 transition hover:bg-white/[0.06]"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${track.gradient} text-sm font-bold text-white`}
                  >
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{track.title}</p>
                    <p className="truncate text-xs text-zinc-400">{track.artist}</p>
                  </div>
                  <span className="text-xs text-zinc-500">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.03] p-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Quick Mixes
            </h2>
            <div className="mt-4 space-y-3">
              {playlists.slice(0, 3).map((playlist) => (
                <Link
                  key={playlist.id}
                  to="/homepage/playlists"
                  className="block rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
                >
                  <div
                    className={`mb-3 h-24 rounded-2xl bg-gradient-to-br ${playlist.gradient}`}
                  />
                  <p className="text-sm font-semibold text-white">{playlist.name}</p>
                  <p className="mt-1 text-xs text-zinc-400">{playlist.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                    <span>{playlist.trackCount} tracks</span>
                    <span className="inline-flex items-center gap-1 text-emerald-300">
                      Open
                      <IoArrowForward />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiscoverPage;
