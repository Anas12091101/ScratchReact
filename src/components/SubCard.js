import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import { getAuthToken } from "../utils/auth";
function SubCard({ cardInfo, features }) {
  const period_lookup = {
    y: "year",
    m: "month",
  };
  const token = getAuthToken();
  function approveHandler() {
    let url = "http://127.0.0.1:8000/subscription/subscribe/";
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    let response = fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ id: cardInfo.id }),
    });
    console.log(response.ok);
    if (response.ok) {
      toast.success(
        "Congrats! You have subscribed. Thankyou",

        {
          duration: 5000,
        }
      );
    } else {
      toast.error("Something bad happened. Couldn't complete your request");
    }
  }
  return (
    <Box
      sx={{
        flex: "0 0 33",
        minWidth: "30%",
        // width: "30%",
        margin: 2,
      }}
    >
      <Card
        size="lg"
        variant="outlined"
        sx={{
          backgroundColor: "darkgrey",
          ":hover": { backgroundColor: "lightgrey" },
        }}
      >
        <Typography level="h2" fontSize="xl3">
          {cardInfo.membership_type !== "free" &&
            period_lookup[cardInfo.period].toUpperCase() + "LY "}

          {cardInfo.membership_type === "pre"
            ? "PREMIUM"
            : cardInfo.membership_type.toUpperCase()}
        </Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
          {features.map((feature) => (
            <ListItem key={feature}>
              <ListItemDecorator>
                {cardInfo.features.includes(feature) ? (
                  <Check sx={{ color: "green" }} />
                ) : (
                  <CloseIcon sx={{ color: "red" }} />
                )}
              </ListItemDecorator>
              {feature}
            </ListItem>
          ))}
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="h5" sx={{ mr: "auto" }}></Typography>
          {parseFloat(cardInfo.price).toFixed(2)}${" "}
          <Typography>/ {period_lookup[cardInfo.period]}</Typography>
          {cardInfo.membership_type !== "free" && (
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: parseFloat(cardInfo.price).toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onCancel={() =>
                toast.error("You cancelled the payment", {
                  duration: 5000,
                })
              }
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  approveHandler();
                });
              }}
              onError={() =>
                toast.error("An error occured", { duration: 5000 })
              }
            />
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

export default SubCard;
