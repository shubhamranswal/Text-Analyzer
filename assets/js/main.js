window.onload = () => {
  update_stats();
};

function update_stats() {
  const text = document.getElementById("my_text").value.trim();

  const words = text.length ? text.split(/\s+/).length : 0;
  const chars = text.length;
  const lines = text.split(/\n/).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const reading_time = words > 0 ? (words / 200).toFixed(2) : 0;

  document.getElementById("word_count").innerText = "Words: " + words;
  document.getElementById("char_count").innerText = "Characters: " + chars;
  document.getElementById("line_count").innerText = "Lines: " + lines;
  document.getElementById("sentence_count").innerText = "Sentences: " + sentences;
  document.getElementById("reading_time").innerText = "Reading Time: " + reading_time + " min";

  setTimeout(update_stats, 1000);
}

function clear_text() {
  document.getElementById("my_text").value = "";
  update_stats();
}

function copy_text() {
  const text = document.getElementById("my_text").value;
  if (!text.trim()) return alert("Nothing to copy!");
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}

function download_text() {
  const text = document.getElementById("my_text").value;
  if (!text.trim()) return alert("Nothing to download!");
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "text.txt";
  link.click();
}

async function check_spelling() {
  const text = document.getElementById("my_text").value;
  const result_div = document.getElementById("spelling_results");
  if (!text.trim()) {
    result_div.innerHTML = "<b>Please enter text to check spelling.</b>";
    return;
  }

  result_div.innerHTML = "Checking spelling...";
  try {
    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ text: text, language: "en-US" })
    });

    const data = await response.json();

    if (data.matches.length === 0) {
      result_div.innerHTML = "<b>No spelling or grammar mistakes found! 🎉</b>";
    } else {
      let output = "<b>Suggestions:</b><ul>";
      data.matches.forEach(match => {
        output += `<li>${match.message} → <i>${match.replacements.map(r => r.value).join(", ")}</i></li>`;
      });
      output += "</ul>";
      result_div.innerHTML = output;
    }
  } catch (error) {
    result_div.innerHTML = "Error checking spelling!";
    console.error(error);
  }
}
