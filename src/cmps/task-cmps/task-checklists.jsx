import React from 'react'
import { connect } from 'react-redux'
import { utilService } from '../../services/util.service'

import { updateBoard } from '../../store/board.action.js'
import { TaskChecklistsPreview } from './task-checklists-preview.jsx';


function _TaskChecklists(props) {

    function onRemoveChecklist(checklistId) {
        const { task, board } = props
        const checklistIdx = task.checklists.findIndex((currChecklist => currChecklist.id === checklistId))
        task.checklists.splice(checklistIdx, 1)
        props.updateBoard({ ...board }, { ...task })
    }

    function onAddItemToChecklist(itemTitle, checklist) {
        const { board, updateBoard, task } = props
        const itemToAdd = {
            id: utilService.makeId(),
            title: itemTitle,
            isMarked: false
        }
        checklist.items.push(itemToAdd)
        updateBoard({ ...board }, { ...task })
    }

    function onRemoveItemFromChecklist(itemId, checklist) {
        const { board, updateBoard, task } = props
        const itemIdx = checklist.items.findIndex(item => item.id === itemId)
        checklist.items.splice(itemIdx, 1)
        updateBoard({ ...board }, { ...task })

    }
    function onToggleItemMark(item) {
        const { task } = props
        item.isMarked = !item.isMarked
        const { board, updateBoard } = props
        updateBoard({ ...board }, { ...task })
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
