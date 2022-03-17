import React from 'react'

import { dataService } from '../../services/data.service.js'
import { boardService } from '../../services/board.service.js'

import { ModalHeader } from './modal-header.jsx'
import { CircularIndeterminate } from '../loader.jsx'

export class CreateBoardModal extends React.Component {
    inputRef = React.createRef();

    state = {
        title: null,
        backgroundColor: null,
        imgUrl: null,
        isLoading: null,
    }
    componentDidMount() {
        const { isCreateBoard } = this.props
        if (!isCreateBoard) {
            const { board } = this.props
            const { style } = board
            this.setState({ title: board.title, backgroundColor: style.backgroundColor, imgUrl: style.imgUrl })
        } else {
            this.setState({ title: '', backgroundColor: '#0079BF', imgUrl: null })
        }
    }
    onHandleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
        const { isCreateBoard } = this.props
        if (!isCreateBoard) this.updateBoardDetails(value, this.state.backgroundColor, this.state.imgUrl)
    }

    onSetCoverColor = (color) => {
        this.setState({ backgroundColor: color, imgUrl: null })
        const { isCreateBoard } = this.props
        if (!isCreateBoard) this.updateBoardDetails(this.state.title, color, null)
    }

    onSetCoverImg = (url) => {
        this.setState({ backgroundColor: null, imgUrl: url })
        const { isCreateBoard } = this.props
        if (!isCreateBoard) this.updateBoardDetails(this.state.title, null, url)
    }

    onSubmit = () => {
        const { title, imgUrl, backgroundColor } = this.state
        const { closeModal } = this.props
        if (!title) {
            this.inputRef.current.focus();
            return
        }
        const boardToAdd = {
            title,
            style: {
                backgroundColor,
                imgUrl,
            }
        }
        this.props.addBoard(boardToAdd)
        closeModal()
    }
    uploadImgCover = async (ev) => {
        this.setState({ isLoading: true })
        const imgUrl = await boardService.uploadImg(ev)
        this.onSetCoverImg(imgUrl)
        this.setState({ isLoading: false })

    }

    updateBoardDetails = async (title, backgroundColor, imgUrl) => {
        console.log("🟡 ~ title", title)
        if (!title) {
            this.inputRef.current.focus();
            return
        }
        const { board, updateBoard } = this.props
        board.title = title
        board.style = {
            backgroundColor,
            imgUrl
        }
        updateBoard({ ...board })
    }
    render() {
        const { backgroundColor, imgUrl, title, isLoading } = this.state
        const { modal, closeModal, isCreateBoard } = this.props
        const updateBoardClass = isCreateBoard ? '' : 'update-board'
        if (title === null) return <div className='loader-page'><CircularIndeterminate /></div>
        const creatBtnColor = title ? 'blue' : 'blur-text'
        return (
            <div className={`modal create-board ${updateBoardClass}`} >
                {isCreateBoard &&
                    <div>
                        <ModalHeader modal={modal} closeModal={closeModal} />
                        <div className='chosen-background'
                            style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: backgroundColor }}>
                        </div>
                    </div>
                }
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
                {isCreateBoard &&
                    <div className={`full-width-btn ${creatBtnColor}`} onClick={(ev) => {
                        ev.stopPropagation();
                        this.onSubmit()
                    }}>{isCreateBoard ? 'Create' : 'Update'}</div>
                }
                {isLoading &&
                    <div className='loader-page'><CircularIndeterminate /></div>
                }
            </div>
        )
    }
}







