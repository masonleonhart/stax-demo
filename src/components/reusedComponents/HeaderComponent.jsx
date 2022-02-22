import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import fonts from './fonts';
import { useSelector } from 'react-redux';
import SharedStyles from './SharedStyles';

const HeaderComponent = ({ mainTitle, subTitle, backgroundColor, mainTitleStyle, subTitleStyle }) => {
    const userInfo = useSelector((store) => store.user.userInfo);

    return (
        <View style={[SharedStyles.flexRow, styles.header, { backgroundColor: backgroundColor }]}>
            <View style={styles.headerTextContainer}>
                <Text style={mainTitleStyle ? mainTitleStyle : styles.headerSettingsText}>{mainTitle}</Text>
                <Text style={subTitleStyle ? subTitleStyle : styles.headerNameText}>{subTitle}</Text>
            </View>
            <View style={styles.userImage}>
                <Text style={styles.userInitials}>
                    {userInfo?.first_name[0]}
                    {userInfo?.last_name[0]}
                </Text>
            </View>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    header: {
        height: SIZES.height * 0.25,
        paddingHorizontal: "5%",
        marginBottom: "2.5%",
    },
    headerTextContainer: {
        marginTop: "5%",
    },
    headerSettingsText: {
        color: COLORS.white,
        ...FONTS.h1,
        marginBottom: "5%",
    },
    headerNameText: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: fonts.regular,
    },
    userImage: {
        height: SIZES.height * 0.125,
        width: SIZES.height * 0.125,
        marginTop: "5%",
        borderRadius: 100,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
    },
    userInitials: {
        ...FONTS.largetitle,
        color: COLORS.darkgray,
    },
});