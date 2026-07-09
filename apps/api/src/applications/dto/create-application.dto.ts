import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateApplicationDto {
  @ApiProperty({
    example: "I want to build useful event tools and meet other builders.",
    description: "Why the participant wants to join this event."
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  motivation!: string;

  @ApiProperty({
    example: ["React", "Node.js", "Product design"],
    description: "Skills the participant can contribute.",
    isArray: true
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills!: string[];

  @ApiProperty({
    example: ["Find teammates", "Ship an MVP", "Learn AI workflows"],
    description: "Goals for this event.",
    isArray: true
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  goals!: string[];
}
