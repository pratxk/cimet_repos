import React, { useState, useRef } from 'react';
import { validateUPIid } from './Validate';

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const[error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [suggestions2, setSuggestions2] = useState([]);
    const [highlightedIndex2, setHighlightedIndex2] = useState(-1);
    const possibleValues = [
        'okaxis',
        'hdfc',
        'paytm',
        'phonepe',
        'gpay'
    ];
    
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        let err ;
        if(value.length > 0){
           err = validateUPIid(value,possibleValues);
        }
        if(err==='UPI ID is valid.'){
            setError('')
        }
        setError(err);

        setHighlightedIndex(-1); 
        if (value.includes('@')) {
            const prefix = value.substring(0, value.indexOf('@') + 1);
            const suffix = value.substring(value.indexOf('@') + 1);
            const filteredSuggestions = possibleValues.filter((suggestion) => suggestion.includes(suffix));
            setSuggestions(filteredSuggestions);
            console.log(value)
            const val =  value.substring(0,value.indexOf('@')+1) + (filteredSuggestions.length? filteredSuggestions[0]: "");
            setInputValue2(val);
            if(value.includes(filteredSuggestions)){
                setSuggestions('')
            }
        } else {
            setInputValue2('');
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (value) => {
        setInputValue(`${inputValue.substring(0, inputValue.indexOf('@') + 1)}${value}`);
        setSuggestions([]);
        inputRef.current.focus();
    };

    const handleInputChange2 = (event) => {
        setInputValue2(inputValue);
        if (value.includes('@')) {
            const suffix = value.substring(value.indexOf('@') + 1);
            const filteredSuggestions = possibleValues.filter((suggestion) => suggestion.includes(suffix));
            setSuggestions2(filteredSuggestions);
            setInputValue2(inputValue2+filteredSuggestions[0]);
        } else {
            setSuggestions2([]);
        }
    };

    const handleSuggestionClick2 = (value) => {
        setInputValue2(`${inputValue2.substring(0, inputValue2.indexOf('@') + 1)}${value}`);
        setSuggestions2([]);
        setInputValue2('');
        inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                handleSuggestionClick(suggestions[highlightedIndex]);
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (suggestions.length > 0 && highlightedIndex >= 0) {
                handleSuggestionClick(suggestions[highlightedIndex]);
            }
        }
    };

    const handleKeyDown2 = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (suggestions.length > 0) {
                const selectedSuggestion = suggestions[highlightedIndex2 >= 0 ? highlightedIndex2 : 0];
                handleSuggestionClick(selectedSuggestion);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
        setInputValue('');
        inputRef.current.focus()
        // Handle form submission logic here
    };

    return (
        <div>
            <label htmlFor="form">UPI Form</label>
            <form onSubmit={handleSubmit} className='border border-black w-[40rem] p-5'>
                <div className='mt-2 relative w-[15rem]'>
                    <input
                        ref={inputRef}
                        value={inputValue}
                        aria-autocomplete="list"
                        aria-controls="autocomplete-list"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className='bg-transparent z-10 text-black h-[3em] border border-black rounded-xl p-2'
                        type="text"
                        placeholder="Enter your UPI ID"
                    />
                    <br />
                    <input 
                    ref={inputRef2}
                    value={inputValue2}
                    aria-autocomplete="list"
                    aria-controls="autocomplete-list2"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown2}
                    className='bg-slate-400 absolute left-0 top-0 -z-20  text-red-800 h-[3em] border border-black rounded-xl p-2'
                     placeholder="Enter another UPI ID"
                    />
                    {suggestions?.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    role='option'
                                    className={`cursor-pointer hover:bg-gray-300 ${highlightedIndex === index ? 'bg-gray-300' : ''}`}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                    {suggestions2?.length > 0 && (
                        <ul className="suggestions-list" id="autocomplete-list2">
                            {suggestions2.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick2(suggestion)}
                                    role='option'
                                    className={`cursor-pointer hover:bg-gray-300 ${highlightedIndex2 === index ? 'bg-gray-300' : ''}`}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <span style={{color:'red', display: error !=='UPI ID is valid.' ? 'block' :'none'}} >{error}</span>
                <div className='mt-2'>
                    <button className='bg-green-600 border border-white font-bold text-white w-full shadow-md rounded-full'>
                        Submit
                    </button>
                </div>
            </form>
            <style jsx>{`
                .suggestions-list {
                    position: absolute;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    z-index: 1000;
                    margin-top: -5px;
                    padding: 0;
                    list-style: none;
                }
                .suggestions-list li {
                    padding: 8px;
                }
            `}</style>
        </div>
    );
};

export default Form;
