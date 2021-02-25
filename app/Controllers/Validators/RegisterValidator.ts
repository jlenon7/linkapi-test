import { ApiProperty } from '@nestjs/swagger'
import { Match } from 'app/Decorators/Match'
import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterValidator {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsString()
  @IsNotEmpty()
  @Match('password')
  @ApiProperty()
  password_confirmation: string
}
