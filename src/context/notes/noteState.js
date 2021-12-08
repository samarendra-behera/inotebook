import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "61ad8dd7bd9473fsb987d11037",
      "user": "61ac8bb36c76deb8dcc45b20",
      "title": "Good RelationShip",
      "description": "The main condition of good relationship is 'understand to each other'",
      "tag": "personal info",
      "date": "2021-12-06T04:11:39.909Z",
      "__v": 0
    },
    {
      "_id": "61ad8d7bsd9s473f0b987d11037",
      "user": "61ac8bb36c76deb8dcc45b20",
      "title": "Good RelationShip",
      "description": "The main condition of good relationship is 'understand to each other'",
      "tag": "personal info",
      "date": "2021-12-06T04:11:39.909Z",
      "__v": 0
    },
    {
      "_id": "61ads8d7bdd9473f0b9871d1037",
      "user": "61ac8bb36c76deb8dcc45b20",
      "title": "Good RelationShip",
      "description": "The main condition of good relationship is 'understand to each other'",
      "tag": "personal info",
      "date": "2021-12-06T04:11:39.909Z",
      "__v": 0
    },
    {
      "_id": "61ad8d7bd9473f0b9871d10s37",
      "user": "61ac8bb36c76deb8dcc45b20",
      "title": "Good RelationShip",
      "description": "The main condition of good relationship is 'understand to each other'",
      "tag": "personal info",
      "date": "2021-12-06T04:11:39.909Z",
      "__v": 0
    },
    {
      "_id": "61ad8d7bd9473f0b98d71103s7",
      "user": "61ac8bb36c76deb8dcc45b20",
      "title": "Good RelationShip",
      "description": "The main condition of good relationship is 'understand to each other'",
      "tag": "personal info",
      "date": "2021-12-06T04:11:39.909Z",
      "__v": 0
    },
    {
      "_id": "61ad8d7bd9473fd0b98711037s",
      "user": "61ac8bb36c76deb8dcc45b20",
      "title": "Good RelationShip",
      "description": "The main condition of good relationship is 'understand to each other'",
      "tag": "personal info",
      "date": "2021-12-06T04:11:39.909Z",
      "__v": 0
    },
    {
      "_id": "61ad9s38d9a60461d0ea302dd8",
      "user": "61ac8bb36c76deb8dcc45b20",
      "title": "Good RelationShip is Best relation-Ship",
      "description": "The main condition of good relationship is 'understand to each other haaaa'",
      "tag": "personal info",
      "date": "2021-12-06T04:37:33.140Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;