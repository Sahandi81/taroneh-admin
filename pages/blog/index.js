import Layout from "@/components/layout/layout";
import BlogPosts from "@/components/blog/blog-posts";

function Blog() {
    return (
        <Layout>
            <div className='grid gap-10 pb-10'>
                <BlogPosts />
            </div>
        </Layout>
    );
}

export default Blog
