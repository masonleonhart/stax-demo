import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { AUTH_HEADER } from "@env";
import SERVER_ADDRESS from "../../../constants/server_address";
import axios from "axios";

import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { Text, IconButton, ProgressBar, useTheme } from "react-native-paper";

import { COLORS, FONTS } from "../../../constants/theme";
import MyButton from "../../reusedComponents/MyButton";

import Collapsible from "react-native-collapsible";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import fonts from "../../reusedComponents/fonts";
import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import companyImage from "../../../../assets/companyImage.jpeg";
import { determineMatchType } from "../../../constants/helpers";
import Company from "../../reusedComponents/Company";

export default function CompanyProfile({ navigation }) {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const barcodeDetails = useSelector((store) => store.barcode.barcodeDetails);
  const companyRanking = useSelector(
    (store) => store.barcode.scannedCompanyRanking
  );
  const betterMatches = useSelector(
    (store) => store.barcode.betterMatches
  );
  const betterMatchCategory = useSelector(
    (store) => store.barcode.barcodeResult
  );
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  const userValues = useSelector((store) => store.user.userInfo.values);
  const userInfo = useSelector((store) => store.user.userInfo);
  const [overallMatch, setOverallMatch] = useState("Poor");
  const [valueMatchList, setValueMatchList] = useState([]);
  const [renderMissingText, setRenderMissingText] = useState(false);

  const renderedValuesParent = useRef(null);

  const matchValuesToMStarData = (userValues) => {
    let listOfValues = [];

    for (const value of userValues) {
      let valueModified = value.name.toLowerCase().split(" ").join("_");

      if (valueModified.includes("reduced_waste")) {
        valueModified = "waste";
      } else if (valueModified.includes("respect_for_human_rights")) {
        valueModified = "human_rights";
      } else if (valueModified.includes("women_in_leadership")) {
        valueModified = "diversity";
      } else if (valueModified.includes("efficient_water_use")) {
        valueModified = "water";
      } else if (valueModified.includes("low_carbon_footprint")) {
        valueModified = "carbon_intensity";
      } else if (valueModified.includes("ethical_practices")) {
        valueModified = "business_ethics";
      }

      const valuePercentage = companyRanking[`${valueModified}_pct_rank`];

      const valuePercentageRounded = Number(
        parseFloat(valuePercentage).toFixed(2)
      );

      listOfValues.push({ ...value, valuePercentageRounded });
    }

    setValueMatchList(listOfValues);
  };

  const getApiURL = ({ filter }) => {
    let url = `${SERVER_ADDRESS}/api/v1/search?size=4`;
    if (filter) {
      url = url + `&filter=${filter}`;
    }
    return url;
  }

  const getCompanyList = async () => {
    try {
      const response = await axios.get(getApiURL(
        {
          filter: betterMatchCategory.category_level_3,
        }
      ), {
        headers: { [AUTH_HEADER]: accessToken },
      });

      const repeatationCompanyIndex = response.data.findIndex((Object) =>
        companyRanking.entity_id === Object.entity_id
      );
      response.data.splice(repeatationCompanyIndex, 1)


      dispatch({
        type: "SET_MATCHING_COMPANY_LIST",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyList()
    if ("values_match_score" in companyRanking) {
      matchValuesToMStarData(userValues);

      setOverallMatch(determineMatchType(companyRanking.values_match_score));
    } else {
      setOverallMatch("Poor");

      setValueMatchList(userValues);

      Alert.alert(
        "Error",
        "Unable to match company to parent, no parent data available."
      );
    }
  }, [companyRanking]);

  useEffect(() => {
    if (
      renderedValuesParent.current !== null &&
      renderedValuesParent.current["_children"].length !== userValues.length
    ) {
      setRenderMissingText(true);
    } else {
      setRenderMissingText(false);
    }
  }, [renderedValuesParent.current]);

  const RenderValue = ({ value }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <View style={styles.valueWrapper}>
        <View style={SharedStyles.flexRow}>
          <View style={styles.valueNameWrapper}>
            <MaterialCommunityIcons
              name={value.icon_name}
              color={myTheme.colors.blue}
              size={30}
            />
            <Text style={styles.valueName}>{value.name}</Text>
          </View>
          <IconButton
            icon={isCollapsed ? "chevron-down" : "chevron-up"}
            size={30}
            color={myTheme.colors.blue}
            onPress={() => setIsCollapsed(!isCollapsed)}
          />
        </View>
        <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
          <Text style={styles.progressText}>
            {(value.valuePercentageRounded * 100).toFixed(0)}%
          </Text>
          <ProgressBar
            progress={value.valuePercentageRounded}
            color={myTheme.colors.blue}
            style={styles.progressBar}
          />
        </View>
        <Collapsible collapsed={isCollapsed}>
          <Text style={styles.collapsedText}>
            <Text style={styles.collapsedTextBold}>
              {barcodeDetails.manufacturer}
            </Text>
            , owned by{" "}
            <Text style={styles.collapsedTextBold}>{companyRanking.name}</Text>,
            scored better than{" "}
            <Text style={styles.collapsedTextBold}>
              {(value.valuePercentageRounded * 100).toFixed(0)}%
            </Text>{" "}
            of its peers within its industry in the{" "}
            <Text style={styles.collapsedTextBold}>{value.name}</Text> category.
          </Text>
        </Collapsible>
      </View>
    );
  };

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
      fontFamily: fonts.medium,
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
      borderBottomColor: myTheme.colors.lightGrey,
      borderBottomWidth: 1,
      paddingBottom: "5%",
    },
    overallMatch: {
      fontSize: 18,
      fontFamily: fonts.medium,
    },
    valueWrapper: {
      borderBottomColor: myTheme.colors.lightGrey,
      borderBottomWidth: 1,
      paddingBottom: "5%",
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
    progressText: {
      fontSize: 16,
      fontFamily: fonts.medium,
    },
    progressBar: {
      width: windowWidth * 0.7,
    },
    collapsedText: {
      fontSize: 16,
      flexWrap: "wrap",
      fontFamily: fonts.regular,
    },
    collapsedTextBold: {
      fontFamily: fonts.bold,
    },
    matchValue: {
      fontSize: 18,
      fontFamily: fonts.bold,
      color: myTheme.colors.blue,
    },
    missingValuesText: {
      marginVertical: "5%",
      fontFamily: fonts.regular,
      textAlign: "center",
      color: myTheme.colors.grey,
    },
    discoverButtonLabel: {
      color: myTheme.colors.grey,
    },
    discoverButton: {
      marginTop: "0%",
      marginBottom: "0%",
    },
    companyList: {
      backgroundColor: COLORS.white,
      flex: 1,
    },
    companyListContainer: {
      marginHorizontal: 5,
      marginTop: -15,
    },
    companyListWrapper: {
      height: "100%",
      flex: 1,
    }
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

          <View ref={renderedValuesParent}>
            {valueMatchList.map((value) => {
              if (value.valuePercentageRounded) {
                return <RenderValue key={value.id} value={value} />;
              }
            })}
          </View>

          {renderMissingText && (
            <Text style={styles.missingValuesText}>
              Not seeing all of the data you were expecting? Not all companies
              reports every metric. Any missing value is due to there being no
              data available.
            </Text>
          )}
        </View>

        <View style={styles.companyListWrapper}>
          {(betterMatches?.length !== 0) && (<Text style={styles.sectionHeaderText}>Better matches:</Text>)}
          <FlatList
            scrollEnabled='false'
            contentContainerStyle={styles.companyListContainer}
            data={betterMatches}
            keyExtractor={(item, index) => item.name + "_" + index}
            renderItem={({ item }) => {
              return (
                <Company
                  {...item}
                  name={item.brand}
                  values_match_score={item?.company?.values_match_score}
                  industry={item.category_level_3}
                  parent_logo_image={item.company?.parent_logo_image}
                  companyRanking={item?.company}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>

        <MyButton
          disabled={true}
          text="Discover Better Aligned Companies (WIP)"
          style={styles.discoverButton}
          labelStyle={styles.discoverButtonLabel}
          buttonColor={"#e3e3e3"}
        />

        <MyButton
          onPress={() =>
            navigation.navigate("ReportProductForm", {
              screen: "report",
              companyRanking,
              barcodeDetails,
            })
          }
          text="Report This Product"
          buttonColor={myTheme.colors.red}
        />
      </View>
    </ScrollView>
  );
}
