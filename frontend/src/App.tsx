import { AppShell, Box, MantineProvider } from "@mantine/core";
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
        <Box sx={{ margin: "auto", maxWidth: "1200px" }}>
          <Outlet />
        </Box>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
