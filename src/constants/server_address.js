import { PROD_SERVER_ADDRESS, DEV_SERVER_ADDRESS } from "@env";
import Constants from "expo-constants";

let SERVER_ADDRESS;

if (Constants.appOwnership === "expo") {
  SERVER_ADDRESS = DEV_SERVER_ADDRESS;
} else {
  SERVER_ADDRESS = PROD_SERVER_ADDRESS;
}

export default SERVER_ADDRESS;
