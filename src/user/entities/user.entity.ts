import { History } from 'src/history/entities/history.entity'
import { Review } from 'src/review/entities/review.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true, type: 'bigint' })
    tgId: number

    @Column({ nullable: false, default: false })
    admin: boolean

    @Column({ nullable: false, default: false })
    startedInterview: boolean

    @OneToOne(() => History, (history) => history.user, {
        onDelete: 'CASCADE',
    })
    history: History

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    nickname: string

    @Column({ nullable: false, default: false })
    professionExist: boolean

    @Column({ nullable: true })
    profession: string

    @Column({ nullable: false, default: false })
    skillsExist: boolean

    @Column({ nullable: true, array: true, default: [], type: 'text' })
    skills: string[]

    @Column({ nullable: true })
    level: 'Intern' | 'Junior' | 'Middle' | 'Senior' | 'Lead'

    @Column({ nullable: false, default: false })
    startedReview: boolean

    @OneToOne(() => Review, (review) => review.user, {
        onDelete: 'CASCADE',
    })
    review: Review

    @Column({ nullable: false, default: false })
    startedAnnouncement: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
