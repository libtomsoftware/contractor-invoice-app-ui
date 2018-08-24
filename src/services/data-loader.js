import * as loaderActions from '../actions/toast-actions';

let instance = null;

class DataLoader {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    set store(store) {
        this.storeInstance = store;
    }

    load(props, types = []) {
        if (!!types.length) {
            loaderActions.show()(this.storeInstance.dispatch);
            types.forEach(type => {
                if (!props[type]) {
                    props.actions[type].load();
                }
            });
            loaderActions.hide()(this.storeInstance.dispatch);
        }
    }

}

export default new DataLoader();
