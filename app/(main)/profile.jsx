import { View, Text ,StyleSheet, Alert, Pressable} from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/comman'
import { TouchableOpacity } from 'react-native'
import Icon from '../../assets/icons'
import { theme } from '../../constants/theme'
import { supabase } from '../../lib/supabase'
import Avatar from '../../components/Avatar'
import { fetchPosts } from '../../Services/postService'
import { FlatList } from 'react-native'
import Loading from '../../components/Loading'
import PostCard from '../../components/PostCard'


var limit=0;
const Profile = () => {
  const{user,setAuth}=useAuth();
  const router=useRouter();
  const[posts,setPosts]=useState([]);
  const[hasMore,setHasMore]=useState(true);

  const onLogut= async()=>{
    //setAuth(null);
    const{error}= await supabase.auth.signOut();
    if(error){
        Alert.alert('Sign out','Error signing out')
    }

}

 const getPosts= async()=>{
      //call api hear
      if(!hasMore) return null;
      limit=limit+10;
      console.log('feacthing posts',limit);
      let res= await fetchPosts(limit,user.id);
      if(res.success){
        if(posts.length==res.data.length)setHasMore(false);
        setPosts(res.data);
      }
     

    }

  const handleLogout=async()=>{
    //show confirm modedl
    Alert.alert('confirm','Are you sure you want to Log out?',[
      {
        text:"Cancel",
        onPress:()=>console.log('model cancelld'),
        style:'cancel'
      },
      {
        text:'Log out',
        onPress:()=> onLogut(),
        style:'destructive'
      }
    ])
  }
  return (
    <ScreenWrapper bg='white'>
            <FlatList
                  data={posts}
                  ListHeaderComponent={<UserHeader user={user} router={router} handleLogout={handleLogout}/>}
                  ListHeaderComponentStyle={{marginBottom:30}}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listStyle}
                  keyExtractor={item=>item.id.toString()}
                  renderItem={({item})=><PostCard
                      item={item}
                      currentUser={user}
                      router={router}
                      />
                }
                onEndReached={()=>{
                  getPosts();
                  console.log('got to the end:');
                }}
                onEndReachedThreshold={0}
                ListFooterComponent={hasMore?(
                  <View style={{marginVertical:posts.length==0? 200:30}}>
                    <Loading/>
                    </View>
                ):(
                  <View style={{marginVertical:30}}>
                    <Text style={styles.noPosts}>No More Posts.</Text>
                    </View>
                )}
              />

      


    </ScreenWrapper>
      
  )
}
const UserHeader=({user,router,handleLogout})=>{
  return(
    <View style={{flex:1,backgroundColor:'white',paddingHorizontal:wp(4)}}>
      <View>
        <Header title='profile' mb={30}/>
        <TouchableOpacity style={styles.logoutButton}onPress={handleLogout}>
          <Icon name='logout'color={theme.colors.rose}/>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{gap:15}}>
          <View style={styles.avatrContainer}>
              <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl*1.4}
              />

              <Pressable style={styles.editIcon} onPress={()=>router.push('editProfile')}>
                <Icon name='edit'strokeWidth={2.5} size={20}/>
              </Pressable>

          </View>
          {/*user name and address*/}
          <View style={{alignItems:'center',gap:4}}>
            <Text style={styles.userName}>
              {user && user.name}
            </Text>
            <Text style={styles.infoText}>
              {user && user.address}
            </Text>

          </View>
          {/*email,phone and bio*/}
          <View style={{gap:10}}>
            <View style={styles.info}>
              <Icon name='mail'size={20} color={theme.colors.textLight}/>
              <Text style={styles.infoText}>{user && user.email}</Text>

            </View>
            {
              user && user.phoneNumber && (
                      <View style={styles.info}>
                    <Icon name='call'size={20} color={theme.colors.textLight}/>
                    <Text style={styles.infoText}>{user && user.phoneNumber}</Text>
                     </View>

              )
            }
            {
              user && user.bio &&(
                <Text style={styles.infoText}>
                  {user.bio}
                </Text>
              )
            }
            
          </View>
          
        </View>

      </View>

    </View>
  )
}

export default Profile
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous', 
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
  logoutButton:{
    position: 'absolute',
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: '#fee2c2',
  },
  avatrContainer:{
    height:hp(12),
    width:hp(12),
    alignSelf:'center',
  },
  editIcon:{
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName:{
    fontSize:hp(3),
    fontWeight:500,
    color:theme.colors.textDark,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: theme.colors.textLight,
  }

  

})