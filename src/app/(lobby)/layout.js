import SiteHeader from "@/components/layouts/site-header";
import { Container, Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <SiteHeader />
      <Container maxWidth="xl">
        <Box paddingTop={4}>{children}</Box>
      </Container>
    </>
  );
}
