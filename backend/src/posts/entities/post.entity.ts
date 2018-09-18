import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Response } from "./response.entity";
import { Transform } from "class-transformer";
import moment = require("moment");

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  post_content: string;

  @Column()
  user_name: string;

  @Transform((value) => {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a')
  }, {toPlainOnly: true})
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => Response, response => response.post)
  responses: Response[];

  @Column({
    default: 0
  })
  responses_count: number;
}