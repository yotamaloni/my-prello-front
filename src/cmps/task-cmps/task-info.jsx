
import React from 'react'

import { connect } from 'react-redux'
import { updateBoard } from '../../store/board.action.js'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import TocOutlinedIcon from '@mui/icons-material/TocOutlined';

import { utilService } from '../../services/util.service'

import { TimeSince } from './time-since.jsx'
import { MemberIcon } from '../member-icon.jsx'

class _TaskInfo extends React.Component {

    state = {
        isDateCheckbox: '',
        task: {},
        description: '',
        activity: '',
        isDescriptionOpen: null,
        isActivityOpen: null
    }
    GUEST = {
        "_id": utilService.makeId(),
        "username": "Guest",
        "password": "123",
        "fullname": "Guest",
        "color": "#00c2e0",
        "isAdmin": false,
    }

    async componentDidMount() {
        this.setTaskInfo()
    }

    setTaskInfo = async () => {
        const { board, task } = this.props
        this.setState({ board })
        this.setState({ task })
        const description = task.description
        this.setState({ description })
        const isDateCheckbox = this.props.task.dueDate?.completed
        this.setState({ isDateCheckbox })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.task !== this.props.task) {
            this.setTaskInfo()
        }
    }

    onToggleDateCheckbox = () => {
        const isDateCheckbox = !(this.state.isDateCheckbox)
        this.setState({ isDateCheckbox })
        const { task, board } = this.props
        task.dueDate.completed = isDateCheckbox
        this.props.updateBoard({ ...board })
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    submitDescription = (ev) => {
        const { task, board } = this.props
        task.description = this.state.description
        this.props.updateBoard({ ...board })
        this.setState({ isDescriptionOpen: false })
    }

    submitActivity = (ev) => {
        ev.stopPropagation()
        const { task, board } = this.props
        const { user } = this.props
        const byMember = user?.username ? user : this.GUEST
        const activity = {
            byMember,
            createdAt: Date.now(),
            txt: this.state.activity,
            id: utilService.makeId(3),
            taskId: task.id,
        }
        board.activities.push(activity)
        this.props.updateBoard({ ...board })
        this.setState({ isActivityOpen: false, activity: '' })
    }

    onOpenModalField = (field) => {
        this.setState({ [field]: true })
    }

    onCloseModalField = (field) => {
        this.setState({ [field]: false })
    }


    render() {
        const { task, board } = this.props
        let { description, activity } = this.state

        if (!board || !task) return <div>Loading...</div>

        const activities = board.activities.filter((activity) => activity.taskId === task.id)

        if (description === null && this.state.task.description) description = this.state.task.description
        else if (description === null) description = ''

        const { isDateCheckbox, isDescriptionOpen, isActivityOpen } = this.state
        let isOverDue = false
        if (task.dueDate) {
            isOverDue = !isDateCheckbox && task.dueDate.time < Date.now()
        }

        const labels = task.labels
        let taskLabelsIds = []
        let labelsToDisplay = []
        if (labels?.length) {
            taskLabelsIds = labels.map((currLabel => currLabel.id))
            labelsToDisplay = board.labels.filter((currLabel => taskLabelsIds.includes(currLabel.id)))
        }

        const { dueDate } = task
        const date = dueDate?.time ? utilService.getDateString(dueDate.time) : ''

        const taskMembers = task.members || []

        return (
            <div className='info'>
                {/******Members**************************************************************************************/}

                {taskMembers?.length ?
                    <React.Fragment>
                        <div className='info-child'>
                            <h3 className='labels-title'>Members</h3>
                            <ul className='members-display clean-list'>
                                {taskMembers.map(member => {
                                    return <li key={member._id}> <MemberIcon key={member._id} member={member} size={32} /></li>
                                })
                                }
                            </ul>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment></React.Fragment>
                }


                {/******Labels**************************************************************************************/}

                <div className='labels sec-container info-child'>
                    <h3 className='config-title'>Labels</h3>
                    <ul className="labels-list clean-list">
                        {labelsToDisplay && labelsToDisplay.map((label, index) => {
                            return <li style={{ backgroundColor: label.color, fontWeight: 700, fontSize: 14 + 'px' }}
                                className="label the-label" key={index}
                            >{label.txt ? `${label.txt}` : ''}
                            </li>
                        })}
                        <li className="label add-label">
                            <AddOutlinedIcon onClick={() => this.props.openModal('label')} />
                        </li>
                    </ul>
                </div>

                {/******Due Date**************************************************************************************/}

                {
                    date &&
                    <React.Fragment>
                        <div className='info-child'>
                            <h3 className='labels-title'>Due date</h3>
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
                        </div>
                    </React.Fragment>
                }

                {/******Description**************************************************************************************/}


                <div className='description sec-container info-child'>
                    <SegmentOutlinedIcon className='activity-icon info-icon' />
                    <div>
                        <div className='info-title'>Description</div>


                        {isDescriptionOpen ?
                            (<form className="add-desc-form">
                                <textarea
                                    placeholder='Add more detailed description...'
                                    onChange={this.onHandleChange}
                                    onBlur={this.submitDescription}
                                    autoComplete='off'
                                    name='description'
                                    value={description} />
                                <div className='config'>
                                    <button onClick={this.submitDescription} className='add-btn' type="submit" >Save</button>
                                    <button onClick={() => {
                                        this.onCloseModalField('isDescriptionOpen')
                                    }} className='add-btn' type="submit" >X</button>
                                </div>
                            </form>)
                            :
                            <div onClick={() => {
                                this.onOpenModalField('isDescriptionOpen')
                            }
                            }>{description ? description : 'Add more detailed description...'}</div>

                        }
                    </div>
                </div>

                {/******Add Activity**************************************************************************************/}

                <div className='activity sec-container info-child'>
                    <TocOutlinedIcon className='activity-icon info-icon' />
                    <div className='activity-comment-container'>
                        <div className='info-title'>Activity</div>
                        <input className='add-comment'
                            placeholder='Write a comment...'
                            type='text'
                            onChange={this.onHandleChange}
                            onFocus={() => {
                                this.onOpenModalField('isActivityOpen')
                            }}

                            autoComplete='off'
                            name='activity'
                            value={activity} />
                        {isActivityOpen &&
                            <div className='config-activity'>
                                <button onClick={(ev) => {
                                    this.submitActivity(ev)
                                }} className='add-btn'>Save</button>
                            </div>
                        }
                    </div>
                </div>

                {/******Activities List**************************************************************************************/}

                <div className='activities-list-container info-child'>
                    <ul className="activities-list clean-list">
                        {activities.map((activity) => {
                            return <li className='comments' key={activity.id}>
                                <div className='user-name'>{activity.byMember.username}  <TimeSince activity={activity} /> </div>
                                <div className='txt'>{activity.txt}</div>
                                <div className='activity-icon activity' >
                                    <MemberIcon key={activity.byMember._id}
                                        member={activity.byMember}
                                        size={28} />
                                </div>
                            </li>
                        })}
                    </ul>
                </div>

            </div >
        )
    }
}

function mapStateToProps({ boardModule, userModule }) {

    return {
        board: boardModule.board,
        user: userModule.user,
    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const TaskInfo = connect(mapStateToProps, mapDispatchToProps)(_TaskInfo)

