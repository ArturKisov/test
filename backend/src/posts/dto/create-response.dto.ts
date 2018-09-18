import { IsNotEmpty, IsString } from "class-validator";

export class CreateResponseDto {

  @IsNotEmpty()
  @IsString()
  response_content: string;

}