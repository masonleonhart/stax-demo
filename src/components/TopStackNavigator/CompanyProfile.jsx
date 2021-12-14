import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Text, IconButton, ProgressBar, useTheme } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

import Collapsible from "react-native-collapsible";

import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function CompanyProfile({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const companyDetails = useSelector((store) => store.barcode.barcodeDetails);
  const userValues = useSelector((store) => store.user.values);
  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isCollapsed3, setIsCollapsed3] = useState(true);
  const [isCollapsed4, setIsCollapsed4] = useState(true);
  const [isCollapsed5, setIsCollapsed5] = useState(true);

  const styles = StyleSheet.create({
    companyHeader: {
      marginVertical: "5%",
      alignItems: "center",
      paddingBottom: "5%",
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
    },
    comapnyName: {
      color: myTheme.colors.green,
      fontSize: 24,
      fontWeight: "500",
      textAlign: "center",
    },
    sectionWrapper: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      marginBottom: "5%",
    },
    sectionHeaderText: {
      color: myTheme.colors.green,
      fontSize: 20,
      fontWeight: "500",
      marginBottom: "5%",
    },
    sectionText: {
      fontSize: 18,
      marginVertical: "5%",
      fontWeight: "500",
    },
    progressText: {
      fontSize: 16,
    },
    progressBar: {
      width: windowWidth * 0.7,
    },
    overallMatchWrapper: {
      marginVertical: "5%",
    },
    overallMatch: {
      fontSize: 18,
      fontWeight: "500",
    },
    matchValue: {
      fontSize: 18,
      fontWeight: "500",
      color: myTheme.colors.green,
    },
    collapsedText: {
      fontSize: 16,
      flexWrap: "wrap",
    },
    storeHeaderText: {
      color: myTheme.colors.green,
      fontSize: 20,
      fontWeight: "500",
      marginTop: "5%",
    },
    myButton: {
      marginBottom: "10%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={SharedStyles.container}>
      <View style={styles.companyHeader}>
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

      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionHeaderText}>Match to My Values</Text>
        <View style={[SharedStyles.flexRow, styles.overallMatchWrapper]}>
          <Text style={styles.overallMatch}>Overall Match:</Text>
          <Text style={styles.matchValue}>Poor</Text>
        </View>

        <View style={SharedStyles.flexRow}>
          <Text style={styles.sectionText}>{userValues[0].name}</Text>
          <IconButton
            icon={isCollapsed1 ? "chevron-down" : "chevron-up"}
            size={30}
            color={myTheme.colors.green}
            onPress={() => setIsCollapsed1(!isCollapsed1)}
          />
        </View>
        <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
          <Text style={styles.progressText}>20%</Text>
          <ProgressBar
            progress={0.2}
            color={myTheme.colors.blue}
            style={styles.progressBar}
          />
        </View>
        <Collapsible collapsed={isCollapsed1} style={styles.collapsible}>
          <Text style={styles.collapsedText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
            vitae justo ac molestie. Suspendisse eu arcu metus. Lorem ipsum.
          </Text>
        </Collapsible>

        <View style={SharedStyles.flexRow}>
          <Text style={styles.sectionText}>{userValues[1].name}</Text>
          <IconButton
            icon={isCollapsed2 ? "chevron-down" : "chevron-up"}
            size={30}
            color={myTheme.colors.green}
            onPress={() => setIsCollapsed2(!isCollapsed2)}
          />
        </View>
        <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
          <Text style={styles.progressText}>15%</Text>
          <ProgressBar
            progress={0.15}
            color={myTheme.colors.blue}
            style={styles.progressBar}
          />
        </View>
        <Collapsible collapsed={isCollapsed2} style={styles.collapsible}>
          <Text style={styles.collapsedText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
            vitae justo ac molestie. Suspendisse eu arcu metus. Lorem ipsum.
          </Text>
        </Collapsible>

        <View style={SharedStyles.flexRow}>
          <Text style={styles.sectionText}>{userValues[2].name}</Text>
          <IconButton
            icon={isCollapsed3 ? "chevron-down" : "chevron-up"}
            size={30}
            color={myTheme.colors.green}
            onPress={() => setIsCollapsed3(!isCollapsed3)}
          />
        </View>
        <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
          <Text style={styles.progressText}>25%</Text>
          <ProgressBar
            progress={0.25}
            color={myTheme.colors.blue}
            style={styles.progressBar}
          />
        </View>
        <Collapsible collapsed={isCollapsed3} style={styles.collapsible}>
          <Text style={styles.collapsedText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
            vitae justo ac molestie. Suspendisse eu arcu metus. Lorem ipsum.
          </Text>
        </Collapsible>

        <View style={SharedStyles.flexRow}>
          <Text style={styles.sectionText}>{userValues[3].name}</Text>
          <IconButton
            icon={isCollapsed4 ? "chevron-down" : "chevron-up"}
            size={30}
            color={myTheme.colors.green}
            onPress={() => setIsCollapsed4(!isCollapsed4)}
          />
        </View>
        <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
          <Text style={styles.progressText}>10%</Text>
          <ProgressBar
            progress={0.1}
            color={myTheme.colors.blue}
            style={styles.progressBar}
          />
        </View>
        <Collapsible collapsed={isCollapsed4} style={styles.collapsible}>
          <Text style={styles.collapsedText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
            vitae justo ac molestie. Suspendisse eu arcu metus. Lorem ipsum.
          </Text>
        </Collapsible>

        <View style={SharedStyles.flexRow}>
          <Text style={styles.sectionText}>{userValues[4].name}</Text>
          <IconButton
            icon={isCollapsed5 ? "chevron-down" : "chevron-up"}
            size={30}
            color={myTheme.colors.green}
            onPress={() => setIsCollapsed5(!isCollapsed5)}
          />
        </View>
        <View style={[SharedStyles.flexRow, { marginBottom: "5%" }]}>
          <Text style={styles.progressText}>30%</Text>
          <ProgressBar
            progress={0.3}
            color={myTheme.colors.blue}
            style={styles.progressBar}
          />
        </View>
        <Collapsible collapsed={isCollapsed5} style={styles.collapsible}>
          <Text style={styles.collapsedText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor
            vitae justo ac molestie. Suspendisse eu arcu metus. Lorem ipsum.
          </Text>
        </Collapsible>

        <MyButton
          onPress={() => navigation.navigate("Landing")}
          text="Discover Better Aligned Companies"
          style={styles.myButton}
        />
      </View>
    </ScrollView>
  );
}
