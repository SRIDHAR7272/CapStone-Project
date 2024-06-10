document
  .getElementById("recipeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const query = document.getElementById("recipeInput").value;
    const apiKey = "e7cb2ae90emsh2738a6f9ad05f9ep1a9ad8jsn02503d476472";
    const url = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${query}`;

    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "recipe-by-api-ninjas.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const recipeResult = document.getElementById("recipeResult");
        recipeResult.innerHTML = "";

        if (data.length > 0) {
          data.forEach((recipe) => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");

            const title = document.createElement("h2");
            title.textContent = recipe.title;
            recipeDiv.appendChild(title);

            const ingredients = document.createElement("p");
            ingredients.innerHTML = `<strong>Ingredients:</strong> ${recipe.ingredients.replace(
              /\|/g,
              ", "
            )}`;
            recipeDiv.appendChild(ingredients);

            const servings = document.createElement("p");
            servings.innerHTML = `<strong>Servings:</strong> ${recipe.servings}`;
            recipeDiv.appendChild(servings);

            const instructions = document.createElement("p");
            instructions.innerHTML = `<strong>Instructions:</strong> ${recipe.instructions}`;
            recipeDiv.appendChild(instructions);

            recipeResult.appendChild(recipeDiv);
          });
        } else {
          recipeResult.innerHTML =
            "<p>No recipes found. Please try a different query.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching the recipe:", error);
        document.getElementById("recipeResult").innerHTML =
          "<p>There was an error fetching the recipe. Please try again later.</p>";
      });
  });
