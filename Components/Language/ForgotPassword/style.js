import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    resetOptionButton: {
        backgroundColor: '#0D47A1',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    selectedResetOption: {
        backgroundColor: '#1565C0',
    },
    resetOptionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    orText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#f7f7f7',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    resetPasswordButton: {
        backgroundColor: '#0D47A1',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    resetPasswordText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default styles;
