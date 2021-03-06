import PostFeed from '@components/PostFeed';
import Metatags from '@components/Metatags';
import Loader from '@components/Loader';
import { firestore, fromMillis, postToJSON } from '@lib/firebase';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);


  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length -1 ];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <div className="field">
    <main >

      <Metatags title="Home Page" description="Get the latest posts on our site" />

      <div className="card card-info">
        <h2>ð¡ Palmatesã¸ãããã</h2>
        <p>Palmatesã¯èªå­¦ã«é¢ããç¥è¦ãå±æããããã«çã¾ãã¾ããã</p>
        <p>Pal-åäººãMates-ä»²éãPalmateã®ããã«èªå­¦ã¨ããå±éç¹ããä¸çã«åºãã£ã¦ãã£ã¦æ¬²ããã¨ããæå³ãè¾¼ãããã¦ãã¾ãã</p>
      </div>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
      <div className="move">
        <div className="item shake"></div>
      </div>
    </main>
    </div>

  );
}
