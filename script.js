
const searchToggle = document.getElementById("search-toggle");
const searchContainer = document.getElementById("search-container");
const productSearch = document.getElementById("product-search");
const searchSuggestions = document.getElementById("search-suggestions");

if (searchToggle && searchContainer && productSearch && searchSuggestions) {
    searchToggle.addEventListener("click", function () {
        searchContainer.hidden = !searchContainer.hidden;

        if (!searchContainer.hidden) {
            productSearch.focus();
        } else {
            productSearch.value = "";
            searchSuggestions.innerHTML = "";
        }
    });
}

if (productSearch && searchSuggestions) {
    productSearch.addEventListener("input", function () {
        const searchTerm = productSearch.value.toLowerCase().trim();
        searchSuggestions.innerHTML = "";

        if (searchTerm === "") {
            return;
        }

        const products = document.querySelectorAll(
            ".products-container .product-item"
        );

        products.forEach(function (product) {
            const title = product.querySelector("h3")?.textContent.trim() || "";
            const description = product.querySelector("p")?.textContent.trim() || "";
            const category = product.querySelector(".product-category")?.textContent.trim() || "";
            const link = product.querySelector(".product-button")?.getAttribute("href");

            const searchableText = (
                title + " " + description + " " + category
            ).toLowerCase();

            if (searchableText.includes(searchTerm) && link) {
                const suggestion = document.createElement("a");
                suggestion.className = "search-suggestion";
                suggestion.href = link;
                suggestion.textContent = title;

                searchSuggestions.appendChild(suggestion);
            }
        });

        if (searchSuggestions.children.length === 0) {
            const noResults = document.createElement("p");
            noResults.className = "no-search-results";
            noResults.textContent = "No matching products found.";
            searchSuggestions.appendChild(noResults);
        }
    });
}



