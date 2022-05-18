
export function useFormValidations (){


    const validations = {

        validatePhoneNumber: (input: string) => {

            if(input.length !== 12) return false
            else if(input[0] !== '+') return false
            else if(input[1] !== ("7" || "8")) return false
            else if(input[2] !== "9") return false

            return true

        }

    }

    return validations

}