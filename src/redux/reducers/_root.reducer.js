import { combineReducers } from "redux";
import barcode from "./barcode.reducer";
import user from "./user.reducer";
import discover from "./discover.reducer";

// Combines all of our redcuers into one root reducer that makes for easier access
// In the middleware

const valuesList = (
  state = [
    {
      id: 0,
      image_url:
        "https://t4.ftcdn.net/jpg/01/42/73/57/360_F_142735729_Uo5fgGHJ8CK10M36WeHxoyA7KBnFyjgJ.jpg",
      scrim: "rgba(0, 0, 0, .2)",
      text_color: "white",
      name: "Efficient Water Use",
      description:
        "Ensure a sustainable freshwater supply and address water scaricity",
      icon_name: "water",
      },
    {
      id: 1,
      image_url:
        "https://media.istockphoto.com/vectors/crowd-of-young-and-elderly-men-and-women-in-trendy-hipster-clothes-vector-id1202344480?k=20&m=1202344480&s=612x612&w=0&h=PCU3ePuJWydABubaWLzEMKILX1iFvDR7dQBgm5IyMIs=",
      scrim: "rgba(0, 0, 0, .3)",
      text_color: "white",
      name: "Diverse Leadership",
      description:
        "Strive for leadership by women, veterans, or minoritzed people",
      icon_name: "account-group",
      },
    {
      id: 2,
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-MftU146rqnu3qXiH1-PvbhqkBtqxln3nA&usqp=CAU",
      scrim: "rgba(0, 0, 0, .3)",
      text_color: "white",
      name: "Respect to Human Rights",
      description:
        "Stand against violence, human trafficking, and other abuses",
      icon_name: "earth",
      },
    {
      id: 3,
      image_url:
        "https://media.istockphoto.com/vectors/recycle-garbage-bins-waste-types-segregation-recycling-organic-paper-vector-id854422120?k=20&m=854422120&s=612x612&w=0&h=RURX5Cdvh84nqSrUhFJIrOSits3KEcgWN3vgrofdfDE=",
      scrim: "rgba(0, 0, 0, .2)",
      text_color: "white",
      name: "Reduced Waste",
      description:
        "Use reuseable materials and practice the conscious disposal of toxic chemicals",
      icon_name: "trash-can",
      },
    {
      id: 4,
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTppPDG8eeWQLSrnUaSFarz-wbitR6IHINsyQ&usqp=CAU",
      scrim: "rgba(0, 0, 0, .3)",
      text_color: "white",
      name: "Business Ethics",
      description:
        "Ensure business is run with ethical practices",
      icon_name: "scale-balance",
      },
    {
      id: 5,
      image_url:
        "https://images.pond5.com/cartoon-animation-trees-field-footage-055967007_iconl.jpeg",
      scrim: "rgba(0, 0, 0, .2)",
      text_color: "white",
      name: "Low Carbon Footprint",
      description:
        "Effectively limit the amoung of greenhouse gasses produced",
      icon_name: "molecule-co",
      },
    {
      id: 6,
      image_url:
        "https://thumbs.dreamstime.com/b/professional-workers-labor-day-cartoons-set-characters-people-jobs-154742856.jpg",
      scrim: "rgba(0, 0, 0, .2)",
      text_color: "white",
      name: "Care for Workers",
      description:
        "Provide employees with healthcare and a safe working enviornment",
      icon_name: "account-hard-hat",
      },
  ],
  action
) => {
  switch (action.type) {
    case "SET_VALUES_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  valuesList,
  barcode,
  user,
  discover,
});
