/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const ContactsScreens = () => {
    return (
        <TouchableOpacity style={{ padding: moderateScale(8) }}>
            <Text>Contacts</Text>
        </TouchableOpacity>
    );
};

ContactsScreens.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ContactsScreens;