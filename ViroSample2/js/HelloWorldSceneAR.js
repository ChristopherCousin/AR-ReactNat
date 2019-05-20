'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Iniciando AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.3, .3, .1]} position={[0, 0, -2]} style={styles.helloWorldTextStyle} />
        
        <ViroAmbientLight color={"#ffffff"} />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0,-1,-.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true} />
        <Viro3DObject
          source={require('../assets/caballo.obj')}
          resources={[require('../assets/caballo.mtl'),
          ]}
          dragType={("FixedToWorld")}
          position={[-.5, -25.2, -38.5]}
          scale={[.1, .1, .1]}
          type="OBJ" />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "CapdeperaAR"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Calibri',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
  box: {
    opacity: 0.5,
    borderRadius: 10,
  }
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../assets/prova1.png'),
  },
});

module.exports = HelloWorldSceneAR;
