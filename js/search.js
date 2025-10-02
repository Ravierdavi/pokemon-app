const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.querySelector("#inp-search");
const messageDiv = document.querySelector("#message_div_search");

const infoDiv = document.querySelector("#info_div_search");
const formSearch = document.querySelector(".form-search");

class SearchPokemon {
  async fetchPokemon(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Pokémon not found.");
      }
      const pokemonData = await response.json();
      this.displayInfo(pokemonData);
      this.showMessage("Pokémon found!", "success");
    } catch (error) {
      this.showMessage(error.message, "error");
    } finally {
      this.clearInput();
    }
  }

  displayInfo(pokemonData) {
    console.log("Displaying info for:", pokemonData);
    formSearch.style.display = "none";
    infoDiv.style.display = "flex";

    const pokemonInfoHTML = `
      <h3>${pokemonData.name.toUpperCase()} (ID: ${pokemonData.id})</h3>
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
      <p>Height: ${pokemonData.height}</p>
      <p>Weight: ${pokemonData.weight}</p>
      <p>Types: ${pokemonData.types.map((typeInfo) => typeInfo.type.name).join(", ")}</p>
      <button id="btn-new-search">New Search</button>
    `;

    infoDiv.innerHTML = pokemonInfoHTML;

    const btnNewSearch = document.querySelector("#btn-new-search");
    btnNewSearch.addEventListener("click", () => {
      infoDiv.style.display = "none";
      formSearch.style.display = "block";
      this.showMessage("Please enter a Pokémon name.", "info");
    });
  }

  init() {
    const pokemonName = inputSearch.value.toLowerCase();

    const variousValidations = this.validateInput(pokemonName);

    if (!variousValidations.valid) {
      this.showMessage(variousValidations.message, "error");
      this.clearInput();
      return;
    }

    console.log(`Searching for: ${pokemonName}`);
    this.fetchPokemon(pokemonName);
  }

  validateInput(name) {
    if (name === "") {
      return { valid: false, message: "Input cannot be empty." };
    }

    // Allow letters and hyphens for Pokémon names
    if (!/^[a-zA-Z\-]+$/.test(name)) {
      return { valid: false, message: "Input must contain only letters and hyphens." };
    }

    return { valid: true, message: "Input is valid." };
  }

  showMessage(message, type) {
    messageDiv.textContent = message;
    const styles = {
      error: "color: red; font-weight: bold;",
      success: "color: green; font-weight: bold;",
      info: "color: blue;",
    };

    messageDiv.style = styles[type] || "";
  }

  clearInput() {
    inputSearch.value = "";
    inputSearch.focus(); // fixed
  }
}

// Instantiate the SearchPokemon class
const searchPokemon = new SearchPokemon();

// Event listener for search button
btnSearch.addEventListener("click", () => searchPokemon.init());

// Enter key event listener for input field
inputSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchPokemon.init();
  }
});

// Initialize
searchPokemon.showMessage("Please enter a Pokémon name.", "info");
