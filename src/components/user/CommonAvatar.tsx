import Avatar from 'boring-avatars';
import { UserOutput } from '@/db/types/user';

type CommonAvatarProps = { user: UserOutput<string> };

export const CommonAvatar = ({ user }: CommonAvatarProps) =>
  user.setting.avatar ? (
    <Avatar
      variant={user.setting.avatar.variant}
      name={user.setting.avatar.name}
    />
  ) : (
    <Avatar name={user.name} />
  );
