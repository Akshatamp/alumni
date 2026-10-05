import { jsx, jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./app/page";
import Login from "./app/login/page";
import ForgotPassword from "./app/forgot-password/page";
import Register from "./app/register/page";
import RegistrationSuccess from "./app/register/success/page";
import AlumniDashboard from "./app/alumni/dashboard/page";
import AlumniDirectoryPage from "./app/alumni/directory/page";
import AlumniEventsPage from "./app/alumni/events/page";
import AlumniJobsPage from "./app/alumni/jobs/page";
import AlumniProfilePage from "./app/alumni/profile/page";
import AlumniAnnouncementsPage from "./app/alumni/announcements/page";
import AlumniAnnouncementDetailPage from "./app/alumni/announcements/detail/page";
import "./app/globals.css";
function App() {
  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(Login, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/forgot-password", element: /* @__PURE__ */ jsx(ForgotPassword, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(Register, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/register/success", element: /* @__PURE__ */ jsx(RegistrationSuccess, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/alumni/dashboard", element: /* @__PURE__ */ jsx(AlumniDashboard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/alumni/directory", element: /* @__PURE__ */ jsx(AlumniDirectoryPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/alumni/events", element: /* @__PURE__ */ jsx(AlumniEventsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/alumni/jobs", element: /* @__PURE__ */ jsx(AlumniJobsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/alumni/profile", element: /* @__PURE__ */ jsx(AlumniProfilePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/alumni/announcements", element: /* @__PURE__ */ jsx(AlumniAnnouncementsPage, {}) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/alumni/announcements/detail",
        element: /* @__PURE__ */ jsx(AlumniAnnouncementDetailPage, {})
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }) })
  ] }) });
}
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })
);
