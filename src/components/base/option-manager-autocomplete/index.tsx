import {AutocompleteRenderOptionState, Typography} from '@mui/material';
import React, {FC} from 'react';
import ButtonEditDelete from '../button-edit-delete';

interface Props {
  props: React.HTMLAttributes<HTMLLIElement>;
  option: any;
  state: AutocompleteRenderOptionState;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}
const OptionManagerAutocomplete: FC<Props> = ({
  props,
  option,
  state,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <div
      className={`flex justify-between items-center ${
        state.selected ? '' : 'hover:bg-[#F6F7F8]'
      }  ${state.selected ? 'bg-[#D6E2F2]' : 'bg-[#fff]'} cursor-pointer`}
    >
      <Typography {...props} className="p-2 px-4 flex flex-1">
        {option.label}
      </Typography>
      {!state.selected && (
        <ButtonEditDelete onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
      )}
    </div>
  );
};

export default OptionManagerAutocomplete;
