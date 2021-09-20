import { all, takeLatest, put } from "redux-saga/effects";
import axios from "axios";

// Posts a new upc to api

function* postUpcSaga(action) {
  try {
    const response = yield axios.post(
      `http://dev.getstax.co/api/v1/new_upc`,
      action.payload,
      {
        auth: {
          username: "stax",
          password: "testpass",
        },
      }
    );

    yield put({ type: "UPC_POST_SUCCESSFUL" })
  } catch (error) {
    console.log("Error in posting new upc");
    console.log(error);

    yield put({ type: "UPC_POST_ERROR" });
  }
}

// Checks barcode type for UPC-E, if true, send barcode to upce enpoint, else, send barcode to upca endpoint

function* fetchBarcodeDataSaga(action) {
  console.log(action.payload)
  try {
    const response = yield axios.get(
      // `http://dev.getstax.co/api/v1/upc`,
      `http://192.168.0.44:5050/api/v1/upc`,
      {
        params: action.payload,
        auth: {
          username: "stax",
          password: "g3tSTAX",
        },
      }
    );
    yield put({ type: "SET_SCAN_ERROR_FALSE" });

    yield console.log(response.data);

    yield put({
      type: "SET_BARCODE_DETAILS",
      payload: response.data.products[0],
    });
  } catch (error) {
    console.log("Error in fetching barcode details");
    console.log(error);

    yield put({ type: "SET_SCAN_ERROR_TRUE" });

    yield put({ type: "RESET_BARCODE_DETAILS" });
  }
}

// Combines all of our sagas into one root saga that makes for easier access
// In the middleware

export default function* rootSaga() {
  yield takeLatest("POST_NEW_UPC", postUpcSaga);
  yield takeLatest("FETCH_BARCODE_DATA", fetchBarcodeDataSaga);
}
