import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import {ArrowCircleDown, ArrowCircleUp} from 'iconsax-react';
import React, {useState} from 'react';
import {IconButtonBase} from 'src/components/base';

export interface CardCollapseProps {
  children?: React.ReactNode | React.ReactNode[];
  title?: string;
  showCollapse?: boolean;
  className?: string;
  titleRight?: string;
  initOpen?: boolean;
}

export default function CardCollapse(props: CardCollapseProps) {
  const {children, title, showCollapse = true, className = '', titleRight, initOpen = true} = props;
  const [open, setOpen] = useState(initOpen);
  return (
    <div
      className={className + 'card-collapse-border bg-white rounded-[4px] shadow-none card-border'}
    >
      <Accordion disableGutters expanded={open}>
        <AccordionSummary
          expandIcon={
            showCollapse && (
              <IconButtonBase
                color={open ? 'primary' : 'inherit'}
                iconName={open ? ArrowCircleUp : ArrowCircleDown}
                onClick={() => setOpen(prev => !prev)}
              />
            )
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'none',
            },
            '& .MuiAccordionSummary-content': {
              margin: '0',
            },
            minHeight: '36px',
          }}
          className="pl-4 pr-2"
        >
          <Typography
            variant="h6"
            className="text-primary box-title"
            onClick={() => setOpen(prev => !prev)}
          >
            {title}
          </Typography>
          {titleRight ? (
            <Typography
              variant="h6"
              className="text-primary box-title flex justify-end"
              style={{paddingRight: 15}}
            >
              {titleRight}
            </Typography>
          ) : null}
        </AccordionSummary>
        <AccordionDetails className="p-4">{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
