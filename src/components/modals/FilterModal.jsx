import React from "react";
import { Portal } from "react-native-paper";
import Modal from "react-native-modal";

import MyButton from "../reusedComponents/MyButton";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { View, StyleSheet, Dimensions, Platform } from "react-native";
import { Text } from "react-native-paper";

import SharedStyles from "../reusedComponents/SharedStyles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getAllCategory, getCategoryByName } from "../../constants/category";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useDispatch, useSelector } from "react-redux";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : 100;
export default function FilterModal({
  isDialogVisible,
  setIsDialogVisible,
}) {

  const dispatch = useDispatch();

  const [childrenOfSelectedMainCategory, setChildrenOfSelectedMainCategory] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState([]);
  const [selectedMainCategory, setselectedMainCategory] = React.useState('Retail');
  const reduxSelectedCategoriesList = useSelector((store) => store.discover.discoverCompaniesListState.appliedFilter);
  const [selectedCategoriesList, setSelectedCategoriesList] = React.useState(reduxSelectedCategoriesList);

  React.useEffect(() => {
    setSelectedCategoriesList(reduxSelectedCategoriesList)
  }, [reduxSelectedCategoriesList])

  React.useEffect(() => {
    const category = getAllCategory();
    setAllCategories(category);
  }, [])

  React.useEffect(() => {
    const category = getCategoryByName(selectedMainCategory)
    setChildrenOfSelectedMainCategory(category);
  }, [childrenOfSelectedMainCategory, selectedMainCategory])

  function addintoSelectedCategoryList(cat) {
    if (selectedCategoriesList.filter((u) => u.id === cat.id).length == 0) {
      setSelectedCategoriesList([...selectedCategoriesList, cat]);
    }
  }
  const removeCategorfromList = (cat) => {
    setSelectedCategoriesList(selectedCategoriesList.filter((u) => u.id !== cat.id));
  }

  const onClosefilter = () => {
    setIsDialogVisible(false)
  }
  const onCleareAllfilter = () => {
    setSelectedCategoriesList([])
    dispatch({ type: "SET_FILTER_LIST", payload: [] });
  }
  const onApplyfilter = () => {
    setIsDialogVisible(false)
    dispatch({ type: "SET_FILTER_LIST", payload: selectedCategoriesList });
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
  const RendorCategory = ({ textStyle, category }) => {
    return (
      <TouchableOpacity style={[
        category?.depth == 1 ? {
          backgroundColor: COLORS.blue,
        } : {}, styles.categoryStyle
      ]}
        onPress={() => getSelectedCategory(category?.name, getAllCategory())}
      >
        <Text style={[FONTS.h4, textStyle,
        category?.depth == 1 ?
          { color: COLORS.white }
          : { color: COLORS.black }
        ]}> {category?.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const MainCategoryChildrens = ({ data }) => {
    return (
      <View>
        {data.depth != 0 ? <RendorCategory
          textStyle={{
            marginLeft: data.depth ? data.depth == 3 ? data.depth * 15 : data.depth * 10 : 0,
            marginTop: SIZES.base,
            marginBottom: SIZES.base
          }}
          category={data}
        /> : null}

        {data?.children?.map((item, key) => {
          {
            if (item?.children) {
              return (<MainCategoryChildrens key={item.id} data={item}></MainCategoryChildrens>)
            }
          }
        })}
      </View>
    )
  }
  const MainCategory = ({ title }) => {
    return (
      <View style={[styles.mainNonHightlightColor, styles.mainLevelView,
      title == selectedMainCategory ? { backgroundColor: COLORS.blue, } : {}]
      }>
        <TouchableOpacity onPress={() => setselectedMainCategory(title)}>
          <Text style={[FONTS.h4,
          title == selectedMainCategory ? { color: COLORS.white, } : {}
          ]}>{title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Portal>
      <Modal
        isVisible={isDialogVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        style={{ marginTop: "20%", maxHeight: '73%', maxWidth: '100%' }}
      >
        <View style={SharedStyles.filtercontainer}>
          <View style={styles.filterViewMain}>
            <View style={styles.filterViewLeftSide} >
              {allCategories && allCategories?.map((cat) => {
                return (
                  <MainCategory key={cat?.id} title={cat?.name} />
                )
              })}
            </View>
            <ScrollView style={styles.filterViewRightSide} >
              {selectedCategoriesList.length != 0 && SelectedCategoryList()}
              <MainCategoryChildrens data={childrenOfSelectedMainCategory}></MainCategoryChildrens>
            </ScrollView>
          </View>
          <View style={styles.closefiltterContainer}>
            <MyButton
              text="Close"
              onPress={onClosefilter}
              style={styles.button}
            />
            <MyButton
              text="Clear All"
              onPress={onCleareAllfilter}
              style={styles.button}
            />
            <MyButton
              text="Apply"
              onPress={onApplyfilter}
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  filtercontainer: {
    flex: 1,
  },
  mainheader: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  filterViewMain: {
    flexDirection: 'row',
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
    marginTop: SIZES.base - 4,
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
