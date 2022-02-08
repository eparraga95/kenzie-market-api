import {MigrationInterface, QueryRunner} from "typeorm";

export class addingCreatedAtToResetToken1644328579660 implements MigrationInterface {
    name = 'addingCreatedAtToResetToken1644328579660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reset_token" ADD "created_at" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reset_token" DROP COLUMN "created_at"`);
    }

}
