import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'boolean', default: false })
  isDone: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', default: () => 'Null',nullable:true})
  deletedAt: Date | null;
}