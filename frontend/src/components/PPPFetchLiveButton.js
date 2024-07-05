import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

export default function PPP() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  async function handleFetchPPP() {
    setLoading(true);
    try {
      const response = await fetch("/fetchlivedata", {
        mode: "cors",
      });
      // Check if the response status is 304 and handle it
      if (response.status === 304) {
        console.log("Data not modified; using cached version.");
        // Handle the case where data is not modified. You can use cached data here.
        setLoading(false);
        return; // Skip further processing since there's no new data
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setLoading(false);
      }
      const data = await response.json();
      setData(data);
      console.log("Response from API: " + data.message);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <Typography
          className="header"
          sx={{
            display: "flex",
          }}
          variant="subtitle1"
        >
          Latest PPP data is being fetched ...{" "}
        </Typography>
      ) : (
        <div />
      )}
      {error ? (
        <Typography
          className="header"
          sx={{
            display: "flex",
          }}
          variant="subtitle1"
        >
          Error: {error}
        </Typography>
      ) : (
        <div />
      )}
      <Button
        onClick={handleFetchPPP}
        color="secondary"
        fullWidth
        disabled={loading}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Click here to get latest PPP data via Worldbank api
      </Button>
    </div>
  );
}
