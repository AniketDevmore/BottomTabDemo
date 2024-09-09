import Toast from 'react-native-simple-toast'
  
export const Toaster = (message: string) => {
    Toast.show(message, Toast.LONG);
}