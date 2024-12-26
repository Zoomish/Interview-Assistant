import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    email: string

    @Column({ default: false, nullable: false })
    admin: boolean

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    nickname: string

    @Column({ nullable: true })
    tgId: number

    @Column({ default: false })
    showModal: boolean

    @Column({ nullable: false })
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
