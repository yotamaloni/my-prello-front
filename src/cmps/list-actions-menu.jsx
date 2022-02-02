import { utilService } from '../services/util.service.js'


import CloseIcon from '@mui/icons-material/Close';


export function ListActionsMenu({ onToggleListActions, group, board, updateBoard, updateGroupInState }) {

    function onRemoveGroup() {
        const groups = board.groups.filter(currGroup => currGroup.id !== group.id)
        board.groups = groups
        updateGroupInState([...board.groups])
        updateBoard({ ...board })
        onToggleListActions()
    }

    function onRemoveAllCards() {
        const idx = board.groups.findIndex((currGroup => currGroup.id === group.id))
        board.groups[idx].tasks = []
        updateGroupInState([...board.groups])
        updateBoard({ ...board })
        onToggleListActions()
    }

    function onCopyList() {
        const idx = board.groups.findIndex((currGroup => currGroup.id === group.id))
        const newGroup = { ...board.groups[idx] }
        newGroup.id = utilService.makeId()
        board.groups.splice(idx, 0, newGroup)
        updateGroupInState([...board.groups])
        updateBoard({ ...board })
        onToggleListActions()
    }


    return (
        <div className="actions-container">
            <div className='actions-header'>
                <div className='actions-title'>List actions</div>
                <div className='actions-title'>
                    <button className='close-actions-btn' onClick={onToggleListActions}>
                        <CloseIcon fontSize="small" sx={{ color: '#172b4d' }}></CloseIcon>
                    </button>
                </div>
            </div>
            <div className="actions">
                <div>
                    <button onClick={onCopyList} className="no-background">Copy list...</button>
                </div>
                <div>
                    <button onClick={onRemoveAllCards} className="no-background">Archive all cards in this list...</button>
                </div>
                <div>
                    <button onClick={onRemoveGroup} className="no-background">Archive this list...</button>
                </div>
            </div>
        </div>

    );
}