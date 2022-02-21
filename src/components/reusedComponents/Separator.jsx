import { View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'

const Separator = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <View
                style={{
                    borderBottomColor: COLORS.lightGray,
                    borderBottomWidth: 1,
                    marginTop: 10,
                    width: '90%',
                }}
            />
        </View>)
}

export default Separator
