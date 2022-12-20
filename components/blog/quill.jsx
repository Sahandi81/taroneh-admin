import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(async()=> await import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

export default QuillNoSSRWrapper;

