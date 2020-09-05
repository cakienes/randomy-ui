import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Anasayfa',
  };
  render() {
    return (
      <View style={styles.homePageHolder}>
        <View style={styles.staticsHolder}>
          <View style={styles.staticBoxRow}>
            <View style={styles.staticBoxHolder}>
              <Text style={styles.count}>810</Text>
              <Text style={styles.description}>Seçilme</Text>
            </View>
            <View style={styles.borderRight} />
            <View style={styles.staticBoxHolder}>
              <Text style={styles.count}>90</Text>
              <Text style={styles.description}>Görüntülenme</Text>
            </View>
          </View>
          <View style={styles.borderBottom} />
          <View style={styles.staticBoxRow}>
            <View style={styles.staticBoxHolder}>
              <Text style={styles.count}>11200</Text>
              <Text style={styles.description}>Seçim</Text>
            </View>
            <View style={styles.borderRight} />
            <View style={styles.staticBoxHolder}>
              <Text style={styles.count}>120</Text>
              <Text style={styles.description}>Görüntüleme</Text>
            </View>
          </View>
        </View>
        <Button
          title="Start"
          onPress={() => this.props.navigation.navigate('ChoosePerson')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homePageHolder: {
    backgroundColor: '#eee',
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 20,
  },
  staticsHolder: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  staticBoxRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  borderBottom: {
    borderTopWidth: 1,
    borderColor: '#eee',
    marginRight: -20,
    marginLeft: -20,
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: '#eee',
    marginTop: -10,
    marginBottom: -10,
  },
  staticBoxHolder: {
    width: (screenWidth - 100) / 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  count: {
    width: '100%',
    textAlign: 'center',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Arial,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif!important',
    color: '#484848',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    width: '100%',
    textAlign: 'center',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Arial,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif!important',
    fontSize: 11,
    marginTop: 10,
  },
});
