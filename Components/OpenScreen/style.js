import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const title_Text = width * 0.08;
const circleSize = width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        marginTop:-70 
    },
    logo:{ 
        width: width * 0.75, 
        height: height * 0.25, 
        marginBottom: 20, 
    }, 
    buttonOrg: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 10,
        width: '100%',
        alignItems: 'baseline',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: '500',
        color: '#fff',
        fontSize: title_Text * .4,
    },
    buttonCitizen: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonCrime: {
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b71c1c', // default color in case it's not updated inline
    },
    buttonPhone: {
        backgroundColor: '#00BCD4',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 200, // Adjust the height as necessary
        // overflow: 'hidden',
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000, // to ensure a perfect circle
    },
    circleLeft: {
        backgroundColor: '#FDD6BE',
    },
    circleRight: {
        backgroundColor: '#F8C9C1',
    },
    textContainer: {
        position: 'absolute',
        left: 0,
        alignItems: 'flex-start',
        zIndex: 1
    },
    welcomeText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#000'
    },
    subText: {
        color: '#000'
    },
});

export default styles;