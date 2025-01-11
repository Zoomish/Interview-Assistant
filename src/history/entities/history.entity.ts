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
export class History {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, length: 1000 })
    text: string

    @Column({ nullable: true, length: 1000 })
    answer: string

    @Column({ nullable: false, default: false })
    watched: boolean

    @OneToOne(() => User, (user) => user.review)
    @JoinColumn({ referencedColumnName: 'tgId' })
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
