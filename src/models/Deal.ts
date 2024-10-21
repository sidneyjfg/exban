// src/models/Deal.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Property } from './Property.js';
import { Client } from './Client.js';

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'propertyId' })
  property!: Property;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client!: Client;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;  // O valor do financiamento, obrigatório e positivo

  @Column({ type: 'date' })
  issueDate!: Date;  // Data de emissão do financiamento

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;  // Data de criação no banco de dados

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;  // Data de atualização no banco de dados
}
