import { user } from 'schema/user.schema';

export class PostDto {
  title: string = '';
  user: user;
  image: string[] | null;
  createAt: Date;
  comment: [];
  like: [];
  video: string;
}
