import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    text: string

    @Column({ nullable: true })
    answer: string

    @Column({ nullable: false, default: false })
    watched: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
