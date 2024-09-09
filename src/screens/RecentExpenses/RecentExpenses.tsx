import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux";
import { SET_RECENT_FOCUSED } from "../../redux/reducer/tabReducer";
import { getProductData } from "../../api/apiServices";

const RecentExpenses = () => {
    const isRecentScreenFocused = useIsFocused();
    const dispatch = useDispatch();

    const [recentProduct, setRecentProducts] = useState<any>([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        if (isRecentScreenFocused) {
            dispatch(SET_RECENT_FOCUSED(true));
        } else {
            dispatch(SET_RECENT_FOCUSED(false))
        }
    }, [isRecentScreenFocused]);

    useEffect(() => {
        functionToGetProductData();
    }, []);

    const functionToGetProductData = async () => {
        try {
            const productData: any = await getProductData();
            let recentData = productData.splice(0, 5);
            setRecentProducts(recentData);
            setTimeout(()=>{
                setIsLoader(false);
            }, 2000)
            console.log('productData----------->>', recentData.length)
        } catch (error) {
            setIsLoader(false);
            console.log('functionToGetProductData error ----->>', error)
        }
    }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {isLoader ? <ActivityIndicator size="large" color="#000"/> 
            :
            <ScrollView contentContainerStyle={styles.recentExpence}>
                {recentProduct.map((item: any) => (
                    <View style={styles.outerListContainer}>
                        <View style={styles.listContainer}>
                            <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            }
        </View>
    )
}

export default RecentExpenses;

export const styles = StyleSheet.create({
    recentExpence: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    outerListContainer: {
        width: '40%',
        height: 200,
        margin: 10
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cccccc',
        borderRadius: 10,
    },
    titleText: {
        color: '#000000',
        textAlign:'center',
        padding: 5
    }
})