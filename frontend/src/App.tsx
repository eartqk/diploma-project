import { AppShell, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <AppShell
        sx={{
          padding: "0 10px",
        }}
        fixed
        header={<Header />}
      >
        <Outlet />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
