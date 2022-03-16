import React from 'react'
import { connect } from 'react-redux'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateBoard } from '../store/board.action.js'

import { BoardGroup } from './board-group.jsx'

class _BoardGroupList extends React.Component {

    state = {
        groups: null,
    }
    onDragEnd = (result) => {
        const { source, destination, type } = result
        if (!destination) return
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return
        const { board } = this.props
        let { groups } = board
        if (type === 'group') this.updateGroups(board, groups, source, destination)
        else this.updateTasks(board, groups, source, destination)
    };

    updateGroups = (board, groups, source, destination) => {
        const newGroups = [...groups]
        const [group] = newGroups.splice(source.index, 1)
        newGroups.splice(destination.index, 0, group)
        this.setState({ groups: newGroups })
        board.groups = newGroups
        this.props.updateBoard({ ...board })
    }

    updateTasks = (board, groups, source, destination) => {
        let newGroups = [...groups]
        const sourceGroup = newGroups.find((group) => group.id === source.droppableId)
        let destinationGroup = newGroups.find((group) => group.id === destination.droppableId)

        const taskOutGroup = sourceGroup.tasks.splice(source.index, 1)
        destinationGroup.tasks.splice(destination.index, 0, taskOutGroup[0])
        newGroups = newGroups.map((group) => {
            if (group.id === destinationGroup.id) return destinationGroup
            else if (group.id === sourceGroup.id) return sourceGroup
            else return group
        })
        board.groups = newGroups
        this.props.updateBoard({ ...board })
    }
    render() {
        const { board } = this.props
        const { groups } = board
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="group"
                >
                    {(provided) => (
                        <ul className='group-list clean-list' {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {groups.map((group, index) => {

                                return (
                                    <Draggable key={group.id} draggableId={group.id} index={index}>
                                        {(provided) => (
                                            <li className='group-container item-scrollable'
                                                {...provided.draggableProps} {...provided.dragHandleProps}
                                                ref={provided.innerRef}>
                                                <BoardGroup
                                                    board={board}
                                                    updateBoard={this.props.updateBoard}
                                                    group={group}
                                                />
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext >
        );
    }
}


function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board
    }

}

const mapDispatchToProps = {
    updateBoard
};

export const BoardGroupList = connect(mapStateToProps, mapDispatchToProps)(_BoardGroupList)


