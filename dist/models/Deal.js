var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// src/models/Deal.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Property } from './Property.js';
import { Client } from './Client.js';
let Deal = class Deal {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Deal.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Property),
    JoinColumn({ name: 'propertyId' }),
    __metadata("design:type", Property)
], Deal.prototype, "property", void 0);
__decorate([
    ManyToOne(() => Client),
    JoinColumn({ name: 'clientId' }),
    __metadata("design:type", Client)
], Deal.prototype, "client", void 0);
__decorate([
    Column('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Deal.prototype, "value", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", Date)
], Deal.prototype, "issueDate", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Deal.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Deal.prototype, "updatedAt", void 0);
Deal = __decorate([
    Entity('deals')
], Deal);
export { Deal };
