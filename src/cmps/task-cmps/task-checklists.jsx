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
        props.updateBoard({ ...board })
    }

    function onAddItemToChecklist(itemTitle, checklist) {
        const { board, updateBoard } = props
        const itemToAdd = {
            id: utilService.makeId(),
            title: itemTitle,
            isMarked: false
        }
        checklist.items.push(itemToAdd)
        updateBoard({ ...board })
    }

    function onRemoveItemFromChecklist(itemId, checklist) {
        const { board, updateBoard } = props
        const itemIdx = checklist.items.findIndex(item => item.id === itemId)
        checklist.items.splice(itemIdx, 1)
        updateBoard({ ...board })

    }
    function onToggleItemMark(item) {
        item.isMarked = !item.isMarked
        const { board, updateBoard } = props
        updateBoard({ ...board })
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
