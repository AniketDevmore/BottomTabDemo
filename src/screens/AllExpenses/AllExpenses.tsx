import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux";
import { SET_ALL_EXPENSE_FOCUSED } from "../../redux/reducer/tabReducer";
import { getProductData } from "../../api/apiServices";

const AllExpenses = () => {
    const isRecentScreenFocused = useIsFocused();
    const dispatch = useDispatch();
    const focus = useIsFocused();

    const [recentProduct, setRecentProducts] = useState<any>([]);
    const [isLoader, setIsLoader] = useState(true);
    const [isFocused, setIsFocused] = useState(false)

    // pagination states
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [totalPageCount, setTotalPageCount] = useState<number>(0)

    useEffect(()=>{
        if(focus){
            setIsFocused(!isFocused)
        }
    }, [focus]);

    useEffect(() => {
        if (isRecentScreenFocused) {
            dispatch(SET_ALL_EXPENSE_FOCUSED(true));
        } else {
            dispatch(SET_ALL_EXPENSE_FOCUSED(false))
        }
    }, [isRecentScreenFocused]);

    useEffect(() => {
        setIsLoader(true);
        functionToGetProductData();
    }, [isFocused]);

    const functionToGetProductData = async () => {
        try {
            const productData: any = await getProductData();
            if(productData !== undefined){
                setRecentProducts(productData.products);
                setTimeout(()=>{
                    setIsLoader(false);
                }, 2000)
                console.log('productData all----------->>', productData.products.length);
            }
        } catch (error) {
            setIsLoader(false);
            setRecentProducts([]);
            console.log('functionToGetProductData error ----->>', error);
        }
    }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {isLoader ? <ActivityIndicator size="large" color="#000"/> 
            : 
            <ScrollView contentContainerStyle={styles.recentExpence}>
                {recentProduct.map((item: any) => (
                    <View key={item.id} style={styles.outerListContainer}>
                        <View style={styles.listContainer}>
                            <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>}
            
        </View>
    )
}

export default AllExpenses;

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
        textAlign: 'center',
        padding: 5
    }
})