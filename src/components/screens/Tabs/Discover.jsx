import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from '../../../../companies';
import Company from '../../reusedComponents/Company.jsx';
import { MaterialCommunityIcons } from "react-native-vector-icons";

import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Discover({ navigation }) {

  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const deviceHeight = Dimensions.get("screen").height;
  const userInfo = useSelector((store) => store.user.userInfo);
  const userValues = useSelector((store) => store.user.userInfo.values);

  function renderCompany({ item: company }) {
    return (
      <Company {...company}
        onPress={() => {
          console.log(company)
        }
        }
      />
    );
  }

  const [company, setCompany] = useState([]);

  const onClickfilter = () => {
    navigation.navigate("Filter");

  }

  useEffect(() => {
    setCompany(getCompanies());
  });

  const valuesNavButton = () => {
    if (userValues.length === 0) {
      navigation.navigate("ValuesStack", {
        screen: "ValuesIntro",
      });
    } else {
      dispatch({ type: "SET_QUIZ_SELECTION", payload: userValues });

      navigation.navigate("ValuesStack", {
        screen: "ValuesComplete",
      });
    }
  };

  const styles = StyleSheet.create({
    companyList: {
      backgroundColor: '#eeeeee',
    },
    companyListContainer: {
      backgroundColor: '#eeeeee',
      marginHorizontal: 16,
    },
    header: {
      backgroundColor: myTheme.colors.blue,
      height: deviceHeight * 0.25,
      paddingHorizontal: "5%",
      marginBottom: "2.5%",
    },
    headerTextContainer: {
      marginTop: "5%",
    },
    headerSettingsText: {
      color: "white",
      fontSize: 35,
      marginBottom: "5%",
      fontFamily: fonts.bold,
    },
    headerNameText: {
      color: "white",
      fontSize: 20,
      fontFamily: fonts.regular,
    },
    userImage: {
      height: deviceHeight * 0.125,
      width: deviceHeight * 0.125,
      marginTop: "5%",
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
    container: {
      justifyContent: "space-between",
    },
    pressable: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      padding: "5%",
    },
    pressableText: {
      fontFamily: fonts.regular,
      fontSize: 20,
    },
    searchComponentHeader: {
      flexDirection: 'row',
      width: '90%',
      height: 50,
      marginTop: 10,
      alignSelf: 'center'
    },
    searchComponentIcon: {
      width: '20%',
      height: 50,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15
    }, searchComponentSearchBarView
      : {
      width: '80%',
      height: 50,
      borderWidth: 1,
      borderRadius: 15,
      marginLeft: 5
    },
    searchInsileIcon: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
      marginLeft: 10
    }
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }
  const SearchComponent = () => {
    return (
      <View style={styles.searchComponentHeader}>
        <View style={styles.searchComponentIcon}>
          <TouchableOpacity onPress={onClickfilter}>
            <MaterialCommunityIcons
              name="filter"
              color={myTheme.colors.blue}
              size={30}
            />
          </TouchableOpacity>
        </View>

        <View
          style={styles.searchComponentSearchBarView}
        >
          <View style={styles.searchInsileIcon}>
            <MaterialCommunityIcons
              name="text-search"
              color={myTheme.colors.blue}
              size={30}
            />
            <Text style={{ marginLeft: 5 }}>Search</Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{
      backgroundColor: "#eeeeee"
    }}>
      <View style={[SharedStyles.flexRow, styles.header]}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSettingsText}>Discover</Text>
          <Text style={styles.headerNameText}>Allgned Companies</Text>
        </View>
        <View style={styles.userImage}>
          <Text style={styles.userInitials}>
            {userInfo.first_name[0]}
            {userInfo.last_name[0]}
          </Text>
        </View>
      </View>
      {SearchComponent()}
      <FlatList
        style={styles.companyList}
        contentContainerStyle={styles.companyListContainer}
        keyExtractor={(item) => item.id.toString()
        }
        data={company}
        renderItem={renderCompany}
      />
    </View>
  );
}
