import React from "react"
import { Redirect } from "react-router-dom"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import Dashboard from "../pages/Dashboard/index"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"
import colorsList from "../pages/Colors/colors-list"
import attributesList from "pages/Attributes/attributes-list"
import trait_typesList from "pages/Trait_types/trait_types-list"
import hair_coolorsList from "pages/Hair_coolors/hair_coolors-list"
import attributesProfile from "pages/Attributes/attributes-profile"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/colors", component: colorsList },
  { path: "/trait_types", component: trait_typesList },
  { path: "/attributes/:_id", component: attributesList },
  { path: "/attributes/:_id/:attribute_id", component: attributesProfile },
  { path: "/hair_coolors", component: hair_coolorsList },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },
]

export { userRoutes, authRoutes }
