/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PureComponent } from 'react';
import { connect } from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,ScrollView,
  ActivityIndicator
} from 'react-native';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import{ getZxListDatas,clearZxListDatas } from "./dealListReducer.js"
import InvestItem from "../../components/InvestItem"
import  Dimensions from 'Dimensions'//获取屏幕的宽高
let ScreenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height

class DealListScreen extends PureComponent {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.title
    title: "列表"
  });
  constructor(props) {
    super(props)
    this.state = {
      navigate : this.props.navigation.navigate,
      data :[],
      refreshing:true
    }
  }
  // 点击返回上一页方法
  backVC=()=>{
    //返回首页方法
    this.props.navigation.goBack();
  }
  refreshing(){
    console.log('刷新成功')

    let timer =  setTimeout(()=>{
                clearTimeout(timer)
                this.setState({
                  refreshing:false
                })
                console.log('刷新成功')
            },1000)
  }
  _onload(){
    
      let timer =  setTimeout(()=>{
          clearTimeout(timer)
          let page = this.props.zxlistpage
          // if(this.props.zxlistdatas.length>0){
          //   let page = this.props.zxlistpage+1
          //   this.loadData(page)
          // }
          console.log('加载成功',this.props)
      },1500)
  }
  
  _renderItem = (info) => {
    return <InvestItem data={info} navigate={this.state.navigate}/>
  }
  _extraUniqueKey(item ,index){
    return "index"+index+item
  } 
  componentDidMount(){
    this.loadData()
  }
  loadData(page){
    page = page || 1
    const {dispatch} = this.props
    fetch(global.originTarget+"/api/index/zxP2pindex?dealListType=zx&page="+page,()=>{
      dispatch(clearZxListDatas())
    })
    .then((res)=>res.json())
    .then((datas)=>{
      setTimeout(()=>{
        this.setState({
          refreshing:false
        })
      },1000)
      
      dispatch(getZxListDatas(datas.data,page))
    })
  }

  _header = () => {
      return <Text></Text>;
  }

  _footer = () => {
      return <Text></Text>;
  }

  //每个标的的间隔
  _separator = () => {
      return <View style={{height:10,backgroundColor:'transparent'}}/>
  }
  //加载等待的view
  renderLoadingView() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                style={[{height: 80}]}
                color='red'
                size="large"
            />
        </View>
    );
  }
  //加载等待的view
  renderLoadedView() {
    return (
      <ScrollView>
        <AnimatedFlatList
          data={this.props.zxlistdatas}
          keyExtractor = {this._extraUniqueKey}
          ref={(flatList)=>this._flatList = flatList}
          ListHeaderComponent={this._header}
          ListFooterComponent={this._footer}
          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          refreshing={this.state.refreshing}
          onRefresh={this.refreshing.bind(this)}
          onEndReachedThreshold={0.2}
          initialNumToRender={5}
          onEndReached={(info)=>{
            this._onload()
          }}
          numColumns ={1}
          
        />
      </ScrollView>
    );
}
  render() {
    return (
      <ScrollView>
        <AnimatedFlatList
          data={this.props.zxlistdatas}
          keyExtractor = {this._extraUniqueKey}
          ref={(flatList)=>this._flatList = flatList}
          ListHeaderComponent={this._header}
          ListFooterComponent={this._footer}
          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          refreshing={this.state.refreshing}
          onRefresh={this.refreshing.bind(this)}
          onEndReachedThreshold={100}
          onEndReached={(info)=>{
            this._onload()
          }}
          numColumns ={1}
          getItemLayout={(data,index)=>(
            {length: 100, offset: (100+2) * index, index}
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },
  spindicator: {
    marginLeft: 10,
    width: 2,
    height: 16,
    backgroundColor: '#FFB8C6',
  }
});
const mapStateToProps = (state) => {
  let { dealListReducer } = state
  return dealListReducer
}
export default connect(mapStateToProps)(DealListScreen)