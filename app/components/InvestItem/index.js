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
  FlatList,
  Button
} from 'react-native';
import  Dimensions from 'Dimensions'//获取屏幕的宽高
let ScreenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
import DashLine from "../../components/common/DashLine"
import RadiusBtn from "../../components/common/RadiusBtn"
export default class InvestItem extends Component {
  constructor(props) {
    super(props)
  }
  // 点击返回上一页方法
  backVC=()=>{
    //返回首页方法
    this.props.navigation.goBack();
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
  render() {
    let info = this.props.data
    const navigate = this.props.navigate
    let deal_title = this.props.dealKey
    let dealType = this.props.dealType
    let router_path = dealType == "专享" ? "DealDetail" :"SxyDetail"
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => navigate(router_path, { title: deal_title })}>
        <View style={{backgroundColor:"#fff"}} onPress={() => navigate(router_path, { title: deal_title })}>
        {
          info.item.tagBefore || info.item.tagAfter
          ?
            <View style={[itermStyles.itemRow]}>
              {
                info.item.tagBefore
                ?
                <Text style={itermStyles.itemTag}>{info.item.tagBefore}</Text>
                : null
              }
              {
                info.item.tagAfter
                ?
                <Text style={itermStyles.itemTag}>{info.item.tagAfter}</Text>
                : null
              }
            </View>
          : <View style={[itermStyles.itemRow]}>
              <Text style={{marginRight:5}}>{info.item.title}</Text>
              {
                info.item.deal_tag_name
                ? <Text style={itermStyles.itemTag}>{info.item.deal_tag_name}</Text>
                : null
              }
              
            </View>
        }
        
        <View style={[itermStyles.itemRow]}>
          {
            info.item.rateText
            ? <View style={{flex:2}}>
                <Text style={itermStyles.itemTitle}>{info.item.rateText}</Text>
                <Text style={itermStyles.itemContent}>{info.item.rate}</Text>
              </View>
            : <View style={{flex:2}}>
                <Text style={itermStyles.itemTitle}>预期年化</Text>
                <Text style={itermStyles.itemContent}>{info.item.rate}%</Text>
              </View>
          }
          
          <View style={{flex:2}}>
            <Text style={itermStyles.itemTitle}>期限</Text>
            <Text style={itermStyles.itemContent}>
              {info.item.investLine || info.item.timelimit}
              <Text style={{fontSize:15}}>{info.item.investUnit || info.item.timeunit}</Text>
            </Text>
          </View>
          <View style={{flex:1,marginBottom:10}}>
            <Text style={itermStyles.itemTitle}></Text>
            <View style={{justifyContent:"flex-end",alignItems:"center",marginRight:15}}>
              
              {/* <Text style={itermStyles.button} onPress={() => navigate("DealConfirm", { title: "投资页面" })}>{info.item.buttonName ? "去预约" : "投资"}
              </Text> */}
              <RadiusBtn btnName={info.item.buttonName ? "去预约" : "投资"}
                onPress={() => navigate("DealConfirm", { title: "投资页面" })}/>
              {/* <Button onPress={() => navigate("DealConfirm", { title: "点击进入”投资确认页面“" })} 
                buttonStyle={{marginTop: 15,backgroundColor:"#ee4634"}}
                color="#ee4634"
                backgroundColor="#ee4634"
                title={info.item.buttonName ? "去预约" : "投资"} 
                /> */}
            </View>
          </View>
        </View>
        <View style={{marginTop:3,marginLeft:15,marginRight:15}}>
        <DashLine/>
        </View>
        {
          info.item.mini
          ? <View style={{flexDirection:"row",justifyContent:"space-between",marginLeft:15,marginRight:10,paddingTop:10,paddingBottom:15}}>
              <Text style={itermStyles.itemDesc}>{info.item.mini}元起投</Text>
              {info.item.repayment
              ? <Text style={itermStyles.itemDesc}>{info.item.repayment}</Text>
              : null}
              <Text style={itermStyles.itemDesc}>剩{info.item.avaliable}元</Text>
            </View>
          : <View style={{flexDirection:"row",justifyContent:"space-between",marginLeft:15,marginRight:10,paddingTop:10,paddingBottom:15}}>
              <Text style={itermStyles.itemDesc}>100元起投</Text>
              <Text style={itermStyles.itemDesc}>100.00元起投</Text>
              <Text style={itermStyles.itemDesc}>100.00元起投</Text>
            </View>
        }
        
      </View>
    </TouchableOpacity>
    );
  }
}
const itermStyles = StyleSheet.create({
  itemRow: {
    width:"100%",flex:1,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    paddingTop:5,
    paddingLeft:15,
    paddingTop:10,
  },
  itemTag: {
    textAlignVertical:'center',
    color:'#e63207',
    fontSize:10,
    borderWidth:1,
    borderColor:"#e63207",
    borderRadius:8,
    marginRight:5,
    paddingLeft:5,
    paddingRight:2,
    paddingTop:1,
    paddingBottom:0.5
  },
  itemTitle: {
    color:'#909090',
    fontSize:11,
    paddingBottom:5,
    paddingTop:5
  },
  itemContent: {
    color:'#e63207',
    fontSize:24,
    fontWeight:"500"
  },
  itemDesc: {
    color:"#909090",fontSize:12
  },
  itemSxyButton: {
    color:'#fff',
    fontSize:12,
    borderWidth:1,
    borderRadius:100,
    borderColor:"#e63207",
    paddingTop:3,
    paddingBottom:3,
    paddingLeft:5,
    paddingRight:5,
    backgroundColor:"#e63207"
  },
  button:{
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor:"red"
  }
})