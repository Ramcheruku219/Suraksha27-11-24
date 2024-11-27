import {
    DrawerItemList,
    createDrawerNavigator,
  } from "@react-navigation/drawer";
  import { 
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
  } from "react-native";
  import {
      SimpleLineIcons,
      MaterialIcons,
      MaterialCommunityIcons,
      AntDesign,
      Ionicons,
      Entypo,
      Octicons
    } from "@expo/vector-icons";
  import BottomTab from "../BottomTab";
  // import Profile from "../BottomTab/Profile";
  import Dashborad from "../BottomTab/Dashborad";

//   import Logout from "../../Pages/Logout";
   import myLogo from "../../assets/surakshaa-removebg-preview.png"
  
  const Drawer= createDrawerNavigator()
  
  const DrwerNavigation=()=>{
      
      return(
  
          <Drawer.Navigator
          //  screenOptions={{
          // drawerStyle: {
          //   backgroundColor: "#f7ffff",
          //   width: '60%',
          // },
          // headerStyle: {
          //   backgroundColor: "#0D47a4",
          // },
          // headerTintColor: "#fff",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          // },
          // drawerLabelStyle: {
          //   color: "#111",
          // },
          //  }}
          drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 210,
                  width: "100%",                
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{
                   justifyContent:'center',
                   alignItems:'center',
                    backgroundColor:'white',
                   borderWidth:2.5,
                   borderColor:'lightgray',
                   borderRadius:90,
                   height:140,
                   width:140,
                   marginLeft:-15,
                   marginTop:40

                }}>
                <Image
                  source={myLogo}
                  style={{
                    height: 90,
                    width: 100
                  }}
                />
                
                </View>
                <Text
                   style={{
                    fontSize:22,
                    marginVertical: 6,
                    fontWeight: "bold",
                    // color: "#156235"
                    // color:"skyblue"
                    // color:"#ccce"
                    marginTop:-1
                  }}
  
                > 
           Suraksha
                </Text>
               
             
                
              </View>
  
              <DrawerItemList {...props} />
              <View
                style={{
                  height: 90,
                  width: "100%",
                  justifyContent: "center",
                  borderTopColor: "#f4f4f4",
                  borderTopWidth: 1,
                }}
              >
               
              </View>
            </SafeAreaView>
          );
          
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f7ffff",
            width: 280,
          },
          headerStyle: {
            backgroundColor: "#0D47A1",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            alignItems:'center'
          },
          drawerLabelStyle: {
            color: "#111",
          },
        }}
           >
  
              <Drawer.Screen
                  name="Crime Report"
                  component={BottomTab}
                  options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:17,marginLeft:50}}>Crime Report Information</Text>
              )
             },
            drawerLabel: "Crime Report",
            title: "Crime Report",
            drawerIcon: () => (
            //   <Entypo name="v-card"  size={24} color="black" />
            <Octicons name="report" size={24} color="black" />
        ),
          }}
              />
              
              <Drawer.Screen
                  name="Dashboard"
                  component={Dashborad}
                  options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:17,marginLeft:50}}>Dashboard Information</Text>
              )
             },
            drawerLabel: "Dashboard",
            title: "Dashboard",
            drawerIcon: () => (
            //   <Entypo name="v-card"  size={24} color="black" />
            <MaterialCommunityIcons name="view-dashboard-edit" size={24} color="black" />
            ),
          }}
              />
                {/* <Drawer.Screen
                  name="Profile"
                  component={Profile}
                  options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',fontSize:17,marginLeft:40}}>Profile Details Information</Text>
              )
             },
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: () => (
           
              <Ionicons name="person-circle-outline" size={24} color="black" />
            ),
          }}
              />
                */}
  
       
          </Drawer.Navigator>
      )
  }
  export default DrwerNavigation;