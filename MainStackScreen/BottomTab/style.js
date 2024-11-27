import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6f7ff',
        margin: 16
    },
    header: {
        padding: 50,
        backgroundColor: '#197DCAFF',
        height: height * .30,
        border: 100,
        borderBottomLeftRadius: height * .12,
        borderBottomRightRadius: height * .12,
        position: 'relative',
        top: 10
    },

    fileInput: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 16,
        borderWidth: 4,
        borderCurve: 'continuous',
        borderStyle: 'dotted',
        borderColor: '#ccc',
        borderRadius: 10
    },
    label: {
        fontSize: 14,
        color: '#333',
        textAlign: 'auto',
        paddingBottom: 5
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileButton: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: -30,
        marginRight: -16,
    },
    menuButton: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: -30,
        marginRight: -60,

    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 45,

    },
    backButton: {
        marginRight: 'auto',
        marginLeft: -45,
        marginTop: -40,
        margin: 10,
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    description: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '400'
    },
    card: {
        backgroundColor: '#f1f8fdff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderBottomLeftRadius: height * .5,
        borderBottomRightRadius: height * .5,
        overflow: 'hidden'
    },
    cardd: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginTop: -55,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80
    },
    form: {
        width: '100%',

    },
    inputGroupLocation: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 50,
        width: '85%'
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 50,

    },
    picker: {
        flex: 1,
        marginLeft: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 5
    },
    uploadGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    uploadBox: {
        flex: 1,
        marginLeft: 10,
        padding: 10
    },
    uploadButton: {
        // backgroundColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadButtonText: {
        color: '#fff',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#3399ff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        width: '30%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
    },
    buttonGroupp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
        alignSelf: 'center',
        marginVertical: 40
    },
    submitButton: {
        backgroundColor: '#3399ff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        marginTop: -20,
        justifyContent: 'space-between',


    },
    submitButtonText: {
        color: '#fff',
    },
    mapContainer: {
        height: 200, // Adjusted height
        width: '100%',
        borderRadius: 200,
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    uploadedImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        padding: 10,
        marginTop: 10,
    },
    modalText: {
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        alignSelf: 'center',
    },
    contentContainer: {
        margin: 16
    },
    noDataImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: -14,
        height: '90%',
        resizeMode: 'contain',
        backgroundColor: '#fff',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    cardHeaderText: {
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardDescription: {
        color: '#666',
    },
    statusBadge: {
        padding: 12,
        borderRadius: 25,
        width: '30%',
        alignItems: 'center',
        marginLeft: -22
    },
    statusText: {
        color: '#000'
    },
    statusRaised: {
        backgroundColor: '#f3f4f6',
    },
    statusInProgress: {
        backgroundColor: '#fef8f4',
    },
    statusCompleted: {
        backgroundColor: '#eefdf3',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    cardDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetailText: {
        marginLeft: 4,
        fontSize: 14,
    },
    viewButton: {
        backgroundColor: '#379ae6',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        width: '35%',
        alignSelf: 'center'
    },
    viewButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    syncCntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    syncButton: {
        backgroundColor: '#19563d',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        width: '35%',

        flexDirection: 'column-reverse'
    },
    syncButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f4ff',
        marginVertical: 10
    },
    headerImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 20
    },
    profileContainer: {
        alignItems: 'center'
    },
    logo: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '25%',
        marginTop: 20
    },
    profileImageContainer: {
         position: 'relative',
        
      
      
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ddd'
    },
  
    editIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#0a74da',
        borderRadius: 16,
        padding: 4,
    },
    inputContainer: {
        alignSelf: 'center',
        width: '80%',
        marginBottom: 16
    },
    label: {
        marginBottom: 4,
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6ff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    input: {
        flex: 1,
    },
    editButton: {
        padding: 5,
        backgroundColor: '#4069E5FF',
        borderRadius: 50
    },
    saveButton: {
        backgroundColor: '#0a74da',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '80%',
        marginTop: 16,
        alignSelf: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    logoutcntr: {
        alignSelf: 'flex-end',
        marginHorizontal: 16,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    Headcntr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 16,
        alignItems: 'center',
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    HeadBtn: {
        padding: 16,
        backgroundColor: '#379ae6',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    HeadBtnNotSelect: {
        padding: 16,
        width: '45%',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    HeadBtnTxt: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#379AE6FF'
    },
    noDataText: {
        alignItems: 'center',
        justifyContent: "center"
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    modalText: {
        fontSize: 18,
        marginLeft: 10,
    },
    modalCancel: {
        alignItems: 'center',
        padding: 15,
    },
    modalCancelText: {
        fontSize: 18,
        color: 'red',
    }

})

export default styles;