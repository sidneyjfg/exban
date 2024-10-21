export class CreateClientsTable1654344343420 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE clients (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(100) NOT NULL,
                fiscalIdentifier VARCHAR(11) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE clients");
    }
}
