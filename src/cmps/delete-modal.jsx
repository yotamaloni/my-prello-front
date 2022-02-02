import React from 'react'
import DoneIcon from '@mui/icons-material/Done';

import { Link } from 'react-router-dom'
import { removeTask } from '../store/board.action.js'

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { connect } from 'react-redux'


import { updateBoard } from '../store/board.action.js'




class _DeleteModal extends React.Component {

    state = {
    }

    removeTask = () => {
        const { task, groupId, board } = this.props
        const group = board.groups.find(currGroup => currGroup.id === groupId)
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks.splice(taskIdx, 1)
        this.props.updateBoard({ ...board })
    }


    render() {

        const { task, boardId } = this.props
        return (
            <div className='task-modal delete'>
                {/* <h3 className='delete-title'>Delete card?</h3> */}
                <div className='header-container'>
                    <div className='hidden'>
                        <ClearOutlinedIcon />
                    </div>
                    <div className='title'>
                        Delete card?
                    </div>
                    <div className='cancel'>
                        <ClearOutlinedIcon onClick={(ev) => {
                            ev.stopPropagation();
                            this.props.closeModal()
                        }} />
                    </div>

                </div>
                {/* <p>All actions will be removed from the activity feed
                    and you won't be able to re-open the card.
                    There is no undo.</p> */}
                <Link onClick={this.removeTask} className='clean-link delete-btn' to={`/board/${boardId}`}>
                    Delete
                </Link>

            </div >
        )
    }
}

function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board

    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const DeleteModal = connect(mapStateToProps, mapDispatchToProps)(_DeleteModal)