import React, { useState, useEffect, FC } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors, Avatar } from "nottinderuikit";

interface Props {
  avatarSource: { uri: string };
}
const Radar: FC<Props> = ({ avatarSource }) => {
  const [scale] = useState<any>(new Animated.Value(1));
  const [scale2] = useState<any>(new Animated.Value(1));
  const [opacity] = useState<any>(new Animated.Value(0.3));
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    },
    circle: {
      backgroundColor: colors.red,
      width: 30,
      height: 30,
      borderRadius: 15,
      zIndex: 0,
      position: "absolute",
    },
    animatedCircle: {
      transform: [{ scale }],
    },
    animatedCircle2: {
      transform: [{ scale: scale2 }],
    },
  });
  const doAnimation = (scale, opacity, delay = 0) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 20,
          delay,
          duration: 3000,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          delay,
          duration: 3000,
        }),
      ]),
    ]).start(() => {
      scale.setValue(1);
      opacity.setValue(0.3);
      doAnimation(scale, opacity, delay);
    });
  };
  useEffect(() => {
    doAnimation(scale, opacity);
  }, []);
  return (
    <View style={styles.container}>
      <Avatar source={avatarSource} size={150} style={{ zIndex: 2, position: "absolute" }} />
      <Animated.View
        style={[styles.circle, styles.animatedCircle, { opacity }]}
      ></Animated.View>
      <Animated.View
        style={[styles.circle, styles.animatedCircle2, { opacity }]}
      ></Animated.View>
    </View>
  );
};

export default Radar;
