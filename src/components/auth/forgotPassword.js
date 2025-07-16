import { auth, sendPasswordResetEmail } from "../../firebaseConfig.js";

const forgotPasswordForm = document.getElementById("forgot-password-form");
const forgotPasswordMessage = document.getElementById(
  "forgot-password-message"
);

forgotPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("forgot-password-email").value;

  try {
    await sendPasswordResetEmail(auth, email);
    forgotPasswordMessage.textContent =
      "Password reset email has been sent to your email address";
    forgotPasswordMessage.style.color = "green";
    forgotPasswordForm.style.display = "none";
  } catch (error) {
    console.error("Error sending password reset email: ", error.message);
    forgotPasswordMessage.textContent = `Error: ${error.message}`;
    forgotPasswordMessage.style.color = "red";
  }
});