
// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator, TextInput } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import moment from 'moment';

// const Dashboard = () => {  
//   const [complaints, setComplaints] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedTab, setSelectedTab] = useState('active');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchComplaints(); 
//   }, []);
 
//   const fetchComplaints = async () => {  
//     try { 
//       const response = await fetch('http://192.168.0.100:3000/getCrimeReports'); 
//       const data = await response.json();
//       console.log('API Response:', data);  
 
//       if (Array.isArray(data)) { 
//         data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
//         setComplaints(data);
//       } else { 
//         console.error('Expected an array, but received:', data);
//         setComplaints([]);
//       } 
//       setLoading(false); 
//     } catch (error) { 
//       console.error('Error fetching complaints:', error); 
//       setComplaints([]); 
//       setLoading(false); 
//     } 
//   }; 
//   const handleModalToggle = (complaint) => { 
//     setSelectedComplaint(complaint); 
//     setModalVisible(!modalVisible); 
//   };

//   const handleSearchChange = (text) => {
//     setSearchQuery(text);
//   };

//   const filteredComplaints = complaints.filter(complaint => {
//     const matchesTab = selectedTab === 'active' ? complaint.status !== 'Resolved' : complaint.status === 'Resolved';
//     const complaintDate = moment(complaint.created_date).format('DD-MM-YYYY'); // Update format to DD-MM-YYYY
//     const matchesSearch = complaintDate.includes(searchQuery);
//     return matchesTab && matchesSearch;
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabsContainer}>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'active' && styles.activeTab]}
//           onPress={() => setSelectedTab('active')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'active' && styles.activeTabText]}>Active Complaints</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'resolved' && styles.activeTab]}
//           onPress={() => setSelectedTab('resolved')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'resolved' && styles.activeTabText]}>Resolved Complaints</Text>
//         </TouchableOpacity>
//       </View>

//       <Animatable.View animation="fadeIn" duration={500} style={styles.searchContainer}>
//         <View style={styles.searchInputContainer}>
//           <Ionicons name="search" size={20} color="#00796b" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search by date (DD-MM-YYYY)" // Update placeholder format
//             value={searchQuery}
//             onChangeText={handleSearchChange} 
//           /> 
//         </View> 
//       </Animatable.View>  
 
//       <ScrollView style={styles.complaintsListContainer}>   
//         {loading ? ( 
//           <ActivityIndicator size="large" color="#0000ff"/>   
//         ) : filteredComplaints.length === 0 ? (   
//           <View style={styles.noComplaintsContainer}> 
//             <Text style={styles.noComplaintsText}>No Resolved complaints</Text> 
//           </View>  
//         ) : ( 
//           filteredComplaints.map((complaint, index) => ( 
//             <View key={index} style={styles.card}> 
//               <TouchableOpacity 
//                 style={styles.optionsButton} 
//                 onPress={() => handleModalToggle(complaint)}   
//               >
//                 <Text style={styles.optionsText}>more.</Text>
//               </TouchableOpacity>
//               <Text style={styles.cardTitle}>Crime Report Raised</Text>
//               <Text style={styles.cardText}>Name: {complaint.registered_by_name}</Text>
//               <Text style={styles.cardText}>Gender: {complaint.suspect_gender}</Text>
//               <Text style={styles.cardText}>Phone Number: {complaint.registered_user_phone}</Text>
//               <Text style={styles.cardText}>Address: {complaint.registered_user_address}</Text>
//               <Text style={styles.cardText}>Date: {moment(complaint.created_date).format('DD-MM-YYYY')}</Text> 
//               <Text style={styles.cardText}>Report Id: {complaint.report_id}</Text>
//             </View>
//           ))
//         )}
//       </ScrollView>

//       {selectedComplaint && ( 
//         <Modal
//           animationType="slide" 
//           transparent={true}  
//           visible={modalVisible}  
//           onRequestClose={() => handleModalToggle(null)}  
//         > 
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}> 
//               <Text style={styles.modalTitle}>Additional Information</Text>
//               <Text style={styles.modalText}>Crime Location: {selectedComplaint.crime_location || 'No location provided'}</Text>
//               {/* <Text style={styles.modalText}>Report Token: {selectedComplaint.report_token}</Text> */}
//               <Text style={styles.modalText}>Created Date: {moment(selectedComplaint.created_date).format('DD-MM-YYYY HH:mm:ss')}</Text>

//               <Text style={styles.modalText}>File/Photo:</Text>
//               {selectedComplaint.crime_file_url ? (
//                 <Image source={{ uri: selectedComplaint.crime_file_url }} style={styles.modalImage} />
//               ) : (
//                 <Text style={styles.modalText}>No photo available</Text>
//               )}
//               <TouchableOpacity style={styles.closeButton} onPress={() => handleModalToggle(null)}>
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       )}
//     </View>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     justifyContent: 'center',
//   },
//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 22,
//     marginHorizontal: 4,
//     backgroundColor: '#e0e0e0',
//   },
//   activeTab: {
//     backgroundColor: '#00796b',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   activeTabText: {
//     color: '#fff',
//   },
//   searchContainer: {
//     marginBottom: 20,
//   },
//   searchInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#00796b',
//     borderRadius: 22,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//   },
//   complaintsListContainer: {
//     flex: 1,
//     maxHeight: '75%',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     position: 'relative',
//   },
//   optionsButton: {
//     position: 'absolute',
//     top: "95%",
//     right: 10,
//     padding: 5,
//   },
//   optionsText: {
//     fontSize: 16,
//     color: 'green',
//     fontWeight: 'bold',
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   cardText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   noComplaintsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: "85%",
//   },
//   noComplaintsText: {
//     fontSize: 18,
//     color: '#555',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '85%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 5,
//   },
//   modalImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#00796b',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default Dashboard;  
 


import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaints, setSelectedComplaints] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [crimeType, setCrimeType] = useState('default');



  useEffect(() => { 
    fetchComplaints(); 
  }, []); 
 
  useEffect(() => { 
    if (selectedTab === 'resolved') {  
      fetchResolvedComplaints(crimeType); 
    } 
  }, [selectedTab, crimeType]); 

  const fetchComplaints = async () =>{ 
    try {
      const response = await fetch('http://192.168.0.101:5000/getCrimeReports');
      const data = await response.json();
      console.log('Active Complaints API Response:', data);

      if (Array.isArray(data)) {
        data.sort((a, b) => b.report_id - a.report_id);
        setComplaints(data);
      } else {
        console.error('Expected an array, but received:', data);
        setComplaints([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setComplaints([]);
      setLoading(false); 
    }
  }; 
 
  const fetchResolvedComplaints = async (crimeType) => { 
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.0.101:5000/getResolvedCrimes/${crimeType}`);
      const data = await response.json();
      console.log('Resolved Complaints API Response:', data);

      if (Array.isArray(data)) { 
        data.sort((a, b) => b.id - a.id); 
        setResolvedComplaints(data);
      } else {
        console.error('Expected an array, but received:', data);
        setResolvedComplaints([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resolved complaints:', error);   
      setResolvedComplaints([]);
      setLoading(false);
    }
  };

  const handleModalToggles = (complaint) => {
    setSelectedComplaints(complaint);
    setModalVisible(!modalVisible);
  };

  const handleModalToggle = (complaint) => {
    setSelectedComplaint(complaint);
    setModalVisible(!modalVisible);
  };


  const handleSearchChange = (text) => { 
    setSearchQuery(text);
    setSearchLoading(true);
    setTimeout(() => { 
      setSearchLoading(false);
    }, 500); 
  };


  // const filteredComplaints = (selectedTab === 'active' ? complaints : resolvedComplaints).filter((complaint) => {
  //   const formattedDate = moment(complaint.date || complaint.created_date).format('DD-MM-YYYY');
  //   const isDateMatch = formattedDate.includes(searchQuery);
  //   const isReportIdMatch = (complaint.report_id || '').toString().includes(searchQuery);

  //   return isDateMatch || isReportIdMatch;
  // });

  const filteredComplaints = (selectedTab === 'active' ? complaints : resolvedComplaints).filter((complaint) => {
    const formattedDate = moment(
      selectedTab === 'active' ? complaint.created_date : complaint.resolved_details?.resolved_date
    ).format('DD-MM-YYYY');
    const isDateMatch = formattedDate.includes(searchQuery);
    const isReportIdMatch = (selectedTab === 'active' ? complaint.report_id : complaint.id || '').toString().includes(searchQuery);
  
    return isDateMatch || isReportIdMatch;
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'active' && styles.activeTab]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[styles.tabText, selectedTab === 'active' && styles.activeTabText]}>Active Complaints</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'resolved' && styles.activeTab]}
          onPress={() => setSelectedTab('resolved')}
        >
          <Text style={[styles.tabText, selectedTab === 'resolved' && styles.activeTabText]}>Resolved Complaints</Text>
        </TouchableOpacity>
      </View>

      <Animatable.View animation="fadeIn" duration={500} style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#00796b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Date or Report ID"
            value={searchQuery}

            onChangeText={handleSearchChange}
          />
        </View>
      </Animatable.View>

      <ScrollView style={styles.complaintsListContainer}>
  {loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : filteredComplaints.length === 0 ? (
    <View style={styles.noComplaintsContainer}>
      <Text style={styles.noComplaintsText}>
        {selectedTab === 'active' ? 'No active complaints found' : 'No resolved complaints found'}
      </Text>
    </View>
  ) : (
    filteredComplaints.map((complaint, index) => (
      <View key={index} style={styles.card}>
        {selectedTab === 'active' ? (
          <>
            <Text style={styles.cardTitle}>Crime Report Registered</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Name:</Text> {complaint.registered_by_name}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Gender:</Text> {complaint.suspect_gender}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Phone Number:</Text> {complaint.registered_user_phone}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Address:</Text> {complaint.registered_user_address}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Date:</Text> {moment(complaint.created_date).format('DD-MM-YYYY')}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Report Id:</Text> {complaint.report_id}</Text>
            {/* Only show the "More.." button for active complaints */}
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => handleModalToggles(complaint)}
            >
              <Text style={styles.optionsText}>More..</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.cardTitle}>Resolved Complaint</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Title:</Text> {complaint.title}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Remarks:</Text> {complaint.fields?.Remarks || 'N/A'}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Resolved Date:</Text> {moment(complaint.resolved_details?.resolved_date).format('DD-MM-YYYY')}</Text>
            <Text style={styles.cardText}><Text style={styles.boldText}>Report Id:</Text> {complaint.id}</Text>
            {/* Only show the "Solved Details" button for resolved complaints */}
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => handleModalToggle(complaint)}
            >
              <Text style={styles.optionsText}>Solved Details</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    ))
  )}
</ScrollView>

    
      {selectedComplaints && (  
        <Modal  
          animationType="slide" 
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => handleModalToggle(null)} 
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Additional Information</Text>
              <Text style={styles.modalText}><Text style={styles.boldText}>Crime Location:</Text> {selectedComplaints.crime_location || 'No location provided'}</Text>
              <Text style={styles.modalText}><Text style={styles.boldText}>Created Date:</Text> {moment(selectedComplaints.created_date).format('DD-MM-YYYY HH:mm:ss')}</Text>
              
              <Text style={styles.modalText}><Text style={styles.boldText}>Crime Photo:</Text></Text>
            
              {selectedComplaints.crime_file_url ? ( 
                <Image 
                  source={{ uri: selectedComplaints.crime_file_url }}  
                  style={styles.modalImage} 
                  onError={() => console.log("Error loading image")} 
                />   
              ) : ( 
                <Text style={styles.modalText}>No photo available</Text> 
              )}

              <TouchableOpacity style={styles.closeButton} onPress={() => handleModalToggles(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
 

      {selectedComplaint && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => handleModalToggle(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Resolved Complaint Details</Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Inspector Name:</Text> {selectedComplaint.resolved_details?.inspector_name || 'N/A'}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>FIR Number:</Text> {selectedComplaint.resolved_details?.fir_number || 'N/A'}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Resolved Date:</Text>{' '}
                  {selectedComplaint.resolved_details?.resolved_date
                  ? moment(selectedComplaint.resolved_details.resolved_date).format('DD-MM-YYYY')
                  : 'N/A'}
              </Text>
              <Text style={styles.cardText}><Text style={styles.boldText}>Location:</Text> {selectedComplaint.fields?.Location || 'N/A'}</Text>
              {selectedComplaint.resolved_details?.clearance_file_url && (
                <Image
                  source={{ uri: selectedComplaint.resolved_details.clearance_file_url }}
                  style={styles.modalImage}
                />
              )}
              <TouchableOpacity style={styles.closeButton} onPress={() => handleModalToggle(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};



  
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 22,
    marginHorizontal: 4,
    backgroundColor: '#e0e0e0',
  },
  activeTab: { 
    backgroundColor: '#00796b', 
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  searchContainer:{ 
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: { 
    flex: 1,
    fontSize: 16,
  },
  complaintsListContainer: { 
    flex: 1,
    maxHeight: '75%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
  },
  optionsButton: {
    position: 'absolute',
    top: "100%",
    right: 15,
  },
  optionsText: {
    color: '#00796b',
    fontWeight:'bold',
    fontSize: 19,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  boldText: {
    fontWeight:'500',
  },
  noComplaintsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop:"80%",
  },
  noComplaintsText: {
    fontSize: 18,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,

  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#00796b',
    fontSize: 16,
  },
});

export default Dashboard; 


