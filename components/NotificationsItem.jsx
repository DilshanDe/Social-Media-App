import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/comman'
import { TouchableOpacity } from 'react-native'
import Avatar from './Avatar'

const NotificationsItem = ({
  item,
  router
}) => {
  const handleClick=()=>{
    // open post details
  }
  console.log('item',item);
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      {/*<Avatar/>*/}
    </TouchableOpacity>
  )
}

export default NotificationsItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: theme.colors.darkLight,
    padding: 15,
    // paddingVertical: 12,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous'
},
nameTitle: {
    flex: 1,
    gap: 2,
},
text: {
    fontSize: hp(1.6),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
}

})