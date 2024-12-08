import { Alert, Image, Pressable, StyleSheet, Text, View ,ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/comman'
import { theme } from '../../constants/theme'
import { ScrollView } from 'react-native'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../context/AuthContext'
import RichTextEditor from '../../components/RichTextEditor'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '../../assets/icons'
import Button from '../../components/Button'
import * as ImagePicker from 'expo-image-picker';
import { getSupabaseFileUrl } from '../../Services/imageService'
import{Video}from'expo-av'
import { createOrUpdatePost } from '../../Services/postService'


const NewPost = () => {
  const{user}= useAuth();
  const bodyRef=useRef("");
  const editorRef=useRef(null);
  const router=useRouter();
  const[loading,setLoading]=useState(false);
  const [file, setFile] = useState(file);


const onPick=async(isImage)=>{

  let mediaConfig={
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.7,

  }
  if(!isImage){
    mediaConfig={
      mediaTypes:['videos'],
      allowsEditing:true
    }
  }
  let result=await ImagePicker.launchImageLibraryAsync(mediaConfig);

  if(!result.canceled){
    setFile(result.assets[0]);
  }

}

const isLocalFile=file=>{
  if(!file)return null;
  if(typeof file=='object')return true;

  return false;
}
const getFileType=file=>{
  if(!file) return null;
  if(isLocalFile(file)){
    return file.type;
  }
  // check remote or video add remote file
  if(file.include('postImages')){
    return 'image';
  }
  return 'video';
}

const getFileUri=file=>{
  if(!file) return null ;
  if(isLocalFile(file)){
    return file.uri;
  }

  return getSupabaseFileUrl(file)?.uri;
}

const onSubmit= async()=>{

  if(!bodyRef.current && !file){
    Alert.alert('Post',"Please Choose an Image add or post body");
    return;
  }

  let data={
    file,
    body:bodyRef.current,
    userId:user?.id,

  }
  //create post
  setLoading(true);
  let res=await createOrUpdatePost(data);
  setLoading(false);
  if(res.success){
    setFile(null);
    bodyRef.current='';
    editorRef.current?.setContentHtml('');
    router.back();

  }else{
    Alert.alert('Post',res.msg);
  }
 

}


  return (
    <ScreenWrapper bg='white'>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      {!loading && (
      <View style={styles.container}>
          <Header title="Create Post"/>
          <ScrollView contentContainerStyle={{gap:20}}>
            {/*avatar*/}
            <View style={styles.header}>
              <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
              />
              <View style={{gap:2}}>
                <Text style={styles.username}>
                  {
                    user && user.name
                  }
                </Text>
                <Text style={styles.publicText}>
                  Public
                </Text>
              </View>
            </View>
            <View style={styles.textEditor}>
              <RichTextEditor editorRef={editorRef} onChange={body=>bodyRef.current=body} />
            </View>
            {
              file && (
                <View style={styles.file}>
                  {
                    getFileType(file)=='video'?(
                      <Video
                      style={{flex:1}}
                      source={{
                        uri:getFileUri(file)
                      }}
                      useNativeControls
                      resizeMode='cover'
                      isLooping
                      />

                    ):(
                      <Image source={{uri:getFileUri(file)}} resizeMode='cover' style={{flex:1}}/>

                    )
                  }
                  <Pressable style={styles.closeIcon} onPress={()=>setFile(null)}>
                    <Icon name='delete' size={25} color='white'/>
                  </Pressable>
                </View>
              )
            }

            <View style={styles.media}>
              <Text style={styles.addImageText}>
                Add to your post
              </Text>
              <View style={styles.mediaIcons}>
                <TouchableOpacity onPress={()=>onPick(true)}>
                  <Icon name='image'size={30}color={theme.colors.dark}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onPick(false)}>
                  <Icon name='video'size={31}color={theme.colors.dark}/>
                </TouchableOpacity>

              </View>

            </View>
          </ScrollView>

          <Button
            buttonStyle={{height:hp(6.2)}}
            title="Post"
            hasShadow={false}
            onPress={onSubmit}

          />

      </View>
       )}
    
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: '600',
    color: '#000',
  },
  publicText:{
    fontSize:hp(1.7),
    fontWeight:theme.fonts.medium,
    color:theme.colors.textLight,

  },
  textEditor:{

  },
  title: {
    color: theme.colors.text,
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    textAlign:'center',
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
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
  },
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  file: {
    height: hp(40),
    width: '100%',
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
    borderCurve: 'continuous',
  },
  video: {
    // Define styles for video here if needed
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius:50,
    padding:8,
    backgroundColor:'rgba(255,0,0,0.6)'
    // Uncomment shadow styles if needed:
    // shadowColor: theme.colors.textLight,
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.6,
    // shadowRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})