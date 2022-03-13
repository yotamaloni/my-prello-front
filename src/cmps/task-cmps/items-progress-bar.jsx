export function ItemsProgressBar(props) {
    const PROGRESS_COLORS = {
        doneColor: '#61bd4f',
        notDoneColor: '#5ba4cf'
    }
    const { checklist } = props
    const totalNumOfItems = checklist.items.length
    let numOfCheckedItems = checklist.items.reduce((acc, item) => {
        return item.isMarked ? acc + 1 : acc
    }, 0)
    const percentage = Math.floor((numOfCheckedItems / totalNumOfItems) * 100)
    const backgroundColor = percentage === 100 ? PROGRESS_COLORS.doneColor : PROGRESS_COLORS.notDoneColor
    return (
        <section className='items-progress-bar'>
            <div className="progress-bar">
                <div className='completed' style={{ width: percentage + '%', backgroundColor: backgroundColor }}>
                </div>
            </div>
            <p className="progress-bar-percents ">
                {percentage}%
            </p>
        </section>
    )
}

