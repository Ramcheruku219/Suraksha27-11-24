


import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const title_Text = width * 0.08;
const circleSize = width * 0.7;

const styles = StyleSheet.create({

    passwordCriteriaContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        width: "80%",
        height: 50
        // alignItems: 'center',
        // justifyContent: 'flex-start',


    },
    criteriaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        margin: 4,


    },
    valid: {
        color: 'green',
        marginLeft: 5
    },
    default: {
        color: '#ccc',
        marginLeft: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
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
        fontSize: 28,
        textAlign: 'left',
        margin: 6
    },
    subtxt: {
        fontWeight: '500',
        color: '#ccc',
        fontSize: 16,
        margin: 6,
        textAlign: 'justify'
    },
    inputContainer: {
        width: '100%',
        marginVertical: 20
        // flexDirection: 'row',
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: '#ccc',
        // borderRadius: 5,

    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: '#333',

    },
    icon: {
        marginRight: 10,
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
    buttonTextGuest: {
        fontWeight: '500',
        color: '#fff',
        fontSize: title_Text * .4,
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
    buttonPhone: {
        backgroundColor: '#00BCD4',
        padding: 10,
        marginVertical: 10,
        width: '50%',
        alignSelf: 'flex-end',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default styles;