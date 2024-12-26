import { Betting } from 'src/betting/entities/betting.entity'
import { Gift } from 'src/gift/entities/gift.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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

    @OneToMany(() => Gift, (gift) => gift.user, {
        onDelete: 'CASCADE',
    })
    gifts: Gift[]

    @ManyToMany(() => Betting, (betting) => betting.user, {
        onDelete: 'CASCADE',
    })
    @JoinTable()
    bettings: Betting[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
