import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()  // Isso irá gerar um ID auto incrementado.
  id?: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  fiscalIdentifier!: string;

  @Column({ unique: true })
  email!: string;
}
