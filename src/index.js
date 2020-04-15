let session = window && window.sessionStorage;
let local = window && window.localStorage;

// 测试本地存储是否可以用
let canLS = true;
try {
    local.setItem("ls_can", "1");
    if (local.getItem("ls_can") != "1") {
        canLS = false;
    }
} catch (e) {
    canLS = false;
}

if (!canLS) {
    // 无本地存储，模拟本地实现
    let LSStore = {};
    local = {
        getItem(key) {
            return LSStore[key];
        },
        setItem(key, val) {
            LSStore[key] = val;
        },
        removeItem(key) {
            try {
                delete LSStore[key];
            } catch (e) { }
        }
    };
    let SSStore = {};
    session = {
        getItem(key) {
            return SSStore[key];
        },
        setItem(key, val) {
            SSStore[key] = val;
        }
    };
}

function getItem(obj) {
    let key = obj.key;
    let val = obj.store.getItem(key);
    if (val) {
        val = JSON.parse(val);
        let exp = val.expoiration;
        if (exp) {
            let time = new Date().getTime();
            if (exp === -1 || time <= exp) {
                return val.item;
            }
        }
    }
}

function setItem(obj) {
    let key = obj.key, val = obj.val, exp = obj.exp || -1;
    let last = 0;
    if (typeof exp === "number") {
        let day = 24 * 60 * 60 * 1000;
        if (exp === -1) {
            last = -1;
        } else {
            last = new Date().getTime() + day * exp;
        }
    } else {
        last = new Date(exp.replace(/-/g, "/")).getTime();
    }
    let item = {
        item: val,
        expoiration: last
    };
    obj.store.setItem(key, JSON.stringify(item));
}

let localStore = {
    removeLocal(key) {
        local.removeItem(key);
    },
    removeSession(key) {
        session.removeItem(key);
    },
    // 封装wx setStorageSync getStorageSync
    localSet(key, val, exp = -1) {
        setItem({ store: local, key, val, exp });
    },

    localGet(key) {
        return getItem({ key, store: local });
    },
    sessionSet(key, val, exp = -1) {
        setItem({ store: session, key, val, exp });
    },
    sessionGet(key) {
        return getItem({ key, store: session });
    }
}

module.exports = localStore;