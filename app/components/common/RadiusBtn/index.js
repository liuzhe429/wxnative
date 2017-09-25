import React, {
  Component,
 } from 'react'
 import PropTypes from 'prop-types'
import {
 StyleSheet,
 PixelRatio,
 Text,
 View,
 TouchableHighlight,
 Platform,
} from 'react-native'

export default class RadiusBtn extends Component {

 static propTypes = {
   btnName: PropTypes.string,
   textStyle: Text.propTypes.style,
   btnStyle: TouchableHighlight.propTypes.style,
   underlayColor:       TouchableHighlight.propTypes.underlayColor,
 }

 static defaultProps = {
   btnName: 'Button',
   underlayColor: '#ee4634',
 }


 render() {
   return (
     <View style = {{
                   flexDirection: 'row',
                   justifyContent: 'center',
                   alignItems: 'center',}}>
         <TouchableHighlight
             underlayColor={this.props.underlayColor}
             activeOpacity={0.5}
             style={[styles.center, styles.btnDefaultStyle, this.props.btnStyle]}
             onPress={this.props.onPress}>
             <Text style={[styles.textDefaultStyle, this.props.textStyle]}>{this.props.btnName}</Text>
         </TouchableHighlight>
     </View>
   )
 }
}

const styles = StyleSheet.create({
 center: {
   justifyContent:'center',
   alignItems: 'center',
 },
 btnDefaultStyle: {
   width:66,
   height:24,
   backgroundColor: '#ee4634',
   borderColor: '#ee4634',
   borderRadius: 15,
   borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
 },
 textDefaultStyle: {
   fontSize: 12,
   color: '#ffffff',
 },
})