import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1718578042740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },

          {
            name: "password",
            type: "varchar",
          },

          {
            name: "cpf",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "img",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "biography",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          {
            name: "deletedAt",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
