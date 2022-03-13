import { TaskMembers } from './task-members.jsx'
import { TaskDate } from './task-date.jsx'
import { TaskLabels } from './task-labels.jsx'
import { TaskDescription } from './task-description.jsx'
import { TaskAddActivity } from './task-activity-add.jsx'
import { TaskActivityList } from './task-activity-list.jsx'
import { TaskChecklists } from './task-checklists.jsx'

export function TaskInfo({ task, board }) {

    const { dueDate } = task
    const taskMembers = task.members || []

    return (
        <div className='info'>
            {taskMembers?.length !== 0 &&
                <TaskMembers taskMembers={taskMembers} />}

            <TaskLabels task={task} board={board} />
            {dueDate?.time &&
                <TaskDate task={task} dueDate={dueDate} />}

            <TaskDescription task={task} />
            <TaskChecklists task={task} />
            <TaskAddActivity task={task} />
            <TaskActivityList task={task} />
        </div >
    )
}


