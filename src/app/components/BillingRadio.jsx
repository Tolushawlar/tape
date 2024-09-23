import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const RadioFormGroup = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`You selected: ${selectedOption}`);
    };

    const [selectedCountry, setSelectedCountry] = useState("COUNTRY");
    const [selectedState, setSelectedState] = useState("STATE");
    const handleSelect = (country) => {
        setSelectedCountry(country);
    };

    const handleState = (stateNig) => {
        setSelectedState(stateNig);
    }
    const [selectedOptions, setSelectedOptions] = useState([]);
    const options = ['Save this information for next time'];
    // const [selectedOption, setSelectedOption] = useState('');
    const optionsRadio = ['   LAGOS STATE, NIGERIA ONLY - DHL', '    OTHER STATES - DHL'];


    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-[14px] font-[700] font-CLash-Regular mb-4 ">BILLING ADDRESS</h2>
            <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white   w-[620px] h-[46px]  text-[12px] font-400 font-CLash-Regular flex flex-row items-center gap-3 pl-4 mb-3'      >
                <label className='flex flex-row items-center'>
                    <input
                        type="radio"
                        value="Option 1"
                        checked={selectedOption === 'Option 1'}
                        onChange={handleOptionChange}
                    />
                    <div className='ml-2'>SAME AS BILLING ADDRESS</div>
                </label>
            </div>
            <div className='border-[0.76px] border-black focus:outline-none  text-black bg-white  w-[620px] h-[398px]  text-[12px] font-400 font-CLash-Regular flex flex-col items-start gap-1 p-4'      >
                <div className='flex flex-row items-center'>
                    <label className='flex flex-row items-center'>
                        <input
                            type="radio"
                            value="Option 2"
                            checked={selectedOption === 'Option 2'}
                            onChange={handleOptionChange}
                        />
                    </label>
                    <div className='ml-2'>ENTER A DIFFERENT BILLING ADDRESS</div>
                </div>
                <div className="flex flex-col">
                    <div className='mt-[30px]'>
                        <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center w-[588px] h-[46px]">
                            <div>
                                <MenuButton className="flex flex-row w-full items-center justify-between bg-white px-3 py-2">
                                    <p className='font-[400] font-CLash-Regular text-[12px] mt-1'>{selectedCountry}</p>
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                                </MenuButton>
                            </div>

                            <MenuItems transition>
                                <div className="py-1 mt-2  w-[588px] text-left z-50">
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Nigeria")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Nigeria
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Ghana")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Ghana
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Kenya")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Kenya
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("South Africa")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            South Africa
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Egypt")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Egypt
                                        </a>
                                    </MenuItem>
                                    <MenuItem className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                        <a
                                            href="#"
                                            onClick={() => handleSelect("Uganda")}
                                            className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                        >
                                            Uganda
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                        <div className="flex flex-row items-center justify-start gap-4 mt-3">
                            <input className="border-[0.76px] border-black items-center flex pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='FIRST NAME' />
                            <input className="border-[0.76px] border-black items-center flex pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='LAST NAME' />
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4 mt-3">
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='EMAIL ADDRESS' />
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[287.36px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='PHONE NUMBER  ' />
                        </div>
                        <input className="border-[0.76px] border-black items-center flex pl-4 mt-3 focus:outline-none text-black bg-white  w-[588px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder=' ADDRESS' />
                        <input className="border-[0.76px] border-black items-center flex  pl-4 mt-3 focus:outline-none text-black bg-white  w-[588px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='APARTMENT, SUITES, FLAT, ECT (OPTIONAL)' />
                        <div className="flex flex-row items-center justify-between gap-3 mt-3">
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[185.88px] h-[46px] text-[12px] font-[400] font-CLash-Regular " placeholder='CITY' />
                            <Menu as="div" className="z-20 border-[0.76px] border-black relative inline-block text-center w-[185.88px] h-[46px]">
                                <div>
                                    <MenuButton className="flex flex-row w-full items-center justify-between bg-white px-3 py-2">
                                        <p className='font-[400] font-CLash-Regular text-[12px] mt-1'>{selectedState}</p>
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-black" />
                                    </MenuButton>
                                </div>

                                <MenuItems transition>
                                    <div className="py-1 mt-2 w-[185.88px] h-[46px] text-left z-50">
                                        {["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"].map((stateNig) => (
                                            <MenuItem key={stateNig} className="border-[0.76px] border-black h-[61px] items-center flex z-50 bg-white">
                                                <a
                                                    href="#"
                                                    onClick={() => handleState(stateNig)}
                                                    className="border-1 border-black block px-4 py-2 text-[14px] text-black font-CLash-Regular"
                                                >
                                                    {stateNig}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                            <input className="border-[0.76px] border-black items-center flex  pl-4 focus:outline-none text-black bg-white w-[185.88px] h-[46px] text-[12px] font-400 font-CLash-Regular " placeholder='POSTAL CODE  ' />
                        </div>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default RadioFormGroup;
