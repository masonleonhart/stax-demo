import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { getCompanies } from "../../../constants/companies";
import Company from "../../reusedComponents/Company.jsx";
import { Feather } from "@expo/vector-icons";

import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";

import EmptyStateView from "../../reusedComponents/EmptyStateView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../../../constants/theme";
import FilterModal from "../../modals/FilterModal";
import HeaderComponent from "../../reusedComponents/HeaderComponent";
import fonts from "../../reusedComponents/fonts";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[{ backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function Discover({}) {
  const isFocused = useIsFocused();
  const [companyList, setCompanyList] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  function RenderCompany({ company }) {
    return (
      <Company
        {...company}
        onPress={() => {
          console.log(company);
        }}
      />
    );
  }

  const onClickfilter = () => {
    setIsDialogVisible(true);
  };

  useEffect(() => {
    setCompanyList(getCompanies());
  }, []);

  if (!isFocused) {
    return <EmptyStateView />;
  }
  const SearchComponent = () => {
    return (
      <View style={styles.searchComponentMainConatainer}>
        <View style={styles.searchComponentIcon}>
          <TouchableOpacity onPress={onClickfilter}>
            <Feather name="list" size={28} color={COLORS.blue} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchComponentSearchBarView}>
          <View style={styles.searchInsileIcon}>
            <Feather name="search" size={24} color="#7c82a1" />
            <Text style={{ marginLeft: 5, color: "#7c82a1" }}>Search</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
      }}
    >
      <MyStatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
      <HeaderComponent
        mainTitle="Discover"
        subTitle="Allgned Companies"
        mainTitleStyle={styles.headerDiscoverText}
        subTitleStyle={styles.headerNameText}
        backgroundColor={COLORS.blue}
      />
      <FilterModal
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
      />
      {SearchComponent()}
      <ScrollView
        stlye={styles.companyList}
        contentContainerStyle={styles.companyListContainer}
      >
        {companyList.map((company) => (
          <RenderCompany key={company.id} company />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  companyList: {
    backgroundColor: COLORS.white,
    flex: 1
  },
  companyListContainer: {
    marginHorizontal: 16,
  },
  searchComponentMainConatainer: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    marginVertical: 10,
    alignSelf: "center",
  },
  headerDiscoverText: {
    color: COLORS.white,
    ...FONTS.h1,
    marginBottom: "5%",
  },
  headerNameText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  searchComponentIcon: {
    width: "20%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: COLORS.lightGrayBackground,
  },
  searchComponentSearchBarView: {
    width: "80%",
    backgroundColor: COLORS.lightGrayBackground,
    height: 50,
    borderRadius: 15,
    marginLeft: 5,
  },
  searchInsileIcon: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginLeft: 10,
  },
});
