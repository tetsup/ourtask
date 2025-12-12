import { MenuItem } from '@mui/material';
import { useLanguage } from '@/i18n/provider';
import { useMenu } from '@/contexts/Menu';

type ProjectMenuProps = {
  onEdit: () => void;
  onOpen: () => void;
};

export const ProjectMenu = ({ onEdit, onOpen }: ProjectMenuProps) => {
  const { t } = useLanguage();
  const { onClose } = useMenu();
  return (
    <>
      <MenuItem onClick={onOpen}>{t.common.open}</MenuItem>
      <MenuItem
        onClick={() => {
          onEdit();
          onClose();
        }}
      >
        {t.common.edit}
      </MenuItem>
    </>
  );
};
