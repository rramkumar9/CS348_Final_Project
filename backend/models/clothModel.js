import mongoose from "mongoose";

const clothSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        company:{
            type: String,
            required: true,
        },
        typeOfCloth:{
            type: String,
            required: true,
        },
        size:{
            type: String,
            required: true,
        },
        color:{
            type: String,
            required: true,
        },
        gender:{
            type: String,
            required: false,
        },
        des:{
            type: String,
            required: false,
        },

    },
    {
        timestamps: true,
    }
);
clothSchema.index({ size: 1 })

export const Cloth = mongoose.model('Cloth', clothSchema);