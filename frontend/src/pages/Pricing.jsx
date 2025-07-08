import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

const Pricing = () => {
  const handleCheckout = async (plan) => {
    const res = await fetch(`/api/stripe/create-checkout-session/?plan=${plan}`);
    const data = await res.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Choose a Plan</h2>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3>Free</h3>
          <p>Access dictionary + 2% of content</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3>Student Pro</h3>
          <p>Full access to AI tools, quiz center, and certificates</p>
          <button onClick={() => handleCheckout("student_pro")}>Subscribe</button>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3>School Pro</h3>
          <p>Includes teacher dashboard + bulk tools</p>
          <button onClick={() => handleCheckout("school_pro")}>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;