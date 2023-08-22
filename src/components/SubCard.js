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
import { toast } from "react-toastify";
import { getAuthToken } from "../utils/auth";
import { useState } from "react";
import { capturePayment, createPayment } from "../utils/payment";

function SubCard({ cardInfo, features, active, changeActive }) {
  const period_lookup = {
    y: "year",
    m: "month",
  };

  const importance = {
    pre: 3,
    standard: 2,
    free: 1,
    m: 1,
    y: 2,
  };

  const isImportant =
    importance[active.membership_type] < importance[cardInfo.membership_type] ||
    (importance[active.membership_type] ===
      importance[cardInfo.membership_type] &&
      importance[active.period] < importance[cardInfo.period]);

  const isActive = cardInfo.id === active.id;
  const token = getAuthToken();

  return (
    <Box
      sx={{
        flex: "0 0 33",
        minWidth: "23em",
        margin: 2,
      }}
    >
      <Card
        size="lg"
        variant="outlined"
        sx={{
          backgroundColor: isActive ? "lightgrey" : "darkgrey",
          border: isActive ? "5px solid #c5973b" : "None",
          ":hover": { backgroundColor: "lightgrey" },
          minHeight: "21em",
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
          {cardInfo.membership_type !== "free" && !isActive && isImportant && (
            <PayPalButtons
              style={{
                layout: "horizontal",
                color: "black",
                tagline: true,
              }}
              createOrder={async () => createPayment(token, cardInfo)}
              onCancel={() =>
                toast.error("You cancelled the payment", {
                  duration: 10000,
                })
              }
              onApprove={async (data) =>
                capturePayment(data, token, cardInfo, changeActive)
              }
              onError={() =>
                toast.error("An error occured", { duration: 5000 })
              }
            />
          )}
          {isActive && (
            <Typography
              sx={{
                color: "darkslategray",
                backgroundColor: "aliceblue",
                padding: 0.5,
                borderRadius: "10%",
              }}
            >
              Subscribed
            </Typography>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

export default SubCard;
