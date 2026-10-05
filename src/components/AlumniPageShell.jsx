"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import Link from "@/components/AlumniLink";
import { useEffect, useState } from "react";
export default function AlumniPageShell({
  title,
  description,
  children
}) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login", { replace: true });
      return;
    }
    setAuthenticated(true);
    setChecking(false);
  }, [navigate]);
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };
  if (checking) {
    return /* @__PURE__ */ jsx("main", { className: "portal-page portal-loading", role: "status", children: "Checking your session\u2026" });
  }
  if (!authenticated) return null;
  return /* @__PURE__ */ jsxs("div", { className: "portal-page portal-dashboard", children: [
    /* @__PURE__ */ jsx("header", { className: "portal-header", children: /* @__PURE__ */ jsxs("div", { className: "portal-container portal-header-inner", children: [
      /* @__PURE__ */ jsx(Link, { href: "/alumni/dashboard", className: "portal-brand", children: "Alumni Connect" }),
      /* @__PURE__ */ jsxs("nav", { className: "portal-nav", "aria-label": "Alumni navigation", children: [
        /* @__PURE__ */ jsx(Link, { href: "/alumni/dashboard", children: "Dashboard" }),
        /* @__PURE__ */ jsx(Link, { href: "/alumni/announcements", children: "Announcements" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: logout, children: "Logout" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "portal-container portal-dashboard-main", children: [
      /* @__PURE__ */ jsxs("div", { className: "portal-dashboard-heading", children: [
        /* @__PURE__ */ jsx("h1", { children: title }),
        /* @__PURE__ */ jsx("p", { children: description })
      ] }),
      children
    ] })
  ] });
}
