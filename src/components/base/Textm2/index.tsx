import React from 'react';

type DonVi = 'm2' | 'unitPrice';
interface Props {
  text: string;
  variant?: DonVi;
}
const Textm2 = ({text, variant = 'm2'}: Props) => {
  if (variant === 'unitPrice') {
    return (
      <p>
        {text} (đồng / m<sup>2</sup>)
      </p>
    );
  }

  return (
    <p>
      {text} (m<sup>2</sup>)
    </p>
  );
};

export default Textm2;
