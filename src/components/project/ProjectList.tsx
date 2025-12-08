'use client';
import { useEffect, useState } from 'react';
import { List } from '@mui/material';
import { useLanguage } from '@/i18n/provider';
import { useQuery } from '@/hooks/api';
import { ProjectInput, ProjectOutput } from '@/db/types/project';
import { authClient } from '@/auth/client';
import { CommonDialog } from '../common/layouts/CommonDialog';
import { ProjectForm } from './ProjectForm';
import { NewProjectCard, ProjectCard } from './ProjectCard';

const initValues = {
  name: '',
  description: '',
  owners: [],
  assignments: [],
};

type FormParams = { defaultValues: ProjectInput<string>; _id?: string };

export const ProjectList = () => {
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newFormValues, setNewFormValues] =
    useState<ProjectInput<string>>(initValues);
  const [formParams, setFormParams] = useState<FormParams>({
    defaultValues: newFormValues,
  });
  const { data: user } = authClient.useSession();
  const { data: projects, handleReload } = useQuery({
    endpoint: '/api/project',
    initData: [] as ProjectOutput<string>[],
    initQuery: null,
  });
  useEffect(() => {
    setNewFormValues({ ...initValues, owners: user ? [user] : [] });
  }, [user]);
  useEffect(() => {
    handleReload();
  });

  const handleDialogOpen = (params: FormParams) => {
    setFormParams(params);
    setDialogOpen(true);
  };
  const handleNewDialogOpen = () => {
    handleDialogOpen({ defaultValues: newFormValues });
  };
  const handleEditDialogOpen = (data: ProjectOutput<string>) => {
    const { _id, ...defaultValues } = data;
    handleDialogOpen({ _id, defaultValues });
  };
  return (
    <>
      <List>
        <NewProjectCard onClick={handleNewDialogOpen} />
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onEdit={() => {
              handleEditDialogOpen(project);
            }}
          />
        ))}
      </List>
      <CommonDialog
        title={t.project.edit}
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <ProjectForm
          {...formParams}
          postSubmit={async () => {
            setDialogOpen(false);
            handleReload();
          }}
        />
      </CommonDialog>
    </>
  );
};
