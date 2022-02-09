import { TaskMembers } from './task-members.jsx'
import { TaskDate } from './task-date.jsx'
import { TaskLabels } from './task-labels.jsx'
import { TaskDescription } from './task-description.jsx'
import { TaskAddActivity } from './task-add-activity.jsx'
import { TimeSince } from './time-since.jsx'
import { MemberIcon } from '../member-icon.jsx'

export function TaskInfo({ task, board }) {

    const activities = board.activities.filter((activity) => activity.taskId === task.id)
    const { dueDate } = task
    const taskMembers = task.members || []

    return (
        <div className='info'>

            {taskMembers?.length !== 0 &&
                <TaskMembers taskMembers={taskMembers} />
            }

            <TaskLabels task={task} board={board} />

            {
                dueDate?.time &&
                <TaskDate task={task} dueDate={dueDate} />
            }
            <TaskDescription task={task} />

            {/******Add Activity**************************************************************************************/}


            <TaskAddActivity task={task} />

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


