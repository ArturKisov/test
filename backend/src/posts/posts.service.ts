import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { Response } from "./entities/response.entity";

@Injectable()
export class PostsService {

  constructor(
    @Inject('PostRepositoryToken') private readonly postsRepository: Repository<Post>,
    @Inject('ResponseRepositoryToken') private readonly responseRepository: Repository<Response>
  ) {
  }

  public async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find({
      order: {
        created_at: "DESC"
      }
    });
  }

  public async removeResponse(response: Response) {
    const post = response.post;
    return await this.responseRepository.remove(response).then((data) => {
      this.postsRepository.update(post, {responses_count: post.responses_count - 1})
      return data;
    })
  }

  public async getResponseById(id): Promise<Response> {
    return this.responseRepository.findOne(id, {relations: [ "post" ]})
  }

  private async getResponsesByPostId(postId: string) {
    return await this.responseRepository.find({where: {post: {id: postId}}, order: {created_at: "DESC"}})
  }

  public async getPostById(id: string): Promise<Post> {
    const responses = await this.getResponsesByPostId(id);
    return this.postsRepository.findOne(id).then((post) => {
      post.responses = responses;
      return post;
    });
  }

  public async createPost(post: Post): Promise<Post> {
    return await this.postsRepository.save(post)
  }

  public async removePost(id: string): Promise<DeleteResult> {
    return await this.postsRepository.delete(id)
  }

  public async addResponseToPost(postId: string, response: Response) {
    const post = await this.getPostById(postId);
    response.post = post;
    return this.responseRepository.save(response).then((savedResponse) => {
      this.postsRepository.update(postId, {responses_count: post.responses_count + 1});
      return savedResponse;
    });

  }

}