import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import Svg, { Circle, Defs, Filter, FeGaussianBlur } from "react-native-svg";

const Blob = ({ size, color, duration, delay }:{size: number, color: string, duration: number, delay: number}) => {
  const animX = useRef(new Animated.Value(0)).current;
  const animY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animX, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animY, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    setTimeout(animate, delay);
  }, [animX, animY]);

  const translateX = animX.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50],
  });

  const translateY = animY.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50],
  });

  return (
    <Animated.View
      style={[
        styles.blobContainer,
        { transform: [{ translateX }, { translateY }] },
      ]}
    >
      <Svg height={size} width={size}>
        <Defs>
          <Filter id="blurEffect">
            <FeGaussianBlur stdDeviation="20" />
          </Filter>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} filter="url(#blurEffect)" />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  blobContainer: {
    position: "absolute",
    opacity: 0.8,
  },
});

export default Blob;
