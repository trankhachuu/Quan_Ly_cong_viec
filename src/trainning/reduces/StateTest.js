

var initialState = {
    name: 'Phuong Van CUong'
}

var StateTest = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_STATUS':

            break;
        case 'SORT':

            break;

        default:
            return state;
    }
    return state;
}
module.exports  = StateTest;