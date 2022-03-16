import React from 'react'
import { NavLink} from 'react-router-dom'
import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action.js'

import { TaskPreviewInfo } from './task-preview-info.jsx'


class _TaskPreview extends React.Component {
    state = {
        isExpendedLabels: false
    }

    onToggleLabelsSize = () => {
        const { board } = this.props
        let isExpendedLabels = board.isExpendedLabels ? false : true
        board.isExpendedLabels = isExpendedLabels
        this.props.updateBoard({ ...board })
    }

    render() {
        const { task, group, board } = this.props
        const { title, labels, style, checklists } = task

        let taskLabelsIds = []
        let labelsToDisplay = []

        if (labels?.length) {
            taskLabelsIds = labels.map((currLabel => currLabel.id))
            labelsToDisplay = board.labels.filter((currLabel => taskLabelsIds.includes(currLabel.id)))
        }

        const { dueDate, description } = task
        const comments = this.props.board.activities?.filter((activity) => activity.taskId === task.id)
        const members = task.members || null
        const isExpendedLabels = this.props.board.isExpendedLabels
        const labelsSize = isExpendedLabels ? 'large' : 'small'

        return (
            <div>
                <NavLink className="clean-link" to={`/board/${board._id}/${group.id}/${task.id}`}>
                    <section className="task-preview">
                        {(style?.imgUrl) &&
                            <div className='img-container'>
                                <img src={style.imgUrl} alt="Not found" />
                            </div>
                        }
                        {(style?.backgroundColor) &&
                            <div className='background-color-container' style={{ backgroundColor: style.backgroundColor }}>

                            </div>
                        }
                        {labels?.length > 0 &&
                            <ul className='labels-container clean-list'>
                                {labelsToDisplay.map((label, index) => {
                                    const txt = label?.txt
                                    return <li
                                        style={{ backgroundColor: label.color }}
                                        onClick={(ev) => {
                                            ev.preventDefault()
                                            this.onToggleLabelsSize()
                                        }}
                                        className={`label ${labelsSize}`}
                                        key={index}>
                                        {(labelsSize === 'large'
                                            &&
                                            txt)
                                            ? txt : ''}
                                    </li>
                                })}
                            </ul>
                        }
                        <div className="title">{title}</div>
                        {(description || comments?.length || dueDate || members?.length || checklists?.length) &&
                            <TaskPreviewInfo description={description}
                                comments={comments}
                                dueDate={dueDate}
                                members={members}
                                checklists={checklists}
                            />
                        }
                    </section>
                </NavLink>

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
    updateBoard
};


export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(_TaskPreview)

