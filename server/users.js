let users = []

const addUser = ({ id, name, room }) => {
    if( !id || !name || !room ) {
        // * error
        return { error: true, message: "Please provide all required fields!" }
    }

    const doesUserExist = getUser(name);

    if( doesUserExist ) {
        return {
            error: true,
            message: "User already exists!"
        }
    }

    const user = { id, name ,room };

    users.push( user );
    console.log(users)
    return user
}

const removeUser = (id) => {
    users = users.filter( user => user.id !== id);
    console.log(users)
    return users;
}

const getUser = (id) => {
    return users.find( user => user.id === id );
}

const getAllUsersInRoom = (room) => {
    return users.filter( user => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getAllUsersInRoom
}