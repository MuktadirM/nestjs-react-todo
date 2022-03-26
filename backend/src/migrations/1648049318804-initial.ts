import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1648049318804 implements MigrationInterface {
    name = 'initial1648049318804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(300) NOT NULL, "isDone" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT Null, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
