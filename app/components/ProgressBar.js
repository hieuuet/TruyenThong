import React from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Platform
} from 'react-native';

const ProgressBar = (props) => (
	<View style={[styles.progressBar, {height: props.height}]}>
		<ActivityIndicator size="large" color={Platform.OS === "ios" ? "#848484" : "#EA0000"} />
	</View>
);

const styles = StyleSheet.create({
	progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default ProgressBar;
