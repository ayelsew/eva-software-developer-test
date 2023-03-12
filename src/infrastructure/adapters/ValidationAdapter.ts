import Validation from "@/core/ports/Validation";
import Joi from "joi"

const validation: Validation = {
    _acumulator: undefined,
    _schema() {
        const builder = (name: string, value: any) => {
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
    validate(data: any, schema: Record<string, ReturnType<Validation["_schema"]>>, presence?: "required" | "optional") {
        let copy: Record<string, ReturnType<Validation["_schema"]>> = {};

        Object.keys(schema).forEach((name) => copy[name] = schema[name]._acumulator)

        const { error } = Joi.object(copy).validate(data, { abortEarly: false, presence })

        return {
            success: !error,
            errors: !error ? [] : error.details.map(({ path, message }) => ({ key: path[0], message }))
        } as ReturnType<Validation["validate"]>
    }
}

export default validation;
