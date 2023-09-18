import { lazy } from "react";

const SignupPage = lazy(() => import("@/pages/PageSignup"));
const SigninPage = lazy(() => import("@/pages/PageSignin"));
const HomePage = lazy(() => import("@/pages/PageHome"));

export const AUTH_ROUTES = [
  { path: "/signup", component: SignupPage, redirectComponent: HomePage },
  { path: "/signin", component: SigninPage, redirectComponent: HomePage },
];
