import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppContext from '../../../context/appContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function CategoryButton({ currentCategory, setCurrentCategory }) {
    const theme = useTheme();
    const [button, setButton] = React.useState('All');
    const { categoryList, setCategoryList } = React.useContext(AppContext);
    const [names, setNames] = React.useState([]);

    React.useEffect(() => {
        setCurrentCategory([]);
    }, [])

    React.useEffect(() => {
        setNames(categoryList)
    }, [categoryList])

    React.useEffect(() => {
        if(currentCategory.length > 0) {
            setButton('Deselect All');
        } else {
            setButton('All');
        }
    }, [currentCategory])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;


        // If "All" is selected
        if (value.includes("All")) {
            if (currentCategory.length > 0) {
                setCurrentCategory([]);
                setButton('All');
            } else {
                // // Select all items
                // let temp = names.map((val, ind) => {
                //     return val.name;
                // })
                setCurrentCategory([]);
                setButton('All');
            }
        } else {
            setCurrentCategory(
                typeof value === 'string' ? value.split(',') : value,
            );
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl style={{ display: 'flex', justifyContent: 'center' }} sx={{ width: 300 }}>
                <Select
                    multiple
                    displayEmpty
                    className='global-font category-box'
                    value={currentCategory}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <div className='global-font'>{button}</div>;
                        }

                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value='All'>
                        <div className='global-font'>{button}</div>
                    </MenuItem>
                    {names.map((name) => (
                        <MenuItem
                            key={name.name}
                            className='global-font'
                            value={name.name}
                            style={getStyles(name.name, currentCategory, theme)}
                        >
                            {name.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}