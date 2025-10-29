function view_count() {
  const textArea = document.getElementById("my_text");
  const wordCountEl = document.getElementById("word_count");
  const charCountEl = document.getElementById("char_count");
  const readTimeEl = document.getElementById("read_time");

  let text = textArea.value.trim();
  text = text.replace(/\n+/g, " ").replace(/\s{2,}/g, " ");

  const words = text.length ? text.split(" ").filter(w => w !== "") : [];
  const wordCount = words.length;
  const charCount = text.length;
  const minutes = wordCount / 200;
  const readTime = minutes < 0.5 ? "<1 min" : `${minutes.toFixed(1)} min`;

  wordCountEl.textContent = wordCount;
  charCountEl.textContent = charCount;
  readTimeEl.textContent = readTime;

  setTimeout(view_count, 400);
}

// --- Theme Toggle ---
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // Check saved theme
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    const isLight = body.classList.contains("light");
    toggleBtn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});
