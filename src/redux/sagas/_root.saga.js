import { all, takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* fetchBarcodeDataSaga(action) {
  try {
    const response = yield axios.get(
      `http://dev.getstax.co/api/v1/upc/${action.payload}`,
      {
        auth: {
          username: "stax",
          password: "testpass",
        },
      }
    );
    yield put({
      type: "SET_BARCODE_DETAILS",
      payload: response.data.products[0],
    });
  } catch (error) {
    console.log("Error in fetching barcode details", error);
  }
}

// Combines all of our sagas into one root saga that makes for easier access
// In the middleware

export default function* rootSaga() {
  yield takeLatest("FETCH_BARCODE_DATA", fetchBarcodeDataSaga);
}
