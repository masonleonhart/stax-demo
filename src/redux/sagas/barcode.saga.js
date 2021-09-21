import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import config from "./server.config";

// Posts a new upc to api

function* postUpcSaga(action) {
  try {
    const response = yield axios.post(
      `${config.serverAddress}/api/v1/new_upc`,
      action.payload,
      {
        auth: {
          username: "stax",
          password: "testpass",
        },
      }
    );

    yield put({ type: "UPC_POST_SUCCESSFUL" });
  } catch (error) {
    console.log("Error in posting new upc");
    console.log(error);

    yield put({ type: "UPC_POST_ERROR" });
  }
}

// Combines all of our redcuers to be exported to _root.saga

export default function* barcodeSaga() {
  yield takeLatest("POST_NEW_UPC", postUpcSaga);
}
