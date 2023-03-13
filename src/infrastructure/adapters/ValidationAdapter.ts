import Validation from "@/core/ports/Validation";
import Joi from "joi"

/**
 * 
 * Função de recursividade para traduzir os método abstratos para os metodos do Joi 
 * !!! Algum dia irei refatorar esse inferno. Tenho fé !!! 
 */

function validationToJoi(schema: Record<string, ReturnType<Validation["_schema"]>>) {
    let copy: Record<string, ReturnType<Validation["_schema"]>> = {};
    Object.keys(schema).forEach((name) => {

        if (Array.isArray(schema[name]._acumulator)) {
            //@ts-ignore
            const validations = schema[name]._acumulator.map(({ _acumulator }) =>  validationToJoi(_acumulator))
            
            //@ts-ignore
            copy[name] = Joi.array().items(...validations)
            return;
        } 

        if (!(typeof schema[name]?._acumulator?.type === "string")) {
            //@ts-ignore
            copy[name] = validationToJoi(schema[name]._acumulator)
            return;
        }
        
        copy[name] = schema[name]._acumulator
    })
    return copy
}

const validation: Validation = {
    _acumulator: undefined,
    _schema() {
        const builder = (name: string, value: any) => {
            if (!Array.isArray(this._acumulator))
                this._acumulator = this._acumulator[name](value)
            return this._schema()
        };

        return {
            ...this,
            min: (value: number) => builder("min", value),
            max: (value: number) => builder("max", value),
            required: () => builder("required", undefined),
        }
    },
    timestamp() {
        this._acumulator = Joi.date().timestamp()
        return this._schema()
    },
    integer() {
        this._acumulator = Joi.number().integer()
        return this._schema()
    },
    string() {
        this._acumulator = Joi.string()
        return this._schema()
    },
    email() {
        this._acumulator = Joi.string().email()
        return this._schema()
    },
    phone() {
        this._acumulator = Joi.string().pattern(/^\d{10,11}$/).rule({ message: "Phone must be like 1199999999" })
        return this._schema()
    },
    boolean() {
        this._acumulator = Joi.boolean()
        return this._schema()
    },
    forbidden() {
        this._acumulator = Joi.any().forbidden()
        return this._schema()
    },
    array(...items) {
        if (items.length) this._acumulator = items
        else this._acumulator = Joi.array()
        return this._schema()
    },
    object(obj) {
        this._acumulator = obj
        return this._schema()
    },
    valid(...items) {
        this._acumulator = Joi.any().valid(...items)
        return this._schema()
    },
    validate(data: any, schema: Record<string, ReturnType<Validation["_schema"]>>, presence?: "required" | "optional") {
        let copy: Record<string, ReturnType<Validation["_schema"]>> = validationToJoi(schema);

        const { error } = Joi.object(copy).validate(data, { abortEarly: false, presence })

        return {
            success: !error,
            errors: !error ? [] : error.details.map(({ path, message }) => ({ key: path[0], message }))
        } as ReturnType<Validation["validate"]>
    }
}

export default validation;
