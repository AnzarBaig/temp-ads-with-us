import React from 'react'
import Select, { MultiValue } from "react-select";

function SelectComponent({ options, selectedOptions, setSelectedOptions, placeholder, important, ShowIsMulti }) {

    return (
        <>
            <Select
                defaultValue={selectedOptions}
                onChange={setSelectedOptions}
                options={options}
                placeholder={placeholder}

                isMulti={ShowIsMulti ? true : false}

            />
        </>
    )
}

export default SelectComponent