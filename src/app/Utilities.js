import {toast} from "react-toastify";
import React from "react";
import Popup from "reactjs-popup";

export function dataToUsers(data) {
    return data.data.listSchoolUsers.items
}

export function dataToStudents(data) {
    return data.data.listStudents.items
}

export function userFullName(user){
    return `${user.first_name} ${user.last_name}`
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function displayError(message, error) {
    toast.error(message)
    console.error(message, error)
}

export function popupHelper(key, text, producePopup, onClick = function () {
}) {
    const ref = React.createRef()
    return <Popup ref={ref} className='vertical'
                  key={key} trigger={
        <button>{text}</button>
    } onOpen={(e) => onClick(ref)} position="right center">
        {
            producePopup(ref)
        }
    </Popup>
}

export function createPassword() {
    return getRandomInt(100_000_000).toString();
}

export function userType(u) {
    if (u == null)
        return null
    const t = u.user_type
    let s = t.toLocaleLowerCase()
    s = s[0].toUpperCase() + s.slice(1)
    return s
}