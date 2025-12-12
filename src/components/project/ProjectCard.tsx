import { Grid, Typography } from '@mui/material';
import { useLanguage } from '@/i18n/provider';
import { ProjectOutput } from '@/db/types/project';
import { CommonCard } from '../common/parts/CommonCard';
import { CommonAvatarGroup } from '../user/CommonAvatarGroup';
import { useMenu } from '@/contexts/Menu';

type ProjectCardProps = {
  _id?: string;
  project: ProjectOutput<string>;
};
type NewProjectCardProps = { onClick: () => void };

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const { onOpen } = useMenu();
  return (
    <CommonCard
      onClick={onOpen}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Grid container>
        <Grid size={2}>
          <Typography>{t.common.name}</Typography>
        </Grid>
        <Grid size={10}>
          <Typography variant="h5">{project.name}</Typography>
        </Grid>
        <Grid size={2}>
          <Typography>{t.common.description}</Typography>
        </Grid>
        <Grid size={10}>
          <Typography variant="h6">{project.description}</Typography>
        </Grid>
        <Grid size={2}>
          <Typography>{t.project.owners}</Typography>
        </Grid>
        <Grid size={4}>
          <CommonAvatarGroup users={project.owners} max={10} />
        </Grid>
        <Grid size={2}>
          <Typography>{t.project.members}</Typography>
        </Grid>
        <Grid size={4}>
          <CommonAvatarGroup
            users={project.assignments.map((assignment) => assignment.assignee)}
            max={10}
          />
        </Grid>
      </Grid>
    </CommonCard>
  );
};

export const NewProjectCard = ({ onClick }: NewProjectCardProps) => {
  const { t } = useLanguage();
  return (
    <CommonCard onClick={onClick}>
      <Typography variant="h5">{t.project.new}</Typography>
    </CommonCard>
  );
};
