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
  FlatList,
  TextInput,
  Keyboard,
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
import FilterStack from "../../navigation/FilterStack";
import { useDispatch, useSelector } from "react-redux";
import ActivityModal from "../../modals/ActivityModal";
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[{ backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

function DiscoverUI({ navigation, route }) {
  const dispatch = useDispatch();

  const discoverState = useSelector(
    (store) => store.discover.discoverCompaniesListState
  );
  const appliedFilter = discoverState.appliedFilter ?? "";
  const companyList = discoverState.companyList ?? [];
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  const [searchValue, setSearchValue] = useState(discoverState.searchValue);

  const getCompanyList = async () => {
    try {
      dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING" });
      let url = `${SERVER_ADDRESS}/api/v1/search?size=20`;
      if (appliedFilter) {
        url = url + `&filter=${appliedFilter}`;
      }
      url = url + `&page=${discoverState.page ?? 0}`;
      if (discoverState.searchValue) {
        url = url + `&brandName=${discoverState.searchValue}`;
      }
      const response = await axios.get(url, {
        headers: { [AUTH_HEADER]: accessToken },
      });
      dispatch({
        type: "SET_DISCOVER_COMPANY_LIST",
        payload: [...(discoverState?.companyList ?? []), ...response.data],
      });
    } catch (error) {
      dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING_STOP" });
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, [appliedFilter, discoverState.page, discoverState.searchValue]);

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
              Keyboard.dismiss();
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
            <TextInput
              style={styles.searchComponentSearchBar}
              placeholder="Search"
              value={searchValue}
              onChangeText={(value) => {
                setSearchValue(value);
              }}
              onBlur={() => {
                dispatch({
                  type: "SEARCH_COMPANY",
                  payload: searchValue,
                });
              }}
            ></TextInput>
          </View>
        </View>
      </View>
      {(appliedFilter !== null) && (appliedFilter.length > 0) && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterBox}>
            <Text style={styles.filterDisplayText}>{appliedFilter}</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch({ type: "RESET_FILTER_LIST" });
              }}
            >
              <Ionicons
                name="close"
                size={16}
                color={COLORS.blue}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.companyListWrapper}>
        <FlatList
          contentContainerStyle={styles.companyListContainer}
          data={discoverState.companyList}
          onEndReachedThreshold={800}
          onEndReached={async () => {
            dispatch({ type: "INCREASE_PAGE_NO" });
            return Promise.resolve(true);
          }}
          keyExtractor={(item, index) => item.name + "_" + index}
          renderItem={({ item }) => {
            return (
              <Company
                {...item}
                name={item.brand}
                values_match_score={item.company.values_match_score}
                industry={item.category_level_3}
                parent_logo_image={item.company.parent_logo_image}
                companyRanking={item.company}
                navigation={navigation}
                route={route}
              />
            );
          }}
        />
        {companyList?.length == 0 && !discoverState.loading && (
          <Text style={styles.noSearchMatchFound}>No matching data found</Text>
        )}
      </View>
      <ActivityModal
        isDialogVisible={discoverState.loading && !companyList.length}
      />
    </View>
  );
}

export default function DiscoverDrawer() {
  const isFocused = useIsFocused();

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <FilterStack navigation={props.navigation} />
      </DrawerContentScrollView>
    );
  }
  const Drawer = createDrawerNavigator();

  if (!isFocused) {
    return <EmptyStateView />;
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="DiscoverDrawer"
        component={DiscoverUI}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
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
  searchComponentSearchBar: {
    width: "80%",
    backgroundColor: COLORS.lightGrayBackground,
    height: 50,
    marginLeft: 10,
  },
  searchInsileIcon: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginLeft: 15,
  },
  noSearchMatchFound: {
    textAlign: "center",
    paddingTop: 100,
  },
  filtersContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
    marginTop: -5,
  },
  filterBox: {
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  filterDisplayText: {
    color: COLORS.blue,
  }
});
