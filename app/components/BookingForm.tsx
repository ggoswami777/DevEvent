"use client";

import { useState } from "react";

interface BookingFormProps {
  eventId: string | null;
  eventSlug: string;
}

const BookingForm = ({ eventId, eventSlug }: BookingFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/events/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, eventId, eventSlug }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You have been subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div id="book-event">
      <h2>Subscribe to this Event</h2>
      <p className="text-sm! text-light-200!">
        Enter your email to get updates and reserve your spot.
      </p>

      {status === "success" ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-primary! font-semibold! text-center">{message}</p>
          <button
            onClick={() => { setStatus("idle"); setMessage(""); }}
            className="text-sm text-light-200 hover:text-white underline transition-colors cursor-pointer"
          >
            Subscribe another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm text-light-200 font-medium">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
            />
          </div>

          {status === "error" && (
            <p className="text-red-400! text-sm!">{message}</p>
          )}

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                </svg>
                Subscribing...
              </span>
            ) : (
              "Subscribe Now"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
