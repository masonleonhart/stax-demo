import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "react-native-vector-icons";
import { determineColor, determineMatchType } from "../../constants/helpers";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Separator from "./Separator";
import { AUTH_HEADER } from "@env";
import SERVER_ADDRESS from "../../constants/server_address";
import axios from "axios";
import { useSelector } from "react-redux";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const NewsData = [
  {
    id: 1,
    news: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    thumbnail:
      "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png",
  },
];
const ImageComponent = ({ uri, styles }) => {
  return <Image style={[styles]} source={{ uri }} />;
};

const HeaderComponent = ({
  companyCoverImageUri,
  companyLogoImageUri,
  companyName,
  industry,
}) => {
  return (
    <>
      <ImageComponent uri={companyCoverImageUri} styles={styles.thumb} />
      <View style={styles.flexRowCenterStyle}>
        <View
          style={[
            styles.newsImageContainer,
            {
              marginTop: -SIZES.base * 5,
              marginLeft: SIZES.base * 2,
            },
          ]}
        >
          <ImageComponent
            uri={companyLogoImageUri}
            styles={styles.imageStyle}
          />
        </View>
        <Text style={styles.imageComponentLeftText}>{companyName}</Text>
        <Text style={styles.imageComponentRightText}>{industry}</Text>
      </View>
    </>
  );
};
const LineComponent = ({
  title,
  subtitile,
  subtitileColor,
  separator,
  titleColor,
  costSize,
  selectedCost,
}) => {
  let costWidgets = [];
  for (let i = 0; i < costSize; i++) {
    costWidgets.push(
      <View
        key={i}
        style={[
          selectedCost <= i
            ? styles.costIconContainerDisabled
            : styles.costIconContainer,
        ]}
      >
        <Text
          style={[
            styles.costIcon,
            {
              color:
                selectedCost > i
                  ? "rgba(102, 94, 104, 0.75)"
                  : "rgba(102, 94, 104, 0.3)",
            },
          ]}
        >
          $
        </Text>
      </View>
    );
  }
  return (
    <>
      <View
        style={[
          styles.flexRowCenterStyle,
          {
            marginTop: SIZES.base + 2,
            marginLeft: SIZES.base + 2,
          },
        ]}
      >
        <Text
          style={[
            styles.leftTextStyle,
            {
              color: titleColor ? `${titleColor}` : COLORS.darkBlue,
            },
          ]}
        >
          {title}
        </Text>
        {title !== "Cost" ? (
          <Text
            style={[
              styles.rightTextStyle,
              {
                color: subtitileColor
                  ? `${subtitileColor}`
                  : COLORS.borderColor,
              },
            ]}
          >
            {subtitile}
          </Text>
        ) : (
          <View style={[styles.costIconWrapper]}>{costWidgets}</View>
        )}
      </View>
      {separator ? <Separator /> : null}
    </>
  );
};
const IconComponent = ({ titleColor, title, icons, separator }) => {
  const iconList = icons.map(({ IconLibrary, id, onPress, name, color }) => (
    <TouchableOpacity
      key={id}
      style={{ marginLeft: SIZES.base }}
      onPress={onPress}
    >
      <IconLibrary name={name} color={color} size={25} />
    </TouchableOpacity>
  ));
  return (
    <>
      <View style={styles.iconComponentContainer}>
        <Text
          style={[
            styles.leftTextStyle,
            {
              color: titleColor ? `${titleColor}` : COLORS.grey,
            },
          ]}
        >
          {title}
        </Text>
        <View style={styles.iconListContainer}>{iconList}</View>
      </View>
      {separator ? <Separator /> : null}
    </>
  );
};
const NewsComponent = ({ newsData, title }) => {
  return (
    <>
      <View style={{ margin: SIZES.base + 2 }}>
        <Text style={[styles.leftTextStyle]}>{title}</Text>
        {newsData.length != 0 &&
          newsData.map((news) => (
            <View
              key={news?.id}
              style={[styles.flexRowCenterStyle, { marginTop: 10 }]}
            >
              <View style={[styles.newsImageContainer]}>
                <ImageComponent
                  uri={news?.thumbnail}
                  styles={styles.imageStyle}
                />
              </View>
              <Text numberOfLines={5} style={styles.newsRightText}>
                {news?.news}
              </Text>
            </View>
          ))}
      </View>
    </>
  );
};
const Company = ({
  id,
  name,
  values_match_score,
  industry,
  brand_logo_image,
  link,
  isLiked,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const openLink = (link) => {
    if (!link) {
      return;
    }
    Linking.openURL(link);
  };
  const share = () => {};
  const toggleLike = async (id, liked) => {
    try {
      const url = `${SERVER_ADDRESS}/api/v1/${
        liked ? "remove-user-favourite-company" : "favourite-company"
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
  return (
    <View style={styles.card}>
      <HeaderComponent
        companyName={name}
        industry={industry}
        companyCoverImageUri="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-picture-icon-png-image_4013511.jpg"
        companyLogoImageUri={
          brand_logo_image && brand_logo_image !== null
            ? brand_logo_image
            : "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
        }
      />
      <LineComponent
        title="Matching Values"
        subtitile={determineMatchType(values_match_score)} // TODO: Change color
        subtitileColor={determineColor(values_match_score)}
        separator={true}
      />
      <LineComponent
        title="Cost"
        subtitileColor={COLORS.black}
        costSize={4}
        selectedCost={0}
        separator={true}
      />
      <IconComponent
        title="Actions"
        icons={[
          {
            id: 1,
            IconLibrary: MaterialCommunityIcons,
            name: liked ? "heart" : "heart-outline",
            color: "#1C1939",
            onPress: () => toggleLike(id, liked),
          },
          {
            id: 2,
            IconLibrary: Feather,
            name: "upload",
            color: "#1C1939",
            onPress: () => share(),
          },
          {
            id: 3,
            IconLibrary: Feather,
            name: "external-link",
            color: link ? "#1C1939" : "lightgray",
            onPress: () => openLink(link),
          },
        ]}
        separator={true}
      />
      <LineComponent
        title="DiscountCode"
        subtitile="-"
        subtitileColor={COLORS.black}
        separator={true}
      />
      <NewsComponent title="Latest News" newsData={NewsData} />
    </View>
  );
};

export default Company;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",

    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
    paddingBottom: 5,
  },
  thumb: {
    height: 200,
    resizeMode: "cover",
    borderRadius: 16,
    width: "100%",
  },
  newsImageContainer: {
    marginLeft: SIZES.base,
    height: SCREEN_HEIGHT * 0.12,
    width: SCREEN_HEIGHT * 0.12,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  imageStyle: {
    resizeMode: "cover",
    width: SCREEN_HEIGHT * 0.1,
    height: SCREEN_HEIGHT * 0.1,
  },
  flexRowCenterStyle: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  imageComponentRightText: {
    marginLeft: "auto",
    marginTop: 5,
    marginRight: "5%",
    ...FONTS.h4,
    color: COLORS.lightGray,
    textAlign: "right",
    flex: 1,
    flexWrap: "wrap",
  },
  imageComponentLeftText: {
    ...FONTS.h2,
    marginLeft: "2%",
    color: COLORS.darkBlue,
    flex: 1,
    flexWrap: "wrap",
  },
  leftTextStyle: {
    ...FONTS.h3,
    marginLeft: "2%",
  },
  rightTextStyle: {
    marginLeft: "auto",
    ...FONTS.h4,
    marginRight: "5%",
  },
  iconListContainer: {
    marginLeft: "auto",
    marginRight: "5%",
    flexDirection: "row",
  },
  iconComponentContainer: {
    flexDirection: "row",
    marginLeft: SIZES.base + 2,
    marginTop: SIZES.base + 2,
    marginBottom: SIZES.base,
  },
  newsRightText: {
    ...FONTS.h4,
    fontFamily: "DMSans-Medium",
    flex: 1,
    flexWrap: "wrap",
    margin: 10,
    color: COLORS.borderColor,
  },
  costIcon: {
    ...FONTS.h4,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  costIconWrapper: {
    marginLeft: "auto",
    marginRight: "5%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  costIconContainer: {
    borderWidth: 1,
    borderColor: "rgba(102, 94, 104, 0.5)",
    marginLeft: 5,
    borderRadius: 50,
    backgroundColor: "rgba(102, 94, 104, 0.5)",
  },
  costIconContainerDisabled: {
    borderWidth: 1,
    borderColor: "rgba(102, 94, 104, 0.15)",
    marginLeft: 5,
    borderRadius: 50,
    backgroundColor: "rgba(102, 94, 104, 0.15)",
  },
});
