
import React from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../../store/board.action.js'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { TaskHeader } from './task-header.jsx'
import { TaskTitle } from './task-title.jsx'
import { TaskBtns } from './task-btns.jsx'
import { TaskInfo } from './task-info.jsx'
import { CircularIndeterminate } from '../../cmps/loader.jsx'

class _TaskDetails extends React.Component {

  state = {
    group: null,
    task: null,
  }

  componentDidMount() {
    this.setTask()
  }

  setTask = () => {
    const { groupId, taskId } = this.props.match.params
    const { board } = this.props
    const group = board.groups.find((currGroup => currGroup.id === groupId))
    const task = group.tasks.find((currTask => currTask.id === taskId))
    this.setState({ group, task })
  }

  render() {
    const { group, task } = this.state
    const { board } = this.props
    if (!task?.id) return <div className='loader-page'><CircularIndeterminate /></div>
    const { title, style } = task
    const bgCover = (style?.backgroundColor) ? style.backgroundColor : ''
    const imgCover = (style?.imgUrl) ? style.imgUrl : ''

    return (

      <section className='task-details-container' onClick={(ev) => {
        ev.stopPropagation()
        this.props.history.push(`/board/${board._id}`)
      }}>

        < section className="task-details" onClick={(ev) => ev.stopPropagation()}>

          {(bgCover || imgCover) &&
            <TaskHeader bgCover={bgCover} imgCover={imgCover} />
          }

          <main className='task-main-container'>

            <TaskTitle txt={title} task={task} group={group} />

            <div className='task-body'>
              <TaskInfo
                group={group}
                task={task}
                board={board}

              />
              <TaskBtns
                group={group}
                task={task}
              />
            </div>

          </main>

          <button className='close-btn' onClick={() => {
            this.props.history.push(`/board/${board._id}`)
          }} ><CloseOutlinedIcon /></button>

        </section >
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
  updateBoard,
};


export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(_TaskDetails)



