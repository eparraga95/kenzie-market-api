import {MigrationInterface, QueryRunner} from "typeorm";

export class addingTotalPricetoBuys1644156991721 implements MigrationInterface {
    name = 'addingTotalPricetoBuys1644156991721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy" ADD "total" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy" DROP COLUMN "total"`);
    }

}
