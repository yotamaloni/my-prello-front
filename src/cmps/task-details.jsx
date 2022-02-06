
import React from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action.js'

import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { boardService } from '../services/board.service.js'

import { TaskBtns } from './task-btns.jsx'
import { TaskInfo } from './task-info.jsx'


class _TaskDetails extends React.Component {

  state = {
    group: null,
    task: {
      title: ''
    },
    modal: '',
  }

  async componentDidMount() {
    this.setTask()
  }

  setTask = async () => {
    const { groupId, taskId } = this.props.match.params
    const { board } = this.props
    const group = board.groups.find((currGroup => currGroup.id === groupId))
    const task = group.tasks.find((currTask => currTask.id === taskId))
    this.setState({ group, task, boardId: board._id })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board !== this.props.board) {
      this.setTask()
    }
  }

  updateTaskInCmp = (task) => {
    this.setState({ task })
  }

  onSetTaskDetails = (task) => {
    this.setState({ task: { ...task } })
  }

  onHandleChange = ({ target }) => {
    const field = target.name
    const value = target.value
    const { task } = this.state
    task[field] = value
    this.setState((prevState) => ({ task }))
  }

  onSubmitTitle = () => {
    if (!this.state.task.title) return
    const { board } = this.props
    this.props.updateBoard({ ...board })
  }

  saveTask = (groupId, task) => {
    const { boardId } = this.state
    this.setState((prevState) => ({ ...prevState, [task]: task }), () => {
      this.props.updateTask(boardId, groupId, task)
    });
  }

  render() {
    const loader = require('../img/loader.gif')

    const { group, task, boardId } = this.state
    const { title, style } = task

    const bgCover = (style?.backgroundColor) ? style.backgroundColor : ''
    const imgCover = (style?.imgUrl) ? style.imgUrl : ''

    if (!task.id) return <div className='loader-page'><img className='loader' src={loader} /></div>

    return (

      <section className='task-details-container' onClick={(ev) => {
        ev.stopPropagation()
        this.props.history.push(`/board/${boardId}`)
      }}>

        < section className="task-details" onClick={(ev) => ev.stopPropagation()}>

          {(bgCover || imgCover) &&
            <React.Fragment>
              <div className='task-cover' style={{ backgroundColor: bgCover }} >
                {imgCover && <img src={imgCover} alt="Not found" />}

              </div>
            </React.Fragment>
          }

          <div className='task-main-container'>

            <div className='title-container'>
              <CallToActionOutlinedIcon className='info-icon title' />
              <div className='main-title-container'>
                <input
                  className='title-input'
                  type="text" name="title"
                  value={title}
                  onBlur={this.onSubmitTitle}
                  onChange={this.onHandleChange} />
              </div>
              <div className='group-title'>In list <span>{group.title}</span>
              </div>
            </div>

            <div className='info-and-btns-container'>
              <TaskInfo
                group={group}
                task={task}
                openModal={this.onOpenModal}
              />

              <TaskBtns
                group={group}
                // groupId={group.id}
                task={task}
                // updateTaskInCmp={this.updateTaskInCmp}
                // setTaskDetails={this.onSetTaskDetails} 
                />
            </div>

          </div>

          <button className='close-btn' onClick={() => {
            this.props.history.push(`/board/${boardId}`)
          }} ><CloseOutlinedIcon /></button>

        </section >
        <div>footer</div>
      </section>
    )
  }
}


function mapStateToProps({ boardModule }) {

  return {

    board: boardModule.board

  }
}

const mapDispatchToProps = {
  updateBoard
};


export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)



