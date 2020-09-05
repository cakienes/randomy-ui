import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import {Transition} from 'react-navigation-fluid-transitions';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {} from '../../helpers';
import {fortuneSend} from './actions';
import {makeSelectCurrentUser} from '../auth/selectors';
import makeSelectFortuneSend from './selectors';
import {RNCamera} from 'react-native-camera';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'underscore';

const flashModeOrder = {
  off: 'on',
  on: 'off',
};
const messageOrder = [
  '1 - Lütfen fincanın içini çekiniz.',
  '2 - Lütfen fincanın içini çekiniz.',
  '3 - Lütfen fincan altlığını çekiniz.',
];

export class FortuneSend extends Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: {x: 0.5, y: 0.5}, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    images: [
      {order: 1, fileUrl: null},
      {order: 2, fileUrl: null},
      {order: 3, fileUrl: null},
    ],
    order: 0,
  };

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync({
        width: 200,
        quality: 0.3,
        base64: true,
      });
      var images = this.state.images;
      images[this.state.order].fileUrl = data.uri;
      images[this.state.order].base64 = data.base64;
      this.setState(
        {images: images, order: this.state.order + 1},
        this.sendImages,
      );
    }
  };

  sendImages = () => {
    if (this.state.order == 3) {
      const {data} = this.props.navigation.state.params;
      const {images} = this.state;
      this.props.fortuneSend(
        {
          fortuneTellerId: data.fortuneTellerId,
          type: data.type,
          photos: images,
        },
        () => this.props.navigation.navigate('Fortunes'),
      );
    }
  };

  renderCamera() {
    const isFocused = this.props.navigation.isFocused();

    if (!isFocused) {
      return null;
    } else if (isFocused) {
      return (
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.camContainer}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          focusDepth={this.state.depth}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}>
          <View style={styles.camHeader}>
            <View style={styles.camHeaderLeft}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon
                  style={styles.camHeaderIcon}
                  name={'times'}
                  size={30}
                  color={'white'}
                  solid
                />
              </TouchableOpacity>
            </View>
            <View style={styles.camHeaderRight}>
              <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
                <Icon
                  style={styles.camHeaderIcon}
                  name={'bolt'}
                  size={30}
                  color={this.state.flash == 'on' ? '#FFC200' : 'white'}
                  solid
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.camFooter}>
            <View style={styles.camFooterPics}>
              {this.state.images.map(item => {
                if (item.fileUrl == null) {
                  return (
                    <View>
                      <View
                        style={[
                          styles.camFooterPicsImage,
                          {
                            opacity:
                              this.state.order == item.order - 1 ? 1 : 0.3,
                          },
                        ]}></View>
                      <View style={styles.camFooterPicsImageTradeMark}>
                        <Text
                          style={[
                            styles.camFooterPicsImageTradeMarkText,
                            {
                              opacity:
                                this.state.order == item.order - 1 ? 1 : 0.3,
                            },
                          ]}>
                          {item.order}
                        </Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View>
                      <Image
                        style={[
                          styles.camFooterPicsImage,
                          {borderWidth: 0},
                          {
                            opacity:
                              this.state.order == item.order - 1 ? 1 : 0.3,
                          },
                        ]}
                        source={{
                          uri: item.fileUrl,
                        }}
                      />
                      <View style={styles.camFooterPicsImageTradeMark}>
                        <Text
                          style={[
                            styles.camFooterPicsImageTradeMarkText,
                            {
                              opacity:
                                this.state.order == item.order - 1 ? 1 : 0.3,
                            },
                          ]}>
                          {item.order}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
            </View>
            <View style={styles.camFooterFirst}>
              <View style={styles.camFooterLeft}>
                <TouchableOpacity>
                  <Icon
                    style={styles.camHeaderIcon}
                    name={'images'}
                    size={30}
                    color={'white'}
                    solid
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.camFooterMid}>
                <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                  style={styles.takePictureButton}></TouchableOpacity>
              </View>
              <View style={styles.camFooterRight}>
                <TouchableOpacity>
                  <Icon
                    style={styles.camHeaderIcon}
                    name={'sync'}
                    size={30}
                    color={'white'}
                    solid
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.camFooterMessageView}>
              <Text style={styles.camFooterMessageText}>
                {messageOrder[this.state.order]}
              </Text>
            </View>
          </View>
        </RNCamera>
      );
    }
  }

  componentDidMount() {}

  render() {
    const {navigation, CurrentUser} = this.props;
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        {this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  camHeader: {
    height: 40,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  camFooter: {
    height: 165,
    marginTop: 10,
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  camFooterPics: {
    marginBottom: 5,
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  camFooterPicsImage: {
    height: 80,
    width: 80,
    marginRight: 4,
    borderWidth: 4,
    borderColor: 'white',
  },
  camFooterPicsImageTradeMark: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  camFooterPicsImageTradeMarkText: {
    fontSize: 40,
    color: 'white',
  },
  camFooterFirst: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  camFooterLeft: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camFooterRight: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camHeaderLeft: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camHeaderRight: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camHeaderIcon: {
    marginHorizontal: 12,
  },
  takePictureButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'white',
  },
  camFooterMessageView: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camFooterMessageText: {
    color: 'white',
    fontSize: 12,
  },
});

FortuneSend.propTypes = {};

const mapStateToProps = createStructuredSelector({
  FortuneSend: makeSelectFortuneSend(),
  CurrentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    fortuneSend(values, successFunc) {
      dispatch(fortuneSend(values, successFunc));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FortuneSend);
