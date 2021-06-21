// Function to count the number of words in the text box.
function view_count() {
  // Find html elements.
  var textArea = document.getElementById("my_text");
  var div = document.getElementById("view_count");
  // Put the text in a variable so we can manipulate it.
  var text = textArea.value;
  //remove whitespace before and after end of text
  text = text.replace(/(^\s*)|(\s*$)/gi, "");
  // replace newline if it occurs at least once with single whitespace
  text = text.replace(/\n{1,}/gi, " ");
  // replace whitespace if it occurs at least twice with single whitespace
  text = text.replace(/\s{2,}/gi, " ");

  var words = text.split(" ");
  var len = 0;
  for (i = 0; i < words.length; i++) {
    if (words[i] != " " && words[i] != "") {
      len += 1;
    }
  }
  if (text != undefined)
    document.getElementById("view_count").innerHTML = "Word Count: " + len;
   else document.getElementById("marks").innerHTML = "";

  // To keep updating the word count by calling the function repeatedly
  setTimeout(view_count, 1000);
}