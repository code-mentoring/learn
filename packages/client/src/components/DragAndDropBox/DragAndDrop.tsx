import React, { useState } from 'react';
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import Drop from './Drop/Drop';
import { Answer, Column } from './data';

interface DragAndDropInterface {
  answersData: Answer[];
  columnsData: Column[];
}

const DragAndDrop: React.FC<DragAndDropInterface> = ({
  answersData,
  columnsData
}) => {
  const answers: Answer[] = answersData;
  const [columns, setColumns] = useState<Column[]>(columnsData);

  const findIdx = (id: string) => {
    const col = columns.filter(c => c.id === id);
    const idx = columns.indexOf(col[0]);
    return idx;
  };

  const move = (
    source: DraggableLocation,
    destination: DraggableLocation
    // draggableId: string
  ) => {
    const startIdx = findIdx(source.droppableId);
    const endIdx = findIdx(destination.droppableId);
    const startColumnClone = [...columns[startIdx].answersIds];
    const endColumnClone = source.droppableId === destination.droppableId
      ? startColumnClone
      : [...columns[endIdx].answersIds];

    const [movedElement] = startColumnClone.splice(source.index, 1);
    endColumnClone.splice(destination.index, 0, movedElement);

    const newColumnState = [...columns];
    newColumnState[startIdx].answersIds = startColumnClone;
    if (startIdx !== endIdx) newColumnState[endIdx].answersIds = endColumnClone;

    return newColumnState;

    // const [columnStart, startIdx] = findIdx(source.droppableId);
    // const [columnEnd, endIdx] = findIdx(destination.droppableId);

    // if (columnStart === columnEnd) {
    //   const newAnswersIds = Array.from(columnStart.answersIds);
    //   newAnswersIds.splice(source.index, 1);
    //   newAnswersIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...columnStart,
    //     answersIds: newAnswersIds
    //   };

    //   const newColumnState = {
    //     ...columns,
    //     newColumn
    //   };
    //   return newColumnState;
    // }

    // const startAnswersIds = Array.from(columnStart.answersIds);
    // startAnswersIds.splice(source.index, 1);
    // const newColumnStart = {
    //   ...columnStart,
    //   answersIds: startAnswersIds
    // };

    // const endAnswersIds = Array.from(columnEnd.answersIds);
    // endAnswersIds.splice(destination.index, 0, draggableId);
    // const newColumnEnd = {
    //   ...columnEnd,
    //   answersIds: endAnswersIds
    // };

    // const newColumnState = {
    //   ...columns,
    //   newColumnStart,
    //   newColumnEnd
    // };
    // return newColumnState;
  };

  const onDragStart = () => {
    // change the colors and opacity
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) return;

    const newColumnState = move(source, destination);
    setColumns(newColumnState);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {columns.map((col, idx) => {
        console.log(col);
        const column = columns[idx];
        const answersOptions = column.answersIds.map((ans: string) => {
          const answer = answers.filter(a => a.id === ans);
          const index = answers.indexOf(answer[0]);
          return answers[index];
        });

        return (
          <Drop key={column.id} column={column} answers={answersOptions} />
        );
      })}
    </DragDropContext>
  );
};

export default DragAndDrop;
