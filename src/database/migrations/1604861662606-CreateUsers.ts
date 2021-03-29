import { formatDistanceToNow } from "date-fns";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1604861662606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns:[
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: 'now()'
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: 'now()'
                },
                {
                    name: "password",
                    type: "varchar",
                    isUnique: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
