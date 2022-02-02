
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';

import { connect } from 'react-redux'


import { updateBoard } from '../store/board.action.js'

import { StaticDatePicker } from './task-dates.jsx'



class _DatePickerModal extends React.Component {

    state = {
    }

    render() {
        return (
            <div className='task-modal date-picker-modal'>

                <StaticDatePicker boardId={this.props.boardId} groupId={this.props.groupId} task={this.props.task}
                    closeModal={this.props.closeModal}
                    setTaskDetails={this.props.setTaskDetails}
                />
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


export const DatePickerModal = connect(mapStateToProps, mapDispatchToProps)(_DatePickerModal)
