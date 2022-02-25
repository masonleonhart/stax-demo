import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { Text, IconButton, ProgressBar, useTheme } from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";

import Collapsible from "react-native-collapsible";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import fonts from "../../reusedComponents/fonts";
import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import companyImage from "../../../../assets/companyImage.jpeg";

export default function CompanyProfile({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const barcodeDetails = useSelector((store) => store.barcode.barcodeDetails);
  const companyRanking = useSelector(
    (store) => store.barcode.scannedCompanyRanking
  );
  const userValues = useSelector((store) => store.user.userInfo.values);
  const userInfo = useSelector((store) => store.user.userInfo);
  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isCollapsed3, setIsCollapsed3] = useState(true);
  const [isCollapsed4, setIsCollapsed4] = useState(true);
  const [isCollapsed5, setIsCollapsed5] = useState(true);

  const [overallMatch, setOverallMatch] = useState("Poor");

  const [matchToValues, setMatchToValues] = useState([]);

  const determineMatchType = (zscore) => {
    if (zscore <= -2) {
      return "Terrible";
    } else if (zscore > -2 && zscore <= -1) {
      return "Poor";
    } else if (zscore > -1 && zscore < 1) {
      return "Average";
    } else if (zscore >= 1 && zscore < 2) {
      return "Good";
    } else if (zscore >= 2) {
      return "Excelent";
    }
  };

  const matchValuesToMStarData = (userValues) => {
    let listOfValues = [];

    for (const value of userValues) {
      let valueModified = value.name.toLowerCase().split(" ").join("_");

      if (valueModified.includes("reduced_waste")) {
        valueModified = "waste";
      } else if (valueModified.includes("respect_to_human_rights")) {
        valueModified = "human_rights";
      } else if (valueModified.includes("diverse_leadership")) {
        valueModified = "diversity";
      } else if (valueModified.includes("efficient_water_use")) {
        valueModified = "water";
      } else if (valueModified.includes("low_carbon_footprint")) {
        valueModified = "carbon_intensity";
      }

      const valueZscore = companyRanking[`${valueModified}_zscore`];

      const matchScore =
        valueZscore !== "nan" ? determineMatchType(valueZscore) : "No Data";

      listOfValues.push({ ...value, matchScore });
    }

    setMatchToValues(listOfValues);
  };

  useEffect(() => {
    if ("values_match_score" in companyRanking) {
      matchValuesToMStarData(userValues);

      setOverallMatch(determineMatchType(companyRanking.values_match_score));
    } else {
      setOverallMatch("Poor");

      setMatchToValues(userValues);

      Alert.alert(
        "Error",
        "Unable to match company to parent, no parent data available."
      );
    }
  }, [isFocused]);

  const RenderValue = ({ value }) => (
    <>
      <View style={styles.valueNameWrapper}>
        <MaterialCommunityIcons
          name={value.icon_name}
          color={myTheme.colors.blue}
          size={30}
        />
        <Text style={styles.valueName}>{value.name}</Text>
      </View>
      <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
        <Text style={styles.overallMatch}>Match to Value:</Text>
        <Text style={styles.matchValue}>{value.matchScore}</Text>
      </View>
    </>
  );

  const styles = StyleSheet.create({
    companyHeader: {
      backgroundColor: "#f36676",
      height: deviceHeight * 0.25,
      paddingTop: "5%",
      marginBottom: "5%",
      justifyContent: "center",
    },
    imagesWrapper: {
      flexDirection: "row",
      justifyContent: "center",
    },
    companyImage: {
      height: deviceHeight * 0.1,
      width: deviceHeight * 0.1,
      borderRadius: 100,
      left: 20,
    },
    userImage: {
      height: deviceHeight * 0.1,
      width: deviceHeight * 0.1,
      borderRadius: 100,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    userInitials: {
      fontFamily: fonts.bold,
      fontSize: 40,
      color: "#404040",
    },
    comapnyName: {
      color: "white",
      fontSize: 20,
      fontFamily: fonts.regular,
      textAlign: "center",
      marginTop: "2.5%",
    },
    parentName: {
      color: "white",
      fontSize: 24,
      fontFamily: fonts.bold,
      textAlign: "center",
    },
    sectionWrapper: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      marginBottom: "5%",
    },
    sectionHeaderText: {
      color: myTheme.colors.grey,
      fontSize: 20,
      fontFamily: fonts.bold,
      marginBottom: "5%",
    },
    overallMatchWrapper: {
      marginVertical: "5%",
    },
    overallMatch: {
      fontSize: 18,
      fontFamily: fonts.medium,
    },
    valueNameWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    valueName: {
      fontSize: 18,
      marginVertical: "5%",
      marginLeft: "5%",
      fontFamily: fonts.bold,
    },
    matchValue: {
      fontSize: 18,
      fontFamily: fonts.bold,
      color: myTheme.colors.blue,
    },
    wipText: {
      textAlign: "center",
      fontFamily: fonts.regular,
      color: myTheme.colors.grey,
    },
    myButton: {
      marginBottom: "0.2%",
    },
    myButtonLabel: {
      color: "black"
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView>
      <View style={styles.companyHeader}>
        <View style={styles.imagesWrapper}>
          <Image
            source={companyImage}
            style={styles.companyImage}
            resizeMode="contain"
          />
          <View style={styles.userImage}>
            <Text style={styles.userInitials}>
              {userInfo?.first_name[0]}
              {userInfo?.last_name[0]}
            </Text>
          </View>
        </View>
        <Text style={styles.comapnyName}>
          {barcodeDetails.manufacturer
            ? barcodeDetails.manufacturer
            : barcodeDetails.brand
            ? barcodeDetails.brand
            : barcodeDetails.title
            ? barcodeDetails.title
            : "Company Profile"}
        </Text>
        {"name" in companyRanking && (
          <Text style={styles.parentName}>Owned By: {companyRanking.name}</Text>
        )}
      </View>

      <View style={SharedStyles.container}>
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionHeaderText}>Match to My Values</Text>
          <View style={[SharedStyles.flexRow, styles.overallMatchWrapper]}>
            <Text style={styles.overallMatch}>Overall Match:</Text>
            <Text style={styles.matchValue}>{overallMatch}</Text>
          </View>

          <Text style={styles.wipText}>(More defined match score is WIP)</Text>

          {matchToValues.map((value) => (
            <RenderValue key={value.id} value={value} />
          ))}

          <MyButton
            disabled={true}
            text="Discover Better Aligned Companies (WIP)"
            style={styles.myButton}
            labelStyle={styles.myButtonLabel}
            buttonColor={"#e3e3e3"}
          />
          <MyButton
            onPress={() =>
              navigation.navigate("ReportProductForm", { name: "report" })
            }
            text="Report This Product"
            labelStyle={styles.myButtonLabel}
            buttonColor={myTheme.colors.red}
          />
        </View>
      </View>
    </ScrollView>
  );
}
