import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export function ItemsList(props) {
    const { onToggleItemMark, checklist, onRemoveItemFromChecklist } = props
    const { items } = checklist

    return (
        <section className='items-list'>
            {items.map(item => {
                const decorationClass = item.isMarked ? 'line-Through' : ''
                return <li key={item.id}>
                    <input className="item-list-checkbox"
                        type="checkbox"
                        id="myCheck"
                        checked={item.isMarked}
                        onChange={() => onToggleItemMark(item)}
                    />
                    <p className="item-title" style={{ textDecoration: decorationClass }}>
                        {item.title}
                    </p>
                    <div className='delete-icon' onClick={() => onRemoveItemFromChecklist(item.id, checklist)}>
                        <DeleteOutlinedIcon />
                    </div>
                </li>
            })}
        </section >
    )
}

