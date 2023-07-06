import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Check from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";

function SubCard({ cardInfo, features }) {
  const period_lookup = {
    y: "year",
    m: "month",
  };

  return (
    <Box
      sx={{
        width: "30%",
        margin: 2,
      }}
    >
      <Card size="md" variant="outlined" sx={{ backgroundColor: "darkgrey" }}>
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
            <ListItem>
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
            <Button
              variant="soft"
              color="neutral"
              endDecorator={<KeyboardArrowRight />}
              type="submit"
            >
              Start now
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

export default SubCard;
