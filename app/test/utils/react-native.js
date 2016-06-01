import React from 'react';

function createComponent(displayName) {
	return React.createClass({
		displayName,
		propTypes: {
			children: React.PropTypes.node
		},
		render() {
			return <div {...this.props}>{this.props.children}</div>;
		}
	});
}
const components = [
	'View', 'Text', 'TextInput', 'Image', 'ActivityIndicatorIOS', 'NavigationExperimental', 'NativeModules', 'Platform',
	'TouchableHighlight', 'TouchableOpacity', 'ScrollView'
];

const ReactNative = components.reduce((o, name) => {
	o[name] = createComponent(name);
	return o;
}, {});

function noop() {}
const RNUserDefaultsIOS = {
	setObjectForKey: noop,
	setBoolForKey: noop,
	arrayForKey: noop,
	stringForKey: noop,
	objectForKey: noop,
	boolForKey: noop,
	removeObjectForKey: noop
};
const RNFSManager = {
	readDir: noop,
	stat: noop,
	readFile: noop,
	writeFile: noop,
	moveFile: noop,
	unlink: noop,
	mkdir: noop,
	downloadFile: noop,
	pathForBundle: noop
};

Object.assign(ReactNative, React, {
	StyleSheet: {create: Object},
	NativeModules: {
		RNUserDefaultsIOS,
		RNFSManager,
		SMXCrashlytics: {
			log: noop,
			recordError: noop
		},
		RNDeviceInfo: {
			deviceCountry: 'ua'
		},
		ActivityView: {
			show: noop
		},
		RNEnvironmentManagerIOS: {}
	},
	Dimensions: {
		get() {
			return {};
		}
	},
	PixelRatio: {
		get() {
			return 2;
		}
	},
	NavigationExperimental: {
		Card: {}
	},
	AsyncStorage: {
		getItem: () => Promise.resolve()
	}
});

module.exports = ReactNative;
