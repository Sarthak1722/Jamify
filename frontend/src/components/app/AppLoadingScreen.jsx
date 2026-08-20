import Logo from "../Logo.jsx";

const AppLoadingScreen = ({ label = "Loading Jamify…" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 text-white">
      <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <Logo size="lg" className="mb-4" />
        <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />
        <p className="mt-3 text-xs font-medium text-zinc-400">{label}</p>
      </div>
    </div>
  );
};

export default AppLoadingScreen;

