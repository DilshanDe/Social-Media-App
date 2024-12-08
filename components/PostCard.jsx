import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp,wp } from '../helpers/comman'
import { theme } from '../constants/theme'

const PostCard = ({
    item,
    currentUser,
    router,
    hasShadow=true,
}) => {
    const shadowStyles={
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.06,
        shadowRadius:6,
        elevation:1
    }
  return (
    <View style={[styles.container,hasShadow && shadowStyles]}>
      <Text>PostCard</Text>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 15,
        borderRadius: theme.radius.xx * 1.1,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: theme.colors.gray,
        shadowColor: '#000',
      },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      },
      username: {
        fontSize: hp(1.7),
        color: theme.colors.textDark,
        fontWeight: theme.fonts.medium,
      },
      postTime: {
        fontSize: hp(1.4),
        color: theme.colors.textLight,
        fontWeight: theme.fonts.medium,
      },
      content: {
        gap: 10,
        // marginBottom: 10, (commented out)
      },
    postMedia: {
        height: hp(40),
        width: '100%',
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
      },
      postBody: {
        marginLeft: 5,
      },
      footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
      },
      footerButton: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      },
      actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
      },
      count: {
        color: theme.colors.text,
        fontSize: hp(1.8),
      },
})