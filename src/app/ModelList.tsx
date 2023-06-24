"use client";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

export default function ModelList({ modelStats }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3">Your Models</Typography>
      {modelStats.map(({ name, count }) => (
        <Box sx={{ my: 2 }}>
          <Button href={`/model/${name}`} component={Link} variant="outlined">
            {name} ({count})
          </Button>
        </Box>
      ))}
    </Box>
  );
}
