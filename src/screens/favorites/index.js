import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../../components/Header';
import TabNavContainer from '../../components/TabNavContainer';
import FortuneTellerBox from '../../components/FortuneTellerBox';
import {Transition} from 'react-navigation-fluid-transitions';
export default class Favorites extends Component {
  static navigationOptions = {
    title: 'Favoriler',
  };

  render() {
    const {navigation} = this.props;
    const data = [
      {
        id: 1,
        title: 'Nazlı Özdemir',
        desc: 'Kadın, 24',
        waitTime: '11 d',
        status: 'Online',
        image: 'https://ik.imagekit.io/brk/kadin/2.jpg?tr=h-150,w-150,q-70',
      },
      {
        id: 2,
        title: 'Feridun Düzağaç',
        desc: 'Erkek, 22',
        waitTime: '2 d',
        status: 'Online',
        image: 'https://ik.imagekit.io/brk/erkek/66.jpg?tr=h-150,w-150,q-70',
      },
      {
        id: 3,
        title: 'Ramazan Acar',
        desc: 'Erkek, 32',
        waitTime: '',
        status: 'Offline',
        image: 'https://ik.imagekit.io/brk/erkek/85.jpg?tr=h-150,w-150,q-70',
      },
      {
        id: 4,
        title: 'Yeşim Korkmaz',
        desc: 'Kadın, 33',
        waitTime: '',
        status: 'Offline',
        image: 'https://ik.imagekit.io/brk/kadin/93.jpg?tr=h-150,w-150,q-70',
      },
      {
        id: 5,
        title: 'Halil Kara',
        desc: 'Erkek, 33',
        waitTime: '',
        status: 'Offline',
        image: 'https://ik.imagekit.io/brk/erkek/82.jpg?tr=h-150,w-150,q-70',
      },
      {
        id: 6,
        title: 'Hasan Demir',
        desc: 'Erkek, 27',
        waitTime: '',
        status: 'Offline',
        image: 'https://ik.imagekit.io/brk/erkek/81.jpg?tr=h-150,w-150,q-70',
      },
      {
        id: 7,
        title: 'Songül Kara',
        desc: 'Erkek, 31',
        waitTime: '',
        status: 'Offline',
        image: 'https://ik.imagekit.io/brk/kadin/126.jpg?tr=h-150,w-150,q-70',
      },
    ];
    return (
      <TabNavContainer>
        <Header title="Favoriler" />
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <FlatList
            style={{
              alignSelf: 'stretch',
              width: '100%',
              paddingTop: 50,
            }}
            data={data}
            overScrollMode="never"
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Transition shared={'profile-' + item.id}>
                <FortuneTellerBox
                  key={index}
                  item={item}
                  isLastItem={index == data.length - 1}
                  onPress={() =>
                    navigation.navigate('FortuneTellerDetail', {item: item})
                  }
                />
              </Transition>
            )}
          />
        </View>
      </TabNavContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
