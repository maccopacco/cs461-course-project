export function dataToUsers(data) {
    return data.data.listSchoolUsers.items
}

export function dataToStudents(data) {
    return data.data.listStudents.items
}

export function userFullName(user){
    return `${user.first_name} ${user.last_name}`
}