import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Index({ unique: true })
  @Column()
  cpf: string;

  @Column({ nullable: true})
  img: string;

  @Column({ nullable: true})
  biography: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true})
  deletedAt: Date;
}
