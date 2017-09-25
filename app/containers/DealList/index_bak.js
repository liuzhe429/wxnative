/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
export default class DealListScreen extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.title
    title: "列表"
  });
  // 点击返回上一页方法
  backVC=()=>{
    //返回首页方法
    this.props.navigation.goBack();
  }
  refreshing(){
    let timer =  setTimeout(()=>{
                clearTimeout(timer)
                alert('刷新成功')
            },1500)
  }
  _onload(){
      let timer =  setTimeout(()=>{
          clearTimeout(timer)
          alert('加载成功')
      },1500)
  }
  _renderItem = (item) => {
    var txt = '第' + item.index + '个' + ' title=' + item.item.title;
    var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
    return <Text style={[{flex:1,height:100,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
  }

  _header = () => {
      return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
  }

  _footer = () => {
      return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
  }

  _separator = () => {
      return <View style={{height:2,backgroundColor:'yellow'}}/>;
  }
  render() {
    const { navigate } = this.props.navigation
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({key: i, title: i + ''});
    }
    
    return (
        <View style={styles.container}>
          {/* <TouchableOpacity style={{
                                    height:40,
                                    backgroundColor:'green',
                                    justifyContent: 'center'}}
                            onPress={() =>{this.backVC()}}>
             <Text>{this.props.navigation.state.params.des}</Text>
          </TouchableOpacity> */}
          <FlatList
          data={data}
          ref={(flatList)=>this._flatList = flatList}
          ListHeaderComponent={this._header}
          ListFooterComponent={this._footer}
          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          onRefresh={this.refreshing}
          refreshing={false}
          onEndReachedThreshold={0}
          onEndReached={
              this._onload
          }
          numColumns ={3}
          getItemLayout={(data,index)=>(
            {length: 100, offset: (100+2) * index, index}
          )}

          />
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