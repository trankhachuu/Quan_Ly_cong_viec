

var initialState = {
    status: false,
    sort: {
        by: 'name',
        value: 1     // 1 : tăng, -1 giảm
    }
}

var StateOne = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_STATUS':

            break;
        case 'SORT':
            var { by, value } = action.sort;
            var { status } = state;
            return {
                status: status,
                sort: {
                    by: by,
                    value: value
                }
            }
            break;
    }
    return state;
}
module.exports  = StateOne;