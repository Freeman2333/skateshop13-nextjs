import SiteHeader from "@/components/layouts/site-header";
import { Container, Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/lib/auth";
import { routes } from "@/constants";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect(routes.signIn);

  return (
    <>
      <SiteHeader />
      <Container maxWidth="xl">
        <Box paddingY={4}>{children}</Box>
      </Container>
    </>
  );
}
