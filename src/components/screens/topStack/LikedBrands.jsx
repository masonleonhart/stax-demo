import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useSelector } from "react-redux";
import axios from "axios";
import { AUTH_HEADER } from "@env";
import SERVER_ADDRESS from "../../../constants/server_address";

import { View, StyleSheet, ScrollView } from "react-native";
import { Text, IconButton, useTheme } from "react-native-paper";

import HeaderComponent from "../../reusedComponents/HeaderComponent";
import ActivityModal from "../../modals/ActivityModal";

import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function LikedBrands() {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const [likedBrands, setLikedBrands] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(true);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = () => {
    axios
      .get(`${SERVER_ADDRESS}/api/v1/favourite-company`, {
        headers: { [AUTH_HEADER]: accessToken },
      })
      .then((res) => {
        setLikedBrands(res.data);

        setIsDialogVisible(false);
      })
      .catch((e) => {
        console.log(e);

        setIsDialogVisible(false);
      });
  };

  const handleUnlike = (id) => {
    console.log(id);

    axios
      .post(
        `${SERVER_ADDRESS}/api/v1/remove-user-favourite-company`,
        {
          company_id: id,
        },
        {
          headers: { [AUTH_HEADER]: accessToken },
        }
      )
      .then((res) => getBrands());
  };

  const BrandObject = ({ text, id }) => (
    <View style={styles.brandContainer}>
      <Text style={styles.brandText}>{text}</Text>
      <IconButton
        icon="heart-off"
        size={30}
        color={myTheme.colors.grey}
        onPress={() => handleUnlike(id)}
      />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: "5%",
    },
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    brandContainer: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      padding: "5%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    brandText: {
      fontFamily: fonts.medium,
      fontSize: 22,
    },
    noDataText: {
      textAlign: "center",
      fontFamily: fonts.regular,
      fontSize: 16,
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView>
      <ActivityModal isDialogVisible={isDialogVisible} />

      <HeaderComponent
        mainTitle="Liked Brands"
        backgroundColor={myTheme.colors.red}
      />

      <View style={[styles.container]}>
        {likedBrands.length !== 0 ? (
          likedBrands.map((brandObj) => (
            <BrandObject
              key={brandObj.entity_id}
              text={brandObj.brand}
              id={brandObj.id}
            />
          ))
        ) : (
          <Text style={styles.noDataText}>No Data Available</Text>
        )}
      </View>
    </ScrollView>
  );
}
