"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AlumniPageShell from "@/components/AlumniPageShell";
import { alumniApi } from "@/lib/api";
export default function AlumniDirectoryPage() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    setError("");
    alumniApi.getDirectory(query ? { search: query } : void 0).then(({ data }) => setProfiles(Array.isArray(data) ? data : [])).catch((requestError) => {
      console.error("Unable to load alumni directory:", requestError);
      setError("The alumni directory could not be loaded. Please try again.");
    }).finally(() => setLoading(false));
  }, [query]);
  const submitSearch = (event) => {
    event.preventDefault();
    setQuery(search.trim());
  };
  return /* @__PURE__ */ jsxs(AlumniPageShell, { title: "Alumni Directory", description: "Find and connect with fellow graduates.", children: [
    /* @__PURE__ */ jsxs("form", { className: "portal-directory-search", onSubmit: submitSearch, children: [
      /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "directory-search", children: "Search alumni" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "directory-search",
          placeholder: "Search by name, company, or role",
          value: search,
          onChange: (event) => setSearch(event.target.value)
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "portal-button portal-button-primary", type: "submit", children: "Search" }),
      query && /* @__PURE__ */ jsx(
        "button",
        {
          className: "portal-button portal-button-secondary",
          type: "button",
          onClick: () => {
            setSearch("");
            setQuery("");
          },
          children: "Clear"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: error }),
    loading ? /* @__PURE__ */ jsx("div", { className: "portal-panel", role: "status", children: "Loading alumni\u2026" }) : profiles.length === 0 ? /* @__PURE__ */ jsx("div", { className: "portal-empty", children: query ? "No alumni matched your search." : "No public alumni profiles are available yet." }) : /* @__PURE__ */ jsx("div", { className: "portal-content-grid", children: profiles.map((profile) => {
      const name = [profile.user?.first_name, profile.user?.last_name].filter(Boolean).join(" ") || "Alumni";
      const location = [profile.current_city, profile.current_state, profile.current_country].filter(Boolean).join(", ");
      return /* @__PURE__ */ jsxs("article", { className: "portal-content-card portal-directory-card", children: [
        /* @__PURE__ */ jsx("div", { className: "portal-directory-avatar", "aria-hidden": "true", children: name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsx("h2", { children: name }),
        /* @__PURE__ */ jsx("p", { className: "portal-card-meta", children: [profile.designation, profile.current_company].filter(Boolean).join(" at ") || "Alumni" }),
        location && /* @__PURE__ */ jsx("p", { className: "portal-card-meta", children: location }),
        profile.student?.department && /* @__PURE__ */ jsx("p", { className: "portal-card-meta", children: profile.student.department }),
        profile.industry && /* @__PURE__ */ jsx("p", { className: "portal-card-meta", children: profile.industry }),
        profile.bio && /* @__PURE__ */ jsx("p", { className: "portal-card-description", children: profile.bio }),
        profile.user?.email && /* @__PURE__ */ jsx("a", { className: "portal-text-link", href: `mailto:${profile.user.email}`, children: "Contact alumni" })
      ] }, profile.id);
    }) })
  ] });
}
