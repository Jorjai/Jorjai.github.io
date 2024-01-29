/*
* Name: Meng Cai, Mario Chavez
* Student ID: 100894240, 100895335
* Date of completion: 27/01/2024*/
"use strict";

class Contact{
    constructor(fullName = "", contactNumber = "", emailAddress = "") {
        //asi es como el profe define los instance variables *seu madrugea*
        this._fullName = fullName;
        this._contactNunmber = contactNumber;
        this._emailAddress = emailAddress;
        this._contactNumber = contactNumber;
    }
    get fullName() {
        return this._fullName;
    }

    set fullName(value) {
        this._fullName = value;
    }

    get contactNumber() {
        return this._contactNumber;
    }

    set contactNumber(value) {
        this._contactNumber = value;
    }

    get emailAddress() {
        return this._emailAddress;
    }

    set emailAddress(value) {
        this._emailAddress = value;
    }
    toString(){
       return `Full Name: ${this._fullName}\n Contact Number: ${this._contactNumber}\n 
               Email Address: ${this._emailAddress}`
    }

    //Serialize for writing to localStorage
    serialize(){
        if(this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== ""){
            return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress} `;
        }
        console.error("One or more of the Contact properties is missing or invalid");
        return null;
    }
    //  Deserialize is used to read data from localStorage
    deserialize(data){
        let propertyArray = data.split(",");
        this._fullName = propertyArray[0];
        this._contactNumber = propertyArray[1];
        this._emailAddress = propertyArray[2];
    }


}