import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Column from './Column';

const resolveCell = (item, index, nColumns, heightVariations) => {
  const columnIndex = index % nColumns;
  const rowIndex = Math.floor((index - columnIndex) / nColumns);
  const variationIndex = (columnIndex + rowIndex) % heightVariations.length;
  const height = heightVariations[variationIndex]
  return {
    item,
    id: index,
    columnIndex,
    rowIndex,
    height
  }
}

const resolveData = (data, nColumns, heightVariations) => {
  return data.map((item, index) => resolveCell(item, index, nColumns, heightVariations))

}

const insertIntoColumn = (item, dataSet) => {
  let newDataSet = [...dataSet];
  const columnIndex = item.columnIndex;
  const column = dataSet[columnIndex];

  if (column) {
    let newColumn = [...column, item];
    newDataSet[columnIndex] = newColumn;
  } else {
    newDataSet = [...dataSet, [item]]
  }
  return newDataSet
}

const sortData = (data, nColumns, heightVariations) => {
  const resolvedData = resolveData(data, nColumns, heightVariations);
  const sortedData = resolvedData.reduce((dataset, item) => insertIntoColumn(item, dataset), []);
  return sortedData;
}

export default Masonry = ({ data, renderItem, heightVariations, columns = 2, itemStyle }) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sortedData = sortData(data, columns, heightVariations);
    setSortedData(sortedData)

  }, [data, columns, heightVariations]);

  return (
    <View style={styles.container}>
      {
        sortedData.map((data, columnIndex) => (
          <Column
            key={columnIndex}
            data={data}
            itemStyle={itemStyle}
            columnIndex={columnIndex}
            renderItem={renderItem}
          />
        ))
      }
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
})