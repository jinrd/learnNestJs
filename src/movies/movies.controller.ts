import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll(){
        return "This will return all movies name";
    }

    @Get("search")
    search(@Query("year") year:string){
        return `We are searchgin for a movie with a titile since : ${year}`;
    }
    
    @Get("/:id")
    getOne(@Param("id") id : string){
        return `This will return one Movie : ${id} `;
    }
    
    @Post()
    create(@Body() movieData){
        console.log(movieData);
        // return `This will create a movie`;
        return movieData;
    }

    @Delete("/:id")
    remove(@Param("id") id:string){
        return `This will delete a movie : ${id}`;
    }

    @Patch("/:id") // @Patch 는 일부 리소스만 업데이트
    patch(@Param("id") id:string, @Body() updateData){
        console.log(updateData);
         // return `This will Patch a movie with the id : ${id}`;
        return {
            updatedmovie: id,
            ...updateData
        };
    }
}
