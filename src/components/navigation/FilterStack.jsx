import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, Text } from "react-native-paper";
import SharedStyles from "../reusedComponents/SharedStyles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getAllCategory } from "../../constants/category";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useDispatch } from "react-redux";

export default function FilterStack({ navigation }) {
  const dispatch = useDispatch();
  const [categoryStack, setCategoryStack] = useState([]);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState([""]);
  useEffect(() => {
    const category = getAllCategory();
    setCategoryStack([category]);
  }, []);
  const applyFilter = (title) => {
    navigation.closeDrawer();
    dispatch({ type: "SET_FILTER_LIST", payload: title });
  };
  const onBack = () => {
    if (currentDepth > 0) {
      categoryStack.pop();
      selectedCategoryTitle.pop();
      setCurrentDepth((prev) => prev - 1);
    }
  };
  const onSelectCategory = (title, index, hasChild) => {
    if (hasChild) {
      setCategoryStack([
        ...categoryStack,
        categoryStack[currentDepth][index].children,
      ]);
      setCurrentDepth((prev) => prev + 1);
      setSelectedCategoryTitle([...selectedCategoryTitle, title]);
    } else {
      setSelectedFilter(title);
      applyFilter(title);
    }
  };
  const RenderChild = ({ title, index, hasChild = false }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelectCategory(title, index, hasChild)}>
        <View
          style={
            title === selectedFilter
              ? styles.selectedChildView
              : styles.childView
          }>
          <Text
            style={[
              FONTS.h4,
              title === selectedFilter ? { color: COLORS.white } : undefined,
            ]}>
            {title}
          </Text>
          {hasChild && (
            <IconButton icon="chevron-right" size={30} color={COLORS.grey} />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const RenderList = ({ data }) => {
    return (
      <View>
        {data?.map((cat, index) => {
          const hasChild =
            categoryStack[currentDepth][index].children.length > 0;
          return (
            <RenderChild
              key={cat?.id}
              title={cat?.name}
              index={index}
              hasChild={hasChild}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={SharedStyles.filtercontainer}>
      <View style={styles.filterViewMain}>
        <ScrollView style={styles.filterView}>
          {currentDepth > 0 && (
            <View style={styles.backButton}>
              <IconButton
                icon="chevron-left"
                size={30}
                color={COLORS.grey}
                onPress={onBack}
              />
              <Text style={[FONTS.h4]}>
                {selectedCategoryTitle[currentDepth]}
              </Text>
            </View>
          )}
          <RenderList data={categoryStack[currentDepth]} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtercontainer: {
    flex: 1,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  filterViewMain: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    marginTop: SIZES.base + 10,
  },
  filterView: {
    width: "100%",
    backgroundColor: COLORS.white,
  },
  childView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 40,
    color: COLORS.black,
    paddingLeft: SIZES.base + 10,
  },
  selectedChildView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 40,
    backgroundColor: COLORS.blue,
    color: COLORS.white,
    paddingLeft: SIZES.base + 10,
  },
});
