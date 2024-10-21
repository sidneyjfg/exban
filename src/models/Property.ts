import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Client } from './Client.js';  // Ajuste o caminho conforme necessário

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 255 })
  address!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value!: number;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'clientId' })
  client?: Client;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
