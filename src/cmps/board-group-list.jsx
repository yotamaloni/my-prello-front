import React from 'react'
import { connect } from 'react-redux'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { isEmpty } from "lodash";
import { updateBoard } from '../store/board.action.js'

import { BoardGroup } from './board-group.jsx'

class _BoardGroupList extends React.Component {

    state = {
        groups: null,
    }

    componentDidMount() {
        this.setGroups()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            this.setGroups()
        }

    }

    setGroups = () => {
        const { board } = this.props
        const groups = [...board.groups]
        this.setState({ groups })
    }

    onDragEnd = (result) => {
        const { source, destination, type } = result
        if (!destination) return
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        if (type === 'group') this.updateGroups(source, destination)
        else this.updateTasks(source, destination)
    };

    updateGroups = (source, destination) => {
        const { board } = this.props
        const { groups } = this.state
        const newGroups = [...groups]
        const [group] = newGroups.splice(source.index, 1)
        newGroups.splice(destination.index, 0, group)
        this.setState({ groups: newGroups })
        board.groups = newGroups
        this.props.updateBoard({ ...board })
    }

    updateTasks = (source, destination) => {
        const { board } = this.props
        const { groups } = this.state
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

    updateGroupInState = (groups) => {
        this.setState({ groups })
    }

    render() {
        const { board } = this.props
        if (!board) return <div>Loading...</div>

        const groups = this.state.groups || board.groups

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
                                console.log("🟡 ~ group", group)

                                return (
                                    <Draggable key={group.id} draggableId={group.id} index={index}>
                                        {(provided) => (
                                            <li className='group-container item-scrollable'
                                                {...provided.draggableProps} {...provided.dragHandleProps}
                                                ref={provided.innerRef}>
                                                <BoardGroup
                                                    board={board}
                                                    updateGroupInState={this.updateGroupInState}
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


