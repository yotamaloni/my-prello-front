import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action.js'

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

class _DeleteModal extends React.Component {

    state = {
    }

    removeTask = () => {
        const { task, board, group } = this.props
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks.splice(taskIdx, 1)
        this.props.updateBoard({ ...board })
    }

    render() {

        const { board } = this.props
        return (
            <div className='task-modal delete'>
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

                <Link onClick={this.removeTask} className='clean-link delete-btn' to={`/board/${board._id}`}>
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