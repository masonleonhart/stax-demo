import React from "react";
import { useIsFocused } from "@react-navigation/core";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import fonts from "../../reusedComponents/fonts";

export default function Filter({ navigation }) {
  const isFocused = useIsFocused();
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
            backgroundColor: 'red',
            width: '100%',
          }}
        />
      </View>
    )
  }
  const styles = StyleSheet.create({
    mainheader: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: "center"
    },
    headerfont: {
      fontFamily: fonts.bold,
      fontSize: 15
    },
    clearall: {
      marginLeft: 'auto',
    },
    filterViewMain: {
      flexDirection: 'row',
      height: 500,
    },
    filterViewLeftSide: {
      width: '30%',
      height: 500,
      backgroundColor: 'white',
      textAlign: 'center',
      alignItems: 'center'
    },
    filterViewRightSide: {
      width: '70%',
      height: 500,
      backgroundColor: 'white',
      borderColor: '#eeeeee',
      borderLeftWidth: 1
    },
    mainLevelfont: {
      fontFamily: fonts.bold,
      fontSize: 15,
    },
    mainLevelView: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      height: 40
    },
    mainNonHightlightColor: {
      backgroundColor: 'white',
    },
    mainLevelhighlight: {
      backgroundColor: myTheme.colors.red
    }
  });


  if (!isFocused) {
    return <EmptyStateView />;
  }
  var margin = 0;
  const RenderGroupComponent = ({ data, keyt }) => {
    return (
      <View>
        {/* {data.depth == 0 ? <TouchableOpacity >
          <Text style={[styles.mainLevelfont, { color: 'red' }]}>{data.name}</Text>
        </TouchableOpacity> : null} */}
        {data.depth == 1 ? <TouchableOpacity style={{
          flexDirection: "row",
          backgroundColor: 'black',
          height: 40
        }} >
          <Text style={[styles.mainLevelfont, {
            color: 'white',
            marginLeft: 10,
            marginTop: 10,
          }]}>{keyt + 1}) {data.name}</Text>
        </TouchableOpacity> : null}

        {data.depth == 2 ? <TouchableOpacity >
          <Text style={[styles.mainLevelfont, { color: 'green', marginLeft: 20, marginTop: 10 }]}>
            {keyt + 1}) {data.name}</Text>
        </TouchableOpacity> : null}

        {data.depth == 3 ? <TouchableOpacity >
          <Text style={[styles.mainLevelfont, { color: 'red', marginLeft: 30, marginTop: 10 }]}>
            {keyt + 1}) {data.name}</Text>
        </TouchableOpacity> : null}

        {data?.children?.map((item, key) => {
          {
            if (item?.children) {
              return (<RenderGroupComponent key={item.id} keyt={key} data={item}></RenderGroupComponent>)
            }
          }
        })}
      </View>
    )
  }
  const RenderMainCategory = ({ title }) => {
    return (
      <View style={[styles.mainNonHightlightColor, styles.mainLevelView]}>
        <TouchableOpacity >
          <Text style={[styles.mainLevelfont]}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const data = {
    id: 2,
    name: "Retail Categories",
    depth: 0,
    children: [
      {
        id: 2,
        name: "Groceries",
        depth: 1,
        children: [
          {
            id: 3,
            name: "Laundry",
            depth: 2,
            children: []
          },
          {
            id: 4,
            name: "Home Care",
            depth: 2,
            children: []
          },
          {
            id: 5,
            name: "Pest Control",
            depth: 2,
            children: []
          },
          {
            id: 6,
            name: "Home Storage",
            depth: 2,
            children: []
          },
          {
            id: 7,
            name: "Shoe Care",
            depth: 2,
            children: []
          },
          {
            id: 8,
            name: "Beverages",
            depth: 2,
            children: [
              {
                id: 9,
                depth: 3,
                name: "coffee",
                children: []
              },
            ]
          },
          {
            id: 20,
            name: "Food",
            depth: 2,
            children: [
              {
                id: 21,
                name: "Snacks",
                depth: 3,
                children: []
              },
              {
                id: 22,
                name: "Candy",
                depth: 3,
                children: []
              },
              {
                id: 23,
                name: "Meals",
                depth: 3,
                children: []
              },
              {
                id: 24,
                name: "Dairy",
                depth: 3,
                children: []
              },
              {
                id: 25,
                name: "Baking",
                depth: 3,
                children: []
              },
              {
                id: 26,
                name: "Ice Cream",
                depth: 3,
                children: []
              }
            ]
          },
          {
            id: 27,
            name: "Beverages",
            depth: 2,
            children: []
          }
        ]
      },
      {
        id: 28,
        name: "Toys, Kids & Baby",
        depth: 1,
        children: [
          {
            id: 29,
            name: "Baby Care",
            depth: 2,
            children: []
          }
        ]
      },
      {
        id: 30,
        name: "Beauty & Health",
        depth: 1,
        children: [
          {
            id: 31,
            name: "Family Care",
            depth: 2,
            children: []
          },
          {
            id: 32,
            name: "Grooming",
            depth: 2,
            children: []
          },
          {
            id: 33,
            name: "Hair Care",
            depth: 2,
            children: []
          },
          {
            id: 34,
            name: "Oral Care",
            depth: 2,
            children: []
          },
          {
            id: 35,
            name: "Medicine",
            depth: 2,
            children: []
          },
          {
            id: 36,
            depth: 2,
            name: "Personal Care",
            children: []
          }
        ]
      }
    ]
  }
  return (
    <View style={SharedStyles.container}>
      <View style={styles.mainheader}>
        <Text style={styles.headerfont}>Filter</Text>
        <Text style={[styles.clearall, styles.headerfont]}>Clear All</Text>
      </View>
      {seprator()}
      <View style={styles.filterViewMain}>
        <View style={styles.filterViewLeftSide} >
          <RenderMainCategory title="Retail"> </RenderMainCategory>
          <RenderMainCategory title="Service"> </RenderMainCategory>
        </View>
        <ScrollView style={styles.filterViewRightSide} >
          <RenderGroupComponent data={data}></RenderGroupComponent>
        </ScrollView>
      </View>
    </View>
  );
}
