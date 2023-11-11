import { Document, model, Schema } from 'mongoose';

interface IMovieDocument extends Document {
    name: string;
    poster_image: string;
    score: number;
/*     genre: IGenreDocument['_id'];
 */
    createdAt: Date;
    updatedAt: Date;
}

const MovieSchema = new Schema<IMovieDocument>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        poster_image: {
            type: String,
            required: [true, 'Poster image is required'],
        },
        score: {
            type: Number,
            required: [true, 'Score is required'],
        },
/*         genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: [true, 'Genre is required'] },
 */    },
    { timestamps: true, versionKey: false }
);

const MovieModel = model<IMovieDocument>('Movies', MovieSchema);

export default MovieModel;
