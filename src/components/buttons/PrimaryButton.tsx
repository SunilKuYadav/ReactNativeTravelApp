import {Colors} from '../../config';
import React from 'react';
import {
  ColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

interface PrimaryButtonProps {
  height?: number;
  width?: number | string;
  borderRadius?: number | string;
  backgroundColor?: ColorValue;
  text: string;
  onPress?: () => void;
  textColor?: ColorValue;
  borderColor?: ColorValue;
  textSize?: number;
  icon?: React.ReactNode;
  disableButtonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  size?: 'large' | 'medium' | 'small';
}

const PrimaryButton = ({
  height = 55,
  width = 164,
  borderRadius = height / 2,
  backgroundColor = 'transparent',
  text,
  onPress,
  textColor = '#030A74',
  borderColor = '#030A74',
  textSize = 16,
  disableButtonStyle,
  disabled,
  containerStyle,
}: PrimaryButtonProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          height: height,
          width: width,
          borderRadius: borderRadius || height / 2,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        disabled ? disableButtonStyle || {} : {},
        containerStyle || {},
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.text, {color: textColor, fontSize: textSize}]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    lineHeight: 35,
    fontWeight: 'bold',
  },
});
