function sendMail() {
  var params = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  // Disable the submit button and show loading state
  var submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

  emailjs
    .send("service_2psgker", "template_5ders88", params)
    .then(
      function () {
        document.getElementById("successMessage").style.display = "block";
      },
      function (error) {
        console.error("Error sending email:", error);
      }
    )
    .finally(function () {
      // Re-enable the submit button and reset its text
      submitButton.disabled = false;
      submitButton.innerHTML = "Submit";
    });
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting by default

  // Clear previous error messages
  clearErrors();

  // Validate inputs
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let messageInfo = document.getElementById("message").value.trim();

  let isValid = true;

  // Validate Full Name
  if (name.length < 3) {
    displayError("nameError", "Name must be greater than 3");
    isValid = false;
  }

  // Validate Email Address
  if (email === "") {
    displayError("emailError", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(email)) {
    displayError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  // Validate Full Name
  if (messageInfo === "") {
    displayError("messageError", "Please enter your message");
    isValid = false;
  }

  // Validate Phone Number
  // if (phone === "") {
  //     displayError("phoneError", "Please enter your phone number");
  //     isValid = false;
  // }

  // Validate Phone Number
  // if (phone.length < 11) {
  //     displayError("phoneError", "Phone number must be 11 digits");
  //     isValid = false;
  // } else if (!isValidPhone(phone)) {
  //     displayError("phoneError", "Please enter a valid phone number");
  //     isValid = false;
  // }

  // If form is valid, show success message and clear form
  if (isValid) {
    sendMail();
    clearForm();
  }
});

// Function to display error message
function displayError(id, message) {
  let errorElement = document.getElementById(id);
  errorElement.innerText = message;
}

// Function to clear error messages
function clearErrors() {
  let errorMessages = document.getElementsByClassName("error-message");
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].innerText = "";
  }
}

// Function to clear the form
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("message").value = "";
}

// Function to validate email address format
function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate phone number format
// function isValidPhone(phone) {
//     let phoneRegex = /^\d+$/;
//     return phoneRegex.test(phone);
// }
