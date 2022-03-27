import React from 'react'

import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { utilService } from '../services/util.service.js';

import { MemberIcon } from './member-icon.jsx'


export class TaskPreviewInfo extends React.Component {

    render() {
        const { dueDate, comments, description, members, checklists, attachments } = this.props
        let dueDateClass = ''
        let date = ''

        if (dueDate) {
            const dateArray = utilService.getDateString(dueDate.time).split(' ')
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
                    {dueDate &&
                        <div className={`due-date-container ${dueDateClass}`}>
                            <AccessTimeOutlinedIcon className={`info-icon due-date`} />
                            <span>{date}</span>
                        </div>
                    }

                    {description &&
                        <div className='description'>
                            <SubjectOutlinedIcon className='info-icon description' />
                        </div>


                    }
                    {comments.length > 0 &&
                        <div className='comments'>
                            <ForumOutlinedIcon className='info-icon comments' /><span>{comments.length}</span>
                        </div>


                    }
                    {attachments?.length > 0 &&
                        <div className='attachments'>
                            <AttachFileOutlinedIcon className='info-icon attachments' />
                        </div>
                    }
                    {checklists?.length > 0 &&
                        <div className='checklists'>
                            <CheckBoxOutlinedIcon className='info-icon checklists' />
                        </div>
                    }
                </div>

                <div className='right-section'>
                    {members?.length > 0 &&
                        <ul className='members clean-list'>
                            {members.map(member => {
                                return <li key={member._id}> <MemberIcon member={member} size={28} /></li>
                            })}
                        </ul>
                    }
                </div>
            </section >
        )
    }
}
