"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import AlumniPageShell from "@/components/AlumniPageShell";
import { alumniApi } from "@/lib/api";
const emptyProfile = {
  current_company: "",
  designation: "",
  industry: "",
  current_city: "",
  current_state: "",
  current_country: "",
  linkedin_url: "",
  github_url: "",
  portfolio_url: "",
  bio: "",
  is_profile_public: true
};
function normalizeProfile(data) {
  return {
    ...emptyProfile,
    current_company: data.current_company || "",
    designation: data.designation || "",
    industry: data.industry || "",
    current_city: data.current_city || "",
    current_state: data.current_state || "",
    current_country: data.current_country || "",
    linkedin_url: data.linkedin_url || "",
    github_url: data.github_url || "",
    portfolio_url: data.portfolio_url || "",
    bio: data.bio || "",
    is_profile_public: data.is_profile_public ?? true
  };
}
export default function AlumniProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    alumniApi.getProfile().then(({ data }) => setProfile(normalizeProfile(data))).catch((requestError) => {
      console.error("Unable to load alumni profile:", requestError);
      setError("We could not load your profile. Please try again.");
    }).finally(() => setLoading(false));
  }, []);
  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };
  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await alumniApi.updateProfile(profile);
      setProfile(normalizeProfile(data));
      setSuccess("Your profile has been saved.");
    } catch (requestError) {
      console.error("Unable to save alumni profile:", requestError);
      setError("We could not save your changes. Check your entries and try again.");
    } finally {
      setSaving(false);
    }
  };
  const fields = [
    ["current_company", "Current company"],
    ["designation", "Designation"],
    ["industry", "Industry"],
    ["current_city", "City"],
    ["current_state", "State / Province"],
    ["current_country", "Country"],
    ["linkedin_url", "LinkedIn URL", "url"],
    ["github_url", "GitHub URL", "url"],
    ["portfolio_url", "Portfolio URL", "url"]
  ];
  return /* @__PURE__ */ jsx(AlumniPageShell, { title: "My Profile", description: "Keep your professional details up to date.", children: loading ? /* @__PURE__ */ jsx("div", { className: "portal-panel", role: "status", children: "Loading your profile\u2026" }) : /* @__PURE__ */ jsxs("form", { className: "portal-panel portal-form", onSubmit: saveProfile, children: [
    error && /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: error }),
    success && /* @__PURE__ */ jsx("div", { className: "portal-success-message", role: "status", children: success }),
    /* @__PURE__ */ jsxs("div", { className: "portal-form-grid", children: [
      fields.map(([field, label, type]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: field, children: label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: field,
            type: type || "text",
            value: profile[field],
            onChange: (event) => updateField(field, event.target.value)
          }
        )
      ] }, field)),
      /* @__PURE__ */ jsxs("div", { className: "portal-form-full", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "bio", children: "About me" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "bio",
            rows: 5,
            value: profile.bio,
            onChange: (event) => updateField("bio", event.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "portal-checkbox", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: profile.is_profile_public,
          onChange: (event) => updateField("is_profile_public", event.target.checked)
        }
      ),
      "Show my profile in the alumni directory"
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { className: "portal-button portal-button-primary", type: "submit", disabled: saving, children: saving ? "Saving\u2026" : "Save profile" }) })
  ] }) });
}
