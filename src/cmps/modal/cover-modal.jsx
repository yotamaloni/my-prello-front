import React from 'react'

import { connect } from 'react-redux'

import { boardService } from '../../services/board.service.js'

import { updateBoard } from '../../store/board.action.js'

import { ModalHeader } from './modal-header.jsx'


class _CoverModal extends React.Component {

    setCoverColor = (color) => {
        const { task, board } = this.props
        if (!task.style) {
            task.style = { backgroundColor: color }
        } else {
            task.style.backgroundColor = color
        }
        task.style.imgUrl = null
        this.props.updateBoard({ ...board }, { ...task })
    }

    setImgCover = async (ev) => {
        const { task, board } = this.props
        try {
            const imgUrl = await boardService.uploadImg(ev)
            if (!task.style) {
                task.style = { imgUrl }
            } else {
                task.style.imgUrl = imgUrl
            }
            task.style.backgroundColor = null
            this.props.updateBoard({ ...board }, { ...task })
        } catch (err) {
            console.log('Cant get img', err);
        }
    }
    removeCover = () => {
        const { task, board } = this.props
        task.style = null
        this.props.updateBoard({ ...board }, { ...task })
    }
    render() {
        const colors = [
            '#61bd4f',
            '#f2d600',
            '#ff9f1a',
            '#eb5a46',
            '#c377e0',
            '#0079bf',
            '#00c2e0',
            '#6DECA9',
            '#FF8ED4',
            '#344563',
        ]
        const { modal, closeModal } = this.props
        return (
            <section className='modal cover-modal'>

                <ModalHeader modal={modal} closeModal={closeModal} />

                <div onClick={this.removeCover} className='full-width-btn gray'>
                    Remove Cover
                </div>

                <div className='cover-colors'>
                    <h4 className='cover-title'>Colors</h4>
                    <ul className='cover-color-list clean-list'>
                        {colors.map((color, index) => {
                            return <li onClick={() => {
                                this.setCoverColor(color)
                            }} key={index} style={{ backgroundColor: color }}></li>
                        })}
                    </ul>
                </div>

                <div className='cover-input'>
                    <h4 className='cover-title' >Attachment</h4>
                    <label htmlFor="upload" onChange={(ev) => {
                        this.setImgCover(ev)
                    }} className='full-width-btn gray'>Upload a cover image</label>
                    <input id="upload" className="file-input" type="file" onChange={(ev) => { this.setImgCover(ev) }} />
                </div>


            </section >
        )
    }
}

function mapStateToProps({ boardModule }) {

    return {
        board: boardModule.board

    }
}

const mapDispatchToProps = {
    updateBoard,
};


export const CoverModal = connect(mapStateToProps, mapDispatchToProps)(_CoverModal)
