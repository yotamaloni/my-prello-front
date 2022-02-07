import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import { ModalHeader } from './modal-header.jsx'

class _RemoveModal extends React.Component {

    state = {
    }

    removeTask = () => {
        const { task, board, group } = this.props
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks.splice(taskIdx, 1)
        this.props.updateBoard({ ...board })
    }

    render() {
        const { board, closeModal, modal } = this.props
        const { width } = modal

        return (
            <section className='modal remove-modal' style={{ width: width }}>
                <ModalHeader modal={{ type: `Delete card?` }} closeModal={closeModal} />
                <p className='remove-warning' onClick={this.removeTask} >
                    All actions will be removed from
                    the activity feed and you won't be
                    able to re-open the card. There is no undo.
                </p>

                <Link className='clean-link delete-btn' to={`/board/${board._id}`}>
                    <div onClick={this.removeCover} className='full-width-btn red'>
                        Remove Cover
                    </div>
                </Link>

            </section >
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


export const RemoveModal = connect(mapStateToProps, mapDispatchToProps)(_RemoveModal)