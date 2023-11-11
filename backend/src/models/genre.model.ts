import { Document, model, Schema } from 'mongoose';
import { IMovieDocument } from './movie.model';

export interface IGenreDocument extends Document {
    name: string;
    movies?: string[],
    createdAt?: Date,
    updatedAt?: Date
}

const genreSchema = new Schema<IGenreDocument>({
    name: {
        type: String,
        required: [true, 'Genre is required'],
        unique: true
    },
    movies: {
        type: [String]
    }
},
    { timestamps: true, versionKey: false }
)

const GenreModel = model<IGenreDocument>('Genre', genreSchema)

export default GenreModel
