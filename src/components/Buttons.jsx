import React from 'react';

const classesOne = `px-3 border  rounded-lg py-1 mx-3 text-neutral-100 border-purple-800 bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 hover:border-collapse hover:text-purple-100`;
const classesTwo = `px-3 py-1 bg-gradient-to-tr from-purple-700 to-blue-700 rounded-lg hover:from-black hover:to-neutral- hover:text-purple-300 hover:border hover:border-purple-700`;

export const Buttons = ({ value, valueTwo }) => {
    return (
        <div>
            <button className={`${classesOne} ${valueTwo? 'px-24 py-5 text-xl transform active:animate-ping transition duration-500 ease-in-out':''}`}>{value}</button>
        </div>
    );
};

export const ButtonsTwo = ({ value, valueTwo }) => {
    return (
        <div>
            <button className={`${classesTwo} ${valueTwo? 'px-24 py-5 text-xl transform active:animate-ping transition duration-500 ease-in-out':''}`}>{value}</button>
        </div>
    );
};
