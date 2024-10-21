import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')  // Isso irá gerar um UUID.
  id?: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  fiscalIdentifier!: string;

  @Column({ unique: true })
  email!: string;
}
