import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppRegistry,StyleSheet,Text,View,TouchableOpacity,Image,ScrollView,SectionList,ListView, } from 'react-native'
import Swiper from 'react-native-swiper'
import  Dimensions from 'Dimensions'//获取屏幕的宽高
let ScreenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height
import DashLine from "../../components/common/DashLine"
import InvestItem from "../../components/InvestItem"
// import ViewPager from 'react-native-viewpager'
const BANNER_IMGS = [
  require('./images/banner/11.jpg'),
  require('./images/banner/22.jpg'),
  require('./images/banner/3.jpg'),
  require('./images/banner/4.jpg')
];
export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    // 用于构建DataSource对象
    // var dataSource = new ViewPager.DataSource({
    //     pageHasChanged: (p1, p2) => p1 !== p2,
    // });
    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // 实际的DataSources存放在state中
    this.state = {
        // dataSource: dataSource.cloneWithPages(BANNER_IMGS),
        // listData: ds,
        sxydatas:[],
        zxdatas:[]

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
                  <Text style={{fontSize:13,color:"#909090"}}
                        onPress={() => navigate('DealList', { title: info.section.key,key:keyType })}>更多</Text>
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
    console.log("34444")
    // fetch("http://10.20.69.187:3030/api/deal/reserveConf")
    //   .then((res)=>res.json())
    //   .then((str)=>{
    //     console.log("str",str.data.list)
    //     this.setState({
    //       sxydatas:str.data.list
    //     })
    //   })
    // fetch("http://10.20.69.187:3030/api/index/zxP2pindex?dealListType=zx&page=1")
    //   .then((res)=>res.json())
    //   .then((str)=>{
    //     console.log("str",str.data)
    //     this.setState({
    //       zxdatas:str.data
    //     })
    //   })
  }
  render() {
    const { navigate } = this.props.navigation
    let sxydatas = [{
      "investLine": "36",
      "unitType": "2",
      "investUnit": "个月",
      "buttonName": "去预约",
      "tagBefore": "预计9月19日起息",
      "tagAfter": "",
      "displayMoney": 1,
      "countDisplay": 0,
      "count": "100.00元起投",
      "amount": "27,025.34万元",
      "rate": "12.50%",
      "dealType": 0,
      "appointUrl": "/deal/reserve?investLine=36&investUnit=2",
      "detailUrl": "/deal/reservedetail?line_unit=36_2",
      "rateText": "年化借款利率"
    },{
      "investLine": "21",
      "unitType": "1",
      "investUnit": "天",
      "buttonName": "去预约",
      "tagBefore": "投资即返1.5%红包",
      "tagAfter": "预计9月19日起息",
      "displayMoney": 1,
      "countDisplay": 0,
      "count": "100.00元起投",
      "amount": "597,687.18万元",
      "rate": "5.30%",
      "dealType": 0,
      "appointUrl": "/deal/reserve?investLine=21&investUnit=1",
      "detailUrl": "/deal/reservedetail?line_unit=21_1",
      "rateText": "年化借款利率"
    }]
    let zxdatas=[{
      "productID": "kCwk",
      "type": "资产管理",
      "title": "盈嘉A003327615",
      "timelimit": "6",
      "total": "2,500.00万",
      "avaliable": "23,270,839.68",
      "mini": "12.10万",
      "repayment": "按月支付收益到期还本",
      "loantype": "4",
      "stats": "1",
      "crowd_str": "全部用户",
      "deal_crowd": "0",
      "start_loan_time": "",
      "income_base_rate": "8.40",
      "income_ext_rate": 0,
      "rate": "8.40",
      "money_loan": "23270839.68",
      "daren": 0,
      "deal_tag_name": "果粉标＋高净值尊享＋满标有礼",
      "deal_type": 0,
      "product_name": "友居贷3号-1",
      "timeunit": "个月"
    },{
      "productID": "kCuE",
      "type": "资产管理",
      "title": "盈嘉A003327253",
      "timelimit": "12",
      "total": "3,255.00万",
      "avaliable": "18,656,875.18",
      "mini": "11.00万",
      "repayment": "按月支付收益到期还本",
      "loantype": "4",
      "stats": "1",
      "crowd_str": "全部用户",
      "deal_crowd": "0",
      "start_loan_time": "",
      "income_base_rate": "9.30",
      "income_ext_rate": 0,
      "rate": "9.30",
      "money_loan": "18656875.18",
      "daren": 0,
      "deal_tag_name": "高净值客户尊享+满标有礼",
      "deal_type": 0,
      "product_name": "长兴8号-1",
      "timeunit": "个月"
    }]
    var sections = [{
      key:"随鑫约",
      data: sxydatas
    },{
      key:"专享",
      data: zxdatas
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