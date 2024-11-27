import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  genderButtons: {
    position: 'absolute',
    top: 50, // Adjust as needed
    right: 10, // Adjust as needed
    flexDirection: 'row',
    alignItems: 'center',
},
button: {
    marginLeft: 10,
    backgroundColor: '#fff', // You can change this color
    borderRadius: 50,
    padding: 10,
    elevation: 3, // Adds a shadow effect
},
noteSection: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff3cd', // Light yellow background for note
  padding: 10,
  borderRadius: 10,
  marginVertical: 10,
  borderColor: '#ffeeba', // Yellow border
  borderWidth: 1, // Border width for note section
},
noteIcon: {
  width: 20,
  height: 20,
},
// noteText: {
//   marginLeft: 10,
//   fontSize: 16,
//   color: '#856404', // Dark yellow color for text
// },
noteIconContainer: {
  position: 'absolute',
  left: 60, // Adjust this value based on your layout
  top: 52, // Adjust this value based on your layout
 
},
noteText: {
  marginTop: 10,
  color: 'red', // Customize as needed
  textAlign: 'center',
},
// submitButton: {
//   backgroundColor: '#007BFF',
//   padding: 10,
//   borderRadius: 5,
//   marginTop: 10,
// },
// submitButtonText: {
//   color: '#fff',
//   textAlign: 'center',
// },
noteContainer: {
  marginTop: 20,
  padding: 10,
  backgroundColor: '#f9f9f9', // Optional background color
  borderRadius: 10,
  flexDirection: 'column', // Stack items vertically
  justifyContent: 'center', // Center items vertically in the container
  alignItems: 'center', // Center items horizontally in the container
},

noteContent: {
  flexDirection: 'row', // Align icon and text horizontally
  alignItems: 'center', // Center icon and text vertically
  marginBottom: 10, // Add space below the note content
},

noteText: {
  marginLeft: 10, // Add some space between the icon and text
  fontSize: 16,
  color: '#333',
}, closeButton: {
        position: 'absolute',
        top: 100,
        right: 10, // Position the close button at the top-right corner
    },

submitButton: {
  paddingVertical: 10, // Vertical padding for button
  paddingHorizontal: 20, // Horizontal padding for button
  backgroundColor: '#007BFF', // Button background color
  borderRadius: 12, // Button border radius
  justifyContent: 'center', // Center text in button
  alignItems: 'center', // Center text in button
  width: '50%', // Full width for button
  alignSelf: 'center', // Center the button in the container
},
moreButton:{
  position: 'absolute',
  top: 100,
  left: 10,
  
  borderRadius: 15,
  width: '20%'

},
moreText:{
color: 'gray', // Text color for the button
  fontSize: 16, // Font size for the button text
  fontWeight: 'bold',
  alignItems:'center',
  justifyContent:'center'
},
selectedButton: {
  backgroundColor: 'red', // Change color to red when selected
},
submitButtonText: {
  color: '#fff', // Text color for the button
  fontSize: 16, // Font size for the button text
  fontWeight: 'bold', // Bold text for emphasis
},

icon: {
    width: 24,
    height: 24,
},
  cardsSection: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginRight: 15,
    width: 250,
    alignItems: 'center',
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardJobTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  gallerySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  galleryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  galleryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  galleryImage: {
    flex: 1,
    resizeMode: 'cover',
    marginRight: 5,
    borderRadius: 8,
  },
  scrollIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  serviceImageLarge: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
  },
  reportButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
  },
  logo: {
    width: '50%',
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: '68%',
  },
  subtitle: {
    fontSize: 12,
    color: 'gray'
  },
  Surakshatitle:{ 
 fontSize: 16,
  color:'red',

  },
  Surakshasubtitle:{
    fontSize: 12,
    color:'red',

  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
    margin: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  servicesSection: {
    padding: 16,
  },
  servicesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  serviceItemReverse: {
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    textAlign: 'left'
  },
  serviceImageLarge: {
    width: '44%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  gallerySection: {
    padding: 16,
  },
  galleryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  galleryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  galleryImage: {
    width: '48%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  reportButton: {
    margin: 10,
    paddingVertical: 4,
    backgroundColor: '#F1F8FDFF',
    borderRadius: 5,
    width: '50%'
  },
  reportButtonText: {
    color: '#379AE6FF',
    textAlign: 'center',
  },
  mapFullscreen: {
    position: 'absolute', bottom: 10, right: 10
  },




  // popup
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  genderIcon: {
    width: 40,
    height: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  photoButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  photoButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  photos: {
    width: '100%',
    height: 100, // Adjust the height as needed
    borderRadius: 40,
    marginVertical: 10,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderColor: '#ccc',
    borderWidth: 1,
},
  closesButton: {
    marginTop: 100,
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
  },
  closesButtonText: {
    color: 'white',
    fontWeight: 'bold',
   
  },
});

export default styles;