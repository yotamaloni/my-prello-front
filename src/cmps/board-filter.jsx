
import React from 'react'
import { connect } from 'react-redux'
import Checkbox from '@mui/material/Checkbox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import { utilService } from '../services/util.service.js'
import { setFilter, loadBoard } from '../store/board.action.js'

import { boardService } from '../services/board.service.js';
import MultipleSelectCheckmarks from './members-filter.jsx';

const colors = [
    '#61bd4f',
    '#f2d600',
    '#ff9f1a',
    '#eb5a46',
    '#c377e0',
    '#0079bf',
    '#00c2e0',
    '#344563',
]

const dueDatesOptions = [


]

class _BoardFilter extends React.Component {

    state = {


        filterBy: {
            txt: '',
            members: [],
            labels: [],
            dueDates: [],
        },
        membersFilter: '',
        labelsFilter: '',
        isMemberModalOpen: false,
        isLabelModalOpen: false,
        isDueDateExpended: false,
    }

    async componentDidMount() {
    }



    onHandleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            console.log('this.state.filterBy:', this.state.filterBy);
            this.onSetFilter(this.state.filterBy)
        });
    }

    onHandleMultyChange = ({ target }) => {
        const { members } = this.props.board

        const field = target.name
        const value = target.value
        const checked = target.checked
        if (value === 'all') {
            const items = document.getElementsByName(field);
            items.forEach(item => {
                if (item.type === 'checkbox') item.checked = checked;
            })

            let fieldVals = (field === 'members') ? members.map(member => member.fullname) : colors
            fieldVals = [...fieldVals, `no-${field}`]
            if (checked) {
                this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: fieldVals } }), () => {
                    this.onSetFilter(this.state.filterBy)
                    console.log('this.state.filterBy:', this.state.filterBy);
                })
            } else {
                this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: [] } }), () => {
                    this.onSetFilter(this.state.filterBy)
                    console.log('this.state.filterBy:', this.state.filterBy);
                })
            }
        } else {
            let vals = this.state.filterBy[field]
            const newVals = vals.includes(value) ? vals.filter(val => val !== value) : [...vals, value]
            // console.log('newVals:', newVals);
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: [...newVals] } }), () => {
                this.onSetFilter(this.state.filterBy)
                // console.log('this.state.filterBy:', this.state.filterBy);
            });
        }
    }
    onSetFilter = (filterBy) => {

        this.props.setFilter(filterBy)
        this.props.loadBoard(this.props.boardId)
    }

    getInitials = (fullname) => {
        let splitedName = fullname.split(' '),
            initials = splitedName[0].substring(0, 1).toUpperCase();

        if (splitedName.length > 1) {
            initials += splitedName[splitedName.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    }

    onOpenModal = (type) => {
        console.log("🟡 ~ type", type)

    }

    onToggleMembersModal = () => {
        const isMemberModalOpen = this.state.isMemberModalOpen ? false : true
        this.setState({ isMemberModalOpen })
    }
    onToggleLabelsModal = () => {
        const isLabelModalOpen = this.state.isLabelModalOpen ? false : true
        this.setState({ isLabelModalOpen })
    }

    render() {
        const { board } = this.props
        const { fullname } = board.createdBy
        const { members } = board
        const { filterBy, isMemberModalOpen, isDueDateExpended, isLabelModalOpen, membersFilter, labelsFilter, membersChecked, labelsChecked } = this.state
        const { txt } = filterBy
        const userinitials = this.getInitials(fullname)


        return (
            <div className='filter-container'>

                <header>
                    <h2 className='filter-title'>Filter</h2>
                    <button className='close-btn' onClick={() => {
                        this.props.toggleFilterModal()
                    }} >X</button>
                </header>

                <div className='scroll-container'>

                    <p className='input-title'>Keyword</p>
                    <input className='filter-input' type="text" name="txt" value={txt} onChange={this.onHandleChange} placeholder='Enter a keyword...' />
                    <p className='input-description'>Search cards, members, labels, and more.</p>


                    <div className='filter-members'>
                        <p className='members-title'>Members</p>
                        <ul className='members'>
                            <li>
                                <label htmlFor="no-members" className='member' style={{ color: '#5e6c84' }}>
                                    <input type="checkbox" className='Checkbox' id="no-members" name="members" value="no-members" onChange={this.onHandleMultyChange} />
                                    <span className='icon-container'><PersonOutlineOutlinedIcon className='icon' /></span>
                                    <p>No members</p>
                                </label>
                            </li>
                            <li>
                                <label htmlFor={fullname} className='member'>
                                    <input type="checkbox" className='Checkbox' id={fullname} name="members" value={fullname} onChange={this.onHandleMultyChange} />
                                    <span className='icon-container' style={{ backgroundColor: utilService.getRandomColor(), color: 'white' }}><p className='initials'>{userinitials}</p></span>
                                    <p>{fullname}</p>
                                </label>
                            </li>
                            <li className='member input'>
                                <div>
                                    <input type="checkbox" className='Checkbox' id='membersAll' name="members" value='all' onChange={this.onHandleMultyChange} />
                                </div>
                                <input className='members-input' type="text" name="membersFilter" value={membersFilter} onChange={this.onHandleChange} placeholder='Select members' onClick={() => this.onToggleMembersModal()} />
                                <KeyboardArrowDownIcon className='arrow-icon' />
                            </li>
                        </ul>

                        {isMemberModalOpen &&
                            <div className='members-modal'>
                                <ul className='members flex column clean-list'>
                                    {members.map(member => {
                                        if (member.fullname !== fullname)
                                            return (
                                                <li key={member._id}>
                                                    <label htmlFor={member._id} className='member'>
                                                        <input type="checkbox" className='Checkbox' id={member._id} name="members" value={member.fullname} onChange={this.onHandleMultyChange} checked={membersChecked} />
                                                        <span className='icon-container' style={{ backgroundColor: utilService.getRandomColor(), color: 'white' }}><p className='initials'>{this.getInitials(member.fullname)}</p></span>
                                                        <p>{member.fullname}</p>
                                                    </label>
                                                </li>
                                            )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>


                    <div className='filter-dueDate'>
                        <p className='dueDate-title'>Due date</p>
                        <ul className='dueDates flex column clean-list'>

                            <li>
                                <label htmlFor="noDates" className='dueDate flex'>
                                    <input type="checkbox" className='Checkbox' id="noDates" name="dueDates" value='noDates' onChange={this.onHandleMultyChange} />
                                    <span className='icon-container'><DateRangeIcon className='icon' /></span>
                                    <p>No dates</p>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="overdue" className='dueDate flex'>
                                    <input type="checkbox" className='Checkbox' id="overdue" name="dueDates" value="overdue" onChange={this.onHandleMultyChange} />
                                    <span className='icon-container' style={{ backgroundColor: '#eb5a46', color: 'white' }}><AccessTimeIcon className='icon' /></span>
                                    <p>Overdue</p>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="dueNextDay" className='dueDate flex'>
                                    <input type="checkbox" className='Checkbox' id="dueNextDay" name="dueDates" value="dueNextDay" onChange={this.onHandleMultyChange} />
                                    <span className='icon-container' style={{ backgroundColor: '#f2d600', color: 'white' }}><AccessTimeIcon className='icon' /></span>
                                    <p>Due in the next day</p>
                                </label>
                            </li>
                        </ul>
                        {!isDueDateExpended &&
                            <button className='dueDate-expend-btn' onClick={() => this.setState({ isDueDateExpended: true })}>
                                Show more options
                                <KeyboardArrowDownIcon className='arrow-icon' />
                            </button>
                        }

                        {isDueDateExpended &&
                            <ul className='dueDates flex column clean-list'>
                                <li>
                                    <label htmlFor="dueNextWeek" className='dueDate flex'>
                                        <input type="checkbox" className='Checkbox' id="dueNextWeek" name="dueDates" value="dueNextWeek" onChange={this.onHandleMultyChange} />
                                        <span className='icon-container'><AccessTimeIcon className='icon' /></span>
                                        <p>Due in the next week</p>
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="dueNextMonth" className='dueDate flex'>
                                        <input type="checkbox" className='Checkbox' id="dueNextMonth" name="dueDates" value="dueNextMonth" onChange={this.onHandleMultyChange} />
                                        <span className='icon-container'><AccessTimeIcon className='icon' /></span>
                                        <p>Due in the next month</p>
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="complete" className='dueDate flex'>
                                        <input type="checkbox" className='Checkbox' id="complete" name="dueDates" value="complete" onChange={this.onHandleMultyChange} />
                                        <p className='right'>Marked as complete</p>
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="notComplete" className='dueDate flex'>
                                        <input type="checkbox" className='Checkbox' id="notComplete" name="dueDates" value="notComplete" onChange={this.onHandleMultyChange} />
                                        <p className='right'>Not marked as complete</p>
                                    </label>
                                </li>
                            </ul>

                        }
                    </div>

                    <div className='filter-labels'>
                        <p className='Labels-title'>Labels</p>
                        <ul className='labels flex column clean-list'>

                            <li>
                                <label htmlFor="notComplete" className='label'>
                                    <input type="checkbox" className='Checkbox' id="noLabels" name="labels" value="noLabels" onChange={this.onHandleMultyChange} />
                                    <span className='icon-container'><LocalOfferOutlinedIcon className='icon' /></span>
                                    <p>No labels</p>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="#61bd4f" className='label'>
                                    <div>
                                        <input type="checkbox" className='Checkbox' id="#61bd4f" name="labels" value="#61bd4f" onChange={this.onHandleMultyChange} />
                                    </div>
                                    <div className='label-color' style={{ backgroundColor: '#61bd4f' }}></div>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="#f2d600" className='label'>
                                    <div>
                                        <input type="checkbox" className='Checkbox' id="#f2d600" name="labels" value="#f2d600" onChange={this.onHandleMultyChange} />
                                    </div>
                                    <div className='label-color' style={{ backgroundColor: '#f2d600' }}></div>
                                </label>
                            </li>
                            <li>
                                <label htmlFor="#ff9f1a" className='label'>
                                    <div>
                                        <input type="checkbox" className='Checkbox' id="#ff9f1a" name="labels" value="#ff9f1a" onChange={this.onHandleMultyChange} />
                                    </div>
                                    <div className='label-color' style={{ backgroundColor: '#ff9f1a' }}></div>
                                </label>
                            </li>
                            <li className='label input'>
                                <div>
                                    <input type="checkbox" className='Checkbox' id='labelsAll' name="labels" value='all' onChange={this.onHandleMultyChange} />
                                </div>
                                {/* <div className='members-input-container'> */}
                                <input className='members-input' type="text" name="membersFilter" value={labelsFilter} onChange={this.onHandleChange} placeholder='Select labels' onClick={() => this.onToggleLabelsModal()} />
                                {/* </div> */}
                                <KeyboardArrowDownIcon className='arrow-icon' />
                            </li>
                        </ul>
                        {isLabelModalOpen &&
                            <div className='members-modal'>
                                <ul className='labels flex column clean-list'>
                                    {colors.map(color => {
                                        return (
                                            <li key={color}>
                                                <label htmlFor={color} className='label'>
                                                    <div>
                                                        <input type="checkbox" className='Checkbox' id={color} name="labels" value={color} onChange={this.onHandleMultyChange} />
                                                    </div>
                                                    <div className='label-color' style={{ backgroundColor: color }}></div>
                                                </label>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board

    }
}

const mapDispatchToProps = {
    setFilter,
    loadBoard
};


export const BoardFilter = connect(mapStateToProps, mapDispatchToProps)(_BoardFilter)



