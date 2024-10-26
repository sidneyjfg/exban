import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePropertiesTable1654344343421 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE properties (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                address VARCHAR(255) NOT NULL,
                value DECIMAL NOT NULL,
                "clientId" UUID NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("clientId") REFERENCES clients(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE properties");
    }
}
