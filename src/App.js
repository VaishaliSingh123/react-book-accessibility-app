import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AppStyle from './AppStyle';

class App extends React.Component{
  constructor(props){
    super(props);
  this.state = {
    right: false,
    bookInformation:undefined,
    error:null,
    isSearchEnabled:false,
    searchValue:undefined
  };
  this.renderTableData=this.renderTableData.bind(this);
  this.handleChangeSearchInput=this.handleChangeSearchInput.bind(this);
  this.tableRenderingFunction=this.tableRenderingFunction.bind(this);
  this.handleSearch=this.handleSearch.bind(this);
  
}

  componentDidMount() {
    fetch("https://c3e89f4f-0201-4f7c-b428-d61e98ff496f.mock.pstmn.io/getBooks")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            bookInformation: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  tableRenderingFunction(bookInformation){
    if(bookInformation && bookInformation.length>0){
    const {classes}=this.props;
    return bookInformation.map((book,index)=>{
      return (
        <tr key={index}>
           <td className={classes.tableColumnStyling}>{this.state.bookInformation[index].book_info.author}</td>
           <td className={classes.tableColumnStyling}>{this.state.bookInformation[index].book_info.description}</td>
           <td className={classes.tableColumnStyling}>{this.state.bookInformation[index].book_info.genre}</td>
           <td className={classes.tableColumnStyling}>{this.state.bookInformation[index].book_info.name}</td>
           <td className={classes.tableColumnStyling}>{this.state.bookInformation[index].book_info.publisher}</td>
           <td className={classes.tableColumnStyling}>{this.state.bookInformation[index].is_available?"true":"false"}</td>
           <td className={classes.tableColumnStyling}>{this.state.bookInformation[index].book_id}</td>
        </tr>
     )
    })
  }else return null;
  };
  handleChangeSearchInput(event){   
    if(event){
      const searchString=event.currentTarget.value;
      if(searchString.length>0)
      this.setState({isSearchEnabled:true, searchValue:searchString });
      else
      this.setState({isSearchEnabled:false, searchValue:'' });
      this.handleSearch();  
}
}
handleSearch(){
  const {bookInformation, searchValue,isSearchEnabled}=this.state;
  if(isSearchEnabled && searchValue.length>0){
  for (var i = 0; i < bookInformation.length; i++) {
    const str=bookInformation[i].book_info["name"];
    const lowerStr=str.toLowerCase();
    const lowerSearchString=searchValue.toLowerCase();
    if (lowerStr.includes(lowerSearchString) ) {
        return this.tableRenderingFunction(bookInformation[i]);
      }
    }
  }else return null;
}
  
  renderTableData(){
    if(this.state.bookInformation!==undefined){
        return this.tableRenderingFunction(this.state.bookInformation);
  }
  };
  render(){
    const { classes } = this.props;
    const calledFun=this.state.isSearchEnabled?this.handleSearch():this.renderTableData();
  return (
    <div>
    <div className={classes.searchBarLayout}>
      <div className={classes.searchBarWidth}>
      <form >
          <input type="text" placeholder="Search..." name="search2" className={classes.inputStyle} onChange={this.handleChangeSearchInput} />
          <button type="submit" className={classes.buttonStyle}>Search</button>
      </form>
      </div>
      <div className={classes.filterBarWidth}>
      <Button onClick={this.toggleDrawer('right', true)}>Click for filtering</Button>
      <SwipeableDrawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
          onOpen={this.toggleDrawer('right', true)}
        >
          
           "value for right"
         
          </SwipeableDrawer>
      </div>
      </div>
      <div>
      <Card className={classes.card}>
      <table className={classes.tableStyling}>
        <tr>
          <th>Author</th>
          <th>Description</th>
          <th>Genre</th>
          <th>Name</th>
          <th>Publisher</th>
          <th>Available</th>
          <th>Book Id</th>
        </tr>
        <tbody>
          {calledFun}
        </tbody>
      </table>

      </Card>
        </div>
    </div>
  );
  }
}

export default withStyles(AppStyle)(App);
