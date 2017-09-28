'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    RefreshControl,
    PanResponder,
    Animated,
    Easing,
    Dimensions,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

// const padding = 2; //scrollview与外面容器的距离
const pullOkMargin = 100; //下拉到ok状态时topindicator距离顶部的距离
const defaultDuration = 300;
const defaultTopIndicatorHeight = 60; //顶部刷新指示器的高度
const defaultFlag = {pulling: false, pullok: false, pullrelease: false};
const flagPulling = {pulling: true, pullok: false, pullrelease: false};
const flagPullok = {pulling: false, pullok: true, pullrelease: false};
const flagPullrelease = {pulling: false, pullok: false, pullrelease: true};
const isDownGesture = (x, y) => {
    return y > 0 && (y > Math.abs(x));
};
const isUpGesture = (x, y) => {
    return y < 0 && (Math.abs(x) < Math.abs(y));
};
const isVerticalGesture = (x, y) => {
    return (Math.abs(x) < Math.abs(y));
};
let ScreenWidth = Dimensions.get('window').width
var ScreenHeight = Dimensions.get('window').height

export default class extends Component {
  constructor(props) {
    super(props);
      this.onLayout = this.onLayout.bind(this);
      this.pullable = this.props.refreshControl == null;
      this.defaultScrollEnabled = false; //!(this.props.onPulling || this.props.onPullOk || this.props.onPullRelease); //定义onPull***属性时scrollEnabled为false
      this.topIndicatorHeight = this.props.topIndicatorHeight ? this.props.topIndicatorHeight : defaultTopIndicatorHeight;
      this.defaultXY = {x: 0, y: this.topIndicatorHeight * -1};
      this.pullOkMargin = this.props.pullOkMargin ? this.props.pullOkMargin : pullOkMargin;
      this.duration = this.props.duration ? this.props.duration : defaultDuration;
      this.state = Object.assign({}, props, {
          pullPan: new Animated.ValueXY(this.defaultXY),
          scrollEnabled: this.defaultScrollEnabled,
          flag: defaultFlag,
          height: 0,
          width:0
      });
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
        onMoveShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
        onPanResponderGrant: () => {},
        onPanResponderMove: this.onPanResponderMove.bind(this),
        onPanResponderRelease: this.onPanResponderRelease.bind(this),
        onPanResponderTerminate: this.onPanResponderRelease.bind(this),
    });
    this.gesturePosition = {x: 0, y: 0};
    this.setFlag(defaultFlag);
  }
  setFlag(flag) {
    if (this.flag != flag) {
        this.flag = flag;
        this.renderTopIndicator();
        // this.txt.setNativeProps({text: `${Math.random()}`}); // setNativeProps可解决滑动卡顿问题，以下代码都没有解决
        // if(this.flag.pullok) {
        //     InteractionManager.runAfterInteractions(() => {
        //         this.setState({flag: this.flag});
        //     });
        // } else {
            // this.setState({flag: this.flag});
        // }

        // requestAnimationFrame(() => {
        //     this.setState({flag: this.flag});
        // });
        // this.setState({topIndicator: this.renderTopIndicator()});
    }
  }
  onShouldSetPanResponder(e, gesture) {
    // if (!this.pullable || !isVerticalGesture(gesture.dx, gesture.dy)) { //不使用pullable,或非向上 或向下手势不响应
    //     return false;
    // }
    
    // if (!this.state.scrollEnabled) {
    //     this.lastY = this.state.pullPan.y._value;
    //     return true;
    // } else {
    //     return false;
    // }
  }

  onPanResponderMove(e, gesture) {
    // this.gesturePosition = {x: this.defaultXY.x, y: gesture.dy};
    // if (isUpGesture(gesture.dx, gesture.dy)) { //向上滑动
    //     if(this.isPullState()) {
    //         this.resetDefaultXYHandler();
    //     } else if(this.props.onPushing && this.props.onPushing(this.gesturePosition)) {
    //         // do nothing, handling by this.props.onPushing
    //     } else {
    //         console.log(gesture.dy,"scroll")
    //         this.scroll.scrollTo({x:0, y: gesture.dy * -1});
    //     }
    //     return;
    // } else if (isDownGesture(gesture.dx, gesture.dy)) { //下拉
    //     this.state.pullPan.setValue({x: this.defaultXY.x, y: this.lastY + gesture.dy / 2});
    //     if (gesture.dy < this.topIndicatorHeight + this.pullOkMargin) { //正在下拉
    //         if (!this.flag.pulling) {
    //             this.props.onPulling && this.props.onPulling();
    //         }
    //         this.setFlag(flagPulling);
    //     } else { //下拉到位
    //         if (!this.state.pullok) {
    //             this.props.onPullOk && this.props.onPullOk();
    //         }
    //         this.setFlag(flagPullok);
    //     }
    // }
  }

  onPanResponderRelease(e, gesture) {
      // if (this.flag.pulling) { //没有下拉到位
      //     this.resetDefaultXYHandler(); //重置状态
      // }
      // if (this.flag.pullok) {
      //     if (!this.flag.pullrelease) {
      //         if (this.props.onPullRelease) {
      //              this.props.onPullRelease(this.resolveHandler);
      //         } else {
      //             setTimeout(() => {this.resetDefaultXYHandler()}, 3000);
      //         }
      //     }
      //     this.setFlag(flagPullrelease); //完成下拉，已松开
      //     Animated.timing(this.state.pullPan, {
      //         toValue: {x: 0, y: 0},
      //         easing: Easing.linear,
      //         duration: this.duration
      //     }).start();
      // }
  }
  onLayout(e) {
    console.log(e.nativeEvent.layout.width,e.nativeEvent.layout.height,"hahahha")
    if (this.state.width != e.nativeEvent.layout.width || this.state.height != e.nativeEvent.layout.height) {
        this.scrollContainer.setNativeProps({style: {width: ScreenWidth, height: ScreenHeight}});
        this.width = e.nativeEvent.layout.width;
        this.height = e.nativeEvent.layout.height;
    }
  }
  /**
    使用setNativeProps解决卡顿问题
    make changes directly to a component without using state/props to trigger a re-render of the entire subtree
    */
    defaultTopIndicatorRender(pulling, pullok, pullrelease, gesturePosition) {
      setTimeout(() => {
          if (pulling) {
              this.txtPulling && this.txtPulling.setNativeProps({style: styles.show});
              this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
          } else if (pullok) {
              this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
              this.txtPullok && this.txtPullok.setNativeProps({style: styles.show});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.hide});
          } else if (pullrelease) {
              this.txtPulling && this.txtPulling.setNativeProps({style: styles.hide});
              this.txtPullok && this.txtPullok.setNativeProps({style: styles.hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style: styles.show});
          }
      }, 1);
      return (
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
              <ActivityIndicator size="small" color="gray" style={{marginRight:5}}/>
              <Text ref={(c) => {this.txtPulling = c;}} style={styles.hide}>{"下拉刷新..."}</Text>
              <Text ref={(c) => {this.txtPullok = c;}} style={styles.hide}>{"松开刷新......"}</Text>
              <Text ref={(c) => {this.txtPullrelease = c;}} style={styles.hide}>{"玩命刷新中......"}</Text>
          </View>
      );
  }
  
  renderTopIndicator(){
    let { pulling, pullok, pullrelease } = this.flag;
    if (this.props.topIndicatorRender == null) {
        return this.defaultTopIndicatorRender(pulling, pullok, pullrelease, this.gesturePosition);
    } else {
        return this.props.topIndicatorRender(pulling, pullok, pullrelease, this.gesturePosition);
    }
  }
  render() {
    let refreshControl = this.props.refreshControl;
    console.log(this.state.width,this.state.height,"height")
    return (
        <View style={[styles.wrap, this.props.style]} onLayout={this.onLayout}>
            <Animated.View ref={(c) => {this.ani = c;}} >
              {this.renderTopIndicator()}
              <View ref={(c) => {this.scrollContainer = c;}} style={{width: this.state.width, height: this.state.height}}>
                  {this.getScrollable()}
              </View>
            </Animated.View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  spindicator: {
    marginLeft: 10,
    width: 2,
    height: 16,
    backgroundColor: '#FFB8C6',
  },
  wrap: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    zIndex:-999,
  },
  hide: {
      position: 'absolute',
      left: 10000
  },
  show: {
      position: 'relative',
      left: 0
  }
})
