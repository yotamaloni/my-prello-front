import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

import { CircularIndeterminate } from '../loader.jsx'


import { boardService } from '../../services/board.service.js';
import { dataService } from '../../services/data.service.js';
import { utilService } from '../../services/util.service.js';

import { updateBoard, setModal } from '../../store/board.action.js'
import { showMsg } from '../../store/user.action.js'

import { ModalHeader } from './modal-header.jsx'

class _AttachmentModal extends React.Component {
    state = {
        link: "",
        isLoading: null
    }
    inputRef = React.createRef();

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ link: value })

    }
    onSubmitAttachLink = async () => {
        let { link } = this.state
        if (!link) {
            this.inputRef.current.focus()
            return
        }
        if (link.slice(0, 5) !== 'https') link = 'https://' + link
        const file = {
            name: link,
            type: 'link',
            url: link
        }
        this.addAttachment(file)
    }

    setUploadedFile = async (ev) => {
        try {
            this.setState({ isLoading: true })
            const url = await boardService.uploadImg(ev)
            const type = url.slice(url.length - 3, url.length)
            const fileType = type !== 'pdf' && type !== 'zip' ? 'img' : 'file'
            const attachedFile = ev.target.files[0]
            const file = {
                name: attachedFile.name,
                type: fileType,
                url,
            }
            this.addAttachment(file)
            this.setState({ isLoading: false })
        } catch (err) {
            console.log(err);
            this.props.showMsg('Something went wrong, please try again later.', 'danger')
            this.setState({ isLoading: false })
        }
    }
    addAttachment = async (file) => {
        const { task, board, user } = this.props
        const byMember = user?.username ? user : dataService.guestUser
        const attachment = {
            byMember,
            createdAt: Date.now(),
            file,
            id: utilService.makeId(3),
        }
        if (task.attachments) task.attachments.push(attachment)
        else task.attachments = [attachment]
        this.props.updateBoard({ ...board })
        this.setState({ link: '' })
    }

    render() {
        const { closeModal } = this.props
        const { link, isLoading } = this.state
        return (
            <section className='modal attachment-modal'>
                <ModalHeader modal={{ type: 'Attach from...' }} closeModal={closeModal} />
                <div className="attachment-options" >
                    <label htmlFor="upload" onChange={(ev) => {
                        this.setUploadedFile(ev)
                    }} className='computer-container'>Computer ( Image-all types, PDF or ZIP )
                        <input id="upload" className="file-input" type="file" />
                    </label>

                </div>
                <div className="link-attachment">
                    <h4>Attach a link</h4>
                    <input ref={this.inputRef} type="text" name="link" value={link} onChange={this.handleChange} />
                </div>

                <div onClick={this.onSubmitAttachLink} className="attach-btn">
                    Attach
                </div>
                {isLoading &&
                    <div className='loader-page'><CircularIndeterminate /></div>
                }
            </section >
        )
    }
}

function mapStateToProps({ boardModule, userModule }) {

    return {
        board: boardModule.board,
        modal: boardModule.modal,
        user: userModule.user,
    }
}

const mapDispatchToProps = {
    updateBoard,
    setModal,
    showMsg
};


export const AttachmentModal = connect(mapStateToProps, mapDispatchToProps)(_AttachmentModal)



