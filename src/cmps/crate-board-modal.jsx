import React from 'react'

import { dataService } from '../services/data.service.js'

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export class CreateBoardModal extends React.Component {
    state = {
        title: '',
        backgroundColor: '#29CCE5',
        imgUrl: null,
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

    onSubmit = () => {
        const { title, imgUrl, backgroundColor } = this.state
        if (!title) return
        const board = {
            title,
            style: {
                backgroundColor,
                imgUrl,
            }
        }
        this.props.addBoard(board)
        this.props.onCloseModal('close')

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
        return (
            <div className='board-cover'>
                {/* <h3 className='delete-title'>Delete card?</h3> */}
                <div className='header-container'>
                    <div className='hidden'>
                        <ClearOutlinedIcon />
                    </div>
                    <div className='title'>
                        Create board
                    </div>
                    <div className='cancel'>
                        <ClearOutlinedIcon onClick={(ev) => {
                            ev.stopPropagation();
                            this.props.onCloseModal()
                        }} />
                    </div>

                </div>


                <div className='chosen-background'
                    style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: backgroundColor }}>

                </div>

                <div className='cover-input-title'>
                    <h3 className='cover-title create-board-title' >Title</h3>
                    <input type="text" name="title" value={title} onChange={(ev) => { this.onHandleChange(ev) }} />
                    <h3 className='required-title'>Board title is required</h3>
                </div>


                <div className='cover-colors'>
                    <h3 className='cover-title create-board-title'>Colors</h3>
                    <ul className='cover-color-list clean-list'>
                        {dataService.colors.map((color, index) => {
                            return <li onClick={() => {
                                this.onSetCoverColor(color)
                            }} key={index} style={{ backgroundColor: color }}></li>
                        })}
                    </ul>
                </div>

                <div className='cover-colors img'>
                    <h3 className='cover-title create-board-title'>Photos</h3>
                    <ul className='cover-color-list clean-list img-list'>
                        {dataService.imgUrls.map((url, index) => {
                            return <li onClick={() => {
                                this.onSetCoverImg(url)
                            }} key={index} style={{ backgroundImage: `url(${url})` }}></li>
                        })}
                    </ul>
                </div>

                <div className='cover-input-img'>
                    <h3 className='cover-title create-board-title' >Attachment</h3>
                    <label htmlFor="upload" onChange={(ev) => {
                        this.uploadImgCover(ev)
                    }} className='cover-btn upload'>Upload a cover image</label>
                    <input id="upload" className="file-input" type="file" onChange={(ev) => { this.uploadImgCover(ev) }} />
                </div>


                {(title &&
                    <div className='create-btn' onClick={this.onSubmit}>Create</div>
                )
                }
            </div>
        )
    }
}





