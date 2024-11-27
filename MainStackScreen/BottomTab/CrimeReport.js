
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    Alert,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import styles from './CrimeReportStyles';
import * as Location from 'expo-location';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocationAsync } from '../../Components/CustomComponents/Gps';
import Loader from '../../Components/Loader';
import MyCameraApp from './MyCameraApp';
import { endApi } from '../../Components/EndApi';
import { resizeAndConvertToPDF } from './resizeFile';
import MapboxWebView from '../MapboxView';
import MapboxWebViewOld from '../../Components/MapboxView';


const { height } = Dimensions.get('window');

const CrimeReport = () => {

    const navigation = useNavigation();

    const [mapToggle, setMapToggle] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const [showNote, setShowNote] = useState(false);
    const [backPressTimestamp, setBackPressTimestamp] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);
    const [gender, setGender] = useState('Male');
    const [loading, setLoading] = useState(false);
    const [inputHeight, setInputHeight] = useState(50);
    const [userDet, setUserDet] = useState(null)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)


    React.useEffect(() => {
        const GetData = async () => {
            const userData = await AsyncStorage.getItem('UserProfile');
            const data = JSON.parse(userData);
            setUserDet(data)
        }
        GetData()
    }, []);

    useEffect(() => {
        if (modalVisible == false) { 
            resetForm()
        }
    }, [modalVisible])

    const opacity = useSharedValue(0); 
    const translateY = useSharedValue(300); 

    const animatedStyle = useAnimatedStyle(() => { 
        return { 
            opacity: opacity.value, 
            transform: [{ translateY: translateY.value }], 
        };
    });

    React.useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 });
        translateY.value = withTiming(0, { duration: 500, easing: Easing.bezier(0.5, 1, 0.89, 1) });
    }, []);



    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

        return () => backHandler.remove(); 
    }, [backPressTimestamp]);
 
    const handleBackButtonPress = () => {
        const currentTimestamp = Date.now(); 
        if (backPressTimestamp && currentTimestamp - backPressTimestamp < 2000) {
            showExitAlert();
            return true;
        } else {
            setBackPressTimestamp(currentTimestamp); 
            return true;
        }
    };

    const showExitAlert = () => {
        Alert.alert(                
            'Exit App',
            'Do you want to exit the app?',
            [
                { text: 'Cancel', onPress: () => null, style: 'cancel' }, 
                { text: 'OK', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
        );
    };

    const handleGenderPress = (gender) => {  
        setSelectedGender(gender); 
        setShowNote(true); 
    };  
   
    const LocationSet = async () => {   
        let { status } = await Location.requestForegroundPermissionsAsync(); 
        if (status !== 'granted') { 
            Alert.alert("Permission Denied", "Location permission is required to fetch your current location.");
            setLoading(false); 
            return null; // Return null if permission is denied
        } 

        setLoading(true); 
        try {
            const { latitude, longitude } = await getLocationAsync();
            setLatitude(latitude);
            setLongitude(longitude)
            const response = await fetch(endApi.reverseGeocode(latitude, longitude),
                {
                    headers: {
                        'User-Agent': 'Varanasi/1.0 (kakarlak309@gmail.com)',
                    },
                }
            );
            const data = await response.json();
            const address = data.display_name;
            setLoading(false);
            return { latitude, longitude, address }; // Return all values
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            return null;
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        const locationData = await LocationSet();

        if (!locationData){   
            setLoading(false);
            alert('Address not set properly please check it once.');
            return;
        }

        const { latitude, longitude, address } = locationData;
        console.log(selectedGender, address, userDet, latitude, longitude)
        const formData = new FormData();

        formData.append('crime_file_name', 'crime');
        formData.append('gender', selectedGender);
        formData.append('crime_location', address);
        formData.append('reg_by_id', userDet?.citizen_id);
        formData.append('reg_by_name', userDet?.name);
        formData.append('reg_user_address', userDet?.address);
        formData.append('reg_by_phone_number', userDet?.phone_number);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        const imageResized = await resizeAndConvertToPDF(photo); // Ensure this function returns a valid object
        formData.append('crimeFile', {
            uri: imageResized.uri,
            name: 'crime_image.jpg', // Provide a default name for the file
            type: 'image/jpeg'
        });
 
        try {
            const response = await fetch(endApi.insertSuraksha, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Note: 'multipart/form-data' should be set automatically by FormData, so you might remove it if issues persist
                },
                body: formData
            });

            const data = await response.json();

            if (data.message === 'Crime report inserted successfully') {
                setLoading(false);
                Alert.alert(
                    'Report Submitted',
                    'Your report was successfully submitted.',
                    [{ text: 'OK', onPress: () => resetForm() }]
                );
            } else {
                setLoading(false);
                console.log(data);
                Alert.alert('Error', 'Error inserting data!');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', error.message);
        } finally {
            // setLoading(false);
        }
    }; 

    const resetForm = () => {
        setSelectedGender(null);  
        setShowNote(false);  
        setModalVisible(false);  
        setPhoto(null);
        setAddress('');
        setInputHeight(50);
        setLatitude(0);
        setLongitude(0)
    };


    const handleImageChange = async (uri) => {
        setPhoto(uri);
        const addrs = await LocationSet();
        const { address } = addrs;
        setAddress(address)
    };



    // return (
    //     <View style={styles.container}>
    //         <View style={styles.header}>
    //             <Image source={require('../../assets/new-logo.png')} style={styles.logo} />
    //             <View style={styles.headerContent}>
    //                 <Text style={styles.welcomeText}>Welcome,</Text>
    //                 <Text style={styles.subtitle}>to Varanasi Smart City Application</Text>
    //                 <Text style={styles.Surakshatitle}>Suraksha</Text>
    //                 <Text style={styles.Surakshasubtitle}>(Press for emergency by gender.)</Text>
    //                 <View style={styles.genderButtons}>
    //                     <TouchableOpacity
    //                         style={[styles.button, selectedGender === 'Male' && styles.selectedButton]}
    //                         onPress={() => handleGenderPress('Male')}
    //                     >
    //                         <Image source={require('../../assets/male.png')} style={styles.icon} />
    //                     </TouchableOpacity>
    //                     <TouchableOpacity
    //                         style={[styles.button, selectedGender === 'Female' && styles.selectedButton]}
    //                         onPress={() => handleGenderPress('Female')}
    //                     >
    //                         <Image source={require('../../assets/female.png')} style={styles.icon} />
    //                     </TouchableOpacity>
    //                 </View>
    //                 {showNote && ( 
    //                     <View style={styles.noteContainer}> 
    //                         <TouchableOpacity
    //                             style={styles.closeButton} 
    //                             onPress={() => {
    //                                 setShowNote(false);
    //                                 setSelectedGender(null);
    //                             }}
    //                         >
    //                             <Ionicons name="close" size={24} color="black"/> 
    //                         </TouchableOpacity>
    //                         <View style={styles.noteContent}>
    //                             <Ionicons name="information-circle-outline" size={24} color="#007BFF" />
    //                             <Text style={styles.noteText}>Please report any genuine help required to serve better. Any false information is a punishable act.</Text>
    //                         </View>
    //                         <TouchableOpacity style={styles.submitButton} onPress={() => { setModalVisible(true) }}>
    //                             <Text style={styles.submitButtonText}>Submit Report</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 )}

    //             </View>
    //         </View>

    //         <ScrollView style={styles.scrollView}>
    //             <View style={[styles.mapContainer,{height: mapToggle ? height * 0.69 : 200 }]}>
    //                 <MapboxWebView />
    //                 <TouchableOpacity onPress={() => setMapToggle(!mapToggle)} style={[styles.mapFullscreen]}>
    //                     <MaterialIcons name="zoom-out-map" size={24} color="#fff" />
    //                 </TouchableOpacity>
    //             </View>


    //         </ScrollView>
    //         <Modal
    //             animationType="none"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => setModalVisible(!modalVisible)}
    //         >
    //             <View style={styles.modalContainer}>
    //                 <View style={styles.modalView}>
    //                     <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
    //                         <Icon name="close" size={30} color="#000" />
    //                     </TouchableOpacity>
    //                     <View style={styles.modalHeader}>
    //                         <Text style={styles.modalTitle}>More Information</Text>
    //                     </View>
    //                     <Text>Please upload the image of the location where the incident occurred if possible</Text>
    //                     <TextInput
    //                         label="Address"
    //                         multiline
    //                         value={address}
    //                         onChangeText={setAddress}
    //                         mode="outlined"
    //                         style={{
    //                             height: inputHeight,
    //                             width: '100%',
    //                             marginBottom: 15,
    //                         }}
    //                         onContentSizeChange={(e) => {
    //                             setInputHeight(Math.max(50, e.nativeEvent.contentSize.height));
    //                         }}
    //                         numberOfLines={4}
    //                     />
    //                     {/* Render the MyCameraApp component here */}
    //                     <MyCameraApp value={photo} onDocumentChange={handleImageChange} />
    //                     {photo && <Image source={{ uri: photo }} style={styles.photo} />}
    //                     <TouchableOpacity style={styles.closesButton} onPress={handleSubmit}>
    //                         <Text style={styles.closesButtonText}>Submit</Text>
    //                     </TouchableOpacity>
    //                     {loading && <Loader />}
    //                 </View>
    //             </View>
    //         </Modal>
    //     </View>
    // );

    return (
        <View style={styles.container}>    
            {/* Header Section */}           
            <View style={styles.header}>   
                <Image source={require('../../assets/new-logo.png')} style={styles.logo} />
                <View style={styles.headerContent}>
                    <Text style={styles.welcomeText}>Emergency Crime Report</Text>
                    <Text style={styles.subtitle}>Submit an instant SOS based on your situation</Text>

                    {/* Gender Selection Buttons */}
                    <View style={styles.genderButtons}>
                        <TouchableOpacity
                            style={[styles.genderButton, selectedGender === 'Male' && styles.selectedButton]}
                            onPress={() => handleGenderPress('Male')}
                        >
                            <Image source={require('../../assets/male.png')} style={styles.icon} />
                            <Text style={styles.genderText}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.genderButton, selectedGender === 'Female' && styles.selectedButton]}
                            onPress={() => handleGenderPress('Female')}
                        >
                            <Image source={require('../../assets/female.png')} style={styles.icon} />
                            <Text style={styles.genderText}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Emergency Note */}

                    {showNote && (
                        <View style={styles.noteContainer}> 
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    setShowNote(false);
                                    setSelectedGender(null); 
                                }} 
                            > 
                                <Ionicons name="close" size={24} color="black"/> 
                            </TouchableOpacity> 
                            <View style={styles.noteContent}> 
                                <Ionicons name="alert-circle-outline" size={24} color="#d9534f"/> 
                                <Text style={styles.noteText}>Please report any genuine help required to serve better. Any false information is a punishable act.</Text>
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={() => setModalVisible(true)}>
                                <Text style={styles.submitButtonText}>Submit SOS Report</Text>
                            </TouchableOpacity>
                        </View>                     
                    )}
                </View> 
 </View>                                                      
               
            {/* Map Section */}
            <ScrollView style={styles.scrollView}> 
                <View style={[styles.mapContainer, { height: mapToggle ? height * 0.7 : height * 0.52 }]}>
                    {(latitude && longitude) ? <MapboxWebView latitude={latitude} longitude={longitude} /> : <MapboxWebViewOld />}
                    <TouchableOpacity onPress={() => setMapToggle(!mapToggle)} style={styles.mapFullscreen}>
                        <MaterialIcons name="zoom-out-map" size={24} color="#fff" />
                    </TouchableOpacity>
                </View> 
            </ScrollView> 
 
            {/* SOS Report Modal */}     
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
                            <Ionicons name="close" size={30} color="#000" />
                        </TouchableOpacity>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Submit Additional Details</Text>
                        </View>
                        <Text style={styles.modalInstruction}>If possible, upload a photo of the incident location.</Text>
                        <TextInput
                            placeholder="Incident Location Address"
                            multiline
                            value={address}
                            onChangeText={setAddress}
                            style={[styles.textInput]}
                            onContentSizeChange={(e) => setInputHeight(Math.max(50, e.nativeEvent.contentSize.height))}
                            numberOfLines={4}
                        />
                        {/* Camera Component */}
                        <MyCameraApp value={photo} onDocumentChange={handleImageChange} />
                        {/* {photo && <Image source={{ uri: photo }} style={styles.photoPreview} />} */}
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Submit Report</Text>
                        </TouchableOpacity>
                        {loading && <Loader />}
                    </View>
                </View>
            </Modal>
        </View>
    );
};




export default CrimeReport;









