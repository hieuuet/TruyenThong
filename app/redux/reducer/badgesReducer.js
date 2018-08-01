const defaultBadges = [0,0,0,0,0];

const badgesReducer = (state = defaultBadges, action) => {
    switch (action.type) {
        case 'CHANGE_BADGE':
            return action.badges;
        default:
            return state;
    }
    return state;
};

export default badgesReducer;
