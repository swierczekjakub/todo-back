import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {TodoEntity} from "../types";
import {FieldPacket} from "mysql2/promise";

type TodoRecordResults = [TodoEntity[], FieldPacket[]];

export class TodoRecord implements TodoEntity {
    public id: string;
    public name: string;

    constructor(obj: TodoEntity) {
        if (!obj.name || obj.name.length > 60) {
            throw new ValidationError('This field can contain a maximum of 60 characters.');
        }

        this.id = obj.id;
        this.name = obj.name;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `todos` VALUES(:id, :name)", {
            id: this.id,
            name: this.name,
        });

        return this.id;
    }

    static async getAll(): Promise<TodoRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `todos`") as TodoRecordResults;
        return results.map(obj => new TodoRecord(obj));
    }

    static async getOne(id: string): Promise<TodoRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `todos` WHERE `id` = :id", {
            id,
        }) as TodoRecordResults;
        return results.length === 0 ? null : new TodoRecord(results[0]);
    }

    async update(): Promise<void> {
        console.log(this.id);
        await pool.execute("UPDATE `todos` SET `name` = :name WHERE `id` = :id", {
            id: this.id,
            name: this.name,
        });
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `todos` WHERE `id` = :id", {
            id: this.id,
        })
    }
}