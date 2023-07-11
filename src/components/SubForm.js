import { Form } from "react-router-dom";
import SubCard from "./SubCard";
import classes from "./SubForm.module.css";
import { useLoaderData } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from "react-hot-toast";
function SubForm() {
  const cards = useLoaderData();
  const features = cards.filter((c) => c.membership_type === "pre")[0].features;
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AaXY8I67Kv83ISec0kiHy1FJQog8kH-4Y680W_AUHMh3x4TSTMBHTY_zn513bFhf0bv9JDG2B-529jlJ",
      }}
    >
      <Toaster />
      <Form method="post" className={classes.form}>
        <h1>Subscription Plans</h1>
        <div className={classes.cards}>
          {cards.map((c) => (
            <SubCard key={c.id} cardInfo={c} features={features}></SubCard>
          ))}
        </div>
      </Form>
    </PayPalScriptProvider>
  );
}

export default SubForm;
