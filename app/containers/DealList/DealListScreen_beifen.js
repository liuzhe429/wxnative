import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView,
} from 'react-native';

import {PullList} from '../../components/common/react-native-pull-bak';
import { connect } from 'react-redux'
import InvestItem from "../../components/InvestItem"
import{ getZxListDatas,clearZxListDatas } from "./dealListReducer.js"
class DealListScreen extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.title
    title: "列表"
  });
	constructor(props) {
      super(props)
      this.dataSource = [{
        id: 0,
        title: `this is the first.`,
      }];
      this.state = {
          list: (new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})).cloneWithRows(this.dataSource),
          navigate : this.props.navigation.navigate,
          nomore: true
      };
      // this.loadMore();
  }

  onPullRelease(resolve) {
    //do something
    setTimeout(() => {
            resolve();
        }, 3000);
  }
  //下拉刷新组件
  topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: -10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
    return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" style={{marginRight:5}}/>
                <Text ref={(c) => {this.txtPulling = c;}}>下拉即可刷新</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>释放即可刷新</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>正在加载......</Text>
        </View>
        );
  }
  componentDidMount(){
    const {dispatch} = this.props
    if(this.props.zxlistdatas.length>0) return
    this.loadData()
  }
  render() {
    console.log(this.props,"propsdsf")
      return (
        <View style={styles.container}>
            <PullList
                style={{}}
                data={this.props.zxlistdatas}
                keyExtractor = {this._extraUniqueKey}
                onPullRelease={this.onPullRelease}
                topIndicatorRender={this.topIndicatorRender.bind(this)} topIndicatorHeight={60}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this._footer}
                ItemSeparatorComponent={this._separator}
                renderItem={this._renderItem}
                onEndReached={this.loadMore}
                onEndReachedThreshold={60}
                onEndReached={this._onload}
                />
                {/* <FlatList
                  data={data}
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
                  numColumns ={3}
                  getItemLayout={(data,index)=>(
                    {length: 100, offset: (100+2) * index, index}
                  )}

                  /> */}
        </View>
      );
  }

  renderHeader() {
    return (
        <Text></Text>
        // <View style={{height: 50, backgroundColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
        //     <Text style={{fontWeight: 'bold'}}>This is header</Text>
        // </View>
    );
  }
  _footer = () => {
    return <Text style={[{backgroundColor:'black'}]}>这是尾部</Text>;
  }
  _extraUniqueKey(item ,index){
    return "index"+index+item
  } 
  //每个标的的间隔
  _separator = () => {
    return <View style={{height:10,backgroundColor:'transparent'}}/>
  }
  _renderItem(info) {
    return <InvestItem data={info}/>
  }

  renderFooter() {
    if(this.state.nomore) {
        return null;
    }
    return (
        <View style={{height: 100}}>
            <ActivityIndicator />
        </View>
    );
  }
  loadData(page){
    page = page || 1
    const {dispatch} = this.props
    fetch(global.originTarget+"/api/index/zxP2pindex?dealListType=zx&page="+page,()=>{
      dispatch(clearZxListDatas())
    })
    .then((res)=>res.json())
    .then((datas)=>{
      dispatch(getZxListDatas(datas.data))
    })
  }
  loadMore() {
    let page = this.props.zxlistpage
    if(this.props.zxlistdatas.length>0){
      let page = this.props.zxlistpage+1
      this.loadData(page)
    }
      this.dataSource.push({
          id: 0,
          title: `begin to create data ...`,
      });
      for(var i = 0; i < 5; i++) {
          this.dataSource.push({
              id: i + 1,
              title: `this is ${i}`,
          })
      }
      this.dataSource.push({
          id: 6,
          title: `finish create data ...`,
      });
      setTimeout(() => {
          this.setState({
              list: this.state.list.cloneWithRows(this.dataSource)
          });
          console.log("this.state",this.state.list)
      }, 1000);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5fa',
  },
})
const mapStateToProps = (state) => {
  let { dealListReducer } = state
  return dealListReducer
}

export default connect(mapStateToProps)(DealListScreen)