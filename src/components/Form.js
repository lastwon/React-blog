import React, { useState } from "react";
import emailjs from "emailjs-com";
import { showSuccessToast, showErrorToast } from "./toastUtils";

const Form = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_lqwxdml",
        "template_fitdxo8",
        {
          email,
        },
        "jwjxPHD80Ix4ym_sS"
      )
      .then((response) => {
        showSuccessToast("Subscribed successfully!");
      })
      .catch((error) => {
        console.error("Error subscribing", error);
        showErrorToast("Error subscribing, please try again!");
      });

    setEmail("");
  };

  return (
    <>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-sign-up">Sign up</button>
      </form>
    </>
  );
};

export default Form;
