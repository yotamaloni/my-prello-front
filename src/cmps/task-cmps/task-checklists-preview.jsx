import React from 'react'
import { useState } from "react";

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ItemsList } from './items-list.jsx'
import { AddItemToChecklist } from './add-item-to-checklist.jsx'


export function TaskChecklistsPreview(props) {

    const [isInputItemOpen, setIsInputItemOpen] = useState(false)
    function onToggleAddItem() {
        setIsInputItemOpen(!isInputItemOpen)
    }

    const { checklist, onRemoveChecklist } = props

    return (
        <section className='task-checklists'>
            <div className='header'>
                <div className='checklist-title'>{checklist.title}
                    <CheckBoxOutlinedIcon className='checklist-icon' />
                </div>
                <div className='remove-checklist-btn' onClick={() => { onRemoveChecklist(checklist.id) }}>
                    Delete
                </div>
            </div>

            {checklist.items.length &&
                < ItemsList items={checklist.items} checklist={checklist} />
            }
            {isInputItemOpen ?
                <AddItemToChecklist {...props} onToggleAddItem={onToggleAddItem} />
                :
                <div className='add-item-btn' onClick={onToggleAddItem}>
                    Add an item
                </div>
            }

        </section>
    )
}

