interface Validatable {
  value: string | number; // The value of the input
  required?: boolean; // If the input is required
  minLength?: number; // The minimum length of the input (for strings)
  maxLength?: number; // The maximum length of the input (for strings)
  min?: number; // The minimum value of the input (for numbers)
  max?: number; // The maximum value of the input (for numbers)
}


function validate(validatableInput: Validatable) {
    let isValid = true;

    if(validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0; 1  
    }
    
    console.log("inputV", validatableInput.value);
    

    if(typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min! && validatableInput.value <= validatableInput.max!;
        console.log("isValid", isValid);
        
    }

    
    return isValid;
}

export { Validatable, validate }