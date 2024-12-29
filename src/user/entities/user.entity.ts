import { Content } from '@google/generative-ai'
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, unique: true })
    tgId: number

    @Column({ nullable: false, default: false })
    admin: boolean

    @Column({ nullable: true, array: true, default: [], type: 'text' })
    localhistory: Content[]

    @Column({ nullable: true, array: true, default: [], type: 'text' })
    globalhistory: Content[][]

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    nickname: string

    @Column({ nullable: true })
    profession: string

    @Column({ nullable: true, array: true, default: [], type: 'text' })
    skills: string[]

    @Column({ nullable: true })
    level: 'Junior' | 'Middle' | 'Senior'

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
