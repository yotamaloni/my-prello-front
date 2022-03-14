export function ItemHeaderCover({ bgCover, imgCover, boardCoverClass = '' }) {
    return (
        <section className={`item-header-cover ${boardCoverClass}`} style={{ backgroundColor: bgCover }} >
            {imgCover && <img src={imgCover} alt="Not found" />}
        </section>
    )
}