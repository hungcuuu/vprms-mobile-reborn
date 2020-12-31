import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

const ProfileScreen = ({ onLogout, ...rest }) => {
    const logoutHandler = () => {
        onLogout();
    };

    return (
        <View>
            <Text>Hello World</Text>
            <Button title="Logout" onPress={logoutHandler} />
        </View>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutRequest()),
    };
};

export default connect(null, mapDispatchToProps)(ProfileScreen);
