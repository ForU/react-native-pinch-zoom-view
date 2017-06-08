import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    PanResponder
} from 'react-native';

class PinchZoomView extends Component {

    static propTypes = {
        ...View.propTypes,
        scalable: PropTypes.bool
    };

    static defaultProps = {
        scalable: true
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            lastScale: 1,
            offsetX: 0,
            offsetY: 0,
            lastX: 0,
            lastY: 0,

            angle: 0,
            lastAngle:0
        },
        this.distant = 150;
        this.initangle = 0;
    }

    componentWillMount() {
        this.gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminationRequest: evt => true,
            onShouldBlockNativeResponder: evt => false
        });
    }

    _handleStartShouldSetPanResponder = (e, gestureState) => {
        // don't respond to single touch to avoid shielding click on child components
        return false;
    }

    _handleMoveShouldSetPanResponder = (e, gestureState) => {
        return this.props.scalable && gestureState.dx > 2 || gestureState.dy > 2 || gestureState.numberActiveTouches === 2;
    }

    _handlePanResponderGrant = (e, gestureState) => {
        if (gestureState.numberActiveTouches === 2) {
            let dx = e.nativeEvent.touches[1].pageX - e.nativeEvent.touches[0].pageX;
            let dy = e.nativeEvent.touches[1].pageY - e.nativeEvent.touches[0].pageY;

            this.distant = Math.sqrt(dx * dx + dy * dy);
            this.initangle = Math.atan2(dy, dx) * 180/Math.PI;
        }
    }

    _handlePanResponderEnd = (e, gestureState) => {
        this.setState({
            lastX: this.state.offsetX,
            lastY: this.state.offsetY,
            lastScale: this.state.scale,
            lastAngle: this.state.angle
        });
    }

    _handlePanResponderMove = (e, gestureState) => {
        // zoom
        if (gestureState.numberActiveTouches === 2) {
            let dx = e.nativeEvent.touches[1].pageX - e.nativeEvent.touches[0].pageX;
            let dy = e.nativeEvent.touches[1].pageY - e.nativeEvent.touches[0].pageY;

            let distant = Math.sqrt(dx * dx + dy * dy);
            let scale = distant / this.distant * this.state.lastScale;

            // rotate
            let angle = Math.atan2(dy, dx) * 180/Math.PI;
            angle -= this.initangle; // delta from touch point
            angle += this.state.lastAngle; // real one

            this.setState({scale, angle});

        }
        // translate
        else if (gestureState.numberActiveTouches === 1) {
            let offsetX = this.state.lastX + gestureState.dx / this.state.scale;
            let offsetY = this.state.lastY + gestureState.dy / this.state.scale;
            this.setState({ offsetX, offsetY });
        }
    }

    render() {
        return (
                <View
            {...this.gestureHandlers.panHandlers}
            style={[styles.container, this.props.style, {
                transform: [
                    {scaleX: this.state.scale},
                    {scaleY: this.state.scale},
                    {translateX: this.state.offsetX},
                    {translateY: this.state.offsetY},
                    {rotate: String(this.state.angle)+'deg'}
                ]
            }]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = PinchZoomView;
