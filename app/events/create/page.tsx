"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateEventPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "offline",
    audience: "",
    agenda: "",
    organizer: "",
    tags: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("overview", formData.overview);
      submitData.append("venue", formData.venue);
      submitData.append("location", formData.location);
      submitData.append("date", formData.date);
      submitData.append("time", formData.time);
      submitData.append("mode", formData.mode);
      submitData.append("audience", formData.audience);
      submitData.append("organizer", formData.organizer);

      const agendaItems = formData.agenda.split(",").map((item) => item.trim()).filter(Boolean);
      submitData.append("agenda", JSON.stringify(agendaItems));

      const tagItems = formData.tags.split(",").map((item) => item.trim()).filter(Boolean);
      submitData.append("tags", JSON.stringify(tagItems));

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const res = await fetch("/api/events", {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Event created successfully!");
        setTimeout(() => {
          router.push(`/events/${data.event?.slug || ""}`);
        }, 1500);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to create event.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section id="create-event">
      <div className="create-header">
        <h1>Create an Event</h1>
        <p className="text-light-100 text-lg max-sm:text-sm text-center mt-3">
          Fill in the details below to list your developer event
        </p>
      </div>

      <div className="create-form-container">
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group full-width">
            <label htmlFor="image">Event Banner Image *</label>
            <div className="image-upload-area" onClick={() => document.getElementById("image-input")?.click()}>
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" width={800} height={300} className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-light-200">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-light-200! text-sm! mt-2">Click to upload event banner image</p>
                </div>
              )}
              <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="title">Event Title *</label>
            <input id="title" name="title" type="text" placeholder="e.g., React Conf 2024" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="overview">Short Overview *</label>
            <input id="overview" name="overview" type="text" placeholder="A brief one-line description" value={formData.overview} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Full Description *</label>
            <textarea id="description" name="description" placeholder="Describe your event in detail..." value={formData.description} onChange={handleChange} required rows={4} />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Venue *</label>
            <input id="venue" name="venue" type="text" placeholder="e.g., Moscone Center" value={formData.venue} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="location">City / Location *</label>
            <input id="location" name="location" type="text" placeholder="e.g., San Francisco, CA" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input id="date" name="date" type="text" placeholder="e.g., March 15, 2024" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input id="time" name="time" type="text" placeholder="e.g., 9:00 AM" value={formData.time} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="mode">Mode *</label>
            <select id="mode" name="mode" value={formData.mode} onChange={handleChange} required>
              <option value="offline">Offline (In-Person)</option>
              <option value="online">Online (Virtual)</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="audience">Target Audience *</label>
            <input id="audience" name="audience" type="text" placeholder="e.g., Developers, Engineers" value={formData.audience} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="organizer">Organizer *</label>
            <input id="organizer" name="organizer" type="text" placeholder="e.g., DevEvent Team" value={formData.organizer} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="agenda">Agenda Items * <span className="hint">(comma separated)</span></label>
            <textarea id="agenda" name="agenda" placeholder="Opening Keynote, Workshop Session, Networking Lunch, Panel Discussion" value={formData.agenda} onChange={handleChange} required rows={3} />
          </div>

          <div className="form-group full-width">
            <label htmlFor="tags">Tags * <span className="hint">(comma separated)</span></label>
            <input id="tags" name="tags" type="text" placeholder="React, JavaScript, Web Development" value={formData.tags} onChange={handleChange} required />
          </div>

          {status === "error" && (
            <div className="form-message error full-width">
              <p>{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="form-message success full-width">
              <p>{message}</p>
            </div>
          )}

          <div className="form-group full-width">
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                  </svg>
                  Creating Event...
                </span>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
