# Next.js

>  pre-rendering을 지원하는 Production을 위한 React Framework

* [Client Side Navigation](#client-side-navigation)
* [Assets, Metadata, CSS](#assets,-metadata,-css)
* [Pre-rendering](#pre-rendering)
* [Dynamic Routes](#dynamic-routes)
* [API Routes](#api-routes)


## Client Side Navigation

> 기존 브라우저의 naviagation 대신 자바스크립트를 이용해 페이지 전환을 하는 방식



### Pages

`pages` directory에서 각 page를 생성할 수 있다.

* `pages/index.js`는 `/` route와 매칭된다.
* `pages/posts/first-post.js`는 `/posts/first-post/` route와 매칭된

### code-splitting

* 한번에 모든 페이지를 불러오는 것이 아닌 특정 페이지에 필요한 코드만 불러오는 기법.
* 빠른 페이지 로딩 속도를 보장해준다. 

### prefetching

* ``Link`` component가 브라우저의 viewport 내에 나타나면 Linked page에 대한 코드를 미리 background에서 fetch해온다.

* 따라서 링크를 클릭할 때 page transition이 즉각적으로 일어난다.





## Assets, Metadata, CSS

### Assets

* Next js는 image와 같은 static assets들을 `public` directory에 저장하여 제공한다. 

* `public` directory에 정적 콘텐츠를 저장하는 것은  `robots.txt`, Google Site 인증, 다른 static assets들에 유용하다. (SSR의 장점인 SEO 최적화 사용 가능)



### Metadata(Head)

* Head component를 통해 page별로 html head부분을 작성할 수 있다.

```js
import Head from 'next/head'
```

```jsx
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}
```



### CSS Styling

css in js, css modules 등의 방법이 있다.

**css in js**

* styled-jsx 라는 문법을 사용한다. 혹은 styled component 사용도 가능하다.

```jsx
<style jsx>{`
  .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
`}</style>
```

* 다음과 같이 component 파일 아래 선언하여 사용한다.



**css modules**

* css file을 import 해와서 쓰는 방법.

* file name이 `.module.css`로 끝나야 한다.

``components/layout.module.css``에 css파일을 작성하고

``components/layout.js``에서 import해주면 된다.

```jsx
import styles from './layout.module.css'

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}
```



**global style**

* global css를 작성한다음 pages/_app.js에서 import를 추가하면 된다.



**classsnames**

* class를 특정 조건에 따라 toggle할 때 용이하다.

```jsx
import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
```





## Pre-rendering

> JS Load 이전에 HTML을 서버에서 미리 생성해서 렌더링해주는 것. 

![Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

Pre-rendering을 하면 JS 없이도 static HTML이 렌더링된 모습을 볼 수 있다.

* broswer에서 disable javascript 한 후 확인 가능
* 단 , css는 load되지 않는다.



### Static-Generation vs Server-side Rendering

Next.js에서는 두가지의 pre-rendering을 지원한다. 

page별로 두가지 렌더링 방식 중 선택하여 렌더링을 할 수 있다.



**Static-Generation**

빌드타임에 HTML이 생성되고 매 요청마다 재사용

![Static Generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)

* user의 request 없이 page를 미리 렌더링할 수 있는 경우에 쓰인다.
  * 마케팅 페이지
  * 블로그 포스트
  * 이커머스 상품 리스팅
  * help & documentation

* 별도의 설정 없이 CDN으로 캐싱할 수 있기 때문에 대부분 추천



**Server-side Rendering**

매 요청마다 HTML이 생성

![Server-side Rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

* user의 request가 있어야만 렌더링을 할 수 있는 경우에 쓰인다.
  * 자주 업데이트되어야 하는 경우
  * 매 요청마다 페이지 콘텐츠가 바뀌는 경우
* 상대적으로 느리지만 data의 최신상태를 업데이트할 수 있다.





**getStaticProps**

> build time에 data를 가져와서 statc generation이 가능하도록 하는 함수

data가 필요한 page에 아래와 같이 getStaticProps()를 써주면 된다.

getStaticProps))이 페이지는 data dependency가 있으므로 pre-render시에 이 로직을 먼저 실행해라! 라고 Next.js에 알려줌.



```js
export async function getStaticProps(){
  const allPostsData = getSortedPostsData();
  return {
    props:{
      allPostsData
    }
  }
}
```

```jsx
export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id,date,title}) => <li className={utilStyles.listItem} key={id}>{title}<br/>{id}<br/>{date}</li>)}
        </ul>
      </section>
    </Layout>
  );
}
```





## Dynamic Routes

> external data에 따라 페이지 경로를 동적으로 설정하여 렌더링

![How to Statically Generate Pages with Dynamic Routes](https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png)

**1  . pages/posts/[id].js 라는 파일명으로 컴포넌트를 작성**

```jsx
// pages/posts/[id].js

import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}
```



**2-1. lib/posts.js에서 postId들을 가져오는 함수를 작성**

```js
// lib/posts.js

export function getAllPostIds() { 
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
```



**2-2. getStaticPaths() 함수 작성**

**getStaticPaths** 

params id 에 들어갈 id들을 가져오는 함수.

* development 환경에서 `getStaticPaths`는 매 요청마다 실행
* production 환경에서는 빌드 타임에 한번 실행

```jsx
// pages/posts/[id].js
import { getAllPostIds } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
```

**fallback**

path가 `getStaticPaths`에 없을 경우 실행에 대한 option

* false : path가 `getStaticPaths`에 없으면 404 page를 리턴

* true : fallback page를 보여주고 background에서 다시 getStaticProps를 요청. 

  * ```
    if (router.isFallback) {
        return <Loading />
    }
    ```

  * 상품 데이터가 너무 많아서 빌드타임에 한번에 가져오긴 힘들 경우 사용

  * loading indicator를 통해 UX 향상

* blocking : true와 같지만 fallback page(loading indicator)를 보여주지 않는다.



**3-1. id에 해당하는 postData를 리턴하는 함수 작성**

```js
// lib/posts.js
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}
```



**3-2 . getStaticProps() 작성**

```jsx
// pages/posts/[id].js
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
```



**4 . post component 완성**

```jsx
// pages/posts/[id].js

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}
```





## API Routes

> API 엔드포인트를 node serverless 형태로 제공

`pages/api` directory 안에 handler function을 작성하여 API를 생성할 수 있다.

`pages/api`에 hello.js를 다음과 같이 작성하면

```js
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```

``localhost:3000/api/hello`` 라는 endpoint로 API가 생성된다.

* ``req``는 http.IncomingMessage의 인스턴스. cookie, query, body 등 사용 가능
* ``res``는 http.ServerResponse의 인스턴스. status, json 등 사용 가능


### Reference
* https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=nav-cta&utm_campaign=next-website
* https://blueshw.github.io/2018/04/15/why-nextjs/
* https://web.dev/route-prefetching-in-nextjs/