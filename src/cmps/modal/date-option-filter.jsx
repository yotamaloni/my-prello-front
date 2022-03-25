import React from 'react'
import { connect } from 'react-redux'

import { dataService } from '../../services/data.service.js';

import { setFilterBy } from '../../store/board.action.js'

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


class _DateOptionFilter extends React.Component {
    state = {
        isDateFullyOpen: false,
        filterByDates: '',
    }
    componentDidMount() {
        const filterByDates = this.props.filterBy?.dates || ''
        this.setState({ filterByDates })
    }

    handleChange = ({ target }) => {
        let { filterByDates } = this.state
        const field = target.name;
        let value
        if (filterByDates === field) {
            value = ''
            this.setState({ filterByDates: '' })
        }
        else {
            value = field
            this.setState({ filterByDates: field })
        }
        const { filterBy } = this.props
        filterBy.dates = value
        this.props.setFilterBy({ ...filterBy })
    }

    onOpenShowMore = () => {
        this.setState({ isDateFullyOpen: true })
    }

    render() {
        const { isDateFullyOpen, filterByDates } = this.state
        const dateOptionsToDisplay = isDateFullyOpen ? dataService.dateOptions : dataService.dateOptions.slice(0, 3)
        return (
            <ul className='date-option-filter clean-list' style={{ background: 'none' }}>
                {dateOptionsToDisplay.map(dateOption => {
                    return <li className='date-option-container' key={dateOption.id}  >
                        <input type="checkbox" onChange={this.handleChange} name={dateOption.name} checked={filterByDates === dateOption.name} />
                        {dateOption.name === 'noDates' &&
                            <div className='icon-container' style={{ color: '#6B778C', backgroundColor: '#EBECF0' }}>
                                <EventNoteOutlinedIcon />
                            </div>
                        }
                        {dateOption.name === 'overDue' &&
                            <div className='icon-container' style={{ color: '#fff', backgroundColor: '#EB5A46' }}>
                                <AccessTimeOutlinedIcon />
                            </div>
                        }
                        {dateOption.name === 'nextDay' &&
                            <div className='icon-container' style={{ color: '#fff', backgroundColor: '#F2D600' }}>
                                <AccessTimeOutlinedIcon />
                            </div>
                        }
                        {(dateOption.name === 'nextWeek' || dateOption.name === 'nextMonth') &&
                            <div className='icon-container' style={{ color: '#6B778C', backgroundColor: '#EBECF0' }}>
                                <AccessTimeOutlinedIcon />
                            </div>
                        }
                        <p>{dateOption.txt}</p>
                    </li>
                })}
                {!isDateFullyOpen &&
                    <React.Fragment>
                        <li className='date-option-container' onClick={this.onOpenShowMore} >
                            <input type="checkbox" className='not-visible' />
                            <p className='show-more'>Show more options <span className='show-more-icon'><KeyboardArrowDownOutlinedIcon /></span></p>
                        </li>
                    </React.Fragment>
                }
            </ ul >
        )
    }
}

function mapStateToProps({ boardModule }) {
    return {
        board: boardModule.board,
        filterBy: boardModule.filterBy
    }
}

const mapDispatchToProps = {
    setFilterBy
};


export const DateOptionFilter = connect(mapStateToProps, mapDispatchToProps)(_DateOptionFilter)


