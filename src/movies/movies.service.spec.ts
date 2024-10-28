import {Test, TestingModule} from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { after } from 'node:test';

describe('MoviesService', () =>{
    let service: MoviesService;

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService]
        }).compile();

        service = module.get<MoviesService>(MoviesService);
        service.create({
            title:"Test Movie",
            genres:['test'],
            year: 2000
        })
    });

    afterAll(() => {

    })

    beforeAll(() => {
        
    })

    it('should be defined', () =>{
        expect(service).toBeDefined();
    })

    describe("getAll",() => {
        it("should return an array" , () => {

            const result = service.getAll();

            expect(result).toBeInstanceOf(Array);
        })
    })

    describe("getOne" ,() => {
        

        it(`should return a movie` , () => {
            service.create({
                title:"Test Movie",
                genres:['test'],
                year: 2000
            });

            const movie = service.getOne(1);

            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        });

        it(`should throw 404 error`, () => {
            try{
                service.getOne(999);
            }catch(e){
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual(`Movie with ID 999 not found.`);
            }
        })

    });

    describe("deleteOne" , () => {
        it(`delete a movie`, () => {
            service.create({
                title:"Test Movie",
                genres:['test'],
                year: 2000
            });

            console.log(service.getAll());

            const allMovies = service.getAll();
            service.deleteOne(1);
            const afterDelete = service.getAll();

            // expect(afterDelete.length).toEqual(allMovies.length -1)
            expect(afterDelete.length).toBeLessThan(allMovies.length);
        });

        it(`should return a 404` , () => {
            try{
                service.deleteOne(999);
            }catch(e){
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual(`Movie with ID 999 not found.`);
            }
        });
    });

    describe("create" , () => {
        it(`should breate a movie`, () => {
            const beforeCreate = service.getAll().length;

            service.create({
                title:"Test Movie",
                genres:['test'],
                year: 2000
            })

            const afterCreate = service.getAll().length;
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        })
    })

    describe("update", () => {
        it(`should update a movie`, () => {
            service.update(1, {title:"updated Test"});
            const movie = service.getOne(1);
            expect(movie.title).toEqual("updated Test");
        });

        it(`should throw a NotFoundException` , () => {
            try{
                service.update(999, {});
            }catch(e){
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual(`Movie with ID 999 not found.`);
            }
        });
    });
})