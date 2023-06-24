"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
