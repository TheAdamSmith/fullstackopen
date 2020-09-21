const dummy = (blogs) =>{
    return 1;
}

const totalLikes = (blogs) =>{
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce((max, item) => Math.max(max, item.likes), 0)

    let favBlog = blogs.find(item => item.likes ===maxLikes)
    favBlog?
    favBlog = {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }:
      favBlog = {title: '',
            author: '',
            likes:0}

    return favBlog 
      
}

const mostBlogs = (blogs) => {
    const combiner = (sumArr, item) => {

        const index = sumArr.findIndex(data => data.author ===item.author)

        if(index>-1){
            sumArr[index].blogs += 1
            return sumArr

        } else{
           return sumArr.concat({
                author: item.author,
                blogs: 1
            })
        }

    }
    let combBlogs = blogs.reduce(combiner, [])

    const maxBlogs = combBlogs.reduce((max, item) => Math.max(max, item.blogs), 0)
     
    const mostBlog = combBlogs.find(item => item.blogs ===maxBlogs);

    return mostBlog ? 
        mostBlog:
        {author: '', 
            blogs: 0} 
    
}

const mostLikes = (blogs) => {
    const combiner = (sumArr, item) => {

        const index = sumArr.findIndex(data => data.author ===item.author)

        if(index>-1){
            sumArr[index].likes += item.likes
            return sumArr

        } else{
           return sumArr.concat({
                author: item.author,
                likes: item.likes
            })
        }

    }
    let combBlogs = blogs.reduce(combiner, [])
    console.log(combBlogs);
    const maxLikes = combBlogs.reduce((max, item) => Math.max(max, item.likes), 0)
     
    const mostLiked = combBlogs.find(item => item.likes ===maxLikes);

    return mostLiked ? 
        mostLiked:
        {author: '', 
            likes: 0} 
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}