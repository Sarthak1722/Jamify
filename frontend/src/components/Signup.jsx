import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  IoArrowForward,
  IoLockClosedOutline,
  IoPersonOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import AuthShell from "./auth/AuthShell.jsx";
import { authInputClassName, authLabelClassName } from "./auth/authFormStyles.js";
import apiClient from "../api/client.js";

const Signup = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, userName, password, confirmPassword } = userData;

    if (!fullName.trim() || !userName.trim() || !password || !confirmPassword) {
      toast.error("Fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Use at least 6 characters for your password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await apiClient.post("/api/v1/user/register", {
        fullName: fullName.trim(),
        userName: userName.trim(),
        password,
        confirmPassword,
      });

      setUserData({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
      toast.success(res.data.message || "Account created.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Join Jamify to start listening and chatting"
      footerPrompt="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo="/"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className={authLabelClassName}>
            Full name
          </label>
          <div className="relative">
            <IoSparklesOutline className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-zinc-500" />
            <input
              id="fullName"
              className={`${authInputClassName} pl-10`}
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="userName" className={authLabelClassName}>
            Username
          </label>
          <div className="relative">
            <IoPersonOutline className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-zinc-500" />
            <input
              id="userName"
              className={`${authInputClassName} pl-10`}
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              autoComplete="username"
              placeholder="Username"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className={authLabelClassName}>
              Password
            </label>
            <div className="relative">
              <IoLockClosedOutline className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-zinc-500" />
              <input
                id="password"
                className={`${authInputClassName} pl-10`}
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={authLabelClassName}>
              Confirm
            </label>
            <div className="relative">
              <IoLockClosedOutline className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-zinc-500" />
              <input
                id="confirmPassword"
                className={`${authInputClassName} pl-10`}
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Confirm"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-emerald-500/20"
        >
          {submitting ? "Creating account..." : "Create account"}
          {!submitting ? <IoArrowForward className="text-sm" /> : null}
        </button>
      </form>
    </AuthShell>
  );
};

export default Signup;

