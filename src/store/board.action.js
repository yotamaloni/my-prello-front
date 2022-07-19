import { boardService } from "../services/board.service.js";

export function loadBoard(boardId) {
  return async (dispatch, getState) => {
    const {
      boardModule: { filterBy },
    } = getState();
    try {
      if (boardId) {
        const board = await boardService.getBoardById(boardId, filterBy);
        dispatch({ type: "SET_BOARD", board });
        if (!board) throw new Error();
      } else {
        dispatch({ type: "SET_BOARD", board: null });
      }
    } catch (err) {
      console.log("Cannot get board", err);
    }
  };
}

export function updateBoard(board, task = null) {
  return async (dispatch) => {
    try {
      await boardService.saveBoard(board, task);
      dispatch({ type: "SET_BOARD", board });
    } catch (err) {
      console.log("Cannot update board", err);
    }
  };
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: "SET_FILTER", filterBy });
  };
}

export function setModal(modal) {
  return (dispatch) => {
    dispatch({ type: "SET_MODAL", modal });
  };
}

export function setBoardInReducer(board) {
  return (dispatch) => {
    dispatch({ type: "SET_BOARD", board });
  };
}
