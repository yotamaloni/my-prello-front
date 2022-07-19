import { httpService } from "./http.service";
import { socketService } from "./socket.service";

import { userService } from "./user.service";
import { dataService } from "./data.service";
import { utilService } from "./util.service";

const MILL_SEC_IN_DAY = 1000 * 60 * 60 * 24;
const MILL_SEC_IN_WEEK = 1000 * 60 * 60 * 24 * 7;

export const boardService = {
  query,
  getBoardById,
  addBoard,
  saveBoard,
  removeBoard,
  uploadImg,
  getFilteredTasks,
};

async function query(filterBy = null) {
  return httpService.get(`board`, { filterBy });
}

async function addBoard(board) {
  let user = userService.getLoggedinUser();
  if (!user) user = dataService.guestUser;
  board.createdBy = user;
  board.activities = [];
  board.groups = [];
  board.members = user ? [user] : [];
  board.labels = dataService.labels;
  const AddedBoard = await httpService.post(`board`, board);
  return AddedBoard;
}

async function getBoardById(boardId) {
  const board = await httpService.get(`board/${boardId}`);
  return board;
}

async function saveBoard(board) {
  await httpService.put(`board/${board._id}`, board);
  socketService.emit("board-update", board);
  return board;
}

async function removeBoard(boardId) {
  return httpService.delete(`board/${boardId}`);
}

async function uploadImg(ev) {
  const CLOUD_NAME = "dnft2vfvz";
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", ev.target.files[0]);
  formData.append("upload_preset", "bhdlgcay");

  return fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => res.url)
    .catch((err) => console.error(err));
}

function getFilteredTasks(filterBy, tasks) {
  if (
    !filterBy.title &&
    !filterBy.dates &&
    !filterBy.labels?.length &&
    !filterBy.members?.length
  )
    return tasks;
  const filteredTasks = tasks.filter((task) => {
    return (
      _isTitleIncludes(task, filterBy.title) &&
      _isLabelsIncludes(task, filterBy.labels) &&
      _isMembersIncludes(task, filterBy.members) &&
      _isDatesIncludes(task, filterBy.dates)
    );
  });
  return filteredTasks;
}
function _isTitleIncludes(task, title) {
  if (!title) return true;
  return task.title?.toLowerCase().includes(title);
}
function _isLabelsIncludes(task, filterByLabels) {
  if (!filterByLabels?.length) return true;
  if (filterByLabels.includes("noLabels") && !task.labels?.length) return true;
  return task.labels?.some((label) => {
    return filterByLabels.includes(label.color);
  });
}

function _isMembersIncludes(task, filterByMembers) {
  if (!filterByMembers?.length) return true;
  return task.members?.some((member) => {
    return filterByMembers.includes(member._id);
  });
}

function _isDatesIncludes(task, filterByDate) {
  if (!filterByDate) return true;
  switch (filterByDate) {
    case "noDates":
      return !task.dueDate;
    case "overDue":
      return task.dueDate?.time < Date.now() && !task.dueDate?.completed;
    case "nextDay":
      return (
        !task.dueDate?.completed &&
        task.dueDate?.time &&
        utilService.isInPeriodOfTime("day", task.dueDate.time)
      );
    case "nextWeek":
      return (
        !task.dueDate?.completed &&
        task.dueDate?.time &&
        utilService.isInPeriodOfTime("week", task.dueDate.time)
      );
    case "nextMonth":
      return (
        !task.dueDate?.completed &&
        task.dueDate?.time &&
        utilService.isInPeriodOfTime("month", task.dueDate.time)
      );
    case "notCompleted":
      return !task.dueDate?.completed;
    case "completed":
      return task.dueDate?.completed;
  }
}
