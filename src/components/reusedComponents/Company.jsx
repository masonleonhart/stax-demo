import { useTheme } from '@react-navigation/native';
import React from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from "react-native-vector-icons";
import fonts from './fonts';
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const Company = ({ name, price, onPress }) => {
    const myTheme = useTheme();

    const seprator = () => {
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <View
                    style={{
                        borderBottomColor: '#979797',
                        borderBottomWidth: 1,
                        marginTop: 10,
                        width: '90%',
                    }}
                />
            </View>
        )
    }

    const ImageComponent = () => {
        return (
            <>
                <Image
                    style={styles.thumb}
                    source={{ uri: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/aa45540e-ad2a-40b5-a132-ff89d7cdfc33/air-zoom-alphafly-next-flyknit-road-racing-shoes-13jzhr.png" }}
                />
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View
                        style={[styles.profileImgContainer,
                        {
                            borderColor: 'black',
                            borderWidth: 1,
                            backgroundColor: 'white'
                        }]}
                    >
                        <Image
                            style={[styles.profileImg]}
                            source={{ uri: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/08/adidas.png?auto=format&q=60&fit=max&w=930" }}
                        />
                    </View>
                    <Text style={{
                        fontSize: 22,
                        fontFamily: fonts.bold,
                        marginLeft: '2%',
                        color: "#1c1939"
                    }}>Adidas</Text>
                    <Text style={{
                        marginLeft: 'auto',
                        fontSize: 16,
                        marginTop: 5,
                        marginRight: "5%",
                        fontFamily: fonts.medium,
                        color: '#979797'
                    }}>Shoes</Text>
                </View>
            </>
        )
    }
    const lineComponent = (data) => {
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 10
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: fonts.bold,
                        marginLeft: '2%',
                        color: data.titleColor ? `${data.titleColor}` : '#1c1939'
                    }}>{data.title}</Text>
                    <Text style={{
                        marginLeft: 'auto',
                        fontSize: 16,
                        marginRight: "5%",
                        fontFamily: fonts.medium,
                        color: data.subtitileColor ? `${data.subtitileColor}` : '#979797'
                    }}>{data.subtitile}</Text>
                </View>
                {data.seprator ? seprator() : null}
            </>
        )
    }
    const RenderValue = ({ icon }) => {
        return (
            <View style={{
                marginLeft: 5
            }}>
                <MaterialCommunityIcons
                    name={icon}
                    color={myTheme.colors.blue}
                    size={25}
                />
            </View>
        );
    };
    const IconComponent = (data) => {
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: fonts.bold,
                        marginLeft: '2%',
                        color: data.titleColor ? `${data.titleColor}` : '#1c1939'
                    }}>{data.title}</Text>
                    <View style={{
                        marginLeft: 'auto',
                        marginRight: "5%",
                        flexDirection: 'row',
                    }}>
                        {data.icons.map((value) => (
                            <RenderValue
                                key={value.id}
                                icon={value.name}
                            />
                        ))}
                    </View>
                </View>
                {data.seprator ? seprator() : null}
            </>
        )
    }
    const NewsComponent = () => {
        return (
            <>
                <View style={{
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: fonts.bold,
                        marginLeft: '2%',
                        color: '#1c1939'
                    }}>Latest News</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}>
                        <View
                            style={[styles.newsImageContainer,
                            {
                                borderColor: 'black',
                                borderWidth: 1,
                                backgroundColor: 'white'
                            }]}
                        >
                            <Image
                                style={[styles.profileImg]}
                                source={{ uri: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/08/adidas.png?auto=format&q=60&fit=max&w=930" }}
                            />
                        </View>
                        <Text
                            numberOfLines={5}
                            style={{
                                flex: 1,
                                flexWrap: 'wrap',
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 20,
                                fontFamily: fonts.medium,
                                fontSize: 15,
                                color: '#979797'
                            }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </View>
                </View>
            </>
        )
    }
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {ImageComponent()}
            {lineComponent({
                title: "Match to Values",
                subtitile: "Excellent",
                subtitileColor: "#6dc82a",
                seprator: true
            })}
            {lineComponent({
                title: "Cost",
                subtitile: "$4",
                subtitileColor: "black",
                seprator: true
            })}
            {IconComponent({
                title: "Actions",
                icons: [
                    { id: 1, name: "heart-outline" },
                    { id: 2, name: "share-circle" },
                    { id: 3, name: "cast" },
                ],
                styles: {
                    marginBottom: 10
                }
            })}
            {lineComponent({
                title: "Discount Code",
                subtitile: "20% Off-STAX20",
                subtitileColor: "black",
                seprator: true
            })}
            {NewsComponent()}
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
    profileImgContainer: {
        marginLeft: 16,
        marginTop: -40,
        height: SCREEN_HEIGHT * 0.12,
        width: SCREEN_HEIGHT * 0.12,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    profileImg: {
        resizeMode: 'cover',
        width: SCREEN_HEIGHT * 0.1,
        height: SCREEN_HEIGHT * 0.1,
    },
    newsImageContainer: {
        marginLeft: 8,
        marginTop: 10,
        height: SCREEN_HEIGHT * 0.12,
        width: SCREEN_HEIGHT * 0.12,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
});
