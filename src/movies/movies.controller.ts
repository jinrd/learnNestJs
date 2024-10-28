import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(): Movie[] {

        return this.moviesService.getAll();
        // return "This will return all movies name";
    }

    // @Get("search")
    // search(@Query("year") year:string){
    //     return `We are searchgin for a movie with a titile since : ${year}`;
    // }
    
    @Get(":id")
    getOne(@Param("id") id : number): Movie{
        console.log(typeof id);
        return this.moviesService.getOne(id);
        // return `This will return one Movie : ${id} `;
    }
    
    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() movieData: CreateMovieDTO){
        console.log(movieData);
        // return `This will create a movie`;
        return this.moviesService.create(movieData);
    }

    @Delete(":id")
    remove(@Param("id") id: number){
        return this.moviesService.deleteOne(id);
    }

    @Patch(":id") // @Patch 는 일부 리소스만 업데이트
    @UsePipes(new ValidationPipe())
    patch(@Param("id") id:number, @Body() updateData: UpdateMovieDTO){
        console.log(updateData);
        return this.moviesService.update(id, updateData);
    }
}
