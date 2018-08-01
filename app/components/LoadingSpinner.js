import React from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Platform
} from 'react-native';

const LoadingSpinner = (props) => (
	<View style={[styles.progressBar, {backgroundColor:  (props.hasBackground ? '#000000' : 'transparent')}]}>
		<ActivityIndicator size="large" color={Platform.OS === "ios" ? "#848484" : "#EA0000"} />
	</View>
);



const styles = StyleSheet.create({
	progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top:0,
		left:0,
		zIndex: 10000,
		opacity: 0.6,
		width: '100%',
		height: '100%'
	}
});

export default LoadingSpinner;
