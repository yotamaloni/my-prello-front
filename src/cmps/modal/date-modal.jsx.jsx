import React from "react";

import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import { DatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import { ModalHeader } from './modal-header.jsx'
import { materialTheme } from './material-theme-date.jsx'

class _DateModal extends React.Component {

    state = {
        dueDate: new Date(),
    }

    handleChange = (ev) => {
        const dueDate = ev
        this.setState((prevState) => ({ ...prevState, dueDate }))
    }

    onSubmit = () => {
        const dateObj = this.state.dueDate
        const timeInMill = dateObj.getTime()
        const { board, task } = this.props
        if (task.dueDate) {
            task.dueDate.time = timeInMill
            task.dueDate.completed = false
        }
        else {
            task.dueDate = { time: timeInMill, completed: false }
        }
        this.props.updateBoard({ ...board }, { ...task })
        this.props.closeModal()
    }

    render() {
        const { dueDate } = this.state
        const { modal, closeModal } = this.props

        return (
            <section className="modal date-modal" >
                <ModalHeader modal={modal} closeModal={closeModal} />
                <div className="date-body-container">
                    <ThemeProvider theme={materialTheme}>
                        <DatePicker
                            autoOk
                            orientation="landscape"
                            variant="static"
                            openTo="date"
                            format="dd/MM/yyyy"
                            value={dueDate}
                            onChange={this.handleChange}
                            disableToolbar
                        />
                    </ThemeProvider>
                </div>
                <button onClick={this.onSubmit} className='add-btn'>Save</button>
            </section>
        )
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


export const DateModal = connect(mapStateToProps, mapDispatchToProps)(_DateModal)