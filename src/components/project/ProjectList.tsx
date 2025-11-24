'use client';
import { useState } from 'react';
import { List } from '@mui/material';
import { useLanguage } from '@/i18n/provider';
import { useQuery } from '@/hooks/api';
import { ProjectOutput } from '@/db/types/project';
import { authClient } from '@/auth/client';
import { CommonDialog } from '../common/layouts/CommonDialog';
import { ProjectForm, ProjectFormProps } from './ProjectForm';
import { NewProjectCard, ProjectCard } from './ProjectCard';

export const ProjectList = () => {
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data } = authClient.useSession();
  const initFormProps = (): ProjectFormProps => ({
    defaultValues: {
      name: '',
      description: '',
      owners: [{ ...data?.user, _id: data?.user.id }],
      assignees: [],
    },
  });
  const [formProps, setFormProps] = useState<ProjectFormProps>(initFormProps());

  const handleDialogOpen = (props: ProjectFormProps) => {
    setFormProps(props);
    setDialogOpen(true);
  };
  const { data: projects } = useQuery(
    '/api/project',
    [] as ProjectOutput<string>[]
  );
  return (
    <>
      <List>
        <NewProjectCard onClick={() => handleDialogOpen(initFormProps())} />
        {projects.map((project) => (
          <ProjectCard
            project={project}
            onEdit={() => {
              const { _id, ...defaultValues } = project;
              handleDialogOpen({ _id, defaultValues });
            }}
          />
        ))}
      </List>
      <CommonDialog
        title={t.project.edit}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <ProjectForm {...formProps} />
      </CommonDialog>
    </>
  );
};
