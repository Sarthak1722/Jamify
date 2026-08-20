import { Link } from "react-router-dom";
import Logo from "../Logo.jsx";

const AuthShell = ({
  title,
  subtitle,
  children,
  footerPrompt,
  footerLinkLabel,
  footerLinkTo,
}) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 py-12 text-white">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative w-full max-w-sm">
        {/* Brand & Heading */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Link to="/" className="group mb-4 flex items-center gap-2.5">
            <Logo size="lg" className="transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight text-white">
              Jamify
            </span>
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>


        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
          {children}
        </div>

        {/* Footer */}
        {footerPrompt && footerLinkLabel && (
          <p className="mt-6 text-center text-xs text-zinc-400">
            {footerPrompt}{" "}
            <Link
              to={footerLinkTo}
              className="font-medium text-emerald-400 transition hover:text-emerald-300 hover:underline underline-offset-4"
            >
              {footerLinkLabel}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthShell;

