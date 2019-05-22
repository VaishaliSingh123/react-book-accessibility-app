const AppStyle = theme => ({
  
searchBarLayout:{
  display: "flex",
  justifyContent: "flex-end",
  width:"90%",
  margin:"5vh",
  overflow:"hidden"
},
searchBarWidth:{
  width:"70%"
},
filterBarWidth:{
  width:"30%"
},
inputStyle: {
  padding: "10px",
  fontSize: "17px",
  border: "1px solid grey",
  float: "left",
  width: "50%",
  background: "#f1f1f1"
},

buttonStyle: {
  float: "left",
  width: "20%",
  padding: "10px",
  background: "#2196F3",
  color: "white",
  fontSize: "17px",
  border: "1px solid grey",
  borderLeft: "none",
  cursor: "pointer"
},
card:{
  width:"90%",
  margin:"5vh",
  overflow:"hidden"
},
tableLayout:{
  tableLayout:"fixed"
}
});
export default AppStyle;