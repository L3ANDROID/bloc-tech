//Este config se encargara de exportar mis variables
export const base_url = "/api/v1";

export const port = process.env.PORT || 8080;

export const secret = process.env.SECRET || "secret";

const mongo_local = "mongodb://192.168.1.105:27017/local";
// const mongo_local2 = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb"
const mongo_remote = "mongodb+srv://teoatoms:T3csup8420@cluster0.mcyw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const db_url = process.env.DB_URL || mongo_local;