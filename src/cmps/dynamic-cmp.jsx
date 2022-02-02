import { TaskMembers } from './task-members.jsx';
import { TaskLabels } from './task-labels.jsx';
import { TaskChecklist } from './task-checklist.jsx';
import { TaskDates } from './task-dates.jsx';
import { TaskAttachment } from './task-attachment.jsx';
import { TaskCover } from './task-cover.jsx';

export function DynamicCmp(props) {
  switch (props.note.type) {
    case 'task-members':
      return <TaskMembers {...props} />;
    case 'task-labels':
      return <TaskLabels {...props} />;
    case 'task-checklist':
      return <TaskChecklist {...props} />;
    case 'task-dates':
      return <TaskDates {...props} />;
    case 'task-attachment':
      return <TaskAttachment {...props} />;
    case 'task-cover':
      return <TaskCover {...props} />;

    default:
      return <React.Fragment>NOT FOUNT 😐 </React.Fragment>;
  }
}
