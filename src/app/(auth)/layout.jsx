"use server";
import { Typography, Container, Box, Stack } from "@mui/material";
import Image from "next/image";
import NextLink from "@/components/next-link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site.consts";
import {
  layoutContainer,
  layoutContainerLeft,
  layoutContainerLeftBg,
  siteLogo,
  siteLogoStack,
  layoutContainerRight,
} from "./style";
import { routes } from "@/constants";

const AuthLayout = ({ children }) => {
  return (
    <Box sx={layoutContainer}>
      <Box sx={layoutContainerLeft}>
        <Image
          src="/images/auth-layout.webp"
          alt="A skateboarder doing a high drop"
          layout="fill"
          objectFit="cover"
          priority
        />
        <Box sx={layoutContainerLeftBg} />
        <NextLink href={routes.homePage} style={siteLogo}>
          <Stack sx={siteLogoStack}>
            <Icons.logo aria-hidden="true" />
            <Typography variant="h6">{siteConfig.name}</Typography>
          </Stack>
        </NextLink>
      </Box>
      <Container component="main" maxWidth="xs" sx={layoutContainerRight}>
        {children}
      </Container>
    </Box>
  );
};

export default AuthLayout;
