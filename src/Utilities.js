export function dataToUsers(data) {
    return data.data.listSchoolUsers.items
}

export function userFullName(user){
    return `${user.first_name} ${user.last_name}`
}