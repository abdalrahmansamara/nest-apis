import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './order-product.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'uuid' })
    customerId!: string;

    @Column()
    customerName!: string;

    @Column({ type: 'double precision' })
    totalAmount!: number;

    @Column({ type: 'varchar', length: 50, default: 'Pending' })
    status!: string; // Order status (e.g., 'Pending', 'Completed', 'Cancelled')

    @Column({ type: 'text' })
    shippingAddress!: string; // Shipping address for the order

    @Column({ type: 'text' })
    billingAddress!: string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updated_at!: Date;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    created_at!: Date;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })
    orderProducts!: OrderProduct[];
}
