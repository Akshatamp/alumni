"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { alumniApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import Link from "@/components/AlumniLink";
export default function AlumniDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }
      loadProfile();
    };
    checkAuth();
  }, [navigate]);
  const loadProfile = async () => {
    try {
      const response = await alumniApi.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error("Error loading profile:", error);
      localStorage.removeItem("access_token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/");
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "portal-page min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-xl", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "portal-page portal-dashboard", children: [
    /* @__PURE__ */ jsx("header", { className: "portal-header", children: /* @__PURE__ */ jsxs("div", { className: "portal-container portal-header-inner", children: [
      /* @__PURE__ */ jsx(Link, { href: "/alumni/dashboard", className: "portal-brand", children: "Alumni Connect" }),
      /* @__PURE__ */ jsxs("nav", { className: "portal-nav", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
          "Welcome, ",
          profile?.user?.first_name,
          " ",
          profile?.user?.last_name
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleLogout,
            className: "text-gray-700 hover:text-indigo-600",
            children: "Logout"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "portal-container portal-dashboard-main", children: [
      /* @__PURE__ */ jsxs("div", { className: "portal-dashboard-heading", children: [
        /* @__PURE__ */ jsx("h1", { children: "Alumni Dashboard" }),
        /* @__PURE__ */ jsx("p", { children: "Manage your alumni profile and connect with the community" })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "portal-panel portal-profile-panel", children: [
        /* @__PURE__ */ jsxs("div", { className: "portal-panel-heading", children: [
          /* @__PURE__ */ jsx("h2", { children: "My Profile" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/alumni/profile",
              className: "portal-button portal-button-primary",
              children: "Edit Profile"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "portal-profile-grid", children: [
          /* @__PURE__ */ jsxs("div", { className: "portal-profile-field", children: [
            /* @__PURE__ */ jsx("span", { children: "Alumni ID" }),
            /* @__PURE__ */ jsx("strong", { children: profile?.alumni_id || "Not assigned" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "portal-profile-field", children: [
            /* @__PURE__ */ jsx("span", { children: "Status" }),
            /* @__PURE__ */ jsx("strong", { className: "capitalize", children: profile?.status || "Unknown" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "portal-profile-field", children: [
            /* @__PURE__ */ jsx("span", { children: "Company" }),
            /* @__PURE__ */ jsx("strong", { children: profile?.current_company || "Not specified" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "portal-profile-field", children: [
            /* @__PURE__ */ jsx("span", { children: "Designation" }),
            /* @__PURE__ */ jsx("strong", { children: profile?.designation || "Not specified" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "portal-profile-field", children: [
            /* @__PURE__ */ jsx("span", { children: "Location" }),
            /* @__PURE__ */ jsx("strong", { children: profile?.current_city || "Not specified" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "portal-quick-actions", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/alumni/directory",
            className: "portal-action-card",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-indigo-600 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) }) }),
              /* @__PURE__ */ jsx("h3", { children: "Alumni Directory" }),
              /* @__PURE__ */ jsx("p", { children: "Browse and connect with fellow alumni" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/alumni/events",
            className: "portal-action-card",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-indigo-600 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
              /* @__PURE__ */ jsx("h3", { children: "Events" }),
              /* @__PURE__ */ jsx("p", { children: "Register for alumni events and reunions" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/alumni/jobs",
            className: "portal-action-card",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-indigo-600 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
              /* @__PURE__ */ jsx("h3", { children: "Jobs" }),
              /* @__PURE__ */ jsx("p", { children: "View and post job opportunities" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/alumni/announcements",
            className: "portal-action-card",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-indigo-600 mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5.882V19.24a1.76 1.76 0 01-3.306.868L3.5 12.75M11 5.882A2.882 2.882 0 0113.882 3h.236A2.882 2.882 0 0117 5.882v12.236A2.882 2.882 0 0114.118 21h-.236A2.882 2.882 0 0111 18.118M11 5.882L3.5 8.25v4.5l7.5 2.368M18 9l3-2m-3 8l3 2" }) }) }),
              /* @__PURE__ */ jsx("h3", { children: "Announcements" }),
              /* @__PURE__ */ jsx("p", { children: "Read news and updates shared with the alumni community" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "portal-activity", children: [
        /* @__PURE__ */ jsx("h2", { children: "Recent Activity" }),
        /* @__PURE__ */ jsx("p", { children: "No recent activity to display." })
      ] })
    ] })
  ] });
}
