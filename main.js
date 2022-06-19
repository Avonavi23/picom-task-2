const postsNode = document.querySelector('.posts');

const showData = (data) => {
    data.map((item) => {
        const post = document.createElement('div');
        const title = document.createElement('div');
        const description = document.createElement('div');
        post.className = 'post';
        title.className = 'title';
        description.className = 'description';

        title.innerHTML = item.title;
        description.innerHTML = item.body;

        post.append(title);
        post.append(description);

        postsNode.append(post);
    })
}

const logger = (error) => {
    console.error(error);
}

const loadPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      showData(response.data);
    } catch (error) {
        logger(error);
    }
  }

loadPosts();

const checkPosition = () => {
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight
    const scrolled = window.scrollY
    const threshold = height - screenHeight / 4
    const position = scrolled + screenHeight
  
    if (position > threshold) {
        loadPosts();
    }
  }

const throttle = (callee, timeout) => {
    let timer = null;

    return function perform(...args) {
        if (timer) return;

        timer = setTimeout(() => {
        callee(...args);
        clearTimeout(timer);
        timer = null;
        }, timeout);
    };
}

const eventListener = addEventListener('scroll', throttle(checkPosition, 100));
