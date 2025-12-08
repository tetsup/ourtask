import { AvatarGroup, Typography } from '@mui/material';
import { UserOutput } from '@/db/types/user';
import { CommonAvatar } from './CommonAvatar';

type CommonAvatarGroupProps = {
  users: UserOutput<string>[];
  max: number;
};

export const CommonAvatarGroup = ({ users, max }: CommonAvatarGroupProps) =>
  users ? (
    <AvatarGroup max={max}>
      {users.map((user) => (
        <CommonAvatar key={user._id} user={user} />
      ))}
    </AvatarGroup>
  ) : (
    <Typography variant="h6">No Users</Typography>
  );
