import React from "react";
import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action.js'

import { DatePicker } from "@material-ui/pickers";
import lightBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';



const materialTheme = createTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: lightBlue.A200,
            },
        },

        MuiPickersCalendarHeader: {
            switchHeader: {
            },
        },

        MuiPickersDay: {
            day: {
                color: lightBlue.A700,
            },
            daySelected: {
                backgroundColor: grey["600"],
                borderRadius: 0
            },
            dayDisabled: {
                color: lightBlue["100"],
            },
            current: {
                color: lightBlue["900"],
            },
        },

        MuiPickersModal: {
            dialogAction: {
                color: lightBlue["400"],
            },
        },
    },
});

class _TaskDates extends React.Component {

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
        this.props.updateBoard({ ...board })
        this.props.closeModal()
    }

    render() {
        const { dueDate } = this.state

        return (
            <div className="flex column " >
                <div className='header-container'>
                    <div className='hidden'>
                        <ClearOutlinedIcon />
                    </div>
                    <div className='title'>
                        Dates
                    </div>
                    <div className='cancel'>
                        <ClearOutlinedIcon onClick={(ev) => {
                            ev.stopPropagation();
                            this.props.closeModal()
                        }} />
                    </div>

                </div>


                <ThemeProvider theme={materialTheme}>
                    <DatePicker
                        autoOk
                        // name="date"
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        format="dd/MM/yyyy"
                        value={dueDate}
                        onChange={this.handleChange}
                        disableToolbar
                    />

                </ThemeProvider>
                <button onClick={this.onSubmit} className='add-btn'>Save</button>
            </div>
        )
    }
}

function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board /*TEMPORARY */
    }
}

const mapDispatchToProps = {
    updateBoard
};


export const TaskDates = connect(mapStateToProps, mapDispatchToProps)(_TaskDates)