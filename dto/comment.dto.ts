import { user } from 'schema/user.schema';

export class CommentDto {
  id: string;
  title: string;
  user: user;
  image: [];
  createAt: Date;
}
