import {MigrationInterface, QueryRunner} from "typeorm";

export class turningProductPriceToFloat1643934871258 implements MigrationInterface {
    name = 'turningProductPriceToFloat1643934871258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" real NOT NULL`);
    }

}
