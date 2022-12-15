import React from 'react';
import {FC} from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const PageWrapper: FC<Props> = ({children}) => {
  return <div className="padding-wrapper">{children}</div>;
};

export default PageWrapper;
