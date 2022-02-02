import React from 'react'

import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { TimeSince } from './time-since.jsx'
import { MemberIcon } from '../cmps/member-icon.jsx'

import { getDateString } from './task-info.jsx'


export class TaskPreviewInfo extends React.Component {
    state = {
    }

    render() {
        const { dueDate, comments, description, members } = this.props
        let dueDateClass = ''
        let date = ''

        if (dueDate) {
            const dateArray = getDateString(dueDate.time).split(' ')
            date = dateArray[0] + ' ' + dateArray[1]
        }
        if (!dueDate?.completed && dueDate?.time < Date.now()) {
            dueDateClass = 'not-completed'
        } else if (dueDate?.completed) {
            dueDateClass = 'completed'
        }

        return (
            <section className='task-preview-info'>
                <div className='left-section'>
                    {dueDate ?
                        <React.Fragment >
                            <div className={`due-date-container ${dueDateClass}`}>
                                <AccessTimeOutlinedIcon className={`info-icon due-date`} />
                                <span>{date}</span>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment ></React.Fragment>

                    }

                    {description ?
                        <React.Fragment >
                            <div className='description'>
                                <SubjectOutlinedIcon className='info-icon description' />
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment ></React.Fragment>

                    }
                    {comments.length ?
                        <React.Fragment >
                            <div className='comments'>
                                <ForumOutlinedIcon className='info-icon comments' /><span>{comments.length}</span>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment ></React.Fragment>
                    }
                </div>

                <div className='right-section'>
                    {members?.length ?
                        <React.Fragment >
                            <ul className='members clean-list'>
                                {members.map(member => {
                                    return <li key={member._id}> <MemberIcon member={member} size={28} /></li>
                                })}
                            </ul>
                        </React.Fragment>
                        :
                        <React.Fragment ></React.Fragment>
                    }
                </div>
            </section >
        )
    }
}








// <div className='notes flex default-gap'>
//     <SubjectOutlinedIcon />
//     <div className='comments'>
//         <MapsUgcOutlinedIcon />
//         <div>{comments.length}</div>
//     </div>
// </div>