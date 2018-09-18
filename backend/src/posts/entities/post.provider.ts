import { Connection } from "typeorm";
import { Post } from "./post.entity";
import { Response } from "./response.entity";

export const postsProviders = [
  {
    provide: 'PostRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: [ 'DbConnectionToken' ]
  },
  {
    provide: 'ResponseRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Response),
    inject: [ 'DbConnectionToken' ]
  }
];