
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');                    

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#fff',   
        padding: 10   
    },
   
    ImageCntr: { 
        height: height * 0.2, 
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    logo: {     
        width: width * 0.5,
        marginBottom: 20,              
    },
    HeadTxt: {   
        fontWeight: 'bold',    
        margin: 6,
        textAlign: 'center' 
    }, 
    headTxt: {
        fontSize: 30,  
        fontWeight: 'bold', 
        color: '#2979ff',   
        marginVertical: 10, 
       
    },    
    subHeader: {    
                fontSize: 16,  
                color: '#666',
                marginBottom: 20, 
      
            },
    inputContainer: { 
        width: '100%',      
        marginVertical: 10, // Adjusted margin for better spacing 
    },  
    textInput: {    
        backgroundColor: '#fff', // Ensure background matches the container
        borderRadius: 5, // Round the corners if needed
    },
    loginButton: {
        backgroundColor: '#2db8cb', 
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginVertical: 25,
    }, 
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center'                             
    },                                           
    otpContainer: {  
        flexDirection: 'row',                         
        justifyContent: 'space-between',                 
        margin: 24,
        padding: 10
    }, 
    otpInput: {
        width: 40, 
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5
    },
    timerText: {
        fontSize: 16,
        marginBottom: 16,
    },
    resendText: {
        fontWeight: '700',
        color: '#2db8cb',
        textDecorationColor: '#2db8cb',
        textDecorationStyle: 'solid',
        padding: 10
    },
    separator: {   
        fontWeight: 'bold', 
        alignSelf: 'center',  
        color: '#888'
    },
    signUpText:{
        fontWeight: '700',
        color: '#2db8cb',
        textDecorationColor: '#2db8cb',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    }
});

export default styles;
