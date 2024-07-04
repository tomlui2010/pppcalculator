import React from "react";
import { Card, Grid, CardContent, Typography, Avatar } from "@mui/material";
import { Link } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { lightBlue } from "@mui/material/colors";

const PPPinfo = () => {
  const content_header = <p>Purchasing power parity (PPP)</p>;
  const content = (
    <p>{`Purchasing power parity (PPP) is the exchange rate at which one country's currency
                can be converted into another country's currency to buy the same
                amount of goods. According to this idea, two currencies are in
                balance (or at par) when the same basket of goods costs the same in
                both countries, considering the exchange rates.`}</p>
  );
  return (
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        mt: 6,
        mb: 3,
        boxShadow: 10,
        borderRadius: 10,
        background: "transparent",
      }}
      variant="outlined"
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                background: "white",
                width: 35,
                height: 35,
              }}
            >
              <InfoIcon fontSize="medium" />
            </Avatar>
          </Grid>
        </Grid>
        <Typography gutterBottom variant="caption">
          {content_header}
          {content}
        </Typography>
        <Link
          href="https://www.investopedia.com/updates/purchasing-power-parity-ppp/"
          underline="hover"
          sx={{ fontSize: "12px", color: lightBlue }}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
};

export default PPPinfo;
