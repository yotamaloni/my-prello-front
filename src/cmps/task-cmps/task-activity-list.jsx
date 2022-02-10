import React from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { TimeSince } from './time-since.jsx'
import { MemberIcon } from '../member-icon.jsx'
import { TxtInput } from '../txt-input.jsx'


function _TaskActivityList({ task, board, updateBoard }) {

    function onRemoveActivity(activityId) {
        const activityIdx = board.activities.findIndex((currActivity => currActivity.id === activityId))
        board.activities.splice(activityIdx, 1)
        updateBoard({ ...board })
    }

    const activities = board.activities.filter((activity) => activity.taskId === task.id)

    return (
        <section className='activity-list'>
            <ul className="clean-list">
                {activities.map((activity) => {
                    return <li className='comments' key={activity.id}>
                        <div className='user-name'>{activity.byMember.username}  <TimeSince activity={activity} />
                            <div className='member-icon-container' >
                                <MemberIcon key={activity.byMember._id}
                                    member={activity.byMember}
                                    size={28} />
                            </div>

                        </div>
                        <div className='txt'>{activity.txt}</div>
                        {/* <TxtInput
                            styleClass='add-comment'
                            txt={activity.txt}
                            isImmutable={false}
                        /> */}

                        <div className='activity-actions flex default-gap'>
                            {/* <div onClick>Edit</div> */}
                            <div onClick={() => onRemoveActivity(activity.id)}>Delete</div>
                        </div>
                    </li>
                })}
            </ul>
        </section>
    )
}


function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board
    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const TaskActivityList = connect(mapStateToProps, mapDispatchToProps)(_TaskActivityList)
