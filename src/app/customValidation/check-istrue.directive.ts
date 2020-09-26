import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const checkIsTrueValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const options = control.get('options');
    var returnValue = false;
// console.log(options.value)

    for (let index = 0; index < options.value.length; index++) {
// cons
// console.log(options.value[index]);
        returnValue = options.value[index].is_true !== '';
        if (returnValue)
            break;
        // console.log(index);
        // const element = options[index];
        
    }
// console.log(returnValue);
    // for (var option in options.value) {
    //     console.log(option);
    // }
    return (returnValue) ? { checkIsTrue: true } : null;
};