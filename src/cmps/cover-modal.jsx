
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';

import { connect } from 'react-redux'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


import { updateBoard } from '../store/board.action.js'

class _CoverModal extends React.Component {

    state = {
    }

    setCoverColor = (color) => {
        const { task } = this.props
        if (!task.style) {
            task.style = { backgroundColor: color }
        } else {
            task.style.backgroundColor = color
        }
        task.style.imgUrl = null
        this.updateTaskInBoard(task)
        this.props.setTaskDetails(task)
    }

    setImgCover = async (ev) => {
        const { task } = this.props
        try {
            const imgUrl = await this.uploadImg(ev)
            if (!task.style) {
                task.style = { imgUrl }
            } else {
                task.style.imgUrl = imgUrl
            }
            task.style.backgroundColor = null
            this.updateTaskInBoard(task)
            this.props.setTaskDetails(task)


        } catch (err) {
            console.log('Cant get img', err);
        }
    }
    removeCover = () => {
        const { task } = this.props
        task.style = null
        this.updateTaskInBoard(task)
        this.props.setTaskDetails(task)
    }

    updateTaskInBoard = async (task) => {
        const { board, groupId } = this.props
        const group = board.groups.find(currGroup => currGroup.id === groupId)
        const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
        group.tasks[taskIdx] = task
        this.props.updateBoard({ ...board })
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
        const { task } = this.props
        return (
            <div className='cover-modal-container task-modal cover'>
                <div className='header-container'>
                    <div className='hidden'>
                        <ClearOutlinedIcon />
                    </div>
                    <div className='title'>
                        Cover
                    </div>
                    <div className='cancel'>
                        <ClearOutlinedIcon onClick={(ev) => {
                            ev.stopPropagation();
                            this.props.closeModal()
                        }} />
                    </div>

                </div>
                <div className='upper-section'>
                    <div onClick={this.removeCover} className='cover-btn remove'>Remove Cover</div>
                </div>

                <div className='cover-colors'>
                    <h3 className='cover-title'>Colors</h3>
                    <ul className='cover-color-list clean-list'>
                        {colors.map((color, index) => {
                            return <li onClick={() => {
                                this.setCoverColor(color)
                            }} key={index} style={{ backgroundColor: color }}></li>
                        })}
                    </ul>
                </div>
                <div className='cover-input'>
                    <h3 className='cover-title' >Attachment</h3>
                    <label htmlFor="upload" onChange={(ev) => {
                        this.setImgCover(ev)
                    }} className='cover-btn upload'>Upload a cover image</label>
                    <input id="upload" className="file-input" type="file" onChange={(ev) => { this.setImgCover(ev) }} />
                </div>


            </div >
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
