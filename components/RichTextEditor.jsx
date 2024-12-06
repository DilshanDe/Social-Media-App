import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { actions, RichToolbar } from '@lomray/react-native-pell-rich-editor'
import { theme } from '../constants/theme'

const RichTextEditor = ({
    editorRef,
    onChange
}) => {
  return (
    <View style={{minHeight:285}}>
      <RichToolbar
            actions={[
                actions.setStrikethrough,
                actions.removeFormat,
                actions.setBold,
                actions.setItalic,
                actions.insertOrderedList,
                actions.blockquote,
                actions.alignLeft,
                actions.alignCenter,
                actions.alignRight,
                actions.code,
                actions.line,
                actions.heading1,
                actions.heading4
            ]}
            iconMap={{
                [actions.heading1]:({tintColor})=> <Text style={{color:tintColor}}>H1</Text>,
                [actions.heading4]:({tintColor})=> <Text style={{color:tintColor}}>H4</Text>
            }}
            style={styles.richbar}
            flatContainerStyle={styles.listStyle}
            selectedIconTint={theme.colors.primaryDark}
            editor={editorRef}
            disabled={false}
      />
    </View>
  )
}

export default RichTextEditor

const styles = StyleSheet.create({
    richbar:{
        borderTopRightRadius:theme.radius.xl,
        borderTopLeftRadius:theme.radius.xl,
        backgroundColor:theme.colors.gray
    }
})