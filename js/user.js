// User validation and creation
const btnCreateUser = document.querySelector(".btn-create-user");
const inputUsername = document.querySelector("#username");
const messageDivUser = document.querySelector("#message_div_user");

class UserValidator {
  constructor() {
    this.isFirstInput = true;
    this.storedUsername = null;
    this.attemps = 0;
  }

  // Method to process input
  processInput() {
    const username = inputUsername.value;
    const validation = this.validateUsername(username);

    // If validation fails
    if (!validation.isValid) {
      this.showMessage(validation.message, "error");
      this.storedUsername = null;
      this.isFirstInput = true;
      this.attemps = 0;
      this.clearInput();
      return;
    }

    if (this.isFirstInput) {
      this.storedUsername = username;
      this.showMessage(
        `Username is valid. Type ${username} again to confirm.`,
        "info"
      );
      this.isFirstInput = false;
      this.clearInput();
    } else {
      if (this.storedUsername === username) {
        this.showMessage(
          `Username: "${username}" created successfully! You're being redirected...`,
          "success"
        );
        this.clearInput();

        // Reset state after successful creation
        setTimeout(() => {
          this.createUser();
          this.reset();
        }, 3000);
      } else {
        this.attemps += 1;
        if (this.attemps >= 3) {
          this.showMessage(
            `Too many failed attempts. Please start over.`,
            "error"
          );

          // Reset state after too many failed attempts
          setTimeout(() => this.reset(), 3000);
        } else {
          this.showMessage(
            `Usernames do not match. Please type "${this.storedUsername}" again. Attempt ${this.attemps} of 3.`,
            "error"
          );
          this.clearInput();
        }
      }
    }
  }

  createUser() {
    // Placeholder for user creation logic
    console.log(`User "${this.storedUsername}" created.`);

    const usernameSpan = document.querySelector("#username_span");
    usernameSpan.textContent = this.storedUsername;

    switchSection("search-section");
  }

  // Method to validate username
  validateUsername(username) {
    // Trim whitespace
    username = username.trim();

    // Basic validation rules
    if (username === "") {
      return { isValid: false, message: "Username cannot be empty." };
    }

    if (username.length < 3) {
      return {
        isValid: false,
        message: "Username must be at least 3 characters long.",
      };
    }

    return { isValid: true, message: "Username is valid." };
  }

  // Method to display messages
  showMessage(msg, type) {
    messageDivUser.textContent = msg;
    messageDivUser.className = `message ${type}`;

    const styles = {
      error: "color: red; font-weight: bold;",
      success: "color: green; font-weight: bold;",
      info: "color: blue;",
    };

    messageDivUser.style = styles[type] || "";
  }

  // Method to clear input field
  clearInput() {
    inputUsername.value = "";
    inputUsername.focus(); // fixed
  }

  // Method to reset the validator state
  reset() {
    this.isFirstInput = true;
    this.storedUsername = null;
    this.attemps = 0;
    this.clearInput();
    this.showMessage("Please enter a username.", "info");
  }
}

// Create a user validator instance
const userValidator = new UserValidator();

// Event listener for button click
btnCreateUser.addEventListener("click", () => userValidator.processInput());

// Enter key event listener for input field
inputUsername.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    userValidator.processInput();
  }
});

// Initialize
userValidator.showMessage("Please enter a username.", "info");
