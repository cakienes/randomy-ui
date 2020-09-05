import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import TabNavContainer from '../../components/TabNavContainer';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class Profile extends Component {
  render() {
    return (
      <TabNavContainer>
        <View style={styles.profileImageHolder} >
          <TouchableOpacity
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: 'https://i.picsum.photos/id/501/300/450.jpg' }}
              resizeMode="cover"
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.aboutMeHolder}>
          <View>
            <Text style={styles.aboutMeTitle}>Hakkımda</Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue, risus vel fringilla interdum,
              magna quam interdum justo, nec eleifend eros magna non ante. Proin ut fringilla lorem
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue, risus vel fringilla interdum,
              magna quam interdum justo, nec eleifend eros magna non ante. Proin ut fringilla lorem
              </Text>
          </View>
          <View style={styles.showDetailIcon}>
            <TouchableOpacity
              activeOpacity={0.8}
            >
              <Icon name="edit" size={18} color="black" solid />
            </TouchableOpacity>
          </View>
        </View>
      </TabNavContainer >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  profileImageHolder: {
    width: '100%',
    height: 200,
    display: 'flex',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  aboutMeHolder: {
    backgroundColor: 'white',
    padding: 20,
    position: "relative",
    paddingBottom: 30,
  },
  aboutMeTitle: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  showDetailIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
