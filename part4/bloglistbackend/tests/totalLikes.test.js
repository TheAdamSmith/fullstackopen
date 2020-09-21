const listHelper = require('../utils/list_helper')

describe('total likes', () =>{

    test('totallikes with 35 likes', () =>{
        
        const blogs = [ 
            { _id: "5a422a851b54a676234d17f7", title: "react patterns", author: "michael chan", url: "https://reactpatterns.com/", likes: 6, __v: 0 }, 
            { _id: "5a422aa71b54a676234d17f8", title: "go to statement considered harmful", author: "edsger w. dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/go_to_considered_harmful.html", likes: 5, __v: 0 }, 
            { _id: "5a422b3a1b54a676234d17f9", title: "canonical string reduction", author: "edsger w. dijkstra", url: "http://www.cs.utexas.edu/~ewd/transcriptions/ewd08xx/ewd808.html", likes: 12, __v: 0 }, 
            { _id: "5a422b891b54a676234d17fa", title: "first class tests", author: "robert c. martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/testdefinitions.htmll", likes: 10, __v: 0 },
            { _id: "5a422ba71b54a676234d17fb", title: "tdd harms architecture", author: "robert c. martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/tdd-harms-architecture.html", likes: 0, __v: 0 }, 
            { _id: "5a422bc61b54a676234d17fc", title: "type wars", author: "robert c. martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/typewars.html", likes: 2, __v: 0 }
        ]
        const result =listHelper.totalLikes(blogs)
        expect(result).toBe(35)
    })

    test('totalLikes with empty blogs', () =>{
        
        const blogs = []

        const result =listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('totallikes with one blog 6 likes', () =>{
        
        const blogs = [ 
            { _id: "5a422a851b54a676234d17f7", title: "react patterns", author: "michael chan", url: "https://reactpatterns.com/", likes: 6, __v: 0 }, 
        ]
        const result =listHelper.totalLikes(blogs)
        expect(result).toBe(6)
    })
})