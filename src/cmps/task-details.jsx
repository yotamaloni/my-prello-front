
import React from 'react'
import { connect } from 'react-redux'
import { TextInput } from './text-input.jsx'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from './task-dates.jsx'
// import { TaskCover } from './task-cover.jsx'
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { removeTask, updateTask, updateBoard } from '../store/board.action.js'
import { boardService } from '../services/board.service.js'
import { utilService } from '../services/util.service.js'
import { TaskBtns } from './task-btns.jsx'
import { TaskInfo } from './task-info.jsx'
import { socketService } from '../services/socket.service.js'

class _TaskDetails extends React.Component {

  state = {
    taskId: null,
    groupId: null,
    group: null,
    task: {
      title: ''
    },
    modal: '',
    boardId: ''
  }

  async componentDidMount() {
    this.setTask()
  }

  setTask = async () => {
    const { boardId, groupId, taskId } = this.props.match.params
    this.setState({ taskId, groupId })
    this.setState({ groupId: groupId, boardId })
    const group = await boardService.getGroupById(boardId, groupId)
    this.setState({ group })
    boardService.getTaskById(boardId, groupId, taskId).then(task => {
      this.setState({ task })
    })
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
    this.setState((prevState) => ({ task: { ...prevState.task, [field]: value } }))
  }

  onSubmitTitle = () => {
    if (!this.state.task.title) return

    const { task, groupId } = this.state
    const { board } = this.props
    const group = board.groups.find(currGroup => currGroup.id === groupId)
    const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
    group.tasks[taskIdx] = task
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

    const { taskId, group, groupId, task, modal, boardId } = this.state
    const { title, dueDate, isDone, style } = task
    let cover = ''
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
              <TaskInfo groupId={groupId} board={this.props.board} updateBoard={this.props.updateBoard} boardId={boardId} task={task} taskId={taskId} bgCover={bgCover} imgCover={imgCover}
                openModal={this.onOpenModal} setTaskDetails={this.onSetTaskDetails} />

              <TaskBtns board={this.props.board} updateBoard={this.props.updateBoard} updateTaskInCmp={this.updateTaskInCmp} groupId={groupId} boardId={boardId} task={task} bgCover={bgCover} imgCover={imgCover}
                setTaskDetails={this.onSetTaskDetails} />
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
  removeTask,
  updateTask,
  updateBoard
};


export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)



