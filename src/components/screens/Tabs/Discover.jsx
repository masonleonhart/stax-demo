import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import Company from "../../reusedComponents/Company.jsx";
import { Feather } from "@expo/vector-icons";
import { SERVER_ADDRESS, AUTH_HEADER } from "@env";
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

export default function Discover({}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
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
    // try {
    //   dispatch({ type: "DISCOVER_COMPANY_LIST_LOADING" });
    //   const response = await axios.get(
    //     `${SERVER_ADDRESS}/api/v1/search?filter=${appliedFilter}&page=${
    //       discoverState.page ?? 0
    //     }`,
    //     { headers: { [AUTH_HEADER]: accessToken } }
    //   );
    dispatch({
      type: "SET_DISCOVER_COMPANY_LIST",
      payload: [...(discoverState.companyList ?? []), ...response.data],
    });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    getCompanyList();
  }, [appliedFilter, discoverState.page]);

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
        {companyList?.length > 0 && (
          <FlatList
            contentContainerStyle={styles.companyListContainer}
            data={discoverState.companyList}
            onEndReachedThreshold={0.5}
            onEndReached={async () => {
              dispatch({ type: "INCREASE_PAGE_NO" });
              return Promise.resolve(true);
            }}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => {
              return (
                <Company
                  {...item}
                  onPress={() => {
                    console.log(company);
                  }}
                />
              );
            }}
          />
          // <ScrollView
          //   stlye={styles.companyList}
          //   contentContainerStyle={styles.companyListContainer}>
          //   {companyList.map((company) => (
          //     <Company
          //       key={company.id}
          //       {...company}
          //       onPress={() => {
          //         console.log(company);
          //       }}
          //     />
          //   ))}
          // </ScrollView>
        )}
        <ActivityModal isDialogVisible={discoverState.loading} />
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
