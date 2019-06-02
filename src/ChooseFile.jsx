import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from "@material-ui/core/styles";
import ChooseFileStyle from './ChooseFileStyle';
import App from './App';
import  GAME  from "./gamePic.jpg";

class ChooseFile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataSet:undefined
    }
    this.fileSetState=this.fileSetState.bind(this);
    this.renderLandingPage=this.renderLandingPage.bind(this);
  }
  fileSetState(event){
      if(event){
       let self=this;
        var f = event.target.files[0];   
        if (f) {
          var r = new FileReader();
          
          r.onload = function(e) { 
              var content = e.target.result;
              var dataArray=[];
              var contentArray= content.split("\n");          
              var keys;
              var valueArray;
              contentArray.map((value,index)=>{
                  if(index===0){
                    keys=value.split(",");
              }else{
              var obj={};
                 valueArray=value.split(",");
                 valueArray.map((keyVal,keyIndex)=>{
                  obj[keys[keyIndex]]=keyVal;
              })
               dataArray.push(obj);
              } 
              });
              self.setState({dataSet:dataArray});
          }
          r.readAsText(f);
        } else { 
          alert("Failed to load file");
        }
    }
  }
  renderLandingPage(){
    const { classes } = this.props;
    return(
      <div className={classes.mainDiv}>
      <div>
         <Card className={classes.card}>
           <div>
             <img  src={GAME} alt={"game"} className={classes.image}/>
           </div>
           <div className={classes.chooseFile}>
             <div>
                <h2>Show a file-select field:</h2>
             </div>
             <div>
               <form onClick={this.handleFileSubmation}>
                   Select files: <input type="file" name="myFile"  onChange={this.fileSetState}/><br/><br/>
                   <input type="submit" onClick={this.handleFileSubmation} />
                 </form>
             </div>
           </div>
         </Card>
      </div>
    </div>
    );
  }
  render(){
    const { classes } = this.props;
    const { dataSet } = this.state;
    console.log(dataSet);
    const content=(dataSet&&dataSet.length>0)?<App dataSet={dataSet}/> :this.renderLandingPage();
  return (
      <div>
        {content}
      </div>
  );
  }
}

export default withStyles(ChooseFileStyle)(ChooseFile);
