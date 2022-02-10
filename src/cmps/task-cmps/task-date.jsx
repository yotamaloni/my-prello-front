
import React from 'react'

import { utilService } from '../../services/util.service'

import { connect } from 'react-redux'
import { updateBoard } from '../../store/board.action.js'

class _TaskDate extends React.Component {

    state = {
        isDateCheckbox: '',
    }

    componentDidMount() {
        this.setDateCheckBox()
    }

    setDateCheckBox = () => {
        const { task } = this.props
        const isDateCheckbox = task.dueDate?.completed
        this.setState({ isDateCheckbox })
    }

    onToggleDateCheckbox = () => {
        const isDateCheckbox = !(this.state.isDateCheckbox)
        this.setState({ isDateCheckbox })
        const { task, board } = this.props
        task.dueDate.completed = isDateCheckbox
        this.props.updateBoard({ ...board })
    }

    render() {
        const { task, dueDate } = this.props
        const { isDateCheckbox } = this.state
        let isOverDue = false
        if (task.dueDate) {
            isOverDue = !isDateCheckbox && task.dueDate.time < Date.now()
        }
        const date = dueDate?.time ? utilService.getDateString(dueDate.time) : ''


        return (
            <section className='task-date'>
                <h3>Due date</h3>
                <div className='date-display'>
                    <input onChange={this.onToggleDateCheckbox} type="checkbox" name="date" checked={isDateCheckbox} />
                    <span className='due-date-container' >{date}
                        {isDateCheckbox &&
                            <span className='completed-date'>completed</span>
                        }
                        {!isDateCheckbox && isOverDue &&
                            <span className='not-completed-date'>over due</span>
                        }
                    </span>
                </div>
            </section>
        )
    }

}

function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board,
    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const TaskDate = connect(mapStateToProps, mapDispatchToProps)(_TaskDate)

