import { AvatarGroup, Typography } from '@mui/material';
import { UserOutput } from '@/db/types/user';
import { CommonAvatar } from './CommonAvatar';

type CommonAvatarGroupProps = {
  users: UserOutput<string>[];
  max: number;
  groupMin?: number;
};

export const CommonAvatarGroup = ({
  users,
  max,
  groupMin,
}: CommonAvatarGroupProps) =>
  users.length >= (groupMin ?? 3) ? (
    <AvatarGroup max={max}>
      {users.map((user, index) => (
        <CommonAvatar key={index} user={user} />
      ))}
    </AvatarGroup>
  ) : users.length ? (
    <>
      {users.map((user, index) => (
        <CommonAvatar key={index} user={user} />
      ))}
    </>
  ) : (
    <Typography variant="h6">No Users</Typography>
  );
