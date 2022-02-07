
// import React from 'react'
// import DoneIcon from '@mui/icons-material/Done';


// import { connect } from 'react-redux'


// import { updateTask } from '../store/board.action.js'
// import { utilService } from '../services/util.service.js';




// class _ChecklistModal extends React.Component {

//     state = {
//         title: '',
//         task: this.props.task
//     }

//     handleChange = ({ target }) => {
//         const field = target.name;
//         const value = target.value;
//         this.setState((prevState) => ({
//             ...prevState, [field]: value
//         }));
//     };

//     onSubmitTitle = (ev) => {
//         ev.preventDefault();
//         let { title, task } = this.state
//         const { boardId, groupId } = this.props
//         this.setState({
//             title: ''
//         });
//         const checklist = {
//             id: utilService.makeId(),
//             title,
//             todo: [],
//         }
//         task.checklists = task.checklists ? task.checklists.push(checklist) : task.checklists = [checklist]
//         task = { ...task }
//         this.setState({ task })
//         this.props.updateTask('b101', groupId, task)
//         this.props.closeModal()
//     }


//     render() {

//         const { task } = this.props
//         const { title } = this.state
//         return (
//             <div className='task-modal checklist'>
//                 <h3 className='labels-title'>Title</h3>
//                 {/* <form >
//                     <input className='add-comment'
//                         type='text'
//                         onChange={this.handleChange}
//                         autoComplete='off'
//                         name='title'
//                         value={title} />
//                     <button className='add-btn' type="submit" onClick={this.onSubmitTitle} >Save</button>
//                 </form> */}

//                 <button onClick={(ev) => {
//                     ev.stopPropagation();
//                     this.props.closeModal()
//                 }}
//                     className='close-modal-btn'>x</button>
//             </div >
//         )
//     }
// }

// function mapStateToProps({ boardModule }) {

//     return {
//         board: boardModule.board

//     }
// }

// const mapDispatchToProps = {
//     updateTask,
// };


// export const ChecklistModal = connect(mapStateToProps, mapDispatchToProps)(_ChecklistModal)
