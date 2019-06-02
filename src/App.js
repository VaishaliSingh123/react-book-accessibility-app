import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppStyle from './AppStyle';

class App extends React.Component{
  constructor(props){
    super(props);
  this.state = {
    isSorted: false,
    gamesInformation:undefined,
    error:null,
    searchValue:undefined
  };
  this.renderTableData=this.renderTableData.bind(this);
  this.handleChangeSearchInput=this.handleChangeSearchInput.bind(this);
  this.tableRenderingFunction=this.tableRenderingFunction.bind(this);
  this.rowRenderingFinction=this.rowRenderingFinction.bind(this);
  this.handleSorting=this.handleSorting.bind(this);
}

componentDidMount(){
  this.setState({gamesInformation:this.props.dataSet })
}

  
 
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
    const {gamesInformation, isSorted}=this.state;
    var sortedGameInfo;
    if(gamesInformation && gamesInformation.length>0){
     if(isSorted===true){
         sortedGameInfo=gamesInformation.sort(function(a, b){
          return (a.Year-b.Year);
      })
    }else if(isSorted===false){
       sortedGameInfo=gamesInformation.sort(function(a, b){
        return (a.Rank-b.Rank);
    })
  }
        console.log("sorted data: ",sortedGameInfo);
        return sortedGameInfo.map((game,index)=>{
          return this.tableRenderingFunction(game,index);
        });
      
    }
  }
  tableRenderingFunction(game, index){
    const {searchValue}=this.state;
    if(game && searchValue && searchValue.length>0 && game["Name"]!==undefined){
      const str=game["Name"];
      console.log("str:",str);
    const lowerStr=str.toLowerCase();
    const lowerSearchString=searchValue.toLowerCase();
    if (lowerStr.includes(lowerSearchString) ) {
     return this.rowRenderingFinction(game,index);
      }
    }
      else if(game){
      return this.rowRenderingFinction(game,index);
      }
  };
  rowRenderingFinction(game,index){
    return (
      <TableRow  key={index}>
         <TableCell>{game.Rank}</TableCell >
         <TableCell>{game.Genre}</TableCell >
         <TableCell>{game.Global_Sales}</TableCell >
         <TableCell>{game.Name}</TableCell >
         <TableCell>{game.Platform}</TableCell >
         <TableCell>{game.Publisher}</TableCell >
         <TableCell>{game.Year}</TableCell >
      </TableRow >
   )
  }

  handleSorting(event){
    if(event){
      this.setState({isSorted:!this.state.isSorted});
    }

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
      <Button onClick={this.handleSorting}>Click for Sorting</Button>
      </div>
      </div>
      <div>
      <Card className={classes.card}>
      <Table className={classes.tableLayout}>
      <TableHead>
          <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Genre</TableCell>
          <TableCell>Global_Sales</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Platform</TableCell>
          <TableCell>Publisher</TableCell>
          <TableCell>Year</TableCell>
          </TableRow>
      </TableHead>   
      <TableBody>
        {this.renderTableData()}
        </TableBody>
      </Table>

      </Card>
        </div>
    </div>
  );
  }
}

export default withStyles(AppStyle)(App);
