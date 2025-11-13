import { IconButton, Typography } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useLanguage } from '@/i18n/provider';
import { ProjectFull } from '@/db/schemas/client/project';
import { CommonAvatar } from '../user/CommonAvatar';
import { CommonAvatarGroup } from '../user/CommonAvatarGroup';
import { CommonCard } from '../common/parts/CommonCard';

type ProjectCardProps = {
  _id?: string;
  project: ProjectFull;
  onEdit: () => void;
};
type NewProjectCardProps = { onClick: () => void };

export const ProjectCard = ({ project, onEdit }: ProjectCardProps) => (
  <CommonCard onClick={onEdit}>
    <Typography variant="h5">{project.name}</Typography>
    <IconButton onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <Typography variant="h6">{project.description}</Typography>
    {project.owners.map((owner) => (
      <CommonAvatar user={owner} />
    ))}
    <CommonAvatarGroup
      users={project.assignments.map((assignment) => assignment.assignee)}
      max={10}
    />
  </CommonCard>
);

export const NewProjectCard = ({ onClick }: NewProjectCardProps) => {
  const { t } = useLanguage();
  return (
    <CommonCard onClick={onClick}>
      <Typography variant="h5">{t.project.new}</Typography>
    </CommonCard>
  );
};
