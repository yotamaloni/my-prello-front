export function TaskHeader({ bgCover, imgCover }) {

    return (
        <section className='task-header' style={{ backgroundColor: bgCover }} >
            {imgCover && <img src={imgCover} alt="Not found" />}
        </section>
    )
}