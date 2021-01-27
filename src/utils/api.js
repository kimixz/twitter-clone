import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
})

const request = ({
  method,
  url,
  data = null,
  params = null,
  headers = null,
}) => axiosInstance({
  method,
  url,
  data,
  params,
  headers,
})
  .then(res => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.error(err, err.response)
    if (err && err.response && err.response.status === 401) {
      if (localStorage.getItem('authToken')) {
        localStorage.removeItem('authToken')
        window.location.reload()
      }
    }

    if (
      err &&
      err.response &&
      err.response.status === 404 &&
      window.location.pathname !== '/404'
    ) {
      // window.location.href = '/404'
    }
    throw err
  })

const api = {}

// User
api.postLoginUser = ({ data }) => request({
  method: 'post',
  url: `/user/login`,
  data,
})

api.postRegisterUser = ({ data }) => request({
  method: 'post',
  url: `/user/signup`,
  data,
})

api.getUser = ({ urlParams }) => request({
  method: 'get',
  url: `/user/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})

api.getFollowUser = ({ urlParams }) => request({
  method: 'get',
  url: `/user/follow/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})

api.getUnfollowUser = ({ urlParams }) => request({
  method: 'get',
  url: `/user/unfollow/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})



// Upload Image
api.postUploadImage = ({ data }) => request({
  method: 'post',
  url: `/upload/image`,
  data,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})

// Upload Video
api.postUploadVideo = ({ data }) => request({
  method: 'post',
  url: `/upload/video`,
  data,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})

// Post Tweet
api.postTweet = ({ data }) => request({
  method: 'post',
  url: `/tweet`,
  data,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})
api.getLikeTweet = ({ urlParams }) => request({
  method: 'get',
  url: `/tweet/like/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})
api.getUnlikeTweet = ({ urlParams }) => request({
  method: 'get',
  url: `/tweet/unlike/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})
api.getLikesTweet = ({ urlParams }) => request({
  method: 'get',
  url: `/tweet/likes/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})
api.getRetweet = ({ urlParams }) => request({
  method: 'get',
  url: `/tweet/retweet/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})

api.deleteTweet = ({ urlParams }) => request({
  method: 'delete',
  url: `/tweet/${urlParams.id}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})

// User Information
api.getUserInfo = () => request({
  method: 'get',
  url: `/user/me`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})

api.postEditProfile = ({ data }) => request({
  method: 'post',
  url: `/user/editprofile`,
  data,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})
// Search
api.search = ({ data }) => request({
  method: 'post',
  url: `/search`,
  data
})

// Feed
api.getFeed = () => request({
  method: 'get',
  url: `/user/feed`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
})


export default api
