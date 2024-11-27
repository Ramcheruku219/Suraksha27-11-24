// const API_BASE_URL = 'http://182.18.181.115:8980'; 
// const API_BASE_URL = 'http://192.168.1.227:3000';
const API_BASE_URL ='http://192.168.0.101:5000'; 
 
 
export const endApi = {                       
     
  getDepartmentUsers: (username) => `${API_BASE_URL}/getDepartmentUser/${username}`, 
  getCitizens: `${API_BASE_URL}/citizens`,
  getUserDetails: (username) => `${API_BASE_URL}/getUserDetails/${username}`,    
  guestInsert: `${API_BASE_URL}/guestInsert`,  
  insertCitizen: `${API_BASE_URL}/citizens`, 
  getRegisteredSubComplaints: (complaint) => `${API_BASE_URL}/getRegisteredSubComplaints/${complaint}`,  
  getScreenDetails: (id) => `${API_BASE_URL}/getScreenDetails/${id}`,   
  addDepartment: `${API_BASE_URL}/api/departmentsadd`,  
  reverseGeocode: (latitude, longitude) => 
    // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    // `http:192.168.1.227:5000/api/reverse-geocode?lat=${latitude}&lon=${longitude}`,
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  getRegisteredComplains: (citizenId) => `${API_BASE_URL}/getRegisteredComplains/${citizenId}`,
  insertScreenDetails: `${API_BASE_URL}/InsertScreenDetails`, // Added endpoint
  fetchDepartments: `${API_BASE_URL}/api/departments`, // Added endpoint 
  insertSuraksha: `${API_BASE_URL}/insertCrimeReport`
  //getResolvedCrimes:`${API_BASE_URL}/getResolvedCrimes`
  
 


};                                                    








   
















