
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

 
import React,{useEffect, useState} from 'react';
import { View,Text,FlatList,RefreshControl } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import walletUtils from '../../../../@Services/wallet-utils';
import WalletService from '../../../../@Services/wallet-service';
import apiServices from '../../../../@Services/api-services';
import styles from './styles';
import LoadingIndicator from '../../../../@Components/loading-indicator';
import { useIsFocused } from '@react-navigation/native';

import HistoryCard from './HistoryCard';
 
const TransactionHistory = () =>{
    const isFocused = useIsFocused();
    const walletService = WalletService.getInstance();
    const accAddress =  walletUtils.createAddressFromPrivateKey(walletService.pk);

    console.log('accAddress',accAddress);

    const [isLoading, setIsLoading] = useState(false);
    const [list , setList] = useState([]);

    const [refreshing,setRefreshing] = useState(false);

    useEffect(()=>{
        if(isFocused)
            loadHistory();
    },[isFocused]);

    const onRefresh = () =>{
        setRefreshing(true);
        loadHistory();
        setTimeout(()=>{setRefreshing(false);},500);
    };

    const loadHistory = () =>{
        setIsLoading(true);
        apiServices.getTransactionHistory(accAddress)
            .then((data)=>{
                setList(data);
                setIsLoading(false);
            })
            .catch(err=>{
                setIsLoading(false);
                console.log(err);
            });
    };

    const renderEachItem = ({ index,item }) =>{
        return <HistoryCard historyData={item}  key={index} />;
    };

    return(
        <View style={styles.container}>
            <Text style={styles.titleBar_title}>Transaction Activities</Text>
            <FlatList
                data={list} 
                initialNumToRender={5}
                keyExtractor={item=>item.txnId.toString()}
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh} refreshing={refreshing}
                        title="Refreshing History .."
                        titleColor={'#fff'} />
                }
                removeClippedSubviews={true} 
                renderItem = {renderEachItem}
                showsVerticalScrollIndicator={false}
                style={{flex:1,marginTop:moderateScale(20)}}
            />
            <LoadingIndicator
                message={'Please wait while fetching your transactions...'}
                visible={isLoading}
            />
        </View>
    );
};
 

 
export default TransactionHistory;