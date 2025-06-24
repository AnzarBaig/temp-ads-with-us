function Blog({ data, from }) {
    if (from === 'home') {
        let td = []
        data?.forEach((ele, index) => {
            if (index < 3) {
                td?.push(ele)
            }
        });
        let item = td?.map((ele, index) => { return <div className='my-2'><BlogItem key={index} ele={ele} /></div> })
        return item;
    } else {
        let td = []
        data?.forEach((ele, index) => {
            td?.push(ele)
        });
        let item = td?.map((ele, index) => { return <div className='my-2'><BlogItem key={index} ele={ele} /></div> })
        return item;
    }
}

export default Blog;