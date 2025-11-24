import { Chip, ChipProps } from '@mui/material';
import { UserOutput } from '@/db/types/user';
import { CommonAvatar } from './CommonAvatar';

type UserChipProps = {
  user: UserOutput<string>;
} & ChipProps;

export const UserChip = ({ user, ...props }: UserChipProps) => (
  <Chip
    avatar=<CommonAvatar user={user} />
    label={user?.name}
    {...props}
  ></Chip>
);
