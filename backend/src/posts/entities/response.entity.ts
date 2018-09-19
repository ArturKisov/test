import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Transform } from 'class-transformer';
import moment = require('moment');

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Post, post => post.responses)
  post: Post;

  @Column()
  user_name: string;

  @Column()
  response_content: string;

  @Transform(
    value => {
      return moment(value).format('MMMM Do YYYY, h:mm:ss a');
    },
    { toPlainOnly: true },
  )
  @CreateDateColumn()
  created_at: Date;
}
