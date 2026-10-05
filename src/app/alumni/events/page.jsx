"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AlumniPageShell from "@/components/AlumniPageShell";
import { alumniApi } from "@/lib/api";
function displayDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date to be announced" : new Intl.DateTimeFormat(void 0, { dateStyle: "medium", timeStyle: "short" }).format(date);
}
export default function AlumniEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadEvents = () => alumniApi.getEvents().then(({ data }) => setEvents(Array.isArray(data) ? data : [])).catch((requestError) => {
    console.error("Unable to load alumni events:", requestError);
    setError("Events could not be loaded. Please try again.");
  }).finally(() => setLoading(false));
  useEffect(() => {
    void loadEvents();
  }, []);
  return /* @__PURE__ */ jsxs(AlumniPageShell, { title: "Alumni Events", description: "Browse event details and photo galleries. No event registration is required.", children: [
    error && /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: error }),
    loading ? /* @__PURE__ */ jsx("div", { className: "portal-panel", role: "status", children: "Loading events\u2026" }) : events.length === 0 ? /* @__PURE__ */ jsx("div", { className: "portal-empty", children: "There are no published alumni events right now." }) : /* @__PURE__ */ jsx("div", { className: "portal-content-grid", children: events.map((event) => /* @__PURE__ */ jsxs("article", { className: "portal-content-card", children: [
      /* @__PURE__ */ jsx("div", { className: "portal-card-eyebrow", children: displayDate(event.start_at) }),
      /* @__PURE__ */ jsx("h2", { children: event.title }),
      /* @__PURE__ */ jsx("p", { className: "portal-card-meta", children: event.venue || "Venue to be announced" }),
      event.end_at && /* @__PURE__ */ jsxs("p", { className: "portal-card-meta", children: [
        "Ends ",
        displayDate(event.end_at)
      ] }),
      /* @__PURE__ */ jsx("p", { className: "portal-card-description", children: event.description }),
      event.images.length > 0 ? /* @__PURE__ */ jsx("div", { className: "portal-event-gallery", "aria-label": `${event.title} photo gallery`, children: event.images.map((image, index) => /* @__PURE__ */ jsx(
        "a",
        {
          className: "portal-event-image-link",
          href: image.image,
          target: "_blank",
          rel: "noreferrer",
          "aria-label": `Open photo ${index + 1} from ${event.title}`,
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: image.image,
              alt: `${event.title} photo ${index + 1}`,
              loading: "lazy"
            }
          )
        },
        image.id
      )) }) : /* @__PURE__ */ jsx("p", { className: "portal-card-meta", children: "No event photos have been added yet." })
    ] }, event.id)) })
  ] });
}
