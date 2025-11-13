'use client';
import { useContext, useEffect, useState } from 'react';
import { List } from '@mui/material';
import { useLanguage } from '@/i18n/provider';
import { backdropContext } from '@/contexts/BackDrop';
import {
  newProject,
  type ProjectFull,
  type Project,
} from '@/db/schemas/client/project';
import { CommonDialog } from '../common/layouts/CommonDialog';
import { ProjectForm } from './ProjectForm';
import { NewProjectCard, ProjectCard } from './ProjectCard';
import { useQuery } from '@/hooks/api';

type FormProps = { _id?: string; defaultValues: Project };

export const ProjectList = () => {
  const newFormProps = { defaultValues: newProject() };
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formProps, setFormProps] = useState<FormProps>(newFormProps);
  const handleDialogOpen = (project: Project, _id?: string) => {
    setFormProps({ _id, defaultValues: project });
    setDialogOpen(true);
  };
  const { data: projects } = useQuery('/api/project', [] as ProjectFull[]);
  return (
    <>
      <List>
        <NewProjectCard
          onClick={() => handleDialogOpen(newFormProps.defaultValues)}
        />
        {projects.map((project) => (
          <ProjectCard
            project={project}
            onEdit={() => handleDialogOpen(project, project._id)}
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
