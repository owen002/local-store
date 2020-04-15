# local-store

## npm i -S local-store-hw

## import localstore from "local-store-hw"

本地存储，支持对象存储
api:
localstore.localSet(key,value,expire)
localstore.localGet(key)
localstore.removeLocal(key)
localstore.sessionSet(key,value,expire)
localstore.sessionGet(key)
localstore.removeSession(key)