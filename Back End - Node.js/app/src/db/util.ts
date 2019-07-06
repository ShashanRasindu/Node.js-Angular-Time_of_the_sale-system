import {PoolConnection} from "mysql";

export function executeQuery(connection: PoolConnection, sql: string, values: Array<string | number>) {
    // @ts-ignore
    return new Promise<{ affectedRows: number }>((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
