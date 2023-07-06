import { Form } from "react-router-dom";
import SubCard from "./SubCard";
import classes from "./SubForm.module.css";
import { useLoaderData } from "react-router-dom";

function SubForm() {
  const cards = useLoaderData();
  const features = cards.filter((c) => c.membership_type === "pre")[0].features;
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>Subscription Plans</h1>
        <div className={classes.cards}>
          {cards.map((c) => (
            <SubCard key={c.id} cardInfo={c} features={features}></SubCard>
          ))}
        </div>
      </Form>
    </>
  );
}

export default SubForm;
