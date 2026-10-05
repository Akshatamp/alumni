import { jsx, jsxs } from "react/jsx-runtime";
import Link from "@/components/AlumniLink";
const stats = [
  ["500+", "Active Alumni"],
  ["50+", "Companies"],
  ["20+", "Mentors"]
];
const features = [
  {
    title: "Build your network",
    description: "Connect with fellow alumni across graduation years, departments, and industries.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
  },
  {
    title: "Find new opportunities",
    description: "Discover career opportunities and share openings with the alumni community.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  },
  {
    title: "Give back and mentor",
    description: "Support the next generation by sharing your experience and expertise.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"
  }
];
export default function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "portal-page portal-home", children: [
    /* @__PURE__ */ jsx("header", { className: "portal-header", children: /* @__PURE__ */ jsxs("div", { className: "portal-container portal-header-inner", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", className: "portal-brand", children: "Alumni Connect" }),
      /* @__PURE__ */ jsxs("nav", { className: "portal-nav", "aria-label": "Main navigation", children: [
        /* @__PURE__ */ jsx(Link, { href: "/register", children: "Register" }),
        /* @__PURE__ */ jsx(Link, { href: "/login", children: "Login" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "portal-container portal-home-main", children: [
      /* @__PURE__ */ jsxs("section", { className: "portal-hero", children: [
        /* @__PURE__ */ jsx("span", { className: "portal-eyebrow", children: "The Alumni Connect Community" }),
        /* @__PURE__ */ jsx("h2", { children: "Connect. Network. Mentor. Give Back." }),
        /* @__PURE__ */ jsx("p", { children: "Reconnect with your college community and build meaningful professional connections with fellow alumni." }),
        /* @__PURE__ */ jsxs("div", { className: "portal-actions", children: [
          /* @__PURE__ */ jsx(Link, { href: "/register", className: "portal-button portal-button-primary", children: "Join Alumni Network" }),
          /* @__PURE__ */ jsx(Link, { href: "/login", className: "portal-button portal-button-secondary", children: "Alumni Login" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "portal-stats", "aria-label": "Alumni network highlights", children: stats.map(([value, label]) => /* @__PURE__ */ jsxs("div", { className: "portal-stat", children: [
        /* @__PURE__ */ jsx("strong", { children: value }),
        /* @__PURE__ */ jsx("span", { children: label })
      ] }, label)) }),
      /* @__PURE__ */ jsxs("section", { className: "portal-section", children: [
        /* @__PURE__ */ jsx("h3", { children: "Why join our alumni network?" }),
        /* @__PURE__ */ jsx("div", { className: "portal-features", children: features.map(({ title, description, icon }) => /* @__PURE__ */ jsxs("article", { className: "portal-feature", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: icon }) }),
          /* @__PURE__ */ jsx("h4", { children: title }),
          /* @__PURE__ */ jsx("p", { children: description })
        ] }, title)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "portal-footer", children: /* @__PURE__ */ jsx("div", { className: "portal-container", children: /* @__PURE__ */ jsx("p", { children: "\xA9 2026 Alumni Connect. All rights reserved." }) }) })
  ] });
}
