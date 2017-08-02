import React, {Component} from 'react';
import {View,Text,Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Easing,
  StyleSheet
} from 'react-native';


export default class AButton extends Component{
  constructor(props) {
      super(props)
      this.triggerAnimation=this.triggerAnimation.bind(this);
  }
  componentWillMount() {
    this.animation= new Animated.Value(0);
  }
  triggerAnimation(){
    this.animation.setValue(0);
    Animated.timing(this.animation,{
      duration:100,
      toValue:1,
      ease:Easing.bounce

    }).start();
  }

  showShadow(){
    return(
      <Animated.View style={[this.props.style,this.props.showdowstyle,{position:'absolute'}]}>
          <Text style={styles.text}> </Text>
      </Animated.View>
    )
  }

  render(){
    const interpolate = this.animation.interpolate({
      inputRange: [0,.5,1],
      outputRange: [0,this.props.showdowstyle.top*2,0],
      extrapolate: 'clamp',
    });
    const style={
      transform:[
        {
          translateX:interpolate
        }
      ]
    }
    return(
      <View
        style={[this.props.style,{backgroundColor:'transparent',padding:0,marginBottom:this.props.showdowstyle.top}]}
        >
        <View style={[this.props.style,{position:'relative',backgroundColor:'transparent',padding:0}]}>
          {this.showShadow()}
          <TouchableWithoutFeedback onPress={()=>{
              //alert("clicked")
              this.triggerAnimation()
            }}>
            <Animated.View style={[this.props.style,{marginTop:interpolate}]}>
              <Text  style={[styles.text,this.props.textstyle]}>
                {this.props.text}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
text:{
  color:'#fff',
  textAlign:'center'
}

});
