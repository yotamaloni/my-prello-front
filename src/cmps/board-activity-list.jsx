import React from 'react'
import { connect } from 'react-redux'
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';

import { TimeSince } from './task-cmps/time-since.jsx'
import { MemberIcon } from './member-icon.jsx'


function _BoardActivitiesList({ board }) {
    const activities = board.activities
    return (
        <section className='board-activity-list'>
            <h4 className="activity-header">
                Activity
                <TocOutlinedIcon className='activity-icon' />
            </h4>
            <ul className="clean-list menu-list">
                {activities.map((activity) => {
                    return <li className='activity-info' key={activity.id}>
                        <div className="member-icon-container" >
                            <MemberIcon key={activity.byMember._id}
                                member={activity.byMember}
                                size={32} />
                        </div>
                        <div className="txt-container">
                            <div className='user-info'>
                                <span className='username'>{activity.byMember.username}</span>
                                on
                                <span className="task-title">{activity.taskTitle}</span>
                                <span className="time-since"><TimeSince activity={activity} /></span>

                            </div>
                            <div className='activity-txt'>{activity.txt}</div>
                        </div>
                    </li>
                })}
            </ul>
        </section >
    )
}


function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board
    }
}

const mapDispatchToProps = {
};


export const BoardActivitiesList = connect(mapStateToProps, mapDispatchToProps)(_BoardActivitiesList)
