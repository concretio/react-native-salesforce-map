'use strict';

import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  View,
  ListView,
  Text,
  PixelRatio,
  TouchableOpacity,
  Image,
  NavigationBar,
  Navigator
} from 'react-native';

import Map from './Map';
import {oauth, net} from 'react-native-force';

class AccountList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows([])};
    this.renderRow = this.renderRow.bind(this);
  }
  componentDidMount() {
    var that = this;
    var soql = 'SELECT Id, Name, BillingLatitude, BillingLongitude, BillingAddress FROM Account LIMIT 10';
    net.query(soql,
              function(response) {
                  var accounts = response.records;
                  var data = [];
                  for (var i in accounts) {
                      data.push(accounts[i]);
                  }

                  that.setState({
                      dataSource: that.getDataSource(data),
                  });

              });
    }
    getDataSource(accounts: Array<any>): ListViewDataSource {
        return this.state.dataSource.cloneWithRows(accounts);
    }
  render() {
    return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            enableEmptySections={true}
          />
    );
  }

  onPressItem(data) {
    this.props.navigator.push({
        title: data.Name,
        component: Map,
        passProps: {data:data}
    })
  }

  renderRow(rowData: Object) {
        return (
          <View>
              <View style={styles.row}>
                <View >
                <Text numberOfLines={1} style={styles.title}>
                 {rowData.Name}
                </Text>
                </View>
                <TouchableOpacity onPress={() => this.onPressItem(rowData)}>
                  <Image source={require('../images/ic_place.png')}
                    style={{width: 24, height: 24}}/>
                </TouchableOpacity>

              </View>
              <View style={styles.cellBorder} />
          </View>
        );
    }
}

var styles = StyleSheet.create({
    iconContainer: {
      width:40,
      height:40,
      justifyContent: 'flex-end',
      backgroundColor:'#333'
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#eee',
      marginLeft: 15,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 50,
        alignItems:'center'
    },
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between'
    },
    title: {
      fontSize:18,
    },
    iconRow: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom:10
    },
    icon: {
      marginLeft: 16,
      marginRight:10
    },

    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
    line: {
      height:1,
      flex: 1,
      backgroundColor:'#333'
    },
});



export default AccountList;
