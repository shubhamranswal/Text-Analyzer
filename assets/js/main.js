function view_count() {
  const textArea = document.getElementById("my_text");
  const wordCountEl = document.getElementById("word_count");
  const charCountEl = document.getElementById("char_count");
  const readTimeEl = document.getElementById("read_time");
  const lineCountEl = document.getElementById("line_count");
  const sentenceCountEl = document.getElementById("sentence_count");

  let text = textArea.value.trim();
  text = text.replace(/\n+/g, "\n").replace(/\s{2,}/g, " ");

  const words = text.length ? text.split(/\s+/).filter(w => w !== "") : [];
  const wordCount = words.length;
  const charCount = text.length;
  const lineCount = text ? text.split(/\n/).length : 0;
  const sentenceCount = text ? (text.match(/[.!?]+/g) || []).length : 0;
  const minutes = wordCount / 200;
  const readTime = minutes < 0.5 ? "<1 min" : `${minutes.toFixed(1)} min`;

  wordCountEl.textContent = wordCount;
  charCountEl.textContent = charCount;
  lineCountEl.textContent = lineCount;
  sentenceCountEl.textContent = sentenceCount;
  readTimeEl.textContent = readTime;

  setTimeout(view_count, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

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

  const clearBtn = document.getElementById("clear_btn");
  const copyBtn = document.getElementById("copy_btn");
  const downloadBtn = document.getElementById("download_btn");
  const spellBtn = document.getElementById("spell_btn");
  const textArea = document.getElementById("my_text");

  clearBtn.addEventListener("click", () => {
    textArea.value = "";
  });

  copyBtn.addEventListener("click", () => {
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    alert("Copied to clipboard!");
  });

  downloadBtn.addEventListener("click", () => {
    const blob = new Blob([textArea.value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text_analyzer_output.txt";
    link.click();
  });

  spellBtn.addEventListener("click", async () => {
    const text = textArea.value;
    if (!text.trim()) return alert("Please enter some text first!");

    const response = await fetch(`https://api.textgears.com/spelling?key=DEMO_KEY&text=${encodeURIComponent(text)}&language=en-GB`);
    const data = await response.json();

    if (data.response && data.response.errors.length > 0) {
      const errors = data.response.errors.map(e => `${e.bad} → ${e.better.join(", ")}`).join("\n");
      alert("Spelling suggestions:\n\n" + errors);
    } else {
      alert("No spelling errors found!");
    }
  });
});
