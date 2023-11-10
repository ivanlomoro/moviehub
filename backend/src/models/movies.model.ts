import { Document, model, Schema } from 'mongoose'

interface IMovieDocument extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const MovieSchema = new Schema<IMovieDocument>(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        }
    },
    { timestamps: true, versionKey: false }
);

const MovieModel = model<IMovieDocument>('Movies', MovieSchema);

export default MovieModel;
