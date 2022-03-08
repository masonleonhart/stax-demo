import React from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import Separator from './Separator';
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const NewsData = [
    {
        id: 1,
        news: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        thumbnail: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/08/adidas.png?auto=format&q=60&fit=max&w=930"
    }
]
const ImageComponent = ({ uri, styles }) => {
    return (
        <Image
            style={[styles]}
            source={{ uri }}
        />
    )
}
const HeaderComponent = ({ companyCoverImageUri, companyLogoImageUri, companyName }) => {
    return (
        <>
            <ImageComponent
                uri={companyCoverImageUri}
                styles={styles.thumb}
            />
            <View style={styles.flexRowCenterStyle}>
                <View
                    style={[styles.newsImageContainer, {
                        marginTop: -SIZES.base * 5,
                        marginLeft: SIZES.base * 2
                    }]}
                >
                    <ImageComponent
                        uri={companyLogoImageUri}
                        styles={styles.imageStyle}
                    />
                </View>
                <Text style={styles.imageComponentLeftText}>{companyName}</Text>
                <Text style={styles.imageComponentRightText}>Shoes</Text>
            </View>
        </>
    )
}
const LineComponent = ({ title, subtitile, subtitileColor, separator, titleColor }) => {
    return (
        <>
            <View style={[styles.flexRowCenterStyle, {
                marginTop: SIZES.base + 2,
                marginLeft: SIZES.base + 2
            }]}>
                <Text style={[styles.leftTextStyle, {
                    color: titleColor ? `${titleColor}` : COLORS.darkBlue
                }]}>{title}</Text>
                <Text style={[styles.rightTextStyle, {
                    color: subtitileColor ? `${subtitileColor}` : COLORS.borderColor
                }]}>{subtitile}</Text>
            </View>
            {separator ? <Separator /> : null}
        </>
    )
}
const IconComponent = ({ titleColor, title, icons, separator }) => {
    return (
        <>
            <View style={styles.iconComponentContainer}>
                <Text style={[styles.leftTextStyle, {
                    color: titleColor ? `${titleColor}` : COLORS.grey
                }]}>{title}</Text>
                <View style={styles.iconListContainer}>
                    {icons.map((value) => (
                        < TouchableOpacity key={value.id} style={{ marginLeft: SIZES.base }}>
                            <MaterialCommunityIcons
                                name={value.name}
                                color={COLORS.blue}
                                size={25}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {separator ? <Separator /> : null}
        </>
    )
}
const NewsComponent = ({ newsData, title }) => {
    return (
        <>
            <View style={{ margin: SIZES.base + 2 }}>
                <Text style={[styles.leftTextStyle]}>{title}</Text>
                {newsData.length != 0 && newsData.map((news) => (
                    <View
                        key={news?.id}
                        style={[styles.flexRowCenterStyle, { marginTop: 10 }]}>
                        <View
                            style={[styles.newsImageContainer]}
                        >
                            <ImageComponent
                                uri={news?.thumbnail}
                                styles={styles.imageStyle}
                            />
                        </View>
                        <Text
                            numberOfLines={5}
                            style={styles.newsRightText}>{news?.news}</Text>
                    </View>
                ))}
            </View>
        </>
    )
}
const Company = ({ name, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <HeaderComponent
                companyName={name}
                companyCoverImageUri="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/aa45540e-ad2a-40b5-a132-ff89d7cdfc33/air-zoom-alphafly-next-flyknit-road-racing-shoes-13jzhr.png"
                companyLogoImageUri="https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/08/adidas.png?auto=format&q=60&fit=max&w=930"
            />
            <LineComponent
                title="Matching Values"
                subtitile="Excellent"
                subtitileColor={COLORS.green}
                separator={true}
            />
            <LineComponent
                title="Cost"
                subtitile="$4"
                subtitileColor={COLORS.black}
                separator={true}
            />
            <IconComponent
                title="Actions"
                icons={[
                    { id: 1, name: "heart-outline" },
                    { id: 2, name: "share-circle" },
                    { id: 3, name: "cast" },
                ]}
            />
            <LineComponent
                title="Discount Code"
                subtitile="20% Off-STAX20"
                subtitileColor={COLORS.black}
                separator={true}
            />
            <NewsComponent
                title="Latest News"
                newsData={NewsData}
            />
        </TouchableOpacity>
    )
}

export default Company

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
        paddingBottom: 20
    },
    thumb: {
        height: 200,
        resizeMode: 'cover',
        borderRadius: 16,
        width: '100%',
    },
    newsImageContainer: {
        marginLeft: SIZES.base,
        height: SCREEN_HEIGHT * 0.12,
        width: SCREEN_HEIGHT * 0.12,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        backgroundColor: COLORS.white,
    },
    imageStyle: {
        resizeMode: 'cover',
        width: SCREEN_HEIGHT * 0.1,
        height: SCREEN_HEIGHT * 0.1,
    },
    flexRowCenterStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    imageComponentRightText: {
        marginLeft: 'auto',
        marginTop: 5,
        marginRight: "5%",
        ...FONTS.h4,
        color: COLORS.lightGray
    },
    imageComponentLeftText: {
        ...FONTS.h2,
        marginLeft: '2%',
        color: COLORS.darkBlue
    },
    leftTextStyle: {
        ...FONTS.h3,
        marginLeft: '2%',
    },
    rightTextStyle: {
        marginLeft: 'auto',
        ...FONTS.h4,
        marginRight: "5%",
    },
    iconListContainer: {
        marginLeft: 'auto',
        marginRight: "5%",
        flexDirection: 'row',
    },
    iconComponentContainer: {
        flexDirection: 'row',
        marginLeft: SIZES.base + 2,
        marginTop: SIZES.base + 2,
        marginBottom: SIZES.base,
    },
    newsRightText: {
        flex: 1,
        flexWrap: 'wrap',
        margin: 10,
        ...FONTS.h4,
        color: COLORS.borderColor
    }
});