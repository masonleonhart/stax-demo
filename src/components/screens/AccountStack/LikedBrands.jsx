import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AUTH_HEADER } from "@env";
import SERVER_ADDRESS from "../../../constants/server_address";

import { View, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, IconButton, useTheme } from "react-native-paper";

import HeaderComponent from "../../reusedComponents/HeaderComponent";
import ActivityModal from "../../modals/ActivityModal";
import { determineColor, determineMatchType } from "../../../constants/helpers";
import { FONTS } from "../../../constants/theme";

import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

import { useNavigation } from "@react-navigation/native";

export default function LikedBrands() {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [likedBrands, setLikedBrands] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getBrands();
  }, [page]);

  const getApiURL = ({ page, favCom }) => {
    let url = `${SERVER_ADDRESS}/api/v1/search?`;
    url = url + `&fav_only=true`;
    url = url + `&page=${page ?? 0}`;
    return url;
  }

  const getBrands = () => {
    axios
      .get(getApiURL(
        {
          page: page,
        }
      ), {
        headers: { [AUTH_HEADER]: accessToken },
      })
      .then((response) => {
        setLikedBrands([...likedBrands, ...response.data]);
        setIsDialogVisible(false);
      })
      .catch((e) => {
        console.log(e);
        setIsDialogVisible(false);
      });
  };

  const BrandObject = ({ brand, industry, parent, id, companyRanking, values_match_score }) => {
    const [icon, setIcon] = useState("heart");
    const [liked, setLiked] = useState(true);

    const toggleLike = async (id, liked) => {
      try {
        const url = `${SERVER_ADDRESS}/api/v1/${liked ? "remove-user-favourite-company" : "favourite-company"
          }`;

        const response = await axios.post(
          url,
          {
            company_id: id,
          },
          {
            headers: { [AUTH_HEADER]: accessToken },
          }
        );
        if (response.status) {
          setLiked((prev) => !prev);
        }
      } catch (error) {
        console.error(error);
      }
    };



    const onCompanyCardPress = (companyRanking, parent) => {
      dispatch({
        type: "SET_BARCODE_DETAILS",
        payload: { manufacturer: parent },
      });
      dispatch({
        type: "SET_SCANNED_COMPANY_RANKING",
        payload: companyRanking.company,
      });
      dispatch({
        type: "SET_SCANNED_COMPANY_BRAND",
        payload: companyRanking,
      });

      navigation.navigate("ScannerStack", {
        screen: "CompanyProfile",
        params: { showBetterMatches: false, backLocation: "Discover" },
      });
    };

    return (
      <View style={[SharedStyles.flexRow, styles.brandContainer]}>
        <TouchableOpacity onPress={() => onCompanyCardPress(companyRanking, companyRanking.brand)} >
          <View style={styles.brandWrapper}>
            <View style={styles.nameIndustryWrapper}>
              <Text style={styles.brandText}>{brand}</Text>
              <Text style={styles.industryText}>{industry}</Text>
            </View>
            <Text style={styles.parentText}>Owned by: {parent}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <IconButton
            icon={liked ? "heart" : "heart-outline"}
            size={30}
            color={myTheme.colors.grey}
            onPress={() => toggleLike(id, liked)}
          />
          <Text style={{ color: determineColor(values_match_score), ...FONTS.h3 }}>{determineMatchType(values_match_score)}</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: "5%",
      height: "100%",
      flex: 1,
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
    },
    noDataText: {
      textAlign: "center",
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    brandWrapper: {
      width: "80%",
    },
    nameIndustryWrapper: {
      marginBottom: "5%",
    },
    brandText: {
      fontFamily: fonts.medium,
      fontSize: 22,
    },
    industryText: {
      fontFamily: fonts.regular,
      fontSize: 16,
      marginTop: "2.5%",
    },
    parentText: {
      fontFamily: fonts.regular,
      fontSize: 18,
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <>
      <ActivityModal isDialogVisible={isDialogVisible} />

      <HeaderComponent
        mainTitle="Liked Brands"
        backgroundColor={myTheme.colors.red}
        backButton={true}
      />

      <View style={[styles.container]}>
        {(likedBrands?.length) ? (
          <FlatList
            data={likedBrands}
            onEndReachedThreshold={100}
            onEndReached={async () => {
              {
                setPage(prev => prev + 1)
              };
              return Promise.resolve(true);
            }}
            keyExtractor={(item, index) => item.name + "_" + index}
            renderItem={({ item }) => {
              return (
                <BrandObject
                  key={item.id}
                  brand={item.brand}
                  industry={item.category_level_3}
                  parent={item.company.name}
                  id={item.id}
                  companyRanking={item}
                  values_match_score={item.company.values_match_score}
                />
              );
            }}
          />
        ) : (
          <Text style={styles.noDataText}>No Data Available</Text>
        )}
      </View>
    </>
  );
}
