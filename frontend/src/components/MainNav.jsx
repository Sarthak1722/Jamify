import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  IoHomeOutline,
  IoHome,
  IoChatbubblesOutline,
  IoChatbubbles,
  IoHeartOutline,
  IoHeart,
  IoAlbumsOutline,
  IoAlbums,
  IoPeopleOutline,
  IoPeople,
  IoLogOutOutline,
} from "react-icons/io5";
import { setauthUser, setotherUsers, setselectedUser } from "../redux/userSlice.js";
import { resetThread } from "../redux/messageSlice.js";
import { resetPlayback } from "../redux/playbackSlice.js";
import { resetRooms } from "../redux/roomsSlice.js";
import apiClient from "../api/client.js";

const navItems = [
  {
    to: "home",
    label: "Home",
    ActiveIcon: IoHome,
    InactiveIcon: IoHomeOutline,
  },
  {
    to: "messages",
    label: "Messages",
    ActiveIcon: IoChatbubbles,
    InactiveIcon: IoChatbubblesOutline,
  },
  {
    to: "rooms",
    label: "Rooms",
    ActiveIcon: IoPeople,
    InactiveIcon: IoPeopleOutline,
  },
  {
    to: "liked",
    label: "Songs",
    ActiveIcon: IoHeart,
    InactiveIcon: IoHeartOutline,
  },
  {
    to: "playlists",
    label: "Playlists",
    ActiveIcon: IoAlbums,
    InactiveIcon: IoAlbumsOutline,
  },
];

const navItemClass = ({ isActive }) =>
  [
    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-white/[0.12] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-100",
  ].join(" ");

const NavIcon = ({ active, ActiveIcon, InactiveIcon }) => (
  <span className="text-xl opacity-90">{active ? <ActiveIcon /> : <InactiveIcon />}</span>
);

const MainNav = ({ variant = "desktop" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  const logoutHandler = async () => {
    try {
      const res = await apiClient.get("/api/v1/user/logout");
      toast.success(res.data?.message);
      dispatch(setauthUser(null));
      dispatch(setselectedUser(null));
      dispatch(setotherUsers([]));
      dispatch(resetThread());
      dispatch(resetPlayback());
      dispatch(resetRooms());
      navigate("/");
    } catch (error) {
      console.error("logout failed", error);
      toast.error("Logout failed");
    }
  };

  if (variant === "mobile") {
    return (
      <nav className="rounded-[26px] border border-white/10 bg-[#101010]/96 px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map(({ to, label, ActiveIcon, InactiveIcon }) => (
            <NavLink key={to} to={to} className="min-w-0">
              {({ isActive }) => (
                <span
                  className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-semibold tracking-[0.08em] transition ${
                    isActive
                      ? "bg-white text-black shadow-[0_8px_20px_rgba(255,255,255,0.14)]"
                      : "text-zinc-400"
                  }`}
                >
                  <span className="text-[1.2rem]">
                    {isActive ? <ActiveIcon /> : <InactiveIcon />}
                  </span>
                  <span className="truncate">{label}</span>
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0c0c0c]/95 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1DB954] to-emerald-700 text-lg font-black text-black shadow-lg shadow-emerald-900/40">
          🎶
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-white">Jamify</p>
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            Music · Social
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map(({ to, label, ActiveIcon, InactiveIcon }) => (
          <NavLink key={to} to={to} className={navItemClass}>
            {({ isActive }) => (
              <>
                <NavIcon active={isActive} ActiveIcon={ActiveIcon} InactiveIcon={InactiveIcon} />
                {label === "Rooms" ? "Jam rooms" : label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/[0.06] p-3">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-2">
          <img
            src={authUser?.profilePhoto}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white/10"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{authUser?.fullName}</p>
            <p className="truncate text-xs text-zinc-500">@{authUser?.userName}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logoutHandler}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
        >
          <IoLogOutOutline className="text-xl" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default MainNav;
