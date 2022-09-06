import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterDailyRate1662419756538 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cars", "daily.rate");
        await queryRunner.addColumn(
            "cars",
            new TableColumn({
                name: "daily_rate",
                type: "numeric",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "cars",
            new TableColumn({
                name: "daily.rate",
                type: "numeric",
            })
        );
        await queryRunner.dropColumn("cars", "daily_rate");
    }
}
