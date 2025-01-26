import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './order-product.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
    id!: number;

    @Column('varchar', { nullable: false, length: 255, name: 'name' })
    name!: string;

    @Column({ type: 'double precision' })
    price!: number;

    @Column({ default: 0 })
    stock!: number;

    @Column({ type: 'boolean', default: false })
    archived!: boolean;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updated_at!: Date;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    created_at!: Date;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product, { cascade: true })
    orderProducts!: OrderProduct[];
}
