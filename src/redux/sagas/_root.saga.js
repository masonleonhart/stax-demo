import { all } from "redux-saga/effects";
import user from "./user.saga";

// Combines all of our sagas into one root saga that makes for easier access
// In the middleware

export default function* rootSaga() {
  yield all([user()]);
}
