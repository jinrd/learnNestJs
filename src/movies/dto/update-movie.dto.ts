import { PartialType} from "@nestjs/mapped-types"
import { CreateMovieDTO } from "./create-movie.dto";
export class UpdateMovieDTO extends PartialType(CreateMovieDTO){
    // title? -> 필수는 아니다
    // @IsString()
    // readonly title?: string;

    // @IsNumber()
    // readonly year?: number;

    // @IsString({ each : true })
    // readonly genres?: string[];
}