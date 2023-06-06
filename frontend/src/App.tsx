import { AppShell, Box, MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import sciLinkApi from "./store/sciLinkApi";

function App() {
  const { data, isError } = sciLinkApi.useGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("login");
    }
  }, [isError]);

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        globalStyles: (theme) => ({
        
        }),
      }}
    >
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
