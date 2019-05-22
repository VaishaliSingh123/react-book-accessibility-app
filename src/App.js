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
    searchValue:undefined,
    noValueFound:false
  };
  this.renderTableData=this.renderTableData.bind(this);
  this.handleChangeSearchInput=this.handleChangeSearchInput.bind(this);
  this.tableRenderingFunction=this.tableRenderingFunction.bind(this);
  this.rowRenderingFinction=this.rowRenderingFinction.bind(this);
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
 
  handleChangeSearchInput(event){   
    if(event){
      const searchString=event.currentTarget.value;
      if(searchString.length>0)
      this.setState({searchValue:searchString });
      else
      this.setState({searchValue:'' });
}
} 
  renderTableData(){
    const {bookInformation}=this.state;
    if(bookInformation && bookInformation.length>0){
      return bookInformation.map((book,index)=>{
        return this.tableRenderingFunction(book,index);
      });
    }
  }
  tableRenderingFunction(book, index){
    const {searchValue}=this.state;
    if(book && searchValue && searchValue.length>0 ){
      const str=book.book_info["name"];
    const lowerStr=str.toLowerCase();
    const lowerSearchString=searchValue.toLowerCase();
    if (lowerStr.includes(lowerSearchString) ) {
     return this.rowRenderingFinction(book,index);
      }
    }
      else if(book){
      return this.rowRenderingFinction(book,index);
      }else {
        this.setState({noValueFound:true});
        return null;
      }
  };
  rowRenderingFinction(book,index){
    const {classes}=this.props;
    return (
      <tr key={index}>
         <td className={classes.tableColumnStyling}>{book.book_info.author}</td>
         <td className={classes.tableColumnStyling}>{book.book_info.description}</td>
         <td className={classes.tableColumnStyling}>{book.book_info.genre}</td>
         <td className={classes.tableColumnStyling}>{book.book_info.name}</td>
         <td className={classes.tableColumnStyling}>{book.book_info.publisher}</td>
         <td className={classes.tableColumnStyling}>{book.is_available?"true":"false"}</td>
         <td className={classes.tableColumnStyling}>{book.book_id}</td>
      </tr>
   )
  }
  
  render(){
    const { classes } = this.props;
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
        {this.renderTableData()}
        </tbody>
      </table>

      </Card>
        </div>
    </div>
  );
  }
}

export default withStyles(AppStyle)(App);
