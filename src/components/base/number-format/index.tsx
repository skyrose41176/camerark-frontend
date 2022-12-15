import * as React from 'react';
import { NumericFormat } from 'react-number-format';
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const NumberFormatCustom = React.forwardRef<any, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString={false}
        prefix=""
        decimalSeparator="."
        thousandSeparator=","
      />
    );
  }
);

export default NumberFormatCustom;
