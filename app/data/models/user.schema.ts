import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Setting } from './setting.schema';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @OneToOne(() => Setting)
  @JoinColumn()
  setting: Setting;
}
