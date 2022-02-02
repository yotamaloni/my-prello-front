
import React from 'react'

import { connect } from 'react-redux'
import { updateBoard } from '../store/board.action.js'


import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
// import { getDate } from 'date-fns';
import { boardService } from '../services/board.service.js'
import { TimeSince } from './time-since.jsx'
import { MemberIcon } from '../cmps/member-icon.jsx'
import { utilService } from '../services/util.service.js'





class _TaskInfo extends React.Component {

    state = {
        isDateCheckbox: '',
        task: {},
        description: '',
        activity: '',
        isDescriptionOpen: null,
        isActivityOpen: null
    }
    guest = {
        "_id": "guest123",
        "username": "Guest",
        "password": "123",
        "fullname": "Guest",
        "color": "#00c2e0",
        "initials": "G",
        "isAdmin": false,
    }

    async componentDidMount() {

        this.setTaskInfo()
    }

    setTaskInfo = async () => {

        const { boardId, groupId, taskId } = this.props
        const board = await boardService.getBoardById(this.props.boardId)
        this.setState({ board })

        const task = await boardService.getTaskById(boardId, groupId, taskId)
        this.setState({ task })

        const description = task.description
        this.setState({ description })

        const isDateCheckbox = this.props.task.dueDate?.completed
        this.setState({ isDateCheckbox })

    }


    componentDidUpdate(prevProps, prevState) {
        // console.log('prevProps.task !== this.props.task:', prevProps.task !== this.props.task);

        if (prevProps.task !== this.props.task) {
            this.setTaskInfo()
        }
    }


    onToggleDateCheckbox = () => {
        const isDateCheckbox = !(this.state.isDateCheckbox)
        this.setState({ isDateCheckbox })
        const { task, } = this.props
        task.dueDate.completed = isDateCheckbox
        this.updateTaskInBoard(task)
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    submitDescription = (ev) => {
        // ev.preventDefault()
        const { task } = this.props
        task.description = this.state.description
        this.updateTaskInBoard(task)
        this.props.setTaskDetails({ ...task })
        this.setState({ isDescriptionOpen: false })
    }
    submitActivity = (ev) => {
        ev.stopPropagation()
        const { task, board } = this.props
        const { user } = this.props
        const byMember = user?.username ? user : this.guest
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

    updateTaskInBoard = (task) => {
        const { board, groupId } = this.props
        const group = board.groups.find(currGroup => currGroup.id === groupId)
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks[taskIdx] = task
        this.props.updateBoard({ ...board })
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
        const classNameDueDate = ''

        const labels = task.labels
        let taskLabelsIds = []
        let labelsToDisplay = []
        if (labels?.length) {
            taskLabelsIds = labels.map((currLabel => currLabel.id))
            labelsToDisplay = board.labels.filter((currLabel => taskLabelsIds.includes(currLabel.id)))
        }
        const { checklists, dueDate } = task
        const date = dueDate?.time ? getDateString(dueDate.time) : ''

        const taskMembers = task.members || []


        return (
            <div className='info'>


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


                {/* <div className='check-list sec-container info-child'>
                    <CheckBoxOutlinedIcon />
                    <div className='check-list-input-container'>
                        <div className='info-title'>CheckList</div>
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
                </div> */}

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
                            // onBlur={() => {
                            //     this.onCloseModalField('isActivityOpen')
                            // }}
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









{/* {checklists &&
                    <React.Fragment>
                        <ul className="clean-list">
                            {checklists.map((checklist => {
                                return <li key={checklist.id} className='sec-container'>
                                    <CheckBoxOutlinedIcon className='' />
                                    <div>
                                        <div className='info-title'>{checklist.title}</div>
                                    </div>
                                </li>
                            }))}
                        </ul>
                    </React.Fragment>
                } */}











export function getDateString(dueDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let newDate = new Date(dueDate)
    let year = newDate.getFullYear()
    if (new Date(Date.now()).getFullYear() === year) year = ''
    const month = monthNames[newDate.getMonth()]
    const day = newDate.getDate()
    let hours = newDate.getHours()
    let min = newDate.getMinutes()
    if (min < 10) min = '0' + min
    let partOfTheDay
    if (hours > 12) {
        hours -= 12
        partOfTheDay = 'PM'
    } else {
        partOfTheDay = 'AM'
    }

    return `${month} ${day} ,${year} at ${hours}:${min} ${partOfTheDay} `
}