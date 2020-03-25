import React from 'react';
import { View } from 'react-native';

export default Column = ({ data, renderItem, columnIndex, itemStyle }) => {

  const keyExtractor = (item, index) => `COL_${columnIndex};CEL_${index}-ITEM_${item.id}`

  return (
    <View style={{ flex: 1 }}>
      {
        data.map((item, index) => (
          <View
            key={keyExtractor(item, index)}
            style={{
              height: item.height,
              ...itemStyle
            }}
          >
            {renderItem(item.item, index)}
          </View>))
      }

    </View>
  )
}