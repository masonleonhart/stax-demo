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

  const getApiURL = ({ filter, page, search, favCom }) => {
    let url = `${SERVER_ADDRESS}/api/v1/search?size=20`;
    if (filter) {
      url = url + `&filter=${filter}`;
    }
    url = url + `&page=${page ?? 0}`;
    if (search) {
      url = url + `&brandName=${search}`;
    }
    if (favCom) {
      url = url + `&fav_only=${favCom}`;
    }
    return url;
  }

  const getCompanyList = async () => {
    try {
      dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING" });

      const response = await axios.get(getApiURL(
        {
          filter: appliedFilter,
          page: discoverState.page,
          search: discoverState.searchValue,
          favCom: discoverState.favCompanyOnly
        }
      ), {
        headers: { [AUTH_HEADER]: accessToken },
      });
      if (response.data?.length == 0 && appliedFilter?.length !== 0) {
        getOtherCompanyList();
      } else {
        dispatch({
          type: "SET_DISCOVER_COMPANY_LIST",
          payload: [...(discoverState?.companyList ?? []), ...response.data],
        });
      }
    } catch (error) {
      dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING_STOP" });
      console.error(error);
    }
  };

  const getOtherCompanyList = async () => {
    try {
      const response = await axios.get(getApiURL(
        {
          page: discoverState.page,
          search: discoverState.searchValue
        }
      ), {
        headers: { [AUTH_HEADER]: accessToken },
      });
      dispatch({
        type: "SET_OTHER_DISCOVER_COMPANY_LIST",
        payload: [...(discoverState?.otherCompanyList ?? []), ...response.data],
      });
    } catch (error) {
      dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING_COMPLETE" });
      console.error(error);
    }
  };

  useEffect(() => {
    if (discoverState.page > 0 && discoverState?.companyList.length == 0) {
      getOtherCompanyList();
    } else {
      getCompanyList();
    }
  }, [appliedFilter, discoverState.page, discoverState.searchValue, discoverState.favCompanyOnly]);

  const FilterDisplay = ({ textAsFilter, dispatchType }) => {
    return (
      <View style={styles.filtersContainer}>
        <View style={styles.filterBox}>
          <Text style={styles.filterDisplayText}>{textAsFilter}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: dispatchType });
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
    )
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: "100%",
        display: "flex",
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

      {/* Filter drawer */}
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

        {/* Search component */}
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

      {/* Applied filters */}
      <View style={{ flexDirection: "row" }}>
        {(appliedFilter !== null) && (appliedFilter.length > 0) && (
          <FilterDisplay textAsFilter={appliedFilter} dispatchType="RESET_FILTER_LIST" />
        )}
        {(discoverState.favCompanyOnly !== null) && (discoverState.favCompanyOnly == true) && (
          <FilterDisplay textAsFilter="Favorites" dispatchType="SHOW_FAVORITES_ONLY" />
        )}
      </View>

      {/* Displaying message while no result */}
      {
        (companyList?.length == 0 && !discoverState.loading) ?
          <Text style={styles.noSearchMatchFound}>No matching data found</Text>
          :
          null
      }

      {/* Displaying other companyList title */}
      {(companyList?.length == 0 && !discoverState.loading) && (appliedFilter?.length !== 0)
        && (discoverState.otherCompanyList?.length !== 0) && (
          <Text style={styles.otherResult}>Try other results:</Text>
        )}

      {/* Company list */}
      {(companyList?.length !== 0 || appliedFilter?.length !== 0) && (
        <View style={styles.companyListWrapper}>
          <FlatList
            contentContainerStyle={styles.companyListContainer}
            data={discoverState.companyList?.length ? discoverState.companyList : discoverState.otherCompanyList}
            onEndReachedThreshold={800}
            onEndReached={async () => {
              {
                if (discoverState.companyList?.length || discoverState.otherCompanyList?.length) {
                  dispatch({ type: "INCREASE_PAGE_NO" })
                }
              };
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
        </View>
      )}

      <ActivityModal
        isDialogVisible={discoverState.loading && !companyList.length && !discoverState.otherCompanyList?.length}
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
  },
  companyListWrapper: {
    height: "100%",
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  searchComponentMainConatainer: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    marginVertical: 10,
    alignSelf: "center",
    marginBottom: 15,
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
    paddingVertical: 10,
    backgroundColor: COLORS.lightGrayBackground,
  },
  otherResult: {
    ...FONTS.h2,
    color: COLORS.blue,
    paddingBottom: 10,
    paddingLeft: "5%",
    backgroundColor: COLORS.lightGrayBackground,
  },
  filtersContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 15,
    marginLeft: "5%",
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
