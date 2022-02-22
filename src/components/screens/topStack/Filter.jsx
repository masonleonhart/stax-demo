import React from "react";
import { useIsFocused } from "@react-navigation/core";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getAllCategory, getCategoryByName } from "../../../constants/category";
import MyButton from "../../reusedComponents/MyButton";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import Separator from "../../reusedComponents/Separator";


export default function Filter() {
  const isFocused = useIsFocused();

  const [data, setdata] = React.useState([]);
  const [allcategories, setAllcategories] = React.useState([]);
  const [mainCategory, setmainCategory] = React.useState('Retail');
  const [selectedCategoriesList, setSelectedCategoriesList] = React.useState([]);

  React.useEffect(() => {
    const category = getAllCategory();
    setAllcategories(category);
  }, [])

  React.useEffect(() => {
    const category = getCategoryByName(mainCategory)
    setdata(category);
  }, [data, mainCategory])

  function addintoSelectedCategoryList(cat) {
    if (selectedCategoriesList.filter((u) => u.id === cat.id).length == 0) {
      setSelectedCategoriesList([...selectedCategoriesList, cat]);
    }
  }
  const removeCategorfromList = (cat) => {
    setSelectedCategoriesList(selectedCategoriesList.filter((u) => u.id !== cat.id));
  }

  const onClosefilter = () => {
    setSelectedCategoriesList([])
    // navigation.navigate("Discover");
  }
  const onApplyfilter = () => {
    // navigation.navigate("Discover");
    setSelectedCategoriesList([])
  }

  const getSelectedCategory = (title, categories) => {
    if (categories?.filter((cat) => cat.name == title).length == 0) {
      categories?.map((cat) => {
        getSelectedCategory(title, cat?.children)
      })
    }
    else {
      const category = categories?.filter((cat) => cat.name == title)[0]
      addintoSelectedCategoryList({
        name: category?.name,
        id: category?.id
      })
    }
  }


  if (!isFocused) {
    return <EmptyStateView />;
  }
  const SelectedCategoryList = () => {
    return (
      <View style={styles.selectedCategoryContainer}>
        {selectedCategoriesList.map((cat) => {
          return (
            <TouchableOpacity key={cat?.id} onPress={() => removeCategorfromList(cat)}>
              <View
                style={styles.selectedCategoryInsideView}>
                <MaterialCommunityIcons
                  name='close'
                  color={COLORS.red}
                  size={15}
                />
                <Text style={styles.selectedCategoryText}>{cat.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  const RendorCategory = ({ textStyle, data }) => {
    return (
      <TouchableOpacity style={[
        data?.depth == 1 ? {
          backgroundColor: COLORS.blue,
        } : {}, styles.categoryStyle
      ]}
        onPress={() => getSelectedCategory(data?.name, getAllCategory())}
      >
        <Text style={[FONTS.h4, textStyle,
        data?.depth == 1 ?
          { color: COLORS.white }
          : { color: COLORS.black }
        ]}> {data?.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const RenderGroupComponent = ({ data }) => {
    return (
      <View>
        {data.depth != 0 ? <RendorCategory
          textStyle={{
            marginLeft: data.depth ? data.depth == 3 ? data.depth * 15 : data.depth * 10 : 0,
            marginTop: SIZES.base,
            marginBottom: SIZES.base
          }}
          data={data}
        /> : null}

        {data?.children?.map((item, key) => {
          {
            if (item?.children) {
              return (<RenderGroupComponent key={item.id} data={item}></RenderGroupComponent>)
            }
          }
        })}
      </View>
    )
  }
  const RenderMainCategory = ({ title }) => {
    return (
      <View style={[styles.mainNonHightlightColor, styles.mainLevelView,
      title == mainCategory ? { backgroundColor: COLORS.blue, } : {}]
      }>
        <TouchableOpacity onPress={() => setmainCategory(title)}>
          <Text style={[FONTS.h4,
          title == mainCategory ? { color: COLORS.white, } : {}
          ]}>{title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={SharedStyles.container}>
      <View style={styles.mainheader}>
        <Text style={FONTS.h4}>Filter</Text>
        <TouchableOpacity onPress={() => setSelectedCategoriesList([])}>
          <Text style={[FONTS.h4,
          selectedCategoriesList.length == 0 ?
            { color: COLORS.black } :
            { color: COLORS.red }]}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={styles.filterViewMain}>
        <View style={styles.filterViewLeftSide} >
          {allcategories && allcategories?.map((cat) => {
            return (
              <RenderMainCategory key={cat?.id} title={cat?.name} />
            )
          })}
        </View>
        <ScrollView style={styles.filterViewRightSide} >
          {selectedCategoriesList.length != 0 && SelectedCategoryList()}
          <RenderGroupComponent data={data}></RenderGroupComponent>
        </ScrollView>
      </View>
      <View style={styles.closefiltterContainer}>
        <MyButton
          text="Close"
          onPress={onClosefilter}
          style={styles.button}
        />
        <MyButton
          text="Apply"
          onPress={onApplyfilter}
          style={styles.button}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainheader: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: "space-between"
  },
  filterViewMain: {
    flexDirection: 'row',
    height: '80%',
  },
  filterViewLeftSide: {
    width: '30%',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    alignItems: 'center'
  },
  filterViewRightSide: {
    width: '70%',
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGray,
    borderLeftWidth: 1
  },
  mainLevelView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    height: 40
  },
  mainNonHightlightColor: {
    backgroundColor: COLORS.white,
  },
  mainLevelhighlight: {
    backgroundColor: COLORS.red
  },
  button: {
    marginTop: SIZES.base,
  },
  separatorStyle: {
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    marginTop: 10,
    width: '100%',
  },
  selectedCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
    marginVertical: SIZES.base
  },
  selectedCategoryInsideView: {
    flex: 1,
    flexDirection: 'row',
    width: 'auto',
    height: 30,
    margin: 2,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.base,
    borderColor: COLORS.red,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  selectedCategoryText: {
    color: COLORS.red,
    paddingLeft: 2,
    ...FONTS.h5
  },
  closefiltterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryStyle: {
    borderBottomColor: COLORS.darkgray,
    borderBottomWidth: 1,
    height: 40
  }
});