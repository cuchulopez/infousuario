export const registerOptions = {
    required: "Ingrese usuario o DNI.",
    minLength: {
        value: 5,
        message: "Ingrese al menos 5 caracteres."
    },
    maxLength: {
        value: 15,
        message: "Máximo 15 caracteres."
    },
    pattern: {
        message: "Sólo letras o números."
    }
};

export const regex = {
   user: /^[A-Za-z0-9]{5,15}$/
};