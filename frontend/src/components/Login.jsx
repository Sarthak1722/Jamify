import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowForward, IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";
import AuthShell from "./auth/AuthShell.jsx";
import { authInputClassName, authLabelClassName } from "./auth/authFormStyles.js";
import { setAuthStatus, setauthUser } from "../redux/userSlice.js";
import apiClient from "../api/client.js";

const Login = () => {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/homepage/home";

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.userName.trim() || !userData.password) {
      toast.error("Enter both your username and password.");
      return;
    }

    setSubmitting(true);
    dispatch(setAuthStatus("checking"));

    try {
      const res = await apiClient.post("/api/v1/user/login", {
        userName: userData.userName.trim(),
        password: userData.password,
      });

      dispatch(
        setauthUser(
          res.data.user || {
            _id: res.data._id,
            userName: res.data.userName,
            fullName: res.data.fullName,
            profilePhoto: res.data.profilePhoto,
          },
        ),
      );
      dispatch(setAuthStatus("authenticated"));
      setUserData({ userName: "", password: "" });
      toast.success(res.data.message || "Welcome back.");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      dispatch(setauthUser(null));
      dispatch(setAuthStatus("unauthenticated"));
      toast.error(error.response?.data?.message || "Unable to sign you in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Enter your credentials to sign in"
      footerPrompt="Don't have an account?"
      footerLinkLabel="Sign up"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="username"
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
        </div>

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
              autoComplete="current-password"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-emerald-500/20"
        >
          {submitting ? "Signing in..." : "Sign in"}
          {!submitting ? <IoArrowForward className="text-sm" /> : null}
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;

