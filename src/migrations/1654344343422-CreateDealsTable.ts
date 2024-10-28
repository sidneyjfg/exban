import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDealsTable1654344343422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE deals (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "propertyId" UUID NOT NULL,
                "clientId" UUID NOT NULL,
                value DECIMAL(10, 2) NOT NULL,
                "interestRate" DECIMAL(5, 2) NOT NULL,
                "issueDate" DATE NOT NULL,  -- Data de emissão do financiamento
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("propertyId") REFERENCES properties(id) ON DELETE CASCADE,
                FOREIGN KEY ("clientId") REFERENCES clients(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE deals");
    }
}
