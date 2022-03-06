import React from 'react'

import { dataService } from '../../services/data.service.js'

import { ModalHeader } from './modal-header.jsx'

export class CreateBoardModal extends React.Component {
    inputRef = React.createRef();

    state = {
        title: '',
        backgroundColor: '#29CCE5',
        imgUrl: null,
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    onHandleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    onSetCoverColor = (color) => {
        this.setState({ backgroundColor: color, imgUrl: null })
    }

    onSetCoverImg = (url) => {
        this.setState({ backgroundColor: null, imgUrl: url })
    }

    onSubmit = (ev) => {
        const { title, imgUrl, backgroundColor } = this.state
        const { closeModal } = this.props
        if (!title) {
            this.inputRef.current.focus();
            return
        }
        const board = {
            title,
            style: {
                backgroundColor,
                imgUrl,
            }
        }
        this.props.addBoard(board)
        closeModal()
    }

    uploadImgCover = async (ev) => {
        const imgUrl = await this.uploadImg(ev)
        this.onSetCoverImg(imgUrl)
    }

    uploadImg = (ev) => {
        const CLOUD_NAME = 'dnft2vfvz'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const formData = new FormData();
        formData.append('file', ev.target.files[0])
        formData.append('upload_preset', 'bhdlgcay');

        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => res.url)
            .catch(err => console.error(err))
    }

    render() {
        const { title, backgroundColor, imgUrl } = this.state
        const { modal, closeModal } = this.props
        const creatBtnColor = title ? 'blue' : 'blur-text'
        return (
            <div className='modal create-board'>

                <ModalHeader modal={modal} closeModal={closeModal} />

                <div className='chosen-background'
                    style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: backgroundColor }}>
                </div>

                <div className='input-title'>
                    <h4>Title</h4>
                    <input ref={this.inputRef}
                        type="text"
                        name="title"
                        value={title}
                        onChange={(ev) => { this.onHandleChange(ev) }}
                    />
                    <h4 className='required-title'>Board title is required</h4>

                </div>

                <div className='cover-colors-container'>
                    <h4 >Colors</h4>
                    <ul className='cover-color-list clean-list'>
                        {dataService.colors.map((color, index) => {
                            return <li onClick={() => {
                                this.onSetCoverColor(color)
                            }} key={index} style={{ backgroundColor: color }}></li>
                        })}
                    </ul>
                </div>

                <div className='cover-img-container'>
                    <h4>Photos</h4>
                    <ul className='cover-img-list clean-list img-list'>
                        {dataService.imgUrls.map((url, index) => {
                            return <li onClick={() => {
                                this.onSetCoverImg(url)
                            }} key={index} style={{ backgroundImage: `url(${url})` }}></li>
                        })}
                    </ul>
                </div>

                <div className='upload-img-container'>
                    <h4 >Attachment</h4>
                    <label htmlFor="upload" onChange={(ev) => {
                        this.uploadImgCover(ev)
                    }} className='full-width-btn gray'>Upload a cover image</label>
                    <input id="upload" className="file-input" type="file" onChange={(ev) => { this.uploadImgCover(ev) }} />
                </div>

                <div className={`full-width-btn ${creatBtnColor}`} onClick={(ev) => {
                    ev.stopPropagation();
                    closeModal()
                    this.onSubmit()
                }}>Create</div>
            </div>
        )
    }
}






