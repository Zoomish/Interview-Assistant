import { User } from 'src/user/entities/user.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, length: 1000 })
    text: string

    @Column({ nullable: true, length: 1000 })
    answer: string

    @Column({ nullable: false, default: false })
    watched: boolean

    @OneToOne(() => User, (user) => user.review)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
