export function return_error_message(res, code, message) {
    return res.status(code).json({ error: message });
}


export function handlePotentialDoubleStepNumberError(){
    
}