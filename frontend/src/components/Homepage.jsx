import { Outlet } from "react-router-dom";
import MainNav from "./MainNav.jsx";
import PlaybackActionsProvider from "./playback/PlaybackActionsProvider.jsx";
import GlobalPlaybackBar from "./playback/GlobalPlaybackBar.jsx";

const Homepage = () => {
  return (
    <PlaybackActionsProvider>
      <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#0a0a0a]/90 text-zinc-100 backdrop-blur-sm">
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <div className="hidden lg:flex">
            <MainNav />
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pb-[calc(env(safe-area-inset-bottom)+13.25rem)] lg:pb-0">
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:block">
          <GlobalPlaybackBar />
        </div>
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden">
          <div className="pointer-events-auto mx-auto flex w-full max-w-md flex-col gap-3">
            <GlobalPlaybackBar mobile />
            <MainNav variant="mobile" />
          </div>
        </div>
      </div>
    </PlaybackActionsProvider>
  );
};

export default Homepage;
