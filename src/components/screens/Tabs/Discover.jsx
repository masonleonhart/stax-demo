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
  Button,
} from "react-native";
import { Text } from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../../../constants/theme";
import HeaderComponent from "../../reusedComponents/HeaderComponent";
import fonts from "../../reusedComponents/fonts";
import { NavigationContainer } from "@react-navigation/native";
import FilterStack from "../../navigation/FilterStack";
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[{ backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function Discover({}) {
  const isFocused = useIsFocused();
  const [companyList, setCompanyList] = useState([]);
  let navigation;
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <FilterStack navigation={props.navigation} />
      </DrawerContentScrollView>
    );
  }
  const Drawer = createDrawerNavigator();
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

  useEffect(() => {
    setCompanyList(getCompanies());
  }, []);

  if (!isFocused) {
    return <EmptyStateView />;
  }
  function DiscoverUi({ navigation }) {
    navigation = navigation;
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
        }}>
        <MyStatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
        <HeaderComponent
          mainTitle="Discover"
          subTitle="Allgned Companies"
          mainTitleStyle={styles.headerDiscoverText}
          subTitleStyle={styles.headerNameText}
          backgroundColor={COLORS.blue}
        />

        <View style={styles.searchComponentMainConatainer}>
          <View style={styles.searchComponentIcon}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
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
        <ScrollView
          stlye={styles.companyList}
          contentContainerStyle={styles.companyListContainer}>
          {companyList.map((company) => (
            <RenderCompany key={company.id} company />
          ))}
        </ScrollView>
      </View>
    );
  }
  function MyDrawer() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Discover"
          component={DiscoverUi}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  companyList: {
    backgroundColor: COLORS.white,
    flex: 1,
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
