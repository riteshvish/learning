import React,{Component} from 'react';
import {View, Text,ScrollView,Image} from 'react-native';


let colormartix=["#E6B0AA","#D7BDE2","#A9CCE3","#A3E4D7","#A9DFBF","#A9CCE3","#F7DC6F","#F5CBA7","#AEB6BF","#A9CCE3"]
class Masnory extends React.Component {

  createRows(){
    // return null;
    var row=[];
    for (var i = 0; i < this.props.cols; i++) {
      row.push(
        <View style={{}}>
          <Text>TEs</Text>
        </View>
      )
    }
    return row;
  }

  render(){
    return(
      <ScrollView style={{flexDirection:'row'}} >
        {this.props.children}
      </ScrollView>
    )
  }
}
class MasnoryGrid extends React.Component {

  render(){
    return(
      <View style={{flex:1,flexDirection:'row'}}>
        <Text>sdfasd</Text>
      </View>
    )
  }
}
class MasnoryImage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      height:100
    }
  }
  findPoint(a,b,c){
    return (a*c/b);
  }
  getHeightWidth(){
    Image.getSize(this.props.source.uri, (w, h) => {

      let pImageHeight=this.findPoint(185,w,h);
        console.warn(this.state.height,pImageHeight);
        this.setState({height:pImageHeight})
    })
  }
  componentWillMount() {
    this.getHeightWidth();
  }
  render(){
    return(
      <Image style={[this.props.style,{width:185,height:this.state.height}]} source={this.props.source}>
        {this.props.children}
      </Image>
    )
  }
}

export{
  Masnory,
  MasnoryGrid,
  MasnoryImage
}
