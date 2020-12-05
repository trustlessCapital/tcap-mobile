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

import React, { useEffect, useState } from 'react';
import {View,Text, TextInput,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import apiServices from '../../../../@Services/api-services';
import * as CurrencyActions from '../../../../@Redux/actions/currencyActions';
import { connect } from 'react-redux';
import styles from '../styles';
import Options from '../Options';
import Modal from 'react-native-modal';
import Colors from '../../../../@Constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import LoadingIndicator from '../../../../@Components/loading-indicator';
import {useNavigation} from '@react-navigation/native';

const availabeOptions = [
    {icon:'dollar-sign',name:'Display Currency',showArrow:false}
];
 
const Preferences = ({...props}) =>{

    const {
        updateExchangeRates,selectedCurrency,currencyList,
        accountDetails,updateCurrencyList
    } = props;

    const navigation = useNavigation();

    const value = `${selectedCurrency.exchange}  ( ${selectedCurrency.symbol} )`;
    const [isActive, setIsActive] = useState(false);
    const [loader, setLoader] = useState(false);
    const [searchedData , setSearchedData] = useState([]);

    const {recommended = [], all =[]} = currencyList;

    useEffect(()=>{
        apiServices.getCurrencyList()
            .then(data=>{
                updateCurrencyList(data.currencyList);
            })
            .catch(()=>{
            });
    },[]);

    const getCurrency = (currency) =>{
        setIsActive(false);
        setLoader(true);
        apiServices.getCurrencyRate(currency)
            .then(data=>{
                setLoader(false);
                updateExchangeRates(data);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth',params:{ accountDetails: accountDetails }}],
                });
            })
            .catch(()=>{
                setLoader(false);
            });
    };

    const renderEachCurrency = (item,index) =>{
        return(
            <TouchableOpacity key={index} onPress={()=>getCurrency(item.shortName)} style={styles.currencyRowWrapper}>
                <Text style={styles.optionText}>{item.fullName} - {item.shortName}</Text>
                <Text style={styles.optionSymbol}> ( {item.symbol} )</Text>
            </TouchableOpacity>
        );
    };

    const searchText = (text) =>{
        const data = all.find(x=> x.shortName === text.toUpperCase());
        if(data) setSearchedData([data]);
    };

    const renderSearchedData = () =>{
        if(searchedData.length)
            return(
                <>
                    <Text style={styles.titleBar_title}>Searched Currency</Text>
                    {searchedData.map((item)=>(
                        renderEachCurrency(item)
                    ))}
                </>
            );
        return null;
    };

    const renderCurrencyList = () =>{
        return(
            <SafeAreaView style={styles.modalWrapper}>
                <View style={styles.searchWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon color={Colors.lightGrey} name={'search'} style={{marginRight:moderateScale(10)}} />
                        <TextInput 
                            onChangeText={(string)=>searchText(string)}
                            placeholder={'Search, Ex - USD'}
                            placeholderTextColor={Colors.lightGrey}
                            style={styles.searchBox}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>setIsActive(false)}>
                        <Icon color={Colors.activeTintRed} name={'times'} size={moderateScale(20)} />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{padding:moderateScale(20)}} showsVerticalScrollIndicator={false}>
                    {renderSearchedData()}
                    <Text style={styles.titleBar_title}>Recommended</Text>
                    {recommended.map((item,index)=>(
                        renderEachCurrency(item,index)
                    ))}
                    <Text style={styles.titleBar_title}>All</Text>
                    {all.map((item,index)=>(
                        renderEachCurrency(item,index)
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    };

    return(
        <View style={styles.boxWrapper}>
            <Text style={styles.titleBar_title}>Your Preferences</Text>
            {availabeOptions.map((item,index)=>(
                <Options key={index} onPress={()=>setIsActive(true)} optionItem={item} optionValue={value} />
            ))}
            <Modal
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={isActive}
                onBackButtonPress={()=>setIsActive(false)}
                onBackdropPress={()=>setIsActive(false)}
                style={{justifyContent:'center',alignItems:'center',padding:0,margin:0}}
                useNativeDriver={true}
            >
                {renderCurrencyList()}
            </Modal>
            <LoadingIndicator
                message={'Refreshing Currency, Please wait'}
                visible={loader}
            />
        </View>
    );
};

Preferences.propTypes = {
    accountDetails:PropTypes.object.isRequired,
    currencyList:PropTypes.object.isRequired,
    selectedCurrency:PropTypes.object.isRequired,
    updateCurrencyList:PropTypes.func.isRequired,
    updateExchangeRates:PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        selectedCurrency : state.currency.selectedCurrency,
        currencyList:state.currency.currencyList,
        accountDetails : state.account.accountDetails
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateExchangeRates:currency =>
            dispatch(CurrencyActions.updateExchangeRates(currency)),
        updateCurrencyList:list =>
            dispatch(CurrencyActions.updateCurrencyList(list)),
    };
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Preferences);