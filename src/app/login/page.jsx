"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { authApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import Link from "@/components/AlumniLink";
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message] = useState(location.state?.message || "");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authApi.login(formData.username, formData.password);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/alumni/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "portal-page portal-auth", children: /* @__PURE__ */ jsxs("div", { className: "portal-auth-content", children: [
    /* @__PURE__ */ jsxs("div", { className: "portal-auth-card", children: [
      /* @__PURE__ */ jsx("div", { className: "portal-auth-card-header", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white", children: "Alumni Login" }) }),
      /* @__PURE__ */ jsxs("div", { className: "portal-auth-card-body", children: [
        error && /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: error }),
        message && /* @__PURE__ */ jsx("div", { className: "portal-success-message", role: "status", children: message }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "portal-form", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700 mb-2", children: "Email or username" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "username",
                value: formData.username,
                onChange: (e) => setFormData({ ...formData, username: e.target.value }),
                required: true,
                placeholder: "Enter your email or username"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-2", children: "Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                id: "password",
                value: formData.password,
                onChange: (e) => setFormData({ ...formData, password: e.target.value }),
                required: true,
                placeholder: "Enter your password"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "portal-button portal-button-primary w-full",
              children: loading ? "Logging in..." : "Login"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "portal-auth-links", children: [
            /* @__PURE__ */ jsx(Link, { href: "/register", className: "block text-indigo-600 hover:underline", children: "Not registered? Create an account" }),
            /* @__PURE__ */ jsx(Link, { href: "/forgot-password", className: "block text-gray-600 hover:underline text-sm", children: "Forgot password?" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { href: "/", className: "portal-back-link", children: "\u2190 Back to Home" }) })
  ] }) });
}
