import { Content } from '@google/generative-ai'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, type: 'json' })
    localhistory: Content[]

    @Column({ nullable: true, type: 'json' })
    globalhistory: Content[][]

    @OneToOne(() => User, (user) => user.history)
    @JoinColumn({ referencedColumnName: 'tgId' })
    user: User
}
