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
    // console.log(this.props.navigation.state.params.title,"navigation.state.params.title")
  }
  componentWillMount(){
    let url ="http://10.20.69.46:3030/api/deal/reserveConf"
    // let url = "https://mo.wangxinlicai.com/api/deal/reserveConf"
    const {dispatch} = this.props
    // let url = "https://mo.wangxinlicai.com/api/deal/reserveConf"
    console.log(this.props.sxyListdatas.length,"提前判断")
    if(this.props.sxyListdatas.length>0) return
    fetch(url,()=>{
      dispatch(clearSxyDatas())
    })
    .then((res)=>res.json())
    .then((datas)=>{
      dispatch(getSxyListDatas(datas.data.list))
      this.setState({
        //复制数据源
        dataArray: this.props.sxyListdatas,
        isLoading: false,
      })
      setTimeout(()=>{
        console.log(this.props.sxyListdatas,"sxydatas")
      },1000)
    })
    .catch((error)=>{
      this.setState({
        error: true,
        errorInfo: error
      })
    })
    .done()
  }

  // 点击返回上一页方法
  backVC=()=>{
    //返回首页方法
    this.props.navigation.goBack()
  }
  refreshing(){
    let timer = setTimeout(()=>{
                    clearTimeout(timer)
                    console.log('刷新成功')
                },1500)
  }
  _onload(){
      let timer = setTimeout(()=>{
                      clearTimeout(timer)
                      console.log('加载成功')
                  },1500)
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
                style={[styles.gray, {height: 80}]}
                color='red'
                size="large"
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
      <ScrollView >
          <Text >
              Data:
          </Text>
          <AnimatedFlatList
              data={this.state.dataArray}
              renderItem={this.renderItemView}
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
    return (
        <View >
          <FlatList
            data={this.state.dataArray}
            keyExtractor = {this._extraUniqueKey}
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
            numColumns ={1}
            getItemLayout={(data,index)=>(
              {length: 100, offset: (100+2) * index, index}
            )}
          />
        </View>
    )
  }
}
const mapStateToProps = (state) => {
  let { sxyListReducer } = state
  return sxyListReducer
}

export default connect(mapStateToProps)(SxyListScreen)