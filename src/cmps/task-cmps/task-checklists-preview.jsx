import React from 'react'
import { useState } from "react";

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ItemsList } from './items-list.jsx'
import { ItemsProgressBar } from './items-progress-bar.jsx'
import { AddItemToChecklist } from './add-item-to-checklist.jsx'


export function TaskChecklistsPreview(props) {

    const [isInputItemOpen, setIsInputItemOpen] = useState(false)
    function onToggleAddItem() {
        setIsInputItemOpen(!isInputItemOpen)
    }

    const { checklist, onRemoveChecklist, onAddItemToChecklist, onToggleItemMark } = props

    return (
        <section className='task-checklists-preview'>
            <div className='header'>
                <div className='checklist-title'>{checklist.title}
                    <CheckBoxOutlinedIcon className='checklist-icon' />
                </div>
                <div className='remove-checklist-btn' onClick={(ev) => { onRemoveChecklist(checklist.id) }}>
                    Delete
                </div>
            </div>


            {checklist.items.length > 0 &&
                <div className='items-container'>
                    <ItemsProgressBar checklist={checklist} />
                    < ItemsList
                        {...props}
                    />
                </div>

            }
            {isInputItemOpen ?
                <AddItemToChecklist {...props} onToggleAddItem={onToggleAddItem} />
                :
                <div className='open-add-item-btn' onClick={onToggleAddItem}>
                    Add an item
                </div>
            }

        </section>
    )
}

