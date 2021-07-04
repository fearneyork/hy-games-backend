//--Fortmats the categories data into expected array--//
exports.formatCategoriesData = (categoryData) => {
    const categoriesValues = categoryData.map((category) => {
        return [category.slug, category.description];
    })
    return categoriesValues;
}
//--Fortmats the users data into expected array--//
exports.formatUsersData = (userData)=>{
    const usersValues = userData.map((user) => {
        return [user.username, user.name ,user.avatar_url,];
    })
    return usersValues;
}
//--Fortmats the reviews data into expected array--//
exports.formatReviewsData = (reviewData)=>{
    const reviewsValues = reviewData.map((review) => {
        return [review.title, review.review_body, review.designer, review.review_img_url, review.votes, review.category, review.owner, review.created_at];
    })
    return reviewsValues;
}
//--Fortmats the comments data into expected array--//
exports.formatCommentsData = (commentData, reviewLookUp)=>{
    const commentsValues = commentData.map((comment) => {
        return [comment.created_by, reviewLookUp[comment.belongs_to], comment.votes, comment.created_at, comment.body];
    })
    return commentsValues;
}
//--Creates an object that has the key value pair of the review title and reeview id--//
exports.lookUpObj = (reviewRowsData) => {
    const refObj = {};
    reviewRowsData.forEach((review) => {
        refObj[review.title] = review.review_id;
    })
    return refObj;
}
