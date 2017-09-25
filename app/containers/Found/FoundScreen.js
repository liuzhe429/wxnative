import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
export default class FoundScreen extends Component {
  static navigationOptions = {
    headerTitle: '首页',//对页面的配置
    tabBarLabel: '首页',
    tabBarIcon:<View style={{height:30,width:30,backgroundColor:'red'}}></View>
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{height:60,backgroundColor:'orange',justifyContent: 'center',}}
                          onPress={() => navigate('DealList', { title: '专享',des:'我是返回点击我' })} >
           <Text style={{textAlign:"center"}}>点击进入列表页</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});