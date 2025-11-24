import { AvatarGroup } from '@mui/material';
import { UserOutput } from '@/db/types/user';
import { CommonAvatar } from './CommonAvatar';

type CommonAvatarGroupProps = {
  users: UserOutput<string>[];
  max: number;
};

export const CommonAvatarGroup = ({ users, max }: CommonAvatarGroupProps) => (
  <AvatarGroup max={max}>
    {users.map((user) => (
      <CommonAvatar user={user} />
    ))}
  </AvatarGroup>
);
