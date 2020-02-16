import React, { CSSProperties } from 'react';
import Select, { Styles, ValueType } from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'src/types/State';
import { handleScopeChangeAction } from 'src/actions/globalActions';
import { Options, Option } from './types/types';

// determines scope of dashboard (either month view or weekly view)

const SubnavDropdown: React.FC = () => {
  const options: Options = [
    { value: 'Week', label: 'Week' },
    { value: 'Month', label: 'Month' }
  ];

  const scope: Option = useSelector(
    (state: State) => state.globalReducer.scope
  );
  const dispatch = useDispatch();

  // react-select accepts a customStyles object to direct styling
  // normally I prefer scss, but 3rd party libraries such as this can be a pain to modify via CSS
  const customStyles: Partial<Styles> = {
    control: (provided: CSSProperties) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided: CSSProperties) => ({
      ...provided,
      position: 'relative',
      right: '10px'
    }),
    option: (provided: CSSProperties) => ({
      ...provided,
      cursor: 'pointer'
    })
  };

  // changes the scope - must be a controlled component
  const handleChange = (option: ValueType<Option>): void => {
    dispatch(handleScopeChangeAction(option));
  };

  return (
    <>
      <Select
        className='subnav-menu-icon left dropdown'
        styles={customStyles}
        options={options}
        value={scope}
        onChange={(selectedOption: ValueType<Option>): void =>
          handleChange(selectedOption)
        }
        defaultValue={scope}
        isSearchable={false}
        // eslint-disable-next-line
        theme={(theme): any => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary50: 'white',
            primary25: 'white'
          }
        })}
      />
    </>
  );
};

export default SubnavDropdown;
