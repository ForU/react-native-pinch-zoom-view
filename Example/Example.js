"use restrict";

import React, { Component } from 'react';
import {
	StyleSheet,
    StatusBar,
	View,
    Image,
	Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

var ReactPropTypes = React.PropTypes;


//import PinchZoomView from 'react-native-pinch-zoom-view';
var PinchZoomView = require('./PinchZoomView');

var Example = React.createClass({
    propTypes: {
    },

    getDefaultProps: function() {
        return {};
    },

    getInitialState: function() {
        return {};
    },

    componentWillReceiveProps: function(nextProps) {
    },

    componentWillMount: function() {
    },

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    render: function() {

        return (
                <View style={{flex:1, backgroundColor:'darkslateblue'}}>
                <StatusBar hidden={true}/>

                <PinchZoomView style={{flex:0, backgroundColor:'transparent'}}>
                <Text style={{fontSize:30, padding:10, paddingHorizontal:15, fontWeight:'bold', color:'black', backgroundColor:'lime'}}>{'#NBAFinals🏀2017'}</Text>
                </PinchZoomView>

                <PinchZoomView style={{flex:0, backgroundColor:'transparent'}}>
                <Text style={{fontSize:30, padding:10, paddingHorizontal:15, fontWeight:'bold', color:'#243f90', backgroundColor:'yellow'}}>{'#30CURRY'}</Text>
                </PinchZoomView>

                <PinchZoomView style={{flex:1, backgroundColor:'#fff'}}>
                <Image source={{uri:'http://wwwcdn.howdesign.com/wp-content/uploads/LogoPrimary_300x329.jpg'}} style={{width:300, height:329 }}/>
                </PinchZoomView>

                </View>
        );
    }
});

var ss = StyleSheet.create({
});


module.exports = Example;
