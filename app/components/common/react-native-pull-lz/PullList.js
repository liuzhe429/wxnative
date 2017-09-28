'use strict';

import React, { PureComponent } from 'react';
import { FlatList,Animated,Text } from 'react-native';

import Pullable from './Pullable';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default class extends Pullable {
  
  constructor(props) {
      super(props);
      this.getMetrics = this.getMetrics.bind(this);
      this.scrollTo = this.scrollTo.bind(this);
      this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  getMetrics(args) {
      this.scroll.getMetrics(args);
  }

  scrollTo(...args) {
      this.scroll.scrollTo(...args);
  }

  scrollToEnd(args) {
      this.scroll.scrollToEnd(args);
  }

  getScrollable() {
      return (
          <AnimatedFlatList {...this.props} />
      );
  }
}
  