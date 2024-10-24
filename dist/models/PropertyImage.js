var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Property } from './Property.js'; // Referência ao modelo Property
let PropertyImage = class PropertyImage {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], PropertyImage.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], PropertyImage.prototype, "image_url", void 0);
__decorate([
    ManyToOne(() => Property),
    JoinColumn({ name: 'property_id' }) // Vincula ao imóvel
    ,
    __metadata("design:type", Property)
], PropertyImage.prototype, "property", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PropertyImage.prototype, "created_at", void 0);
PropertyImage = __decorate([
    Entity('property_images')
], PropertyImage);
export { PropertyImage };
