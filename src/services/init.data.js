
import { utilService } from './util.service.js'


export const initData = {
    getBoard,
    getBoards
}

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

function getBoards() {
    return [getBoard(), getEmptyBoard()]
}
function getEmptyBoard() {
    return {
        "title": 'Just another board',
        "_id": utilService.makeId(),
        "createdAt": Date.now(),
        "createdBy": {
            "_id": "u102",
            "fullname": "Danny Star",
            "username": "Danny",
            "imgUrl": null,
            "initials": "DS"
        },
        "groups": [],
        "activities": [],
        "style": {
            "backgroundColor": null,
        },
        "members": [
            {
                "_id": "u102",
                "fullname": "Danny Star",
                "username": "Danny",
                "imgUrl": null,
                "color": getRandomColor(),
                "initials": "DS"
            },
            {
                "_id": "u103",
                "fullname": "Yogev Ohayon",
                "username": "Yogev",
                "imgUrl": null,
                "color": getRandomColor(),
                "initials": "YO"
            },
            {
                "_id": "u104",
                "fullname": "Yotam Aloni",
                "username": "Yotam",
                "imgUrl": null,
                "color": getRandomColor(),
                "initials": "YA"
            }
        ],
    }
}

function getBoard() {

    return {
        "_id": "b101",
        "title": "Sprint 4 proj",
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "username": "Tal",
            "imgUrl": null,
            "initials": "TT"
        },
        "style": {
            "imgUrl": "https://res.cloudinary.com/dnft2vfvz/image/upload/v1643053143/samples/landscapes/beach-boat.jpg",
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": getRandomColor()
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "username": "Tal",
                "imgUrl": null,
                "color": getRandomColor(),
                "initials": "TT"
            },
            {
                "_id": "u102",
                "fullname": "Danny Star",
                "username": "Danny",
                "imgUrl": null,
                "color": getRandomColor(),
                "initials": "DS"
            },
            {
                "_id": "u103",
                "fullname": "Yogev Ohayon",
                "username": "Yogev",
                "imgUrl": null,
                "color": getRandomColor(),
                "initials": "YO"
            },
            {
                "_id": "u104",
                "fullname": "Yotam Aloni",
                "username": "Yotam",
                "imgUrl": null,
                "color": getRandomColor(),
                "initials": "YA"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Research",
                "tasks": [
                    {
                        "id": "c102",
                        "title": "Reading"
                    }
                ],
                "style": {
                    "backgroundColor": getRandomColor()
                }
            },
            {
                "id": "g102",
                "title": "React work",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Architecture",
                        "style": {
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBONngOFarKHgCgh0fkNMLS8tVPN_06v2GlQ&usqp=CAU",
                        },
                    },
                    {
                        "id": "c104",
                        "title": "Build cmps",
                        "status": "in-progress",
                        "description": "build it",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        // "members": [
                        //     {
                        //         "_id": "u103",
                        //         "fullname": "Yogev Ohayon",
                        //         "username": "Yogev",
                        //         "imgUrl": null,
                        //         "color": getRandomColor(),
                        //         "initials": "YO"
                        //     },
                        //     {
                        //         "_id": "u104",
                        //         "fullname": "Yotam Aloni",
                        //         "username": "Yotam",
                        //         "imgUrl": null,
                        //         "color": getRandomColor(),
                        //         "initials": "YA"
                        //     },
                        // ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": { "time": 16156215211, "completed": true },
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "backgroundColor": getRandomColor()
                        }
                    },

                ],
                "style": {
                    "backgroundColor": getRandomColor()
                }
            },
            {
                "id": "g103",
                "title": "Node js",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Connect to server",
                        "style": {
                            "backgroundColor": getRandomColor()
                        }

                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Wiring test",
                        "style": {
                            "backgroundColor": getRandomColor(),
                        }
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Get Mongo",
                        "style": {
                            "imgUrl": "https://miro.medium.com/max/1040/1*0lgunvVYa8gZ_sfMHflyvw.jpeg"
                        },

                    },
                ],
                "style": {
                    "backgroundColor": getRandomColor(),
                }
            },
            {
                "id": "g104",
                "title": "Q.A",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Check if there are bugs",
                        "style": {
                            "imgUrl": "https://img.favpng.com/20/16/21/ladybird-software-bug-computer-program-icon-png-favpng-vLmTFaRiBkfaPVHUQK2vx5dkV.jpg"
                        }
                    },
                ],
                "style": {
                    "backgroundColor": getRandomColor(),
                }
            },
            {
                "id": "g105",
                "title": "Get a vacation",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Find destination",
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Book flights and hoetls",
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Get some rest!",
                        "style": {
                            "imgUrl": "https://media.istockphoto.com/photos/couple-relax-on-the-beach-enjoy-beautiful-sea-on-the-tropical-island-picture-id1160947136?k=20&m=1160947136&s=612x612&w=0&h=TdExAS2--H3tHQv2tc5woAl7e0zioUVB5dbIz6At0I4="
                        }
                    },
                ],
                "style": {
                    "backgroundColor": getRandomColor(),
                }
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "taskId": "c101"
            }
        ],
    }
}


function getRandomColor() {
    return colors[utilService.getRandomIntInclusive(0, colors.length - 1)]
}





