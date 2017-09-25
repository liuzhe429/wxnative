import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import  Dimensions from 'Dimensions'//获取屏幕的宽高
let ScreenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
import DashLine from "../../components/common/DashLine"
import InvestItem from "../../components/InvestItem"
import{getZxDatas} from "./dealListReducer.js"

class DealListScreen extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })
  constructor(props) {
    super(props)
    this.state = {
      navigate : this.props.navigation.navigate,
      data :[]
    }
    // console.log(this.props.navigation.state.params.title,"navigation.state.params.title")
  }
  componentWillMount(){
    const {dispatch} = this.props
    let params = this.props.navigation.state.params
    if(params.key == "zx"){
      fetch("http://10.20.69.46:3030/api/index/zxP2pindex?dealListType=zx&page=1")
      .then((res)=>res.json())
      .then((datas)=>{
        dispatch(getZxDatas(datas.data))
        this.setState({
          zxdatas:this.props.zxdatas
        })
      })
    }
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
  _renderItem = (info) => {
      return <InvestItem data={info} navigate={this.state.navigate}/>
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
  componentDidMount(){
    setTimeout(()=>{
      console.log(this.props.zxdatas,"this.props.zxdatas")
    },10000)
  }
  render() {
    const { navigate } = this.props.navigation
    return (
        <View>
          <FlatList
            data={this.props.zxdatas}
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
  let { dealListReducer } = state;
  return dealListReducer
}

export default connect(mapStateToProps)(DealListScreen)