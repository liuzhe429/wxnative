import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AppRegistry,StyleSheet,Text,View,TouchableOpacity,Image,ScrollView,SectionList,ListView, } from 'react-native'
import Swiper from 'react-native-swiper'
import  Dimensions from 'Dimensions'//获取屏幕的宽高
let ScreenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
import DashLine from "../../components/common/DashLine"
import InvestItem from "../../components/InvestItem"
import{getZxDatas,getSxyDatas,clearZxDatas,clearSxyDatas} from "./homeReducer.js"

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        sxydatas:this.props.sxydatas || [],
        zxdatas:this.props.zxdatas || []
    }
  }
  _renderItem = (info) => {
    let dealKey = info.section.key == "专享" ? "投资详情" : "详情"
    return <InvestItem data={info} navigate={this.props.navigation.navigate} dealType={info.section.key} dealKey={dealKey}/>
  }
  _renderSectionHeader = (info) => {
    const { navigate } = this.props.navigation
    let keyType = info.section.key == "专享" ? "zx" :"sxy"
    return  <View style={styles.itemRowTitle}>
              <View style={{width:"50%",flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                <Text style={{height:20,textAlign:'left',width:2,backgroundColor:"#ee4634",marginLeft:15,marginRight:6}}></Text>
                <Text style={{textAlign:'left',fontSize:15,color:'#000',}}>{info.section.key}</Text>
              </View>
              <View style={{width:"50%",flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                <TouchableOpacity activeOpacity={1} style={{width:"40%",height:50,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                  {
                    info.section.key == "专享"
                    ? <Text style={{fontSize:13,color:"#909090"}}
                        onPress={() => navigate('DealList', { title: "专享",key:"zx" })}>更多</Text>
                    : <Text style={{fontSize:13,color:"#909090"}}
                        onPress={() => navigate('SxyList', { title: "随鑫约",key:"sxy" })}>更多</Text>
                  }
                  <Text style={styles.arrow}>
                    <Image
                      source={require('./images/arrows_reserve.png')}
                      style={{width:8,height:13}}/>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
  }
  _extraUniqueKey(item ,index){
    return "index"+index+item
  } 
  _renderSectionHeader2 = (info) => {
    return <View style={{height:1,backgroundColor:"#d8d8d8"}}></View>
  }
  _ListFooterComponent (){
    return <View style={{height:60}}></View>
  }
  componentWillMount() {
    const {dispatch} = this.props
    let url = global.originTarget+"/api/deal/reserveConf"
    if(this.props.sxydatas.length<0){
      
    }
    fetch(url,()=>{
      dispatch(clearSxyDatas())
    }).then((res)=>res.json())
      .then((datas)=>{
        dispatch(getSxyDatas(datas.data.list.slice(0,2)))
      })
    if(this.props.zxdatas.length<0){
      
    }
    fetch(global.originTarget+"/api/index/zxP2pindex?dealListType=zx&page=1",()=>{
      dispatch(clearZxDatas())
    }).then((res)=>res.json())
    .then((datas)=>{
      dispatch(getZxDatas(datas.data.slice(0,2)))
    })
    
  }
  render() {
    const { navigate } = this.props.navigation
    var sections = [{
      key:"随鑫约",
      data: this.props.sxydatas
    },{
      key:"专享",
      data: this.props.zxdatas
    }]
    return (
      <View>
        {/* logo部分 start */}
        <View style={{flexDirection:"row",justifyContent:"center",paddingTop:30,paddingBottom:10,borderBottomWidth:1,borderBottomColor:"#ccc",backgroundColor:"#fff"}}>
          <Image
            source={require('./images/home_logoicon.png')}
            style={{width:88,height:28}}/>
        </View>
        <ScrollView>

          <Swiper horizontal={true} height={160} autoplay showsPagination={false}>
            <View>
              <Image source={require('./images/banner/11.jpg')} style={styles.swiperImg}/>
            </View>
            <View>
              <Image source={require('./images/banner/22.jpg')} style={styles.swiperImg}/>
            </View>
            <View>
              <Image source={require('./images/banner/3.jpg')} style={styles.swiperImg}/>
            </View>
            <View>
              <Image source={require('./images/banner/4.jpg')} style={styles.swiperImg}/>
            </View>
          </Swiper>

          {/* 随鑫约部分 */}
          <View>
            <SectionList
              sections={sections}
              getItemCount={2}
              keyExtractor = {this._extraUniqueKey}
              SectionSeparatorComponent={this._renderSectionHeader2}
              ListFooterComponent={this._ListFooterComponent}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              ItemSeparatorComponent={this._renderSectionHeader2}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  swiperImg: {
    width:"100%",
    height:"100%",
    alignItems:"center",
    alignSelf:"center"
  },
  itemRowTitle: {
    height:50,flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10,
    backgroundColor:"#fff"
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  arrow:{
    width:20,
    marginTop:7,
    marginLeft:2,
    marginRight:0,
  }
})
const mapStateToProps = (state) => {
  let { homeReducer } = state;
  return homeReducer
}

export default connect(mapStateToProps)(HomeScreen)