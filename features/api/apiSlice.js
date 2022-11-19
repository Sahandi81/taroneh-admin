import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NEXT_URL } from '@/config/index';
import { createSelector } from '@reduxjs/toolkit';
// console.log(NEXT_URL)
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_URL
  }),
  tagTypes: ['Category', 'SubCategory', 'Product', 'Orders', 'Users',"Offers"],
  endpoints: builder => ({
    getProducts: builder.query({
      query: (page = 1, perPage = 5) =>
        `api/products?page=${page}&per_page=${perPage}`,
      transformResponse: response => response.data,
      providesTags: ['Product']
    }),
    getOrders: builder.query({
      query: ({page, perPage , status}) =>
        `api/orders?status=${status}&page=${page}&per_page=${perPage}`,
      transformResponse: response => ({
        success: response.data.success,
        orders: response.data.details.data,
        lastPage: response.data.details.last_page
      }),
      providesTags: ['Orders']
    }),
    getSingleProduct: builder.query({
      query: productId => `api/products/single?id=${productId}`
    }),
    getCategories: builder.query({
      query: (page = 1, perPage = 5) =>
        `api/categories/main?page=${page}&per_page=${perPage}`,
      transformResponse: response => {
        return {
          success: response.data.success,
          items: response.data.details.data,
          lastPage: response.data.details.last_page
        }
      },
      providesTags: ['Category']
    }),
    getAllCategories: builder.query({
      query: () =>
        `api/categories/all`,
      transformResponse: response => {
        return {
          success: response.data.success,
          items: response.data.details.data,
          lastPage: response.data.details.last_page
        }
      },
      providesTags: ['Category']
    }),
    getSubCategories: builder.query({
      query: (page = 1, perPage = 5) =>
        `api/categories/sub?page=${page}&per_page=${perPage}`,
      transformResponse: response => {
        return {
          success: response.data.success,
          items: response.data.details.data,
          lastPage: response.data.details.last_page
        }
      },
      providesTags: ['SubCategory']
    }),

    getUsers: builder.query({
      query: (page = 1, perPage = 5) =>
        `api/users?page=${page}&per_page=${perPage}`,
      transformResponse: response => ({
        users: response.data.data,
        lastPage: response.data.last_page,
        success: response.data.data?true:false
      }),
      providesTags: ['Users']
    }),

    getUserById: builder.query({
      query: (userId) =>
        `api/users?id=${userId}`,
      transformResponse: response => response.data,
      providesTags: ['Users']
    }),

    addCategory: builder.mutation({
      query: category => ({
        url: 'api/categories/main',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Category']
    }),

    updateCategory: builder.mutation({
      query: category => ({
        url: 'api/categories/main',
        method: 'PUT',
        body: category
      }),
      invalidatesTags: ['Category']
    }),

    addSubCategory: builder.mutation({
      query: subCategory => ({
        url: 'api/categories/sub',
        method: 'POST',
        body: subCategory
      }),
      invalidatesTags: ['SubCategory']
    }),

    updateSubCategory: builder.mutation({
      query: subCategory => ({
        url: 'api/categories/sub',
        method: 'PUT',
        body: subCategory
      }),
      invalidatesTags: ['SubCategory']
    }),

    deleteCategory: builder.mutation({
      query: categoryId => ({
        url: 'api/categories/main',
        method: 'DELETE',
        body: categoryId
      }),
      invalidatesTags: ['Category']
    }),

    deleteSubCategory: builder.mutation({
      query: subCategoryId => ({
        url: 'api/categories/sub',
        method: 'DELETE',
        body: subCategoryId
      }),
      invalidatesTags: ['SubCategory']
    }),
    deleteUser: builder.mutation({
      query: UserId => ({
        url: 'api/users/delete',
        method: 'DELETE',
        body: {id:UserId}
      }),
      invalidatesTags: ['Users']
    }),
    addProduct: builder.mutation({
      query: product => ({
        url: 'api/products/add',
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Product']
    }),

    updateAmazingOffer: builder.mutation({
      query: product => ({
        url: 'api/offer/updateAmazingOffer',
        method: 'PUT',
        body: product
      }),
      invalidatesTags: ['Offers']
    }),
    addAmazingOffer: builder.mutation({
      query: product => ({
        url: 'api/offer/addAmazingOffer',
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Offer']
    }),
    getAmazingOffer: builder.query({
      query: () => 
         'api/offer/getAmazingOffer',
         transformResponse: response => response.data,
      invalidatesTags: ['Offer']
    }),
    editProduct: builder.mutation({
      query: product => ({
        url: 'api/products/edit',
        method: 'PATCH',
        body: product
      }),
      invalidatesTags: ['Product']
    }),
    addMainAmazingOffer: builder.mutation({
      query: product => ({
        url: 'api/offer/addMainAmazingOffer',
        method: 'POST',
        body: product
      })
    }),
    updateMainAmazingOffer: builder.mutation({
      query: product => ({
        url: 'api/offer/updateMainAmazingOffer',
        method: 'PUT',
        body: product
      })
    }),
    deleteMainAmazingOffer: builder.mutation({
      query: product => ({
        url: 'api/offer/deleteMainAmazingOffer',
        method: 'DELETE',
        body: product
      })
    }),
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `api/products/delete?productId=${productId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    }),

    updateOrder: builder.mutation({
      query: order => ({
        url: 'api/orders/edit',
        method: 'PATCH',
        body: order
      }),
      transformResponse: response => response.data,
      invalidatesTags: ['Orders']
    }),

    uploadPhoto: builder.mutation({
      query: file => ({
        url: 'api/upload',
        method: 'POST',
        body: file
      })
    }),

    login: builder.mutation({
      query: credentials => ({
        url: 'api/login',
        method: 'POST',
        body: credentials
      }),
      transformResponse: response => response.data
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'api/logout',
        method: 'GET'
      })
    }),

    getBlogPosts: builder.query({
      query: (page = 1, perPage = 5) =>
        `api/blog?page=${page}&per_page=${perPage}`,
      transformResponse: response => response.data
    }),
    getDashboard: builder.query({
      query: () =>
        `api/dashboard`,
      transformResponse: response => response.data
    }),
   
    getSinglePost: builder.query({
      query: (postId) =>
        `api/blog/${postId}`,
      transformResponse: response => response.data
    }),
    getCotact: builder.query({
      query: () =>
        `api/contact`,
      transformResponse: response => response.data
    }),
    addBlogPost: builder.mutation({
      query: post => ({
        url: 'api/blog/add',
        method: 'POST',
        body: post
      })
    }),
    addCatering: builder.mutation({
      query: post => ({
        url: 'api/catering/add',
        method: 'POST',
        body: post
      })
    }),
  
    deleteCatering: builder.mutation({
      query: post => ({
        url: 'api/catering/delete',
        method: 'DELETE',
        body: post
      })
    }),
    updateBlogPost: builder.mutation({
      query: post => ({
        url: 'api/blog/update',
        method: 'PUT',
        body: post
      })
    }),
    deleteBlogPost: builder.mutation({
      query: id => ({
        url: 'api/blog/delete',
        method: 'DELETE',
        body: id
      })
    }),
    deleteCatring: builder.mutation({
      query: id => ({
        url: 'api/catering/delete',
        method: 'DELETE',
        body: id
      })
    }),
    deleteAmazingOffer: builder.mutation({
      query: id => ({
        url: 'api/offer/deleteAmazingOffer',
        method: 'POST',
        body: id
      })
    }),
    deleteSpecialSale: builder.mutation({
      query: id => ({
        url: 'api/specialeSale/delete',
        method: 'DELETE',
        body: id
      })
    }),
    getOffer: builder.query({
      query: () =>
        `api/products/offer`,
      transformResponse: response => response.data
    }),
    addOffer:builder.mutation({
      query: data => ({
        url: 'api/products/offer',
        method: 'POST',
        body: data
      })
    }),
    deleteOffer:builder.mutation({
      query: data => ({
        url: 'api/products/offer',
        method: 'DELETE',
        body: data
      })
    }),
    addSpecialSale:builder.mutation({
      query: data => ({
        url: 'api/specialeSale/add',
        method: 'PUT',
        body: data
      })
    }),
    updateOffer:builder.mutation({
      query: data => ({
        url: 'api/offer/update',
        method: 'POST',
        body: data
      })
    }),
  })
});



// export const getCatrings = createSelector(
//   Catrings,
//   wishListResult => wishListResult?.data ?? []
// );



export const {
  useDeleteBlogPostMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetOrdersQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetBlogPostsQuery,
  useGetSinglePostQuery,
  useGetAllCategoriesQuery,
  useGetDashboardQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useDeleteUserMutation,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useUpdateOrderMutation,
  useUploadPhotoMutation,
  useLoginMutation,
  useLogoutMutation,
   
    useDeleteSpecialSaleMutation,
    useAddBlogPostMutation,
    useUpdateBlogPostMutation,
    useAddAmazingOfferMutation,
    useUpdateAmazingOfferMutation,
    useGetAmazingOfferQuery,
    useAddOfferMutation,
    useDeleteCateringMutation,
    useAddCateringMutation,
    useAddSpecialSaleMutation,
    useUpdateOfferMutation,
    useGetCotactQuery,
    useDeleteAmazingOfferMutation,
    useDeleteMainAmazingOfferMutation,
    useAddMainAmazingOfferMutation,
    useUpdateMainAmazingOfferMutation,
    useDeleteCatringMutation,
    useGetOfferQuery,
    useDeleteOfferMutation
} = apiSlice;

// const {deta} = apiSlice.useGetCatringQuery();


