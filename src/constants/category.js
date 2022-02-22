const CatrgoryJson = [
  {
    id: 2,
    name: "Retail",
    depth: 0,
    children: [
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
          },
          {
            id: 37,
            name: "Furniture",
            depth: 2,
            children: []
          },
          {
            id: 38,
            name: "Clothing",
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
      },
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
                name: "Coffee",
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
          }
        ]
      }
    ]
  },
  {
    id: 51,
    name: "Service",
    depth: 0,
    children: [
      {
        id: 52,
        name: "Banking",
        depth: 1,
        children: [
          {
            id: 60,
            name: "Private Banking",
            depth: 2,
            children: [
              {
                id: 61,
                name: "Axis",
                depth: 3,
                children: [

                ]
              },
              {
                id: 62,
                name: "HDFC",
                depth: 3,
                children: []
              },
              {
                id: 63,
                name: "HSBC",
                depth: 3,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 53,
        name: "Beauty & Health",
        depth: 1,
        children: [
          {
            id: 56,
            name: "Fitness",
            depth: 2,
            children: []
          }
        ]
      },
      {
        id: 54,
        name: "Entertainment",
        depth: 1,
        children: [
          {
            id: 57,
            name: "Casinos and Gaming",
            depth: 2,
            children: []
          }
        ]
      },
      {
        id: 55,
        name: "Restaurants",
        depth: 1,
        children: [
          {
            id: 59,
            name: "Restaurants Sub",
            depth: 2,
            children: []
          }
        ]
      },
      {
        id: 58,
        name: "Tourism & Travel",
        depth: 1,
        children: [
          {
            id: 59,
            name: "Hotels",
            depth: 2,
            children: []
          }
        ]
      },
    ]
  }
]
export function getAllCategory() {
  return CatrgoryJson;
}
export function getCategoryByName(mainCategory) {
  const getChildren = CatrgoryJson.filter((cat) => cat.name == mainCategory);
  return getChildren[0];
}