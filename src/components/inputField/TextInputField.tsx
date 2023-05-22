import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface TextInputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
}
const TextInputField = (props: TextInputFieldProps) => {
  const {onChange, placeholder, value, containerStyle, ...rest} = props;

  return (
    <View style={[styles.container, containerStyle || {}]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    height: 30,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {fontSize: 16},
});
