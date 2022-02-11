import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"


import currencies from "./currencies/reducer"
import colors from "./colors/reducer"
import trait_types from "./trait_types/reducer"
import attributes from "./attributes/reducer"
import hair_coolors from "./hair_coolors/reducer"

//contacts

//accounts
// import accounts from "./accounts/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  currencies,
  colors,
  trait_types,
  hair_coolors,
  attributes,
})

export default rootReducer
