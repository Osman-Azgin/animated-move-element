import React,{useState,useRef,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Switch,
  BackHandler,
  Alert,
  PanResponder,
  Modal,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
      bgCircle:{
        position:"absolute",
        zIndex:-1,
        width:30,
        height:30,
        borderRadius:30,
        opacity:0.5,
      }
});

const AnimatedMoveElement=(props)=>{
    const circleTranslateX = useRef(new Animated.Value(0)).current;
    const circleTranslateY = useRef(new Animated.Value(0)).current;

    const style = props.style || {};
    const zIndex = props.zIndex || -1;
    const path = props.path || null;
    const duration = props.duration || 5000;

    const xrange = props.Xrange || (Dimensions.get('window').width*0.8)+(Dimensions.get('window').width*0.1);
    const yrange = props.Yrange || (Dimensions.get('window').height*0.8)+(Dimensions.get('window').height*0.1);

    const randomanim = async ()=>{
        while(true){
            Animated.timing(circleTranslateX, {
                toValue: Math.random()*xrange,
                duration: duration,
                useNativeDriver:true
              }).start();
            Animated.timing(circleTranslateY, {
                toValue: Math.random()*yrange,
                duration: duration,
                useNativeDriver:true
              }).start();
            await sleep(duration);
        }
    };

    const pathAnim = async () => {
        while(true){
            for(let i = 0; i<path.length;i++){
                val=path[i];
                Animated.timing(circleTranslateX, {
                    toValue: val.x,
                    duration: duration,
                    useNativeDriver:true
                  }).start();
                Animated.timing(circleTranslateY, {
                    toValue: val.y,
                    duration: duration,
                    useNativeDriver:true
                  }).start();
                  await sleep(duration);
            }
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(()=>{
        if(path!==null){
            pathAnim();
        }else{
            randomanim();
        }
        
    },[]);

    return(
        <Animated.View style={{position:"absolute",zIndex:zIndex,...style,transform:[
            {translateX:circleTranslateX},
            {translateY:circleTranslateY}
        ],}}>
            {props.children}
        </Animated.View>
    );
}

export default AnimatedMoveElement;