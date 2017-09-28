import React, { Component,PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator
} from 'react-native'
import {PullList} from '../../components/common/react-native-pull-lz';
import InvestItem from "../../components/InvestItem"
import{ getZxListDatas,clearZxListDatas } from "./dealListReducer.js"

class DealListScreen extends PureComponent {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.title
  })
  constructor(props) {
    super(props)
    this.state = {
      // navigate : this.props.navigation.navigate,
      data :[],
      isLoading:true
    }
  }
  componentWillMount(){
    console.log(this.props,"props,hahah")
  }

  // 点击返回上一页方法
  backVC=()=>{
    //返回首页方法
    // this.props.navigation.goBack()
  }
  refreshing(){
    const { dispatch } = this.props
    dispatch(clearZxListDatas())
    this.loadData()
    let timer = setTimeout(()=>{
                    clearTimeout(timer)
                    console.log('刷新成功2')
                },1500)
      
  }
  _onload(){
    console.log(this.props,"hahahah")
    let page = this.props.zxlistpage
    if(this.props.zxlistdatas.length>0){
      let page = this.props.zxlistpage+1
      this.loadData(page)
    }
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
          isLoading:false
        })
      },3000)
      
      dispatch(getZxListDatas(datas.data))
    })
  }
  componentDidMount(){
    const {dispatch} = this.props
    if(this.props.zxlistdatas.length>0) return
    this.loadData()
  }
  
  render() {
    console.log("zxlistdatas",this.props.zxlistdatas)
    // const { navigate } = this.props.navigation
    return (
        <View>
          
          <PullList
            data={this.props.zxlistdatas}
            keyExtractor = {this._extraUniqueKey}
            ref={(flatList)=>this._flatList = flatList}
            ListHeaderComponent={this._header}
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            refreshing={false}
            onRefresh={this.refreshing.bind(this)}
            onEndReachedThreshold={0.3}
            onEndReached={this._onload.bind(this)}
            numColumns ={1}
          />
        </View>
    )
  }
}
const mapStateToProps = (state) => {
  let { dealListReducer } = state
  return dealListReducer
}
const styles = StyleSheet.create({
  spindicator: {
    marginLeft: 10,
    width: 2,
    height: 16,
    backgroundColor: '#FFB8C6',
  }
})
export default connect(mapStateToProps)(DealListScreen)