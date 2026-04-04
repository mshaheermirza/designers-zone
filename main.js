(function () {
  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  const root = document.documentElement;
  let preferred =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const stored = window.localStorage.getItem("dz-theme");
  let theme = stored || preferred;

  const apply = () => {
    root.setAttribute("data-theme", theme);
    btn.textContent = theme === "dark" ? "☀" : "◐";
    btn.setAttribute(
      "aria-label",
      "Switch to " + (theme === "dark" ? "light" : "dark") + " mode"
    );
  };

  apply();

  btn.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("dz-theme", theme);
    apply();
  });
})();

// Simple demo handler for the static contact form
(function () {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const endpoint = "https://dz-backend-9m7h.onrender.com/api/contact";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.disabled = true;

    const payload = {
      name: form.querySelector("#name")?.value || "",
      company: form.querySelector("#company")?.value || "",
      email: form.querySelector("#email")?.value || "",
      message: form.querySelector("#message")?.value || "",
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Contact error:", data);
        alert("Could not send your message. Please try again later.");
      } else {
        alert("Thank you, your message has been sent.");
        form.reset();
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
})();