

import React from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'
import AddIcon from '@mui/icons-material/Add';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import { TaskPreview } from './task-preview.jsx'
import { AddTask } from './add-task.jsx'
import { ListActionsMenu } from './list-actions-menu.jsx'



export class BoardGroup extends React.Component {

    state = {
        isAddTaskOpen: '',
        isListActionsOpen: '',
        tasks: null,
        groupTitle: ''
    }

    componentDidMount() {
        const { title, tasks } = this.props.group
        this.setState({ tasks })
        this.setState({ groupTitle: title })
    }

    onToggleAddTask = () => {
        const isAddTaskOpen = this.state.isAddTaskOpen ? '' : 'open'
        this.setState({ isAddTaskOpen })

    }

    onToggleListActions = () => {
        const isListActionsOpen = this.state.isListActionsOpen ? '' : 'open'
        this.setState({ isListActionsOpen })
    }

    onHandleChange = (ev) => {
        ev.preventDefault()
        const { target } = ev
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    onSubmitTitle = (ev) => {
        ev.preventDefault()
        const { group, board, updateBoard } = this.props
        const groupToUpdate = { ...group, title: this.state.groupTitle }
        const groupsToUpdate = board.groups.map((currGroup) => currGroup.id === groupToUpdate.id ? groupToUpdate : currGroup)
        const boardToUpdate = { ...board, groups: groupsToUpdate }
        updateBoard({ ...boardToUpdate })
    }

    render() {
        const { group, boardId, removeGroup, removeAllTasks, copyList, board, updateBoard } = this.props
        const { tasks } = group
        const { isAddTaskOpen, isListActionsOpen, groupTitle } = this.state
        if (!tasks) return <div>Loading...</div>
        return (
            <section className='board-group'>
                <div className='list-header'>
                    <div className='group-title-container'>
                        <input
                            className='title-input'
                            type="text" name="groupTitle"
                            value={groupTitle}
                            onBlur={this.onSubmitTitle}
                            onChange={this.onHandleChange} autoComplete='false' />
                    </div>

                    <div><button onClick={this.onToggleListActions} className='no-background'><MoreHorizOutlinedIcon sx={{ color: '#172b4d' }}></MoreHorizOutlinedIcon></button></div>
                </div>
                {isListActionsOpen && (
                    <React.Fragment>
                        <ListActionsMenu
                            updateGroupInState={this.props.updateGroupInState}
                            updateBoard={updateBoard}
                            board={board}
                            group={group}
                            boardId={boardId}
                            onToggleListActions={this.onToggleListActions}
                            removeGroup={removeGroup}
                            removeAllTasks={removeAllTasks}
                            copyList={copyList}
                        />
                    </React.Fragment>
                )}
                <div>
                    <Droppable droppableId={group.id} type="task">
                        {(provided, snapshot) => (
                            <ul className='task-list clean-list' {...provided.droppableProps} ref={provided.innerRef} >

                                {tasks.map((task, index) => {
                                    return (
                                        <Draggable key={task.id} draggableId={task.id} index={index} >
                                            {(provided) => (

                                                < li className='task-container' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                                    <TaskPreview board={board} onToggleAddTask={this.onToggleAddTask} group={group} key={task.id} task={task} groupId={group.id} boardId={boardId} removeTask={this.props.removeTask} />
                                                </li>
                                            )}

                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </ul>
                        )}

                    </Droppable>

                    {
                        !isAddTaskOpen ?

                            <React.Fragment>
                                <div className='card-composer'>
                                    <button className='no-background card-composer' onClick={this.onToggleAddTask}>
                                        <span>
                                            <AddIcon fontSize="small"></AddIcon>
                                        </span>
                                        <span>
                                            Add a card
                                        </span>
                                    </button>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <AddTask updateBoard={updateBoard}
                                    board={board} onToggleAddTask={this.onToggleAddTask} group={group} boardId={boardId} />
                            </React.Fragment>
                    }
                </div >
            </section >
        )
    }
}

