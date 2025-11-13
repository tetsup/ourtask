import { Chip, ChipProps } from '@mui/material';
import { User } from '@/db/schemas/base/user';
import { CommonAvatar } from './CommonAvatar';

type UserChipProps = {
  user: User;
} & ChipProps;

export const UserChip = ({ user, ...props }: UserChipProps) => (
  <Chip avatar=<CommonAvatar user={user} /> label={user.name} {...props}></Chip>
);
