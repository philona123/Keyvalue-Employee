import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmployee1657709548236 implements MigrationInterface {
    name = 'addEmployee1657709548236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL`);
    }

}
