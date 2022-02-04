import {MigrationInterface, QueryRunner} from "typeorm";

export class addingSubtotalToCart1643975973008 implements MigrationInterface {
    name = 'addingSubtotalToCart1643975973008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "subtotal" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "subtotal"`);
    }

}
