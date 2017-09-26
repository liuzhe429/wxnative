import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import  Dimensions from 'Dimensions'//获取屏幕的宽高
let ScreenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
import DashLine from "../../components/common/DashLine"
import InvestItem from "../../components/InvestItem"
import {getSxyListDatas,clearSxyListDatas} from "./sxyListReducer.js"
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class SxyListScreen extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })
  constructor(props) {
    super(props)
    this.state = {
      navigate : this.props.navigation.navigate,
      isLoading: true,
      //网络请求状态
      error: false,
      errorInfo: "",
      dataArray : this.props.sxyListdatas || []
    }
  }
  componentWillMount(){
    console.log("加载")
    if(this.props.sxyListdatas.length>0){
      this.setState({
        isLoading: false
      })
    }else{
      this.loadData()
    }
  }
  loadData(){

    const {dispatch} = this.props    
    fetch(global.originTarget+"/api/deal/reserveConf",()=>{
      dispatch(clearSxyDatas())
    })
    .then((res)=>res.json())
    .then((datas)=>{
      dispatch(getSxyListDatas(datas.data.list))
      this.setState({
        isLoading: false,
      })
    })
    .done()
  }
  _onload(){
    if(this.props.zxlistdatas.length>0){
      this.setState({
        isLoading: false
      })
    }else{
      this.loadData()
    }
  }
  // 点击返回上一页方法
  backVC=()=>{
    //返回首页方法
    this.props.navigation.goBack()
  }
  refreshing(){
    console.log("zheli 刷新")
    const { dispatch } = this.props
    dispatch(clearSxyListDatas())
    this.loadData()
  }

  _extraUniqueKey(item ,index){
    return "index"+index+item
  }
  //加载等待的view
  renderLoadingView() {
    return (
        <View>
            <ActivityIndicator
                animating={true}
                style={[ {height: 80}]}
                size="small"
            />
        </View>
    )
  }
  //加载失败view
  renderErrorView(error) {
    return (
        <View>
            <Text>
                Fail: {error}
            </Text>
        </View>
    )
  }
  _renderItem = (info) => {
      return <InvestItem data={info} navigate={this.state.navigate}/>
  }
  renderData(){
    return (
          <ScrollView>
            <FlatList
                data={this.props.sxyListdatas}
                keyExtractor = {this._extraUniqueKey}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._separator}
                onRefresh={this.refreshing.bind(this)}
                refreshing={this.state.isLoading}
            />
          </ScrollView>
    )
  }
  // 应该不需要
  _header = () => {
      // return <Text style={[itermStyles.txt,{backgroundColor:'black',color:"#fff"}]}>这是头部</Text>
      return <Text></Text>
  }
  //后期删除
  _footer = () => {
      // return <Text style={[itermStyles.txt,{backgroundColor:'black'}]}>这是尾部</Text>
      return <Text></Text>
  }
  //每个标的的间隔
  _separator = () => {
      return <View style={{height:10,backgroundColor:'transparent'}}/>
  }
  render() {
    const { navigate } = this.props.navigation
    //第一次加载等待的view
    if (this.state.isLoading && !this.state.error) {
      return this.renderLoadingView()
    } else if (this.state.error) {
        //请求失败view
        return this.renderErrorView(this.state.errorInfo);
    }
    //加载数据
    return this.renderData()
  }
}
const mapStateToProps = (state) => {
  let { sxyListReducer } = state
  return sxyListReducer
}

export default connect(mapStateToProps)(SxyListScreen)