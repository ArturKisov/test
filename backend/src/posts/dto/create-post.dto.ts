import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  post_content: string;
  
}