"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import Link from "@/components/AlumniLink";
import { useEffect, useState } from "react";
import AlumniPageShell from "@/components/AlumniPageShell";
import { alumniApi } from "@/lib/api";
function displayDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat(void 0, { dateStyle: "long" }).format(date);
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
export default function AlumniAnnouncementDetailPage() {
  const [announcementId, setAnnouncementId] = useState(null);
  const [invalidId, setInvalidId] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const rawId = new URLSearchParams(window.location.search).get("id");
    const parsedId = Number(rawId);
    if (!rawId || !Number.isSafeInteger(parsedId) || parsedId < 1) {
      setInvalidId(true);
      setLoading(false);
      return;
    }
    setAnnouncementId(parsedId);
  }, []);
  useEffect(() => {
    if (announcementId === null) return;
    alumniApi.getAnnouncements().then(({ data }) => {
      const visibleAnnouncements = Array.isArray(data) ? data : [];
      const match = visibleAnnouncements.find((item) => item.id === announcementId);
      if (match) setAnnouncement(match);
      else setNotFound(true);
    }).catch((requestError) => {
      console.error("Unable to load alumni announcement:", requestError);
      setError("This announcement could not be loaded. Please try again.");
    }).finally(() => setLoading(false));
  }, [announcementId]);
  const imageUrl = safeImageUrl(announcement?.image || null);
  return /* @__PURE__ */ jsxs(
    AlumniPageShell,
    {
      title: "Alumni Announcement",
      description: "News and updates shared with you by your institution.",
      children: [
        /* @__PURE__ */ jsx(Link, { className: "portal-announcement-back", href: "/alumni/announcements", children: "\u2190 Back to announcements" }),
        invalidId ? /* @__PURE__ */ jsx("div", { className: "portal-empty", children: "This announcement is not available." }) : loading ? /* @__PURE__ */ jsx("div", { className: "portal-panel", role: "status", children: "Loading announcement\u2026" }) : error ? /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: error }) : notFound || !announcement ? /* @__PURE__ */ jsx("div", { className: "portal-empty", children: "This announcement is not available." }) : /* @__PURE__ */ jsxs("article", { className: "portal-panel portal-announcement-detail", children: [
          imageUrl && /* @__PURE__ */ jsx(
            "img",
            {
              className: "portal-announcement-detail-image",
              src: imageUrl,
              alt: ""
            }
          ),
          displayDate(announcement.created_at) && /* @__PURE__ */ jsxs("p", { className: "portal-card-eyebrow", children: [
            "Posted ",
            displayDate(announcement.created_at)
          ] }),
          /* @__PURE__ */ jsx("h2", { children: announcement.title }),
          announcement.description && /* @__PURE__ */ jsx("p", { className: "portal-announcement-full-description", children: announcement.description })
        ] })
      ]
    }
  );
}
