// Copyright (C) 2020  Trustless Pvt Ltd. <https://trustless.capital>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Created By @name Sukumar_Abhijeet,
 */

import React ,{useState} from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import Options from '../Options';
import Modal from 'react-native-modal';
import ModalHeader from '../../../../@Components/ModalHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CountryPicker from 'react-native-country-picker-modal';
import Colors from '../../../../@Constants/Colors';
import { moderateScale } from 'react-native-size-matters';
import apiServices from '../../../../@Services/api-services';
import LoadingIndicator from '../../../../@Components/loading-indicator';
import ErrorDialog from '../../../../@Components/error-dialog';
import Toast from 'react-native-simple-toast';
 
const AboutYou = ({accountDetails}) =>{
    const {email,phoneNumber} = accountDetails;

    const [showEmail , setShowEmail] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [newNumber, setNewNumber] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [countryCallingCode , setCountryCallingCode] = useState('+91');
    const [countryCode , setCountryCode] = useState('IN');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [numberOtp, setNumberOtp] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle , setErroTitle] = useState('');
    const [showError ,setShowError] = useState(false);

    const availabeOptions = [
        {icon:'envelope',name:'Email',showArrow:false,itemValue:email ,disabled : true ,},
        {icon:'phone-alt',name:'Phone Number',showArrow:false,itemValue:phoneNumber , disabled : true},
    ];

    const checkOptions = (index) =>{
        if(index) setShowPhoneNumber(true);
        else setShowEmail(true);
    };

    const onSelect = (country) =>{
        setCountryCode(country.cca2);
        setCountryCallingCode('+' + country.callingCode[0]);
        setShowCountryPicker(false);
    };

    const otpInput = (otp,type) => {
        if (otp.length == 4) {
            verifyOTP(otp,type);
        }
    };

    const sendOtp = () =>{
        setNumberOtp(true);
        apiServices.resendOTP(email,`${countryCallingCode}${newNumber}`)
            .then((data)=>{
                console.log('Data',data);
            })
            .catch((err)=>{
                console.log('err',err);
            });
    };

    const verifyOTP = (otp) => {
        setIsLoading(true);
        setShowPhoneNumber(false);
        setShowEmail(false);
        apiServices.verifyOTP( email, `${countryCallingCode}${newNumber}`, otp)
            .then(() => {
                setNumberOtp(false);
            })
            .catch(() => {
                setIsLoading(false);
                setShowError(true);
                setErroTitle('Verification Failed');
                setErrorMessage('You have entered Invalid or Expired OTP!');
            });
    };

    const updateEmail = () =>{
        if(newEmail !== '')
        {
            apiServices.updateUserPhoneEmail( email,phoneNumber, newEmail, phoneNumber )
                .then(()=>{
                    setIsLoading(false);
                    setShowError(true);
                    setErroTitle('Verify Email');
                    setErrorMessage('Please check your email for verification link');
                })
                .catch((err)=>{
                    console.log('Err',err);
                    setIsLoading(false);
                    setShowError(true);
                    setErroTitle('Update Failed');
                    setErrorMessage('Your Number/Email Update Failed!');
                });
        }
        else{
            Toast.show('Email cannot be empty', Toast.LONG);
        }
    };

    const renderNumberVerification = ()=>{
        return(
            <View style={styles.verificationModals}>
                <ModalHeader headerText={'Change Number ?'} onPress={()=>{setShowPhoneNumber(false), setNumberOtp(false);}} />
                {
                    (!numberOtp) && 
                    <View style={{marginTop:moderateScale(20)}}>
                        <View style={styles.NumberWrapper}>
                            <View>
                                <TouchableOpacity
                                    onPress={()=>setShowCountryPicker(true)}
                                    style={{flexDirection:'row'}}
                                >
                                    <Text style={{color:'#fff',marginRight:moderateScale(5)}}>
                                        {countryCallingCode}
                                    </Text>
                                    <Icon
                                        color={'#fff'}
                                        name={'arrow-down'}
                                        size={18}
                                    />
                                </TouchableOpacity>
                                <CountryPicker
                                    theme={{
                                        color: Colors.title,
                                        primaryColorVariant: Colors.primaryBorder,
                                        backgroundColor: Colors.primaryBg,
                                        onBackgroundTextColor: Colors.subTitle,
                                        fontSize: 14,
                                        fontFamily: 'Montserrat-Bold',
                                        filterPlaceholderTextColor: Colors.title,
                                        activeOpacity: 0.7,
                                        itemHeight: 40,
                                    }}
                                    {...{
                                        countryCode: countryCode,
                                        withFilter: true,
                                        withFlag: true,
                                        withCountryNameButton: false,
                                        withCallingCodeButton: false,
                                        withFlagButton: false,
                                        withAlphaFilter: true,
                                        withCallingCode: true,
                                        withEmoji: true,
                                        onSelect: onSelect,
                                        onClose: () => {
                                            setShowCountryPicker(false);
                                        },
                                    }}
                                    visible={showCountryPicker}
                                />
                            </View>
                            <TextInput
                                keyboardType={'phone-pad'}
                                onChangeText={number => {
                                    setNewNumber(number);
                                }}
                                placeholder={'Enter New Number'}
                                placeholderTextColor={Colors.tintColorGreyedDark}
                                style={styles.inputText}
                                value={newNumber}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>sendOtp('number')} style={styles.verifyButton}>
                            <Text style={styles.verifyText}>Get OTP</Text>
                        </TouchableOpacity>
                    </View> 
                }
                {
                    (numberOtp) &&
                   <View style={{marginTop:moderateScale(100)}}>
                       <TextInput
                           keyboardType={'phone-pad'}
                           maxLength={4}
                           onChangeText={(otp)=>otpInput(otp,'number')}
                           placeholder={'- - - -'}
                           placeholderTextColor={Colors.subTitle}
                           style={styles.otpInput}
                       />
                       <Text style={{alignSelf:'center',color:Colors.white}}>Enter the OTP!</Text>
                   </View>
                }
            </View>
        );
    };

    const renderEmailVerification = ()=>{
        return(
            <View style={styles.verificationModals}>
                <ModalHeader headerText={'Change Email ?'} onPress={()=>{setShowEmail(false);setEmailVerified(false);}} />
                {
                    (!emailVerified) && 
                    <View style={{marginTop:moderateScale(20)}}>
                        <View style={styles.NumberWrapper}>
                            <TextInput
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                onChangeText={number => {
                                    setNewEmail(number);
                                }}
                                placeholder={'Enter New Email'}
                                placeholderTextColor={Colors.tintColorGreyedDark}
                                style={styles.inputText}
                                value={newEmail}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>updateEmail('email')} style={styles.verifyButton}>
                            <Text style={styles.verifyText}>Get Verification Email</Text>
                        </TouchableOpacity>
                    </View>
                }

                {
                    (emailVerified) &&
                   <View style={{marginTop:moderateScale(100)}}>
                       <Text style={{alignSelf:'center',color:Colors.white}}>Please check your email for verification. </Text>
                   </View>
                }
                
            </View>
        );
    };

    return(
        <View style={styles.boxWrapper}>
            <Text style={styles.titleBar_title}>About You</Text>
            {availabeOptions.map((item,index)=>(
                <Options key={index} onPress={()=>checkOptions(index)} optionItem={item} optionValue={item.itemValue} />
            ))}
            <View>
                <LoadingIndicator
                    message={'Please wait!'}
                    visible={isLoading}
                />
                <ErrorDialog
                    message={errorMessage}
                    onDismiss={() => {
                        setShowError(false);
                    }}
                    title={errorTitle}
                    visible={showError}
                />
            </View>
            <Modal
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={showEmail}
                onBackButtonPress={()=>{setShowEmail(false);setEmailVerified(false);}}
                onBackdropPress={()=>{setShowEmail(false);setEmailVerified(false);}}
                style={{padding:0,margin:0,justifyContent:'center',alignItems:'center'}}
                useNativeDriver={true}
            >
                {renderEmailVerification()}
            </Modal>
            <Modal
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={showPhoneNumber}
                onBackButtonPress={()=>{setShowPhoneNumber(false);setNumberOtp(false);}}
                onBackdropPress={()=>{setShowPhoneNumber(false);setNumberOtp(false);}}
                style={{padding:0,margin:0,justifyContent:'center',alignItems:'center'}}
                useNativeDriver={true}
            >
                {renderNumberVerification()}
            </Modal>
            
        </View>
    );
};

AboutYou.propTypes = {
    accountDetails:PropTypes.object.isRequired,
};

 
export default AboutYou;

