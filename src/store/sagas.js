import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import currenciesSaga from "./currencies/saga"
import colorsSaga from "./colors/saga"
import trait_typesSaga from "./trait_types/saga"
import attributesSaga from "./attributes/saga"

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    fork(currenciesSaga),
    fork(colorsSaga),
    fork(trait_typesSaga),
    fork(attributesSaga),
  ])
}
