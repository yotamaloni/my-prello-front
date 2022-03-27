import { utilService } from "../../services/util.service"

export function AttachmentPreview(props) {
    const { attachment } = props
    const timeCreated = utilService.getTimeSince(attachment.createdAt)

    const backGroundImg = attachment.file.type === 'img' ? attachment.file.url : ''
    return <a target="_blank" href={attachment.file.url} className="attachment-preview flex clean-link">
        <div className="box-container" style={{ backgroundImage: `url(${backGroundImg})` }}>
            {!backGroundImg && attachment.file.type}
        </div>
        <div className="attachment-desc">
            <h4 className="attachment-title">{attachment.file.name}↗ </h4>
            <div className="attachment-info">
                <span>Added {timeCreated}</span>
                <span onClick={(ev) => {
                    ev.preventDefault()
                    props.onRemoveAttachment(attachment.id)
                }
                } className="remove">{attachment.file.type === 'link' ? 'Remove' : 'Delete'}</span>
            </div>
        </div>
    </a >
}