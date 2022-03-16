import React, { useState } from 'react';

import { connect } from 'react-redux'
import { setFilterBy } from '../store/board.action.js'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


export function _SearchInput(props) {
    const [title, setTitle] = useState('');
    const { setFilterBy, loadBoards, isBoardDetails } = props

    function handleChange({ target }) {
        const value = target.value
        setTitle(value)
        if (!isBoardDetails) loadBoards({ title: value })
        else setFilterBy({ title: value.toLowerCase() })
    }

    return (
        < form className="search-form" >
            <SearchOutlinedIcon />
            <input type="text" placeholder='Search' value={title} onChange={handleChange} />
        </form >
    )
}

function mapStateToProps({ boardModule }) {
    return {
    }
}

const mapDispatchToProps = {
    setFilterBy
};

export const SearchInput = connect(mapStateToProps, mapDispatchToProps)(_SearchInput)




