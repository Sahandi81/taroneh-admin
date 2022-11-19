import Layout from "@/components/layout/layout";
import AddPostsForm from "@/components/blog/add-posts-form";
import {useGetSinglePostQuery} from "@/features/api/apiSlice";
import {useRouter} from "next/router";

export default function EditPost() {


    const router = useRouter();
    const {id} = router.query;
    const {data, error, isLoading} = useGetSinglePostQuery(id);
        console.log(data)
    return <Layout>
        {
            isLoading && <p>Loading...</p>
        }
        {
            error && <p>Error :(</p>
        }
        {
            data && <AddPostsForm postData={data}/>
        }
    </Layout>
}
