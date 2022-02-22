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
  const companyDetails = useSelector((store) => store.barcode.barcodeDetails);
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

  useEffect(() => {
    if ("values_match_score" in companyRanking) {
      setOverallMatch(determineMatchType(companyRanking.values_match_score));
    } else {
      setOverallMatch("Poor");

      Alert.alert(
        "Error",
        "Unable to match company to parent, no parent data available."
      );
    }
  }, [isFocused]);

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
      height: deviceHeight * 0.125,
      width: deviceHeight * 0.125,
      borderRadius: 100,
      left: 20,
    },
    userImage: {
      height: deviceHeight * 0.125,
      width: deviceHeight * 0.125,
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
      fontSize: 24,
      fontFamily: fonts.bold,
      textAlign: "center",
      marginTop: "2.5%",
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
    sectionText: {
      fontSize: 18,
      marginVertical: "5%",
      marginLeft: "5%",
      fontFamily: fonts.bold,
    },
    progressText: {
      fontSize: 16,
      fontFamily: fonts.medium,
    },
    progressBar: {
      width: windowWidth * 0.7,
    },
    overallMatchWrapper: {
      marginVertical: "5%",
    },
    overallMatch: {
      fontSize: 18,
      fontFamily: fonts.medium,
    },
    matchValue: {
      fontSize: 18,
      fontFamily: fonts.bold,
      color: myTheme.colors.blue,
    },
    wipText: {
      textAlign: "center",
      fontFamily: fonts.regular,
      color: myTheme.colors.grey
    },
    collapsedText: {
      fontSize: 16,
      flexWrap: "wrap",
      fontFamily: fonts.regular,
    },
    myButton: {
      marginBottom: "0.2%",
    },
    myButtonLabel: {
      color: myTheme.colors.grey,
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
          {companyDetails.manufacturer
            ? companyDetails.manufacturer
            : companyDetails.brand
              ? companyDetails.brand
              : companyDetails.title
                ? companyDetails.title
                : "Company Profile"}
        </Text>
      </View>

      <View style={SharedStyles.container}>
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionHeaderText}>Match to My Values</Text>
          <View style={[SharedStyles.flexRow, styles.overallMatchWrapper]}>
            <Text style={styles.overallMatch}>Overall Match:</Text>
            <Text style={styles.matchValue}>{overallMatch}</Text>
          </View>

          <Text style={styles.wipText}>(More defined match score is WIP)</Text>

          <View style={SharedStyles.flexRow}>
            <View style={SharedStyles.flexRow}>
              <MaterialCommunityIcons
                name={userValues[0]?.icon_name}
                color={myTheme.colors.blue}
                size={30}
              />
              <Text style={styles.sectionText}>{userValues[0]?.name}</Text>
            </View>
            <IconButton
              icon={isCollapsed1 ? "chevron-down" : "chevron-up"}
              size={30}
              color={myTheme.colors.grey}
              onPress={() => setIsCollapsed1(!isCollapsed1)}
            />
          </View>
          <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
            <Text style={styles.progressText}>{companyRanking?.care_for_workers_1 != "Not found" ?
              parseFloat(companyRanking?.care_for_workers_1) * 100 + '%' : "NA"}</Text>
            <ProgressBar
              progress={companyRanking?.care_for_workers_1 != "Not found" ? parseFloat(companyRanking?.care_for_workers_1) : 0}
              color={myTheme.colors.grey}
              style={styles.progressBar}
            />
          </View>
          <Collapsible collapsed={isCollapsed1} style={styles.collapsible}>
            <Text style={styles.collapsedText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              tempor vitae justo ac molestie. Suspendisse eu arcu metus. Lorem
              ipsum.
            </Text>
          </Collapsible>

          <View style={SharedStyles.flexRow}>
            <View style={SharedStyles.flexRow}>
              <MaterialCommunityIcons
                name={userValues[1].icon_name}
                color={myTheme.colors.blue}
                size={30}
              />
              <Text style={styles.sectionText}>{userValues[1].name}</Text>
            </View>
            <IconButton
              icon={isCollapsed2 ? "chevron-down" : "chevron-up"}
              size={30}
              color={myTheme.colors.grey}
              onPress={() => setIsCollapsed2(!isCollapsed2)}
            />
          </View>
          <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
            <Text style={styles.progressText}>{companyRanking?.business_ethics_1 != "Not found" ?
              parseFloat(companyRanking?.business_ethics_1) * 100 + '%' : "NA"}</Text>
            <ProgressBar
              progress={companyRanking?.business_ethics_1 != "Not found" ? parseFloat(companyRanking?.business_ethics_1) : 0}
              color={myTheme.colors.grey}
              style={styles.progressBar}
            />
          </View>
          <Collapsible collapsed={isCollapsed2} style={styles.collapsible}>
            <Text style={styles.collapsedText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              tempor vitae justo ac molestie. Suspendisse eu arcu metus. Lorem
              ipsum.
            </Text>
          </Collapsible>

          <View style={SharedStyles.flexRow}>
            <View style={SharedStyles.flexRow}>
              <MaterialCommunityIcons
                name={userValues[2].icon_name}
                color={myTheme.colors.blue}
                size={30}
              />
              <Text style={styles.sectionText}>{userValues[2].name}</Text>
            </View>
            <IconButton
              icon={isCollapsed3 ? "chevron-down" : "chevron-up"}
              size={30}
              color={myTheme.colors.grey}
              onPress={() => setIsCollapsed3(!isCollapsed3)}
            />
          </View>
          <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
            <Text style={styles.progressText}>{companyRanking?.waste_1 != "Not found" ?
              parseFloat(companyRanking?.waste_1) * 10 + '%' : "NA"}</Text>
            <ProgressBar
              progress={companyRanking?.waste_1 != "Not found" ? parseFloat(companyRanking?.waste_1) / 10 : 0}
              color={myTheme.colors.grey}
              style={styles.progressBar}
            />
          </View>
          <Collapsible collapsed={isCollapsed3} style={styles.collapsible}>
            <Text style={styles.collapsedText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              tempor vitae justo ac molestie. Suspendisse eu arcu metus. Lorem
              ipsum.
            </Text>
          </Collapsible>

          <View style={SharedStyles.flexRow}>
            <View style={SharedStyles.flexRow}>
              <MaterialCommunityIcons
                name={userValues[3].icon_name}
                color={myTheme.colors.blue}
                size={30}
              />
              <Text style={styles.sectionText}>{userValues[3].name}</Text>
            </View>
            <IconButton
              icon={isCollapsed4 ? "chevron-down" : "chevron-up"}
              size={30}
              color={myTheme.colors.grey}
              onPress={() => setIsCollapsed4(!isCollapsed4)}
            />
          </View>
          <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
            <Text style={styles.progressText}>{companyRanking?.human_rights_1 != "Not found" ?
              parseFloat(companyRanking?.human_rights_1) * 10 + '%' : "NA"}</Text>
            <ProgressBar
              progress={companyRanking?.human_rights_1 != "Not found" ? parseFloat(companyRanking?.human_rights_1) / 10 : 0}
              color={myTheme.colors.grey}
              style={styles.progressBar}
            />
          </View>
          <Collapsible collapsed={isCollapsed4} style={styles.collapsible}>
            <Text style={styles.collapsedText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              tempor vitae justo ac molestie. Suspendisse eu arcu metus. Lorem
              ipsum.
            </Text>
          </Collapsible>

          <View style={SharedStyles.flexRow}>
            <View style={SharedStyles.flexRow}>
              <MaterialCommunityIcons
                name={userValues[4].icon_name}
                color={myTheme.colors.blue}
                size={30}
              />
              <Text style={styles.sectionText}>{userValues[4].name}</Text>
            </View>
            <IconButton
              icon={isCollapsed5 ? "chevron-down" : "chevron-up"}
              size={30}
              color={myTheme.colors.grey}
              onPress={() => setIsCollapsed5(!isCollapsed5)}
            />
          </View>
          <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
            <Text style={styles.progressText}>{companyRanking?.diversity_1 != "Not found" ?
              parseFloat(companyRanking?.diversity_1) + '%' : "NA"}</Text>
            <ProgressBar
              progress={companyRanking?.diversity_1 != "Not found" ? parseFloat(companyRanking?.diversity_1) / 100 : 0}
              color={myTheme.colors.grey}
              style={styles.progressBar}
            />
          </View>
          <Collapsible collapsed={isCollapsed5} style={styles.collapsible}>
            <Text style={styles.collapsedText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              tempor vitae justo ac molestie. Suspendisse eu arcu metus. Lorem
              ipsum.
            </Text>
          </Collapsible>

          <MyButton
            disabled={true}
            text="Discover Better Aligned Companies (WIP)"
            style={styles.myButton}
            labelStyle={styles.myButtonLabel}
            buttonColor={"#e3e3e3"}
          />
          <MyButton
            onPress={() => navigation.navigate("ReportProductForm", { name: "report" })}
            text="Report This Product"
            labelStyle={styles.myButtonLabel}
            buttonColor={myTheme.colors.red}
          />
        </View>
      </View>
    </ScrollView>
  );
}
