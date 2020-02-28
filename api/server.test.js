require('dotenv').config();

describe('server', function(){
    describe('envitorment', function(){
        it('should use the testing enviroment', function(){
            expect(process.env.DB_ENV).toBe('testing')
        })
    })
})