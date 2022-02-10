import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { MemberIcon } from '../member-icon.jsx'

export function TaskLabels({ task, board }) {
    const labels = task.labels
    let taskLabelsIds = []
    let labelsToDisplay = []
    if (labels?.length) {
        taskLabelsIds = labels.map((currLabel => currLabel.id))
        labelsToDisplay = board.labels.filter((currLabel => taskLabelsIds.includes(currLabel.id)))
    }
    return (
        <section className='task-labels'>
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
        </section >
    )
}
