import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import Company from "../../reusedComponents/Company.jsx";
import { Feather, Ionicons } from "@expo/vector-icons";
import { AUTH_HEADER } from "@env";
import SERVER_ADDRESS from "../../../constants/server_address";
import axios from "axios";

import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { Text } from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../../../constants/theme";
import HeaderComponent from "../../reusedComponents/HeaderComponent";
import fonts from "../../reusedComponents/fonts";
import { NavigationContainer } from "@react-navigation/native";
import FilterStack from "../../navigation/FilterStack";
import { useDispatch, useSelector } from "react-redux";
import ActivityModal from "../../modals/ActivityModal";
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[{ backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default function Discover() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const discoverState = useSelector(
    (store) => store.discover.discoverCompaniesListState
  );
  const appliedFilter = discoverState.appliedFilter ?? "";
  const companyList = discoverState.companyList ?? [];
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <FilterStack navigation={props.navigation} />
      </DrawerContentScrollView>
    );
  }
  const Drawer = createDrawerNavigator();

  const getCompanyList = async () => {
    try {
      dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING" });
      const response = await axios.get(
        `${SERVER_ADDRESS}/api/v1/search?filter=${appliedFilter}&page=${
          discoverState.page ?? 0
        }&size=20`,
        { headers: { [AUTH_HEADER]: accessToken } }
      );
      dispatch({
        type: "SET_DISCOVER_COMPANY_LIST",
        payload: [...(discoverState?.companyList ?? []), ...response.data],
      });
      // console.log(response.data.map((c) => c.name));
      // setLis((old) => old.concat(response.data));
    } catch (error) {
      dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING_STOP" });
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, [appliedFilter, discoverState.page]);

  if (!isFocused) {
    return <EmptyStateView />;
  }
  function DiscoverUi({ navigation }) {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
        }}
      >
        <MyStatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
        <HeaderComponent
          mainTitle="Discover"
          subTitle="Aligned Companies"
          mainTitleStyle={styles.headerDiscoverText}
          subTitleStyle={styles.headerNameText}
          backgroundColor={COLORS.blue}
        />

        <View style={styles.searchComponentMainConatainer}>
          <View style={styles.searchComponentIcon}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Ionicons
                name="ios-options-outline"
                size={28}
                color={COLORS.blue}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.searchComponentSearchBarView}>
            <View style={styles.searchInsileIcon}>
              <Feather name="search" size={24} color="#7c82a1" />
              <Text style={{ marginLeft: 10, color: "#7c82a1" }}>Search</Text>
            </View>
          </View>
        </View>
        <View style={styles.companyListWrapper}>
          {companyList?.length > 0 && (
            <FlatList
              contentContainerStyle={styles.companyListContainer}
              data={discoverState.companyList}
              // data={lis}
              onEndReachedThreshold={800}
              onEndReached={async () => {
                dispatch({ type: "INCREASE_PAGE_NO" });
                return Promise.resolve(true);
              }}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => {
                return (
                  <Company
                    {...item}
                    id={item.entity_id}
                    values_match_score={item.company.values_match_score}
                    industry={item.company.industry}
                    parent_logo_image={item.company.parent_logo_image}
                  />
                );
              }}
            />
          )}
        </View>
        <ActivityModal
          isDialogVisible={discoverState.loading && !companyList.length}
        />
      </View>
    );
  }
  function MyDrawer() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
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
    marginTop: -20,
  },
  companyListWrapper: {
    backgroundColor: COLORS.lightWhite,
  },
  searchComponentMainConatainer: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    marginVertical: 10,
    alignSelf: "center",
    marginBottom: 20,
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
    width: "17%",
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
    marginLeft: 11,
  },
  searchInsileIcon: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginLeft: 15,
  },
});
