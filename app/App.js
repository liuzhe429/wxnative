import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,Navigatorw
} from 'react-native'
import { Provider } from 'react-redux'
//redux数据
import store from './store'
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation'
import HomeScreen from './containers/Home/HomeScreen'
import FoundScreen from './containers/Found/FoundScreen'
import MyScreen from './containers/My/MyScreen'
import DealListScreen from './containers/DealList/DealListScreen'
import SxyListScreen from './containers/SxyList/SxyListScreen'
import DealDetailScreen from './containers/DealDetail/DealDetailScreen'
import SxyDetailScreen from './containers/SxyDetail/SxyDetailScreen'
import DealConfirmScreen from './containers/DealConfirm/DealConfirmScreen'
global.store = store.getState()
// 通过TabNavigator做路由映射
const MainScreentNavigator = TabNavigator({
  Home:{
    screen:HomeScreen,
    navigationOptions:{
      header:null,//隐藏头部导航
      headerTitle:'首页',
      headerBackTitle:null,
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor,focused }) => (
        focused
        ?
        <Image
          source={require('./images/tabs/home_red.png')}
          style={[styles.icon]}
        />
        :
        <Image
        source={require('./images/tabs/home_gray.png')}
        style={[styles.icon]}
      />
      ),
    }
  },
  Found:{
    screen:FoundScreen,
    navigationOptions:{
      headerTitle:'发现',
      headerBackTitle:null,
      tabBarLabel: '发现',
      tabBarIcon: ({ tintColor,focused }) => (
        focused
        ?
        <Image
          source={require('./images/tabs/found_red.png')}
          style={[styles.icon]}
        />
        :
        <Image
        source={require('./images/tabs/found_gray.png')}
        style={[styles.icon]}
      />
      ),
    }
  },
  My:{
    screen:MyScreen,
    navigationOptions:{
      headerTitle:'我的',
      headerBackTitle:null,
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor,focused }) => (
        focused
        ?
        <Image
          source={require('./images/tabs/my_red.png')}
          style={[styles.icon]}
        />
        :
        <Image
        source={require('./images/tabs/my_gray.png')}
        style={[styles.icon]}
      />
      ),
    }
  },
},{
  tabBarPosition:'bottom',  
  swipeEnabled:false,  
  animationEnabled:false,  
  lazy:true,  
  tabBarOptions:{  
    activeTintColor:'#ee4634',  
    inactiveTintColor:'#a0a0a0',  
    style:{backgroundColor:'#ffffff',paddingBottom:5},  
    labelStyle: {  
      fontSize: 12, // 文字大小  
    },  
  }  
})
//引入要用到的跳转页面
const  MyNavigatior = StackNavigator({
    Main:{screen:MainScreentNavigator},
    DealList:{
      screen:DealListScreen,
      navigationOptions:{
      // headerLeft:<View style={{width:60,flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
      //             <TouchableOpacity activeOpacity={1} style={{width:"100%",flexDirection:"row",alignItems:"center"}}>
      //               <Text style={{width:10,marginRight:2,marginLeft:10,marginTop:7}}>
      //                 <Image
      //                   source={require('./images/back.png')}
      //                   style={{width:9,height:17}}/>
      //               </Text>
      //               <Text style={{fontSize:14,color:"#41474d"}}
      //                 onPress={() => this.props.navigator.pop()}>返回</Text>
                    
      //             </TouchableOpacity>
      //           </View>
      }
    },
    SxyList:{
      screen:SxyListScreen,
    },
    DealDetail:{screen:DealDetailScreen},
    SxyDetail:{screen:SxyDetailScreen},
    DealConfirm:{screen:DealConfirmScreen}
})
class App extends Component{
  
  render(){
    console.log(store.getState())

    return <Provider store={store}>
              <MyNavigatior/>
           </Provider>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  icon: {
    width: 19,
    height: 19,
  },
  arrow:{
    width:20,
    marginTop:7,
    marginLeft:2,
    marginRight:0,
  }
})
AppRegistry.registerComponent('wangxinnative', () => App);
