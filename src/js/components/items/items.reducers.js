import { ITEM_ADD, ITEM_UPDATE, ITEM_DELETE, ITEM_ADD_ALL } from './items.actions';

export const itemsReducer = (state, { payload, action }) => {
    switch (action) {
        case ITEM_ADD:
            state.push({ ...payload });
            return state;
        case ITEM_ADD_ALL:
            return state.concat(payload);
        case ITEM_UPDATE:
            const item = state.find(e => e.code === payload.code)
            if (item) {
                currState = state.filter(e => e.code !== payload.code);
                currState.push(payload)
                return currState;
            }
            return state;
        case ITEM_DELETE:
            return state.filter(e => e.code !== payload.code)
        default:
            return [...state];
    }
}