import React from "react";
import { connect } from 'react-redux'
import { updateBoard } from '../store/board.action.js'

import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
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
                // backgroundColor: lightBlue.A200,
                // color: "white",
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

class _StaticDatePicker extends React.Component {

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
        const { task } = this.props
        if (task.dueDate) {
            task.dueDate.time = timeInMill
            task.dueDate.completed = false
        }
        else {
            task.dueDate = { time: timeInMill, completed: false }
        }
        const { groupId, board } = this.props

        const group = board.groups.find(currGroup => currGroup.id === groupId)
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks[taskIdx] = task
        this.props.updateBoard({ ...board })

        this.props.setTaskDetails(task)
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
        // boards: userModule.boards

        board: boardModule.board /*TEMPORARY */

    }
}

const mapDispatchToProps = {
    updateBoard
};


export const StaticDatePicker = connect(mapStateToProps, mapDispatchToProps)(_StaticDatePicker)