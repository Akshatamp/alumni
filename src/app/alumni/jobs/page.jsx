"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import AlumniPageShell from "@/components/AlumniPageShell";
import { alumniApi } from "@/lib/api";
const emptyJobForm = {
  title: "",
  company: "",
  location: "",
  employment_type: "",
  experience: "",
  description: "",
  skills: "",
  application_url: "",
  application_deadline: ""
};
function responseErrorMessage(error) {
  if (typeof error !== "object" || error === null || !("response" in error)) {
    return "Please try again.";
  }
  const response = error.response;
  if (typeof response !== "object" || response === null || !("data" in response)) {
    return "Please try again.";
  }
  const data = response.data;
  if (typeof data !== "object" || data === null) return "Please try again.";
  if ("detail" in data && typeof data.detail === "string") return data.detail;
  return Object.entries(data).map(
    ([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(" ") : String(messages)}`
  ).join(" ");
}
function displayDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(date);
}
export default function AlumniJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(emptyJobForm);
  const [editingJobId, setEditingJobId] = useState(null);
  const ownJobs = useMemo(
    () => jobs.filter((job) => profile && job.posted_by === profile.id),
    [jobs, profile]
  );
  const approvedJobs = useMemo(
    () => jobs.filter((job) => job.status === "approved"),
    [jobs]
  );
  const loadJobs = async () => {
    setError("");
    try {
      const { data } = await alumniApi.getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (requestError) {
      console.error("Unable to load alumni jobs:", requestError);
      setError(`Job opportunities could not be loaded. ${responseErrorMessage(requestError)}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    alumniApi.getJobs().then(({ data }) => setJobs(Array.isArray(data) ? data : [])).catch((requestError) => {
      console.error("Unable to load alumni jobs:", requestError);
      setError(`Job opportunities could not be loaded. ${responseErrorMessage(requestError)}`);
    }).finally(() => setLoading(false));
    alumniApi.getProfile().then(({ data }) => setProfile(data)).catch((requestError) => {
      console.error("Unable to check alumni job-posting eligibility:", requestError);
    }).finally(() => setProfileLoading(false));
  }, []);
  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };
  const resetForm = () => {
    setForm(emptyJobForm);
    setEditingJobId(null);
    setFormError("");
    setSuccess("");
  };
  const editJob = (job) => {
    setForm({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      employment_type: job.employment_type || "",
      experience: job.experience || "",
      description: job.description || "",
      skills: job.skills || "",
      application_url: job.application_url || "",
      application_deadline: job.application_deadline || ""
    });
    setEditingJobId(job.id);
    setFormError("");
    setSuccess("");
    document.getElementById("job-post-form")?.scrollIntoView({ behavior: "smooth" });
  };
  const saveJob = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError("");
    setSuccess("");
    const payload = {
      ...form,
      application_deadline: form.application_deadline || null,
      application_url: form.application_url.trim()
    };
    const wasEditing = editingJobId !== null;
    try {
      if (editingJobId) {
        await alumniApi.updateJob(editingJobId, payload);
        setSuccess("Your changes were saved. The updated job is pending administrator review.");
      } else {
        await alumniApi.postJob(payload);
        setSuccess("Your job was submitted and is pending administrator review.");
      }
      resetForm();
      setSuccess(wasEditing ? "Your changes were saved. The updated job is pending administrator review." : "Your job was submitted and is pending administrator review.");
      await loadJobs();
    } catch (requestError) {
      console.error("Unable to save alumni job:", requestError);
      setFormError(`The job could not be saved. ${responseErrorMessage(requestError)}`);
    } finally {
      setSaving(false);
    }
  };
  const canPost = profile?.status === "approved";
  return /* @__PURE__ */ jsxs(
    AlumniPageShell,
    {
      title: "Career Opportunities",
      description: "Browse opportunities and share a job with the alumni community.",
      children: [
        error && /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: error }),
        profileLoading ? /* @__PURE__ */ jsx("div", { className: "portal-panel", role: "status", children: "Checking job-posting eligibility\u2026" }) : canPost ? /* @__PURE__ */ jsxs("section", { className: "portal-panel portal-job-form-panel", children: [
          /* @__PURE__ */ jsxs("div", { className: "portal-panel-heading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { children: editingJobId ? "Edit your job posting" : "Post a job" }),
              /* @__PURE__ */ jsx("p", { children: "Your job is reviewed by an administrator before it becomes visible to alumni." })
            ] }),
            editingJobId !== null && /* @__PURE__ */ jsx("button", { className: "portal-button portal-button-secondary", type: "button", onClick: resetForm, children: "Cancel editing" })
          ] }),
          success && /* @__PURE__ */ jsx("div", { className: "portal-success-message", role: "status", children: success }),
          formError && /* @__PURE__ */ jsx("div", { className: "portal-alert", role: "alert", children: formError }),
          /* @__PURE__ */ jsxs("form", { id: "job-post-form", className: "portal-form", onSubmit: saveJob, children: [
            /* @__PURE__ */ jsxs("div", { className: "portal-form-grid", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-title", children: "Job title" }),
                /* @__PURE__ */ jsx("input", { id: "job-title", maxLength: 200, required: true, value: form.title, onChange: (event) => updateField("title", event.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-company", children: "Company" }),
                /* @__PURE__ */ jsx("input", { id: "job-company", maxLength: 200, required: true, value: form.company, onChange: (event) => updateField("company", event.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-location", children: "Location" }),
                /* @__PURE__ */ jsx("input", { id: "job-location", maxLength: 200, required: true, placeholder: "City, country or remote", value: form.location, onChange: (event) => updateField("location", event.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-employment-type", children: "Employment type" }),
                /* @__PURE__ */ jsxs("select", { id: "job-employment-type", required: true, value: form.employment_type, onChange: (event) => updateField("employment_type", event.target.value), children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select type" }),
                  /* @__PURE__ */ jsx("option", { value: "Full-time", children: "Full-time" }),
                  /* @__PURE__ */ jsx("option", { value: "Part-time", children: "Part-time" }),
                  /* @__PURE__ */ jsx("option", { value: "Contract", children: "Contract" }),
                  /* @__PURE__ */ jsx("option", { value: "Internship", children: "Internship" }),
                  /* @__PURE__ */ jsx("option", { value: "Temporary", children: "Temporary" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-experience", children: "Experience" }),
                /* @__PURE__ */ jsx("input", { id: "job-experience", maxLength: 100, placeholder: "e.g. 2+ years", value: form.experience, onChange: (event) => updateField("experience", event.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-deadline", children: "Application deadline" }),
                /* @__PURE__ */ jsx("input", { id: "job-deadline", type: "date", value: form.application_deadline, onChange: (event) => updateField("application_deadline", event.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "portal-form-full", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-description", children: "Job description" }),
                /* @__PURE__ */ jsx("textarea", { id: "job-description", rows: 5, required: true, value: form.description, onChange: (event) => updateField("description", event.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "portal-form-full", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-skills", children: "Required skills" }),
                /* @__PURE__ */ jsx("textarea", { id: "job-skills", rows: 3, placeholder: "List key skills, separated by commas", value: form.skills, onChange: (event) => updateField("skills", event.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "portal-form-full", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "job-application-url", children: "Application link (optional)" }),
                /* @__PURE__ */ jsx("input", { id: "job-application-url", type: "url", placeholder: "https://\u2026", value: form.application_url, onChange: (event) => updateField("application_url", event.target.value) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "portal-job-form-actions", children: /* @__PURE__ */ jsx("button", { className: "portal-button portal-button-primary", type: "submit", disabled: saving, children: saving ? "Saving\u2026" : editingJobId ? "Save and resubmit for review" : "Submit job for review" }) })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "portal-panel portal-job-eligibility", children: [
          /* @__PURE__ */ jsx("h2", { children: "Job posting is for approved alumni" }),
          /* @__PURE__ */ jsx("p", { children: "Your alumni profile must be approved before you can post a job." })
        ] }),
        ownJobs.length > 0 && /* @__PURE__ */ jsxs("section", { className: "portal-panel portal-my-jobs", children: [
          /* @__PURE__ */ jsx("div", { className: "portal-panel-heading", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { children: "My job postings" }),
            /* @__PURE__ */ jsx("p", { children: "Review status and update your submissions." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "portal-my-jobs-list", children: ownJobs.map((job) => /* @__PURE__ */ jsxs("article", { className: "portal-my-job", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: job.title }),
              /* @__PURE__ */ jsxs("p", { children: [
                job.company,
                " \xB7 ",
                job.location
              ] }),
              /* @__PURE__ */ jsx("span", { className: `portal-job-status portal-job-status-${job.status}`, children: job.status })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "portal-button portal-button-secondary",
                type: "button",
                onClick: () => editJob(job),
                disabled: !canPost || saving,
                children: "Edit"
              }
            )
          ] }, job.id)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "portal-job-listings", children: [
          /* @__PURE__ */ jsx("div", { className: "portal-panel-heading", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { children: "Current opportunities" }),
            /* @__PURE__ */ jsx("p", { children: "Approved vacancies shared by alumni." })
          ] }) }),
          loading ? /* @__PURE__ */ jsx("div", { className: "portal-panel", role: "status", children: "Loading opportunities\u2026" }) : approvedJobs.length === 0 ? /* @__PURE__ */ jsx("div", { className: "portal-empty", children: "There are no approved job opportunities right now." }) : /* @__PURE__ */ jsx("div", { className: "portal-content-grid", children: approvedJobs.map((job) => /* @__PURE__ */ jsxs("article", { className: "portal-content-card", children: [
            /* @__PURE__ */ jsx("div", { className: "portal-card-eyebrow", children: job.employment_type || "Opportunity" }),
            /* @__PURE__ */ jsx("h2", { children: job.title }),
            /* @__PURE__ */ jsxs("p", { className: "portal-card-meta", children: [
              job.company,
              job.location ? ` \xB7 ${job.location}` : ""
            ] }),
            job.experience && /* @__PURE__ */ jsxs("p", { className: "portal-card-meta", children: [
              "Experience: ",
              job.experience
            ] }),
            /* @__PURE__ */ jsx("p", { className: "portal-card-description", children: job.description }),
            job.skills && /* @__PURE__ */ jsxs("p", { className: "portal-card-meta", children: [
              /* @__PURE__ */ jsx("strong", { children: "Skills:" }),
              " ",
              job.skills
            ] }),
            job.application_deadline && /* @__PURE__ */ jsxs("p", { className: "portal-card-meta", children: [
              "Apply by ",
              displayDate(job.application_deadline)
            ] }),
            job.posted_by_name && /* @__PURE__ */ jsxs("p", { className: "portal-card-meta", children: [
              "Shared by ",
              job.posted_by_name
            ] }),
            job.application_url && /* @__PURE__ */ jsx("a", { className: "portal-button portal-button-primary", href: job.application_url, target: "_blank", rel: "noreferrer", children: "Apply now" })
          ] }, job.id)) })
        ] })
      ]
    }
  );
}
