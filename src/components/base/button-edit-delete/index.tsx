import {Edit, Trash} from 'iconsax-react';
import React, {FC} from 'react';
import IconButtonBase from '../icon-button-base';

interface Props {
  tooltipEdit?: string;
  tooltipDelete?: string;
  onClickEdit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  hiddenEdit?: boolean;
  hiddenDelete?: boolean;
}
const ButtonEditDelete: FC<Props> = ({
  tooltipDelete = 'Xóa',
  tooltipEdit = 'Sửa',
  onClickEdit,
  onClickDelete,
  hiddenEdit = false,
  hiddenDelete = false,
}) => {
  return (
    <div style={{width: '68px'}}>
      <div className="flex justify-around">
        <IconButtonBase
          style={{
            visibility: hiddenEdit ? 'hidden' : 'visible',
          }}
          iconName={Edit}
          hasBackground={false}
          tooltip={tooltipEdit}
          onClick={onClickEdit}
        />
        <IconButtonBase
          style={{
            visibility: hiddenDelete ? 'hidden' : 'visible',
          }}
          iconName={Trash}
          hasBackground={false}
          color="error"
          tooltip={tooltipDelete}
          onClick={onClickDelete}
        />
      </div>
    </div>
  );
};

export default ButtonEditDelete;
