"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import Link from "@/components/AlumniLink";
import { useEffect, useState } from "react";
import AlumniPageShell from "@/components/AlumniPageShell";
import { alumniApi } from "@/lib/api";
function displayDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(date);
}
function safeImageUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value, import.meta.env.VITE_API_URL || "http://localhost:8000/api");
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export default function AlumniAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    alumniApi.getAnnouncements().then(({ data }) => setAnnouncements(Array.isArray(data) ? data : [])).catch((requestError) => {
      console.error("Unable to load alumni announcements:", requestError);
      setError("Announcements could not be loaded. Please try again.");
    }).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxs(
    AlumniPageShell,
    {
      title: "Alumni Announcements",
      description: "News and updates shared with you by your institution.",
      children: [
        error && /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: error }),
        loading ? /* @__PURE__ */ jsx("div", { className: "portal-panel", role: "status", children: "Loading announcements\u2026" }) : announcements.length === 0 ? /* @__PURE__ */ jsx("div", { className: "portal-empty", children: "There are no announcements for you right now." }) : /* @__PURE__ */ jsx("div", { className: "portal-content-grid", children: announcements.map((announcement) => {
          const imageUrl = safeImageUrl(announcement.image);
          const postedDate = displayDate(announcement.created_at);
          return /* @__PURE__ */ jsxs(
            Link,
            {
              className: "portal-content-card portal-announcement-card",
              href: `/alumni/announcements/detail?id=${announcement.id}`,
              children: [
                imageUrl && /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "portal-announcement-image",
                    src: imageUrl,
                    alt: "",
                    loading: "lazy"
                  }
                ),
                postedDate && /* @__PURE__ */ jsxs("div", { className: "portal-card-eyebrow", children: [
                  "Posted ",
                  postedDate
                ] }),
                /* @__PURE__ */ jsx("h2", { children: announcement.title }),
                announcement.description && /* @__PURE__ */ jsx("p", { className: "portal-announcement-preview", children: announcement.description }),
                /* @__PURE__ */ jsx("span", { className: "portal-announcement-read-more", children: "Read announcement \u2192" })
              ]
            },
            announcement.id
          );
        }) })
      ]
    }
  );
}
