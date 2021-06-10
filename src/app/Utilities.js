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

export function userType(u) {
    if (u == null)
        return null
    const t = u.user_type
    let s = t.toLocaleLowerCase()
    s = s[0].toUpperCase() + s.slice(1)
    return s
}