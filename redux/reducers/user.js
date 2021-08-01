const initiaState= {
    currentUser:null
}

export const user =(state = initiaState , action) => {
    return {
        ...state,
        currentUser : action.currentUser
    }
}