import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button
} from 'react-native'

export default class DealDetailScreen extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    title: "投资详情"
  })
  constructor(props) {
    super(props)
    this.state = {
      navigate : this.props.navigate,
      data :[]
    }
  }
  componentWillMount(){
    let params = this.props.navigation.state.params
    let zxdata = [
      {
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
      }
    ]
    let sxydata = [
      {
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
      }
    ]
    if(params.key == "zx"){
      this.setState({
        data:zxdata
      })
    }else{
      this.setState({
        data:sxydata
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
  render() {
    const { navigate } = this.props.navigation
    return (
        <View>
          <Text style={{backgroundColor:"red",color:"pink",height:200,marginTop:40}}>投资详情页面</Text>
          <Button onPress={() => navigate("DealConfirm", { title: "点击进入”投资确认页面“" })} 
          icon={{name: 'done'}}
          buttonStyle={{marginTop: 15}}
          title='投资喽' 
          />
        </View>
    )
  }
}
const itermStyles = StyleSheet.create({
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
  }
})