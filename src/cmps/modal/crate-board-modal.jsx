import React from 'react'

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { ModalHeader } from './modal-header.jsx'

const IMG1_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053148/samples/landscapes/landscape-panorama.jpg'
const IMG2_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053146/samples/landscapes/nature-mountains.jpg'
const IMG3_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053143/samples/landscapes/beach-boat.jpg'
const IMG4_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053142/samples/landscapes/architecture-signs.jpg'
const IMG5_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053138/samples/landscapes/girl-urban-view.jpg'
const IMG6_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053145/samples/food/spices.jpg'
const IMG7_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053144/samples/ecommerce/accessories-bag.jpg'
const IMG8_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053136/samples/animals/reindeer.jpg'
const IMG9_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053147/samples/animals/kitten-playing.gif'
const IMG10_URL = 'https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053141/samples/animals/three-dogs.jpg'

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
        const { width } = modal
        const creatBtnColor = title ? 'blue' : 'blur-text'
        const colors = [
            '#7BC86C',
            '#F5DD29',
            '#FFAF3F',
            '#EF7564',
            '#CD8DE5',
            '#5BA4CF',
            '#29CCE5',
            '#6DECA9',
            '#FF8ED4',
            '#172B4D',
        ]

        const imgUrls = [
            IMG1_URL,
            IMG2_URL,
            IMG3_URL,
            IMG4_URL,
            IMG5_URL,
            IMG6_URL,
            IMG7_URL,
            IMG8_URL,
            IMG9_URL,
            IMG10_URL,
        ]

        return (
            <div className='modal create-board' style={{ width: width }}>

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
                        {colors.map((color, index) => {
                            return <li onClick={() => {
                                this.onSetCoverColor(color)
                            }} key={index} style={{ backgroundColor: color }}></li>
                        })}
                    </ul>
                </div>

                <div className='cover-img-container'>
                    <h4>Photos</h4>
                    <ul className='cover-img-list clean-list img-list'>
                        {imgUrls.map((url, index) => {
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






