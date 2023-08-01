"use client";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextField,
  Box,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

import {
  formBoxStyles,
  containerStyle,
  fullwidthStyles,
  dividerStyle,
} from "./styles";
import NextLink from "@/components/next-link";
import { siteConfig } from "@/config/site.consts";

const AuthForm = ({ submitHandler, isSignin }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    name: yup.string(),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    submitHandler(data);
  };

  return (
    <Container sx={containerStyle}>
      <Typography variant="h4" gutterBottom>
        {isSignin ? "Sign In" : "Sign Up"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color={"text.secondary"}>
        Choose your preferred {isSignin ? "sign in" : "sign up"} method.
      </Typography>
      <Box paddingY={2} sx={fullwidthStyles}>
        <GoogleButton
          onClick={async () =>
            await signIn("google", { callbackUrl: siteConfig.devHomeUrl })
          }
          style={fullwidthStyles}
        />
      </Box>
      <Divider sx={dividerStyle}>OR CONTINUE WITH</Divider>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={formBoxStyles}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          {isSignin ? "Sign In" : "Sign up"}
        </Button>
      </Box>
      <Typography variant="subtitle1" gutterBottom color={"text.secondary"}>
        {isSignin ? (
          <>
            Don't have an account?{" "}
            <NextLink href="/signup" style={{ color: "black" }}>
              Sign up
            </NextLink>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <NextLink href="/signin" style={{ color: "black" }}>
              Sign in
            </NextLink>
          </>
        )}
      </Typography>
    </Container>
  );
};

export default AuthForm;
