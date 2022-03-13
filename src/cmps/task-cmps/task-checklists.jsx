import React from 'react'
import { connect } from 'react-redux'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { updateBoard } from '../../store/board.action.js'
import { TaskChecklistsPreview } from './task-checklists-preview.jsx';


function _TaskChecklists(props) {

    function onRemoveChecklist(checklistId) {
        const { task, board } = props
        const checklistIdx = task.checklists.findIndex((currChecklist => currChecklist.id === checklistId))
        task.checklists.splice(checklistIdx, 1)
        props.updateBoard({ ...board })
    }

    function onAddItemToChecklist(checklist, item) {
        // checklist.id=
    }
    function onToggleItemMark(checklist, itemId) {
        // checklist.id=
    }
    function onRemoveItemFromChecklist(checklist, itemId) {
        // checklist.id=
    }

    const { task } = props
    const { checklists } = task
    return (
        <section className='task-checklists'>
            <ul className="checklists clean-list">
                {checklists?.map((checklist) => {
                    return <li className='checklist' key={checklist.id}>
                        <TaskChecklistsPreview checklist={checklist}
                            onRemoveChecklist={onRemoveChecklist}
                            onAddItemToChecklist={onAddItemToChecklist}
                            onToggleItemMark={onToggleItemMark}
                            onRemoveItemFromChecklist={onRemoveItemFromChecklist}
                        />
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

export const TaskChecklists = connect(mapStateToProps, mapDispatchToProps)(_TaskChecklists)
