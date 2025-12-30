document.addEventListener("DOMContentLoaded", function () {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const exportBtn = document.getElementById("exportQuotes");
  const importFile = document.getElementById("importFile");

  /* ------------------ LOAD QUOTES FROM LOCAL STORAGE ------------------ */
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Learning never exhausts the mind.", category: "Education" },
    { text: "Code is poetry.", category: "Programming" },
    { text: "Stay hungry, stay foolish.", category: "Motivation" }
  ];

  /* ------------------ SAVE QUOTES TO LOCAL STORAGE ------------------ */
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  /* ------------------ SHOW RANDOM QUOTE ------------------ */
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.textContent = quote.text;

    // Save last viewed quote to session storage
    sessionStorage.setItem("lastQuote", quote.text);
  }

  /* ------------------ RESTORE LAST QUOTE (SESSION STORAGE) ------------------ */
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    quoteDisplay.textContent = lastQuote;
  } else {
    showRandomQuote();
  }

  /* ------------------ CREATE ADD QUOTE FORM ------------------ */
  function createAddQuoteForm() {
    const formDiv = document.createElement("div");

    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";

    addButton.addEventListener("click", addQuote);

    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    document.body.appendChild(formDiv);
  }

  /* ------------------ ADD QUOTE ------------------ */
  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
      alert("Please fill in both fields");
      return;
    }

    quotes.push({
      text: quoteText,
      category: quoteCategory
    });

    saveQuotes();

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");
  }

  /* ------------------ EXPORT QUOTES TO JSON ------------------ */
  function exportToJson() {
    const jsonData = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  /* ------------------ IMPORT QUOTES FROM JSON ------------------ */
  function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);

        if (!Array.isArray(importedQuotes)) {
          alert("Invalid JSON format");
          return;
        }

        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } catch (error) {
        alert("Error reading JSON file");
      }
    };

    fileReader.readAsText(event.target.files[0]);
  }

  /* ------------------ EVENT LISTENERS ------------------ */
  newQuoteBtn.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportToJson);
  importFile.addEventListener("change", importFromJsonFile);

  /* ------------------ INIT ------------------ */
  createAddQuoteForm();
});
