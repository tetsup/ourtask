import { User } from '@/db/schemas/base/user';
import Avatar from 'boring-avatars';

type CommonAvatarProps = { user: User };

export const CommonAvatar = ({ user }: CommonAvatarProps) =>
  user.avatar ? (
    <Avatar variant={user.avatar.variant} name={user.avatar.name} />
  ) : (
    <Avatar name={user.name} />
  );
