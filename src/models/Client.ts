import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id?: string;  // O "?" indica que o id é opcional até que o TypeORM o gere

  @Column()
  name!: string;

  @Column({ unique: true })
  fiscalIdentifier!: string;

  @Column({ unique: true })
  email!: string;
}
