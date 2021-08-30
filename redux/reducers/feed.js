const initiaState= {
    currentData:null
}

export const feed =(state = initiaState , action) => {
    return {
        ...state,
        currentData : action.currentData
    }
}