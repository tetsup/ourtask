import { AvatarGroup } from '@mui/material';
import { User } from '@/db/schemas/base/user';
import { CommonAvatar } from './CommonAvatar';

type CommonAvatarGroupProps = {
  users: User[];
  max: number;
};

export const CommonAvatarGroup = ({ users, max }: CommonAvatarGroupProps) => (
  <AvatarGroup max={max}>
    {users.map((user) => (
      <CommonAvatar user={user} />
    ))}
  </AvatarGroup>
);
