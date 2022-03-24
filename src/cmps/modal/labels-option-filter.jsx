import React from 'react'
import { connect } from 'react-redux'

import { dataService } from '../../services/data.service.js';

import { setFilterBy } from '../../store/board.action.js'

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';


class _LabelsOptionFilter extends React.Component {
    state = {
        isLabelsFullyOpen: false,
        filterByLabels: [],
    }

    componentDidMount() {
        const filterByLabels = this.props.filterBy?.labels || []
        this.setState({ filterByLabels })
    }

    handleChange = ({ target }) => {
        let { filterByLabels } = this.state
        const field = target.name;
        const labelIdx = filterByLabels.findIndex(currLabels => currLabels === field)
        if (labelIdx === -1) filterByLabels.push(field)
        else filterByLabels.splice(labelIdx, 1)
        const { filterBy } = this.props
        filterBy.labels = filterByLabels
        this.setState({ filterByLabels: [...filterByLabels] })
        this.props.setFilterBy({ ...filterBy })
    }

    onOpenShowMore = () => {
        this.setState({ isLabelsFullyOpen: true })
    }

    render() {
        const { isLabelsFullyOpen } = this.state
        const { filterByLabels } = this.state
        const labelsOptionsToDisplay = isLabelsFullyOpen ? dataService.labels : dataService.labels.slice(0, 3)
        return (
            <ul className='labels-option-filter clean-list' >
                <li className='labels-option-container' key='no-labels'  >
                    <input type="checkbox" onChange={this.handleChange} name='noLabels' checked={filterByLabels.includes('noLabels')} />
                    <div className='icon-container' style={{ color: '#6B778C', backgroundColor: '#EBECF0' }}>
                        <TurnedInNotOutlinedIcon />
                    </div>
                    <p>No labels</p>
                </li>
                {
                    labelsOptionsToDisplay.map(labelOption => {
                        return <li className='labels-option-container' key={labelOption.id}  >
                            <input type="checkbox" onChange={this.handleChange} name={labelOption.color} checked={filterByLabels.includes(labelOption.color)} />
                            <div style={{ backgroundColor: labelOption.color }}
                                className="labels-color-container">
                            </div>
                        </li>
                    })
                }
                {
                    !isLabelsFullyOpen &&
                    <React.Fragment>
                        <li className='labels-option-container' onClick={this.onOpenShowMore} >
                            <input type="checkbox" className='not-visible' />
                            <p className='show-more'>Show More labels <span className='show-more-icon'><KeyboardArrowDownOutlinedIcon /></span></p>
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


export const LabelsOptionFilter = connect(mapStateToProps, mapDispatchToProps)(_LabelsOptionFilter)


