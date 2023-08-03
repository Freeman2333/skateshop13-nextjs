import SiteHeader from "@/components/layouts/site-header";
import { Container, Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/auth";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect("/signin");

  return (
    <>
      <SiteHeader />
      <Container maxWidth="xl">
        <Box paddingTop={4}>{children}</Box>
      </Container>
    </>
  );
}
