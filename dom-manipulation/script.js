document.addEventListener("DOMContentLoaded", function () {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const categoryContainer = document.getElementById("categoryContainer");
  const formContainer = document.getElementById("formContainer");

  // Quote data
  let quotes = [
    { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
    { text: "Simplicity is the soul of efficiency.", category: "Programming" },
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Success is not final; failure is not fatal.", category: "Motivation" }
  ];

  let selectedCategory = "All";

  /* ------------------ DISPLAY RANDOM QUOTE ------------------ */
  function showRandomQuote() {
    const filteredQuotes =
      selectedCategory === "All"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes available for this category.";
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}"`;
  }

  /* ------------------ CREATE CATEGORY DROPDOWN ------------------ */
  function createCategorySelector() {
    categoryContainer.innerHTML = "";

    const label = document.createElement("label");
    label.textContent = "Select Category: ";

    const select = document.createElement("select");

    const categories = ["All", ...new Set(quotes.map(q => q.category))];

    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });

    select.addEventListener("change", function () {
      selectedCategory = this.value;
      showRandomQuote();
    });

    categoryContainer.appendChild(label);
    categoryContainer.appendChild(select);
  }

  /* ------------------ ADD QUOTE FORM ------------------ */
  function createAddQuoteForm() {
    const quoteInput = document.createElement("input");
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
    quoteInput.id = "newQuoteText";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
    categoryInput.id = "newQuoteCategory";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";

    addButton.addEventListener("click", function () {
      const text = quoteInput.value.trim();
      const category = categoryInput.value.trim();

      if (text === "" || category === "") {
        alert("Please enter both quote and category.");
        return;
      }

      quotes.push({ text, category });

      quoteInput.value = "";
      categoryInput.value = "";

      createCategorySelector();
      alert("Quote added successfully!");
    });

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  }

  /* ------------------ EVENT LISTENERS ------------------ */
  newQuoteBtn.addEventListener("click", showRandomQuote);

  /* ------------------ INITIAL SETUP ------------------ */
  createCategorySelector();
  createAddQuoteForm();
  showRandomQuote();
});
